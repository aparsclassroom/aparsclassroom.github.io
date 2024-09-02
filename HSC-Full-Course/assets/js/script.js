var app_firebase = {};
(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyDWpAK3PGkY_mCf2tH-n4kLiK_ffj2TnWg",
    authDomain: "hsc-full-course-website.firebaseapp.com",
    projectId: "hsc-full-course-website",
    storageBucket: "hsc-full-course-website.appspot.com",
    messagingSenderId: "202898992993",
    appId: "1:202898992993:web:fa6cc64869a75017a8df20",
    measurementId: "G-C0LYS6QJ6G",
  };
  firebase.initializeApp(firebaseConfig);
  app_firebase = firebase;
})();
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
var mainApp = {};
(function () {
  var firebase = app_firebase;
  var uid = null;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      uid = user.uid;
      uname = user.displayName;
      email = user.email;
      secured = user.providerId;
      emailVerified = user.emailVerified;
      photoUrl = user.photoURL;
      document.getElementById("login").style.display = "none";
      document.getElementById("dp").innerHTML =
        '<img src="' + photoUrl + '" class="rounded mx-auto d-block" alt="dp">';
      document.getElementById("userName").innerHTML =
        "<strong>Name :</strong> " + uname;
      document.getElementById("userName2").innerHTML =
        "<strong>Phone :</strong> N/A";
      document.getElementById("uemail").innerHTML =
        "<strong>Email :</strong> " + email;
      document.getElementById("licenseFor").innerHTML =
        "<strong>License :</strong> " + uid;
      if (emailVerified == true) {
        document.getElementById("Subscription").innerHTML =
          "<strong>Subscription :</strong> Free Trial";
      }
      if (email == null) {
        document.getElementById("uemail").innerHTML =
          "<strong>Email :</strong> N/A";
      }
      if (emailVerified != true) {
        document.getElementById("Subscription").innerHTML =
          "<strong>Subscription :</strong> Free Trial";
      }
      if (photoUrl == null) {
        document.getElementById("dp").innerHTML = "";
      }
      if (uname == null) {
        document.getElementById("userName").innerHTML =
          "<strong>Name :</strong> N/A";
        document.getElementById("uemail").innerHTML =
          "<strong>Email :</strong> N/A";
        document.getElementById("dp").innerHTML = "";
      }
      if (user != null) {
        user.providerData.forEach(function (profile) {
          document.getElementById("secured").innerHTML =
            "<strong>Verified by :</strong> " + profile.providerId;
        });
      }
      if (user != null && uname == null) {
        user.providerData.forEach(function (profile) {
          document.getElementById("secured").innerHTML =
            "<strong>Verified by :</strong> " + profile.providerId;
          document.getElementById("userName2").innerHTML =
            "<strong>Phone :</strong> " + profile.uid;
        });
      }
    } else {
      document.getElementById("login").style.display = "inline-block";
      document.getElementById("accmd").style.display = "none";
    }
  });

  function logOut() {
    firebase.auth().signOut();
    document.getElementById("login").style.display = "inline-block";
    document.getElementById("accmd").style.display = "none";
    $("#accModal").modal("hide");
    alert("signed out");
  }
  mainApp.logOut = logOut;
})();

function onSubmit(token) {
  document.getElementById("form").submit();
}

$(
  (function () {
    "use strict";
    $(window).on("load", function () {
      $(".loader").fadeOut();
      $("#preloader").delay(350).fadeOut("slow");
      $("body").delay(350).css({
        overflow: "visible",
      });
      $(".all-container").css({
        opacity: "1",
      });
    });
  })(jQuery),
);
// document.getElementById("notify").addEventListener('click', function() {
//     if (window.Notification && Notification.permission === "granted") {
//         var notification = new Notification(title, {
//             body: noti,
//             icon: logo,
//             image: img
//         });
//     } else if (window.Notification && Notification.permission !== "denied") {
//         Notification.requestPermission(function(status) {
//             if (status === "granted") {
//                 var notification = new Notification(title, {
//                     body: noti,
//                     icon: logo,
//                     image: img
//                 });
//             } else {
//                 if (window.confirm(noti)) {
//                     window.open(noti2);
//                 };
//             }
//         });
//     } else {
//         if (window.confirm(noti)) {
//             window.open(noti2);
//         };
//     }
//     notification.onclick = function() {
//         window.open(noti2);
//     };
// });
