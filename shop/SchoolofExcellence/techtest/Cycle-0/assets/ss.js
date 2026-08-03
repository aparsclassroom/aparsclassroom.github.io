const product = "lodestareng28";
const productName = "ACS Lodestar Academic English 28 Batch Free Course";
const init = 0;
const Platform = "Online";
const productCode = "0";
const fix = 0;
//const pls = 1290;
const pls = 0;
const Cycle = location.pathname.split('/')[4];
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
document.title = productName + " (" + Cycle + ") | ASG Shop";
document.getElementById('prod').innerHTML = `${productName}<br>(${Cycle})`;
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
//         videoId: 'ksES-z0fNGk',
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

document.getElementById('moda').addEventListener('click', function () {
    if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
    }
});

document.getElementById('enrolled').setAttribute('countTo', init);
const countUp = new CountUp('enrolled', init);
if (!countUp.error) {
    countUp.start();
} else {
    console.error(countUp.error);
}
