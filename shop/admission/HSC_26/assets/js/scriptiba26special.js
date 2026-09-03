// Normalize phone number to +88XXXXXXXXXXX format
function normalizePhone(phone) {
    phone = phone.replace(/[\s-]/g, '');
    if (/^01[13-9]\d{8}$/.test(phone)) {
        return '+88' + phone;
    }
    if (/^8801[13-9]\d{8}$/.test(phone)) {
        return '+' + phone;
    }
    // already in correct format
    return phone;
}

// Function to get URL parameter value
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// This page only ever sells productCode — no books/shipping variant.
const productcode = productCode;

document.getElementById('sprice').innerText = pls;
document.getElementById('price').value = pls;
document.getElementById('nop').innerText = pls + "৳";

document.getElementById('email').addEventListener("input", function (event) {
    if (document.getElementById('email').validity.typeMismatch) {
      document.getElementById('email').setCustomValidity("We are expecting an e-mail address!");
    } else {
      document.getElementById('email').setCustomValidity("");
    }
  });
  
  document.getElementById('phone').addEventListener("input", function (event) {
    if (document.getElementById('phone').validity.patternMismatch) {
        document.getElementById('phone').setCustomValidity("Please enter a valid phone number (+8801XX XXX XXXX)!");
    } else {
        document.getElementById('phone').setCustomValidity("");
    }
  });

document.title = productName + " | ASG Shop";
document.getElementById('prod').innerText = productName;
document.getElementById('prevP').innerText = fix;

firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "products": [productCode, productCode2, productCode3],
            'uid': e.uid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${shopName2}/v3/purchase/multiple`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.status === 200) {
                    swal({
                        title: "Already Enrolled !",
                        icon: "success",
                        button: "View Informations"
                    }).then(() => {
                        location.replace(result.invoices[0].invoice);
                    })
                } else {
                    const form = document.forms['purchase']
                    form.addEventListener('submit', em => {
                        em.preventDefault();
                        var mail = document.getElementById('email').value.toLowerCase().trim();
                        document.getElementById('buy').innerText = "Please wait...."
                        document.getElementById("buy").disabled = true;
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        var rawData = {
                            "productName": product,
                            "Platform": Platform,
                            "cus_name": document.getElementById('name').value.trim(),
                            "cus_email": mail,
                            "Institution": document.getElementById('college').value.trim(),
                            "HSC": document.getElementById('hscBatch').value.trim(),
                            "cus_phone": normalizePhone(document.getElementById('phone').value.trim()),
                            "Cupon": document.getElementById('disC').value.trim(),
                            'uid': e.uid,
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
                            "Referrer": getCookie("Platform")
                        };

                        var raw = JSON.stringify(rawData);

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch(`https://${shopName2}/${productcode}/init`, requestOptions)
                            .then(response => {
                                return response.text()
                            })
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
                    })
                }
            }).catch(() => {
                const mfs = document.forms['purchase']
                mfs.addEventListener('submit', em => {
                    em.preventDefault();
                    var mail = document.getElementById('email').value.toLowerCase().trim();
                    document.getElementById('buy').innerText = "Please wait...."
                    document.getElementById("buy").disabled = true;
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    var rawData = {
                        "productName": product,
                        "Platform": Platform,
                        "cus_name": document.getElementById('name').value.trim(),
                        "cus_email": mail,
                        "Institution": document.getElementById('college').value.trim(),
                        "HSC": document.getElementById('hscBatch').value.trim(),
                        "cus_phone": normalizePhone(document.getElementById('phone').value.trim()),
                        "Cupon": document.getElementById('disC').value.trim(),
                        'uid': e.uid,
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
                        "Referrer": getCookie("Platform")
                    };

                    var raw = JSON.stringify(rawData);

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(`https://${shopName2}/${productcode}/init`, requestOptions)
                        .then(response => {
                            return response.text()
                        })
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
                })

            })
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
            // document.getElementById('name').setAttribute("readonly", true);
        }
        if (mail != null) {
            document.getElementById('email').value = mail
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
        document.getElementById('moda').innerHTML = `
        কোর্সটিতে এনরোল করো <i class="fas fa-arrow-right"></i>
        `;
    } else {
        document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "none",
            document.getElementById('moda').addEventListener('click', () => {
                sessionStorage.setItem(product + '_potential', 'true');
                location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
            })
        document.getElementById("app").addEventListener("click", e => { e.preventDefault(), document.location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href) });
    }
})
// ---------------------------------------------------------------------------
// Coupon handling — manual entry is disabled site-wide. Coupons are only
// ever applied automatically from a ?promo=... URL query generated by a
// calling agent. The input box / "Do you have a coupon?" toggle are kept
// permanently hidden regardless of state.
// ---------------------------------------------------------------------------
if (document.getElementById('app')) document.getElementById('app').style.display = 'none';
if (document.getElementById('cup')) document.getElementById('cup').style.display = 'none';
if (document.getElementById('addbooksdiv')) document.getElementById('addbooksdiv').style.display = 'none';
if (document.getElementById('shippingFields')) document.getElementById('shippingFields').style.display = 'none';

var disOFF = 0;

// Puts the purchase button ("moda") into / out of a loading state while a
// coupon is being validated, so the user can't click through mid-apply.
// Restoring only overwrites the button's HTML if nothing else (e.g. the
// firebase auth-state handler) already changed it in the meantime, to avoid
// a race between the two async flows.
const COUPON_LOADING_LABEL = 'কুপন প্রয়োগ হচ্ছে...';
function setPurchaseButtonLoading(isLoading) {
    const modaBtn = document.getElementById('moda');
    if (!modaBtn) return;
    if (isLoading) {
        modaBtn.dataset.preCouponHtml = modaBtn.innerHTML;
        modaBtn.disabled = true;
        modaBtn.innerHTML = COUPON_LOADING_LABEL;
    } else {
        modaBtn.disabled = false;
        if (modaBtn.innerHTML === COUPON_LOADING_LABEL && modaBtn.dataset.preCouponHtml !== undefined) {
            modaBtn.innerHTML = modaBtn.dataset.preCouponHtml;
        }
    }
}

// Validates and applies a coupon code that arrived via ?promo=... — no
// manual UI is ever shown or required for this.
function applyCouponFromURL(cpnCode) {
    setPurchaseButtonLoading(true);

    fetch(cuponApi + '/' + cpnCode.toUpperCase() + '/' + productcode)
        .then((res) => res.json())
        .then((loadedData) => {
            if (loadedData.status === "success") {
                var nes = pls - loadedData.Off;
                disOFF = loadedData.Off;
                document.getElementById('price').value = nes;
                document.getElementById('sprice').innerText = nes;
                document.getElementById('disC').value = loadedData.Cupon;
                if (document.getElementById('couponinfocenter')) document.getElementById('couponinfocenter').style.display = "none";
                if (document.getElementById('couponinfocenter2')) document.getElementById('couponinfocenter2').style.display = "none";
                document.getElementById('smp').innerHTML = "<del style='color:red'> " + fix + "৳</del> " + " <span style='color:rgb(26, 185, 66);;'>" + nes + " ৳</span>";
            } else {
                document.getElementById('disC').value = "";
                swal({
                    title: "Coupon Invalid",
                    icon: "error",
                    button: "Ok"
                });
            }
        })
        .catch(() => {
            document.getElementById('disC').value = "";
            swal({
                title: "Couldn't apply coupon, please refresh and try again",
                icon: "error",
                button: "Ok"
            });
        })
        .finally(() => {
            setPurchaseButtonLoading(false);
        });
}

const urlPromo = getURLParameter('promo');
if (urlPromo) {
    applyCouponFromURL(urlPromo);
}