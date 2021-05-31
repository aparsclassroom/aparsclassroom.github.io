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
                            },
                            dom: 'Bfrtip',
                            buttons: [{
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    filename: 'Transactions ' + new Date().toLocaleString('en-IN')
                                },
                                {
                                    extend: 'pdfHtml5',
                                    text: 'PDF',
                                    filename: 'Transactions ' + new Date().toLocaleString('en-IN'),
                                    title: 'Sales Analytics of' + data.Affiliation_Token,
                                    message: 'Exported : ' + new Date().toLocaleString('en-IN'),
                                    customize: function(doc) {
                                        // Splice the image in after the header, but before the table
                                        doc.content.splice(1, 0, {
                                            margin: [0, 0, 0, 12],
                                            alignment: 'top',
                                            image: 'data:image/png;base64,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'
                                        });
                                    }
                                }
                            ]
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