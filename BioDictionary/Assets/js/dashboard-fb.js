var Mobile = document.getElementById('Mobile');
var Bkash = document.getElementById('Bkash');
var Nagad = document.getElementById('Nagad');
var Rocket = document.getElementById('Rocket');
var college = document.getElementById('college');
var fb = document.getElementById('fb');
var updateBtn = document.getElementById('updateBtn');

var app_firebase = {};
(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyDpX318g79F8msrHeEEifiSO06e5twwu9w",
        authDomain: "asg-biodictionary.firebaseapp.com",
        projectId: "asg-biodictionary",
        storageBucket: "asg-biodictionary.appspot.com",
        messagingSenderId: "342222541178",
        appId: "1:342222541178:web:d3ad1c34fdcdb71ad046c3",
        measurementId: "G-MQV49ZPHK7"
    };

    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;
    firebase.analytics();
})()
var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            namex = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("index.html");
                return;
            } else {
                const script = 'https://script.google.com/macros/s/AKfycbwy7wXJwzFmEObIa-7pMd1OzS7RHR6zAxfVgc_oKheTrt4yWm6UNE57-sfOk9dkY7B1Og/exec';
                fetch(script + "?uid=" + uid).then((res) => {
                    return res.json();
                }).then((loadedData) => {
                    console.log(loadedData)
                    Mobile.value = loadedData.Mobile;
                    Bkash.value = loadedData.Bkash;
                    Nagad.value = loadedData.Nagad;
                    Rocket.value = loadedData.Rocket;
                    college.value = loadedData.College_University;
                    fb.value = loadedData.Facebook_Link;

                }).catch((e) => {
                    console.error(e)
                })
                document.getElementById('email').innerText = email;
                document.getElementById("imgs").src = photoUrl;

                if (photoUrl === null) {
                    document.getElementById('imgs').src = "https://storymodelearning.com/img/about/baby.jpg";
                } else {
                    document.getElementById('imgs').src = photoUrl;
                }
                if (namex === null) {
                    document.getElementById('nam').innerHTML = `Unknown <i class="fas fa-question-circle"></i>`;
                } else {
                    document.getElementById('nam').innerHTML = namex + ` <i class="fas fa-check-circle" title="Verified"></i>`;
                }
                document.getElementById('license').innerHTML = "<b>License : </b>" + uid;
                document.getElementById('created').innerHTML = "<b>Enrolled : </b>" + user.metadata.creationTime;
                document.getElementById('namUp').addEventListener('click', () => {
                    var usname = document.getElementById('usname').value;
                    var user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: usname
                    }).then(function() {
                        document.getElementById('usname').value = "";
                        document.getElementById("nam").innerHTML = usname + ` <i class="fas fa-check-circle"></i>`;
                        $('#nameModal').modal('hide');
                    }).catch(function(error) {
                        alert(error)
                    });
                })



                updateBtn.addEventListener('click', () => {

                    var url = script + "?callback=ctrlq&uid=" + uid + "&Mobile=" + Mobile.value + "&Bkash=" + Bkash.value + "&Nagad=" + Nagad.value + "&Rocket= " + Rocket.value + "&College= " + college.value + "&fb= " + fb.value + "&action=update"
                    fetch(url).then((res) => {
                        updateBtn.innerText = "Updated !";
                        return res.json();
                    }).then((loadedData) => {
                        updateBtn.innerText = "Updated Successfully!";

                    }).catch((e) => {
                        updateBtn.innerText = "Can't Update 😶";
                    })
                })

                document.getElementById('imgbutton').addEventListener('click', uploadImage)

                function uploadImage() {
                    document.getElementById('imgbutton').innerText = "Uploading ... ";
                    const ref = firebase.storage().ref("users");
                    const file = document.querySelector('#img').files[0]
                    const metadata = {
                        contentType: file.type
                    };
                    const task = ref.child(user.uid + "/avatar.jpg").put(file, metadata);
                    task
                        .then(snapshot => snapshot.ref.getDownloadURL())
                        .then((url) => {
                            document.getElementById("imgs").src = url;
                            document.getElementById('img').value = "";
                            target.src = "";
                            document.getElementById('imgbutton').innerText = "Successfully Uploaded 🥰";
                            document.getElementById('imgbutton').innerText = "Update again?";
                            firebase
                                .storage()
                                .ref("users")
                                .child(user.uid + "/avatar.jpg")
                                .getDownloadURL()
                                .then(imgUrl => {
                                    user.updateProfile({
                                        photoURL: imgUrl
                                    })
                                })
                            $('#imageModal').modal('hide');
                        })
                        .catch(console.error);
                }
            }
        } else {
            // window.location.replace("login.html");
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }
    mainApp.logOut = logOut;
})()



function showImage(src, target) {
    var fr = new FileReader();
    fr.onload = function(e) {
        target.src = this.result;
    };
    src.addEventListener("change", function() {
        document.getElementById('imgbutton').disabled = false;
        fr.readAsDataURL(src.files[0]);
    });
}
var src = document.getElementById("img");
var target = document.getElementById("target");
showImage(src, target);

function ValidateSize(file) {
    var FileSize = file.files[0].size / 1024 / 1024;
    if (FileSize > 1) {
        alert('Profile Image size exceeds 1 MB\nPlease Select a smaller Image 😶');
        $(file).val('');
        return;
    }
}

function na() {
    document.getElementById('usname').addEventListener('keyup', function() {
        document.getElementById('namUp').disabled = false;
    })
}
na()