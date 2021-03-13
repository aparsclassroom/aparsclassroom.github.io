var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("index.html");
                return;
            } else {
                console.log("%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬", "color:red;Background-Color:white;padding:100px;font-size:50px")
            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }
    mainApp.logOut = logOut;
})()