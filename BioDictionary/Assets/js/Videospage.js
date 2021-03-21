var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user.isAnonymous === false) {
            uid = user.uid;
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()