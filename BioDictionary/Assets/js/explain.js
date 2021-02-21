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
  
                        <a type="button" id="vidbtn"  onclick="vidPlay()" data-toggle="modal" data-target="#Video">
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
            <video  id="vidID" display="inline-block" controls disablePictureInPicture controlsList="nodownload" width="100%">
            <source src="${video}" type="video/mp4">
            Your browser does not support the video tag.
        </video>`;

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
                document.getElementById('vidID').currentTime = 0;
                document.getElementById('vidID').pause();
            })
            if (img == "" || img == "https://gdurl.com") {
                document.getElementById('image').style.display = "none";
                document.getElementById('fi').style.display = "none";
            } else {
                document.getElementById('image').style.cssText = "display:inline-block;";
            }
            if (video == "" || video == "https://gdurl.com") {
                document.getElementById('vidbtn').style.display = "none";
            } else {
                document.getElementById('vidbtn').style.cssText = "display:inline-block;";
            }
            if (audio == "" || audio == "https://gdurl.com") {
                document.getElementById('ad').style.display = "none";
            } else {
                document.getElementById('adImg').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                <path fill-rule="evenodd" d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
              </svg>
                `;
            }
            var book = document.getElementById('book');
            var deletebook = document.getElementById('deletebook');

            var result = JSON.parse(localStorage.getItem("bookmarks"));
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

function vidPlay() {
    document.getElementById('vidID').play();
    document.getElementById("audio").pause();
    document.getElementById("audio").currentTime = 0
    document.getElementById('adImg').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
    <path fill-rule="evenodd" d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
  </svg>
    `;
}

function play() {
    var audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
        document.getElementById('adImg').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
        <path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
      </svg>
        `;
    } else {
        audio.pause();
        audio.currentTime = 0
        document.getElementById('adImg').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-mic-mute-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 0 1 5 8V6.121zm8.646 7.234l-12-12 .708-.708 12 12-.708.707z"/>
</svg>
        `;
    }

}