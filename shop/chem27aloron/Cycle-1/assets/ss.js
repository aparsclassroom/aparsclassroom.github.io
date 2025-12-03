// const product = "chem27aloron";
// const productName = "ACS HSC 27 chemistry by Mottasin Pahlovi";
// const productCode = "421";
// const fix = 1500;
// const pls = 1000;
// const init = 0;
// const Platform = "Online";
const product = "chem27aloron";
const product2 = "chem27aloronwbooks";
const productName = "ACS HSC 27 Chemistry by Mottasin Pahlovi";
const productName2 = "ACS HSC 27 Chemistry by Mottasin Pahlovi with Books";
let productCode = "421";
let productCode2 = "440";
const fix = 1500;
const pls = 1000;
const pls2 = 1350;
const init = 0;
const Platform = "Online";
const Platform2 = "Physical";
const Cycle = location.pathname.split('/')[3];
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

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'FgHx29iJ5Sk',
        playerVars: { 'autoplay': 1, 'playsinline': 1 },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('thumb').style.display = "none";
    event.target.setVolume(100);
    event.target.playVideo();
}
 document.getElementById('moda').addEventListener('click', function () {
    if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
    }
});
// fetch(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode}`)
//     .then((res) => {
//         return res.json()
//     })
//     .then((data) => {
//         document.getElementById('enrolled').setAttribute('countTo', data.count + init);
//         if (document.getElementById('enrolled')) {
//             const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
//             if (!countUp.error) {
//                 countUp.start();
//             } else {
//                 console.error(countUp.error);
//             }
//         }

//     })
//     .catch((err) => {
//         console.log(err)
//     })

Promise.all([
    fetch(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode2}`).then(res => res.json())
])
    .then(([data1, data2]) => {
        const totalEnrollment = (data1.count || 0) + (data2.count || 0) + init;

        document.getElementById('enrolled').setAttribute('countTo', totalEnrollment);

        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', totalEnrollment);
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
    })
    .catch(err => {
        console.log("Enrollment fetch error:", err);
    });
document.getElementById('con1').innerHTML = `<i class="fab fa-youtube"></i>&nbsp; Live Classes`;
document.getElementById('con2').innerHTML = `<i class="fas fa-book"></i>&nbsp; Archive Classes`;
document.getElementById('con3').innerHTML = `<i class="fas fa-stream"></i>&nbsp; Chapter ending Compact Class`; 
document.getElementById('con4').innerHTML = `<i class="fas fa-chalkboard-teacher" style='color:green'></i>&nbsp; Problem Solving Classes`;
document.getElementById('con5').innerHTML = `<i class="fas fa-question-circle"></i>&nbsp; Online Exams`;
document.getElementById('con6').innerHTML = `<i class="fas fa-calendar-check"></i>&nbsp; Guideline Session`;
document.getElementById('con7').innerHTML = `<i class="fas fa-tablet-alt"></i>&nbsp; Dedicated Web App`;
document.getElementById('con8').innerHTML = `<i class="fab fa-facebook-square"></i>&nbsp; Discussion Group`;

