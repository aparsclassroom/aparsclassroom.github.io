//var link = 'http://localhost:8080';
var link = 'https://' + shopName2;

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

// Function to extract product code from promo parameter
function getProductCodeFromURL() {
    const promoParam = getURLParameter('promo');
    if (promoParam) {
        // Extract the product code (part after 'C-' and before the next '-')
        const match = promoParam.match(/C-(\d+)-/);
        if (match) {
            return match[1]; // Returns the captured group (the product code)
        }
    }
    return null;
}

// Each variant has its own coupon, so only advertise the one that applies —
// and neither once a coupon has already been applied.
function currentCouponInfoId() {
    return document.getElementById('addBooks').checked ? 'couponinfocenter2' : 'couponinfocenter';
}

function showCouponInfo(visibleId) {
    ['couponinfocenter', 'couponinfocenter2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (!appliedCoupon && id === visibleId) ? 'block' : 'none';
    });
}

const shippingInputs = () => [
    document.getElementById('ship_name'),
    document.getElementById('ship_phone'),
    document.getElementById('ship_add1'),
    document.getElementById('ship_city'),
    document.getElementById('ship_upzilla'),
];

// Get product code from URL and set initial state
const urlProductCode = getProductCodeFromURL();
let productcode;
let appliedCoupon = '';

function selectBooksVariant(withBooks) {
    productcode = withBooks ? productCode2 : productCode;
    document.getElementById('addBooks').checked = withBooks;
    document.getElementById('shippingFields').style.display = withBooks ? 'block' : 'none';
    setPackagePrice(withBooks ? pls2 : pls);
    shippingInputs().forEach(input => {
        withBooks ? input.setAttribute('required', '') : input.removeAttribute('required');
    });
    showCouponInfo(currentCouponInfoId());
    // A coupon is checked against one product code, so re-check it for the
    // variant that is now selected.
    if (appliedCoupon) {
        reapplyCoupon();
    }
}

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

document.getElementById('ship_phone').addEventListener("input", function (event) {
    if (this.validity.patternMismatch) {
        this.setCustomValidity("Please enter a valid phone number (+8801XX XXX XXXX)!");
    } else {
        this.setCustomValidity("");
    }
});

document.title = productName + " | ASG Shop";
document.getElementById('prod').innerText = productName;

const quotes = [
    "A reader lives a thousand lives before he dies.",
    "Books are a uniquely portable magic.",
    "Reading is essential for those who seek to rise above the ordinary.",
    "So many books, so little time.",
    "Books are the quietest and most constant of friends.",
    "A room without books is like a body without a soul.",
    "The more that you read, the more things you will know.",
    "Reading gives us someplace to go when we have to stay where we are."
];

// Regular price the discount is shown against — the books variant carries the
// book price on top of it.
function regularPrice() {
    return document.getElementById('addBooks').checked ? fix2 : fix;
}

// Rebuilds the whole price line, ids included, so it survives being redrawn
// after a coupon is applied.
function renderPrice(regular, amount) {
    document.getElementById('smp').innerHTML =
        "<del style=\"color: red;\"><span id=\"prevP\">" + regular + "</span>৳</del> " +
        "<span id=\"nop\" style=\"color: rgb(26, 185, 66);\">" + amount + "৳</span>";
}

function setPackagePrice(amount) {
    document.getElementById('sprice').innerText = amount;
    document.getElementById('price').value = amount;
    renderPrice(regularPrice(), amount);
}

// Start on the variant the promo link points at, books otherwise.
// Default to the standard course; select books only when its product code is
// explicitly provided in the URL.
selectBooksVariant(urlProductCode === productCode2);

// Add books checkbox event listener
document.getElementById('addBooks').addEventListener('change', function () {
    if (this.checked) {
        selectBooksVariant(true);
        return;
    }

    // Show confirmation modal before hiding fields
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    Swal.fire({
        title: 'Are you sure?',
        html: `
                <div>
                    <p>আমাদের কম্প্যাক্ট সিরিজের বইগুলো Medical ব্যাচের লেকচার কন্টেন্ট এর পরিপূরক</p>
                    <blockquote style="font-style: italic; color: #444;">"${randomQuote}"</blockquote>
                </div>
            `,
        imageUrl: '/assets/postimg/wv4Fk16m/compressed-image.jpg',
        showCancelButton: true,
        confirmButtonText: 'না আমি বই নিতে চাইনা',
        cancelButtonText: 'হ্যাঁ আমি বই নিতে চাই',
        customClass: {
            image: 'no-image-margin'
        },
        confirmButtonColor: '#e74c3c', // red button
        cancelButtonColor: '#4CBB17', //  green button
    }).then((result) => {
        // Only a confirm means the student really does not want the books.
        selectBooksVariant(!result.isConfirmed);
    });
});

firebase.auth().onAuthStateChanged(function (e) {
    if (e) {
        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // A course can be sold as several variants (with books, CX special, etc.).
        // Buying any of them counts as already enrolled, so check them all.
        var raw = JSON.stringify({
            "products": [productCode, productCode2, productCode3, productCode4, productCode5],
            'uid': e.uid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${link}/v3/purchase/multiple`, requestOptions)
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
                        submitPurchase(e);
                    })
                }
            }).catch(() => {
                const mfs = document.forms['purchase']
                mfs.addEventListener('submit', em => {
                    em.preventDefault();
                    submitPurchase(e);
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
        document.getElementById("app").addEventListener('click', () => {
            document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "block"
        })
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

function submitPurchase(e) {
    var mail = document.getElementById('email').value.toLowerCase().trim();
    document.getElementById('buy').innerText = "Please wait...."
    document.getElementById("buy").disabled = true;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const isShipping = document.getElementById('addBooks').checked;
    var rawData = {
        "productName": isShipping ? product2 : product,
        "Platform": isShipping ? Platform2 : Platform,
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

    if (isShipping) {
        rawData.ship_name = document.getElementById('ship_name').value.trim();
        rawData.ship_phone = normalizePhone(document.getElementById('ship_phone').value.trim());
        rawData.ship_add1 = document.getElementById('ship_add1').value.trim();
        rawData.ship_city = document.getElementById('ship_city').value;
        rawData.ship_upzilla = document.getElementById('ship_upzilla').value.trim();
        rawData.ship_method = 'Courier'
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(rawData),
        redirect: 'follow'
    };

    fetch(`${link}/${productcode}/init`, requestOptions)
        .then(response => {
            return response.text()
        })
        .then(result => {
            if (result != '{"status":404,"message":"Product Error"}' || result.status != 420) {
                document.getElementById('doc').innerHTML = result
            } else {
                maintenance()
            }
        })
        .catch(() => {
            maintenance()
        });
}

function maintenance() {
    swal({
        title: "Error",
        icon: "/assets/postimg/ncNLJcGR/under-maintenance.png",
        text: "Please visit after 10 pm tonight",
        button: "Ok"
    }).then(() => {
        location.href = "/shop"
    })
}

var cupon, cpn = document.getElementById("cpnCheck");

function func() {
    cupon = document.getElementById("cupon").value;
    notdis()
}

function notdis() {
    if (document.getElementById('cupon').value != "") {
        document.getElementById("cpnCheck").disabled = false;
    } else {
        document.getElementById("cpnCheck").disabled = true;
    }
}
notdis()
var disOFF = 0;

function resetCouponForm() {
    const cupV = document.getElementById('cupon');

    disOFF = 0;
    cupV.value = '';
    cupV.disabled = false;
    document.getElementById('disC').value = 'N/A';
    cpn.innerText = 'Apply';
    cpn.disabled = true;
    cpn.style.cursor = 'pointer';
    document.getElementById('coupnbosh').style.display = 'flex';
    document.getElementById('how').style.display = 'none';
    document.getElementById('cup').style.display = 'block';
    document.getElementById('app').style.display = 'none';
}

function reapplyCoupon() {
    const code = appliedCoupon;
    resetCouponForm();
    document.getElementById('cupon').value = code;
    notdis();
    cpn.click();
}

function suc() { "" === document.getElementById("cupon").value ? document.getElementById("cpnCheck").disabled = !0 : document.getElementById("cpnCheck").disabled = !1 }
cpn.addEventListener('click', (e) => {
    e.preventDefault();
    const cupV = document.getElementById('cupon');
    const cpnCode = cupV.value;
    cpn.innerText = "Checking..";
    cupV.disabled = true;
    cpn.disabled = true;
    const isShipping = document.getElementById('addBooks').checked;
    const base = isShipping ? pls2 : pls;
    const regular = isShipping ? fix2 : fix;
    fetch(cuponApi + '/' + cpnCode.toUpperCase() + '/' + productcode)
        .then((res) => {
            return res.json();
        })
        .then((loadedData) => {
            if (loadedData.status === "success") {
                var nes = base - loadedData.Off;
                disOFF = loadedData.Off;
                document.getElementById('price').value = nes;
                document.getElementById('sprice').innerText = nes;
                cpn.style.cursor = "not-allowed";
                cupV.value = loadedData.Cupon;
                document.getElementById('disC').value = loadedData.Cupon;
                cupV.disabled = true;
                cpn.innerText = "Applied ✔"
                document.getElementById('coupnbosh').style.display = "none";
                if (document.getElementById('cpninfo')) document.getElementById('cpninfo').style.display = "none";
                cpn.disabled = true;
                var percent = Math.round(((parseInt(loadedData.Off) + (regular - base)) / regular) * 100);
                document.getElementById('how').style.display = "block";
                document.getElementById('how').innerHTML = `<span style="color:red;">${percent}%</span> discounted by <span style="color:blue;">"${loadedData.Cupon}"</span> promo code`;
                renderPrice(regular, nes);
                document.getElementById("cup").style.display = "block";
                appliedCoupon = loadedData.Cupon;
                showCouponInfo(null);
                return;
            } else {
                cpn.innerText = "Apply";
                cupV.disabled = false;
                cpn.disabled = false;
                document.getElementById('cupon').value = "";
                appliedCoupon = '';
                showCouponInfo(currentCouponInfoId());
                swal({
                    title: "Code not valid",
                    icon: "error",
                    button: "Ok"
                }).then(() => {
                    return notdis()
                })
            }
        }).catch(() => {
            document.getElementById('cupon').value = "";
            appliedCoupon = '';
            showCouponInfo(currentCouponInfoId());
            swal({
                title: "Cupon can't be Empty 😶",
                icon: "error",
                button: "Ok"
            }).then(() => {
                return notdis()
            })
        })
})
if (queryPromo != null) {
    document.getElementById('cupon').value = getCookie("promo");
    notdis()
    document.getElementById("app").style.display = "none";
    cpn.click();
} else {

    document.getElementById("cup").style.display = "none";
    delete_cookie("promo");
    notdis()
}
