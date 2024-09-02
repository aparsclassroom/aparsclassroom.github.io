const product = "BUET Challenger I";
const productName = "buetchem24";
const productCode = "233";
const fix = 1000;
const pls = 800;
const init = 0;
const Platform = "Sanjoy";
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
//         videoId: 'lXVi-i3Ul6s',
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
fetch(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        document.getElementById('enrolled').setAttribute('countTo', data.count + init);
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

    document.getElementById('con1').innerHTML = `<i title="feature" class="fa-solid fa-circle-check"></i>&nbsp; 20+ Live Classes`;
    document.getElementById('con3').innerHTML = `<i title="feature" class="fa-solid fa-circle-check"></i>&nbsp;2 Question Bank Solve Class`;
    document.getElementById('con4').innerHTML = `<i title="feature" class="fa-solid fa-circle-check"></i>&nbsp;2 Special MCQ + CQ Class `;
    document.getElementById('con5').innerHTML = `<i title="feature" class="fa-solid fa-circle-check"></i>&nbsp;2 Mega Exam`;
    document.getElementById('con7').innerHTML = `<i title="feature" class="fa-solid fa-circle-check"></i>&nbsp; Dedicated Web App`;
    document.getElementById('con9').innerHTML = `<i title="feature" class="fa-solid fa-circle-check"></i>&nbsp; Dedicated Lecture Sheet`;