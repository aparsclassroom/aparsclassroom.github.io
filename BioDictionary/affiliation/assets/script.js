var Mobile = document.getElementById('Mobile');
var Bkash = document.getElementById('Bkash');
var Nagad = document.getElementById('Nagad');
var Rocket = document.getElementById('Rocket');
var college = document.getElementById('College');
var fb = document.getElementById('fb');
var status = document.getElementById('bio');
var updateBtn = document.getElementById('updateBtn');

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
                location.replace("../index.html");
                return;
            } else {
                const script = 'https://script.google.com/macros/s/AKfycbyuNPvS8KpkFFPTBUUU0hGZdgbPDM51MhLip3EuIb-IcI_6C0DkAiiT_tL1om-hATi1qA/exec';
                fetch(script + "?uid=" + user.uid).then((res) => {
                    return res.json();
                }).then((loadedData) => {
                    if (loadedData.code === 200) {
                        document.getElementById('desc').innerHTML = loadedData.Status;
                        document.getElementById('bio').innerText = loadedData.Status;
                        if (user.photoURL != null) {
                            document.getElementById('avatar').src = user.photoURL;
                            document.getElementById('profile').src = user.photoURL;
                        }
                        document.getElementById('con').innerText = loadedData.Controler_Name;
                        document.getElementById('cont').href = "tel:" + loadedData.Controler_Info;
                        document.getElementById('Username').value = loadedData.Name;
                        document.getElementById('email').value = user.email;
                        document.getElementById('uid').value = user.uid;
                        document.getElementById('notify').innerText = loadedData.Comment;
                        document.getElementById('afflink').innerText = loadedData.Affiliation_Link;
                        // document.getElementById('inWallet').innerText = loadedData.Remaning_in_Wallet;
                        // document.getElementById('totalEarning').innerText = loadedData.Total_Income;
                        // document.getElementById('ttsell').innerText = loadedData.Total_Sell;
                        college.value = loadedData.College_University;
                        document.getElementById('Mobile').value = loadedData.Mobile;
                        Bkash.value = loadedData.Bkash;
                        fb.value = loadedData.Facebook_Link;
                        if (loadedData.Nagad != "") {
                            Nagad.value = loadedData.Nagad;
                        }
                        if (loadedData.Rocket != "") {
                            Rocket.value = loadedData.Rocket;
                        }
                        document.getElementById('aff').value = loadedData.Affiliation_Token;
                        document.getElementById('name').innerText = user.displayName;
                        document.getElementById('fbLink').addEventListener('click', () => {
                            window.open(loadedData.Facebook_Link)
                        });


                        var clipboard = new ClipboardJS('.cp');

                        clipboard.on('success', function(e) {
                            // alert(e.text + " copied successfully!!")
                            blackDashboard.showSidebarMessage("Copied successfully!!");
                            e.clearSelection();
                        });

                        clipboard.on('error', function(e) {
                            console.error('Action:', e.action);
                            console.error('Trigger:', e.trigger);
                        });
                        updateBtn.addEventListener('click', () => {
                            blackDashboard.showSidebarMessage("Updated !");
                            var Status = document.getElementById('bio');
                            var ss = Status.value;
                            document.getElementById('desc').innerHTML = ss;
                            var url = script + "?callback=ctrlq&uid=" + user.uid + "&Status=" + ss.trim() + "&Mobile=" + Mobile.value.trim() + "&Bkash=" + Bkash.value.trim() + "&Nagad=" + Nagad.value.trim() + "&Rocket=" + Rocket.value.trim() + "&College=" + college.value.trim() + "&fb=" + fb.value.trim() + "&action=update"
                            fetch(url).then((res) => {
                                updateBtn.innerText = "Update Again?";
                                return res.json();
                            }).catch((e) => {
                                updateBtn.innerText = "Can't Update 😶";
                            })
                        })
                    } else {
                        alert(loadedData.message + "\n\nYou are using a gifted account.\nPlease buy this app to use Zombie Mode.");
                        return location.replace("../index.html");
                    }
                }).catch((err => {
                    blackDashboard.showSidebarMessage(err);
                }))
            }
        } else {
            location.replace("../index.html");
        }
    })
}
window.onload = function() {
    initApp();
};