var Mobile = document.getElementById('Mobile');
var Bkash = document.getElementById('bkash');
var Nagad = document.getElementById('nagad');
var Rocket = document.getElementById('rocket');

const curM = new Date().getMonth() + 1;
const curMontL = new Date().toLocaleDateString('en-IN', { month: 'long' });
var con = []
con.push(curM, curMontL)
console.log(con)

const theme = localStorage.getItem('biotheme');
const bg = document.getElementById('bioT');
if (theme == "true") {
    bg.classList.remove("white-content");
} else {
    bg.classList.add("white-content");
}
const api = "https://script.google.com/macros/s/AKfycbzACfPnc_OvnT1rMuKOg4n8dv6jL4aMQMpL-FAtH6Ps9MfJLxaNCVQRzG0795iAXM2xWA/exec";

fetch(api + "?q=payments&uid=123")
    .then((res) => {
        return res.json();
    })
    .then((loadedData) => {
        if (loadedData.code === 200) {
            let data = loadedData.data;
            var c = data.filter(function(item) { return item.Month == curMontL; })
            console.log(c)
                // data.forEach((element, idx) => {
                //     console.log(element)
                // });
            var news = data.sort()
            console.log(news)
        } else {
            console.log(loadedData.meassage)
        }
    })

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("../");
                return;
            } else {
                // fetch(api + "?q=payments&uid=123")
                //     .then((res) => {
                //         return res.json();
                //     })
                //     .then((loadedData) => {
                //         if (loadedData.code === 200) {
                //             let data = loadedData.data;
                //             data.forEach(element, idx => {
                //                 console.log(element)
                //             });
                //         } else {
                //             console.log(loadedData.meassage)
                //         }
                //     })
            }
        } else {
            // location.replace("../");
        }
    })
}
window.onload = function() {
    initApp();
};