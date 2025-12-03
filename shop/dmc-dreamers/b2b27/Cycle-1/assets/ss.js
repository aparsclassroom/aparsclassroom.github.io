// const product = "b2b27";
// const productName = "ACS Biology Cycle for HSC 27 by DMC Dreamers";
// const init = 0;
// const Platform = "Online";
// const productCode = "414";
// const fix = 2000;
// const pls = 1000;
const product = "b2b27";
const product2 = "b2b27wbooks";
const productName = "ACS Biology Cycle for HSC 27 by DMC Dreamers";
const productName2 = "ACS Biology Cycle for HSC 27 by DMC Dreamers with Books";
let productCode = "414";
let productCode2 = "508";
const fix = 1500;
const pls = 1000;
const pls2 = 1300;
const init = 0;
const Platform = "Online";
const Platform2 = "Physical";
const Cycle = location.pathname.split('/')[4];
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
        videoId: '93ERPfprYVU',
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