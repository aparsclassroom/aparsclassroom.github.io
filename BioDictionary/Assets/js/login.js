(function () {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
        var uiConfig = {
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                return true;
              },
              uiShown: function() {
                document.getElementById('loader').style.display = 'none';
              }
            },
            signInFlow: 'popup',
            signInSuccessUrl: 'index.html',
               signInOptions: [
                  {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
                  }

            ],
          }; 
    ui.start('#firebaseui-auth-container', uiConfig);
    })()
    
          var mainApp = {};
    (function() {
        var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        uid = user.uid;
        window.location.replace("index.html");
      }
    });
    })()