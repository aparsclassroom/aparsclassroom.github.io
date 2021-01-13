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

