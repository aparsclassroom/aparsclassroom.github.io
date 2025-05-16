const product = "hbio27";
const product2 = "hbio27wbook";
const productName = "ACS - College Biology Course by BioMission";
const productName2 = "ACS - College Biology Course by BioMission with Book";
const productCode = "389";
const productCode2 = "432";
const fix = 2000;
const pls = 1000;
const pls2 = 1250;
const init = 0;
let Platform = "Online";
let Platform2 = "Physical";
const Cycle = location.pathname.split('/')[3];
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
//         videoId: 'qAXDnWz13ag',
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
    document.getElementById('con3').innerHTML = `<i class="fas fa-clinic-medical"></i>&nbsp;ক্লাস দিন: প্রতি সপ্তাহে ৩ দিন – রবি, মঙ্গল, বৃহস্পতি`;
    document.getElementById('con7').innerHTML = `<i class="fas fa-tablet-alt"></i>&nbsp; Dedicated Web App`;
    document.getElementById('con9').innerHTML = `<i class="fab fa-facebook-square"></i></i>&nbsp; Discussion Group`;
