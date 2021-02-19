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
                    <div id="main" class="col">
                    <button class="btn-primary" id="book">Bookmark</button>
                    <button class="btn-danger" id="deletebook">Remove Bookmark</button>
                        <h3 class = "bangla">শব্দ নং : ${num}</h3>
                        <h2 class = "bangla">${Word}</h2>
                        <p class = "bangla"><b>অর্থ :</b> ${meaning}</p>
                        <p class = "bangla"><b>ব্যাখ্যা :</b> ${description}</p>
                        <p class = "bangla"><b>বিষয় :</b> ${Subject}</p>
                        <p class = "bangla"><b>অধ্যায় :</b> ${chapter}</p>
                        <p class = "bangla"><b>সূত্র :</b> ${ref}</p>
                        <p class = "bangla"><b>পৃষ্ঠা :</b> ${RefPage}</p>
  
                        <button type="button" id="vidbtn" class="btn btn-inline-block btn-danger" onclick="vidPlay()" data-toggle="modal" data-target="#Video">Video</button> 
                        <input type="button" class="btn btn-inline-block btn-secondary" value="Read" id="ad" onclick="play()">
                        <audio id="audio" preload="none" src="${audio}"></audio>
                    </div>
                    <div  class="col">
                        <figure id="fi" class="figure">
                            <img src="${img}" id="image" class="figure-img img-fluid rounded" alt="${Word}">
                            <figcaption class="figure-caption bangla">চিত্র : ${Word}</figcaption>
                        </figure>
                        
                        <a type="button" href="${link}" id="rt" class="btn btn-block btn-outline-dark">Return</a>
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
                } else {
                    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
                    bookmarks.push(bookmark);
                    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                    alert("New bookmark added")
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
                document.getElementById('ad').style.cssText = "display:inline-block;";
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
    document.getElementById('ad').value = "Read";
}

function play() {
    var audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
        document.getElementById('ad').value = "Stop Reading";
    } else {
        audio.pause();
        audio.currentTime = 0
        document.getElementById('ad').value = "Read Again";
    }

}