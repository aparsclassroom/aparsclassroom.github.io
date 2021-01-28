var serial = q - 1;
$(document).ready(function() {
    fetch('../js/q1.json')
        .then((res) => {
            return res.json();
        })
        .then((loadedData) => {
            a = loadedData;
            Question = a[serial].Question;
            Subject = a[serial].Subject;
            chapter = a[serial].chapter;
            Topic = a[serial].Topic;
            Answer1 = a[serial].Answer1;
            Answer2 = a[serial].Answer2;
            img = a[serial].img;
            link = a[serial].chaplink;
            document.getElementById('qnaCard').innerHTML = `
            
            <div class="wrapper">
        <div class="card front-face">
            <div class="info">
                <div class="title">প্রশ্ন</div>
                <div class="ques">
                    <p id="qu" style="font-size: 20px;">${Question}</p>
                </div>
                <div class="meta">
                    <div class="sub">
                        <p>${Subject}</p>
                    </div>
                    <div class="chap">
                        <p>${chapter}</p>
                    </div>
                    <div class="chapname">
                        <p>${Topic}</p>
                    </div>
                    <img src="../../../../Assets/Logo/Asset 2[190].svg">
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
                        <p>${Answer1}</p>
                        <p>${Answer2}</p>
                    </div>
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

        })
        .catch((err) => {
            console.error(err);
        });
});






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