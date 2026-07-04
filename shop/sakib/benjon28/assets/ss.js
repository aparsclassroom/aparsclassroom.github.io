var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
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

function onPlayerReady(event) {
    document.getElementById('thumb').style.display = "none";
    event.target.setVolume(100);
    event.target.playVideo();
}

const sisterEnrollmentCountApi = `https://hsc.acsfutureschool.com/api/enrollments/count?product_code=${productCode}`;

const getEnrollmentCount = (url, dataPath = (data) => data.count) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => Number(dataPath(data)) || 0)
        .catch((err) => {
            console.log(err);
            return 0;
        });
};

Promise.all([
    getEnrollmentCount(`https://${shopName2}/enrollment?productCode=${productCode}`),
    getEnrollmentCount(sisterEnrollmentCountApi, (data) => data.data && data.data.count)
]).then(([originalCount, sisterCount]) => {
    if (document.getElementById('enrolled')) {
        document.getElementById('enrolled').setAttribute('countTo', originalCount + sisterCount + init);
        const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    }
});
