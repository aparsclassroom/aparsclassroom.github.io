(function (t) {
  function e(e) {
    for (
      var n, i, o = e[0], r = e[1], l = e[2], d = 0, f = [];
      d < o.length;
      d++
    )
      (i = o[d]),
        Object.prototype.hasOwnProperty.call(s, i) && s[i] && f.push(s[i][0]),
        (s[i] = 0);
    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    u && u(e);
    while (f.length) f.shift()();
    return c.push.apply(c, l || []), a();
  }
  function a() {
    for (var t, e = 0; e < c.length; e++) {
      for (var a = c[e], n = !0, o = 1; o < a.length; o++) {
        var r = a[o];
        0 !== s[r] && (n = !1);
      }
      n && (c.splice(e--, 1), (t = i((i.s = a[0]))));
    }
    return t;
  }
  var n = {},
    s = { app: 0 },
    c = [];
  function i(e) {
    if (n[e]) return n[e].exports;
    var a = (n[e] = { i: e, l: !1, exports: {} });
    return t[e].call(a.exports, a, a.exports, i), (a.l = !0), a.exports;
  }
  (i.m = t),
    (i.c = n),
    (i.d = function (t, e, a) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: a });
    }),
    (i.r = function (t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && "object" === typeof t && t && t.__esModule) return t;
      var a = Object.create(null);
      if (
        (i.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          i.d(
            a,
            n,
            function (e) {
              return t[e];
            }.bind(null, n),
          );
      return a;
    }),
    (i.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t["default"];
            }
          : function () {
              return t;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (i.p = "");
  var o = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    r = o.push.bind(o);
  (o.push = e), (o = o.slice());
  for (var l = 0; l < o.length; l++) e(o[l]);
  var u = r;
  c.push([0, "chunk-vendors"]), a();
})({
  0: function (t, e, a) {
    t.exports = a("56d7");
  },
  "286e": function (t, e, a) {},
  "56d7": function (t, e, a) {
    "use strict";
    a.r(e);
    a("e260"), a("e6cf"), a("cca6"), a("a79d");
    var n = a("2b0e"),
      s = function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "v-app",
          [
            n(
              "v-main",
              [
                n(
                  "v-container",
                  [
                    n(
                      "v-card",
                      { staticClass: "mt-2", attrs: { flat: "" } },
                      [
                        n("v-card-title", [
                          n("div", { staticClass: "title__text ma-auto" }, [
                            n("img", {
                              attrs: {
                                src: a("db0f"),
                                width: "100px",
                                alt: "logo",
                              },
                            }),
                            n(
                              "h2",
                              { staticClass: "main_heading text-center" },
                              [t._v(" Bangla-English-ICT Course ")],
                            ),
                            n("h4", { staticClass: "mt-n3" }, [
                              t._v("Batch - 2022"),
                            ]),
                            n(
                              "div",
                              { staticClass: "ma-auto text-center" },
                              [
                                n(
                                  "v-btn",
                                  {
                                    staticClass: "blue darken-2 ma-2",
                                    attrs: {
                                      dark: "",
                                      href: "https://www.facebook.com/groups/hsc22general",
                                      target: "_blank",
                                    },
                                  },
                                  [
                                    n("v-icon", { staticClass: "mr-1" }, [
                                      t._v("mdi-facebook"),
                                    ]),
                                    t._v(" Facebook Group"),
                                  ],
                                  1,
                                ),
                                n(
                                  "v-btn",
                                  {
                                    staticClass: "blue darken-2 ma-1",
                                    attrs: { dark: "" },
                                    on: {
                                      click: function (e) {
                                        t.dialog = !t.dialog;
                                      },
                                    },
                                  },
                                  [
                                    n("v-icon", { staticClass: "mr-1" }, [
                                      t._v("mdi-head-question"),
                                    ]),
                                    t._v(" Q&A"),
                                  ],
                                  1,
                                ),
                              ],
                              1,
                            ),
                          ]),
                        ]),
                        n(
                          "v-card-text",
                          [
                            n("div", { staticClass: "subject__filters my-3" }, [
                              n(
                                "button",
                                {
                                  class:
                                    "subject__button " +
                                    ("" == t.se && "activebtn"),
                                  on: {
                                    click: function (e) {
                                      return t.selectSubject("");
                                    },
                                  },
                                },
                                [t._v(" All ")],
                              ),
                              n(
                                "button",
                                {
                                  class:
                                    "subject__button " +
                                    ("bangla" == t.se && "activebtn"),
                                  on: {
                                    click: function (e) {
                                      return t.selectSubject("bangla");
                                    },
                                  },
                                },
                                [t._v(" Bangla ")],
                              ),
                              n(
                                "button",
                                {
                                  class:
                                    "subject__button " +
                                    ("english" == t.se && "activebtn"),
                                  on: {
                                    click: function (e) {
                                      return t.selectSubject("english");
                                    },
                                  },
                                },
                                [t._v(" English ")],
                              ),
                              n(
                                "button",
                                {
                                  class:
                                    "subject__button " +
                                    ("ict" == t.se && "activebtn"),
                                  on: {
                                    click: function (e) {
                                      return t.selectSubject("ict");
                                    },
                                  },
                                },
                                [t._v(" ICT ")],
                              ),
                            ]),
                            n(
                              "div",
                              { staticClass: "subject__filters" },
                              [
                                n(
                                  "v-sheet",
                                  [
                                    n("v-text-field", {
                                      attrs: {
                                        label: "Search...",
                                        "append-icon": "mdi-magnify",
                                      },
                                      model: {
                                        value: t.search,
                                        callback: function (e) {
                                          t.search = e;
                                        },
                                        expression: "search",
                                      },
                                    }),
                                  ],
                                  1,
                                ),
                              ],
                              1,
                            ),
                            n("v-data-table", {
                              attrs: {
                                "items-per-page": 20,
                                "items-per-page-options": [20, 50, 100, -1],
                                search: t.search,
                                items: t.selected,
                                headers: t.headers,
                                loading: t.selected.length < 1,
                              },
                              scopedSlots: t._u([
                                {
                                  key: "item.live_class",
                                  fn: function (e) {
                                    var a = e.item;
                                    return [
                                      a.live_class
                                        ? n(
                                            "v-btn",
                                            {
                                              staticClass: "pink",
                                              attrs: {
                                                href: a.live_class,
                                                small: "",
                                                target: "_blank",
                                                fab: "",
                                                dark: "",
                                              },
                                            },
                                            [n("v-icon", [t._v("mdi-play")])],
                                            1,
                                          )
                                        : t._e(),
                                    ];
                                  },
                                },
                                {
                                  key: "item.lecture_sheet",
                                  fn: function (e) {
                                    var a = e.item;
                                    return [
                                      a.lecture_sheet
                                        ? n(
                                            "v-btn",
                                            {
                                              staticClass: "blue darken-2",
                                              attrs: {
                                                dark: "",
                                                href: a.lecture_sheet,
                                                small: "",
                                                target: "_blank",
                                                fab: "",
                                              },
                                            },
                                            [
                                              n("v-icon", [
                                                t._v("mdi-book-edit"),
                                              ]),
                                            ],
                                            1,
                                          )
                                        : t._e(),
                                    ];
                                  },
                                },
                              ]),
                            }),
                          ],
                          1,
                        ),
                      ],
                      1,
                    ),
                    n(
                      "v-dialog",
                      {
                        model: {
                          value: t.dialog,
                          callback: function (e) {
                            t.dialog = e;
                          },
                          expression: "dialog",
                        },
                      },
                      [
                        n(
                          "v-card",
                          [
                            n(
                              "v-card-title",
                              [
                                n("h2", [t._v("Q&A")]),
                                n("v-spacer"),
                                n(
                                  "v-btn",
                                  {
                                    staticClass: "blue darken-2",
                                    attrs: { dark: "" },
                                    on: {
                                      click: function (e) {
                                        t.dialog = !t.dialog;
                                      },
                                    },
                                  },
                                  [t._v("× close")],
                                ),
                              ],
                              1,
                            ),
                            n("QnA", {
                              on: {
                                closeDialog: function (e) {
                                  t.dialog = !t.dialog;
                                },
                              },
                            }),
                          ],
                          1,
                        ),
                      ],
                      1,
                    ),
                  ],
                  1,
                ),
              ],
              1,
            ),
          ],
          1,
        );
      },
      c = [],
      i =
        (a("d3b7"),
        a("4de4"),
        a("caad"),
        a("2532"),
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a(
            "v-container",
            [
              a(
                "v-card-text",
                [
                  a(
                    "v-form",
                    {
                      ref: "form",
                      attrs: { "lazy-validation": "" },
                      model: {
                        value: t.valid,
                        callback: function (e) {
                          t.valid = e;
                        },
                        expression: "valid",
                      },
                    },
                    [
                      a(
                        "v-row",
                        [
                          a(
                            "v-col",
                            { attrs: { cols: "12", sm: "6" } },
                            [
                              a("v-select", {
                                attrs: {
                                  label: "Subject",
                                  items: t.subjects,
                                  rules: t.requiredRules,
                                  outlined: "",
                                  dense: "",
                                },
                                on: { change: t.getChapters },
                                model: {
                                  value: t.question.subject,
                                  callback: function (e) {
                                    t.$set(t.question, "subject", e);
                                  },
                                  expression: "question.subject",
                                },
                              }),
                            ],
                            1,
                          ),
                          "অন্যান্য" != t.question.subject
                            ? a(
                                "v-col",
                                { attrs: { cols: "12", sm: "6" } },
                                [
                                  a("v-select", {
                                    attrs: {
                                      label: "Chapters",
                                      items: t.chapters.concat(["Others"]),
                                      rules: t.requiredRules,
                                      outlined: "",
                                      dense: "",
                                    },
                                    model: {
                                      value: t.question.chapter,
                                      callback: function (e) {
                                        t.$set(t.question, "chapter", e);
                                      },
                                      expression: "question.chapter",
                                    },
                                  }),
                                ],
                                1,
                              )
                            : t._e(),
                        ],
                        1,
                      ),
                      a("v-file-input", {
                        attrs: {
                          multiple: "",
                          outlined: "",
                          dense: "",
                          label: "Picture",
                          loading: t.loading,
                        },
                        on: { change: t.uploadImage },
                      }),
                      t.question.images.length > 0
                        ? a(
                            "v-row",
                            t._l(t.question.images, function (e, n) {
                              return a(
                                "v-col",
                                {
                                  key: n,
                                  staticClass: "imageContainer",
                                  attrs: { cols: "6", md: "3" },
                                },
                                [
                                  a(
                                    "v-avatar",
                                    {
                                      staticClass: "mb-5",
                                      attrs: { tile: "", size: "180" },
                                    },
                                    [
                                      a("img", { attrs: { src: e } }),
                                      a(
                                        "v-btn",
                                        {
                                          staticClass: "error delete__button",
                                          attrs: {
                                            fab: "",
                                            tile: "",
                                            dark: "",
                                            small: "",
                                            text: "",
                                          },
                                          on: {
                                            click: function (a) {
                                              return t.deleteImage(e);
                                            },
                                          },
                                        },
                                        [a("v-icon", [t._v("mdi-delete")])],
                                        1,
                                      ),
                                    ],
                                    1,
                                  ),
                                ],
                                1,
                              );
                            }),
                            1,
                          )
                        : t._e(),
                      a("v-textarea", {
                        attrs: {
                          rules: t.requiredRules,
                          outlined: "",
                          label: "Your question",
                        },
                        model: {
                          value: t.question.text,
                          callback: function (e) {
                            t.$set(t.question, "text", e);
                          },
                          expression: "question.text",
                        },
                      }),
                    ],
                    1,
                  ),
                  a(
                    "div",
                    { staticClass: "text-center" },
                    [
                      a(
                        "v-btn",
                        {
                          staticClass: "success",
                          attrs: { loading: t.loading, large: "", rounded: "" },
                          on: { click: t.submitQuestion },
                        },
                        [t._v("Submit Your Question")],
                      ),
                    ],
                    1,
                  ),
                ],
                1,
              ),
            ],
            1,
          );
        }),
      o = [],
      r =
        (a("159b"),
        a("a434"),
        a("d81d"),
        {
          data: function () {
            return {
              question: {
                subject: "",
                chapter: "",
                text: "",
                images: [],
                time: new Date().toLocaleString(),
              },
              allsubjects: [],
              subjects: [],
              chapters: [],
              subject: "",
              chapter: "",
              questionData: {},
              loading: !1,
              valid: !0,
              requiredRules: [
                function (t) {
                  return !!t || "This field is required";
                },
              ],
            };
          },
          methods: {
            uploadImage: function (t) {
              var e = this;
              t.forEach(function (t) {
                var a = new FileReader();
                (a.onloadend = function () {
                  e.question.images.push(a.result);
                }),
                  a.readAsDataURL(t);
              });
            },
            deleteImage: function (t) {
              this.question.images.splice(t, 1);
            },
            submitQuestion: function () {
              var t = this;
              if (this.$refs.form.validate()) {
                this.loading = !this.loading;
                var e = this.question,
                  a = e.subject,
                  n = e.chapter,
                  s = e.text,
                  c = e.images,
                  i = e.time;
                this.questionData = {
                  subject: a,
                  images: c,
                  question: [i, a, n, s],
                };
                var o =
                  "https://script.google.com/macros/s/AKfycbw1sat5souJbOMn6LERkbpfTHq3obyZfZQ7WUo6ROU03MBgb1QPbv1mbUwZixvXQtuB/exec";
                fetch(o, {
                  method: "POST",
                  mode: "no-cors",
                  cache: "no-cache",
                  redirect: "follow",
                  body: JSON.stringify(this.questionData),
                })
                  .then(function () {
                    (t.loading = !t.loading),
                      t
                        .$swal({
                          icon: "success",
                          title: "Successfully submitted",
                        })
                        .then(function () {
                          t.$emit("closeDialog"),
                            (t.question = {
                              subject: "",
                              chapter: "",
                              text: "",
                              images: [],
                              time: new Date().toLocaleString(),
                            }),
                            (t.subject = ""),
                            (t.chapter = ""),
                            (t.valid = !0);
                        });
                  })
                  .catch(function (t) {
                    return console.log(t);
                  });
              }
            },
            getSubjects: function () {
              var t = this;
              (this.question.chapter = ""),
                fetch(
                  "https://script.google.com/macros/s/AKfycby4C-A7gO0k-wFp11P8gGRdD4X5v0BnIXE0_G5DBduwO6FVqgdL3QaG/exec",
                )
                  .then(function (t) {
                    return t.json();
                  })
                  .then(function (e) {
                    (t.allsubjects = e.subjects),
                      (t.subjects = t._.union(
                        t.allsubjects.map(function (t) {
                          return t.subject;
                        }),
                      ));
                  });
            },
            getChapters: function () {
              var t = this;
              (this.chapters = []),
                this.allsubjects.forEach(function (e) {
                  e.subject === t.question.subject &&
                    t.chapters.push(e.chapter);
                });
            },
          },
          created: function () {
            this.getSubjects();
          },
        }),
      l = r,
      u = (a("de1b"), a("2877")),
      d = a("6544"),
      f = a.n(d),
      b = a("8212"),
      v = a("8336"),
      h = a("99d9"),
      p = a("62ad"),
      g = a("a523"),
      m = a("23a7"),
      _ = a("4bd4"),
      j = a("132d"),
      x = a("0fd9"),
      k = a("b974"),
      C = a("a844"),
      y = Object(u["a"])(l, i, o, !1, null, "5feb29c5", null),
      q = y.exports;
    f()(y, {
      VAvatar: b["a"],
      VBtn: v["a"],
      VCardText: h["a"],
      VCol: p["a"],
      VContainer: g["a"],
      VFileInput: m["a"],
      VForm: _["a"],
      VIcon: j["a"],
      VRow: x["a"],
      VSelect: k["a"],
      VTextarea: C["a"],
    });
    var w = {
        name: "App",
        components: { QnA: q },
        data: function () {
          return {
            routine: [],
            selected: [],
            dialog: !1,
            search: "",
            se: "",
            headers: [
              { text: "Subject", value: "subject" },
              { text: "Topic", value: "topic" },
              { text: "Class", value: "live_class", align: "center" },
              {
                text: "Lecture Sheet",
                value: "lecture_sheet",
                align: "center",
              },
            ],
          };
        },
        methods: {
          getData: function () {
            var t = this;
            fetch(
              "https://script.google.com/macros/s/AKfycbyWQsPtYSdakSXDUkKjDnYzBGPYF9uMNIR4UM1kmWharmoT0Doqcc0aYAEPU-JUcZ14/exec",
            )
              .then(function (t) {
                return t.text();
              })
              .then(function (e) {
                (t.routine = JSON.parse(e)), (t.selected = t.routine);
              });
          },
          selectSubject: function (t) {
            (this.se = t),
              (this.selected = this.routine.filter(function (e) {
                if (e.subject.toLowerCase().includes(t.toLowerCase())) return e;
              }));
          },
        },
        created: function () {
          this.getData();
        },
      },
      S = w,
      V = (a("5c0b"), a("7496")),
      O = a("b0af"),
      D = a("8fea"),
      T = a("169a"),
      A = a("f6c4"),
      P = a("8dd9"),
      Q = a("2fa4"),
      I = a("8654"),
      R = Object(u["a"])(S, s, c, !1, null, null, null),
      B = R.exports;
    f()(R, {
      VApp: V["a"],
      VBtn: v["a"],
      VCard: O["a"],
      VCardText: h["a"],
      VCardTitle: h["b"],
      VContainer: g["a"],
      VDataTable: D["a"],
      VDialog: T["a"],
      VIcon: j["a"],
      VMain: A["a"],
      VSheet: P["a"],
      VSpacer: Q["a"],
      VTextField: I["a"],
    });
    var M = a("2f62");
    n["a"].use(M["a"]);
    var E = new M["a"].Store({
        state: {},
        mutations: {},
        actions: {},
        modules: {},
      }),
      $ = a("f309");
    n["a"].use($["a"]);
    var F = new $["a"]({}),
      L = a("2ef0"),
      U = a.n(L),
      J = a("9955"),
      Y = a.n(J),
      G = a("14ba"),
      K = a.n(G);
    n["a"].use(K.a),
      n["a"].use(Y.a, { lodash: U.a }),
      (n["a"].config.productionTip = !1),
      new n["a"]({
        store: E,
        vuetify: F,
        render: function (t) {
          return t(B);
        },
      }).$mount("#app");
  },
  "5c0b": function (t, e, a) {
    "use strict";
    a("9c0c");
  },
  "9c0c": function (t, e, a) {},
  db0f: function (t, e, a) {
    t.exports = a.p + "img/10MS.fbdf40fa.svg";
  },
  de1b: function (t, e, a) {
    "use strict";
    a("286e");
  },
});
