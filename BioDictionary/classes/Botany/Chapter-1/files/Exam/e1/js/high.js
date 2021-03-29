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
                uid = user.uid;

                const script = "https://script.google.com/macros/s/AKfycbyESuAlo0RuUbbMLk11yGHs47erhBHzt5eUDNdhLPiOfETfW0pM3edYwyxwyfyiJl3Lwg/exec";
                fetch(script + '?q=Indivisual&uid=' + uid)
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
                fetch(script + '?q=All')
                    .then((res) => {
                        return res.json();
                    }).then((loadedData) => {
                        var col = [];
                        for (var i = 0; i < loadedData.length; i++) {
                            for (var key in loadedData[i]) {
                                if (col.indexOf(key) === -1) {
                                    col.push(key);
                                }
                            }
                        }
                        var table = document.createElement("table");
                        var tr = table.insertRow(-1);
                        for (var i = 0; i < col.length; i++) {
                            var th = document.createElement("th");
                            th.innerHTML = col[i];
                            tr.appendChild(th);
                        }
                        for (var i = 0; i < loadedData.length; i++) {

                            tr = table.insertRow(-1);

                            for (var j = 0; j < col.length; j++) {
                                var tabCell = tr.insertCell(-1);
                                tabCell.innerHTML = loadedData[i][col[j]];
                            }
                        }
                        var divContainer = document.getElementById("showData");
                        divContainer.innerHTML = "";
                        divContainer.appendChild(table);
                    }).catch((e) => {
                        alert("No Result Found!");
                        return location.replace("./index.html");
                    })

            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });
})()