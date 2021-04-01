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
                function getThings() {
                    var things = JSON.parse(localStorage.getItem('watched'));
                    if (things === null) {
                        document.getElementById('name').innerText = "Welcome 🥰";
                        return document.getElementById('suggestion').innerHTML = "";
                    } else {
                        document.getElementById('name').innerText = Name + "'s favorites 🤩";
                        var thing = things[Math.floor(Math.random() * things.length)];
                        if (thing.img == "" || thing.img == "https://gdurl.com") {
                            document.getElementById('suggestion').innerHTML = `<a href=${thing.url}>${thing.name}</a>`;
                        } else {
                            document.getElementById('suggestion').innerHTML = `<a href=${thing.url}><img src="${thing.img}" height="100px" width="100px"><br>${thing.name}</a>`;
                        }
                    }
                }

                if (Name === null) {
                    document.getElementById('name').innerHTML = "Welcome 🥰";
                } else {
                    getThings()
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