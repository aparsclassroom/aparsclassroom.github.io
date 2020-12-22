var app_firebase = {};
(function () { 
    var firebaseConfig = {
        apiKey: "AIzaSyBfAZ4cn7orcPnmSGYO-bk_M1DDIheu944",
        authDomain: "aparsbiodictionary.firebaseapp.com",
        projectId: "aparsbiodictionary",
        storageBucket: "aparsbiodictionary.appspot.com",
        messagingSenderId: "822392075528",
        appId: "1:822392075528:web:88e7424909b997ad9228bd",
        measurementId: "G-QVPSFBGT5M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  app_firebase = firebase;
})()
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});