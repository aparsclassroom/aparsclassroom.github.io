let disOFF = 0;
let pendingPromoCode = null;
let existingPurchase = null;
let purchaseFormBound = false;
let couponApplied = false;
let couponApplying = false;
let userCanPurchase = false;

function normalizePhone(phone) {
    phone = phone.replace(/[\s-]/g, '');
    if (/^01[13-9]\d{8}$/.test(phone)) {
        return '+88' + phone;
    }
    if (/^8801[13-9]\d{8}$/.test(phone)) {
        return '+' + phone;
    }
    return phone;
}

function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function getPromoCode() {
    const promo = getURLParameter("promo");
    if (promo) {
        return promo;
    }
    if (typeof getCookie === "function") {
        return getCookie("promo");
    }
    return null;
}

function buildPriceHtml(price) {
    if (fix && Number(fix) > Number(price)) {
        return "<del style='color:red'> " + fix + "৳</del> " +
            "<span style='color:rgb(26, 185, 66);'>" + price + " ৳</span>";
    }
    return "<span style='color:rgb(26, 185, 66);'>" + price + "৳</span>";
}

function showCouponCopiedToast() {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #28a745;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        text-align: center;
        min-width: 200px;
        max-width: 90%;
        margin: 0 auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-size: 14px;
        white-space: nowrap;
    `;
    toast.textContent = 'Coupon copied';
    document.body.appendChild(toast);

    setTimeout(() => toast.style.opacity = '1', 10);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function updateCouponHint() {
    const hint = document.getElementById("ebi28CouponHint");
    if (!hint) {
        return;
    }
    if (!couponCode) {
        hint.innerHTML = "";
        return;
    }
    hint.innerHTML = `Use <strong class="copy-coupon" data-coupon="${couponCode}" style="cursor: pointer;">"${couponCode}"</strong> Coupon For ${couponDiscountText}`;
}

function updatePageForCourse() {
    document.title = productName + " | ASG Shop";
    document.getElementById('prod').innerText = productName;
    document.querySelectorAll("[data-ebi-selected-product]").forEach(element => {
        element.innerText = productName;
    });

    const prevPriceEl = document.getElementById('prevP');
    const currentPriceEl = document.getElementById('nop');
    const payableTextEl = document.getElementById('sprice');
    const priceInputEl = document.getElementById('price');
    const productCodeEl = document.getElementById('selectedProductCode');
    const cycleEl = document.getElementById('selectedCycle');
    const priceSummaryEl = document.getElementById('smp');

    if (prevPriceEl) prevPriceEl.innerText = fix || pls;
    if (currentPriceEl) currentPriceEl.innerText = pls + "৳";
    if (payableTextEl) payableTextEl.innerText = pls;
    if (priceInputEl) {
        priceInputEl.value = pls;
        priceInputEl.setAttribute("value", pls);
    }
    if (productCodeEl) productCodeEl.value = productCode;
    if (cycleEl) cycleEl.value = Cycle;
    if (priceSummaryEl) priceSummaryEl.innerHTML = buildPriceHtml(pls);
    updateCouponHint();

    if (window.jQuery) {
        jQuery('#price').val(pls);
        jQuery('#sprice').text(pls);
        jQuery('#nop').text(pls + "৳");
    }
}

function resetCoupon() {
    const cupV = document.getElementById('cupon');
    const cpn = document.getElementById("cpnCheck");
    disOFF = 0;
    couponApplied = false;
    if (cupV) {
        cupV.value = "";
        cupV.disabled = false;
    }
    if (cpn) {
        cpn.disabled = true;
        cpn.innerText = "Apply";
        cpn.style.cursor = "";
    }
    if (document.getElementById('disC')) document.getElementById('disC').value = "N/A";
    if (document.getElementById('coupnbosh')) document.getElementById('coupnbosh').style.display = "";
    if (document.getElementById('how')) document.getElementById('how').style.display = "none";
    updatePageForCourse();
    updatePurchaseButtonState();
}

function showCouponPanel() {
    const appBtn = document.getElementById("app");
    const cup = document.getElementById("cup");
    if (appBtn) appBtn.style.display = "none";
    if (cup) cup.style.display = "block";
}

function couponRequired() {
    return false;
}

function updatePurchaseButtonState() {
    const buyBtn = document.getElementById('buy');
    const shouldBlockPurchase = couponApplying || (couponRequired() && !couponApplied);
    if (buyBtn) {
        buyBtn.disabled = !userCanPurchase || shouldBlockPurchase;
    }

    const modalBtn = document.getElementById('moda');
    if (modalBtn) {
        modalBtn.disabled = userCanPurchase && shouldBlockPurchase;
    }
}

function setCouponApplyingState(isApplying, couponCode) {
    couponApplying = isApplying;
    updatePurchaseButtonState();

    if (!isApplying) {
        return;
    }

    const how = document.getElementById('how');
    if (how) {
        how.style.display = "block";
        how.innerHTML = `Applying coupon <span style="color:blue;">"${couponCode}"</span> ...`;
    }
}

function hideCouponHint() {
    const hint = document.getElementById("ebi28CouponHint");
    if (hint) {
        hint.innerHTML = "";
    }
}

function applyCouponCode(couponCode, options = {}) {
    if (!couponCode || couponApplied || couponApplying) {
        return Promise.resolve(false);
    }

    const cupV = document.getElementById('cupon');
    const cpnBtn = document.getElementById("cpnCheck");
    if (!cupV || !cpnBtn) {
        return Promise.resolve(false);
    }

    showCouponPanel();
    cupV.value = couponCode;
    cpnBtn.innerText = "Checking..";
    cupV.disabled = true;
    cpnBtn.disabled = true;
    setCouponApplyingState(true, couponCode);

    return fetch(cuponApi + '/' + couponCode.toUpperCase() + '/' + productCode)
        .then((res) => res.json())
        .then((loadedData) => {
            if (loadedData.status === "success") {
                const nes = pls - loadedData.Off;
                disOFF = loadedData.Off;
                couponApplied = true;
                document.getElementById('price').value = nes;
                document.getElementById('sprice').innerText = nes;
                cpnBtn.style.cursor = "not-allowed";
                cupV.value = loadedData.Cupon;
                document.getElementById('disC').value = loadedData.Cupon;
                cupV.disabled = true;
                cpnBtn.innerText = "Applied";
                document.getElementById('coupnbosh').style.display = "none";
                cpnBtn.disabled = true;
                const percent = Math.round(((parseInt(loadedData.Off) + (fix - pls)) / fix) * 100);
                document.getElementById('how').style.display = "block";
                document.getElementById('how').innerHTML = `<span style="color:red;">${percent}%</span> discount applied with coupon code <span style="color:blue;">"${loadedData.Cupon}"</span>`;
                document.getElementById('smp').innerHTML = buildPriceHtml(nes);
                document.getElementById("cup").style.display = "block";
                setCouponApplyingState(false);
                hideCouponHint();
                return true;
            }

            cpnBtn.innerText = "Apply";
            cupV.disabled = false;
            cpnBtn.disabled = false;
            cupV.value = "";
            setCouponApplyingState(false);
            if (document.getElementById('how')) document.getElementById('how').style.display = "none";
            if (options.showError !== false) {
                swal({
                    title: "Code not valid",
                    icon: "error",
                    button: "Ok"
                }).then(() => {
                    return notdis();
                });
            } else {
                notdis();
            }
            return false;
        }).catch(() => {
            cupV.value = "";
            cpnBtn.innerText = "Apply";
            cupV.disabled = false;
            cpnBtn.disabled = false;
            setCouponApplyingState(false);
            if (document.getElementById('how')) document.getElementById('how').style.display = "none";
            if (options.showError !== false) {
                swal({
                    title: "Cupon can't be Empty",
                    icon: "error",
                    button: "Ok"
                }).then(() => {
                    return notdis();
                });
            } else {
                notdis();
            }
            return false;
        });
}

function autoApplyLoggedInCoupon() {
    const couponToApply = pendingPromoCode || couponCode;
    if (!couponToApply) {
        return;
    }

    applyCouponCode(couponToApply, { showError: Boolean(pendingPromoCode) }).then(applied => {
        if (applied) {
            pendingPromoCode = null;
        }
    });
}

function getConfiguredProductCodes(codes) {
    return codes.filter(code => typeof code !== 'undefined' && code);
}

function checkPurchase(products, uid, cycle) {
    const filteredProducts = getConfiguredProductCodes(products);
    if (!filteredProducts.length) {
        return Promise.resolve({ status: 404 });
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const purchaseCheckUrl = cycle
        ? `https://${shopName2}/v3/purchase/multiple/${cycle}`
        : `https://${shopName2}/v3/purchase/multiple`;

    return fetch(purchaseCheckUrl, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            products: filteredProducts,
            uid
        }),
        redirect: 'follow'
    }).then(response => response.json());
}

function findExistingPurchase(results) {
    return results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value)
        .find(result => result.status === 200);
}

function checkBlockingPurchases(user) {
    const purchaseChecks = [
        checkPurchase(blockedNormalProducts, user.uid),
        ...blockedCycleProducts.map(check => checkPurchase(check.products, user.uid, check.cycle))
    ];

    return Promise.allSettled(purchaseChecks).then(results => {
        existingPurchase = findExistingPurchase(results) || null;
        return existingPurchase;
    });
}

function showExistingPurchase() {
    const invoice = existingPurchase && existingPurchase.invoices && existingPurchase.invoices[0]
        ? existingPurchase.invoices[0].invoice
        : "";

    swal({
        title: "Already Enrolled!",
        text: "You already purchased this cycle or the EBI all cycle combo.",
        icon: "success",
        button: invoice ? "View Informations" : "Ok"
    }).then(() => {
        if (invoice) {
            location.replace(invoice);
        }
    });
}

function buildPayload(user) {
    const mail = document.getElementById('email').value.toLowerCase().trim();
    const payload = {
        "productName": product,
        "Platform": Platform,
        "cus_name": document.getElementById('name').value.trim(),
        "cus_email": mail,
        "Institution": document.getElementById('college').value.trim(),
        "HSC": document.getElementById('hscBatch').value.trim(),
        "cus_phone": normalizePhone(document.getElementById('phone').value.trim()),
        "Cupon": document.getElementById('disC').value.trim(),
        'uid': user.uid,
        "affiliate": getCookie("affiliate"),
        "utm_id": getCookie("utm_id"),
        "utm_source": getCookie("utm_source"),
        "utm_medium": getCookie("utm_medium"),
        "utm_campaign": getCookie("utm_campaign"),
        "utm_term": getCookie("utm_term"),
        "utm_content": getCookie("utm_content"),
        "lead": getCookie("lead"),
        "Referrer": getCookie("Platform"),
        "Ip": getCookie("ip")
    };

    payload.Cycle = Cycle;

    return JSON.stringify(payload);
}

function submitPurchase(user) {
    if (couponApplying || (couponRequired() && !couponApplied)) {
        swal({
            title: "Applying coupon ...",
            text: "Please wait until the discount is applied.",
            icon: "info",
            button: "Ok"
        });
        updatePurchaseButtonState();
        return;
    }

    if (existingPurchase) {
        showExistingPurchase();
        return;
    }

    document.getElementById('buy').innerText = "Please wait....";
    document.getElementById("buy").disabled = true;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const initUrl = `https://${shopName2}/${Cycle}/${productCode}/init`;

    fetch(initUrl, {
        method: 'POST',
        headers: myHeaders,
        body: buildPayload(user),
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => {
            if (result != '{"status":404,"message":"Product Error"}' || result.status != 420) {
                document.getElementById('doc').innerHTML = result;
            } else {
                swal({
                    title: "Error",
                    icon: "https://i.postimg.cc/ncNLJcGR/under-maintenance.png",
                    text: "Please visit after 10 pm tonight",
                    button: "Ok"
                }).then(() => {
                    location.href = "/shop";
                });
            }
        })
        .catch(() => {
            swal({
                title: "Error",
                icon: "https://i.postimg.cc/ncNLJcGR/under-maintenance.png",
                text: "Please visit after 10 pm tonight",
                button: "Ok"
            }).then(() => {
                location.href = "/shop";
            });
        });
}

function bindPurchaseForm(user) {
    if (purchaseFormBound) {
        return;
    }
    purchaseFormBound = true;
    const form = document.forms['purchase'];
    form.addEventListener('submit', em => {
        em.preventDefault();
        submitPurchase(user);
    });
}

document.getElementById('email').addEventListener("input", function () {
    if (document.getElementById('email').validity.typeMismatch) {
        document.getElementById('email').setCustomValidity("We are expecting an e-mail address!");
    } else {
        document.getElementById('email').setCustomValidity("");
    }
});

document.getElementById('phone').addEventListener("input", function () {
    if (document.getElementById('phone').validity.patternMismatch) {
        document.getElementById('phone').setCustomValidity("Please enter a valid phone number (+8801XX XXX XXXX)!");
    } else {
        document.getElementById('phone').setCustomValidity("");
    }
});

document.addEventListener('click', function (event) {
    const coupon = event.target.closest('.copy-coupon');
    if (!coupon) {
        return;
    }
    const couponCode = coupon.getAttribute('data-coupon');
    document.querySelectorAll('.copy-coupon').forEach(item => {
        item.style.backgroundColor = '#ffffff';
    });

    const markCopied = () => {
        coupon.style.backgroundColor = '#e8f5e9';
        showCouponCopiedToast();
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(couponCode).then(markCopied).catch(() => {
            const cupV = document.getElementById('cupon');
            if (cupV) {
                cupV.value = couponCode;
                notdis();
            }
            markCopied();
        });
        return;
    }

    const cupV = document.getElementById('cupon');
    if (cupV) {
        cupV.value = couponCode;
        notdis();
    }
    markCopied();
});

updatePageForCourse();

document.getElementById("app").style.display = "none";
document.getElementById("cup").style.display = "none";
document.getElementById('moda').setAttribute("data-target", "#purchaseFrm");
document.getElementById('moda').innerHTML = 'এনরোল করো <i class="fas fa-arrow-right"></i>';
updatePurchaseButtonState();

const promoCode = getPromoCode();
if (promoCode) {
    pendingPromoCode = promoCode;
} else {
    document.getElementById("cup").style.display = "none";
    if (typeof delete_cookie === "function") {
        delete_cookie("promo");
    }
    notdis();
}

firebase.auth().onAuthStateChanged(function (e) {
    if (e) {
        const t = e.phoneNumber;
        const namex = e.displayName;
        const mail = e.email;
        document.getElementById('uid').value = e.uid;
        bindPurchaseForm(e);
        if (couponCode) {
            document.getElementById("app").style.display = "";
        }
        autoApplyLoggedInCoupon();

        checkBlockingPurchases(e).then(purchase => {
            if (purchase) {
                showExistingPurchase();
            }
        });

        if (t != null) {
            document.getElementById('phone').value = t;
            document.getElementById('phone').setAttribute("readonly", true);
        } else {
            document.getElementById('phone').value = "+880";
        }
        userCanPurchase = true;
        updatePurchaseButtonState();
        if (namex != null) {
            document.getElementById('name').value = namex;
        }
        if (mail != null) {
            document.getElementById('email').value = mail;
            document.getElementById('email').setAttribute("readonly", true);
        }
        firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                const claims = idTokenResult.claims;
                if (claims.HSC) {
                    document.getElementById('hscBatch').value = claims.HSC;
                }
                if (claims.Institution) {
                    document.getElementById('college').value = claims.Institution;
                }
            })
            .catch((error) => {
                console.error(error);
            });
        document.getElementById("app").addEventListener('click', () => {
            if (pendingPromoCode) {
                applyCouponCode(pendingPromoCode).then(applied => {
                    if (applied) {
                        pendingPromoCode = null;
                    }
                });
                return;
            }
            if (couponCode) {
                applyCouponCode(couponCode);
                pendingPromoCode = null;
                return;
            }
            showCouponPanel();
        });
    } else {
        userCanPurchase = false;
        updatePurchaseButtonState();
        document.getElementById('moda').innerHTML = 'কোর্সটি কিনুন <i class="fas fa-arrow-right"></i>';
        document.getElementById("app").style.display = "none";
        document.getElementById("cup").style.display = "none";
        document.getElementById('moda').addEventListener('click', () => {
            sessionStorage.setItem(product + '_potential', 'true');
            location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href);
        });
        document.getElementById("app").addEventListener("click", em => {
            em.preventDefault();
            document.location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href);
        });
    }
});

var cupon, cpn = document.getElementById("cpnCheck");

function func() {
    cupon = document.getElementById("cupon").value;
    notdis();
}

function notdis() {
    if (document.getElementById('cupon').value != "") {
        document.getElementById("cpnCheck").disabled = false;
    } else {
        document.getElementById("cpnCheck").disabled = true;
    }
}

function suc() {
    document.getElementById("cpnCheck").disabled = document.getElementById("cupon").value === "";
}

notdis();

cpn.addEventListener('click', (e) => {
    e.preventDefault();
    const cupV = document.getElementById('cupon');
    const cpnCode = cupV.value;
    applyCouponCode(cpnCode);
});
