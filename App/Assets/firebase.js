var app_firebase = {};
(function () { 
    var firebaseConfig = {
      apiKey: "AIzaSyB3jSPyVWw1xFZwM2QHvEvGfjka1bvPJdU",
      authDomain: "apars-qna-app.firebaseapp.com",
      projectId: "apars-qna-app",
      storageBucket: "apars-qna-app.appspot.com",
      messagingSenderId: "1020053403181",
      appId: "1:1020053403181:web:f32e42e90b160f5402eaa4",
      measurementId: "G-9GFZCDHVVJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  app_firebase = firebase;
  firebase.analytics();
})()
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});