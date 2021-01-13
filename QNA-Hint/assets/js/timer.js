var ntimer;

function countdown( timer, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;
    document.getElementById("timerbtn").style.display = "none";
    document.getElementById("ten-countdown").style.display = "inline";
    document.getElementById("finished").style.display = "inline";
    document.getElementById("checkAns").style.display = "none";
    document.getElementById("next").style.display = "none";
    document.getElementById("mainAns").style.display = "block";
    document.getElementById("hints").style.display = "block";
    document.getElementById("mainAns").value = "";
    document.getElementById("hint1").innerHTML = "";
    document.getElementById("stepWisehint").style.display = "none";
    document.getElementById("yt").style.display = "none";
    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

     function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "Time is up!";
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            ntimer =  setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }
    element = document.getElementById( timer );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

function finished() {
    clearInterval(ntimer);
    document.getElementById("finished").style.display = "none";
    document.getElementById("checkAns").style.display = "block";
 }


 
// $( document ).ready(function() {
//     document.getElementById("topic").innerHTML = topicNo;
//     document.getElementById("ques").innerHTML = question;
//     document.getElementById("help").style.display = "none";
//     document.getElementById("yt").style.display = "none";
// });
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
