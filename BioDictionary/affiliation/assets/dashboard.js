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
                                        'rgba(255, 136, 0, 0.39)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgb(255, 136, 0)'
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
                                        'rgba(237, 255, 6, 0.3)'
                                    ],
                                    borderColor: [
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(225, 242, 0, 1)'
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

                        var table = $('#datatable').DataTable({
                            "ajax": "https://script.google.com/macros/s/AKfycbxBDO2bBcOIDDMKiNMIisa3j84TEzM2FbsaiuWEzkVae4xRF-Fe27uP8ZuxaQ9OxVeM/exec?q=transactions&token=aff-" + data.Affiliation_Token,
                            "columns": [{
                                "data": "customer"
                            }, {
                                "data": "amount"
                            }, {
                                "data": "cupon"
                            }, {
                                "data": "time"
                            }, {
                                "data": "invoice"
                            }],
                            "pagingType": "full_numbers",
                            "lengthMenu": [
                                [10, 25, 50, -1],
                                [10, 25, 50, "All"]
                            ],
                            "order": [
                                [3, "desc"]
                            ],
                            responsive: true,
                            language: {
                                search: "_INPUT_",
                                searchPlaceholder: "Search records",
                            }

                        });
                        document.getElementById("download-xlsx").addEventListener("click", function() {
                            table.download("xlsx", "Sales of " + data.Affiliation_Token + " - " + new Date().toLocaleString("en-IN") + ".xlsx", {
                                sheetName: "Sales - " + new Date().toLocaleString("en-IN")
                            });
                        });
                        const Title = "Total Sales - " + data.Affiliation_Token + " - " + new Date().toLocaleString("en-IN");
                        document.getElementById("download-pdf").addEventListener("click", function() {
                            table.download("pdf", "BioExam-global-result-BioDictionary.pdf", {
                                orientation: "portrait",
                                title: Title,
                            });
                        });
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