importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyD4WuQA56koZ-qWV56rDXDTtczaCVnGft8",
    authDomain: "asg-shop.firebaseapp.com",
    projectId: "asg-shop",
    storageBucket: "asg-shop.appspot.com",
    messagingSenderId: "374714320984",
    appId: "1:374714320984:web:d2d308f1ea2a9f46bbe22d",
    measurementId: "G-P18HXDWK2Y"
});

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         image: payload.notification.image,
//         link: payload.notification.link
//     };

//     self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });