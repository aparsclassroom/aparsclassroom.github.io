const stat = sessionStorage.removeItem("stat");

var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.isAnonymous === true) {
                alert("This is a Premium Feature!");
                return location.replace("/BioDictionary/index.html");
            } else {
                sessionStorage.removeItem("stat");
                uid = user.uid;
                fetch(scriptURL + '?q=Indivisual&uid=' + uid)
                    .then((res) => {
                        return res.json();
                    }).then((loadedData) => {
                        if (loadedData.code === 200) {
                            document.getElementById('showPersonalData').innerHTML = `
                            <h3 style="text-align: center;">${loadedData.username}</h3>
                            <p style="font-size:17px;">Your Score : ${loadedData.score}<br>Exam Duration : ${loadedData.duration}<br>Your Submission Serial : ${loadedData.Serial}<br>Timestamp : ${loadedData.timestamp}</p>                         
                            `;

                        } else {
                            document.getElementById('showPersonalData').innerHTML = `<h3>${loadedData.message}</h3>`;
                        }
                    }).catch((e) => {
                        document.getElementById('showPersonalData').innerHTML = "No Result Found!";
                    })
                fetch(scriptURL + '?q=All')
                    .then((res) => {
                        return res.json();
                    }).then((loadedData) => {
                        var table = new Tabulator("#showData", {
                            pagination: "local",
                            paginationSize: 10,
                            paginationSizeSelector: [10, 20, 30, 40, 50],
                            layout: "fitDataStretch",
                            data: loadedData,
                            autoColumns: true,
                            initialSort: [{
                                column: "score",
                                dir: "desc"
                            }]
                        });
                        document.getElementById("download-xlsx").addEventListener("click", function() {
                            table.download("xlsx", "BioExam-global-result-BioDictionary.xlsx", {
                                sheetName: "Leaderboard - " + new Date().toDateString()
                            });
                        });
                        const Title = "BioExam Global Leaderboard - " + new Date().toLocaleString("en-US");
                        document.getElementById("download-pdf").addEventListener("click", function() {
                            table.download("pdf", "BioExam-global-result-BioDictionary.pdf", {
                                orientation: "portrait",
                                title: Title,
                            });
                        });
                    }).catch(() => {
                        alert("No Result Found!");
                        return location.replace("./");
                    })

            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()