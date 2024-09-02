const usid = document.getElementById('uid');
const usern = document.getElementById('user');
const username = document.getElementById('username');
const score = document.getElementById('score');
const duration = document.getElementById('duration');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = sessionStorage.getItem('mostRecentScore');
const online = document.getElementById("online");
const user_min = sessionStorage.getItem("minutes");
const user_sec = sessionStorage.getItem("seconds");
const solve = document.getElementById('solve');
const highs = document.getElementById('highs');
const ret = document.getElementById('ret');
const stat = sessionStorage.getItem("stat");

function close_window() {
    swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: ["No, wait", "Yes, Close"],
            dangerMode: true
        })
        .then((off) => {
            if (off) {
                close();
            }
        });
}
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
                if (stat === "done") {
                    uid = user.uid;
                    usid.value = uid;
                    if (user.displayName === null) {
                        usern.value = "ASGIAN_" + uid.substring((uid.length / 2), 20);
                    } else {
                        usern.value = user.displayName;
                    }
                    username.value = user.displayName;
                    sessionStorage.removeItem("stat");
                    if (mostRecentScore < 0) {
                        swal({
                            title: "Not Enough Score 💔",
                            icon: "error",
                            text: "Please try again 🤨",
                            button: "Ok"
                        }).then(() => {
                            return location.replace('./');
                        })
                    } else {
                        finalScore.innerText = mostRecentScore;
                        document.querySelector("span.time_taken").innerHTML = user_min + " min " + user_sec + " sec";
                        ret.style.display = "block";
                        ret.addEventListener('click', () => {
                            sessionStorage.setItem("stat", "OK");
                            location.replace('./exam.html');
                        })

                        function scoreUpdated() {
                            score.value = mostRecentScore;
                            duration.value = user_min + " : " + user_sec;
                            $.get('https://json.geoiplookup.io/', function(res) {
                                var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
                                document.getElementById("ip-details").value = a;
                            });
                        }
                        online.disabled = true;
                        scoreUpdated()
                        fetch(scriptURL + '?q=Indivisual&uid=' + uid)
                            .then((res) => {
                                return res.json();
                            }).then((loadedData) => {
                                if (loadedData.code === 404) {
                                    online.disabled = false;
                                    online.innerText = "Unlock Solution 🔑🔒";
                                    const form = document.forms['highScore']
                                    form.addEventListener('submit', e => {
                                        e.preventDefault();
                                        online.innerText = "Unlocking...";
                                        online.disabled = true;
                                        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                                            .then(_response => {
                                                swal({
                                                    title: "Boom 🔥",
                                                    icon: "success",
                                                    text: "Solution 🔓 Unlocked!",
                                                    button: "Ok"
                                                })
                                                localStorage.removeItem('mostRecentScore');
                                                localStorage.removeItem("minutes");
                                                localStorage.removeItem("seconds");
                                                online.style.display = "none";
                                                solve.style.display = "block";
                                                highs.style.display = "block";
                                                highs.href = "./highscores.html";
                                                solve.href = "./solution.html";
                                            })
                                            .catch(error => alert('Error!', error.message))
                                    })
                                } else {
                                    online.style.display = "none";
                                    solve.style.display = "block";
                                    solve.href = "./solution.html";
                                }
                            })
                    }
                } else {
                    swal({
                        title: "Not Allowed",
                        icon: "error",
                        text: "Please try again 🤨",
                        button: "Ok"
                    }).then(() => {
                        return location.replace('./');
                    })
                }
            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()