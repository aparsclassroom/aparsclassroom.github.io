const product = "fahadbio28combo2";
const productName = "ACS HSC 28 Biology Academic Cycle by Dr. Fahad";
const productCode = "732";
const fix = 3000;
const pls = 2600;
const init = 0;
const Platform = "Online";
const Cycle = location.pathname.split('/')[4];
const comboEnrollmentCodes = ["733"];
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
        videoId: 'Jz8xBVc7ZDM',
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
Promise.all([
    fetch(`https://${shopName2}/enrollment/?productCode=${productCode}`).then(res => res.json()),
    ...comboEnrollmentCodes.map(code => fetch(`https://${shopName2}/enrollment/?productCode=${code}`).then(res => res.json()))
])
    .then((enrollments) => {
        const totalEnrollment = enrollments.reduce((total, data) => total + (data.count || 0), init);
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
    .catch((err) => {
        console.log("Enrollment fetch error:", err)
    })
