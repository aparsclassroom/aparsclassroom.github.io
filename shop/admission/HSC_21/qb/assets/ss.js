const vidD = document.getElementById('video');
const clprc = document.getElementById('clprc');
if (screen.width <= 600) {
    clprc.classList.add('fixed-bottom');
} else {
    clprc.classList.remove('fixed-bottom');
    vidD.style.position = 'sticky';
}
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// var player;

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: '',
//         playerVars: { 'autoplay': 1, 'playsinline': 1 },
//         events: {
//             'onReady': onPlayerReady
//         }
//     });
// }

// function onPlayerReady(event) {
//     document.getElementById('thumb').style.display = "none";
//     event.target.setVolume(100);
//     event.target.playVideo();
// }
fetch(`https://script.google.com/macros/s/AKfycbzJu87U29nGZU2cMJuG1iqs7FUJK_haxrElEFGnG3QQ3EwgjWq2qB8iUKUyNPkfuJ0U0Q/exec?productCode=${productCode}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let types = data.types;

        document.getElementById('con1').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; Physics ফুল সিলেবাস প্রশ্নব্যাংক সল্ভ`;
        document.getElementById('con2').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; মডেলটেস্ট`;
        document.getElementById('con3').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; গুচ্ছ ইউনিভার্সিটি এবং ইঞ্জিনিয়ারিং কভার`;
        document.getElementById('duration').innerHTML = `Self Paced`;
        document.getElementById('enrolled').setAttribute('countTo', types[6].ContType);
        if (document.getElementById('enrolled')) {
            const countUp = new CountUp('enrolled', document.getElementById("enrolled").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
        document.getElementById('con5').innerHTML = `<i class="fas fa-check-circle"></i>&nbsp; ক্লিকেবল ইন্টারেক্টিভ পিডিএফ বুক`;
        document.getElementById('con6').innerHTML = `<i class="fab fa-facebook-square"></i></i>&nbsp; Discussion Group`;
    })
    .catch((err) => {
        console.log(err)
    })