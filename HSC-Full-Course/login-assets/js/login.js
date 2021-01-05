    var firebaseConfig = {
    apiKey: "AIzaSyDWpAK3PGkY_mCf2tH-n4kLiK_ffj2TnWg",
    authDomain: "hsc-full-course-website.firebaseapp.com",
    projectId: "hsc-full-course-website",
    storageBucket: "hsc-full-course-website.appspot.com",
    messagingSenderId: "202898992993",
    appId: "1:202898992993:web:fa6cc64869a75017a8df20",
    measurementId: "G-C0LYS6QJ6G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();  
  firebase.auth();
  
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
    
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
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
          }; 
    ui.start('#firebaseui-auth-container', uiConfig);
    })()
    function onSubmit(token) {
      document.getElementById("form").submit();
    }
    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var uname = user.displayName;
        alert("Hey" + " " + uname + ",\n you are already signed in");
        window.location.replace("index.html");
      } else {
        nmodal ();
        alert("Welcome 🥰");
      }
    });
    