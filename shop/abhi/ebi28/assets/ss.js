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
// const vidD = document.getElementById('video');
// const clprc = document.getElementById('clprc');
// if (screen.width <= 600) {
//     clprc.classList.add('fixed-bottom');
// } else {
//     clprc.classList.remove('fixed-bottom');
//     vidD.style.position = 'sticky';
// }
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
const ebi28ComboProductCodes = ["665", "669", "670", "671"];
const ebi28CycleProductCodes = {
    "Cycle-1": "666",
    "Cycle-2": "667",
    "Cycle-3": "668"
};
const ebi28CurrentCycle = location.pathname.split("/").find(part => /^Cycle-\d+$/i.test(part));
const ebi28EnrollmentProductCodes = ebi28CurrentCycle && ebi28CycleProductCodes[ebi28CurrentCycle]
    ? ["665", ebi28CycleProductCodes[ebi28CurrentCycle]]
    : ebi28ComboProductCodes;

const getEnrollmentCount = (url, dataPath = (data) => data.count) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => Number(dataPath(data)) || 0)
        .catch((err) => {
            console.log(err);
            return 0;
        });
};

const getAfsEnrollmentCount = (code) => getEnrollmentCount(
    "https://hsc.acsfutureschool.com/api/enrollments/count?product_code=" + code,
    (data) => data.data && data.data.count
);

Promise.all([
    getEnrollmentCount("https://" + shopName2 + "/enrollment/combined?productCodes=" + ebi28EnrollmentProductCodes.join(",")),
    getAfsEnrollmentCount(productCode)
])
    .then((counts) => {
        const enrolled = document.getElementById('enrolled');
        if (!enrolled) {
            return;
        }
        const totalEnrollment = counts.reduce((total, count) => total + count, init);
        enrolled.setAttribute('countTo', totalEnrollment);
        const countUp = new CountUp('enrolled', enrolled.getAttribute("countTo"));
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    })
    .catch((err) => {
        console.log(err);
    });
