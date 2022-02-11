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
        videoId: 'z_nW9QXlQfs',
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
fetch(`https://script.google.com/macros/s/AKfycbybPisP2Jk5_9Jmc6CzcnOwm71J6r8tGyb9_hCdcEtXcBED6I979qpOHedh5rsx0EO3Jw/exec?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let types = data.types;

        document.getElementById('con1').innerHTML = `<i class="fab fa-youtube"></i>&nbsp; ${types[0].TotalClasses} ${types[0].ContType}`;
        document.getElementById('con2').innerHTML = `<i class="fas fa-clipboard"></i>&nbsp; 17 Lecture Sheets `;
        document.getElementById('con3').innerHTML = `<i class="fas fa-clinic-medical"></i>&nbsp;17 Class Tests `;
        document.getElementById('con4').innerHTML = `<i class="fas fa-question-circle"></i>&nbsp;3 Model Tests`;
        document.getElementById('duration').innerHTML = `Self Paced`;
        document.getElementById('enrolled').setAttribute('countTo', types[3].TotalClasses);
        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
        document.getElementById('con5').innerHTML = `<i class="fas fa-tablet-alt"></i>&nbsp; Dedicated Web App`;
        document.getElementById('con6').innerHTML = `<i class="fab fa-facebook-square"></i></i>&nbsp; Discussion Group`;
    })
    .catch((err) => {
        console.log(err)
    })