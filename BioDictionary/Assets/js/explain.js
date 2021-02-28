var a;
window.addEventListener('load', function() {

    document.getElementById('mod').innerHTML = `
    <div class="modal fade" id="Video" tabindex="-1" role="dialog" aria-labelledby="VideoLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-body">
                <div id="vid"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
    `;

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
            var serial = sl - 1;
            var num = a[serial].Number;
            var Word = a[serial].Word;
            var Subject = a[serial].Subject;
            var chapter = a[serial].Chapter;
            var ref = a[serial].Ref;
            var RefPage = a[serial].RefPage;
            var meaning = a[serial].Meaning;
            var description = a[serial].Description;
            var img = a[serial].img;
            var video = a[serial].video;
            var audio = a[serial].Audio;
            var link = a[serial].Return;
            document.title = a[serial].Word + ' | BioDictionary';
            document.getElementById('explainations').innerHTML = `
            <div class="mx-auto">
                <div id="row" class="row">
                <a type="button" id="book">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
</svg>
                </a>
                <a id="deletebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
<path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
</svg>
                </a>
                    <div id="main" class="col">
                        <h3 class = "bangla">শব্দ নং : ${num}</h3>
                        <h2 class = "bangla">${Word}</h2>
                        <p class = "bangla"><b>অর্থ :</b> ${meaning}</p>
                        <p class = "bangla"><b>ব্যাখ্যা :</b> ${description}</p>
                        <p class = "bangla"><b>বিষয় :</b> ${Subject}</p>
                        <p class = "bangla"><b>অধ্যায় :</b> ${chapter}</p>
                        <p class = "bangla"><b>সূত্র :</b> ${ref}</p>
                        <p class = "bangla"><b>পৃষ্ঠা :</b> ${RefPage}</p>
  
                        <a type="button" id="vidbtn" onclick="vidPlay()" data-toggle="modal" data-target="#Video">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                      </svg>
                      </a> 
                        <a type="button" id="ad" onclick="play()">
                        <span id="adImg"></span>
                        </a>
                        <audio id="audio" preload="none" src="${audio}"></audio>
                    </div>

                    <div  class="col">
                    <a type="button" class="btn btn-block" href="${link}" id="rt">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    </a> 
                        <figure id="fi" class="figure">
                            <img src="${img}" id="image" class="figure-img img-fluid rounded" alt="${Word}">
                            <figcaption class="figure-caption bangla">চিত্র : ${Word}</figcaption>
                        </figure>
                        </div>            
            </div>
            </div>

            `;
            document.getElementById('vid').innerHTML = `
            <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${video}"></div>
        `;
            player = new Plyr('#player', {});
            $(function() {
                var id = {
                    sl: num + "_" + chapter + "_" + Subject,
                    time: new Date(),
                    name: Word,
                    url: window.location.href
                }
                var result = JSON.parse(sessionStorage.getItem("todayWatched"));
                if (result == null) {
                    result = [];
                }
                var alreadyExists = result.filter(function(item) {
                    return item.url === window.location.href
                }).length;
                if (alreadyExists > 0) {
                    return false;
                } else {
                    result.push(id);
                }
                sessionStorage.setItem("todayWatched", JSON.stringify(result));
            });
            $(function() {
                var id = {
                    sl: num + "_" + chapter + "_" + Subject,
                    time: new Date(),
                    name: Word,
                    url: window.location.href
                }
                var result = JSON.parse(localStorage.getItem("watched"));
                if (result == null) {
                    result = [];
                }
                var alreadyExists = result.filter(function(item) {
                    return item.url === window.location.href
                }).length;
                if (alreadyExists > 0) {
                    return false;
                } else {
                    result.push(id);
                }
                localStorage.setItem("watched", JSON.stringify(result));
            });

            document.getElementById('deletebook').style.display = "none";
            var book = document.getElementById('book');
            var deletebook = document.getElementById('deletebook');
            book.addEventListener('click', saveBook);
            deletebook.addEventListener('click', deleteBook);



            function saveBook(e) {
                var bookmark = {
                    sl: num + "_" + chapter + "_" + Subject,
                    time: new Date(),
                    name: Word,
                    url: window.location.href
                }
                if (localStorage.getItem('bookmarks') === null) {
                    var bookmarks = [];
                    bookmarks.push(bookmark);
                    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                    alert(Word + " added as your First bookmark!!!")
                } else {
                    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
                    bookmarks.push(bookmark);
                    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                    alert("You've added " + Word + " as a new bookmark")
                }
                asekina()
                asebook()
            }

            function deleteBook(url) {
                var url = window.location.href
                var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
                // Loop through the bookmarks
                for (var i = 0; i < bookmarks.length; i++) {
                    if (bookmarks[i].url == url) {
                        bookmarks.splice(i, 1);
                        deletebook.style.display = "none";
                        book.style.display = "inline-block";
                        alert("You've removed " + Word + " as a bookmark")
                    }

                }
                // Re-set back to localStorage
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                asebook()
                asekina()
            }

            $('#Video').on('hidden.bs.modal', function() {
                player.currentTime = 0
                player.pause();
            })


            if (img == "" || img == "https://gdurl.com") {
                document.getElementById('image').style.display = "none";
                document.getElementById('fi').style.display = "none";
            } else {
                document.getElementById('image').style.cssText = "display:inline-block;";
            }
            if (video == "" || video == "https://gdurl.com") {
                document.getElementById('vidbtn').style.display = "none";
                document.getElementById('vid').innerHTML = "";
            } else {
                document.getElementById('vidbtn').style.cssText = "display:inline-block;";
            }
            if (audio == "" || audio == "https://gdurl.com") {
                document.getElementById('ad').style.display = "none";
            } else {
                document.getElementById('adImg').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-volume-off-fill" viewBox="0 0 16 16">
                <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
              </svg>
                `;
            }
            var book = document.getElementById('book');
            var deletebook = document.getElementById('deletebook');

            var result = JSON.parse(localStorage.getItem("bookmarks"));
            if (result === null) {
                return;
            }
            var alreadyExists = result.filter(function(item) {
                return window.location.href === item.url
            }).length;

            if (alreadyExists > 0) {
                deletebook.style.display = "inline-block";
                book.style.display = "none";
                return false;
            } else {
                deletebook.style.display = "none";
                book.style.display = "inline-block";
            }

            function aseKi() {
                if (localStorage.getItem('bookmarks') === null || localStorage.getItem('bookmarks') === "[]") {

                } else {
                    asekina()
                }
            }
            aseKi()

            function asekina() {
                var url = window.location.href
                var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
                for (var i = 0; i < bookmarks.length; i++) {
                    if (bookmarks[i].url === url) {
                        return book.style.display = "inline-block";


                    } else {
                        return deletebook.style.display = "none";
                    }
                }
            }

            function asebook(url) {
                var url = window.location.href
                var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
                for (var i = 0; i < bookmarks.length; i++) {
                    if (bookmarks[i].url === url) {
                        deletebook.style.display = "inline-block";
                        book.style.display = "none";
                    } else {
                        deletebook.style.display = "none";
                        book.style.display = "inline-block";
                    }
                }
            }
            asebook()
        })
        .catch((err) => {
            console.error(err);
        });
})


var player;

function vidPlay() {
    player.play();
    document.getElementById("audio").pause();
    document.getElementById("audio").currentTime = 0
    document.getElementById('adImg').innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-volume-off" viewBox="0 0 16 16">
  <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM10 5.04L8.312 6.39A.5.5 0 0 1 8 6.5H6v3h2a.5.5 0 0 1 .312.11L10 10.96V5.04z"/>
</svg>
    `;
}

function play() {
    var audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
        document.getElementById('adImg').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
        <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
        <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
      </svg>
        `;
    } else {
        audio.pause();
        audio.currentTime = 0
        document.getElementById('adImg').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
        <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
      </svg>
        `;
    }

}