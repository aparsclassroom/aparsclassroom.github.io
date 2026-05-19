
const scriptURL = 'https://script.google.com/macros/s/AKfycbzoTH9QQTnUhBNFLp_5_I8AUOYMBtXbTdhvvtCNdsqwJb7NfB45JTz7mWmRCaHDC7zi/exec';

let ipDetails = "";

function formatBookingTime(timestamp) {
    if (!timestamp) return "Not available";

    const value = String(timestamp).trim();
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

function getBookingNumber(response) {
    if (!response) return "";

    return response.roll || response.Serial || response.serial ||
        (response.message && (response.message.Serial || response.message.roll)) || "";
}

function getInputValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : "";
}

function buildBookingFormData(form) {
    const formData = new FormData(form);

    formData.set("Phone", getInputValue("phone"));
    formData.set("UID", getInputValue("uid"));
    formData.set("Institute", getInputValue("college"));
    formData.set("IP Address", getInputValue("ip-details") || ipDetails);

    return formData;
}

fetch('https://json.geoiplookup.io/')
    .then((r) => {
        return r.json();
    })
    .then((res) => {
        var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
        ipDetails = a;
        if (document.getElementById("ip-details")) {
            document.getElementById("ip-details").value = a;
        }
    })
    .catch(() => {
        ipDetails = "No Ip Address Found 💔";
        if (document.getElementById("ip-details")) {
            document.getElementById("ip-details").value = ipDetails;
        }
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
        document.getElementById('moda').innerHTML = 'ফ্রি রেজিস্টার করো <i class="fas fa-arrow-right"></i>';
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
                                body: buildBookingFormData(form)
                            })
                            .then((res) => {
                                return res.json();
                            })
                            .then((val) => {
                                const bookingNumber = getBookingNumber(val);

                                if (val.code != 200 || !bookingNumber) {
                                    throw new Error(val.message || "Booking number was not returned.");
                                }

                                swal({
                                    title: "Successfully Booked 🥰",
                                    icon: "success",
                                    text: "Your Booking Number : " + bookingNumber,
                                    button: "Thank you"
                                }).then(() => {
                                    form.reset();
                                    return location.replace('https://www.facebook.com/groups/medicup26');
                                })
                            })

                        .catch((err) => {
                            document.getElementById('buy').innerText = "Register";

                            swal({
                                title: "Oh No 💔",
                                icon: "error",
                                text: err.message || "Your booking cancelled!\nPlease try again (later) 😶",
                                button: "Okay ☹"
                            })
                        })
                    })
                } else {
                    const bookingTime = formatBookingTime(dashboard.message.timestamp);

                    swal({
                        title: "Already Booked! ✔",
                        icon: "info",
                        text: "Hello "  + dashboard.message.username + "\nYour Booking Number : " + dashboard.message.Serial + "\nTime : " + bookingTime,
                        button: "Thank you"
                    }).then(() => {
                        return location.replace('https://www.facebook.com/groups/medicup26');
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
        document.getElementById('moda').addEventListener('click', () => {
            location.href = "/shop/dashboard/login?signInSuccessUrl=" + encodeURIComponent(location.href)
        })
        fetch(scriptURL + "?q=Indivisual&uid=unknown")
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
