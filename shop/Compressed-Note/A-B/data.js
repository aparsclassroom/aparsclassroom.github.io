const product = "Compressed Note AB";
const fix = 99;
const pls = 45;
const clust = "AB";
const productCode = "138";
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');

if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}