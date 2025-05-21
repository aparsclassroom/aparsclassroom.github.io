const product = "b2b27";
const productName = "ACS Biology Cycle for HSC 27 by DMC Dreamers";
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

var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// var player;

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: 'JuUVxLymluY',
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

fetch(`https://b2b27.aparsclassroom.com/api/enrollment/total`)
  .then((res) => res.json())
  .then((data) => {
    const enrolledEl = document.getElementById('enrolled');
    if (enrolledEl) {
      const countTo = Number(data.data.total) + Number(init);

      console.log('API total:', data.data.total); // Debug
      console.log('Final countTo:', countTo);     // Debug

      const countUp = new CountUp('enrolled', countTo);
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error('CountUp error:', countUp.error);
      }
    }
  })
  .catch((err) => {
    console.error('Fetch error:', err);
  });
