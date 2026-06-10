const product = "abhiebi28";
const productName = "ACS HSC 28 EBI All Cycle Combo";
const productCode = "665";
const fix = 6000;
const pls = 3000;
const init = 0;
const Platform = "Online";
const couponCode = "ACSEBI500";
const couponDiscountText = "500 TAKA Discount";
const blockedNormalProducts = ["665", "669", "670", "671"];
const blockedCycleProducts = [
    { cycle: "Cycle-1", products: ["666"] },
    { cycle: "Cycle-2", products: ["667"] },
    { cycle: "Cycle-3", products: ["668"] }
];

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

const ebi28EnrollmentProductCodes = ["665", "669", "670", "671"];

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
