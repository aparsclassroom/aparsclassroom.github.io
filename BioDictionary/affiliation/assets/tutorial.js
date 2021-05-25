function logOut() {
    firebase.auth().signOut();
    initApp();
}
const api = "https://script.google.com/macros/s/AKfycbyo363CPuW6GGcvgiCNeK5c2UCmakPPTD74dKtXGgkmPw0Hn1TngDbdGCvD0deqmDvjdQ/exec";

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("../");
                return;
            } else {
                fetch(api + "?q=comment&uid=" + user.uid)
                    .then((res) => {
                        return res.json();
                    })
                    .then((dashboard) => {
                        if (dashboard.code === 200) {
                            if (user.photoURL != null) {
                                document.getElementById('profile').src = user.photoURL;
                            }
                            document.getElementById('status').innerText = dashboard.data.comment;
                        } else {
                            alert(dashboard.message + "\n\nYou are using a gifted account.\nPlease buy this app to use Zombie Mode.");
                            return location.replace("../");
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
            }
        } else {
            window.location.replace("../");
        }

    })
};
window.onload = function() {
    initApp();
};