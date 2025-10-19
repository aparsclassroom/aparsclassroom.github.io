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
document.getElementById('nop').innerText = pls + "৳";
document.getElementById('sprice').innerText = pls;
document.getElementById('clockContainer').style.display = "none";

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

document.getElementById('addBooks').addEventListener('change', function () {
    const iswithbooks = this.checked;

    if (iswithbooks) {
        document.getElementById('prod').innerText = productName;
        document.getElementById('sprice').innerText = pls;
        //document.getElementById('price').value = pls;
        document.getElementById('nop').innerText = pls + "৳";
        productcode = productCode;


    } else {
        // Show confirmation modal before hiding fields
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        Swal.fire({
            title: 'Are you sure?',
            html: `
                <div style="margin-top: 10px;">
                    <p>আমাদের বইগুলো তোমার অ্যাডমিশন জার্নি আরও সহজ করবে</p>
                    <blockquote style="font-style: italic; color: #444;">"${randomQuote}"</blockquote>
                </div>
            `,
            imageUrl: 'https://i.postimg.cc/VNYBTDtZ/compact-series-1-1.jpg',
            showCancelButton: true,
            confirmButtonText: 'না আমি বই নিতে চাইনা',
            cancelButtonText: 'হ্যাঁ আমি বই নিতে চাই',
            customClass: {
                image: 'no-image-margin'
            },
            confirmButtonColor: '#e74c3c', // red button
            cancelButtonColor: '#4CBB17', //  green button
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed they don't want books
                document.getElementById('prod').innerText = productName2;
                document.getElementById('sprice').innerText = pls2;
                //document.getElementById('price').value = pls2;
                document.getElementById('nop').innerText = pls2 + "৳";
                productcode = productCode2;
            } else {
                // Re-check the checkbox if cancelled
                document.getElementById('addBooks').checked = true;
                document.getElementById('nop').innerText = pls + "৳";
                document.getElementById('sprice').innerText = pls;
                document.getElementById('price').value = pls;
                document.getElementById('nop').innerText = pls + "৳";
                productcode = productCode;
            }
        });
    }
});

firebase.auth().onAuthStateChanged(function (e) {
    if (e) {

        const branchApi = 'https://crm.apars.shop/branch/find/available-branches?productId=' + productCode;

        fetch(branchApi)
            .then((res) => {
                return res.json()
            })
            .then((options) => {
                if (options.status == 200) {
                    options.branchList.forEach((branch) => {
                        $('#branch').append(`<option value="${branch.text}" data-id="${branch.id}" data-address="${branch.address}" data-photo="${branch.photo}">${branch.text}</option>`)
                    })
                } else {
                    swal({
                        title: "Error",
                        icon: "error",
                        text: options.message
                    })
                }
            })


        $('#branch').on('change', function () {
            document.getElementById('clockContainer').style.display = "none";
            $('#batch').empty();
            $('#batch').append(`<option value="">--Select a Batch--</option>`)

            const branchId = $(this).find(':selected').data('id');
            if (!branchId) {
                document.getElementById('clockContainer').style.display = "none";
                document.getElementById("branchInfo").innerHTML = "";
                return;
            }

            document.getElementById("branchInfo").innerHTML = `
                <hr>
                <img src="${$(this).find(':selected').data('photo')}" width="100%">
                            <br>
                            <h3 class="text-center">${$(this).val()}</h3>
                            <p class="bangla">${$(this).find(':selected').data('address')}</p>
                        `;
            const batchApi = 'https://crm.apars.shop/branch/find/available-batches?branchId=' + branchId + '&productId=' + productCode;

            fetch(batchApi)
                .then((res) => {
                    return res.json()
                })
                .then((options) => {
                    $('#batch').empty();
                    if (options.status == 200) {
                        $('#batch').append(`<option value="">--Select a Batch--</option>`)
                        options.batchList.forEach((batch) => {
                            if (batch.disabled == false) {
                                $('#batch').append(`<option value="${batch.id}" data-time="${batch.time}">${batch.text} (${batch.students} / ${batch.max})</option>`)
                            } else {
                                $('#batch').append(`<option value="${batch.id}" data-time="${batch.time}" disabled>${batch.text} (Batch Full)</option>`)
                            }
                        })
                    }
                })
                .catch((err) => {
                    $('#batch').append(`<option value="">No Batch Available</option>`)
                })

            $('#batch').on('change', function () {
                if (!$(this).val()) {
                    document.getElementById('clockContainer').style.display = "none";
                    return;
                }
                document.getElementById('clockContainer').style.display = "block";
                const batchTime = $(this).find(':selected').data('time');
                d = batchTime.split(" - ")[0]; //object of date()
                hr = d.split(":")[0];
                min = d.split(":")[1];
                hr_rotation = 30 * hr + min / 2; //converting current time
                min_rotation = 6 * min;

                hour.style.transform = `rotate(${hr_rotation}deg)`;
                minute.style.transform = `rotate(${min_rotation}deg)`;
            })
        })

        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "products": [productCode, productCode2],
            'uid': e.uid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${shopName2}/v3/purchase/multiple/`, requestOptions).then(res => res.json())
            .then((result) => {
                if (result.status === 200) {
                    swal({
                        title: "Already Enrolled!",
                        icon: "success",
                        button: "View Informations"
                    }).then(() => {
                        location.replace(result.invoices[0].invoice);
                    });
                } else {
                    const form = document.forms['purchase'];
                    form.addEventListener('submit', em => {
                        em.preventDefault();
                        var mail = document.getElementById('email').value.toLowerCase().trim();
                        document.getElementById('buy').innerText = "Please wait...."
                        document.getElementById("buy").disabled = true;
                        const iswithbooks = document.getElementById('addBooks').checked;
                        const currentPrice = iswithbooks ? pls : pls2;
                        const discountAmount = document.getElementById('disC').value.trim() !== 'N/A' ? disOFF : 0;

                        // Init Checkout Event
                        dataLayer.push({
                            event: 'init_checkout',
                            ecommerce: {
                                items: [{
                                    item_id: iswithbooks ? productCode : productCode2,
                                    item_name: iswithbooks ? product : product2,
                                    price: currentPrice,
                                    discount: discountAmount,
                                    quantity: 1
                                }],
                                currency: 'BDT',
                                value: currentPrice - discountAmount
                            }
                        });

                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        var raw = JSON.stringify({
                            "productName": iswithbooks ? product : product2,
                            "Platform": Platform,
                            "cus_name": document.getElementById('name').value.trim(),
                            "cus_email": mail,
                            "Institution": document.getElementById('college').value.trim(),
                            "cus_phone": document.getElementById('phone').value.trim(),
                            "Cupon": document.getElementById('disC').value.trim(),
                            "BranchName": $('#branch').val(),
                            "BranchId": $('#branch').find(':selected').data('id'),
                            "BatchId": $('#batch').val(),
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
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };
                        let currentproductCode = iswithbooks ? productCode : productCode2;
                        fetch(`https://${shopName2}/v2/${currentproductCode}/init`, requestOptions)
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
                    const iswithbooks = document.getElementById('addBooks').checked;
                    const currentPrice = iswithbooks ? pls : pls2;
                    const discountAmount = document.getElementById('disC').value.trim() !== 'N/A' ? disOFF : 0;

                    // Init Checkout Event
                    dataLayer.push({
                        event: 'init_checkout',
                        ecommerce: {
                            items: [{
                                item_id: iswithbooks ? productCode : productCode2,
                                item_name: iswithbooks ? product : product2,
                                price: currentPrice,
                                discount: discountAmount,
                                quantity: 1
                            }],
                            currency: 'BDT',
                            value: currentPrice - discountAmount
                        }
                    });
                    var product = iswithbooks ? productCode : productCode2;
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    var raw = JSON.stringify({
                        "productName": product,
                        "Platform": Platform,
                        "cus_name": document.getElementById('name').value.trim(),
                        "cus_email": mail,
                        "Institution": document.getElementById('college').value.trim(),
                        "cus_phone": document.getElementById('phone').value.trim(),
                        "Cupon": document.getElementById('disC').value.trim(),
                        "BranchName": $('#branch').val(),
                        "BranchId": $('#branch').find(':selected').data('id'),
                        "BatchId": $('#batch').val(),
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
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };
                    let currentproductCode = iswithbooks ? productCode : productCode2;
                    fetch(`https://${shopName2}/v2/${currentproductCode}/init`, requestOptions)
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
                if (!claims.roll) {
                    fetch(`https://profile.aparsclassroom.com/profile/eligibility?uid=${firebase.auth().currentUser.uid}`)
                        .then(response => response.json())
                        .then((loadedData) => {
                            if (loadedData.status != 200) {
                                swal({
                                    title: "ASG SHOP Roll Missing !",
                                    icon: "info",
                                    text: "You have to update your Profile First",
                                    button: "Ok, Go To Profile Update"
                                }).then(() => {
                                    location.href = "/shop/dashboard"
                                    // location.href = "/shop/dashboard/?message=RollMissing&returnToCourse=" + encodeURIComponent(location.href)
                                })
                            } else {
                                document.getElementById('college').value = loadedData.Institution;

                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else {
                    if (claims.Institution) {
                        document.getElementById('college').value = claims.Institution;
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
        document.getElementById("app").addEventListener('click', () => {
            document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "block"
        })
        document.getElementById('moda').innerHTML = `
        কোর্সটিতে এনরোল করো <i class="fas fa-arrow-right"></i>
        `;
    } else {
        document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "none",
            document.getElementById('moda').addEventListener('click', () => {
                location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
            })
        document.getElementById("app").addEventListener("click", e => { e.preventDefault(), document.location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href) });
    }
})
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

function suc() { "" === document.getElementById("cupon").value ? document.getElementById("cpnCheck").disabled = !0 : document.getElementById("cpnCheck").disabled = !1 }
cpn.addEventListener('click', (e) => {
    e.preventDefault();
    const cupV = document.getElementById('cupon');
    const cpnCode = cupV.value;
    cpn.innerText = "Checking..";
    cupV.disabled = true;
    cpn.disabled = true;
    const iswithbooks = document.getElementById('addBooks').checked;
    fetch(cuponApi + '/' + cpnCode.toUpperCase() + '/' + productCode)
        .then((res) => {
            return res.json();
        })
        .then((loadedData) => {
            if (loadedData.status === "success") {
                iswithbooks ? nes = pls - loadedData.Off : nes = pls2 - loadedData.Off;
                disOFF = loadedData.Off;
                document.getElementById('sprice').innerText = nes;
                cpn.style.cursor = "not-allowed";
                cupV.value = loadedData.Cupon;
                document.getElementById('disC').value = loadedData.Cupon;
                cupV.disabled = true;
                cpn.innerText = "Applied ✔"
                document.getElementById('coupnbosh').style.display = "none";
                cpn.disabled = true;
                var percent = Math.round(((parseInt(loadedData.Off) + (fix - pls)) / fix) * 100);
                document.getElementById('how').style.display = "block";
                document.getElementById('how').innerHTML = `<span style="color:red;">${percent}%</span> discounted by <span style="color:blue;">"${loadedData.Cupon}"</span> promo code`;
                document.getElementById('smp').innerHTML = "<del style='color:red'> " + fix + "৳</del> " + " <span style='color:rgb(26, 185, 66);;'>" + nes + " ৳</span>";
                document.getElementById("cup").style.display = "block";
                return;
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
                    return notdis()
                })
            }
        }).catch(() => {
            document.getElementById('cupon').value = "";
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