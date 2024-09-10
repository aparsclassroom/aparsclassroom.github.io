var a;

function play() {
  var e = document.getElementById("audio");
  e.paused
    ? (e.play(),
      (document.getElementById("adImg").innerHTML =
        '\n        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">\n        <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>\n        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>\n        <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>\n      </svg>\n        '))
    : (e.pause(),
      (e.currentTime = 0),
      (document.getElementById("adImg").innerHTML =
        '\n        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16">\n        <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>\n      </svg>\n        '));
}
window.addEventListener("load", function () {
  var e = window.atob("aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy8="),
    n = window.atob("L2V4ZWM="),
    t = window.atob(inf);
  fetch(e + t + n)
    .then((e) => e.json())
    .then((e) => {
      a = e;
      var n = sl - 1,
        t = a[n].Number,
        l = a[n].Word,
        o = a[n].Subject,
        i = a[n].Chapter,
        s = a[n].Ref,
        r = a[n].RefPage,
        d = a[n].Meaning,
        c = a[n].Description,
        g = a[n].img,
        m = (a[n].video, a[n].Audio),
        p = a[n].Return;
      (document.title = a[n].Word + " | BioDictionary"),
        (document.getElementById("explainations").innerHTML =
          `\n            <div class="row justify-content-center">\n    <div class="container">\n\n        <div style="position:absolute;">\n                <a type="button" id="book" class="btn btn-primary">\n            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" class="bi bi-bookmark-heart" viewBox="0 0 16 16">\n<path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>\n<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>\n</svg>\n            </a>\n            <a id="deletebook" class="btn btn-primary">\n            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">\n<path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>\n</svg>\n            </a>\n\n            </div>\n            <div style="text-align:right;">\n            <a type="button" class="btn btn-primary" href="${p}" id="rt">\n                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-arrow-return-left" viewBox="0 0 16 16">\n                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>\n                </svg>\n                </a> \n               </div>\n                <div id="row">\n                <div id="main">\n\n\n        <div class="card bg-primary shadow-soft border-light px-4 py-1 mb-6">\n            \n            <div class="card-body text-md-left">\n\n                <div class="row align-items-center">\n                    <div class="mb-3 lonng">\n                    <div class="text-center">\n                    <h3 style="max-width:100%" class = "bangla text-danger navbar-brand shadow-soft py-2 px-3 rounded border border-light"><strong>${l}</strong></h3>\n                    </div>\n                    <div style="padding:15px;border-radius:10px" class="shadow-inset">\n                    <p class = "bangla"><b>অর্থ :</b> ${d}</p>\n                    </div>\n                    <div style="margin-top:5px;padding:15px;border-radius:10px" class="shadow-inset">\n                    <p class = "bangla"><b>ব্যাখ্যা :</b> ${c}</p>\n                    </div>\n                    <div style="margin-top:10px;padding:15px;border-radius:10px;" class="card bg-primary shadow-soft border-light px-4 mb-3">\n                    <h3 class = "bangla text-secondary text-center"><strong>সূত্র</strong></h3>\n                    <p class = "bangla svgs"><b>&nbsp;বই :</b> ${s}</p>\n                    <p class = "bangla svgs"><b>&nbsp;অধ্যায় :</b> ${i}</p>\n                    <p class = "bangla svgs"><b>&nbsp;পৃষ্ঠা :</b> ${r}</p>\n                    </div>\n                        <div class="mb-4">\n                        <a type="button" class="btn btn-primary btn-pill" id="ad" onclick="play()"><span id="adImg"></span></a>\n                        <audio id="audio" preload="none" src="${m}"></audio>\n                    </div>   \n                </div>\n                \n                <div class="col-12 col-md-6 mt-4 mt-md-0 text-md-right" id="fi">                 \n   \n                        <img src="${g}" id="image" class="card-img-top rounded" alt="${l}">\n                        <figcaption style="margin-top:10px;" class="figure-caption bangla text-center">চিত্র : ${l}</figcaption>\n\n            </div>\n                    </div>\n\n        </div>\n\n        `),
        $(function () {
          var e = {
              sl: t + "_" + i + "_" + o,
              time: new Date(),
              name: l,
              url: window.location.href,
            },
            n = JSON.parse(sessionStorage.getItem("todayWatched"));
          if (
            (null == n && (n = []),
            n.filter(function (e) {
              return e.url === window.location.href;
            }).length > 0)
          )
            return !1;
          n.push(e), sessionStorage.setItem("todayWatched", JSON.stringify(n));
        }),
        $(function () {
          var e = {
              sl: t + "_" + i + "_" + o,
              time: new Date(),
              name: l,
              url: window.location.href,
            },
            n = JSON.parse(localStorage.getItem("watched"));
          if (
            (null == n && (n = []),
            n.filter(function (e) {
              return e.url === window.location.href;
            }).length > 0)
          )
            return !1;
          n.push(e), localStorage.setItem("watched", JSON.stringify(n));
        }),
        (document.getElementById("deletebook").style.display = "none");
      var b = document.getElementById("book"),
        u = document.getElementById("deletebook");
      b.addEventListener("click", function (e) {
        var n = {
          sl: t + "_" + i + "_" + o,
          time: new Date(),
          name: l,
          url: window.location.href,
        };
        if (null === localStorage.getItem("bookmarks")) {
          var a = [];
          a.push(n), localStorage.setItem("bookmarks", JSON.stringify(a));
        } else {
          var a = JSON.parse(localStorage.getItem("bookmarks"));
          a.push(n), localStorage.setItem("bookmarks", JSON.stringify(a));
        }
        h(), y();
      }),
        u.addEventListener("click", function (e) {
          for (
            var e = window.location.href,
              n = JSON.parse(localStorage.getItem("bookmarks")),
              t = 0;
            t < n.length;
            t++
          )
            n[t].url == e &&
              (n.splice(t, 1),
              (u.style.display = "none"),
              (b.style.display = "inline-block"));
          localStorage.setItem("bookmarks", JSON.stringify(n)), y(), h();
        }),
        $("#Video").on("hidden.bs.modal", function () {
          (player.currentTime = 0), player.pause();
        }),
        "" == g || "https://gdurl.com" == g
          ? ((document.getElementById("image").style.display = "none"),
            (document.getElementById("fi").style.display = "none"))
          : (document.getElementById("image").style.cssText =
              "display:inline-block;"),
        "" == m || "https://gdurl.com" == m
          ? (document.getElementById("ad").style.display = "none")
          : (document.getElementById("adImg").innerHTML =
              '\n                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-volume-off-fill" viewBox="0 0 16 16">\n                <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>\n              </svg>\n                ');
      (b = document.getElementById("book")),
        (u = document.getElementById("deletebook"));
      var v = JSON.parse(localStorage.getItem("bookmarks"));
      if (null !== v) {
        if (
          v.filter(function (e) {
            return window.location.href === e.url;
          }).length > 0
        )
          return (
            (u.style.display = "inline-block"), (b.style.display = "none"), !1
          );
        (u.style.display = "none"),
          (b.style.display = "inline-block"),
          null === localStorage.getItem("bookmarks") ||
            "[]" === localStorage.getItem("bookmarks") ||
            h(),
          y();
      }

      function h() {
        for (
          var e = window.location.href,
            n = JSON.parse(localStorage.getItem("bookmarks")),
            t = 0;
          t < n.length;
          t++
        )
          return n[t].url === e
            ? (b.style.display = "inline-block")
            : (u.style.display = "none");
      }

      function y(e) {
        e = window.location.href;
        for (
          var n = JSON.parse(localStorage.getItem("bookmarks")), t = 0;
          t < n.length;
          t++
        )
          n[t].url === e
            ? ((u.style.display = "inline-block"), (b.style.display = "none"))
            : ((u.style.display = "none"), (b.style.display = "inline-block"));
      }
    })
    .catch((e) => {
      console.error(e);
    });
});
