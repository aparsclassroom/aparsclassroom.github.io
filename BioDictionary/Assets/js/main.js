var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            ann = user.isAnonymous;
            uid = user.uid;
            if (ann === true) {
                document.getElementById('dsh').style.display = "none";
                document.getElementById('lg').style.display = "inline-block";
            } else {
                document.getElementById('dsh').style.display = "inline-block";
                document.getElementById('lg').style.display = "none";
            }
        } else {
            window.location.replace("login.html");
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }
    mainApp.logOut = logOut;
})()