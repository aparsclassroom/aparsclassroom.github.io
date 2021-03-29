const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} - ${score.score} - ${score.duration}</li>`;
    })
    .join("");



const script = "https://script.google.com/macros/s/AKfycbzGodRsLmvTxQawVmCzarI8sV-eRCr-NteulC_6Xw-lHYMsAm0gLO26z5uGqxXoKTV_-Q/exec";
fetch(script + '?q=Indivisual&uid=123')
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
    })

function myFunction() {
    var myDate = new Date("2021-03-29T12:53:58.141Z");
    console.log(myDate.toLocaleString());
}
myFunction()

function GetFormattedDate() {
    var todayTime = new Date();

    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return console.log(month + "/" + day + "/" + year);
}

GetFormattedDate()