const product = "Compressed Note বান্ডল ( Part 1 + জ্ঞান অনুধাবন )";
const fix = 120;
const pls = 59;
const clust = "বান্ডল";
const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}