const product = "Beginner 2 Master Physics Batch for HSC 23";
const productName = "Beginner 2 Master Physics Batch for HSC 23";
const productCode = "187";
const fix = 1500;
const pls = 800;
const init = 0;
const Platform = "Online";
const Cycle = location.pathname.split('/')[3];
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
        videoId: 'mnuMk8sFrOA',
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
fetch(`https://script.google.com/macros/s/AKfycbx6MMqMopfqmc_kLSgtKri4AjGz-Xn8Quo4xQNpcFrJydOr9oD1lmD3MsFI7DNQfuaMjg/exec?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let types = data.types;
        document.getElementById('con1').innerHTML = `<i class="fab fa-youtube"></i>&nbsp; ${types[0].TotalClasses} ${types[0].ContType}`;
        document.getElementById('con3').innerHTML = `<i class="fas fa-clinic-medical"></i>&nbsp;${types[2].TotalClasses} ${types[2].ContType} `;
        document.getElementById('con4').innerHTML = `<i class="fas fa-question-circle"></i>&nbsp;${types[3].TotalClasses} ${types[3].ContType} `;
        document.getElementById('con5').innerHTML = `<i class="fas fa-calendar-check"></i>&nbsp;${types[4].TotalClasses} ${types[4].ContType} `;
        document.getElementById('con7').innerHTML = `<i class="fas fa-tablet-alt"></i>&nbsp; Dedicated Web App`;
        document.getElementById('con9').innerHTML = `<i class="fab fa-facebook-square"></i></i>&nbsp; Discussion Group`;

    })
    .catch((err) => {
        console.log(err)
    })