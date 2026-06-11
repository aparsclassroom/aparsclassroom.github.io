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
const Cycle = location.pathname.split('/')[4];

Promise.all([
    fetch(`https://${shopName2}/enrollment/?productCode=${productCode}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=${productCode2}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=805`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=806`).then(res => res.json())
])
    .then((enrollments) => {
        const totalEnrollment = enrollments.reduce((total, data) => total + (data.count || 0), init);
        const enrolled = document.getElementById('enrolled');

        if (enrolled) {
            enrolled.setAttribute('countTo', totalEnrollment);
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

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: 'dB9ypk_Vjr0',
//         playerVars: { 'autoplay': 1, 'playsinline': 1 },
//         events: {
//             'onReady': onPlayerReady
//         }
//     });
// }

// function onPlayerReady(event) {
//     document.getElementById('thumb').style.display = "none";
//     event.target.setVolume(100);
//     event.target.playVideo();
// }

// document.getElementById('moda').addEventListener('click', function () {
//     if (player && typeof player.pauseVideo === 'function') {
//         player.pauseVideo();
//     }
// });
