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
                        document.getElementById('inWallet').innerText = loadedData.Remaning_in_Wallet;
                        document.getElementById('totalEarning').innerText = loadedData.Total_Income;
                        document.getElementById('ttsell').innerText = loadedData.Total_Sell;
                        document.getElementById('totalVerify').innerText = loadedData.Verified_Direct_Income + loadedData.Total_Passive_Income + " ৳";
                        document.getElementById('totalPending').innerText = loadedData.Pending_Direct_Income + loadedData.Total_Pending_Pasive_Income + " ৳";
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
                            blackDashboard.showSidebarMessage(e.text + " copied successfully!!");
                            e.clearSelection();
                        });

                        clipboard.on('error', function(e) {
                            console.error('Action:', e.action);
                            console.error('Trigger:', e.trigger);
                        });
                        updateBtn.addEventListener('click', () => {
                            updateBtn.innerText = "Updated !";
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
                        var label = ['Direct Income', 'Passive Income', 'Passive² Income'];
                        var ctx = document.getElementById('myChart').getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: label,
                                datasets: [{
                                    label: 'Pending Earnings',
                                    data: [loadedData.Pending_Direct_Income, loadedData.Pending_Passive_Income, loadedData.Pending_Passive_Square_Income],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(238, 133, 171, 1)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(238, 133, 171, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        });
                        var ctx = document.getElementById('myChart2').getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: label,
                                datasets: [{
                                    label: 'Verified Earnings',
                                    data: [loadedData.Verified_Direct_Income, loadedData.Verified_Passive_Income, loadedData.Verified_Passive_Square_Income],
                                    backgroundColor: [
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 227, 171, 1)'
                                    ],
                                    borderColor: [
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 227, 171, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        });
                    } else {
                        alert(loadedData.message + "\n\nYou are using a gifted account.\nPlease buy this app to use Zombie Mode.");
                        return location.replace("../index.html");
                    }
                }).catch((err => {
                    console.log(err);
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