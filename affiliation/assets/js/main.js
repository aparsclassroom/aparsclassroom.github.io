var app_firebase = {};
(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyAyU-djMPcTA6VcKFCAxEvN1DtP5kXjqug",
        authDomain: "biodictionary-crm.firebaseapp.com",
        projectId: "biodictionary-crm",
        storageBucket: "biodictionary-crm.appspot.com",
        messagingSenderId: "679328688513",
        appId: "1:679328688513:web:6c2cf97ef506030cfde080",
        measurementId: "G-JKBYM3KMYW"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
})()