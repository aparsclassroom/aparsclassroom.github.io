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