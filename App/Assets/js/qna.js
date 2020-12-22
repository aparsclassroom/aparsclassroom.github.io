function openVisualise(){
    document.getElementById("gif").style.display = "flex";
    document.getElementById('change1').style.display = "none";
    document.getElementById('change2').style.cssText = "display:inline-block;";
    document.getElementById("textAns").style.display = "none";
    document.getElementById('visans').style.display = "block";
}
function openText() {
  document.getElementById("gif").style.display = "none";
    document.getElementById('change2').style.display = "none";
    document.getElementById('change1').style.cssText = "display:inline-block;";
    document.getElementById("textAns").style.display = "block";
    document.getElementById('visans').style.display = "none";
}