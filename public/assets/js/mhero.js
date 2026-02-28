(() => {
  var eb = Object.create;
  var sn = Object.defineProperty;
  var tb = Object.getOwnPropertyDescriptor;
  var rb = Object.getOwnPropertyNames;
  var nb = Object.getPrototypeOf,
    ib = Object.prototype.hasOwnProperty;
  var ge = (e, t) => () => (e && (t = e((e = 0))), t);
  var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    qe = (e, t) => {
      for (var r in t) sn(e, r, { get: t[r], enumerable: !0 });
    },
    Ps = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of rb(t))
          !ib.call(e, i) &&
            i !== r &&
            sn(e, i, {
              get: () => t[i],
              enumerable: !(n = tb(t, i)) || n.enumerable,
            });
      return e;
    };
  var se = (e, t, r) => (
      (r = e != null ? eb(nb(e)) : {}),
      Ps(
        t || !e || !e.__esModule
          ? sn(r, "default", { value: e, enumerable: !0 })
          : r,
        e
      )
    ),
    tt = (e) => Ps(sn({}, "__esModule", { value: !0 }), e);
  var qs = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (a) {
          let u = window.getComputedStyle(a, null),
            f = u.getPropertyValue("position"),
            h = u.getPropertyValue("overflow"),
            g = u.getPropertyValue("display");
          (!f || f === "static") && (a.style.position = "relative"),
            h !== "hidden" && (a.style.overflow = "hidden"),
            (!g || g === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            f = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let h in f)
            u.getPropertyValue(h) !== f[h] && (a.style[h] = f[h]);
        },
        o = function (a) {
          let u = a.parentNode;
          n(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let f = a[u].nodeName.toLowerCase();
            if (f === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              f === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  // var Fs = c(() => {
  //   "use strict";
  //   (function () {
  //     if (typeof window > "u") return;
  //     function e(n) {
  //       Webflow.env("design") ||
  //         ($("video").each(function () {
  //           n && $(this).prop("autoplay") ? this.play() : this.pause();
  //         }),
  //         $(".w-background-video--control").each(function () {
  //           n ? r($(this)) : t($(this));
  //         }));
  //     }
  //     function t(n) {
  //       n.find("> span").each(function (i) {
  //         $(this).prop("hidden", () => i === 0);
  //       });
  //     }
  //     function r(n) {
  //       n.find("> span").each(function (i) {
  //         $(this).prop("hidden", () => i === 1);
  //       });
  //     }
  //     $(document).ready(() => {
  //       let n = window.matchMedia("(prefers-reduced-motion: reduce)");
  //       n.addEventListener("change", (i) => {
  //         e(!i.matches);
  //       }),
  //         n.matches && e(!1),
  //         $("video:not([autoplay])").each(function () {
  //           $(this)
  //             .parent()
  //             .find(".w-background-video--control")
  //             .each(function () {
  //               t($(this));
  //             });
  //         }),
  //         $(document).on("click", ".w-background-video--control", function (i) {
  //           if (Webflow.env("design")) return;
  //           let o = $(i.currentTarget),
  //             s = $(`video#${o.attr("aria-controls")}`).get(0);
  //           if (s)
  //             if (s.paused) {
  //               let a = s.play();
  //               r(o),
  //                 a &&
  //                   typeof a.catch == "function" &&
  //                   a.catch(() => {
  //                     t(o);
  //                   });
  //             } else s.pause(), t(o);
  //         });
  //     });
  //   })();
  // });
  var Pi = c(() => {
    "use strict";
    window.tram = (function (e) {
      function t(d, b) {
        var A = new E.Bare();
        return A.init(d, b);
      }
      function r(d) {
        return d.replace(/[A-Z]/g, function (b) {
          return "-" + b.toLowerCase();
        });
      }
      function n(d) {
        var b = parseInt(d.slice(1), 16),
          A = (b >> 16) & 255,
          L = (b >> 8) & 255,
          O = 255 & b;
        return [A, L, O];
      }
      function i(d, b, A) {
        return (
          "#" + ((1 << 24) | (d << 16) | (b << 8) | A).toString(16).slice(1)
        );
      }
      function o() {}
      function s(d, b) {
        f("Type warning: Expected: [" + d + "] Got: [" + typeof b + "] " + b);
      }
      function a(d, b, A) {
        f("Units do not match [" + d + "]: " + b + ", " + A);
      }
      function u(d, b, A) {
        if ((b !== void 0 && (A = b), d === void 0)) return A;
        var L = A;
        return (
          ft.test(d) || !Vt.test(d)
            ? (L = parseInt(d, 10))
            : Vt.test(d) && (L = 1e3 * parseFloat(d)),
          0 > L && (L = 0),
          L === L ? L : A
        );
      }
      function f(d) {
        ie.debug && window && window.console.warn(d);
      }
      function h(d) {
        for (var b = -1, A = d ? d.length : 0, L = []; ++b < A; ) {
          var O = d[b];
          O && L.push(O);
        }
        return L;
      }
      var g = (function (d, b, A) {
          function L(te) {
            return typeof te == "object";
          }
          function O(te) {
            return typeof te == "function";
          }
          function q() {}
          function Q(te, fe) {
            function j() {
              var Se = new ne();
              return O(Se.init) && Se.init.apply(Se, arguments), Se;
            }
            function ne() {}
            fe === A && ((fe = te), (te = Object)), (j.Bare = ne);
            var oe,
              Ee = (q[d] = te[d]),
              et = (ne[d] = j[d] = new q());
            return (
              (et.constructor = j),
              (j.mixin = function (Se) {
                return (ne[d] = j[d] = Q(j, Se)[d]), j;
              }),
              (j.open = function (Se) {
                if (
                  ((oe = {}),
                  O(Se) ? (oe = Se.call(j, et, Ee, j, te)) : L(Se) && (oe = Se),
                  L(oe))
                )
                  for (var _r in oe) b.call(oe, _r) && (et[_r] = oe[_r]);
                return O(et.init) || (et.init = te), j;
              }),
              j.open(fe)
            );
          }
          return Q;
        })("prototype", {}.hasOwnProperty),
        v = {
          ease: [
            "ease",
            function (d, b, A, L) {
              var O = (d /= L) * d,
                q = O * d;
              return (
                b +
                A * (-2.75 * q * O + 11 * O * O + -15.5 * q + 8 * O + 0.25 * d)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (d, b, A, L) {
              var O = (d /= L) * d,
                q = O * d;
              return b + A * (-1 * q * O + 3 * O * O + -3 * q + 2 * O);
            },
          ],
          "ease-out": [
            "ease-out",
            function (d, b, A, L) {
              var O = (d /= L) * d,
                q = O * d;
              return (
                b +
                A * (0.3 * q * O + -1.6 * O * O + 2.2 * q + -1.8 * O + 1.9 * d)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (d, b, A, L) {
              var O = (d /= L) * d,
                q = O * d;
              return b + A * (2 * q * O + -5 * O * O + 2 * q + 2 * O);
            },
          ],
          linear: [
            "linear",
            function (d, b, A, L) {
              return (A * d) / L + b;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (d, b, A, L) {
              return A * (d /= L) * d + b;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (d, b, A, L) {
              return -A * (d /= L) * (d - 2) + b;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (d, b, A, L) {
              return (d /= L / 2) < 1
                ? (A / 2) * d * d + b
                : (-A / 2) * (--d * (d - 2) - 1) + b;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (d, b, A, L) {
              return A * (d /= L) * d * d + b;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (d, b, A, L) {
              return A * ((d = d / L - 1) * d * d + 1) + b;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (d, b, A, L) {
              return (d /= L / 2) < 1
                ? (A / 2) * d * d * d + b
                : (A / 2) * ((d -= 2) * d * d + 2) + b;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (d, b, A, L) {
              return A * (d /= L) * d * d * d + b;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (d, b, A, L) {
              return -A * ((d = d / L - 1) * d * d * d - 1) + b;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (d, b, A, L) {
              return (d /= L / 2) < 1
                ? (A / 2) * d * d * d * d + b
                : (-A / 2) * ((d -= 2) * d * d * d - 2) + b;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (d, b, A, L) {
              return A * (d /= L) * d * d * d * d + b;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (d, b, A, L) {
              return A * ((d = d / L - 1) * d * d * d * d + 1) + b;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (d, b, A, L) {
              return (d /= L / 2) < 1
                ? (A / 2) * d * d * d * d * d + b
                : (A / 2) * ((d -= 2) * d * d * d * d + 2) + b;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (d, b, A, L) {
              return -A * Math.cos((d / L) * (Math.PI / 2)) + A + b;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (d, b, A, L) {
              return A * Math.sin((d / L) * (Math.PI / 2)) + b;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (d, b, A, L) {
              return (-A / 2) * (Math.cos((Math.PI * d) / L) - 1) + b;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (d, b, A, L) {
              return d === 0 ? b : A * Math.pow(2, 10 * (d / L - 1)) + b;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (d, b, A, L) {
              return d === L
                ? b + A
                : A * (-Math.pow(2, (-10 * d) / L) + 1) + b;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (d, b, A, L) {
              return d === 0
                ? b
                : d === L
                ? b + A
                : (d /= L / 2) < 1
                ? (A / 2) * Math.pow(2, 10 * (d - 1)) + b
                : (A / 2) * (-Math.pow(2, -10 * --d) + 2) + b;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (d, b, A, L) {
              return -A * (Math.sqrt(1 - (d /= L) * d) - 1) + b;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (d, b, A, L) {
              return A * Math.sqrt(1 - (d = d / L - 1) * d) + b;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (d, b, A, L) {
              return (d /= L / 2) < 1
                ? (-A / 2) * (Math.sqrt(1 - d * d) - 1) + b
                : (A / 2) * (Math.sqrt(1 - (d -= 2) * d) + 1) + b;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (d, b, A, L, O) {
              return (
                O === void 0 && (O = 1.70158),
                A * (d /= L) * d * ((O + 1) * d - O) + b
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (d, b, A, L, O) {
              return (
                O === void 0 && (O = 1.70158),
                A * ((d = d / L - 1) * d * ((O + 1) * d + O) + 1) + b
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (d, b, A, L, O) {
              return (
                O === void 0 && (O = 1.70158),
                (d /= L / 2) < 1
                  ? (A / 2) * d * d * (((O *= 1.525) + 1) * d - O) + b
                  : (A / 2) *
                      ((d -= 2) * d * (((O *= 1.525) + 1) * d + O) + 2) +
                    b
              );
            },
          ],
        },
        _ = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        w = document,
        T = window,
        S = "bkwld-tram",
        I = /[\-\.0-9]/g,
        N = /[A-Z]/,
        R = "number",
        M = /^(rgb|#)/,
        D = /(em|cm|mm|in|pt|pc|px)$/,
        F = /(em|cm|mm|in|pt|pc|px|%)$/,
        X = /(deg|rad|turn)$/,
        z = "unitless",
        K = /(all|none) 0s ease 0s/,
        Y = /^(width|height)$/,
        B = " ",
        x = w.createElement("a"),
        y = ["Webkit", "Moz", "O", "ms"],
        P = ["-webkit-", "-moz-", "-o-", "-ms-"],
        G = function (d) {
          if (d in x.style) return { dom: d, css: d };
          var b,
            A,
            L = "",
            O = d.split("-");
          for (b = 0; b < O.length; b++)
            L += O[b].charAt(0).toUpperCase() + O[b].slice(1);
          for (b = 0; b < y.length; b++)
            if (((A = y[b] + L), A in x.style))
              return { dom: A, css: P[b] + d };
        },
        W = (t.support = {
          bind: Function.prototype.bind,
          transform: G("transform"),
          transition: G("transition"),
          backface: G("backface-visibility"),
          timing: G("transition-timing-function"),
        });
      if (W.transition) {
        var Z = W.timing.dom;
        if (((x.style[Z] = v["ease-in-back"][0]), !x.style[Z]))
          for (var J in _) v[J][0] = _[J];
      }
      var U = (t.frame = (function () {
          var d =
            T.requestAnimationFrame ||
            T.webkitRequestAnimationFrame ||
            T.mozRequestAnimationFrame ||
            T.oRequestAnimationFrame ||
            T.msRequestAnimationFrame;
          return d && W.bind
            ? d.bind(T)
            : function (b) {
                T.setTimeout(b, 16);
              };
        })()),
        H = (t.now = (function () {
          var d = T.performance,
            b = d && (d.now || d.webkitNow || d.msNow || d.mozNow);
          return b && W.bind
            ? b.bind(d)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        p = g(function (d) {
          function b(ee, ae) {
            var he = h(("" + ee).split(B)),
              ce = he[0];
            ae = ae || {};
            var Ce = Je[ce];
            if (!Ce) return f("Unsupported property: " + ce);
            if (!ae.weak || !this.props[ce]) {
              var We = Ce[0],
                Pe = this.props[ce];
              return (
                Pe || (Pe = this.props[ce] = new We.Bare()),
                Pe.init(this.$el, he, Ce, ae),
                Pe
              );
            }
          }
          function A(ee, ae, he) {
            if (ee) {
              var ce = typeof ee;
              if (
                (ae ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                ce == "number" && ae)
              )
                return (
                  (this.timer = new re({
                    duration: ee,
                    context: this,
                    complete: q,
                  })),
                  void (this.active = !0)
                );
              if (ce == "string" && ae) {
                switch (ee) {
                  case "hide":
                    j.call(this);
                    break;
                  case "stop":
                    Q.call(this);
                    break;
                  case "redraw":
                    ne.call(this);
                    break;
                  default:
                    b.call(this, ee, he && he[1]);
                }
                return q.call(this);
              }
              if (ce == "function") return void ee.call(this, this);
              if (ce == "object") {
                var Ce = 0;
                et.call(
                  this,
                  ee,
                  function (me, J_) {
                    me.span > Ce && (Ce = me.span), me.stop(), me.animate(J_);
                  },
                  function (me) {
                    "wait" in me && (Ce = u(me.wait, 0));
                  }
                ),
                  Ee.call(this),
                  Ce > 0 &&
                    ((this.timer = new re({ duration: Ce, context: this })),
                    (this.active = !0),
                    ae && (this.timer.complete = q));
                var We = this,
                  Pe = !1,
                  an = {};
                U(function () {
                  et.call(We, ee, function (me) {
                    me.active && ((Pe = !0), (an[me.name] = me.nextStyle));
                  }),
                    Pe && We.$el.css(an);
                });
              }
            }
          }
          function L(ee) {
            (ee = u(ee, 0)),
              this.active
                ? this.queue.push({ options: ee })
                : ((this.timer = new re({
                    duration: ee,
                    context: this,
                    complete: q,
                  })),
                  (this.active = !0));
          }
          function O(ee) {
            return this.active
              ? (this.queue.push({ options: ee, args: arguments }),
                void (this.timer.complete = q))
              : f(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function q() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var ee = this.queue.shift();
              A.call(this, ee.options, !0, ee.args);
            }
          }
          function Q(ee) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var ae;
            typeof ee == "string"
              ? ((ae = {}), (ae[ee] = 1))
              : (ae = typeof ee == "object" && ee != null ? ee : this.props),
              et.call(this, ae, Se),
              Ee.call(this);
          }
          function te(ee) {
            Q.call(this, ee), et.call(this, ee, _r, Q_);
          }
          function fe(ee) {
            typeof ee != "string" && (ee = "block"),
              (this.el.style.display = ee);
          }
          function j() {
            Q.call(this), (this.el.style.display = "none");
          }
          function ne() {
            this.el.offsetHeight;
          }
          function oe() {
            Q.call(this), e.removeData(this.el, S), (this.$el = this.el = null);
          }
          function Ee() {
            var ee,
              ae,
              he = [];
            this.upstream && he.push(this.upstream);
            for (ee in this.props)
              (ae = this.props[ee]), ae.active && he.push(ae.string);
            (he = he.join(",")),
              this.style !== he &&
                ((this.style = he), (this.el.style[W.transition.dom] = he));
          }
          function et(ee, ae, he) {
            var ce,
              Ce,
              We,
              Pe,
              an = ae !== Se,
              me = {};
            for (ce in ee)
              (We = ee[ce]),
                ce in xe
                  ? (me.transform || (me.transform = {}),
                    (me.transform[ce] = We))
                  : (N.test(ce) && (ce = r(ce)),
                    ce in Je
                      ? (me[ce] = We)
                      : (Pe || (Pe = {}), (Pe[ce] = We)));
            for (ce in me) {
              if (((We = me[ce]), (Ce = this.props[ce]), !Ce)) {
                if (!an) continue;
                Ce = b.call(this, ce);
              }
              ae.call(this, Ce, We);
            }
            he && Pe && he.call(this, Pe);
          }
          function Se(ee) {
            ee.stop();
          }
          function _r(ee, ae) {
            ee.set(ae);
          }
          function Q_(ee) {
            this.$el.css(ee);
          }
          function Be(ee, ae) {
            d[ee] = function () {
              return this.children
                ? Z_.call(this, ae, arguments)
                : (this.el && ae.apply(this, arguments), this);
            };
          }
          function Z_(ee, ae) {
            var he,
              ce = this.children.length;
            for (he = 0; ce > he; he++) ee.apply(this.children[he], ae);
            return this;
          }
          (d.init = function (ee) {
            if (
              ((this.$el = e(ee)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ie.keepInherited && !ie.fallback)
            ) {
              var ae = _e(this.el, "transition");
              ae && !K.test(ae) && (this.upstream = ae);
            }
            W.backface &&
              ie.hideBackface &&
              de(this.el, W.backface.css, "hidden");
          }),
            Be("add", b),
            Be("start", A),
            Be("wait", L),
            Be("then", O),
            Be("next", q),
            Be("stop", Q),
            Be("set", te),
            Be("show", fe),
            Be("hide", j),
            Be("redraw", ne),
            Be("destroy", oe);
        }),
        E = g(p, function (d) {
          function b(A, L) {
            var O = e.data(A, S) || e.data(A, S, new p.Bare());
            return O.el || O.init(A), L ? O.start(L) : O;
          }
          d.init = function (A, L) {
            var O = e(A);
            if (!O.length) return this;
            if (O.length === 1) return b(O[0], L);
            var q = [];
            return (
              O.each(function (Q, te) {
                q.push(b(te, L));
              }),
              (this.children = q),
              this
            );
          };
        }),
        m = g(function (d) {
          function b() {
            var q = this.get();
            this.update("auto");
            var Q = this.get();
            return this.update(q), Q;
          }
          function A(q, Q, te) {
            return Q !== void 0 && (te = Q), q in v ? q : te;
          }
          function L(q) {
            var Q = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(q);
            return (Q ? i(Q[1], Q[2], Q[3]) : q).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var O = { duration: 500, ease: "ease", delay: 0 };
          (d.init = function (q, Q, te, fe) {
            (this.$el = q), (this.el = q[0]);
            var j = Q[0];
            te[2] && (j = te[2]),
              Ue[j] && (j = Ue[j]),
              (this.name = j),
              (this.type = te[1]),
              (this.duration = u(Q[1], this.duration, O.duration)),
              (this.ease = A(Q[2], this.ease, O.ease)),
              (this.delay = u(Q[3], this.delay, O.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = Y.test(this.name)),
              (this.unit = fe.unit || this.unit || ie.defaultUnit),
              (this.angle = fe.angle || this.angle || ie.defaultAngle),
              ie.fallback || fe.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    B +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? B + v[this.ease][0] : "") +
                    (this.delay ? B + this.delay + "ms" : "")));
          }),
            (d.set = function (q) {
              (q = this.convert(q, this.type)), this.update(q), this.redraw();
            }),
            (d.transition = function (q) {
              (this.active = !0),
                (q = this.convert(q, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  q == "auto" && (q = b.call(this))),
                (this.nextStyle = q);
            }),
            (d.fallback = function (q) {
              var Q =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (q = this.convert(q, this.type)),
                this.auto &&
                  (Q == "auto" && (Q = this.convert(this.get(), this.type)),
                  q == "auto" && (q = b.call(this))),
                (this.tween = new C({
                  from: Q,
                  to: q,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (d.get = function () {
              return _e(this.el, this.name);
            }),
            (d.update = function (q) {
              de(this.el, this.name, q);
            }),
            (d.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                de(this.el, this.name, this.get()));
              var q = this.tween;
              q && q.context && q.destroy();
            }),
            (d.convert = function (q, Q) {
              if (q == "auto" && this.auto) return q;
              var te,
                fe = typeof q == "number",
                j = typeof q == "string";
              switch (Q) {
                case R:
                  if (fe) return q;
                  if (j && q.replace(I, "") === "") return +q;
                  te = "number(unitless)";
                  break;
                case M:
                  if (j) {
                    if (q === "" && this.original) return this.original;
                    if (Q.test(q))
                      return q.charAt(0) == "#" && q.length == 7 ? q : L(q);
                  }
                  te = "hex or rgb string";
                  break;
                case D:
                  if (fe) return q + this.unit;
                  if (j && Q.test(q)) return q;
                  te = "number(px) or string(unit)";
                  break;
                case F:
                  if (fe) return q + this.unit;
                  if (j && Q.test(q)) return q;
                  te = "number(px) or string(unit or %)";
                  break;
                case X:
                  if (fe) return q + this.angle;
                  if (j && Q.test(q)) return q;
                  te = "number(deg) or string(angle)";
                  break;
                case z:
                  if (fe || (j && F.test(q))) return q;
                  te = "number(unitless) or string(unit or %)";
              }
              return s(te, q), q;
            }),
            (d.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        l = g(m, function (d, b) {
          d.init = function () {
            b.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), M));
          };
        }),
        k = g(m, function (d, b) {
          (d.init = function () {
            b.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (d.get = function () {
              return this.$el[this.name]();
            }),
            (d.update = function (A) {
              this.$el[this.name](A);
            });
        }),
        V = g(m, function (d, b) {
          function A(L, O) {
            var q, Q, te, fe, j;
            for (q in L)
              (fe = xe[q]),
                (te = fe[0]),
                (Q = fe[1] || q),
                (j = this.convert(L[q], te)),
                O.call(this, Q, j, te);
          }
          (d.init = function () {
            b.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                xe.perspective &&
                  ie.perspective &&
                  ((this.current.perspective = ie.perspective),
                  de(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (d.set = function (L) {
              A.call(this, L, function (O, q) {
                this.current[O] = q;
              }),
                de(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (d.transition = function (L) {
              var O = this.values(L);
              this.tween = new ue({
                current: this.current,
                values: O,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var q,
                Q = {};
              for (q in this.current) Q[q] = q in O ? O[q] : this.current[q];
              (this.active = !0), (this.nextStyle = this.style(Q));
            }),
            (d.fallback = function (L) {
              var O = this.values(L);
              this.tween = new ue({
                current: this.current,
                values: O,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (d.update = function () {
              de(this.el, this.name, this.style(this.current));
            }),
            (d.style = function (L) {
              var O,
                q = "";
              for (O in L) q += O + "(" + L[O] + ") ";
              return q;
            }),
            (d.values = function (L) {
              var O,
                q = {};
              return (
                A.call(this, L, function (Q, te, fe) {
                  (q[Q] = te),
                    this.current[Q] === void 0 &&
                      ((O = 0),
                      ~Q.indexOf("scale") && (O = 1),
                      (this.current[Q] = this.convert(O, fe)));
                }),
                q
              );
            });
        }),
        C = g(function (d) {
          function b(j) {
            te.push(j) === 1 && U(A);
          }
          function A() {
            var j,
              ne,
              oe,
              Ee = te.length;
            if (Ee)
              for (U(A), ne = H(), j = Ee; j--; )
                (oe = te[j]), oe && oe.render(ne);
          }
          function L(j) {
            var ne,
              oe = e.inArray(j, te);
            oe >= 0 &&
              ((ne = te.slice(oe + 1)),
              (te.length = oe),
              ne.length && (te = te.concat(ne)));
          }
          function O(j) {
            return Math.round(j * fe) / fe;
          }
          function q(j, ne, oe) {
            return i(
              j[0] + oe * (ne[0] - j[0]),
              j[1] + oe * (ne[1] - j[1]),
              j[2] + oe * (ne[2] - j[2])
            );
          }
          var Q = { ease: v.ease[1], from: 0, to: 1 };
          (d.init = function (j) {
            (this.duration = j.duration || 0), (this.delay = j.delay || 0);
            var ne = j.ease || Q.ease;
            v[ne] && (ne = v[ne][1]),
              typeof ne != "function" && (ne = Q.ease),
              (this.ease = ne),
              (this.update = j.update || o),
              (this.complete = j.complete || o),
              (this.context = j.context || this),
              (this.name = j.name);
            var oe = j.from,
              Ee = j.to;
            oe === void 0 && (oe = Q.from),
              Ee === void 0 && (Ee = Q.to),
              (this.unit = j.unit || ""),
              typeof oe == "number" && typeof Ee == "number"
                ? ((this.begin = oe), (this.change = Ee - oe))
                : this.format(Ee, oe),
              (this.value = this.begin + this.unit),
              (this.start = H()),
              j.autoplay !== !1 && this.play();
          }),
            (d.play = function () {
              this.active ||
                (this.start || (this.start = H()), (this.active = !0), b(this));
            }),
            (d.stop = function () {
              this.active && ((this.active = !1), L(this));
            }),
            (d.render = function (j) {
              var ne,
                oe = j - this.start;
              if (this.delay) {
                if (oe <= this.delay) return;
                oe -= this.delay;
              }
              if (oe < this.duration) {
                var Ee = this.ease(oe, 0, 1, this.duration);
                return (
                  (ne = this.startRGB
                    ? q(this.startRGB, this.endRGB, Ee)
                    : O(this.begin + Ee * this.change)),
                  (this.value = ne + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ne = this.endHex || this.begin + this.change),
                (this.value = ne + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (d.format = function (j, ne) {
              if (((ne += ""), (j += ""), j.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ne)),
                  (this.endRGB = n(j)),
                  (this.endHex = j),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var oe = ne.replace(I, ""),
                  Ee = j.replace(I, "");
                oe !== Ee && a("tween", ne, j), (this.unit = oe);
              }
              (ne = parseFloat(ne)),
                (j = parseFloat(j)),
                (this.begin = this.value = ne),
                (this.change = j - ne);
            }),
            (d.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var te = [],
            fe = 1e3;
        }),
        re = g(C, function (d) {
          (d.init = function (b) {
            (this.duration = b.duration || 0),
              (this.complete = b.complete || o),
              (this.context = b.context),
              this.play();
          }),
            (d.render = function (b) {
              var A = b - this.start;
              A < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        ue = g(C, function (d, b) {
          (d.init = function (A) {
            (this.context = A.context),
              (this.update = A.update),
              (this.tweens = []),
              (this.current = A.current);
            var L, O;
            for (L in A.values)
              (O = A.values[L]),
                this.current[L] !== O &&
                  this.tweens.push(
                    new C({
                      name: L,
                      from: this.current[L],
                      to: O,
                      duration: A.duration,
                      delay: A.delay,
                      ease: A.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (d.render = function (A) {
              var L,
                O,
                q = this.tweens.length,
                Q = !1;
              for (L = q; L--; )
                (O = this.tweens[L]),
                  O.context &&
                    (O.render(A), (this.current[O.name] = O.value), (Q = !0));
              return Q
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (d.destroy = function () {
              if ((b.destroy.call(this), this.tweens)) {
                var A,
                  L = this.tweens.length;
                for (A = L; A--; ) this.tweens[A].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        ie = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !W.transition,
          agentTests: [],
        });
      (t.fallback = function (d) {
        if (!W.transition) return (ie.fallback = !0);
        ie.agentTests.push("(" + d + ")");
        var b = new RegExp(ie.agentTests.join("|"), "i");
        ie.fallback = b.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (d) {
          return new C(d);
        }),
        (t.delay = function (d, b, A) {
          return new re({ complete: b, duration: d, context: A });
        }),
        (e.fn.tram = function (d) {
          return t.call(null, this, d);
        });
      var de = e.style,
        _e = e.css,
        Ue = { transform: W.transform && W.transform.css },
        Je = {
          color: [l, M],
          background: [l, M, "background-color"],
          "outline-color": [l, M],
          "border-color": [l, M],
          "border-top-color": [l, M],
          "border-right-color": [l, M],
          "border-bottom-color": [l, M],
          "border-left-color": [l, M],
          "border-width": [m, D],
          "border-top-width": [m, D],
          "border-right-width": [m, D],
          "border-bottom-width": [m, D],
          "border-left-width": [m, D],
          "border-spacing": [m, D],
          "letter-spacing": [m, D],
          margin: [m, D],
          "margin-top": [m, D],
          "margin-right": [m, D],
          "margin-bottom": [m, D],
          "margin-left": [m, D],
          padding: [m, D],
          "padding-top": [m, D],
          "padding-right": [m, D],
          "padding-bottom": [m, D],
          "padding-left": [m, D],
          "outline-width": [m, D],
          opacity: [m, R],
          top: [m, F],
          right: [m, F],
          bottom: [m, F],
          left: [m, F],
          "font-size": [m, F],
          "text-indent": [m, F],
          "word-spacing": [m, F],
          width: [m, F],
          "min-width": [m, F],
          "max-width": [m, F],
          height: [m, F],
          "min-height": [m, F],
          "max-height": [m, F],
          "line-height": [m, z],
          "scroll-top": [k, R, "scrollTop"],
          "scroll-left": [k, R, "scrollLeft"],
        },
        xe = {};
      W.transform &&
        ((Je.transform = [V]),
        (xe = {
          x: [F, "translateX"],
          y: [F, "translateY"],
          rotate: [X],
          rotateX: [X],
          rotateY: [X],
          scale: [R],
          scaleX: [R],
          scaleY: [R],
          skew: [X],
          skewX: [X],
          skewY: [X],
        })),
        W.transform &&
          W.backface &&
          ((xe.z = [F, "translateZ"]),
          (xe.rotateZ = [X]),
          (xe.scaleZ = [R]),
          (xe.perspective = [D]));
      var ft = /ms/,
        Vt = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Ds = c((QV, Ms) => {
    "use strict";
    var ob = window.$,
      ab = Pi() && ob.tram;
    Ms.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        s = r.slice,
        a = r.concat,
        u = n.toString,
        f = n.hasOwnProperty,
        h = r.forEach,
        g = r.map,
        v = r.reduce,
        _ = r.reduceRight,
        w = r.filter,
        T = r.every,
        S = r.some,
        I = r.indexOf,
        N = r.lastIndexOf,
        R = Array.isArray,
        M = Object.keys,
        D = i.bind,
        F =
          (e.each =
          e.forEach =
            function (y, P, G) {
              if (y == null) return y;
              if (h && y.forEach === h) y.forEach(P, G);
              else if (y.length === +y.length) {
                for (var W = 0, Z = y.length; W < Z; W++)
                  if (P.call(G, y[W], W, y) === t) return;
              } else
                for (var J = e.keys(y), W = 0, Z = J.length; W < Z; W++)
                  if (P.call(G, y[J[W]], J[W], y) === t) return;
              return y;
            });
      (e.map = e.collect =
        function (y, P, G) {
          var W = [];
          return y == null
            ? W
            : g && y.map === g
            ? y.map(P, G)
            : (F(y, function (Z, J, U) {
                W.push(P.call(G, Z, J, U));
              }),
              W);
        }),
        (e.find = e.detect =
          function (y, P, G) {
            var W;
            return (
              X(y, function (Z, J, U) {
                if (P.call(G, Z, J, U)) return (W = Z), !0;
              }),
              W
            );
          }),
        (e.filter = e.select =
          function (y, P, G) {
            var W = [];
            return y == null
              ? W
              : w && y.filter === w
              ? y.filter(P, G)
              : (F(y, function (Z, J, U) {
                  P.call(G, Z, J, U) && W.push(Z);
                }),
                W);
          });
      var X =
        (e.some =
        e.any =
          function (y, P, G) {
            P || (P = e.identity);
            var W = !1;
            return y == null
              ? W
              : S && y.some === S
              ? y.some(P, G)
              : (F(y, function (Z, J, U) {
                  if (W || (W = P.call(G, Z, J, U))) return t;
                }),
                !!W);
          });
      (e.contains = e.include =
        function (y, P) {
          return y == null
            ? !1
            : I && y.indexOf === I
            ? y.indexOf(P) != -1
            : X(y, function (G) {
                return G === P;
              });
        }),
        (e.delay = function (y, P) {
          var G = s.call(arguments, 2);
          return setTimeout(function () {
            return y.apply(null, G);
          }, P);
        }),
        (e.defer = function (y) {
          return e.delay.apply(e, [y, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (y) {
          var P, G, W;
          return function () {
            P ||
              ((P = !0),
              (G = arguments),
              (W = this),
              ab.frame(function () {
                (P = !1), y.apply(W, G);
              }));
          };
        }),
        (e.debounce = function (y, P, G) {
          var W,
            Z,
            J,
            U,
            H,
            p = function () {
              var E = e.now() - U;
              E < P
                ? (W = setTimeout(p, P - E))
                : ((W = null), G || ((H = y.apply(J, Z)), (J = Z = null)));
            };
          return function () {
            (J = this), (Z = arguments), (U = e.now());
            var E = G && !W;
            return (
              W || (W = setTimeout(p, P)),
              E && ((H = y.apply(J, Z)), (J = Z = null)),
              H
            );
          };
        }),
        (e.defaults = function (y) {
          if (!e.isObject(y)) return y;
          for (var P = 1, G = arguments.length; P < G; P++) {
            var W = arguments[P];
            for (var Z in W) y[Z] === void 0 && (y[Z] = W[Z]);
          }
          return y;
        }),
        (e.keys = function (y) {
          if (!e.isObject(y)) return [];
          if (M) return M(y);
          var P = [];
          for (var G in y) e.has(y, G) && P.push(G);
          return P;
        }),
        (e.has = function (y, P) {
          return f.call(y, P);
        }),
        (e.isObject = function (y) {
          return y === Object(y);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var z = /(.)^/,
        K = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        Y = /\\|'|\r|\n|\u2028|\u2029/g,
        B = function (y) {
          return "\\" + K[y];
        },
        x = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (y, P, G) {
          !P && G && (P = G), (P = e.defaults({}, P, e.templateSettings));
          var W = RegExp(
              [
                (P.escape || z).source,
                (P.interpolate || z).source,
                (P.evaluate || z).source,
              ].join("|") + "|$",
              "g"
            ),
            Z = 0,
            J = "__p+='";
          y.replace(W, function (E, m, l, k, V) {
            return (
              (J += y.slice(Z, V).replace(Y, B)),
              (Z = V + E.length),
              m
                ? (J +=
                    `'+
((__t=(` +
                    m +
                    `))==null?'':_.escape(__t))+
'`)
                : l
                ? (J +=
                    `'+
((__t=(` +
                    l +
                    `))==null?'':__t)+
'`)
                : k &&
                  (J +=
                    `';
` +
                    k +
                    `
__p+='`),
              E
            );
          }),
            (J += `';
`);
          var U = P.variable;
          if (U) {
            if (!x.test(U))
              throw new Error("variable is not a bare identifier: " + U);
          } else
            (J =
              `with(obj||{}){
` +
              J +
              `}
`),
              (U = "obj");
          J =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            J +
            `return __p;
`;
          var H;
          try {
            H = new Function(P.variable || "obj", "_", J);
          } catch (E) {
            throw ((E.source = J), E);
          }
          var p = function (E) {
            return H.call(this, E, e);
          };
          return (
            (p.source =
              "function(" +
              U +
              `){
` +
              J +
              "}"),
            p
          );
        }),
        e
      );
    })();
  });
  var Fe = c((ZV, Xs) => {
    "use strict";
    var le = {},
      Bt = {},
      Wt = [],
      Fi = window.Webflow || [],
      mt = window.jQuery,
      Xe = mt(window),
      sb = mt(document),
      rt = mt.isFunction,
      He = (le._ = Ds()),
      Gs = (le.tram = Pi() && mt.tram),
      cn = !1,
      Mi = !1;
    Gs.config.hideBackface = !1;
    Gs.config.keepInherited = !0;
    le.define = function (e, t, r) {
      Bt[e] && Vs(Bt[e]);
      var n = (Bt[e] = t(mt, He, r) || {});
      return Us(n), n;
    };
    le.require = function (e) {
      return Bt[e];
    };
    function Us(e) {
      le.env() &&
        (rt(e.design) && Xe.on("__wf_design", e.design),
        rt(e.preview) && Xe.on("__wf_preview", e.preview)),
        rt(e.destroy) && Xe.on("__wf_destroy", e.destroy),
        e.ready && rt(e.ready) && ub(e);
    }
    function ub(e) {
      if (cn) {
        e.ready();
        return;
      }
      He.contains(Wt, e.ready) || Wt.push(e.ready);
    }
    function Vs(e) {
      rt(e.design) && Xe.off("__wf_design", e.design),
        rt(e.preview) && Xe.off("__wf_preview", e.preview),
        rt(e.destroy) && Xe.off("__wf_destroy", e.destroy),
        e.ready && rt(e.ready) && cb(e);
    }
    function cb(e) {
      Wt = He.filter(Wt, function (t) {
        return t !== e.ready;
      });
    }
    le.push = function (e) {
      if (cn) {
        rt(e) && e();
        return;
      }
      Fi.push(e);
    };
    le.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var un = navigator.userAgent.toLowerCase(),
      Bs = (le.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      lb = (le.env.chrome =
        /chrome/.test(un) &&
        /Google/.test(navigator.vendor) &&
        parseInt(un.match(/chrome\/(\d+)\./)[1], 10)),
      fb = (le.env.ios = /(ipod|iphone|ipad)/.test(un));
    le.env.safari = /safari/.test(un) && !lb && !fb;
    var qi;
    Bs &&
      sb.on("touchstart mousedown", function (e) {
        qi = e.target;
      });
    le.validClick = Bs
      ? function (e) {
          return e === qi || mt.contains(e, qi);
        }
      : function () {
          return !0;
        };
    var Ws = "resize.mhero orientationchange.mhero load.mhero",
      db = "scroll.mhero " + Ws;
    le.resize = Di(Xe, Ws);
    le.scroll = Di(Xe, db);
    le.redraw = Di();
    function Di(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = He.throttle(function (i) {
          He.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (He.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = He.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    le.location = function (e) {
      window.location = e;
    };
    le.env() && (le.location = function () {});
    le.ready = function () {
      (cn = !0), Mi ? pb() : He.each(Wt, ks), He.each(Fi, ks), le.resize.up();
    };
    function ks(e) {
      rt(e) && e();
    }
    function pb() {
      (Mi = !1), He.each(Bt, Us);
    }
    var Ct;
    le.load = function (e) {
      Ct.then(e);
    };
    function Hs() {
      Ct && (Ct.reject(), Xe.off("load", Ct.resolve)),
        (Ct = new mt.Deferred()),
        Xe.on("load", Ct.resolve);
    }
    le.destroy = function (e) {
      (e = e || {}),
        (Mi = !0),
        Xe.triggerHandler("__wf_destroy"),
        e.domready != null && (cn = e.domready),
        He.each(Bt, Vs),
        le.resize.off(),
        le.scroll.off(),
        le.redraw.off(),
        (Wt = []),
        (Fi = []),
        Ct.state() === "pending" && Hs();
    };
    mt(le.ready);
    Hs();
    Xs.exports = window.Webflow = le;
  });
  var Ks = c((JV, zs) => {
    "use strict";
    var js = Fe();
    js.define(
      "brand",
      (zs.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-mhero-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          f;
        t.ready = function () {
          var _ = n.attr("data-wf-status"),
            w = n.attr("data-wf-domain") || "";
          /\.mhero\.io$/i.test(w) && s.hostname !== w && (_ = !0),
            _ &&
              !a &&
              ((f = f || g()),
              v(),
              setTimeout(v, 500),
              e(r).off(u, h).on(u, h));
        };
        function h() {
          var _ =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(f).attr("style", _ ? "display: none !important;" : "");
        }
        function g() {
          var _ = e('<a class="w-mhero-badge"></a>').attr(
              "href",
              "https://mhero.com?utm_campaign=brandjs"
            ),
            w = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/mhero-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            T = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/mhero-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return _.append(w, T), _[0];
        }
        function v() {
          var _ = i.children(o),
            w = _.length && _.get(0) === f,
            T = js.env("editor");
          if (w) {
            T && _.remove();
            return;
          }
          _.length && _.remove(), T || i.append(f);
        }
        return t;
      })
    );
  });
  var $s = c((eB, Ys) => {
    "use strict";
    var ki = Fe();
    ki.define(
      "edit",
      (Ys.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (ki.env("test") || ki.env("frame")) && !r.fixture && !gb())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          f = r.load || v,
          h = !1;
        try {
          h =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        h
          ? f()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            f()
          : i.on(a, g).triggerHandler(a);
        function g() {
          u || (/\?edit/.test(s.hash) && f());
        }
        function v() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, g),
            N(function (M) {
              e.ajax({
                url: I("https://editor-api.mhero.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: _(M),
              });
            });
        }
        function _(M) {
          return function (D) {
            if (!D) {
              console.error("Could not load editor data");
              return;
            }
            (D.thirdPartyCookiesSupported = M),
              w(S(D.scriptPath), function () {
                window.WebflowEditor(D);
              });
          };
        }
        function w(M, D) {
          e.ajax({ type: "GET", url: M, dataType: "script", cache: !0 }).then(
            D,
            T
          );
        }
        function T(M, D, F) {
          throw (console.error("Could not load editor script: " + D), F);
        }
        function S(M) {
          return M.indexOf("//") >= 0
            ? M
            : I("https://editor-api.mhero.com" + M);
        }
        function I(M) {
          return M.replace(/([^:])\/\//g, "$1/");
        }
        function N(M) {
          var D = window.document.createElement("iframe");
          (D.src = "https://mhero.com/site/third-party-cookie-check.html"),
            (D.style.display = "none"),
            (D.sandbox = "allow-scripts allow-same-origin");
          var F = function (X) {
            X.data === "WF_third_party_cookies_unsupported"
              ? (R(D, F), M(!1))
              : X.data === "WF_third_party_cookies_supported" &&
                (R(D, F), M(!0));
          };
          (D.onerror = function () {
            R(D, F), M(!1);
          }),
            window.addEventListener("message", F, !1),
            window.document.body.appendChild(D);
        }
        function R(M, D) {
          window.removeEventListener("message", D, !1), M.remove();
        }
        return n;
      })
    );
    function gb() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Zs = c((tB, Qs) => {
    "use strict";
    var vb = Fe();
    vb.define(
      "focus-visible",
      (Qs.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(R) {
            return !!(
              R &&
              R !== document &&
              R.nodeName !== "HTML" &&
              R.nodeName !== "BODY" &&
              "classList" in R &&
              "contains" in R.classList
            );
          }
          function u(R) {
            var M = R.type,
              D = R.tagName;
            return !!(
              (D === "INPUT" && s[M] && !R.readOnly) ||
              (D === "TEXTAREA" && !R.readOnly) ||
              R.isContentEditable
            );
          }
          function f(R) {
            R.getAttribute("data-wf-focus-visible") ||
              R.setAttribute("data-wf-focus-visible", "true");
          }
          function h(R) {
            R.getAttribute("data-wf-focus-visible") &&
              R.removeAttribute("data-wf-focus-visible");
          }
          function g(R) {
            R.metaKey ||
              R.altKey ||
              R.ctrlKey ||
              (a(r.activeElement) && f(r.activeElement), (n = !0));
          }
          function v() {
            n = !1;
          }
          function _(R) {
            a(R.target) && (n || u(R.target)) && f(R.target);
          }
          function w(R) {
            a(R.target) &&
              R.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              h(R.target));
          }
          function T() {
            document.visibilityState === "hidden" && (i && (n = !0), S());
          }
          function S() {
            document.addEventListener("mousemove", N),
              document.addEventListener("mousedown", N),
              document.addEventListener("mouseup", N),
              document.addEventListener("pointermove", N),
              document.addEventListener("pointerdown", N),
              document.addEventListener("pointerup", N),
              document.addEventListener("touchmove", N),
              document.addEventListener("touchstart", N),
              document.addEventListener("touchend", N);
          }
          function I() {
            document.removeEventListener("mousemove", N),
              document.removeEventListener("mousedown", N),
              document.removeEventListener("mouseup", N),
              document.removeEventListener("pointermove", N),
              document.removeEventListener("pointerdown", N),
              document.removeEventListener("pointerup", N),
              document.removeEventListener("touchmove", N),
              document.removeEventListener("touchstart", N),
              document.removeEventListener("touchend", N);
          }
          function N(R) {
            (R.target.nodeName && R.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), I());
          }
          document.addEventListener("keydown", g, !0),
            document.addEventListener("mousedown", v, !0),
            document.addEventListener("pointerdown", v, !0),
            document.addEventListener("touchstart", v, !0),
            document.addEventListener("visibilitychange", T, !0),
            S(),
            r.addEventListener("focus", _, !0),
            r.addEventListener("blur", w, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var tu = c((rB, eu) => {
    "use strict";
    var Js = Fe();
    Js.define(
      "focus",
      (eu.exports = function () {
        var e = [],
          t = !1;
        function r(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function n(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          n(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Js.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      })
    );
  });
  var iu = c((nB, nu) => {
    "use strict";
    var Gi = window.jQuery,
      nt = {},
      ln = [],
      ru = ".w-ix",
      fn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Gi(t).triggerHandler(nt.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Gi(t).triggerHandler(nt.types.OUTRO));
        },
      };
    nt.triggers = {};
    nt.types = { INTRO: "w-ix-intro" + ru, OUTRO: "w-ix-outro" + ru };
    nt.init = function () {
      for (var e = ln.length, t = 0; t < e; t++) {
        var r = ln[t];
        r[0](0, r[1]);
      }
      (ln = []), Gi.extend(nt.triggers, fn);
    };
    nt.async = function () {
      for (var e in fn) {
        var t = fn[e];
        fn.hasOwnProperty(e) &&
          (nt.triggers[e] = function (r, n) {
            ln.push([t, n]);
          });
      }
    };
    nt.async();
    nu.exports = nt;
  });
  var br = c((iB, su) => {
    "use strict";
    var Ui = iu();
    function ou(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var hb = window.jQuery,
      dn = {},
      au = ".w-ix",
      yb = {
        reset: function (e, t) {
          Ui.triggers.reset(e, t);
        },
        intro: function (e, t) {
          Ui.triggers.intro(e, t), ou(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          Ui.triggers.outro(e, t), ou(t, "COMPONENT_INACTIVE");
        },
      };
    dn.triggers = {};
    dn.types = { INTRO: "w-ix-intro" + au, OUTRO: "w-ix-outro" + au };
    hb.extend(dn.triggers, yb);
    su.exports = dn;
  });
  var uu = c((oB, dt) => {
    function Vi(e) {
      return (
        (dt.exports = Vi =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (dt.exports.__esModule = !0),
        (dt.exports.default = dt.exports),
        Vi(e)
      );
    }
    (dt.exports = Vi),
      (dt.exports.__esModule = !0),
      (dt.exports.default = dt.exports);
  });
  var pn = c((aB, Tr) => {
    var Eb = uu().default;
    function cu(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (cu = function (i) {
        return i ? r : t;
      })(e);
    }
    function mb(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (Eb(e) != "object" && typeof e != "function"))
        return { default: e };
      var r = cu(t);
      if (r && r.has(e)) return r.get(e);
      var n = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && {}.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(n, o, s)
            : (n[o] = e[o]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (Tr.exports = mb),
      (Tr.exports.__esModule = !0),
      (Tr.exports.default = Tr.exports);
  });
  var lu = c((sB, Ir) => {
    function _b(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Ir.exports = _b),
      (Ir.exports.__esModule = !0),
      (Ir.exports.default = Ir.exports);
  });
  var ve = c((uB, fu) => {
    var gn = function (e) {
      return e && e.Math == Math && e;
    };
    fu.exports =
      gn(typeof globalThis == "object" && globalThis) ||
      gn(typeof window == "object" && window) ||
      gn(typeof self == "object" && self) ||
      gn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Ht = c((cB, du) => {
    du.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Rt = c((lB, pu) => {
    var bb = Ht();
    pu.exports = !bb(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var vn = c((fB, gu) => {
    var wr = Function.prototype.call;
    gu.exports = wr.bind
      ? wr.bind(wr)
      : function () {
          return wr.apply(wr, arguments);
        };
  });
  var Eu = c((yu) => {
    "use strict";
    var vu = {}.propertyIsEnumerable,
      hu = Object.getOwnPropertyDescriptor,
      Tb = hu && !vu.call({ 1: 2 }, 1);
    yu.f = Tb
      ? function (t) {
          var r = hu(this, t);
          return !!r && r.enumerable;
        }
      : vu;
  });
  var Bi = c((pB, mu) => {
    mu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var je = c((gB, bu) => {
    var _u = Function.prototype,
      Wi = _u.bind,
      Hi = _u.call,
      Ib = Wi && Wi.bind(Hi);
    bu.exports = Wi
      ? function (e) {
          return e && Ib(Hi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Hi.apply(e, arguments);
            }
          );
        };
  });
  var wu = c((vB, Iu) => {
    var Tu = je(),
      wb = Tu({}.toString),
      Ob = Tu("".slice);
    Iu.exports = function (e) {
      return Ob(wb(e), 8, -1);
    };
  });
  var Au = c((hB, Ou) => {
    var Ab = ve(),
      xb = je(),
      Sb = Ht(),
      Cb = wu(),
      Xi = Ab.Object,
      Rb = xb("".split);
    Ou.exports = Sb(function () {
      return !Xi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return Cb(e) == "String" ? Rb(e, "") : Xi(e);
        }
      : Xi;
  });
  var ji = c((yB, xu) => {
    var Lb = ve(),
      Nb = Lb.TypeError;
    xu.exports = function (e) {
      if (e == null) throw Nb("Can't call method on " + e);
      return e;
    };
  });
  var Or = c((EB, Su) => {
    var Pb = Au(),
      qb = ji();
    Su.exports = function (e) {
      return Pb(qb(e));
    };
  });
  var it = c((mB, Cu) => {
    Cu.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Xt = c((_B, Ru) => {
    var Fb = it();
    Ru.exports = function (e) {
      return typeof e == "object" ? e !== null : Fb(e);
    };
  });
  var Ar = c((bB, Lu) => {
    var zi = ve(),
      Mb = it(),
      Db = function (e) {
        return Mb(e) ? e : void 0;
      };
    Lu.exports = function (e, t) {
      return arguments.length < 2 ? Db(zi[e]) : zi[e] && zi[e][t];
    };
  });
  var Pu = c((TB, Nu) => {
    var kb = je();
    Nu.exports = kb({}.isPrototypeOf);
  });
  var Fu = c((IB, qu) => {
    var Gb = Ar();
    qu.exports = Gb("navigator", "userAgent") || "";
  });
  var Bu = c((wB, Vu) => {
    var Uu = ve(),
      Ki = Fu(),
      Mu = Uu.process,
      Du = Uu.Deno,
      ku = (Mu && Mu.versions) || (Du && Du.version),
      Gu = ku && ku.v8,
      ze,
      hn;
    Gu &&
      ((ze = Gu.split(".")),
      (hn = ze[0] > 0 && ze[0] < 4 ? 1 : +(ze[0] + ze[1])));
    !hn &&
      Ki &&
      ((ze = Ki.match(/Edge\/(\d+)/)),
      (!ze || ze[1] >= 74) &&
        ((ze = Ki.match(/Chrome\/(\d+)/)), ze && (hn = +ze[1])));
    Vu.exports = hn;
  });
  var Yi = c((OB, Hu) => {
    var Wu = Bu(),
      Ub = Ht();
    Hu.exports =
      !!Object.getOwnPropertySymbols &&
      !Ub(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Wu && Wu < 41)
        );
      });
  });
  var $i = c((AB, Xu) => {
    var Vb = Yi();
    Xu.exports = Vb && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var Qi = c((xB, ju) => {
    var Bb = ve(),
      Wb = Ar(),
      Hb = it(),
      Xb = Pu(),
      jb = $i(),
      zb = Bb.Object;
    ju.exports = jb
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = Wb("Symbol");
          return Hb(t) && Xb(t.prototype, zb(e));
        };
  });
  var Ku = c((SB, zu) => {
    var Kb = ve(),
      Yb = Kb.String;
    zu.exports = function (e) {
      try {
        return Yb(e);
      } catch {
        return "Object";
      }
    };
  });
  var $u = c((CB, Yu) => {
    var $b = ve(),
      Qb = it(),
      Zb = Ku(),
      Jb = $b.TypeError;
    Yu.exports = function (e) {
      if (Qb(e)) return e;
      throw Jb(Zb(e) + " is not a function");
    };
  });
  var Zu = c((RB, Qu) => {
    var eT = $u();
    Qu.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : eT(r);
    };
  });
  var ec = c((LB, Ju) => {
    var tT = ve(),
      Zi = vn(),
      Ji = it(),
      eo = Xt(),
      rT = tT.TypeError;
    Ju.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && Ji((r = e.toString)) && !eo((n = Zi(r, e)))) ||
        (Ji((r = e.valueOf)) && !eo((n = Zi(r, e)))) ||
        (t !== "string" && Ji((r = e.toString)) && !eo((n = Zi(r, e))))
      )
        return n;
      throw rT("Can't convert object to primitive value");
    };
  });
  var rc = c((NB, tc) => {
    tc.exports = !1;
  });
  var yn = c((PB, ic) => {
    var nc = ve(),
      nT = Object.defineProperty;
    ic.exports = function (e, t) {
      try {
        nT(nc, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        nc[e] = t;
      }
      return t;
    };
  });
  var En = c((qB, ac) => {
    var iT = ve(),
      oT = yn(),
      oc = "__core-js_shared__",
      aT = iT[oc] || oT(oc, {});
    ac.exports = aT;
  });
  var to = c((FB, uc) => {
    var sT = rc(),
      sc = En();
    (uc.exports = function (e, t) {
      return sc[e] || (sc[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: sT ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var lc = c((MB, cc) => {
    var uT = ve(),
      cT = ji(),
      lT = uT.Object;
    cc.exports = function (e) {
      return lT(cT(e));
    };
  });
  var _t = c((DB, fc) => {
    var fT = je(),
      dT = lc(),
      pT = fT({}.hasOwnProperty);
    fc.exports =
      Object.hasOwn ||
      function (t, r) {
        return pT(dT(t), r);
      };
  });
  var ro = c((kB, dc) => {
    var gT = je(),
      vT = 0,
      hT = Math.random(),
      yT = gT((1).toString);
    dc.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + yT(++vT + hT, 36);
    };
  });
  var no = c((GB, yc) => {
    var ET = ve(),
      mT = to(),
      pc = _t(),
      _T = ro(),
      gc = Yi(),
      hc = $i(),
      jt = mT("wks"),
      Lt = ET.Symbol,
      vc = Lt && Lt.for,
      bT = hc ? Lt : (Lt && Lt.withoutSetter) || _T;
    yc.exports = function (e) {
      if (!pc(jt, e) || !(gc || typeof jt[e] == "string")) {
        var t = "Symbol." + e;
        gc && pc(Lt, e)
          ? (jt[e] = Lt[e])
          : hc && vc
          ? (jt[e] = vc(t))
          : (jt[e] = bT(t));
      }
      return jt[e];
    };
  });
  var bc = c((UB, _c) => {
    var TT = ve(),
      IT = vn(),
      Ec = Xt(),
      mc = Qi(),
      wT = Zu(),
      OT = ec(),
      AT = no(),
      xT = TT.TypeError,
      ST = AT("toPrimitive");
    _c.exports = function (e, t) {
      if (!Ec(e) || mc(e)) return e;
      var r = wT(e, ST),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = IT(r, e, t)), !Ec(n) || mc(n))
        )
          return n;
        throw xT("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), OT(e, t);
    };
  });
  var io = c((VB, Tc) => {
    var CT = bc(),
      RT = Qi();
    Tc.exports = function (e) {
      var t = CT(e, "string");
      return RT(t) ? t : t + "";
    };
  });
  var ao = c((BB, wc) => {
    var LT = ve(),
      Ic = Xt(),
      oo = LT.document,
      NT = Ic(oo) && Ic(oo.createElement);
    wc.exports = function (e) {
      return NT ? oo.createElement(e) : {};
    };
  });
  var so = c((WB, Oc) => {
    var PT = Rt(),
      qT = Ht(),
      FT = ao();
    Oc.exports =
      !PT &&
      !qT(function () {
        return (
          Object.defineProperty(FT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var uo = c((xc) => {
    var MT = Rt(),
      DT = vn(),
      kT = Eu(),
      GT = Bi(),
      UT = Or(),
      VT = io(),
      BT = _t(),
      WT = so(),
      Ac = Object.getOwnPropertyDescriptor;
    xc.f = MT
      ? Ac
      : function (t, r) {
          if (((t = UT(t)), (r = VT(r)), WT))
            try {
              return Ac(t, r);
            } catch {}
          if (BT(t, r)) return GT(!DT(kT.f, t, r), t[r]);
        };
  });
  var xr = c((XB, Cc) => {
    var Sc = ve(),
      HT = Xt(),
      XT = Sc.String,
      jT = Sc.TypeError;
    Cc.exports = function (e) {
      if (HT(e)) return e;
      throw jT(XT(e) + " is not an object");
    };
  });
  var Sr = c((Nc) => {
    var zT = ve(),
      KT = Rt(),
      YT = so(),
      Rc = xr(),
      $T = io(),
      QT = zT.TypeError,
      Lc = Object.defineProperty;
    Nc.f = KT
      ? Lc
      : function (t, r, n) {
          if ((Rc(t), (r = $T(r)), Rc(n), YT))
            try {
              return Lc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw QT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var mn = c((zB, Pc) => {
    var ZT = Rt(),
      JT = Sr(),
      eI = Bi();
    Pc.exports = ZT
      ? function (e, t, r) {
          return JT.f(e, t, eI(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var lo = c((KB, qc) => {
    var tI = je(),
      rI = it(),
      co = En(),
      nI = tI(Function.toString);
    rI(co.inspectSource) ||
      (co.inspectSource = function (e) {
        return nI(e);
      });
    qc.exports = co.inspectSource;
  });
  var Dc = c((YB, Mc) => {
    var iI = ve(),
      oI = it(),
      aI = lo(),
      Fc = iI.WeakMap;
    Mc.exports = oI(Fc) && /native code/.test(aI(Fc));
  });
  var fo = c(($B, Gc) => {
    var sI = to(),
      uI = ro(),
      kc = sI("keys");
    Gc.exports = function (e) {
      return kc[e] || (kc[e] = uI(e));
    };
  });
  var _n = c((QB, Uc) => {
    Uc.exports = {};
  });
  var jc = c((ZB, Xc) => {
    var cI = Dc(),
      Hc = ve(),
      po = je(),
      lI = Xt(),
      fI = mn(),
      go = _t(),
      vo = En(),
      dI = fo(),
      pI = _n(),
      Vc = "Object already initialized",
      yo = Hc.TypeError,
      gI = Hc.WeakMap,
      bn,
      Cr,
      Tn,
      vI = function (e) {
        return Tn(e) ? Cr(e) : bn(e, {});
      },
      hI = function (e) {
        return function (t) {
          var r;
          if (!lI(t) || (r = Cr(t)).type !== e)
            throw yo("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    cI || vo.state
      ? ((bt = vo.state || (vo.state = new gI())),
        (Bc = po(bt.get)),
        (ho = po(bt.has)),
        (Wc = po(bt.set)),
        (bn = function (e, t) {
          if (ho(bt, e)) throw new yo(Vc);
          return (t.facade = e), Wc(bt, e, t), t;
        }),
        (Cr = function (e) {
          return Bc(bt, e) || {};
        }),
        (Tn = function (e) {
          return ho(bt, e);
        }))
      : ((Nt = dI("state")),
        (pI[Nt] = !0),
        (bn = function (e, t) {
          if (go(e, Nt)) throw new yo(Vc);
          return (t.facade = e), fI(e, Nt, t), t;
        }),
        (Cr = function (e) {
          return go(e, Nt) ? e[Nt] : {};
        }),
        (Tn = function (e) {
          return go(e, Nt);
        }));
    var bt, Bc, ho, Wc, Nt;
    Xc.exports = { set: bn, get: Cr, has: Tn, enforce: vI, getterFor: hI };
  });
  var Yc = c((JB, Kc) => {
    var Eo = Rt(),
      yI = _t(),
      zc = Function.prototype,
      EI = Eo && Object.getOwnPropertyDescriptor,
      mo = yI(zc, "name"),
      mI = mo && function () {}.name === "something",
      _I = mo && (!Eo || (Eo && EI(zc, "name").configurable));
    Kc.exports = { EXISTS: mo, PROPER: mI, CONFIGURABLE: _I };
  });
  var el = c((eW, Jc) => {
    var bI = ve(),
      $c = it(),
      TI = _t(),
      Qc = mn(),
      II = yn(),
      wI = lo(),
      Zc = jc(),
      OI = Yc().CONFIGURABLE,
      AI = Zc.get,
      xI = Zc.enforce,
      SI = String(String).split("String");
    (Jc.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        s = n ? !!n.noTargetGet : !1,
        a = n && n.name !== void 0 ? n.name : t,
        u;
      if (
        ($c(r) &&
          (String(a).slice(0, 7) === "Symbol(" &&
            (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!TI(r, "name") || (OI && r.name !== a)) && Qc(r, "name", a),
          (u = xI(r)),
          u.source || (u.source = SI.join(typeof a == "string" ? a : ""))),
        e === bI)
      ) {
        o ? (e[t] = r) : II(t, r);
        return;
      } else i ? !s && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : Qc(e, t, r);
    })(Function.prototype, "toString", function () {
      return ($c(this) && AI(this).source) || wI(this);
    });
  });
  var _o = c((tW, tl) => {
    var CI = Math.ceil,
      RI = Math.floor;
    tl.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? RI : CI)(t);
    };
  });
  var nl = c((rW, rl) => {
    var LI = _o(),
      NI = Math.max,
      PI = Math.min;
    rl.exports = function (e, t) {
      var r = LI(e);
      return r < 0 ? NI(r + t, 0) : PI(r, t);
    };
  });
  var ol = c((nW, il) => {
    var qI = _o(),
      FI = Math.min;
    il.exports = function (e) {
      return e > 0 ? FI(qI(e), 9007199254740991) : 0;
    };
  });
  var sl = c((iW, al) => {
    var MI = ol();
    al.exports = function (e) {
      return MI(e.length);
    };
  });
  var bo = c((oW, cl) => {
    var DI = Or(),
      kI = nl(),
      GI = sl(),
      ul = function (e) {
        return function (t, r, n) {
          var i = DI(t),
            o = GI(i),
            s = kI(n, o),
            a;
          if (e && r != r) {
            for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
          } else
            for (; o > s; s++)
              if ((e || s in i) && i[s] === r) return e || s || 0;
          return !e && -1;
        };
      };
    cl.exports = { includes: ul(!0), indexOf: ul(!1) };
  });
  var Io = c((aW, fl) => {
    var UI = je(),
      To = _t(),
      VI = Or(),
      BI = bo().indexOf,
      WI = _n(),
      ll = UI([].push);
    fl.exports = function (e, t) {
      var r = VI(e),
        n = 0,
        i = [],
        o;
      for (o in r) !To(WI, o) && To(r, o) && ll(i, o);
      for (; t.length > n; ) To(r, (o = t[n++])) && (~BI(i, o) || ll(i, o));
      return i;
    };
  });
  var In = c((sW, dl) => {
    dl.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var gl = c((pl) => {
    var HI = Io(),
      XI = In(),
      jI = XI.concat("length", "prototype");
    pl.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return HI(t, jI);
      };
  });
  var hl = c((vl) => {
    vl.f = Object.getOwnPropertySymbols;
  });
  var El = c((lW, yl) => {
    var zI = Ar(),
      KI = je(),
      YI = gl(),
      $I = hl(),
      QI = xr(),
      ZI = KI([].concat);
    yl.exports =
      zI("Reflect", "ownKeys") ||
      function (t) {
        var r = YI.f(QI(t)),
          n = $I.f;
        return n ? ZI(r, n(t)) : r;
      };
  });
  var _l = c((fW, ml) => {
    var JI = _t(),
      e0 = El(),
      t0 = uo(),
      r0 = Sr();
    ml.exports = function (e, t) {
      for (var r = e0(t), n = r0.f, i = t0.f, o = 0; o < r.length; o++) {
        var s = r[o];
        JI(e, s) || n(e, s, i(t, s));
      }
    };
  });
  var Tl = c((dW, bl) => {
    var n0 = Ht(),
      i0 = it(),
      o0 = /#|\.prototype\./,
      Rr = function (e, t) {
        var r = s0[a0(e)];
        return r == c0 ? !0 : r == u0 ? !1 : i0(t) ? n0(t) : !!t;
      },
      a0 = (Rr.normalize = function (e) {
        return String(e).replace(o0, ".").toLowerCase();
      }),
      s0 = (Rr.data = {}),
      u0 = (Rr.NATIVE = "N"),
      c0 = (Rr.POLYFILL = "P");
    bl.exports = Rr;
  });
  var wl = c((pW, Il) => {
    var wo = ve(),
      l0 = uo().f,
      f0 = mn(),
      d0 = el(),
      p0 = yn(),
      g0 = _l(),
      v0 = Tl();
    Il.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        s,
        a,
        u,
        f,
        h;
      if (
        (n
          ? (s = wo)
          : i
          ? (s = wo[r] || p0(r, {}))
          : (s = (wo[r] || {}).prototype),
        s)
      )
        for (a in t) {
          if (
            ((f = t[a]),
            e.noTargetGet ? ((h = l0(s, a)), (u = h && h.value)) : (u = s[a]),
            (o = v0(n ? a : r + (i ? "." : "#") + a, e.forced)),
            !o && u !== void 0)
          ) {
            if (typeof f == typeof u) continue;
            g0(f, u);
          }
          (e.sham || (u && u.sham)) && f0(f, "sham", !0), d0(s, a, f, e);
        }
    };
  });
  var Al = c((gW, Ol) => {
    var h0 = Io(),
      y0 = In();
    Ol.exports =
      Object.keys ||
      function (t) {
        return h0(t, y0);
      };
  });
  var Sl = c((vW, xl) => {
    var E0 = Rt(),
      m0 = Sr(),
      _0 = xr(),
      b0 = Or(),
      T0 = Al();
    xl.exports = E0
      ? Object.defineProperties
      : function (t, r) {
          _0(t);
          for (var n = b0(r), i = T0(r), o = i.length, s = 0, a; o > s; )
            m0.f(t, (a = i[s++]), n[a]);
          return t;
        };
  });
  var Rl = c((hW, Cl) => {
    var I0 = Ar();
    Cl.exports = I0("document", "documentElement");
  });
  var kl = c((yW, Dl) => {
    var w0 = xr(),
      O0 = Sl(),
      Ll = In(),
      A0 = _n(),
      x0 = Rl(),
      S0 = ao(),
      C0 = fo(),
      Nl = ">",
      Pl = "<",
      Ao = "prototype",
      xo = "script",
      Fl = C0("IE_PROTO"),
      Oo = function () {},
      Ml = function (e) {
        return Pl + xo + Nl + e + Pl + "/" + xo + Nl;
      },
      ql = function (e) {
        e.write(Ml("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      R0 = function () {
        var e = S0("iframe"),
          t = "java" + xo + ":",
          r;
        return (
          (e.style.display = "none"),
          x0.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Ml("document.F=Object")),
          r.close(),
          r.F
        );
      },
      wn,
      On = function () {
        try {
          wn = new ActiveXObject("htmlfile");
        } catch {}
        On =
          typeof document < "u"
            ? document.domain && wn
              ? ql(wn)
              : R0()
            : ql(wn);
        for (var e = Ll.length; e--; ) delete On[Ao][Ll[e]];
        return On();
      };
    A0[Fl] = !0;
    Dl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((Oo[Ao] = w0(t)), (n = new Oo()), (Oo[Ao] = null), (n[Fl] = t))
            : (n = On()),
          r === void 0 ? n : O0(n, r)
        );
      };
  });
  var Ul = c((EW, Gl) => {
    var L0 = no(),
      N0 = kl(),
      P0 = Sr(),
      So = L0("unscopables"),
      Co = Array.prototype;
    Co[So] == null && P0.f(Co, So, { configurable: !0, value: N0(null) });
    Gl.exports = function (e) {
      Co[So][e] = !0;
    };
  });
  var Vl = c(() => {
    "use strict";
    var q0 = wl(),
      F0 = bo().includes,
      M0 = Ul();
    q0(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return F0(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    M0("includes");
  });
  var Wl = c((bW, Bl) => {
    var D0 = ve(),
      k0 = je();
    Bl.exports = function (e, t) {
      return k0(D0[e].prototype[t]);
    };
  });
  var Xl = c((TW, Hl) => {
    Vl();
    var G0 = Wl();
    Hl.exports = G0("Array", "includes");
  });
  var zl = c((IW, jl) => {
    var U0 = Xl();
    jl.exports = U0;
  });
  var Yl = c((wW, Kl) => {
    var V0 = zl();
    Kl.exports = V0;
  });
  var Ro = c((OW, $l) => {
    var B0 =
      typeof global == "object" && global && global.Object === Object && global;
    $l.exports = B0;
  });
  var Ke = c((AW, Ql) => {
    var W0 = Ro(),
      H0 = typeof self == "object" && self && self.Object === Object && self,
      X0 = W0 || H0 || Function("return this")();
    Ql.exports = X0;
  });
  var zt = c((xW, Zl) => {
    var j0 = Ke(),
      z0 = j0.Symbol;
    Zl.exports = z0;
  });
  var rf = c((SW, tf) => {
    var Jl = zt(),
      ef = Object.prototype,
      K0 = ef.hasOwnProperty,
      Y0 = ef.toString,
      Lr = Jl ? Jl.toStringTag : void 0;
    function $0(e) {
      var t = K0.call(e, Lr),
        r = e[Lr];
      try {
        e[Lr] = void 0;
        var n = !0;
      } catch {}
      var i = Y0.call(e);
      return n && (t ? (e[Lr] = r) : delete e[Lr]), i;
    }
    tf.exports = $0;
  });
  var of = c((CW, nf) => {
    var Q0 = Object.prototype,
      Z0 = Q0.toString;
    function J0(e) {
      return Z0.call(e);
    }
    nf.exports = J0;
  });
  var Tt = c((RW, uf) => {
    var af = zt(),
      ew = rf(),
      tw = of(),
      rw = "[object Null]",
      nw = "[object Undefined]",
      sf = af ? af.toStringTag : void 0;
    function iw(e) {
      return e == null
        ? e === void 0
          ? nw
          : rw
        : sf && sf in Object(e)
        ? ew(e)
        : tw(e);
    }
    uf.exports = iw;
  });
  var Lo = c((LW, cf) => {
    function ow(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    cf.exports = ow;
  });
  var No = c((NW, lf) => {
    var aw = Lo(),
      sw = aw(Object.getPrototypeOf, Object);
    lf.exports = sw;
  });
  var pt = c((PW, ff) => {
    function uw(e) {
      return e != null && typeof e == "object";
    }
    ff.exports = uw;
  });
  var Po = c((qW, pf) => {
    var cw = Tt(),
      lw = No(),
      fw = pt(),
      dw = "[object Object]",
      pw = Function.prototype,
      gw = Object.prototype,
      df = pw.toString,
      vw = gw.hasOwnProperty,
      hw = df.call(Object);
    function yw(e) {
      if (!fw(e) || cw(e) != dw) return !1;
      var t = lw(e);
      if (t === null) return !0;
      var r = vw.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && df.call(r) == hw;
    }
    pf.exports = yw;
  });
  var gf = c((qo) => {
    "use strict";
    Object.defineProperty(qo, "__esModule", { value: !0 });
    qo.default = Ew;
    function Ew(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var vf = c((Mo, Fo) => {
    "use strict";
    Object.defineProperty(Mo, "__esModule", { value: !0 });
    var mw = gf(),
      _w = bw(mw);
    function bw(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Kt;
    typeof self < "u"
      ? (Kt = self)
      : typeof window < "u"
      ? (Kt = window)
      : typeof global < "u"
      ? (Kt = global)
      : typeof Fo < "u"
      ? (Kt = Fo)
      : (Kt = Function("return this")());
    var Tw = (0, _w.default)(Kt);
    Mo.default = Tw;
  });
  var Do = c((Nr) => {
    "use strict";
    Nr.__esModule = !0;
    Nr.ActionTypes = void 0;
    Nr.default = mf;
    var Iw = Po(),
      ww = Ef(Iw),
      Ow = vf(),
      hf = Ef(Ow);
    function Ef(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var yf = (Nr.ActionTypes = { INIT: "@@redux/INIT" });
    function mf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(mf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function f() {
        a === s && (a = s.slice());
      }
      function h() {
        return o;
      }
      function g(T) {
        if (typeof T != "function")
          throw new Error("Expected listener to be a function.");
        var S = !0;
        return (
          f(),
          a.push(T),
          function () {
            if (S) {
              (S = !1), f();
              var N = a.indexOf(T);
              a.splice(N, 1);
            }
          }
        );
      }
      function v(T) {
        if (!(0, ww.default)(T))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof T.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, T));
        } finally {
          u = !1;
        }
        for (var S = (s = a), I = 0; I < S.length; I++) S[I]();
        return T;
      }
      function _(T) {
        if (typeof T != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = T), v({ type: yf.INIT });
      }
      function w() {
        var T,
          S = g;
        return (
          (T = {
            subscribe: function (N) {
              if (typeof N != "object")
                throw new TypeError("Expected the observer to be an object.");
              function R() {
                N.next && N.next(h());
              }
              R();
              var M = S(R);
              return { unsubscribe: M };
            },
          }),
          (T[hf.default] = function () {
            return this;
          }),
          T
        );
      }
      return (
        v({ type: yf.INIT }),
        (n = { dispatch: v, subscribe: g, getState: h, replaceReducer: _ }),
        (n[hf.default] = w),
        n
      );
    }
  });
  var Go = c((ko) => {
    "use strict";
    ko.__esModule = !0;
    ko.default = Aw;
    function Aw(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var Tf = c((Uo) => {
    "use strict";
    Uo.__esModule = !0;
    Uo.default = Lw;
    var _f = Do(),
      xw = Po(),
      kW = bf(xw),
      Sw = Go(),
      GW = bf(Sw);
    function bf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Cw(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function Rw(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: _f.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                _f.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function Lw(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var s;
      var a;
      try {
        Rw(r);
      } catch (u) {
        a = u;
      }
      return function () {
        var f =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          h = arguments[1];
        if (a) throw a;
        if (!1) var g;
        for (var v = !1, _ = {}, w = 0; w < o.length; w++) {
          var T = o[w],
            S = r[T],
            I = f[T],
            N = S(I, h);
          if (typeof N > "u") {
            var R = Cw(T, h);
            throw new Error(R);
          }
          (_[T] = N), (v = v || N !== I);
        }
        return v ? _ : f;
      };
    }
  });
  var wf = c((Vo) => {
    "use strict";
    Vo.__esModule = !0;
    Vo.default = Nw;
    function If(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Nw(e, t) {
      if (typeof e == "function") return If(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          s = e[o];
        typeof s == "function" && (n[o] = If(s, t));
      }
      return n;
    }
  });
  var Wo = c((Bo) => {
    "use strict";
    Bo.__esModule = !0;
    Bo.default = Pw;
    function Pw() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var Of = c((Ho) => {
    "use strict";
    Ho.__esModule = !0;
    var qw =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Ho.default = kw;
    var Fw = Wo(),
      Mw = Dw(Fw);
    function Dw(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function kw() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, s) {
          var a = n(i, o, s),
            u = a.dispatch,
            f = [],
            h = {
              getState: a.getState,
              dispatch: function (v) {
                return u(v);
              },
            };
          return (
            (f = t.map(function (g) {
              return g(h);
            })),
            (u = Mw.default.apply(void 0, f)(a.dispatch)),
            qw({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var Xo = c((Ve) => {
    "use strict";
    Ve.__esModule = !0;
    Ve.compose =
      Ve.applyMiddleware =
      Ve.bindActionCreators =
      Ve.combineReducers =
      Ve.createStore =
        void 0;
    var Gw = Do(),
      Uw = Yt(Gw),
      Vw = Tf(),
      Bw = Yt(Vw),
      Ww = wf(),
      Hw = Yt(Ww),
      Xw = Of(),
      jw = Yt(Xw),
      zw = Wo(),
      Kw = Yt(zw),
      Yw = Go(),
      HW = Yt(Yw);
    function Yt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Ve.createStore = Uw.default;
    Ve.combineReducers = Bw.default;
    Ve.bindActionCreators = Hw.default;
    Ve.applyMiddleware = jw.default;
    Ve.compose = Kw.default;
  });
  var Ye,
    jo,
    ot,
    $w,
    Qw,
    An,
    Zw,
    zo = ge(() => {
      "use strict";
      (Ye = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (jo = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (ot = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        ($w = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (Qw = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (An = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (Zw = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Me,
    Jw,
    xn = ge(() => {
      "use strict";
      (Me = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (Jw = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var eO,
    Af = ge(() => {
      "use strict";
      eO = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var tO,
    rO,
    nO,
    iO,
    oO,
    aO,
    sO,
    Ko,
    xf = ge(() => {
      "use strict";
      xn();
      ({
        TRANSFORM_MOVE: tO,
        TRANSFORM_SCALE: rO,
        TRANSFORM_ROTATE: nO,
        TRANSFORM_SKEW: iO,
        STYLE_SIZE: oO,
        STYLE_FILTER: aO,
        STYLE_FONT_VARIATION: sO,
      } = Me),
        (Ko = {
          [tO]: !0,
          [rO]: !0,
          [nO]: !0,
          [iO]: !0,
          [oO]: !0,
          [aO]: !0,
          [sO]: !0,
        });
    });
  var be = {};
  qe(be, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => wO,
    IX2_ANIMATION_FRAME_CHANGED: () => EO,
    IX2_CLEAR_REQUESTED: () => vO,
    IX2_ELEMENT_STATE_CHANGED: () => IO,
    IX2_EVENT_LISTENER_ADDED: () => hO,
    IX2_EVENT_STATE_CHANGED: () => yO,
    IX2_INSTANCE_ADDED: () => _O,
    IX2_INSTANCE_REMOVED: () => TO,
    IX2_INSTANCE_STARTED: () => bO,
    IX2_MEDIA_QUERIES_DEFINED: () => AO,
    IX2_PARAMETER_CHANGED: () => mO,
    IX2_PLAYBACK_REQUESTED: () => pO,
    IX2_PREVIEW_REQUESTED: () => dO,
    IX2_RAW_DATA_IMPORTED: () => uO,
    IX2_SESSION_INITIALIZED: () => cO,
    IX2_SESSION_STARTED: () => lO,
    IX2_SESSION_STOPPED: () => fO,
    IX2_STOP_REQUESTED: () => gO,
    IX2_TEST_FRAME_RENDERED: () => xO,
    IX2_VIEWPORT_WIDTH_CHANGED: () => OO,
  });
  var uO,
    cO,
    lO,
    fO,
    dO,
    pO,
    gO,
    vO,
    hO,
    yO,
    EO,
    mO,
    _O,
    bO,
    TO,
    IO,
    wO,
    OO,
    AO,
    xO,
    Sf = ge(() => {
      "use strict";
      (uO = "IX2_RAW_DATA_IMPORTED"),
        (cO = "IX2_SESSION_INITIALIZED"),
        (lO = "IX2_SESSION_STARTED"),
        (fO = "IX2_SESSION_STOPPED"),
        (dO = "IX2_PREVIEW_REQUESTED"),
        (pO = "IX2_PLAYBACK_REQUESTED"),
        (gO = "IX2_STOP_REQUESTED"),
        (vO = "IX2_CLEAR_REQUESTED"),
        (hO = "IX2_EVENT_LISTENER_ADDED"),
        (yO = "IX2_EVENT_STATE_CHANGED"),
        (EO = "IX2_ANIMATION_FRAME_CHANGED"),
        (mO = "IX2_PARAMETER_CHANGED"),
        (_O = "IX2_INSTANCE_ADDED"),
        (bO = "IX2_INSTANCE_STARTED"),
        (TO = "IX2_INSTANCE_REMOVED"),
        (IO = "IX2_ELEMENT_STATE_CHANGED"),
        (wO = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (OO = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (AO = "IX2_MEDIA_QUERIES_DEFINED"),
        (xO = "IX2_TEST_FRAME_RENDERED");
    });
  var Ae = {};
  qe(Ae, {
    ABSTRACT_NODE: () => OA,
    AUTO: () => gA,
    BACKGROUND: () => uA,
    BACKGROUND_COLOR: () => sA,
    BAR_DELIMITER: () => yA,
    BORDER_COLOR: () => cA,
    BOUNDARY_SELECTOR: () => NO,
    CHILDREN: () => EA,
    COLON_DELIMITER: () => hA,
    COLOR: () => lA,
    COMMA_DELIMITER: () => vA,
    CONFIG_UNIT: () => UO,
    CONFIG_VALUE: () => MO,
    CONFIG_X_UNIT: () => DO,
    CONFIG_X_VALUE: () => PO,
    CONFIG_Y_UNIT: () => kO,
    CONFIG_Y_VALUE: () => qO,
    CONFIG_Z_UNIT: () => GO,
    CONFIG_Z_VALUE: () => FO,
    DISPLAY: () => fA,
    FILTER: () => nA,
    FLEX: () => dA,
    FONT_VARIATION_SETTINGS: () => iA,
    HEIGHT: () => aA,
    HTML_ELEMENT: () => IA,
    IMMEDIATE_CHILDREN: () => mA,
    IX2_ID_DELIMITER: () => SO,
    OPACITY: () => rA,
    PARENT: () => bA,
    PLAIN_OBJECT: () => wA,
    PRESERVE_3D: () => TA,
    RENDER_GENERAL: () => xA,
    RENDER_PLUGIN: () => CA,
    RENDER_STYLE: () => SA,
    RENDER_TRANSFORM: () => AA,
    ROTATE_X: () => $O,
    ROTATE_Y: () => QO,
    ROTATE_Z: () => ZO,
    SCALE_3D: () => YO,
    SCALE_X: () => jO,
    SCALE_Y: () => zO,
    SCALE_Z: () => KO,
    SIBLINGS: () => _A,
    SKEW: () => JO,
    SKEW_X: () => eA,
    SKEW_Y: () => tA,
    TRANSFORM: () => VO,
    TRANSLATE_3D: () => XO,
    TRANSLATE_X: () => BO,
    TRANSLATE_Y: () => WO,
    TRANSLATE_Z: () => HO,
    WF_PAGE: () => CO,
    WIDTH: () => oA,
    WILL_CHANGE: () => pA,
    W_MOD_IX: () => LO,
    W_MOD_JS: () => RO,
  });
  var SO,
    CO,
    RO,
    LO,
    NO,
    PO,
    qO,
    FO,
    MO,
    DO,
    kO,
    GO,
    UO,
    VO,
    BO,
    WO,
    HO,
    XO,
    jO,
    zO,
    KO,
    YO,
    $O,
    QO,
    ZO,
    JO,
    eA,
    tA,
    rA,
    nA,
    iA,
    oA,
    aA,
    sA,
    uA,
    cA,
    lA,
    fA,
    dA,
    pA,
    gA,
    vA,
    hA,
    yA,
    EA,
    mA,
    _A,
    bA,
    TA,
    IA,
    wA,
    OA,
    AA,
    xA,
    SA,
    CA,
    Cf = ge(() => {
      "use strict";
      (SO = "|"),
        (CO = "data-wf-page"),
        (RO = "w-mod-js"),
        (LO = "w-mod-ix"),
        (NO = ".w-dyn-item"),
        (PO = "xValue"),
        (qO = "yValue"),
        (FO = "zValue"),
        (MO = "value"),
        (DO = "xUnit"),
        (kO = "yUnit"),
        (GO = "zUnit"),
        (UO = "unit"),
        (VO = "transform"),
        (BO = "translateX"),
        (WO = "translateY"),
        (HO = "translateZ"),
        (XO = "translate3d"),
        (jO = "scaleX"),
        (zO = "scaleY"),
        (KO = "scaleZ"),
        (YO = "scale3d"),
        ($O = "rotateX"),
        (QO = "rotateY"),
        (ZO = "rotateZ"),
        (JO = "skew"),
        (eA = "skewX"),
        (tA = "skewY"),
        (rA = "opacity"),
        (nA = "filter"),
        (iA = "font-variation-settings"),
        (oA = "width"),
        (aA = "height"),
        (sA = "backgroundColor"),
        (uA = "background"),
        (cA = "borderColor"),
        (lA = "color"),
        (fA = "display"),
        (dA = "flex"),
        (pA = "willChange"),
        (gA = "AUTO"),
        (vA = ","),
        (hA = ":"),
        (yA = "|"),
        (EA = "CHILDREN"),
        (mA = "IMMEDIATE_CHILDREN"),
        (_A = "SIBLINGS"),
        (bA = "PARENT"),
        (TA = "preserve-3d"),
        (IA = "HTML_ELEMENT"),
        (wA = "PLAIN_OBJECT"),
        (OA = "ABSTRACT_NODE"),
        (AA = "RENDER_TRANSFORM"),
        (xA = "RENDER_GENERAL"),
        (SA = "RENDER_STYLE"),
        (CA = "RENDER_PLUGIN");
    });
  var Rf = {};
  qe(Rf, {
    ActionAppliesTo: () => Jw,
    ActionTypeConsts: () => Me,
    EventAppliesTo: () => jo,
    EventBasedOn: () => ot,
    EventContinuousMouseAxes: () => $w,
    EventLimitAffectedElements: () => Qw,
    EventTypeConsts: () => Ye,
    IX2EngineActionTypes: () => be,
    IX2EngineConstants: () => Ae,
    InteractionTypeConsts: () => eO,
    QuickEffectDirectionConsts: () => Zw,
    QuickEffectIds: () => An,
    ReducedMotionTypes: () => Ko,
  });
  var De = ge(() => {
    "use strict";
    zo();
    xn();
    Af();
    xf();
    Sf();
    Cf();
    xn();
    zo();
  });
  var RA,
    Lf,
    Nf = ge(() => {
      "use strict";
      De();
      ({ IX2_RAW_DATA_IMPORTED: RA } = be),
        (Lf = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case RA:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var $t = c((ye) => {
    "use strict";
    Object.defineProperty(ye, "__esModule", { value: !0 });
    var LA =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    ye.clone = Cn;
    ye.addLast = Ff;
    ye.addFirst = Mf;
    ye.removeLast = Df;
    ye.removeFirst = kf;
    ye.insert = Gf;
    ye.removeAt = Uf;
    ye.replaceAt = Vf;
    ye.getIn = Rn;
    ye.set = Ln;
    ye.setIn = Nn;
    ye.update = Wf;
    ye.updateIn = Hf;
    ye.merge = Xf;
    ye.mergeDeep = jf;
    ye.mergeIn = zf;
    ye.omit = Kf;
    ye.addDefaults = Yf;
    var Pf = "INVALID_ARGS";
    function qf(e) {
      throw new Error(e);
    }
    function Yo(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var NA = {}.hasOwnProperty;
    function Cn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = Yo(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function ke(e, t, r) {
      var n = r;
      n == null && qf(Pf);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var f = s[u];
        if (f != null) {
          var h = Yo(f);
          if (h.length)
            for (var g = 0; g <= h.length; g++) {
              var v = h[g];
              if (!(e && n[v] !== void 0)) {
                var _ = f[v];
                t && Sn(n[v]) && Sn(_) && (_ = ke(e, t, n[v], _)),
                  !(_ === void 0 || _ === n[v]) &&
                    (i || ((i = !0), (n = Cn(n))), (n[v] = _));
              }
            }
        }
      }
      return n;
    }
    function Sn(e) {
      var t = typeof e > "u" ? "undefined" : LA(e);
      return e != null && (t === "object" || t === "function");
    }
    function Ff(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Mf(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Df(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function kf(e) {
      return e.length ? e.slice(1) : e;
    }
    function Gf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Uf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Vf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return (i[t] = r), i;
    }
    function Rn(e, t) {
      if ((!Array.isArray(t) && qf(Pf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Ln(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = Cn(i);
      return (o[t] = r), o;
    }
    function Bf(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var s =
          Sn(e) && Sn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = Bf(s, t, r, n + 1);
      }
      return Ln(e, o, i);
    }
    function Nn(e, t, r) {
      return t.length ? Bf(e, t, r, 0) : r;
    }
    function Wf(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return Ln(e, t, i);
    }
    function Hf(e, t, r) {
      var n = Rn(e, t),
        i = r(n);
      return Nn(e, t, i);
    }
    function Xf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? ke.call.apply(ke, [null, !1, !1, e, t, r, n, i, o].concat(a))
        : ke(!1, !1, e, t, r, n, i, o);
    }
    function jf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? ke.call.apply(ke, [null, !1, !0, e, t, r, n, i, o].concat(a))
        : ke(!1, !0, e, t, r, n, i, o);
    }
    function zf(e, t, r, n, i, o, s) {
      var a = Rn(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          f = arguments.length,
          h = Array(f > 7 ? f - 7 : 0),
          g = 7;
        g < f;
        g++
      )
        h[g - 7] = arguments[g];
      return (
        h.length
          ? (u = ke.call.apply(ke, [null, !1, !1, a, r, n, i, o, s].concat(h)))
          : (u = ke(!1, !1, a, r, n, i, o, s)),
        Nn(e, t, u)
      );
    }
    function Kf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (NA.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, s = Yo(e), a = 0; a < s.length; a++) {
        var u = s[a];
        r.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Yf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? ke.call.apply(ke, [null, !0, !1, e, t, r, n, i, o].concat(a))
        : ke(!0, !1, e, t, r, n, i, o);
    }
    var PA = {
      clone: Cn,
      addLast: Ff,
      addFirst: Mf,
      removeLast: Df,
      removeFirst: kf,
      insert: Gf,
      removeAt: Uf,
      replaceAt: Vf,
      getIn: Rn,
      set: Ln,
      setIn: Nn,
      update: Wf,
      updateIn: Hf,
      merge: Xf,
      mergeDeep: jf,
      mergeIn: zf,
      omit: Kf,
      addDefaults: Yf,
    };
    ye.default = PA;
  });
  var Qf,
    qA,
    FA,
    MA,
    DA,
    kA,
    $f,
    Zf,
    Jf = ge(() => {
      "use strict";
      De();
      (Qf = se($t())),
        ({
          IX2_PREVIEW_REQUESTED: qA,
          IX2_PLAYBACK_REQUESTED: FA,
          IX2_STOP_REQUESTED: MA,
          IX2_CLEAR_REQUESTED: DA,
        } = be),
        (kA = { preview: {}, playback: {}, stop: {}, clear: {} }),
        ($f = Object.create(null, {
          [qA]: { value: "preview" },
          [FA]: { value: "playback" },
          [MA]: { value: "stop" },
          [DA]: { value: "clear" },
        })),
        (Zf = (e = kA, t) => {
          if (t.type in $f) {
            let r = [$f[t.type]];
            return (0, Qf.setIn)(e, [r], { ...t.payload });
          }
          return e;
        });
    });
  var Re,
    GA,
    UA,
    VA,
    BA,
    WA,
    HA,
    XA,
    jA,
    zA,
    KA,
    ed,
    YA,
    td,
    rd = ge(() => {
      "use strict";
      De();
      (Re = se($t())),
        ({
          IX2_SESSION_INITIALIZED: GA,
          IX2_SESSION_STARTED: UA,
          IX2_TEST_FRAME_RENDERED: VA,
          IX2_SESSION_STOPPED: BA,
          IX2_EVENT_LISTENER_ADDED: WA,
          IX2_EVENT_STATE_CHANGED: HA,
          IX2_ANIMATION_FRAME_CHANGED: XA,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: jA,
          IX2_VIEWPORT_WIDTH_CHANGED: zA,
          IX2_MEDIA_QUERIES_DEFINED: KA,
        } = be),
        (ed = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (YA = 20),
        (td = (e = ed, t) => {
          switch (t.type) {
            case GA: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, Re.merge)(e, {
                hasBoundaryNodes: r,
                reducedMotion: n,
              });
            }
            case UA:
              return (0, Re.set)(e, "active", !0);
            case VA: {
              let {
                payload: { step: r = YA },
              } = t;
              return (0, Re.set)(e, "tick", e.tick + r);
            }
            case BA:
              return ed;
            case XA: {
              let {
                payload: { now: r },
              } = t;
              return (0, Re.set)(e, "tick", r);
            }
            case WA: {
              let r = (0, Re.addLast)(e.eventListeners, t.payload);
              return (0, Re.set)(e, "eventListeners", r);
            }
            case HA: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, Re.setIn)(e, ["eventState", r], n);
            }
            case jA: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, Re.setIn)(e, ["playbackState", r], n);
            }
            case zA: {
              let { width: r, mediaQueries: n } = t.payload,
                i = n.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: f } = n[s];
                if (r >= u && r <= f) {
                  o = a;
                  break;
                }
              }
              return (0, Re.merge)(e, { viewportWidth: r, mediaQueryKey: o });
            }
            case KA:
              return (0, Re.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var id = c((l5, nd) => {
    function $A() {
      (this.__data__ = []), (this.size = 0);
    }
    nd.exports = $A;
  });
  var Pn = c((f5, od) => {
    function QA(e, t) {
      return e === t || (e !== e && t !== t);
    }
    od.exports = QA;
  });
  var Pr = c((d5, ad) => {
    var ZA = Pn();
    function JA(e, t) {
      for (var r = e.length; r--; ) if (ZA(e[r][0], t)) return r;
      return -1;
    }
    ad.exports = JA;
  });
  var ud = c((p5, sd) => {
    var ex = Pr(),
      tx = Array.prototype,
      rx = tx.splice;
    function nx(e) {
      var t = this.__data__,
        r = ex(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : rx.call(t, r, 1), --this.size, !0;
    }
    sd.exports = nx;
  });
  var ld = c((g5, cd) => {
    var ix = Pr();
    function ox(e) {
      var t = this.__data__,
        r = ix(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    cd.exports = ox;
  });
  var dd = c((v5, fd) => {
    var ax = Pr();
    function sx(e) {
      return ax(this.__data__, e) > -1;
    }
    fd.exports = sx;
  });
  var gd = c((h5, pd) => {
    var ux = Pr();
    function cx(e, t) {
      var r = this.__data__,
        n = ux(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    pd.exports = cx;
  });
  var qr = c((y5, vd) => {
    var lx = id(),
      fx = ud(),
      dx = ld(),
      px = dd(),
      gx = gd();
    function Qt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Qt.prototype.clear = lx;
    Qt.prototype.delete = fx;
    Qt.prototype.get = dx;
    Qt.prototype.has = px;
    Qt.prototype.set = gx;
    vd.exports = Qt;
  });
  var yd = c((E5, hd) => {
    var vx = qr();
    function hx() {
      (this.__data__ = new vx()), (this.size = 0);
    }
    hd.exports = hx;
  });
  var md = c((m5, Ed) => {
    function yx(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    Ed.exports = yx;
  });
  var bd = c((_5, _d) => {
    function Ex(e) {
      return this.__data__.get(e);
    }
    _d.exports = Ex;
  });
  var Id = c((b5, Td) => {
    function mx(e) {
      return this.__data__.has(e);
    }
    Td.exports = mx;
  });
  var at = c((T5, wd) => {
    function _x(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    wd.exports = _x;
  });
  var $o = c((I5, Od) => {
    var bx = Tt(),
      Tx = at(),
      Ix = "[object AsyncFunction]",
      wx = "[object Function]",
      Ox = "[object GeneratorFunction]",
      Ax = "[object Proxy]";
    function xx(e) {
      if (!Tx(e)) return !1;
      var t = bx(e);
      return t == wx || t == Ox || t == Ix || t == Ax;
    }
    Od.exports = xx;
  });
  var xd = c((w5, Ad) => {
    var Sx = Ke(),
      Cx = Sx["__core-js_shared__"];
    Ad.exports = Cx;
  });
  var Rd = c((O5, Cd) => {
    var Qo = xd(),
      Sd = (function () {
        var e = /[^.]+$/.exec((Qo && Qo.keys && Qo.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function Rx(e) {
      return !!Sd && Sd in e;
    }
    Cd.exports = Rx;
  });
  var Zo = c((A5, Ld) => {
    var Lx = Function.prototype,
      Nx = Lx.toString;
    function Px(e) {
      if (e != null) {
        try {
          return Nx.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Ld.exports = Px;
  });
  var Pd = c((x5, Nd) => {
    var qx = $o(),
      Fx = Rd(),
      Mx = at(),
      Dx = Zo(),
      kx = /[\\^$.*+?()[\]{}|]/g,
      Gx = /^\[object .+?Constructor\]$/,
      Ux = Function.prototype,
      Vx = Object.prototype,
      Bx = Ux.toString,
      Wx = Vx.hasOwnProperty,
      Hx = RegExp(
        "^" +
          Bx.call(Wx)
            .replace(kx, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function Xx(e) {
      if (!Mx(e) || Fx(e)) return !1;
      var t = qx(e) ? Hx : Gx;
      return t.test(Dx(e));
    }
    Nd.exports = Xx;
  });
  var Fd = c((S5, qd) => {
    function jx(e, t) {
      return e?.[t];
    }
    qd.exports = jx;
  });
  var It = c((C5, Md) => {
    var zx = Pd(),
      Kx = Fd();
    function Yx(e, t) {
      var r = Kx(e, t);
      return zx(r) ? r : void 0;
    }
    Md.exports = Yx;
  });
  var qn = c((R5, Dd) => {
    var $x = It(),
      Qx = Ke(),
      Zx = $x(Qx, "Map");
    Dd.exports = Zx;
  });
  var Fr = c((L5, kd) => {
    var Jx = It(),
      eS = Jx(Object, "create");
    kd.exports = eS;
  });
  var Vd = c((N5, Ud) => {
    var Gd = Fr();
    function tS() {
      (this.__data__ = Gd ? Gd(null) : {}), (this.size = 0);
    }
    Ud.exports = tS;
  });
  var Wd = c((P5, Bd) => {
    function rS(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Bd.exports = rS;
  });
  var Xd = c((q5, Hd) => {
    var nS = Fr(),
      iS = "__lodash_hash_undefined__",
      oS = Object.prototype,
      aS = oS.hasOwnProperty;
    function sS(e) {
      var t = this.__data__;
      if (nS) {
        var r = t[e];
        return r === iS ? void 0 : r;
      }
      return aS.call(t, e) ? t[e] : void 0;
    }
    Hd.exports = sS;
  });
  var zd = c((F5, jd) => {
    var uS = Fr(),
      cS = Object.prototype,
      lS = cS.hasOwnProperty;
    function fS(e) {
      var t = this.__data__;
      return uS ? t[e] !== void 0 : lS.call(t, e);
    }
    jd.exports = fS;
  });
  var Yd = c((M5, Kd) => {
    var dS = Fr(),
      pS = "__lodash_hash_undefined__";
    function gS(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = dS && t === void 0 ? pS : t),
        this
      );
    }
    Kd.exports = gS;
  });
  var Qd = c((D5, $d) => {
    var vS = Vd(),
      hS = Wd(),
      yS = Xd(),
      ES = zd(),
      mS = Yd();
    function Zt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Zt.prototype.clear = vS;
    Zt.prototype.delete = hS;
    Zt.prototype.get = yS;
    Zt.prototype.has = ES;
    Zt.prototype.set = mS;
    $d.exports = Zt;
  });
  var ep = c((k5, Jd) => {
    var Zd = Qd(),
      _S = qr(),
      bS = qn();
    function TS() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Zd(),
          map: new (bS || _S)(),
          string: new Zd(),
        });
    }
    Jd.exports = TS;
  });
  var rp = c((G5, tp) => {
    function IS(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    tp.exports = IS;
  });
  var Mr = c((U5, np) => {
    var wS = rp();
    function OS(e, t) {
      var r = e.__data__;
      return wS(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    np.exports = OS;
  });
  var op = c((V5, ip) => {
    var AS = Mr();
    function xS(e) {
      var t = AS(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    ip.exports = xS;
  });
  var sp = c((B5, ap) => {
    var SS = Mr();
    function CS(e) {
      return SS(this, e).get(e);
    }
    ap.exports = CS;
  });
  var cp = c((W5, up) => {
    var RS = Mr();
    function LS(e) {
      return RS(this, e).has(e);
    }
    up.exports = LS;
  });
  var fp = c((H5, lp) => {
    var NS = Mr();
    function PS(e, t) {
      var r = NS(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    lp.exports = PS;
  });
  var Fn = c((X5, dp) => {
    var qS = ep(),
      FS = op(),
      MS = sp(),
      DS = cp(),
      kS = fp();
    function Jt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Jt.prototype.clear = qS;
    Jt.prototype.delete = FS;
    Jt.prototype.get = MS;
    Jt.prototype.has = DS;
    Jt.prototype.set = kS;
    dp.exports = Jt;
  });
  var gp = c((j5, pp) => {
    var GS = qr(),
      US = qn(),
      VS = Fn(),
      BS = 200;
    function WS(e, t) {
      var r = this.__data__;
      if (r instanceof GS) {
        var n = r.__data__;
        if (!US || n.length < BS - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new VS(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    pp.exports = WS;
  });
  var Jo = c((z5, vp) => {
    var HS = qr(),
      XS = yd(),
      jS = md(),
      zS = bd(),
      KS = Id(),
      YS = gp();
    function er(e) {
      var t = (this.__data__ = new HS(e));
      this.size = t.size;
    }
    er.prototype.clear = XS;
    er.prototype.delete = jS;
    er.prototype.get = zS;
    er.prototype.has = KS;
    er.prototype.set = YS;
    vp.exports = er;
  });
  var yp = c((K5, hp) => {
    var $S = "__lodash_hash_undefined__";
    function QS(e) {
      return this.__data__.set(e, $S), this;
    }
    hp.exports = QS;
  });
  var mp = c((Y5, Ep) => {
    function ZS(e) {
      return this.__data__.has(e);
    }
    Ep.exports = ZS;
  });
  var bp = c(($5, _p) => {
    var JS = Fn(),
      eC = yp(),
      tC = mp();
    function Mn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new JS(); ++t < r; ) this.add(e[t]);
    }
    Mn.prototype.add = Mn.prototype.push = eC;
    Mn.prototype.has = tC;
    _p.exports = Mn;
  });
  var Ip = c((Q5, Tp) => {
    function rC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    Tp.exports = rC;
  });
  var Op = c((Z5, wp) => {
    function nC(e, t) {
      return e.has(t);
    }
    wp.exports = nC;
  });
  var ea = c((J5, Ap) => {
    var iC = bp(),
      oC = Ip(),
      aC = Op(),
      sC = 1,
      uC = 2;
    function cC(e, t, r, n, i, o) {
      var s = r & sC,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var f = o.get(e),
        h = o.get(t);
      if (f && h) return f == t && h == e;
      var g = -1,
        v = !0,
        _ = r & uC ? new iC() : void 0;
      for (o.set(e, t), o.set(t, e); ++g < a; ) {
        var w = e[g],
          T = t[g];
        if (n) var S = s ? n(T, w, g, t, e, o) : n(w, T, g, e, t, o);
        if (S !== void 0) {
          if (S) continue;
          v = !1;
          break;
        }
        if (_) {
          if (
            !oC(t, function (I, N) {
              if (!aC(_, N) && (w === I || i(w, I, r, n, o))) return _.push(N);
            })
          ) {
            v = !1;
            break;
          }
        } else if (!(w === T || i(w, T, r, n, o))) {
          v = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), v;
    }
    Ap.exports = cC;
  });
  var Sp = c((eH, xp) => {
    var lC = Ke(),
      fC = lC.Uint8Array;
    xp.exports = fC;
  });
  var Rp = c((tH, Cp) => {
    function dC(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    Cp.exports = dC;
  });
  var Np = c((rH, Lp) => {
    function pC(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Lp.exports = pC;
  });
  var Dp = c((nH, Mp) => {
    var Pp = zt(),
      qp = Sp(),
      gC = Pn(),
      vC = ea(),
      hC = Rp(),
      yC = Np(),
      EC = 1,
      mC = 2,
      _C = "[object Boolean]",
      bC = "[object Date]",
      TC = "[object Error]",
      IC = "[object Map]",
      wC = "[object Number]",
      OC = "[object RegExp]",
      AC = "[object Set]",
      xC = "[object String]",
      SC = "[object Symbol]",
      CC = "[object ArrayBuffer]",
      RC = "[object DataView]",
      Fp = Pp ? Pp.prototype : void 0,
      ta = Fp ? Fp.valueOf : void 0;
    function LC(e, t, r, n, i, o, s) {
      switch (r) {
        case RC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case CC:
          return !(e.byteLength != t.byteLength || !o(new qp(e), new qp(t)));
        case _C:
        case bC:
        case wC:
          return gC(+e, +t);
        case TC:
          return e.name == t.name && e.message == t.message;
        case OC:
        case xC:
          return e == t + "";
        case IC:
          var a = hC;
        case AC:
          var u = n & EC;
          if ((a || (a = yC), e.size != t.size && !u)) return !1;
          var f = s.get(e);
          if (f) return f == t;
          (n |= mC), s.set(e, t);
          var h = vC(a(e), a(t), n, i, o, s);
          return s.delete(e), h;
        case SC:
          if (ta) return ta.call(e) == ta.call(t);
      }
      return !1;
    }
    Mp.exports = LC;
  });
  var Dn = c((iH, kp) => {
    function NC(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    kp.exports = NC;
  });
  var Te = c((oH, Gp) => {
    var PC = Array.isArray;
    Gp.exports = PC;
  });
  var ra = c((aH, Up) => {
    var qC = Dn(),
      FC = Te();
    function MC(e, t, r) {
      var n = t(e);
      return FC(e) ? n : qC(n, r(e));
    }
    Up.exports = MC;
  });
  var Bp = c((sH, Vp) => {
    function DC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var s = e[r];
        t(s, r, e) && (o[i++] = s);
      }
      return o;
    }
    Vp.exports = DC;
  });
  var na = c((uH, Wp) => {
    function kC() {
      return [];
    }
    Wp.exports = kC;
  });
  var ia = c((cH, Xp) => {
    var GC = Bp(),
      UC = na(),
      VC = Object.prototype,
      BC = VC.propertyIsEnumerable,
      Hp = Object.getOwnPropertySymbols,
      WC = Hp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                GC(Hp(e), function (t) {
                  return BC.call(e, t);
                }));
          }
        : UC;
    Xp.exports = WC;
  });
  var zp = c((lH, jp) => {
    function HC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    jp.exports = HC;
  });
  var Yp = c((fH, Kp) => {
    var XC = Tt(),
      jC = pt(),
      zC = "[object Arguments]";
    function KC(e) {
      return jC(e) && XC(e) == zC;
    }
    Kp.exports = KC;
  });
  var Dr = c((dH, Zp) => {
    var $p = Yp(),
      YC = pt(),
      Qp = Object.prototype,
      $C = Qp.hasOwnProperty,
      QC = Qp.propertyIsEnumerable,
      ZC = $p(
        (function () {
          return arguments;
        })()
      )
        ? $p
        : function (e) {
            return YC(e) && $C.call(e, "callee") && !QC.call(e, "callee");
          };
    Zp.exports = ZC;
  });
  var eg = c((pH, Jp) => {
    function JC() {
      return !1;
    }
    Jp.exports = JC;
  });
  var kn = c((kr, tr) => {
    var eR = Ke(),
      tR = eg(),
      ng = typeof kr == "object" && kr && !kr.nodeType && kr,
      tg = ng && typeof tr == "object" && tr && !tr.nodeType && tr,
      rR = tg && tg.exports === ng,
      rg = rR ? eR.Buffer : void 0,
      nR = rg ? rg.isBuffer : void 0,
      iR = nR || tR;
    tr.exports = iR;
  });
  var Gn = c((gH, ig) => {
    var oR = 9007199254740991,
      aR = /^(?:0|[1-9]\d*)$/;
    function sR(e, t) {
      var r = typeof e;
      return (
        (t = t ?? oR),
        !!t &&
          (r == "number" || (r != "symbol" && aR.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    ig.exports = sR;
  });
  var Un = c((vH, og) => {
    var uR = 9007199254740991;
    function cR(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= uR;
    }
    og.exports = cR;
  });
  var sg = c((hH, ag) => {
    var lR = Tt(),
      fR = Un(),
      dR = pt(),
      pR = "[object Arguments]",
      gR = "[object Array]",
      vR = "[object Boolean]",
      hR = "[object Date]",
      yR = "[object Error]",
      ER = "[object Function]",
      mR = "[object Map]",
      _R = "[object Number]",
      bR = "[object Object]",
      TR = "[object RegExp]",
      IR = "[object Set]",
      wR = "[object String]",
      OR = "[object WeakMap]",
      AR = "[object ArrayBuffer]",
      xR = "[object DataView]",
      SR = "[object Float32Array]",
      CR = "[object Float64Array]",
      RR = "[object Int8Array]",
      LR = "[object Int16Array]",
      NR = "[object Int32Array]",
      PR = "[object Uint8Array]",
      qR = "[object Uint8ClampedArray]",
      FR = "[object Uint16Array]",
      MR = "[object Uint32Array]",
      pe = {};
    pe[SR] =
      pe[CR] =
      pe[RR] =
      pe[LR] =
      pe[NR] =
      pe[PR] =
      pe[qR] =
      pe[FR] =
      pe[MR] =
        !0;
    pe[pR] =
      pe[gR] =
      pe[AR] =
      pe[vR] =
      pe[xR] =
      pe[hR] =
      pe[yR] =
      pe[ER] =
      pe[mR] =
      pe[_R] =
      pe[bR] =
      pe[TR] =
      pe[IR] =
      pe[wR] =
      pe[OR] =
        !1;
    function DR(e) {
      return dR(e) && fR(e.length) && !!pe[lR(e)];
    }
    ag.exports = DR;
  });
  var cg = c((yH, ug) => {
    function kR(e) {
      return function (t) {
        return e(t);
      };
    }
    ug.exports = kR;
  });
  var fg = c((Gr, rr) => {
    var GR = Ro(),
      lg = typeof Gr == "object" && Gr && !Gr.nodeType && Gr,
      Ur = lg && typeof rr == "object" && rr && !rr.nodeType && rr,
      UR = Ur && Ur.exports === lg,
      oa = UR && GR.process,
      VR = (function () {
        try {
          var e = Ur && Ur.require && Ur.require("util").types;
          return e || (oa && oa.binding && oa.binding("util"));
        } catch {}
      })();
    rr.exports = VR;
  });
  var Vn = c((EH, gg) => {
    var BR = sg(),
      WR = cg(),
      dg = fg(),
      pg = dg && dg.isTypedArray,
      HR = pg ? WR(pg) : BR;
    gg.exports = HR;
  });
  var aa = c((mH, vg) => {
    var XR = zp(),
      jR = Dr(),
      zR = Te(),
      KR = kn(),
      YR = Gn(),
      $R = Vn(),
      QR = Object.prototype,
      ZR = QR.hasOwnProperty;
    function JR(e, t) {
      var r = zR(e),
        n = !r && jR(e),
        i = !r && !n && KR(e),
        o = !r && !n && !i && $R(e),
        s = r || n || i || o,
        a = s ? XR(e.length, String) : [],
        u = a.length;
      for (var f in e)
        (t || ZR.call(e, f)) &&
          !(
            s &&
            (f == "length" ||
              (i && (f == "offset" || f == "parent")) ||
              (o &&
                (f == "buffer" || f == "byteLength" || f == "byteOffset")) ||
              YR(f, u))
          ) &&
          a.push(f);
      return a;
    }
    vg.exports = JR;
  });
  var Bn = c((_H, hg) => {
    var eL = Object.prototype;
    function tL(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || eL;
      return e === r;
    }
    hg.exports = tL;
  });
  var Eg = c((bH, yg) => {
    var rL = Lo(),
      nL = rL(Object.keys, Object);
    yg.exports = nL;
  });
  var Wn = c((TH, mg) => {
    var iL = Bn(),
      oL = Eg(),
      aL = Object.prototype,
      sL = aL.hasOwnProperty;
    function uL(e) {
      if (!iL(e)) return oL(e);
      var t = [];
      for (var r in Object(e)) sL.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    mg.exports = uL;
  });
  var Pt = c((IH, _g) => {
    var cL = $o(),
      lL = Un();
    function fL(e) {
      return e != null && lL(e.length) && !cL(e);
    }
    _g.exports = fL;
  });
  var Vr = c((wH, bg) => {
    var dL = aa(),
      pL = Wn(),
      gL = Pt();
    function vL(e) {
      return gL(e) ? dL(e) : pL(e);
    }
    bg.exports = vL;
  });
  var Ig = c((OH, Tg) => {
    var hL = ra(),
      yL = ia(),
      EL = Vr();
    function mL(e) {
      return hL(e, EL, yL);
    }
    Tg.exports = mL;
  });
  var Ag = c((AH, Og) => {
    var wg = Ig(),
      _L = 1,
      bL = Object.prototype,
      TL = bL.hasOwnProperty;
    function IL(e, t, r, n, i, o) {
      var s = r & _L,
        a = wg(e),
        u = a.length,
        f = wg(t),
        h = f.length;
      if (u != h && !s) return !1;
      for (var g = u; g--; ) {
        var v = a[g];
        if (!(s ? v in t : TL.call(t, v))) return !1;
      }
      var _ = o.get(e),
        w = o.get(t);
      if (_ && w) return _ == t && w == e;
      var T = !0;
      o.set(e, t), o.set(t, e);
      for (var S = s; ++g < u; ) {
        v = a[g];
        var I = e[v],
          N = t[v];
        if (n) var R = s ? n(N, I, v, t, e, o) : n(I, N, v, e, t, o);
        if (!(R === void 0 ? I === N || i(I, N, r, n, o) : R)) {
          T = !1;
          break;
        }
        S || (S = v == "constructor");
      }
      if (T && !S) {
        var M = e.constructor,
          D = t.constructor;
        M != D &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof M == "function" &&
            M instanceof M &&
            typeof D == "function" &&
            D instanceof D
          ) &&
          (T = !1);
      }
      return o.delete(e), o.delete(t), T;
    }
    Og.exports = IL;
  });
  var Sg = c((xH, xg) => {
    var wL = It(),
      OL = Ke(),
      AL = wL(OL, "DataView");
    xg.exports = AL;
  });
  var Rg = c((SH, Cg) => {
    var xL = It(),
      SL = Ke(),
      CL = xL(SL, "Promise");
    Cg.exports = CL;
  });
  var Ng = c((CH, Lg) => {
    var RL = It(),
      LL = Ke(),
      NL = RL(LL, "Set");
    Lg.exports = NL;
  });
  var sa = c((RH, Pg) => {
    var PL = It(),
      qL = Ke(),
      FL = PL(qL, "WeakMap");
    Pg.exports = FL;
  });
  var Hn = c((LH, Ug) => {
    var ua = Sg(),
      ca = qn(),
      la = Rg(),
      fa = Ng(),
      da = sa(),
      Gg = Tt(),
      nr = Zo(),
      qg = "[object Map]",
      ML = "[object Object]",
      Fg = "[object Promise]",
      Mg = "[object Set]",
      Dg = "[object WeakMap]",
      kg = "[object DataView]",
      DL = nr(ua),
      kL = nr(ca),
      GL = nr(la),
      UL = nr(fa),
      VL = nr(da),
      qt = Gg;
    ((ua && qt(new ua(new ArrayBuffer(1))) != kg) ||
      (ca && qt(new ca()) != qg) ||
      (la && qt(la.resolve()) != Fg) ||
      (fa && qt(new fa()) != Mg) ||
      (da && qt(new da()) != Dg)) &&
      (qt = function (e) {
        var t = Gg(e),
          r = t == ML ? e.constructor : void 0,
          n = r ? nr(r) : "";
        if (n)
          switch (n) {
            case DL:
              return kg;
            case kL:
              return qg;
            case GL:
              return Fg;
            case UL:
              return Mg;
            case VL:
              return Dg;
          }
        return t;
      });
    Ug.exports = qt;
  });
  var Kg = c((NH, zg) => {
    var pa = Jo(),
      BL = ea(),
      WL = Dp(),
      HL = Ag(),
      Vg = Hn(),
      Bg = Te(),
      Wg = kn(),
      XL = Vn(),
      jL = 1,
      Hg = "[object Arguments]",
      Xg = "[object Array]",
      Xn = "[object Object]",
      zL = Object.prototype,
      jg = zL.hasOwnProperty;
    function KL(e, t, r, n, i, o) {
      var s = Bg(e),
        a = Bg(t),
        u = s ? Xg : Vg(e),
        f = a ? Xg : Vg(t);
      (u = u == Hg ? Xn : u), (f = f == Hg ? Xn : f);
      var h = u == Xn,
        g = f == Xn,
        v = u == f;
      if (v && Wg(e)) {
        if (!Wg(t)) return !1;
        (s = !0), (h = !1);
      }
      if (v && !h)
        return (
          o || (o = new pa()),
          s || XL(e) ? BL(e, t, r, n, i, o) : WL(e, t, u, r, n, i, o)
        );
      if (!(r & jL)) {
        var _ = h && jg.call(e, "__wrapped__"),
          w = g && jg.call(t, "__wrapped__");
        if (_ || w) {
          var T = _ ? e.value() : e,
            S = w ? t.value() : t;
          return o || (o = new pa()), i(T, S, r, n, o);
        }
      }
      return v ? (o || (o = new pa()), HL(e, t, r, n, i, o)) : !1;
    }
    zg.exports = KL;
  });
  var ga = c((PH, Qg) => {
    var YL = Kg(),
      Yg = pt();
    function $g(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Yg(e) && !Yg(t))
        ? e !== e && t !== t
        : YL(e, t, r, n, $g, i);
    }
    Qg.exports = $g;
  });
  var Jg = c((qH, Zg) => {
    var $L = Jo(),
      QL = ga(),
      ZL = 1,
      JL = 2;
    function eN(e, t, r, n) {
      var i = r.length,
        o = i,
        s = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = r[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = r[i];
        var u = a[0],
          f = e[u],
          h = a[1];
        if (s && a[2]) {
          if (f === void 0 && !(u in e)) return !1;
        } else {
          var g = new $L();
          if (n) var v = n(f, h, u, e, t, g);
          if (!(v === void 0 ? QL(h, f, ZL | JL, n, g) : v)) return !1;
        }
      }
      return !0;
    }
    Zg.exports = eN;
  });
  var va = c((FH, ev) => {
    var tN = at();
    function rN(e) {
      return e === e && !tN(e);
    }
    ev.exports = rN;
  });
  var rv = c((MH, tv) => {
    var nN = va(),
      iN = Vr();
    function oN(e) {
      for (var t = iN(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, nN(i)];
      }
      return t;
    }
    tv.exports = oN;
  });
  var ha = c((DH, nv) => {
    function aN(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    nv.exports = aN;
  });
  var ov = c((kH, iv) => {
    var sN = Jg(),
      uN = rv(),
      cN = ha();
    function lN(e) {
      var t = uN(e);
      return t.length == 1 && t[0][2]
        ? cN(t[0][0], t[0][1])
        : function (r) {
            return r === e || sN(r, e, t);
          };
    }
    iv.exports = lN;
  });
  var Br = c((GH, av) => {
    var fN = Tt(),
      dN = pt(),
      pN = "[object Symbol]";
    function gN(e) {
      return typeof e == "symbol" || (dN(e) && fN(e) == pN);
    }
    av.exports = gN;
  });
  var jn = c((UH, sv) => {
    var vN = Te(),
      hN = Br(),
      yN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      EN = /^\w*$/;
    function mN(e, t) {
      if (vN(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        hN(e)
        ? !0
        : EN.test(e) || !yN.test(e) || (t != null && e in Object(t));
    }
    sv.exports = mN;
  });
  var lv = c((VH, cv) => {
    var uv = Fn(),
      _N = "Expected a function";
    function ya(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(_N);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, n);
        return (r.cache = o.set(i, s) || o), s;
      };
      return (r.cache = new (ya.Cache || uv)()), r;
    }
    ya.Cache = uv;
    cv.exports = ya;
  });
  var dv = c((BH, fv) => {
    var bN = lv(),
      TN = 500;
    function IN(e) {
      var t = bN(e, function (n) {
          return r.size === TN && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    fv.exports = IN;
  });
  var gv = c((WH, pv) => {
    var wN = dv(),
      ON =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      AN = /\\(\\)?/g,
      xN = wN(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(ON, function (r, n, i, o) {
            t.push(i ? o.replace(AN, "$1") : n || r);
          }),
          t
        );
      });
    pv.exports = xN;
  });
  var Ea = c((HH, vv) => {
    function SN(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    vv.exports = SN;
  });
  var bv = c((XH, _v) => {
    var hv = zt(),
      CN = Ea(),
      RN = Te(),
      LN = Br(),
      NN = 1 / 0,
      yv = hv ? hv.prototype : void 0,
      Ev = yv ? yv.toString : void 0;
    function mv(e) {
      if (typeof e == "string") return e;
      if (RN(e)) return CN(e, mv) + "";
      if (LN(e)) return Ev ? Ev.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -NN ? "-0" : t;
    }
    _v.exports = mv;
  });
  var Iv = c((jH, Tv) => {
    var PN = bv();
    function qN(e) {
      return e == null ? "" : PN(e);
    }
    Tv.exports = qN;
  });
  var Wr = c((zH, wv) => {
    var FN = Te(),
      MN = jn(),
      DN = gv(),
      kN = Iv();
    function GN(e, t) {
      return FN(e) ? e : MN(e, t) ? [e] : DN(kN(e));
    }
    wv.exports = GN;
  });
  var ir = c((KH, Ov) => {
    var UN = Br(),
      VN = 1 / 0;
    function BN(e) {
      if (typeof e == "string" || UN(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -VN ? "-0" : t;
    }
    Ov.exports = BN;
  });
  var zn = c((YH, Av) => {
    var WN = Wr(),
      HN = ir();
    function XN(e, t) {
      t = WN(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[HN(t[r++])];
      return r && r == n ? e : void 0;
    }
    Av.exports = XN;
  });
  var Kn = c(($H, xv) => {
    var jN = zn();
    function zN(e, t, r) {
      var n = e == null ? void 0 : jN(e, t);
      return n === void 0 ? r : n;
    }
    xv.exports = zN;
  });
  var Cv = c((QH, Sv) => {
    function KN(e, t) {
      return e != null && t in Object(e);
    }
    Sv.exports = KN;
  });
  var Lv = c((ZH, Rv) => {
    var YN = Wr(),
      $N = Dr(),
      QN = Te(),
      ZN = Gn(),
      JN = Un(),
      eP = ir();
    function tP(e, t, r) {
      t = YN(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var s = eP(t[n]);
        if (!(o = e != null && r(e, s))) break;
        e = e[s];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && JN(i) && ZN(s, i) && (QN(e) || $N(e)));
    }
    Rv.exports = tP;
  });
  var Pv = c((JH, Nv) => {
    var rP = Cv(),
      nP = Lv();
    function iP(e, t) {
      return e != null && nP(e, t, rP);
    }
    Nv.exports = iP;
  });
  var Fv = c((eX, qv) => {
    var oP = ga(),
      aP = Kn(),
      sP = Pv(),
      uP = jn(),
      cP = va(),
      lP = ha(),
      fP = ir(),
      dP = 1,
      pP = 2;
    function gP(e, t) {
      return uP(e) && cP(t)
        ? lP(fP(e), t)
        : function (r) {
            var n = aP(r, e);
            return n === void 0 && n === t ? sP(r, e) : oP(t, n, dP | pP);
          };
    }
    qv.exports = gP;
  });
  var Yn = c((tX, Mv) => {
    function vP(e) {
      return e;
    }
    Mv.exports = vP;
  });
  var ma = c((rX, Dv) => {
    function hP(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Dv.exports = hP;
  });
  var Gv = c((nX, kv) => {
    var yP = zn();
    function EP(e) {
      return function (t) {
        return yP(t, e);
      };
    }
    kv.exports = EP;
  });
  var Vv = c((iX, Uv) => {
    var mP = ma(),
      _P = Gv(),
      bP = jn(),
      TP = ir();
    function IP(e) {
      return bP(e) ? mP(TP(e)) : _P(e);
    }
    Uv.exports = IP;
  });
  var wt = c((oX, Bv) => {
    var wP = ov(),
      OP = Fv(),
      AP = Yn(),
      xP = Te(),
      SP = Vv();
    function CP(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? AP
        : typeof e == "object"
        ? xP(e)
          ? OP(e[0], e[1])
          : wP(e)
        : SP(e);
    }
    Bv.exports = CP;
  });
  var _a = c((aX, Wv) => {
    var RP = wt(),
      LP = Pt(),
      NP = Vr();
    function PP(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!LP(t)) {
          var o = RP(r, 3);
          (t = NP(t)),
            (r = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, r, n);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Wv.exports = PP;
  });
  var ba = c((sX, Hv) => {
    function qP(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Hv.exports = qP;
  });
  var jv = c((uX, Xv) => {
    var FP = /\s/;
    function MP(e) {
      for (var t = e.length; t-- && FP.test(e.charAt(t)); );
      return t;
    }
    Xv.exports = MP;
  });
  var Kv = c((cX, zv) => {
    var DP = jv(),
      kP = /^\s+/;
    function GP(e) {
      return e && e.slice(0, DP(e) + 1).replace(kP, "");
    }
    zv.exports = GP;
  });
  var $n = c((lX, Qv) => {
    var UP = Kv(),
      Yv = at(),
      VP = Br(),
      $v = 0 / 0,
      BP = /^[-+]0x[0-9a-f]+$/i,
      WP = /^0b[01]+$/i,
      HP = /^0o[0-7]+$/i,
      XP = parseInt;
    function jP(e) {
      if (typeof e == "number") return e;
      if (VP(e)) return $v;
      if (Yv(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Yv(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = UP(e);
      var r = WP.test(e);
      return r || HP.test(e) ? XP(e.slice(2), r ? 2 : 8) : BP.test(e) ? $v : +e;
    }
    Qv.exports = jP;
  });
  var eh = c((fX, Jv) => {
    var zP = $n(),
      Zv = 1 / 0,
      KP = 17976931348623157e292;
    function YP(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = zP(e)), e === Zv || e === -Zv)) {
        var t = e < 0 ? -1 : 1;
        return t * KP;
      }
      return e === e ? e : 0;
    }
    Jv.exports = YP;
  });
  var Ta = c((dX, th) => {
    var $P = eh();
    function QP(e) {
      var t = $P(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    th.exports = QP;
  });
  var nh = c((pX, rh) => {
    var ZP = ba(),
      JP = wt(),
      eq = Ta(),
      tq = Math.max;
    function rq(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : eq(r);
      return i < 0 && (i = tq(n + i, 0)), ZP(e, JP(t, 3), i);
    }
    rh.exports = rq;
  });
  var Ia = c((gX, ih) => {
    var nq = _a(),
      iq = nh(),
      oq = nq(iq);
    ih.exports = oq;
  });
  var sh = {};
  qe(sh, {
    ELEMENT_MATCHES: () => aq,
    FLEX_PREFIXED: () => wa,
    IS_BROWSER_ENV: () => $e,
    TRANSFORM_PREFIXED: () => Ot,
    TRANSFORM_STYLE_PREFIXED: () => Zn,
    withBrowser: () => Qn,
  });
  var ah,
    $e,
    Qn,
    aq,
    wa,
    Ot,
    oh,
    Zn,
    Jn = ge(() => {
      "use strict";
      (ah = se(Ia())),
        ($e = typeof window < "u"),
        (Qn = (e, t) => ($e ? e() : t)),
        (aq = Qn(() =>
          (0, ah.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (wa = Qn(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            r = "";
          try {
            let { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return r;
          } catch {
            return r;
          }
        }, "flex")),
        (Ot = Qn(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              r = "Transform",
              { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i] + r;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (oh = Ot.split("transform")[0]),
        (Zn = oh ? oh + "TransformStyle" : "transformStyle");
    });
  var Oa = c((vX, dh) => {
    var sq = 4,
      uq = 0.001,
      cq = 1e-7,
      lq = 10,
      Hr = 11,
      ei = 1 / (Hr - 1),
      fq = typeof Float32Array == "function";
    function uh(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function ch(e, t) {
      return 3 * t - 6 * e;
    }
    function lh(e) {
      return 3 * e;
    }
    function ti(e, t, r) {
      return ((uh(t, r) * e + ch(t, r)) * e + lh(t)) * e;
    }
    function fh(e, t, r) {
      return 3 * uh(t, r) * e * e + 2 * ch(t, r) * e + lh(t);
    }
    function dq(e, t, r, n, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (r - t) / 2), (o = ti(s, n, i) - e), o > 0 ? (r = s) : (t = s);
      while (Math.abs(o) > cq && ++a < lq);
      return s;
    }
    function pq(e, t, r, n) {
      for (var i = 0; i < sq; ++i) {
        var o = fh(t, r, n);
        if (o === 0) return t;
        var s = ti(t, r, n) - e;
        t -= s / o;
      }
      return t;
    }
    dh.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = fq ? new Float32Array(Hr) : new Array(Hr);
      if (t !== r || n !== i)
        for (var s = 0; s < Hr; ++s) o[s] = ti(s * ei, t, n);
      function a(u) {
        for (var f = 0, h = 1, g = Hr - 1; h !== g && o[h] <= u; ++h) f += ei;
        --h;
        var v = (u - o[h]) / (o[h + 1] - o[h]),
          _ = f + v * ei,
          w = fh(_, t, n);
        return w >= uq ? pq(u, _, t, n) : w === 0 ? _ : dq(u, f, f + ei, t, n);
      }
      return function (f) {
        return t === r && n === i
          ? f
          : f === 0
          ? 0
          : f === 1
          ? 1
          : ti(a(f), r, i);
      };
    };
  });
  var jr = {};
  qe(jr, {
    bounce: () => Yq,
    bouncePast: () => $q,
    ease: () => gq,
    easeIn: () => vq,
    easeInOut: () => yq,
    easeOut: () => hq,
    inBack: () => Uq,
    inCirc: () => Mq,
    inCubic: () => bq,
    inElastic: () => Wq,
    inExpo: () => Pq,
    inOutBack: () => Bq,
    inOutCirc: () => kq,
    inOutCubic: () => Iq,
    inOutElastic: () => Xq,
    inOutExpo: () => Fq,
    inOutQuad: () => _q,
    inOutQuart: () => Aq,
    inOutQuint: () => Cq,
    inOutSine: () => Nq,
    inQuad: () => Eq,
    inQuart: () => wq,
    inQuint: () => xq,
    inSine: () => Rq,
    outBack: () => Vq,
    outBounce: () => Gq,
    outCirc: () => Dq,
    outCubic: () => Tq,
    outElastic: () => Hq,
    outExpo: () => qq,
    outQuad: () => mq,
    outQuart: () => Oq,
    outQuint: () => Sq,
    outSine: () => Lq,
    swingFrom: () => zq,
    swingFromTo: () => jq,
    swingTo: () => Kq,
  });
  function Eq(e) {
    return Math.pow(e, 2);
  }
  function mq(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function _q(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function bq(e) {
    return Math.pow(e, 3);
  }
  function Tq(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function Iq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function wq(e) {
    return Math.pow(e, 4);
  }
  function Oq(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function Aq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function xq(e) {
    return Math.pow(e, 5);
  }
  function Sq(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function Cq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function Rq(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function Lq(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function Nq(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function Pq(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function qq(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function Fq(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function Mq(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function Dq(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function kq(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function Gq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function Uq(e) {
    let t = gt;
    return e * e * ((t + 1) * e - t);
  }
  function Vq(e) {
    let t = gt;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function Bq(e) {
    let t = gt;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function Wq(e) {
    let t = gt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        -(
          n *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / r)
        ));
  }
  function Hq(e) {
    let t = gt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) + 1);
  }
  function Xq(e) {
    let t = gt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (r || (r = 0.3 * 1.5),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        e < 1
          ? -0.5 *
            (n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r))
          : n *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r) *
              0.5 +
            1);
  }
  function jq(e) {
    let t = gt;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function zq(e) {
    let t = gt;
    return e * e * ((t + 1) * e - t);
  }
  function Kq(e) {
    let t = gt;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function Yq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function $q(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var Xr,
    gt,
    gq,
    vq,
    hq,
    yq,
    Aa = ge(() => {
      "use strict";
      (Xr = se(Oa())),
        (gt = 1.70158),
        (gq = (0, Xr.default)(0.25, 0.1, 0.25, 1)),
        (vq = (0, Xr.default)(0.42, 0, 1, 1)),
        (hq = (0, Xr.default)(0, 0, 0.58, 1)),
        (yq = (0, Xr.default)(0.42, 0, 0.58, 1));
    });
  var gh = {};
  qe(gh, {
    applyEasing: () => Zq,
    createBezierEasing: () => Qq,
    optimizeFloat: () => zr,
  });
  function zr(e, t = 5, r = 10) {
    let n = Math.pow(r, t),
      i = Number(Math.round(e * n) / n);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function Qq(e) {
    return (0, ph.default)(...e);
  }
  function Zq(e, t, r) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : zr(r ? (t > 0 ? r(t) : t) : t > 0 && e && jr[e] ? jr[e](t) : t);
  }
  var ph,
    xa = ge(() => {
      "use strict";
      Aa();
      ph = se(Oa());
    });
  var yh = {};
  qe(yh, {
    createElementState: () => hh,
    ixElements: () => dF,
    mergeActionState: () => Sa,
  });
  function hh(e, t, r, n, i) {
    let o =
      r === Jq ? (0, or.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, or.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
  }
  function Sa(e, t, r, n, i) {
    let o = gF(i);
    return (0, or.mergeIn)(e, [t, fF, r], n, o);
  }
  function gF(e) {
    let { config: t } = e;
    return pF.reduce((r, n) => {
      let i = n[0],
        o = n[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (r[o] = a), r;
    }, {});
  }
  var or,
    yX,
    Jq,
    EX,
    eF,
    tF,
    rF,
    nF,
    iF,
    oF,
    aF,
    sF,
    uF,
    cF,
    lF,
    vh,
    fF,
    dF,
    pF,
    Eh = ge(() => {
      "use strict";
      or = se($t());
      De();
      ({
        HTML_ELEMENT: yX,
        PLAIN_OBJECT: Jq,
        ABSTRACT_NODE: EX,
        CONFIG_X_VALUE: eF,
        CONFIG_Y_VALUE: tF,
        CONFIG_Z_VALUE: rF,
        CONFIG_VALUE: nF,
        CONFIG_X_UNIT: iF,
        CONFIG_Y_UNIT: oF,
        CONFIG_Z_UNIT: aF,
        CONFIG_UNIT: sF,
      } = Ae),
        ({
          IX2_SESSION_STOPPED: uF,
          IX2_INSTANCE_ADDED: cF,
          IX2_ELEMENT_STATE_CHANGED: lF,
        } = be),
        (vh = {}),
        (fF = "refState"),
        (dF = (e = vh, t = {}) => {
          switch (t.type) {
            case uF:
              return vh;
            case cF: {
              let {
                  elementId: r,
                  element: n,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, or.getIn)(u, [r, n]) !== n && (u = hh(u, n, s, r, o)),
                Sa(u, r, a, i, o)
              );
            }
            case lF: {
              let {
                elementId: r,
                actionTypeId: n,
                current: i,
                actionItem: o,
              } = t.payload;
              return Sa(e, r, n, i, o);
            }
            default:
              return e;
          }
        });
      pF = [
        [eF, iF],
        [tF, oF],
        [rF, aF],
        [nF, sF],
      ];
    });
  var mh = c((Ie) => {
    "use strict";
    Object.defineProperty(Ie, "__esModule", { value: !0 });
    Ie.renderPlugin =
      Ie.getPluginOrigin =
      Ie.getPluginDuration =
      Ie.getPluginDestination =
      Ie.getPluginConfig =
      Ie.createPluginInstance =
      Ie.clearPlugin =
        void 0;
    var vF = (e) => e.value;
    Ie.getPluginConfig = vF;
    var hF = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Ie.getPluginDuration = hF;
    var yF = (e) => e || { value: 0 };
    Ie.getPluginOrigin = yF;
    var EF = (e) => ({ value: e.value });
    Ie.getPluginDestination = EF;
    var mF = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Ie.createPluginInstance = mF;
    var _F = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Ie.renderPlugin = _F;
    var bF = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Ie.clearPlugin = bF;
  });
  var bh = c((we) => {
    "use strict";
    Object.defineProperty(we, "__esModule", { value: !0 });
    we.renderPlugin =
      we.getPluginOrigin =
      we.getPluginDuration =
      we.getPluginDestination =
      we.getPluginConfig =
      we.createPluginInstance =
      we.clearPlugin =
        void 0;
    var TF = (e) => document.querySelector(`[data-w-id="${e}"]`),
      IF = () => window.Webflow.require("spline"),
      wF = (e, t) => e.filter((r) => !t.includes(r)),
      OF = (e, t) => e.value[t];
    we.getPluginConfig = OF;
    var AF = () => null;
    we.getPluginDuration = AF;
    var _h = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      xF = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let o = Object.keys(e),
            s = wF(n, o);
          return s.length ? s.reduce((u, f) => ((u[f] = _h[f]), u), e) : e;
        }
        return n.reduce((o, s) => ((o[s] = _h[s]), o), {});
      };
    we.getPluginOrigin = xF;
    var SF = (e) => e.value;
    we.getPluginDestination = SF;
    var CF = (e, t) => {
      var r;
      let n =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (r = r.target) === null ||
        r === void 0
          ? void 0
          : r.pluginElement;
      return n ? TF(n) : null;
    };
    we.createPluginInstance = CF;
    var RF = (e, t, r) => {
      let n = IF(),
        i = n.getInstance(e),
        o = r.config.target.objectId,
        s = (a) => {
          if (!a) throw new Error("Invalid spline app passed to renderSpline");
          let u = o && a.findObjectById(o);
          if (!u) return;
          let { PLUGIN_SPLINE: f } = t;
          f.positionX != null && (u.position.x = f.positionX),
            f.positionY != null && (u.position.y = f.positionY),
            f.positionZ != null && (u.position.z = f.positionZ),
            f.rotationX != null && (u.rotation.x = f.rotationX),
            f.rotationY != null && (u.rotation.y = f.rotationY),
            f.rotationZ != null && (u.rotation.z = f.rotationZ),
            f.scaleX != null && (u.scale.x = f.scaleX),
            f.scaleY != null && (u.scale.y = f.scaleY),
            f.scaleZ != null && (u.scale.z = f.scaleZ);
        };
      i ? s(i.spline) : n.setLoadHandler(e, s);
    };
    we.renderPlugin = RF;
    var LF = () => null;
    we.clearPlugin = LF;
  });
  var Ra = c((Ca) => {
    "use strict";
    Object.defineProperty(Ca, "__esModule", { value: !0 });
    Ca.normalizeColor = NF;
    var Th = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function NF(e) {
      let t,
        r,
        n,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase(),
        a = (typeof Th[o] == "string" ? Th[o].toLowerCase() : null) || o;
      if (a.startsWith("#")) {
        let u = a.substring(1);
        u.length === 3
          ? ((t = parseInt(u[0] + u[0], 16)),
            (r = parseInt(u[1] + u[1], 16)),
            (n = parseInt(u[2] + u[2], 16)))
          : u.length === 6 &&
            ((t = parseInt(u.substring(0, 2), 16)),
            (r = parseInt(u.substring(2, 4), 16)),
            (n = parseInt(u.substring(4, 6), 16)));
      } else if (a.startsWith("rgba")) {
        let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (r = parseInt(u[1], 10)),
          (n = parseInt(u[2], 10)),
          (i = parseFloat(u[3]));
      } else if (a.startsWith("rgb")) {
        let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (r = parseInt(u[1], 10)),
          (n = parseInt(u[2], 10));
      } else if (a.startsWith("hsla")) {
        let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
          f = parseFloat(u[0]),
          h = parseFloat(u[1].replace("%", "")) / 100,
          g = parseFloat(u[2].replace("%", "")) / 100;
        i = parseFloat(u[3]);
        let v = (1 - Math.abs(2 * g - 1)) * h,
          _ = v * (1 - Math.abs(((f / 60) % 2) - 1)),
          w = g - v / 2,
          T,
          S,
          I;
        f >= 0 && f < 60
          ? ((T = v), (S = _), (I = 0))
          : f >= 60 && f < 120
          ? ((T = _), (S = v), (I = 0))
          : f >= 120 && f < 180
          ? ((T = 0), (S = v), (I = _))
          : f >= 180 && f < 240
          ? ((T = 0), (S = _), (I = v))
          : f >= 240 && f < 300
          ? ((T = _), (S = 0), (I = v))
          : ((T = v), (S = 0), (I = _)),
          (t = Math.round((T + w) * 255)),
          (r = Math.round((S + w) * 255)),
          (n = Math.round((I + w) * 255));
      } else if (a.startsWith("hsl")) {
        let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
          f = parseFloat(u[0]),
          h = parseFloat(u[1].replace("%", "")) / 100,
          g = parseFloat(u[2].replace("%", "")) / 100,
          v = (1 - Math.abs(2 * g - 1)) * h,
          _ = v * (1 - Math.abs(((f / 60) % 2) - 1)),
          w = g - v / 2,
          T,
          S,
          I;
        f >= 0 && f < 60
          ? ((T = v), (S = _), (I = 0))
          : f >= 60 && f < 120
          ? ((T = _), (S = v), (I = 0))
          : f >= 120 && f < 180
          ? ((T = 0), (S = v), (I = _))
          : f >= 180 && f < 240
          ? ((T = 0), (S = _), (I = v))
          : f >= 240 && f < 300
          ? ((T = _), (S = 0), (I = v))
          : ((T = v), (S = 0), (I = _)),
          (t = Math.round((T + w) * 255)),
          (r = Math.round((S + w) * 255)),
          (n = Math.round((I + w) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
        );
      return { red: t, green: r, blue: n, alpha: i };
    }
  });
  var Ih = c((Oe) => {
    "use strict";
    Object.defineProperty(Oe, "__esModule", { value: !0 });
    Oe.renderPlugin =
      Oe.getPluginOrigin =
      Oe.getPluginDuration =
      Oe.getPluginDestination =
      Oe.getPluginConfig =
      Oe.createPluginInstance =
      Oe.clearPlugin =
        void 0;
    var PF = Ra(),
      qF = (e, t) => e.value[t];
    Oe.getPluginConfig = qF;
    var FF = () => null;
    Oe.getPluginDuration = FF;
    var MF = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        i = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(i, 10) };
      if (r.red != null && r.green != null && r.blue != null)
        return (0, PF.normalizeColor)(i);
    };
    Oe.getPluginOrigin = MF;
    var DF = (e) => e.value;
    Oe.getPluginDestination = DF;
    var kF = () => null;
    Oe.createPluginInstance = kF;
    var GF = (e, t, r) => {
      let n = r.config.target.objectId,
        i = r.config.value.unit,
        { PLUGIN_VARIABLE: o } = t,
        { size: s, red: a, green: u, blue: f, alpha: h } = o,
        g;
      s != null && (g = s + i),
        a != null &&
          f != null &&
          u != null &&
          h != null &&
          (g = `rgba(${a}, ${u}, ${f}, ${h})`),
        g != null && document.documentElement.style.setProperty(n, g);
    };
    Oe.renderPlugin = GF;
    var UF = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
    Oe.clearPlugin = UF;
  });
  var wh = c((ri) => {
    "use strict";
    var Na = pn().default;
    Object.defineProperty(ri, "__esModule", { value: !0 });
    ri.pluginMethodMap = void 0;
    var La = (De(), tt(Rf)),
      VF = Na(mh()),
      BF = Na(bh()),
      WF = Na(Ih()),
      IX = (ri.pluginMethodMap = new Map([
        [La.ActionTypeConsts.PLUGIN_LOTTIE, { ...VF }],
        [La.ActionTypeConsts.PLUGIN_SPLINE, { ...BF }],
        [La.ActionTypeConsts.PLUGIN_VARIABLE, { ...WF }],
      ]));
  });
  var Oh = {};
  qe(Oh, {
    clearPlugin: () => ka,
    createPluginInstance: () => XF,
    getPluginConfig: () => qa,
    getPluginDestination: () => Ma,
    getPluginDuration: () => HF,
    getPluginOrigin: () => Fa,
    isPluginType: () => Ft,
    renderPlugin: () => Da,
  });
  function Ft(e) {
    return Pa.pluginMethodMap.has(e);
  }
  var Pa,
    Mt,
    qa,
    Fa,
    HF,
    Ma,
    XF,
    Da,
    ka,
    Ga = ge(() => {
      "use strict";
      Jn();
      Pa = se(wh());
      (Mt = (e) => (t) => {
        if (!$e) return () => null;
        let r = Pa.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      }),
        (qa = Mt("getPluginConfig")),
        (Fa = Mt("getPluginOrigin")),
        (HF = Mt("getPluginDuration")),
        (Ma = Mt("getPluginDestination")),
        (XF = Mt("createPluginInstance")),
        (Da = Mt("renderPlugin")),
        (ka = Mt("clearPlugin"));
    });
  var xh = c((AX, Ah) => {
    function jF(e, t) {
      return e == null || e !== e ? t : e;
    }
    Ah.exports = jF;
  });
  var Ch = c((xX, Sh) => {
    function zF(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    Sh.exports = zF;
  });
  var Lh = c((SX, Rh) => {
    function KF(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (r(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    Rh.exports = KF;
  });
  var Ph = c((CX, Nh) => {
    var YF = Lh(),
      $F = YF();
    Nh.exports = $F;
  });
  var Ua = c((RX, qh) => {
    var QF = Ph(),
      ZF = Vr();
    function JF(e, t) {
      return e && QF(e, t, ZF);
    }
    qh.exports = JF;
  });
  var Mh = c((LX, Fh) => {
    var eM = Pt();
    function tM(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!eM(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, s = Object(r);
          (t ? o-- : ++o < i) && n(s[o], o, s) !== !1;

        );
        return r;
      };
    }
    Fh.exports = tM;
  });
  var Va = c((NX, Dh) => {
    var rM = Ua(),
      nM = Mh(),
      iM = nM(rM);
    Dh.exports = iM;
  });
  var Gh = c((PX, kh) => {
    function oM(e, t, r, n, i) {
      return (
        i(e, function (o, s, a) {
          r = n ? ((n = !1), o) : t(r, o, s, a);
        }),
        r
      );
    }
    kh.exports = oM;
  });
  var Vh = c((qX, Uh) => {
    var aM = Ch(),
      sM = Va(),
      uM = wt(),
      cM = Gh(),
      lM = Te();
    function fM(e, t, r) {
      var n = lM(e) ? aM : cM,
        i = arguments.length < 3;
      return n(e, uM(t, 4), r, i, sM);
    }
    Uh.exports = fM;
  });
  var Wh = c((FX, Bh) => {
    var dM = ba(),
      pM = wt(),
      gM = Ta(),
      vM = Math.max,
      hM = Math.min;
    function yM(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = gM(r)), (i = r < 0 ? vM(n + i, 0) : hM(i, n - 1))),
        dM(e, pM(t, 3), i, !0)
      );
    }
    Bh.exports = yM;
  });
  var Xh = c((MX, Hh) => {
    var EM = _a(),
      mM = Wh(),
      _M = EM(mM);
    Hh.exports = _M;
  });
  function jh(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function bM(e, t) {
    if (jh(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (let i = 0; i < r.length; i++)
      if (!Object.hasOwn(t, r[i]) || !jh(e[r[i]], t[r[i]])) return !1;
    return !0;
  }
  var Ba,
    zh = ge(() => {
      "use strict";
      Ba = bM;
    });
  var fy = {};
  qe(fy, {
    cleanupHTMLElement: () => E1,
    clearAllStyles: () => y1,
    clearObjectCache: () => kM,
    getActionListProgress: () => _1,
    getAffectedElements: () => za,
    getComputedStyle: () => jM,
    getDestinationValues: () => JM,
    getElementId: () => BM,
    getInstanceId: () => UM,
    getInstanceOrigin: () => YM,
    getItemConfigByKey: () => ZM,
    getMaxDurationItemIndex: () => ly,
    getNamespacedParameterId: () => I1,
    getRenderType: () => sy,
    getStyleProp: () => e1,
    mediaQueriesEqual: () => O1,
    observeStore: () => XM,
    reduceListToGroup: () => b1,
    reifyState: () => WM,
    renderHTMLElement: () => t1,
    shallowEqual: () => Ba,
    shouldAllowMediaQuery: () => w1,
    shouldNamespaceEventParameter: () => T1,
    stringifyTarget: () => A1,
  });
  function kM() {
    ni.clear();
  }
  function UM() {
    return "i" + GM++;
  }
  function BM(e, t) {
    for (let r in e) {
      let n = e[r];
      if (n && n.ref === t) return n.id;
    }
    return "e" + VM++;
  }
  function WM({ events: e, actionLists: t, site: r } = {}) {
    let n = (0, si.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = r && r.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function XM({ store: e, select: t, onChange: r, comparator: n = HM }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let f = t(i());
      if (f == null) {
        s();
        return;
      }
      n(f, a) || ((a = f), r(a, e));
    }
    return s;
  }
  function $h(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function za({
    config: e,
    event: t,
    eventTarget: r,
    elementRoot: n,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (x, y) =>
          x.concat(
            za({
              config: { target: y },
              event: t,
              eventTarget: r,
              elementRoot: n,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: f,
        getSiblingElements: h,
        matchSelector: g,
        elementContains: v,
        isSiblingNode: _,
      } = i,
      { target: w } = e;
    if (!w) return [];
    let {
      id: T,
      objectId: S,
      selector: I,
      selectorGuids: N,
      appliesTo: R,
      useEventTarget: M,
    } = $h(w);
    if (S) return [ni.has(S) ? ni.get(S) : ni.set(S, {}).get(S)];
    if (R === jo.PAGE) {
      let x = s(T);
      return x ? [x] : [];
    }
    let F = (t?.action?.config?.affectedElements ?? {})[T || I] || {},
      X = !!(F.id || F.selector),
      z,
      K,
      Y,
      B = t && a($h(t.target));
    if (
      (X
        ? ((z = F.limitAffectedElements), (K = B), (Y = a(F)))
        : (K = Y = a({ id: T, selector: I, selectorGuids: N })),
      t && M)
    ) {
      let x = r && (Y || M === !0) ? [r] : u(B);
      if (Y) {
        if (M === FM) return u(Y).filter((y) => x.some((P) => v(y, P)));
        if (M === Kh) return u(Y).filter((y) => x.some((P) => v(P, y)));
        if (M === Yh) return u(Y).filter((y) => x.some((P) => _(P, y)));
      }
      return x;
    }
    return K == null || Y == null
      ? []
      : $e && n
      ? u(Y).filter((x) => n.contains(x))
      : z === Kh
      ? u(K, Y)
      : z === qM
      ? f(u(K)).filter(g(Y))
      : z === Yh
      ? h(u(K)).filter(g(Y))
      : u(Y);
  }
  function jM({ element: e, actionItem: t }) {
    if (!$e) return {};
    let { actionTypeId: r } = t;
    switch (r) {
      case lr:
      case fr:
      case dr:
      case pr:
      case ci:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function YM(e, t = {}, r = {}, n, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = n;
    if (Ft(s)) return Fa(s)(t[s], n);
    switch (n.actionTypeId) {
      case sr:
      case ur:
      case cr:
      case Qr:
        return t[n.actionTypeId] || Ka[n.actionTypeId];
      case Zr:
        return zM(t[n.actionTypeId], n.config.filters);
      case Jr:
        return KM(t[n.actionTypeId], n.config.fontVariations);
      case iy:
        return { value: (0, vt.default)(parseFloat(o(e, oi)), 1) };
      case lr: {
        let a = o(e, st),
          u = o(e, ut),
          f,
          h;
        return (
          n.config.widthUnit === At
            ? (f = Qh.test(a) ? parseFloat(a) : parseFloat(r.width))
            : (f = (0, vt.default)(parseFloat(a), parseFloat(r.width))),
          n.config.heightUnit === At
            ? (h = Qh.test(u) ? parseFloat(u) : parseFloat(r.height))
            : (h = (0, vt.default)(parseFloat(u), parseFloat(r.height))),
          { widthValue: f, heightValue: h }
        );
      }
      case fr:
      case dr:
      case pr:
        return g1({
          element: e,
          actionTypeId: n.actionTypeId,
          computedStyle: r,
          getStyle: o,
        });
      case ci:
        return { value: (0, vt.default)(o(e, ai), r.display) };
      case DM:
        return t[n.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function JM({ element: e, actionItem: t, elementApi: r }) {
    if (Ft(t.actionTypeId)) return Ma(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case sr:
      case ur:
      case cr:
      case Qr: {
        let { xValue: n, yValue: i, zValue: o } = t.config;
        return { xValue: n, yValue: i, zValue: o };
      }
      case lr: {
        let { getStyle: n, setStyle: i, getProperty: o } = r,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: f } = t.config;
        if (!$e) return { widthValue: u, heightValue: f };
        if (s === At) {
          let h = n(e, st);
          i(e, st, ""), (u = o(e, "offsetWidth")), i(e, st, h);
        }
        if (a === At) {
          let h = n(e, ut);
          i(e, ut, ""), (f = o(e, "offsetHeight")), i(e, ut, h);
        }
        return { widthValue: u, heightValue: f };
      }
      case fr:
      case dr:
      case pr: {
        let {
          rValue: n,
          gValue: i,
          bValue: o,
          aValue: s,
          globalSwatchId: a,
        } = t.config;
        if (a && a.startsWith("--")) {
          let { getStyle: u } = r,
            f = u(e, a),
            h = (0, ey.normalizeColor)(f);
          return {
            rValue: h.red,
            gValue: h.green,
            bValue: h.blue,
            aValue: h.alpha,
          };
        }
        return { rValue: n, gValue: i, bValue: o, aValue: s };
      }
      case Zr:
        return t.config.filters.reduce($M, {});
      case Jr:
        return t.config.fontVariations.reduce(QM, {});
      default: {
        let { value: n } = t.config;
        return { value: n };
      }
    }
  }
  function sy(e) {
    if (/^TRANSFORM_/.test(e)) return ry;
    if (/^STYLE_/.test(e)) return Xa;
    if (/^GENERAL_/.test(e)) return Ha;
    if (/^PLUGIN_/.test(e)) return ny;
  }
  function e1(e, t) {
    return e === Xa ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function t1(e, t, r, n, i, o, s, a, u) {
    switch (a) {
      case ry:
        return a1(e, t, r, i, s);
      case Xa:
        return v1(e, t, r, i, o, s);
      case Ha:
        return h1(e, i, s);
      case ny: {
        let { actionTypeId: f } = i;
        if (Ft(f)) return Da(f)(u, t, i);
      }
    }
  }
  function a1(e, t, r, n, i) {
    let o = o1
        .map((a) => {
          let u = Ka[a],
            {
              xValue: f = u.xValue,
              yValue: h = u.yValue,
              zValue: g = u.zValue,
              xUnit: v = "",
              yUnit: _ = "",
              zUnit: w = "",
            } = t[a] || {};
          switch (a) {
            case sr:
              return `${wM}(${f}${v}, ${h}${_}, ${g}${w})`;
            case ur:
              return `${OM}(${f}${v}, ${h}${_}, ${g}${w})`;
            case cr:
              return `${AM}(${f}${v}) ${xM}(${h}${_}) ${SM}(${g}${w})`;
            case Qr:
              return `${CM}(${f}${v}, ${h}${_})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: s } = i;
    Dt(e, Ot, i), s(e, Ot, o), c1(n, r) && s(e, Zn, RM);
  }
  function s1(e, t, r, n) {
    let i = (0, si.default)(t, (s, a, u) => `${s} ${u}(${a}${i1(u, r)})`, ""),
      { setStyle: o } = n;
    Dt(e, Kr, n), o(e, Kr, i);
  }
  function u1(e, t, r, n) {
    let i = (0, si.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = n;
    Dt(e, Yr, n), o(e, Yr, i);
  }
  function c1({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
    return (
      (e === sr && n !== void 0) ||
      (e === ur && n !== void 0) ||
      (e === cr && (t !== void 0 || r !== void 0))
    );
  }
  function p1(e, t) {
    let r = e.exec(t);
    return r ? r[1] : "";
  }
  function g1({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
    let i = ja[t],
      o = n(e, i),
      s = f1.test(o) ? o : r[i],
      a = p1(d1, s).split($r);
    return {
      rValue: (0, vt.default)(parseInt(a[0], 10), 255),
      gValue: (0, vt.default)(parseInt(a[1], 10), 255),
      bValue: (0, vt.default)(parseInt(a[2], 10), 255),
      aValue: (0, vt.default)(parseFloat(a[3]), 1),
    };
  }
  function v1(e, t, r, n, i, o) {
    let { setStyle: s } = o;
    switch (n.actionTypeId) {
      case lr: {
        let { widthUnit: a = "", heightUnit: u = "" } = n.config,
          { widthValue: f, heightValue: h } = r;
        f !== void 0 && (a === At && (a = "px"), Dt(e, st, o), s(e, st, f + a)),
          h !== void 0 &&
            (u === At && (u = "px"), Dt(e, ut, o), s(e, ut, h + u));
        break;
      }
      case Zr: {
        s1(e, r, n.config, o);
        break;
      }
      case Jr: {
        u1(e, r, n.config, o);
        break;
      }
      case fr:
      case dr:
      case pr: {
        let a = ja[n.actionTypeId],
          u = Math.round(r.rValue),
          f = Math.round(r.gValue),
          h = Math.round(r.bValue),
          g = r.aValue;
        Dt(e, a, o),
          s(e, a, g >= 1 ? `rgb(${u},${f},${h})` : `rgba(${u},${f},${h},${g})`);
        break;
      }
      default: {
        let { unit: a = "" } = n.config;
        Dt(e, i, o), s(e, i, r.value + a);
        break;
      }
    }
  }
  function h1(e, t, r) {
    let { setStyle: n } = r;
    switch (t.actionTypeId) {
      case ci: {
        let { value: i } = t.config;
        i === LM && $e ? n(e, ai, wa) : n(e, ai, i);
        return;
      }
    }
  }
  function Dt(e, t, r) {
    if (!$e) return;
    let n = ay[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, ar);
    if (!s) {
      o(e, ar, n);
      return;
    }
    let a = s.split($r).map(oy);
    a.indexOf(n) === -1 && o(e, ar, a.concat(n).join($r));
  }
  function uy(e, t, r) {
    if (!$e) return;
    let n = ay[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, ar);
    !s ||
      s.indexOf(n) === -1 ||
      o(
        e,
        ar,
        s
          .split($r)
          .map(oy)
          .filter((a) => a !== n)
          .join($r)
      );
  }
  function y1({ store: e, elementApi: t }) {
    let { ixData: r } = e.getState(),
      { events: n = {}, actionLists: i = {} } = r;
    Object.keys(n).forEach((o) => {
      let s = n[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        f = i[u];
      f && Zh({ actionList: f, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        Zh({ actionList: i[o], elementApi: t });
      });
  }
  function Zh({ actionList: e = {}, event: t, elementApi: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e;
    n &&
      n.forEach((o) => {
        Jh({ actionGroup: o, event: t, elementApi: r });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            Jh({ actionGroup: a, event: t, elementApi: r });
          });
        });
  }
  function Jh({ actionGroup: e, event: t, elementApi: r }) {
    let { actionItems: n } = e;
    n.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      Ft(o)
        ? (a = (u) => ka(o)(u, i))
        : (a = cy({ effect: m1, actionTypeId: o, elementApi: r })),
        za({ config: s, event: t, elementApi: r }).forEach(a);
    });
  }
  function E1(e, t, r) {
    let { setStyle: n, getStyle: i } = r,
      { actionTypeId: o } = t;
    if (o === lr) {
      let { config: s } = t;
      s.widthUnit === At && n(e, st, ""), s.heightUnit === At && n(e, ut, "");
    }
    i(e, ar) && cy({ effect: uy, actionTypeId: o, elementApi: r })(e);
  }
  function m1(e, t, r) {
    let { setStyle: n } = r;
    uy(e, t, r), n(e, t, ""), t === Ot && n(e, Zn, "");
  }
  function ly(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((n, i) => {
        let { config: o } = n,
          s = o.delay + o.duration;
        s >= t && ((t = s), (r = i));
      }),
      r
    );
  }
  function _1(e, t) {
    let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      r.forEach((u, f) => {
        if (n && f === 0) return;
        let { actionItems: h } = u,
          g = h[ly(h)],
          { config: v, actionTypeId: _ } = g;
        i.id === g.id && (a = s + o);
        let w = sy(_) === Ha ? 0 : v.duration;
        s += v.delay + w;
      }),
      s > 0 ? zr(a / s) : 0
    );
  }
  function b1({ actionList: e, actionItemId: t, rawData: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, ui.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      n && n.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: f }) => f.some(s));
        }),
      (0, ui.setIn)(r, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function T1(e, { basedOn: t }) {
    return (
      (e === Ye.SCROLLING_IN_VIEW && (t === ot.ELEMENT || t == null)) ||
      (e === Ye.MOUSE_MOVE && t === ot.ELEMENT)
    );
  }
  function I1(e, t) {
    return e + MM + t;
  }
  function w1(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function O1(e, t) {
    return Ba(e && e.sort(), t && t.sort());
  }
  function A1(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Wa + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
    return t + Wa + r + Wa + n;
  }
  var vt,
    si,
    ii,
    ui,
    ey,
    TM,
    IM,
    wM,
    OM,
    AM,
    xM,
    SM,
    CM,
    RM,
    LM,
    oi,
    Kr,
    Yr,
    st,
    ut,
    ty,
    NM,
    PM,
    Kh,
    qM,
    Yh,
    FM,
    ai,
    ar,
    At,
    $r,
    MM,
    Wa,
    ry,
    Ha,
    Xa,
    ny,
    sr,
    ur,
    cr,
    Qr,
    iy,
    Zr,
    Jr,
    lr,
    fr,
    dr,
    pr,
    ci,
    DM,
    oy,
    ja,
    ay,
    ni,
    GM,
    VM,
    HM,
    Qh,
    zM,
    KM,
    $M,
    QM,
    ZM,
    Ka,
    r1,
    n1,
    i1,
    o1,
    l1,
    f1,
    d1,
    cy,
    dy = ge(() => {
      "use strict";
      (vt = se(xh())), (si = se(Vh())), (ii = se(Xh())), (ui = se($t()));
      De();
      zh();
      xa();
      ey = se(Ra());
      Ga();
      Jn();
      ({
        BACKGROUND: TM,
        TRANSFORM: IM,
        TRANSLATE_3D: wM,
        SCALE_3D: OM,
        ROTATE_X: AM,
        ROTATE_Y: xM,
        ROTATE_Z: SM,
        SKEW: CM,
        PRESERVE_3D: RM,
        FLEX: LM,
        OPACITY: oi,
        FILTER: Kr,
        FONT_VARIATION_SETTINGS: Yr,
        WIDTH: st,
        HEIGHT: ut,
        BACKGROUND_COLOR: ty,
        BORDER_COLOR: NM,
        COLOR: PM,
        CHILDREN: Kh,
        IMMEDIATE_CHILDREN: qM,
        SIBLINGS: Yh,
        PARENT: FM,
        DISPLAY: ai,
        WILL_CHANGE: ar,
        AUTO: At,
        COMMA_DELIMITER: $r,
        COLON_DELIMITER: MM,
        BAR_DELIMITER: Wa,
        RENDER_TRANSFORM: ry,
        RENDER_GENERAL: Ha,
        RENDER_STYLE: Xa,
        RENDER_PLUGIN: ny,
      } = Ae),
        ({
          TRANSFORM_MOVE: sr,
          TRANSFORM_SCALE: ur,
          TRANSFORM_ROTATE: cr,
          TRANSFORM_SKEW: Qr,
          STYLE_OPACITY: iy,
          STYLE_FILTER: Zr,
          STYLE_FONT_VARIATION: Jr,
          STYLE_SIZE: lr,
          STYLE_BACKGROUND_COLOR: fr,
          STYLE_BORDER: dr,
          STYLE_TEXT_COLOR: pr,
          GENERAL_DISPLAY: ci,
          OBJECT_VALUE: DM,
        } = Me),
        (oy = (e) => e.trim()),
        (ja = Object.freeze({ [fr]: ty, [dr]: NM, [pr]: PM })),
        (ay = Object.freeze({
          [Ot]: IM,
          [ty]: TM,
          [oi]: oi,
          [Kr]: Kr,
          [st]: st,
          [ut]: ut,
          [Yr]: Yr,
        })),
        (ni = new Map());
      GM = 1;
      VM = 1;
      HM = (e, t) => e === t;
      (Qh = /px/),
        (zM = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = r1[n.type]), r),
            e || {}
          )),
        (KM = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = n1[n.type] || n.defaultValue || 0),
              r
            ),
            e || {}
          ));
      ($M = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (QM = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (ZM = (e, t, r) => {
          if (Ft(e)) return qa(e)(r, t);
          switch (e) {
            case Zr: {
              let n = (0, ii.default)(r.filters, ({ type: i }) => i === t);
              return n ? n.value : 0;
            }
            case Jr: {
              let n = (0, ii.default)(
                r.fontVariations,
                ({ type: i }) => i === t
              );
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        });
      (Ka = {
        [sr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [ur]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [cr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Qr]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (r1 = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (n1 = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (i1 = (e, t) => {
          let r = (0, ii.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (o1 = Object.keys(Ka));
      (l1 = "\\(([^)]+)\\)"), (f1 = /^rgb/), (d1 = RegExp(`rgba?${l1}`));
      cy =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case sr:
            case ur:
            case cr:
            case Qr:
              e(n, Ot, r);
              break;
            case Zr:
              e(n, Kr, r);
              break;
            case Jr:
              e(n, Yr, r);
              break;
            case iy:
              e(n, oi, r);
              break;
            case lr:
              e(n, st, r), e(n, ut, r);
              break;
            case fr:
            case dr:
            case pr:
              e(n, ja[t], r);
              break;
            case ci:
              e(n, ai, r);
              break;
          }
        };
    });
  var kt = c((Le) => {
    "use strict";
    var gr = pn().default;
    Object.defineProperty(Le, "__esModule", { value: !0 });
    Le.IX2VanillaUtils =
      Le.IX2VanillaPlugins =
      Le.IX2ElementsReducer =
      Le.IX2Easings =
      Le.IX2EasingUtils =
      Le.IX2BrowserSupport =
        void 0;
    var x1 = gr((Jn(), tt(sh)));
    Le.IX2BrowserSupport = x1;
    var S1 = gr((Aa(), tt(jr)));
    Le.IX2Easings = S1;
    var C1 = gr((xa(), tt(gh)));
    Le.IX2EasingUtils = C1;
    var R1 = gr((Eh(), tt(yh)));
    Le.IX2ElementsReducer = R1;
    var L1 = gr((Ga(), tt(Oh)));
    Le.IX2VanillaPlugins = L1;
    var N1 = gr((dy(), tt(fy)));
    Le.IX2VanillaUtils = N1;
  });
  var fi,
    ht,
    P1,
    q1,
    F1,
    M1,
    D1,
    k1,
    li,
    py,
    G1,
    U1,
    Ya,
    V1,
    B1,
    W1,
    H1,
    gy,
    vy = ge(() => {
      "use strict";
      De();
      (fi = se(kt())),
        (ht = se($t())),
        ({
          IX2_RAW_DATA_IMPORTED: P1,
          IX2_SESSION_STOPPED: q1,
          IX2_INSTANCE_ADDED: F1,
          IX2_INSTANCE_STARTED: M1,
          IX2_INSTANCE_REMOVED: D1,
          IX2_ANIMATION_FRAME_CHANGED: k1,
        } = be),
        ({
          optimizeFloat: li,
          applyEasing: py,
          createBezierEasing: G1,
        } = fi.IX2EasingUtils),
        ({ RENDER_GENERAL: U1 } = Ae),
        ({
          getItemConfigByKey: Ya,
          getRenderType: V1,
          getStyleProp: B1,
        } = fi.IX2VanillaUtils),
        (W1 = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: f,
              skipMotion: h,
              skipToValue: g,
            } = e,
            { parameters: v } = t.payload,
            _ = Math.max(1 - s, 0.01),
            w = v[n];
          w == null && ((_ = 1), (w = a));
          let T = Math.max(w, 0) || 0,
            S = li(T - r),
            I = h ? g : li(r + S * _),
            N = I * 100;
          if (I === r && e.current) return e;
          let R, M, D, F;
          for (let z = 0, { length: K } = i; z < K; z++) {
            let { keyframe: Y, actionItems: B } = i[z];
            if ((z === 0 && (R = B[0]), N >= Y)) {
              R = B[0];
              let x = i[z + 1],
                y = x && N !== Y;
              (M = y ? x.actionItems[0] : null),
                y && ((D = Y / 100), (F = (x.keyframe - Y) / 100));
            }
          }
          let X = {};
          if (R && !M)
            for (let z = 0, { length: K } = o; z < K; z++) {
              let Y = o[z];
              X[Y] = Ya(u, Y, R.config);
            }
          else if (R && M && D !== void 0 && F !== void 0) {
            let z = (I - D) / F,
              K = R.config.easing,
              Y = py(K, z, f);
            for (let B = 0, { length: x } = o; B < x; B++) {
              let y = o[B],
                P = Ya(u, y, R.config),
                Z = (Ya(u, y, M.config) - P) * Y + P;
              X[y] = Z;
            }
          }
          return (0, ht.merge)(e, { position: I, current: X });
        }),
        (H1 = (e, t) => {
          let {
              active: r,
              origin: n,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: f,
              destinationKeys: h,
              pluginDuration: g,
              instanceDelay: v,
              customEasingFn: _,
              skipMotion: w,
            } = e,
            T = u.config.easing,
            { duration: S, delay: I } = u.config;
          g != null && (S = g),
            (I = v ?? I),
            s === U1 ? (S = 0) : (o || w) && (S = I = 0);
          let { now: N } = t.payload;
          if (r && n) {
            let R = N - (i + I);
            if (a) {
              let z = N - i,
                K = S + I,
                Y = li(Math.min(Math.max(0, z / K), 1));
              e = (0, ht.set)(e, "verboseTimeElapsed", K * Y);
            }
            if (R < 0) return e;
            let M = li(Math.min(Math.max(0, R / S), 1)),
              D = py(T, M, _),
              F = {},
              X = null;
            return (
              h.length &&
                (X = h.reduce((z, K) => {
                  let Y = f[K],
                    B = parseFloat(n[K]) || 0,
                    y = (parseFloat(Y) - B) * D + B;
                  return (z[K] = y), z;
                }, {})),
              (F.current = X),
              (F.position = M),
              M === 1 && ((F.active = !1), (F.complete = !0)),
              (0, ht.merge)(e, F)
            );
          }
          return e;
        }),
        (gy = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case P1:
              return t.payload.ixInstances || Object.freeze({});
            case q1:
              return Object.freeze({});
            case F1: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: f,
                  isCarrier: h,
                  origin: g,
                  destination: v,
                  immediate: _,
                  verbose: w,
                  continuous: T,
                  parameterId: S,
                  actionGroups: I,
                  smoothing: N,
                  restingValue: R,
                  pluginInstance: M,
                  pluginDuration: D,
                  instanceDelay: F,
                  skipMotion: X,
                  skipToValue: z,
                } = t.payload,
                { actionTypeId: K } = i,
                Y = V1(K),
                B = B1(Y, K),
                x = Object.keys(v).filter(
                  (P) => v[P] != null && typeof v[P] != "string"
                ),
                { easing: y } = i.config;
              return (0, ht.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: g,
                destination: v,
                destinationKeys: x,
                immediate: _,
                verbose: w,
                current: null,
                actionItem: i,
                actionTypeId: K,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: f,
                renderType: Y,
                isCarrier: h,
                styleProp: B,
                continuous: T,
                parameterId: S,
                actionGroups: I,
                smoothing: N,
                restingValue: R,
                pluginInstance: M,
                pluginDuration: D,
                instanceDelay: F,
                skipMotion: X,
                skipToValue: z,
                customEasingFn:
                  Array.isArray(y) && y.length === 4 ? G1(y) : void 0,
              });
            }
            case M1: {
              let { instanceId: r, time: n } = t.payload;
              return (0, ht.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case D1: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== r && (n[a] = e[a]);
              }
              return n;
            }
            case k1: {
              let r = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let o = 0; o < i; o++) {
                let s = n[o],
                  a = e[s],
                  u = a.continuous ? W1 : H1;
                r = (0, ht.set)(r, s, u(a, t));
              }
              return r;
            }
            default:
              return e;
          }
        });
    });
  var X1,
    j1,
    z1,
    hy,
    yy = ge(() => {
      "use strict";
      De();
      ({
        IX2_RAW_DATA_IMPORTED: X1,
        IX2_SESSION_STOPPED: j1,
        IX2_PARAMETER_CHANGED: z1,
      } = be),
        (hy = (e = {}, t) => {
          switch (t.type) {
            case X1:
              return t.payload.ixParameters || {};
            case j1:
              return {};
            case z1: {
              let { key: r, value: n } = t.payload;
              return (e[r] = n), e;
            }
            default:
              return e;
          }
        });
    });
  var _y = {};
  qe(_y, { default: () => Y1 });
  var Ey,
    my,
    K1,
    Y1,
    by = ge(() => {
      "use strict";
      Ey = se(Xo());
      Nf();
      Jf();
      rd();
      my = se(kt());
      vy();
      yy();
      ({ ixElements: K1 } = my.IX2ElementsReducer),
        (Y1 = (0, Ey.combineReducers)({
          ixData: Lf,
          ixRequest: Zf,
          ixSession: td,
          ixElements: K1,
          ixInstances: gy,
          ixParameters: hy,
        }));
    });
  var Iy = c((JX, Ty) => {
    var $1 = Tt(),
      Q1 = Te(),
      Z1 = pt(),
      J1 = "[object String]";
    function eD(e) {
      return typeof e == "string" || (!Q1(e) && Z1(e) && $1(e) == J1);
    }
    Ty.exports = eD;
  });
  var Oy = c((ej, wy) => {
    var tD = ma(),
      rD = tD("length");
    wy.exports = rD;
  });
  var xy = c((tj, Ay) => {
    var nD = "\\ud800-\\udfff",
      iD = "\\u0300-\\u036f",
      oD = "\\ufe20-\\ufe2f",
      aD = "\\u20d0-\\u20ff",
      sD = iD + oD + aD,
      uD = "\\ufe0e\\ufe0f",
      cD = "\\u200d",
      lD = RegExp("[" + cD + nD + sD + uD + "]");
    function fD(e) {
      return lD.test(e);
    }
    Ay.exports = fD;
  });
  var My = c((rj, Fy) => {
    var Cy = "\\ud800-\\udfff",
      dD = "\\u0300-\\u036f",
      pD = "\\ufe20-\\ufe2f",
      gD = "\\u20d0-\\u20ff",
      vD = dD + pD + gD,
      hD = "\\ufe0e\\ufe0f",
      yD = "[" + Cy + "]",
      $a = "[" + vD + "]",
      Qa = "\\ud83c[\\udffb-\\udfff]",
      ED = "(?:" + $a + "|" + Qa + ")",
      Ry = "[^" + Cy + "]",
      Ly = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Ny = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      mD = "\\u200d",
      Py = ED + "?",
      qy = "[" + hD + "]?",
      _D = "(?:" + mD + "(?:" + [Ry, Ly, Ny].join("|") + ")" + qy + Py + ")*",
      bD = qy + Py + _D,
      TD = "(?:" + [Ry + $a + "?", $a, Ly, Ny, yD].join("|") + ")",
      Sy = RegExp(Qa + "(?=" + Qa + ")|" + TD + bD, "g");
    function ID(e) {
      for (var t = (Sy.lastIndex = 0); Sy.test(e); ) ++t;
      return t;
    }
    Fy.exports = ID;
  });
  var ky = c((nj, Dy) => {
    var wD = Oy(),
      OD = xy(),
      AD = My();
    function xD(e) {
      return OD(e) ? AD(e) : wD(e);
    }
    Dy.exports = xD;
  });
  var Uy = c((ij, Gy) => {
    var SD = Wn(),
      CD = Hn(),
      RD = Pt(),
      LD = Iy(),
      ND = ky(),
      PD = "[object Map]",
      qD = "[object Set]";
    function FD(e) {
      if (e == null) return 0;
      if (RD(e)) return LD(e) ? ND(e) : e.length;
      var t = CD(e);
      return t == PD || t == qD ? e.size : SD(e).length;
    }
    Gy.exports = FD;
  });
  var By = c((oj, Vy) => {
    var MD = "Expected a function";
    function DD(e) {
      if (typeof e != "function") throw new TypeError(MD);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Vy.exports = DD;
  });
  var Za = c((aj, Wy) => {
    var kD = It(),
      GD = (function () {
        try {
          var e = kD(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Wy.exports = GD;
  });
  var Ja = c((sj, Xy) => {
    var Hy = Za();
    function UD(e, t, r) {
      t == "__proto__" && Hy
        ? Hy(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Xy.exports = UD;
  });
  var zy = c((uj, jy) => {
    var VD = Ja(),
      BD = Pn(),
      WD = Object.prototype,
      HD = WD.hasOwnProperty;
    function XD(e, t, r) {
      var n = e[t];
      (!(HD.call(e, t) && BD(n, r)) || (r === void 0 && !(t in e))) &&
        VD(e, t, r);
    }
    jy.exports = XD;
  });
  var $y = c((cj, Yy) => {
    var jD = zy(),
      zD = Wr(),
      KD = Gn(),
      Ky = at(),
      YD = ir();
    function $D(e, t, r, n) {
      if (!Ky(e)) return e;
      t = zD(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = YD(t[i]),
          f = r;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var h = a[u];
          (f = n ? n(h, u, a) : void 0),
            f === void 0 && (f = Ky(h) ? h : KD(t[i + 1]) ? [] : {});
        }
        jD(a, u, f), (a = a[u]);
      }
      return e;
    }
    Yy.exports = $D;
  });
  var Zy = c((lj, Qy) => {
    var QD = zn(),
      ZD = $y(),
      JD = Wr();
    function e2(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var s = t[n],
          a = QD(e, s);
        r(a, s) && ZD(o, JD(s, e), a);
      }
      return o;
    }
    Qy.exports = e2;
  });
  var eE = c((fj, Jy) => {
    var t2 = Dn(),
      r2 = No(),
      n2 = ia(),
      i2 = na(),
      o2 = Object.getOwnPropertySymbols,
      a2 = o2
        ? function (e) {
            for (var t = []; e; ) t2(t, n2(e)), (e = r2(e));
            return t;
          }
        : i2;
    Jy.exports = a2;
  });
  var rE = c((dj, tE) => {
    function s2(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    tE.exports = s2;
  });
  var iE = c((pj, nE) => {
    var u2 = at(),
      c2 = Bn(),
      l2 = rE(),
      f2 = Object.prototype,
      d2 = f2.hasOwnProperty;
    function p2(e) {
      if (!u2(e)) return l2(e);
      var t = c2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !d2.call(e, n))) || r.push(n);
      return r;
    }
    nE.exports = p2;
  });
  var aE = c((gj, oE) => {
    var g2 = aa(),
      v2 = iE(),
      h2 = Pt();
    function y2(e) {
      return h2(e) ? g2(e, !0) : v2(e);
    }
    oE.exports = y2;
  });
  var uE = c((vj, sE) => {
    var E2 = ra(),
      m2 = eE(),
      _2 = aE();
    function b2(e) {
      return E2(e, _2, m2);
    }
    sE.exports = b2;
  });
  var lE = c((hj, cE) => {
    var T2 = Ea(),
      I2 = wt(),
      w2 = Zy(),
      O2 = uE();
    function A2(e, t) {
      if (e == null) return {};
      var r = T2(O2(e), function (n) {
        return [n];
      });
      return (
        (t = I2(t)),
        w2(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    cE.exports = A2;
  });
  var dE = c((yj, fE) => {
    var x2 = wt(),
      S2 = By(),
      C2 = lE();
    function R2(e, t) {
      return C2(e, S2(x2(t)));
    }
    fE.exports = R2;
  });
  var gE = c((Ej, pE) => {
    var L2 = Wn(),
      N2 = Hn(),
      P2 = Dr(),
      q2 = Te(),
      F2 = Pt(),
      M2 = kn(),
      D2 = Bn(),
      k2 = Vn(),
      G2 = "[object Map]",
      U2 = "[object Set]",
      V2 = Object.prototype,
      B2 = V2.hasOwnProperty;
    function W2(e) {
      if (e == null) return !0;
      if (
        F2(e) &&
        (q2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          M2(e) ||
          k2(e) ||
          P2(e))
      )
        return !e.length;
      var t = N2(e);
      if (t == G2 || t == U2) return !e.size;
      if (D2(e)) return !L2(e).length;
      for (var r in e) if (B2.call(e, r)) return !1;
      return !0;
    }
    pE.exports = W2;
  });
  var hE = c((mj, vE) => {
    var H2 = Ja(),
      X2 = Ua(),
      j2 = wt();
    function z2(e, t) {
      var r = {};
      return (
        (t = j2(t, 3)),
        X2(e, function (n, i, o) {
          H2(r, i, t(n, i, o));
        }),
        r
      );
    }
    vE.exports = z2;
  });
  var EE = c((_j, yE) => {
    function K2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    yE.exports = K2;
  });
  var _E = c((bj, mE) => {
    var Y2 = Yn();
    function $2(e) {
      return typeof e == "function" ? e : Y2;
    }
    mE.exports = $2;
  });
  var TE = c((Tj, bE) => {
    var Q2 = EE(),
      Z2 = Va(),
      J2 = _E(),
      ek = Te();
    function tk(e, t) {
      var r = ek(e) ? Q2 : Z2;
      return r(e, J2(t));
    }
    bE.exports = tk;
  });
  var wE = c((Ij, IE) => {
    var rk = Ke(),
      nk = function () {
        return rk.Date.now();
      };
    IE.exports = nk;
  });
  var xE = c((wj, AE) => {
    var ik = at(),
      es = wE(),
      OE = $n(),
      ok = "Expected a function",
      ak = Math.max,
      sk = Math.min;
    function uk(e, t, r) {
      var n,
        i,
        o,
        s,
        a,
        u,
        f = 0,
        h = !1,
        g = !1,
        v = !0;
      if (typeof e != "function") throw new TypeError(ok);
      (t = OE(t) || 0),
        ik(r) &&
          ((h = !!r.leading),
          (g = "maxWait" in r),
          (o = g ? ak(OE(r.maxWait) || 0, t) : o),
          (v = "trailing" in r ? !!r.trailing : v));
      function _(F) {
        var X = n,
          z = i;
        return (n = i = void 0), (f = F), (s = e.apply(z, X)), s;
      }
      function w(F) {
        return (f = F), (a = setTimeout(I, t)), h ? _(F) : s;
      }
      function T(F) {
        var X = F - u,
          z = F - f,
          K = t - X;
        return g ? sk(K, o - z) : K;
      }
      function S(F) {
        var X = F - u,
          z = F - f;
        return u === void 0 || X >= t || X < 0 || (g && z >= o);
      }
      function I() {
        var F = es();
        if (S(F)) return N(F);
        a = setTimeout(I, T(F));
      }
      function N(F) {
        return (a = void 0), v && n ? _(F) : ((n = i = void 0), s);
      }
      function R() {
        a !== void 0 && clearTimeout(a), (f = 0), (n = u = i = a = void 0);
      }
      function M() {
        return a === void 0 ? s : N(es());
      }
      function D() {
        var F = es(),
          X = S(F);
        if (((n = arguments), (i = this), (u = F), X)) {
          if (a === void 0) return w(u);
          if (g) return clearTimeout(a), (a = setTimeout(I, t)), _(u);
        }
        return a === void 0 && (a = setTimeout(I, t)), s;
      }
      return (D.cancel = R), (D.flush = M), D;
    }
    AE.exports = uk;
  });
  var CE = c((Oj, SE) => {
    var ck = xE(),
      lk = at(),
      fk = "Expected a function";
    function dk(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(fk);
      return (
        lk(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        ck(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    SE.exports = dk;
  });
  var LE = {};
  qe(LE, {
    actionListPlaybackChanged: () => hr,
    animationFrameChanged: () => pi,
    clearRequested: () => Dk,
    elementStateChanged: () => us,
    eventListenerAdded: () => di,
    eventStateChanged: () => os,
    instanceAdded: () => as,
    instanceRemoved: () => ss,
    instanceStarted: () => gi,
    mediaQueriesDefined: () => ls,
    parameterChanged: () => vr,
    playbackRequested: () => Fk,
    previewRequested: () => qk,
    rawDataImported: () => ts,
    sessionInitialized: () => rs,
    sessionStarted: () => ns,
    sessionStopped: () => is,
    stopRequested: () => Mk,
    testFrameRendered: () => kk,
    viewportWidthChanged: () => cs,
  });
  var RE,
    pk,
    gk,
    vk,
    hk,
    yk,
    Ek,
    mk,
    _k,
    bk,
    Tk,
    Ik,
    wk,
    Ok,
    Ak,
    xk,
    Sk,
    Ck,
    Rk,
    Lk,
    Nk,
    Pk,
    ts,
    rs,
    ns,
    is,
    qk,
    Fk,
    Mk,
    Dk,
    di,
    kk,
    os,
    pi,
    vr,
    as,
    gi,
    ss,
    us,
    hr,
    cs,
    ls,
    vi = ge(() => {
      "use strict";
      De();
      (RE = se(kt())),
        ({
          IX2_RAW_DATA_IMPORTED: pk,
          IX2_SESSION_INITIALIZED: gk,
          IX2_SESSION_STARTED: vk,
          IX2_SESSION_STOPPED: hk,
          IX2_PREVIEW_REQUESTED: yk,
          IX2_PLAYBACK_REQUESTED: Ek,
          IX2_STOP_REQUESTED: mk,
          IX2_CLEAR_REQUESTED: _k,
          IX2_EVENT_LISTENER_ADDED: bk,
          IX2_TEST_FRAME_RENDERED: Tk,
          IX2_EVENT_STATE_CHANGED: Ik,
          IX2_ANIMATION_FRAME_CHANGED: wk,
          IX2_PARAMETER_CHANGED: Ok,
          IX2_INSTANCE_ADDED: Ak,
          IX2_INSTANCE_STARTED: xk,
          IX2_INSTANCE_REMOVED: Sk,
          IX2_ELEMENT_STATE_CHANGED: Ck,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: Rk,
          IX2_VIEWPORT_WIDTH_CHANGED: Lk,
          IX2_MEDIA_QUERIES_DEFINED: Nk,
        } = be),
        ({ reifyState: Pk } = RE.IX2VanillaUtils),
        (ts = (e) => ({ type: pk, payload: { ...Pk(e) } })),
        (rs = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: gk,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (ns = () => ({ type: vk })),
        (is = () => ({ type: hk })),
        (qk = ({ rawData: e, defer: t }) => ({
          type: yk,
          payload: { defer: t, rawData: e },
        })),
        (Fk = ({
          actionTypeId: e = Me.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: r,
          eventId: n,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: Ek,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: r,
            testManual: s,
            eventId: n,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (Mk = (e) => ({ type: mk, payload: { actionListId: e } })),
        (Dk = () => ({ type: _k })),
        (di = (e, t) => ({
          type: bk,
          payload: { target: e, listenerParams: t },
        })),
        (kk = (e = 1) => ({ type: Tk, payload: { step: e } })),
        (os = (e, t) => ({ type: Ik, payload: { stateKey: e, newState: t } })),
        (pi = (e, t) => ({ type: wk, payload: { now: e, parameters: t } })),
        (vr = (e, t) => ({ type: Ok, payload: { key: e, value: t } })),
        (as = (e) => ({ type: Ak, payload: { ...e } })),
        (gi = (e, t) => ({ type: xk, payload: { instanceId: e, time: t } })),
        (ss = (e) => ({ type: Sk, payload: { instanceId: e } })),
        (us = (e, t, r, n) => ({
          type: Ck,
          payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
        })),
        (hr = ({ actionListId: e, isPlaying: t }) => ({
          type: Rk,
          payload: { actionListId: e, isPlaying: t },
        })),
        (cs = ({ width: e, mediaQueries: t }) => ({
          type: Lk,
          payload: { width: e, mediaQueries: t },
        })),
        (ls = () => ({ type: Nk }));
    });
  var Ne = {};
  qe(Ne, {
    elementContains: () => ps,
    getChildElements: () => Kk,
    getClosestElement: () => en,
    getProperty: () => Wk,
    getQuerySelector: () => ds,
    getRefType: () => gs,
    getSiblingElements: () => Yk,
    getStyle: () => Bk,
    getValidDocument: () => Xk,
    isSiblingNode: () => zk,
    matchSelector: () => Hk,
    queryDocument: () => jk,
    setStyle: () => Vk,
  });
  function Vk(e, t, r) {
    e.style[t] = r;
  }
  function Bk(e, t) {
    return t.startsWith("--")
      ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
      : e.style[t];
  }
  function Wk(e, t) {
    return e[t];
  }
  function Hk(e) {
    return (t) => t[fs](e);
  }
  function ds({ id: e, selector: t }) {
    if (e) {
      let r = e;
      if (e.indexOf(NE) !== -1) {
        let n = e.split(NE),
          i = n[0];
        if (((r = n[1]), i !== document.documentElement.getAttribute(qE)))
          return null;
      }
      return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
    }
    return t;
  }
  function Xk(e) {
    return e == null || e === document.documentElement.getAttribute(qE)
      ? document
      : null;
  }
  function jk(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function ps(e, t) {
    return e.contains(t);
  }
  function zk(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function Kk(e) {
    let t = [];
    for (let r = 0, { length: n } = e || []; r < n; r++) {
      let { children: i } = e[r],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function Yk(e = []) {
    let t = [],
      r = [];
    for (let n = 0, { length: i } = e; n < i; n++) {
      let { parentNode: o } = e[n];
      if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
        continue;
      r.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function gs(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? Gk
        : Uk
      : null;
  }
  var PE,
    fs,
    NE,
    Gk,
    Uk,
    qE,
    en,
    FE = ge(() => {
      "use strict";
      PE = se(kt());
      De();
      ({ ELEMENT_MATCHES: fs } = PE.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: NE,
          HTML_ELEMENT: Gk,
          PLAIN_OBJECT: Uk,
          WF_PAGE: qE,
        } = Ae);
      en = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[fs] && r[fs](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
    });
  var vs = c((Sj, DE) => {
    var $k = at(),
      ME = Object.create,
      Qk = (function () {
        function e() {}
        return function (t) {
          if (!$k(t)) return {};
          if (ME) return ME(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    DE.exports = Qk;
  });
  var hi = c((Cj, kE) => {
    function Zk() {}
    kE.exports = Zk;
  });
  var Ei = c((Rj, GE) => {
    var Jk = vs(),
      eG = hi();
    function yi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    yi.prototype = Jk(eG.prototype);
    yi.prototype.constructor = yi;
    GE.exports = yi;
  });
  var WE = c((Lj, BE) => {
    var UE = zt(),
      tG = Dr(),
      rG = Te(),
      VE = UE ? UE.isConcatSpreadable : void 0;
    function nG(e) {
      return rG(e) || tG(e) || !!(VE && e && e[VE]);
    }
    BE.exports = nG;
  });
  var jE = c((Nj, XE) => {
    var iG = Dn(),
      oG = WE();
    function HE(e, t, r, n, i) {
      var o = -1,
        s = e.length;
      for (r || (r = oG), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && r(a)
          ? t > 1
            ? HE(a, t - 1, r, n, i)
            : iG(i, a)
          : n || (i[i.length] = a);
      }
      return i;
    }
    XE.exports = HE;
  });
  var KE = c((Pj, zE) => {
    var aG = jE();
    function sG(e) {
      var t = e == null ? 0 : e.length;
      return t ? aG(e, 1) : [];
    }
    zE.exports = sG;
  });
  var $E = c((qj, YE) => {
    function uG(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    YE.exports = uG;
  });
  var JE = c((Fj, ZE) => {
    var cG = $E(),
      QE = Math.max;
    function lG(e, t, r) {
      return (
        (t = QE(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = QE(n.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = n[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
          return (a[t] = r(s)), cG(e, this, a);
        }
      );
    }
    ZE.exports = lG;
  });
  var tm = c((Mj, em) => {
    function fG(e) {
      return function () {
        return e;
      };
    }
    em.exports = fG;
  });
  var im = c((Dj, nm) => {
    var dG = tm(),
      rm = Za(),
      pG = Yn(),
      gG = rm
        ? function (e, t) {
            return rm(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: dG(t),
              writable: !0,
            });
          }
        : pG;
    nm.exports = gG;
  });
  var am = c((kj, om) => {
    var vG = 800,
      hG = 16,
      yG = Date.now;
    function EG(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = yG(),
          i = hG - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= vG) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    om.exports = EG;
  });
  var um = c((Gj, sm) => {
    var mG = im(),
      _G = am(),
      bG = _G(mG);
    sm.exports = bG;
  });
  var lm = c((Uj, cm) => {
    var TG = KE(),
      IG = JE(),
      wG = um();
    function OG(e) {
      return wG(IG(e, void 0, TG), e + "");
    }
    cm.exports = OG;
  });
  var pm = c((Vj, dm) => {
    var fm = sa(),
      AG = fm && new fm();
    dm.exports = AG;
  });
  var vm = c((Bj, gm) => {
    function xG() {}
    gm.exports = xG;
  });
  var hs = c((Wj, ym) => {
    var hm = pm(),
      SG = vm(),
      CG = hm
        ? function (e) {
            return hm.get(e);
          }
        : SG;
    ym.exports = CG;
  });
  var mm = c((Hj, Em) => {
    var RG = {};
    Em.exports = RG;
  });
  var ys = c((Xj, bm) => {
    var _m = mm(),
      LG = Object.prototype,
      NG = LG.hasOwnProperty;
    function PG(e) {
      for (
        var t = e.name + "", r = _m[t], n = NG.call(_m, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    bm.exports = PG;
  });
  var _i = c((jj, Tm) => {
    var qG = vs(),
      FG = hi(),
      MG = 4294967295;
    function mi(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = MG),
        (this.__views__ = []);
    }
    mi.prototype = qG(FG.prototype);
    mi.prototype.constructor = mi;
    Tm.exports = mi;
  });
  var wm = c((zj, Im) => {
    function DG(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    Im.exports = DG;
  });
  var Am = c((Kj, Om) => {
    var kG = _i(),
      GG = Ei(),
      UG = wm();
    function VG(e) {
      if (e instanceof kG) return e.clone();
      var t = new GG(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = UG(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    Om.exports = VG;
  });
  var Cm = c((Yj, Sm) => {
    var BG = _i(),
      xm = Ei(),
      WG = hi(),
      HG = Te(),
      XG = pt(),
      jG = Am(),
      zG = Object.prototype,
      KG = zG.hasOwnProperty;
    function bi(e) {
      if (XG(e) && !HG(e) && !(e instanceof BG)) {
        if (e instanceof xm) return e;
        if (KG.call(e, "__wrapped__")) return jG(e);
      }
      return new xm(e);
    }
    bi.prototype = WG.prototype;
    bi.prototype.constructor = bi;
    Sm.exports = bi;
  });
  var Lm = c(($j, Rm) => {
    var YG = _i(),
      $G = hs(),
      QG = ys(),
      ZG = Cm();
    function JG(e) {
      var t = QG(e),
        r = ZG[t];
      if (typeof r != "function" || !(t in YG.prototype)) return !1;
      if (e === r) return !0;
      var n = $G(r);
      return !!n && e === n[0];
    }
    Rm.exports = JG;
  });
  var Fm = c((Qj, qm) => {
    var Nm = Ei(),
      eU = lm(),
      tU = hs(),
      Es = ys(),
      rU = Te(),
      Pm = Lm(),
      nU = "Expected a function",
      iU = 8,
      oU = 32,
      aU = 128,
      sU = 256;
    function uU(e) {
      return eU(function (t) {
        var r = t.length,
          n = r,
          i = Nm.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(nU);
          if (i && !s && Es(o) == "wrapper") var s = new Nm([], !0);
        }
        for (n = s ? n : r; ++n < r; ) {
          o = t[n];
          var a = Es(o),
            u = a == "wrapper" ? tU(o) : void 0;
          u &&
          Pm(u[0]) &&
          u[1] == (aU | iU | oU | sU) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[Es(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && Pm(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var f = arguments,
            h = f[0];
          if (s && f.length == 1 && rU(h)) return s.plant(h).value();
          for (var g = 0, v = r ? t[g].apply(this, f) : h; ++g < r; )
            v = t[g].call(this, v);
          return v;
        };
      });
    }
    qm.exports = uU;
  });
  var Dm = c((Zj, Mm) => {
    var cU = Fm(),
      lU = cU();
    Mm.exports = lU;
  });
  var Gm = c((Jj, km) => {
    function fU(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    km.exports = fU;
  });
  var Vm = c((ez, Um) => {
    var dU = Gm(),
      ms = $n();
    function pU(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = ms(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = ms(t)), (t = t === t ? t : 0)),
        dU(ms(e), t, r)
      );
    }
    Um.exports = pU;
  });
  var $m,
    Qm,
    Zm,
    Jm,
    gU,
    vU,
    hU,
    yU,
    EU,
    mU,
    _U,
    bU,
    TU,
    IU,
    wU,
    OU,
    AU,
    xU,
    SU,
    e_,
    t_,
    CU,
    RU,
    LU,
    r_,
    NU,
    PU,
    n_,
    qU,
    _s,
    i_,
    Bm,
    Wm,
    o_,
    rn,
    FU,
    ct,
    a_,
    MU,
    Ge,
    Qe,
    nn,
    s_,
    bs,
    Hm,
    Ts,
    DU,
    tn,
    kU,
    GU,
    UU,
    u_,
    Xm,
    VU,
    jm,
    BU,
    WU,
    HU,
    zm,
    Ti,
    Ii,
    Km,
    Ym,
    c_,
    l_ = ge(() => {
      "use strict";
      ($m = se(Dm())), (Qm = se(Kn())), (Zm = se(Vm()));
      De();
      Is();
      vi();
      (Jm = se(kt())),
        ({
          MOUSE_CLICK: gU,
          MOUSE_SECOND_CLICK: vU,
          MOUSE_DOWN: hU,
          MOUSE_UP: yU,
          MOUSE_OVER: EU,
          MOUSE_OUT: mU,
          DROPDOWN_CLOSE: _U,
          DROPDOWN_OPEN: bU,
          SLIDER_ACTIVE: TU,
          SLIDER_INACTIVE: IU,
          TAB_ACTIVE: wU,
          TAB_INACTIVE: OU,
          NAVBAR_CLOSE: AU,
          NAVBAR_OPEN: xU,
          MOUSE_MOVE: SU,
          PAGE_SCROLL_DOWN: e_,
          SCROLL_INTO_VIEW: t_,
          SCROLL_OUT_OF_VIEW: CU,
          PAGE_SCROLL_UP: RU,
          SCROLLING_IN_VIEW: LU,
          PAGE_FINISH: r_,
          ECOMMERCE_CART_CLOSE: NU,
          ECOMMERCE_CART_OPEN: PU,
          PAGE_START: n_,
          PAGE_SCROLL: qU,
        } = Ye),
        (_s = "COMPONENT_ACTIVE"),
        (i_ = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Bm } = Ae),
        ({ getNamespacedParameterId: Wm } = Jm.IX2VanillaUtils),
        (o_ = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (rn = o_(({ element: e, nativeEvent: t }) => e === t.target)),
        (FU = o_(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (ct = (0, $m.default)([rn, FU])),
        (a_ = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              i = n[t];
            if (i && !DU[i.eventTypeId]) return i;
          }
          return null;
        }),
        (MU = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!a_(e, n);
        }),
        (Ge = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            f = a_(e, u);
          return (
            f &&
              yr({
                store: e,
                eventId: u,
                eventTarget: r,
                eventStateKey: u + Bm + n.split(Bm)[1],
                actionListId: (0, Qm.default)(f, "action.config.actionListId"),
              }),
            yr({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            on({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            i
          );
        }),
        (Qe = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
        (nn = { handler: Qe(ct, Ge) }),
        (s_ = { ...nn, types: [_s, i_].join(" ") }),
        (bs = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Hm = "mouseover mouseout"),
        (Ts = { types: bs }),
        (DU = { PAGE_START: n_, PAGE_FINISH: r_ }),
        (tn = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, Zm.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (kU = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (GU = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: i } = t,
            o = e.contains(n);
          if (r === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(r === "mouseout" && o && s);
        }),
        (UU = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: i } = tn(),
            o = r.scrollOffsetValue,
            u = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return kU(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: n,
            bottom: i - u,
          });
        }),
        (u_ = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            i = [_s, i_].indexOf(n) !== -1 ? n === _s : r.isActive,
            o = { ...r, isActive: i };
          return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
        }),
        (Xm = (e) => (t, r) => {
          let n = { elementHovered: GU(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        }),
        (VU = (e) => (t, r) => {
          let n = { ...r, elementVisible: UU(t) };
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        }),
        (jm =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = tn(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: f } = s,
              h = f === "PX",
              g = i - o,
              v = Number((n / g).toFixed(2));
            if (r && r.percentTop === v) return r;
            let _ = (h ? u : (o * (u || 0)) / 100) / g,
              w,
              T,
              S = 0;
            r &&
              ((w = v > r.percentTop),
              (T = r.scrollingDown !== w),
              (S = T ? v : r.anchorTop));
            let I = a === e_ ? v >= S + _ : v <= S - _,
              N = {
                ...r,
                percentTop: v,
                inBounds: I,
                anchorTop: S,
                scrollingDown: w,
              };
            return (r && I && (T || N.inBounds !== r.inBounds) && e(t, N)) || N;
          }),
        (BU = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (WU = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return n.finished && !(r && r.finshed) && e(t), n;
        }),
        (HU = (e) => (t, r) => {
          let n = { started: !0 };
          return r || e(t), n;
        }),
        (zm =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          }),
        (Ti = (e = !0) => ({
          ...s_,
          handler: Qe(
            e ? ct : rn,
            u_((t, r) => (r.isActive ? nn.handler(t, r) : r))
          ),
        })),
        (Ii = (e = !0) => ({
          ...s_,
          handler: Qe(
            e ? ct : rn,
            u_((t, r) => (r.isActive ? r : nn.handler(t, r)))
          ),
        })),
        (Km = {
          ...Ts,
          handler: VU((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === t_) === r
              ? (Ge(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (Ym = 0.05),
        (c_ = {
          [TU]: Ti(),
          [IU]: Ii(),
          [bU]: Ti(),
          [_U]: Ii(),
          [xU]: Ti(!1),
          [AU]: Ii(!1),
          [wU]: Ti(),
          [OU]: Ii(),
          [PU]: { types: "ecommerce-cart-open", handler: Qe(ct, Ge) },
          [NU]: { types: "ecommerce-cart-close", handler: Qe(ct, Ge) },
          [gU]: {
            types: "click",
            handler: Qe(
              ct,
              zm((e, { clickCount: t }) => {
                MU(e) ? t === 1 && Ge(e) : Ge(e);
              })
            ),
          },
          [vU]: {
            types: "click",
            handler: Qe(
              ct,
              zm((e, { clickCount: t }) => {
                t === 2 && Ge(e);
              })
            ),
          },
          [hU]: { ...nn, types: "mousedown" },
          [yU]: { ...nn, types: "mouseup" },
          [EU]: {
            types: Hm,
            handler: Qe(
              ct,
              Xm((e, t) => {
                t.elementHovered && Ge(e);
              })
            ),
          },
          [mU]: {
            types: Hm,
            handler: Qe(
              ct,
              Xm((e, t) => {
                t.elementHovered || Ge(e);
              })
            ),
          },
          [SU]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: f,
                  restingState: h = 0,
                } = r,
                {
                  clientX: g = o.clientX,
                  clientY: v = o.clientY,
                  pageX: _ = o.pageX,
                  pageY: w = o.pageY,
                } = n,
                T = a === "X_AXIS",
                S = n.type === "mouseout",
                I = h / 100,
                N = u,
                R = !1;
              switch (s) {
                case ot.VIEWPORT: {
                  I = T
                    ? Math.min(g, window.innerWidth) / window.innerWidth
                    : Math.min(v, window.innerHeight) / window.innerHeight;
                  break;
                }
                case ot.PAGE: {
                  let {
                    scrollLeft: M,
                    scrollTop: D,
                    scrollWidth: F,
                    scrollHeight: X,
                  } = tn();
                  I = T ? Math.min(M + _, F) / F : Math.min(D + w, X) / X;
                  break;
                }
                case ot.ELEMENT:
                default: {
                  N = Wm(i, u);
                  let M = n.type.indexOf("mouse") === 0;
                  if (M && ct({ element: t, nativeEvent: n }) !== !0) break;
                  let D = t.getBoundingClientRect(),
                    { left: F, top: X, width: z, height: K } = D;
                  if (!M && !BU({ left: g, top: v }, D)) break;
                  (R = !0), (I = T ? (g - F) / z : (v - X) / K);
                  break;
                }
              }
              return (
                S && (I > 1 - Ym || I < Ym) && (I = Math.round(I)),
                (s !== ot.ELEMENT || R || R !== o.elementHovered) &&
                  ((I = f ? 1 - I : I), e.dispatch(vr(N, I))),
                {
                  elementHovered: R,
                  clientX: g,
                  clientY: v,
                  pageX: _,
                  pageY: w,
                }
              );
            },
          },
          [qU]: {
            types: bs,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = tn(),
                a = i / (o - s);
              (a = n ? 1 - a : a), e.dispatch(vr(r, a));
            },
          },
          [LU]: {
            types: bs,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: f,
                } = tn(),
                {
                  basedOn: h,
                  selectedAxis: g,
                  continuousParameterGroupId: v,
                  startsEntering: _,
                  startsExiting: w,
                  addEndOffset: T,
                  addStartOffset: S,
                  addOffsetValue: I = 0,
                  endOffsetValue: N = 0,
                } = r,
                R = g === "X_AXIS";
              if (h === ot.VIEWPORT) {
                let M = R ? o / a : s / u;
                return (
                  M !== i.scrollPercent && t.dispatch(vr(v, M)),
                  { scrollPercent: M }
                );
              } else {
                let M = Wm(n, v),
                  D = e.getBoundingClientRect(),
                  F = (S ? I : 0) / 100,
                  X = (T ? N : 0) / 100;
                (F = _ ? F : 1 - F), (X = w ? X : 1 - X);
                let z = D.top + Math.min(D.height * F, f),
                  Y = D.top + D.height * X - z,
                  B = Math.min(f + Y, u),
                  y = Math.min(Math.max(0, f - z), B) / B;
                return (
                  y !== i.scrollPercent && t.dispatch(vr(M, y)),
                  { scrollPercent: y }
                );
              }
            },
          },
          [t_]: Km,
          [CU]: Km,
          [e_]: {
            ...Ts,
            handler: jm((e, t) => {
              t.scrollingDown && Ge(e);
            }),
          },
          [RU]: {
            ...Ts,
            handler: jm((e, t) => {
              t.scrollingDown || Ge(e);
            }),
          },
          [r_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Qe(rn, WU(Ge)),
          },
          [n_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Qe(rn, HU(Ge)),
          },
        });
    });
  var x_ = {};
  qe(x_, {
    observeRequests: () => lV,
    startActionGroup: () => on,
    startEngine: () => Ci,
    stopActionGroup: () => yr,
    stopAllActionGroups: () => w_,
    stopEngine: () => Ri,
  });
  function lV(e) {
    Gt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: pV }),
      Gt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: gV }),
      Gt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: vV }),
      Gt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: hV });
  }
  function fV(e) {
    Gt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Ri(e),
          __({ store: e, elementApi: Ne }),
          Ci({ store: e, allowEvents: !0 }),
          b_();
      },
    });
  }
  function dV(e, t) {
    let r = Gt({
      store: e,
      select: ({ ixSession: n }) => n.tick,
      onChange: (n) => {
        t(n), r();
      },
    });
  }
  function pV({ rawData: e, defer: t }, r) {
    let n = () => {
      Ci({ store: r, rawData: e, allowEvents: !0 }), b_();
    };
    t ? setTimeout(n, 0) : n();
  }
  function b_() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function gV(e, t) {
    let {
        actionTypeId: r,
        actionListId: n,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: f = !0,
      } = e,
      { rawData: h } = e;
    if (n && i && h && a) {
      let g = h.actionLists[n];
      g && (h = JU({ actionList: g, actionItemId: i, rawData: h }));
    }
    if (
      (Ci({ store: t, rawData: h, allowEvents: s, testManual: u }),
      (n && r === Me.GENERAL_START_ACTION) || ws(r))
    ) {
      yr({ store: t, actionListId: n }),
        I_({ store: t, actionListId: n, eventId: o });
      let g = on({
        store: t,
        eventId: o,
        actionListId: n,
        immediate: a,
        verbose: f,
      });
      f && g && t.dispatch(hr({ actionListId: n, isPlaying: !a }));
    }
  }
  function vV({ actionListId: e }, t) {
    e ? yr({ store: t, actionListId: e }) : w_({ store: t }), Ri(t);
  }
  function hV(e, t) {
    Ri(t), __({ store: t, elementApi: Ne });
  }
  function Ci({ store: e, rawData: t, allowEvents: r, testManual: n }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(ts(t)),
      i.active ||
        (e.dispatch(
          rs({
            hasBoundaryNodes: !!document.querySelector(Oi),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        r &&
          (TV(e), yV(), e.getState().ixSession.hasDefinedMediaQueries && fV(e)),
        e.dispatch(ns()),
        EV(e, n));
  }
  function yV() {
    let { documentElement: e } = document;
    e.className.indexOf(f_) === -1 && (e.className += ` ${f_}`);
  }
  function EV(e, t) {
    let r = (n) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(pi(n, o)), t ? dV(e, r) : requestAnimationFrame(r));
    };
    r(window.performance.now());
  }
  function Ri(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: r } = t;
      r.forEach(mV), nV(), e.dispatch(is());
    }
  }
  function mV({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function _V({
    store: e,
    eventStateKey: t,
    eventTarget: r,
    eventId: n,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: f, ixSession: h } = e.getState(),
      { events: g } = f,
      v = g[n],
      { eventTypeId: _ } = v,
      w = {},
      T = {},
      S = [],
      { continuousActionGroups: I } = s,
      { id: N } = s;
    eV(_, i) && (N = tV(t, N));
    let R = h.hasBoundaryNodes && r ? en(r, Oi) : null;
    I.forEach((M) => {
      let { keyframe: D, actionItems: F } = M;
      F.forEach((X) => {
        let { actionTypeId: z } = X,
          { target: K } = X.config;
        if (!K) return;
        let Y = K.boundaryMode ? R : null,
          B = iV(K) + Os + z;
        if (((T[B] = bV(T[B], D, X)), !w[B])) {
          w[B] = !0;
          let { config: x } = X;
          Ai({
            config: x,
            event: v,
            eventTarget: r,
            elementRoot: Y,
            elementApi: Ne,
          }).forEach((y) => {
            S.push({ element: y, key: B });
          });
        }
      });
    }),
      S.forEach(({ element: M, key: D }) => {
        let F = T[D],
          X = (0, yt.default)(F, "[0].actionItems[0]", {}),
          { actionTypeId: z } = X,
          K = Si(z) ? xs(z)(M, X) : null,
          Y = As({ element: M, actionItem: X, elementApi: Ne }, K);
        Ss({
          store: e,
          element: M,
          eventId: n,
          actionListId: o,
          actionItem: X,
          destination: Y,
          continuous: !0,
          parameterId: N,
          actionGroups: F,
          smoothing: a,
          restingValue: u,
          pluginInstance: K,
        });
      });
  }
  function bV(e = [], t, r) {
    let n = [...e],
      i;
    return (
      n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
      n[i].actionItems.push(r),
      n
    );
  }
  function TV(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: r } = t;
    T_(e),
      (0, Er.default)(r, (i, o) => {
        let s = c_[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        SV({ logic: s, store: e, events: i });
      });
    let { ixSession: n } = e.getState();
    n.eventListeners.length && wV(e);
  }
  function wV(e) {
    let t = () => {
      T_(e);
    };
    IV.forEach((r) => {
      window.addEventListener(r, t), e.dispatch(di(window, [r, t]));
    }),
      t();
  }
  function T_(e) {
    let { ixSession: t, ixData: r } = e.getState(),
      n = window.innerWidth;
    if (n !== t.viewportWidth) {
      let { mediaQueries: i } = r;
      e.dispatch(cs({ width: n, mediaQueries: i }));
    }
  }
  function SV({ logic: e, store: t, events: r }) {
    CV(r);
    let { types: n, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = OV(r, xV);
    if (!(0, g_.default)(a)) return;
    (0, Er.default)(a, (g, v) => {
      let _ = r[v],
        { action: w, id: T, mediaQueries: S = o.mediaQueryKeys } = _,
        { actionListId: I } = w.config;
      oV(S, o.mediaQueryKeys) || t.dispatch(ls()),
        w.actionTypeId === Me.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(_.config) ? _.config : [_.config]).forEach((R) => {
            let { continuousParameterGroupId: M } = R,
              D = (0, yt.default)(s, `${I}.continuousParameterGroups`, []),
              F = (0, p_.default)(D, ({ id: K }) => K === M),
              X = (R.smoothing || 0) / 100,
              z = (R.restingState || 0) / 100;
            F &&
              g.forEach((K, Y) => {
                let B = T + Os + Y;
                _V({
                  store: t,
                  eventStateKey: B,
                  eventTarget: K,
                  eventId: T,
                  eventConfig: R,
                  actionListId: I,
                  parameterGroup: F,
                  smoothing: X,
                  restingValue: z,
                });
              });
          }),
        (w.actionTypeId === Me.GENERAL_START_ACTION || ws(w.actionTypeId)) &&
          I_({ store: t, actionListId: I, eventId: T });
    });
    let u = (g) => {
        let { ixSession: v } = t.getState();
        AV(a, (_, w, T) => {
          let S = r[w],
            I = v.eventState[T],
            { action: N, mediaQueries: R = o.mediaQueryKeys } = S;
          if (!xi(R, v.mediaQueryKey)) return;
          let M = (D = {}) => {
            let F = i(
              {
                store: t,
                element: _,
                event: S,
                eventConfig: D,
                nativeEvent: g,
                eventStateKey: T,
              },
              I
            );
            aV(F, I) || t.dispatch(os(T, F));
          };
          N.actionTypeId === Me.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(S.config) ? S.config : [S.config]).forEach(M)
            : M();
        });
      },
      f = (0, E_.default)(u, cV),
      h = ({ target: g = document, types: v, throttle: _ }) => {
        v.split(" ")
          .filter(Boolean)
          .forEach((w) => {
            let T = _ ? f : u;
            g.addEventListener(w, T), t.dispatch(di(g, [w, T]));
          });
      };
    Array.isArray(n) ? n.forEach(h) : typeof n == "string" && h(e);
  }
  function CV(e) {
    if (!uV) return;
    let t = {},
      r = "";
    for (let n in e) {
      let { eventTypeId: i, target: o } = e[n],
        s = ds(o);
      t[s] ||
        ((i === Ye.MOUSE_CLICK || i === Ye.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (r += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (r) {
      let n = document.createElement("style");
      (n.textContent = r), document.body.appendChild(n);
    }
  }
  function I_({ store: e, actionListId: t, eventId: r }) {
    let { ixData: n, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = n,
      a = s[r],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let f = (0, yt.default)(u, "actionItemGroups[0].actionItems", []),
        h = (0, yt.default)(a, "mediaQueries", n.mediaQueryKeys);
      if (!xi(h, i.mediaQueryKey)) return;
      f.forEach((g) => {
        let { config: v, actionTypeId: _ } = g,
          w =
            v?.target?.useEventTarget === !0 && v?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : v,
          T = Ai({ config: w, event: a, elementApi: Ne }),
          S = Si(_);
        T.forEach((I) => {
          let N = S ? xs(_)(I, g) : null;
          Ss({
            destination: As({ element: I, actionItem: g, elementApi: Ne }, N),
            immediate: !0,
            store: e,
            element: I,
            eventId: r,
            actionItem: g,
            actionListId: t,
            pluginInstance: N,
          });
        });
      });
    }
  }
  function w_({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, Er.default)(t, (r) => {
      if (!r.continuous) {
        let { actionListId: n, verbose: i } = r;
        Cs(r, e), i && e.dispatch(hr({ actionListId: n, isPlaying: !1 }));
      }
    });
  }
  function yr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && r ? en(r, Oi) : null;
    (0, Er.default)(o, (u) => {
      let f = (0, yt.default)(u, "actionItem.config.target.boundaryMode"),
        h = n ? u.eventStateKey === n : !0;
      if (u.actionListId === i && u.eventId === t && h) {
        if (a && f && !ps(a, u.element)) return;
        Cs(u, e),
          u.verbose && e.dispatch(hr({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function on({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: f } = e.getState(),
      { events: h } = u,
      g = h[t] || {},
      { mediaQueries: v = u.mediaQueryKeys } = g,
      _ = (0, yt.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: w, useFirstGroupAsInitialState: T } = _;
    if (!w || !w.length) return !1;
    o >= w.length && (0, yt.default)(g, "config.loop") && (o = 0),
      o === 0 && T && o++;
    let I =
        (o === 0 || (o === 1 && T)) && ws(g.action?.actionTypeId)
          ? g.config.delay
          : void 0,
      N = (0, yt.default)(w, [o, "actionItems"], []);
    if (!N.length || !xi(v, f.mediaQueryKey)) return !1;
    let R = f.hasBoundaryNodes && r ? en(r, Oi) : null,
      M = $U(N),
      D = !1;
    return (
      N.forEach((F, X) => {
        let { config: z, actionTypeId: K } = F,
          Y = Si(K),
          { target: B } = z;
        if (!B) return;
        let x = B.boundaryMode ? R : null;
        Ai({
          config: z,
          event: g,
          eventTarget: r,
          elementRoot: x,
          elementApi: Ne,
        }).forEach((P, G) => {
          let W = Y ? xs(K)(P, F) : null,
            Z = Y ? sV(K)(P, F) : null;
          D = !0;
          let J = M === X && G === 0,
            U = QU({ element: P, actionItem: F }),
            H = As({ element: P, actionItem: F, elementApi: Ne }, W);
          Ss({
            store: e,
            element: P,
            actionItem: F,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i,
            groupIndex: o,
            isCarrier: J,
            computedStyle: U,
            destination: H,
            immediate: s,
            verbose: a,
            pluginInstance: W,
            pluginDuration: Z,
            instanceDelay: I,
          });
        });
      }),
      D
    );
  }
  function Ss(e) {
    let { store: t, computedStyle: r, ...n } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: f,
        eventId: h,
      } = n,
      g = !u,
      v = KU(),
      { ixElements: _, ixSession: w, ixData: T } = t.getState(),
      S = zU(_, i),
      { refState: I } = _[S] || {},
      N = gs(i),
      R = w.reducedMotion && Ko[o.actionTypeId],
      M;
    if (R && u)
      switch (T.events[h]?.eventTypeId) {
        case Ye.MOUSE_MOVE:
        case Ye.MOUSE_MOVE_IN_VIEWPORT:
          M = f;
          break;
        default:
          M = 0.5;
          break;
      }
    let D = ZU(i, I, r, o, Ne, a);
    if (
      (t.dispatch(
        as({
          instanceId: v,
          elementId: S,
          origin: D,
          refType: N,
          skipMotion: R,
          skipToValue: M,
          ...n,
        })
      ),
      O_(document.body, "ix2-animation-started", v),
      s)
    ) {
      RV(t, v);
      return;
    }
    Gt({ store: t, select: ({ ixInstances: F }) => F[v], onChange: A_ }),
      g && t.dispatch(gi(v, w.tick));
  }
  function Cs(e, t) {
    O_(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: r, actionItem: n } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[r] || {};
    s === m_ && rV(o, n, Ne), t.dispatch(ss(e.id));
  }
  function O_(e, t, r) {
    let n = document.createEvent("CustomEvent");
    n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
  }
  function RV(e, t) {
    let { ixParameters: r } = e.getState();
    e.dispatch(gi(t, 0)), e.dispatch(pi(performance.now(), r));
    let { ixInstances: n } = e.getState();
    A_(n[t], e);
  }
  function A_(e, t) {
    let {
        active: r,
        continuous: n,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: f,
        groupIndex: h,
        eventId: g,
        eventTarget: v,
        eventStateKey: _,
        actionListId: w,
        isCarrier: T,
        styleProp: S,
        verbose: I,
        pluginInstance: N,
      } = e,
      { ixData: R, ixSession: M } = t.getState(),
      { events: D } = R,
      F = D[g] || {},
      { mediaQueries: X = R.mediaQueryKeys } = F;
    if (xi(X, M.mediaQueryKey) && (n || r || i)) {
      if (f || (u === jU && i)) {
        t.dispatch(us(o, a, f, s));
        let { ixElements: z } = t.getState(),
          { ref: K, refType: Y, refState: B } = z[o] || {},
          x = B && B[a];
        (Y === m_ || Si(a)) && YU(K, B, x, g, s, S, Ne, u, N);
      }
      if (i) {
        if (T) {
          let z = on({
            store: t,
            eventId: g,
            eventTarget: v,
            eventStateKey: _,
            actionListId: w,
            groupIndex: h + 1,
            verbose: I,
          });
          I && !z && t.dispatch(hr({ actionListId: w, isPlaying: !1 }));
        }
        Cs(e, t);
      }
    }
  }
  var p_,
    yt,
    g_,
    v_,
    h_,
    y_,
    Er,
    E_,
    wi,
    XU,
    ws,
    Os,
    Oi,
    m_,
    jU,
    f_,
    Ai,
    zU,
    As,
    Gt,
    KU,
    YU,
    __,
    $U,
    QU,
    ZU,
    JU,
    eV,
    tV,
    xi,
    rV,
    nV,
    iV,
    oV,
    aV,
    Si,
    xs,
    sV,
    d_,
    uV,
    cV,
    IV,
    OV,
    AV,
    xV,
    Is = ge(() => {
      "use strict";
      (p_ = se(Ia())),
        (yt = se(Kn())),
        (g_ = se(Uy())),
        (v_ = se(dE())),
        (h_ = se(gE())),
        (y_ = se(hE())),
        (Er = se(TE())),
        (E_ = se(CE()));
      De();
      wi = se(kt());
      vi();
      FE();
      l_();
      (XU = Object.keys(An)),
        (ws = (e) => XU.includes(e)),
        ({
          COLON_DELIMITER: Os,
          BOUNDARY_SELECTOR: Oi,
          HTML_ELEMENT: m_,
          RENDER_GENERAL: jU,
          W_MOD_IX: f_,
        } = Ae),
        ({
          getAffectedElements: Ai,
          getElementId: zU,
          getDestinationValues: As,
          observeStore: Gt,
          getInstanceId: KU,
          renderHTMLElement: YU,
          clearAllStyles: __,
          getMaxDurationItemIndex: $U,
          getComputedStyle: QU,
          getInstanceOrigin: ZU,
          reduceListToGroup: JU,
          shouldNamespaceEventParameter: eV,
          getNamespacedParameterId: tV,
          shouldAllowMediaQuery: xi,
          cleanupHTMLElement: rV,
          clearObjectCache: nV,
          stringifyTarget: iV,
          mediaQueriesEqual: oV,
          shallowEqual: aV,
        } = wi.IX2VanillaUtils),
        ({
          isPluginType: Si,
          createPluginInstance: xs,
          getPluginDuration: sV,
        } = wi.IX2VanillaPlugins),
        (d_ = navigator.userAgent),
        (uV = d_.match(/iPad/i) || d_.match(/iPhone/)),
        (cV = 12);
      IV = ["resize", "orientationchange"];
      (OV = (e, t) => (0, v_.default)((0, y_.default)(e, t), h_.default)),
        (AV = (e, t) => {
          (0, Er.default)(e, (r, n) => {
            r.forEach((i, o) => {
              let s = n + Os + o;
              t(i, n, s);
            });
          });
        }),
        (xV = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Ai({ config: t, elementApi: Ne });
        });
    });
  var C_ = c((Et) => {
    "use strict";
    var LV = pn().default,
      NV = lu().default;
    Object.defineProperty(Et, "__esModule", { value: !0 });
    Et.actions = void 0;
    Et.destroy = S_;
    Et.init = DV;
    Et.setEnv = MV;
    Et.store = void 0;
    Yl();
    var PV = Xo(),
      qV = NV((by(), tt(_y))),
      Rs = (Is(), tt(x_)),
      FV = LV((vi(), tt(LE)));
    Et.actions = FV;
    var Ls = (Et.store = (0, PV.createStore)(qV.default));
    function MV(e) {
      e() && (0, Rs.observeRequests)(Ls);
    }
    function DV(e) {
      S_(), (0, Rs.startEngine)({ store: Ls, rawData: e, allowEvents: !0 });
    }
    function S_() {
      (0, Rs.stopEngine)(Ls);
    }
  });
  var P_ = c((cz, N_) => {
    "use strict";
    var R_ = Fe(),
      L_ = C_();
    L_.setEnv(R_.env);
    R_.define(
      "ix2",
      (N_.exports = function () {
        return L_;
      })
    );
  });
  var F_ = c((lz, q_) => {
    "use strict";
    var mr = Fe();
    mr.define(
      "links",
      (q_.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = mr.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          f = /index\.(html|php)$/,
          h = /\/$/,
          g,
          v;
        r.ready = r.design = r.preview = _;
        function _() {
          (i = o && mr.env("design")),
            (v = mr.env("slug") || s.pathname || ""),
            mr.scroll.off(T),
            (g = []);
          for (var I = document.links, N = 0; N < I.length; ++N) w(I[N]);
          g.length && (mr.scroll.on(T), T());
        }
        function w(I) {
          if (!I.getAttribute("hreflang")) {
            var N =
              (i && I.getAttribute("href-disabled")) || I.getAttribute("href");
            if (((a.href = N), !(N.indexOf(":") >= 0))) {
              var R = e(I);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var M = e(a.hash);
                M.length && g.push({ link: R, sec: M, active: !1 });
                return;
              }
              if (!(N === "#" || N === "")) {
                var D =
                  a.href === s.href || N === v || (f.test(N) && h.test(v));
                S(R, u, D);
              }
            }
          }
        }
        function T() {
          var I = n.scrollTop(),
            N = n.height();
          t.each(g, function (R) {
            if (!R.link.attr("hreflang")) {
              var M = R.link,
                D = R.sec,
                F = D.offset().top,
                X = D.outerHeight(),
                z = N * 0.5,
                K = D.is(":visible") && F + X - z >= I && F + z <= I + N;
              R.active !== K && ((R.active = K), S(M, u, K));
            }
          });
        }
        function S(I, N, R) {
          var M = I.hasClass(N);
          (R && M) || (!R && !M) || (R ? I.addClass(N) : I.removeClass(N));
        }
        return r;
      })
    );
  });
  var D_ = c((fz, M_) => {
    "use strict";
    var Li = Fe();
    Li.define(
      "scroll",
      (M_.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = w() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (x) {
              window.setTimeout(x, 15);
            },
          u = Li.env("editor") ? ".w-editor-body" : "body",
          f =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          h = 'a[href="#"]',
          g = 'a[href*="#"]:not(.w-tab-link):not(' + h + ")",
          v = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          _ = document.createElement("style");
        _.appendChild(document.createTextNode(v));
        function w() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var T = /^#[a-zA-Z0-9][\w:.-]*$/;
        function S(x) {
          return T.test(x.hash) && x.host + x.pathname === r.host + r.pathname;
        }
        let I =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function N() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            I.matches
          );
        }
        function R(x, y) {
          var P;
          switch (y) {
            case "add":
              (P = x.attr("tabindex")),
                P
                  ? x.attr("data-wf-tabindex-swap", P)
                  : x.attr("tabindex", "-1");
              break;
            case "remove":
              (P = x.attr("data-wf-tabindex-swap")),
                P
                  ? (x.attr("tabindex", P),
                    x.removeAttr("data-wf-tabindex-swap"))
                  : x.removeAttr("tabindex");
              break;
          }
          x.toggleClass("wf-force-outline-none", y === "add");
        }
        function M(x) {
          var y = x.currentTarget;
          if (
            !(
              Li.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(y.className))
            )
          ) {
            var P = S(y) ? y.hash : "";
            if (P !== "") {
              var G = e(P);
              G.length &&
                (x && (x.preventDefault(), x.stopPropagation()),
                D(P, x),
                window.setTimeout(
                  function () {
                    F(G, function () {
                      R(G, "add"),
                        G.get(0).focus({ preventScroll: !0 }),
                        R(G, "remove");
                    });
                  },
                  x ? 0 : 300
                ));
            }
          }
        }
        function D(x) {
          if (
            r.hash !== x &&
            n &&
            n.pushState &&
            !(Li.env.chrome && r.protocol === "file:")
          ) {
            var y = n.state && n.state.hash;
            y !== x && n.pushState({ hash: x }, "", x);
          }
        }
        function F(x, y) {
          var P = i.scrollTop(),
            G = X(x);
          if (P !== G) {
            var W = z(x, P, G),
              Z = Date.now(),
              J = function () {
                var U = Date.now() - Z;
                window.scroll(0, K(P, G, U, W)),
                  U <= W ? a(J) : typeof y == "function" && y();
              };
            a(J);
          }
        }
        function X(x) {
          var y = e(f),
            P = y.css("position") === "fixed" ? y.outerHeight() : 0,
            G = x.offset().top - P;
          if (x.data("scroll") === "mid") {
            var W = i.height() - P,
              Z = x.outerHeight();
            Z < W && (G -= Math.round((W - Z) / 2));
          }
          return G;
        }
        function z(x, y, P) {
          if (N()) return 0;
          var G = 1;
          return (
            s.add(x).each(function (W, Z) {
              var J = parseFloat(Z.getAttribute("data-scroll-time"));
              !isNaN(J) && J >= 0 && (G = J);
            }),
            (472.143 * Math.log(Math.abs(y - P) + 125) - 2e3) * G
          );
        }
        function K(x, y, P, G) {
          return P > G ? y : x + (y - x) * Y(P / G);
        }
        function Y(x) {
          return x < 0.5
            ? 4 * x * x * x
            : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1;
        }
        function B() {
          var { WF_CLICK_EMPTY: x, WF_CLICK_SCROLL: y } = t;
          o.on(y, g, M),
            o.on(x, h, function (P) {
              P.preventDefault();
            }),
            document.head.insertBefore(_, document.head.firstChild);
        }
        return { ready: B };
      })
    );
  });
  var G_ = c((dz, k_) => {
    "use strict";
    var kV = Fe();
    kV.define(
      "touch",
      (k_.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null
            );
          });
        function n(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            f,
            h;
          o.addEventListener("touchstart", g, !1),
            o.addEventListener("touchmove", v, !1),
            o.addEventListener("touchend", _, !1),
            o.addEventListener("touchcancel", w, !1),
            o.addEventListener("mousedown", g, !1),
            o.addEventListener("mousemove", v, !1),
            o.addEventListener("mouseup", _, !1),
            o.addEventListener("mouseout", w, !1);
          function g(S) {
            var I = S.touches;
            (I && I.length > 1) ||
              ((s = !0),
              I ? ((a = !0), (f = I[0].clientX)) : (f = S.clientX),
              (h = f));
          }
          function v(S) {
            if (s) {
              if (a && S.type === "mousemove") {
                S.preventDefault(), S.stopPropagation();
                return;
              }
              var I = S.touches,
                N = I ? I[0].clientX : S.clientX,
                R = N - h;
              (h = N),
                Math.abs(R) > u &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", S, { direction: R > 0 ? "right" : "left" }), w());
            }
          }
          function _(S) {
            if (s && ((s = !1), a && S.type === "mouseup")) {
              S.preventDefault(), S.stopPropagation(), (a = !1);
              return;
            }
          }
          function w() {
            s = !1;
          }
          function T() {
            o.removeEventListener("touchstart", g, !1),
              o.removeEventListener("touchmove", v, !1),
              o.removeEventListener("touchend", _, !1),
              o.removeEventListener("touchcancel", w, !1),
              o.removeEventListener("mousedown", g, !1),
              o.removeEventListener("mousemove", v, !1),
              o.removeEventListener("mouseup", _, !1),
              o.removeEventListener("mouseout", w, !1),
              (o = null);
          }
          this.destroy = T;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var B_ = c((pz, V_) => {
    "use strict";
    var Ut = Fe(),
      GV = br(),
      Ze = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      U_ = !0,
      UV = /^#[a-zA-Z0-9\-_]+$/;
    Ut.define(
      "dropdown",
      (V_.exports = function (e, t) {
        var r = t.debounce,
          n = {},
          i = Ut.env(),
          o = !1,
          s,
          a = Ut.env.touch,
          u = ".w-dropdown",
          f = "w--open",
          h = GV.triggers,
          g = 900,
          v = "focusout" + u,
          _ = "keydown" + u,
          w = "mouseenter" + u,
          T = "mousemove" + u,
          S = "mouseleave" + u,
          I = (a ? "click" : "mouseup") + u,
          N = "w-close" + u,
          R = "setting" + u,
          M = e(document),
          D;
        (n.ready = F),
          (n.design = function () {
            o && y(), (o = !1), F();
          }),
          (n.preview = function () {
            (o = !0), F();
          });
        function F() {
          (s = i && Ut.env("design")), (D = M.find(u)), D.each(X);
        }
        function X(l, k) {
          var V = e(k),
            C = e.data(k, u);
          C ||
            (C = e.data(k, u, {
              open: !1,
              el: V,
              config: {},
              selectedIdx: -1,
            })),
            (C.toggle = C.el.children(".w-dropdown-toggle")),
            (C.list = C.el.children(".w-dropdown-list")),
            (C.links = C.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (C.complete = W(C)),
            (C.mouseLeave = J(C)),
            (C.mouseUpOutside = G(C)),
            (C.mouseMoveOutside = U(C)),
            z(C);
          var re = C.toggle.attr("id"),
            ue = C.list.attr("id");
          re || (re = "w-dropdown-toggle-" + l),
            ue || (ue = "w-dropdown-list-" + l),
            C.toggle.attr("id", re),
            C.toggle.attr("aria-controls", ue),
            C.toggle.attr("aria-haspopup", "menu"),
            C.toggle.attr("aria-expanded", "false"),
            C.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            C.toggle.prop("tagName") !== "BUTTON" &&
              (C.toggle.attr("role", "button"),
              C.toggle.attr("tabindex") || C.toggle.attr("tabindex", "0")),
            C.list.attr("id", ue),
            C.list.attr("aria-labelledby", re),
            C.links.each(function (de, _e) {
              _e.hasAttribute("tabindex") || _e.setAttribute("tabindex", "0"),
                UV.test(_e.hash) &&
                  _e.addEventListener("click", x.bind(null, C));
            }),
            C.el.off(u),
            C.toggle.off(u),
            C.nav && C.nav.off(u);
          var ie = Y(C, U_);
          s && C.el.on(R, K(C)),
            s ||
              (i && ((C.hovering = !1), x(C)),
              C.config.hover && C.toggle.on(w, Z(C)),
              C.el.on(N, ie),
              C.el.on(_, H(C)),
              C.el.on(v, m(C)),
              C.toggle.on(I, ie),
              C.toggle.on(_, E(C)),
              (C.nav = C.el.closest(".w-nav")),
              C.nav.on(N, ie));
        }
        function z(l) {
          var k = Number(l.el.css("z-index"));
          (l.manageZ = k === g || k === g + 1),
            (l.config = {
              hover: l.el.attr("data-hover") === "true" && !a,
              delay: l.el.attr("data-delay"),
            });
        }
        function K(l) {
          return function (k, V) {
            (V = V || {}),
              z(l),
              V.open === !0 && B(l, !0),
              V.open === !1 && x(l, { immediate: !0 });
          };
        }
        function Y(l, k) {
          return r(function (V) {
            if (l.open || (V && V.type === "w-close"))
              return x(l, { forceClose: k });
            B(l);
          });
        }
        function B(l) {
          if (!l.open) {
            P(l),
              (l.open = !0),
              l.list.addClass(f),
              l.toggle.addClass(f),
              l.toggle.attr("aria-expanded", "true"),
              h.intro(0, l.el[0]),
              Ut.redraw.up(),
              l.manageZ && l.el.css("z-index", g + 1);
            var k = Ut.env("editor");
            s || M.on(I, l.mouseUpOutside),
              l.hovering && !k && l.el.on(S, l.mouseLeave),
              l.hovering && k && M.on(T, l.mouseMoveOutside),
              window.clearTimeout(l.delayId);
          }
        }
        function x(l, { immediate: k, forceClose: V } = {}) {
          if (l.open && !(l.config.hover && l.hovering && !V)) {
            l.toggle.attr("aria-expanded", "false"), (l.open = !1);
            var C = l.config;
            if (
              (h.outro(0, l.el[0]),
              M.off(I, l.mouseUpOutside),
              M.off(T, l.mouseMoveOutside),
              l.el.off(S, l.mouseLeave),
              window.clearTimeout(l.delayId),
              !C.delay || k)
            )
              return l.complete();
            l.delayId = window.setTimeout(l.complete, C.delay);
          }
        }
        function y() {
          M.find(u).each(function (l, k) {
            e(k).triggerHandler(N);
          });
        }
        function P(l) {
          var k = l.el[0];
          D.each(function (V, C) {
            var re = e(C);
            re.is(k) || re.has(k).length || re.triggerHandler(N);
          });
        }
        function G(l) {
          return (
            l.mouseUpOutside && M.off(I, l.mouseUpOutside),
            r(function (k) {
              if (l.open) {
                var V = e(k.target);
                if (!V.closest(".w-dropdown-toggle").length) {
                  var C = e.inArray(l.el[0], V.parents(u)) === -1,
                    re = Ut.env("editor");
                  if (C) {
                    if (re) {
                      var ue =
                          V.parents().length === 1 &&
                          V.parents("svg").length === 1,
                        ie = V.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (ue || ie) return;
                    }
                    x(l);
                  }
                }
              }
            })
          );
        }
        function W(l) {
          return function () {
            l.list.removeClass(f),
              l.toggle.removeClass(f),
              l.manageZ && l.el.css("z-index", "");
          };
        }
        function Z(l) {
          return function () {
            (l.hovering = !0), B(l);
          };
        }
        function J(l) {
          return function () {
            (l.hovering = !1), l.links.is(":focus") || x(l);
          };
        }
        function U(l) {
          return r(function (k) {
            if (l.open) {
              var V = e(k.target),
                C = e.inArray(l.el[0], V.parents(u)) === -1;
              if (C) {
                var re = V.parents(".w-editor-bem-EditorHoverControls").length,
                  ue = V.parents(".w-editor-bem-RTToolbar").length,
                  ie = e(".w-editor-bem-EditorOverlay"),
                  de =
                    ie.find(".w-editor-edit-outline").length ||
                    ie.find(".w-editor-bem-RTToolbar").length;
                if (re || ue || de) return;
                (l.hovering = !1), x(l);
              }
            }
          });
        }
        function H(l) {
          return function (k) {
            if (!(s || !l.open))
              switch (
                ((l.selectedIdx = l.links.index(document.activeElement)),
                k.keyCode)
              ) {
                case Ze.HOME:
                  return l.open
                    ? ((l.selectedIdx = 0), p(l), k.preventDefault())
                    : void 0;
                case Ze.END:
                  return l.open
                    ? ((l.selectedIdx = l.links.length - 1),
                      p(l),
                      k.preventDefault())
                    : void 0;
                case Ze.ESCAPE:
                  return x(l), l.toggle.focus(), k.stopPropagation();
                case Ze.ARROW_RIGHT:
                case Ze.ARROW_DOWN:
                  return (
                    (l.selectedIdx = Math.min(
                      l.links.length - 1,
                      l.selectedIdx + 1
                    )),
                    p(l),
                    k.preventDefault()
                  );
                case Ze.ARROW_LEFT:
                case Ze.ARROW_UP:
                  return (
                    (l.selectedIdx = Math.max(-1, l.selectedIdx - 1)),
                    p(l),
                    k.preventDefault()
                  );
              }
          };
        }
        function p(l) {
          l.links[l.selectedIdx] && l.links[l.selectedIdx].focus();
        }
        function E(l) {
          var k = Y(l, U_);
          return function (V) {
            if (!s) {
              if (!l.open)
                switch (V.keyCode) {
                  case Ze.ARROW_UP:
                  case Ze.ARROW_DOWN:
                    return V.stopPropagation();
                }
              switch (V.keyCode) {
                case Ze.SPACE:
                case Ze.ENTER:
                  return k(), V.stopPropagation(), V.preventDefault();
              }
            }
          };
        }
        function m(l) {
          return r(function (k) {
            var { relatedTarget: V, target: C } = k,
              re = l.el[0],
              ue = re.contains(V) || re.contains(C);
            return ue || x(l), k.stopPropagation();
          });
        }
        return n;
      })
    );
  });
  var W_ = c((Ns) => {
    "use strict";
    Object.defineProperty(Ns, "__esModule", { value: !0 });
    Ns.default = VV;
    function VV(e, t, r, n, i, o, s, a, u, f, h, g, v) {
      return function (_) {
        e(_);
        var w = _.form,
          T = {
            name: w.attr("data-name") || w.attr("name") || "Untitled Form",
            pageId: w.attr("data-wf-page-id") || "",
            elementId: w.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              w.html()
            ),
            trackingCookies: n(),
          };
        let S = w.attr("data-wf-flow");
        S && (T.wfFlow = S), i(_);
        var I = o(w, T.fields);
        if (I) return s(I);
        if (((T.fileUploads = a(w)), u(_), !f)) {
          h(_);
          return;
        }
        g.ajax({
          url: v,
          type: "POST",
          data: T,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (N) {
            N && N.code === 200 && (_.success = !0), h(_);
          })
          .fail(function () {
            h(_);
          });
      };
    }
  });
  var K_ = c((hz, z_) => {
    "use strict";
    var xt = Fe(),
      BV = br(),
      lt = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      j_ =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    xt.define(
      "slider",
      (z_.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(document),
          o,
          s,
          a = xt.env(),
          u = ".w-slider",
          f = '<div class="w-slider-dot" data-wf-ignore />',
          h =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          g = "w-slider-force-show",
          v = BV.triggers,
          _,
          w = !1;
        (r.ready = function () {
          (s = xt.env("design")), T();
        }),
          (r.design = function () {
            (s = !0), setTimeout(T, 1e3);
          }),
          (r.preview = function () {
            (s = !1), T();
          }),
          (r.redraw = function () {
            (w = !0), T(), (w = !1);
          }),
          (r.destroy = S);
        function T() {
          (o = i.find(u)), o.length && (o.each(R), !_ && (S(), I()));
        }
        function S() {
          xt.resize.off(N), xt.redraw.off(r.redraw);
        }
        function I() {
          xt.resize.on(N), xt.redraw.on(r.redraw);
        }
        function N() {
          o.filter(":visible").each(W);
        }
        function R(p, E) {
          var m = e(E),
            l = e.data(E, u);
          l ||
            (l = e.data(E, u, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: m,
              config: {},
            })),
            (l.mask = m.children(".w-slider-mask")),
            (l.left = m.children(".w-slider-arrow-left")),
            (l.right = m.children(".w-slider-arrow-right")),
            (l.nav = m.children(".w-slider-nav")),
            (l.slides = l.mask.children(".w-slide")),
            l.slides.each(v.reset),
            w && (l.maskWidth = 0),
            m.attr("role") === void 0 && m.attr("role", "region"),
            m.attr("aria-label") === void 0 && m.attr("aria-label", "carousel");
          var k = l.mask.attr("id");
          if (
            (k || ((k = "w-slider-mask-" + p), l.mask.attr("id", k)),
            !s && !l.ariaLiveLabel && (l.ariaLiveLabel = e(h).appendTo(l.mask)),
            l.left.attr("role", "button"),
            l.left.attr("tabindex", "0"),
            l.left.attr("aria-controls", k),
            l.left.attr("aria-label") === void 0 &&
              l.left.attr("aria-label", "previous slide"),
            l.right.attr("role", "button"),
            l.right.attr("tabindex", "0"),
            l.right.attr("aria-controls", k),
            l.right.attr("aria-label") === void 0 &&
              l.right.attr("aria-label", "next slide"),
            !n.support.transform)
          ) {
            l.left.hide(), l.right.hide(), l.nav.hide(), (_ = !0);
            return;
          }
          l.el.off(u),
            l.left.off(u),
            l.right.off(u),
            l.nav.off(u),
            M(l),
            s
              ? (l.el.on("setting" + u, y(l)), x(l), (l.hasTimer = !1))
              : (l.el.on("swipe" + u, y(l)),
                l.left.on("click" + u, z(l)),
                l.right.on("click" + u, K(l)),
                l.left.on("keydown" + u, X(l, z)),
                l.right.on("keydown" + u, X(l, K)),
                l.nav.on("keydown" + u, "> div", y(l)),
                l.config.autoplay &&
                  !l.hasTimer &&
                  ((l.hasTimer = !0), (l.timerCount = 1), B(l)),
                l.el.on("mouseenter" + u, F(l, !0, "mouse")),
                l.el.on("focusin" + u, F(l, !0, "keyboard")),
                l.el.on("mouseleave" + u, F(l, !1, "mouse")),
                l.el.on("focusout" + u, F(l, !1, "keyboard"))),
            l.nav.on("click" + u, "> div", y(l)),
            a ||
              l.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
          var V = m.filter(":hidden");
          V.addClass(g);
          var C = m.parents(":hidden");
          C.addClass(g), w || W(p, E), V.removeClass(g), C.removeClass(g);
        }
        function M(p) {
          var E = {};
          (E.crossOver = 0),
            (E.animation = p.el.attr("data-animation") || "slide"),
            E.animation === "outin" &&
              ((E.animation = "cross"), (E.crossOver = 0.5)),
            (E.easing = p.el.attr("data-easing") || "ease");
          var m = p.el.attr("data-duration");
          if (
            ((E.duration = m != null ? parseInt(m, 10) : 500),
            D(p.el.attr("data-infinite")) && (E.infinite = !0),
            D(p.el.attr("data-disable-swipe")) && (E.disableSwipe = !0),
            D(p.el.attr("data-hide-arrows"))
              ? (E.hideArrows = !0)
              : p.config.hideArrows && (p.left.show(), p.right.show()),
            D(p.el.attr("data-autoplay")))
          ) {
            (E.autoplay = !0),
              (E.delay = parseInt(p.el.attr("data-delay"), 10) || 2e3),
              (E.timerMax = parseInt(p.el.attr("data-autoplay-limit"), 10));
            var l = "mousedown" + u + " touchstart" + u;
            s ||
              p.el.off(l).one(l, function () {
                x(p);
              });
          }
          var k = p.right.width();
          (E.edge = k ? k + 40 : 100), (p.config = E);
        }
        function D(p) {
          return p === "1" || p === "true";
        }
        function F(p, E, m) {
          return function (l) {
            if (E) p.hasFocus[m] = E;
            else if (
              e.contains(p.el.get(0), l.relatedTarget) ||
              ((p.hasFocus[m] = E),
              (p.hasFocus.mouse && m === "keyboard") ||
                (p.hasFocus.keyboard && m === "mouse"))
            )
              return;
            E
              ? (p.ariaLiveLabel.attr("aria-live", "polite"),
                p.hasTimer && x(p))
              : (p.ariaLiveLabel.attr("aria-live", "off"), p.hasTimer && B(p));
          };
        }
        function X(p, E) {
          return function (m) {
            switch (m.keyCode) {
              case lt.SPACE:
              case lt.ENTER:
                return E(p)(), m.preventDefault(), m.stopPropagation();
            }
          };
        }
        function z(p) {
          return function () {
            G(p, { index: p.index - 1, vector: -1 });
          };
        }
        function K(p) {
          return function () {
            G(p, { index: p.index + 1, vector: 1 });
          };
        }
        function Y(p, E) {
          var m = null;
          E === p.slides.length && (T(), Z(p)),
            t.each(p.anchors, function (l, k) {
              e(l.els).each(function (V, C) {
                e(C).index() === E && (m = k);
              });
            }),
            m != null && G(p, { index: m, immediate: !0 });
        }
        function B(p) {
          x(p);
          var E = p.config,
            m = E.timerMax;
          (m && p.timerCount++ > m) ||
            (p.timerId = window.setTimeout(function () {
              p.timerId == null || s || (K(p)(), B(p));
            }, E.delay));
        }
        function x(p) {
          window.clearTimeout(p.timerId), (p.timerId = null);
        }
        function y(p) {
          return function (E, m) {
            m = m || {};
            var l = p.config;
            if (s && E.type === "setting") {
              if (m.select === "prev") return z(p)();
              if (m.select === "next") return K(p)();
              if ((M(p), Z(p), m.select == null)) return;
              Y(p, m.select);
              return;
            }
            if (E.type === "swipe")
              return l.disableSwipe || xt.env("editor")
                ? void 0
                : m.direction === "left"
                ? K(p)()
                : m.direction === "right"
                ? z(p)()
                : void 0;
            if (p.nav.has(E.target).length) {
              var k = e(E.target).index();
              if (
                (E.type === "click" && G(p, { index: k }), E.type === "keydown")
              )
                switch (E.keyCode) {
                  case lt.ENTER:
                  case lt.SPACE: {
                    G(p, { index: k }), E.preventDefault();
                    break;
                  }
                  case lt.ARROW_LEFT:
                  case lt.ARROW_UP: {
                    P(p.nav, Math.max(k - 1, 0)), E.preventDefault();
                    break;
                  }
                  case lt.ARROW_RIGHT:
                  case lt.ARROW_DOWN: {
                    P(p.nav, Math.min(k + 1, p.pages)), E.preventDefault();
                    break;
                  }
                  case lt.HOME: {
                    P(p.nav, 0), E.preventDefault();
                    break;
                  }
                  case lt.END: {
                    P(p.nav, p.pages), E.preventDefault();
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function P(p, E) {
          var m = p.children().eq(E).focus();
          p.children().not(m);
        }
        function G(p, E) {
          E = E || {};
          var m = p.config,
            l = p.anchors;
          p.previous = p.index;
          var k = E.index,
            V = {};
          k < 0
            ? ((k = l.length - 1),
              m.infinite &&
                ((V.x = -p.endX), (V.from = 0), (V.to = l[0].width)))
            : k >= l.length &&
              ((k = 0),
              m.infinite &&
                ((V.x = l[l.length - 1].width),
                (V.from = -l[l.length - 1].x),
                (V.to = V.from - V.x))),
            (p.index = k);
          var C = p.nav
            .children()
            .eq(k)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          p.nav
            .children()
            .not(C)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            m.hideArrows &&
              (p.index === l.length - 1 ? p.right.hide() : p.right.show(),
              p.index === 0 ? p.left.hide() : p.left.show());
          var re = p.offsetX || 0,
            ue = (p.offsetX = -l[p.index].x),
            ie = { x: ue, opacity: 1, visibility: "" },
            de = e(l[p.index].els),
            _e = e(l[p.previous] && l[p.previous].els),
            Ue = p.slides.not(de),
            Je = m.animation,
            xe = m.easing,
            ft = Math.round(m.duration),
            Vt = E.vector || (p.index > p.previous ? 1 : -1),
            d = "opacity " + ft + "ms " + xe,
            b = "transform " + ft + "ms " + xe;
          if (
            (de.find(j_).removeAttr("tabindex"),
            de.removeAttr("aria-hidden"),
            de.find("*").removeAttr("aria-hidden"),
            Ue.find(j_).attr("tabindex", "-1"),
            Ue.attr("aria-hidden", "true"),
            Ue.find("*").attr("aria-hidden", "true"),
            s || (de.each(v.intro), Ue.each(v.outro)),
            E.immediate && !w)
          ) {
            n(de).set(ie), O();
            return;
          }
          if (p.index === p.previous) return;
          if (
            (s || p.ariaLiveLabel.text(`Slide ${k + 1} of ${l.length}.`),
            Je === "cross")
          ) {
            var A = Math.round(ft - ft * m.crossOver),
              L = Math.round(ft - A);
            (d = "opacity " + A + "ms " + xe),
              n(_e).set({ visibility: "" }).add(d).start({ opacity: 0 }),
              n(de)
                .set({ visibility: "", x: ue, opacity: 0, zIndex: p.depth++ })
                .add(d)
                .wait(L)
                .then({ opacity: 1 })
                .then(O);
            return;
          }
          if (Je === "fade") {
            n(_e).set({ visibility: "" }).stop(),
              n(de)
                .set({ visibility: "", x: ue, opacity: 0, zIndex: p.depth++ })
                .add(d)
                .start({ opacity: 1 })
                .then(O);
            return;
          }
          if (Je === "over") {
            (ie = { x: p.endX }),
              n(_e).set({ visibility: "" }).stop(),
              n(de)
                .set({
                  visibility: "",
                  zIndex: p.depth++,
                  x: ue + l[p.index].width * Vt,
                })
                .add(b)
                .start({ x: ue })
                .then(O);
            return;
          }
          m.infinite && V.x
            ? (n(p.slides.not(_e))
                .set({ visibility: "", x: V.x })
                .add(b)
                .start({ x: ue }),
              n(_e)
                .set({ visibility: "", x: V.from })
                .add(b)
                .start({ x: V.to }),
              (p.shifted = _e))
            : (m.infinite &&
                p.shifted &&
                (n(p.shifted).set({ visibility: "", x: re }),
                (p.shifted = null)),
              n(p.slides).set({ visibility: "" }).add(b).start({ x: ue }));
          function O() {
            (de = e(l[p.index].els)),
              (Ue = p.slides.not(de)),
              Je !== "slide" && (ie.visibility = "hidden"),
              n(Ue).set(ie);
          }
        }
        function W(p, E) {
          var m = e.data(E, u);
          if (m) {
            if (U(m)) return Z(m);
            s && H(m) && Z(m);
          }
        }
        function Z(p) {
          var E = 1,
            m = 0,
            l = 0,
            k = 0,
            V = p.maskWidth,
            C = V - p.config.edge;
          C < 0 && (C = 0),
            (p.anchors = [{ els: [], x: 0, width: 0 }]),
            p.slides.each(function (ue, ie) {
              l - m > C &&
                (E++,
                (m += V),
                (p.anchors[E - 1] = { els: [], x: l, width: 0 })),
                (k = e(ie).outerWidth(!0)),
                (l += k),
                (p.anchors[E - 1].width += k),
                p.anchors[E - 1].els.push(ie);
              var de = ue + 1 + " of " + p.slides.length;
              e(ie).attr("aria-label", de), e(ie).attr("role", "group");
            }),
            (p.endX = l),
            s && (p.pages = null),
            p.nav.length && p.pages !== E && ((p.pages = E), J(p));
          var re = p.index;
          re >= E && (re = E - 1), G(p, { immediate: !0, index: re });
        }
        function J(p) {
          var E = [],
            m,
            l = p.el.attr("data-nav-spacing");
          l && (l = parseFloat(l) + "px");
          for (var k = 0, V = p.pages; k < V; k++)
            (m = e(f)),
              m
                .attr("aria-label", "Show slide " + (k + 1) + " of " + V)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              p.nav.hasClass("w-num") && m.text(k + 1),
              l != null && m.css({ "margin-left": l, "margin-right": l }),
              E.push(m);
          p.nav.empty().append(E);
        }
        function U(p) {
          var E = p.mask.width();
          return p.maskWidth !== E ? ((p.maskWidth = E), !0) : !1;
        }
        function H(p) {
          var E = 0;
          return (
            p.slides.each(function (m, l) {
              E += e(l).outerWidth(!0);
            }),
            p.slidesWidth !== E ? ((p.slidesWidth = E), !0) : !1
          );
        }
        return r;
      })
    );
  });
  var $_ = c((yz, Y_) => {
    "use strict";
    var St = Fe(),
      WV = br();
    St.define(
      "tabs",
      (Y_.exports = function (e) {
        var t = {},
          r = e.tram,
          n = e(document),
          i,
          o,
          s = St.env,
          a = s.safari,
          u = s(),
          f = "data-w-tab",
          h = "data-w-pane",
          g = ".w-tabs",
          v = "w--current",
          _ = "w--tab-active",
          w = WV.triggers,
          T = !1;
        (t.ready = t.design = t.preview = S),
          (t.redraw = function () {
            (T = !0), S(), (T = !1);
          }),
          (t.destroy = function () {
            (i = n.find(g)), i.length && (i.each(R), I());
          });
        function S() {
          (o = u && St.env("design")),
            (i = n.find(g)),
            i.length &&
              (i.each(M), St.env("preview") && !T && i.each(R), I(), N());
        }
        function I() {
          St.redraw.off(t.redraw);
        }
        function N() {
          St.redraw.on(t.redraw);
        }
        function R(B, x) {
          var y = e.data(x, g);
          y &&
            (y.links && y.links.each(w.reset),
            y.panes && y.panes.each(w.reset));
        }
        function M(B, x) {
          var y = g.substr(1) + "-" + B,
            P = e(x),
            G = e.data(x, g);
          if (
            (G || (G = e.data(x, g, { el: P, config: {} })),
            (G.current = null),
            (G.tabIdentifier = y + "-" + f),
            (G.paneIdentifier = y + "-" + h),
            (G.menu = P.children(".w-tab-menu")),
            (G.links = G.menu.children(".w-tab-link")),
            (G.content = P.children(".w-tab-content")),
            (G.panes = G.content.children(".w-tab-pane")),
            G.el.off(g),
            G.links.off(g),
            G.menu.attr("role", "tablist"),
            G.links.attr("tabindex", "-1"),
            D(G),
            !o)
          ) {
            G.links.on("click" + g, X(G)), G.links.on("keydown" + g, z(G));
            var W = G.links.filter("." + v),
              Z = W.attr(f);
            Z && K(G, { tab: Z, immediate: !0 });
          }
        }
        function D(B) {
          var x = {};
          x.easing = B.el.attr("data-easing") || "ease";
          var y = parseInt(B.el.attr("data-duration-in"), 10);
          y = x.intro = y === y ? y : 0;
          var P = parseInt(B.el.attr("data-duration-out"), 10);
          (P = x.outro = P === P ? P : 0),
            (x.immediate = !y && !P),
            (B.config = x);
        }
        function F(B) {
          var x = B.current;
          return Array.prototype.findIndex.call(
            B.links,
            (y) => y.getAttribute(f) === x,
            null
          );
        }
        function X(B) {
          return function (x) {
            x.preventDefault();
            var y = x.currentTarget.getAttribute(f);
            y && K(B, { tab: y });
          };
        }
        function z(B) {
          return function (x) {
            var y = F(B),
              P = x.key,
              G = {
                ArrowLeft: y - 1,
                ArrowUp: y - 1,
                ArrowRight: y + 1,
                ArrowDown: y + 1,
                End: B.links.length - 1,
                Home: 0,
              };
            if (P in G) {
              x.preventDefault();
              var W = G[P];
              W === -1 && (W = B.links.length - 1),
                W === B.links.length && (W = 0);
              var Z = B.links[W],
                J = Z.getAttribute(f);
              J && K(B, { tab: J });
            }
          };
        }
        function K(B, x) {
          x = x || {};
          var y = B.config,
            P = y.easing,
            G = x.tab;
          if (G !== B.current) {
            B.current = G;
            var W;
            B.links.each(function (m, l) {
              var k = e(l);
              if (x.immediate || y.immediate) {
                var V = B.panes[m];
                l.id || (l.id = B.tabIdentifier + "-" + m),
                  V.id || (V.id = B.paneIdentifier + "-" + m),
                  (l.href = "#" + V.id),
                  l.setAttribute("role", "tab"),
                  l.setAttribute("aria-controls", V.id),
                  l.setAttribute("aria-selected", "false"),
                  V.setAttribute("role", "tabpanel"),
                  V.setAttribute("aria-labelledby", l.id);
              }
              l.getAttribute(f) === G
                ? ((W = l),
                  k
                    .addClass(v)
                    .removeAttr("tabindex")
                    .attr({ "aria-selected": "true" })
                    .each(w.intro))
                : k.hasClass(v) &&
                  k
                    .removeClass(v)
                    .attr({ tabindex: "-1", "aria-selected": "false" })
                    .each(w.outro);
            });
            var Z = [],
              J = [];
            B.panes.each(function (m, l) {
              var k = e(l);
              l.getAttribute(f) === G ? Z.push(l) : k.hasClass(_) && J.push(l);
            });
            var U = e(Z),
              H = e(J);
            if (x.immediate || y.immediate) {
              U.addClass(_).each(w.intro),
                H.removeClass(_),
                T || St.redraw.up();
              return;
            } else {
              var p = window.scrollX,
                E = window.scrollY;
              W.focus(), window.scrollTo(p, E);
            }
            H.length && y.outro
              ? (H.each(w.outro),
                r(H)
                  .add("opacity " + y.outro + "ms " + P, { fallback: a })
                  .start({ opacity: 0 })
                  .then(() => Y(y, H, U)))
              : Y(y, H, U);
          }
        }
        function Y(B, x, y) {
          if (
            (x.removeClass(_).css({
              opacity: "",
              transition: "",
              transform: "",
              width: "",
              height: "",
            }),
            y.addClass(_).each(w.intro),
            St.redraw.up(),
            !B.intro)
          )
            return r(y).set({ opacity: 1 });
          r(y)
            .set({ opacity: 0 })
            .redraw()
            .add("opacity " + B.intro + "ms " + B.easing, { fallback: a })
            .start({ opacity: 1 });
        }
        return t;
      })
    );
  });
  qs();
  //Fs();
  Ks();
  $s();
  Zs();
  tu();
  br();
  P_();
  F_();
  D_();
  G_();
  B_();
  K_();
  $_();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:
timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-128",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".burger",
        originalId: "8c0284fa-92da-82d8-eadb-40465eb4f6ca",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".burger",
          originalId: "8c0284fa-92da-82d8-eadb-40465eb4f6ca",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709809739155,
    },
    "e-3": {
      id: "e-3",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-46",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".close-menu",
        originalId: "6b8e48de-5dd8-e388-8847-8174bd9870d9",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".close-menu",
          originalId: "6b8e48de-5dd8-e388-8847-8174bd9870d9",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709811136784,
    },
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-3", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|26ba9978-aba2-b2a5-0353-5ebe6b5150d6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|26ba9978-aba2-b2a5-0353-5ebe6b5150d6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-3-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1709888613172,
    },
    "e-10": {
      id: "e-10",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-37",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".news-teaser-wrap",
        originalId:
          "66421d37f519681700ab6358|368d8ec0-8901-95aa-6b74-e065e3c3463e",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".news-teaser-wrap",
          originalId:
            "66421d37f519681700ab6358|368d8ec0-8901-95aa-6b74-e065e3c3463e",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1701710811361,
    },
    "e-11": {
      id: "e-11",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-66",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".news-teaser-wrap",
        originalId:
          "66421d37f519681700ab6358|368d8ec0-8901-95aa-6b74-e065e3c3463e",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".news-teaser-wrap",
          originalId:
            "66421d37f519681700ab6358|368d8ec0-8901-95aa-6b74-e065e3c3463e",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1701710811361,
    },
    "e-14": {
      id: "e-14",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-154",
        },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "66421d37f519681700ab6358|0e9d8928-1c26-d4be-52aa-d54f13d4f773",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|0e9d8928-1c26-d4be-52aa-d54f13d4f773",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710242275081,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-58",
        },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "66421d37f519681700ab6358|35f2387b-b671-007e-a062-53c35c0b256d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|35f2387b-b671-007e-a062-53c35c0b256d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710242548933,
    },
    "e-18": {
      id: "e-18",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-33",
        },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "66421d37f519681700ab6358|35f2387b-b671-007e-a062-53c35c0b2570",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|35f2387b-b671-007e-a062-53c35c0b2570",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710242692568,
    },
    "e-20": {
      id: "e-20",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-36",
        },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "66421d37f519681700ab6358|35f2387b-b671-007e-a062-53c35c0b2573",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|35f2387b-b671-007e-a062-53c35c0b2573",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710242724698,
    },
    "e-22": {
      id: "e-22",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-235",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".preview-link",
        originalId:
          "66421d37f519681700ab6358|14a52c0b-ca2f-5ada-7266-f8d4b86f4a2d",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".preview-link",
          originalId:
            "66421d37f519681700ab6358|14a52c0b-ca2f-5ada-7266-f8d4b86f4a2d",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1689259738845,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-51",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".preview-link",
        originalId:
          "66421d37f519681700ab6358|14a52c0b-ca2f-5ada-7266-f8d4b86f4a2d",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".preview-link",
          originalId:
            "66421d37f519681700ab6358|14a52c0b-ca2f-5ada-7266-f8d4b86f4a2d",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1689259738846,
    },
    "e-54": {
      id: "e-54",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-77",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683205289037,
    },
    "e-56": {
      id: "e-56",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-68",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52d6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52d6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683205206681,
    },
    "e-57": {
      id: "e-57",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-61",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5304",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5304",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683205753380,
    },
    "e-61": {
      id: "e-61",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-57",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5304",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5304",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683205753352,
    },
    "e-68": {
      id: "e-68",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-56",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52d6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52d6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683205206706,
    },
    "e-69": {
      id: "e-69",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-71",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5300",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5300",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683205878906,
    },
    "e-70": {
      id: "e-70",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-73",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52d1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52d1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683203984189,
    },
    "e-71": {
      id: "e-71",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-69",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5300",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5300",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683205878905,
    },
    "e-73": {
      id: "e-73",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-70",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52d1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52d1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683203984189,
    },
    "e-75": {
      id: "e-75",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-54",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b52db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683205289037,
    },
    "e-76": {
      id: "e-76",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-77",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".dropdown-wrap",
        originalId:
          "66421d37f519681700ab63ce|1d0afbdf-0190-b246-ac64-e9436bb1ec32",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".dropdown-wrap",
          originalId:
            "66421d37f519681700ab63ce|1d0afbdf-0190-b246-ac64-e9436bb1ec32",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710511108496,
    },
    "e-77": {
      id: "e-77",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-76",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".dropdown-wrap",
        originalId:
          "66421d37f519681700ab63ce|1d0afbdf-0190-b246-ac64-e9436bb1ec32",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".dropdown-wrap",
          originalId:
            "66421d37f519681700ab63ce|1d0afbdf-0190-b246-ac64-e9436bb1ec32",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710511108497,
    },
    "e-89": {
      id: "e-89",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-33", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "66421d37f519681700ab6358",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-33-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1710764733850,
    },
    "e-94": {
      id: "e-94",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-36", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-36-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1710768626470,
    },
    "e-95": {
      id: "e-95",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-96",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".close-lv2",
        originalId: "3ac3e695-2117-b0d4-53df-c277ef342e61",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".close-lv2",
          originalId: "3ac3e695-2117-b0d4-53df-c277ef342e61",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710771316645,
    },
    "e-99": {
      id: "e-99",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-154",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".nav-dropdown-wrap.your-mhero",
        originalId: "63cc9bff-6753-8283-1cc6-265c22afcaf2",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-dropdown-wrap.your-mhero",
          originalId: "63cc9bff-6753-8283-1cc6-265c22afcaf2",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710772124987,
    },
    "e-125": {
      id: "e-125",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-126",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".nav-dropdown-wrap.home",
        originalId: "f27b5c1e-9f99-6c93-3622-fdebd76947b7",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-dropdown-wrap.home",
          originalId: "f27b5c1e-9f99-6c93-3622-fdebd76947b7",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710774238699,
    },
    "e-129": {
      id: "e-129",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-130",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".nav-dropdown._85",
        originalId: "8152b34c-db6f-c4ee-02eb-b1a489437e24",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-dropdown._85",
          originalId: "8152b34c-db6f-c4ee-02eb-b1a489437e24",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844966460,
    },
    "e-130": {
      id: "e-130",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-43",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-129",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".nav-dropdown._85",
        originalId: "8152b34c-db6f-c4ee-02eb-b1a489437e24",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-dropdown._85",
          originalId: "8152b34c-db6f-c4ee-02eb-b1a489437e24",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844966461,
    },
    "e-131": {
      id: "e-131",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-132",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".nav-dropdown._105",
        originalId: "933983c3-2ebf-7d49-3449-dae7878e177c",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-dropdown._105",
          originalId: "933983c3-2ebf-7d49-3449-dae7878e177c",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710845105836,
    },
    "e-132": {
      id: "e-132",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-43",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-131",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".nav-dropdown._105",
        originalId: "933983c3-2ebf-7d49-3449-dae7878e177c",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-dropdown._105",
          originalId: "933983c3-2ebf-7d49-3449-dae7878e177c",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710845105836,
    },
    "e-139": {
      id: "e-139",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-46",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-140",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".nav-grid-item",
        originalId: "07808ab9-a609-4045-a810-08b3cae092ba",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-grid-item",
          originalId: "07808ab9-a609-4045-a810-08b3cae092ba",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710847895192,
    },
    "e-140": {
      id: "e-140",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-139",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".nav-grid-item",
        originalId: "07808ab9-a609-4045-a810-08b3cae092ba",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-grid-item",
          originalId: "07808ab9-a609-4045-a810-08b3cae092ba",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710847895192,
    },
    "e-141": {
      id: "e-141",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-42",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-142",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "4b635d31-fe7b-272a-e678-cf74b104cb94",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "4b635d31-fe7b-272a-e678-cf74b104cb94",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710849634490,
    },
    "e-142": {
      id: "e-142",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-43",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-141",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "4b635d31-fe7b-272a-e678-cf74b104cb94",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "4b635d31-fe7b-272a-e678-cf74b104cb94",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710849634490,
    },
    "e-143": {
      id: "e-143",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-42",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-144",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "717879f5-41c2-9d5e-b3a4-eeefc36c3127",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "717879f5-41c2-9d5e-b3a4-eeefc36c3127",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710850404204,
    },
    "e-144": {
      id: "e-144",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-43",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-143",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "717879f5-41c2-9d5e-b3a4-eeefc36c3127",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "717879f5-41c2-9d5e-b3a4-eeefc36c3127",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710850404205,
    },
    "e-155": {
      id: "e-155",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-52",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-156",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047dd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047dd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711547252563,
    },
    "e-157": {
      id: "e-157",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-158",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9fb8127f-2976-a41b-37cb-a793a4a010a1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9fb8127f-2976-a41b-37cb-a793a4a010a1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711547642727,
    },
    "e-159": {
      id: "e-159",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-160",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9fb8127f-2976-a41b-37cb-a793a4a010a4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9fb8127f-2976-a41b-37cb-a793a4a010a4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711547917930,
    },
    "e-161": {
      id: "e-161",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-55",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-162",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9fb8127f-2976-a41b-37cb-a793a4a010a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9fb8127f-2976-a41b-37cb-a793a4a010a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711547993740,
    },
    "e-163": {
      id: "e-163",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-56",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-164",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "|d2a12fe2-de64-0f16-8e57-d2dbb1f5abab",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|d2a12fe2-de64-0f16-8e57-d2dbb1f5abab",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711548034764,
    },
    "e-165": {
      id: "e-165",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-57",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-166",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|d0ba9fb3-a661-3eb2-b254-02d4bab2b8df",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|d0ba9fb3-a661-3eb2-b254-02d4bab2b8df",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711548070649,
    },
    "e-167": {
      id: "e-167",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-58",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-168",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|51875f8e-f1df-10dd-bdec-a33021172d49",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|51875f8e-f1df-10dd-bdec-a33021172d49",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711548117415,
    },
    "e-171": {
      id: "e-171",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-59",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-172",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712139304141,
    },
    "e-173": {
      id: "e-173",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-174",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140223742,
    },
    "e-175": {
      id: "e-175",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-176",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140332955,
    },
    "e-177": {
      id: "e-177",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-62",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-178",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140409072,
    },
    "e-179": {
      id: "e-179",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-180",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2de",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2de",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140478708,
    },
    "e-181": {
      id: "e-181",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-182",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140527507,
    },
    "e-183": {
      id: "e-183",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-65",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-184",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2e4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2e4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140586123,
    },
    "e-185": {
      id: "e-185",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-186",
        },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "66421d37f519681700ab63d0|aedf0973-04a6-700d-ca29-77ed816d33c4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63d0|aedf0973-04a6-700d-ca29-77ed816d33c4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140904089,
    },
    "e-187": {
      id: "e-187",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-188",
        },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "66421d37f519681700ab63d0|aedf0973-04a6-700d-ca29-77ed816d33c7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63d0|aedf0973-04a6-700d-ca29-77ed816d33c7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140904089,
    },
    "e-189": {
      id: "e-189",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-190",
        },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "66421d37f519681700ab63d0|aedf0973-04a6-700d-ca29-77ed816d33ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63d0|aedf0973-04a6-700d-ca29-77ed816d33ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140904089,
    },
    "e-191": {
      id: "e-191",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-192",
        },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "66421d37f519681700ab63d0|aedf0973-04a6-700d-ca29-77ed816d3456",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63d0|aedf0973-04a6-700d-ca29-77ed816d3456",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712140904089,
    },
    "e-193": {
      id: "e-193",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-66",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-194",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|b235b165-4ee4-9bce-6c56-74278da3f143",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|b235b165-4ee4-9bce-6c56-74278da3f143",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1689261370263,
    },
    "e-195": {
      id: "e-195",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-67",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-196",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|b235b165-4ee4-9bce-6c56-74278da3f147",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|b235b165-4ee4-9bce-6c56-74278da3f147",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1689261430294,
    },
    "e-197": {
      id: "e-197",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-68",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-198",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|468693ff-574b-d78f-3aa6-992cf8f616e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|468693ff-574b-d78f-3aa6-992cf8f616e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712145301131,
    },
    "e-199": {
      id: "e-199",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-200",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|468693ff-574b-d78f-3aa6-992cf8f616de",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|468693ff-574b-d78f-3aa6-992cf8f616de",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712145371282,
    },
    "e-201": {
      id: "e-201",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-70", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "66421d37f519681700ab6358",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab6358",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-70-p",
          selectedAxis: "X_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-70-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1712148711527,
    },
    "e-202": {
      id: "e-202",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-71",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-203",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".slider-arrow-right",
        originalId:
          "66421d37f519681700ab6358|5a7e7d0d-82a2-6f4c-a8b7-39ce4a2a9bb3",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".slider-arrow-right",
          originalId:
            "66421d37f519681700ab6358|5a7e7d0d-82a2-6f4c-a8b7-39ce4a2a9bb3",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712149007748,
    },
    "e-203": {
      id: "e-203",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-73",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-202",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".slider-arrow-right",
        originalId:
          "66421d37f519681700ab6358|5a7e7d0d-82a2-6f4c-a8b7-39ce4a2a9bb3",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".slider-arrow-right",
          originalId:
            "66421d37f519681700ab6358|5a7e7d0d-82a2-6f4c-a8b7-39ce4a2a9bb3",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712149007749,
    },
    "e-204": {
      id: "e-204",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-72",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-205",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".slider-arrow-left",
        originalId:
          "66421d37f519681700ab6358|5a7e7d0d-82a2-6f4c-a8b7-39ce4a2a9bb1",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".slider-arrow-left",
          originalId:
            "66421d37f519681700ab6358|5a7e7d0d-82a2-6f4c-a8b7-39ce4a2a9bb1",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712149522973,
    },
    "e-205": {
      id: "e-205",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-74",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-204",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".slider-arrow-left",
        originalId:
          "66421d37f519681700ab6358|5a7e7d0d-82a2-6f4c-a8b7-39ce4a2a9bb1",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".slider-arrow-left",
          originalId:
            "66421d37f519681700ab6358|5a7e7d0d-82a2-6f4c-a8b7-39ce4a2a9bb1",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712149522974,
    },
    "e-206": {
      id: "e-206",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-207",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "f27b5c1e-9f99-6c93-3622-fdebd76947cb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "f27b5c1e-9f99-6c93-3622-fdebd76947cb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712151550207,
    },
    "e-214": {
      id: "e-214",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-215",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "f27b5c1e-9f99-6c93-3622-fdebd76947d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "f27b5c1e-9f99-6c93-3622-fdebd76947d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712151610089,
    },
    "e-216": {
      id: "e-216",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-217",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "f27b5c1e-9f99-6c93-3622-fdebd76947d6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "f27b5c1e-9f99-6c93-3622-fdebd76947d6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712151621171,
    },
    "e-218": {
      id: "e-218",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-219",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "f27b5c1e-9f99-6c93-3622-fdebd76947d8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "f27b5c1e-9f99-6c93-3622-fdebd76947d8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712151632409,
    },
    "e-220": {
      id: "e-220",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-221",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "f27b5c1e-9f99-6c93-3622-fdebd76947da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "f27b5c1e-9f99-6c93-3622-fdebd76947da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712151640954,
    },
    "e-240": {
      id: "e-240",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-77",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-241",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63cf|cd56012b-0715-fc13-b1cb-5ad30949d04f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63cf|cd56012b-0715-fc13-b1cb-5ad30949d04f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713352874148,
    },
    "e-242": {
      id: "e-242",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-77",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-243",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ae|6b80dde8-6ad2-5c7d-4c10-89f446cbdb3a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ae|6b80dde8-6ad2-5c7d-4c10-89f446cbdb3a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713354110978,
    },
    "e-244": {
      id: "e-244",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-245",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cbd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cbd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713359115784,
    },
    "e-246": {
      id: "e-246",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-247",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713359115784,
    },
    "e-248": {
      id: "e-248",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-249",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cd7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cd7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713359115784,
    },
    "e-250": {
      id: "e-250",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-251",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7ce4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7ce4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713359115784,
    },
    "e-252": {
      id: "e-252",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-253",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cf1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cf1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713359115784,
    },
    "e-254": {
      id: "e-254",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-75",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-255",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cfe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63cd|c8289c79-18f5-774d-35b7-570eb1cb7cfe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713359115784,
    },
    "e-257": {
      id: "e-257",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-36", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66421d37f519681700ab63ad",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-36-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1717572342701,
    },
    "e-258": {
      id: "e-258",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-259",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66421d37f519681700ab63ad|cac16fa0-9514-d56f-05a8-3d8fed06227a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad|cac16fa0-9514-d56f-05a8-3d8fed06227a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 80,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1717694458607,
    },
    "e-259": {
      id: "e-259",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-258",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66421d37f519681700ab63ad|cac16fa0-9514-d56f-05a8-3d8fed06227a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad|cac16fa0-9514-d56f-05a8-3d8fed06227a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1717694458609,
    },
    "e-260": {
      id: "e-260",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-80",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-261",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66421d37f519681700ab63ad|48ec84a5-efe4-b288-e640-3a23d32400db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad|48ec84a5-efe4-b288-e640-3a23d32400db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 80,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1717695204716,
    },
    "e-261": {
      id: "e-261",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-81",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-260",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66421d37f519681700ab63ad|48ec84a5-efe4-b288-e640-3a23d32400db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad|48ec84a5-efe4-b288-e640-3a23d32400db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1717695204717,
    },
    "e-262": {
      id: "e-262",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-82",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-263",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66421d37f519681700ab63ad|e10a586c-36da-07c9-58b9-9179bf26cbfa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad|e10a586c-36da-07c9-58b9-9179bf26cbfa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 80,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1717695371810,
    },
    "e-263": {
      id: "e-263",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-83",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-262",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66421d37f519681700ab63ad|e10a586c-36da-07c9-58b9-9179bf26cbfa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad|e10a586c-36da-07c9-58b9-9179bf26cbfa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1717695371811,
    },
    "e-264": {
      id: "e-264",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-84",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-265",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66421d37f519681700ab63ad|2b50821c-eaca-4051-5da3-091e94da888c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad|2b50821c-eaca-4051-5da3-091e94da888c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 80,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1717695445579,
    },
    "e-265": {
      id: "e-265",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-85",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-264",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66421d37f519681700ab63ad|2b50821c-eaca-4051-5da3-091e94da888c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad|2b50821c-eaca-4051-5da3-091e94da888c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1717695445580,
    },
    "e-266": {
      id: "e-266",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-70", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "66421d37f519681700ab63ad",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66421d37f519681700ab63ad",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-70-p",
          selectedAxis: "X_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-70-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1717695657512,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Open Menu Level One",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-mobile-wrap",
                  selectorGuids: ["ea3409e9-5303-dcc2-2d9d-e4fc4814c3fd"],
                },
                value: "none",
              },
            },
            {
              id: "a-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-mobile-lv1",
                  selectorGuids: ["ea3409e9-5303-dcc2-2d9d-e4fc4814c3fe"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-mobile-wrap",
                  selectorGuids: ["ea3409e9-5303-dcc2-2d9d-e4fc4814c3fd"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuad",
                duration: 500,
                target: {
                  selector: ".nav-mobile-lv1",
                  selectorGuids: ["ea3409e9-5303-dcc2-2d9d-e4fc4814c3fe"],
                },
                xValue: -100,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1709809744129,
    },
    "a-2": {
      id: "a-2",
      title: "Close Menu All Levels",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuad",
                duration: 500,
                target: {
                  selector: ".nav-mobile-lv1",
                  selectorGuids: ["ea3409e9-5303-dcc2-2d9d-e4fc4814c3fe"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuad",
                duration: 500,
                target: {
                  selector: ".nav-mobile-lv2",
                  selectorGuids: ["661027a1-59d2-265b-85b6-fb1366633cff"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-mobile-wrap",
                  selectorGuids: ["ea3409e9-5303-dcc2-2d9d-e4fc4814c3fd"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1709811175017,
    },
    "a-3": {
      id: "a-3",
      title: "Section Color Change",
      continuousParameterGroups: [
        {
          id: "a-3-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-3-n-9",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "66421d37f519681700ab6358|d2a8c25d-5a1d-d4c4-b940-1617d573c871",
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 30,
              actionItems: [
                {
                  id: "a-3-n-3",
                  actionTypeId: "STYLE_TEXT_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".typo-section",
                      selectorGuids: ["d668f533-e2ac-97b5-12ab-38991ad1c54c"],
                    },
                    globalSwatchId: "--white",
                    rValue: 255,
                    bValue: 255,
                    gValue: 255,
                    aValue: 1,
                  },
                },
                {
                  id: "a-3-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "66421d37f519681700ab6358|1cd166c9-3cec-f647-84c7-a9419037df5e",
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 35,
              actionItems: [
                {
                  id: "a-3-n",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".typo-section",
                      selectorGuids: ["d668f533-e2ac-97b5-12ab-38991ad1c54c"],
                    },
                    globalSwatchId: "--pitch-black",
                    rValue: 0,
                    bValue: 0,
                    gValue: 0,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 43,
              actionItems: [
                {
                  id: "a-3-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "66421d37f519681700ab6358|1cd166c9-3cec-f647-84c7-a9419037df5e",
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 45,
              actionItems: [
                {
                  id: "a-3-n-8",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "66421d37f519681700ab6358|d2a8c25d-5a1d-d4c4-b940-1617d573c871",
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 50,
              actionItems: [
                {
                  id: "a-3-n-4",
                  actionTypeId: "STYLE_TEXT_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".typo-section",
                      selectorGuids: ["d668f533-e2ac-97b5-12ab-38991ad1c54c"],
                    },
                    globalSwatchId: "--pitch-black",
                    rValue: 0,
                    bValue: 0,
                    gValue: 0,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 60,
              actionItems: [
                {
                  id: "a-3-n-2",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".typo-section",
                      selectorGuids: ["d668f533-e2ac-97b5-12ab-38991ad1c54c"],
                    },
                    globalSwatchId: "--岩灰-10",
                    rValue: 234,
                    bValue: 235,
                    gValue: 234,
                    aValue: 1,
                  },
                },
                {
                  id: "a-3-n-7",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "66421d37f519681700ab6358|d2a8c25d-5a1d-d4c4-b940-1617d573c871",
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1709888634545,
    },
    "a-16": {
      id: "a-16",
      title: "Image Zoom In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-16-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".preview-link-image",
                  selectorGuids: ["2de7f00b-36d3-7039-a98a-ce5d2a4fc765"],
                },
                xValue: 1.025,
                yValue: 1.025,
                zValue: null,
                locked: true,
              },
            },
            {
              id: "a-16-n-5",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".news-teaser-image",
                  selectorGuids: ["97645aa0-3ac0-a95a-f93d-890c2d3100ae"],
                },
                xValue: 1.025,
                yValue: 1.025,
                locked: true,
              },
            },
            {
              id: "a-16-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-arrow",
                  selectorGuids: ["cbb344e0-2b44-fa61-3081-e76ce17597df"],
                },
                xValue: 5,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-16-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {},
                xValue: 1.025,
                yValue: 1.025,
                locked: true,
              },
            },
            {
              id: "a-16-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".read-more-link-arrow",
                  selectorGuids: ["2de7f00b-36d3-7039-a98a-ce5d2a4fc768"],
                },
                xValue: 5,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1689259744443,
    },
    "a-17": {
      id: "a-17",
      title: "Image Zoom Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-17-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".preview-link-image",
                  selectorGuids: ["2de7f00b-36d3-7039-a98a-ce5d2a4fc765"],
                },
                xValue: 1,
                yValue: 1,
                zValue: null,
                locked: true,
              },
            },
            {
              id: "a-17-n-5",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".news-teaser-image",
                  selectorGuids: ["97645aa0-3ac0-a95a-f93d-890c2d3100ae"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-17-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-arrow",
                  selectorGuids: ["cbb344e0-2b44-fa61-3081-e76ce17597df"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {},
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-17-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".read-more-link-arrow",
                  selectorGuids: ["2de7f00b-36d3-7039-a98a-ce5d2a4fc768"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1689259744443,
    },
    "a-12": {
      id: "a-12",
      title: "Show Specs Tab Menu",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".specs-tabs-menu",
                  selectorGuids: ["e7991f77-8d10-0e77-1167-bb7ae8934bc3"],
                },
                value: "none",
              },
            },
            {
              id: "a-12-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|99b6819e-ed04-1428-946c-4ed259e2cb16",
                },
                value: "none",
              },
            },
            {
              id: "a-12-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|2b30d7bb-17b4-83ba-70a5-63fb47c399cd",
                },
                value: "none",
              },
            },
            {
              id: "a-12-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9f8fc640-f915-97a8-3fc6-b7c7835cf417",
                },
                value: "block",
              },
            },
            {
              id: "a-12-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".chevron-down",
                  selectorGuids: ["98cddb47-736f-e0a2-0142-bc70c38272e0"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".specs-tabs-menu",
                  selectorGuids: ["e7991f77-8d10-0e77-1167-bb7ae8934bc3"],
                },
                value: "flex",
              },
            },
            {
              id: "a-12-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".chevron-down",
                  selectorGuids: ["98cddb47-736f-e0a2-0142-bc70c38272e0"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710242292458,
    },
    "a-13": {
      id: "a-13",
      title: "Choose Overall",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-13-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".specs-tabs-menu",
                  selectorGuids: ["e7991f77-8d10-0e77-1167-bb7ae8934bc3"],
                },
                value: "none",
              },
            },
            {
              id: "a-13-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|99b6819e-ed04-1428-946c-4ed259e2cb16",
                },
                value: "none",
              },
            },
            {
              id: "a-13-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|2b30d7bb-17b4-83ba-70a5-63fb47c399cd",
                },
                value: "none",
              },
            },
            {
              id: "a-13-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9f8fc640-f915-97a8-3fc6-b7c7835cf417",
                },
                value: "block",
              },
            },
            {
              id: "a-13-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|f14b6ebf-0d96-4f63-f693-7d445bbcaf64",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-14": {
      id: "a-14",
      title: "Choose Storage",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-14-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".specs-tabs-menu",
                  selectorGuids: ["e7991f77-8d10-0e77-1167-bb7ae8934bc3"],
                },
                value: "none",
              },
            },
            {
              id: "a-14-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|99b6819e-ed04-1428-946c-4ed259e2cb16",
                },
                value: "none",
              },
            },
            {
              id: "a-14-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|2b30d7bb-17b4-83ba-70a5-63fb47c399cd",
                },
                value: "block",
              },
            },
            {
              id: "a-14-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9f8fc640-f915-97a8-3fc6-b7c7835cf417",
                },
                value: "none",
              },
            },
            {
              id: "a-14-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|f14b6ebf-0d96-4f63-f693-7d445bbcaf64",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-15": {
      id: "a-15",
      title: "Choose Off Road",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".specs-tabs-menu",
                  selectorGuids: ["e7991f77-8d10-0e77-1167-bb7ae8934bc3"],
                },
                value: "none",
              },
            },
            {
              id: "a-15-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|99b6819e-ed04-1428-946c-4ed259e2cb16",
                },
                value: "block",
              },
            },
            {
              id: "a-15-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|2b30d7bb-17b4-83ba-70a5-63fb47c399cd",
                },
                value: "none",
              },
            },
            {
              id: "a-15-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9f8fc640-f915-97a8-3fc6-b7c7835cf417",
                },
                value: "none",
              },
            },
            {
              id: "a-15-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|f14b6ebf-0d96-4f63-f693-7d445bbcaf64",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-26": {
      id: "a-26",
      title: "Show Black Exterior",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.black",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e28",
                  ],
                },
                value: "inline-block",
              },
            },
            {
              id: "a-26-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.green",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e26",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-26-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.grey",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e20",
                  ],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1683204020356,
    },
    "a-19": {
      id: "a-19",
      title: "Show Grey Exterior",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-19-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.black",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e28",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-19-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.green",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e26",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-19-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.grey",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e20",
                  ],
                },
                value: "inline-block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1683204020356,
    },
    "a-18": {
      id: "a-18",
      title: "Show Beige/Black Interieur",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.black-blue",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e17",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-18-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.beige-bleck",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e25",
                  ],
                },
                value: "inline-block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1683205647939,
    },
    "a-21": {
      id: "a-21",
      title: "Show Black/Blue Interieur",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.black-blue",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e17",
                  ],
                },
                value: "inline-block",
              },
            },
            {
              id: "a-21-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.beige-bleck",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e25",
                  ],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1683205647939,
    },
    "a-28": {
      id: "a-28",
      title: "Show Green Exterior",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.green",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e26",
                  ],
                },
                value: "inline-block",
              },
            },
            {
              id: "a-28-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.grey",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e20",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-28-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".config-image.black",
                  selectorGuids: [
                    "e535b67d-a582-589d-53a7-9a5b95009e00",
                    "e535b67d-a582-589d-53a7-9a5b95009e28",
                  ],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1683204020356,
    },
    "a-29": {
      id: "a-29",
      title: "Dropdown open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-29-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-chevron",
                  selectorGuids: ["12463f04-c6c3-46d7-2818-f4376ee7f84f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-29-n-5",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "66421d37f519681700ab63ce|1d0afbdf-0190-b246-ac64-e9436bb1ec32",
                },
                heightValue: 66,
                widthUnit: "px",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-29-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-chevron",
                  selectorGuids: ["12463f04-c6c3-46d7-2818-f4376ee7f84f"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-29-n-6",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "66421d37f519681700ab63ce|1d0afbdf-0190-b246-ac64-e9436bb1ec32",
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710511136683,
    },
    "a-30": {
      id: "a-30",
      title: "Dropdown close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-30-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-chevron",
                  selectorGuids: ["12463f04-c6c3-46d7-2818-f4376ee7f84f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-30-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "66421d37f519681700ab63ce|1d0afbdf-0190-b246-ac64-e9436bb1ec32",
                },
                heightValue: 66,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710511136683,
    },
    "a-33": {
      id: "a-33",
      title: "Nav Switch",
      continuousParameterGroups: [
        {
          id: "a-33-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 5,
              actionItems: [
                {
                  id: "a-33-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".header",
                      selectorGuids: ["bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-33-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".subnav",
                      selectorGuids: ["6d125ee4-e354-024e-f28e-a9ee51b49a64"],
                    },
                    yValue: -100,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 6,
              actionItems: [
                {
                  id: "a-33-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".header",
                      selectorGuids: ["bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92"],
                    },
                    yValue: -100,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-33-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".subnav",
                      selectorGuids: ["6d125ee4-e354-024e-f28e-a9ee51b49a64"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1710764737683,
    },
    "a-36": {
      id: "a-36",
      title: "Nav Color Change",
      continuousParameterGroups: [
        {
          id: "a-36-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-36-n",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".header",
                      selectorGuids: ["bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92"],
                    },
                    globalSwatchId: "",
                    rValue: 0,
                    bValue: 0,
                    gValue: 0,
                    aValue: 0,
                  },
                },
              ],
            },
            {
              keyframe: 1,
              actionItems: [
                {
                  id: "a-36-n-2",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".header",
                      selectorGuids: ["bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92"],
                    },
                    globalSwatchId: "",
                    rValue: 23,
                    bValue: 33,
                    gValue: 30,
                    aValue: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1710768629835,
    },
    "a-38": {
      id: "a-38",
      title: "Close Menu Level Two",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-38-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuad",
                duration: 500,
                target: {
                  selector: ".nav-mobile-lv2",
                  selectorGuids: ["661027a1-59d2-265b-85b6-fb1366633cff"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1709811175017,
    },
    "a-39": {
      id: "a-39",
      title: "Open Menu Your MHERO",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-39-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-mobile-lv2.your-mhero",
                  selectorGuids: [
                    "661027a1-59d2-265b-85b6-fb1366633cff",
                    "8307aa26-9062-63a9-a444-f119066c2c83",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-39-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuad",
                duration: 500,
                target: {
                  selector: ".nav-mobile-lv2.your-mhero",
                  selectorGuids: [
                    "661027a1-59d2-265b-85b6-fb1366633cff",
                    "8307aa26-9062-63a9-a444-f119066c2c83",
                  ],
                },
                xValue: -100,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1709809744129,
    },
    "a-37": {
      id: "a-37",
      title: "Open Menu Home",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-37-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-mobile-lv2.home",
                  selectorGuids: [
                    "661027a1-59d2-265b-85b6-fb1366633cff",
                    "a7305a70-6a2b-61e3-14a1-85560d92a6ba",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-37-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuad",
                duration: 500,
                target: {
                  selector: ".nav-mobile-lv2.home",
                  selectorGuids: [
                    "661027a1-59d2-265b-85b6-fb1366633cff",
                    "a7305a70-6a2b-61e3-14a1-85560d92a6ba",
                  ],
                },
                xValue: -100,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1709809744129,
    },
    "a-44": {
      id: "a-44",
      title: "Nav Dropdown 85 Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-44-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: "none",
              },
            },
            {
              id: "a-44-n-17",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".header.transparent",
                  selectorGuids: [
                    "bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92",
                    "3be9967b-892a-3259-7534-c1a9f1996052",
                  ],
                },
                globalSwatchId: "--transparent",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0,
              },
            },
            {
              id: "a-44-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-44-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-44-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-44-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-44-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".chevron-down.nav",
                  selectorGuids: [
                    "98cddb47-736f-e0a2-0142-bc70c38272e0",
                    "2e8a1bb9-99af-c37d-f71a-f9f2b654d2be",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-44-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-44-n-8",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-44-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: "block",
              },
            },
            {
              id: "a-44-n-18",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".header.transparent",
                  selectorGuids: [
                    "bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92",
                    "3be9967b-892a-3259-7534-c1a9f1996052",
                  ],
                },
                globalSwatchId: "--岩灰-00",
                rValue: 23,
                bValue: 33,
                gValue: 30,
                aValue: 1,
              },
            },
            {
              id: "a-44-n-10",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".chevron-down.nav",
                  selectorGuids: [
                    "98cddb47-736f-e0a2-0142-bc70c38272e0",
                    "2e8a1bb9-99af-c37d-f71a-f9f2b654d2be",
                  ],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-44-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-44-n-12",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 700,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                heightValue: 395,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-44-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-44-n-14",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-44-n-15",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-44-n-16",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1584719491463,
    },
    "a-43": {
      id: "a-43",
      title: "Nav Dropdown Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-43-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".chevron-down.nav",
                  selectorGuids: [
                    "98cddb47-736f-e0a2-0142-bc70c38272e0",
                    "2e8a1bb9-99af-c37d-f71a-f9f2b654d2be",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-43-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 100,
                easing: "outCubic",
                duration: 300,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-43-n-9",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 100,
                easing: "",
                duration: 300,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-43-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 100,
                easing: "",
                duration: 300,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-43-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 100,
                easing: "",
                duration: 300,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-43-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 100,
                easing: "",
                duration: 300,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-43-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "ease",
                duration: 300,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-43-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1584719491463,
    },
    "a-45": {
      id: "a-45",
      title: "Nav Dropdown 105 Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-45-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: "none",
              },
            },
            {
              id: "a-45-n-17",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".header.transparent",
                  selectorGuids: [
                    "bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92",
                    "3be9967b-892a-3259-7534-c1a9f1996052",
                  ],
                },
                globalSwatchId: "--transparent",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0,
              },
            },
            {
              id: "a-45-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-45-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-45-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-45-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-45-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".chevron-down.nav",
                  selectorGuids: [
                    "98cddb47-736f-e0a2-0142-bc70c38272e0",
                    "2e8a1bb9-99af-c37d-f71a-f9f2b654d2be",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-45-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-45-n-8",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-45-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: "block",
              },
            },
            {
              id: "a-45-n-18",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".header.transparent",
                  selectorGuids: [
                    "bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92",
                    "3be9967b-892a-3259-7534-c1a9f1996052",
                  ],
                },
                globalSwatchId: "--岩灰-00",
                rValue: 23,
                bValue: 33,
                gValue: 30,
                aValue: 1,
              },
            },
            {
              id: "a-45-n-10",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".chevron-down.nav",
                  selectorGuids: [
                    "98cddb47-736f-e0a2-0142-bc70c38272e0",
                    "2e8a1bb9-99af-c37d-f71a-f9f2b654d2be",
                  ],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-45-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-45-n-12",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 700,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                heightValue: 530,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-45-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-45-n-14",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-45-n-15",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-45-n-16",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1584719491463,
    },
    "a-46": {
      id: "a-46",
      title: "Read More Link Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-46-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".read-more-link-arrow",
                  selectorGuids: ["2de7f00b-36d3-7039-a98a-ce5d2a4fc768"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-46-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-grid-image",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d022"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-46-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".read-more-link-arrow",
                  selectorGuids: ["2de7f00b-36d3-7039-a98a-ce5d2a4fc768"],
                },
                xValue: 10,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-46-n-4",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-grid-image",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d022"],
                },
                xValue: 1.05,
                yValue: 1.05,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710847705709,
    },
    "a-47": {
      id: "a-47",
      title: "Read More Link Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-47-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".read-more-link-arrow",
                  selectorGuids: ["2de7f00b-36d3-7039-a98a-ce5d2a4fc768"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-47-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-grid-image",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d022"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710847705709,
    },
    "a-42": {
      id: "a-42",
      title: "Nav Dropdown 80 Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-42-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: "none",
              },
            },
            {
              id: "a-42-n-22",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".header.transparent",
                  selectorGuids: [
                    "bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92",
                    "3be9967b-892a-3259-7534-c1a9f1996052",
                  ],
                },
                globalSwatchId: "--transparent",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0,
              },
            },
            {
              id: "a-42-n-20",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-18",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-16",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-12",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".chevron-down.nav",
                  selectorGuids: [
                    "98cddb47-736f-e0a2-0142-bc70c38272e0",
                    "2e8a1bb9-99af-c37d-f71a-f9f2b654d2be",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-42-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: "block",
              },
            },
            {
              id: "a-42-n-23",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".header.transparent",
                  selectorGuids: [
                    "bcaec2d3-1a96-fffd-f2e9-c721ec5ccf92",
                    "3be9967b-892a-3259-7534-c1a9f1996052",
                  ],
                },
                globalSwatchId: "--岩灰-00",
                rValue: 23,
                bValue: 33,
                gValue: 30,
                aValue: 1,
              },
            },
            {
              id: "a-42-n-13",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".chevron-down.nav",
                  selectorGuids: [
                    "98cddb47-736f-e0a2-0142-bc70c38272e0",
                    "2e8a1bb9-99af-c37d-f71a-f9f2b654d2be",
                  ],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-11",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 700,
                target: {
                  selector: ".nav-dropdown-list",
                  selectorGuids: ["74322583-88bd-fc36-1eb8-070405ff109a"],
                },
                heightValue: 365,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-42-n-15",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-21",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".header-bottom-links-wrap",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d021"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-19",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-17",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".nav-grid",
                  selectorGuids: ["d9e6332a-4314-5bbc-1d84-58d163a2d024"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1584719491463,
    },
    "a-52": {
      id: "a-52",
      title: "Show Exterior Specs Tab Menu",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-52-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9fb8127f-2976-a41b-37cb-a793a4a010a0",
                },
                value: "none",
              },
            },
            {
              id: "a-52-n-10",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|82e22a2a-0989-1f39-d358-437785a1b382",
                },
                value: "none",
              },
            },
            {
              id: "a-52-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|d85f2e19-35de-5af7-923f-589f38cee6c3",
                },
                value: "none",
              },
            },
            {
              id: "a-52-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|231ccad6-e26d-69c3-fb04-42fcda60c5f1",
                },
                value: "none",
              },
            },
            {
              id: "a-52-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|f2c61825-a05b-7641-0cde-035ada85c307",
                },
                value: "none",
              },
            },
            {
              id: "a-52-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|599056ed-6b8b-4f48-cfd6-1fde69504da8",
                },
                value: "none",
              },
            },
            {
              id: "a-52-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047de",
                },
                value: "block",
              },
            },
            {
              id: "a-52-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".chevron-down",
                  selectorGuids: ["98cddb47-736f-e0a2-0142-bc70c38272e0"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-52-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9fb8127f-2976-a41b-37cb-a793a4a010a0",
                },
                value: "flex",
              },
            },
            {
              id: "a-52-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".chevron-down",
                  selectorGuids: ["98cddb47-736f-e0a2-0142-bc70c38272e0"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710242292458,
    },
    "a-53": {
      id: "a-53",
      title: "Choose Fording Depth",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-53-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu",
                  selectorGuids: ["cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac"],
                },
                value: "none",
              },
            },
            {
              id: "a-53-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|82e22a2a-0989-1f39-d358-437785a1b382",
                },
                value: "none",
              },
            },
            {
              id: "a-53-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|d85f2e19-35de-5af7-923f-589f38cee6c3",
                },
                value: "none",
              },
            },
            {
              id: "a-53-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|231ccad6-e26d-69c3-fb04-42fcda60c5f1",
                },
                value: "none",
              },
            },
            {
              id: "a-53-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047de",
                },
                value: "block",
              },
            },
            {
              id: "a-53-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|599056ed-6b8b-4f48-cfd6-1fde69504da8",
                },
                value: "none",
              },
            },
            {
              id: "a-53-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|f2c61825-a05b-7641-0cde-035ada85c307",
                },
                value: "none",
              },
            },
            {
              id: "a-53-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047e4",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-54": {
      id: "a-54",
      title: "Choose Tilt Angle",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-54-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu",
                  selectorGuids: ["cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac"],
                },
                value: "none",
              },
            },
            {
              id: "a-54-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|82e22a2a-0989-1f39-d358-437785a1b382",
                },
                value: "none",
              },
            },
            {
              id: "a-54-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|d85f2e19-35de-5af7-923f-589f38cee6c3",
                },
                value: "none",
              },
            },
            {
              id: "a-54-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|231ccad6-e26d-69c3-fb04-42fcda60c5f1",
                },
                value: "none",
              },
            },
            {
              id: "a-54-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047de",
                },
                value: "none",
              },
            },
            {
              id: "a-54-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|599056ed-6b8b-4f48-cfd6-1fde69504da8",
                },
                value: "block",
              },
            },
            {
              id: "a-54-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|f2c61825-a05b-7641-0cde-035ada85c307",
                },
                value: "none",
              },
            },
            {
              id: "a-54-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047e4",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-55": {
      id: "a-55",
      title: "Choose Climbing Angle",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-55-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu",
                  selectorGuids: ["cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac"],
                },
                value: "none",
              },
            },
            {
              id: "a-55-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|82e22a2a-0989-1f39-d358-437785a1b382",
                },
                value: "none",
              },
            },
            {
              id: "a-55-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|d85f2e19-35de-5af7-923f-589f38cee6c3",
                },
                value: "none",
              },
            },
            {
              id: "a-55-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|231ccad6-e26d-69c3-fb04-42fcda60c5f1",
                },
                value: "none",
              },
            },
            {
              id: "a-55-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047de",
                },
                value: "none",
              },
            },
            {
              id: "a-55-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|599056ed-6b8b-4f48-cfd6-1fde69504da8",
                },
                value: "none",
              },
            },
            {
              id: "a-55-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|f2c61825-a05b-7641-0cde-035ada85c307",
                },
                value: "block",
              },
            },
            {
              id: "a-55-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047e4",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-56": {
      id: "a-56",
      title: "Choose Passage Angle",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-56-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu",
                  selectorGuids: ["cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac"],
                },
                value: "none",
              },
            },
            {
              id: "a-56-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|82e22a2a-0989-1f39-d358-437785a1b382",
                },
                value: "none",
              },
            },
            {
              id: "a-56-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|d85f2e19-35de-5af7-923f-589f38cee6c3",
                },
                value: "none",
              },
            },
            {
              id: "a-56-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|231ccad6-e26d-69c3-fb04-42fcda60c5f1",
                },
                value: "block",
              },
            },
            {
              id: "a-56-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047de",
                },
                value: "none",
              },
            },
            {
              id: "a-56-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|599056ed-6b8b-4f48-cfd6-1fde69504da8",
                },
                value: "none",
              },
            },
            {
              id: "a-56-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|f2c61825-a05b-7641-0cde-035ada85c307",
                },
                value: "none",
              },
            },
            {
              id: "a-56-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047e4",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-57": {
      id: "a-57",
      title: "Choose Approach Angle",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-57-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu",
                  selectorGuids: ["cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac"],
                },
                value: "none",
              },
            },
            {
              id: "a-57-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|82e22a2a-0989-1f39-d358-437785a1b382",
                },
                value: "none",
              },
            },
            {
              id: "a-57-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|d85f2e19-35de-5af7-923f-589f38cee6c3",
                },
                value: "block",
              },
            },
            {
              id: "a-57-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|231ccad6-e26d-69c3-fb04-42fcda60c5f1",
                },
                value: "none",
              },
            },
            {
              id: "a-57-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047de",
                },
                value: "none",
              },
            },
            {
              id: "a-57-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|599056ed-6b8b-4f48-cfd6-1fde69504da8",
                },
                value: "none",
              },
            },
            {
              id: "a-57-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|f2c61825-a05b-7641-0cde-035ada85c307",
                },
                value: "none",
              },
            },
            {
              id: "a-57-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047e4",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-58": {
      id: "a-58",
      title: "Choose Ground Clearance",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-58-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu",
                  selectorGuids: ["cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac"],
                },
                value: "none",
              },
            },
            {
              id: "a-58-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|82e22a2a-0989-1f39-d358-437785a1b382",
                },
                value: "block",
              },
            },
            {
              id: "a-58-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|d85f2e19-35de-5af7-923f-589f38cee6c3",
                },
                value: "none",
              },
            },
            {
              id: "a-58-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|231ccad6-e26d-69c3-fb04-42fcda60c5f1",
                },
                value: "none",
              },
            },
            {
              id: "a-58-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047de",
                },
                value: "none",
              },
            },
            {
              id: "a-58-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|599056ed-6b8b-4f48-cfd6-1fde69504da8",
                },
                value: "none",
              },
            },
            {
              id: "a-58-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|f2c61825-a05b-7641-0cde-035ada85c307",
                },
                value: "none",
              },
            },
            {
              id: "a-58-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|5627e2b3-0448-9fde-2703-05cbcd8047e4",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-59": {
      id: "a-59",
      title: "Show Interior Specs Tab Menu",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-59-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d4",
                },
                value: "none",
              },
            },
            {
              id: "a-59-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c8",
                },
                value: "none",
              },
            },
            {
              id: "a-59-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ca",
                },
                value: "none",
              },
            },
            {
              id: "a-59-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2cc",
                },
                value: "none",
              },
            },
            {
              id: "a-59-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ce",
                },
                value: "none",
              },
            },
            {
              id: "a-59-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d0",
                },
                value: "none",
              },
            },
            {
              id: "a-59-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c6",
                },
                value: "block",
              },
            },
            {
              id: "a-59-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".chevron-down",
                  selectorGuids: ["98cddb47-736f-e0a2-0142-bc70c38272e0"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-59-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d4",
                },
                value: "flex",
              },
            },
            {
              id: "a-59-n-10",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".chevron-down",
                  selectorGuids: ["98cddb47-736f-e0a2-0142-bc70c38272e0"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710242292458,
    },
    "a-60": {
      id: "a-60",
      title: "Choose Premium Cockpit",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-60-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu.light",
                  selectorGuids: [
                    "cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac",
                    "469bf83b-fd90-0e4f-d57a-47769768024a",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-60-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c6",
                },
                value: "block",
              },
            },
            {
              id: "a-60-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c8",
                },
                value: "none",
              },
            },
            {
              id: "a-60-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ca",
                },
                value: "none",
              },
            },
            {
              id: "a-60-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2cc",
                },
                value: "none",
              },
            },
            {
              id: "a-60-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ce",
                },
                value: "none",
              },
            },
            {
              id: "a-60-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d0",
                },
                value: "none",
              },
            },
            {
              id: "a-60-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d2",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-61": {
      id: "a-61",
      title: "Choose Multimedia",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-61-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu.light",
                  selectorGuids: [
                    "cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac",
                    "469bf83b-fd90-0e4f-d57a-47769768024a",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-61-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c8",
                },
                value: "block",
              },
            },
            {
              id: "a-61-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c6",
                },
                value: "none",
              },
            },
            {
              id: "a-61-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ca",
                },
                value: "none",
              },
            },
            {
              id: "a-61-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2cc",
                },
                value: "none",
              },
            },
            {
              id: "a-61-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ce",
                },
                value: "none",
              },
            },
            {
              id: "a-61-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d0",
                },
                value: "none",
              },
            },
            {
              id: "a-61-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d2",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-62": {
      id: "a-62",
      title: "Choose Driving Assistance",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-62-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu.light",
                  selectorGuids: [
                    "cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac",
                    "469bf83b-fd90-0e4f-d57a-47769768024a",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-62-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ca",
                },
                value: "block",
              },
            },
            {
              id: "a-62-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c6",
                },
                value: "none",
              },
            },
            {
              id: "a-62-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c8",
                },
                value: "none",
              },
            },
            {
              id: "a-62-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2cc",
                },
                value: "none",
              },
            },
            {
              id: "a-62-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ce",
                },
                value: "none",
              },
            },
            {
              id: "a-62-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d0",
                },
                value: "none",
              },
            },
            {
              id: "a-62-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d2",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-63": {
      id: "a-63",
      title: "Choose Comfort & Climate",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-63-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu.light",
                  selectorGuids: [
                    "cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac",
                    "469bf83b-fd90-0e4f-d57a-47769768024a",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-63-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2cc",
                },
                value: "block",
              },
            },
            {
              id: "a-63-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c6",
                },
                value: "none",
              },
            },
            {
              id: "a-63-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c8",
                },
                value: "none",
              },
            },
            {
              id: "a-63-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ca",
                },
                value: "none",
              },
            },
            {
              id: "a-63-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ce",
                },
                value: "none",
              },
            },
            {
              id: "a-63-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d0",
                },
                value: "none",
              },
            },
            {
              id: "a-63-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d2",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-64": {
      id: "a-64",
      title: "Choose Rear Seat Amenities",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-64-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu.light",
                  selectorGuids: [
                    "cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac",
                    "469bf83b-fd90-0e4f-d57a-47769768024a",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-64-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ce",
                },
                value: "block",
              },
            },
            {
              id: "a-64-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c6",
                },
                value: "none",
              },
            },
            {
              id: "a-64-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c8",
                },
                value: "none",
              },
            },
            {
              id: "a-64-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ca",
                },
                value: "none",
              },
            },
            {
              id: "a-64-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2cc",
                },
                value: "none",
              },
            },
            {
              id: "a-64-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d0",
                },
                value: "none",
              },
            },
            {
              id: "a-64-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d2",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-65": {
      id: "a-65",
      title: "Choose 40-20-40 Split",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-65-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".standard-tabs-menu.light",
                  selectorGuids: [
                    "cfcddfe4-8bf6-cbd5-504d-a1c91268d9ac",
                    "469bf83b-fd90-0e4f-d57a-47769768024a",
                  ],
                },
                value: "none",
              },
            },
            {
              id: "a-65-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d0",
                },
                value: "block",
              },
            },
            {
              id: "a-65-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c6",
                },
                value: "none",
              },
            },
            {
              id: "a-65-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2c8",
                },
                value: "none",
              },
            },
            {
              id: "a-65-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ca",
                },
                value: "none",
              },
            },
            {
              id: "a-65-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2cc",
                },
                value: "none",
              },
            },
            {
              id: "a-65-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2ce",
                },
                value: "none",
              },
            },
            {
              id: "a-65-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "66421d37f519681700ab6358|9793411e-020d-85d4-2fcd-d590cbc8d2d2",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710242292458,
    },
    "a-66": {
      id: "a-66",
      title: "Show Company Name",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-66-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5355",
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-66-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5355",
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1689261381850,
    },
    "a-67": {
      id: "a-67",
      title: "Hide Company Name",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-67-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab63ae|09a4b05e-a487-1c15-c377-83a2fd2b5355",
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1689261381850,
    },
    "a-68": {
      id: "a-68",
      title: "Show Leasing Rate",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-68-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab63ae|3809fb63-0146-d01d-518f-14b993815ada",
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-68-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab63ae|3809fb63-0146-d01d-518f-14b993815ada",
                },
                value: "flex",
              },
            },
            {
              id: "a-68-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab63ae|59c68e7e-1eca-2513-0a1f-8bbb5b919a85",
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1712145313808,
    },
    "a-69": {
      id: "a-69",
      title: "Show Purchase Price",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-69-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab63ae|59c68e7e-1eca-2513-0a1f-8bbb5b919a85",
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-69-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab63ae|3809fb63-0146-d01d-518f-14b993815ada",
                },
                value: "none",
              },
            },
            {
              id: "a-69-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "66421d37f519681700ab63ae|59c68e7e-1eca-2513-0a1f-8bbb5b919a85",
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1712145313808,
    },
    "a-70": {
      id: "a-70",
      title: "Cursor Follow",
      continuousParameterGroups: [
        {
          id: "a-70-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-70-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: { id: "3b10c0aa-dec8-efbe-20b7-e8873ffe6fa3" },
                    xValue: -50,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-70-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: { id: "3b10c0aa-dec8-efbe-20b7-e8873ffe6fa3" },
                    xValue: 50,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-70-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-70-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: { id: "3b10c0aa-dec8-efbe-20b7-e8873ffe6fa3" },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-70-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: { id: "3b10c0aa-dec8-efbe-20b7-e8873ffe6fa3" },
                    yValue: 50,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712148731771,
    },
    "a-71": {
      id: "a-71",
      title: "Slider Arrow Right Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-71-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                widthValue: 20,
                heightValue: 20,
                widthUnit: "px",
                heightUnit: "px",
                locked: true,
              },
            },
            {
              id: "a-71-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-71-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                widthValue: 100,
                heightValue: 100,
                widthUnit: "px",
                heightUnit: "px",
                locked: true,
              },
            },
            {
              id: "a-71-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  selector: ".slider-arrow-icon-left",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb8"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-71-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-71-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 100,
                easing: "",
                duration: 200,
                target: {
                  selector: ".slider-arrow-icon-right",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb9"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1712149015411,
    },
    "a-73": {
      id: "a-73",
      title: "Slider Arrow Right Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-73-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                widthValue: 20,
                heightValue: 20,
                widthUnit: "px",
                heightUnit: "px",
                locked: true,
              },
            },
            {
              id: "a-73-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-73-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".slider-arrow-icon-right",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb9"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712149015411,
    },
    "a-72": {
      id: "a-72",
      title: "Slider Arrow Left Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-72-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                widthValue: 20,
                heightValue: 20,
                widthUnit: "px",
                heightUnit: "px",
                locked: true,
              },
            },
            {
              id: "a-72-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-72-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                widthValue: 100,
                heightValue: 100,
                widthUnit: "px",
                heightUnit: "px",
                locked: true,
              },
            },
            {
              id: "a-72-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  selector: ".slider-arrow-icon-right",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb9"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-72-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-72-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 100,
                easing: "",
                duration: 200,
                target: {
                  selector: ".slider-arrow-icon-left",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb8"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1712149015411,
    },
    "a-74": {
      id: "a-74",
      title: "Slider Arrow Left Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-74-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                widthValue: 20,
                heightValue: 20,
                widthUnit: "px",
                heightUnit: "px",
                locked: true,
              },
            },
            {
              id: "a-74-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".cursor",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb7"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-74-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".slider-arrow-icon-left",
                  selectorGuids: ["1b33c58d-4fcf-e271-8698-c36aa0492bb8"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712149015411,
    },
    "a-77": {
      id: "a-77",
      title: "Close Banner",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-77-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".banner-section",
                  selectorGuids: ["e82234b7-8633-fcd5-ab2a-b552f15361a9"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1689151419420,
    },
    "a-76": {
      id: "a-76",
      title: "Hide Other Dealer Text Box",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-76-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  id: "66421d37f519681700ab63cf|9b8fc50f-b5a7-6092-e7ac-811c14d7df8d",
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712306979222,
    },
    "a-75": {
      id: "a-75",
      title: "Show Other Dealer Text Box",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-75-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  id: "66421d37f519681700ab63cf|9b8fc50f-b5a7-6092-e7ac-811c14d7df8d",
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-75-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  id: "66421d37f519681700ab63cf|9b8fc50f-b5a7-6092-e7ac-811c14d7df8d",
                },
                value: "block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1712306979222,
    },
    "a-78": {
      id: "a-78",
      title: "H In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-78-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|76ff7b01-22e5-e230-bbd6-8cf8ce5261a5",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-78-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|76ff7b01-22e5-e230-bbd6-8cf8ce5261a5",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-78-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|76ff7b01-22e5-e230-bbd6-8cf8ce5261a5",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-78-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|76ff7b01-22e5-e230-bbd6-8cf8ce5261a5",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1717694466232,
    },
    "a-79": {
      id: "a-79",
      title: "H Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-79-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|76ff7b01-22e5-e230-bbd6-8cf8ce5261a5",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-79-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|76ff7b01-22e5-e230-bbd6-8cf8ce5261a5",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1717694466232,
    },
    "a-80": {
      id: "a-80",
      title: "E In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-80-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|ab08a771-5a00-7e79-30b2-613a13822e0d",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-80-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|ab08a771-5a00-7e79-30b2-613a13822e0d",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-80-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|ab08a771-5a00-7e79-30b2-613a13822e0d",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-80-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|ab08a771-5a00-7e79-30b2-613a13822e0d",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1717694466232,
    },
    "a-81": {
      id: "a-81",
      title: "E Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-81-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|ab08a771-5a00-7e79-30b2-613a13822e0d",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-81-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|ab08a771-5a00-7e79-30b2-613a13822e0d",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1717694466232,
    },
    "a-82": {
      id: "a-82",
      title: "R In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-82-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|8d44811f-c3ba-6fc0-796e-c07df4ff8e3c",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-82-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|8d44811f-c3ba-6fc0-796e-c07df4ff8e3c",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-82-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|8d44811f-c3ba-6fc0-796e-c07df4ff8e3c",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-82-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|8d44811f-c3ba-6fc0-796e-c07df4ff8e3c",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1717694466232,
    },
    "a-83": {
      id: "a-83",
      title: "R Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-83-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|8d44811f-c3ba-6fc0-796e-c07df4ff8e3c",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-83-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|8d44811f-c3ba-6fc0-796e-c07df4ff8e3c",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1717694466232,
    },
    "a-84": {
      id: "a-84",
      title: "O In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-84-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|b7532a48-e8c0-9dbb-ed6f-a82a13781ece",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-84-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|b7532a48-e8c0-9dbb-ed6f-a82a13781ece",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-84-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|b7532a48-e8c0-9dbb-ed6f-a82a13781ece",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-84-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|b7532a48-e8c0-9dbb-ed6f-a82a13781ece",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1717694466232,
    },
    "a-85": {
      id: "a-85",
      title: "O Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-85-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|b7532a48-e8c0-9dbb-ed6f-a82a13781ece",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-85-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "66421d37f519681700ab63ad|b7532a48-e8c0-9dbb-ed6f-a82a13781ece",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1717694466232,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
