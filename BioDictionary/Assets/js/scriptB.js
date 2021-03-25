var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            namex = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;
            free = user.isAnonymous;

            isFree()
            console.log("%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬", "color:red;Background-Color:white;padding:100px;font-size:50px")

            function isFree() {

                if (free === true) {
                    var a;
                    $(document).ready(function() {
                        document.getElementById('navB').innerHTML = `
                                    <nav class="navbar sticky-top navbar-dark" style="background-color: #2c3f52;">
                                    <a class="navbar-brand" style="text-align:left;font-family: 'Finger Paint', cursive;" href="../../../Botany.html">
                                        <img src="/BioDictionary/Assets/images/logo/logo-transparent.png" alt="logo" height="30px" width="30px">&nbsp;BioDictionary</a>
                                    <button type="button" class="btn" id="bk" style="position: right;" data-toggle="modal" data-target="#myModal"><img src="/App/Assets/img/person-circle.svg" alt="dp" height="30px" width="30px"></button>
                                </nav>
                                    `;
                        document.getElementById('moda').innerHTML = `    <div class="modal fade" id="myModal" role="dialog">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Bookmarks</h4>
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            </div>
                                            <div class="modal-body">
                                                <div id="bookmarksResults"></div>
                                                <div class="modal-footer">
                                                    <button class="btn btn-warning" id="clearBooks">Clear</button>
                                                    <button class="btn btn-danger" type="button" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                        aseKina()
                        document.getElementById('clearBooks').addEventListener('click', () => {
                            localStorage.removeItem('bookmarks')
                            bookmarksResults.innerHTML = 'No Bookmarks left 😶';
                            document.getElementById('clearBooks').style.display = "none";
                        })
                        const lin1 = "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy8=";
                        const lin2 = "L2V4ZWM=";
                        var ln1 = window.atob(lin1);
                        var ln2 = window.atob(lin2);
                        var ln = window.atob(inf);
                        fetch(ln1 + ln + ln2)
                            .then((res) => {
                                return res.json();
                            })
                            .then((loadedData) => {
                                a = loadedData;
                                i1 = '<div class="card text-center">',
                                    m1 = 1;
                                $.each(a, function(a, e) {
                                    (
                                        i1 += '<div class="col-md-15 well">',
                                        i1 += "<h3 class='eng'>Word Number : " + e.Number + "</h3>",
                                        i1 += "<h3>" + e.Word + "</h3>",
                                        i1 += '<h4>অর্থ: ' + e.Meaning + '</h4>',
                                        i1 += "<a type='button' class='wh' title='Premium Content'> 🔒 ব্যাখ্যা </a>",
                                        i1 += "</div>&nbsp;", m1 % 2 == 0 && (i1 += '</div><div class="card text-center">'),
                                        m1++)
                                }), i1 += "</div>", $("#all").html(i1)

                            })
                            .catch((err) => {
                                console.error(err);
                            });

                        $("#txt-search").keyup(function() {
                            var e = $(this).val();
                            if ("" !== e) {
                                var o = new RegExp(e, "i"),
                                    i = '<div class="card text-center">',
                                    m = 1;
                                $.each(a, function(a, e) {
                                    -1 == e.Word.search(o) || (i += '<div class="col-md-15 well">', i += "<h3 class='eng'>Word Number : " + e.Number + "</h3>", i += "<h3>" + e.Word + "</h3>", i += '<h4>অর্থ : ' + e.Meaning + '</h4>', i += "<a type='button' class='wh' title='Premium Content'> 🔒 ব্যাখ্যা </a>", i += "</p></div>&nbsp;", m % 2 == 0 && (i += '</div><div class="card text-center">'), m++)
                                }), i += "</div>", $("#filter-records").html(i)
                            } else $("#filter-records").html("");
                            if (document.getElementById("filter-records").innerHTML == '<div class="card text-center"></div>') {
                                document.getElementById("filter-records").innerHTML = '<p style=' + '"text-align: center;">এরূপ কোন শব্দ খুঁজে পাওয়া যায় নি 😶</p>';
                                document.getElementById("status").style.display = "none";
                                document.getElementById("all").style.display = "block";
                            }
                            if ("" == e) {
                                document.getElementById("all").style.display = "block";
                                document.getElementById("status").style.display = "none";
                            }
                        })
                    });
                } else {
                    var a;
                    $(document).ready(function() {
                        document.getElementById('navB').innerHTML = `
                        <nav class="navbar sticky-top navbar-dark" style="background-color: #2c3f52;">
                        <a class="navbar-brand" style="text-align:left;font-family: 'Finger Paint', cursive;" href="../../../Botany.html">
                            <img src="/BioDictionary/Assets/images/logo/logo-transparent.png" alt="logo" height="30px" width="30px">&nbsp;BioDictionary</a>
                        <button type="button" class="btn" id="bk" style="position: right;" data-toggle="modal" data-target="#myModal"><img src="/App/Assets/img/person-circle.svg" alt="dp" height="30px" width="30px"></button>
                    </nav>
                        `;
                        document.getElementById('moda').innerHTML = `    <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Bookmarks</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <div id="bookmarksResults"></div>
                                    <div class="modal-footer">
                                        <button class="btn btn-warning" id="clearBooks">Clear</button>
                                        <button class="btn btn-danger" type="button" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                        aseKina()
                        document.getElementById('clearBooks').addEventListener('click', () => {
                            localStorage.removeItem('bookmarks')
                            bookmarksResults.innerHTML = 'No Bookmarks left 😶';
                            document.getElementById('clearBooks').style.display = "none";
                        })
                        const lin1 = "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy8=";
                        const lin2 = "L2V4ZWM=";
                        var ln1 = window.atob(lin1);
                        var ln2 = window.atob(lin2);
                        var ln = window.atob(inf);
                        fetch(ln1 + ln + ln2)
                            .then((res) => {
                                return res.json();
                            })
                            .then((loadedData) => {
                                a = loadedData;
                                i1 = '<div class="card text-center">',
                                    m1 = 1;
                                $.each(a, function(a, e) {
                                    (
                                        i1 += '<div class="col-md-15 well">',
                                        i1 += "<h3 class='eng'>Word Number : " + e.Number + "</h3>",
                                        i1 += "<h3>" + e.Word + "</h3>",
                                        i1 += '<h4>অর্থ: ' + e.Meaning + '</h4>',
                                        i1 += "<a type='button' class='links text-center' href=\"" + e.ExplainMe + '">' + "ব্যাখ্যা" + "</a>",
                                        i1 += "</div>&nbsp;", m1 % 2 == 0 && (i1 += '</div><div class="card text-center">'),
                                        m1++)
                                }), i1 += "</div>", $("#all").html(i1)

                            })
                            .catch((err) => {
                                console.error(err);
                            });

                        $("#txt-search").keyup(function() {
                            var e = $(this).val();
                            if ("" !== e) {
                                var o = new RegExp(e, "i"),
                                    i = '<div class="card text-center">',
                                    m = 1;
                                $.each(a, function(a, e) {
                                    -1 == e.Word.search(o) || (i += '<div class="col-md-15 well">', i += "<h3 class='eng'>Word Number : " + e.Number + "</h3>", i += "<h3>" + e.Word + "</h3>", i += '<h4>অর্থ : ' + e.Meaning + '</h4>', i += "<a type='button' class='links' href=\"" + e.ExplainMe + '">' + "ব্যাখ্যা" + "</a>", i += "</p></div>&nbsp;", m % 2 == 0 && (i += '</div><div class="card text-center">'), m++)
                                }), i += "</div>", $("#filter-records").html(i)
                            } else $("#filter-records").html("");
                            if (document.getElementById("filter-records").innerHTML == '<div class="card text-center"></div>') {
                                document.getElementById("filter-records").innerHTML = '<p style=' + '"text-align: center;">এরূপ কোন শব্দ খুঁজে পাওয়া যায় নি 😶</p>';
                                document.getElementById("status").style.display = "none";
                                document.getElementById("all").style.display = "block";
                            }
                            if ("" == e) {
                                document.getElementById("all").style.display = "block";
                                document.getElementById("status").style.display = "none";
                            }
                        })
                    });
                }

            }
        } else {
            window.location.replace("/BioDictionary/login.html");
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }
    mainApp.logOut = logOut;
})()

const n = document.getElementById("status");

function searchFunc() {
    n.innerText = "Searching...";
}

function resultFunc() {
    n.style.display = "block";
    n.innerText = "সার্চ সম্পন্ন 🥰";
    document.getElementById("all").style.display = "none";
    setTimeout(function() {
        n.style.display = "none";
    }, 2000)
}

var url;

function getBook() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
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


function aseKina() {
    if (localStorage.getItem('bookmarks') === null || localStorage.getItem('bookmarks') === "[]") {
        document.getElementById('bk').style.display = "none";
    } else {
        getBook()
    }
}