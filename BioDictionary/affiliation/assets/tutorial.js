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
                location.replace("../index.html");
                return;
            } else {
                const script = 'https://script.google.com/macros/s/AKfycbyuNPvS8KpkFFPTBUUU0hGZdgbPDM51MhLip3EuIb-IcI_6C0DkAiiT_tL1om-hATi1qA/exec?uid='
                fetch(script + user.uid)
                    .then((res) => {
                        return res.json();
                    })
                    .then((dashboard) => {
                        if (dashboard.code === 200) {
                            if (user.photoURL != null) {
                                document.getElementById('profile').src = user.photoURL;
                            }
                            document.getElementById('status').innerText = dashboard.Comment;
                            document.getElementById('con').innerText = loadedData.Controler_Name;
                            document.getElementById('cont').href = "tel:" + loadedData.Controler_Info;
                        } else {
                            alert(dashboard.message + "\n\nYou are using a gifted account.\nPlease buy this app to use Zombie Mode.");
                            return location.replace("../index.html");
                        }
                    }).catch((err => {
                        console.log(err);
                    }))
            }
        } else {
            window.location.replace("../index.html");
        }

    })
};
window.onload = function() {
    initApp();
};