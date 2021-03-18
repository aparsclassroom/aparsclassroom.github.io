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
                const script = 'https://script.google.com/macros/s/AKfycbxhN_haNW6WWO8IykSvK8sTpJPIQ8tdlj2MJZ9V87XCPCzakOpVEUp5ylmXigklBCn1GA/exec?uid='
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
            document.location.replace("../index.html");
        }

    })
};
window.onload = function() {
    initApp();
};