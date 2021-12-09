$('.slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
});

const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: '',
//         playerVars: { 'autoplay': 1, 'playsinline': 1 },
//         events: {
//             'onReady': onPlayerReady
//         }
//     });
// }

function onPlayerReady(event) {
    document.getElementById('thumb').style.display = "none";
    event.target.setVolume(100);
    event.target.playVideo();
}
fetch(`https://${shopName}/${productCode}/contents`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let types = data.types;

        document.getElementById('con1').innerHTML = `<i class="fab fa-youtube"></i>&nbsp; ${types[0].TotalClasses} ${types[0].ContType}`;
        document.getElementById('con2').innerHTML = `<i class="fas fa-clipboard"></i>&nbsp; ${types[1].TotalClasses} ${types[1].ContType} `;
        document.getElementById('con3').innerHTML = `<i class="fas fa-clinic-medical"></i>&nbsp;${types[2].TotalClasses} ${types[2].ContType} `;
        document.getElementById('con4').innerHTML = `<i class="fas fa-question-circle"></i>&nbsp;${types[3].TotalClasses} ${types[3].ContType} `;
        document.getElementById('con5').innerHTML = `<i class="fas fa-calendar-check"></i>&nbsp;${types[4].TotalClasses} ${types[4].ContType} `;
        document.getElementById('con6').innerHTML = `<i class="fas fa-user-graduate"></i>&nbsp;${types[5].TotalClasses} ${types[5].ContType} `;
        document.getElementById('duration').innerHTML = `${types[6].TotalClasses} মাস`;
        document.getElementById('enrolled').setAttribute('countTo', types[6].TotalClasses);
        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
        document.getElementById('con7').innerHTML = `<i class="fas fa-tablet-alt"></i>&nbsp; Dedicated Web App`;
        document.getElementById('con8').innerHTML = `<i class="fab fa-discord"></i>&nbsp; Discord Server`;
        document.getElementById('con9').innerHTML = `<i class="fab fa-facebook-square"></i></i>&nbsp; Discussion Group`;
        document.getElementById('loading1').innerHTML = "";
        document.getElementById('loading2').innerHTML = "";
        document.getElementById('loading11').innerHTML = "";
        document.getElementById('loading22').innerHTML = "";
        document.getElementById('ws11').innerHTML = "";
        document.getElementById('ws22').innerHTML = "";
        document.getElementById('pra11').innerHTML = "";
        document.getElementById('pra22').innerHTML = "";
        document.getElementById('exloading11').innerHTML = "";
        document.getElementById('exloading22').innerHTML = "";

        let classes = data.classes;

        var as = classes.filter((all) => {
            return all.SubAndPaper == 'Chemistry 1st Paper'
        })

        var as2 = classes.filter((all) => {
            return all.SubAndPaper == 'Chemistry 2nd Paper'
        })

        let domC = document.getElementById('Classes1');
        as.forEach(element => {
            if (element.Playlist != "") {
                domC.innerHTML += `
                <li>
                <a href = "${element.Playlist}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.LiveClass} Classes</a>
                </li>`
            } else {
                domC.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.LiveClass} Classes
                </li>`
            }

        });

        let domC2 = document.getElementById('Classes2');
        as2.forEach(element => {
            if (element.Playlist != "") {
                domC2.innerHTML += `
                <li>
                <a href = "${element.Playlist}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.LiveClass} Classes</a>
                </li>`
            } else {
                domC2.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.LiveClass} Classes
                </li>`
            }
        });


        let domC1 = document.getElementById('notes1');
        as.forEach(element => {
            if (element.Notes != "") {
                domC1.innerHTML += `
                <li>
                <a href = "${element.Notes}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.LectureSheet} Sheets</a>
                </li>`
            } else {
                domC1.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.LectureSheet} Sheets
                </li>`
            }
        });

        let domC22 = document.getElementById('notes2');
        as2.forEach(element => {
            if (element.Notes != "") {
                domC22.innerHTML += `
                <li>
                <a href = "${element.Notes}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.Chapter} - ${element.LectureSheet} Sheets</a>
                </li>`
            } else {
                domC22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.LectureSheet} Sheets
                </li>`
            }
        });



        let qna1 = document.getElementById('qna1');
        as.forEach(element => {
            qna1.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.QnAClass} Classes
                </li>`

        });

        let qna22 = document.getElementById('qna2');
        as2.forEach(element => {
            qna22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.QnAClass} Classes
                </li>`
        });

        let prac1 = document.getElementById('prac1');
        as.forEach(element => {
            prac1.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.PracticeSheet} Sheets
                </li>`

        });

        let prac22 = document.getElementById('prac2');
        as2.forEach(element => {
            prac22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.PracticeSheet} Sheets
                </li>`
        });

        let ex1 = document.getElementById('ex1');
        as.forEach(element => {
            ex1.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.Exam} Exam(s)
                </li>`

        });

        let ex22 = document.getElementById('ex2');
        as2.forEach(element => {
            ex22.innerHTML += `
                <li class="disabled">
                🔒 ${element.Chapter} - ${element.Exam} Exam(s)
                </li>`
        });
    })
    .catch((err) => {
        console.log(err)
    })