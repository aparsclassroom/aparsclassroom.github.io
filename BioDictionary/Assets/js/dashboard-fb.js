const currentPassword = document.getElementById('currentPassword');
const newPassword = document.getElementById('newPassword');
const changePass = document.getElementById('changePass');
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
                changePass.addEventListener('click', e => {
                    const a = currentPassword.value;

                    var user = firebase.auth().currentUser;
                    var credential = firebase.auth.EmailAuthProvider.credential(email, a);

                    user.reauthenticateWithCredential(credential).then(function() {
                        const b = newPassword.value;
                        user.updatePassword(b).then(function() {
                            alert('Password Changed Successfully!')
                        }).catch(function(error) {
                            alert(error.message);
                        });
                    }).catch(function(error) {
                        alert(error.message);
                    });
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
            window.location.replace("login.html");
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
        alert('This Image size exceeds 1 MB\nPlease Select a smaller Image 😶');
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