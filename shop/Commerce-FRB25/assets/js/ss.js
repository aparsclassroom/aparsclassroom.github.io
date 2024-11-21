var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: false,
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: '.swiper-button-next'
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

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'AwIaoBwnvEc',
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

//const thumbImage = "https://quickchart.io/watermark?mainImageUrl=https%3A%2F%2Fi.postimg.cc%2FhvwSF8BP%2Fwithout-pic-01.jpg&markRatio=.9&position=bottom&markImageUrl=https%3A%2F%2Fchart.googleapis.com%2Fchart%3Fchst%3Dd_text_outline%26chld%3DFFFFFF%7C70%7Ch%7C000000%7Cb%7CEnrolled%3A%20";
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
fetch("https://crm.aparsclassroom.com/api/total-enrolled/FRB25", requestOptions)
    .then(response => response.json())
    .then(result => {
        document.getElementById('enrolled').setAttribute('countTo', result.enrolled[0].totalTransactions + init);
       // document.getElementById("thumImg").src = thumbImage + (result.enrolled[0].totalTransactions + init);
        const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    })
    .catch(error => console.log('error', error));
