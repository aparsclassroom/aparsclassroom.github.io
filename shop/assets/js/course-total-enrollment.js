(function () {
    'use strict';

    const shopApi = 'https://shop.aparsclassroom.com';
    const acsCampApi = 'https://api.acscamp.com/v1/products/sales-count';
    const acsCampEndpointPrefix = 'acsCamp:';
    const sourceCache = new Map();
    const countCache = new Map();
    const countStoragePrefix = 'courseTotalEnrollment:v1:';
    const countCacheTtl = 10 * 60 * 1000;

    function ensureStyles() {
        if (document.getElementById('course-total-enrollment-style')) return;
        const style = document.createElement('style');
        style.id = 'course-total-enrollment-style';
        style.textContent = `
            .course-total-enrollment {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 260px;
                margin: 14px auto 4px;
                padding: 12px 18px;
                border-radius: 10px;
                background: #ffffff;
                color: #173b67;
                border: 1px solid rgba(23, 59, 103, 0.18);
                box-shadow: 0 8px 24px rgba(23, 59, 103, 0.12);
                font-family: Kalpurush, Gilroy-ExtraBold, Arial, sans-serif;
                font-size: 18px;
                font-weight: 700;
                text-align: center;
            }
            .course-total-enrollment.is-loading {
                color: #5b6472;
            }
            .course-total-enrollment.is-error {
                color: #a91e2c;
            }
        `;
        document.head.appendChild(style);
    }

    function getPathCycle(url) {
        const parts = new URL(url, location.href).pathname.split('/').filter(Boolean);
        return parts.find(part => /^Cycle-\d+$/.test(part)) || null;
    }

    function isCountableCourseLink(anchor) {
        const path = new URL(anchor.href, location.href).pathname;
        return /\/(?:Cycle-\d+|Combo\d*|Combo)\/?$/.test(path);
    }

    function createBadge(container) {
        ensureStyles();
        const existingBadge = document.querySelector('.course-total-enrollment');
        if (existingBadge) return existingBadge;

        const badge = document.createElement('div');
        badge.className = 'course-total-enrollment is-loading';
        badge.textContent = 'Total enrolled: loading...';
        container.parentNode.insertBefore(badge, container);
        return badge;
    }

    function parseAssignments(source) {
        const values = {};
        const assignmentPattern = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*["']([^"']+)["']/g;
        let match;
        while ((match = assignmentPattern.exec(source)) !== null) {
            values[match[1]] = match[2];
        }
        return values;
    }

    function stripJavaScriptComments(source) {
        let output = '';
        let state = 'code';
        for (let index = 0; index < source.length; index++) {
            const char = source[index];
            const next = source[index + 1];
            const prev = source[index - 1];

            if (state === 'lineComment') {
                if (char === '\n') {
                    output += char;
                    state = 'code';
                }
                continue;
            }

            if (state === 'blockComment') {
                if (char === '*' && next === '/') {
                    index++;
                    state = 'code';
                }
                continue;
            }

            if (state === 'singleQuote' || state === 'doubleQuote' || state === 'template') {
                output += char;
                const quote = state === 'singleQuote' ? "'" : (state === 'doubleQuote' ? '"' : '`');
                if (char === quote && prev !== '\\') {
                    state = 'code';
                }
                continue;
            }

            if (char === '/' && next === '/') {
                index++;
                state = 'lineComment';
                continue;
            }

            if (char === '/' && next === '*') {
                index++;
                state = 'blockComment';
                continue;
            }

            if (char === "'") {
                state = 'singleQuote';
            } else if (char === '"') {
                state = 'doubleQuote';
            } else if (char === '`') {
                state = 'template';
            }

            output += char;
        }
        return output;
    }

    function readTokenValue(token, values) {
        const expression = token.trim();
        const templateVar = expression.match(/^\$\{([A-Za-z_$][\w$]*)\}$/);
        if (templateVar) return values[templateVar[1]] || null;
        if (values[expression]) return values[expression];
        const literal = expression.match(/\d+/);
        return literal ? literal[0] : null;
    }

    function readCycleValue(token, values, pathCycle) {
        const expression = token.trim();
        return values[expression] || (expression === 'Cycle' ? pathCycle : null);
    }

    function parseArrays(source, values) {
        const arrays = {};
        const arrayPattern = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*\[([^\]]*)\]/g;
        let match;
        while ((match = arrayPattern.exec(source)) !== null) {
            arrays[match[1]] = match[2]
                .split(',')
                .map(token => readTokenValue(token, values))
                .filter(Boolean);
        }
        return arrays;
    }

    function parseCycleCodeMaps(source) {
        const maps = [];
        const mapPattern = /\b(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*\{([\s\S]*?)\};/g;
        let mapMatch;
        while ((mapMatch = mapPattern.exec(source)) !== null) {
            const entries = {};
            const entryPattern = /["'](Cycle-\d+)["']\s*:\s*\[([^\]]*)\]/g;
            let entryMatch;
            while ((entryMatch = entryPattern.exec(mapMatch[1])) !== null) {
                entries[entryMatch[1]] = Array.from(entryMatch[2].matchAll(/["'](\d+)["']/g), codeMatch => codeMatch[1]);
            }
            if (Object.keys(entries).length) maps.push(entries);
        }
        return maps;
    }

    function parseEnrollmentProductMaps(source) {
        const maps = {};
        const arrayPattern = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*\[([\s\S]*?)\];/g;
        let arrayMatch;
        while ((arrayMatch = arrayPattern.exec(source)) !== null) {
            const entries = [];
            const objectPattern = /\{([\s\S]*?)\}/g;
            let objectMatch;
            while ((objectMatch = objectPattern.exec(arrayMatch[2])) !== null) {
                const cycleMatch = objectMatch[1].match(/\bcycle\s*:\s*["'](Cycle-\d+)["']/);
                const codeMatch = objectMatch[1].match(/\bproductCode\s*:\s*["'](\d+)["']/);
                if (cycleMatch && codeMatch) {
                    entries.push({
                        cycle: cycleMatch[1],
                        productCode: codeMatch[1]
                    });
                }
            }
            if (entries.length) {
                maps[arrayMatch[1]] = entries;
            }
        }
        return maps;
    }

    function addEndpoint(endpoints, cycle, code) {
        if (!code) return;
        endpoints.add(cycle
            ? `${shopApi}/enrollment/${cycle}?productCode=${code}`
            : `${shopApi}/enrollment/?productCode=${code}`);
    }

    function addFutureSchoolEndpoint(endpoints, code) {
        if (code) endpoints.add(`https://hsc.acsfutureschool.com/api/enrollments/count?product_code=${code}`);
    }

    function addAcsCampEndpoint(endpoints, payload) {
        if (payload && payload.productGroup && payload.productCode) {
            endpoints.add(acsCampEndpointPrefix + JSON.stringify(payload));
        }
    }

    function extractEnrollmentEndpoints(source, pageUrl) {
        const activeSource = stripJavaScriptComments(source);
        const values = parseAssignments(activeSource);
        const arrays = parseArrays(activeSource, values);
        const enrollmentProductMaps = parseEnrollmentProductMaps(activeSource);
        const pathCycle = getPathCycle(pageUrl);
        const endpoints = new Set();
        const templates = [];
        let match;

        const templatePatterns = [
            /fetch\(\s*`([^`]*\/enrollment[^`]*)`/g,
            /fetch\(\s*["']([^"']*\/enrollment[^"']*)["']/g,
            /`([^`]*\/enrollment[^`]*)`/g
        ];
        templatePatterns.forEach(pattern => {
            while ((match = pattern.exec(activeSource)) !== null) templates.push(match[1]);
        });

        templates.forEach(template => {
            const cycleVarMatch = template.match(/\/enrollment\/\$\{([A-Za-z_$][\w$]*)\}/);
            const literalCycleMatch = template.match(/\/enrollment\/(Cycle-\d+)/);
            const cycle = cycleVarMatch ? (values[cycleVarMatch[1]] || pathCycle) : (literalCycleMatch ? literalCycleMatch[1] : null);
            const productCodesMatch = template.match(/[?&]productCodes=([^`&]+)/);

            if (productCodesMatch) {
                const joinedArray = productCodesMatch[1].match(/\$\{([A-Za-z_$][\w$]*)\.join\(["'],["']\)\}/);
                if (joinedArray && arrays[joinedArray[1]]) {
                    endpoints.add(`${shopApi}/enrollment/combined?productCodes=${arrays[joinedArray[1]].join(',')}`);
                } else {
                    productCodesMatch[1].split(',').forEach(token => addEndpoint(endpoints, cycle, readTokenValue(token, values)));
                }
            }

            const productCodeMatch = template.match(/[?&]productCode=([^`&]+)/);
            if (productCodeMatch) addEndpoint(endpoints, cycle, readTokenValue(productCodeMatch[1], values));
        });

        if (/comboEnrollmentCodes\.map\(\s*code\s*=>\s*fetch\(/.test(activeSource) && pathCycle) {
            parseCycleCodeMaps(activeSource).forEach(map => {
                (map[pathCycle] || []).forEach(code => addEndpoint(endpoints, null, code));
            });
        }

        Array.from(activeSource.matchAll(/([A-Za-z_$][\w$]*)\.map\(\s*\(?\s*([A-Za-z_$][\w$]*)\s*\)?\s*=>[\s\S]*?\/enrollment\/\$\{\2\.cycle\}[\s\S]*?productCode=\$\{\2\.productCode\}/g))
            .forEach(item => {
                (enrollmentProductMaps[item[1]] || []).forEach(product => addEndpoint(endpoints, product.cycle, product.productCode));
            });

        Array.from(activeSource.matchAll(/getEnrollmentCount\(\s*"https:\/\/"\s*\+\s*shopName2\s*\+\s*"\/enrollment\/"\s*\+\s*([A-Za-z_$][\w$]*)\s*\+\s*"\?productCode="\s*\+\s*([^)]+)\)/g))
            .forEach(item => addEndpoint(endpoints, readCycleValue(item[1], values, pathCycle), readTokenValue(item[2], values)));
        Array.from(activeSource.matchAll(/getEnrollmentCount\(\s*"https:\/\/"\s*\+\s*shopName2\s*\+\s*"\/enrollment\/\?productCode="\s*\+\s*([^)]+)\)/g))
            .forEach(item => addEndpoint(endpoints, null, readTokenValue(item[1], values)));
        Array.from(activeSource.matchAll(/getEnrollmentCount\(\s*"https:\/\/"\s*\+\s*shopName2\s*\+\s*"\/enrollment\/combined\?productCodes="\s*\+\s*([A-Za-z_$][\w$]*)\.join\(["'],["']\)\)/g))
            .forEach(item => {
                if (arrays[item[1]]) endpoints.add(`${shopApi}/enrollment/combined?productCodes=${arrays[item[1]].join(',')}`);
            });
        Array.from(activeSource.matchAll(/fetch\(\s*"https:\/\/"\s*\+\s*shopName2\s*\+\s*"\/enrollment\/"\s*\+\s*([A-Za-z_$][\w$]*)\s*\+\s*"\?productCode="\s*\+\s*([^)]+)\)/g))
            .forEach(item => addEndpoint(endpoints, readCycleValue(item[1], values, pathCycle), readTokenValue(item[2], values)));
        Array.from(activeSource.matchAll(/fetch\(\s*"https:\/\/"\s*\+\s*shopName2\s*\+\s*"\/enrollment\/\?productCode=(\d+)"\s*\)/g))
            .forEach(item => addEndpoint(endpoints, null, item[1]));
        Array.from(activeSource.matchAll(/fetch\(\s*"https:\/\/"\s*\+\s*shopName2\s*\+\s*"\/enrollment\/\?productCode="\s*\+\s*([^)]+)\)/g))
            .forEach(item => addEndpoint(endpoints, null, readTokenValue(item[1], values)));

        Array.from(activeSource.matchAll(/hsc\.acsfutureschool\.com\/api\/enrollments\/count\?product_code=\$\{([A-Za-z_$][\w$]*)\}/g))
            .forEach(item => addFutureSchoolEndpoint(endpoints, values[item[1]]));
        Array.from(activeSource.matchAll(/hsc\.acsfutureschool\.com\/api\/enrollments\/count\?product_code=(\d+)/g))
            .forEach(item => addFutureSchoolEndpoint(endpoints, item[1]));
        Array.from(activeSource.matchAll(/getAfsEnrollmentCount\(([^)]+)\)/g))
            .forEach(item => {
                const expression = item[1].trim();
                if (!expression.endsWith('.map(getAfsEnrollmentCount')) addFutureSchoolEndpoint(endpoints, readTokenValue(expression, values));
            });
        Array.from(activeSource.matchAll(/getB2a28EnrollmentCount\(\s*([^,\)]+)(?:\s*,\s*([^)]+))?\)/g))
            .forEach(item => {
                addEndpoint(
                    endpoints,
                    item[2] ? readCycleValue(item[2], values, pathCycle) : null,
                    readTokenValue(item[1], values)
                );
            });
        Array.from(activeSource.matchAll(/getB2a28AfsEnrollmentCount\(([^)]+)\)/g))
            .forEach(item => addFutureSchoolEndpoint(endpoints, readTokenValue(item[1], values)));
        Array.from(activeSource.matchAll(/\.\.\.([A-Za-z_$][\w$]*)\.map\(getAfsEnrollmentCount\)/g))
            .forEach(item => (arrays[item[1]] || []).forEach(code => addFutureSchoolEndpoint(endpoints, code)));

        if (/api\.acscamp\.com\/v1\/products\/sales-count/.test(activeSource)) {
            const cycleNumber = pathCycle ? Number(pathCycle.replace('Cycle-', '')) : 0;
            const literalPayloadPattern = /productGroup\s*:\s*["']([^"']+)["'][^}]*?productCode\s*:\s*["'](\d+)["']/g;
            let payloadMatch;
            while ((payloadMatch = literalPayloadPattern.exec(activeSource)) !== null) {
                addAcsCampEndpoint(endpoints, {
                    productGroup: payloadMatch[1],
                    productCode: payloadMatch[2]
                });
            }
            [
                ['phy28', 1000],
                ['math28', 1018],
                ['ebi28', 1036],
                ['chem28aloron', 1040],
                ['fahadbio28', 1056]
            ].forEach(([group, offset]) => {
                if (cycleNumber && new RegExp(`productGroup\\s*:\\s*["']${group}["']`).test(activeSource)) {
                    addAcsCampEndpoint(endpoints, {
                        productGroup: group,
                        productCode: String(offset + cycleNumber)
                    });
                }
            });
        }

        return Array.from(endpoints);
    }

    async function getLinkedPageSource(url) {
        const key = new URL(url, location.href).href;
        if (sourceCache.has(key)) return sourceCache.get(key);

        const sourcePromise = (async () => {
            const response = await fetch(key);
            if (!response.ok) return '';
            const html = await response.text();
            const scriptSources = Array.from(html.matchAll(/<script[^>]+src=["']([^"']*assets\/(?:info|ss)\.js[^"']*)["']/gi), item => item[1]);
            const fallbackSources = scriptSources.length ? scriptSources : ['assets/info.js', 'assets/ss.js'];
            const scripts = await Promise.all(fallbackSources.map(async src => {
                const scriptUrl = new URL(src, key).href;
                const scriptResponse = await fetch(scriptUrl);
                return scriptResponse.ok ? scriptResponse.text() : '';
            }));
            return scripts.join('\n');
        })();

        sourceCache.set(key, sourcePromise);
        return sourcePromise;
    }

    async function fetchCount(endpoint) {
        if (countCache.has(endpoint)) return countCache.get(endpoint);

        const cacheKey = countStoragePrefix + endpoint;
        try {
            const cached = JSON.parse(localStorage.getItem(cacheKey));
            if (cached && Date.now() - cached.timestamp < countCacheTtl) {
                const cachedPromise = Promise.resolve(Number(cached.count) || 0);
                countCache.set(endpoint, cachedPromise);
                return cachedPromise;
            }
        } catch (error) {
            try {
                localStorage.removeItem(cacheKey);
            } catch (storageError) {
                console.error('Enrollment count cache read failed:', storageError);
            }
        }

        const countPromise = (endpoint.startsWith(acsCampEndpointPrefix)
            ? fetch(acsCampApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: endpoint.slice(acsCampEndpointPrefix.length)
            })
            : fetch(endpoint))
            .then(response => response.json())
            .then(data => {
                const count = Number(data.count ?? data.salesCount ?? data.total ?? (data.data && (data.data.count ?? data.data.salesCount ?? data.data.total))) || 0;
                try {
                    localStorage.setItem(cacheKey, JSON.stringify({ count, timestamp: Date.now() }));
                } catch (error) {
                    console.error('Enrollment count cache write failed:', error);
                }
                return count;
            })
            .catch(error => {
                console.error('Enrollment count endpoint failed:', endpoint, error);
                return 0;
            });

        countCache.set(endpoint, countPromise);
        return countPromise;
    }

    async function updateTotalEnrollment() {
        const container = document.querySelector('.buttonContainer');
        if (!container) return;

        const allLinks = Array.from(container.querySelectorAll('a[href]')).filter(isCountableCourseLink);
        const cycleLinks = allLinks.filter(anchor => /\/Cycle-\d+\/?$/.test(new URL(anchor.href, location.href).pathname));
        const totalCycleFilter = (container.dataset.countTotalCycles || '')
            .split(',')
            .map(cycle => cycle.trim())
            .filter(Boolean);
        const filteredCycleLinks = totalCycleFilter.length
            ? cycleLinks.filter(anchor => totalCycleFilter.includes(getPathCycle(anchor.href)))
            : cycleLinks;
        const selectedLinks = totalCycleFilter.length
            ? filteredCycleLinks
            : (cycleLinks.length ? cycleLinks : allLinks);
        const links = Array.from(new Map(selectedLinks.map(anchor => [new URL(anchor.href, location.href).href, anchor])).values());
        if (!links.length) return;

        const badge = createBadge(container);
        try {
            const endpoints = [];
            const sources = await Promise.all(links.map(async anchor => ({
                href: anchor.href,
                source: await getLinkedPageSource(anchor.href)
            })));

            sources.forEach(({ source, href }) => {
                extractEnrollmentEndpoints(source, href).forEach(endpoint => endpoints.push(endpoint));
            });

            if (!endpoints.length) {
                badge.remove();
                return;
            }

            const counts = await Promise.all(endpoints.map(fetchCount));
            const total = counts.reduce((sum, count) => sum + count, 0);
            badge.classList.remove('is-loading');
            badge.textContent = `Total enrolled: ${total.toLocaleString('en-US')}`;
        } catch (error) {
            badge.classList.remove('is-loading');
            badge.classList.add('is-error');
            badge.textContent = 'Enrollment unavailable';
            console.error('Course total enrollment load failed:', error);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateTotalEnrollment);
    } else {
        updateTotalEnrollment();
    }
})();
