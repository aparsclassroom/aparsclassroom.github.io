// Notification Logo
const logo = "assets/images/Logo-with-Name.png";

// Notification Poster
const img = "https://storymodelearning.com/img/fb/Thumbnail-image-fb.png";

// Notification Title
const title = "New Notification";

// Notification Body
const noti = "Hey There 🤩\nTry our Story Mode Learning App";

// Notification Link
const noti2 = "https://storymodelearning.com/registration";


// window.addEventListener('load', function() {
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