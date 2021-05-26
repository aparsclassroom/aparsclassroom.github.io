function logOut() {
    firebase.auth().signOut();
    initApp();
}
const api = "https://script.google.com/macros/s/AKfycby0pJjKWiQaGHWrlQc-08nlDaEp0H9Gj3sg_nILgVxE12y8rxUrdXZ3-K19hzvHR86xpA/exec";
const tranApi = "https://script.google.com/macros/s/AKfycbxBDO2bBcOIDDMKiNMIisa3j84TEzM2FbsaiuWEzkVae4xRF-Fe27uP8ZuxaQ9OxVeM/exec";

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
                        let data = loadedData.data;
                        if (user.photoURL != null) {
                            document.getElementById('profile').src = user.photoURL;
                        }
                        document.getElementById('notify').innerText = data.Comment;
                        document.getElementById('inWallet').innerText = data.Remaning_in_Wallet;
                        document.getElementById('totalEarning').innerText = data.Total_Income;
                        document.getElementById('ttsell').innerText = data.Total_Sell;
                        document.getElementById('totalVerify').innerText = data.Verified_Direct_Income + data.Total_Passive_Income + " ৳";
                        document.getElementById('totaltranx').innerText = data.Total_Sell + data.Passive_Sell + data.Passive_Square_Sell;

                        var label = ['Direct Income', 'Passive Income', 'Passive² Income'];
                        var ctx = document.getElementById('myChart').getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['Direct Sell', 'Passive Sell', 'Passive² Sell'],
                                datasets: [{
                                    label: 'Transactions Occured',
                                    data: [data.Total_Sell, data.Passive_Sell, data.Passive_Square_Sell],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(238, 133, 171, 0.2)'
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
                                    data: [data.Verified_Direct_Income, data.Verified_Passive_Income, data.Verified_Passive_Square_Income],
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

                        fetch(tranApi + "?q=transactions&token=aff-" + data.Affiliation_Token)
                            .then((res) => {
                                return res.json()
                            })
                            .then((load) => {
                                if (load.code === 200) {
                                    let tr = load.data;
                                    tr.forEach(element => {
                                        console.log(element)
                                    });
                                } else {
                                    console.log(load.message)
                                }
                            }).catch((err) => {
                                console.log(err.message)
                            })


                    } else {
                        alert(loadedData.message + "\n\nIf You are using a gifted account.\nPlease buy this app to use Zombie Mode.");
                        return location.replace("../");
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        } else {
            location.replace("../");
        }
    })
}
window.onload = function() {
    initApp();
};