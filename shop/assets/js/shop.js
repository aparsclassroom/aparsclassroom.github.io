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
document.getElementById('price').value = pls;

firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "product": productCode,
            'uid': e.uid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${shopName2}/${productCode}/purchase`, requestOptions)
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
                        return location.replace(result.Invoice)
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
                        var raw = JSON.stringify({
                            "productName": product,
                            "Platform": Platform,
                            "cus_name": document.getElementById('name').value.trim(),
                            "cus_email": mail,
                            "Institution": document.getElementById('college').value.trim(),
                            "HSC": document.getElementById('hscBatch').value.trim(),
                            "cus_phone": document.getElementById('phone').value.trim(),
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
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch(`https://${shopName2}/${productCode}/init`, requestOptions)
                            .then(response => {
                                return response.text()
                            })
                            .then(result => {
                                if (result.status != 420) {
                                    document.getElementById('doc').innerHTML = result
                                } else {
                                    swal({
                                        title: result.message,
                                        icon: "error"
                                    }).then(() => {
                                        location.href = result.GatewayPageURL
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
                                    location.href = result.GatewayPageURL
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
                    var raw = JSON.stringify({
                        "productName": product,
                        "Platform": Platform,
                        "cus_name": document.getElementById('name').value.trim(),
                        "cus_email": mail,
                        "Institution": document.getElementById('college').value.trim(),
                        "HSC": document.getElementById('hscBatch').value.trim(),
                        "cus_phone": document.getElementById('phone').value.trim(),
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
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(`https://${shopName2}/${productCode}/init`, requestOptions)
                        .then(response => {
                            return response.text()
                        })
                        .then(result => {
                            if (result.status != 420) {
                                document.getElementById('doc').innerHTML = result
                            } else {
                                swal({
                                    title: result.message,
                                    icon: "error"
                                }).then(() => {
                                    location.href = result.GatewayPageURL
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
                                location.href = result.GatewayPageURL
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
        document.getElementById("app").addEventListener('click', () => {
            document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "block"
        })
    } else {
        document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "none",
            document.getElementById('moda').addEventListener('click', () => {
                sessionStorage.setItem(product + '_potential', 'true');
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
    fetch(cuponApi + '/' + cpnCode.toUpperCase() + '/' + product, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })
        .then((res) => {
            return res.json();
        })
        .then((loadedData) => {
            if (loadedData.status === "success") {
                var nes = pls - loadedData.Off;
                disOFF = loadedData.Off;
                document.getElementById('price').value = nes;
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