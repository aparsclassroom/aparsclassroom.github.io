const product = "b2b28";
const product2 = "b2b28wbooks";
const productName = "ACS Biology Cycle for HSC 28 by DMC Dreamers";
const productName2 = "ACS Biology Cycle for HSC 28 by DMC Dreamers with Books";
const productCode = "778";
const productCode2 = "784";
const fix = 2000;
const pls = 1000;
const pls2 = 1300;
const init = 0;
let Platform = "Online";
let Platform2 = "Physical";
const Cycle = location.pathname.split('/')[4];
const b2b28ComboEnrollmentCodes = {
    "Cycle-1": ["786", "789", "788", "791"],
    "Cycle-2": ["787", "790", "788", "791"],
    "Cycle-3": ["786", "789", "788", "791"],
    "Cycle-4": ["787", "790", "788", "791"],
    "Cycle-5": ["786", "789", "788", "791"],
    "Cycle-6": ["787", "790", "788", "791"]
};
const comboEnrollmentCodes = b2b28ComboEnrollmentCodes[Cycle] || [];
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

