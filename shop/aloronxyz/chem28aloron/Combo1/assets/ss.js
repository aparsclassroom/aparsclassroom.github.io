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
const Cycle = location.pathname.split('/').find(part => /^Combo\d+$/.test(part));


const getEnrollmentCount = (url, dataPath = (data) => data.count) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => ({ count: Number(dataPath(data)) || 0 }))
        .catch((err) => {
            console.log(err);
            return { count: 0 };
        });
};

const getB2a28AfsEnrollmentCount = (code) => getEnrollmentCount(
    "https://hsc.acsfutureschool.com/api/enrollments/count?product_code=" + code,
    (data) => data.data && data.data.count
);

const getB2a28EnrollmentCount = (code) => getEnrollmentCount(
    "https://" + shopName2 + "/enrollment/?productCode=" + code
);

const getAcsCampEnrollmentCount = () => {
    return fetch("https://api.acscamp.com/v1/products/sales-count", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productGroup: "chem28aloroncombo1",
            productCode: "1047",
        }),
    })
        .then((res) => res.json())
        .then((data) => ({
            count: Number(data.count || data.salesCount || data.total || (data.data && (data.data.count || data.data.salesCount || data.data.total))) || 0,
        }))
        .catch((err) => {
            console.log(err);
            return { count: 0 };
        });
};

Promise.all([
    fetch(`https://${shopName2}/enrollment/?productCode=${productCode}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=${productCode2}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=796`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=797`).then(res => res.json()),
    getAcsCampEnrollmentCount(),
    getB2a28EnrollmentCount("694"),
    getB2a28EnrollmentCount("696"),
    getB2a28EnrollmentCount("798"),
    getB2a28EnrollmentCount("799"),
    getB2a28EnrollmentCount("805"),
    getB2a28EnrollmentCount("806"),
    getB2a28AfsEnrollmentCount("694"),
])
    .then((enrollments) => {
        const totalEnrollment = enrollments.reduce((total, data) => total + (data.count || 0), init);
        const enrolled = document.getElementById('enrolled');

        if (enrolled) {
            enrolled.setAttribute('countTo', totalEnrollment);
            const countUp = new CountUp('enrolled', totalEnrollment);
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
    })
    .catch(err => {
        console.log("Enrollment fetch error:", err);
    });

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: 'dB9ypk_Vjr0',
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

// document.getElementById('moda').addEventListener('click', function () {
//     if (player && typeof player.pauseVideo === 'function') {
//         player.pauseVideo();
//     }
// });

document.getElementById('con1').innerHTML = `<i class="fab fa-youtube" style="color:#FF0000;"></i>&nbsp; Live Classes`;
document.getElementById('con2').innerHTML = `<i class="fas fa-book" style="color:#6f42c1;"></i>&nbsp; Archive Classes`;
document.getElementById('con3').innerHTML = `<i class="fas fa-clipboard-check" style="color:#20c997;"></i>&nbsp; Weekly Exam`;
document.getElementById('con4').innerHTML = `<i class="fas fa-pen-alt" style="color:#fd7e14;"></i>&nbsp; Chapter Ending Mega Exam`;
document.getElementById('con5').innerHTML = `<i class="fas fa-tablet-alt" style="color:#007bff;"></i>&nbsp; Dedicated Webapp`;
document.getElementById('con6').innerHTML = `<i class="fas fa-file-alt" style="color:#28a745;"></i>&nbsp; Practice Sheet`;
document.getElementById('con7').innerHTML = `<i class="fab fa-facebook" style="color:#3b5998;"></i>&nbsp; Facebook Group`;
document.getElementById('con8').innerHTML = `<i class="fas fa-comments" style="color:#17a2b8;"></i>&nbsp; Discussion Group`;
