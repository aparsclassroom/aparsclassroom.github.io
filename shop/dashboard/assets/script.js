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
            {
                provider: 'apple.com'
            },
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // {
            //     provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            //     recaptchaParameters: {
            //         type: 'image',
            //         size: 'invisible',
            //         badge: 'bottomleft'
            //     },
            //     defaultCountry: 'BD',
            //     whitelistedCountries: ['BD', '+880']
            // }
        ],
        //credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
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
    } else {
        checkAndRedirect();
    }
});

function nmodal() {
    $('#loginModal').modal();
}
$('#loginModal').modal({
    backdrop: 'static',
    keyboard: false
})


function checkAndRedirect() {
    if (shouldOpenInBrowser()) {
        Swal.fire({
            position: "center",  icon: "warning", html: `
        <div>
            <h3>This is not a Traditional Browser !</h3>
            <p>Please use Google Chrome Browser to access ASG SHOP.</p>
            <button class="swal2-confirm swal2-styled" style="background-color: #a9dd36; color: black;" onclick="copyToClipboard()"> Click to Copy ASG SHOP Link </button>
        </div>`, showConfirmButton: false,
        });
    } else {
        nmodal()
    }
}
function shouldOpenInBrowser() { var userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera; return /FBAN|FBAV|Instagram/i.test(userAgent); }
function copyToClipboard() {
    var currentPageURL = window.location.href;
    navigator.clipboard.writeText(currentPageURL);
     Swal.fire({ position: "center", toast: false, icon: "success", text: "Link copied successfully! Now open in Chrome or any other suitable browser.", showConfirmButton: true, });
     nmodal()
     return currentPageURL;
};

// Phone OTP Login
(function () {
    var API = 'https://secure.apars.shop';
    var OTP_EXPIRY = 300;

    var currentPhone = '';
    var countdown = 0;
    var countdownTimer = null;

    var phoneStep = document.getElementById('phone-step');
    var otpStep = document.getElementById('otp-step');
    var phoneInput = document.getElementById('otp-phone-input');
    var otpInput = document.getElementById('otp-code-input');
    var sendBtn = document.getElementById('send-otp-btn');
    var verifyBtn = document.getElementById('verify-otp-btn');
    var resendBtn = document.getElementById('resend-otp-btn');
    var changeNumberBtn = document.getElementById('change-number-btn');
    var phoneError = document.getElementById('phone-error');
    var otpError = document.getElementById('otp-error');
    var countdownEl = document.getElementById('otp-countdown');
    var phoneDisplay = document.getElementById('otp-phone-display');

    function showError(el, msg) { el.textContent = msg; el.style.display = 'block'; }
    function hideError(el) { el.style.display = 'none'; }

    function formatTime(sec) {
        return String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
    }

    function updateCountdownUI() {
        if (countdown > 0) {
            countdownEl.textContent = 'Expires in: ' + formatTime(countdown);
            countdownEl.style.color = '#17a2b8';
            otpInput.disabled = false;
            verifyBtn.disabled = otpInput.value.length !== 6;
            resendBtn.disabled = true;
        } else {
            countdownEl.textContent = 'OTP expired. Request a new one.';
            countdownEl.style.color = '#fd7e14';
            otpInput.disabled = true;
            verifyBtn.disabled = true;
            resendBtn.disabled = false;
        }
    }

    function startCountdown() {
        stopCountdown();
        countdown = OTP_EXPIRY;
        updateCountdownUI();
        countdownTimer = setInterval(function () {
            countdown--;
            updateCountdownUI();
            if (countdown <= 0) stopCountdown();
        }, 1000);
    }

    function stopCountdown() {
        if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
    }

    function showOtpStep(phone) {
        currentPhone = phone;
        phoneDisplay.textContent = phone;
        phoneStep.style.display = 'none';
        otpStep.style.display = 'block';
        otpInput.value = '';
        verifyBtn.disabled = true;
        hideError(otpError);
        startCountdown();
    }

    function showPhoneStep() {
        otpStep.style.display = 'none';
        phoneStep.style.display = 'block';
        stopCountdown();
        hideError(phoneError);
    }

    function setSendLoading(loading) {
        sendBtn.disabled = loading;
        sendBtn.textContent = loading ? 'Sending...' : 'Send OTP';
    }

    function setVerifyLoading(loading) {
        verifyBtn.disabled = loading;
        verifyBtn.textContent = loading ? 'Verifying...' : 'Verify';
    }

    async function doSendOTP(phone) {
        setSendLoading(true);
        hideError(phoneError);
        try {
            var res = await fetch(API + '/otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phone })
            });
            var data = await res.json();
            if (data.status === 200) {
                showOtpStep(phone);
            } else {
                showError(phoneError, data.message || 'Failed to send OTP.');
            }
        } catch (e) {
            showError(phoneError, 'Network error. Please try again.');
        }
        setSendLoading(false);
    }

    async function doVerifyOTP(phone, otp) {
        setVerifyLoading(true);
        hideError(otpError);
        var existingUser = firebase.auth().currentUser;
        var payload = { phone: phone, otp: otp };
        if (existingUser) payload.uid = existingUser.uid;
        try {
            var res = await fetch(API + '/otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            var data = await res.json();
            if (data.status === 200) {
                stopCountdown();
                await firebase.auth().signInWithCustomToken(data.token);
                // onAuthStateChanged handles redirect
            } else if (data.status === 409) {
                // Phone belongs to a different account — hard stop, user must change number
                stopCountdown();
                showError(otpError, data.message || 'This phone number is already linked to another account.');
            } else if (data.status === 429) {
                stopCountdown();
                showPhoneStep();
                showError(phoneError, data.message || 'Too many attempts. Please try again.');
            } else {
                showError(otpError, data.message || 'Invalid or expired OTP.');
                setVerifyLoading(false);
            }
        } catch (e) {
            showError(otpError, 'Network error. Please try again.');
            setVerifyLoading(false);
        }
    }

    otpInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
        verifyBtn.disabled = this.value.length !== 6 || countdown === 0;
    });

    sendBtn.addEventListener('click', function () {
        var phone = phoneInput.value.trim();
        if (phone) doSendOTP(phone);
    });

    phoneInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendBtn.click();
    });

    verifyBtn.addEventListener('click', function () {
        if (otpInput.value.length === 6 && countdown > 0) doVerifyOTP(currentPhone, otpInput.value);
    });

    otpInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') verifyBtn.click();
    });

    resendBtn.addEventListener('click', function () {
        if (countdown === 0) doSendOTP(currentPhone);
    });

    changeNumberBtn.addEventListener('click', showPhoneStep);
})();