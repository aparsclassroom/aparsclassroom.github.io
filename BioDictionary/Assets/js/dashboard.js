window.addEventListener('load', () => {
    console.log("%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬", "color:red;Background-Color:white;padding:100px;font-size:50px")
    aseKina()
        // aseKinaAll()
    aseKinaRecent()
})

// function getwatched() {
//     var wrds = JSON.parse(localStorage.getItem('watched'));
//     // Get output id
//     var wrdsResults = document.getElementById('wrdsResults');
//     wrdsResults.innerHTML = '';
//     if (wrds === null) {
//         return;
//     }
//     for (var i = 0; i < wrds.length; i++) {
//         var name = wrds[i].name;
//         url = wrds[i].url;
//         sl = wrds[i].sl;
//         time = wrds[i].time;
//         wrdsResults.innerHTML += '<div class="card text-center">' +
//             '<a class="bklink" href="' + url + '"><h3 class="bangla">' + name + '</h3> <p class="bangla"> Id : ' + sl + '</p> <span> Timestamp : ' + time + '</span> </a><hr></div>';
//     }

// }

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
        wrdsResults.innerHTML += '<div class="card text-center">' +
            '<a class="bklink" href="' + url + '"><h3 class="bangla">' + name + '</h3> <p class="bangla"> Id : ' + sl + '</p> <span> Timestamp : ' + time + '</span> </a><hr></div>';
    }

}

var url;

function getBook() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        url = bookmarks[i].url;
        sl = bookmarks[i].sl;
        time = bookmarks[i].time;
        bookmarksResults.innerHTML += '<div class="card">' +
            '<a class="bklink" href="' + url + '"><h3 class="bangla">' + name + '</h3> <p class="bangla"> Id : ' + sl + '</p> <span> Bookmarked : ' + time + '</span> </a><hr></div>';
    }

}

document.getElementById('clearBook').addEventListener('click', () => {
    localStorage.removeItem('bookmarks')
    document.getElementById('bookmarksResults').innerHTML = "Nothing Left";
    document.getElementById('clearBook').style.display = "none";
    document.getElementById('showB').style.display = "none";
})

function aseKina() {
    if (localStorage.getItem('bookmarks') === null || localStorage.getItem('bookmarks') === "[]") {
        document.getElementById('clearBook').style.display = "none";
        document.getElementById('showB').style.display = "none";
    } else {
        getBook()
    }
}


// function aseKinaAll() {
//     if (localStorage.getItem('watched') === null || localStorage.getItem('watched') === "[]") {
//         document.getElementById('clearAlltime').style.display = "none";
//         document.getElementById('showA').style.display = "none";
//     } else {
//         getwatched()
//     }
// }

function aseKinaRecent() {
    if (sessionStorage.getItem('todayWatched') === null || sessionStorage.getItem('todayWatched') === "[]") {
        document.getElementById('clearToday').style.display = "none";
        document.getElementById('showR').style.display = "none";
    } else {
        getToday()
    }
}



document.getElementById('clearToday').addEventListener('click', () => {
    sessionStorage.removeItem('todayWatched')
    document.getElementById('today').innerHTML = "Nothing Left";
    document.getElementById('clearToday').style.display = "none";
    document.getElementById('showR').style.display = "none";
})


// document.getElementById('clearAlltime').addEventListener('click', () => {
//     localStorage.removeItem('watched')
//     document.getElementById('wrdsResults').innerHTML = "Nothing Left";
//     document.getElementById('clearAlltime').style.display = "none";
//     document.getElementById('showA').style.display = "none";
// })