const product = "fahadbio28";
const productName = "ACS HSC 28 Biology Academic Cycle by Dr. Fahad";
const productCode = "725";
const fix = 1500;
const pls = 1000;
const init = 0;
const Platform = "Online";
const Cycle = location.pathname.split('/')[4];
const fahadBio28ComboEnrollmentCodes = {
    "Cycle-1": ["731", "733"],
    "Cycle-2": ["732", "733"],
    "Cycle-3": ["731", "733"],
    "Cycle-4": ["732", "733"],
    "Cycle-5": ["731", "733"],
    "Cycle-6": ["732", "733"]
};
const comboEnrollmentCodes = fahadBio28ComboEnrollmentCodes[Cycle] || [];
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
const getAcsCampEnrollmentCount = () => {
    const cycleNumber = Number(Cycle.replace("Cycle-", ""));
    const acsCampProductCode = String(1056 + cycleNumber);

    if (!cycleNumber) {
        return Promise.resolve({ count: 0 });
    }

    return fetch("https://api.acscamp.com/v1/products/sales-count", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productGroup: "fahadbio28",
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
    ...comboEnrollmentCodes.map(code => fetch(`https://${shopName2}/enrollment/?productCode=${code}`).then(res => res.json())),
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
    .catch((err) => {
        console.log("Enrollment fetch error:", err)
    })
