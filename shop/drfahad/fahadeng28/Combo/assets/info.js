const product = "fahadeng28combo";
const product2 = "fahadeng28combowbooks";
const productName = "ACS English Republic: HSC 28 Academic Combo";
const productName2 = "ACS English Republic: HSC 28 Academic with books Combo";
let productCode = "870";
let productCode2 = "873";
const fix = 4000; // TODO: strike-through price not given yet
const pls = 1700;
const pls2 = 3000;
const init = 0;
const Platform = "Physical"; // without-books variant is physical too
const Platform2 = "Physical";
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}
