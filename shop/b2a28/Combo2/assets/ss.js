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
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=" + productCode),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=" + productCode2),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=798"),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=799"),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=805"),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=806"),
    getAfsEnrollmentCount(productCode),
    getAfsEnrollmentCount(productCode2),
    getAfsEnrollmentCount("798"),
    getAfsEnrollmentCount("799")
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
document.getElementById('con1').innerHTML = `<i class="fab fa-youtube" style="color:#FF0000;"></i>&nbsp; Live Classes`;
document.getElementById('con2').innerHTML = `<i class="fas fa-book" style="color:#6f42c1;"></i>&nbsp; Archive Classes`;
document.getElementById('con3').innerHTML = `<i class="fas fa-clipboard-check" style="color:#20c997;"></i>&nbsp; Weekly Exam`;
document.getElementById('con4').innerHTML = `<i class="fas fa-pen-alt" style="color:#fd7e14;"></i>&nbsp; Chapter Ending Mega Exam`;
document.getElementById('con5').innerHTML = `<i class="fas fa-tablet-alt" style="color:#007bff;"></i>&nbsp; Dedicated Webapp`;
document.getElementById('con6').innerHTML = `<i class="fas fa-file-alt" style="color:#28a745;"></i>&nbsp; Practice Sheet`;
document.getElementById('con7').innerHTML = `<i class="fab fa-facebook" style="color:#3b5998;"></i>&nbsp; Facebook Group`;
document.getElementById('con8').innerHTML = `<i class="fas fa-comments" style="color:#17a2b8;"></i>&nbsp; Discussion Group`;
