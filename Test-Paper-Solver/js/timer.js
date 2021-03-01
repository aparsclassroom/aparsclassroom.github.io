let dt = new Date(new Date().setTime(0));
let ctime = dt.getTime();
let seconds = Math.floor((ctime % (1000 * 60)) / 1000);
let minutes = Math.floor((ctime % (1000 * 60 * 60)) / (1000 * 60));
let time = 0;
let mytime = setInterval(function() {
    time++;

    if (seconds < 59) {
        seconds++;
    } else {
        seconds = 0;
        minutes++;
    }
    let formatted_sec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let formatted_min = minutes < 10 ? `0${minutes}` : `${minutes}`
    document.querySelector("span.time").innerHTML = `${formatted_min} : ${formatted_sec}`;
}, 1000);


var cursor = document.querySelector(".cursor");
var cursor2 = document.querySelector(".cursor2");
document.addEventListener("mousemove", function(e) {
    cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});