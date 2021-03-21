var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.isAnonymous === true) {
                alert("This is a Premium Feature!");
                return;
            } else {
                uid = user.uid;
            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()