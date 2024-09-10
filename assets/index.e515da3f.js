import { S as e, A as s, N as r, P as t } from "./vendor.d82aaa9c.js";
!(function () {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
      s(e);
    new MutationObserver((e) => {
      for (const r of e)
        if ("childList" === r.type)
          for (const e of r.addedNodes)
            "LINK" === e.tagName && "modulepreload" === e.rel && s(e);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const s = (function (e) {
      const s = {};
      return (
        e.integrity && (s.integrity = e.integrity),
        e.referrerpolicy && (s.referrerPolicy = e.referrerpolicy),
        "use-credentials" === e.crossorigin
          ? (s.credentials = "include")
          : "anonymous" === e.crossorigin
            ? (s.credentials = "omit")
            : (s.credentials = "same-origin"),
        s
      );
    })(e);
    fetch(e.href, s);
  }
})();
new e(".swiper", {
  modules: [
    s,
    r,
    t,
    function ({ swiper: e, on: s }) {
      s("beforeInit", () => {
        if ("carousel" !== e.params.effect) return;
        e.classNames.push(`${e.params.containerModifierClass}carousel`);
        const s = { watchSlidesProgress: !0, centeredSlides: !0 };
        Object.assign(e.params, s), Object.assign(e.originalParams, s);
      }),
        s("progress", () => {
          if ("carousel" !== e.params.effect) return;
          const s = e.slides.length;
          for (let r = 0; r < e.slides.length; r += 1) {
            const t = e.slides[r],
              o = e.slides[r].progress,
              i = Math.abs(o);
            let a = 1;
            i > 1 && (a = 0.3 * (i - 1) + 1);
            const n = t.querySelectorAll(".swiper-carousel-animate-opacity"),
              l = o * a * 50 + "%",
              c = 1 - 0.2 * i,
              u = s - Math.abs(Math.round(o));
            (t.style.transform = `translateX(${l}) scale(${c})`),
              (t.style.zIndex = u),
              (t.style.opacity = i > 3 ? 0 : 1),
              n.forEach((e) => {
                e.style.opacity = 1 - i / 3;
              });
          }
        }),
        s("setTransition", (s, r) => {
          if ("carousel" === e.params.effect)
            for (let t = 0; t < e.slides.length; t += 1) {
              const s = e.slides[t],
                o = s.querySelectorAll(".swiper-carousel-animate-opacity");
              (s.style.transitionDuration = `${r}ms`),
                o.forEach((e) => {
                  e.style.transitionDuration = `${r}ms`;
                });
            }
        });
    },
  ],
  effect: "carousel",
  grabCursor: !0,
  loop: !0,
  loopedSlides: 5,
  slidesPerView: "auto",
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  pagination: { el: ".swiper-pagination" },
  autoplay: { delay: 3e3 },
});
