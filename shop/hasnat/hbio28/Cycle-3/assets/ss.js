const product = "hbio28";
const product2 = "hbio28wbooks";
const productName = "ACS - College Biology Course by BioMission";
const productName2 = "ACS - College Biology Course by BioMission with Book";
const productCode = "624";
const productCode2 = "630";
const fix = 2000;
const pls = 1000;
const pls2 = 1300;
const init = 0;
let Platform = "Online";
let Platform2 = "Physical";
const Cycle = location.pathname.split('/')[4];
const hbio28ComboEnrollmentCodes = {
    "Cycle-1": ["703", "706", "705", "708", "805", "806"],
    "Cycle-2": ["704", "707", "705", "708", "805", "806"],
    "Cycle-3": ["703", "706", "705", "708", "805", "806"],
    "Cycle-4": ["704", "707", "705", "708", "805", "806"],
    "Cycle-5": ["703", "706", "705", "708", "805", "806"],
    "Cycle-6": ["704", "707", "705", "708", "805", "806"]
};
const comboEnrollmentCodes = hbio28ComboEnrollmentCodes[Cycle] || [];
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}

var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// var player;

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: 'QbZv2pg2aoM',
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
    fetch(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode2}`).then(res => res.json()),
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
    .catch(err => {
        console.log("Enrollment fetch error:", err);
    });
