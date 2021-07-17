const subj = "biology";


var slider = document.getElementById("duration");
var output = document.getElementById("output");
output.value = slider.value;
slider.oninput = function() {
    output.value = this.value;
}