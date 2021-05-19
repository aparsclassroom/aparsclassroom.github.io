var Mobile = document.getElementById('Mobile');
var Bkash = document.getElementById('bkash');
var Nagad = document.getElementById('nagad');
var Rocket = document.getElementById('rocket');

const curM = new Date().getMonth() + 1;
const curMontL = new Date().toLocaleDateString('en-IN', { month: 'long' });
var con = []
con.push(curM, curMontL)
console.log(con)


function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("../index.html");
                return;
            } else {
                var curM = new Date().getMonth() + 1
                console.log(curM)
            }
        } else {
            // location.replace("../index.html");
        }
    })
}
window.onload = function() {
    initApp();
};