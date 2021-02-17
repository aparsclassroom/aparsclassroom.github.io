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

                <h3 class = "bangla">${Word}</h3>
                <p class = "bangla">${meaning}</p>
                <p class = "bangla">${description}</p>
                <p class = "bangla">${Subject}</p>
                <p class = "bangla">${chapter}</p>
                <p class = "bangla">${ref}</p>
                <p class = "bangla">${RefPage}</p>
                <a type="button" href="${link}" class="btn btn-dark">Return<a>
                <img src="${img}" id="image" style="display: none;">
                <button type="button" id="vidbtn" class="btn btn-primary" onclick="document.getElementById('vidID').play();" data-toggle="modal" data-target="#Video">
                Video
              </button>
              <input type="button" class="btn btn-warning"  value="Read" id="ad" onclick="play()">
              <audio id="audio" src="${audio}"></audio>

            `;
            document.getElementById('vid').innerHTML = `
            <video  id="vidID" display="inline-block" controls disablePictureInPicture controlsList="nodownload" width="100%">
            <source src="${video}" type="video/mp4">
            Your browser does not support the video tag.
        </video>`;
            $('#Video').on('hidden.bs.modal', function() {
                document.getElementById('vidID').currentTime = 0;
                document.getElementById('vidID').pause();
            })
            if (img == "" || img == "https://gdurl.com") {
                document.getElementById('image').style.display = "none";
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

        })
        .catch((err) => {
            console.error(err);
        });
})

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