const theme = localStorage.getItem('biotheme');
const bg = document.getElementById('bioT');
if (theme == "true") {
    bg.classList.remove("white-content");
} else {
    bg.classList.add("white-content");
}
const api = "https://script.google.com/macros/s/AKfycbwM3zTmAIX9AH4P-7-qG9GMI4aRUXZxEDAIOHEjO6Ln1xaTVJ3DTw62q4GMJ8dCqCg3Hw/exec";

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("../");
                return;
            } else {
                fetch(api + "?q=controller&uid=" + user.uid).then((res) => {
                    return res.json();
                }).then((loadedData) => {
                    if (loadedData.code === 200) {
                        let data = loadedData.data;
                        document.getElementById('contoller').innerHTML = data.cont;
                        document.getElementById('info').innerHTML = "<a class='text-danger' href='tel:" + data.contInf + "'>📞 " + data.contInf + "</a>";
                    } else {
                        alert(loadedData.message + "\n\nYou are using a gifted account.\nPlease buy this app to use Zombie Mode.");
                        return location.replace("../");
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        } else {
            location.replace("../");
        }
    })
}
window.onload = function() {
    initApp();
};