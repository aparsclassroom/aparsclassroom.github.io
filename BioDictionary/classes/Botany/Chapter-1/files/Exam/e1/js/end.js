const usid = document.getElementById('id');
const username = document.getElementById('username');
const score = document.getElementById('score');
const duration = document.getElementById('duration');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const online = document.getElementById("online");
const user_min = localStorage.getItem("minutes");
const user_sec = localStorage.getItem("seconds");


var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.isAnonymous === true) {
                alert("This is a Premium Feature!");
                return location.replace("/BioDictionary/index.html");
            } else {
                uid = user.uid;
                usid.value = uid;
                finalScore.innerText = mostRecentScore;
                document.querySelector("span.time_taken").innerHTML = user_min + " min " + user_sec + " sec";

                function scoreUpdated() {
                    score.value = mostRecentScore;
                    duration.value = user_min + " : " + user_sec;
                    $.get('https://json.geoiplookup.io/', function(res) {
                        var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
                        document.getElementById("ip-details").value = a;
                    });
                }
                scoreUpdated()


                const scriptURL = 'https://script.google.com/macros/s/AKfycbzQs-axcJ8h_RjucntmSXGaGc8Cz-kX4ODpAE0IXMEnUQ834oUqL_OKKH_0_NuUpX8jmQ/exec'
                const form = document.forms['highScore']

                form.addEventListener('submit', e => {
                    e.preventDefault();
                    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                        .then(_response => alert("Saved Online!!!"))
                        .catch(error => console.error('Error!', error.message))
                    document.getElementById("online").innerText = "Please Wait..";
                    document.getElementById("online").disabled = true;
                    setTimeout(function timer() {
                        document.getElementById("online").style.display = "none";
                    }, 2500)
                })

            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()