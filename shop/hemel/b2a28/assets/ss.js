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
// const countUp = new CountUp('std', document.getElementById("std").getAttribute("countTo"));
// if (!countUp.error) {
//     countUp.start();
// } else {
//     console.error(countUp.error);
// }
// if (document.getElementById("stds")) {
//     const countUps = new CountUp('stds', document.getElementById("stds").getAttribute("countTo"));
//     if (!countUps.error) {
//         countUps.start();
//     } else {
//         console.error(countUps.error);
//     }
// }
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
Promise.all([
    fetch(`https://${shopName2}/enrollment?productCode=${productCode}`).then((res) => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=805`).then((res) => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=806`).then((res) => res.json())
])
    .then((enrollments) => {
        const totalEnrollment = enrollments.reduce((total, data) => total + (data.count || 0), init);

        document.getElementById('enrolled').setAttribute('countTo', totalEnrollment);
        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', totalEnrollment);
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
