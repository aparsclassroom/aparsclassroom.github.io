var eye = document.getElementById("eye");
var m = document.getElementById('email');
var p = document.getElementById('password');
const tr = localStorage.getItem('BioTranx');
const ml = localStorage.getItem('BioMail');
if (tr != null) {
    p.value = tr;
    m.value = ml;
}

function show() {
    p.setAttribute('type', 'text');
    eye.classList.remove('fas');
    eye.classList.remove('fa-eye-slash');
    eye.classList.add('fa');
    eye.classList.add('fa-eye');
    eye.style.cssText = "margin-left: -20px;padding: 0px 30px 0px 0px;";
}

function hide() {
    p.setAttribute('type', 'password');
    eye.classList.remove('fa');
    eye.classList.remove('fa-eye');
    eye.classList.add('fas');
    eye.classList.add('fa-eye-slash');
    eye.style.cssText = "margin-left: 0px;padding: 0px 25px 0px 0px;";
}
var pwShown = 0;

eye.addEventListener("click", function() {
    if (pwShown == 0) {
        pwShown = 1;
        show();
    } else {
        pwShown = 0;
        hide();
    }
}, true);

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
            localStorage.removeItem('BioTranx');
            localStorage.removeItem('BioMail');
            localStorage.removeItem('BioDictionary');
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