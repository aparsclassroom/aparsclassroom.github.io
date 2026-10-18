const product = "fahadeng28";
const product2 = "fahadeng28wbooks";
const productName = "ACS English Republic: HSC 28 Academic";
const productName2 = "ACS English Republic: HSC 28 Academic with books";
let productCode = "868";
let productCode2 = "871";
let productCode3 = "870";
let productCode4 = "873";
let productCode5 = "876"; // Special combo
let productCode6 = "879"; // Special combo with books
let specialCode = "874"; // Special cycle
let specialCode2 = "877"; // Special cycle with books
const fix = 2500; // TODO: strike-through price not given yet
const pls = 999;
const pls2 = 1799;
const init = 0;
const Platform = "Physical"; // without-books variant is physical too
const Platform2 = "Physical";
const Cycle = location.pathname.split('/')[4];
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}

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
    getEnrollmentCount("https://" + shopName2 + "/enrollment/" + Cycle + "?productCode=" + productCode),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/" + Cycle + "?productCode=" + productCode2),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=" + productCode3),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=" + productCode4),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/" + Cycle + "?productCode=" + specialCode),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/" + Cycle + "?productCode=" + specialCode2),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=" + productCode5),
    getEnrollmentCount("https://" + shopName2 + "/enrollment/?productCode=" + productCode6),
])
.then((enrollments) => {
    const totalEnrollment = enrollments.reduce((total, count) => total + count, init);

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
