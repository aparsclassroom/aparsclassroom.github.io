var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.9,
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: '.swiper-button-next'
    },
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

fetch(`https://script.google.com/macros/s/AKfycbyzmc9PIPtS-jUU153RL8hBClSiVmbN_DufBumKEZ2ePZXPTGUF7UEGfG8z2Y94pyP6/exec?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let types = data.types;

        document.getElementById('con1').innerHTML = `<i class="fab fa-youtube"></i>&nbsp; ${types[0].TotalClasses} ${types[0].ContType}`;
        document.getElementById('con2').innerHTML = `<i class="fas fa-clipboard"></i>&nbsp; ${types[1].TotalClasses} ${types[1].ContType} `;
        document.getElementById('con4').innerHTML = `<i class="fas fa-question-circle"></i>&nbsp;${types[3].TotalClasses} ${types[3].ContType} `;
        document.getElementById('con5').innerHTML = `<i class="fas fa-calendar-check"></i>&nbsp;${types[4].TotalClasses} ${types[4].ContType} `;
        document.getElementById('enrolled').setAttribute('countTo', types[6].TotalClasses);
        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
        document.getElementById('duration').innerHTML = `${types[5].TotalClasses} মাস`;
        document.getElementById('loading1').innerHTML = "";
        document.getElementById('pra11').innerHTML = "";
        document.getElementById('exloading11').innerHTML = "";

        let classes = data.classes;


        let domC = document.getElementById('Classes1');
        classes.forEach(element => {
            if (element.Playlist != "") {
                domC.innerHTML += `
                <li>
                <a href = "${element.Playlist}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.SubAndPaper} - ${element.LiveClass} Classes</a>
                </li>`
            } else {
                domC.innerHTML += `
                <li class="disabled">
                🔒 ${element.SubAndPaper} - ${element.LiveClass} Classes
                </li>`
            }

        });

        let prac1 = document.getElementById('prac1');
        classes.forEach(element => {
            prac1.innerHTML += `
                <li class="disabled">
                🔒 ${element.SubAndPaper} - ${element.LectureSheet} Sheets
                </li>`

        });


        let ex1 = document.getElementById('ex1');
        classes.forEach(element => {
            ex1.innerHTML += `
                <li class="disabled">
                🔒 ${element.SubAndPaper} - ${element.Exam} Exam(s)
                </li>`

        });


    })
    .catch((err) => {
        console.log(err)
    })