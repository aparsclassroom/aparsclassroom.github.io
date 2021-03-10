function logOut() {
    firebase.auth().signOut();
    initApp();
}
var verl1, verl2, verl3, verl4, verl5;

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            fetch('https://script.google.com/macros/s/AKfycbynylOid2GFjXCvErwpnpg-IcvgeT5Rz3gcoFdRAZVO8hv8PH8luqCAl7nMszSEVvit/exec')
                .then((res) => {
                    return res.json();
                })
                .then((loadedData) => {
                    loadedData.find(dashboard => {
                        if (dashboard.UID === user.uid) {
                            verl1 = dashboard.Verified_Income_of_Link_1;
                            verl2 = dashboard.Verified_Income_of_Link_2;
                            verl3 = dashboard.Verified_Income_of_Link_3;
                            verl4 = dashboard.Verified_Income_of_Link_4;
                            verl5 = dashboard.Verified_Income_of_Link_5;
                            var totalv = verl1 + verl2 + verl3 + verl4 + verl5;
                            var wallet = (totalv - dashboard.cashOut);
                            document.getElementById('contoller').innerText = dashboard.Controler_Name;
                            document.getElementById('contollerInfo').innerText = dashboard.Controler_Info;
                            document.getElementById('info').href = "tel:" + dashboard.Controler_Info;
                            document.getElementById('Username').value = dashboard.Name;
                            document.getElementById('email').value = dashboard.Email;
                            document.getElementById('nid').value = dashboard.NID;
                            document.getElementById('uid').value = dashboard.UID;
                            document.getElementById('cash').placeholder = "Maximum : " + wallet;
                            document.getElementById('lmt').innerText = wallet;
                            document.getElementById('clg').value = dashboard.College_University;
                            document.getElementById('mbl1').value = dashboard.Mobile_1;
                            document.getElementById('bkash').value = dashboard.Bkash;
                            if (dashboard.Mobile_2 != "") {
                                document.getElementById('mbl2').value = dashboard.Mobile_2;
                            }
                            if (dashboard.Nagad != "") {
                                document.getElementById('nagad').value = dashboard.Nagad;
                            }
                            if (dashboard.Rocket != "") {
                                document.getElementById('rocket').value = dashboard.Rocket;
                            }
                            document.getElementById('aff').value = dashboard.Id;
                            document.getElementById('serial').value = dashboard.Serial;
                        }
                    })
                }).catch((err => {
                    console.log(err);
                }))
        } else {
            document.location.replace("index.html");
        }
    })
}
window.onload = function() {
    initApp();
};


$.get('https://json.geoiplookup.io/', function(res) {
    var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
    document.getElementById("ip-details").value = a;
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbzt6RkjmEmuJhLf4_we4ytGJ2T6qQJrLp2-KtWiJvgQK5er-JYeAsggaOnQkQSZYwrBSQ/exec'
const form = document.forms['CashOut']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            alert("Your request of cash out has been successfully saved 🥰 \nPlease wait for 24 hours. If you don't get any response then call the Affiliation Controller.")
            document.getElementById('CashOut').style.display = "none";
            document.getElementById('res').innerText = "You have just Sent an Cash Out Request 💰";
        })

    .catch(error => console.error('Error!', error.message))
})