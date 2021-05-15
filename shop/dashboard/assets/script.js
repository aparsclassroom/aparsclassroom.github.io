  window.onload = function() {
      // Listening for auth state changes.
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              // User is signed in.
              var uid = user.uid;
              var email = user.email;
              var photoURL = user.photoURL;
              var phoneNumber = user.phoneNumber;
              var isAnonymous = user.isAnonymous;
              var displayName = user.displayName;
              var providerData = user.providerData;
              var emailVerified = user.emailVerified;

              alert("Your mobile number : " + phoneNumber + " is now verified !!!")
              window.history.back();
          }
          updateSignInButtonUI();
          updateSignInFormUI();
      });

      // Event bindings.
      document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
      document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);
      document.getElementById('verification-code').addEventListener('keyup', updateVerifyCodeButtonUI);
      document.getElementById('verification-code').addEventListener('change', updateVerifyCodeButtonUI);
      document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
      document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);

      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              onSignInSubmit();
          }
      });

      recaptchaVerifier.render().then(function(widgetId) {
          window.recaptchaWidgetId = widgetId;
          updateSignInButtonUI();
      });
  };

  /**
   * Function called when clicking the Login/Logout button.
   */
  function onSignInSubmit() {
      if (isPhoneNumberValid()) {
          window.signingIn = true;
          updateSignInButtonUI();
          var phoneNumber = getPhoneNumberFromUserInput();
          var appVerifier = window.recaptchaVerifier;
          firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
              .then(function(confirmationResult) {
                  // SMS sent. Prompt user to type the code from the message, then sign the
                  // user in with confirmationResult.confirm(code).
                  window.confirmationResult = confirmationResult;
                  window.signingIn = false;
                  updateSignInButtonUI();
                  updateVerificationCodeFormUI();
                  updateVerifyCodeButtonUI();
                  updateSignInFormUI();
              }).catch(function(error) {
                  // Error; SMS not sent
                  window.alert(error.code + '\n\n' + error.message);
                  window.signingIn = false;
                  updateSignInFormUI();
                  updateSignInButtonUI();
              });
      }
  }

  /**
   * Function called when clicking the "Verify Code" button.
   */
  function onVerifyCodeSubmit(e) {
      e.preventDefault();
      if (!!getCodeFromUserInput()) {
          window.verifyingCode = true;
          updateVerifyCodeButtonUI();
          var code = getCodeFromUserInput();
          confirmationResult.confirm(code).then(function(result) {
              // User signed in successfully.
              var user = result.user;
              window.verifyingCode = false;
              window.confirmationResult = null;
              updateVerificationCodeFormUI();
          }).catch(function(error) {
              window.alert(error.code + '\n\n' + error.message);
              window.verifyingCode = false;
              updateSignInButtonUI();
              updateVerifyCodeButtonUI();
          });
      }
  }

  /**
   * Cancels the verification code input.
   */
  function cancelVerification(e) {
      e.preventDefault();
      window.confirmationResult = null;
      updateVerificationCodeFormUI();
      updateSignInFormUI();
  }
  /**
   * Reads the verification code from the user input.
   */
  function getCodeFromUserInput() {
      return document.getElementById('verification-code').value;
  }

  /**
   * Reads the phone number from the user input.
   */
  function getPhoneNumberFromUserInput() {
      return document.getElementById('phone-number').value;
  }

  /**
   * Returns true if the phone number is valid.
   */
  function isPhoneNumberValid() {
      var pattern = /^\+[0-9\s\-\(\)]+$/;
      var phoneNumber = getPhoneNumberFromUserInput();
      return phoneNumber.search(pattern) !== -1;
  }

  /**
   * Re-initializes the ReCaptacha widget.
   */
  function resetReCaptcha() {
      if (typeof grecaptcha !== 'undefined' &&
          typeof window.recaptchaWidgetId !== 'undefined') {
          grecaptcha.reset(window.recaptchaWidgetId);
      }
  }

  /**
   * Updates the Sign-in button state depending on ReCAptcha and form values state.
   */
  function updateSignInButtonUI() {
      document.getElementById('sign-in-button').disabled = !isPhoneNumberValid() ||
          !!window.signingIn;
  }

  /**
   * Updates the Verify-code button state depending on form values state.
   */
  function updateVerifyCodeButtonUI() {
      document.getElementById('verify-code-button').disabled = !!window.verifyingCode ||
          !getCodeFromUserInput();
  }

  /**
   * Updates the state of the Sign-in form.
   */
  function updateSignInFormUI() {
      if (firebase.auth().currentUser || window.confirmationResult) {
          document.getElementById('sign-in-form').style.display = 'none';
      } else {
          resetReCaptcha();
          document.getElementById('sign-in-form').style.display = 'block';
      }
  }

  /**
   * Updates the state of the Verify code form.
   */
  function updateVerificationCodeFormUI() {
      if (!firebase.auth().currentUser && window.confirmationResult) {
          document.getElementById('verification-code-form').style.display = 'block';
      } else {
          document.getElementById('verification-code-form').style.display = 'none';
      }
  }