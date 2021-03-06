function logOut() {
    firebase.auth().signOut();
    initApp();
}

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            fetch('https://script.google.com/macros/s/AKfycbynylOid2GFjXCvErwpnpg-IcvgeT5Rz3gcoFdRAZVO8hv8PH8luqCAl7nMszSEVvit/exec')
                .then((res) => {
                    return res.json();
                })
                .then((loadedData) => {
                    loadedData.find(dashboard => {
                        if (dashboard.UID === user.uid) {
                            document.getElementById('status').innerText = dashboard.Status;
                            document.getElementById('profile').src = dashboard.Image;
                        }
                    })
                }).catch((err => {
                    console.log(err);
                }))
        } else {
            document.location.replace("index.html");
        }

    })
};
window.onload = function() {
    initApp();
};