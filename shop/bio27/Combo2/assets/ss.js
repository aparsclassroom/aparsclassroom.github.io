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
const getEnrollmentCount = (url, dataPath = (data) => data.count) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => Number(dataPath(data)) || 0)
        .catch((err) => {
            console.log(err);
            return 0;
        });
};
const getAfsEnrollmentCount = (code) => getEnrollmentCount(
    "https://hsc.acsfutureschool.com/api/enrollments/count?product_code=" + code,
    (data) => data.data && data.data.count
);

Promise.all([
    getEnrollmentCount(`https://${shopName2}/enrollment/?productCode=${productCode}`),
    // getEnrollmentCount(`https://${shopName2}/enrollment/Cycle-2?productCode=390`),
    // getEnrollmentCount(`https://${shopName2}/enrollment/Cycle-2?productCode=433`),
    // getEnrollmentCount(`https://${shopName2}/enrollment/Cycle-4?productCode=392`),
    // getEnrollmentCount(`https://${shopName2}/enrollment/Cycle-4?productCode=435`),
    // getEnrollmentCount(`https://${shopName2}/enrollment/Cycle-6?productCode=394`),
    // getEnrollmentCount(`https://${shopName2}/enrollment/Cycle-6?productCode=437`)
])
    .then((enrollments) => {
        const totalEnrollment = enrollments.reduce((total, count) => total + count, init);
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
