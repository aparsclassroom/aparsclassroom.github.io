const usid = document.getElementById('uid');
const usern = document.getElementById('user');
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
                usern.value = user.displayName;
                username.value = user.displayName;
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


                const scriptURL = 'https://script.google.com/macros/s/AKfycbz2C1ggwYQkaCNdcM5fdVIvbkU4vX2Jdp-2XTEZGUbIVPX1cchzdVOUDRZVdX66nQupVw/exec'
                const form = document.forms['highScore']

                form.addEventListener('submit', e => {
                    e.preventDefault();
                    document.getElementById("online").innerText = "Please Wait..";
                    document.getElementById("online").disabled = true;
                    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                        .then(_response => {
                            alert("Saved Online!!!");
                            document.getElementById("online").style.display = "none";
                            location.href = "./highscores.html";
                        })
                        .catch(error => alert('Error!', error.message))
                })

            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()