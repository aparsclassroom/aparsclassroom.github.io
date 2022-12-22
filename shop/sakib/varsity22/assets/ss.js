var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 2,
    loop: false,
    autoplay: {
        delay: 4000,
    },
});

const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'sEAEEI0iQoM',
        playerVars: { 'autoplay': 1, 'playsinline': 1 },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('thumb').style.display = "none";
    event.target.setVolume(100);
    event.target.playVideo();
}
fetch(`https://${shopName2}/enrollment?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        document.getElementById('enrolled').setAttribute('countTo', data.count + init);
        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }

    })
    .catch((err) => {
        console.log(err)
    })
fetch(`https://script.google.com/macros/s/AKfycbwtMPdak5swMkYJbfA0WzkmypaXDYTcQmG1LPrGoPc6nU8IsIw9N0OFIUdgBzqz1Gr1/exec?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let types = data.types;

        document.getElementById('con1').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; একটি ক্লাসে তিনটি চ্যাপ্টার নয় বরং তিনটি ক্লাসে একটি চ্যাপ্টার`;
        document.getElementById('con4').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; Secret Shortcut Book PDF`;
        document.getElementById('con5').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; DU Question Bank PDF`;
        document.getElementById('con6').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; Monthly Mentorship Session`;
        document.getElementById('con7').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; সপ্তাহে ৭ দিনই ক্লাস`;
        document.getElementById('con0').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; ভার্সিটি প্রস্তুতির সবচেয়ে নির্ভরযোগ্য প্রাইভেট ব্যাচ`;
        document.getElementById('loading1').innerHTML = "";
        document.getElementById('pra11').innerHTML = "";
        document.getElementById('exloading11').innerHTML = "";

        let classes = data.classes;


        let domC = document.getElementById('Classes1');
        classes.forEach(element => {
            if (element.Playlist != "") {
                domC.innerHTML += `
                <li>
                <a href = "${element.Playlist}" style="color:rgb(37, 173, 55);text-decoration:none;font-weight:bold;" target="blank">🗝️🔒 ${element.SubAndPaper} - ${element.LiveClass} Classes</a>
                </li>`
            } else {
                domC.innerHTML += `
                <li class="disabled">
                🔒 ${element.SubAndPaper} - ${element.LiveClass} Classes
                </li>`
            }

        });

        let prac1 = document.getElementById('prac1');
        classes.forEach(element => {
            prac1.innerHTML += `
                <li class="disabled">
                🔒 ${element.SubAndPaper} - ${element.LectureSheet} Sheets
                </li>`

        });


        let ex1 = document.getElementById('ex1');
        classes.forEach(element => {
            ex1.innerHTML += `
                <li class="disabled">
                🔒 ${element.SubAndPaper} - ${element.Exam} Exam(s)
                </li>`

        });


    })
    .catch((err) => {
        console.log(err)
    })