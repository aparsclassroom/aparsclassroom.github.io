const bg = document.getElementById('bioT');
const theme = localStorage.getItem('biotheme');
if (theme == "true") {
    bg.classList.remove("white-content");
    document.getElementById("sid").checked = true;
} else {
    bg.classList.add("white-content");
    document.getElementById("sid").checked = false;
}

function toggleSwitch() {
    var cH = document.getElementById("sid").checked;
    if (cH == true) {
        localStorage.removeItem('biotheme');
        document.getElementById("sid").checked = false;
        document.getElementById("obi").style.cssFloat = "left";
        bg.classList.add("white-content");
    } else {
        localStorage.setItem('biotheme', true);
        document.getElementById("sid").checked = true;
        document.getElementById("obi").style.cssFloat = "right";
        bg.classList.remove("white-content");
    }
}


const api = "https://script.google.com/macros/s/AKfycbwM3zTmAIX9AH4P-7-qG9GMI4aRUXZxEDAIOHEjO6Ln1xaTVJ3DTw62q4GMJ8dCqCg3Hw/exec";