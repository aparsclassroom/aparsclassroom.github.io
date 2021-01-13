var topicNo, question, mainAnswer, stp1, stp2, stp3, steps, step1Data, step2Data, step3Data, hint1Ans, hint2Ans, hint4Ans, youtubeLink;
var cc = "#B9D2B1";
var fc = "#FBACBE";
fetch('var/Data/1.json')
.then((res) => {
    return res.json();
})
.then((loadedData) => {
    data = loadedData;
    topicNo = data.topicNo;
    question = data.question;
    mainAnswer = data.mainAnswer;
    stp1 = data.stp1;
    stp2 = data.stp2;
    stp3 = data.stp3;
    steps =     
`<div class="center bangla">
<ul class="left">
    <li>${stp1}</li>
    <li>${stp2}</li>
    <li>${stp3}</li>
</ul>
</div>`;
    step1Data = data.step1Data;
    step2Data = data.step2Data;
    step3Data = data.step3Data;
    hint1Ans = data.hint1Ans;
    hint2Ans = data.hint2Ans;
    hint3Ans = data.hint3Ans;
    youtubeLink = data.youtubeLink;
    console.log(data);
})
.catch((err) => {
    console.error(err);
});

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
  