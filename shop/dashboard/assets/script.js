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

// Remember the last login method the user actually succeeded with.
var LAST_METHOD_KEY = 'asg_last_login_method';
function saveLastLoginMethod(m) { try { localStorage.setItem(LAST_METHOD_KEY, m); } catch (e) {} }
function getLastLoginMethod() { try { return localStorage.getItem(LAST_METHOD_KEY); } catch (e) { return null; } }

// ---- Auth loading / success overlay ----
// justLoggedIn distinguishes a login that just happened (show success + brief pause)
// from a restored session on page load (redirect instantly, no overlay).
var justLoggedIn = false;
function showAuthOverlay(text, isSuccess) {
    var overlay = document.getElementById('auth-overlay');
    if (!overlay) return;
    var textEl = document.getElementById('auth-overlay-text');
    var spinner = overlay.querySelector('.auth-spinner');
    var check = overlay.querySelector('.auth-check');
    if (textEl) textEl.textContent = text;
    if (spinner) spinner.style.display = isSuccess ? 'none' : 'block';
    if (check) check.style.display = isSuccess ? 'flex' : 'none';
    overlay.style.display = 'flex';
}
function hideAuthOverlay() {
    var overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.style.display = 'none';
}
function beginAuth(msg) { justLoggedIn = true; showAuthOverlay(msg || 'Signing you in…', false); }
function endAuthFailure() { justLoggedIn = false; hideAuthOverlay(); }

// Custom social + email auth (replaces FirebaseUI). onAuthStateChanged below
// handles the post-login redirect for every method.
(function () {
    function friendlyError(err) {
        if (!err) return 'Login failed. Please try again.';
        switch (err.code) {
            case 'auth/popup-closed-by-user': return 'Login window was closed before finishing.';
            case 'auth/popup-blocked': return 'Popup was blocked. Please allow popups and try again.';
            case 'auth/account-exists-with-different-credential':
                return 'An account already exists with this email using a different sign-in method.';
            case 'auth/user-not-found': return 'No account found with this email.';
            case 'auth/wrong-password': return 'Incorrect password.';
            case 'auth/invalid-email': return 'Please enter a valid email address.';
            case 'auth/email-already-in-use': return 'This email is already registered. Try logging in.';
            case 'auth/weak-password': return 'Password should be at least 6 characters.';
            case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
            default: return err.message || 'Login failed. Please try again.';
        }
    }

    function socialLogin(provider, method) {
        firebase.auth().signInWithPopup(provider)
            .then(function () { beginAuth(); saveLastLoginMethod(method); })
            .catch(function (err) {
                Swal.fire({ position: 'center', icon: 'error', text: friendlyError(err) });
            });
    }

    // ---- Panel navigation (method list <-> email / phone) ----
    var methodList = document.getElementById('method-list');
    var emailPanel = document.getElementById('email-panel');
    var phonePanel = document.getElementById('phone-panel');
    var emailMethodBtn = document.getElementById('email-method-btn');
    var phoneMethodBtn = document.getElementById('phone-method-btn');

    function showPanel(panel) {
        methodList.style.display = 'none';
        emailPanel.style.display = 'none';
        phonePanel.style.display = 'none';
        if (panel) panel.style.display = 'block';
    }
    function showMethods() {
        emailPanel.style.display = 'none';
        phonePanel.style.display = 'none';
        methodList.style.display = 'block';
    }

    if (emailMethodBtn) emailMethodBtn.addEventListener('click', function () {
        showPanel(emailPanel);
        document.getElementById('email-input').focus();
    });
    if (phoneMethodBtn) phoneMethodBtn.addEventListener('click', function () {
        showPanel(phonePanel);
        document.getElementById('otp-phone-input').focus();
    });
    Array.prototype.forEach.call(document.querySelectorAll('.back-to-methods'), function (btn) {
        btn.addEventListener('click', showMethods);
    });

    var BTN_ID_BY_METHOD = {
        google: 'google-login-btn',
        apple: 'apple-login-btn',
        email: 'email-method-btn',
        phone: 'phone-method-btn'
    };

    function setMethodBadge(method, text, lastUsed) {
        var btn = document.getElementById(BTN_ID_BY_METHOD[method]);
        if (!btn) return;
        var existing = btn.querySelector('.method-badge');
        if (existing) existing.parentNode.removeChild(existing);
        var badge = document.createElement('span');
        badge.className = 'method-badge' + (lastUsed ? ' badge-lastused' : '');
        badge.textContent = text;
        btn.appendChild(badge);
        btn.classList.add('has-badge');
    }

    // Returning users (who have logged in on this device before) get a warmer header.
    if (getLastLoginMethod()) {
        var titleEl = document.querySelector('.login-title');
        var subtitleEl = document.querySelector('.login-subtitle');
        if (titleEl) titleEl.textContent = 'Welcome back';
        if (subtitleEl) subtitleEl.textContent = 'Log in to continue your checkout';
    }

    // Platform suggestion: on Apple devices, Apple is recommended and Google is
    // flagged as the fastest; elsewhere Google is the recommended option.
    if (isApplePlatform()) {
        setMethodBadge('apple', 'Recommended', false);
        setMethodBadge('google', 'Fastest', false);
    } else {
        setMethodBadge('google', 'Recommended', false);
    }

    // Personal suggestion overrides "Recommended" on its button. We always land on
    // the main method list (never auto-open a panel), just badge the last-used one.
    (function applyLastMethod() {
        var last = getLastLoginMethod();
        if (!last) return;
        setMethodBadge(last, 'Last used', true);
    })();

    var googleBtn = document.getElementById('google-login-btn');
    var appleBtn = document.getElementById('apple-login-btn');

    if (googleBtn) googleBtn.addEventListener('click', function () {
        socialLogin(new firebase.auth.GoogleAuthProvider(), 'google');
    });

    if (appleBtn) appleBtn.addEventListener('click', function () {
        var provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        socialLogin(provider, 'apple');
    });

    // Email / password (login + signup toggle)
    var nameInput = document.getElementById('name-input');
    var emailInput = document.getElementById('email-input');
    var passwordInput = document.getElementById('password-input');
    var emailError = document.getElementById('email-error');
    var primaryBtn = document.getElementById('email-primary-btn');
    var toggleBtn = document.getElementById('email-toggle-btn');
    var forgotBtn = document.getElementById('forgot-password-btn');

    var mode = 'login'; // 'login' | 'signup' | 'reset'
    var emailHelper = document.getElementById('email-helper');
    var emailSuccess = document.getElementById('email-success');

    function showEmailError(msg) { hideEmailSuccess(); emailError.textContent = msg; emailError.style.display = 'block'; }
    function hideEmailError() { emailError.style.display = 'none'; }
    function showEmailSuccess(msg) { hideEmailError(); emailSuccess.textContent = msg; emailSuccess.style.display = 'block'; }
    function hideEmailSuccess() { emailSuccess.style.display = 'none'; }
    function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function markInvalid(el, invalid) { if (el) el.classList.toggle('is-invalid', !!invalid); }
    function clearInvalid() { [nameInput, emailInput, passwordInput].forEach(function (el) { markInvalid(el, false); }); }

    // Clear error/success/invalid state as soon as the user edits a field.
    [nameInput, emailInput, passwordInput].forEach(function (el) {
        if (el) el.addEventListener('input', function () { markInvalid(el, false); hideEmailError(); hideEmailSuccess(); });
    });

    function setMode(newMode) {
        mode = newMode;
        hideEmailError();
        hideEmailSuccess();
        clearInvalid();
        var isSignup = mode === 'signup';
        var isReset = mode === 'reset';

        emailHelper.style.display = isReset ? 'block' : 'none';
        nameInput.style.display = isSignup ? 'block' : 'none';
        passwordInput.style.display = isReset ? 'none' : 'block';
        forgotBtn.style.display = mode === 'login' ? '' : 'none';

        if (isReset) {
            primaryBtn.textContent = 'Send reset link';
            toggleBtn.textContent = '← Back to log in';
        } else if (isSignup) {
            primaryBtn.textContent = 'Create account';
            toggleBtn.textContent = 'Have an account? Log in';
            passwordInput.setAttribute('autocomplete', 'new-password');
        } else {
            primaryBtn.textContent = 'Log in';
            toggleBtn.textContent = 'Create account';
            passwordInput.setAttribute('autocomplete', 'current-password');
        }
    }

    function doLogin(email, pass) {
        beginAuth();
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function () { saveLastLoginMethod('email'); })
            .catch(function (err) { endAuthFailure(); showEmailError(friendlyError(err)); });
    }

    function doSignup(name, email, pass) {
        beginAuth();
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(function (cred) {
                saveLastLoginMethod('email');
                return cred.user.updateProfile({ displayName: name });
            })
            .catch(function (err) { endAuthFailure(); showEmailError(friendlyError(err)); });
    }

    function doReset(email) {
        setPrimaryLoading(true);
        firebase.auth().sendPasswordResetEmail(email)
            .then(function () { showEmailSuccess('Reset link sent to ' + email + '. Check your inbox (and spam).'); })
            .catch(function (err) { markInvalid(emailInput, true); showEmailError(friendlyError(err)); })
            .then(function () { setPrimaryLoading(false); });
    }

    function setPrimaryLoading(loading) {
        primaryBtn.disabled = loading;
        if (loading) { primaryBtn.dataset.label = primaryBtn.textContent; primaryBtn.textContent = 'Please wait…'; }
        else if (primaryBtn.dataset.label) { primaryBtn.textContent = primaryBtn.dataset.label; }
    }

    // ---- Invisible reCAPTCHA gate -------------------------------------------
    // Every email/password action (login, signup, reset) runs the invisible
    // reCAPTCHA challenge first; the real Firebase call only fires once the
    // challenge is solved (via the global onRecaptchaSuccess callback below).
    var pendingAction = null;

    function recaptchaReady() {
        return typeof grecaptcha !== 'undefined' && typeof grecaptcha.execute === 'function';
    }

    function withRecaptcha(action) {
        if (!recaptchaReady()) {
            // reCAPTCHA script unavailable — proceed rather than lock users out.
            action();
            return;
        }
        pendingAction = action;
        setPrimaryLoading(true);
        try {
            grecaptcha.execute();
        } catch (e) {
            pendingAction = null;
            setPrimaryLoading(false);
            action();
        }
    }

    // Called by grecaptcha once the challenge is solved (data-callback).
    window.onRecaptchaSuccess = function (token) {
        var action = pendingAction;
        pendingAction = null;
        setPrimaryLoading(false);
        try { grecaptcha.reset(); } catch (e) { }
        if (action) action(token);
    };

    // Called on challenge expiry/error (data-expired-callback/data-error-callback).
    window.onRecaptchaReset = function () {
        pendingAction = null;
        setPrimaryLoading(false);
        try { grecaptcha.reset(); } catch (e) { }
    };

    if (primaryBtn) primaryBtn.addEventListener('click', function () {
        hideEmailError();
        hideEmailSuccess();
        clearInvalid();
        var email = emailInput.value.trim();
        var pass = passwordInput.value;

        if (mode === 'signup') {
            var name = nameInput.value.trim();
            if (name.length < 2) {
                markInvalid(nameInput, true); showEmailError('Please enter your full name.'); nameInput.focus(); return;
            }
        }
        if (!isValidEmail(email)) {
            markInvalid(emailInput, true); showEmailError('Please enter a valid email address.'); emailInput.focus(); return;
        }
        if (mode === 'reset') { withRecaptcha(function () { doReset(email); }); return; }
        if (mode === 'signup') {
            if (pass.length < 6) {
                markInvalid(passwordInput, true); showEmailError('Password must be at least 6 characters.'); passwordInput.focus(); return;
            }
            var signupName = nameInput.value.trim();
            withRecaptcha(function () { doSignup(signupName, email, pass); });
        } else {
            if (!pass) {
                markInvalid(passwordInput, true); showEmailError('Please enter your password.'); passwordInput.focus(); return;
            }
            withRecaptcha(function () { doLogin(email, pass); });
        }
    });

    if (toggleBtn) toggleBtn.addEventListener('click', function () {
        setMode(mode === 'login' ? 'signup' : 'login');
    });

    if (forgotBtn) forgotBtn.addEventListener('click', function () {
        setMode('reset');
        emailInput.focus();
    });

    if (passwordInput) passwordInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') primaryBtn.click();
    });
})()

var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var target = redirectUrl || "/shop/dashboard";
        if (justLoggedIn) {
            // Fresh login — confirm success, then redirect after a brief beat.
            showAuthOverlay('Login successful! Redirecting…', true);
            setTimeout(function () { window.location.href = target; }, 800);
        } else {
            // Restored session on page load — go straight through.
            window.location.href = target;
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


function isAndroid() { return /Android/i.test(navigator.userAgent); }
function isIOS() { return /iPhone|iPad|iPod/i.test(navigator.userAgent); }
function isApplePlatform() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;
    // iPadOS 13+ reports as "Macintosh"; distinguish it by touch support.
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true;
    return false;
}

function checkAndRedirect() {
    if (!shouldOpenInBrowser()) {
        nmodal();
        return;
    }

    if (isAndroid()) {
        // Android: hand the page to Chrome directly. If Chrome isn't installed the
        // intent falls back to the default browser via the S.browser_fallback_url.
        openInExternalBrowser();
        // Still show a manual fallback in case the intent is blocked.
        Swal.fire({
            position: "center", icon: "warning", html: `
        <div>
            <h3>Opening in Chrome…</h3>
            <p>If it doesn't open automatically, tap the <b>⋮</b> menu (top-right) and choose <b>"Open in Chrome"</b>, or copy the link below.</p>
            <button class="swal2-confirm swal2-styled" style="background-color: #a9dd36; color: black;" onclick="openInExternalBrowser()"> Open in Chrome </button>
            <button class="swal2-confirm swal2-styled" style="background-color: #eee; color: black;" onclick="copyToClipboard()"> Copy Link </button>
        </div>`, showConfirmButton: false,
        });
        return;
    }

    // iOS (and anything else): there is no reliable way to force an external
    // browser open, so guide the user to the in-app menu.
    Swal.fire({
        position: "center", icon: "warning", html: `
        <div>
            <h3>This is not a Traditional Browser !</h3>
            <p>Tap the <b>⋯</b> menu at the bottom-right, then choose <b>"Open in browser"</b> (or Safari/Chrome) to use ASG SHOP.</p>
            <button class="swal2-confirm swal2-styled" style="background-color: #a9dd36; color: black;" onclick="copyToClipboard()"> Click to Copy ASG SHOP Link </button>
        </div>`, showConfirmButton: false,
    });
}

function shouldOpenInBrowser() { var userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera; return /FBAN|FBAV|Instagram/i.test(userAgent); }

function openInExternalBrowser() {
    var url = window.location.href;
    if (isAndroid()) {
        var noScheme = url.replace(/^https?:\/\//, '');
        var intentUrl = 'intent://' + noScheme +
            '#Intent;scheme=https;package=com.android.chrome;' +
            'S.browser_fallback_url=' + encodeURIComponent(url) + ';end';
        window.location.href = intentUrl;
    } else {
        // No reliable programmatic escape on iOS — fall back to copy.
        copyToClipboard();
    }
}

function copyToClipboard() {
    var currentPageURL = window.location.href;
    function done() {
        Swal.fire({ position: "center", toast: false, icon: "success", text: "Link copied successfully! Now open in Chrome or any other suitable browser.", showConfirmButton: true, });
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentPageURL).then(done).catch(function () { legacyCopy(currentPageURL); done(); });
    } else {
        legacyCopy(currentPageURL);
        done();
    }
    return currentPageURL;
}

function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
}

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
    var otpBoxes = Array.prototype.slice.call(document.querySelectorAll('.otp-box'));
    var submitting = false;
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

    // The user types the local number (with or without a leading 0); we normalise
    // to the 10-digit local part and send it to the API in +880 E.164 form.
    function normalizeBDLocal(raw) {
        var d = String(raw).replace(/\D/g, '');
        if (d.indexOf('880') === 0) d = d.slice(3); // strip country code if typed
        if (d.charAt(0) === '0') d = d.slice(1);     // strip trunk 0
        return d;
    }
    function isValidBDMobile(local) { return /^1[3-9]\d{8}$/.test(local); }
    function toE164BD(local) { return '+880' + local; }

    function formatTime(sec) {
        return String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
    }

    // ---- Segmented OTP helpers ----
    function getOtp() { return otpBoxes.map(function (b) { return b.value; }).join(''); }
    function clearOtp() { otpBoxes.forEach(function (b) { b.value = ''; b.classList.remove('filled'); }); }
    function setOtpDisabled(disabled) { otpBoxes.forEach(function (b) { b.disabled = disabled; }); }
    function focusFirstEmpty() {
        for (var i = 0; i < otpBoxes.length; i++) {
            if (!otpBoxes[i].value) { otpBoxes[i].focus(); return; }
        }
        otpBoxes[otpBoxes.length - 1].focus();
    }
    function refreshVerifyState() {
        if (submitting) return; // don't re-enable while a verification is in flight
        verifyBtn.disabled = getOtp().length !== 6 || countdown === 0;
    }
    function fillOtp(digits, startIdx) {
        digits = String(digits).replace(/\D/g, '');
        // A full-length paste/autofill always fills from the first box.
        var i = digits.length >= otpBoxes.length ? 0 : (startIdx || 0);
        for (var d = 0; d < digits.length && i < otpBoxes.length; d++, i++) {
            otpBoxes[i].value = digits[d];
            otpBoxes[i].classList.add('filled');
        }
        focusFirstEmpty();
        refreshVerifyState();
        maybeAutoSubmit();
    }
    function maybeAutoSubmit() {
        if (!submitting && countdown > 0 && getOtp().length === 6) {
            doVerifyOTP(currentPhone, getOtp());
        }
    }

    function updateCountdownUI() {
        if (countdown > 0) {
            countdownEl.textContent = 'Expires in ' + formatTime(countdown);
            countdownEl.style.color = 'var(--muted)';
            setOtpDisabled(false);
            refreshVerifyState();
            resendBtn.disabled = true;
        } else {
            countdownEl.textContent = 'Code expired';
            countdownEl.style.color = '#fd7e14';
            setOtpDisabled(true);
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
        submitting = false;
        clearOtp();
        verifyBtn.disabled = true;
        hideError(otpError);
        startCountdown();
        if (otpBoxes[0]) otpBoxes[0].focus();
    }

    function showPhoneStep() {
        otpStep.style.display = 'none';
        phoneStep.style.display = 'block';
        stopCountdown();
        hideError(phoneError);
    }

    function setSendLoading(loading) {
        sendBtn.disabled = loading;
        sendBtn.textContent = loading ? 'Sending...' : 'Send code';
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
            switch (data.status) {
                case 200: showOtpStep(phone); break;
                case 400: showError(phoneError, data.message); break;
                case 409: showError(phoneError, data.message); break;
                case 429: showError(phoneError, data.message); break;
                case 500: showError(phoneError, 'Failed to send OTP. Try again.'); break;
                default:  showError(phoneError, data.message || 'Failed to send OTP.'); break;
            }
        } catch (e) {
            showError(phoneError, 'Network error. Please try again.');
        }
        setSendLoading(false);
    }

    async function doVerifyOTP(phone, otp) {
        if (submitting) return;
        submitting = true;
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
                beginAuth();
                await firebase.auth().signInWithCustomToken(data.token);
                saveLastLoginMethod('phone');
                // onAuthStateChanged handles redirect
            } else if (data.status === 409) {
                // Phone belongs to a different account — hard stop, user must change number
                stopCountdown();
                submitting = false;
                showError(otpError, data.message || 'This phone number is already linked to another account.');
            } else if (data.status === 429) {
                stopCountdown();
                submitting = false;
                showPhoneStep();
                showError(phoneError, data.message || 'Too many attempts. Please try again.');
            } else {
                submitting = false;
                showError(otpError, data.message || 'Invalid or expired code.');
                setVerifyLoading(false);
                clearOtp();
                if (otpBoxes[0]) otpBoxes[0].focus();
            }
        } catch (e) {
            submitting = false;
            endAuthFailure();
            showError(otpError, 'Network error. Please try again.');
            setVerifyLoading(false);
        }
    }

    otpBoxes.forEach(function (box, idx) {
        box.addEventListener('input', function () {
            var val = this.value.replace(/\D/g, '');
            if (val.length > 1) { fillOtp(val, idx); return; } // paste/autofill landed in one box
            this.value = val;
            this.classList.toggle('filled', !!val);
            if (val && idx < otpBoxes.length - 1) otpBoxes[idx + 1].focus();
            refreshVerifyState();
            if (val) maybeAutoSubmit();
        });
        box.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && !this.value && idx > 0) {
                e.preventDefault();
                otpBoxes[idx - 1].value = '';
                otpBoxes[idx - 1].classList.remove('filled');
                otpBoxes[idx - 1].focus();
                refreshVerifyState();
            } else if (e.key === 'ArrowLeft' && idx > 0) {
                e.preventDefault(); otpBoxes[idx - 1].focus();
            } else if (e.key === 'ArrowRight' && idx < otpBoxes.length - 1) {
                e.preventDefault(); otpBoxes[idx + 1].focus();
            } else if (e.key === 'Enter') {
                verifyBtn.click();
            }
        });
        box.addEventListener('focus', function () { this.select(); });
        box.addEventListener('paste', function (e) {
            e.preventDefault();
            var text = (e.clipboardData || window.clipboardData).getData('text');
            fillOtp(text, 0);
        });
    });

    sendBtn.addEventListener('click', function () {
        hideError(phoneError);
        phoneInput.classList.remove('is-invalid');
        var local = normalizeBDLocal(phoneInput.value);
        if (!isValidBDMobile(local)) {
            phoneInput.classList.add('is-invalid');
            showError(phoneError, 'Enter a valid Bangladeshi mobile number (e.g. 01712345678).');
            phoneInput.focus();
            return;
        }
        doSendOTP(toE164BD(local)); // sends +8801XXXXXXXXX
    });

    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
        this.classList.remove('is-invalid');
        hideError(phoneError);
    });

    phoneInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendBtn.click();
    });

    verifyBtn.addEventListener('click', function () {
        if (getOtp().length === 6 && countdown > 0) doVerifyOTP(currentPhone, getOtp());
    });

    resendBtn.addEventListener('click', function () {
        if (countdown === 0) doSendOTP(currentPhone);
    });

    changeNumberBtn.addEventListener('click', showPhoneStep);
})();