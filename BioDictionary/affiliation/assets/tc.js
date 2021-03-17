var Mobile = document.getElementById('Mobile');
var Bkash = document.getElementById('bkash');
var Nagad = document.getElementById('nagad');
var Rocket = document.getElementById('rocket');
var college = document.getElementById('College');
var fb = document.getElementById('fb');
var status = document.getElementById('bio');

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const script = 'https://script.google.com/macros/s/AKfycbxhN_haNW6WWO8IykSvK8sTpJPIQ8tdlj2MJZ9V87XCPCzakOpVEUp5ylmXigklBCn1GA/exec?uid='
            fetch(script + user.uid)
                .then((res) => {
                    return res.json();
                })
                .then((dashboard) => {
                    document.getElementById('contoller').innerText = dashboard.Controler_Name;
                    document.getElementById('contollerInfo').innerText = dashboard.Controler_Info;
                    document.getElementById('info').href = "tel:" + dashboard.Controler_Info;
                    document.getElementById('Username').value = dashboard.Name;
                    document.getElementById('email').value = user.email;
                    Mobile.value = dashboard.Mobile;
                    document.getElementById('uid').value = user.uid;
                    document.getElementById('cash').placeholder = "Maximum : " + dashboard.Remaning_in_Wallet;
                    document.getElementById('lmt').innerText = dashboard.Remaning_in_Wallet;
                    college.value = dashboard.College_University;
                    Bkash.value = dashboard.Bkash;
                    fb.value = dashboard.Facebook_Link;
                    if (dashboard.Nagad != "") {
                        Nagad.value = dashboard.Nagad;
                    }
                    if (dashboard.Rocket != "") {
                        Rocket.value = dashboard.Rocket;
                    }
                    if (dashboard.Remaning_in_Wallet === 0) {
                        document.getElementById('CashOut').style.display = "none";
                        document.getElementById('res').innerText = "You don't have enough balance to request for a cash out 😶";
                    } else {
                        document.getElementById('CashOut').style.display = "block";
                    }
                    document.getElementById('aff').value = dashboard.Affiliation_Token;
                    document.getElementById('serial').value = dashboard.Serial;
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


const scriptURL = 'https://script.google.com/macros/s/AKfycbwYRFgEj07KNiCvhAHzaL4c02rk6IAydNU377SwcYhLi3QpdwPceGM6M8grloVHEgNI4w/exec'
const form = document.forms['CashOut']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            alert("Your request of cash out has been successfully saved 🥰 \nPlease wait for 24 hours. If you don't get any response then call the Affiliation Controller.")
            document.getElementById('CashOut').style.display = "none";
            document.getElementById('res').innerText = "You have just Sent a Cash Out Request 💰";
        })

    .catch(error => console.error('Error!', error.message))
})