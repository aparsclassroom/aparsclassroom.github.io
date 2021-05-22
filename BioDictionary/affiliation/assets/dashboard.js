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
                fetch(api + "?q=analytics&uid=" + user.uid).then((res) => {
                    return res.json();
                }).then((loadedData) => {
                    if (loadedData.code === 200) {
                        if (user.photoURL != null) {
                            document.getElementById('profile').src = user.photoURL;
                        }
                        document.getElementById('notify').innerText = loadedData.Comment;
                        document.getElementById('inWallet').innerText = loadedData.Remaning_in_Wallet;
                        document.getElementById('totalEarning').innerText = loadedData.Total_Income;
                        document.getElementById('ttsell').innerText = loadedData.Total_Sell;
                        document.getElementById('totalVerify').innerText = loadedData.Verified_Direct_Income + loadedData.Total_Passive_Income + " ৳";
                        document.getElementById('totalPending').innerText = loadedData.Pending_Direct_Income + loadedData.Total_Pending_Pasive_Income + " ৳";

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
                        // return location.replace("../");
                    }
                }).catch((err => {
                    console.log(err);
                }))
            }
        } else {
            // location.replace("../");
        }
    })
}
window.onload = function() {
    initApp();
};