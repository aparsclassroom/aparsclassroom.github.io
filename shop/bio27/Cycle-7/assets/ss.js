const product = "hbio27";
const productName = "Pre-Medical General Knowledge & English Foundation Program 2027";
const productCode = "601";
const productCode2 = "602";
const fix = 2000;
const pls = 1500;
const pls2 = 1250;
const init = 0;
let Platform = "Online";
const Cycle = "Cycle-7";    
const Cycle2 = "Cycle-8";
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

