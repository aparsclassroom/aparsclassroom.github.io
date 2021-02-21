window.addEventListener('load', () => {
    console.log("%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬", "color:red;Background-Color:white;padding:100px;font-size:50px")
    getwatched()
    getToday()
})

function getwatched() {
    var wrds = JSON.parse(localStorage.getItem('watched'));
    // Get output id
    var wrdsResults = document.getElementById('wrdsResults');
    wrdsResults.innerHTML = '';
    if (wrds === null) {
        return;
    }
    for (var i = 0; i < wrds.length; i++) {
        var name = wrds[i].name;
        url = wrds[i].url;
        sl = wrds[i].sl;
        time = wrds[i].time;
        wrdsResults.innerHTML += '<div class="card">' +
            '<a class="bklink" href="' + url + '"><h3 class="bangla">' + name + '</h3> <p class="bangla"> Id : ' + sl + '</p> <span> Timestamp : ' + time + '</span> </a><hr></div>';
    }

}

function getToday() {
    var wrds = JSON.parse(sessionStorage.getItem("todayWatched"));
    var wrdsResults = document.getElementById('today');
    wrdsResults.innerHTML = '';
    if (wrds === null) {
        return;
    }
    for (var i = 0; i < wrds.length; i++) {
        var name = wrds[i].name;
        url = wrds[i].url;
        sl = wrds[i].sl;
        time = wrds[i].time;
        wrdsResults.innerHTML += '<div class="card">' +
            '<a class="bklink" href="' + url + '"><h3 class="bangla">' + name + '</h3> <p class="bangla"> Id : ' + sl + '</p> <span> Timestamp : ' + time + '</span> </a><hr></div>';
    }

}
document.getElementById('clearToday').addEventListener('click', () => {
    sessionStorage.removeItem('todayWatched')
    document.getElementById('today').innerHTML = "Nothing Left";
    document.getElementById('clearToday').style.display = "none";
})


document.getElementById('clearAlltime').addEventListener('click', () => {
    localStorage.removeItem('watched')
    document.getElementById('wrdsResults').innerHTML = "Nothing Left";
    document.getElementById('clearAlltime').style.display = "none";
})