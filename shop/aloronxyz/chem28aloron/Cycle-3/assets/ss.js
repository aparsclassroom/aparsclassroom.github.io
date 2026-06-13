// const product = "chem27aloron";
// const productName = "ACS HSC 27 chemistry by Mottasin Pahlovi";
// const productCode = "423";
// const fix = 1500;
// const pls = 1000;
// const init = 0;
// const Platform = "Online";
const product = "chem28aloron";
const product2 = "chem28aloronwbooks";
const productName = "ACS HSC 28 Chemistry by Mottasin Pahlovi";
const productName2 = "ACS HSC 28 Chemistry by Mottasin Pahlovi with Books";
let productCode = "711";
let productCode2 = "717";
let productCode3 = "721";
let productCode4 = "723";
let productCode5 = "796";
let productCode6 = "797";
const fix = 1500;
const pls = 1000;
const pls2 = 1350;
const init = 0;
const Platform = "Online";
const Platform2 = "Physical";

const Cycle = location.pathname.split('/').find(part => /^Cycle-\d+$/.test(part));
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}

var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// var player;

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: 'ahxh5aIdTBg',
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
// fetch(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode}`)
//     .then((res) => {
//         return res.json()
//     })
//     .then((data) => {
//         document.getElementById('enrolled').setAttribute('countTo', data.count + init);
//         if (document.getElementById('enrolled')) {
//             const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
//             if (!countUp.error) {
//                 countUp.start();
//             } else {
//                 console.error(countUp.error);
//             }
//         }

//     })
//     .catch((err) => {
//         console.log(err)
//     })
const getAcsCampEnrollmentCount = () => {
    const cycleNumber = Number(Cycle.replace("Cycle-", ""));
    const acsCampProductCode = String(1040 + cycleNumber);

    if (!cycleNumber) {
        return Promise.resolve({ count: 0 });
    }

    return fetch("https://api.acscamp.com/v1/products/sales-count", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productGroup: "chem28aloron",
            productCode: acsCampProductCode,
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
    fetch(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode2}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=${productCode3}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=${productCode4}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=${productCode5}`).then(res => res.json()),
    fetch(`https://${shopName2}/enrollment/?productCode=${productCode6}`).then(res => res.json()),
    getAcsCampEnrollmentCount()
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
    .catch(err => {
        console.log("Enrollment fetch error:", err);
    });
document.getElementById('con1').innerHTML = `<i class="fab fa-youtube" style="color:#FF0000;"></i>&nbsp; Live Classes`;
document.getElementById('con2').innerHTML = `<i class="fas fa-book" style="color:#6f42c1;"></i>&nbsp; Archive Classes`;
document.getElementById('con3').innerHTML = `<i class="fas fa-clipboard-check" style="color:#20c997;"></i>&nbsp; Weekly Exam`;
document.getElementById('con4').innerHTML = `<i class="fas fa-pen-alt" style="color:#fd7e14;"></i>&nbsp; Chapter Ending Mega Exam`;
document.getElementById('con5').innerHTML = `<i class="fas fa-tablet-alt" style="color:#007bff;"></i>&nbsp; Dedicated Webapp`;
document.getElementById('con6').innerHTML = `<i class="fas fa-file-alt" style="color:#28a745;"></i>&nbsp; Practice Sheet`;
document.getElementById('con7').innerHTML = `<i class="fab fa-facebook" style="color:#3b5998;"></i>&nbsp; Facebook Group`;
document.getElementById('con8').innerHTML = `<i class="fas fa-comments" style="color:#17a2b8;"></i>&nbsp; Discussion Group`;
