function logOut() {
    firebase.auth().signOut();
    initApp();
}
const api = "https://script.google.com/macros/s/AKfycbwhX1LG9NfBiod-_tP1owj6Ggf0OtssmmTqbiX_Eyxt7HoYb5jIOYqTUTjFH3cITdYj/exec";
const tranApi = "https://script.google.com/macros/s/AKfycbypsi551paklNBU2NBbezBR9PX7urGvV46ftSeVHDd5nixpt7fHPbmn_HIwJb6BwlpB/exec";

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
                        var m = data.Affiliation_Token;
                        var tok = m.split("?")[1].substring(0, 16);
                        if (user.photoURL != null) {
                            document.getElementById('profile').src = user.photoURL;
                        }
                        document.getElementById('notify').innerText = data.Comment;
                        document.getElementById('inWallet').innerText = data.Remaning_in_Wallet;
                        document.getElementById('totalEarning').innerText = data.Total_Income;
                        document.getElementById('ttsell').innerText = data.Total_Sell;
                        document.getElementById('totalVerify').innerText = data.Verified_Direct_Income + " ৳";
                        document.getElementById('totaltranx').innerText = data.Total_Sell;


                        var trans = document.getElementById('myChart').getContext("2d");
                        var sales = document.getElementById('myChart2').getContext("2d");


                        var gradientStroke = trans.createLinearGradient(0, 230, 0, 50);

                        gradientStroke.addColorStop(1, 'rgba(253,93,147,0.8)');

                        var gradientStroke2 = sales.createLinearGradient(0, 230, 0, 50);
                        gradientStroke2.addColorStop(0, 'rgba(253,93,147,0)');

                        async function getdata() {
                            var d = await fetch(tranApi + '?q=transactions&token=' + tok);
                            var data = await d.json();
                            return data.data;
                        }

                        getdata().then(res => {
                            var date = [];
                            var transData = []
                            var salesData = []
                            for (var i = 0; i < res.length; i++) {
                                var inDate = false;
                                for (var j = 0; j < date.length; j++)
                                    if (date[j] == res[i].time.split(',')[0]) {
                                        inDate = true;
                                        transData[j] += 1;
                                        salesData[j] += parseInt(res[i].amount.split('/')[0]);
                                    }
                                if (!inDate) {
                                    date.push(res[i].time.split(',')[0])
                                    transData.push(1);
                                    salesData.push(parseInt(res[i].amount.split('/')[0]));
                                }

                            }
                            var transChart = new Chart(trans, {
                                type: 'bar',
                                data: {
                                    labels: date,
                                    datasets: [{
                                        label: 'Number of Transaction(s)',
                                        data: transData,
                                        fill: true,
                                        backgroundColor: gradientStroke,
                                        hoverBackgroundColor: gradientStroke,
                                        borderColor: '#ff5991',
                                        borderWidth: 2,
                                        borderDash: [],
                                        borderDashOffset: 0.0
                                    }]
                                },
                                options: {
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }
                            });

                            var salesChart = new Chart(sales, {
                                type: 'bar',
                                data: {
                                    labels: date,
                                    datasets: [{
                                        label: 'Total Earning',
                                        data: salesData,
                                        backgroundColor: gradientStroke2,
                                        hoverBackgroundColor: gradientStroke2,
                                        borderColor: 'rgba(253,93,147,0)',
                                        borderWidth: 2,
                                        borderDash: [],
                                        borderDashOffset: 0.0
                                    }]
                                },
                                options: {
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }
                            });

                            const tdate = new Date().getDate();
                            const month = new Date().getMonth() + 1;
                            const year = new Date().getFullYear();

                            $('#datatable').DataTable({
                                "data": res,
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
                                    searchPlaceholder: "Search records"
                                },
                                dom: 'Blfrtip',
                                buttons: [{
                                        extend: 'excelHtml5',
                                        text: 'Excel',
                                        filename: 'Transactions of ' + tdate + '-' + month + '-' + year,
                                        sheetName: tdate + '-' + month + '-' + year,
                                        title: 'BioDictionary Sales Report of ' + tok,
                                    },
                                    {
                                        extend: 'pdfHtml5',
                                        text: 'PDF',
                                        filename: 'Transactions of ' + tdate + '-' + month + '-' + year,
                                        title: 'BioDictionary Sales Report of ' + tok,
                                        message: 'Exported : ' + new Date().toLocaleString('en-IN')
                                    }
                                ]
                            });


                        })


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