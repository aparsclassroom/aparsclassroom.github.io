var swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 2,
  loop: false,
  autoplay: {
    delay: 4000,
  },
});

const vidD = document.getElementById("video");
const clprc = document.getElementById("clprc");
if (screen.width <= 600) {
  clprc.classList.add("fixed-bottom");
} else {
  clprc.classList.remove("fixed-bottom");
  vidD.style.position = "sticky";
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
//         videoId: 'nlnlMNNr47s',
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
fetch(`https://${shopName2}/enrollment?productCode=${productCode}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    document
      .getElementById("enrolled")
      .setAttribute("countTo", data.count + init);
    if (document.getElementById("enrolled")) {
      const countUp = new CountUp(
        "enrolled",
        document.getElementById("enrolled").getAttribute("countTo"),
      );
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
document.getElementById("con1").innerHTML =
  `<i class="fas fa-check-circle"></i>&nbsp; Paper final exam -8 `;
document.getElementById("con4").innerHTML =
  `<i class="fas fa-check-circle"></i>&nbsp; Subject final -4`;
document.getElementById("con5").innerHTML =
  `<i class="fas fa-check-circle"></i>&nbsp; Model test -10`;
document.getElementById("con6").innerHTML =
  `<i class="fas fa-check-circle"></i>&nbsp; Monthly Mentorship Session`;
document.getElementById("con0").innerHTML =
  `<i class="fas fa-check-circle"></i>&nbsp; ভার্সিটি প্রস্তুতির সবচেয়ে নির্ভরযোগ্য প্রাইভেট ব্যাচ`;
