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
                            <a class="navbar-brand" href="../../../Zoology.html">
                            <img src="/BioDictionary/Assets/images/logo/logo-transparent.png" alt="logo" height="30px" width="30px">&nbsp;BioDictionary</a>
                        </nav>
                            `;

                            const lin1 = "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy8=";
                            const lin2 = "L2V4ZWM=";
                            var ln1 = window.atob(lin1);
                            var ln2 = window.atob(lin2);
                            var ln = window.atob(inf);
                            fetch(ln1 + ln + ln2 + "?q=All")
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
                            <a class="navbar-brand" href="../../../Zoology.html">
                                <img src="/BioDictionary/Assets/images/logo/logo-transparent.png" alt="logo" height="30px" width="30px">&nbsp;BioDictionary</a>
                            <button type="button" class="btn" id="bk" style="position: right;" data-toggle="modal" data-target="#myModal"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"/>
                          </svg></button>
                        </nav>
                            `;
                            document.getElementById('moda').innerHTML = `    <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Bookmarks</h4>
                                        <a type="button" href="/BioDictionary/dashboard.html"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2c3f52" class="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                      </svg></a>
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
                            fetch(ln1 + ln + ln2 + "?q=All")
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
                '<a class="bklink" href="' + url + '"><h3 class="bangla">' + name + '</h3> <p class="bangla"> Id : ' + sl + '</p> <span class="bangla"> সময় : ' + time + '</span> </a><hr></div>';
        }

    }


    function aseKina() {
        if (localStorage.getItem('bookmarks') === null || localStorage.getItem('bookmarks') === "[]") {
            document.getElementById('bk').style.display = "none";
        } else {
            getBook()
        }
    }