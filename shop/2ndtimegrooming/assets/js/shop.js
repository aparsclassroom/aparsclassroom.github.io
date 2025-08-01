const scriptURL = 'https://agri23.aparsclassroom.com/2ndtimegrooming/';
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

firebase.auth().onAuthStateChanged(function(e) {
    if (e) {

        var t = e.phoneNumber;
        var namex = e.displayName;
        var mail = e.email;
        document.getElementById('uid').value = e.uid;

        fetch(scriptURL + "getUser?q=Indivisual&uid=" + e.uid)
            .then((res) => {
                return res.json();
            })
            .then((dashboard) => {

                if (dashboard.code != 200) {
                    console.log(dashboard)
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
                        fetch(scriptURL + "setUser", {
                                method: 'POST',
                                body: new FormData(form)
                            })
                            .then((res) => {
                                return res.json();
                            })
                            .then((val) => {
                                swal({
                                    title: "Successfully Joined 🥰",
                                    icon: "success",
                                    text: "Your Serial Number : " + val.roll,
                                    button: "Access Facebook Group"
                                }).then(() => {
                                    form.reset();
                                    return location.replace('https://www.facebook.com/groups/2ndtimegroominh25');
                                })
                            })

                        .catch(() => {
                            swal({
                                title: "Oh No 💔",
                                icon: "error",
                                text: "Your joining cancelled!\nPlease try again (later) 😶",
                                button: "Okay ☹"
                            })
                        })
                    })
                } else {
                    swal({
                        title: "Already Joined! ✔",
                        icon: "info",
                        text: "Hello "  + dashboard.message.username + "\nYour Serial Number : " + dashboard.message.Serial + "\nTime : " + dashboard.message.timestamp,
                        button: "Visit Facebook group"
                    }).then(() => {
                        return location.replace('https://www.facebook.com/groups/2ndtimegroominh25');
                    })
                }

            }).catch((err => {
                console.log(err)
                document.getElementById('enrolled').innerHTML = `0 জন`;
                swal({
                    title: "Welcome",
                    icon: "info",
                    button: "Thanks 😃"
                })
            }))

        document.getElementById('moda').setAttribute("data-target", "#purchaseFrm");
        document.getElementById('moda').innerHTML = `
        কোর্সে জয়েন করো <i class="fas fa-arrow-right"></i>
        `;
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
        document.getElementById('moda').addEventListener('click', () => {
            location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
        })
        fetch(scriptURL + "getUser?q=Indivisual&uid=unknown")
        .then((res) => {
            return res.json();
        })
        .then((dashboard) => {
            document.getElementById('enrolled').setAttribute('countTo', dashboard.enrolled.enrolled);
            if (document.getElementById('enrolled')) {
                const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
                if (!countUp.error) {
                    countUp.start();
                } else {
                    console.error(countUp.error);
                }
            }
        })
    }

});