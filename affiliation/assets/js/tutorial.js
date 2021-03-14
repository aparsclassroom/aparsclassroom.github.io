function logOut() {
    firebase.auth().signOut();
    initApp();
}

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const script = 'https://script.google.com/macros/s/AKfycbyyK8VetDHphVHUhG2u0z5YfBfdaC5x8cOq6kKtslLEubMqq5QEQlRcT-r2YfpzKYbw/exec?uid='
            fetch(script + user.uid)
                .then((res) => {
                    return res.json();
                })
                .then((dashboard) => {
                    document.getElementById('status').innerText = dashboard.Status;
                    document.getElementById('profile').src = dashboard.Image;

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