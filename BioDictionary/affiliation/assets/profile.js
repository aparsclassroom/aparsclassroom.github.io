var Mobile = document.getElementById('Mobile');
var Bkash = document.getElementById('Bkash');
var Nagad = document.getElementById('Nagad');
var Rocket = document.getElementById('Rocket');
var college = document.getElementById('College');
var fb = document.getElementById('fb');
var status = document.getElementById('bio');
var updateBtn = document.getElementById('updateBtn');
const api = "https://script.google.com/macros/s/AKfycbwM3zTmAIX9AH4P-7-qG9GMI4aRUXZxEDAIOHEjO6Ln1xaTVJ3DTw62q4GMJ8dCqCg3Hw/exec";

function logOut() {
    firebase.auth().signOut();
    initApp();
}

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("../");
                return;
            } else {
                fetch(api + "?q=profile&uid=" + user.uid).then((res) => {
                    return res.json();
                }).then((loadedData) => {
                    if (loadedData.code === 200) {
                        let data = loadedData.data;
                        document.getElementById('desc').innerHTML = data.Status;
                        document.getElementById('bio').innerText = data.Status;
                        if (user.photoURL != null) {
                            document.getElementById('avatar').src = user.photoURL;
                            document.getElementById('profile').src = user.photoURL;
                        }
                        document.getElementById('Username').value = data.Name;
                        document.getElementById('email').value = user.email;
                        document.getElementById('uid').value = user.uid;
                        document.getElementById('notify').innerText = data.Comment;
                        document.getElementById('afflink').innerText = data.Affiliation_Link;
                        college.value = data.College_University;
                        document.getElementById('Mobile').value = data.Mobile;
                        Bkash.value = data.Bkash;
                        fb.value = data.Facebook_Link;
                        if (data.Nagad != "") {
                            Nagad.value = data.Nagad;
                        }
                        if (data.Rocket != "") {
                            Rocket.value = data.Rocket;
                        }
                        document.getElementById('aff').value = "aff-" + data.Affiliation_Token;
                        document.getElementById('name').innerText = user.displayName;
                        document.getElementById('fbLink').addEventListener('click', () => {
                            window.open(data.Facebook_Link)
                        });


                        var clipboard = new ClipboardJS('.cp');

                        clipboard.on('success', function(e) {
                            $.notify({
                                icon: "tim-icons icon-bell-55",
                                message: "Copied successfully!!"

                            }, {

                                timer: 8000,
                                placement: {
                                    from: "bottom",
                                    align: "center"
                                }
                            });
                            e.clearSelection();
                        });

                        clipboard.on('error', function(e) {
                            alert('Action:', e.action);
                            alert('Trigger:', e.trigger);
                        });
                        updateBtn.addEventListener('click', () => {
                            updateBtn.innerText = "Update";
                            $.notify({
                                icon: "tim-icons icon-bell-55",
                                message: "Changes Saved !"

                            }, {
                                timer: 8000,
                                placement: {
                                    from: "bottom",
                                    align: "center"
                                }
                            });
                            var Status = document.getElementById('bio');
                            var ss = Status.value;
                            document.getElementById('desc').innerHTML = ss;
                            var url = api + "?uid=" + user.uid + "&Status=" + ss.trim() + "&Mobile=" + Mobile.value.trim() + "&Bkash=" + Bkash.value.trim() + "&Nagad=" + Nagad.value.trim() + "&Rocket=" + Rocket.value.trim() + "&College=" + college.value.trim() + "&fb=" + fb.value.trim() + "&action=update"
                            fetch(url)
                                .then(() => {
                                    updateBtn.innerText = "Update Again ?";
                                }).catch(() => {
                                    updateBtn.innerText = "Can't Update 😶";
                                })
                        })
                    } else {
                        alert(loadedData.message + "\n\nYou are using a gifted account.\nPlease buy this app to use Zombie Mode.");
                        return location.replace("../");
                    }
                }).catch((err => {
                    blackDashboard.showSidebarMessage(err);
                }))
            }
        } else {
            location.replace("../");
        }
    })
}
window.onload = function() {
    initApp();
};