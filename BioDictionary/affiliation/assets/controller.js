function logOut() {
    firebase.auth().signOut();
    initApp();
}

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("../");
                return;
            } else {
                fetch(api + "?q=analytics&uid=" + user.uid).then((res) => {
                    return res.json();
                }).then((loadedData) => {
                    if (loadedData.code === 200) {
                        let data = loadedData.data;
                        document.getElementById('contoller').innerHTML = data.cont;
                        document.getElementById('info').innerHTML = "<a class='text-primary' href='tel:" + data.contInf + "'>+ 📞" + data.contInf + "</a>";
                    } else {
                        alert(loadedData.message + "\n\nYou are using a gifted account.\nPlease buy this app to use Zombie Mode.");
                        return location.replace("../");
                    }
                }).catch((err => {
                    alert(err);
                }))
            }
        } else {
            location.replace("../");
        }
    })
}
window.onload = function() {
    initApp();
};