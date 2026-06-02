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

const productSuffix = typeof productDisplaySuffix !== 'undefined' ? productDisplaySuffix : "";
document.title = productSuffix ? productName + " | ASG Shop" : productName + " | ASG Shop";
document.getElementById('prod').innerHTML = productSuffix ? `${productName}<br>(${productSuffix})` : productName;
document.getElementById('prevP').innerText = fix;
document.getElementById('nop').innerText = pls + "৳";
document.getElementById('sprice').innerText = pls;
document.getElementById('price').value = pls;

function buildPurchasePayload(user) {
    return {
        "productName": product,
        "Platform": Platform,
        "cus_name": document.getElementById('name').value.trim(),
        "cus_email": document.getElementById('email').value.toLowerCase().trim(),
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
        "Referrer": getCookie("Referrer"),
        "Ip": getCookie("ip"),
        "PlatformReferrer": getCookie("Platform")
    };
}

function submitPurchase(user) {
    const raw = JSON.stringify(buildPurchasePayload(user));
    const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: raw,
        redirect: 'follow'
    };

    fetch(`https://${shopName2}/${productCode}/init`, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result != '{"status":404,"message":"Product Error"}' || result.status != 420) {
                document.getElementById('doc').innerHTML = result
            } else {
                swal({
                    title: "Error",
                    icon: "https://i.postimg.cc/ncNLJcGR/under-maintenance.png",
                    text: "Please visit after 10 pm tonight",
                    button: "Ok"
                }).then(() => {
                    location.href = "/shop"
                })
            }
        })
        .catch(() => {
            swal({
                title: "Error",
                icon: "https://i.postimg.cc/ncNLJcGR/under-maintenance.png",
                text: "Please visit after 10 pm tonight",
                button: "Ok"
            }).then(() => {
                location.href = "/shop"
            })
        });
}

function attachPurchaseSubmit(user) {
    const form = document.forms['purchase'];
    form.addEventListener('submit', em => {
        em.preventDefault();
        document.getElementById('buy').innerText = "Please wait....";
        document.getElementById("buy").disabled = true;
        submitPurchase(user);
    });
}

const blockedCyclePurchaseChecks = [
    { cycle: "Cycle-1", products: ["650", "465"] },
    { cycle: "Cycle-2", products: ["652", "656"] },
    { cycle: "Cycle-3", products: ["652", "656"] },
    { cycle: "Cycle-4", products: ["653"] },
    { cycle: "Cycle-5", products: ["654", "657"] },
    { cycle: "Cycle-6", products: ["772", "773"] }
];

function checkPurchase(products, uid, cycle) {
    const purchaseCheckUrl = cycle
        ? `https://${shopName2}/v3/purchase/multiple/${cycle}`
        : `https://${shopName2}/v3/purchase/multiple`;

    return fetch(purchaseCheckUrl, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            products,
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

firebase.auth().onAuthStateChanged(function (e) {
    if (e) {
        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;
        const purchaseChecks = [
            checkPurchase([productCode], e.uid),
            ...blockedCyclePurchaseChecks.map(check => checkPurchase(check.products, e.uid, check.cycle))
        ];

        Promise.allSettled(purchaseChecks)
            .then(results => {
                const existingPurchase = findExistingPurchase(results);
                if (existingPurchase) {
                    swal({
                        title: "Already Enrolled !",
                        text: "You already bought this combo or one of its individual cycles.",
                        icon: "success",
                        button: "View Informations"
                    }).then(() => {
                        location.replace(existingPurchase.invoices[0].invoice);
                    })
                } else {
                    attachPurchaseSubmit(e);
                }
            })
            .catch(() => {
                attachPurchaseSubmit(e);
            });

        document.getElementById('moda').setAttribute("data-target", "#purchaseFrm");
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
            document.getElementById("app").style.display = "none";
            document.getElementById("cup").style.display = "block";
        });
    } else {
        document.getElementById("app").style.display = "none";
        document.getElementById("cup").style.display = "none";
        document.getElementById('moda').addEventListener('click', () => {
            sessionStorage.setItem(product + '_potential', 'true');
            location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href);
        });
        document.getElementById("app").addEventListener("click", e => {
            e.preventDefault();
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
    document.getElementById("cpnCheck").disabled = document.getElementById('cupon').value === "";
}

notdis();

function suc() {
    document.getElementById("cpnCheck").disabled = document.getElementById("cupon").value === "";
}

cpn.addEventListener('click', (e) => {
    e.preventDefault();
    const cupV = document.getElementById('cupon');
    const cpnCode = cupV.value;
    cpn.innerText = "Checking..";
    cupV.disabled = true;
    cpn.disabled = true;
    fetch(cuponApi + '/' + cpnCode.toUpperCase() + '/' + productCode)
        .then(res => res.json())
        .then((loadedData) => {
            if (loadedData.status === "success") {
                const nes = pls - loadedData.Off;
                document.getElementById('price').value = nes;
                document.getElementById('sprice').innerText = nes;
                cpn.style.cursor = "not-allowed";
                cupV.value = loadedData.Cupon;
                document.getElementById('disC').value = loadedData.Cupon;
                cupV.disabled = true;
                cpn.innerText = "Applied";
                document.getElementById('coupnbosh').style.display = "none";
                cpn.disabled = true;
                const percent = Math.round(((parseInt(loadedData.Off) + (fix - pls)) / fix) * 100);
                document.getElementById('how').style.display = "block";
                document.getElementById('how').innerHTML = `<span style="color:red;">${percent}%</span> discounted by <span style="color:blue;">"${loadedData.Cupon}"</span> promo code`;
                document.getElementById('smp').innerHTML = "<del style='color:red'> " + fix + "৳</del> " + " <span style='color:rgb(26, 185, 66);;'>" + nes + " ৳</span>";
                document.getElementById("cup").style.display = "block";
            } else {
                cpn.innerText = "Apply";
                cupV.disabled = false;
                cpn.disabled = false;
                document.getElementById('cupon').value = "";
                swal({
                    title: "Code not valid",
                    icon: "error",
                    button: "Ok"
                }).then(() => {
                    notdis();
                })
            }
        }).catch(() => {
            document.getElementById('cupon').value = "";
            swal({
                title: "Cupon can't be Empty",
                icon: "error",
                button: "Ok"
            }).then(() => {
                notdis();
            })
        })
});

const urlPromo = getURLParameter('promo') || getCookie("promo");
if (urlPromo) {
    document.getElementById('cupon').value = urlPromo;
    notdis();
    document.getElementById("app").style.display = "none";
    cpn.click();
} else {
    document.getElementById("cup").style.display = "none";
    if (typeof delete_cookie === 'function') {
        delete_cookie("promo");
    }
    notdis();
}
