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
async function getAchieveEnrollCount() {
    if (!achieveID) {
        return 0;
    }

    try {
        const res = await fetch(
            `https://achieveacs.com/api/v1/b2b/enroll-count?courseId=${achieveID}`
        );
        const data = await res.json();
        console.log(data.enrollCount);
        return Number(data.enrollCount) || 0;
    } catch (err) {
        console.log(err);
        return 0;
    }
}

fetch(`https://${shopName2}/enrollment?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then(async (data) => {
        const achieveEnrollCount = await getAchieveEnrollCount();
        const totalEnrollCount = (Number(data.count) || 0) + achieveEnrollCount + init;

        document.getElementById('enrolled').setAttribute('countTo', totalEnrollCount);
        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }

    })
    .catch((err) => {
        console.log(err)
    })
