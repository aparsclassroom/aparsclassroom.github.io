// const product = "Math26";
// const productName = "ACS HSC 27 Higher Math Academic";
// const productCode = "396";
// const fix = 1500;
// const pls = 1000;
// const init = 0;
// const Platform = "Online";
const product = "Math27";
const product2 = "math27wbooks";
const productName = "ACS HSC 27 Higher Math Academic";
const productName2 = "ACS HSC 27 Higher Math Academic with Books";
let productCode = "396";
let productCode2 = "427";
const fix = 1500;
const pls = 1000;
const pls2 = 1350;
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
        videoId: 'WPYXe-j9CBU',
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