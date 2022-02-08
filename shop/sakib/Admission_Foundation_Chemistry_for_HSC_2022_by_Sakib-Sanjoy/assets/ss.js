var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: false,
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

fetch(`https://script.google.com/macros/s/AKfycbxI8Y2reqfJiwA6qv0hpoT94DgEHBJUrNHp86v8h8_PDO6JPUJ4nZb59WPyT_lSIT30/exec?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let types = data.types;
        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
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