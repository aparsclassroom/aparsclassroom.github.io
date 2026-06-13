const product = "singleebi28";
const productName = "ACS HSC 28 EBI Cycle 2 (English)";
const productCode = "667";
const fix = 3000;
const pls = 2000;
const init = 0;
const Platform = "Online";
const Cycle = location.pathname.split('/')[4];
const couponCode = "ENGLISH750";
const couponDiscountText = "750 TAKA Discount";
const blockedNormalProducts = ["665", "669", "670", "671"];
const blockedCycleProducts = [
    { cycle: Cycle, products: [productCode] }
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

const ebi28EnrollmentProductCodes = ["665", productCode, "669", "671"];

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

const getAcsCampEnrollmentCount = () => {
    const cycleNumber = Number(Cycle.replace("Cycle-", ""));
    const acsCampProductCode = String(1036 + cycleNumber);

    if (!cycleNumber) {
        return Promise.resolve(0);
    }

    return fetch("https://api.acscamp.com/v1/products/sales-count", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productGroup: "ebi28",
            productCode: acsCampProductCode,
        }),
    })
        .then((res) => res.json())
        .then((data) => Number(data.count || data.salesCount || data.total || (data.data && (data.data.count || data.data.salesCount || data.data.total))) || 0)
        .catch((err) => {
            console.log(err);
            return 0;
        });
};

Promise.all([
    getEnrollmentCount("https://" + shopName2 + "/enrollment/combined?productCodes=" + ebi28EnrollmentProductCodes.join(",")),
    getAfsEnrollmentCount(productCode),
    getAcsCampEnrollmentCount()
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
