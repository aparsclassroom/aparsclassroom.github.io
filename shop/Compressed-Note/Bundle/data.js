const product = "Compressed Note Bundle ( Part 1 + AB )";
const fix = 120;
const pls = 59;
const clust = "Bundle";
const productCode = "139";
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}