const product = "TestPaperBOSSSSC27";
const productName = "Test Paper BOSS SSC 27 by Shadman Bhaiya";
const productCode = "828";
const fix = 3000;
const pls = 1190;
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
