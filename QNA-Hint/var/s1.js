var topicNo, question, mainAnswer, stp1, stp2, stp3, steps, step1Data, step2Data, step3Data, hint1Ans, hint2Ans, hint4Ans, youtubeLink;
var cc = "#B9D2B1";
var fc = "#FBACBE";

    topicNo = "গাণিতিক সমস্যা - ১";
    question = "দুটি ভেক্টর 𝐴 ⃗=30 𝑖 ̂  −100 𝑘 ̂ ও 𝐵 ⃗=3 𝑖 ̂  +4 𝑗 ̂−10 𝑘 ̂ হলে  𝐴 ⃗   এর ওপর 𝐵 ⃗ এর উপাংশ নির্ণয় কর? ";
    mainAnswer = "3 𝑖 ̂  −10 𝑘 ̂";
    stp1 = "ধাপ ১ : অভিক্ষেপ নির্ণয়";
    stp2 = "ধাপ ২ : একক ভেক্টর নির্ণয়";
    stp3 = "ধাপ ৩ : অভিক্ষেপ হতে উপাংশ নির্ণয়";
    steps =     
`<div class="center bangla">
<ul class="left">
    <li>${stp1}</li>
    <li>${stp2}</li>
    <li>${stp3}</li>
</ul>
</div>`;
    step1Data = "অভিক্ষেপ নির্ণয়";
    step2Data = "একক ভেক্টর নির্ণয়";
    step3Data = "অভিক্ষেপ হতে উপাংশ নির্ণয়";
    hint1Ans = "√109";
    hint2Ans = "something";
    hint3Ans = "30N";
    youtubeLink = "https://youtu.be/y8ESB5B4JLc?list=PLubWB9tWo5lVAdd2bXEW3Tgn99tcxzDbt&t=1184";


$( document ).ready(function() {
    document.getElementById("topic").innerHTML = topicNo;
    document.getElementById("ques").innerHTML = question;
    document.getElementById("help").style.display = "none";
    document.getElementById("yt").style.display = "none";
});
$(function() {
    $('#youtube').attr("href", youtubeLink);
  });
  function checkAns() {
     var mainAns = document.getElementById("mainAns").value;
      if (mainAns == mainAnswer) {
          alert("correct answer");
          document.getElementById("next").style.display = "block";
          document.getElementById("checkAns").style.display = "none";
          document.getElementById("hint1").innerHTML = "";
          document.getElementById("hints").style.display = "none";
          
      } else {
          alert("wrong answer");
      }
      document.getElementById("timerbtn").style = "display:inline";
      document.getElementById("timerbtn").innerText = "Retake?";
      document.getElementById("timerbtn").innerText = "Retake?";
      document.getElementById("checkAns").style.display = "none";
  }
  
  function showhint1() {
      document.getElementById("help").style.display = "block";
      document.getElementById("hint1").innerHTML = steps;
      document.getElementById("step1").innerHTML = step1Data;
      document.getElementById("step2").innerHTML = step2Data;
      document.getElementById("step3").innerHTML = step3Data;
      document.getElementById("hints").style.display = "none";
      document.getElementById("valBtn1").style.display = "block";
      document.getElementById("valBtn2").style.display = "none";
      document.getElementById("valBtn3").style.display = "none";
      document.getElementById("stepWisehint").style.display = "block";
      document.getElementById("yt").style.display = "block";
  }
  function check1() {
      var h1Input = document.getElementById("h1Ans").value;
      if (h1Input == hint1Ans) {
        alert("Milse");
        document.getElementById("valBtn1").style.display = "none";
        document.getElementById("valBtn2").style.display = "block";
        document.getElementById("tab1").style.background = cc;
      }else {
        alert("Mile nai");
        document.getElementById("tab1").style.background = fc;
      }
    }
    function check2() {
      var h2Input = document.getElementById("h2Ans").value;
      if (h2Input == hint2Ans) {
        alert("Aidao Milse");
        document.getElementById("valBtn2").style.display = "none";
        document.getElementById("valBtn3").style.display = "block";
        document.getElementById("tab2").style.background = cc;
      }else {
        alert("agerta milsilo but aita Mile nai");
        document.getElementById("tab2").style.background = fc;
      }
    }
    function check3() {
      var h3Input = document.getElementById("h3Ans").value;
      if (h3Input == hint3Ans) {
        alert("Shobti Milse");
        document.getElementById("valBtn3").style.display = "none";
        document.getElementById("tab3").style.background = cc;
      }else {
        alert("ager 2ta milsilo but last aita Mile nai");
        document.getElementById("tab3").style.background = fc;
      }
    }
  