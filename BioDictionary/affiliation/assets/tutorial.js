function logOut() {
    firebase.auth().signOut();
    initApp();
}
const api = "https://script.google.com/macros/s/AKfycbzcqmEXudKWgvPJnfCtbZVxOR7iJ68iopaf3s6dqKURCUT3C9dfpY3Buiz4e_eqwNkh/exec";

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
                            alert(loadedData.message + "\n\nPlease Contact Admin !");
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