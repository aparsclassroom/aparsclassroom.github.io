var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.isAnonymous === true) {
                var x = document.querySelectorAll(".Bio");
                var i;
                for (i = 0; i < x.length; i++) {
                    x[i].classList.add("lock");
                    x[i].removeAttribute("href");
                }
            }
            console.log("%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬", "color:red;Background-Color:white;padding:100px;font-size:50px")
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }
    mainApp.logOut = logOut;
})()