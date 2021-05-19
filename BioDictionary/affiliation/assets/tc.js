var Mobile = document.getElementById('Mobile');
var Bkash = document.getElementById('bkash');
var Nagad = document.getElementById('nagad');
var Rocket = document.getElementById('rocket');

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("../index.html");
                return;
            } else {
                const script = 'https://script.google.com/macros/s/AKfycbz3HR1jUMIQP_FkLqL7XXaPg-ur8gq1k79RR5xexy7RBfOq4KHOrs6OtmRZ_MM50ymiTg/exec?q=cashout&uid='
                fetch(script + user.uid)
                    .then((res) => {
                        return res.json();
                    })
                    .then((dashboard) => {
                        if (dashboard.code === 200) {
                            let data = dashboard.data;
                            document.getElementById('contoller').innerText = data.Controler_Name;
                            document.getElementById('contollerInfo').innerText = data.Controler_Info;
                            document.getElementById('info').href = "tel:" + data.Controler_Info;
                            document.getElementById('CashOut').style.display = "block";
                            document.getElementById('Username').value = data.Name;
                            document.getElementById('email').value = user.email;
                            Mobile.value = data.Mobile;
                            document.getElementById('uid').value = user.uid;
                            document.getElementById('cash').placeholder = "Maximum : " + data.Remaning_in_Wallet;
                            document.getElementById('lmt').innerText = data.Remaning_in_Wallet;
                            Bkash.value = data.Bkash;
                            if (data.Nagad != "") {
                                Nagad.value = data.Nagad;
                            }
                            if (data.Rocket != "") {
                                Rocket.value = data.Rocket;
                            }
                            $.get('https://json.geoiplookup.io/', function(res) {
                                var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
                                document.getElementById("ip-details").value = a;
                            });
                            document.getElementById('aff').value = data.Affiliation_Token;
                            document.getElementById('serial').value = data.Serial;
                            const scriptURL = 'https://script.google.com/macros/s/AKfycbwYRFgEj07KNiCvhAHzaL4c02rk6IAydNU377SwcYhLi3QpdwPceGM6M8grloVHEgNI4w/exec'
                            const form = document.forms['CashOut']

                            form.addEventListener('submit', e => {
                                e.preventDefault()
                                fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                                    .then(() => {
                                        alert("Your request of cash out has been successfully saved 🥰 \nPlease wait for 24 hours. If you don't get any response then call the Affiliation Controller.")
                                        document.getElementById('CashOut').style.display = "none";
                                        document.getElementById('res').innerText = "You have just Sent a Cash Out Request 💰";
                                    })

                                .catch(error => alert('Error!', error.message))
                            })
                        } else if (dashboard.code === 400) {
                            document.getElementById('CashOut').style.display = "none";
                            document.getElementById('res').innerText = dashboard.message;
                        } else {
                            alert(dashboard.message + "\n\nYou are using a gifted account.\nPlease buy this app to use Zombie Mode.");
                            return location.replace("../index.html");
                        }

                    }).catch((err => {
                        console.log(err);
                    }))
            }
        } else {
            location.replace("../index.html");
        }
    })
}
window.onload = function() {
    initApp();
};