const product = "singleebi28";
const productName = "ACS HSC 28 EBI Cycle 3 (Bangla)";
const productCode = "668";
const fix = 3000;
const pls = 2000;
const init = 0;
const Platform = "Online";
const Cycle = location.pathname.split('/')[4];
const couponCode = "BANGLA750";
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

const ebi28EnrollmentProductCodes = ["665", productCode, "669", "670"];

fetch(`https://${shopName2}/enrollment/combined?productCodes=${ebi28EnrollmentProductCodes.join(",")}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const enrolled = document.getElementById('enrolled');
        if (!enrolled) {
            return;
        }
        enrolled.setAttribute('countTo', data.count + init);
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
