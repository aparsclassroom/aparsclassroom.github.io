var a;
window.addEventListener('load', function() {

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

            var Word = a[serial].Word;
            var Subject = a[serial].Subject;
            var chapter = a[serial].Chapter;
            var ref = a[serial].Ref;
            var meaning = a[serial].Meaning;
            var description = a[serial].Description;
            var img = a[serial].img;
            var video = a[serial].Video;
            var audio = a[serial].Audio;
            var link = a[serial].Return;
            document.title = a[serial].Word + ' | BioDictionary';
            // document.getElementById('explainations').innerHTML = `

            //     <h3>${Word}</h3>
            //     <p></p>
            //                 <audio controls>
            //                 <source src="${audio}" type="audio/mpeg">
            //               Your browser does not support the audio element.
            //               </audio>
            //                 </div>

            // `;
            document.getElementById('qnaCard').innerHTML = `

                    <div class="wrapper">
                <div class="card front-face">
                    <div class="info">
                        <div class="title">প্রশ্ন</div>
                        <div class="ques">
                            <p id="qu" style="font-size: 20px;">${Word}</p>
                        </div>
                        <div class="meta">
                            <div class="sub">
                                <p>${Subject}</p>
                            </div>
                            <div class="chap">
                                <p>${chapter}</p>
                            </div>
                            <div class="chapname">
                                <p>${ref}</p>
                            </div>
                            <img src="/App/Assets/Logo/Asset 2[190].svg">
                            <div class="contributor">
                                <p>&copy; Apar's Classroom</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="back" class="card back-face">
                    <div id="visans" class="title">চিত্র</div>
                    <img src="${img}" id="gif" style="display: none;">
                    <div class="info">
                        <div id="textAns">
                            <div class="title">উত্তর</div>
                            <div class="ans">
                                <p>${meaning}</p>
                                <p>${description}</p>
                            </div>
                        </div>
                        <div id="aud">
                        <audio controls>
                        <source src="${audio}" type="audio/mpeg">
                      Your browser does not support the audio element.
                      </audio>
                        </div>
                        <div class="visit">
                            <a id="change1" type="button" onclick="openVisualise()">Visualise</a>
                            <a id="change2" type="button" onclick="openText()">Text</a>
                            <a type="button" href="${link}">Return</a>
                        </div>
                    </div>
                </div>
            </div>
                    `;
            if (img == "") {
                document.getElementById('change1').style.display = "none";
            } else {
                document.getElementById('change1').style.cssText = "display:inline-block;";
            }

            if (audio == "") {
                document.getElementById('aud').style.display = "none";
            } else {
                document.getElementById('aud').style.cssText = "display:inline-block;";
            }

        })
        .catch((err) => {
            console.error(err);
        });
})

function openVisualise() {
    document.getElementById("gif").style.display = "flex";
    document.getElementById('change1').style.display = "none";
    document.getElementById('change2').style.cssText = "display:inline-block;";
    document.getElementById("textAns").style.display = "none";
    document.getElementById('visans').style.display = "block";
}

function openText() {
    document.getElementById("gif").style.display = "none";
    document.getElementById('change2').style.display = "none";
    document.getElementById('change1').style.cssText = "display:inline-block;";
    document.getElementById("textAns").style.display = "block";
    document.getElementById('visans').style.display = "none";
}