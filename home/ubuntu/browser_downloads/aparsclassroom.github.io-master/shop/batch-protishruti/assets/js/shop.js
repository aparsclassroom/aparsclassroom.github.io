setTimeout(() => {
    $("#vid")[0].src += "1";
    $("#vid")[0].src;
}, 1000)
fetch('https://json.geoiplookup.io/')
    .then((r) => {
        return r.json();
    })
    .then((res) => {
        var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
        document.getElementById("ip-details").value = a;
    })
    .catch(() => {
        document.getElementById("ip-details").value = "No Ip Address Found 💔";
    });
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

        const scriptURL = 'https://script.google.com/macros/s/AKfycbwh7Pkvn7t_W-u0kuuEss9f3e_t52YkoeH9OgvuB3kpBEvDndAZHumBRxAFhwC3c_A/exec';
        fetch(scriptURL + "?q=Indivisual&uid=" + e.uid)
            .then((res) => {
                return res.json();
            })
            .then((dashboard) => {

                if (dashboard.code != 200) {
                    document.getElementById('enrolled').setAttribute('countTo', dashboard.enrolled.enrolled);
                    if (document.getElementById('enrolled')) {
                        const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
                        if (!countUp.error) {
                            countUp.start();
                        } else {
                            console.error(countUp.error);
                        }
                    }
                    const form = document.forms['purchase']

                    form.addEventListener('submit', e => {
                        document.getElementById('buy').innerText = "Please Wait...";
                        e.preventDefault()
                        fetch(scriptURL, {
                                method: 'POST',
                                body: new FormData(form)
                            })
                            .then((res) => {
                                return res.json();
                            })
                            .then((val) => {
                                swal({
                                    title: "Successfully Enrolled 🥰",
                                    icon: "success",
                                    text: "Your Roll Number : " + val.roll,
                                    button: "Join Facebook Group"
                                }).then(() => {
                                    form.reset();
                                    return location.replace('https://www.facebook.com/groups/batch.protishruti.ac');
                                })
                            })

                        .catch(() => {
                            swal({
                                title: "Oh No 💔",
                                icon: "error",
                                text: "Your application didn't Submit!\nPlease try again (later) 😶",
                                button: "Okay ☹"
                            })
                        })
                    })
                } else {
                    swal({
                        title: "Already Enrolled!",
                        icon: "info",
                        text: "You have already Enrolled ✔\nYour Roll Number : " + dashboard.message.Serial + "\nName : " + dashboard.message.username + "\nTime : " + dashboard.message.timestamp,
                        button: "Visit Facebook Group"
                    }).then(() => {
                        return location.replace('https://www.facebook.com/groups/batch.protishruti.ac');
                    })
                }

            }).catch((err => {
                document.getElementById('enrolled').innerHTML = `0 জন`;
                swal({
                    title: "Welcome",
                    icon: "info",
                    button: "Thanks 😃"
                })
            }))

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
    } else {
        document.getElementById('moda').addEventListener('click', () => location.href = "/shop/dashboard/login.html")
    }

});