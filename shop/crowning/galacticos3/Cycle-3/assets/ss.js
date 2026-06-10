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

const getEnrollmentCount = (url) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => Number(data.count) || 0)
        .catch((err) => {
            console.log(err);
            return 0;
        });
};

Promise.all([
    getEnrollmentCount(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode}`),
    ...comboEnrollmentProducts.map((item) => getEnrollmentCount(`https://${shopName2}/enrollment/${item.cycle}?productCode=${item.productCode}`))
]).then((counts) => {
    const totalEnrollment = counts.reduce((total, count) => total + count, init);
    if (document.getElementById('enrolled')) {
        document.getElementById('enrolled').setAttribute('countTo', totalEnrollment);
        const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    }
});
