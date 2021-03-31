var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            Name = user.displayName;
            email = user.email;
            ann = user.isAnonymous;
            uid = user.uid;
            console.log("%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬", "color:red;Background-Color:white;padding:100px;font-size:50px")
            if (ann === true) {
                document.getElementById('dsh').style.display = "none";
                document.getElementById('zombie').style.display = "none";
                document.getElementById('lg').style.display = "inline-block";
                document.getElementById('name').innerText = "Welcome 🥰";
            } else {




                var things = JSON.parse(localStorage.getItem('watched'));
                var thing = things[Math.floor(Math.random() * things.length)];
                document.getElementById('suggestion').innerHTML = JSON.stringify(thing);


                if (Name === null) {
                    document.getElementById('name').innerHTML = "Welcome 🥰";
                } else {
                    document.getElementById('name').innerText = "Welcome " + Name;
                }
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