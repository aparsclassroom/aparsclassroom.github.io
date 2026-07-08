const product = "afssadmanchem28";
const productName = "HSC 28 Premium Full Biology Course by Shadman Bhaiya";
const productCode = "826";
const fix = 6000;
const pls = 1890;
const init = 0;
const Platform = "Online";

fetch(`https://${shopName2}/enrollment/?productCode=${productCode}`)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById('enrolled').setAttribute('countTo', data.count + init);
        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
    })
    .catch((err) => {
        console.log(err);
    });
