setTimeout(() => {
    $("#vid")[0].src += "1";
    $("#vid")[0].src;
}, 1000)


// var re = /^(?:\+?88)?01[13-9]\d{8}$/;
var re = /^(?:\+8801)?[13-9]\d{8}$/;

function testInfo(phoneNumberChk) {
    var OK = re.exec(phoneNumberChk.value);
    if (!OK) {
        document.getElementById('valid-feedback').innerHTML = '<span class="text-danger">Please Enter a Valid phone Number. <br>ex. +8801XXXXXXXXX</span>';
        document.getElementById('buy').disabled = true;
    } else {
        document.getElementById('valid-feedback').innerHTML = '<span class="text-success">✔ Valid Phone Number !</span>';
        document.getElementById('buy').disabled = false;
    }
}


document.title = product + " | ASG Shop";
document.getElementById('prod').innerText = product;
document.getElementById('prevP').innerText = fix;
document.getElementById('nop').innerText = pls + "৳";

firebase.auth().onAuthStateChanged(function(e) {
    if (e) {

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
                    localStorage.removeItem(product)
                    swal({
                        title: result.message,
                        icon: "success",
                        button: "View Informations"
                    }).then(() => {
                        return location.replace("./purchased")
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
                            "dicount_amount": disOFF,
                            "product": product,
                            "cus_name": document.getElementById('name').value.trim(),
                            "email": mail,
                            "college": document.getElementById('college').value.trim(),
                            "hsc": document.getElementById('hscBatch').value.trim(),
                            "phone": document.getElementById('phone').value.trim(),
                            "aff": localStorage.getItem(product).trim(),
                            "Cupon": document.getElementById('disC').value.trim(),
                            'uid': e.uid
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch(`https://${shopName}.herokuapp.com/${productCode}/init`, requestOptions)
                            .then(response => {
                                return response.text()
                            })
                            .then(result => {
                                if (result.status != 420) {
                                    location.href = result
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
                                }).then(() => {
                                    location.href = result.GatewayPageURL
                                })
                            });
                    })
                }
            })
        document.getElementById('moda').setAttribute("data-target", "#purchaseFrm");
        document.getElementById('moda').innerText = "Purchase Form";
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
        document.getElementById("app").style.display = "none", document.getElementById("cup").style.display = "block"
    } else document.getElementById("app").style.display = "block", document.getElementById("cup").style.display = "none",
        document.getElementById('moda').addEventListener('click', () => location.href = "../dashboard/login.html")
}), document.getElementById("app").addEventListener("click", e => { e.preventDefault(), document.location.href = "../dashboard/login.html" });