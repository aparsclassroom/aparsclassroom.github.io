var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 5,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
});

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
var trailerVideoId = 'l7CfN4QBSZY';
var thumb = document.getElementById('thumb');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: trailerVideoId,
        playerVars: { 'autoplay': 1, 'playsinline': 1, 'controls': 1, 'rel': 0 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && thumb) {
        thumb.style.display = "none";
    }
}

if (thumb) {
    thumb.style.cursor = 'pointer';
    thumb.addEventListener('click', function () {
        thumb.style.display = "none";

        if (player && typeof player.playVideo === 'function') {
            player.unMute();
            player.setVolume(100);
            player.playVideo();
        } else {
            document.getElementById('player').outerHTML = '<iframe id="player" class="embed-responsive-item" src="https://www.youtube.com/embed/' + trailerVideoId + '?autoplay=1&playsinline=1&rel=0" title="ACS Varsity B Unit trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
        }
    });
}

fetch(`https://${shopName2}/enrollment/combined?productCodes=${productCode},832`)
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
