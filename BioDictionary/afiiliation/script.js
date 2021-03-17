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
            const script = 'https://script.google.com/macros/s/AKfycbxa9Dr3Go_mw9Ly52IsBgIBjJcRjXOqUWyfq_jY79aXZt9JxrRlCdaZ_khL6LAaJil7pg/exec';
            fetch(script + "?uid=" + user.uid).then((res) => {
                return res.json();
            }).then((loadedData) => {
                console.log(loadedData)
                document.getElementById('desc').innerHTML = loadedData.Status;
                document.getElementById('bio').innerText = loadedData.Status;
                document.getElementById('avatar').src = user.photoURL;
                document.getElementById('profile').src = user.photoURL;
                document.getElementById('Username').value = user.displayName;
                document.getElementById('email').value = user.email;
                document.getElementById('uid').value = user.uid;
                document.getElementById('afflink').innerText = loadedData.Affiliation_Link;
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
                const label = ['Link 1', 'Link 2'];
                var ctx = document.getElementById('totalPending').getContext('2d');
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
                var ctx = document.getElementById('totalEarning').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: label,
                        datasets: [{
                            label: 'Total Sell',
                            data: [sell1, sell2, sell3, sell4, sell5],
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

                var ctx = document.getElementById("ttsell").getContext("2d");

                var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
                gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
                gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


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
                const label = ['Direct Income', 'Passive Income'];
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: label,
                        datasets: [{
                            label: 'Pending Earnings',
                            data: [loadedData.Pending_Direct_Income, loadedData.Pending_Passive_Income],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)'
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
                    type: 'pie',
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
                            data: [loadedData.Verified_Direct_Income, loadedData.Verified_Direct_Income],
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

            }).catch((err => {
                console.log(err);
            }))
        } else {
            // document.location.replace("index.html");
        }
    })
}
window.onload = function() {
    initApp();
};


var clipboard = new ClipboardJS('.cp');

clipboard.on('success', function(e) {
    alert(e.text + " copied successfully!!")
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});