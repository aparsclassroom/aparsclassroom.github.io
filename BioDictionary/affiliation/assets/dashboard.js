function logOut() {
    firebase.auth().signOut();
    initApp();
}
const api = "https://script.google.com/macros/s/AKfycbwt7hdbMt8KjZldUVC11kfTiknZtVjyU7jVxosm1Y3t5xq8bIXzHGwDY4tWp90UagHjcw/exec";
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
                        const date = new Date().getDate();
                        const month = new Date().getMonth() + 1;
                        const year = new Date().getFullYear();
                        var m = data.Affiliation_Token;
                        var tok = m.split("?")[1].substring(0, 16);
                        $('#datatable').DataTable({
                            "ajax": "https://script.google.com/macros/s/AKfycbypsi551paklNBU2NBbezBR9PX7urGvV46ftSeVHDd5nixpt7fHPbmn_HIwJb6BwlpB/exec?q=transactions&token=" + tok,
                            "columns": [{
                                "data": "customer"
                            }, {
                                "data": "cupon"
                            }, {
                                "data": "amount"
                            }, {
                                "data": "commision",
                            }, {
                                "data": "earning",
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
                                [6, "desc"]
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
                                    filename: 'Transactions of ' + date + '-' + month + '-' + year,
                                    sheetName: date + '-' + month + '-' + year,
                                    title: 'BioDictionary Sales Analytics of ' + tok,
                                },
                                {
                                    extend: 'pdfHtml5',
                                    text: 'PDF',
                                    filename: 'Transactions of ' + date + '-' + month + '-' + year,
                                    title: 'BioDictionary Sales Analytics of ' + tok,
                                    message: 'Exported : ' + new Date().toLocaleString('en-IN')
                                }
                            ]
                        });
                    } else {
                        alert(loadedData.message + "\n\nPlease Contact Admin !");
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