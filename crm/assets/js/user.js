function logOut() {
    firebase.auth().signOut();
    initApp();
}
var penl1, penl2, penl3, penl4, penl5, verl1, verl2, verl3, verl4, verl5;

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            fetch('https://script.google.com/macros/s/AKfycbynylOid2GFjXCvErwpnpg-IcvgeT5Rz3gcoFdRAZVO8hv8PH8luqCAl7nMszSEVvit/exec')
                .then((res) => {
                    return res.json();
                })
                .then((loadedData) => {
                    loadedData.find(dashboard => {
                        if (dashboard.UID === user.uid) {
                            penl1 = dashboard.Pending_Income_of_Link_1;
                            penl2 = dashboard.Pending_Income_of_Link_2;
                            penl3 = dashboard.Pending_Income_of_Link_3;
                            penl4 = dashboard.Pending_Income_of_Link_4;
                            penl5 = dashboard.Pending_Income_of_Link_5;

                            verl1 = dashboard.Verified_Income_of_Link_1;
                            verl2 = dashboard.Verified_Income_of_Link_2;
                            verl3 = dashboard.Verified_Income_of_Link_3;
                            verl4 = dashboard.Verified_Income_of_Link_4;
                            verl5 = dashboard.Verified_Income_of_Link_5;
                            var totalPen = penl1 + penl2 + penl3 + penl4 + penl5;
                            var totalv = verl1 + verl2 + verl3 + verl4 + verl5;

                            document.getElementById('status').innerText = dashboard.Status;
                            document.getElementById('avatar').src = dashboard.Image;
                            document.getElementById('profile').src = dashboard.Image;
                            document.getElementById('Username').value = dashboard.Name;
                            document.getElementById('email').value = dashboard.Email;
                            document.getElementById('nid').value = dashboard.NID;
                            document.getElementById('uid').value = dashboard.UID;
                            document.getElementById('clg').value = dashboard.College_University;
                            document.getElementById('mbl1').value = dashboard.Mobile_1;
                            document.getElementById('bkash').value = dashboard.Bkash;
                            if (dashboard.Mobile_2 != "") {
                                document.getElementById('mbl2').value = dashboard.Mobile_2;
                            }
                            if (dashboard.Nagad != "") {
                                document.getElementById('nagad').value = dashboard.Nagad;
                            }
                            if (dashboard.Rocket != "") {
                                document.getElementById('rocket').value = dashboard.Rocket;
                            }
                            document.getElementById('aff').value = dashboard.Id;
                            document.getElementById('name').innerText = dashboard.Name;
                            document.getElementById('totalPending').innerText = totalPen + " ৳";
                            document.getElementById('totalVerify').innerText = totalv + " ৳";
                            document.getElementById('fbLink').addEventListener('click', () => {
                                window.open(dashboard.Facebook_Link)
                            });

                            const label = ['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5'];
                            var ctx = document.getElementById('myChart').getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: label,
                                    datasets: [{
                                        label: 'Pending Earnings',
                                        data: [penl1, penl2, penl3, penl4, penl5],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)'
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

                            var ctx = document.getElementById("myChart2").getContext("2d");

                            var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                            gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
                            gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
                            gradientStroke.addColorStop(0, 'rgba(29,140,248,0)');


                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                responsive: true,
                                legend: {
                                    display: false
                                },
                                data: {
                                    labels: label,
                                    datasets: [{
                                        label: "Verified Income",
                                        fill: true,
                                        backgroundColor: gradientStroke,
                                        hoverBackgroundColor: gradientStroke,
                                        borderColor: '#1f8ef1',
                                        borderWidth: 2,
                                        borderDash: [],
                                        borderDashOffset: 0.0,
                                        data: [verl1, verl2, verl3, verl4, verl5],
                                    }]
                                },
                                options: gradientBarChartConfiguration
                            });

                            var gradientBarChartConfiguration = {
                                maintainAspectRatio: false,
                                legend: {
                                    display: false
                                },

                                tooltips: {
                                    backgroundColor: '#f5f5f5',
                                    titleFontColor: '#333',
                                    bodyFontColor: '#666',
                                    bodySpacing: 4,
                                    xPadding: 12,
                                    mode: "nearest",
                                    intersect: 0,
                                    position: "nearest"
                                },
                                responsive: true,
                                scales: {
                                    yAxes: [{

                                        gridLines: {
                                            drawBorder: false,
                                            color: 'rgba(29,140,248,0.1)',
                                            zeroLineColor: "transparent",
                                        },
                                        ticks: {
                                            beginAtZero: true,
                                            padding: 20,
                                            fontColor: "#9e9e9e"
                                        }
                                    }]
                                }
                            }
                        }
                    })
                }).catch((err => {
                    console.log(err);
                }))
        } else {
            document.location.replace("index.html");
        }
    })
}
window.onload = function() {
    initApp();
};


var clipboard = new ClipboardJS('.cp');

clipboard.on('success', function(e) {
    alert(e.text + "\ncopied successfully!!")
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});