setTimeout(() => {
    $("#vid")[0].src += "1";
    $("#vid")[0].src;
}, 1000)

let regSc = "^(?:\+?88)?01[13-9]\d{8}$";


document.title = product + " | ASG Shop";
document.getElementById('prod').innerText = product;
document.getElementById('prevP').innerText = fix;
document.getElementById('nop').innerText = pls + "৳";
document.getElementById('sprice').innerText = pls;
document.getElementById('price').value = pls;

firebase.auth().onAuthStateChanged(function(e) {
    if (e) {
        var str = window.location.search;
        var res = str.split("&")[0].substring(1, 16);
        if (res != "" && res != "aff-AAA") {
            swal({
                    title: "Are you satisfied ?",
                    icon: "warning",
                    text: "If you want to report this link please click 'Not Satisfied'",
                    closeOnClickOutside: false,
                    dangerMode: true,
                    buttons: ["I'm Satisfied 😍", "Not Satisfied 😡"]
                })
                .then((report) => {
                    if (report) {
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                        var urlencoded = new URLSearchParams();
                        urlencoded.append("Product", product);
                        urlencoded.append("Affiliate Code", res);
                        urlencoded.append("UID", e.uid);

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: urlencoded,
                            redirect: 'follow'
                        };
                        fetch(reportApi, requestOptions)
                            .then(response => {
                                return response.json()
                            })
                            .then((res) => {
                                $.notify({
                                    message: res.message
                                }, {
                                    type: 'danger',
                                    placement: {
                                        from: "top",
                                        align: 'center'
                                    }
                                });
                            }).catch((err) => {
                                swal({
                                    title: "Error",
                                    icon: "error",
                                    text: err.message,
                                    button: "Ok"
                                }).then(() => {
                                    location.reload()
                                })
                            })
                    } else {
                        localStorage.setItem(product, res);
                    }
                });
        } else {
            let ne = "aff-AAA";
            document.getElementById('aff').value = ne
            localStorage.setItem(product, ne);
        }

        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "product": product,
            'uid': e.uid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://${shopName}.herokuapp.com/${productCode}/purchase`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (result.code === 200) {
                    swal({
                        title: result.message,
                        icon: "success",
                        button: "View Informations"
                    }).then(() => {
                        return location.replace("./purchased")
                    })
                } else {
                    const form = document.forms['purchase']
                    form.addEventListener('submit', e => {
                        e.preventDefault();
                        var mail = document.getElementById('email').value.toLowerCase().trim();
                        document.getElementById('buy').innerText = "Please wait...."
                        document.getElementById("buy").disabled = true;
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        var raw = JSON.stringify({
                            "dicount_amount": disOFF,
                            "product": product,
                            "cus_name": document.getElementById('name').value.trim(),
                            "email": mail,
                            "college": document.getElementById('college').value.trim(),
                            "hsc": document.getElementById('hscBatch').value.trim(),
                            "phone": document.getElementById('phone').value.trim(),
                            "aff": document.getElementById('aff').value.trim(),
                            "Cupon": document.getElementById('disC').value.trim(),
                            'uid': document.getElementById('uid').value
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch(`https://${shopName}.herokuapp.com/${productCode}/init`, requestOptions)
                            .then(response => {
                                return response.json()
                            })
                            .then(result => {
                                if (result.status != 420) {
                                    location.href = result.GatewayPageURL
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
                                    icon: "error",
                                    text: "Server Busy 😶\nPlease Try Again later",
                                    button: "Ok"
                                })
                            });
                    })
                }
            })
        document.getElementById('moda').setAttribute("data-target", "#purchaseFrm");
        if (t != null) {
            document.getElementById('phone').value = t;
            document.getElementById('phone').setAttribute("readonly", true);
        } else {
            document.getElementById('phone').value = "+880";
        }
        if (namex != null) {
            document.getElementById('name').value = namex;
            document.getElementById('name').setAttribute("readonly", true);
        }
        if (mail != null) {
            document.getElementById('email').value = mail
            document.getElementById('email').setAttribute("readonly", true);
        }
        document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "block"
    } else document.getElementById("app").style.display = "block", document.getElementById("cup").style.display = "none",
        document.getElementById('moda').addEventListener('click', () => location.href = "../dashboard/login.html")
}), document.getElementById("app").addEventListener("click", e => { e.preventDefault(), document.location.href = "../dashboard/login.html" });
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
    cupV.value = "Checking..";
    cupV.disabled = true;
    cpn.disabled = true;
    fetch(cuponApi + '?Cupon=' + cpnCode.toUpperCase() + '&Product=' + product)
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
                cpn.disabled = true;
                var percent = Math.round(((parseInt(loadedData.Off) + (fix - pls)) / fix) * 100);
                document.getElementById('how').style.display = "block";
                document.getElementById('how').innerHTML = `<span style="color:red;">${percent}%</span> discounted by <span style="color:blue;">"${loadedData.Cupon}"</span> promo code`;
                document.getElementById('smp').innerHTML = "<del style='color:red'> " + fix + "৳</del> " + " <span style='color:rgb(26, 185, 66);;'>" + nes + " ৳</span>";
                swal({
                    title: "Alhamdulillah ❤",
                    icon: "success",
                    text: "Successfully applied!",
                    button: "Ok"
                })
                return;
            } else {
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