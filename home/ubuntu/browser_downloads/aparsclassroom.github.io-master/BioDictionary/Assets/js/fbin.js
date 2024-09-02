var app_firebase = {};
(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyDpX318g79F8msrHeEEifiSO06e5twwu9w",
        authDomain: "asg-biodictionary.firebaseapp.com",
        projectId: "asg-biodictionary",
        storageBucket: "asg-biodictionary.appspot.com",
        messagingSenderId: "342222541178",
        appId: "1:342222541178:web:d3ad1c34fdcdb71ad046c3",
        measurementId: "G-MQV49ZPHK7"
    };

    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;
    firebase.analytics();
})()
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});