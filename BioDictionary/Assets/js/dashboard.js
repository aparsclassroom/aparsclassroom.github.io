$(function() {
    "use strict";
    $(window).on("load", function() {
        $(".loader").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");
        $("body").delay(350).css({
            "overflow": "visible"
        });
        $(".all-container").css({
            "opacity": "1"
        });
    });
}(jQuery));

window.addEventListener('load', () => {
    console.log("%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬", "color:red;Background-Color:white;padding:100px;font-size:50px");
    aseKina();
    aseKinaRecent();
    var ctx = document.getElementById('chart-area').getContext('2d');
    window.myPie = new Chart(ctx, config);
    var things = JSON.parse(localStorage.getItem('watched'));
    if (things === null) {
        document.getElementById('tracker').style.display = "none";
        return;
    }
})

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
        wrdsResults.innerHTML += '<div class="card text-center">' +
            '<a class="bklink" href="' + url + '"><h3 class="bangla">' + name + '</h3> <p class="bangla"> Id : ' + sl + '</p></div>';
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
            '<a class="bklink" href="' + url + '"><h3 class="bangla">' + name + '</h3> <p class="bangla"> Id : ' + sl + '</p> <span class="bangla"> বুকমার্ক : ' + time + '</span> </a></div>';
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


function aseKinaRecent() {
    if (sessionStorage.getItem('todayWatched') === null || sessionStorage.getItem('todayWatched') === "[]") {
        document.getElementById('clearToday').style.display = "none";
        document.getElementById('showR').style.display = "none";
    } else {
        getToday()
    }
}
var things = JSON.parse(localStorage.getItem('watched'));
if (things != null) {
    const piex = things.length;

    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    piex,
                    466
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(238, 133, 171, 1)'
                ],
                label: 'Study Tracker'
            }],
            labels: [
                'Completed Words',
                'Total Words'
            ]
        },
        options: {
            legend: {
                position: 'bottom',
            },
            responsive: true
        }
    };
}
document.getElementById('clearToday').addEventListener('click', () => {
    sessionStorage.removeItem('todayWatched')
    document.getElementById('today').innerHTML = "Nothing Left";
    document.getElementById('clearToday').style.display = "none";
    document.getElementById('showR').style.display = "none";
})