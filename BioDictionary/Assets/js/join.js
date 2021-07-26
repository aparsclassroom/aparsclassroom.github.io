var app_firebase = {};
(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyDpX318g79F8msrHeEEifiSO06e5twwu9w",
        authDomain: "asg-biodictionary.firebaseapp.com",
        projectId: "asg-biodictionary",
        storageBucket: "asg-biodictionary.appspot.com",
        messagingSenderId: "342222541178",
        appId: "1:342222541178:web:d3ad1c34fdcdb71ad046c3",
        measurementId: "G-MQV49ZPHK7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;
    firebase.analytics();
})()

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("./");
                return;
            } else {
                const scriptURL = 'https://script.google.com/macros/s/AKfycbzB3guHEtsQeS3jNx45Y-sEZIrVsq-Rca3ABCCr8UvruRKv3-CH2CRuTwHDyGz-9ziGqg/exec';

                fetch(scriptURL + "?q=Indivisual&uid=" + user.uid)
                    .then((res) => {
                        return res.json();
                    })
                    .then((dashboard) => {
                        if (dashboard.code != 200) {
                            document.getElementById('uid').value = user.uid;
                            document.getElementById('email').value = user.email;
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
                            const form = document.forms['join']

                            form.addEventListener('submit', e => {
                                document.getElementById('apply').innerText = "Please Wait...";
                                e.preventDefault()
                                fetch(scriptURL, {
                                        method: 'POST',
                                        body: new FormData(form)
                                    })
                                    .then(() => {
                                        swal({
                                            title: "Submitted! 🥰",
                                            icon: "success",
                                            text: "Your request has been successfully submitted 🔥",
                                            button: "Close"
                                        }).then(() => {
                                            form.reset();
                                            return location.replace('./');
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
                                title: "Already Submitted!",
                                icon: "info",
                                text: "You have already submitted ✔\nYour Submission Serial : " + dashboard.message.Serial + "\nName : " + dashboard.message.username + "\nTime : " + dashboard.message.timestamp,
                                button: "Close"
                            }).then(() => {
                                return location.replace('./');
                            })
                        }

                    }).catch((err => {
                        swal({
                            title: "Oh No 💔",
                            icon: "error",
                            text: JSON.stringify(err),
                            button: "Okay ☹"
                        })
                    }))
            }
        } else {
            location.replace("./login.html");
        }
    })
}
window.onload = function() {
    initApp();
};