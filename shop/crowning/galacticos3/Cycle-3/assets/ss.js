const product = "galacticos3.0";
const productName = "Flourishing Freehand Writing Course for All";
const init = 0;
const Platform = "Crowning";
const productCode = "802";
const comboEnrollmentProducts = [
    { cycle: "Cycle-5", productCode: "804" }
];
const fix = 3000;
const pls = 750;
const Cycle = location.pathname.split('/')[4];
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
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
    getEnrollmentCount(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode}`),
    getEnrollmentCount(`https://${shopName2}/enrollment/${Cycle}?productCode=804`),
    getEnrollmentCount(sisterEnrollmentCountApi, (data) => data.data && data.data.count)
]).then(([originalCount, comboCount, sisterCount]) => {
    if (document.getElementById('enrolled')) {
        document.getElementById('enrolled').setAttribute('countTo', originalCount + comboCount + sisterCount + init);
        const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    }
});
