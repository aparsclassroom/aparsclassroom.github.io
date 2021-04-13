const stat = sessionStorage.getItem("stat");

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
                            <table>
                                <th>
                                    Serial
                                </th>   
                                <th>
                                    username	
                                </th> 
                                <th>
                                    score
                                </th> 
                                <th>
                                    duration	
                                </th>  
                                <th>
                                    timestamp
                                </th> 
                                <tr>
                                    <td>
                                        ${loadedData.Serial}
                                        </td>
                                        <td>
                                        ${loadedData.username}
                                        </td>
                                        <td>
                                        ${loadedData.score}
                                        </td>
                                        <td>
                                        ${loadedData.duration}
                                        </td>
                                        <td>
                                        ${loadedData.timestamp}
                                        </td>
                                    </tr>
                            </table>
                            `;
                        } else {
                            document.getElementById('showPersonalData').innerHTML = loadedData.message;
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
                            paginationSizeSelector: [10, 20, 30, 40],
                            // movableColumns: true,
                            data: loadedData,
                            autoColumns: true,
                            initialSort: [{
                                    column: "score",
                                    dir: "desc"
                                }, //sort by this first
                                { column: "Serial", dir: "asc" }, //then sort by this second
                            ]
                        });
                        const Title = "BioExam Global Leaderboard - " + new Date().toLocaleString("en-US");
                        //trigger download of data.xlsx file
                        document.getElementById("download-xlsx").addEventListener("click", function() {
                            table.download("xlsx", "BioExam-global-result-BioDictionary.xlsx", {
                                sheetName: Title
                            });
                        });

                        //trigger download of data.pdf file
                        document.getElementById("download-pdf").addEventListener("click", function() {
                            table.download("pdf", "BioExam-global-result-BioDictionary.pdf", {
                                orientation: "portrait", //set page orientation to portrait
                                title: Title, //add title to report
                            });
                        });



                        // var col = [];
                        // for (var i = 0; i < loadedData.length; i++) {
                        //     for (var key in loadedData[i]) {
                        //         if (col.indexOf(key) === -1) {
                        //             col.push(key);
                        //         }
                        //     }
                        // }
                        // var table = document.createElement("table");
                        // var tr = table.insertRow(-1);
                        // for (var i = 0; i < col.length; i++) {
                        //     var th = document.createElement("th");
                        //     th.innerHTML = col[i];
                        //     tr.appendChild(th);
                        // }
                        // for (var i = 0; i < loadedData.length; i++) {

                        //     tr = table.insertRow(-1);

                        //     for (var j = 0; j < col.length; j++) {
                        //         var tabCell = tr.insertCell(-1);
                        //         tabCell.innerHTML = loadedData[i][col[j]];
                        //     }
                        // }
                        // var divContainer = document.getElementById("showData");
                        // divContainer.innerHTML = "";
                        // divContainer.appendChild(table);
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