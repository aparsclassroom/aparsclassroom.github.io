const product = "afseng28";
const productName = "HSC 28 English 2nd Paper Mastery Course";
const productCode = "701";
const comboProductCode = "702";
const fix = 1500;
const pls = 1200;
const init = 0;
const Platform = "Online";
const Cycle = location.pathname.split('/')[4];
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}

// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// var player;

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

// function onPlayerReady(event) {
//     document.getElementById('thumb').style.display = "none";
//     event.target.setVolume(100);
//     event.target.playVideo();
// }
const sisterEnrollmentCountApi = `https://hsc.acsfutureschool.com/api/enrollments/count?product_code=${productCode}`;

const getEnrollmentCount = (url, dataPath = (data) => data.count) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => Number(dataPath(data)) || 0)
        .catch((err) => {
            console.log(err);
            return 0;
        });
};

Promise.all([
    getEnrollmentCount(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode}`),
    getEnrollmentCount(`https://${shopName2}/enrollment?productCode=${comboProductCode}`),
    getEnrollmentCount(sisterEnrollmentCountApi, (data) => data.data && data.data.count)
]).then(([originalCount, comboCount, sisterCount]) => {
    if (document.getElementById('enrolled')) {
        const totalEnrollment = originalCount + comboCount + sisterCount + init;
        document.getElementById('enrolled').setAttribute('countTo', totalEnrollment);
        const countUp = new CountUp('enrolled', totalEnrollment);
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    }
});
