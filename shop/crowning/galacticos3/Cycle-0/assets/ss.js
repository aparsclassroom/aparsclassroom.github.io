const product = "galacticos3.0";
const productName = "HSC Crowning English Academic to Admission Cycles Free Cycle";
const init = 0;
const Platform = "Crowning";
const productCode = "805";
const fix = 3000;
const pls = 0;
const Cycle = location.pathname.split('/')[4];
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');

document.title = productName + " (" + Cycle + ") | ASG Shop";
document.getElementById('prod').innerHTML = `${productName}<br>(${Cycle})`;
document.getElementById('prevP').innerText = fix;
document.getElementById('nop').innerText = pls + "৳";
if (document.getElementById('sprice')) {
    document.getElementById('sprice').innerText = pls;
}
if (document.getElementById('price')) {
    document.getElementById('price').value = pls;
}

if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}

fetch(`https://${shopName2}/enrollment/${Cycle}?productCode=${productCode}`)
    .then((res) => res.json())
    .then((data) => {
        if (document.getElementById('enrolled')) {
            document.getElementById('enrolled').setAttribute('countTo', (Number(data.count) || 0) + init);
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
