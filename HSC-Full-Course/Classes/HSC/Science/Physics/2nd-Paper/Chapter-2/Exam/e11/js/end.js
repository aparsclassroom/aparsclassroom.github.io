const username = document.getElementById('username');
const score = document.getElementById('score');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const recentScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const online = document.getElementById("online");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
function scoreUpdated () {
score.value = mostRecentScore;
$.get('https://json.geoiplookup.io/', function(res) {var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code  + "\n" + "Currency : " + res.currency_name);document.getElementById("ip-details").value = a;});
}
scoreUpdated ()
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
    online.disabled = !username.value;
});
saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');

};


const scriptURL = '#'
 const form = document.forms['highScore']

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
       .then(_response => alert("Saved Online!!!"))
       .catch(error => console.error('Error!', error.message))
       document.getElementById("online").style.display = "none";
})