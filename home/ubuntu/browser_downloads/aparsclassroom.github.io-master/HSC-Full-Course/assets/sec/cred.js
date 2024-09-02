var app_firebase = {};
(function () { 
    var firebaseConfig = {
        apiKey: "AIzaSyDWpAK3PGkY_mCf2tH-n4kLiK_ffj2TnWg",
        authDomain: "hsc-full-course-website.firebaseapp.com",
        projectId: "hsc-full-course-website",
        storageBucket: "hsc-full-course-website.appspot.com",
        messagingSenderId: "202898992993",
        appId: "1:202898992993:web:fa6cc64869a75017a8df20",
        measurementId: "G-C0LYS6QJ6G"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();  
  app_firebase = firebase;
})()
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});