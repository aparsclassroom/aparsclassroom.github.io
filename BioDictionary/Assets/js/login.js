function freeTrial() {
    firebase.auth().signInAnonymously()
        .then(function() {
            document.getElementById('free').value = "Success";
        })
        .catch(function(error) {
            var errorCode = error.code;
            if (errorCode = 'auth/operation-not-allowed') {
                alert('Free Trial Offer has been Ended.\nPlease Buy a premium license.');
            } else {
                console.error(error);
            }
        });
}

function toggleSignIn(e) {
    document.getElementById('access').value = "Please wait...";
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            document.getElementById('access').value = "Success";
        }).catch(function(error) {
            var errorCode = error.code;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
                document.getElementById("forgotPass").style.display = "inline-block";
            } else {
                alert('You don\'t have Access. To get access, Please Buy our subscription');
                window.location.replace("https://aparsclassroom.com/shop/BioDictionary?aff-AAA");
            }
        });
}

function sendPasswordReset() {
    var email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('Password Reset Email Sent!\nNow Please Check Your Email Inbox 😊');
        window.open("https://mail.google.com/");
    }).catch(function(error) {
        var errorCode = error.code;
        if (errorCode == 'auth/invalid-email') {
            alert("Please Check your Email Address 🤔 \n\nIt is in wrong format 🙃");
        } else if (errorCode == 'auth/user-not-found') {
            alert('You haven\'t purchased our premium subscription yet 😶');
            window.location.replace("https://aparsclassroom.com/shop/BioDictionary?aff-AAA");
        }
    });
}

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.replace("./");
        } else {
            console.log("%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬", "color:red;Background-Color:white;padding:100px;font-size:50px")
        }
    });
    document.getElementById('access').addEventListener('click', toggleSignIn, false);
    document.getElementById('forgotPass').addEventListener('click', sendPasswordReset, false);
    document.getElementById('free').addEventListener('click', freeTrial, false);

}
window.onload = function() {
    initApp();
};