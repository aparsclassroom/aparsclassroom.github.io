var firebaseConfig = {
    apiKey: "AIzaSyD4WuQA56koZ-qWV56rDXDTtczaCVnGft8",
    authDomain: "asg-shop.firebaseapp.com",
    projectId: "asg-shop",
    storageBucket: "asg-shop.appspot.com",
    messagingSenderId: "374714320984",
    appId: "1:374714320984:web:d2d308f1ea2a9f46bbe22d",
    measurementId: "G-P18HXDWK2Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//let redirectUrl = params.signInSuccessUrl ?? getCookie("returnURLCookie");
let redirectUrl = params.signInSuccessUrl;
(function () {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                return false;
            },
            uiShown: function () {
                document.getElementById('loader').style.display = 'none';
            }
        },
        signInFlow: 'popup',
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        signInSuccessUrl: redirectUrl,
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                clientId: "374714320984-7r0b3i1s39tapmudaa4poe2b3qkpksst.apps.googleusercontent.com"
            },
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image',
                    size: 'invisible',
                    badge: 'bottomleft'
                },
                defaultCountry: 'BD',
                whitelistedCountries: ['BD', '+880', 'IN', '+91']
            }
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        tosUrl: '/terms',
        privacyPolicyUrl: '/privacy'
    };
    ui.start('#firebaseui-auth-container', uiConfig);
    ui.disableAutoSignIn();
})()

function onSubmit(token) {
    document.getElementById("form").submit();
}
var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            window.location.href = "/shop/dashboard";
        }
        // if (redirectUrl) {
        //     window.location.href = redirectUrl;
        // } else {
        //     window.location.href = "/shop/dashboard";
        // }
    } else {
        
        checkAndRedirect()
    }
});



function checkAndRedirect() {
    if (shouldOpenInBrowser()) {
        Swal.fire({
            position: "center",  icon: "warning", html: `
        <div>
            <h3>This is not a Browser !</h3>
            <p>Please use Google Chrome to access ASG SHOP.</p>
            <button class="swal2-confirm swal2-styled" style="background-color: #a9dd36; color: black;" onclick="copyToClipboard()"> Click to Copy ASG SHOP Link </button>
        </div>`, showConfirmButton: false,
        });
    } else {
        function nmodal() {
            $('#loginModal').modal();
        }
        $('#loginModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        
        nmodal()
    }
}
function shouldOpenInBrowser() { var userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera; return /FBAN|FBAV|Instagram/i.test(userAgent); }
function copyToClipboard() { 
    var currentPageURL = window.location.href; 
    navigator.clipboard.writeText(currentPageURL);
     Swal.fire({ position: "top-end", toast: true, icon: "success", text: "Link copied successfully! Now open in Chrome or any other suitable browser.", showConfirmButton: true, }); 
     return currentPageURL; 
};

