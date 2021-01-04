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
              firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
          }; 
    ui.start('#firebaseui-auth-container', uiConfig);
    })()
    var mainApp = {};
    (function() {
        var firebase = firebaseConfig;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        uid = user.uid;
        window.location.replace("home.html");
      }
    });
    })()
    // var mainApp = {};
    // (function() {
    //     var firebase = app_firebase;
    // var uid = null;
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     uid = user.uid;
    //     uname = user.displayName;
    //     email = user.email;
    //     secured = user.providerId;
    //     emailVerified = user.emailVerified;
    //     photoUrl = user.photoURL;
    //     document.getElementById("loginmd").style.display = "none";
    //     document.getElementById("accmd").style.display = "inline-block";
    //         document.getElementById("dp").innerHTML = '<img src="' + photoUrl +'" class="rounded mx-auto d-block" alt="dp">';
    //         document.getElementById("userName").innerHTML = "<strong>Name :</strong> " + uname;
    //         document.getElementById("userName2").innerHTML = "<strong>Phone :</strong> N/A";
    //         document.getElementById("uemail").innerHTML = "<strong>Email :</strong> " + email;
    //         document.getElementById("licenseFor").innerHTML = "<strong>License :</strong> " + uid;
    //         if(emailVerified == true) {
    //           document.getElementById("Subscription").innerHTML = "<strong>Subscription :</strong> Free Trial";
    //         }
    //         if(email == null) {
    //           document.getElementById("uemail").innerHTML = "<strong>Email :</strong> N/A";
    //         }
    //         if(emailVerified != true) {
    //           document.getElementById("Subscription").innerHTML = "<strong>Subscription :</strong> Free Trial";
    //         }
    //         if(uname == null) {
    //           document.getElementById("userName").innerHTML = "<strong>Name :</strong> N/A";
    //           document.getElementById("uemail").innerHTML = "<strong>Email :</strong> N/A";
    //           document.getElementById("dp").innerHTML = "";
    //         }
    // if (user != null) {
    //   user.providerData.forEach(function (profile) {
    //     document.getElementById("secured").innerHTML = "<strong>Verified by :</strong> " + profile.providerId;
    //   });
    // }
    // if (user != null && uname == null) {
    //   user.providerData.forEach(function (profile) {
    //     document.getElementById("secured").innerHTML = "<strong>Verified by :</strong> " + profile.providerId;
    //     document.getElementById("userName2").innerHTML = "<strong>Phone :</strong> " + profile.uid;
    //   });
    // }
    //   }else {
    //       document.getElementById("accmd").style.display = "none";
    //       document.getElementById("loginmd").style.display = "inline-block";
    //   }
    // });
    //     function logOut(){
    //         firebase.auth().signOut();
    //     }
    //     mainApp.logOut = logOut;
    // })()