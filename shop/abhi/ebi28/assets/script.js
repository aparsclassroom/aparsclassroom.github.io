const ebi28Subjects = [
    { id: "bangla", label: "Bangla" },
    { id: "english", label: "English" },
    { id: "ict", label: "ICT" }
];

const ebi28MultiCoursePrice = 3000;
const ebi28MultiCourseCompareAt = 4500;
const ebi28SingleCoursePrice = 1500;
const ebi28SingleCourseCompareAt = 2000;

const ebi28Options = [
    {
        id: "bangla-english-ict",
        subjects: ["bangla", "english", "ict"],
        label: "Bangla + English + ICT",
        productName: "abhiebi28",
        fullName: "ACS HSC 28 EBI Course",
        productCode: "665",
        isCycleCourse: false,
        price: ebi28MultiCoursePrice,
        compareAt: ebi28MultiCourseCompareAt,
        couponCode: "ACSEBI250",
        couponDiscountText: "250 TAKA Discount",
        platform: Platform
    },
    {
        id: "bangla-english",
        subjects: ["bangla", "english"],
        label: "Bangla + English",
        productName: "ebi28combo1",
        fullName: "ACS HSC 28 EBI Course (COMBO 1)",
        productCode: "669",
        isCycleCourse: false,
        price: ebi28MultiCoursePrice,
        compareAt: ebi28MultiCourseCompareAt,
        couponCode: "ebi28combo1",
        couponDiscountText: "500 TAKA Discount",
        platform: Platform
    },
    {
        id: "bangla-ict",
        subjects: ["bangla", "ict"],
        label: "Bangla + ICT",
        productName: "ebi28combo2",
        fullName: "ACS HSC 28 EBI Course (COMBO 2)",
        productCode: "670",
        isCycleCourse: false,
        price: ebi28MultiCoursePrice,
        compareAt: ebi28MultiCourseCompareAt,
        couponCode: "ebi28combo2",
        couponDiscountText: "500 TAKA Discount",
        platform: Platform
    },
    {
        id: "english-ict",
        subjects: ["english", "ict"],
        label: "English + ICT",
        productName: "ebi28combo3",
        fullName: "ACS HSC 28 EBI Course (COMBO 3)",
        productCode: "671",
        isCycleCourse: false,
        price: ebi28MultiCoursePrice,
        compareAt: ebi28MultiCourseCompareAt,
        couponCode: "ebi28combo3",
        couponDiscountText: "500 TAKA Discount",
        platform: Platform
    },
    {
        id: "bangla",
        subjects: ["bangla"],
        label: "Bangla",
        productName: "singleebi28",
        fullName: "ACS HSC 28 EBI Course (BANGLA)",
        productCode: "668",
        isCycleCourse: true,
        cycle: "Cycle-3",
        price: ebi28SingleCoursePrice,
        compareAt: ebi28SingleCourseCompareAt,
        couponCode: "BANGLA250",
        couponDiscountText: "250 TAKA Discount",
        platform: Platform
    },
    {
        id: "english",
        subjects: ["english"],
        label: "English",
        productName: "singleebi28",
        fullName: "ACS HSC 28 EBI Course (ENGLISH)",
        productCode: "667",
        isCycleCourse: true,
        cycle: "Cycle-2",
        price: ebi28SingleCoursePrice,
        compareAt: ebi28SingleCourseCompareAt,
        couponCode: "ENGLISH250",
        couponDiscountText: "250 TAKA Discount",
        platform: Platform
    },
    {
        id: "ict",
        subjects: ["ict"],
        label: "ICT",
        productName: "singleebi28",
        fullName: "ACS HSC 28 EBI Course (ICT)",
        productCode: "666",
        isCycleCourse: true,
        cycle: "Cycle-1",
        price: ebi28SingleCoursePrice,
        compareAt: ebi28SingleCourseCompareAt,
        couponCode: "ICT250",
        couponDiscountText: "250 TAKA Discount",
        platform: Platform
    }
];

let selectedCourse = ebi28Options[0];
let selectedSubjects = ebi28Subjects.map(subject => subject.id);
let hasChosenCourse = false;
let disOFF = 0;
const purchasedCourses = {};
let prebooked = false;
let pendingPromoCode = null;

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

function buildPriceHtml(course, price) {
    if (course.compareAt && Number(course.compareAt) > Number(price)) {
        return "<del style='color:red'> " + course.compareAt + "৳</del> " +
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

function updateCouponHint(course) {
    const hint = document.getElementById("ebi28CouponHint");
    if (!hint) {
        return;
    }
    // Only show coupon hint if user is prebooked and has a coupon code
    if (!prebooked || !course.couponCode) {
        hint.innerHTML = "";
        return;
    }
    hint.innerHTML = `Use <strong class="copy-coupon" data-coupon="${course.couponCode}" style="cursor: pointer;">"${course.couponCode}"</strong> Coupon For ${course.couponDiscountText}`;
}

function updatePriceDisplay(course, price) {
    const finalPrice = Number(price);
    const prevPriceEl = document.getElementById('prevP');
    const currentPriceEl = document.getElementById('nop');
    const payableTextEl = document.getElementById('sprice');
    const priceInputEl = document.getElementById('price');
    const productCodeEl = document.getElementById('selectedProductCode');
    const cycleEl = document.getElementById('selectedCycle');
    const priceSummaryEl = document.getElementById('smp');

    if (prevPriceEl) prevPriceEl.innerText = course.compareAt || course.price;
    if (currentPriceEl) currentPriceEl.innerText = finalPrice + "৳";
    if (payableTextEl) payableTextEl.innerText = finalPrice;
    if (priceInputEl) {
        priceInputEl.value = finalPrice;
        priceInputEl.setAttribute("value", finalPrice);
    }
    if (productCodeEl) productCodeEl.value = course.productCode;
    if (cycleEl) cycleEl.value = course.cycle || "";
    if (priceSummaryEl) priceSummaryEl.innerHTML = buildPriceHtml(course, finalPrice);
    updateCouponHint(course);
    document.querySelectorAll("[data-ebi-selected-product]").forEach(element => {
        element.innerText = course.fullName || course.label;
    });
    if (window.jQuery) {
        jQuery('#price').val(finalPrice);
        jQuery('#sprice').text(finalPrice);
        jQuery('#nop').text(finalPrice + "৳");
    }
}

function resetCoupon() {
    const cupV = document.getElementById('cupon');
    const cpn = document.getElementById("cpnCheck");
    disOFF = 0;
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
}

function getCourseBySubjects(subjects) {
    const key = subjects.slice().sort().join("-");
    return ebi28Options.find(course => course.subjects.slice().sort().join("-") === key) || ebi28Options[0];
}

function setSelectedSubjects(subjects, shouldCheckPurchase = true) {
    const nextCourse = getCourseBySubjects(subjects);

    selectedSubjects = nextCourse.subjects.slice();
    selectedCourse = nextCourse;

    document.querySelectorAll('input[name="ebi28Subject"]').forEach(input => {
        input.checked = selectedSubjects.includes(input.value);
    });

    resetCoupon();
    updatePriceDisplay(nextCourse, nextCourse.price);
    updateSubjectChoiceSummary();

    if (shouldCheckPurchase && firebase.auth().currentUser) {
        checkAllPurchases(firebase.auth().currentUser);
    }
}

function updateSubjectChoiceSummary() {
    const summary = document.getElementById("ebi28SelectedSummary");
    const status = document.getElementById("ebi28SelectedStatus");
    const continueBtn = document.getElementById("ebi28ContinuePurchase");
    const checkedSubjects = Array.from(document.querySelectorAll('input[name="ebi28Subject"]:checked')).map(input => input.value);
    const nextCourse = checkedSubjects.length ? getCourseBySubjects(checkedSubjects) : null;

    if (summary) {
        summary.innerHTML = nextCourse
            ? `<strong>${nextCourse.fullName}</strong><span>${nextCourse.price}৳</span>`
            : "<strong>Please select at least one subject</strong><span>--</span>";
    }

    if (status) {
        const purchase = nextCourse ? purchasedCourses[nextCourse.id] : null;
        const purchasedSubjects = getPurchasedSubjects();
        const conflictingSubjects = nextCourse ? nextCourse.subjects.filter(s => purchasedSubjects.includes(s)) : [];
        
        if (conflictingSubjects.length > 0) {
            status.innerHTML = `<span style="color: #dc3545;">⚠️ Conflict: You already purchased ${conflictingSubjects.join(", ")}. Cannot purchase overlapping subjects.</span>`;
        } else if (purchase) {
            status.innerHTML = purchase.invoice 
                ? `Already purchased | <a href="${purchase.invoice}" target="_blank" rel="noopener noreferrer">View invoice</a>`
                : "Already purchased";
        } else {
            status.innerHTML = "";
        }
    }

    if (continueBtn) {
        continueBtn.disabled = !nextCourse || (nextCourse && nextCourse.subjects.some(s => getPurchasedSubjects().includes(s)));
    }
}

function setMainButtonForCourseChoice() {
    const mainButton = document.getElementById('moda');
    if (!mainButton) {
        return;
    }
    mainButton.setAttribute("data-target", "#ebi28SubjectModal");
    mainButton.innerHTML = 'Choose Course <i class="fas fa-arrow-right"></i>';
}

function setMainButtonForPayment() {
    const mainButton = document.getElementById('moda');
    if (!mainButton) {
        return;
    }
    mainButton.setAttribute("data-target", "#purchaseFrm");
    mainButton.innerHTML = 'Proceed Payment <i class="fas fa-arrow-right"></i>';
}

function renderSubjectChooser() {
    if (document.getElementById("ebi28SubjectModal")) {
        return;
    }

    const style = document.createElement("style");
    style.innerHTML = `
        .ebi28-subject-grid {
            display: grid;
            gap: 12px;
        }
        .ebi28-subject-option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            border: 1px solid #d7dde8;
            border-radius: 8px;
            padding: 14px 16px;
            margin: 0;
            cursor: pointer;
            background: #fff;
        }
        .ebi28-subject-option input {
            width: 18px;
            height: 18px;
            flex: 0 0 auto;
        }
        .ebi28-subject-option span {
            font-weight: 700;
            color: #25324b;
        }
        .ebi28-subject-summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            border: 1px solid #c7ead2;
            border-radius: 8px;
            padding: 12px 14px;
            margin-top: 16px;
            background: #f5fff8;
        }
        .ebi28-subject-summary strong,
        .ebi28-subject-summary span {
            display: block;
        }
        .ebi28-subject-summary span {
            color: rgb(26, 185, 66);
            font-weight: 800;
            white-space: nowrap;
        }
        .ebi28-selected-status {
            min-height: 20px;
            margin-top: 10px;
            color: #475569;
            font-size: 14px;
            font-weight: 600;
        }
        .ebi28-selected-status a {
            color: #0d6efd;
            text-decoration: underline;
        }
        @media only screen and (max-width: 600px) {
            .ebi28-subject-summary {
                align-items: flex-start;
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);

    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "ebi28SubjectModal";
    modal.tabIndex = -1;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "ebi28SubjectModalLabel");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ebi28SubjectModalLabel">Choose Course</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="ebi28-subject-grid">
                        ${ebi28Subjects.map(subject => `
                            <label class="ebi28-subject-option" for="ebi28-subject-${subject.id}">
                                <span>${subject.label}</span>
                                <input type="checkbox" name="ebi28Subject" id="ebi28-subject-${subject.id}" value="${subject.id}" checked>
                            </label>
                        `).join("")}
                    </div>
                    <div class="ebi28-subject-summary" id="ebi28SelectedSummary"></div>
                    <div class="ebi28-selected-status" id="ebi28SelectedStatus"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" id="ebi28ContinuePurchase">Continue</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("change", event => {
        if (!event.target.matches('input[name="ebi28Subject"]')) {
            return;
        }
        const checkedSubjects = Array.from(document.querySelectorAll('input[name="ebi28Subject"]:checked')).map(input => input.value);
        if (checkedSubjects.length) {
            selectedSubjects = checkedSubjects;
        }
        updateSubjectChoiceSummary();
        disableConflictingSubjects();
    });

    document.getElementById("ebi28ContinuePurchase").addEventListener("click", () => {
        const checkedSubjects = Array.from(document.querySelectorAll('input[name="ebi28Subject"]:checked')).map(input => input.value);
        if (!checkedSubjects.length) {
            swal({
                title: "Select a subject",
                text: "Please select at least one subject.",
                icon: "warning",
                button: "Ok"
            });
            return;
        }
        setSelectedSubjects(checkedSubjects);
        hasChosenCourse = true;
        if (purchasedCourses[selectedCourse.id]) {
            const invoice = purchasedCourses[selectedCourse.id].invoice;
            swal({
                title: "Already Purchased",
                text: "You already purchased this course.",
                icon: "success",
                button: invoice ? "View Invoice" : "Ok"
            }).then(() => {
                if (invoice) {
                    location.href = invoice;
                }
            });
            return;
        }
        $('#ebi28SubjectModal').modal('hide');
        // Now that the student has chosen a course, show the coupon button if they're prebooked
        if (prebooked) {
            const appBtn = document.getElementById("app");
            if (appBtn) appBtn.style.display = "";
        }
        setMainButtonForPayment();
    });

    setSelectedSubjects(selectedSubjects, false);
    disableConflictingSubjects();
}

function checkPurchase(user, course) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const purchaseUrl = course.isCycleCourse
        ? `https://${shopName2}/${course.productCode}/purchase/${course.cycle}`
        : `https://${shopName2}/${course.productCode}/purchase`;

    return fetch(purchaseUrl, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            "product": course.productCode,
            'uid': user.uid
        }),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => ({
            course,
            purchased: result.status === 200,
            invoice: result.Invoice || result.invoice || ""
        }))
        .catch(() => ({
            course,
            purchased: false,
            invoice: ""
        }));
}

function checkAllPurchases(user) {
    return Promise.all(ebi28Options.map(course => checkPurchase(user, course)))
        .then(results => {
            results.forEach(result => {
                if (result.purchased) {
                    purchasedCourses[result.course.id] = result;
                } else {
                    delete purchasedCourses[result.course.id];
                }
            });
            applyPurchaseStates();
        });
}

function getPurchasedSubjects() {
    const purchased = [];
    Object.keys(purchasedCourses).forEach(courseId => {
        const course = ebi28Options.find(c => c.id === courseId);
        if (course && course.subjects) {
            purchased.push(...course.subjects);
        }
    });
    return [...new Set(purchased)]; // deduplicate
}

function disableConflictingSubjects() {
    const purchasedSubjects = getPurchasedSubjects();
    document.querySelectorAll('input[name="ebi28Subject"]').forEach(input => {
        if (purchasedSubjects.includes(input.value)) {
            input.disabled = true;
            const label = input.closest('.ebi28-subject-option');
            if (label) {
                label.style.opacity = '0.5';
                label.style.cursor = 'not-allowed';
                label.style.pointerEvents = 'none';
            }
        } else {
            input.disabled = false;
            const label = input.closest('.ebi28-subject-option');
            if (label) {
                label.style.opacity = '1';
                label.style.cursor = 'pointer';
                label.style.pointerEvents = 'auto';
            }
        }
    });
}

function applyPurchaseStates() {
    updateSubjectChoiceSummary();
    disableConflictingSubjects();
}

function buildPayload(user) {
    const mail = document.getElementById('email').value.toLowerCase().trim();
    const payload = {
        "productName": selectedCourse.productName,
        "Platform": selectedCourse.platform,
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
    if (selectedCourse.isCycleCourse) {
        payload.Cycle = selectedCourse.cycle;
    }
    return JSON.stringify(payload);
}

function submitPurchase(user) {
    if (purchasedCourses[selectedCourse.id]) {
        const invoice = purchasedCourses[selectedCourse.id].invoice;
        swal({
            title: "Already Purchased",
            text: "You already purchased this course.",
            icon: "success",
            button: invoice ? "View Invoice" : "Ok"
        }).then(() => {
            if (invoice) {
                location.href = invoice;
            }
        });
        return;
    }

    document.getElementById('buy').innerText = "Please wait....";
    document.getElementById("buy").disabled = true;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const initUrl = selectedCourse.isCycleCourse
        ? `https://${shopName2}/${selectedCourse.cycle}/${selectedCourse.productCode}/init`
        : `https://${shopName2}/${selectedCourse.productCode}/init`;

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

document.title = productName + " | ASG Shop";
document.getElementById('prod').innerText = productName;
renderSubjectChooser();
updatePriceDisplay(selectedCourse, selectedCourse.price);

// Hide coupon button and input initially; they show only after course selection
document.getElementById("app").style.display = "none";
document.getElementById("cup").style.display = "none";

firebase.auth().onAuthStateChanged(function (e) {
    if (e) {
        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;
        checkAllPurchases(e);
        // verify whether this user pre-booked; we'll show the coupon button AFTER they choose a course
        checkPrebook(e.uid).then(flag => {
            prebooked = flag;
            if (!prebooked) {
                if (typeof delete_cookie === "function") {
                    delete_cookie("promo");
                }
            }
            // coupon button will be shown after course selection, not here
        });

        const form = document.forms['purchase'];
        form.addEventListener('submit', em => {
            em.preventDefault();
            submitPurchase(e);
        });

        if (hasChosenCourse) {
            setMainButtonForPayment();
        } else {
            setMainButtonForCourseChoice();
        }
        if (t != null) {
            document.getElementById('phone').value = t;
            document.getElementById('phone').setAttribute("readonly", true);
            document.getElementById('buy').disabled = false;
        } else {
            document.getElementById('phone').value = "+880";
        }
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
            const appBtn = document.getElementById("app");
            const cup = document.getElementById("cup");
            if (appBtn) appBtn.style.display = "none";
            if (cup) cup.style.display = "block";
            // apply pending promo only after user reveals the input and only if they're prebooked
            if (pendingPromoCode && prebooked) {
                const cupInput = document.getElementById('cupon');
                if (cupInput) cupInput.value = pendingPromoCode;
                notdis();
                const cpnEl = document.getElementById('cpnCheck');
                if (cpnEl) cpnEl.click();
                pendingPromoCode = null;
            }
        });
    } else {
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

// App Script endpoint used by prebook checks (same as used in prebook.js)
const scriptURL = 'https://script.google.com/macros/s/AKfycbx7HDVJzLKurAITEGXgDg6RsdJbR064bzISsvvWQUivw3gzVmXDws7TOkjdNM2OHNxY/exec';

function checkPrebook(uid) {
    if (!uid) return Promise.resolve(false);
    return fetch(scriptURL + "?q=Indivisual&uid=" + encodeURIComponent(uid))
        .then(res => res.json())
        .then(dashboard => {
            return dashboard && dashboard.code === 200;
        })
        .catch(() => false);
}

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
    cpn.innerText = "Checking..";
    cupV.disabled = true;
    cpn.disabled = true;

    fetch(cuponApi + '/' + cpnCode.toUpperCase() + '/' + selectedCourse.productCode)
        .then((res) => res.json())
        .then((loadedData) => {
            if (loadedData.status === "success") {
                var nes = selectedCourse.price - loadedData.Off;
                disOFF = loadedData.Off;
                document.getElementById('price').value = nes;
                document.getElementById('sprice').innerText = nes;
                cpn.style.cursor = "not-allowed";
                cupV.value = loadedData.Cupon;
                document.getElementById('disC').value = loadedData.Cupon;
                cupV.disabled = true;
                cpn.innerText = "Applied";
                document.getElementById('coupnbosh').style.display = "none";
                cpn.disabled = true;
                var percent = Math.round(((parseInt(loadedData.Off) + (selectedCourse.compareAt - selectedCourse.price)) / selectedCourse.compareAt) * 100);
                document.getElementById('how').style.display = "block";
                document.getElementById('how').innerHTML = `<span style="color:red;">${percent}%</span> discounted by <span style="color:blue;">"${loadedData.Cupon}"</span> promo code`;
                document.getElementById('smp').innerHTML = buildPriceHtml(selectedCourse, nes);
                document.getElementById("cup").style.display = "block";
                return;
            }
            cpn.innerText = "Apply";
            cupV.disabled = false;
            cpn.disabled = false;
            document.getElementById('cupon').value = "";
            swal({
                title: "Code not valid",
                icon: "error",
                button: "Ok"
            }).then(() => {
                return notdis();
            });
        }).catch(() => {
            document.getElementById('cupon').value = "";
            swal({
                title: "Cupon can't be Empty",
                icon: "error",
                button: "Ok"
            }).then(() => {
                return notdis();
            });
        });
});

const promoCode = getPromoCode();
if (promoCode) {
    // defer applying promo until we verify the signed-in user's prebooking
    pendingPromoCode = promoCode;
} else {
    document.getElementById("cup").style.display = "none";
    if (typeof delete_cookie === "function") {
        delete_cookie("promo");
    }
    notdis();
}

// If user is already signed in, check prebooking (button will be shown after course selection)
if (firebase && firebase.auth && firebase.auth().currentUser) {
    const user = firebase.auth().currentUser;
    checkPrebook(user.uid).then(flag => {
        prebooked = flag;
        if (!prebooked) {
            if (typeof delete_cookie === "function") {
                delete_cookie("promo");
            }
        }
        // do not show the coupon button here; it will be shown after course selection
    });
}
