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
                        document.getElementById('status').innerText = dashboard.Comment;
                        document.getElementById('profile').src = user.photoURL;

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