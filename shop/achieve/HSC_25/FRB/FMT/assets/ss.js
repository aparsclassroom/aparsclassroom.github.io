
const Cycle = "Without Books";
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
// fetch(`https://${shopName2}/enrollment?productCode=${productCode}`)
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

const productCodes = ['382', '358', '359']; 
const sum = 0;

const fetchEnrollment = async (code) => {
    try {
        const res = await fetch(`https://${shopName2}/enrollment?productCode=${code}`);
        const data = await res.json();
        return data.count;
    } catch (err) {
        console.error(`Error fetching productCode ${code}:`, err);
        return 0;
    }
};

Promise.all(productCodes.map(fetchEnrollment))
    .then(counts => {
        const totalCount = counts.reduce((sum, count) => sum + count, 0) + sum;

        const enrolledElement = document.getElementById('enrolled');
        if (enrolledElement) {
            enrolledElement.setAttribute('countTo', totalCount);
            const countUp = new CountUp('enrolled', totalCount);
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
    });
