((R = {
  iLerp: (e, t, i) => R.Clamp((i - e) / (t - e), 0, 1),
  Lerp: (e, t, i) => e * (1 - i) + t * i,
  Damp: (e, t, i) => R.Lerp(e, t, 1 - Math.exp(Math.log(1 - i) * RD)),
  Remap: (e, t, i, r, n) => R.Lerp(i, r, R.iLerp(e, t, n)),
  M: class {
    constructor(e) {
      R.BM(this, ["gRaf", "run", "uSvg", "uLine", "uP"]),
        (this.v = this.vInit(e)),
        (this.r = new R.Raf(this.run));
    }
    vInit(t) {
      let n = {
        el: R.Sel.el(t.el),
        e: { curve: t.e || "linear" },
        d: { origin: t.d || 0, cur: 0 },
        de: t.de || 0,
        cb: t.cb || !1,
        r: t.r || 2,
        pr: 0,
        prE: 0,
        elapsed: 0,
      };
      (n.elL = n.el.length),
        R.P.h(t, "u")
          ? (n.u = (e) => {
              t.u(n);
            })
          : R.P.h(t, "svg")
          ? (n.u = this.uSvg)
          : R.P.h(t, "line")
          ? (n.u = this.uLine)
          : (n.u = this.uP);
      var i = t.p || !1,
        e = t.svg || !1,
        a = t.line || !1;
      let r = !1;
      if (i) {
        (n.p = {}), (n.pI = []);
        var s = Object.keys(i);
        n.pL = s.length;
        let e = n.pL;
        for (; e--; ) {
          var o = s[e],
            o =
              ((n.p[e] = {
                name: o,
                origin: { start: i[o][0], end: i[o][1] },
                cur: i[o][0],
                start: i[o][0],
                end: i[o][1],
                unit: i[o][2] || "%",
              }),
              o.charAt(0)),
            l = "r" === o && r ? "r2" : o;
          (r = "r" === o), (n.pI[l] = e);
        }
      } else if (e)
        (n.svg = {
          type: e.type,
          attr: "polygon" === e.type ? "points" : "d",
          end: e.end,
          originArr: {},
          arr: {},
          val: [],
        }),
          (n.svg.start = e.start || R.A.g(n.el[0], n.svg.attr)),
          (n.svg.cur = n.svg.start),
          (n.svg.originArr.start = R.Svg.split(n.svg.start)),
          (n.svg.originArr.end = R.Svg.split(n.svg.end)),
          (n.svg.arr.start = n.svg.originArr.start),
          (n.svg.arr.end = n.svg.originArr.end),
          (n.svg.arrL = n.svg.arr.start.length);
      else if (a) {
        n.line = {
          dashed: a.dashed,
          factor: {
            start: R.Def(a.start) ? (100 - a.start) / 100 : 1,
            end: R.Def(a.end) ? (100 - a.end) / 100 : 0,
          },
          shapeL: [],
          origin: { start: [], end: [] },
          cur: [],
          start: [],
          end: [],
        };
        for (let r = 0; r < n.elL; r++) {
          var h = a.elWL || n.el[r];
          n.line.shapeL[r] = R.Svg.shapeL(h);
          let e;
          if (n.line.dashed) {
            var c = n.line.dashed;
            let t = 0;
            var d = c.split(/[\s,]/),
              u = d.length;
            for (let e = 0; e < u; e++) t += parseFloat(d[e]) || 0;
            let i = "";
            var p = Math.ceil(n.line.shapeL[r] / t);
            for (let e = 0; e < p; e++) i += c + " ";
            e = i + "0 " + n.line.shapeL[r];
          } else e = n.line.shapeL[r];
          (n.el[r].style.strokeDasharray = e),
            (n.line.origin.start[r] = n.line.factor.start * n.line.shapeL[r]),
            (n.line.origin.end[r] = n.line.factor.end * n.line.shapeL[r]),
            (n.line.cur[r] = n.line.origin.start[r]),
            (n.line.start[r] = n.line.origin.start[r]),
            (n.line.end[r] = n.line.origin.end[r]);
        }
      }
      return n;
    }
    play(e) {
      this.pause(), this.vU(e), this.de.run();
    }
    pause() {
      this.r.stop(), R.Stop(this.de);
    }
    vU(e) {
      var t = e || {},
        i = R.P.h(t, "reverse") ? "start" : "end";
      if (R.P.h(this.v, "p")) {
        let e = this.v.pL;
        for (; e--; )
          (this.v.p[e].end = this.v.p[e].origin[i]),
            (this.v.p[e].start = this.v.p[e].cur),
            R.P.h(t, "p") &&
              R.P.h(t.p, this.v.p[e].name) &&
              (R.P.h(t.p[this.v.p[e].name], "newEnd") &&
                (this.v.p[e].end = t.p[this.v.p[e].name].newEnd),
              R.P.h(t.p[this.v.p[e].name], "newStart")) &&
              (this.v.p[e].start = t.p[this.v.p[e].name].newStart);
      } else if (R.P.h(this.v, "svg"))
        R.P.h(t, "svg") && R.P.h(t.svg, "start")
          ? (this.v.svg.arr.start = t.svg.start)
          : (this.v.svg.arr.start = R.Svg.split(this.v.svg.cur)),
          R.P.h(t, "svg") && R.P.h(t.svg, "end")
            ? (this.v.svg.arr.end = t.svg.end)
            : (this.v.svg.arr.end = this.v.svg.originArr[i]);
      else if (R.P.h(this.v, "line")) {
        for (let e = 0; e < this.v.elL; e++)
          this.v.line.start[e] = this.v.line.cur[e];
        if (R.P.h(t, "line") && R.P.h(t.line, "end")) {
          this.v.line.factor.end = (100 - t.line.end) / 100;
          for (let e = 0; e < this.v.elL; e++)
            this.v.line.end[e] = this.v.line.factor.end * this.v.line.shapeL[e];
        } else
          for (let e = 0; e < this.v.elL; e++)
            this.v.line.end[e] = this.v.line.origin[i][e];
      }
      (this.v.d.cur = R.P.h(t, "d")
        ? t.d
        : R.R(this.v.d.origin - this.v.d.cur + this.v.elapsed)),
        (this.v.e.curve = t.e || this.v.e.curve),
        (this.v.e.calc = R.Is.str(this.v.e.curve)
          ? R.Ease[this.v.e.curve]
          : R.Ease4(this.v.e.curve)),
        (this.v.de = (R.P.h(t, "de") ? t : this.v).de),
        (this.v.cb = (R.P.h(t, "cb") ? t : this.v).cb),
        (this.v.pr = this.v.prE = 0 === this.v.d.cur ? 1 : 0),
        (this.de = new R.De(this.gRaf, this.v.de));
    }
    gRaf() {
      this.r.run();
    }
    run(e) {
      1 === this.v.pr
        ? (this.pause(), this.v.u(), this.v.cb && this.v.cb())
        : ((this.v.elapsed = R.Clamp(e, 0, this.v.d.cur)),
          (this.v.pr = R.Clamp(this.v.elapsed / this.v.d.cur, 0, 1)),
          (this.v.prE = this.v.e.calc(this.v.pr)),
          this.v.u());
    }
    uP() {
      var i = this.v.p,
        r = this.v.pI;
      let e = this.v.pL;
      for (; e--; ) i[e].cur = this.lerp(i[e].start, i[e].end);
      var n = ["a", "b", "c", "d"];
      let a = 0,
        s = "inset(";
      for (let t = 0; t < 4; t++) {
        let e = n[t];
        var o = R.P.h(r, e) ? i[r[e]].cur + i[r[e]].unit : 0,
          l = 3 === t ? ")" : " ";
        (s += o + l), (a += o);
      }
      var t = 0 !== a,
        h = R.P.h(r, "x") ? i[r.x].cur + i[r.x].unit : 0,
        c = R.P.h(r, "y") ? i[r.y].cur + i[r.y].unit : 0,
        h = h + c === 0 ? 0 : "translate3d(" + h + "," + c + ",0)",
        c = R.P.h(r, "r") ? i[r.r].name + "(" + i[r.r].cur + "deg)" : 0,
        d = R.P.h(r, "r2") ? i[r.r2].name + "(" + i[r.r2].cur + "deg)" : 0,
        u = R.P.h(r, "s") ? i[r.s].name + "(" + i[r.s].cur + ")" : 0;
      let p =
        h + c + d + u === 0 ? 0 : [h, c, d, u].filter((e) => 0 !== e).join(" ");
      var m,
        f = 0 !== p,
        g = R.P.h(r, "o") ? i[r.o].cur : -1,
        _ = 0 <= g,
        v = t || f || _;
      let x = this.v.elL;
      for (; x-- && !R.Und(this.v.el[x]); )
        v &&
          ((m = this.v.el[x].style),
          f && (m.transform = p),
          t && (m.clipPath = s),
          _) &&
          (m.opacity = g);
    }
    uSvg() {
      var t = this.v.svg;
      t.curTemp = "";
      for (let e = 0; e < t.arrL; e++)
        (t.val[e] = isNaN(t.arr.start[e])
          ? t.arr.start[e]
          : this.lerp(t.arr.start[e], t.arr.end[e])),
          (t.curTemp += t.val[e] + " "),
          (t.cur = t.curTemp.trim());
      for (let e = 0; e < this.v.elL && !R.Und(this.v.el[e]); e++)
        R.A.s(this.v.el[e], t.attr, t.cur);
    }
    uLine() {
      var t = this.v.line;
      for (let e = 0; e < this.v.elL; e++) {
        var i = this.v.el[e].style;
        (t.cur[e] = this.lerp(t.start[e], t.end[e])),
          (i.strokeDashoffset = t.cur[e]),
          0 === this.v.pr && (i.opacity = 1);
      }
    }
    lerp(e, t) {
      return R.R(R.Lerp(e, t, this.v.prE), this.v.r);
    }
  },
  TL: class {
    constructor() {
      (this._ = []), (this.d = 0);
    }
    from(e) {
      (this.d += R.P.h(e, "de") ? e.de : 0),
        (e.de = this.d),
        this._.push(new R.M(e));
    }
    play(e) {
      this.run("play", e);
    }
    pause() {
      this.run("pause");
    }
    run(e, t) {
      let i = 0;
      for (var r = this._.length, n = t || void 0; i < r; )
        this._[i][e](n), i++;
    }
  },
  BM: (e, t) => {
    let i = t.length;
    for (; i--; ) e[t[i]] = e[t[i]].bind(e);
  },
  CL: {
    a: (e, t) => {
      e.classList.add(t);
    },
    r: (e, t) => {
      e.classList.remove(t);
    },
    c: (e, t) => e.classList.contains(t),
  },
  Clamp: (e, t, i) => (e < t ? t : i < e ? i : e),
  Clone: (e) => JSON.parse(JSON.stringify(e)),
  CS: (e, t) => parseFloat(getComputedStyle(e)[t]),
  De: class {
    constructor(e, t) {
      (this.cb = e),
        (this.d = t),
        R.BM(this, ["loop"]),
        (this.r = new R.Raf(this.loop));
    }
    run() {
      0 === this.d ? this.cb() : this.r.run();
    }
    stop() {
      this.r.stop();
    }
    loop(e) {
      e = R.Clamp(e, 0, this.d);
      1 === R.Clamp(e / this.d, 0, 1) && (this.stop(), this.cb());
    }
  },
  Def: (e) => void 0 !== e,
  Dist: (e, t) => Math.sqrt(e * e + t * t),
  Ease: {
    linear: (e) => e,
    i1: (e) => 1 - Math.cos(e * (0.5 * Math.PI)),
    o1: (e) => Math.sin(e * (0.5 * Math.PI)),
    io1: (e) => -0.5 * (Math.cos(Math.PI * e) - 1),
    i2: (e) => e * e,
    o2: (e) => e * (2 - e),
    io2: (e) => (e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1),
    i3: (e) => e * e * e,
    o3: (e) => --e * e * e + 1,
    io3: (e) =>
      e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
    i4: (e) => e * e * e * e,
    o4: (e) => 1 - --e * e * e * e,
    io4: (e) => (e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e),
    i5: (e) => e * e * e * e * e,
    o5: (e) => 1 + --e * e * e * e * e,
    io5: (e) =>
      e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e,
    i6: (e) => (0 === e ? 0 : 2 ** (10 * (e - 1))),
    o6: (e) => (1 === e ? 1 : 1 - 2 ** (-10 * e)),
    io6: (e) =>
      0 === e || 1 === e
        ? e
        : (e /= 0.5) < 1
        ? 0.5 * 2 ** (10 * (e - 1))
        : 0.5 * (2 - 2 ** (-10 * --e)),
  },
  r0: (e, t) => 1 - 3 * t + 3 * e,
  r1: (e, t) => 3 * t - 6 * e,
  r2: (e, t, i) => ((R.r0(t, i) * e + R.r1(t, i)) * e + 3 * t) * e,
  r3: (e, t, i) => 3 * R.r0(t, i) * e * e + 2 * R.r1(t, i) * e + 3 * t,
  r4: (e, t, i, r, n) => {
    let a,
      s,
      o = 0;
    for (
      ;
      (s = t + 0.5 * (i - t)),
        0 < (a = R.r2(s, r, n) - e) ? (i = s) : (t = s),
        1e-7 < Math.abs(a) && ++o < 10;

    );
    return s;
  },
  r5: (t, i, r, n) => {
    for (let e = 0; e < 4; ++e) {
      var a = R.r3(i, r, n);
      if (0 === a) return i;
      i -= (R.r2(i, r, n) - t) / a;
    }
    return i;
  },
}).Ease4 = (e) => {
  let a = e[0],
    t = e[1],
    s = e[2],
    i = e[3],
    o = new Float32Array(11);
  if (a !== t || s !== i)
    for (let e = 0; e < 11; ++e) o[e] = R.r2(0.1 * e, a, s);
  return (e) =>
    (a === t && s === i) || 0 === e || 1 === e
      ? e
      : R.r2(
          ((e) => {
            let t = 0;
            for (var i = 1; 10 !== i && o[i] <= e; ++i) t += 0.1;
            --i;
            var r = (e - o[i]) / (o[i + 1] - o[i]),
              r = t + 0.1 * r,
              n = R.r3(r, a, s);
            return 0.001 <= n
              ? R.r5(e, r, a, s)
              : 0 === n
              ? r
              : R.r4(e, n, n + 0.1, a, s);
          })(e),
          t,
          i
        );
}),
  (R.Fetch = (t) => {
    var e = t.type,
      i = "html" === e;
    let r = i ? "text" : "json";
    var n = { method: i ? "GET" : "POST", mode: "same-origin" };
    "data" !== e &&
      (n.headers = new Headers({
        "Content-type":
          "json" === e ? "application/x-www-form-urlencoded" : "text/html",
      })),
      i || (n.body = t.body),
      R.Def(t.signal) && (n.signal = t.signal),
      fetch(t.url, n)
        .then((e) => {
          if (e.ok) return e[r]();
          t.error && t.error();
        })
        .then((e) => {
          t.success(e);
        })
        .catch((e) => {
          t.error();
        });
  }),
  (R.Is = {
    str: (e) => "string" == typeof e,
    obj: (e) => e === Object(e),
    arr: (e) => e.constructor === Array,
  }),
  (R.Mod = (e, t) => ((e % t) + t) % t),
  (R.Pad = (e, t) => ("000" + e).slice(-t)),
  (R.Pause = (e) => {
    R.Def(e) && e.pause();
  }),
  (R.PCurve = (e, t, i) =>
    ((t + i) ** (t + i) / (t ** t * i ** i)) * e ** t * (1 - e) ** i),
  (R.R = (e, t) => {
    t = R.Und(t) ? 100 : 10 ** t;
    return Math.round(e * t) / t;
  }),
  (R.Sel = {
    el: (e) => {
      let t = [];
      var i;
      return (
        R.Is.str(e)
          ? ((i = e.substring(1)),
            "#" === e.charAt(0) ? (t[0] = R.G.id(i)) : (t = R.G.class(i)))
          : (t[0] = e),
        t
      );
    },
    type: (e) => ("#" === e.charAt(0) ? "id" : "class"),
    name: (e) => e.substring(1),
  }),
  (R.L = (e, t, i, r) => {
    var n = R.Sel.el(e),
      a = n.length;
    let s = !1;
    var e = i.substring(0, 3),
      o =
        (("whe" !== e && "mou" !== e && "tou" !== e && "poi" !== e) ||
          (s = { passive: !1 }),
        "a" === t ? "add" : "remove");
    for (let e = 0; e < a; e++) n[e][o + "EventListener"](i, r, s);
  });
let Tab_ = class {
    constructor() {
      (this._ = []),
        (this.now = 0),
        (this.l = 0),
        R.BM(this, ["v"]),
        R.L(document, "a", "visibilitychange", this.v);
    }
    a(e) {
      this._.push(e), this.l++;
    }
    r(e) {
      let t = this.l;
      for (; t--; )
        if (this._[t].id === e) return this._.splice(t, 1), void this.l--;
    }
    v() {
      var e = performance.now();
      let t,
        i,
        r =
          ((i = document.hidden
            ? ((this.now = e), "stop")
            : ((t = e - this.now), "start")),
          this.l);
      for (; r--; ) this._[r][i](t);
    }
  },
  Tab = new Tab_(),
  TabId = 0,
  RD =
    ((R.Tab = class {
      constructor(e) {
        (this.o = e), (this.on = !1), (this.id = TabId), TabId++;
      }
      a() {
        this.on ||
          (Tab.a({ id: this.id, start: this.o.start, stop: this.o.stop }),
          (this.on = !0));
      }
      r() {
        this.on && (Tab.r(this.id), (this.on = !1));
      }
    }),
    0),
  FR = 1e3 / 60,
  Raf =
    ((R.Raf_ = class {
      constructor() {
        (this._ = []),
          (this.l = 0),
          (this.on = !0),
          R.BM(this, ["loop", "tOff", "tOn"]),
          Tab.a({ stop: this.tOff, start: this.tOn }),
          this.raf();
      }
      tOff() {
        this.on = !1;
      }
      tOn(e) {
        this.t = null;
        let t = this.l;
        for (; t--; ) this._[t].sT += e;
        this.on = !0;
      }
      a(e) {
        this._.push(e), this.l++;
      }
      r(e) {
        let t = this.l;
        for (; t--; )
          if (this._[t].id === e) return this._.splice(t, 1), void this.l--;
      }
      loop(t) {
        if (this.on) {
          this.t || (this.t = t), (RD = (t - this.t) / FR), (this.t = t);
          let e = this.l;
          for (; e--; ) {
            var i,
              r = this._[e];
            R.Def(r) && (r.sT || (r.sT = t), (i = t - r.sT), r.cb(i));
          }
        }
        this.raf();
      }
      raf() {
        requestAnimationFrame(this.loop);
      }
    }),
    new R.Raf_()),
  RafId = 0,
  RO =
    ((R.Raf = class {
      constructor(e) {
        (this.cb = e), (this.on = !1), (this.id = RafId), RafId++;
      }
      run() {
        this.on || (Raf.a({ id: this.id, cb: this.cb }), (this.on = !0));
      }
      stop() {
        this.on && (Raf.r(this.id), (this.on = !1));
      }
    }),
    (R.Rand = {
      range: (e, t, i) => R.R(Math.random() * (t - e) + e, i),
      uniq: (t) => {
        var i = [];
        for (let e = 0; e < t; e++) i[e] = e;
        let e = t;
        for (var r, n; e--; )
          (r = ~~(Math.random() * (e + 1))),
            (n = i[e]),
            (i[e] = i[r]),
            (i[r] = n);
        return i;
      },
    }),
    (R.Re = (e) => e.getBoundingClientRect()),
    (R.Snif = {
      uA: navigator.userAgent.toLowerCase(),
      get iPadIOS13() {
        return (
          "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
        );
      },
      get isMobile() {
        return (
          /mobi|android|tablet|ipad|iphone/.test(this.uA) || this.iPadIOS13
        );
      },
      get isFirefox() {
        return -1 < this.uA.indexOf("firefox");
      },
    }),
    (R.Stop = (e) => {
      R.Def(e) && e.stop();
    }),
    (R.Svg = {
      shapeL: (r) => {
        var e, t, i, n;
        if ("circle" === r.tagName) return 2 * R.A.g(r, "r") * Math.PI;
        if ("line" === r.tagName)
          return (
            (e = R.A.g(r, "x1")),
            (t = R.A.g(r, "x2")),
            (i = R.A.g(r, "y1")),
            (n = R.A.g(r, "y2")),
            Math.sqrt((t -= e) * t + (n -= i) * n)
          );
        if ("polyline" !== r.tagName) return r.getTotalLength();
        {
          let t = 0,
            i = 0;
          var a = r.points.numberOfItems;
          for (let e = 0; e < a; e++) {
            var s = r.points.getItem(e);
            0 < e && (t += R.Dist(s.x - i.x, s.y - i.y)), (i = s);
          }
          return t;
        }
      },
      split: (e) => {
        var t = [],
          i = e.split(" "),
          r = i.length;
        for (let e = 0; e < r; e++) {
          var n = i[e].split(","),
            a = n.length;
          for (let e = 0; e < a; e++) {
            var s = n[e],
              s = isNaN(s) ? s : +s;
            t.push(s);
          }
        }
        return t;
      },
    }),
    (R.Timer = class {
      constructor(e) {
        this._ = new R.De(e.cb, e.de);
      }
      run() {
        this._.stop(), this._.run();
      }
    }),
    (R.Und = (e) => void 0 === e),
    (R.Une = (e, t, i) => 0 !== R.R(Math.abs(e - t), i)),
    (R.A = {
      g: (e, t) => e.getAttribute(t),
      s: (e, t, i) => e.setAttribute(t, i),
      h: (e, t) => e.hasAttribute(t),
    }),
    (R.Cr = (e) => document.createElement(e)),
    (R.g = (e, t, i) => (e || document)["getElement" + t](i)),
    (R.G = {
      id: (e, t) => R.g(t, "ById", e),
      class: (e, t) => R.g(t, "sByClassName", e),
      tag: (e, t) => R.g(t, "sByTagName", e),
    }),
    (R.index = (t, i) => {
      var r = i.length;
      for (let e = 0; e < r; e++) if (t === i[e]) return e;
      return -1;
    }),
    (R.Index = {
      list: (e) => R.index(e, e.parentNode.children),
      class: (e, t, i) => R.index(e, R.G.class(t, i)),
    }),
    (R.P = { h: (e, t) => e.hasOwnProperty(t) }),
    (R.PD = (e) => {
      e.cancelable && e.preventDefault();
    }),
    (R.RO_ = class {
      constructor() {
        (this.eT = R.Snif.isMobile ? "orientationchange" : "resize"),
          (this.t = !1),
          (this._ = []),
          (this.l = 0),
          R.BM(this, ["fn", "gRaf", "run"]),
          (this.d = new R.Timer({ de: 40, cb: this.gRaf })),
          (this.f = new R.Raf(this.run)),
          R.L(window, "a", this.eT, this.fn);
      }
      a(e) {
        this._.push(e), this.l++;
      }
      r(e) {
        let t = this.l;
        for (; t--; )
          if (this._[t].id === e) return this._.splice(t, 1), void this.l--;
      }
      fn(e) {
        (this.e = e), this.d.run();
      }
      gRaf() {
        0 < this.l && !this.t && ((this.t = !0), this.f.run());
      }
      run() {
        let e = 0;
        for (var t = this._.length; e < t; ) this._[e].cb(this.e), e++;
        this.f.stop(), (this.t = !1);
      }
    }),
    new R.RO_()),
  RoId = 0;
(R.RO = class {
  constructor(e) {
    (this.cb = e), (this.id = RoId), RoId++;
  }
  on() {
    RO.a({ id: this.id, cb: this.cb });
  }
  off() {
    RO.r(this.id);
  }
}),
  (R.O = (e, t) => {
    e.style.opacity = t;
  }),
  (R.pe = (e, t) => {
    e.style.pointerEvents = t;
  }),
  (R.PE = {
    all: (e) => {
      R.pe(e, "all");
    },
    none: (e) => {
      R.pe(e, "none");
    },
  }),
  (R.T = (e, t, i, r) => {
    r = R.Und(r) ? "%" : r;
    e.style.transform = "translate3d(" + t + r + "," + i + r + ",0)";
  });
class Font {
  constructor(r) {
    var n = r.name;
    let a = n.length;
    if (0 === a) r.cb();
    else {
      let t = R.Def(r.inc),
        i = 0;
      for (let e = 0; e < a; e++) {
        var s = n[e].substring(0, 2),
          o = String(100 * parseInt(n[e].substring(2, 3))),
          l = "i" === n[e].substring(3, 4) ? "italic" : "normal",
          s = new FontFace(s, "url(/static/font/" + n[e] + ".woff2)", {
            style: l,
            weight: o,
          });
        document.fonts.add(s),
          s.load().then((e) => {
            t && r.inc(), ++i === a && r.cb();
          });
      }
    }
  }
}
function Router(e) {
  var t = _A,
    i = t.config.routes[e].page,
    r = t.route.new,
    n = t.route.old;
  (t.route.old = r),
    (t.route.new = { url: e, page: i }),
    (t.is[r.page] = !1),
    (t.is[i] = !0),
    n.page && (t.was[n.page] = !1),
    (t.was[r.page] = !0);
}
class Win {
  constructor(e) {
    (_A.win = { w: 0, h: 0 }),
      (this.d = e),
      R.BM(this, ["resize"]),
      new R.RO(this.resize).on(),
      this.resize();
  }
  resize() {
    var e = _A,
      t = innerWidth,
      i = innerHeight,
      r =
        ((e.win = { w: t, h: i }),
        (e.winSemi = { w: 0.5 * t, h: 0.5 * i }),
        (e.winRatio = { wh: t / i, hw: i / t }),
        (e.isLandscape = 1 < e.winRatio.wh),
        (e.format = e.isLandscape ? "landscape" : "portrait"),
        e.config.psd[this.d]);
    (e.psd = { h: r.h, w: r.w }),
      (e.psdRatio = { wh: e.psd.w / e.psd.h, hw: e.psd.h / e.psd.w }),
      (e.winPsd = { w: t / e.psd.w, h: i / e.psd.h }),
      (e.glScale =
        e.psdRatio.wh > e.winRatio.wh
          ? e.winRatio.hw / e.psdRatio.hw
          : e.winRatio.wh / e.psdRatio.wh),
      (e.glScale = Math.max(e.glScale, 1)),
      (e.glAmpl = 1.3 * e.glScale),
      "m" === this.d && (e.glAmpl *= 2.6),
      (e.tr = { y: -250 * e.winPsd.h });
  }
}
class Rotate {
  constructor() {
    (this.inDom = !1),
      R.BM(this, ["resize"]),
      new R.RO(this.resize).on(),
      this.resize();
  }
  resize() {
    var e = 1 < _A.winRatio.wh;
    e && !this.inDom ? this.a() : !e && this.inDom && this.r();
  }
  a() {
    (this.iW = R.Cr("div")), (this.iW.className = "i_");
    var e = R.Cr("div");
    (e.className = "i"),
      (e.textContent = "Please rotate your device"),
      this.iW.appendChild(e),
      document.body.prepend(this.iW),
      (this.inDom = !0);
  }
  r() {
    this.iW.parentNode.removeChild(this.iW), (this.inDom = !1);
  }
}
class Ctrl {
  constructor(t) {
    var e,
      i = _A;
    i.is[404] ||
      ((i.sv = "v" === t.scroll),
      i.sv ||
        ("scrollRestoration" in history &&
          (history.scrollRestoration = "manual")),
      (e = {
        front: R.Ease4([0.76, 0, 0.2, 1]),
        back: R.Ease4([0.76 - 0.18, 0, 0.38, 1]),
      }),
      (i.t = {
        y: { show: { d: 1300, e: "o6" }, hide: { d: 600, e: "i3" } },
        o: { show: { d: 1e3, e: "o2" }, hide: { d: 600, e: "i3" } },
        tr: { d: 1e3 },
        e4: {
          o6: R.Ease4([0.16, 1, 0.3, 1]),
          io6: R.Ease4([0.87, 0, 0.13, 1]),
          io: { front: e.front, back: e.back },
          o2: R.Ease4([0.37, 0, 0.63, 1]),
        },
      }),
      new Font({
        name: t.font,
        cb: (e) => {
          this.init(t);
        },
      }));
  }
  init(e) {
    var t = _A;
    (t.mutating = !0),
      (t.page = {}),
      (this.transitionM = e.transition.mutation),
      (this.d = e.device),
      R.BM(this, ["eD"]),
      new Win(this.d),
      "m" === this.d && new Rotate(),
      (t.e = new e.engine()),
      this.onPopstate(),
      R.L(document.body, "a", "click", this.eD),
      new e.transition.intro((e) => {
        this.intro(e);
      });
  }
  onPopstate() {
    let t = document,
      i = "complete",
      r = t.readyState !== i;
    (onload = (e) => {
      setTimeout((e) => {
        r = !1;
      }, 0);
    }),
      (onpopstate = (e) => {
        r && t.readyState === i && (R.PD(e), e.stopImmediatePropagation());
        e = _A;
        R.Und(e.config.routes) ||
          (e.mutating
            ? this.hPS()
            : ((e.mutating = !0), this.out(location.pathname, "back")));
      });
  }
  eD(e) {
    var t,
      i,
      r = _A;
    let n = e.target,
      a = !1,
      s = !1;
    for (; n; ) {
      var o = n.tagName;
      if ("A" === o) {
        a = !0;
        break;
      }
      if (("INPUT" === o || "BUTTON" === o) && "submit" === n.type) {
        s = !0;
        break;
      }
      n = n.parentNode;
    }
    a
      ? ((i = (t = n.href).substring(0, 3)),
        R.A.h(n, "target") ||
          R.A.h(n, "download") ||
          "mai" === i ||
          "tel" === i ||
          (R.PD(e), r.mutating) ||
          ((i = t.replace(/^.*\/\/[^/]+/, "")) !== r.route.new.url
            ? (R.CL.c(n, "c0-main-l-t")
                ? R.CL.a(n, "v")
                : R.CL.c(n, "p0-li-a")
                ? R.CL.a(n.parentNode.children[0], "v")
                : (R.CL.c(n, "a-l") || R.CL.c(n, "a-t-j")) && R.CL.a(n, "v"),
              (r.mutating = !0),
              this.out(i, n))
            : "nav-logo" === n.id && (location.href = "/")))
      : s && R.PD(e);
  }
  intro(t) {
    let i = _A;
    R.Fetch({
      url: i.route.new.url + "?device=" + this.d,
      type: "html",
      success: (e) => {
        e = JSON.parse(e);
        (i.config.routes = e.routes),
          (i.data = e.data),
          (this.cache = e.cache),
          this.add(document.body, "afterbegin", e.body),
          (this._ = R.G.class("_")),
          (this.transitionM = new this.transitionM()),
          t();
      },
    });
  }
  out(e, t) {
    Router(e);
    e = _A;
    (e.target = t),
      (e.page.update = (e) => {
        this.in();
      }),
      this.transitionM.out();
  }
  in() {
    let i = _A,
      t = this.cache[i.route.new.url];
    (document.title = t.title),
      "back" !== i.target && this.hPS(),
      (i.page.insertNew = (e) => {
        this.add(this._[0], "beforeend", t.html[0]),
          i.is.p0 && this.add(this._[1], "beforeend", t.html[1]);
      }),
      (i.page.removeOld = (e) => {
        var t = this._[0].children[0];
        t.parentNode.removeChild(t),
          i.was.p0 && (t = this._[1].children[0]).parentNode.removeChild(t);
      }),
      this.transitionM.in();
  }
  add(e, t, i) {
    e.insertAdjacentHTML(t, i);
  }
  hPS() {
    var e = _A.route.new.url;
    history.pushState({ page: e }, "", e);
  }
}
function Page$1(e, t) {
  t = R.G.class("p" + (t || ""), R.G.class("_")[e]);
  return t[t.length - 1];
}
class SD {
  constructor() {
    this.url = _A.route.new.url;
  }
  _() {
    return _A.e.s.__(this.url);
  }
}
class I {
  constructor() {
    var e = _A,
      t = e.is,
      e = e.e.p(0);
    (this._ = []), (this._L = 0), (this.sd = new SD());
    let i;
    var r = (i = t.p0
      ? [R.G.id("p0-li_")]
      : t.c0
      ? R.G.id("c0-main").children
      : t.cs
      ? R.G.class("cs-media_", e)
      : (t.o0 ? R.G.id("o0-list_") : t.p2 ? R.G.class("p2-small_", e)[0] : e)
          .children).length;
    for (let e = 0; e < r; e++) {
      var n = i[e];
      R.CL.c(n, "n") ||
        R.CL.c(n, "gpe") ||
        ((this._[this._L] = { dom: n, range: {} }), this._L++);
    }
    this.resize();
  }
  resize() {
    var t = _A.win.h;
    let i = 0;
    for (let e = 0; e < this._L; e++) {
      var r = this._[e],
        n = R.Re(r.dom).height,
        a = i - t,
        s = Math.max(i, 0) + n;
      (r.range.s = a), (r.range.e = s), (r.isOut = !1), (i += n);
    }
    this.run();
  }
  run() {
    var t = this.sd._();
    for (let e = 0; e < this._L; e++) {
      var i = this._[e];
      t > i.range.s && t <= i.range.e
        ? (i.isOut && (i.isOut = !1), this.draw(i, t))
        : i.isOut || ((i.isOut = !0), this.draw(i, t));
    }
  }
  draw(e, t) {
    R.T(e.dom, 0, R.R(-t), "px");
  }
}
class MO {
  constructor(e) {
    (this.cb = e.cb),
      (this.el = R.P.h(e, "el") ? R.Sel.el(e.el)[0] : document),
      R.BM(this, ["run"]);
  }
  on() {
    this.l("a");
  }
  off() {
    this.l("r");
  }
  l(e) {
    R.L(this.el, e, "mousemove", this.run),
      R.L(this.el, e, "touchmove", this.run);
  }
  run(e) {
    var t = "touchmove" === e.type ? e.touches[0] : e;
    this.cb(t.clientX, t.clientY, e);
  }
}
class C {
  constructor(t) {
    (this._ = [-1, -1]), (this.cb = {}), (this.cbHas = {});
    var i = ["down", "move", "up"];
    for (let e = 0; e < 3; e++) {
      var r = i[e];
      (this.cbHas[r] = R.Def(t[r])), this.cbHas[r] && (this.cb[r] = t[r]);
    }
    (this.start = { x: 0, y: 0 }),
      (this.state = { down: !1, drag: !1 }),
      (this.axe = ""),
      R.BM(this, ["move", "down", "up"]),
      (this.mo = new MO({ cb: this.move }));
  }
  down(e) {
    "A" === e.target.tagName
      ? R.PD(e)
      : 2 === e.button ||
        e.ctrlKey ||
        ((this.state.down = !0),
        (this.state.drag = !1),
        (this.axe = ""),
        (this.start = { x: e.clientX, y: e.clientY }),
        this.cbHas.down && this.cb.down({ e: e, start: this.start }));
  }
  move(e, t, i) {
    var r, n;
    (this._ = [e, t]),
      this.state.down &&
        ((r = Math.abs(e - this.start.x)),
        (n = Math.abs(t - this.start.y)),
        (this.state.drag = 6 < r || 6 < n),
        this.state.drag) &&
        ("" === this.axe && (this.axe = n < r ? "x" : "y"), this.cbHas.move) &&
        this.cb.move({ e: i, x: e, y: t, axe: this.axe });
  }
  up(e) {
    this.state.down &&
      ((this.state.down = !1), this.cbHas.up) &&
      this.cb.up({ e: e, x: e.clientX, y: e.clientY, drag: this.state.drag });
  }
  run() {
    this.mo.on();
    var t = document,
      i = ["down", "up"];
    for (let e = 0; e < 2; e++) R.L(t, "a", "pointer" + i[e], this[i[e]]);
    R.L(t, "a", "pointercancel", this.up);
  }
}
class SL {
  constructor(e) {
    (this.el = R.Sel.el(e.el)[0]),
      (this.txt = this.el.innerHTML),
      (this.txt = this.txt.replaceAll("</i> <i>", " "));
    var e = R.Cr("div"),
      t = ((e.innerHTML = this.txt), e.childNodes),
      i = t.length;
    this.arr = [];
    let r = 0;
    var n = { o: [], c: [] };
    for (let e = 0; e < i; e++) {
      var a,
        s = t[e];
      if (3 === s.nodeType) {
        var o = s.nodeValue.split(" "),
          l = o.length;
        for (let e = 0; e < l; e++) {
          "(" === o[e]
            ? ((o[e] = ""), n.o.push(r + 1))
            : ")" === o[e].charAt(0) &&
              ((o[e] = o[e].substring(1)), n.c.push(r - 1));
          var h = "" === o[e] ? " " : o[e];
          (this.arr[r] = { type: "txt", word: h, par: { o: !1, c: !1 } }), r++;
        }
      } else
        "BR" === s.tagName
          ? ((this.arr[r] = { type: "br", par: { o: !1, c: !1 } }), r++)
          : ("A" !== s.tagName && "I" !== s.tagName) ||
            ((a = s.outerHTML),
            (s = s.innerHTML),
            (a = a.split(">" + s + "<")),
            (this.arr[r] = {
              type: "tag",
              start: a[0] + ">",
              end: "<" + a[1],
              word: s.split(" "),
              par: { o: !1, c: !1 },
            }),
            r++);
    }
    this.arrL = this.arr.length;
    var c = ["o", "c"];
    for (let e = 0; e < 2; e++) {
      var d = c[e],
        u = n[d].length;
      for (let e = 0; e < u; e++) this.arr[n[d][e]].par[d] = !0;
    }
  }
  resize(e) {
    this.el.innerHTML = this.txt;
    let a = this.gW(this.el);
    var s = R.Cr("div"),
      t = s.style,
      i =
        ((t.visibility = "hidden"),
        (t.position = "absolute"),
        (t.whiteSpace = "nowrap"),
        getComputedStyle(this.el));
    (t.fontFamily = i.fontFamily),
      (t.fontSize = i.fontSize),
      (t.fontWeight = i.fontWeight),
      (t.letterSpacing = i.letterSpacing);
    let r = "_sl",
      n =
        ("ab-recognition" === this.el.parentNode.id
          ? (r += " _sl-0")
          : R.CL.c(this.el, "_sl-1")
          ? (r += " _sl-1")
          : R.CL.c(this.el, "_sl-1b")
          ? (r += " _sl-1b")
          : R.CL.c(this.el, "_sl-2")
          ? (r += " _sl-2")
          : R.CL.c(this.el, "_sl-3") && (r += " _sl-3"),
        (s.className = r),
        document.body.prepend(s),
        parseFloat(i.textIndent)),
      o = 0 < n,
      l = !0;
    function h(e) {
      o && !l && 0 < e && ((l = !0), (a += n));
    }
    o && ((a -= n), (l = !1));
    let c = "";
    var d = [];
    let u = 0,
      p = "",
      m = "";
    for (let e = 0; e < this.arrL; e++) {
      var f = this.arr[e];
      if ((h(u), "txt" === f.type)) {
        let e = f.word,
          t = (f.par.o && (e = "(" + e), f.par.c && (e += ")"), " ");
        " " === e && (t = ""),
          (s.innerHTML = p + e),
          (m =
            this.gW(s) > a
              ? ("" !== m.trim() && (d[u++] = m.trim()), (p = e + t), e + t)
              : ((p = p + e + t), m + e + t));
      } else if ("tag" === f.type) {
        let i = f.start,
          r = f.end;
        f.par.o && (i = "(" + i), f.par.c && (r += ")");
        var g = f.word,
          _ = g.length,
          v = _ - 1;
        (p = this.rLS(p)), (m = this.rLS(m));
        let n = "";
        for (let t = 0; t < _; t++) {
          h(u);
          var x = t === v ? "" : " ",
            y = g[t],
            S = ((n += y), i + n + r);
          if (((s.innerHTML = p + S), this.gW(s) > a))
            0 === t ? (d[u++] = m.trim()) : ((m = m.trim() + r), (d[u++] = m)),
              (p = ""),
              (n = y + x),
              (m = t === v ? i + y + r + x : i + y + x);
          else {
            n += x;
            let e = y;
            0 === t && (e = i + e), t === v && (e += r), (m = m + e + x);
          }
          t === v && (p += i + n + r);
        }
      } else "br" === f.type && ((d[u++] = m.trim()), (p = ""), (m = ""));
    }
    m !== d[u - 1] && "" !== (t = m.trim()) && (d[u++] = t);
    var M = e.tag.start,
      T = e.tag.end;
    for (let e = 0; e < u; e++) {
      var E = "" === d[e] ? "&nbsp;" : d[e];
      c += M + E + T;
    }
    s.parentNode.removeChild(s), (this.el.innerHTML = c);
  }
  rLS(e) {
    return e.replace(/\s?$/, "");
  }
  gW(e) {
    return R.Re(e).width;
  }
}
class Z {
  initB(e) {
    var t = _A,
      i = t.is.p0 ? 1 : 0,
      t = t.e.p(i, "_");
    (this.sd = new SD()),
      (this.trigger = []),
      (this.fx = []),
      (this.visible = []),
      (this.limit = []),
      (this.first = !0),
      (this.de = e.de),
      (this.y = R.G.class("z-y", t)),
      (this.yL = this.y.length),
      (this.o = R.G.class("z-o", t)),
      (this.oL = this.o.length),
      (this.s = R.G.class("z-s", t)),
      (this.sL = this.s.length),
      (this.sSL = []);
    for (let e = 0; e < this.sL; e++) this.sSL[e] = new SL({ el: this.s[e] });
    this.resizeB();
  }
  initA() {
    this.resizeA();
  }
  resizeB() {
    let t = -1 + this.yL + this.oL;
    for (let e = 0; e < this.sL; e++) {
      t++;
      var i = this.visible[t] ? 0 : 102;
      this.sSL[e].resize({
        tag: {
          start:
            '<span class="y_"><span class="y" style="transform: translate3d(0,' +
            i +
            '%,0);">',
          end: "</span></span>",
        },
      });
    }
  }
  resizeA() {
    let i = -1;
    var e = _A.t,
      r = e.y.show.d,
      n = e.y.show.e,
      t = e.o.show.d,
      a = e.o.show.e;
    for (let e = 0; e < this.yL; e++)
      if ((i++, !this.visible[i])) {
        this.trigger[i] = this.y[e];
        var s = this.calc(i, "z-y");
        let t = 100;
        ("ab-hero" !== this.y[e].id && "ho-hero-t" !== this.y[e].id) ||
          (t = 60),
          (this.fx[i] = new R.TL());
        for (let e = 0; e < s.domL; e++) {
          var o = 0 === e ? s.de : t;
          e < s._.domL &&
            this.fx[i].from({
              el: s._.dom[e],
              p: { y: [102, 0] },
              d: r,
              e: n,
              de: o,
            }),
            s.line.special
              ? e === s.domL - 1 &&
                this.fx[i].from({
                  el: s.line.dom[0].children[0],
                  p: { x: [-102, 0] },
                  d: r,
                  e: n,
                  de: o + 300,
                })
              : e < s.line.domL &&
                ((o = s._.domL < 1 ? o : 0),
                this.fx[i].from({
                  el: s.line.dom[e].children[0],
                  p: { x: [-102, 0] },
                  d: r,
                  e: n,
                  de: o,
                }));
        }
      }
    for (let e = 0; e < this.oL; e++)
      if ((i++, !this.visible[i])) {
        this.trigger[i] = this.o[e];
        var l = this.calc(i, "z-o"),
          h = 10 < l.domL ? 50 : 100,
          c = !l.vp && 0 === l.de,
          d = c ? 0 : t;
        this.fx[i] = new R.TL();
        for (let e = 0; e < l.domL; e++) {
          var u = 0 === e ? l.de : h;
          this.fx[i].from({
            el: l._.dom[e],
            p: { o: [0, 1] },
            d: d,
            e: a,
            de: u,
          }),
            c && ((this.visible[i] = !0), this.fx[i].play());
        }
      }
    for (let e = 0; e < this.sL; e++)
      if ((i++, !this.visible[i])) {
        this.trigger[i] = this.s[e];
        var p = this.calc(i, "z-s");
        let t = 60;
        "H1" === this.s[e].tagName && (t = 100), (this.fx[i] = new R.TL());
        for (let e = 0; e < p.domL; e++) {
          var m = 0 === e ? p.de : t;
          this.fx[i].from({
            el: p._.dom[e],
            p: { y: [102, 0] },
            d: r,
            e: n,
            de: m,
          });
        }
      }
    if (this.first) {
      (this.first = !1), (this.triggerL = i + 1);
      for (let e = 0; e < this.triggerL; e++)
        R.Und(this.visible[e]) && (this.visible[e] = !1);
    }
  }
  loop() {
    if (0 !== this.triggerL) {
      var t = this.sd._();
      for (let e = 0; e < this.triggerL; e++)
        t > this.limit[e] &&
          !this.visible[e] &&
          ((this.visible[e] = !0), this.fx[e].play());
    }
  }
  calc(e, t) {
    var i = "z-y" === t,
      r = "z-o" === t ? "o" : "y",
      n = _A.win.h,
      a = this.trigger[e],
      s = {},
      o = "-[0-9]?[0-9]",
      l = this.sd._(),
      l = R.Re(a).top + l,
      h = l < n;
    this.limit[e] = h ? -1 : l - n;
    let c = 0;
    h && (c = this.de);
    (e = new RegExp(t + o)),
      (l = a.className.match(e)),
      l && (c += 100 * l[0].substring(4)),
      (n = new RegExp(t + o + o)),
      (e = a.className.match(n)),
      e &&
        ((l = e[0].substring(4).split("-")),
        (c += h ? 100 * l[1] : 100 * l[0])),
      (o = R.G.class(t + "-w", a)[0]),
      (n = o || a),
      (e = R.CL.c(n, r) ? [n] : R.G.class(r, n));
    if (((s._ = { dom: e }), (s._.domL = s._.dom.length), i)) {
      let e = R.G.class("n-s-l", n);
      l = 0 < e.length;
      l || (e = R.G.class("l", n)),
        (s.line = { dom: e, special: l }),
        (s.line.domL = s.line.dom.length);
    }
    return (
      (s.domL = s._.domL),
      i && (s.domL = Math.max(s.line.domL, s._.domL)),
      (s.de = c),
      (s.vp = h),
      s
    );
  }
}
class K {
  constructor(e) {
    (this.isD = "d" === e),
      R.BM(this, ["loop"]),
      (this.raf = new R.Raf(this.loop)),
      (this.isOff = !0);
  }
  initA() {
    var e = _A,
      t = e.e.p(0, "_");
    (this.sd = new SD()),
      (this.isP2 = e.is.p2),
      (this.isMP2 = this.isP2 && !this.isD),
      (this.lazy = R.G.class("k", t)),
      (this.lazyL = this.lazy.length),
      (this.lazyRange = []),
      (this.lazyOff = []);
    for (let e = 0; e < this.lazyL; e++)
      (this.lazyOff[e] = !0), (this.lazyRange[e] = {});
    this.resizeA();
  }
  resizeA() {
    var i = _A;
    let r = this.sd._(),
      e = (this.isMP2 && (r = i.e.p2.scroll._.cur), "h"),
      n = "top",
      a = "height";
    this.isMP2 && ((e = "w"), (n = "left"), (a = "width"));
    var s = i.win[e];
    for (let t = 0; t < this.lazyL; t++) {
      if (R.Und(this.lazy[t])) return;
      let e = this.lazy[t];
      (i.is.p1 || i.is.c1) &&
        ((o = this.lazy[t].parentNode.parentNode), R.CL.c(o, "x-i-s")) &&
        (e = o.parentNode);
      var o = R.Re(e),
        l = o[n],
        h = o[a];
      (this.lazyRange[t].s = Math.max(l + r - s, s < l ? 1 : 0)),
        (this.lazyRange[t].e = Math.max(l + r, 0) + h);
    }
  }
  run() {
    (this.isOff = !1), this.raf.run();
  }
  loop() {
    var e = _A;
    let t = this.sd._();
    this.isMP2 && (t = e.e.p2.scroll._.cur);
    for (let e = 0; e < this.lazyL; e++)
      if (
        this.lazyOff[e] &&
        t >= this.lazyRange[e].s &&
        t <= this.lazyRange[e].e
      ) {
        if (this.isOff || R.Und(this.lazy[e])) return;
        this.lazyOff[e] = !1;
        let i = this.lazy[e];
        if ("IMG" === i.tagName) {
          let t = i.dataset.src;
          delete i.dataset.src;
          var r = new Image();
          (r.crossOrigin = "anonymous"),
            (r.src = t),
            r.decode().then((e) => {
              this.isOff ||
                R.Und(i) ||
                ((i.src = t),
                R.CL.c(i, "k-o")
                  ? R.CL.a(i, "on")
                  : R.CL.c(i.parentNode, "k-o") && R.CL.a(i.parentNode, "on"));
            });
        } else R.CL.c(i, "k-o") && R.CL.a(i, "on");
      }
  }
  off() {
    (this.isOff = !0), (this.lazyL = 0), this.raf.stop();
  }
}
let Load$2 = class {
  constructor(e) {
    (this.dom = e.dom),
      (this.cb = e.cb),
      (this.hasAction = R.Def(e.action)),
      this.hasAction ? (this.action = e.action) : (this.action = this.dom),
      R.BM(this, ["playFn", "timeFn"]),
      (this.playing = !1),
      (this.timeup = !1),
      (this.fulfilled = !1),
      (this.pausing = !0),
      this.lPlay("a"),
      this.lTime("a"),
      this.hasAction
        ? this.action.play()
        : this.action.play().then((e) => {
            (this.fulfilled = !0), this.pausing && this.action.pause();
          });
  }
  lPlay(e) {
    R.L(this.dom, e, "playing", this.playFn);
  }
  lTime(e) {
    R.L(this.dom, e, "timeupdate", this.timeFn);
  }
  playFn() {
    (this.playing = !0), this.lPlay("r"), this.checkReady();
  }
  timeFn() {
    (this.timeup = !0), this.lTime("r"), this.checkReady();
  }
  checkReady() {
    this.playing &&
      this.timeup &&
      ((this.pausing = !0),
      (this.hasAction || this.fulfilled) && this.action.pause(),
      this.cb());
  }
  off() {
    this.lPlay("r"),
      this.lTime("r"),
      (this.pausing = !0),
      (this.hasAction || this.fulfilled) && this.action.pause();
  }
};
class Video {
  constructor(e) {
    (this.inDom = R.Def(e.dom)),
      this.inDom
        ? (this.dom = e.dom)
        : ((this.dom = R.Cr("video")),
          R.A.s(this.dom, "crossorigin", "anonymous"),
          R.A.s(this.dom, "preload", "none"),
          R.A.s(this.dom, "playsinline", "true"),
          (this.dom.muted = !0),
          (this.dom.loop = !0),
          (this.dom.src = e.src),
          e.c.appendChild(this.dom)),
      this.dom.load(),
      R.BM(this, ["play", "pause"]),
      (this.tabing = !1),
      (this.playing = !1),
      (this.promising = !1),
      (this.pausing = !1),
      (this.tab = new R.Tab({
        stop: (e) => {
          this.playing && ((this.tabing = !0), this.pause());
        },
        start: (e) => {
          this.tabing && ((this.tabing = !1), this.play());
        },
      })),
      this.tab.a();
  }
  load(e) {
    this.load_ = new Load$2({
      dom: this.dom,
      action: { play: this.play, pause: this.pause },
      cb: e,
    });
  }
  play() {
    (this.pausing = !1),
      this.promising ||
        this.playing ||
        ((this.promising = !0),
        (this.playPromise = this.dom.play()),
        this.playPromise.then((e) => {
          (this.promising = !1),
            (this.playing = !0),
            this.pausing && this.pause();
        }));
  }
  pause() {
    (this.pausing = !0),
      this.playing && (this.dom.pause(), (this.playing = !1));
  }
  rm() {
    R.Def(this.load_) && this.load_.off(),
      this.tab.r(),
      this.inDom || this.dom.remove();
  }
}
class Q {
  constructor() {
    R.BM(this, ["fn", "fnEnd"]);
  }
  init() {
    var e = _A.e.p(0, "_");
    if (
      ((this.q = R.G.class("q", e)),
      (this.qL = this.q.length),
      (this.pr = R.G.class("q-r")),
      (this.rqd = 0 < this.qL),
      this.rqd)
    ) {
      (this.loading = []),
        (this.first = []),
        (this.autoplay = []),
        (this.play = []),
        (this.x = []);
      for (let e = 0; e < this.qL; e++) {
        var t = this.q[e].children,
          t = ((this.loading[e] = !1), (this.first[e] = !0), t[2] || t[1]);
        (this.play[e] = new R.M({ el: t, p: { o: [1, 0] }, d: 250, e: "o3" })),
          (this.x[e] = { cur: -100, tar: -100 });
      }
      (this.playing = -1), (this.video = []);
    }
  }
  loop() {
    if (this.rqd)
      for (let e = 0; e < this.qL; e++)
        (this.x[e].cur = R.Damp(this.x[e].cur, this.x[e].tar, 0.09)),
          R.Une(this.x[e].cur, this.x[e].tar, 3) &&
            R.T(this.pr[e].children[0], R.R(this.x[e].cur), 0);
  }
  abReel(e) {
    return (
      (this.deAbR = new R.De((e) => {
        (this.loading[0] = !0), (this.autoplay[0] = !0), (this.first[0] = !1);
        let t = this.q[0].children[0].children[0];
        (this.video[0] = new Video({ dom: t })),
          this.video[0].load((e) => {
            (t.autoplay = !0),
              (t.currentTime = 13.45),
              this.play_(0),
              (this.deAbR2 = new R.De((e) => {
                R.CL.a(t, "on"), (this.loading[0] = !1);
              }, 100)),
              this.deAbR2.run();
          });
      }, e.de)),
      {
        play: (e) => {
          this.deAbR.run();
        },
      }
    );
  }
  fn(e) {
    e = e.target;
    let r = R.Index.class(e, "q");
    e = e.children;
    let n = e[0];
    if (!this.loading[r])
      if (this.first[r]) {
        (this.first[r] = !1), (this.loading[r] = !0);
        let t = e[1],
          i = e[3];
        (this.video[r] = new Video({ dom: n })),
          this.play[r].play(),
          (this.x[r].tar = -50),
          this.video[r].load((e) => {
            this.play_(r),
              R.O(n, 1),
              new R.M({ el: t, p: { o: [1, 0] }, d: 500, e: "o2" }).play(),
              (this.x[r].tar = 0),
              R.T(i, 100, 0),
              (this.loading[r] = !1);
          });
      } else if (this.autoplay[r]) {
        (this.autoplay[r] = !1), this.play[r].play(), this.video[r].pause();
        let e = this.q[r].children[0].children[0];
        (e.currentTime = 0),
          (e.muted = !1),
          new R.De((e) => {
            this.video[r].play();
          }, 10).run();
      } else
        this.video[r].pausing
          ? (this.play[r].play(), this.play_(r))
          : this.pause_(r);
  }
  fnEnd(e) {
    e = R.Index.class(e.target, "q-v");
    this.pause_(e), this.play[e].play({ reverse: !0 });
  }
  play_(e) {
    -1 < this.playing && this.pause_(this.playing),
      (this.playing = e),
      R.L(this.video[e].dom, "a", "ended", this.fnEnd),
      this.video[e].play();
  }
  pause_(e) {
    this.play[e].play({ reverse: !0 }),
      (this.playing = -1),
      R.L(this.video[e].dom, "r", "ended", this.fnEnd),
      this.video[e].pause();
  }
  l(e) {
    R.L(".q", e, "click", this.fn);
  }
  on() {
    this.rqd && this.l("a");
  }
  off() {
    if (this.rqd) {
      this.l("r");
      for (let e = 0; e < this.qL; e++)
        R.Def(this.video[e]) && this.video[e].rm();
      -1 < this.playing && this.pause_(this.playing),
        R.Stop(this.deAbR),
        R.Stop(this.deAbR2);
    }
  }
}
class Obj {
  constructor(e) {
    var t = e.index,
      i = e.de;
    (this.p_ = e.p),
      (this.p_L = this.p_.length),
      (this.p = []),
      (this.pr = {
        show: { start: t * i, end: 1 - (e.length - 1 - t) * i },
        hide: { start: 0, end: 1 },
      }),
      (this.cur = []);
    for (let e = 0; e < this.p_L; e++) {
      var r = this.p_[e];
      (this.cur[e] = r[1]),
        (this.p[e] = { round: "y" === r[0] || "x" === r[0] ? 3 : 6 });
    }
  }
  prepare(t) {
    this.isShow = t.isShow;
    var i = t.running;
    for (let e = 0; e < this.p_L; e++) {
      var r = this.p_[e],
        n = r[1],
        a = r[2];
      "opacity" === r[0]
        ? this.isShow
          ? ((this.p[e].start = i ? this.cur[e] : n), (this.p[e].end = a))
          : ((this.p[e].start = this.cur[e]), (this.p[e].end = n))
        : this.isShow
        ? ((this.p[e].start = i && t.pEndIsEnd ? this.cur[e] : n),
          (this.p[e].end = 0))
        : ((this.p[e].start = this.cur[e]),
          (this.p[e].end = t.pEndIsEnd ? a : n));
    }
    var e = this.isShow ? this.pr.show : this.pr.hide;
    (this.pr.start = e.start), (this.pr.end = e.end);
  }
  loop(e) {
    var t = e.el,
      i = e.elL,
      r = [0, 0];
    let n;
    var a = R.Remap(this.pr.start, this.pr.end, 0, 1, e.pr),
      s = e.rEase(a);
    let o = "",
      l = "";
    for (let e = 0; e < this.p_L; e++) {
      var h = this.p_[e][0],
        c = this.p[e];
      (this.cur[e] = R.R(R.Lerp(c.start, c.end, s), c.round)),
        "y" === h
          ? ((r[1] = this.cur[e]), (n = this.u(e)))
          : "x" === h
          ? ((r[0] = this.cur[e]), (n = this.u(e)))
          : "rotateX" === h
          ? (o = " rotateX(" + this.cur[e] + "deg)")
          : "opacity" === h && (l = this.cur[e]);
    }
    var d = "translate3d(" + r[0] + n + "," + r[1] + n + ",0)" + o;
    for (let e = 0; e < i; e++) {
      var u = t[e].style;
      (u.transform = d), "" !== l && (u.opacity = l);
    }
  }
  u(e) {
    return R.Def(this.p_[e][3]) ? this.p_[e][3] : "%";
  }
}
class Obj_ {
  constructor(e) {
    (this.a = _A), (this.de = e.de);
    var t = e.el,
      i = e.ch,
      r = e.p,
      n = e.indexStart,
      a =
        ((this.rand = e.rand),
        (this.length = e.length),
        (this.element = []),
        (this.elementL = []),
        (this.obj = []),
        (this.objL = t.length),
        (this.randUniq = []),
        e.objLength);
    for (let e = 0; e < this.objL; e++)
      (this.element[e] = 2 === i ? t[e].children : [t[e]]),
        (this.elementL[e] = this.element[e].length),
        (this.obj[e] = new Obj({ index: n + e, length: a, de: this.de, p: r })),
        (this.randUniq[e] = e);
  }
  prepare(t) {
    !t.running && this.rand && (this.randUniq = R.Rand.uniq(this.objL));
    for (let e = 0; e < this.objL; e++) this.obj[e].prepare(t);
  }
  loop(e) {
    var t = e.pr,
      i = e.rEase;
    for (let e = 0; e < this.objL; e++)
      this.obj[e].loop({
        el: this.element[this.randUniq[e]],
        elL: this.elementL[e],
        pr: t,
        rEase: i,
      });
  }
}
class An {
  constructor(e) {
    (this.a = _A), (this.de = e.de || 0);
    var t = e.lT || !1,
      i = e.ch,
      r = e.rand || !1;
    let n = e.el;
    R.Und(n.length) && (n = [n]), (this.lineL = n.length);
    var a = e.p,
      e =
        ((this.start = a[0][1]), (this.objLength = this.lineL), n[0].children);
    0 < i && 1 === this.lineL && 1 < e.length && (this.objLength = e.length),
      (this.line = []);
    let s = 0;
    for (let e = 0; e < this.lineL; e++) {
      var o = 0 === i ? [n[e]] : n[e].children;
      (this.line[e] = new Obj_({
        length: this.lineL,
        objLength: this.objLength,
        indexStart: s,
        ch: i,
        el: o,
        p: a,
        de: this.de,
        rand: r,
      })),
        t || (s += this.line[e].objL);
    }
  }
  m(e) {
    R.Def(this.anim) && this.anim.pause();
    var t = "show" === e.a,
      i = e.d;
    let r,
      n =
        ((r = R.Def(e.e)
          ? R.Is.str(e.e)
            ? R.Ease[e.e]
            : R.Ease4(e.e)
          : R.Ease.o6),
        this.line),
      a = this.lineL;
    var s = n[0].obj[0].cur[0];
    let o = !1,
      l = (t || (o = ((this.start < 0 && 0 < s) || this.start, !0)), e.de);
    t && this.running && (l = 0);
    for (let e = 0; e < a; e++)
      n[e].prepare({ isShow: t, running: this.running, pEndIsEnd: o });
    s = t ? 1 - (this.objLength - 1) * this.de : 1;
    return (
      (this.anim = new R.M({
        de: l,
        d: i / s,
        u: (e) => {
          var t = e.pr;
          for (let e = 0; e < a; e++) n[e].loop({ pr: t, rEase: r });
        },
        cb: (e) => {
          this.running = !1;
        },
      })),
      {
        play: (e) => {
          (this.running = !0), this.anim.play();
        },
      }
    );
  }
}
class X {
  constructor() {
    R.BM(this, ["fn"]);
  }
  initB() {
    var e = _A.e.p(0, "_"),
      t = ((this.sd = new SD()), R.G.class("x-i-l", e)[0]);
    if (((this.rqd = R.Def(t)), this.rqd)) {
      t = t.children;
      if (((this.len = t.length), (this.rqd = 1 < this.len), this.rqd)) {
        this.i = R.G.class("x-i", e)[0];
        var i = R.G.class("x-i-s", e)[0].children;
        (this.iArr = [t, i]),
          (this.pagi = R.G.class("x-p", e)[0].children[0]),
          (this.prog = R.G.class("x-i-p", e)[0]),
          (this.prog_ = { cur: 0, tar: 0 }),
          (this.max = this.len - 1),
          (this.index = 0),
          (this.loaded = !1),
          (this.moveL = 0),
          (this._ = { x: [], cl: [], cr: [] });
        for (let e = 0; e < this.len; e++) {
          var r = 0 === e ? 0 : 10,
            n = 0 === e ? 0 : 100;
          e;
          (this._.x[e] = { cur: r, tar: r }),
            (this._.cl[e] = { cur: n, tar: n }),
            (this._.cr[e] = { cur: 0, tar: 0 });
        }
        (this.visibleFirst = !1), (this.visible = []);
        for (let e = 0; e < this.len; e++) this.visible[e] = !1;
        (this.caption__ = R.G.class("x-c__", e)[0]),
          (this.caption_ = R.G.class("x-c_", this.caption__)),
          (this.slCaption = []),
          (this.slCaptionL = []);
        for (let t = 0; t < this.len; t++) {
          var a = R.G.class("x-c_s", this.caption_[t]);
          (this.slCaption[t] = []), (this.slCaptionL[t] = a.length);
          for (let e = 0; e < this.slCaptionL[t]; e++)
            this.slCaption[t][e] = new SL({ el: a[e] });
        }
        (this.fxCaption = []), this.resizeB();
      }
    }
  }
  initA() {
    this.resizeA();
  }
  resizeB() {
    if (this.rqd) {
      let e = 0;
      this.caption__.style.height = "";
      for (let t = 0; t < this.len; t++) {
        var i = this.visible[t] ? 0 : -101;
        for (let e = 0; e < this.slCaptionL[t]; e++)
          this.slCaption[t][e].resize({
            tag: {
              start:
                '<div class="y_"><div class="y" style="transform: translate3d(0,' +
                i +
                '%,0);">',
              end: "</div></div>",
            },
          });
        0 < this.slCaptionL[t] &&
          ((this.fxCaption[t] = new An({
            ch: 0,
            el: R.G.class("y", this.caption_[t]),
            p: [["y", 110, -110]],
            de: 0.03,
          })),
          this.visible[t]) &&
          this.fxCaption[t].m({ a: "show", d: 0 }).play();
        var r = R.Re(this.caption_[t]).height;
        r > e && (e = r);
      }
      this.caption__.style.height = e + "px";
    }
  }
  resizeA() {
    var e, t, i, r;
    this.rqd &&
      ((e = _A),
      (i = this.sd._()),
      (t = e.win.h),
      (i = R.Re(this.caption__).top + i),
      (this.limit = (r = i < t) ? -1 : i - t),
      (this.delay = r ? 0.5 * e.t.tr.d + 400 : 0));
  }
  fx(e) {
    if (!this.rqd) return { play: (e) => {} };
    let t = e.index;
    var i = e.a;
    let r = "show" === i;
    var n = r ? "all" : "none";
    if (R.Und(this.fxCaption[t])) return { play: (e) => {} };
    if (this.visible[t] === r) return { play: (e) => {} };
    var a = _A,
      s = r ? a.t.y.show.d : 1e3,
      a = r ? a.t.y.show.e : "o6",
      e = e.de;
    let o = this.fxCaption[t].m({ a: i, d: s, e: a, de: e });
    (i = R.G.class("x-c_", this.caption__)[t]), (s = R.G.class("u_", i));
    return (
      0 < s.length && R.PE[n](s[0]),
      {
        play: (e) => {
          (this.visible[t] = r), o.play();
        },
      }
    );
  }
  fn(e) {
    this.off(), this.loaded ? this.slide(e.clientX) : this.load(e);
  }
  slide(e) {
    var t, i, r, n;
    this.moveL >= this.len ||
      ((t = (e = e > _A.winSemi.w) ? 1 : -1),
      (i = this.index),
      (r = R.Mod(i + t, this.len)),
      (n = this.state === e || R.Und(this.state)),
      (this.state = e),
      (this.index = r),
      n && (this._.x[r].cur = 20 * t),
      (this._.x[r].tar = 0),
      (this._.x[i].tar = -20 * t),
      e
        ? (n &&
            ((this._.cl[r].cur = 0),
            (this._.cl[r].tar = 0),
            (this._.cr[r].cur = 100),
            (this._.cl[i].cur = 0)),
          (this._.cr[r].tar = 0),
          (this._.cl[i].tar = 100))
        : (n &&
            ((this._.cr[r].cur = 0),
            (this._.cr[r].tar = 0),
            (this._.cl[r].cur = 100),
            (this._.cr[i].cur = 0)),
          (this._.cl[r].tar = 0),
          (this._.cr[i].tar = 100)),
      (this.pagi.textContent = R.Pad(r + 1, 2)),
      this.fx({ a: "hide", index: i, de: 0 }).play(),
      this.fx({ a: "show", index: r, de: 100 }).play()),
      this.on();
  }
  loop() {
    if (this.rqd) {
      this.visibleFirst ||
        (this.sd._() > this.limit &&
          ((this.visibleFirst = !0),
          this.fx({ a: "show", index: 0, de: this.delay }).play()));
      for (let t = (this.moveL = 0); t < this.len; t++) {
        (this._.x[t].cur = R.Damp(this._.x[t].cur, this._.x[t].tar, 0.09)),
          (this._.cl[t].cur = R.Damp(this._.cl[t].cur, this._.cl[t].tar, 0.09)),
          (this._.cr[t].cur = R.Damp(this._.cr[t].cur, this._.cr[t].tar, 0.09));
        var e = R.Une(this._.x[t].cur, this._.x[t].tar, 1);
        if (R.Une(this._.x[t].cur, this._.x[t].tar, 3))
          for (let e = 0; e < 2; e++) {
            var i = this.iArr[e][t];
            (i.style.clipPath =
              "inset(0 " +
              R.R(this._.cl[t].cur) +
              "% 0 " +
              R.R(this._.cr[t].cur) +
              "%)"),
              R.T(i.children[0], R.R(this._.x[t].cur), 0);
          }
        e && this.moveL++;
      }
      (this.prog_.cur = R.Damp(this.prog_.cur, this.prog_.tar, 0.09)),
        R.Une(this.prog_.cur, this.prog_.tar, 3) &&
          R.T(this.prog, R.R(this.prog_.cur), 0);
    }
  }
  load(n) {
    this.loaded = !0;
    let a = 2 * this.max,
      s = a;
    for (let r = 0; r < 2; r++)
      for (let e = 0; e < this.len; e++)
        if (0 !== e) {
          let t = this.iArr[r][e].children[0],
            i = t.dataset.src;
          var o = new Image();
          (o.crossOrigin = "anonymous"),
            (o.src = i),
            o.decode().then((e) => {
              (t.src = i),
                s--,
                R.T(this.prog.children[0], R.Remap(a, 0, -100, 0, s), 0),
                0 === s &&
                  ((this.de = new R.De((e) => {
                    (this.prog_.tar = 100), this.fn(n);
                  }, 200)),
                  this.de.run());
            });
        }
  }
  l(e) {
    R.L(this.i, e, "click", this.fn);
  }
  on() {
    this.rqd && this.l("a");
  }
  off() {
    this.rqd && this.l("r");
  }
}
class Hold {
  constructor(e) {
    "m" === e &&
      document.addEventListener("contextmenu", (e) => {
        R.PD(e);
      });
  }
  intro() {
    (this.isDown = !1), (this.hold = R.G.id("hold"));
  }
  initA() {
    var e = _A;
    (this.page = e.route.new.page),
      (this.holdRqd = Object.keys(e.data.gl).includes(this.page) && !e.is.p0),
      this.holdRqd &&
        ((e = e.e.p(0, "_")),
        (this.gpe = R.G.class("gpe", e)[0]),
        (this.first = !0),
        (this.canHide = !1),
        (this.holdFx = new R.M({
          el: this.hold.children[0],
          p: { x: [-100, 0] },
        })));
  }
  introFx(e) {
    let t = _A;
    return (
      t.gl.uMYUp({ page: this.page, index: 0, mY: [0, 0], fade: 0 }),
      (this.de = new R.De((e) => {
        t.gl.camYFx({ cur: 1, tar: 0 }),
          t.gl.shake.on({ index: 0, page: "p0" });
      }, e.de)),
      {
        play: (e) => {
          this.de.run();
        },
      }
    );
  }
  down(e) {
    if (this.holdRqd) {
      e = e.e.target;
      if (
        !R.CL.c(e, "q") &&
        "ab-lifestyle" !== e.id &&
        ((this.isDown = !0), !this.visible)
      ) {
        let i = _A.gl;
        this.first &&
          ((this.first = !1), "p0" !== this.page) &&
          (i.camYFx({ cur: -1, tar: -1 }),
          i.uMYUp({ page: this.page, mY: [0, 0], fade: 0, index: 0 })),
          this.holdFx.play({
            d: 1e3,
            e: "linear",
            cb: (e) => {
              var t = new R.M({
                el: this.hold,
                p: { x: [0, 100] },
                e: [0.16, 1, 0.3, 1],
                d: 1e3,
                cb: (e) => {
                  this.holdFx.play({ d: 0, reverse: !0, cb: !1 }),
                    new R.De((e) => {
                      R.T(this.hold, 0, 0);
                    }, 1).run();
                },
              });
              R.PE.all(this.gpe),
                i.shake.on({ index: 0, page: this.page }),
                i.camYFx({ cur: 1, tar: 0 }),
                t.play(),
                (this.visible = !0);
            },
          });
      }
    }
  }
  up() {
    var e;
    this.isDown &&
      ((this.isDown = !1),
      this.visible
        ? this.canHide
          ? ((this.visible = !1),
            (this.canHide = !1),
            (e = _A.gl),
            R.PE.none(this.gpe),
            e.shake.off({ index: 0, page: this.page }),
            e.camYFx({ cur: 0, tar: -1 }))
          : (this.canHide = !0)
        : this.holdFx.play({ d: 1e3, e: "o2", reverse: !0, cb: !1 }));
  }
}
class V_ {
  constructor() {
    (this._ = []),
      (this.l = 0),
      (this.t = !1),
      (this.f = R.Snif.firefox && R.Snif.mac ? 2.5 : 1),
      R.BM(this, ["fn"]);
    var e = document;
    R.L(e.body, "a", "wheel", this.fn),
      R.L(e, "a", "keydown", this.fn),
      (this.axe = ""),
      (this.mA = 0),
      (this.timer = new R.Timer({
        de: 30,
        cb: (e) => {
          this.axe = "";
        },
      }));
  }
  a(e) {
    this._.push(e), this.l++;
  }
  r(e) {
    let t = this.l;
    for (; t--; )
      if (this._[t].id === e) return this._.splice(t, 1), void this.l--;
  }
  m(e) {
    this.mA += e ? 1 : -1;
  }
  fn(e) {
    (this.e = e),
      (this.eT = e.type),
      (this.eK = e.key),
      !_A.sv || ("keydown" === this.eT && "Tab" !== this.eK) || R.PD(e),
      0 < this.l && !this.t && ((this.t = !0), this.run());
  }
  run() {
    "wheel" === this.eT ? this.w() : this.k();
  }
  w() {
    var e, t;
    (this.x = this.e.deltaX * this.f),
      (this.y = this.e.deltaY * this.f),
      0 < this.mA &&
        (this.timer.run(),
        (e = Math.abs(this.x)),
        (t = Math.abs(this.y)),
        "" === this.axe) &&
        (this.axe = t < e ? "x" : "y"),
      this.cb("w");
  }
  k() {
    var t = this.eK,
      e = "Arrow",
      i = t === e + "Up" || t === e + "Left",
      r = " " === t;
    if (i || t === e + "Down" || t === e + "Right" || r) {
      let e = 100;
      i
        ? (e *= -1)
        : r && ((t = this.e.shiftKey ? -1 : 1), (e = (_A.win.h - 40) * t)),
        (this.x = e),
        (this.y = e),
        this.cb("k");
    } else this.t = !1;
  }
  cb(e) {
    let t = this.l;
    for (; t--; ) {
      var i = this._[t];
      ("w" !== e && !i.k) ||
        (this.mA && this.axe !== i.axe) ||
        i.cb(this[i.axe], this.e);
    }
    this.t = !1;
  }
}
let v = new V_(),
  VId = 0;
class V {
  constructor(e) {
    (this.o = e), (this.i = VId), (this.m = !1), VId++;
  }
  multiAxe(e) {
    this.m !== e && ((this.m = e), v.m(e));
  }
  on() {
    v.a({ id: this.i, axe: this.o.axe, m: this.m, cb: this.o.cb, k: this.o.k });
  }
  off() {
    this.multiAxe(!1), v.r(this.i);
  }
}
class W_ {
  constructor(e) {
    var t = "d" === e.device;
    if (
      ((this.axe = e.axe),
      (this.isX = "x" === this.axe),
      (this.scroll = t && e.scroll),
      (this.centered = e.centered),
      (this.snap = e.snap),
      (this.clickSnap = e.clickSnap),
      (this.hasLink = R.Def(e.link)),
      this.hasLink && (this.link = R.Sel.el(e.link)),
      (this.hasFx = R.Def(e.fx)),
      this.hasFx && (this.fx = e.fx),
      (this.hasGl = R.Def(e.gl)),
      this.hasGl)
    ) {
      this.gl = e.gl;
      let r = e.glTxt;
      (this.hasOver = t),
        this.hasOver &&
          ((this.overIndex = -1),
          (this.overOn = !0),
          (this.overTimer = new R.Timer({
            de: 200,
            cb: (e) => {
              this.overOn = !0;
            },
          })),
          (this.glIndex = 0),
          (this.glIndexT = 0),
          (this.glTimer = new R.Timer({
            de: 200,
            cb: (e) => {
              var t = this.glIndex,
                i = this.glIndexT;
              r({ indexNew: t, indexOld: i }), (this.glIndexT = this.glIndex);
            },
          })));
    }
    (this.min = 0),
      this.scroll &&
        (R.BM(this, ["vFn"]),
        (this.v = new V({ axe: this.axe, cb: this.vFn, k: !0 })));
  }
  initA(e) {
    (this.area = e.area),
      (this.li = e.li),
      (this.liL = this.li.length),
      (this.liMax = this.liL - 1),
      (this.hasArea = this.area !== document),
      (this.isDown = !1),
      (this.prev = 0),
      (this._ = { cur: 0, tar: 0 }),
      (this.sd = new SD()),
      this.snap &&
        ((this.index = 0),
        this.hasGl && ((this.glIndex = 0), (this.glIndexT = 0)),
        (this.snapTimer = new R.De((e) => {
          this.snapUp();
        }, 300))),
      this.sUpAll(0),
      this.resizeA();
  }
  resizeA() {
    var e,
      t = this.isX ? this.sd._() : this._.cur,
      i = this.isX ? this._.cur : 0;
    this.pos = [];
    for (let e = 0; e < this.liL; e++) {
      var r = R.Re(this.li[e]);
      this.pos[e] = { y: r.top + t, x: r.left + i, w: r.width, h: r.height };
    }
    this.hasArea &&
      ((e = this.pos[0].y),
      (this.areaY = { t: e, b: e + R.Re(this.area).height }));
    var n = this.isX ? "Left" : "Top";
    (this.max = 0), (this.snapPos = [0]);
    for (let e = 1; e < this.liL; e++) {
      var a,
        s = e - 1;
      this.isX
        ? ((a = this.pos[s].w),
          this.centered
            ? (this.max += 0.5 * a + 0.5 * this.pos[e].w)
            : (this.max += a))
        : (this.max += this.pos[s].h),
        (this.max += R.CS(this.li[e], "margin" + n)),
        (this.snapPos[e] = this.max);
    }
    if (
      ((this.max = R.R(this.max)),
      this.snap && (this._.tar = this.snapPos[this.index]),
      this.hasGl)
    ) {
      var o = this.isX ? "w" : "h";
      this.snapGl = [0];
      for (let e = 1; e < this.liL; e++)
        this.snapGl[e] = this.snapPos[e] - 0.5 * this.pos[e][o];
    }
    this.sUpAll(this._.tar), this.dom();
  }
  snapUp() {
    let t = 0,
      i = Math.abs(this._.tar - this.snapPos[0]);
    for (let e = 0; e < this.liL; e++) {
      var r = Math.abs(this._.tar - this.snapPos[e]);
      r < i && ((i = r), (t = e));
    }
    (this.index = t),
      (this._.tar = this.snapPos[t]),
      this.hasOver || (this.hasFx && this.fx({ a: "show", index: this.index }));
  }
  vFn(t, i) {
    if (!this.isDown) {
      let e = !0;
      var r;
      this.hasArea &&
        ((r = i.clientY + this.sd._()),
        (e = r >= this.areaY.t && r <= this.areaY.b)),
        this.scroll && this.v.multiAxe(e),
        e &&
          (_A.sv || R.PD(i),
          this.hasOver && (this.overTimer.run(), (this.overOn = !1)),
          this.sUp(this._.tar + t),
          this.snap) &&
          this._.tar > this.min &&
          this._.tar < R.R(this.max) &&
          (this.snapTimer.stop(), this.snapTimer.run());
    }
  }
  sUp(e) {
    var e = this.clamp(e),
      t = this._.tar;
    (this._.tar = e),
      this.snap &&
        !this.hasOver &&
        this.hasFx &&
        R.R(t) !== R.R(e) &&
        this.fx({ a: "hide", index: this.index });
  }
  down(e) {
    let t = !0;
    var i;
    this.hasArea &&
      ((i = e.start.y + this.sd._()),
      (t = i >= this.areaY.t && i <= this.areaY.b)),
      t &&
        ((this.isDown = !0),
        (this.start = e.start[this.axe]),
        (this.tarPrev = this._.tar));
  }
  move(e) {
    this.isDown &&
      e.axe === this.axe &&
      (R.PD(e.e),
      (e = e[this.axe]) > this.prev && this._.tar === this.min
        ? (this.start = e - (this.tarPrev - this.min) / 2)
        : e < this.prev &&
          this._.tar === this.max &&
          (this.start = e - (this.tarPrev - this.max) / 2),
      (e = 2 * -((this.prev = e) - this.start) + this.tarPrev),
      this.sUp(e));
  }
  up(e) {
    if (this.isDown) {
      this.isDown = !1;
      var n = e.drag,
        a = this.sd._();
      let t = e.x,
        i = e.y,
        r = (this.isX ? ((t += this._.cur), (i += a)) : (i += this._.cur), -1);
      for (let e = 0; e < this.liL; e++) {
        var s = this.pos[e],
          o = t >= s.x && t <= s.x + s.w,
          s = i >= s.y && i <= s.y + s.h;
        if (o && s) {
          r = e;
          break;
        }
      }
      this.snap && n && this.snapUp(),
        !this.hasLink || n || (-1 !== r && this.link[r].click()),
        this.clickSnap &&
          !n &&
          -1 !== r &&
          ((e = this.index), (this.index = r) !== e) &&
          ((this._.tar = this.snapPos[r]),
          this.hasOver ||
            (this.hasFx &&
              (this.fx({ a: "hide", index: e }),
              this.fx({ a: "show", index: r }))));
    }
  }
  loop() {
    if (this.hasGl) {
      let t = -1;
      if (this.hasOver && this.overOn) {
        var e = _A.e.c._,
          r = e[0],
          n = e[1] + this._.cur;
        for (let e = 0; e < this.liL; e++) {
          var a = this.pos[e],
            s = r >= a.x && r <= a.x + a.w,
            a = a.y <= n && n <= a.y + a.h;
          if (s && a) {
            t = e;
            break;
          }
        }
        this.overIndex !== t &&
          (-1 !== t && R.CL.a(this.li[t].children[0], "v"),
          -1 !== this.overIndex &&
            R.CL.r(this.li[this.overIndex].children[0], "v"),
          (this.overIndex = t));
      }
      let i = 0;
      if (-1 !== t) i = t;
      else
        for (let e = this.liMax; -1 < e; e--)
          if (this._.tar >= this.snapGl[e]) {
            i = e;
            break;
          }
      i !== this.glIndex &&
        (this.gl({ indexNew: i, indexOld: this.glIndex }),
        (this.glIndex = i),
        this.hasOver) &&
        this.glTimer.run();
    }
    R.Une(this._.cur, this._.tar, 3) &&
      ((this._.cur = R.Damp(this._.cur, this._.tar, 0.09)), this.dom());
  }
  dom() {
    let t = 0,
      i = 0;
    this.isX ? (t = -R.R(this._.cur)) : (i = -R.R(this._.cur));
    for (let e = 0; e < this.liL; e++) R.T(this.li[e], t, i, "px");
  }
  sUpAll(e) {
    e = this.clamp(e);
    (this._.tar = e), (this._.cur = e), (this.tarPrev = e);
  }
  clamp(e) {
    return R.R(R.Clamp(e, this.min, this.max));
  }
  on() {
    this.scroll && this.v.on();
  }
  off() {
    this.scroll && this.v.off(),
      R.Stop(this.snapTimer),
      R.Def(this.overTimer) && this.overTimer._.stop(),
      R.Def(this.glTimer) && this.glTimer._.stop();
  }
}
class W {
  constructor(e) {
    let i = _A;
    var t = "m" === e;
    this._ = {
      ab: new W_({
        device: e,
        axe: "x",
        scroll: !1,
        centered: !1,
        snap: !0,
        clickSnap: !0,
        fx: (e) => {
          i.e.ab.lifestyle.fx({ a: e.a, index: e.index, de: 0 }).play();
        },
      }),
      p0: new W_({
        device: e,
        axe: t ? "x" : "y",
        scroll: !0,
        centered: t,
        snap: !0,
        clickSnap: !1,
        link: ".p0-li-a",
        fx: (e) => {
          i.e.p0.info.fx({ a: e.a, index: e.index, de: 0 }).play();
        },
        glTxt: (e) => {
          i.e.p0.info.fx({ a: "hide", index: e.indexOld, de: 0 }).play(),
            i.e.p0.info.fx({ a: "show", index: e.indexNew, de: 0 }).play();
        },
        gl: (e) => {
          var t = i.gl;
          t.uMYUp({ page: "p0", mY: [0, 1], fade: 0, index: e.indexOld }),
            t.uMYUp({ page: "p0", mY: [0, 0], fade: 0, index: e.indexNew }),
            t.shake.off({ index: e.indexOld, page: "p0" }),
            t.shake.on({ index: e.indexNew, page: "p0" });
        },
      }),
    };
  }
  initA() {
    var e,
      t = _A;
    (this.rqd = t.is.ab || t.is.p0),
      this.rqd &&
        ((this.p = t.route.new.page),
        t.is.ab
          ? ((e = (t = R.G.id("ab-lifestyle")).children),
            this._.ab.initA({ area: t, li: e }))
          : this._.p0.initA({ area: document, li: R.G.id("p0-li_").children }));
  }
  resizeA() {
    this.rqd && this._[this.p].resizeA();
  }
  down(e) {
    this.rqd && this._[this.p].down(e);
  }
  move(e) {
    this.rqd && this._[this.p].move(e);
  }
  up(e) {
    this.rqd && this._[this.p].up(e);
  }
  on() {
    this.rqd && this._[this.p].on();
  }
  loop() {
    this.rqd && this._[this.p].loop();
  }
  off() {
    this.rqd && this._[this.p].off();
  }
}
let Fx$3 = class {
  init() {
    var e = _A.e.p(0, "_");
    (this.u = R.G.class("ho-main-u", e)),
      (this.uL = this.u.length),
      (this.i__ = []),
      (this.i_ = []),
      (this.i = []),
      (this.iL = []);
    for (let e = 0; e < 2; e++)
      (this.i__[e] = R.G.id("ho-main-i-" + e)),
        (this.i_[e] = this.i__[e].children[0]),
        (this.i[e] = this.i_[e].children),
        (this.iL[e] = this.i[0].length);
    (this.index = [0, 0]), (this.timer = []), (this.timerDe = 1200);
  }
  show(e) {
    var t = _A;
    let i = t.t.y.show.d;
    var r = t.t.y.show.e;
    let n = e.de,
      a = (e) => {
        this.flicker({ index: 0, de: n + 0.6 * i }),
          this.flicker({ index: 1, de: n + 0.6 * i + 0.5 * this.timerDe });
      },
      s = new R.TL();
    s.from({ el: this.i_[0], p: { a: [101, 0] }, d: i, e: r, de: n }),
      s.from({ el: this.i__[0], p: { y: [40, 0] }, d: i, e: r }),
      s.from({ el: this.i_[1], p: { a: [101, 0] }, d: i, e: r, de: 100 }),
      s.from({ el: this.i__[1], p: { y: [40, 0] }, d: i, e: r });
    for (let e = 0; e < this.uL; e++) {
      var o = 0 === e ? 0 : 100;
      s.from({
        el: this.u[e].children[0],
        p: { x: [-101, 0] },
        d: i,
        e: r,
        de: o,
      });
    }
    return {
      play: (e) => {
        a(), s.play();
      },
    };
  }
  flicker(e) {
    let i = e.index;
    (this.timer[i] = new R.De((e) => {
      var t = this.index[i];
      (this.index[i] += 1),
        this.index[i] === this.iL[i] && (this.index[i] = 0),
        R.O(this.i[i][t], 0),
        R.O(this.i[i][this.index[i]], 1),
        this.flicker({ index: i, de: this.timerDe });
    }, e.de)),
      this.timer[i].run();
  }
  off() {
    for (let e = 0; e < 2; e++) R.Stop(this.timer[e]);
  }
};
class Ho {
  constructor() {
    this.fx = new Fx$3();
  }
  init() {
    (this.rqd = _A.is.ho), this.rqd && this.fx.init();
  }
  resize() {
    this.rqd;
  }
  loop() {
    this.rqd && _A.e.s.rqd;
  }
  off() {
    this.rqd && this.fx.off();
  }
}
class Lifestyle {
  initB() {
    (this.sd = new SD()),
      (this.caption = R.G.class("ab-lifestyle-c")),
      (this.l = this.caption.length);
    var e = R.G.id("ab-lifestyle-n").children[0];
    (this.visibleFirst = !1), (this.visible = []);
    for (let e = 0; e < this.l; e++) this.visible[e] = !1;
    this.spCaption = [];
    for (let e = 0; e < this.l; e++)
      this.spCaption[e] = new SL({ el: this.caption[e] });
    (this.fxA = []),
      (this.visibleNum = !1),
      (this.num = new An({ ch: 0, el: e, p: [["y", 110, -110]], de: 0.03 })),
      this.resizeB();
  }
  initA() {
    this.resizeA();
  }
  resizeB() {
    for (let e = 0; e < this.l; e++) {
      var t = this.visible[e] ? 0 : -101;
      this.spCaption[e].resize({
        tag: {
          start:
            '<div class="y_"><div class="y" style="transform: translate3d(0,' +
            t +
            '%,0);">',
          end: "</div></div>",
        },
      }),
        (this.fxA[e] = new An({
          ch: 0,
          el: R.G.class("y", this.caption[e]),
          p: [["y", 110, -110]],
          de: 0.03,
        })),
        this.visible[e] && this.fxA[e].m({ a: "show", d: 0 }).play();
    }
  }
  resizeA() {
    var e = this.sd._(),
      e = R.Re(this.caption[0]).top + e;
    this.limit = e - _A.win.h;
  }
  fx(e) {
    let t = e.index;
    var i = e.a;
    let r = "show" === i;
    if (this.visible[t] === r) return { play: (e) => {} };
    var n = _A,
      a = r ? n.t.y.show.d : 1e3,
      n = r ? n.t.y.show.e : "o6";
    let s = this.fxA[t].m({ a: i, d: a, e: n, de: e.de }),
      o;
    return (
      this.visibleNum && (o = this.num.m({ a: "hide", d: 0 })),
      {
        play: (e) => {
          (this.visible[t] = r),
            s.play(),
            this.visibleNum && ((this.visibleNum = !1), o.play());
        },
      }
    );
  }
  loop() {
    var e;
    this.visibleFirst ||
      (this.sd._() > this.limit &&
        ((e = _A.t.y.show),
        (this.visibleFirst = !0),
        (this.visible[0] = !0),
        (this.visibleNum = !0),
        this.fxA[0].m({ a: "show", d: e.d, e: e.e, de: 0 }).play(),
        this.num.m({ a: "show", d: 400 }).play()));
  }
}
class Logo {
  constructor(e) {
    this.isD = "d" === e;
  }
  initA() {
    (this.sd = new SD()),
      (this.playing = !1),
      (this.finished = !0),
      (this.isOff = !1),
      (this.logo = R.G.id("ab-logo")),
      (this.li = this.logo.children),
      (this.url = _A.data.abL),
      (this.logoL = this.url.length),
      (this.col = this.isD ? 8 : 6),
      (this.row = this.isD ? 4 : 5),
      (this.liMax = this.col * this.row - 1),
      (this.index = 0),
      this.resizeA();
  }
  resizeA() {
    var e = this.sd._(),
      t = R.Re(this.logo),
      e = t.top + e;
    this.range = { top: e - _A.win.h, bottom: e + t.height };
  }
  loop() {
    var e;
    this.isOff ||
      ((e = this.sd._()) > this.range.top && e < this.range.bottom
        ? this.playing || ((this.playing = !0), this.finished && this.fx0())
        : this.playing && (this.playing = !1));
  }
  fx0() {
    this.isOff ||
      ((this.finished = !1),
      (this.index += 1),
      this.index >= this.logoL && (this.index -= this.logoL),
      this.fx1());
  }
  fx1() {
    if (!this.isOff)
      for (let n = 0; n < this.row; n++)
        for (let r = 0; r < this.col; r++)
          new R.De((e) => {
            var t = r + this.col * n,
              i = (this.index + t) % this.logoL;
            (this.li[t].children[0].src = this.url[i]),
              t === this.liMax &&
                ((this.finished = !0), this.playing) &&
                this.fx0();
          }, 720 + 120 * r + 360 * n).run();
  }
  off() {
    this.isOff = !0;
  }
}
class Ab {
  constructor(e) {
    (this.lifestyle = new Lifestyle()), (this.logo = new Logo(e));
  }
  initB() {
    (this.rqd = _A.is.ab), this.rqd && this.lifestyle.initB();
  }
  initA() {
    this.rqd && (this.lifestyle.initA(), this.logo.initA());
  }
  resizeB() {
    this.rqd && this.lifestyle.resizeB();
  }
  resizeA() {
    this.rqd && (this.lifestyle.resizeA(), this.logo.resizeA());
  }
  loop() {
    this.rqd && (this.lifestyle.loop(), this.logo.loop());
  }
  off() {
    this.rqd && this.logo.off();
  }
}
class MobilePosition {
  initB() {
    (this.li = R.G.id("p0-li_").children),
      (this.liL = this.li.length),
      this.resizeB();
  }
  resizeB() {
    var t = _A.win.w;
    let i = 0;
    for (let e = 0; e < this.liL; e++) {
      var r = R.Re(this.li[e]).width;
      0 === e && (i += 0.5 * (t - r)),
        (this.li[e].style.left = i + "px"),
        (i += r);
    }
  }
}
class Info {
  initB() {
    (this.left = R.G.class("p0-info-l")),
      (this.right = R.G.class("p0-info-r")),
      (this.l = this.left.length),
      (this.visible = []);
    for (let e = 0; e < this.l; e++) this.visible[e] = !1;
    var t = R.G.class("p0-info-l-d");
    this.slDesc = [];
    for (let e = 0; e < this.l; e++) this.slDesc[e] = new SL({ el: t[e] });
    this.slData = [];
    for (let e = 0; e < this.l; e++)
      this.slData[e] = new SL({ el: this.right[e] });
    (this.fxL = []), (this.fxR = []), this.resizeB();
  }
  resizeB() {
    for (let e = 0; e < this.l; e++) {
      var t = {
        start:
          '<div class="y_"><div class="y" style="transform: translate3d(0,' +
          (this.visible[e] ? 0 : -101) +
          '%,0);">',
        end: "</div></div>",
      };
      this.slDesc[e].resize({ tag: t }),
        this.slData[e].resize({ tag: t }),
        (this.fxL[e] = new An({
          ch: 0,
          el: R.G.class("y", this.left[e]),
          p: [["y", 110, -110]],
          de: 0.03,
        })),
        (this.fxR[e] = new An({
          ch: 0,
          el: R.G.class("y", this.right[e]),
          p: [["y", 110, -110]],
          de: 0.03,
        })),
        this.visible[e] &&
          (this.fxL[e].m({ a: "show", d: 0 }).play(),
          this.fxR[e].m({ a: "show", d: 0 }).play());
    }
  }
  fx(e) {
    let t = e.index;
    var i = e.a;
    let r = "show" === i;
    if (this.visible[t] === r) return { play: (e) => {} };
    var n = _A,
      a = r ? n.t.y.show.d : 1e3,
      n = r ? n.t.y.show.e : "o6",
      e = e.de,
      s = r ? 100 : 0;
    let o = this.fxL[t].m({ a: i, d: a, e: n, de: e }),
      l = this.fxR[t].m({ a: i, d: a, e: n, de: e + s });
    return {
      play: (e) => {
        (this.visible[t] = r), o.play(), l.play();
      },
    };
  }
}
let PE$1 = class {
  initB() {
    (this._ = R.G.class("_")[1]), R.PE.all(this._);
  }
  off() {
    R.PE.none(this._);
  }
};
class P0 {
  constructor(e) {
    (this.isM = "m" === e),
      this.isM && (this.mobilePosition = new MobilePosition()),
      (this.info = new Info()),
      (this.pe = new PE$1());
  }
  initB() {
    (this.rqd = _A.is.p0),
      this.rqd &&
        (this.isM && this.mobilePosition.initB(),
        this.info.initB(),
        this.pe.initB());
  }
  resizeB() {
    this.rqd &&
      (this.isM && this.mobilePosition.resizeB(), this.info.resizeB());
  }
  off() {
    this.rqd && this.pe.off();
  }
}
class Ai {
  constructor() {
    R.BM(this, ["fn"]);
  }
  init() {
    var e = _A.e.p(0, "_");
    (this.img = R.G.class("a-l-i", e)),
      (this.imgL = this.img.length),
      (this.rqd = 0 < this.imgL),
      this.rqd && ((this.x = -1), (this.first = !0));
  }
  loop() {
    if (this.rqd) {
      var e = _A.e.c._[0];
      if (
        (this.first && -1 !== e && ((this.first = !1), (this.x = e)),
        (this.x = R.Damp(this.x, e, 0.09)),
        this.over)
      )
        for (let e = 0; e < this.imgL; e++)
          R.T(this.img[e], R.R(this.x), 0, "px");
    }
  }
  fn(e) {
    this.over = "mouseenter" === e.type;
  }
  l(t) {
    var i = ["enter", "leave"];
    for (let e = 0; e < 2; e++) R.L(".a-l", t, "mouse" + i[e], this.fn);
  }
  on() {
    this.rqd && this.l("a");
  }
  off() {
    this.rqd && this.l("r");
  }
}
class S {
  constructor() {
    (this.rqd = !1),
      (this.min = 0),
      R.BM(this, ["vFn"]),
      (this.v = new V({ axe: "y", cb: this.vFn, k: !0 }));
  }
  intro() {
    var e = _A,
      e = ((this._ = {}), e.config.routes),
      t = Object.keys(e),
      i = t.length;
    for (let e = 0; e < i; e++) {
      var r = t[e];
      this._[r] = { cur: 0, tar: 0 };
    }
  }
  init() {
    var e = _A;
    (this.isP0 = e.is.p0),
      this.isP0 ||
        ((this.url = e.route.new.url), this.sUpAll(0), this.resize());
  }
  resize() {
    if (!this.isP0) {
      var e = _A,
        i = e.is,
        n = e.win.h;
      let r;
      if (i.p2) {
        var a = e.e.p2.slider.index.small,
          s = (r = R.G.class("p2-small_", e.e.p(0))[0].children).length;
        let t = 0,
          i = 0;
        for (let e = 0; e < s; e++)
          e === a && (i = t), (t += R.Re(r[e]).height);
        var o = R.CS(r[0], "paddingTop"),
          l = R.CS(r[a], "paddingTop");
        (this._[this.url].tar = i + l - o), (this.max = Math.max(t - n, 0));
      } else if (i.cs) {
        var h = R.G.class("cs-media_", e.e.p(0)),
          c = h.length;
        let t = 0;
        for (let e = 0; e < c; e++)
          R.CL.c(h[e], "n") || R.CL.c(h[e], "gpe") || (t += R.Re(h[e]).height);
        (t -= n), (t = Math.max(t, 0));
        l = Math.max(R.Re(R.G.class("cs-txt", e.e.p(0))[0]).height - n, 0);
        (this.prlx = R.Clamp(l / t, 0.5, 1)), (this.max = Math.max(t, l));
      } else {
        var d = (r = (
          i.c0 ? R.G.id("c0-main") : i.o0 ? R.G.id("o0-list_") : e.e.p(0)
        ).children).length;
        let t = 0;
        for (let e = 0; e < d; e++)
          R.CL.c(r[e], "n") || R.CL.c(r[e], "gpe") || (t += R.Re(r[e]).height);
        this.max = Math.max(t - n, 0);
      }
      (this.max = R.R(this.max)), this.sUpAll(this._[this.url].tar);
    }
  }
  vFn(e) {
    this.sUp(this._[this.url].tar + e);
  }
  sUp(e) {
    this._[this.url].tar = this.clamp(e);
  }
  loop() {
    var e, t;
    this.isP0 ||
      ((e = this.url),
      (this.rqd = !1),
      (t = R.Une(this._[e].cur, this._[e].tar, 3)) &&
        (this._[e].cur = R.Damp(this._[e].cur, this._[e].tar, 0.09)),
      t && !this.rqd && (this.rqd = !0));
  }
  sUpAll(e) {
    var e = this.clamp(e),
      t = this._[this.url];
    (t.tar = e), (t.cur = e);
  }
  __(e) {
    return this._[e].cur;
  }
  clamp(e) {
    return R.R(R.Clamp(e, this.min, this.max));
  }
  on() {
    this.isP0 || this.v.on();
  }
  off() {
    this.isP0 || this.v.off();
  }
}
let Fx$2 = class {
  init() {
    var e = _A,
      t = e.is,
      i = t.p0 ? 1 : 0,
      e = e.e.p(i, "_");
    (this.dropList = R.G.class("n-d-l", e)[0]),
      (this.hasCur = t.p0 || t.c0 || t.o0),
      (this.hasDrop = t.p1 || t.c1 || t.o1),
      (this.hasLeft = !t.p2),
      (this.hasRight = t.ho || t.cs || t.j1),
      (this.isCS = t.cs),
      (this.isJ1 = t.j1),
      this.hasLeft && (this.left = R.G.class("n-l", e)[0].children[0]),
      this.hasRight && (this.right = R.G.class("n-r", e)[0].children[0]),
      (this.flex = R.G.class("n-f", e)[0]),
      this.hasCur &&
        ((i = R.G.class("n-c", e)[0]),
        (this.curY = R.G.class("y", i)[0]),
        (this.curL = R.G.class("n-c-l", i)[0])),
      this.isCS &&
        ((t = R.G.class("n-cs-1", e)[0]),
        (this.cs1Y = R.G.class("y", t)),
        (this.cs1L = R.G.class("n-cs-1-l", t)[0])),
      this.isJ1 &&
        ((i = R.G.class("n-j1", e)[0]),
        (this.j1Y = R.G.class("y", i)),
        (this.j1L = R.G.class("n-j1-l", i)[0])),
      this.hasDrop &&
        ((t = R.G.class("n-d", e)[0]),
        (this.dropY = R.G.class("y", t)),
        (this.dropYL = this.dropY.length));
  }
  show(e) {
    var t = _A,
      i = e.de,
      r = t.t.y.show.d;
    let n;
    this.hasLeft &&
      (n = new R.M({
        el: this.left,
        p: { y: [110, 0] },
        d: r,
        e: "o6",
        de: i + 200,
      }));
    let a, s;
    if (this.hasDrop) {
      a = new R.TL();
      for (let e = 0; e < this.dropYL; e++) {
        var o = 0 === e ? i + 300 : 40;
        a.from({ el: this.dropY[e], p: { y: [110, 0] }, d: r, e: "o6", de: o });
      }
      s = new R.De((e) => {
        R.PE.all(this.dropList);
      }, i + 800);
    }
    let l;
    this.hasCur &&
      ((l = new R.TL()).from({
        el: this.curY,
        p: { y: [110, 0] },
        d: r,
        e: "o6",
        de: i + 300,
      }),
      l.from({ el: this.curL, p: { y: [130, 0] }, d: r, e: "o6" }),
      l.from({
        el: this.curL.children[0],
        p: { scaleX: [0, 1] },
        d: r,
        e: "o6",
        r: 6,
      }));
    let h;
    this.isCS &&
      ((h = new R.TL()).from({
        el: this.cs1Y[0],
        p: { y: [110, 0] },
        d: r,
        e: "o6",
        de: i + 400,
      }),
      h.from({ el: this.cs1L, p: { y: [130, 0] }, d: r, e: "o6" }),
      h.from({
        el: this.cs1L.children[0],
        p: { scaleX: [0, 1] },
        d: r,
        e: "o6",
        r: 6,
      }),
      h.from({ el: this.cs1Y[1], p: { y: [110, 0] }, d: r, e: "o6", de: 100 }));
    let c;
    this.isJ1 &&
      ((c = new R.TL()).from({
        el: this.j1Y[0],
        p: { y: [110, 0] },
        d: r,
        e: "o6",
        de: i + 400,
      }),
      c.from({ el: this.j1L, p: { y: [130, 0] }, d: r, e: "o6" }),
      c.from({
        el: this.j1L.children[0],
        p: { scaleX: [0, 1] },
        d: r,
        e: "o6",
        r: 6,
      }),
      c.from({ el: this.j1Y[1], p: { y: [110, 0] }, d: r, e: "o6", de: 100 }));
    var d = t.is.ho || t.is.ab || t.is.cs ? 300 : 400,
      u = R.G.class("y", this.flex),
      p = u.length;
    let m = new R.TL();
    for (let e = 0; e < p; e++) {
      var f = 0 === e ? i + d : 40;
      m.from({ el: u[e], p: { y: [110, 0] }, d: r, e: "o6", de: f });
    }
    let g;
    return (
      this.hasRight &&
        (g = new R.M({
          el: this.right,
          p: { y: [110, 0] },
          d: r,
          e: "o6",
          de: i + 400,
        })),
      {
        play: (e) => {
          this.hasLeft && n.play(),
            this.hasDrop && (s.run(), a.play()),
            this.hasCur && l.play(),
            this.isCS && h.play(),
            this.isJ1 && c.play(),
            m.play(),
            this.hasRight && g.play();
        },
      }
    );
  }
};
class Nav {
  constructor() {
    this.fx = new Fx$2();
  }
  init() {
    this.fx.init();
  }
}
class Slider {
  constructor(e) {
    (this.isD = "d" === e), R.BM(this, ["fn", "sound"]);
  }
  initB() {
    var e = _A,
      t = e.e.p(0, "_");
    (this.small = R.G.class("p2-small", t)),
      (this.large = R.G.class("p2-large", t)),
      (this.largeL = this.large.length),
      (this.playing = []),
      (this.pausing = []),
      (this.muted = []);
    for (let e = 0; e < this.largeL; e++)
      (this.playing[e] = !1), (this.pausing[e] = !1), (this.muted[e] = !0);
    var i = R.G.class("p2-txt", t)[0].children;
    (this.txtLiL = i.length),
      (this.topT = []),
      (this.topP = []),
      (this.topVisible = []);
    for (let e = 0; e < this.txtLiL; e++)
      (this.topVisible[e] = !1),
        (this.topT[e] = new SL({ el: R.G.class("p2-txt-t-t", i[e])[0] })),
        (this.topP[e] = new SL({ el: R.G.class("t-s", i[e])[0] }));
    (this.txtAT = []), (this.bottomVisible = []), (this.bottom = []);
    for (let e = 0; e < this.txtLiL; e++) {
      this.bottomVisible[e] = !1;
      var r = R.G.class("p2-txt-a", i[e])[0];
      R.Def(r)
        ? ((this.txtAT[e] = r),
          (this.bottom[e] = new An({ ch: 2, el: r, p: [["y", 110, -110]] })))
        : ((this.txtAT[e] = void 0), (this.bottom[e] = void 0));
    }
    (this.index = { small: 0, txt: 0 }),
      e.route.old.url &&
        "back" !== e.target &&
        ((this.index.small = +e.target.dataset.i),
        (this.index.txt = +this.small[this.index.small].dataset.i)),
      R.CL.a(this.small[this.index.small], "on"),
      R.Def(this.txtAT[this.index.txt]) && R.PE.all(this.txtAT[this.index.txt]);
  }
  initA() {
    this.resizeA({ from: "init" });
  }
  resizeA(e) {
    var t = _A;
    if ("init" === e.from) {
      var i = this.isD ? t.e.i._ : t.e.p2.scroll.i,
        r = i.length;
      this.smallV = [];
      for (let e = (this.smallVL = 0); e < r; e++)
        i[e].isOut ||
          (this.smallV.push(e), R.O(this.small[e], 0), this.smallVL++);
    }
    (this.topTA = []), (this.topPA = []);
    for (let e = 0; e < this.txtLiL; e++) {
      var n = {
        tag: {
          start:
            '<span class="y_"><span class="y" style="transform: translate3d(0,' +
            (this.topVisible[e] ? 0 : 110) +
            '%,0);">',
          end: "</span></span>",
        },
      };
      this.topT[e].resize(n),
        this.topP[e].resize(n),
        (this.topTA[e] = new An({
          ch: 2,
          el: this.topT[e].el,
          p: [["y", 110, -110]],
          de: 0.06,
        })),
        (this.topPA[e] = new An({
          ch: 2,
          el: this.topP[e].el,
          p: [["y", 110, -110]],
          de: 0.035,
        })),
        this.topVisible[e] &&
          (this.topTA[e].m({ a: "show", d: 0, de: 0 }).play(),
          this.topPA[e].m({ a: "show", d: 0, de: 0 }).play());
    }
  }
  show(e) {
    var t = _A,
      i = t.t.tr.d,
      r = t.t.y.show.d,
      n = t.t.y.show.e,
      a = t.t.o.show.d,
      s = t.t.o.show.e;
    let o = this.index.txt;
    var l = e.de;
    let h = new R.TL();
    for (let e = 0; e < this.smallVL; e++) {
      var c = 0 === e ? l : 50,
        d = this.smallV[e];
      h.from({ el: this.small[d], p: { o: [0, 1] }, d: a, e: s, de: c });
    }
    let u = this.topTA[o].m({ a: "show", d: r, e: n, de: l + 100 }),
      p = this.topPA[o].m({ a: "show", d: r, e: n, de: l + 200 }),
      m = { play: (e) => {} };
    return (
      R.Def(this.bottom[o]) &&
        (m = this.bottom[o].m({ a: "show", d: r, e: n, de: l + 300 })),
      (this.deMediaPlay = new R.De((e) => {
        this.media({ a: "play", index: this.index.small, from: "show" });
      }, i)),
      {
        play: (e) => {
          this.deMediaPlay.run(),
            (this.bottomVisible[o] = !0),
            (this.topVisible[o] = !0),
            h.play(),
            u.play(),
            p.play(),
            m.play();
        },
      }
    );
  }
  fn(e) {
    var t,
      i,
      r = _A.t.y,
      e = R.Index.class(e.target, "p2-small"),
      n = this.index.small,
      a = +this.small[e].dataset.i,
      s = +this.index.txt;
    a != s &&
      ((this.topVisible[s] = !1),
      (t = this.topTA[s].m({ a: "hide", d: 1e3, e: r.show.e, de: 0 })),
      (i = this.topPA[s].m({ a: "hide", d: 1e3, e: r.show.e, de: 0 })),
      t.play(),
      i.play(),
      (this.topVisible[a] = !0),
      (t = this.topTA[a].m({ a: "show", d: r.show.d, e: r.show.e, de: 100 })),
      (i = this.topPA[a].m({ a: "show", d: r.show.d, e: r.show.e, de: 100 })),
      t.play(),
      i.play(),
      R.Def(this.bottom[s]) &&
        ((this.bottomVisible[s] = !1),
        R.PE.none(this.txtAT[s]),
        this.bottom[s].m({ a: "hide", d: 1e3, e: r.show.e, de: 0 }).play()),
      R.Def(this.bottom[a]) &&
        ((this.bottomVisible[a] = !0),
        R.PE.all(this.txtAT[a]),
        this.bottom[a]
          .m({ a: "show", d: r.show.d, e: r.show.e, de: 200 })
          .play()),
      (this.index.txt = a)),
      e !== n &&
        (R.CL.r(this.small[n], "on"),
        R.CL.a(this.small[e], "on"),
        this.media({ a: "pause", index: n, from: "fn" }),
        this.media({ a: "play", index: e, from: "fn" }),
        (this.index.small = e));
  }
  media(e) {
    let t = e.index,
      i = this.large[t].children[0],
      r = i.children[0],
      n = R.G.class("p2-large-media", i)[0];
    var a = "play" === e.a;
    let s = a ? "a" : "r";
    var o = a ? "all" : "none",
      l = "VIDEO" === n.tagName,
      h =
        ((this.large[t].style.display = a ? "flex" : "none"),
        R.G.class("p2-large-cta", this.large[t]));
    if (
      (0 < h.length && R.PE[o](h[0]),
      "show" === e.from
        ? new R.De((e) => {
            R.CL[s](i, "first");
          }, 10).run()
        : (a || (R.CL.c(i, "first") && R.CL.r(i, "first")), R.CL[s](i, "fx")),
      l)
    )
      a
        ? ((this.pausing[t] = !1),
          (this.vid = new Load$2({
            dom: n,
            cb: (e) => {
              n.play().then((e) => {
                (this.playing[t] = !0),
                  R.CL[s](r, "fx"),
                  this.pausing[t] && ((this.playing[t] = !1), n.pause());
              });
            },
          })))
        : ((this.pausing[t] = !0),
          R.Def(this.vid) && this.vid.off(),
          this.playing[t] && ((this.playing[t] = !1), n.pause()));
    else if (a) {
      let t = n.dataset.src;
      R.Def(t) &&
        (delete n.dataset.src,
        ((o = new Image()).crossOrigin = "anonymous"),
        (o.src = t),
        o.decode().then((e) => {
          (n.src = t), R.CL.a(r, "fx");
        }));
    }
  }
  sound(e) {
    var e = R.Index.class(e.target.parentNode.parentNode, "p2-large"),
      t = R.G.class("p2-large-media", this.large[e])[0],
      i = R.G.class("p2-large-sound", this.large[e])[0];
    this.playing[e] &&
      (this.muted[e]
        ? ((this.muted[e] = !1), R.CL.a(i, "fx"), (t.muted = !1))
        : ((this.muted[e] = !0), R.CL.r(i, "fx"), (t.muted = !0)));
  }
  l(e) {
    R.L(".p2-large-cta", e, "click", this.sound),
      R.L(".p2-small", e, "click", this.fn);
  }
  on() {
    this.l("a");
  }
  off() {
    R.Def(this.vid) && this.vid.off(), R.Stop(this.deMediaPlay), this.l("r");
  }
}
class P2 {
  constructor() {
    this.slider = new Slider("d");
  }
  initB() {
    (this.rqd = _A.is.p2), this.rqd && this.slider.initB();
  }
  initA() {
    this.rqd && this.slider.initA();
  }
  resizeA() {
    this.rqd && this.slider.resizeA({ from: "resize" });
  }
  on() {
    this.rqd && this.slider.on();
  }
  loop() {
    this.rqd;
  }
  off() {
    this.rqd && this.slider.off();
  }
}
class PE {
  init() {
    var e = _A.e.p(0, "_");
    (this.title = R.G.class("c0-main-l-t", e)),
      (this.titleL = this.title.length);
  }
  all() {
    for (let e = 0; e < this.titleL; e++) R.PE.all(this.title[e]);
  }
}
let SideS$1 = class {
  init() {
    (this.sd = new SD()), (this.side = R.G.id("c0-hero")), this.resize();
  }
  resize() {
    var e = _A;
    (this.max = Math.max(R.Re(this.side).height - e.win.h, 0)),
      (this.maxMain = e.e.s.max),
      this.loop();
  }
  loop() {
    var e = this.sd._(),
      e = R.Remap(0, this.maxMain, 0, this.max, e);
    R.T(this.side, 0, R.R(-e), "px");
  }
};
class Over {
  constructor() {
    R.BM(this, ["fn"]);
  }
  init() {
    var e = _A.e.p(0, "_");
    this.img = R.G.class("c0-over-i", e);
  }
  fn(e) {
    var t = R.Index.class(e.target, "c0-main-l-t"),
      e = "mouseenter" === e.type ? "a" : "r";
    R.CL[e](this.img[t], "fx");
  }
  l(t) {
    var i = ["enter", "leave"];
    for (let e = 0; e < 2; e++) R.L(".c0-main-l-t", t, "mouse" + i[e], this.fn);
  }
  on() {
    this.l("a");
  }
  off() {
    this.l("r");
  }
}
class C0 {
  constructor() {
    (this.pe = new PE()),
      (this.sideS = new SideS$1()),
      (this.over = new Over());
  }
  init() {
    (this.rqd = _A.is.c0),
      this.rqd && (this.pe.init(), this.sideS.init(), this.over.init());
  }
  resize() {
    this.rqd && this.sideS.resize();
  }
  on() {
    this.rqd && this.over.on();
  }
  loop() {
    this.rqd && _A.e.s.rqd && this.sideS.loop();
  }
  off() {
    this.rqd && this.over.off();
  }
}
class ModuleA {
  initB() {
    var e = _A.e.p(0);
    (this.txt = R.G.class("c1-module-a-t", e)),
      (this.txtL = this.txt.length),
      (this.caption = R.G.class("c1-module-a-c", e)),
      (this.captionL = this.caption.length),
      this.resizeB();
  }
  resizeB() {
    var t = [],
      i = [],
      r = {};
    let n = 0,
      a = 0;
    for (let e = 0; e < this.txtL; e++) {
      this.txt[e].style.height = "";
      var s = R.Re(this.txt[e]),
        o = R.R(s.top, 0),
        s = s.height;
      0 === e ? (a = o) : o > a && ((a = o), n++),
        (i[e] = n),
        R.Und(t[n]) && (t[n] = 0),
        s > t[n] && ((t[n] = s), (r[o] = s));
    }
    for (let e = 0; e < this.captionL; e++) {
      var l = R.R(R.Re(this.caption[e]).top, 0);
      this.caption[e].style.marginTop = r[l] + "px";
    }
    for (let e = 0; e < this.txtL; e++) {
      var h = i[e];
      this.txt[e].style.height = t[h] + "px";
    }
  }
}
class C1 {
  constructor() {
    this.mA = new ModuleA();
  }
  initB() {
    (this.rqd = _A.is.c1), this.rqd && this.mA.initB();
  }
  resizeB() {
    this.rqd && this.mA.resizeB();
  }
}
class Caption {
  initB() {
    var e = _A.e.p(0);
    (this.txt = R.G.class("o1-module-m-c", e)),
      (this.txtL = this.txt.length),
      this.resizeB();
  }
  resizeB() {
    var t = [],
      i = [];
    let r = 0,
      n = 0;
    for (let e = 0; e < this.txtL; e++) {
      this.txt[e].style.height = "";
      var a = R.Re(this.txt[e]),
        s = R.R(a.top, 0),
        a = a.height;
      0 === e ? (n = s) : s > n && ((n = s), r++),
        (i[e] = r),
        R.Und(t[r]) && (t[r] = 0),
        a > t[r] && (t[r] = a);
    }
    for (let e = 0; e < this.txtL; e++) {
      var o = i[e];
      this.txt[e].style.height = t[o] + "px";
    }
  }
}
class O1 {
  constructor() {
    this.caption = new Caption();
  }
  initB() {
    (this.rqd = _A.is.o1), this.rqd && this.caption.initB();
  }
  resizeB() {
    this.rqd && this.caption.resizeB();
  }
}
class SideS {
  init() {
    var e = _A.e.p(0, "_");
    (this.sd = new SD()), (this.txt = R.G.class("cs-txt", e)[0]), this.resize();
  }
  resize() {
    var e = _A.e.s;
    this.prlx = e.prlx;
  }
  loop() {
    var e = this.sd._() * this.prlx;
    R.T(this.txt, 0, R.R(-e), "px");
  }
}
class Cs {
  constructor() {
    this.sideS = new SideS();
  }
  init() {
    (this.rqd = _A.is.cs), this.rqd && this.sideS.init();
  }
  resize() {
    this.rqd && this.sideS.resize();
  }
  loop() {
    this.rqd && _A.e.s.rqd && this.sideS.loop();
  }
}
class E {
  constructor() {
    R.BM(this, ["resize", "loop"]),
      (this.p = Page$1),
      (this.raf = new R.Raf(this.loop)),
      (this.s = new S()),
      (this.z = new Z()),
      (this.nav = new Nav()),
      (this.ho = new Ho()),
      (this.p0 = new P0("d")),
      (this.p2 = new P2()),
      (this.c0 = new C0()),
      (this.c1 = new C1()),
      (this.o1 = new O1()),
      (this.ab = new Ab("d")),
      (this.cs = new Cs()),
      (this.k = new K("d")),
      (this.q = new Q()),
      (this.x = new X()),
      (this.w = new W("d")),
      (this.ai = new Ai()),
      (this.hold = new Hold("d")),
      (this.c = new C({
        down: (e) => {
          this.hold.down(e), this.w.down(e);
        },
        move: (e) => {
          this.w.move(e);
        },
        up: (e) => {
          this.hold.up(e), this.w.up(e);
        },
      }));
  }
  intro() {
    this.s.intro(), this.hold.intro();
  }
  init() {
    this.z.initB({ de: 0.5 * _A.t.tr.d }),
      this.p0.initB(),
      this.p2.initB(),
      this.c1.initB(),
      this.o1.initB(),
      this.ab.initB(),
      this.x.initB(),
      this.s.init(),
      (this.i = new I()),
      this.z.initA(),
      this.nav.init(),
      this.ho.init(),
      this.p2.initA(),
      this.c0.init(),
      this.ab.initA(),
      this.cs.init(),
      this.ai.init(),
      this.w.initA(),
      this.k.initA(),
      this.q.init(),
      this.x.initA(),
      this.hold.initA();
  }
  resize() {
    this.z.resizeB(),
      this.p0.resizeB(),
      this.c1.resizeB(),
      this.o1.resizeB(),
      this.ab.resizeB(),
      this.x.resizeB(),
      this.s.resize(),
      this.i.resize(),
      this.z.resizeA(),
      this.c0.resize(),
      this.ab.resizeA(),
      this.cs.resize(),
      this.p2.resizeA(),
      this.k.resizeA(),
      this.x.resizeA(),
      this.w.resizeA();
  }
  run() {
    new R.RO(this.resize).on(), this.raf.run(), this.c.run();
  }
  on() {
    this.s.on(),
      this.p2.on(),
      this.c0.on(),
      this.q.on(),
      this.x.on(),
      this.ai.on(),
      this.w.on();
  }
  loop() {
    var e = _A;
    this.s.loop(),
      this.z.loop(),
      this.cs.loop(),
      this.c0.loop(),
      this.ab.loop(),
      this.x.loop(),
      this.q.loop(),
      this.ai.loop(),
      this.w.loop(),
      e.e.s.rqd && this.i.run();
  }
  off() {
    this.k.off(),
      this.s.off(),
      this.ho.off(),
      this.p0.off(),
      this.p2.off(),
      this.c0.off(),
      this.ab.off(),
      this.q.off(),
      this.x.off(),
      this.ai.off(),
      this.w.off();
  }
}
let Load$1 = class {
  constructor(e) {
    (this.cb = e),
      (this.dom = R.G.id("lo-no").children[0]),
      (this.texL = 0),
      (this.no = 0),
      (this.prevNo = 0);
    (e = _A.config.isLocal),
      (this.hoH = _A.data.hoH),
      (this.hoHL = this.hoH.length),
      e && (this.hoHL = 0),
      (this.texL += this.hoHL),
      R.BM(this, ["loop"]),
      (this.raf = new R.Raf(this.loop)),
      (e = ["ba2n", "bu4n", "bu4i", "bu6n", "ca4n"]);
    (this.texL += e.length),
      new Font({
        name: e,
        inc: (e) => {
          this.no++;
        },
        cb: (e) => {
          this.glLoad();
        },
      }),
      this.raf.run();
  }
  glLoad() {
    _A.gl.load({
      texL: (e) => {
        this.texL += e;
      },
      inc: (e) => {
        this.no++;
      },
      cb: (e) => {
        for (let e = 0; e < this.hoHL; e++) this.img(this.hoH[e]);
      },
    });
  }
  img(e) {
    var t = new Image();
    (t.crossOrigin = "anonymous"),
      (t.src = e),
      t.decode().then((e) => {
        this.no++;
      });
  }
  loop() {
    var e;
    this.texL < 1 ||
      (this.no !== this.prevNo &&
        ((this.prevNo = this.no),
        (e = this.no / this.texL),
        (this.dom.textContent = R.R(R.Lerp(0, 100, e), 0))),
      this.no === this.texL && (this.raf.stop(), this.cb()));
  }
};
class Page {
  constructor(e) {
    let t = _A,
      i = t.e;
    var r = t.config.isLocal,
      e = e.intro;
    let n = t.is;
    var a = t.t.tr.d,
      s = 0.5 * a;
    let o = [],
      l =
        ((e
          ? (o.push(i.nav.fx.show({ de: s })),
            n.ho
              ? o.push(i.ho.fx.show({ de: 800 + s }))
              : n.ab
              ? o.push(i.q.abReel({ de: 400 + s }))
              : n.p0
              ? (o.push(i.hold.introFx({ de: s })),
                o.push(i.p0.info.fx({ a: "show", index: 0, de: 400 + s })))
              : n.p2 && o.push(i.p2.slider.show({ de: 200 + s })),
            (e = r ? 0 : 1200),
            R.Stop(this.kDe),
            (this.kDe = new R.De((e) => {
              i.k.run();
            }, e)),
            this.kDe.run(),
            new R.De(
              (e) => {
                n.c0 && i.c0.pe.all(),
                  i.on(),
                  R.PE.none(R.G.id("lo")),
                  (t.mutating = !1);
              },
              r ? 0 : 1e3
            ))
          : (o.push(i.nav.fx.show({ de: s })),
            n.ho
              ? o.push(i.ho.fx.show({ de: 800 + s }))
              : n.ab
              ? o.push(i.q.abReel({ de: 400 + s }))
              : n.p0
              ? o.push(i.p0.info.fx({ a: "show", index: 0, de: 400 + s }))
              : n.p2 && o.push(i.p2.slider.show({ de: 200 + s })),
            (e = a),
            R.Stop(this.kDe),
            (this.kDe = new R.De((e) => {
              i.k.run();
            }, e)),
            this.kDe.run(),
            new R.De((e) => {
              i.on();
            }, 300).run(),
            new R.De((e) => {
              n.c0 && i.c0.pe.all(), t.page.removeOld(), (t.mutating = !1);
            }, a))
        ).run(),
        o.length);
    return {
      play: (e) => {
        for (let e = 0; e < l; e++) o[e].play();
      },
    };
  }
}
let Fx$1 = class {
    constructor() {
      var e = R.G.id("lo-no").children[0],
        t = new Page({ intro: !0 }),
        i = new R.TL();
      i.from({ el: e, p: { y: [0, -110] }, d: 700, e: "i3" }),
        t.play(),
        i.play(),
        R.O(R.G.id("lo-bg"), 0);
    }
  },
  REVISION = "164",
  CullFaceNone = 0,
  CullFaceBack = 1,
  CullFaceFront = 2,
  PCFShadowMap = 1,
  PCFSoftShadowMap = 2,
  VSMShadowMap = 3,
  FrontSide = 0,
  BackSide = 1,
  DoubleSide = 2,
  NoBlending = 0,
  NormalBlending = 1,
  AdditiveBlending = 2,
  SubtractiveBlending = 3,
  MultiplyBlending = 4,
  CustomBlending = 5,
  AddEquation = 100,
  SubtractEquation = 101,
  ReverseSubtractEquation = 102,
  MinEquation = 103,
  MaxEquation = 104,
  ZeroFactor = 200,
  OneFactor = 201,
  SrcColorFactor = 202,
  OneMinusSrcColorFactor = 203,
  SrcAlphaFactor = 204,
  OneMinusSrcAlphaFactor = 205,
  DstAlphaFactor = 206,
  OneMinusDstAlphaFactor = 207,
  DstColorFactor = 208,
  OneMinusDstColorFactor = 209,
  SrcAlphaSaturateFactor = 210,
  ConstantColorFactor = 211,
  OneMinusConstantColorFactor = 212,
  ConstantAlphaFactor = 213,
  OneMinusConstantAlphaFactor = 214,
  NeverDepth = 0,
  AlwaysDepth = 1,
  LessDepth = 2,
  LessEqualDepth = 3,
  EqualDepth = 4,
  GreaterEqualDepth = 5,
  GreaterDepth = 6,
  NotEqualDepth = 7,
  MultiplyOperation = 0,
  MixOperation = 1,
  AddOperation = 2,
  NoToneMapping = 0,
  LinearToneMapping = 1,
  ReinhardToneMapping = 2,
  CineonToneMapping = 3,
  ACESFilmicToneMapping = 4,
  CustomToneMapping = 5,
  AgXToneMapping = 6,
  NeutralToneMapping = 7,
  AttachedBindMode = "attached",
  DetachedBindMode = "detached",
  UVMapping = 300,
  CubeReflectionMapping = 301,
  CubeRefractionMapping = 302,
  EquirectangularReflectionMapping = 303,
  EquirectangularRefractionMapping = 304,
  CubeUVReflectionMapping = 306,
  RepeatWrapping = 1e3,
  ClampToEdgeWrapping = 1001,
  MirroredRepeatWrapping = 1002,
  NearestFilter = 1003,
  NearestMipmapNearestFilter = 1004,
  NearestMipmapLinearFilter = 1005,
  LinearFilter = 1006,
  LinearMipmapNearestFilter = 1007,
  LinearMipmapLinearFilter = 1008,
  UnsignedByteType = 1009,
  ByteType = 1010,
  ShortType = 1011,
  UnsignedShortType = 1012,
  IntType = 1013,
  UnsignedIntType = 1014,
  FloatType = 1015,
  HalfFloatType = 1016,
  UnsignedShort4444Type = 1017,
  UnsignedShort5551Type = 1018,
  UnsignedInt248Type = 1020,
  UnsignedInt5999Type = 35902,
  AlphaFormat = 1021,
  RGBFormat = 1022,
  RGBAFormat = 1023,
  LuminanceFormat = 1024,
  LuminanceAlphaFormat = 1025,
  DepthFormat = 1026,
  DepthStencilFormat = 1027,
  RedFormat = 1028,
  RedIntegerFormat = 1029,
  RGFormat = 1030,
  RGIntegerFormat = 1031,
  RGBAIntegerFormat = 1033,
  RGB_S3TC_DXT1_Format = 33776,
  RGBA_S3TC_DXT1_Format = 33777,
  RGBA_S3TC_DXT3_Format = 33778,
  RGBA_S3TC_DXT5_Format = 33779,
  RGB_PVRTC_4BPPV1_Format = 35840,
  RGB_PVRTC_2BPPV1_Format = 35841,
  RGBA_PVRTC_4BPPV1_Format = 35842,
  RGBA_PVRTC_2BPPV1_Format = 35843,
  RGB_ETC1_Format = 36196,
  RGB_ETC2_Format = 37492,
  RGBA_ETC2_EAC_Format = 37496,
  RGBA_ASTC_4x4_Format = 37808,
  RGBA_ASTC_5x4_Format = 37809,
  RGBA_ASTC_5x5_Format = 37810,
  RGBA_ASTC_6x5_Format = 37811,
  RGBA_ASTC_6x6_Format = 37812,
  RGBA_ASTC_8x5_Format = 37813,
  RGBA_ASTC_8x6_Format = 37814,
  RGBA_ASTC_8x8_Format = 37815,
  RGBA_ASTC_10x5_Format = 37816,
  RGBA_ASTC_10x6_Format = 37817,
  RGBA_ASTC_10x8_Format = 37818,
  RGBA_ASTC_10x10_Format = 37819,
  RGBA_ASTC_12x10_Format = 37820,
  RGBA_ASTC_12x12_Format = 37821,
  RGBA_BPTC_Format = 36492,
  RGB_BPTC_SIGNED_Format = 36494,
  RGB_BPTC_UNSIGNED_Format = 36495,
  RED_RGTC1_Format = 36283,
  SIGNED_RED_RGTC1_Format = 36284,
  RED_GREEN_RGTC2_Format = 36285,
  SIGNED_RED_GREEN_RGTC2_Format = 36286,
  InterpolateDiscrete = 2300,
  InterpolateLinear = 2301,
  InterpolateSmooth = 2302,
  ZeroCurvatureEnding = 2400,
  ZeroSlopeEnding = 2401,
  WrapAroundEnding = 2402,
  NormalAnimationBlendMode = 2500,
  TrianglesDrawMode = 0,
  TriangleStripDrawMode = 1,
  TriangleFanDrawMode = 2,
  BasicDepthPacking = 3200,
  RGBADepthPacking = 3201,
  TangentSpaceNormalMap = 0,
  ObjectSpaceNormalMap = 1,
  NoColorSpace = "",
  SRGBColorSpace = "srgb",
  LinearSRGBColorSpace = "srgb-linear",
  DisplayP3ColorSpace = "display-p3",
  LinearDisplayP3ColorSpace = "display-p3-linear",
  LinearTransfer = "linear",
  SRGBTransfer = "srgb",
  Rec709Primaries = "rec709",
  P3Primaries = "p3",
  KeepStencilOp = 7680,
  AlwaysStencilFunc = 519,
  NeverCompare = 512,
  LessCompare = 513,
  EqualCompare = 514,
  LessEqualCompare = 515,
  GreaterCompare = 516,
  NotEqualCompare = 517,
  GreaterEqualCompare = 518,
  AlwaysCompare = 519,
  StaticDrawUsage = 35044,
  GLSL3 = "300 es",
  WebGLCoordinateSystem = 2e3,
  WebGPUCoordinateSystem = 2001;
class EventDispatcher {
  addEventListener(e, t) {
    void 0 === this._listeners && (this._listeners = {});
    var i = this._listeners;
    void 0 === i[e] && (i[e] = []), -1 === i[e].indexOf(t) && i[e].push(t);
  }
  hasEventListener(e, t) {
    var i;
    return (
      void 0 !== this._listeners &&
      void 0 !== (i = this._listeners)[e] &&
      -1 !== i[e].indexOf(t)
    );
  }
  removeEventListener(e, t) {
    var i;
    void 0 !== this._listeners &&
      void 0 !== (e = this._listeners[e]) &&
      -1 !== (i = e.indexOf(t)) &&
      e.splice(i, 1);
  }
  dispatchEvent(i) {
    if (void 0 !== this._listeners) {
      var e = this._listeners[i.type];
      if (void 0 !== e) {
        i.target = this;
        var r = e.slice(0);
        for (let e = 0, t = r.length; e < t; e++) r[e].call(this, i);
        i.target = null;
      }
    }
  }
}
let _lut = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "0a",
    "0b",
    "0c",
    "0d",
    "0e",
    "0f",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "1a",
    "1b",
    "1c",
    "1d",
    "1e",
    "1f",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "2a",
    "2b",
    "2c",
    "2d",
    "2e",
    "2f",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "3a",
    "3b",
    "3c",
    "3d",
    "3e",
    "3f",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "4a",
    "4b",
    "4c",
    "4d",
    "4e",
    "4f",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "5a",
    "5b",
    "5c",
    "5d",
    "5e",
    "5f",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "6a",
    "6b",
    "6c",
    "6d",
    "6e",
    "6f",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "7a",
    "7b",
    "7c",
    "7d",
    "7e",
    "7f",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "8a",
    "8b",
    "8c",
    "8d",
    "8e",
    "8f",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "9a",
    "9b",
    "9c",
    "9d",
    "9e",
    "9f",
    "a0",
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "aa",
    "ab",
    "ac",
    "ad",
    "ae",
    "af",
    "b0",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "b9",
    "ba",
    "bb",
    "bc",
    "bd",
    "be",
    "bf",
    "c0",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
    "c9",
    "ca",
    "cb",
    "cc",
    "cd",
    "ce",
    "cf",
    "d0",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "d9",
    "da",
    "db",
    "dc",
    "dd",
    "de",
    "df",
    "e0",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "e9",
    "ea",
    "eb",
    "ec",
    "ed",
    "ee",
    "ef",
    "f0",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "fa",
    "fb",
    "fc",
    "fd",
    "fe",
    "ff",
  ],
  _seed = 1234567,
  DEG2RAD = Math.PI / 180,
  RAD2DEG = 180 / Math.PI;
function generateUUID() {
  var e = (4294967295 * Math.random()) | 0,
    t = (4294967295 * Math.random()) | 0,
    i = (4294967295 * Math.random()) | 0,
    r = (4294967295 * Math.random()) | 0;
  return (
    _lut[255 & e] +
    _lut[(e >> 8) & 255] +
    _lut[(e >> 16) & 255] +
    _lut[(e >> 24) & 255] +
    "-" +
    _lut[255 & t] +
    _lut[(t >> 8) & 255] +
    "-" +
    _lut[((t >> 16) & 15) | 64] +
    _lut[(t >> 24) & 255] +
    "-" +
    _lut[(63 & i) | 128] +
    _lut[(i >> 8) & 255] +
    "-" +
    _lut[(i >> 16) & 255] +
    _lut[(i >> 24) & 255] +
    _lut[255 & r] +
    _lut[(r >> 8) & 255] +
    _lut[(r >> 16) & 255] +
    _lut[(r >> 24) & 255]
  ).toLowerCase();
}
function clamp(e, t, i) {
  return Math.max(t, Math.min(i, e));
}
function euclideanModulo(e, t) {
  return ((e % t) + t) % t;
}
function mapLinear(e, t, i, r, n) {
  return r + ((e - t) * (n - r)) / (i - t);
}
function inverseLerp(e, t, i) {
  return e !== t ? (i - e) / (t - e) : 0;
}
function lerp(e, t, i) {
  return (1 - i) * e + i * t;
}
function damp(e, t, i, r) {
  return lerp(e, t, 1 - Math.exp(-i * r));
}
function pingpong(e, t = 1) {
  return t - Math.abs(euclideanModulo(e, 2 * t) - t);
}
function smoothstep(e, t, i) {
  return e <= t ? 0 : i <= e ? 1 : (e = (e - t) / (i - t)) * e * (3 - 2 * e);
}
function smootherstep(e, t, i) {
  return e <= t
    ? 0
    : i <= e
    ? 1
    : (e = (e - t) / (i - t)) * e * e * (e * (6 * e - 15) + 10);
}
function randInt(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function randFloat(e, t) {
  return e + Math.random() * (t - e);
}
function randFloatSpread(e) {
  return e * (0.5 - Math.random());
}
function seededRandom(e) {
  void 0 !== e && (_seed = e);
  (e = _seed += 1831565813), (e = Math.imul(e ^ (e >>> 15), 1 | e));
  return (
    (((e ^= e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ (e >>> 14)) >>> 0) /
    4294967296
  );
}
function degToRad(e) {
  return e * DEG2RAD;
}
function radToDeg(e) {
  return e * RAD2DEG;
}
function isPowerOfTwo(e) {
  return 0 == (e & (e - 1)) && 0 !== e;
}
function ceilPowerOfTwo(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function floorPowerOfTwo(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function setQuaternionFromProperEuler(e, t, i, r, n) {
  var a = Math.cos,
    s = Math.sin,
    o = a(i / 2),
    l = s(i / 2),
    h = a((t + r) / 2),
    c = s((t + r) / 2),
    d = a((t - r) / 2),
    u = s((t - r) / 2),
    p = a((r - t) / 2),
    m = s((r - t) / 2);
  switch (n) {
    case "XYX":
      e.set(o * c, l * d, l * u, o * h);
      break;
    case "YZY":
      e.set(l * u, o * c, l * d, o * h);
      break;
    case "ZXZ":
      e.set(l * d, l * u, o * c, o * h);
      break;
    case "XZX":
      e.set(o * c, l * m, l * p, o * h);
      break;
    case "YXY":
      e.set(l * p, o * c, l * m, o * h);
      break;
    case "ZYZ":
      e.set(l * m, l * p, o * c, o * h);
      break;
    default:
      console.warn(
        "THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " +
          n
      );
  }
}
function denormalize(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return e / 4294967295;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int32Array:
      return Math.max(e / 2147483647, -1);
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function normalize(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return Math.round(4294967295 * e);
    case Uint16Array:
      return Math.round(65535 * e);
    case Uint8Array:
      return Math.round(255 * e);
    case Int32Array:
      return Math.round(2147483647 * e);
    case Int16Array:
      return Math.round(32767 * e);
    case Int8Array:
      return Math.round(127 * e);
    default:
      throw new Error("Invalid component type.");
  }
}
let MathUtils = {
  DEG2RAD: DEG2RAD,
  RAD2DEG: RAD2DEG,
  generateUUID: generateUUID,
  clamp: clamp,
  euclideanModulo: euclideanModulo,
  mapLinear: mapLinear,
  inverseLerp: inverseLerp,
  lerp: lerp,
  damp: damp,
  pingpong: pingpong,
  smoothstep: smoothstep,
  smootherstep: smootherstep,
  randInt: randInt,
  randFloat: randFloat,
  randFloatSpread: randFloatSpread,
  seededRandom: seededRandom,
  degToRad: degToRad,
  radToDeg: radToDeg,
  isPowerOfTwo: isPowerOfTwo,
  ceilPowerOfTwo: ceilPowerOfTwo,
  floorPowerOfTwo: floorPowerOfTwo,
  setQuaternionFromProperEuler: setQuaternionFromProperEuler,
  normalize: normalize,
  denormalize: denormalize,
};
class Vector2 {
  constructor(e = 0, t = 0) {
    (Vector2.prototype.isVector2 = !0), (this.x = e), (this.y = t);
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return (this.x = e), (this.y = t), this;
  }
  setScalar(e) {
    return (this.x = e), (this.y = e), this;
  }
  setX(e) {
    return (this.x = e), this;
  }
  setY(e) {
    return (this.y = e), this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return (this.x = e.x), (this.y = e.y), this;
  }
  add(e) {
    return (this.x += e.x), (this.y += e.y), this;
  }
  addScalar(e) {
    return (this.x += e), (this.y += e), this;
  }
  addVectors(e, t) {
    return (this.x = e.x + t.x), (this.y = e.y + t.y), this;
  }
  addScaledVector(e, t) {
    return (this.x += e.x * t), (this.y += e.y * t), this;
  }
  sub(e) {
    return (this.x -= e.x), (this.y -= e.y), this;
  }
  subScalar(e) {
    return (this.x -= e), (this.y -= e), this;
  }
  subVectors(e, t) {
    return (this.x = e.x - t.x), (this.y = e.y - t.y), this;
  }
  multiply(e) {
    return (this.x *= e.x), (this.y *= e.y), this;
  }
  multiplyScalar(e) {
    return (this.x *= e), (this.y *= e), this;
  }
  divide(e) {
    return (this.x /= e.x), (this.y /= e.y), this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    var t = this.x,
      i = this.y,
      e = e.elements;
    return (
      (this.x = e[0] * t + e[3] * i + e[6]),
      (this.y = e[1] * t + e[4] * i + e[7]),
      this
    );
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Math.max(e.x, Math.min(t.x, this.x))),
      (this.y = Math.max(e.y, Math.min(t.y, this.y))),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Math.max(e, Math.min(t, this.x))),
      (this.y = Math.max(e, Math.min(t, this.y))),
      this
    );
  }
  clampLength(e, t) {
    var i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(
      Math.max(e, Math.min(t, i))
    );
  }
  floor() {
    return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
  }
  ceil() {
    return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
  }
  round() {
    return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
  }
  roundToZero() {
    return (this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this;
  }
  negate() {
    return (this.x = -this.x), (this.y = -this.y), this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    var t = Math.sqrt(this.lengthSq() * e.lengthSq());
    return 0 === t
      ? Math.PI / 2
      : ((e = this.dot(e) / t), Math.acos(clamp(e, -1, 1)));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    var t = this.x - e.x,
      e = this.y - e.y;
    return t * t + e * e;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), this;
  }
  lerpVectors(e, t, i) {
    return (
      (this.x = e.x + (t.x - e.x) * i), (this.y = e.y + (t.y - e.y) * i), this
    );
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return (this.x = e[t]), (this.y = e[t + 1]), this;
  }
  toArray(e = [], t = 0) {
    return (e[t] = this.x), (e[t + 1] = this.y), e;
  }
  fromBufferAttribute(e, t) {
    return (this.x = e.getX(t)), (this.y = e.getY(t)), this;
  }
  rotateAround(e, t) {
    var i = Math.cos(t),
      t = Math.sin(t),
      r = this.x - e.x,
      n = this.y - e.y;
    return (this.x = r * i - n * t + e.x), (this.y = r * t + n * i + e.y), this;
  }
  random() {
    return (this.x = Math.random()), (this.y = Math.random()), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Matrix3 {
  constructor(e, t, i, r, n, a, s, o, l) {
    (Matrix3.prototype.isMatrix3 = !0),
      (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
      void 0 !== e && this.set(e, t, i, r, n, a, s, o, l);
  }
  set(e, t, i, r, n, a, s, o, l) {
    var h = this.elements;
    return (
      (h[0] = e),
      (h[1] = r),
      (h[2] = s),
      (h[3] = t),
      (h[4] = n),
      (h[5] = o),
      (h[6] = i),
      (h[7] = a),
      (h[8] = l),
      this
    );
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(e) {
    var t = this.elements,
      e = e.elements;
    return (
      (t[0] = e[0]),
      (t[1] = e[1]),
      (t[2] = e[2]),
      (t[3] = e[3]),
      (t[4] = e[4]),
      (t[5] = e[5]),
      (t[6] = e[6]),
      (t[7] = e[7]),
      (t[8] = e[8]),
      this
    );
  }
  extractBasis(e, t, i) {
    return (
      e.setFromMatrix3Column(this, 0),
      t.setFromMatrix3Column(this, 1),
      i.setFromMatrix3Column(this, 2),
      this
    );
  }
  setFromMatrix4(e) {
    e = e.elements;
    return (
      this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
    );
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    var e = e.elements,
      t = t.elements,
      i = this.elements,
      r = e[0],
      n = e[3],
      a = e[6],
      s = e[1],
      o = e[4],
      l = e[7],
      h = e[2],
      c = e[5],
      e = e[8],
      d = t[0],
      u = t[3],
      p = t[6],
      m = t[1],
      f = t[4],
      g = t[7],
      _ = t[2],
      v = t[5],
      t = t[8];
    return (
      (i[0] = r * d + n * m + a * _),
      (i[3] = r * u + n * f + a * v),
      (i[6] = r * p + n * g + a * t),
      (i[1] = s * d + o * m + l * _),
      (i[4] = s * u + o * f + l * v),
      (i[7] = s * p + o * g + l * t),
      (i[2] = h * d + c * m + e * _),
      (i[5] = h * u + c * f + e * v),
      (i[8] = h * p + c * g + e * t),
      this
    );
  }
  multiplyScalar(e) {
    var t = this.elements;
    return (
      (t[0] *= e),
      (t[3] *= e),
      (t[6] *= e),
      (t[1] *= e),
      (t[4] *= e),
      (t[7] *= e),
      (t[2] *= e),
      (t[5] *= e),
      (t[8] *= e),
      this
    );
  }
  determinant() {
    var e = this.elements,
      t = e[0],
      i = e[1],
      r = e[2],
      n = e[3],
      a = e[4],
      s = e[5],
      o = e[6],
      l = e[7],
      e = e[8];
    return (
      t * a * e - t * s * l - i * n * e + i * s * o + r * n * l - r * a * o
    );
  }
  invert() {
    var e = this.elements,
      t = e[0],
      i = e[1],
      r = e[2],
      n = e[3],
      a = e[4],
      s = e[5],
      o = e[6],
      l = e[7],
      h = e[8],
      c = h * a - s * l,
      d = s * o - h * n,
      u = l * n - a * o,
      p = t * c + i * d + r * u;
    return 0 == p
      ? this.set(0, 0, 0, 0, 0, 0, 0, 0, 0)
      : ((e[0] = c * (c = 1 / p)),
        (e[1] = (r * l - h * i) * c),
        (e[2] = (s * i - r * a) * c),
        (e[3] = d * c),
        (e[4] = (h * t - r * o) * c),
        (e[5] = (r * n - s * t) * c),
        (e[6] = u * c),
        (e[7] = (i * o - l * t) * c),
        (e[8] = (a * t - i * n) * c),
        this);
  }
  transpose() {
    var e = this.elements,
      t = e[1];
    return (
      (e[1] = e[3]),
      (e[3] = t),
      (t = e[2]),
      (e[2] = e[6]),
      (e[6] = t),
      (t = e[5]),
      (e[5] = e[7]),
      (e[7] = t),
      this
    );
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    var t = this.elements;
    return (
      (e[0] = t[0]),
      (e[1] = t[3]),
      (e[2] = t[6]),
      (e[3] = t[1]),
      (e[4] = t[4]),
      (e[5] = t[7]),
      (e[6] = t[2]),
      (e[7] = t[5]),
      (e[8] = t[8]),
      this
    );
  }
  setUvTransform(e, t, i, r, n, a, s) {
    var o = Math.cos(n),
      n = Math.sin(n);
    return (
      this.set(
        i * o,
        i * n,
        -i * (o * a + n * s) + a + e,
        -r * n,
        r * o,
        -r * (-n * a + o * s) + s + t,
        0,
        0,
        1
      ),
      this
    );
  }
  scale(e, t) {
    return this.premultiply(_m3.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(_m3.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(_m3.makeTranslation(e, t)), this;
  }
  makeTranslation(e, t) {
    return (
      e.isVector2
        ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1)
        : this.set(1, 0, e, 0, 1, t, 0, 0, 1),
      this
    );
  }
  makeRotation(e) {
    var t = Math.cos(e),
      e = Math.sin(e);
    return this.set(t, -e, 0, e, t, 0, 0, 0, 1), this;
  }
  makeScale(e, t) {
    return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
  }
  equals(e) {
    var t = this.elements,
      i = e.elements;
    for (let e = 0; e < 9; e++) if (t[e] !== i[e]) return !1;
    return !0;
  }
  fromArray(t, i = 0) {
    for (let e = 0; e < 9; e++) this.elements[e] = t[e + i];
    return this;
  }
  toArray(e = [], t = 0) {
    var i = this.elements;
    return (
      (e[t] = i[0]),
      (e[t + 1] = i[1]),
      (e[t + 2] = i[2]),
      (e[t + 3] = i[3]),
      (e[t + 4] = i[4]),
      (e[t + 5] = i[5]),
      (e[t + 6] = i[6]),
      (e[t + 7] = i[7]),
      (e[t + 8] = i[8]),
      e
    );
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
let _m3 = new Matrix3();
function arrayNeedsUint32(t) {
  for (let e = t.length - 1; 0 <= e; --e) if (65535 <= t[e]) return !0;
  return !1;
}
function createElementNS(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function createCanvasElement() {
  var e = createElementNS("canvas");
  return (e.style.display = "block"), e;
}
let _cache = {};
function warnOnce(e) {
  e in _cache || ((_cache[e] = !0), console.warn(e));
}
let LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = new Matrix3().set(
    0.8224621,
    0.177538,
    0,
    0.0331941,
    0.9668058,
    0,
    0.0170827,
    0.0723974,
    0.9105199
  ),
  LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = new Matrix3().set(
    1.2249401,
    -0.2249404,
    0,
    -0.0420569,
    1.0420571,
    0,
    -0.0196376,
    -0.0786361,
    1.0982735
  ),
  COLOR_SPACES = {
    [LinearSRGBColorSpace]: {
      transfer: LinearTransfer,
      primaries: Rec709Primaries,
      toReference: (e) => e,
      fromReference: (e) => e,
    },
    [SRGBColorSpace]: {
      transfer: SRGBTransfer,
      primaries: Rec709Primaries,
      toReference: (e) => e.convertSRGBToLinear(),
      fromReference: (e) => e.convertLinearToSRGB(),
    },
    [LinearDisplayP3ColorSpace]: {
      transfer: LinearTransfer,
      primaries: P3Primaries,
      toReference: (e) => e.applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB),
      fromReference: (e) => e.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3),
    },
    [DisplayP3ColorSpace]: {
      transfer: SRGBTransfer,
      primaries: P3Primaries,
      toReference: (e) =>
        e.convertSRGBToLinear().applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB),
      fromReference: (e) =>
        e.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3).convertLinearToSRGB(),
    },
  },
  SUPPORTED_WORKING_COLOR_SPACES = new Set([
    LinearSRGBColorSpace,
    LinearDisplayP3ColorSpace,
  ]),
  ColorManagement = {
    enabled: !0,
    _workingColorSpace: LinearSRGBColorSpace,
    get workingColorSpace() {
      return this._workingColorSpace;
    },
    set workingColorSpace(e) {
      if (!SUPPORTED_WORKING_COLOR_SPACES.has(e))
        throw new Error(`Unsupported working color space, "${e}".`);
      this._workingColorSpace = e;
    },
    convert: function (e, t, i) {
      return !1 !== this.enabled && t !== i && t && i
        ? ((t = COLOR_SPACES[t].toReference),
          (0, COLOR_SPACES[i].fromReference)(t(e)))
        : e;
    },
    fromWorkingColorSpace: function (e, t) {
      return this.convert(e, this._workingColorSpace, t);
    },
    toWorkingColorSpace: function (e, t) {
      return this.convert(e, t, this._workingColorSpace);
    },
    getPrimaries: function (e) {
      return COLOR_SPACES[e].primaries;
    },
    getTransfer: function (e) {
      return e === NoColorSpace ? LinearTransfer : COLOR_SPACES[e].transfer;
    },
  };
function SRGBToLinear(e) {
  return e < 0.04045
    ? 0.0773993808 * e
    : Math.pow(0.9478672986 * e + 0.0521327014, 2.4);
}
function LinearToSRGB(e) {
  return e < 0.0031308 ? 12.92 * e : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
let _canvas;
class ImageUtils {
  static getDataURL(e) {
    if (/^data:/i.test(e.src)) return e.src;
    if ("undefined" == typeof HTMLCanvasElement) return e.src;
    let t;
    var i;
    return 2048 <
      (t =
        e instanceof HTMLCanvasElement
          ? e
          : (((_canvas =
              void 0 === _canvas ? createElementNS("canvas") : _canvas).width =
              e.width),
            (_canvas.height = e.height),
            (i = _canvas.getContext("2d")),
            e instanceof ImageData
              ? i.putImageData(e, 0, 0)
              : i.drawImage(e, 0, 0, e.width, e.height),
            _canvas)).width || 2048 < t.height
      ? (console.warn(
          "THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",
          e
        ),
        t.toDataURL("image/jpeg", 0.6))
      : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (
      ("undefined" != typeof HTMLImageElement &&
        e instanceof HTMLImageElement) ||
      ("undefined" != typeof HTMLCanvasElement &&
        e instanceof HTMLCanvasElement) ||
      ("undefined" != typeof ImageBitmap && e instanceof ImageBitmap)
    ) {
      var t = createElementNS("canvas"),
        i = ((t.width = e.width), (t.height = e.height), t.getContext("2d")),
        r =
          (i.drawImage(e, 0, 0, e.width, e.height),
          i.getImageData(0, 0, e.width, e.height)),
        n = r.data;
      for (let e = 0; e < n.length; e++) n[e] = 255 * SRGBToLinear(n[e] / 255);
      return i.putImageData(r, 0, 0), t;
    }
    if (e.data) {
      var a = e.data.slice(0);
      for (let e = 0; e < a.length; e++)
        a instanceof Uint8Array || a instanceof Uint8ClampedArray
          ? (a[e] = Math.floor(255 * SRGBToLinear(a[e] / 255)))
          : (a[e] = SRGBToLinear(a[e]));
      return { data: a, width: e.width, height: e.height };
    }
    return (
      console.warn(
        "THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."
      ),
      e
    );
  }
}
let _sourceId = 0;
class Source {
  constructor(e = null) {
    (this.isSource = !0),
      Object.defineProperty(this, "id", { value: _sourceId++ }),
      (this.uuid = generateUUID()),
      (this.data = e),
      (this.dataReady = !0),
      (this.version = 0);
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  toJSON(e) {
    var t = void 0 === e || "string" == typeof e;
    if (!t && void 0 !== e.images[this.uuid]) return e.images[this.uuid];
    var r = { uuid: this.uuid, url: "" },
      n = this.data;
    if (null !== n) {
      let i;
      if (Array.isArray(n)) {
        i = [];
        for (let e = 0, t = n.length; e < t; e++)
          n[e].isDataTexture
            ? i.push(serializeImage(n[e].image))
            : i.push(serializeImage(n[e]));
      } else i = serializeImage(n);
      r.url = i;
    }
    return t || (e.images[this.uuid] = r), r;
  }
}
function serializeImage(e) {
  return ("undefined" != typeof HTMLImageElement &&
    e instanceof HTMLImageElement) ||
    ("undefined" != typeof HTMLCanvasElement &&
      e instanceof HTMLCanvasElement) ||
    ("undefined" != typeof ImageBitmap && e instanceof ImageBitmap)
    ? ImageUtils.getDataURL(e)
    : e.data
    ? {
        data: Array.from(e.data),
        width: e.width,
        height: e.height,
        type: e.data.constructor.name,
      }
    : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let _textureId = 0;
class Texture extends EventDispatcher {
  constructor(
    e = Texture.DEFAULT_IMAGE,
    t = Texture.DEFAULT_MAPPING,
    i = ClampToEdgeWrapping,
    r = ClampToEdgeWrapping,
    n = LinearFilter,
    a = LinearMipmapLinearFilter,
    s = RGBAFormat,
    o = UnsignedByteType,
    l = Texture.DEFAULT_ANISOTROPY,
    h = NoColorSpace
  ) {
    super(),
      (this.isTexture = !0),
      Object.defineProperty(this, "id", { value: _textureId++ }),
      (this.uuid = generateUUID()),
      (this.name = ""),
      (this.source = new Source(e)),
      (this.mipmaps = []),
      (this.mapping = t),
      (this.channel = 0),
      (this.wrapS = i),
      (this.wrapT = r),
      (this.magFilter = n),
      (this.minFilter = a),
      (this.anisotropy = l),
      (this.format = s),
      (this.internalFormat = null),
      (this.type = o),
      (this.offset = new Vector2(0, 0)),
      (this.repeat = new Vector2(1, 1)),
      (this.center = new Vector2(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new Matrix3()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      (this.colorSpace = h),
      (this.userData = {}),
      (this.version = 0),
      (this.onUpdate = null),
      (this.isRenderTargetTexture = !1),
      (this.pmremVersion = 0);
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(
      this.offset.x,
      this.offset.y,
      this.repeat.x,
      this.repeat.y,
      this.rotation,
      this.center.x,
      this.center.y
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (
      (this.name = e.name),
      (this.source = e.source),
      (this.mipmaps = e.mipmaps.slice(0)),
      (this.mapping = e.mapping),
      (this.channel = e.channel),
      (this.wrapS = e.wrapS),
      (this.wrapT = e.wrapT),
      (this.magFilter = e.magFilter),
      (this.minFilter = e.minFilter),
      (this.anisotropy = e.anisotropy),
      (this.format = e.format),
      (this.internalFormat = e.internalFormat),
      (this.type = e.type),
      this.offset.copy(e.offset),
      this.repeat.copy(e.repeat),
      this.center.copy(e.center),
      (this.rotation = e.rotation),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this.matrix.copy(e.matrix),
      (this.generateMipmaps = e.generateMipmaps),
      (this.premultiplyAlpha = e.premultiplyAlpha),
      (this.flipY = e.flipY),
      (this.unpackAlignment = e.unpackAlignment),
      (this.colorSpace = e.colorSpace),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      (this.needsUpdate = !0),
      this
    );
  }
  toJSON(e) {
    var t,
      i = void 0 === e || "string" == typeof e;
    return i || void 0 === e.textures[this.uuid]
      ? ((t = {
          metadata: {
            version: 4.6,
            type: "Texture",
            generator: "Texture.toJSON",
          },
          uuid: this.uuid,
          name: this.name,
          image: this.source.toJSON(e).uuid,
          mapping: this.mapping,
          channel: this.channel,
          repeat: [this.repeat.x, this.repeat.y],
          offset: [this.offset.x, this.offset.y],
          center: [this.center.x, this.center.y],
          rotation: this.rotation,
          wrap: [this.wrapS, this.wrapT],
          format: this.format,
          internalFormat: this.internalFormat,
          type: this.type,
          colorSpace: this.colorSpace,
          minFilter: this.minFilter,
          magFilter: this.magFilter,
          anisotropy: this.anisotropy,
          flipY: this.flipY,
          generateMipmaps: this.generateMipmaps,
          premultiplyAlpha: this.premultiplyAlpha,
          unpackAlignment: this.unpackAlignment,
        }),
        0 < Object.keys(this.userData).length && (t.userData = this.userData),
        i || (e.textures[this.uuid] = t),
        t)
      : e.textures[this.uuid];
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping === UVMapping) {
      if ((e.applyMatrix3(this.matrix), e.x < 0 || 1 < e.x))
        switch (this.wrapS) {
          case RepeatWrapping:
            e.x = e.x - Math.floor(e.x);
            break;
          case ClampToEdgeWrapping:
            e.x = e.x < 0 ? 0 : 1;
            break;
          case MirroredRepeatWrapping:
            1 === Math.abs(Math.floor(e.x) % 2)
              ? (e.x = Math.ceil(e.x) - e.x)
              : (e.x = e.x - Math.floor(e.x));
        }
      if (e.y < 0 || 1 < e.y)
        switch (this.wrapT) {
          case RepeatWrapping:
            e.y = e.y - Math.floor(e.y);
            break;
          case ClampToEdgeWrapping:
            e.y = e.y < 0 ? 0 : 1;
            break;
          case MirroredRepeatWrapping:
            1 === Math.abs(Math.floor(e.y) % 2)
              ? (e.y = Math.ceil(e.y) - e.y)
              : (e.y = e.y - Math.floor(e.y));
        }
      this.flipY && (e.y = 1 - e.y);
    }
    return e;
  }
  set needsUpdate(e) {
    !0 === e && (this.version++, (this.source.needsUpdate = !0));
  }
  set needsPMREMUpdate(e) {
    !0 === e && this.pmremVersion++;
  }
}
(Texture.DEFAULT_IMAGE = null),
  (Texture.DEFAULT_MAPPING = UVMapping),
  (Texture.DEFAULT_ANISOTROPY = 1);
class Vector4 {
  constructor(e = 0, t = 0, i = 0, r = 1) {
    (Vector4.prototype.isVector4 = !0),
      (this.x = e),
      (this.y = t),
      (this.z = i),
      (this.w = r);
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, i, r) {
    return (this.x = e), (this.y = t), (this.z = i), (this.w = r), this;
  }
  setScalar(e) {
    return (this.x = e), (this.y = e), (this.z = e), (this.w = e), this;
  }
  setX(e) {
    return (this.x = e), this;
  }
  setY(e) {
    return (this.y = e), this;
  }
  setZ(e) {
    return (this.z = e), this;
  }
  setW(e) {
    return (this.w = e), this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return (
      (this.x = e.x),
      (this.y = e.y),
      (this.z = e.z),
      (this.w = void 0 !== e.w ? e.w : 1),
      this
    );
  }
  add(e) {
    return (
      (this.x += e.x), (this.y += e.y), (this.z += e.z), (this.w += e.w), this
    );
  }
  addScalar(e) {
    return (this.x += e), (this.y += e), (this.z += e), (this.w += e), this;
  }
  addVectors(e, t) {
    return (
      (this.x = e.x + t.x),
      (this.y = e.y + t.y),
      (this.z = e.z + t.z),
      (this.w = e.w + t.w),
      this
    );
  }
  addScaledVector(e, t) {
    return (
      (this.x += e.x * t),
      (this.y += e.y * t),
      (this.z += e.z * t),
      (this.w += e.w * t),
      this
    );
  }
  sub(e) {
    return (
      (this.x -= e.x), (this.y -= e.y), (this.z -= e.z), (this.w -= e.w), this
    );
  }
  subScalar(e) {
    return (this.x -= e), (this.y -= e), (this.z -= e), (this.w -= e), this;
  }
  subVectors(e, t) {
    return (
      (this.x = e.x - t.x),
      (this.y = e.y - t.y),
      (this.z = e.z - t.z),
      (this.w = e.w - t.w),
      this
    );
  }
  multiply(e) {
    return (
      (this.x *= e.x), (this.y *= e.y), (this.z *= e.z), (this.w *= e.w), this
    );
  }
  multiplyScalar(e) {
    return (this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this;
  }
  applyMatrix4(e) {
    var t = this.x,
      i = this.y,
      r = this.z,
      n = this.w,
      e = e.elements;
    return (
      (this.x = e[0] * t + e[4] * i + e[8] * r + e[12] * n),
      (this.y = e[1] * t + e[5] * i + e[9] * r + e[13] * n),
      (this.z = e[2] * t + e[6] * i + e[10] * r + e[14] * n),
      (this.w = e[3] * t + e[7] * i + e[11] * r + e[15] * n),
      this
    );
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    var t = Math.sqrt(1 - e.w * e.w);
    return (
      t < 1e-4
        ? ((this.x = 1), (this.y = 0), (this.z = 0))
        : ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t)),
      this
    );
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, i, r, n;
    var a,
      s,
      o,
      l,
      h,
      c,
      t = t.elements,
      d = t[0],
      u = t[4],
      p = t[8],
      m = t[1],
      f = t[5],
      g = t[9],
      _ = t[2],
      v = t[6],
      t = t[10];
    if (
      Math.abs(u - m) < 0.01 &&
      Math.abs(p - _) < 0.01 &&
      Math.abs(g - v) < 0.01
    )
      Math.abs(u + m) < 0.1 &&
      Math.abs(p + _) < 0.1 &&
      Math.abs(g + v) < 0.1 &&
      Math.abs(d + f + t - 3) < 0.1
        ? this.set(1, 0, 0, 0)
        : ((e = Math.PI),
          (o = (t + 1) / 2),
          (l = (u + m) / 4),
          (h = (p + _) / 4),
          (c = (g + v) / 4),
          (s = (f + 1) / 2) < (a = (d + 1) / 2) && o < a
            ? (n =
                a < 0.01
                  ? ((i = 0), (r = 0.707106781))
                  : ((i = Math.sqrt(a)), (r = l / i), h / i))
            : o < s
            ? (n =
                s < 0.01
                  ? ((i = 0.707106781), (r = 0), 0.707106781)
                  : ((r = Math.sqrt(s)), (i = l / r), c / r))
            : o < 0.01
            ? ((i = 0.707106781), (r = 0.707106781), (n = 0))
            : ((n = Math.sqrt(o)), (i = h / n), (r = c / n)),
          this.set(i, r, n, e));
    else {
      let e = Math.sqrt(
        (v - g) * (v - g) + (p - _) * (p - _) + (m - u) * (m - u)
      );
      Math.abs(e) < 0.001 && (e = 1),
        (this.x = (v - g) / e),
        (this.y = (p - _) / e),
        (this.z = (m - u) / e),
        (this.w = Math.acos((d + f + t - 1) / 2));
    }
    return this;
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      (this.w = Math.min(this.w, e.w)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      (this.w = Math.max(this.w, e.w)),
      this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Math.max(e.x, Math.min(t.x, this.x))),
      (this.y = Math.max(e.y, Math.min(t.y, this.y))),
      (this.z = Math.max(e.z, Math.min(t.z, this.z))),
      (this.w = Math.max(e.w, Math.min(t.w, this.w))),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Math.max(e, Math.min(t, this.x))),
      (this.y = Math.max(e, Math.min(t, this.y))),
      (this.z = Math.max(e, Math.min(t, this.z))),
      (this.w = Math.max(e, Math.min(t, this.w))),
      this
    );
  }
  clampLength(e, t) {
    var i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(
      Math.max(e, Math.min(t, i))
    );
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      (this.w = Math.floor(this.w)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      (this.w = Math.ceil(this.w)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      (this.w = Math.round(this.w)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      (this.w = Math.trunc(this.w)),
      this
    );
  }
  negate() {
    return (
      (this.x = -this.x),
      (this.y = -this.y),
      (this.z = -this.z),
      (this.w = -this.w),
      this
    );
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return (
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }
  length() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }
  manhattanLength() {
    return (
      Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    );
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (
      (this.x += (e.x - this.x) * t),
      (this.y += (e.y - this.y) * t),
      (this.z += (e.z - this.z) * t),
      (this.w += (e.w - this.w) * t),
      this
    );
  }
  lerpVectors(e, t, i) {
    return (
      (this.x = e.x + (t.x - e.x) * i),
      (this.y = e.y + (t.y - e.y) * i),
      (this.z = e.z + (t.z - e.z) * i),
      (this.w = e.w + (t.w - e.w) * i),
      this
    );
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return (
      (this.x = e[t]),
      (this.y = e[t + 1]),
      (this.z = e[t + 2]),
      (this.w = e[t + 3]),
      this
    );
  }
  toArray(e = [], t = 0) {
    return (
      (e[t] = this.x),
      (e[t + 1] = this.y),
      (e[t + 2] = this.z),
      (e[t + 3] = this.w),
      e
    );
  }
  fromBufferAttribute(e, t) {
    return (
      (this.x = e.getX(t)),
      (this.y = e.getY(t)),
      (this.z = e.getZ(t)),
      (this.w = e.getW(t)),
      this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      (this.w = Math.random()),
      this
    );
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class RenderTarget extends EventDispatcher {
  constructor(e = 1, t = 1, i = {}) {
    super(),
      (this.isRenderTarget = !0),
      (this.width = e),
      (this.height = t),
      (this.depth = 1),
      (this.scissor = new Vector4(0, 0, e, t)),
      (this.scissorTest = !1),
      (this.viewport = new Vector4(0, 0, e, t));
    var e = { width: e, height: t, depth: 1 },
      r =
        ((i = Object.assign(
          {
            generateMipmaps: !1,
            internalFormat: null,
            minFilter: LinearFilter,
            depthBuffer: !0,
            stencilBuffer: !1,
            resolveDepthBuffer: !0,
            resolveStencilBuffer: !0,
            depthTexture: null,
            samples: 0,
            count: 1,
          },
          i
        )),
        new Texture(
          e,
          i.mapping,
          i.wrapS,
          i.wrapT,
          i.magFilter,
          i.minFilter,
          i.format,
          i.type,
          i.anisotropy,
          i.colorSpace
        )),
      n =
        ((r.flipY = !1),
        (r.generateMipmaps = i.generateMipmaps),
        (r.internalFormat = i.internalFormat),
        (this.textures = []),
        i.count);
    for (let e = 0; e < n; e++)
      (this.textures[e] = r.clone()),
        (this.textures[e].isRenderTargetTexture = !0);
    (this.depthBuffer = i.depthBuffer),
      (this.stencilBuffer = i.stencilBuffer),
      (this.resolveDepthBuffer = i.resolveDepthBuffer),
      (this.resolveStencilBuffer = i.resolveStencilBuffer),
      (this.depthTexture = i.depthTexture),
      (this.samples = i.samples);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  setSize(i, r, n = 1) {
    if (this.width !== i || this.height !== r || this.depth !== n) {
      (this.width = i), (this.height = r), (this.depth = n);
      for (let e = 0, t = this.textures.length; e < t; e++)
        (this.textures[e].image.width = i),
          (this.textures[e].image.height = r),
          (this.textures[e].image.depth = n);
      this.dispose();
    }
    this.viewport.set(0, 0, i, r), this.scissor.set(0, 0, i, r);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(i) {
    (this.width = i.width),
      (this.height = i.height),
      (this.depth = i.depth),
      this.scissor.copy(i.scissor),
      (this.scissorTest = i.scissorTest),
      this.viewport.copy(i.viewport);
    for (let e = (this.textures.length = 0), t = i.textures.length; e < t; e++)
      (this.textures[e] = i.textures[e].clone()),
        (this.textures[e].isRenderTargetTexture = !0);
    var e = Object.assign({}, i.texture.image);
    return (
      (this.texture.source = new Source(e)),
      (this.depthBuffer = i.depthBuffer),
      (this.stencilBuffer = i.stencilBuffer),
      (this.resolveDepthBuffer = i.resolveDepthBuffer),
      (this.resolveStencilBuffer = i.resolveStencilBuffer),
      null !== i.depthTexture && (this.depthTexture = i.depthTexture.clone()),
      (this.samples = i.samples),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class WebGLRenderTarget extends RenderTarget {
  constructor(e = 1, t = 1, i = {}) {
    super(e, t, i), (this.isWebGLRenderTarget = !0);
  }
}
class DataArrayTexture extends Texture {
  constructor(e = null, t = 1, i = 1, r = 1) {
    super(null),
      (this.isDataArrayTexture = !0),
      (this.image = { data: e, width: t, height: i, depth: r }),
      (this.magFilter = NearestFilter),
      (this.minFilter = NearestFilter),
      (this.wrapR = ClampToEdgeWrapping),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1);
  }
}
class Data3DTexture extends Texture {
  constructor(e = null, t = 1, i = 1, r = 1) {
    super(null),
      (this.isData3DTexture = !0),
      (this.image = { data: e, width: t, height: i, depth: r }),
      (this.magFilter = NearestFilter),
      (this.minFilter = NearestFilter),
      (this.wrapR = ClampToEdgeWrapping),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1);
  }
}
class Quaternion {
  constructor(e = 0, t = 0, i = 0, r = 1) {
    (this.isQuaternion = !0),
      (this._x = e),
      (this._y = t),
      (this._z = i),
      (this._w = r);
  }
  static slerpFlat(e, t, i, r, n, a, s) {
    let o = i[r + 0],
      l = i[r + 1],
      h = i[r + 2],
      c = i[r + 3];
    var i = n[a + 0],
      r = n[a + 1],
      d = n[a + 2],
      n = n[a + 3];
    if (0 === s) (e[t + 0] = o), (e[t + 1] = l), (e[t + 2] = h), (e[t + 3] = c);
    else if (1 === s)
      (e[t + 0] = i), (e[t + 1] = r), (e[t + 2] = d), (e[t + 3] = n);
    else {
      if (c !== n || o !== i || l !== r || h !== d) {
        let e = 1 - s;
        var a = o * i + l * r + h * d + c * n,
          u = 0 <= a ? 1 : -1,
          p = 1 - a * a,
          a =
            (p > Number.EPSILON &&
              ((p = Math.sqrt(p)),
              (a = Math.atan2(p, a * u)),
              (e = Math.sin(e * a) / p),
              (s = Math.sin(s * a) / p)),
            s * u);
        (o = o * e + i * a),
          (l = l * e + r * a),
          (h = h * e + d * a),
          (c = c * e + n * a),
          e === 1 - s &&
            ((p = 1 / Math.sqrt(o * o + l * l + h * h + c * c)),
            (o *= p),
            (l *= p),
            (h *= p),
            (c *= p));
      }
      (e[t] = o), (e[t + 1] = l), (e[t + 2] = h), (e[t + 3] = c);
    }
  }
  static multiplyQuaternionsFlat(e, t, i, r, n, a) {
    var s = i[r],
      o = i[r + 1],
      l = i[r + 2],
      i = i[r + 3],
      r = n[a],
      h = n[a + 1],
      c = n[a + 2],
      n = n[a + 3];
    return (
      (e[t] = s * n + i * r + o * c - l * h),
      (e[t + 1] = o * n + i * h + l * r - s * c),
      (e[t + 2] = l * n + i * c + s * h - o * r),
      (e[t + 3] = i * n - s * r - o * h - l * c),
      e
    );
  }
  get x() {
    return this._x;
  }
  set x(e) {
    (this._x = e), this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    (this._y = e), this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    (this._z = e), this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    (this._w = e), this._onChangeCallback();
  }
  set(e, t, i, r) {
    return (
      (this._x = e),
      (this._y = t),
      (this._z = i),
      (this._w = r),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return (
      (this._x = e.x),
      (this._y = e.y),
      (this._z = e.z),
      (this._w = e.w),
      this._onChangeCallback(),
      this
    );
  }
  setFromEuler(e, t = !0) {
    var i = e._x,
      r = e._y,
      n = e._z,
      a = e._order,
      e = Math.cos,
      s = Math.sin,
      o = e(i / 2),
      l = e(r / 2),
      h = e(n / 2),
      c = s(i / 2),
      d = s(r / 2),
      u = s(n / 2);
    switch (a) {
      case "XYZ":
        (this._x = c * l * h + o * d * u),
          (this._y = o * d * h - c * l * u),
          (this._z = o * l * u + c * d * h),
          (this._w = o * l * h - c * d * u);
        break;
      case "YXZ":
        (this._x = c * l * h + o * d * u),
          (this._y = o * d * h - c * l * u),
          (this._z = o * l * u - c * d * h),
          (this._w = o * l * h + c * d * u);
        break;
      case "ZXY":
        (this._x = c * l * h - o * d * u),
          (this._y = o * d * h + c * l * u),
          (this._z = o * l * u + c * d * h),
          (this._w = o * l * h - c * d * u);
        break;
      case "ZYX":
        (this._x = c * l * h - o * d * u),
          (this._y = o * d * h + c * l * u),
          (this._z = o * l * u - c * d * h),
          (this._w = o * l * h + c * d * u);
        break;
      case "YZX":
        (this._x = c * l * h + o * d * u),
          (this._y = o * d * h + c * l * u),
          (this._z = o * l * u - c * d * h),
          (this._w = o * l * h - c * d * u);
        break;
      case "XZY":
        (this._x = c * l * h - o * d * u),
          (this._y = o * d * h - c * l * u),
          (this._z = o * l * u + c * d * h),
          (this._w = o * l * h + c * d * u);
        break;
      default:
        console.warn(
          "THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a
        );
    }
    return !0 === t && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    var t = t / 2,
      i = Math.sin(t);
    return (
      (this._x = e.x * i),
      (this._y = e.y * i),
      (this._z = e.z * i),
      (this._w = Math.cos(t)),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e) {
    var e = e.elements,
      t = e[0],
      i = e[4],
      r = e[8],
      n = e[1],
      a = e[5],
      s = e[9],
      o = e[2],
      l = e[6],
      e = e[10],
      h = t + a + e;
    return (
      0 < h
        ? ((h = 0.5 / Math.sqrt(h + 1)),
          (this._w = 0.25 / h),
          (this._x = (l - s) * h),
          (this._y = (r - o) * h),
          (this._z = (n - i) * h))
        : a < t && e < t
        ? ((h = 2 * Math.sqrt(1 + t - a - e)),
          (this._w = (l - s) / h),
          (this._x = 0.25 * h),
          (this._y = (i + n) / h),
          (this._z = (r + o) / h))
        : e < a
        ? ((h = 2 * Math.sqrt(1 + a - t - e)),
          (this._w = (r - o) / h),
          (this._x = (i + n) / h),
          (this._y = 0.25 * h),
          (this._z = (s + l) / h))
        : ((h = 2 * Math.sqrt(1 + e - t - a)),
          (this._w = (n - i) / h),
          (this._x = (r + o) / h),
          (this._y = (s + l) / h),
          (this._z = 0.25 * h)),
      this._onChangeCallback(),
      this
    );
  }
  setFromUnitVectors(e, t) {
    let i = e.dot(t) + 1;
    return (
      i < Number.EPSILON
        ? ((i = 0),
          Math.abs(e.x) > Math.abs(e.z)
            ? ((this._x = -e.y), (this._y = e.x), (this._z = 0))
            : ((this._x = 0), (this._y = -e.z), (this._z = e.y)))
        : ((this._x = e.y * t.z - e.z * t.y),
          (this._y = e.z * t.x - e.x * t.z),
          (this._z = e.x * t.y - e.y * t.x)),
      (this._w = i),
      this.normalize()
    );
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(clamp(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    var i = this.angleTo(e);
    return 0 !== i && ((t = Math.min(1, t / i)), this.slerp(e, t)), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return (
      (this._x *= -1),
      (this._y *= -1),
      (this._z *= -1),
      this._onChangeCallback(),
      this
    );
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return (
      this._x * this._x +
      this._y * this._y +
      this._z * this._z +
      this._w * this._w
    );
  }
  length() {
    return Math.sqrt(
      this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w
    );
  }
  normalize() {
    var e = this.length();
    return (
      0 === e
        ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
        : ((this._x = this._x * (e = 1 / e)),
          (this._y = this._y * e),
          (this._z = this._z * e),
          (this._w = this._w * e)),
      this._onChangeCallback(),
      this
    );
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    var i = e._x,
      r = e._y,
      n = e._z,
      e = e._w,
      a = t._x,
      s = t._y,
      o = t._z,
      t = t._w;
    return (
      (this._x = i * t + e * a + r * o - n * s),
      (this._y = r * t + e * s + n * a - i * o),
      (this._z = n * t + e * o + i * s - r * a),
      (this._w = e * t - i * a - r * s - n * o),
      this._onChangeCallback(),
      this
    );
  }
  slerp(t, i) {
    if (0 !== i) {
      if (1 === i) return this.copy(t);
      var r,
        n,
        a = this._x,
        s = this._y,
        o = this._z,
        l = this._w;
      let e = l * t._w + a * t._x + s * t._y + o * t._z;
      e < 0
        ? ((this._w = -t._w),
          (this._x = -t._x),
          (this._y = -t._y),
          (this._z = -t._z),
          (e = -e))
        : this.copy(t),
        1 <= e
          ? ((this._w = l), (this._x = a), (this._y = s), (this._z = o))
          : (t = 1 - e * e) <= Number.EPSILON
          ? ((this._w = (r = 1 - i) * l + i * this._w),
            (this._x = r * a + i * this._x),
            (this._y = r * s + i * this._y),
            (this._z = r * o + i * this._z),
            this.normalize())
          : ((r = Math.sqrt(t)),
            (t = Math.atan2(r, e)),
            (n = Math.sin((1 - i) * t) / r),
            (i = Math.sin(i * t) / r),
            (this._w = l * n + this._w * i),
            (this._x = a * n + this._x * i),
            (this._y = s * n + this._y * i),
            (this._z = o * n + this._z * i),
            this._onChangeCallback());
    }
    return this;
  }
  slerpQuaternions(e, t, i) {
    return this.copy(e).slerp(t, i);
  }
  random() {
    var e = 2 * Math.PI * Math.random(),
      t = 2 * Math.PI * Math.random(),
      i = Math.random(),
      r = Math.sqrt(1 - i),
      i = Math.sqrt(i);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      i * Math.sin(t),
      i * Math.cos(t)
    );
  }
  equals(e) {
    return (
      e._x === this._x &&
      e._y === this._y &&
      e._z === this._z &&
      e._w === this._w
    );
  }
  fromArray(e, t = 0) {
    return (
      (this._x = e[t]),
      (this._y = e[t + 1]),
      (this._z = e[t + 2]),
      (this._w = e[t + 3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(e = [], t = 0) {
    return (
      (e[t] = this._x),
      (e[t + 1] = this._y),
      (e[t + 2] = this._z),
      (e[t + 3] = this._w),
      e
    );
  }
  fromBufferAttribute(e, t) {
    return (
      (this._x = e.getX(t)),
      (this._y = e.getY(t)),
      (this._z = e.getZ(t)),
      (this._w = e.getW(t)),
      this._onChangeCallback(),
      this
    );
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return (this._onChangeCallback = e), this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class Vector3 {
  constructor(e = 0, t = 0, i = 0) {
    (Vector3.prototype.isVector3 = !0),
      (this.x = e),
      (this.y = t),
      (this.z = i);
  }
  set(e, t, i) {
    return (
      void 0 === i && (i = this.z),
      (this.x = e),
      (this.y = t),
      (this.z = i),
      this
    );
  }
  setScalar(e) {
    return (this.x = e), (this.y = e), (this.z = e), this;
  }
  setX(e) {
    return (this.x = e), this;
  }
  setY(e) {
    return (this.y = e), this;
  }
  setZ(e) {
    return (this.z = e), this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return (this.x = e.x), (this.y = e.y), (this.z = e.z), this;
  }
  add(e) {
    return (this.x += e.x), (this.y += e.y), (this.z += e.z), this;
  }
  addScalar(e) {
    return (this.x += e), (this.y += e), (this.z += e), this;
  }
  addVectors(e, t) {
    return (
      (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), this
    );
  }
  addScaledVector(e, t) {
    return (this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), this;
  }
  sub(e) {
    return (this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this;
  }
  subScalar(e) {
    return (this.x -= e), (this.y -= e), (this.z -= e), this;
  }
  subVectors(e, t) {
    return (
      (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this
    );
  }
  multiply(e) {
    return (this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this;
  }
  multiplyScalar(e) {
    return (this.x *= e), (this.y *= e), (this.z *= e), this;
  }
  multiplyVectors(e, t) {
    return (
      (this.x = e.x * t.x), (this.y = e.y * t.y), (this.z = e.z * t.z), this
    );
  }
  applyEuler(e) {
    return this.applyQuaternion(_quaternion$4.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(_quaternion$4.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    var t = this.x,
      i = this.y,
      r = this.z,
      e = e.elements;
    return (
      (this.x = e[0] * t + e[3] * i + e[6] * r),
      (this.y = e[1] * t + e[4] * i + e[7] * r),
      (this.z = e[2] * t + e[5] * i + e[8] * r),
      this
    );
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    var t = this.x,
      i = this.y,
      r = this.z,
      e = e.elements,
      n = 1 / (e[3] * t + e[7] * i + e[11] * r + e[15]);
    return (
      (this.x = (e[0] * t + e[4] * i + e[8] * r + e[12]) * n),
      (this.y = (e[1] * t + e[5] * i + e[9] * r + e[13]) * n),
      (this.z = (e[2] * t + e[6] * i + e[10] * r + e[14]) * n),
      this
    );
  }
  applyQuaternion(e) {
    var t = this.x,
      i = this.y,
      r = this.z,
      n = e.x,
      a = e.y,
      s = e.z,
      e = e.w,
      o = 2 * (a * r - s * i),
      l = 2 * (s * t - n * r),
      h = 2 * (n * i - a * t);
    return (
      (this.x = t + e * o + a * h - s * l),
      (this.y = i + e * l + s * o - n * h),
      (this.z = r + e * h + n * l - a * o),
      this
    );
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(
      e.projectionMatrix
    );
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(
      e.matrixWorld
    );
  }
  transformDirection(e) {
    var t = this.x,
      i = this.y,
      r = this.z,
      e = e.elements;
    return (
      (this.x = e[0] * t + e[4] * i + e[8] * r),
      (this.y = e[1] * t + e[5] * i + e[9] * r),
      (this.z = e[2] * t + e[6] * i + e[10] * r),
      this.normalize()
    );
  }
  divide(e) {
    return (this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Math.max(e.x, Math.min(t.x, this.x))),
      (this.y = Math.max(e.y, Math.min(t.y, this.y))),
      (this.z = Math.max(e.z, Math.min(t.z, this.z))),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Math.max(e, Math.min(t, this.x))),
      (this.y = Math.max(e, Math.min(t, this.y))),
      (this.z = Math.max(e, Math.min(t, this.z))),
      this
    );
  }
  clampLength(e, t) {
    var i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(
      Math.max(e, Math.min(t, i))
    );
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      this
    );
  }
  negate() {
    return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (
      (this.x += (e.x - this.x) * t),
      (this.y += (e.y - this.y) * t),
      (this.z += (e.z - this.z) * t),
      this
    );
  }
  lerpVectors(e, t, i) {
    return (
      (this.x = e.x + (t.x - e.x) * i),
      (this.y = e.y + (t.y - e.y) * i),
      (this.z = e.z + (t.z - e.z) * i),
      this
    );
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    var i = e.x,
      r = e.y,
      e = e.z,
      n = t.x,
      a = t.y,
      t = t.z;
    return (
      (this.x = r * t - e * a),
      (this.y = e * n - i * t),
      (this.z = i * a - r * n),
      this
    );
  }
  projectOnVector(e) {
    var t = e.lengthSq();
    return 0 === t
      ? this.set(0, 0, 0)
      : ((t = e.dot(this) / t), this.copy(e).multiplyScalar(t));
  }
  projectOnPlane(e) {
    return _vector$c.copy(this).projectOnVector(e), this.sub(_vector$c);
  }
  reflect(e) {
    return this.sub(_vector$c.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    var t = Math.sqrt(this.lengthSq() * e.lengthSq());
    return 0 === t
      ? Math.PI / 2
      : ((e = this.dot(e) / t), Math.acos(clamp(e, -1, 1)));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    var t = this.x - e.x,
      i = this.y - e.y,
      e = this.z - e.z;
    return t * t + i * i + e * e;
  }
  manhattanDistanceTo(e) {
    return (
      Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
    );
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, i) {
    var r = Math.sin(t) * e;
    return (
      (this.x = r * Math.sin(i)),
      (this.y = Math.cos(t) * e),
      (this.z = r * Math.cos(i)),
      this
    );
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, i) {
    return (
      (this.x = e * Math.sin(t)), (this.y = i), (this.z = e * Math.cos(t)), this
    );
  }
  setFromMatrixPosition(e) {
    e = e.elements;
    return (this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this;
  }
  setFromMatrixScale(e) {
    var t = this.setFromMatrixColumn(e, 0).length(),
      i = this.setFromMatrixColumn(e, 1).length(),
      e = this.setFromMatrixColumn(e, 2).length();
    return (this.x = t), (this.y = i), (this.z = e), this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, 4 * t);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, 3 * t);
  }
  setFromEuler(e) {
    return (this.x = e._x), (this.y = e._y), (this.z = e._z), this;
  }
  setFromColor(e) {
    return (this.x = e.r), (this.y = e.g), (this.z = e.b), this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return (this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), this;
  }
  toArray(e = [], t = 0) {
    return (e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), e;
  }
  fromBufferAttribute(e, t) {
    return (
      (this.x = e.getX(t)), (this.y = e.getY(t)), (this.z = e.getZ(t)), this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      this
    );
  }
  randomDirection() {
    var e = Math.random() * Math.PI * 2,
      t = 2 * Math.random() - 1,
      i = Math.sqrt(1 - t * t);
    return (
      (this.x = i * Math.cos(e)), (this.y = t), (this.z = i * Math.sin(e)), this
    );
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
let _vector$c = new Vector3(),
  _quaternion$4 = new Quaternion();
class Box3 {
  constructor(
    e = new Vector3(1 / 0, 1 / 0, 1 / 0),
    t = new Vector3(-1 / 0, -1 / 0, -1 / 0)
  ) {
    (this.isBox3 = !0), (this.min = e), (this.max = t);
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(i) {
    this.makeEmpty();
    for (let e = 0, t = i.length; e < t; e += 3)
      this.expandByPoint(_vector$b.fromArray(i, e));
    return this;
  }
  setFromBufferAttribute(i) {
    this.makeEmpty();
    for (let e = 0, t = i.count; e < t; e++)
      this.expandByPoint(_vector$b.fromBufferAttribute(i, e));
    return this;
  }
  setFromPoints(i) {
    this.makeEmpty();
    for (let e = 0, t = i.length; e < t; e++) this.expandByPoint(i[e]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    t = _vector$b.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(t), this.max.copy(e).add(t), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return (
      (this.min.x = this.min.y = this.min.z = 1 / 0),
      (this.max.x = this.max.y = this.max.z = -1 / 0),
      this
    );
  }
  isEmpty() {
    return (
      this.max.x < this.min.x ||
      this.max.y < this.min.y ||
      this.max.z < this.min.z
    );
  }
  getCenter(e) {
    return this.isEmpty()
      ? e.set(0, 0, 0)
      : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(i, r = !1) {
    i.updateWorldMatrix(!1, !1);
    var e = i.geometry;
    if (void 0 !== e) {
      var n = e.getAttribute("position");
      if (!0 === r && void 0 !== n && !0 !== i.isInstancedMesh)
        for (let e = 0, t = n.count; e < t; e++)
          !0 === i.isMesh
            ? i.getVertexPosition(e, _vector$b)
            : _vector$b.fromBufferAttribute(n, e),
            _vector$b.applyMatrix4(i.matrixWorld),
            this.expandByPoint(_vector$b);
      else
        void 0 !== i.boundingBox
          ? (null === i.boundingBox && i.computeBoundingBox(),
            _box$4.copy(i.boundingBox))
          : (null === e.boundingBox && e.computeBoundingBox(),
            _box$4.copy(e.boundingBox)),
          _box$4.applyMatrix4(i.matrixWorld),
          this.union(_box$4);
    }
    var a = i.children;
    for (let e = 0, t = a.length; e < t; e++) this.expandByObject(a[e], r);
    return this;
  }
  containsPoint(e) {
    return !(
      e.x < this.min.x ||
      e.x > this.max.x ||
      e.y < this.min.y ||
      e.y > this.max.y ||
      e.z < this.min.z ||
      e.z > this.max.z
    );
  }
  containsBox(e) {
    return (
      this.min.x <= e.min.x &&
      e.max.x <= this.max.x &&
      this.min.y <= e.min.y &&
      e.max.y <= this.max.y &&
      this.min.z <= e.min.z &&
      e.max.z <= this.max.z
    );
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return !(
      e.max.x < this.min.x ||
      e.min.x > this.max.x ||
      e.max.y < this.min.y ||
      e.min.y > this.max.y ||
      e.max.z < this.min.z ||
      e.min.z > this.max.z
    );
  }
  intersectsSphere(e) {
    return (
      this.clampPoint(e.center, _vector$b),
      _vector$b.distanceToSquared(e.center) <= e.radius * e.radius
    );
  }
  intersectsPlane(e) {
    let t, i;
    return (
      (i =
        0 < e.normal.x
          ? ((t = e.normal.x * this.min.x), e.normal.x * this.max.x)
          : ((t = e.normal.x * this.max.x), e.normal.x * this.min.x)),
      0 < e.normal.y
        ? ((t += e.normal.y * this.min.y), (i += e.normal.y * this.max.y))
        : ((t += e.normal.y * this.max.y), (i += e.normal.y * this.min.y)),
      0 < e.normal.z
        ? ((t += e.normal.z * this.min.z), (i += e.normal.z * this.max.z))
        : ((t += e.normal.z * this.max.z), (i += e.normal.z * this.min.z)),
      t <= -e.constant && i >= -e.constant
    );
  }
  intersectsTriangle(e) {
    return (
      !this.isEmpty() &&
      (this.getCenter(_center),
      _extents.subVectors(this.max, _center),
      _v0$2.subVectors(e.a, _center),
      _v1$7.subVectors(e.b, _center),
      _v2$4.subVectors(e.c, _center),
      _f0.subVectors(_v1$7, _v0$2),
      _f1.subVectors(_v2$4, _v1$7),
      _f2.subVectors(_v0$2, _v2$4),
      !!satForAxes(
        [
          0,
          -_f0.z,
          _f0.y,
          0,
          -_f1.z,
          _f1.y,
          0,
          -_f2.z,
          _f2.y,
          _f0.z,
          0,
          -_f0.x,
          _f1.z,
          0,
          -_f1.x,
          _f2.z,
          0,
          -_f2.x,
          -_f0.y,
          _f0.x,
          0,
          -_f1.y,
          _f1.x,
          0,
          -_f2.y,
          _f2.x,
          0,
        ],
        _v0$2,
        _v1$7,
        _v2$4,
        _extents
      )) &&
      !!satForAxes(
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        _v0$2,
        _v1$7,
        _v2$4,
        _extents
      ) &&
      (_triangleNormal.crossVectors(_f0, _f1),
      satForAxes(
        [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z],
        _v0$2,
        _v1$7,
        _v2$4,
        _extents
      ))
    );
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, _vector$b).distanceTo(e);
  }
  getBoundingSphere(e) {
    return (
      this.isEmpty()
        ? e.makeEmpty()
        : (this.getCenter(e.center),
          (e.radius = 0.5 * this.getSize(_vector$b).length())),
      e
    );
  }
  intersect(e) {
    return (
      this.min.max(e.min),
      this.max.min(e.max),
      this.isEmpty() && this.makeEmpty(),
      this
    );
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return (
      this.isEmpty() ||
        (_points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
        _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
        _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
        _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
        _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
        _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
        _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
        _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
        this.setFromPoints(_points)),
      this
    );
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
let _points = [
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
  ],
  _vector$b = new Vector3(),
  _box$4 = new Box3(),
  _v0$2 = new Vector3(),
  _v1$7 = new Vector3(),
  _v2$4 = new Vector3(),
  _f0 = new Vector3(),
  _f1 = new Vector3(),
  _f2 = new Vector3(),
  _center = new Vector3(),
  _extents = new Vector3(),
  _triangleNormal = new Vector3(),
  _testAxis = new Vector3();
function satForAxes(i, r, n, a, s) {
  for (let e = 0, t = i.length - 3; e <= t; e += 3) {
    _testAxis.fromArray(i, e);
    var o =
        s.x * Math.abs(_testAxis.x) +
        s.y * Math.abs(_testAxis.y) +
        s.z * Math.abs(_testAxis.z),
      l = r.dot(_testAxis),
      h = n.dot(_testAxis),
      c = a.dot(_testAxis);
    if (Math.max(-Math.max(l, h, c), Math.min(l, h, c)) > o) return !1;
  }
  return !0;
}
let _box$3 = new Box3(),
  _v1$6 = new Vector3(),
  _v2$3 = new Vector3();
class Sphere {
  constructor(e = new Vector3(), t = -1) {
    (this.isSphere = !0), (this.center = e), (this.radius = t);
  }
  set(e, t) {
    return this.center.copy(e), (this.radius = t), this;
  }
  setFromPoints(i, e) {
    var r = this.center;
    void 0 !== e ? r.copy(e) : _box$3.setFromPoints(i).getCenter(r);
    let n = 0;
    for (let e = 0, t = i.length; e < t; e++)
      n = Math.max(n, r.distanceToSquared(i[e]));
    return (this.radius = Math.sqrt(n)), this;
  }
  copy(e) {
    return this.center.copy(e.center), (this.radius = e.radius), this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), (this.radius = -1), this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    var t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    var i = this.center.distanceToSquared(e);
    return (
      t.copy(e),
      i > this.radius * this.radius &&
        (t.sub(this.center).normalize(),
        t.multiplyScalar(this.radius).add(this.center)),
      t
    );
  }
  getBoundingBox(e) {
    return (
      this.isEmpty()
        ? e.makeEmpty()
        : (e.set(this.center, this.center), e.expandByScalar(this.radius)),
      e
    );
  }
  applyMatrix4(e) {
    return (
      this.center.applyMatrix4(e),
      (this.radius = this.radius * e.getMaxScaleOnAxis()),
      this
    );
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    var t;
    return (
      this.isEmpty()
        ? (this.center.copy(e), (this.radius = 0))
        : (_v1$6.subVectors(e, this.center),
          (e = _v1$6.lengthSq()) > this.radius * this.radius &&
            ((t = 0.5 * ((e = Math.sqrt(e)) - this.radius)),
            this.center.addScaledVector(_v1$6, t / e),
            (this.radius += t))),
      this
    );
  }
  union(e) {
    return (
      e.isEmpty() ||
        (this.isEmpty()
          ? this.copy(e)
          : !0 === this.center.equals(e.center)
          ? (this.radius = Math.max(this.radius, e.radius))
          : (_v2$3.subVectors(e.center, this.center).setLength(e.radius),
            this.expandByPoint(_v1$6.copy(e.center).add(_v2$3)),
            this.expandByPoint(_v1$6.copy(e.center).sub(_v2$3)))),
      this
    );
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
let _vector$a = new Vector3(),
  _segCenter = new Vector3(),
  _segDir = new Vector3(),
  _diff = new Vector3(),
  _edge1 = new Vector3(),
  _edge2 = new Vector3(),
  _normal$1 = new Vector3();
class Ray {
  constructor(e = new Vector3(), t = new Vector3(0, 0, -1)) {
    (this.origin = e), (this.direction = t);
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, _vector$a)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    e = t.dot(this.direction);
    return e < 0
      ? t.copy(this.origin)
      : t.copy(this.origin).addScaledVector(this.direction, e);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    var t = _vector$a.subVectors(e, this.origin).dot(this.direction);
    return (
      t < 0
        ? this.origin
        : (_vector$a.copy(this.origin).addScaledVector(this.direction, t),
          _vector$a)
    ).distanceToSquared(e);
  }
  distanceSqToSegment(e, t, i, r) {
    _segCenter.copy(e).add(t).multiplyScalar(0.5),
      _segDir.copy(t).sub(e).normalize(),
      _diff.copy(this.origin).sub(_segCenter);
    var e = 0.5 * e.distanceTo(t),
      t = -this.direction.dot(_segDir),
      n = _diff.dot(this.direction),
      a = -_diff.dot(_segDir),
      s = _diff.lengthSq(),
      o = Math.abs(1 - t * t);
    let l, h, c, d;
    return (
      (c =
        0 < o
          ? ((l = t * a - n),
            (h = t * n - a),
            (d = e * o),
            0 <= l
              ? h >= -d
                ? h <= d
                  ? ((o = 1 / o),
                    (l *= o),
                    (h *= o),
                    l * (l + t * h + 2 * n) + h * (t * l + h + 2 * a) + s)
                  : ((h = e),
                    -(l = Math.max(0, -(t * h + n))) * l + h * (h + 2 * a) + s)
                : ((h = -e),
                  -(l = Math.max(0, -(t * h + n))) * l + h * (h + 2 * a) + s)
              : h <= -d
              ? ((l = Math.max(0, -(-t * e + n))),
                (h = 0 < l ? -e : Math.min(Math.max(-e, -a), e)),
                -l * l + h * (h + 2 * a) + s)
              : h <= d
              ? ((l = 0), (h = Math.min(Math.max(-e, -a), e)) * (h + 2 * a) + s)
              : ((l = Math.max(0, -(t * e + n))),
                (h = 0 < l ? e : Math.min(Math.max(-e, -a), e)),
                -l * l + h * (h + 2 * a) + s))
          : ((h = 0 < t ? -e : e),
            -(l = Math.max(0, -(t * h + n))) * l + h * (h + 2 * a) + s)),
      i && i.copy(this.origin).addScaledVector(this.direction, l),
      r && r.copy(_segCenter).addScaledVector(_segDir, h),
      c
    );
  }
  intersectSphere(e, t) {
    _vector$a.subVectors(e.center, this.origin);
    var i = _vector$a.dot(this.direction),
      r = _vector$a.dot(_vector$a) - i * i,
      e = e.radius * e.radius;
    return e < r || ((r = i - (e = Math.sqrt(e - r))), (i = i + e) < 0)
      ? null
      : r < 0
      ? this.at(i, t)
      : this.at(r, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    var t = e.normal.dot(this.direction);
    return 0 === t
      ? 0 === e.distanceToPoint(this.origin)
        ? 0
        : null
      : 0 <= (e = -(this.origin.dot(e.normal) + e.constant) / t)
      ? e
      : null;
  }
  intersectPlane(e, t) {
    e = this.distanceToPlane(e);
    return null === e ? null : this.at(e, t);
  }
  intersectsPlane(e) {
    var t = e.distanceToPoint(this.origin);
    return 0 === t || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let i, r, n, a, s, o;
    var l = 1 / this.direction.x,
      h = 1 / this.direction.y,
      c = 1 / this.direction.z,
      d = this.origin;
    return (
      (r =
        0 <= l
          ? ((i = (e.min.x - d.x) * l), (e.max.x - d.x) * l)
          : ((i = (e.max.x - d.x) * l), (e.min.x - d.x) * l)),
      (a =
        0 <= h
          ? ((n = (e.min.y - d.y) * h), (e.max.y - d.y) * h)
          : ((n = (e.max.y - d.y) * h), (e.min.y - d.y) * h)),
      i > a ||
      n > r ||
      ((n > i || isNaN(i)) && (i = n),
      (a < r || isNaN(r)) && (r = a),
      (o =
        0 <= c
          ? ((s = (e.min.z - d.z) * c), (e.max.z - d.z) * c)
          : ((s = (e.max.z - d.z) * c), (e.min.z - d.z) * c)),
      i > o) ||
      s > r ||
      ((s > i || i != i) && (i = s), (r = o < r || r != r ? o : r) < 0)
        ? null
        : this.at(0 <= i ? i : r, t)
    );
  }
  intersectsBox(e) {
    return null !== this.intersectBox(e, _vector$a);
  }
  intersectTriangle(e, t, i, r, n) {
    _edge1.subVectors(t, e),
      _edge2.subVectors(i, e),
      _normal$1.crossVectors(_edge1, _edge2);
    let a = this.direction.dot(_normal$1),
      s;
    if (0 < a) {
      if (r) return null;
      s = 1;
    } else {
      if (!(a < 0)) return null;
      (s = -1), (a = -a);
    }
    _diff.subVectors(this.origin, e);
    t = s * this.direction.dot(_edge2.crossVectors(_diff, _edge2));
    return t < 0 ||
      (i = s * this.direction.dot(_edge1.cross(_diff))) < 0 ||
      t + i > a ||
      (r = -s * _diff.dot(_normal$1)) < 0
      ? null
      : this.at(r / a, n);
  }
  applyMatrix4(e) {
    return (
      this.origin.applyMatrix4(e), this.direction.transformDirection(e), this
    );
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Matrix4 {
  constructor(e, t, i, r, n, a, s, o, l, h, c, d, u, p, m, f) {
    (Matrix4.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      void 0 !== e && this.set(e, t, i, r, n, a, s, o, l, h, c, d, u, p, m, f);
  }
  set(e, t, i, r, n, a, s, o, l, h, c, d, u, p, m, f) {
    var g = this.elements;
    return (
      (g[0] = e),
      (g[4] = t),
      (g[8] = i),
      (g[12] = r),
      (g[1] = n),
      (g[5] = a),
      (g[9] = s),
      (g[13] = o),
      (g[2] = l),
      (g[6] = h),
      (g[10] = c),
      (g[14] = d),
      (g[3] = u),
      (g[7] = p),
      (g[11] = m),
      (g[15] = f),
      this
    );
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Matrix4().fromArray(this.elements);
  }
  copy(e) {
    var t = this.elements,
      e = e.elements;
    return (
      (t[0] = e[0]),
      (t[1] = e[1]),
      (t[2] = e[2]),
      (t[3] = e[3]),
      (t[4] = e[4]),
      (t[5] = e[5]),
      (t[6] = e[6]),
      (t[7] = e[7]),
      (t[8] = e[8]),
      (t[9] = e[9]),
      (t[10] = e[10]),
      (t[11] = e[11]),
      (t[12] = e[12]),
      (t[13] = e[13]),
      (t[14] = e[14]),
      (t[15] = e[15]),
      this
    );
  }
  copyPosition(e) {
    var t = this.elements,
      e = e.elements;
    return (t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), this;
  }
  setFromMatrix3(e) {
    e = e.elements;
    return (
      this.set(
        e[0],
        e[3],
        e[6],
        0,
        e[1],
        e[4],
        e[7],
        0,
        e[2],
        e[5],
        e[8],
        0,
        0,
        0,
        0,
        1
      ),
      this
    );
  }
  extractBasis(e, t, i) {
    return (
      e.setFromMatrixColumn(this, 0),
      t.setFromMatrixColumn(this, 1),
      i.setFromMatrixColumn(this, 2),
      this
    );
  }
  makeBasis(e, t, i) {
    return (
      this.set(
        e.x,
        t.x,
        i.x,
        0,
        e.y,
        t.y,
        i.y,
        0,
        e.z,
        t.z,
        i.z,
        0,
        0,
        0,
        0,
        1
      ),
      this
    );
  }
  extractRotation(e) {
    var t = this.elements,
      i = e.elements,
      r = 1 / _v1$5.setFromMatrixColumn(e, 0).length(),
      n = 1 / _v1$5.setFromMatrixColumn(e, 1).length(),
      e = 1 / _v1$5.setFromMatrixColumn(e, 2).length();
    return (
      (t[0] = i[0] * r),
      (t[1] = i[1] * r),
      (t[2] = i[2] * r),
      (t[3] = 0),
      (t[4] = i[4] * n),
      (t[5] = i[5] * n),
      (t[6] = i[6] * n),
      (t[7] = 0),
      (t[8] = i[8] * e),
      (t[9] = i[9] * e),
      (t[10] = i[10] * e),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      this
    );
  }
  makeRotationFromEuler(e) {
    var t,
      i,
      r,
      n,
      a = this.elements,
      s = e.x,
      o = e.y,
      l = e.z,
      h = Math.cos(s),
      s = Math.sin(s),
      c = Math.cos(o),
      o = Math.sin(o),
      d = Math.cos(l),
      l = Math.sin(l);
    return (
      "XYZ" === e.order
        ? ((i = h * d),
          (r = h * l),
          (n = s * d),
          (t = s * l),
          (a[0] = c * d),
          (a[4] = -c * l),
          (a[8] = o),
          (a[1] = r + n * o),
          (a[5] = i - t * o),
          (a[9] = -s * c),
          (a[2] = t - i * o),
          (a[6] = n + r * o),
          (a[10] = h * c))
        : "YXZ" === e.order
        ? ((t = c * l),
          (i = o * d),
          (a[0] = (n = c * d) + (r = o * l) * s),
          (a[4] = i * s - t),
          (a[8] = h * o),
          (a[1] = h * l),
          (a[5] = h * d),
          (a[9] = -s),
          (a[2] = t * s - i),
          (a[6] = r + n * s),
          (a[10] = h * c))
        : "ZXY" === e.order
        ? ((t = c * l),
          (i = o * d),
          (a[0] = (r = c * d) - (n = o * l) * s),
          (a[4] = -h * l),
          (a[8] = i + t * s),
          (a[1] = t + i * s),
          (a[5] = h * d),
          (a[9] = n - r * s),
          (a[2] = -h * o),
          (a[6] = s),
          (a[10] = h * c))
        : "ZYX" === e.order
        ? ((t = h * d),
          (i = h * l),
          (n = s * d),
          (r = s * l),
          (a[0] = c * d),
          (a[4] = n * o - i),
          (a[8] = t * o + r),
          (a[1] = c * l),
          (a[5] = r * o + t),
          (a[9] = i * o - n),
          (a[2] = -o),
          (a[6] = s * c),
          (a[10] = h * c))
        : "YZX" === e.order
        ? ((r = h * c),
          (t = h * o),
          (i = s * c),
          (n = s * o),
          (a[0] = c * d),
          (a[4] = n - r * l),
          (a[8] = i * l + t),
          (a[1] = l),
          (a[5] = h * d),
          (a[9] = -s * d),
          (a[2] = -o * d),
          (a[6] = t * l + i),
          (a[10] = r - n * l))
        : "XZY" === e.order &&
          ((t = h * c),
          (i = h * o),
          (r = s * c),
          (n = s * o),
          (a[0] = c * d),
          (a[4] = -l),
          (a[8] = o * d),
          (a[1] = t * l + n),
          (a[5] = h * d),
          (a[9] = i * l - r),
          (a[2] = r * l - i),
          (a[6] = s * d),
          (a[10] = n * l + t)),
      (a[3] = 0),
      (a[7] = 0),
      (a[11] = 0),
      (a[12] = 0),
      (a[13] = 0),
      (a[14] = 0),
      (a[15] = 1),
      this
    );
  }
  makeRotationFromQuaternion(e) {
    return this.compose(_zero, e, _one);
  }
  lookAt(e, t, i) {
    var r = this.elements;
    return (
      _z.subVectors(e, t),
      0 === _z.lengthSq() && (_z.z = 1),
      _z.normalize(),
      _x.crossVectors(i, _z),
      0 === _x.lengthSq() &&
        (1 === Math.abs(i.z) ? (_z.x += 1e-4) : (_z.z += 1e-4),
        _z.normalize(),
        _x.crossVectors(i, _z)),
      _x.normalize(),
      _y.crossVectors(_z, _x),
      (r[0] = _x.x),
      (r[4] = _y.x),
      (r[8] = _z.x),
      (r[1] = _x.y),
      (r[5] = _y.y),
      (r[9] = _z.y),
      (r[2] = _x.z),
      (r[6] = _y.z),
      (r[10] = _z.z),
      this
    );
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    var e = e.elements,
      t = t.elements,
      i = this.elements,
      r = e[0],
      n = e[4],
      a = e[8],
      s = e[12],
      o = e[1],
      l = e[5],
      h = e[9],
      c = e[13],
      d = e[2],
      u = e[6],
      p = e[10],
      m = e[14],
      f = e[3],
      g = e[7],
      _ = e[11],
      e = e[15],
      v = t[0],
      x = t[4],
      y = t[8],
      S = t[12],
      M = t[1],
      T = t[5],
      E = t[9],
      b = t[13],
      R = t[2],
      A = t[6],
      w = t[10],
      L = t[14],
      C = t[3],
      P = t[7],
      I = t[11],
      t = t[15];
    return (
      (i[0] = r * v + n * M + a * R + s * C),
      (i[4] = r * x + n * T + a * A + s * P),
      (i[8] = r * y + n * E + a * w + s * I),
      (i[12] = r * S + n * b + a * L + s * t),
      (i[1] = o * v + l * M + h * R + c * C),
      (i[5] = o * x + l * T + h * A + c * P),
      (i[9] = o * y + l * E + h * w + c * I),
      (i[13] = o * S + l * b + h * L + c * t),
      (i[2] = d * v + u * M + p * R + m * C),
      (i[6] = d * x + u * T + p * A + m * P),
      (i[10] = d * y + u * E + p * w + m * I),
      (i[14] = d * S + u * b + p * L + m * t),
      (i[3] = f * v + g * M + _ * R + e * C),
      (i[7] = f * x + g * T + _ * A + e * P),
      (i[11] = f * y + g * E + _ * w + e * I),
      (i[15] = f * S + g * b + _ * L + e * t),
      this
    );
  }
  multiplyScalar(e) {
    var t = this.elements;
    return (
      (t[0] *= e),
      (t[4] *= e),
      (t[8] *= e),
      (t[12] *= e),
      (t[1] *= e),
      (t[5] *= e),
      (t[9] *= e),
      (t[13] *= e),
      (t[2] *= e),
      (t[6] *= e),
      (t[10] *= e),
      (t[14] *= e),
      (t[3] *= e),
      (t[7] *= e),
      (t[11] *= e),
      (t[15] *= e),
      this
    );
  }
  determinant() {
    var e = this.elements,
      t = e[0],
      i = e[4],
      r = e[8],
      n = e[12],
      a = e[1],
      s = e[5],
      o = e[9],
      l = e[13],
      h = e[2],
      c = e[6],
      d = e[10],
      u = e[14];
    return (
      e[3] *
        (+n * o * c -
          r * l * c -
          n * s * d +
          i * l * d +
          r * s * u -
          i * o * u) +
      e[7] *
        (+t * o * u -
          t * l * d +
          n * a * d -
          r * a * u +
          r * l * h -
          n * o * h) +
      e[11] *
        (+t * l * c -
          t * s * u -
          n * a * c +
          i * a * u +
          n * s * h -
          i * l * h) +
      e[15] *
        (-r * s * h - t * o * c + t * s * d + r * a * c - i * a * d + i * o * h)
    );
  }
  transpose() {
    var e = this.elements,
      t = e[1];
    return (
      (e[1] = e[4]),
      (e[4] = t),
      (t = e[2]),
      (e[2] = e[8]),
      (e[8] = t),
      (t = e[6]),
      (e[6] = e[9]),
      (e[9] = t),
      (t = e[3]),
      (e[3] = e[12]),
      (e[12] = t),
      (t = e[7]),
      (e[7] = e[13]),
      (e[13] = t),
      (t = e[11]),
      (e[11] = e[14]),
      (e[14] = t),
      this
    );
  }
  setPosition(e, t, i) {
    var r = this.elements;
    return (
      e.isVector3
        ? ((r[12] = e.x), (r[13] = e.y), (r[14] = e.z))
        : ((r[12] = e), (r[13] = t), (r[14] = i)),
      this
    );
  }
  invert() {
    var e = this.elements,
      t = e[0],
      i = e[1],
      r = e[2],
      n = e[3],
      a = e[4],
      s = e[5],
      o = e[6],
      l = e[7],
      h = e[8],
      c = e[9],
      d = e[10],
      u = e[11],
      p = e[12],
      m = e[13],
      f = e[14],
      g = e[15],
      _ = c * f * l - m * d * l + m * o * u - s * f * u - c * o * g + s * d * g,
      v = p * d * l - h * f * l - p * o * u + a * f * u + h * o * g - a * d * g,
      x = h * m * l - p * c * l + p * s * u - a * m * u - h * s * g + a * c * g,
      y = p * c * o - h * m * o - p * s * d + a * m * d + h * s * f - a * c * f,
      S = t * _ + i * v + r * x + n * y;
    return 0 == S
      ? this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
      : ((e[0] = _ * (_ = 1 / S)),
        (e[1] =
          (m * d * n -
            c * f * n -
            m * r * u +
            i * f * u +
            c * r * g -
            i * d * g) *
          _),
        (e[2] =
          (s * f * n -
            m * o * n +
            m * r * l -
            i * f * l -
            s * r * g +
            i * o * g) *
          _),
        (e[3] =
          (c * o * n -
            s * d * n -
            c * r * l +
            i * d * l +
            s * r * u -
            i * o * u) *
          _),
        (e[4] = v * _),
        (e[5] =
          (h * f * n -
            p * d * n +
            p * r * u -
            t * f * u -
            h * r * g +
            t * d * g) *
          _),
        (e[6] =
          (p * o * n -
            a * f * n -
            p * r * l +
            t * f * l +
            a * r * g -
            t * o * g) *
          _),
        (e[7] =
          (a * d * n -
            h * o * n +
            h * r * l -
            t * d * l -
            a * r * u +
            t * o * u) *
          _),
        (e[8] = x * _),
        (e[9] =
          (p * c * n -
            h * m * n -
            p * i * u +
            t * m * u +
            h * i * g -
            t * c * g) *
          _),
        (e[10] =
          (a * m * n -
            p * s * n +
            p * i * l -
            t * m * l -
            a * i * g +
            t * s * g) *
          _),
        (e[11] =
          (h * s * n -
            a * c * n -
            h * i * l +
            t * c * l +
            a * i * u -
            t * s * u) *
          _),
        (e[12] = y * _),
        (e[13] =
          (h * m * r -
            p * c * r +
            p * i * d -
            t * m * d -
            h * i * f +
            t * c * f) *
          _),
        (e[14] =
          (p * s * r -
            a * m * r -
            p * i * o +
            t * m * o +
            a * i * f -
            t * s * f) *
          _),
        (e[15] =
          (a * c * r -
            h * s * r +
            h * i * o -
            t * c * o -
            a * i * d +
            t * s * d) *
          _),
        this);
  }
  scale(e) {
    var t = this.elements,
      i = e.x,
      r = e.y,
      e = e.z;
    return (
      (t[0] *= i),
      (t[4] *= r),
      (t[8] *= e),
      (t[1] *= i),
      (t[5] *= r),
      (t[9] *= e),
      (t[2] *= i),
      (t[6] *= r),
      (t[10] *= e),
      (t[3] *= i),
      (t[7] *= r),
      (t[11] *= e),
      this
    );
  }
  getMaxScaleOnAxis() {
    var e = this.elements,
      t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2];
    return Math.sqrt(
      Math.max(
        t,
        e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
        e[8] * e[8] + e[9] * e[9] + e[10] * e[10]
      )
    );
  }
  makeTranslation(e, t, i) {
    return (
      e.isVector3
        ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1)
        : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1),
      this
    );
  }
  makeRotationX(e) {
    var t = Math.cos(e),
      e = Math.sin(e);
    return this.set(1, 0, 0, 0, 0, t, -e, 0, 0, e, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(e) {
    var t = Math.cos(e),
      e = Math.sin(e);
    return this.set(t, 0, e, 0, 0, 1, 0, 0, -e, 0, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(e) {
    var t = Math.cos(e),
      e = Math.sin(e);
    return this.set(t, -e, 0, 0, e, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(e, t) {
    var i = Math.cos(t),
      t = Math.sin(t),
      r = 1 - i,
      n = e.x,
      a = e.y,
      e = e.z,
      s = r * n,
      o = r * a;
    return (
      this.set(
        s * n + i,
        s * a - t * e,
        s * e + t * a,
        0,
        s * a + t * e,
        o * a + i,
        o * e - t * n,
        0,
        s * e - t * a,
        o * e + t * n,
        r * e * e + i,
        0,
        0,
        0,
        0,
        1
      ),
      this
    );
  }
  makeScale(e, t, i) {
    return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
  }
  makeShear(e, t, i, r, n, a) {
    return this.set(1, i, n, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(e, t, i) {
    var r = this.elements,
      n = t._x,
      a = t._y,
      s = t._z,
      t = t._w,
      o = n + n,
      l = a + a,
      h = s + s,
      c = n * o,
      d = n * l,
      n = n * h,
      u = a * l,
      a = a * h,
      s = s * h,
      o = t * o,
      l = t * l,
      t = t * h,
      h = i.x,
      p = i.y,
      i = i.z;
    return (
      (r[0] = (1 - (u + s)) * h),
      (r[1] = (d + t) * h),
      (r[2] = (n - l) * h),
      (r[3] = 0),
      (r[4] = (d - t) * p),
      (r[5] = (1 - (c + s)) * p),
      (r[6] = (a + o) * p),
      (r[7] = 0),
      (r[8] = (n + l) * i),
      (r[9] = (a - o) * i),
      (r[10] = (1 - (c + u)) * i),
      (r[11] = 0),
      (r[12] = e.x),
      (r[13] = e.y),
      (r[14] = e.z),
      (r[15] = 1),
      this
    );
  }
  decompose(e, t, i) {
    var r = this.elements;
    let n = _v1$5.set(r[0], r[1], r[2]).length();
    var a = _v1$5.set(r[4], r[5], r[6]).length(),
      s = _v1$5.set(r[8], r[9], r[10]).length(),
      e =
        (this.determinant() < 0 && (n = -n),
        (e.x = r[12]),
        (e.y = r[13]),
        (e.z = r[14]),
        _m1$4.copy(this),
        1 / n),
      r = 1 / a,
      o = 1 / s;
    return (
      (_m1$4.elements[0] *= e),
      (_m1$4.elements[1] *= e),
      (_m1$4.elements[2] *= e),
      (_m1$4.elements[4] *= r),
      (_m1$4.elements[5] *= r),
      (_m1$4.elements[6] *= r),
      (_m1$4.elements[8] *= o),
      (_m1$4.elements[9] *= o),
      (_m1$4.elements[10] *= o),
      t.setFromRotationMatrix(_m1$4),
      (i.x = n),
      (i.y = a),
      (i.z = s),
      this
    );
  }
  makePerspective(e, t, i, r, n, a, s = WebGLCoordinateSystem) {
    var o = this.elements,
      l = (2 * n) / (t - e),
      h = (2 * n) / (i - r),
      t = (t + e) / (t - e),
      e = (i + r) / (i - r);
    let c, d;
    if (s === WebGLCoordinateSystem)
      (c = -(a + n) / (a - n)), (d = (-2 * a * n) / (a - n));
    else {
      if (s !== WebGPUCoordinateSystem)
        throw new Error(
          "THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s
        );
      (c = -a / (a - n)), (d = (-a * n) / (a - n));
    }
    return (
      (o[0] = l),
      (o[4] = 0),
      (o[8] = t),
      (o[12] = 0),
      (o[1] = 0),
      (o[5] = h),
      (o[9] = e),
      (o[13] = 0),
      (o[2] = 0),
      (o[6] = 0),
      (o[10] = c),
      (o[14] = d),
      (o[3] = 0),
      (o[7] = 0),
      (o[11] = -1),
      (o[15] = 0),
      this
    );
  }
  makeOrthographic(e, t, i, r, n, a, s = WebGLCoordinateSystem) {
    var o = this.elements,
      l = 1 / (t - e),
      h = 1 / (i - r),
      c = 1 / (a - n),
      t = (t + e) * l,
      e = (i + r) * h;
    let d, u;
    if (s === WebGLCoordinateSystem) (d = (a + n) * c), (u = -2 * c);
    else {
      if (s !== WebGPUCoordinateSystem)
        throw new Error(
          "THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s
        );
      (d = n * c), (u = -1 * c);
    }
    return (
      (o[0] = 2 * l),
      (o[4] = 0),
      (o[8] = 0),
      (o[12] = -t),
      (o[1] = 0),
      (o[5] = 2 * h),
      (o[9] = 0),
      (o[13] = -e),
      (o[2] = 0),
      (o[6] = 0),
      (o[10] = u),
      (o[14] = -d),
      (o[3] = 0),
      (o[7] = 0),
      (o[11] = 0),
      (o[15] = 1),
      this
    );
  }
  equals(e) {
    var t = this.elements,
      i = e.elements;
    for (let e = 0; e < 16; e++) if (t[e] !== i[e]) return !1;
    return !0;
  }
  fromArray(t, i = 0) {
    for (let e = 0; e < 16; e++) this.elements[e] = t[e + i];
    return this;
  }
  toArray(e = [], t = 0) {
    var i = this.elements;
    return (
      (e[t] = i[0]),
      (e[t + 1] = i[1]),
      (e[t + 2] = i[2]),
      (e[t + 3] = i[3]),
      (e[t + 4] = i[4]),
      (e[t + 5] = i[5]),
      (e[t + 6] = i[6]),
      (e[t + 7] = i[7]),
      (e[t + 8] = i[8]),
      (e[t + 9] = i[9]),
      (e[t + 10] = i[10]),
      (e[t + 11] = i[11]),
      (e[t + 12] = i[12]),
      (e[t + 13] = i[13]),
      (e[t + 14] = i[14]),
      (e[t + 15] = i[15]),
      e
    );
  }
}
let _v1$5 = new Vector3(),
  _m1$4 = new Matrix4(),
  _zero = new Vector3(0, 0, 0),
  _one = new Vector3(1, 1, 1),
  _x = new Vector3(),
  _y = new Vector3(),
  _z = new Vector3(),
  _matrix$2 = new Matrix4(),
  _quaternion$3 = new Quaternion();
class Euler {
  constructor(e = 0, t = 0, i = 0, r = Euler.DEFAULT_ORDER) {
    (this.isEuler = !0),
      (this._x = e),
      (this._y = t),
      (this._z = i),
      (this._order = r);
  }
  get x() {
    return this._x;
  }
  set x(e) {
    (this._x = e), this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    (this._y = e), this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    (this._z = e), this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    (this._order = e), this._onChangeCallback();
  }
  set(e, t, i, r = this._order) {
    return (
      (this._x = e),
      (this._y = t),
      (this._z = i),
      (this._order = r),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return (
      (this._x = e._x),
      (this._y = e._y),
      (this._z = e._z),
      (this._order = e._order),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e, t = this._order, i = !0) {
    var e = e.elements,
      r = e[0],
      n = e[4],
      a = e[8],
      s = e[1],
      o = e[5],
      l = e[9],
      h = e[2],
      c = e[6],
      d = e[10];
    switch (t) {
      case "XYZ":
        (this._y = Math.asin(clamp(a, -1, 1))),
          Math.abs(a) < 0.9999999
            ? ((this._x = Math.atan2(-l, d)), (this._z = Math.atan2(-n, r)))
            : ((this._x = Math.atan2(c, o)), (this._z = 0));
        break;
      case "YXZ":
        (this._x = Math.asin(-clamp(l, -1, 1))),
          Math.abs(l) < 0.9999999
            ? ((this._y = Math.atan2(a, d)), (this._z = Math.atan2(s, o)))
            : ((this._y = Math.atan2(-h, r)), (this._z = 0));
        break;
      case "ZXY":
        (this._x = Math.asin(clamp(c, -1, 1))),
          Math.abs(c) < 0.9999999
            ? ((this._y = Math.atan2(-h, d)), (this._z = Math.atan2(-n, o)))
            : ((this._y = 0), (this._z = Math.atan2(s, r)));
        break;
      case "ZYX":
        (this._y = Math.asin(-clamp(h, -1, 1))),
          Math.abs(h) < 0.9999999
            ? ((this._x = Math.atan2(c, d)), (this._z = Math.atan2(s, r)))
            : ((this._x = 0), (this._z = Math.atan2(-n, o)));
        break;
      case "YZX":
        (this._z = Math.asin(clamp(s, -1, 1))),
          Math.abs(s) < 0.9999999
            ? ((this._x = Math.atan2(-l, o)), (this._y = Math.atan2(-h, r)))
            : ((this._x = 0), (this._y = Math.atan2(a, d)));
        break;
      case "XZY":
        (this._z = Math.asin(-clamp(n, -1, 1))),
          Math.abs(n) < 0.9999999
            ? ((this._x = Math.atan2(c, o)), (this._y = Math.atan2(a, r)))
            : ((this._x = Math.atan2(-l, d)), (this._y = 0));
        break;
      default:
        console.warn(
          "THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " +
            t
        );
    }
    return (this._order = t), !0 === i && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, i) {
    return (
      _matrix$2.makeRotationFromQuaternion(e),
      this.setFromRotationMatrix(_matrix$2, t, i)
    );
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return (
      _quaternion$3.setFromEuler(this), this.setFromQuaternion(_quaternion$3, e)
    );
  }
  equals(e) {
    return (
      e._x === this._x &&
      e._y === this._y &&
      e._z === this._z &&
      e._order === this._order
    );
  }
  fromArray(e) {
    return (
      (this._x = e[0]),
      (this._y = e[1]),
      (this._z = e[2]),
      void 0 !== e[3] && (this._order = e[3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(e = [], t = 0) {
    return (
      (e[t] = this._x),
      (e[t + 1] = this._y),
      (e[t + 2] = this._z),
      (e[t + 3] = this._order),
      e
    );
  }
  _onChange(e) {
    return (this._onChangeCallback = e), this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Euler.DEFAULT_ORDER = "XYZ";
class Layers {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = ((1 << e) | 0) >>> 0;
  }
  enable(e) {
    this.mask |= (1 << e) | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= (1 << e) | 0;
  }
  disable(e) {
    this.mask &= ~((1 << e) | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return 0 != (this.mask & e.mask);
  }
  isEnabled(e) {
    return 0 != (this.mask & ((1 << e) | 0));
  }
}
let _object3DId = 0,
  _v1$4 = new Vector3(),
  _q1 = new Quaternion(),
  _m1$3 = new Matrix4(),
  _target = new Vector3(),
  _position$3 = new Vector3(),
  _scale$2 = new Vector3(),
  _quaternion$2 = new Quaternion(),
  _xAxis = new Vector3(1, 0, 0),
  _yAxis = new Vector3(0, 1, 0),
  _zAxis = new Vector3(0, 0, 1),
  _addedEvent = { type: "added" },
  _removedEvent = { type: "removed" },
  _childaddedEvent = { type: "childadded", child: null },
  _childremovedEvent = { type: "childremoved", child: null };
class Object3D extends EventDispatcher {
  constructor() {
    super(),
      (this.isObject3D = !0),
      Object.defineProperty(this, "id", { value: _object3DId++ }),
      (this.uuid = generateUUID()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = Object3D.DEFAULT_UP.clone());
    var e = new Vector3();
    let t = new Euler(),
      i = new Quaternion();
    var r = new Vector3(1, 1, 1);
    t._onChange(function () {
      i.setFromEuler(t, !1);
    }),
      i._onChange(function () {
        t.setFromQuaternion(i, void 0, !1);
      }),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: e },
        rotation: { configurable: !0, enumerable: !0, value: t },
        quaternion: { configurable: !0, enumerable: !0, value: i },
        scale: { configurable: !0, enumerable: !0, value: r },
        modelViewMatrix: { value: new Matrix4() },
        normalMatrix: { value: new Matrix3() },
      }),
      (this.matrix = new Matrix4()),
      (this.matrixWorld = new Matrix4()),
      (this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldAutoUpdate = Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new Layers()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.userData = {});
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(),
      this.matrix.premultiply(e),
      this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return _q1.setFromAxisAngle(e, t), this.quaternion.multiply(_q1), this;
  }
  rotateOnWorldAxis(e, t) {
    return _q1.setFromAxisAngle(e, t), this.quaternion.premultiply(_q1), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(_xAxis, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(_yAxis, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(_zAxis, e);
  }
  translateOnAxis(e, t) {
    return (
      _v1$4.copy(e).applyQuaternion(this.quaternion),
      this.position.add(_v1$4.multiplyScalar(t)),
      this
    );
  }
  translateX(e) {
    return this.translateOnAxis(_xAxis, e);
  }
  translateY(e) {
    return this.translateOnAxis(_yAxis, e);
  }
  translateZ(e) {
    return this.translateOnAxis(_zAxis, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      e.applyMatrix4(_m1$3.copy(this.matrixWorld).invert())
    );
  }
  lookAt(e, t, i) {
    e.isVector3 ? _target.copy(e) : _target.set(e, t, i);
    e = this.parent;
    this.updateWorldMatrix(!0, !1),
      _position$3.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight
        ? _m1$3.lookAt(_position$3, _target, this.up)
        : _m1$3.lookAt(_target, _position$3, this.up),
      this.quaternion.setFromRotationMatrix(_m1$3),
      e &&
        (_m1$3.extractRotation(e.matrixWorld),
        _q1.setFromRotationMatrix(_m1$3),
        this.quaternion.premultiply(_q1.invert()));
  }
  add(e) {
    if (1 < arguments.length)
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
    else
      e === this
        ? console.error(
            "THREE.Object3D.add: object can't be added as a child of itself.",
            e
          )
        : e && e.isObject3D
        ? (e.removeFromParent(),
          (e.parent = this).children.push(e),
          e.dispatchEvent(_addedEvent),
          (_childaddedEvent.child = e),
          this.dispatchEvent(_childaddedEvent),
          (_childaddedEvent.child = null))
        : console.error(
            "THREE.Object3D.add: object not an instance of THREE.Object3D.",
            e
          );
    return this;
  }
  remove(e) {
    if (1 < arguments.length)
      for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
    else {
      var t = this.children.indexOf(e);
      -1 !== t &&
        ((e.parent = null),
        this.children.splice(t, 1),
        e.dispatchEvent(_removedEvent),
        (_childremovedEvent.child = e),
        this.dispatchEvent(_childremovedEvent),
        (_childremovedEvent.child = null));
    }
    return this;
  }
  removeFromParent() {
    var e = this.parent;
    return null !== e && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      _m1$3.copy(this.matrixWorld).invert(),
      null !== e.parent &&
        (e.parent.updateWorldMatrix(!0, !1),
        _m1$3.multiply(e.parent.matrixWorld)),
      e.applyMatrix4(_m1$3),
      e.removeFromParent(),
      (e.parent = this).children.push(e),
      e.updateWorldMatrix(!1, !0),
      e.dispatchEvent(_addedEvent),
      (_childaddedEvent.child = e),
      this.dispatchEvent(_childaddedEvent),
      (_childaddedEvent.child = null),
      this
    );
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(i, r) {
    if (this[i] === r) return this;
    for (let e = 0, t = this.children.length; e < t; e++) {
      var n = this.children[e].getObjectByProperty(i, r);
      if (void 0 !== n) return n;
    }
  }
  getObjectsByProperty(i, r, n = []) {
    this[i] === r && n.push(this);
    var a = this.children;
    for (let e = 0, t = a.length; e < t; e++)
      a[e].getObjectsByProperty(i, r, n);
    return n;
  }
  getWorldPosition(e) {
    return (
      this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld)
    );
  }
  getWorldQuaternion(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(_position$3, e, _scale$2),
      e
    );
  }
  getWorldScale(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(_position$3, _quaternion$2, e),
      e
    );
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    var t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {}
  traverse(i) {
    i(this);
    var r = this.children;
    for (let e = 0, t = r.length; e < t; e++) r[e].traverse(i);
  }
  traverseVisible(i) {
    if (!1 !== this.visible) {
      i(this);
      var r = this.children;
      for (let e = 0, t = r.length; e < t; e++) r[e].traverseVisible(i);
    }
  }
  traverseAncestors(e) {
    var t = this.parent;
    null !== t && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale),
      (this.matrixWorldNeedsUpdate = !0);
  }
  updateMatrixWorld(i) {
    this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || i) &&
        (null === this.parent
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(
              this.parent.matrixWorld,
              this.matrix
            ),
        (i = !(this.matrixWorldNeedsUpdate = !1)));
    var r = this.children;
    for (let e = 0, t = r.length; e < t; e++) {
      var n = r[e];
      (!0 !== n.matrixWorldAutoUpdate && !0 !== i) || n.updateMatrixWorld(i);
    }
  }
  updateWorldMatrix(e, t) {
    var i = this.parent;
    if (
      (!0 === e &&
        null !== i &&
        !0 === i.matrixWorldAutoUpdate &&
        i.updateWorldMatrix(!0, !1),
      this.matrixAutoUpdate && this.updateMatrix(),
      null === this.parent
        ? this.matrixWorld.copy(this.matrix)
        : this.matrixWorld.multiplyMatrices(
            this.parent.matrixWorld,
            this.matrix
          ),
      !0 === t)
    ) {
      var r = this.children;
      for (let e = 0, t = r.length; e < t; e++) {
        var n = r[e];
        !0 === n.matrixWorldAutoUpdate && n.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(i) {
    var e,
      t,
      r,
      n,
      a,
      s,
      o = void 0 === i || "string" == typeof i,
      l = {},
      h =
        (o &&
          ((i = {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            shapes: {},
            skeletons: {},
            animations: {},
            nodes: {},
          }),
          (l.metadata = {
            version: 4.6,
            type: "Object",
            generator: "Object3D.toJSON",
          })),
        {});
    function c(e, t) {
      return void 0 === e[t.uuid] && (e[t.uuid] = t.toJSON(i)), t.uuid;
    }
    if (
      ((h.uuid = this.uuid),
      (h.type = this.type),
      "" !== this.name && (h.name = this.name),
      !0 === this.castShadow && (h.castShadow = !0),
      !0 === this.receiveShadow && (h.receiveShadow = !0),
      !1 === this.visible && (h.visible = !1),
      !1 === this.frustumCulled && (h.frustumCulled = !1),
      0 !== this.renderOrder && (h.renderOrder = this.renderOrder),
      0 < Object.keys(this.userData).length && (h.userData = this.userData),
      (h.layers = this.layers.mask),
      (h.matrix = this.matrix.toArray()),
      (h.up = this.up.toArray()),
      !1 === this.matrixAutoUpdate && (h.matrixAutoUpdate = !1),
      this.isInstancedMesh &&
        ((h.type = "InstancedMesh"),
        (h.count = this.count),
        (h.instanceMatrix = this.instanceMatrix.toJSON()),
        null !== this.instanceColor) &&
        (h.instanceColor = this.instanceColor.toJSON()),
      this.isBatchedMesh &&
        ((h.type = "BatchedMesh"),
        (h.perObjectFrustumCulled = this.perObjectFrustumCulled),
        (h.sortObjects = this.sortObjects),
        (h.drawRanges = this._drawRanges),
        (h.reservedRanges = this._reservedRanges),
        (h.visibility = this._visibility),
        (h.active = this._active),
        (h.bounds = this._bounds.map((e) => ({
          boxInitialized: e.boxInitialized,
          boxMin: e.box.min.toArray(),
          boxMax: e.box.max.toArray(),
          sphereInitialized: e.sphereInitialized,
          sphereRadius: e.sphere.radius,
          sphereCenter: e.sphere.center.toArray(),
        }))),
        (h.maxGeometryCount = this._maxGeometryCount),
        (h.maxVertexCount = this._maxVertexCount),
        (h.maxIndexCount = this._maxIndexCount),
        (h.geometryInitialized = this._geometryInitialized),
        (h.geometryCount = this._geometryCount),
        (h.matricesTexture = this._matricesTexture.toJSON(i)),
        null !== this.boundingSphere &&
          (h.boundingSphere = {
            center: h.boundingSphere.center.toArray(),
            radius: h.boundingSphere.radius,
          }),
        null !== this.boundingBox) &&
        (h.boundingBox = {
          min: h.boundingBox.min.toArray(),
          max: h.boundingBox.max.toArray(),
        }),
      this.isScene)
    )
      this.background &&
        (this.background.isColor
          ? (h.background = this.background.toJSON())
          : this.background.isTexture &&
            (h.background = this.background.toJSON(i).uuid)),
        this.environment &&
          this.environment.isTexture &&
          !0 !== this.environment.isRenderTargetTexture &&
          (h.environment = this.environment.toJSON(i).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      h.geometry = c(i.geometries, this.geometry);
      var d = this.geometry.parameters;
      if (void 0 !== d && void 0 !== d.shapes) {
        var u = d.shapes;
        if (Array.isArray(u))
          for (let e = 0, t = u.length; e < t; e++) {
            var p = u[e];
            c(i.shapes, p);
          }
        else c(i.shapes, u);
      }
    }
    if (
      (this.isSkinnedMesh &&
        ((h.bindMode = this.bindMode),
        (h.bindMatrix = this.bindMatrix.toArray()),
        void 0 !== this.skeleton) &&
        (c(i.skeletons, this.skeleton), (h.skeleton = this.skeleton.uuid)),
      void 0 !== this.material)
    )
      if (Array.isArray(this.material)) {
        var m = [];
        for (let e = 0, t = this.material.length; e < t; e++)
          m.push(c(i.materials, this.material[e]));
        h.material = m;
      } else h.material = c(i.materials, this.material);
    if (0 < this.children.length) {
      h.children = [];
      for (let e = 0; e < this.children.length; e++)
        h.children.push(this.children[e].toJSON(i).object);
    }
    if (0 < this.animations.length) {
      h.animations = [];
      for (let e = 0; e < this.animations.length; e++) {
        var f = this.animations[e];
        h.animations.push(c(i.animations, f));
      }
    }
    return (
      o &&
        ((d = g(i.geometries)),
        (o = g(i.materials)),
        (e = g(i.textures)),
        (t = g(i.images)),
        (r = g(i.shapes)),
        (n = g(i.skeletons)),
        (a = g(i.animations)),
        (s = g(i.nodes)),
        0 < d.length && (l.geometries = d),
        0 < o.length && (l.materials = o),
        0 < e.length && (l.textures = e),
        0 < t.length && (l.images = t),
        0 < r.length && (l.shapes = r),
        0 < n.length && (l.skeletons = n),
        0 < a.length && (l.animations = a),
        0 < s.length) &&
        (l.nodes = s),
      (l.object = h),
      l
    );
    function g(e) {
      var t,
        i = [];
      for (t in e) {
        var r = e[t];
        delete r.metadata, i.push(r);
      }
      return i;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(t, e = !0) {
    if (
      ((this.name = t.name),
      this.up.copy(t.up),
      this.position.copy(t.position),
      (this.rotation.order = t.rotation.order),
      this.quaternion.copy(t.quaternion),
      this.scale.copy(t.scale),
      this.matrix.copy(t.matrix),
      this.matrixWorld.copy(t.matrixWorld),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
      (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
      (this.layers.mask = t.layers.mask),
      (this.visible = t.visible),
      (this.castShadow = t.castShadow),
      (this.receiveShadow = t.receiveShadow),
      (this.frustumCulled = t.frustumCulled),
      (this.renderOrder = t.renderOrder),
      (this.animations = t.animations.slice()),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      !0 === e)
    )
      for (let e = 0; e < t.children.length; e++) {
        var i = t.children[e];
        this.add(i.clone());
      }
    return this;
  }
}
(Object3D.DEFAULT_UP = new Vector3(0, 1, 0)),
  (Object3D.DEFAULT_MATRIX_AUTO_UPDATE = !0),
  (Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0);
let _v0$1 = new Vector3(),
  _v1$3 = new Vector3(),
  _v2$2 = new Vector3(),
  _v3$2 = new Vector3(),
  _vab = new Vector3(),
  _vac = new Vector3(),
  _vbc = new Vector3(),
  _vap = new Vector3(),
  _vbp = new Vector3(),
  _vcp = new Vector3();
class Triangle {
  constructor(e = new Vector3(), t = new Vector3(), i = new Vector3()) {
    (this.a = e), (this.b = t), (this.c = i);
  }
  static getNormal(e, t, i, r) {
    r.subVectors(i, t), _v0$1.subVectors(e, t), r.cross(_v0$1);
    i = r.lengthSq();
    return 0 < i ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0);
  }
  static getBarycoord(e, t, i, r, n) {
    _v0$1.subVectors(r, t), _v1$3.subVectors(i, t), _v2$2.subVectors(e, t);
    var r = _v0$1.dot(_v0$1),
      i = _v0$1.dot(_v1$3),
      e = _v0$1.dot(_v2$2),
      t = _v1$3.dot(_v1$3),
      a = _v1$3.dot(_v2$2),
      s = r * t - i * i;
    return 0 == s
      ? (n.set(0, 0, 0), null)
      : n.set(
          1 - (t = (t * e - i * a) * (n = 1 / s)) - (s = (r * a - i * e) * n),
          s,
          t
        );
  }
  static containsPoint(e, t, i, r) {
    return (
      null !== this.getBarycoord(e, t, i, r, _v3$2) &&
      0 <= _v3$2.x &&
      0 <= _v3$2.y &&
      _v3$2.x + _v3$2.y <= 1
    );
  }
  static getInterpolation(e, t, i, r, n, a, s, o) {
    return null === this.getBarycoord(e, t, i, r, _v3$2)
      ? ((o.x = 0),
        (o.y = 0),
        "z" in o && (o.z = 0),
        "w" in o && (o.w = 0),
        null)
      : (o.setScalar(0),
        o.addScaledVector(n, _v3$2.x),
        o.addScaledVector(a, _v3$2.y),
        o.addScaledVector(s, _v3$2.z),
        o);
  }
  static isFrontFacing(e, t, i, r) {
    return (
      _v0$1.subVectors(i, t),
      _v1$3.subVectors(e, t),
      _v0$1.cross(_v1$3).dot(r) < 0
    );
  }
  set(e, t, i) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(i), this;
  }
  setFromPointsAndIndices(e, t, i, r) {
    return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[r]), this;
  }
  setFromAttributeAndIndices(e, t, i, r) {
    return (
      this.a.fromBufferAttribute(e, t),
      this.b.fromBufferAttribute(e, i),
      this.c.fromBufferAttribute(e, r),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return (
      _v0$1.subVectors(this.c, this.b),
      _v1$3.subVectors(this.a, this.b),
      0.5 * _v0$1.cross(_v1$3).length()
    );
  }
  getMidpoint(e) {
    return e
      .addVectors(this.a, this.b)
      .add(this.c)
      .multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Triangle.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Triangle.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, i, r, n) {
    return Triangle.getInterpolation(e, this.a, this.b, this.c, t, i, r, n);
  }
  containsPoint(e) {
    return Triangle.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Triangle.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    var i = this.a,
      r = this.b,
      n = this.c;
    let a, s;
    _vab.subVectors(r, i), _vac.subVectors(n, i), _vap.subVectors(e, i);
    var o = _vab.dot(_vap),
      l = _vac.dot(_vap);
    if (o <= 0 && l <= 0) return t.copy(i);
    _vbp.subVectors(e, r);
    var h = _vab.dot(_vbp),
      c = _vac.dot(_vbp);
    if (0 <= h && c <= h) return t.copy(r);
    var d = o * c - h * l;
    if (d <= 0 && 0 <= o && h <= 0)
      return (a = o / (o - h)), t.copy(i).addScaledVector(_vab, a);
    _vcp.subVectors(e, n);
    var e = _vab.dot(_vcp),
      u = _vac.dot(_vcp);
    return 0 <= u && e <= u
      ? t.copy(n)
      : (o = e * l - o * u) <= 0 && 0 <= l && u <= 0
      ? ((s = l / (l - u)), t.copy(i).addScaledVector(_vac, s))
      : (l = h * u - e * c) <= 0 && 0 <= c - h && 0 <= e - u
      ? (_vbc.subVectors(n, r),
        (s = (c - h) / (c - h + (e - u))),
        t.copy(r).addScaledVector(_vbc, s))
      : ((n = 1 / (l + o + d)),
        (a = o * n),
        (s = d * n),
        t.copy(i).addScaledVector(_vab, a).addScaledVector(_vac, s));
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
let _colorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  _hslA = { h: 0, s: 0, l: 0 },
  _hslB = { h: 0, s: 0, l: 0 };
function hue2rgb(e, t, i) {
  return (
    i < 0 && (i += 1),
    1 < i && --i,
    i < 1 / 6
      ? e + 6 * (t - e) * i
      : i < 0.5
      ? t
      : i < 2 / 3
      ? e + 6 * (t - e) * (2 / 3 - i)
      : e
  );
}
class Color {
  constructor(e, t, i) {
    return (
      (this.isColor = !0),
      (this.r = 1),
      (this.g = 1),
      (this.b = 1),
      this.set(e, t, i)
    );
  }
  set(e, t, i) {
    var r;
    return (
      void 0 === t && void 0 === i
        ? (r = e) && r.isColor
          ? this.copy(r)
          : "number" == typeof r
          ? this.setHex(r)
          : "string" == typeof r && this.setStyle(r)
        : this.setRGB(e, t, i),
      this
    );
  }
  setScalar(e) {
    return (this.r = e), (this.g = e), (this.b = e), this;
  }
  setHex(e, t = SRGBColorSpace) {
    return (
      (e = Math.floor(e)),
      (this.r = ((e >> 16) & 255) / 255),
      (this.g = ((e >> 8) & 255) / 255),
      (this.b = (255 & e) / 255),
      ColorManagement.toWorkingColorSpace(this, t),
      this
    );
  }
  setRGB(e, t, i, r = ColorManagement.workingColorSpace) {
    return (
      (this.r = e),
      (this.g = t),
      (this.b = i),
      ColorManagement.toWorkingColorSpace(this, r),
      this
    );
  }
  setHSL(e, t, i, r = ColorManagement.workingColorSpace) {
    return (
      (e = euclideanModulo(e, 1)),
      (t = clamp(t, 0, 1)),
      (i = clamp(i, 0, 1)),
      0 === t
        ? (this.r = this.g = this.b = i)
        : ((this.r = hue2rgb(
            (t = 2 * i - (i = i <= 0.5 ? i * (1 + t) : i + t - i * t)),
            i,
            e + 1 / 3
          )),
          (this.g = hue2rgb(t, i, e)),
          (this.b = hue2rgb(t, i, e - 1 / 3))),
      ColorManagement.toWorkingColorSpace(this, r),
      this
    );
  }
  setStyle(t, i = SRGBColorSpace) {
    function r(e) {
      void 0 !== e &&
        parseFloat(e) < 1 &&
        console.warn(
          "THREE.Color: Alpha component of " + t + " will be ignored."
        );
    }
    if ((s = /^(\w+)\(([^\)]*)\)/.exec(t))) {
      let e;
      var n = s[1],
        a = s[2];
      switch (n) {
        case "rgb":
        case "rgba":
          if (
            (e =
              /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                a
              ))
          )
            return (
              r(e[4]),
              this.setRGB(
                Math.min(255, parseInt(e[1], 10)) / 255,
                Math.min(255, parseInt(e[2], 10)) / 255,
                Math.min(255, parseInt(e[3], 10)) / 255,
                i
              )
            );
          if (
            (e =
              /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                a
              ))
          )
            return (
              r(e[4]),
              this.setRGB(
                Math.min(100, parseInt(e[1], 10)) / 100,
                Math.min(100, parseInt(e[2], 10)) / 100,
                Math.min(100, parseInt(e[3], 10)) / 100,
                i
              )
            );
          break;
        case "hsl":
        case "hsla":
          if (
            (e =
              /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                a
              ))
          )
            return (
              r(e[4]),
              this.setHSL(
                parseFloat(e[1]) / 360,
                parseFloat(e[2]) / 100,
                parseFloat(e[3]) / 100,
                i
              )
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if ((s = /^\#([A-Fa-f\d]+)$/.exec(t))) {
      var n = s[1],
        s = n.length;
      if (3 === s)
        return this.setRGB(
          parseInt(n.charAt(0), 16) / 15,
          parseInt(n.charAt(1), 16) / 15,
          parseInt(n.charAt(2), 16) / 15,
          i
        );
      if (6 === s) return this.setHex(parseInt(n, 16), i);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && 0 < t.length) return this.setColorName(t, i);
    return this;
  }
  setColorName(e, t = SRGBColorSpace) {
    var i = _colorKeywords[e.toLowerCase()];
    return (
      void 0 !== i
        ? this.setHex(i, t)
        : console.warn("THREE.Color: Unknown color " + e),
      this
    );
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return (this.r = e.r), (this.g = e.g), (this.b = e.b), this;
  }
  copySRGBToLinear(e) {
    return (
      (this.r = SRGBToLinear(e.r)),
      (this.g = SRGBToLinear(e.g)),
      (this.b = SRGBToLinear(e.b)),
      this
    );
  }
  copyLinearToSRGB(e) {
    return (
      (this.r = LinearToSRGB(e.r)),
      (this.g = LinearToSRGB(e.g)),
      (this.b = LinearToSRGB(e.b)),
      this
    );
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = SRGBColorSpace) {
    return (
      ColorManagement.fromWorkingColorSpace(_color.copy(this), e),
      65536 * Math.round(clamp(255 * _color.r, 0, 255)) +
        256 * Math.round(clamp(255 * _color.g, 0, 255)) +
        Math.round(clamp(255 * _color.b, 0, 255))
    );
  }
  getHexString(e = SRGBColorSpace) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = ColorManagement.workingColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color.copy(this), t);
    var i = _color.r,
      r = _color.g,
      n = _color.b,
      t = Math.max(i, r, n),
      a = Math.min(i, r, n);
    let s, o;
    var l = (a + t) / 2;
    if (a === t) (s = 0), (o = 0);
    else {
      var h = t - a;
      switch (((o = l <= 0.5 ? h / (t + a) : h / (2 - t - a)), t)) {
        case i:
          s = (r - n) / h + (r < n ? 6 : 0);
          break;
        case r:
          s = (n - i) / h + 2;
          break;
        case n:
          s = (i - r) / h + 4;
      }
      s /= 6;
    }
    return (e.h = s), (e.s = o), (e.l = l), e;
  }
  getRGB(e, t = ColorManagement.workingColorSpace) {
    return (
      ColorManagement.fromWorkingColorSpace(_color.copy(this), t),
      (e.r = _color.r),
      (e.g = _color.g),
      (e.b = _color.b),
      e
    );
  }
  getStyle(e = SRGBColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color.copy(this), e);
    var t = _color.r,
      i = _color.g,
      r = _color.b;
    return e !== SRGBColorSpace
      ? `color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`
      : `rgb(${Math.round(255 * t)},${Math.round(255 * i)},${Math.round(
          255 * r
        )})`;
  }
  offsetHSL(e, t, i) {
    return (
      this.getHSL(_hslA), this.setHSL(_hslA.h + e, _hslA.s + t, _hslA.l + i)
    );
  }
  add(e) {
    return (this.r += e.r), (this.g += e.g), (this.b += e.b), this;
  }
  addColors(e, t) {
    return (
      (this.r = e.r + t.r), (this.g = e.g + t.g), (this.b = e.b + t.b), this
    );
  }
  addScalar(e) {
    return (this.r += e), (this.g += e), (this.b += e), this;
  }
  sub(e) {
    return (
      (this.r = Math.max(0, this.r - e.r)),
      (this.g = Math.max(0, this.g - e.g)),
      (this.b = Math.max(0, this.b - e.b)),
      this
    );
  }
  multiply(e) {
    return (this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this;
  }
  multiplyScalar(e) {
    return (this.r *= e), (this.g *= e), (this.b *= e), this;
  }
  lerp(e, t) {
    return (
      (this.r += (e.r - this.r) * t),
      (this.g += (e.g - this.g) * t),
      (this.b += (e.b - this.b) * t),
      this
    );
  }
  lerpColors(e, t, i) {
    return (
      (this.r = e.r + (t.r - e.r) * i),
      (this.g = e.g + (t.g - e.g) * i),
      (this.b = e.b + (t.b - e.b) * i),
      this
    );
  }
  lerpHSL(e, t) {
    this.getHSL(_hslA), e.getHSL(_hslB);
    var e = lerp(_hslA.h, _hslB.h, t),
      i = lerp(_hslA.s, _hslB.s, t),
      t = lerp(_hslA.l, _hslB.l, t);
    return this.setHSL(e, i, t), this;
  }
  setFromVector3(e) {
    return (this.r = e.x), (this.g = e.y), (this.b = e.z), this;
  }
  applyMatrix3(e) {
    var t = this.r,
      i = this.g,
      r = this.b,
      e = e.elements;
    return (
      (this.r = e[0] * t + e[3] * i + e[6] * r),
      (this.g = e[1] * t + e[4] * i + e[7] * r),
      (this.b = e[2] * t + e[5] * i + e[8] * r),
      this
    );
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return (this.r = e[t]), (this.g = e[t + 1]), (this.b = e[t + 2]), this;
  }
  toArray(e = [], t = 0) {
    return (e[t] = this.r), (e[t + 1] = this.g), (e[t + 2] = this.b), e;
  }
  fromBufferAttribute(e, t) {
    return (
      (this.r = e.getX(t)), (this.g = e.getY(t)), (this.b = e.getZ(t)), this
    );
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
let _color = new Color(),
  _materialId = ((Color.NAMES = _colorKeywords), 0);
class Material extends EventDispatcher {
  constructor() {
    super(),
      (this.isMaterial = !0),
      Object.defineProperty(this, "id", { value: _materialId++ }),
      (this.uuid = generateUUID()),
      (this.name = ""),
      (this.type = "Material"),
      (this.blending = NormalBlending),
      (this.side = FrontSide),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.alphaHash = !1),
      (this.blendSrc = SrcAlphaFactor),
      (this.blendDst = OneMinusSrcAlphaFactor),
      (this.blendEquation = AddEquation),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.blendColor = new Color(0, 0, 0)),
      (this.blendAlpha = 0),
      (this.depthFunc = LessEqualDepth),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = AlwaysStencilFunc),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = KeepStencilOp),
      (this.stencilZFail = KeepStencilOp),
      (this.stencilZPass = KeepStencilOp),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0);
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    0 < this._alphaTest != 0 < e && this.version++, (this._alphaTest = e);
  }
  onBuild() {}
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (void 0 !== e)
      for (var t in e) {
        var i,
          r = e[t];
        void 0 === r
          ? console.warn(
              `THREE.Material: parameter '${t}' has value of undefined.`
            )
          : void 0 === (i = this[t])
          ? console.warn(
              `THREE.Material: '${t}' is not a property of THREE.${this.type}.`
            )
          : i && i.isColor
          ? i.set(r)
          : i && i.isVector3 && r && r.isVector3
          ? i.copy(r)
          : (this[t] = r);
      }
  }
  toJSON(e) {
    var t = void 0 === e || "string" == typeof e,
      i =
        (t && (e = { textures: {}, images: {} }),
        {
          metadata: {
            version: 4.6,
            type: "Material",
            generator: "Material.toJSON",
          },
        });
    function r(e) {
      var t,
        i = [];
      for (t in e) {
        var r = e[t];
        delete r.metadata, i.push(r);
      }
      return i;
    }
    return (
      (i.uuid = this.uuid),
      (i.type = this.type),
      "" !== this.name && (i.name = this.name),
      this.color && this.color.isColor && (i.color = this.color.getHex()),
      void 0 !== this.roughness && (i.roughness = this.roughness),
      void 0 !== this.metalness && (i.metalness = this.metalness),
      void 0 !== this.sheen && (i.sheen = this.sheen),
      this.sheenColor &&
        this.sheenColor.isColor &&
        (i.sheenColor = this.sheenColor.getHex()),
      void 0 !== this.sheenRoughness &&
        (i.sheenRoughness = this.sheenRoughness),
      this.emissive &&
        this.emissive.isColor &&
        (i.emissive = this.emissive.getHex()),
      void 0 !== this.emissiveIntensity &&
        1 !== this.emissiveIntensity &&
        (i.emissiveIntensity = this.emissiveIntensity),
      this.specular &&
        this.specular.isColor &&
        (i.specular = this.specular.getHex()),
      void 0 !== this.specularIntensity &&
        (i.specularIntensity = this.specularIntensity),
      this.specularColor &&
        this.specularColor.isColor &&
        (i.specularColor = this.specularColor.getHex()),
      void 0 !== this.shininess && (i.shininess = this.shininess),
      void 0 !== this.clearcoat && (i.clearcoat = this.clearcoat),
      void 0 !== this.clearcoatRoughness &&
        (i.clearcoatRoughness = this.clearcoatRoughness),
      this.clearcoatMap &&
        this.clearcoatMap.isTexture &&
        (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
      this.clearcoatRoughnessMap &&
        this.clearcoatRoughnessMap.isTexture &&
        (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
      this.clearcoatNormalMap &&
        this.clearcoatNormalMap.isTexture &&
        ((i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid),
        (i.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
      void 0 !== this.dispersion && (i.dispersion = this.dispersion),
      void 0 !== this.iridescence && (i.iridescence = this.iridescence),
      void 0 !== this.iridescenceIOR &&
        (i.iridescenceIOR = this.iridescenceIOR),
      void 0 !== this.iridescenceThicknessRange &&
        (i.iridescenceThicknessRange = this.iridescenceThicknessRange),
      this.iridescenceMap &&
        this.iridescenceMap.isTexture &&
        (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid),
      this.iridescenceThicknessMap &&
        this.iridescenceThicknessMap.isTexture &&
        (i.iridescenceThicknessMap =
          this.iridescenceThicknessMap.toJSON(e).uuid),
      void 0 !== this.anisotropy && (i.anisotropy = this.anisotropy),
      void 0 !== this.anisotropyRotation &&
        (i.anisotropyRotation = this.anisotropyRotation),
      this.anisotropyMap &&
        this.anisotropyMap.isTexture &&
        (i.anisotropyMap = this.anisotropyMap.toJSON(e).uuid),
      this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid),
      this.matcap &&
        this.matcap.isTexture &&
        (i.matcap = this.matcap.toJSON(e).uuid),
      this.alphaMap &&
        this.alphaMap.isTexture &&
        (i.alphaMap = this.alphaMap.toJSON(e).uuid),
      this.lightMap &&
        this.lightMap.isTexture &&
        ((i.lightMap = this.lightMap.toJSON(e).uuid),
        (i.lightMapIntensity = this.lightMapIntensity)),
      this.aoMap &&
        this.aoMap.isTexture &&
        ((i.aoMap = this.aoMap.toJSON(e).uuid),
        (i.aoMapIntensity = this.aoMapIntensity)),
      this.bumpMap &&
        this.bumpMap.isTexture &&
        ((i.bumpMap = this.bumpMap.toJSON(e).uuid),
        (i.bumpScale = this.bumpScale)),
      this.normalMap &&
        this.normalMap.isTexture &&
        ((i.normalMap = this.normalMap.toJSON(e).uuid),
        (i.normalMapType = this.normalMapType),
        (i.normalScale = this.normalScale.toArray())),
      this.displacementMap &&
        this.displacementMap.isTexture &&
        ((i.displacementMap = this.displacementMap.toJSON(e).uuid),
        (i.displacementScale = this.displacementScale),
        (i.displacementBias = this.displacementBias)),
      this.roughnessMap &&
        this.roughnessMap.isTexture &&
        (i.roughnessMap = this.roughnessMap.toJSON(e).uuid),
      this.metalnessMap &&
        this.metalnessMap.isTexture &&
        (i.metalnessMap = this.metalnessMap.toJSON(e).uuid),
      this.emissiveMap &&
        this.emissiveMap.isTexture &&
        (i.emissiveMap = this.emissiveMap.toJSON(e).uuid),
      this.specularMap &&
        this.specularMap.isTexture &&
        (i.specularMap = this.specularMap.toJSON(e).uuid),
      this.specularIntensityMap &&
        this.specularIntensityMap.isTexture &&
        (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
      this.specularColorMap &&
        this.specularColorMap.isTexture &&
        (i.specularColorMap = this.specularColorMap.toJSON(e).uuid),
      this.envMap &&
        this.envMap.isTexture &&
        ((i.envMap = this.envMap.toJSON(e).uuid), void 0 !== this.combine) &&
        (i.combine = this.combine),
      void 0 !== this.envMapRotation &&
        (i.envMapRotation = this.envMapRotation.toArray()),
      void 0 !== this.envMapIntensity &&
        (i.envMapIntensity = this.envMapIntensity),
      void 0 !== this.reflectivity && (i.reflectivity = this.reflectivity),
      void 0 !== this.refractionRatio &&
        (i.refractionRatio = this.refractionRatio),
      this.gradientMap &&
        this.gradientMap.isTexture &&
        (i.gradientMap = this.gradientMap.toJSON(e).uuid),
      void 0 !== this.transmission && (i.transmission = this.transmission),
      this.transmissionMap &&
        this.transmissionMap.isTexture &&
        (i.transmissionMap = this.transmissionMap.toJSON(e).uuid),
      void 0 !== this.thickness && (i.thickness = this.thickness),
      this.thicknessMap &&
        this.thicknessMap.isTexture &&
        (i.thicknessMap = this.thicknessMap.toJSON(e).uuid),
      void 0 !== this.attenuationDistance &&
        this.attenuationDistance !== 1 / 0 &&
        (i.attenuationDistance = this.attenuationDistance),
      void 0 !== this.attenuationColor &&
        (i.attenuationColor = this.attenuationColor.getHex()),
      void 0 !== this.size && (i.size = this.size),
      null !== this.shadowSide && (i.shadowSide = this.shadowSide),
      void 0 !== this.sizeAttenuation &&
        (i.sizeAttenuation = this.sizeAttenuation),
      this.blending !== NormalBlending && (i.blending = this.blending),
      this.side !== FrontSide && (i.side = this.side),
      !0 === this.vertexColors && (i.vertexColors = !0),
      this.opacity < 1 && (i.opacity = this.opacity),
      !0 === this.transparent && (i.transparent = !0),
      this.blendSrc !== SrcAlphaFactor && (i.blendSrc = this.blendSrc),
      this.blendDst !== OneMinusSrcAlphaFactor && (i.blendDst = this.blendDst),
      this.blendEquation !== AddEquation &&
        (i.blendEquation = this.blendEquation),
      null !== this.blendSrcAlpha && (i.blendSrcAlpha = this.blendSrcAlpha),
      null !== this.blendDstAlpha && (i.blendDstAlpha = this.blendDstAlpha),
      null !== this.blendEquationAlpha &&
        (i.blendEquationAlpha = this.blendEquationAlpha),
      this.blendColor &&
        this.blendColor.isColor &&
        (i.blendColor = this.blendColor.getHex()),
      0 !== this.blendAlpha && (i.blendAlpha = this.blendAlpha),
      this.depthFunc !== LessEqualDepth && (i.depthFunc = this.depthFunc),
      !1 === this.depthTest && (i.depthTest = this.depthTest),
      !1 === this.depthWrite && (i.depthWrite = this.depthWrite),
      !1 === this.colorWrite && (i.colorWrite = this.colorWrite),
      255 !== this.stencilWriteMask &&
        (i.stencilWriteMask = this.stencilWriteMask),
      this.stencilFunc !== AlwaysStencilFunc &&
        (i.stencilFunc = this.stencilFunc),
      0 !== this.stencilRef && (i.stencilRef = this.stencilRef),
      255 !== this.stencilFuncMask &&
        (i.stencilFuncMask = this.stencilFuncMask),
      this.stencilFail !== KeepStencilOp && (i.stencilFail = this.stencilFail),
      this.stencilZFail !== KeepStencilOp &&
        (i.stencilZFail = this.stencilZFail),
      this.stencilZPass !== KeepStencilOp &&
        (i.stencilZPass = this.stencilZPass),
      !0 === this.stencilWrite && (i.stencilWrite = this.stencilWrite),
      void 0 !== this.rotation &&
        0 !== this.rotation &&
        (i.rotation = this.rotation),
      !0 === this.polygonOffset && (i.polygonOffset = !0),
      0 !== this.polygonOffsetFactor &&
        (i.polygonOffsetFactor = this.polygonOffsetFactor),
      0 !== this.polygonOffsetUnits &&
        (i.polygonOffsetUnits = this.polygonOffsetUnits),
      void 0 !== this.linewidth &&
        1 !== this.linewidth &&
        (i.linewidth = this.linewidth),
      void 0 !== this.dashSize && (i.dashSize = this.dashSize),
      void 0 !== this.gapSize && (i.gapSize = this.gapSize),
      void 0 !== this.scale && (i.scale = this.scale),
      !0 === this.dithering && (i.dithering = !0),
      0 < this.alphaTest && (i.alphaTest = this.alphaTest),
      !0 === this.alphaHash && (i.alphaHash = !0),
      !0 === this.alphaToCoverage && (i.alphaToCoverage = !0),
      !0 === this.premultipliedAlpha && (i.premultipliedAlpha = !0),
      !0 === this.forceSinglePass && (i.forceSinglePass = !0),
      !0 === this.wireframe && (i.wireframe = !0),
      1 < this.wireframeLinewidth &&
        (i.wireframeLinewidth = this.wireframeLinewidth),
      "round" !== this.wireframeLinecap &&
        (i.wireframeLinecap = this.wireframeLinecap),
      "round" !== this.wireframeLinejoin &&
        (i.wireframeLinejoin = this.wireframeLinejoin),
      !0 === this.flatShading && (i.flatShading = !0),
      !1 === this.visible && (i.visible = !1),
      !1 === this.toneMapped && (i.toneMapped = !1),
      !1 === this.fog && (i.fog = !1),
      0 < Object.keys(this.userData).length && (i.userData = this.userData),
      t &&
        ((t = r(e.textures)),
        (e = r(e.images)),
        0 < t.length && (i.textures = t),
        0 < e.length) &&
        (i.images = e),
      i
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    (this.name = e.name),
      (this.blending = e.blending),
      (this.side = e.side),
      (this.vertexColors = e.vertexColors),
      (this.opacity = e.opacity),
      (this.transparent = e.transparent),
      (this.blendSrc = e.blendSrc),
      (this.blendDst = e.blendDst),
      (this.blendEquation = e.blendEquation),
      (this.blendSrcAlpha = e.blendSrcAlpha),
      (this.blendDstAlpha = e.blendDstAlpha),
      (this.blendEquationAlpha = e.blendEquationAlpha),
      this.blendColor.copy(e.blendColor),
      (this.blendAlpha = e.blendAlpha),
      (this.depthFunc = e.depthFunc),
      (this.depthTest = e.depthTest),
      (this.depthWrite = e.depthWrite),
      (this.stencilWriteMask = e.stencilWriteMask),
      (this.stencilFunc = e.stencilFunc),
      (this.stencilRef = e.stencilRef),
      (this.stencilFuncMask = e.stencilFuncMask),
      (this.stencilFail = e.stencilFail),
      (this.stencilZFail = e.stencilZFail),
      (this.stencilZPass = e.stencilZPass),
      (this.stencilWrite = e.stencilWrite);
    var t = e.clippingPlanes;
    let i = null;
    if (null !== t) {
      var r = t.length;
      i = new Array(r);
      for (let e = 0; e !== r; ++e) i[e] = t[e].clone();
    }
    return (
      (this.clippingPlanes = i),
      (this.clipIntersection = e.clipIntersection),
      (this.clipShadows = e.clipShadows),
      (this.shadowSide = e.shadowSide),
      (this.colorWrite = e.colorWrite),
      (this.precision = e.precision),
      (this.polygonOffset = e.polygonOffset),
      (this.polygonOffsetFactor = e.polygonOffsetFactor),
      (this.polygonOffsetUnits = e.polygonOffsetUnits),
      (this.dithering = e.dithering),
      (this.alphaTest = e.alphaTest),
      (this.alphaHash = e.alphaHash),
      (this.alphaToCoverage = e.alphaToCoverage),
      (this.premultipliedAlpha = e.premultipliedAlpha),
      (this.forceSinglePass = e.forceSinglePass),
      (this.visible = e.visible),
      (this.toneMapped = e.toneMapped),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
}
class MeshBasicMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshBasicMaterial = !0),
      (this.type = "MeshBasicMaterial"),
      (this.color = new Color(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new Euler()),
      (this.combine = MultiplyOperation),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      (this.specularMap = e.specularMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      this.envMapRotation.copy(e.envMapRotation),
      (this.combine = e.combine),
      (this.reflectivity = e.reflectivity),
      (this.refractionRatio = e.refractionRatio),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.fog = e.fog),
      this
    );
  }
}
let _vector$9 = new Vector3(),
  _vector2$1 = new Vector2();
class BufferAttribute {
  constructor(e, t, i = !1) {
    if (Array.isArray(e))
      throw new TypeError(
        "THREE.BufferAttribute: array should be a Typed Array."
      );
    (this.isBufferAttribute = !0),
      (this.name = ""),
      (this.array = e),
      (this.itemSize = t),
      (this.count = void 0 !== e ? e.length / t : 0),
      (this.normalized = i),
      (this.usage = StaticDrawUsage),
      (this._updateRange = { offset: 0, count: -1 }),
      (this.updateRanges = []),
      (this.gpuType = FloatType),
      (this.version = 0);
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  get updateRange() {
    return (
      warnOnce(
        "THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."
      ),
      this._updateRange
    );
  }
  setUsage(e) {
    return (this.usage = e), this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return (
      (this.name = e.name),
      (this.array = new e.array.constructor(e.array)),
      (this.itemSize = e.itemSize),
      (this.count = e.count),
      (this.normalized = e.normalized),
      (this.usage = e.usage),
      (this.gpuType = e.gpuType),
      this
    );
  }
  copyAt(i, r, n) {
    (i *= this.itemSize), (n *= r.itemSize);
    for (let e = 0, t = this.itemSize; e < t; e++)
      this.array[i + e] = r.array[n + e];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(i) {
    if (2 === this.itemSize)
      for (let e = 0, t = this.count; e < t; e++)
        _vector2$1.fromBufferAttribute(this, e),
          _vector2$1.applyMatrix3(i),
          this.setXY(e, _vector2$1.x, _vector2$1.y);
    else if (3 === this.itemSize)
      for (let e = 0, t = this.count; e < t; e++)
        _vector$9.fromBufferAttribute(this, e),
          _vector$9.applyMatrix3(i),
          this.setXYZ(e, _vector$9.x, _vector$9.y, _vector$9.z);
    return this;
  }
  applyMatrix4(i) {
    for (let e = 0, t = this.count; e < t; e++)
      _vector$9.fromBufferAttribute(this, e),
        _vector$9.applyMatrix4(i),
        this.setXYZ(e, _vector$9.x, _vector$9.y, _vector$9.z);
    return this;
  }
  applyNormalMatrix(i) {
    for (let e = 0, t = this.count; e < t; e++)
      _vector$9.fromBufferAttribute(this, e),
        _vector$9.applyNormalMatrix(i),
        this.setXYZ(e, _vector$9.x, _vector$9.y, _vector$9.z);
    return this;
  }
  transformDirection(i) {
    for (let e = 0, t = this.count; e < t; e++)
      _vector$9.fromBufferAttribute(this, e),
        _vector$9.transformDirection(i),
        this.setXYZ(e, _vector$9.x, _vector$9.y, _vector$9.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let i = this.array[e * this.itemSize + t];
    return (i = this.normalized ? denormalize(i, this.array) : i);
  }
  setComponent(e, t, i) {
    return (
      this.normalized && (i = normalize(i, this.array)),
      (this.array[e * this.itemSize + t] = i),
      this
    );
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return (t = this.normalized ? denormalize(t, this.array) : t);
  }
  setX(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize] = t),
      this
    );
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return (t = this.normalized ? denormalize(t, this.array) : t);
  }
  setY(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize + 1] = t),
      this
    );
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return (t = this.normalized ? denormalize(t, this.array) : t);
  }
  setZ(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize + 2] = t),
      this
    );
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return (t = this.normalized ? denormalize(t, this.array) : t);
  }
  setW(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.array[e * this.itemSize + 3] = t),
      this
    );
  }
  setXY(e, t, i) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((t = normalize(t, this.array)), (i = normalize(i, this.array))),
      (this.array[e + 0] = t),
      (this.array[e + 1] = i),
      this
    );
  }
  setXYZ(e, t, i, r) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (i = normalize(i, this.array)),
        (r = normalize(r, this.array))),
      (this.array[e + 0] = t),
      (this.array[e + 1] = i),
      (this.array[e + 2] = r),
      this
    );
  }
  setXYZW(e, t, i, r, n) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (i = normalize(i, this.array)),
        (r = normalize(r, this.array)),
        (n = normalize(n, this.array))),
      (this.array[e + 0] = t),
      (this.array[e + 1] = i),
      (this.array[e + 2] = r),
      (this.array[e + 3] = n),
      this
    );
  }
  onUpload(e) {
    return (this.onUploadCallback = e), this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    var e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized,
    };
    return (
      "" !== this.name && (e.name = this.name),
      this.usage !== StaticDrawUsage && (e.usage = this.usage),
      e
    );
  }
}
class Uint16BufferAttribute extends BufferAttribute {
  constructor(e, t, i) {
    super(new Uint16Array(e), t, i);
  }
}
class Uint32BufferAttribute extends BufferAttribute {
  constructor(e, t, i) {
    super(new Uint32Array(e), t, i);
  }
}
class Float32BufferAttribute extends BufferAttribute {
  constructor(e, t, i) {
    super(new Float32Array(e), t, i);
  }
}
let _id$2 = 0,
  _m1$2 = new Matrix4(),
  _obj = new Object3D(),
  _offset = new Vector3(),
  _box$2 = new Box3(),
  _boxMorphTargets = new Box3(),
  _vector$8 = new Vector3();
class BufferGeometry extends EventDispatcher {
  constructor() {
    super(),
      (this.isBufferGeometry = !0),
      Object.defineProperty(this, "id", { value: _id$2++ }),
      (this.uuid = generateUUID()),
      (this.name = ""),
      (this.type = "BufferGeometry"),
      (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {});
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return (
      Array.isArray(e)
        ? (this.index = new (
            arrayNeedsUint32(e) ? Uint32BufferAttribute : Uint16BufferAttribute
          )(e, 1))
        : (this.index = e),
      this
    );
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return (this.attributes[e] = t), this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return void 0 !== this.attributes[e];
  }
  addGroup(e, t, i = 0) {
    this.groups.push({ start: e, count: t, materialIndex: i });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    (this.drawRange.start = e), (this.drawRange.count = t);
  }
  applyMatrix4(e) {
    var t = this.attributes.position,
      t =
        (void 0 !== t && (t.applyMatrix4(e), (t.needsUpdate = !0)),
        this.attributes.normal),
      i =
        (void 0 !== t &&
          ((i = new Matrix3().getNormalMatrix(e)),
          t.applyNormalMatrix(i),
          (t.needsUpdate = !0)),
        this.attributes.tangent);
    return (
      void 0 !== i && (i.transformDirection(e), (i.needsUpdate = !0)),
      null !== this.boundingBox && this.computeBoundingBox(),
      null !== this.boundingSphere && this.computeBoundingSphere(),
      this
    );
  }
  applyQuaternion(e) {
    return _m1$2.makeRotationFromQuaternion(e), this.applyMatrix4(_m1$2), this;
  }
  rotateX(e) {
    return _m1$2.makeRotationX(e), this.applyMatrix4(_m1$2), this;
  }
  rotateY(e) {
    return _m1$2.makeRotationY(e), this.applyMatrix4(_m1$2), this;
  }
  rotateZ(e) {
    return _m1$2.makeRotationZ(e), this.applyMatrix4(_m1$2), this;
  }
  translate(e, t, i) {
    return _m1$2.makeTranslation(e, t, i), this.applyMatrix4(_m1$2), this;
  }
  scale(e, t, i) {
    return _m1$2.makeScale(e, t, i), this.applyMatrix4(_m1$2), this;
  }
  lookAt(e) {
    return (
      _obj.lookAt(e), _obj.updateMatrix(), this.applyMatrix4(_obj.matrix), this
    );
  }
  center() {
    return (
      this.computeBoundingBox(),
      this.boundingBox.getCenter(_offset).negate(),
      this.translate(_offset.x, _offset.y, _offset.z),
      this
    );
  }
  setFromPoints(i) {
    var r = [];
    for (let e = 0, t = i.length; e < t; e++) {
      var n = i[e];
      r.push(n.x, n.y, n.z || 0);
    }
    return (
      this.setAttribute("position", new Float32BufferAttribute(r, 3)), this
    );
  }
  computeBoundingBox() {
    null === this.boundingBox && (this.boundingBox = new Box3());
    var e = this.attributes.position,
      i = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute)
      console.error(
        "THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",
        this
      ),
        this.boundingBox.set(
          new Vector3(-1 / 0, -1 / 0, -1 / 0),
          new Vector3(1 / 0, 1 / 0, 1 / 0)
        );
    else {
      if (void 0 !== e) {
        if ((this.boundingBox.setFromBufferAttribute(e), i))
          for (let e = 0, t = i.length; e < t; e++) {
            var r = i[e];
            _box$2.setFromBufferAttribute(r),
              this.morphTargetsRelative
                ? (_vector$8.addVectors(this.boundingBox.min, _box$2.min),
                  this.boundingBox.expandByPoint(_vector$8),
                  _vector$8.addVectors(this.boundingBox.max, _box$2.max),
                  this.boundingBox.expandByPoint(_vector$8))
                : (this.boundingBox.expandByPoint(_box$2.min),
                  this.boundingBox.expandByPoint(_box$2.max));
          }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) ||
        isNaN(this.boundingBox.min.y) ||
        isNaN(this.boundingBox.min.z)) &&
        console.error(
          'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
          this
        );
    }
  }
  computeBoundingSphere() {
    null === this.boundingSphere && (this.boundingSphere = new Sphere());
    var r = this.attributes.position,
      n = this.morphAttributes.position;
    if (r && r.isGLBufferAttribute)
      console.error(
        "THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",
        this
      ),
        this.boundingSphere.set(new Vector3(), 1 / 0);
    else if (r) {
      var a = this.boundingSphere.center;
      if ((_box$2.setFromBufferAttribute(r), n))
        for (let e = 0, t = n.length; e < t; e++) {
          var s = n[e];
          _boxMorphTargets.setFromBufferAttribute(s),
            this.morphTargetsRelative
              ? (_vector$8.addVectors(_box$2.min, _boxMorphTargets.min),
                _box$2.expandByPoint(_vector$8),
                _vector$8.addVectors(_box$2.max, _boxMorphTargets.max),
                _box$2.expandByPoint(_vector$8))
              : (_box$2.expandByPoint(_boxMorphTargets.min),
                _box$2.expandByPoint(_boxMorphTargets.max));
        }
      _box$2.getCenter(a);
      let i = 0;
      for (let e = 0, t = r.count; e < t; e++)
        _vector$8.fromBufferAttribute(r, e),
          (i = Math.max(i, a.distanceToSquared(_vector$8)));
      if (n)
        for (let e = 0, t = n.length; e < t; e++) {
          var o = n[e],
            l = this.morphTargetsRelative;
          for (let e = 0, t = o.count; e < t; e++)
            _vector$8.fromBufferAttribute(o, e),
              l && (_offset.fromBufferAttribute(r, e), _vector$8.add(_offset)),
              (i = Math.max(i, a.distanceToSquared(_vector$8)));
        }
      (this.boundingSphere.radius = Math.sqrt(i)),
        isNaN(this.boundingSphere.radius) &&
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
            this
          );
    }
  }
  computeTangents() {
    var S,
      M,
      T,
      E,
      b = this.index,
      e = this.attributes;
    if (
      null === b ||
      void 0 === e.position ||
      void 0 === e.normal ||
      void 0 === e.uv
    )
      console.error(
        "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)"
      );
    else {
      let i = e.position,
        r = e.normal,
        n = e.uv,
        a =
          (!1 === this.hasAttribute("tangent") &&
            this.setAttribute(
              "tangent",
              new BufferAttribute(new Float32Array(4 * i.count), 4)
            ),
          this.getAttribute("tangent")),
        s = [],
        o = [];
      for (let e = 0; e < i.count; e++)
        (s[e] = new Vector3()), (o[e] = new Vector3());
      let l = new Vector3(),
        h = new Vector3(),
        c = new Vector3(),
        d = new Vector2(),
        u = new Vector2(),
        p = new Vector2(),
        m = new Vector3(),
        f = new Vector3(),
        g = this.groups;
      for (
        let e = 0,
          t = (g = 0 === g.length ? [{ start: 0, count: b.count }] : g).length;
        e < t;
        ++e
      ) {
        var R = g[e],
          A = R.start;
        for (let e = A, t = A + R.count; e < t; e += 3)
          (S = b.getX(e + 0)),
            (M = b.getX(e + 1)),
            (T = b.getX(e + 2)),
            (E = void 0),
            l.fromBufferAttribute(i, S),
            h.fromBufferAttribute(i, M),
            c.fromBufferAttribute(i, T),
            d.fromBufferAttribute(n, S),
            u.fromBufferAttribute(n, M),
            p.fromBufferAttribute(n, T),
            h.sub(l),
            c.sub(l),
            u.sub(d),
            p.sub(d),
            (E = 1 / (u.x * p.y - p.x * u.y)),
            isFinite(E) &&
              (m
                .copy(h)
                .multiplyScalar(p.y)
                .addScaledVector(c, -u.y)
                .multiplyScalar(E),
              f
                .copy(c)
                .multiplyScalar(u.x)
                .addScaledVector(h, -p.x)
                .multiplyScalar(E),
              s[S].add(m),
              s[M].add(m),
              s[T].add(m),
              o[S].add(f),
              o[M].add(f),
              o[T].add(f));
      }
      let _ = new Vector3(),
        v = new Vector3(),
        x = new Vector3(),
        y = new Vector3();
      for (let e = 0, t = g.length; e < t; ++e) {
        var w = g[e],
          L = w.start;
        for (let e = L, t = L + w.count; e < t; e += 3)
          C(b.getX(e + 0)), C(b.getX(e + 1)), C(b.getX(e + 2));
      }
      function C(e) {
        x.fromBufferAttribute(r, e), y.copy(x);
        var t = s[e],
          t =
            (_.copy(t),
            _.sub(x.multiplyScalar(x.dot(t))).normalize(),
            v.crossVectors(y, t),
            v.dot(o[e])),
          t = t < 0 ? -1 : 1;
        a.setXYZW(e, _.x, _.y, _.z, t);
      }
    }
  }
  computeVertexNormals() {
    var r = this.index,
      n = this.getAttribute("position");
    if (void 0 !== n) {
      let i = this.getAttribute("normal");
      if (void 0 === i)
        (i = new BufferAttribute(new Float32Array(3 * n.count), 3)),
          this.setAttribute("normal", i);
      else for (let e = 0, t = i.count; e < t; e++) i.setXYZ(e, 0, 0, 0);
      var a = new Vector3(),
        s = new Vector3(),
        o = new Vector3(),
        l = new Vector3(),
        h = new Vector3(),
        c = new Vector3(),
        d = new Vector3(),
        u = new Vector3();
      if (r)
        for (let e = 0, t = r.count; e < t; e += 3) {
          var p = r.getX(e + 0),
            m = r.getX(e + 1),
            f = r.getX(e + 2);
          a.fromBufferAttribute(n, p),
            s.fromBufferAttribute(n, m),
            o.fromBufferAttribute(n, f),
            d.subVectors(o, s),
            u.subVectors(a, s),
            d.cross(u),
            l.fromBufferAttribute(i, p),
            h.fromBufferAttribute(i, m),
            c.fromBufferAttribute(i, f),
            l.add(d),
            h.add(d),
            c.add(d),
            i.setXYZ(p, l.x, l.y, l.z),
            i.setXYZ(m, h.x, h.y, h.z),
            i.setXYZ(f, c.x, c.y, c.z);
        }
      else
        for (let e = 0, t = n.count; e < t; e += 3)
          a.fromBufferAttribute(n, e + 0),
            s.fromBufferAttribute(n, e + 1),
            o.fromBufferAttribute(n, e + 2),
            d.subVectors(o, s),
            u.subVectors(a, s),
            d.cross(u),
            i.setXYZ(e + 0, d.x, d.y, d.z),
            i.setXYZ(e + 1, d.x, d.y, d.z),
            i.setXYZ(e + 2, d.x, d.y, d.z);
      this.normalizeNormals(), (i.needsUpdate = !0);
    }
  }
  normalizeNormals() {
    var i = this.attributes.normal;
    for (let e = 0, t = i.count; e < t; e++)
      _vector$8.fromBufferAttribute(i, e),
        _vector$8.normalize(),
        i.setXYZ(e, _vector$8.x, _vector$8.y, _vector$8.z);
  }
  toNonIndexed() {
    function i(i, r) {
      var n = i.array,
        a = i.itemSize,
        e = i.normalized,
        s = new n.constructor(r.length * a);
      let o = 0,
        l = 0;
      for (let e = 0, t = r.length; e < t; e++) {
        o = i.isInterleavedBufferAttribute
          ? r[e] * i.data.stride + i.offset
          : r[e] * a;
        for (let e = 0; e < a; e++) s[l++] = n[o++];
      }
      return new BufferAttribute(s, a, e);
    }
    if (null === this.index)
      return (
        console.warn(
          "THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."
        ),
        this
      );
    var e,
      r = new BufferGeometry(),
      n = this.index.array,
      t = this.attributes;
    for (e in t) {
      var a = i(t[e], n);
      r.setAttribute(e, a);
    }
    var s,
      o = this.morphAttributes;
    for (s in o) {
      var l = [],
        h = o[s];
      for (let e = 0, t = h.length; e < t; e++) {
        var c = i(h[e], n);
        l.push(c);
      }
      r.morphAttributes[s] = l;
    }
    r.morphTargetsRelative = this.morphTargetsRelative;
    var d = this.groups;
    for (let e = 0, t = d.length; e < t; e++) {
      var u = d[e];
      r.addGroup(u.start, u.count, u.materialIndex);
    }
    return r;
  }
  toJSON() {
    var i = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON",
      },
    };
    if (
      ((i.uuid = this.uuid),
      (i.type = this.type),
      "" !== this.name && (i.name = this.name),
      0 < Object.keys(this.userData).length && (i.userData = this.userData),
      void 0 !== this.parameters)
    ) {
      var e,
        t = this.parameters;
      for (e in t) void 0 !== t[e] && (i[e] = t[e]);
    } else {
      i.data = { attributes: {} };
      var r,
        n = this.index,
        a =
          (null !== n &&
            (i.data.index = {
              type: n.array.constructor.name,
              array: Array.prototype.slice.call(n.array),
            }),
          this.attributes);
      for (r in a) {
        var s = a[r];
        i.data.attributes[r] = s.toJSON(i.data);
      }
      var o,
        l = {};
      let e = !1;
      for (o in this.morphAttributes) {
        var h = this.morphAttributes[o],
          c = [];
        for (let e = 0, t = h.length; e < t; e++) {
          var d = h[e];
          c.push(d.toJSON(i.data));
        }
        0 < c.length && ((l[o] = c), (e = !0));
      }
      e &&
        ((i.data.morphAttributes = l),
        (i.data.morphTargetsRelative = this.morphTargetsRelative));
      (n = this.groups),
        (n =
          (0 < n.length && (i.data.groups = JSON.parse(JSON.stringify(n))),
          this.boundingSphere));
      null !== n &&
        (i.data.boundingSphere = {
          center: n.center.toArray(),
          radius: n.radius,
        });
    }
    return i;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null);
    var t,
      i = {},
      r = ((this.name = e.name), e.index),
      n = (null !== r && this.setIndex(r.clone(i)), e.attributes);
    for (t in n) {
      var a = n[t];
      this.setAttribute(t, a.clone(i));
    }
    var s,
      o = e.morphAttributes;
    for (s in o) {
      var l = [],
        h = o[s];
      for (let e = 0, t = h.length; e < t; e++) l.push(h[e].clone(i));
      this.morphAttributes[s] = l;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    var c = e.groups;
    for (let e = 0, t = c.length; e < t; e++) {
      var d = c[e];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    (r = e.boundingBox),
      null !== r && (this.boundingBox = r.clone()),
      (r = e.boundingSphere);
    return (
      null !== r && (this.boundingSphere = r.clone()),
      (this.drawRange.start = e.drawRange.start),
      (this.drawRange.count = e.drawRange.count),
      (this.userData = e.userData),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
let _inverseMatrix$3 = new Matrix4(),
  _ray$3 = new Ray(),
  _sphere$6 = new Sphere(),
  _sphereHitAt = new Vector3(),
  _vA$1 = new Vector3(),
  _vB$1 = new Vector3(),
  _vC$1 = new Vector3(),
  _tempA = new Vector3(),
  _morphA = new Vector3(),
  _uvA$1 = new Vector2(),
  _uvB$1 = new Vector2(),
  _uvC$1 = new Vector2(),
  _normalA = new Vector3(),
  _normalB = new Vector3(),
  _normalC = new Vector3(),
  _intersectionPoint = new Vector3(),
  _intersectionPointWorld = new Vector3();
class Mesh extends Object3D {
  constructor(e = new BufferGeometry(), t = new MeshBasicMaterial()) {
    super(),
      (this.isMesh = !0),
      (this.type = "Mesh"),
      (this.geometry = e),
      (this.material = t),
      this.updateMorphTargets();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      void 0 !== e.morphTargetInfluences &&
        (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
      void 0 !== e.morphTargetDictionary &&
        (this.morphTargetDictionary = Object.assign(
          {},
          e.morphTargetDictionary
        )),
      (this.material = Array.isArray(e.material)
        ? e.material.slice()
        : e.material),
      (this.geometry = e.geometry),
      this
    );
  }
  updateMorphTargets() {
    var e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (0 < t.length) {
      var i = e[t[0]];
      if (void 0 !== i) {
        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
        for (let e = 0, t = i.length; e < t; e++) {
          var r = i[e].name || String(e);
          this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[r] = e);
        }
      }
    }
  }
  getVertexPosition(i, r) {
    var e = this.geometry,
      t = e.attributes.position,
      n = e.morphAttributes.position,
      a = e.morphTargetsRelative,
      s = (r.fromBufferAttribute(t, i), this.morphTargetInfluences);
    if (n && s) {
      _morphA.set(0, 0, 0);
      for (let e = 0, t = n.length; e < t; e++) {
        var o = s[e],
          l = n[e];
        0 !== o &&
          (_tempA.fromBufferAttribute(l, i),
          a
            ? _morphA.addScaledVector(_tempA, o)
            : _morphA.addScaledVector(_tempA.sub(r), o));
      }
      r.add(_morphA);
    }
    return r;
  }
  raycast(e, t) {
    var i = this.geometry,
      r = this.material,
      n = this.matrixWorld;
    if (void 0 !== r) {
      if (
        (null === i.boundingSphere && i.computeBoundingSphere(),
        _sphere$6.copy(i.boundingSphere),
        _sphere$6.applyMatrix4(n),
        _ray$3.copy(e.ray).recast(e.near),
        !1 === _sphere$6.containsPoint(_ray$3.origin))
      ) {
        if (null === _ray$3.intersectSphere(_sphere$6, _sphereHitAt)) return;
        if (
          _ray$3.origin.distanceToSquared(_sphereHitAt) >
          (e.far - e.near) ** 2
        )
          return;
      }
      _inverseMatrix$3.copy(n).invert(),
        _ray$3.copy(e.ray).applyMatrix4(_inverseMatrix$3),
        (null !== i.boundingBox &&
          !1 === _ray$3.intersectsBox(i.boundingBox)) ||
          this._computeIntersections(e, t, _ray$3);
    }
  }
  _computeIntersections(i, r, n) {
    let a;
    var e = this.geometry,
      s = this.material,
      o = e.index,
      l = e.attributes.position,
      h = e.attributes.uv,
      c = e.attributes.uv1,
      d = e.attributes.normal,
      u = e.groups,
      p = e.drawRange;
    if (null !== o)
      if (Array.isArray(s))
        for (let e = 0, t = u.length; e < t; e++) {
          var m = u[e],
            f = s[m.materialIndex];
          for (
            let e = Math.max(m.start, p.start),
              t = Math.min(
                o.count,
                Math.min(m.start + m.count, p.start + p.count)
              );
            e < t;
            e += 3
          ) {
            var g = o.getX(e),
              _ = o.getX(e + 1),
              v = o.getX(e + 2);
            (a = checkGeometryIntersection(this, f, i, n, h, c, d, g, _, v)) &&
              ((a.faceIndex = Math.floor(e / 3)),
              (a.face.materialIndex = m.materialIndex),
              r.push(a));
          }
        }
      else
        for (
          let e = Math.max(0, p.start),
            t = Math.min(o.count, p.start + p.count);
          e < t;
          e += 3
        ) {
          var x = o.getX(e),
            y = o.getX(e + 1),
            S = o.getX(e + 2);
          (a = checkGeometryIntersection(this, s, i, n, h, c, d, x, y, S)) &&
            ((a.faceIndex = Math.floor(e / 3)), r.push(a));
        }
    else if (void 0 !== l)
      if (Array.isArray(s))
        for (let e = 0, t = u.length; e < t; e++) {
          var M = u[e],
            T = s[M.materialIndex];
          for (
            let e = Math.max(M.start, p.start),
              t = Math.min(
                l.count,
                Math.min(M.start + M.count, p.start + p.count)
              );
            e < t;
            e += 3
          ) {
            var E = e,
              b = e + 1,
              R = e + 2;
            (a = checkGeometryIntersection(this, T, i, n, h, c, d, E, b, R)) &&
              ((a.faceIndex = Math.floor(e / 3)),
              (a.face.materialIndex = M.materialIndex),
              r.push(a));
          }
        }
      else
        for (
          let e = Math.max(0, p.start),
            t = Math.min(l.count, p.start + p.count);
          e < t;
          e += 3
        ) {
          var A = e,
            w = e + 1,
            L = e + 2;
          (a = checkGeometryIntersection(this, s, i, n, h, c, d, A, w, L)) &&
            ((a.faceIndex = Math.floor(e / 3)), r.push(a));
        }
  }
}
function checkIntersection$1(e, t, i, r, n, a, s, o) {
  let l;
  if (
    null ===
    (l =
      t.side === BackSide
        ? r.intersectTriangle(s, a, n, !0, o)
        : r.intersectTriangle(n, a, s, t.side === FrontSide, o))
  )
    return null;
  _intersectionPointWorld.copy(o),
    _intersectionPointWorld.applyMatrix4(e.matrixWorld);
  r = i.ray.origin.distanceTo(_intersectionPointWorld);
  return r < i.near || r > i.far
    ? null
    : { distance: r, point: _intersectionPointWorld.clone(), object: e };
}
function checkGeometryIntersection(e, t, i, r, n, a, s, o, l, h) {
  e.getVertexPosition(o, _vA$1),
    e.getVertexPosition(l, _vB$1),
    e.getVertexPosition(h, _vC$1);
  e = checkIntersection$1(e, t, i, r, _vA$1, _vB$1, _vC$1, _intersectionPoint);
  return (
    e &&
      (n &&
        (_uvA$1.fromBufferAttribute(n, o),
        _uvB$1.fromBufferAttribute(n, l),
        _uvC$1.fromBufferAttribute(n, h),
        (e.uv = Triangle.getInterpolation(
          _intersectionPoint,
          _vA$1,
          _vB$1,
          _vC$1,
          _uvA$1,
          _uvB$1,
          _uvC$1,
          new Vector2()
        ))),
      a &&
        (_uvA$1.fromBufferAttribute(a, o),
        _uvB$1.fromBufferAttribute(a, l),
        _uvC$1.fromBufferAttribute(a, h),
        (e.uv1 = Triangle.getInterpolation(
          _intersectionPoint,
          _vA$1,
          _vB$1,
          _vC$1,
          _uvA$1,
          _uvB$1,
          _uvC$1,
          new Vector2()
        ))),
      s &&
        (_normalA.fromBufferAttribute(s, o),
        _normalB.fromBufferAttribute(s, l),
        _normalC.fromBufferAttribute(s, h),
        (e.normal = Triangle.getInterpolation(
          _intersectionPoint,
          _vA$1,
          _vB$1,
          _vC$1,
          _normalA,
          _normalB,
          _normalC,
          new Vector3()
        )),
        0 < e.normal.dot(r.direction)) &&
        e.normal.multiplyScalar(-1),
      (t = { a: o, b: l, c: h, normal: new Vector3(), materialIndex: 0 }),
      Triangle.getNormal(_vA$1, _vB$1, _vC$1, t.normal),
      (e.face = t)),
    e
  );
}
class BoxGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, i = 1, r = 1, n = 1, a = 1) {
    super(),
      (this.type = "BoxGeometry"),
      (this.parameters = {
        width: e,
        height: t,
        depth: i,
        widthSegments: r,
        heightSegments: n,
        depthSegments: a,
      });
    let A = this,
      w = ((r = Math.floor(r)), (n = Math.floor(n)), (a = Math.floor(a)), []),
      L = [],
      C = [],
      P = [],
      I = 0,
      D = 0;
    function s(i, r, n, a, s, e, t, o, l, h, c) {
      var d = e / l,
        u = t / h,
        p = e / 2,
        m = t / 2,
        f = o / 2,
        g = l + 1,
        _ = h + 1;
      let v = 0,
        x = 0;
      var y = new Vector3();
      for (let t = 0; t < _; t++) {
        var S = t * u - m;
        for (let e = 0; e < g; e++) {
          var M = e * d - p;
          (y[i] = M * a),
            (y[r] = S * s),
            (y[n] = f),
            L.push(y.x, y.y, y.z),
            (y[i] = 0),
            (y[r] = 0),
            (y[n] = 0 < o ? 1 : -1),
            C.push(y.x, y.y, y.z),
            P.push(e / l),
            P.push(1 - t / h),
            (v += 1);
        }
      }
      for (let t = 0; t < h; t++)
        for (let e = 0; e < l; e++) {
          var T = I + e + g * t,
            E = I + e + g * (t + 1),
            b = I + (e + 1) + g * (t + 1),
            R = I + (e + 1) + g * t;
          w.push(T, E, R), w.push(E, b, R), (x += 6);
        }
      A.addGroup(D, x, c), (D += x), (I += v);
    }
    s("z", "y", "x", -1, -1, i, t, e, a, n, 0),
      s("z", "y", "x", 1, -1, i, t, -e, a, n, 1),
      s("x", "z", "y", 1, 1, e, i, t, r, a, 2),
      s("x", "z", "y", 1, -1, e, i, -t, r, a, 3),
      s("x", "y", "z", 1, -1, e, t, i, r, n, 4),
      s("x", "y", "z", -1, -1, e, t, -i, r, n, 5),
      this.setIndex(w),
      this.setAttribute("position", new Float32BufferAttribute(L, 3)),
      this.setAttribute("normal", new Float32BufferAttribute(C, 3)),
      this.setAttribute("uv", new Float32BufferAttribute(P, 2));
  }
  copy(e) {
    return (
      super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this
    );
  }
  static fromJSON(e) {
    return new BoxGeometry(
      e.width,
      e.height,
      e.depth,
      e.widthSegments,
      e.heightSegments,
      e.depthSegments
    );
  }
}
function cloneUniforms(e) {
  var t,
    i = {};
  for (t in e)
    for (var r in ((i[t] = {}), e[t])) {
      var n = e[t][r];
      n &&
      (n.isColor ||
        n.isMatrix3 ||
        n.isMatrix4 ||
        n.isVector2 ||
        n.isVector3 ||
        n.isVector4 ||
        n.isTexture ||
        n.isQuaternion)
        ? n.isRenderTargetTexture
          ? (console.warn(
              "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."
            ),
            (i[t][r] = null))
          : (i[t][r] = n.clone())
        : Array.isArray(n)
        ? (i[t][r] = n.slice())
        : (i[t][r] = n);
    }
  return i;
}
function mergeUniforms(t) {
  var i = {};
  for (let e = 0; e < t.length; e++) {
    var r,
      n = cloneUniforms(t[e]);
    for (r in n) i[r] = n[r];
  }
  return i;
}
function cloneUniformsGroups(t) {
  var i = [];
  for (let e = 0; e < t.length; e++) i.push(t[e].clone());
  return i;
}
function getUnlitUniformColorSpace(e) {
  var t = e.getRenderTarget();
  return null === t
    ? e.outputColorSpace
    : !0 === t.isXRRenderTarget
    ? t.texture.colorSpace
    : ColorManagement.workingColorSpace;
}
let UniformsUtils = { clone: cloneUniforms, merge: mergeUniforms };
var default_vertex =
    "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
  default_fragment =
    "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
class ShaderMaterial extends Material {
  constructor(e) {
    super(),
      (this.isShaderMaterial = !0),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = default_vertex),
      (this.fragmentShader = default_fragment),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = { clipCullDistance: !1, multiDraw: !1 }),
      (this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv1: [0, 0],
      }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      void 0 !== e && this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.fragmentShader = e.fragmentShader),
      (this.vertexShader = e.vertexShader),
      (this.uniforms = cloneUniforms(e.uniforms)),
      (this.uniformsGroups = cloneUniformsGroups(e.uniformsGroups)),
      (this.defines = Object.assign({}, e.defines)),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.fog = e.fog),
      (this.lights = e.lights),
      (this.clipping = e.clipping),
      (this.extensions = Object.assign({}, e.extensions)),
      (this.glslVersion = e.glslVersion),
      this
    );
  }
  toJSON(e) {
    var t,
      i = super.toJSON(e);
    for (t in ((i.glslVersion = this.glslVersion),
    (i.uniforms = {}),
    this.uniforms)) {
      var r = this.uniforms[t].value;
      r && r.isTexture
        ? (i.uniforms[t] = { type: "t", value: r.toJSON(e).uuid })
        : r && r.isColor
        ? (i.uniforms[t] = { type: "c", value: r.getHex() })
        : r && r.isVector2
        ? (i.uniforms[t] = { type: "v2", value: r.toArray() })
        : r && r.isVector3
        ? (i.uniforms[t] = { type: "v3", value: r.toArray() })
        : r && r.isVector4
        ? (i.uniforms[t] = { type: "v4", value: r.toArray() })
        : r && r.isMatrix3
        ? (i.uniforms[t] = { type: "m3", value: r.toArray() })
        : r && r.isMatrix4
        ? (i.uniforms[t] = { type: "m4", value: r.toArray() })
        : (i.uniforms[t] = { value: r });
    }
    0 < Object.keys(this.defines).length && (i.defines = this.defines),
      (i.vertexShader = this.vertexShader),
      (i.fragmentShader = this.fragmentShader),
      (i.lights = this.lights),
      (i.clipping = this.clipping);
    var n,
      a = {};
    for (n in this.extensions) !0 === this.extensions[n] && (a[n] = !0);
    return 0 < Object.keys(a).length && (i.extensions = a), i;
  }
}
class Camera extends Object3D {
  constructor() {
    super(),
      (this.isCamera = !0),
      (this.type = "Camera"),
      (this.matrixWorldInverse = new Matrix4()),
      (this.projectionMatrix = new Matrix4()),
      (this.projectionMatrixInverse = new Matrix4()),
      (this.coordinateSystem = WebGLCoordinateSystem);
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      this.matrixWorldInverse.copy(e.matrixWorldInverse),
      this.projectionMatrix.copy(e.projectionMatrix),
      this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
      (this.coordinateSystem = e.coordinateSystem),
      this
    );
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e),
      this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t),
      this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
let _v3$1 = new Vector3(),
  _minTarget = new Vector2(),
  _maxTarget = new Vector2();
class PerspectiveCamera extends Camera {
  constructor(e = 50, t = 1, i = 0.1, r = 2e3) {
    super(),
      (this.isPerspectiveCamera = !0),
      (this.type = "PerspectiveCamera"),
      (this.fov = e),
      (this.zoom = 1),
      (this.near = i),
      (this.far = r),
      (this.focus = 10),
      (this.aspect = t),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.fov = e.fov),
      (this.zoom = e.zoom),
      (this.near = e.near),
      (this.far = e.far),
      (this.focus = e.focus),
      (this.aspect = e.aspect),
      (this.view = null === e.view ? null : Object.assign({}, e.view)),
      (this.filmGauge = e.filmGauge),
      (this.filmOffset = e.filmOffset),
      this
    );
  }
  setFocalLength(e) {
    e = (0.5 * this.getFilmHeight()) / e;
    (this.fov = 2 * RAD2DEG * Math.atan(e)), this.updateProjectionMatrix();
  }
  getFocalLength() {
    var e = Math.tan(0.5 * DEG2RAD * this.fov);
    return (0.5 * this.getFilmHeight()) / e;
  }
  getEffectiveFOV() {
    return (
      2 * RAD2DEG * Math.atan(Math.tan(0.5 * DEG2RAD * this.fov) / this.zoom)
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(e, t, i) {
    _v3$1.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      t.set(_v3$1.x, _v3$1.y).multiplyScalar(-e / _v3$1.z),
      _v3$1.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      i.set(_v3$1.x, _v3$1.y).multiplyScalar(-e / _v3$1.z);
  }
  getViewSize(e, t) {
    return (
      this.getViewBounds(e, _minTarget, _maxTarget),
      t.subVectors(_maxTarget, _minTarget)
    );
  }
  setViewOffset(e, t, i, r, n, a) {
    (this.aspect = e / t),
      null === this.view &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
      (this.view.enabled = !0),
      (this.view.fullWidth = e),
      (this.view.fullHeight = t),
      (this.view.offsetX = i),
      (this.view.offsetY = r),
      (this.view.width = n),
      (this.view.height = a),
      this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1),
      this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    var e = this.near;
    let t = (e * Math.tan(0.5 * DEG2RAD * this.fov)) / this.zoom,
      i = 2 * t,
      r = this.aspect * i,
      n = -0.5 * r;
    var a,
      s = this.view,
      o =
        (null !== this.view &&
          this.view.enabled &&
          ((o = s.fullWidth),
          (a = s.fullHeight),
          (n += (s.offsetX * r) / o),
          (t -= (s.offsetY * i) / a),
          (r *= s.width / o),
          (i *= s.height / a)),
        this.filmOffset);
    0 !== o && (n += (e * o) / this.getFilmWidth()),
      this.projectionMatrix.makePerspective(
        n,
        n + r,
        t,
        t - i,
        e,
        this.far,
        this.coordinateSystem
      ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    e = super.toJSON(e);
    return (
      (e.object.fov = this.fov),
      (e.object.zoom = this.zoom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      (e.object.focus = this.focus),
      (e.object.aspect = this.aspect),
      null !== this.view && (e.object.view = Object.assign({}, this.view)),
      (e.object.filmGauge = this.filmGauge),
      (e.object.filmOffset = this.filmOffset),
      e
    );
  }
}
let fov = -90,
  aspect = 1;
class CubeCamera extends Object3D {
  constructor(e, t, i) {
    super(),
      (this.type = "CubeCamera"),
      (this.renderTarget = i),
      (this.coordinateSystem = null),
      (this.activeMipmapLevel = 0);
    (i = new PerspectiveCamera(fov, aspect, e, t)),
      (i.layers = this.layers),
      this.add(i),
      (i = new PerspectiveCamera(fov, aspect, e, t)),
      (i.layers = this.layers),
      this.add(i),
      (i = new PerspectiveCamera(fov, aspect, e, t)),
      (i.layers = this.layers),
      this.add(i),
      (i = new PerspectiveCamera(fov, aspect, e, t)),
      (i.layers = this.layers),
      this.add(i),
      (i = new PerspectiveCamera(fov, aspect, e, t)),
      (i.layers = this.layers),
      this.add(i),
      (i = new PerspectiveCamera(fov, aspect, e, t));
    (i.layers = this.layers), this.add(i);
  }
  updateCoordinateSystem() {
    var e,
      t,
      i = this.coordinateSystem,
      r = this.children.concat(),
      [n, a, s, o, l, h] = r;
    for (e of r) this.remove(e);
    if (i === WebGLCoordinateSystem)
      n.up.set(0, 1, 0),
        n.lookAt(1, 0, 0),
        a.up.set(0, 1, 0),
        a.lookAt(-1, 0, 0),
        s.up.set(0, 0, -1),
        s.lookAt(0, 1, 0),
        o.up.set(0, 0, 1),
        o.lookAt(0, -1, 0),
        l.up.set(0, 1, 0),
        l.lookAt(0, 0, 1),
        h.up.set(0, 1, 0);
    else {
      if (i !== WebGPUCoordinateSystem)
        throw new Error(
          "THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " +
            i
        );
      n.up.set(0, -1, 0),
        n.lookAt(-1, 0, 0),
        a.up.set(0, -1, 0),
        a.lookAt(1, 0, 0),
        s.up.set(0, 0, 1),
        s.lookAt(0, 1, 0),
        o.up.set(0, 0, -1),
        o.lookAt(0, -1, 0),
        l.up.set(0, -1, 0),
        l.lookAt(0, 0, 1),
        h.up.set(0, -1, 0);
    }
    h.lookAt(0, 0, -1);
    for (t of r) this.add(t), t.updateMatrixWorld();
  }
  update(e, t) {
    null === this.parent && this.updateMatrixWorld();
    var { renderTarget: i, activeMipmapLevel: r } = this,
      [n, a, s, o, l, h] =
        (this.coordinateSystem !== e.coordinateSystem &&
          ((this.coordinateSystem = e.coordinateSystem),
          this.updateCoordinateSystem()),
        this.children),
      c = e.getRenderTarget(),
      d = e.getActiveCubeFace(),
      u = e.getActiveMipmapLevel(),
      p = e.xr.enabled,
      m = ((e.xr.enabled = !1), i.texture.generateMipmaps);
    (i.texture.generateMipmaps = !1),
      e.setRenderTarget(i, 0, r),
      e.render(t, n),
      e.setRenderTarget(i, 1, r),
      e.render(t, a),
      e.setRenderTarget(i, 2, r),
      e.render(t, s),
      e.setRenderTarget(i, 3, r),
      e.render(t, o),
      e.setRenderTarget(i, 4, r),
      e.render(t, l),
      (i.texture.generateMipmaps = m),
      e.setRenderTarget(i, 5, r),
      e.render(t, h),
      e.setRenderTarget(c, d, u),
      (e.xr.enabled = p),
      (i.texture.needsPMREMUpdate = !0);
  }
}
class CubeTexture extends Texture {
  constructor(e, t, i, r, n, a, s, o, l, h) {
    super(
      (e = void 0 !== e ? e : []),
      (t = void 0 !== t ? t : CubeReflectionMapping),
      i,
      r,
      n,
      a,
      s,
      o,
      l,
      h
    ),
      (this.isCubeTexture = !0),
      (this.flipY = !1);
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class WebGLCubeRenderTarget extends WebGLRenderTarget {
  constructor(e = 1, t = {}) {
    super(e, e, t), (this.isWebGLCubeRenderTarget = !0);
    (e = { width: e, height: e, depth: 1 }), (e = [e, e, e, e, e, e]);
    (this.texture = new CubeTexture(
      e,
      t.mapping,
      t.wrapS,
      t.wrapT,
      t.magFilter,
      t.minFilter,
      t.format,
      t.type,
      t.anisotropy,
      t.colorSpace
    )),
      (this.texture.isRenderTargetTexture = !0),
      (this.texture.generateMipmaps =
        void 0 !== t.generateMipmaps && t.generateMipmaps),
      (this.texture.minFilter =
        void 0 !== t.minFilter ? t.minFilter : LinearFilter);
  }
  fromEquirectangularTexture(e, t) {
    (this.texture.type = t.type),
      (this.texture.colorSpace = t.colorSpace),
      (this.texture.generateMipmaps = t.generateMipmaps),
      (this.texture.minFilter = t.minFilter),
      (this.texture.magFilter = t.magFilter);
    var i = {
        uniforms: { tEquirect: { value: null } },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
      },
      r = new BoxGeometry(5, 5, 5),
      i = new ShaderMaterial({
        name: "CubemapFromEquirect",
        uniforms: cloneUniforms(i.uniforms),
        vertexShader: i.vertexShader,
        fragmentShader: i.fragmentShader,
        side: BackSide,
        blending: NoBlending,
      }),
      r = ((i.uniforms.tEquirect.value = t), new Mesh(r, i)),
      i = t.minFilter;
    return (
      t.minFilter === LinearMipmapLinearFilter && (t.minFilter = LinearFilter),
      new CubeCamera(1, 10, this).update(e, r),
      (t.minFilter = i),
      r.geometry.dispose(),
      r.material.dispose(),
      this
    );
  }
  clear(t, i, r, n) {
    var e = t.getRenderTarget();
    for (let e = 0; e < 6; e++) t.setRenderTarget(this, e), t.clear(i, r, n);
    t.setRenderTarget(e);
  }
}
let _vector1 = new Vector3(),
  _vector2 = new Vector3(),
  _normalMatrix = new Matrix3();
class Plane {
  constructor(e = new Vector3(1, 0, 0), t = 0) {
    (this.isPlane = !0), (this.normal = e), (this.constant = t);
  }
  set(e, t) {
    return this.normal.copy(e), (this.constant = t), this;
  }
  setComponents(e, t, i, r) {
    return this.normal.set(e, t, i), (this.constant = r), this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), (this.constant = -t.dot(this.normal)), this;
  }
  setFromCoplanarPoints(e, t, i) {
    i = _vector1.subVectors(i, t).cross(_vector2.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(i, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), (this.constant = e.constant), this;
  }
  normalize() {
    var e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), (this.constant *= e), this;
  }
  negate() {
    return (this.constant *= -1), this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    var i = e.delta(_vector1),
      r = this.normal.dot(i);
    return 0 === r
      ? 0 === this.distanceToPoint(e.start)
        ? t.copy(e.start)
        : null
      : (r = -(e.start.dot(this.normal) + this.constant) / r) < 0 || 1 < r
      ? null
      : t.copy(e.start).addScaledVector(i, r);
  }
  intersectsLine(e) {
    var t = this.distanceToPoint(e.start),
      e = this.distanceToPoint(e.end);
    return (t < 0 && 0 < e) || (e < 0 && 0 < t);
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    (t = t || _normalMatrix.getNormalMatrix(e)),
      (e = this.coplanarPoint(_vector1).applyMatrix4(e)),
      (t = this.normal.applyMatrix3(t).normalize());
    return (this.constant = -e.dot(t)), this;
  }
  translate(e) {
    return (this.constant -= e.dot(this.normal)), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
let _sphere$5 = new Sphere(),
  _vector$7 = new Vector3();
class Frustum {
  constructor(
    e = new Plane(),
    t = new Plane(),
    i = new Plane(),
    r = new Plane(),
    n = new Plane(),
    a = new Plane()
  ) {
    this.planes = [e, t, i, r, n, a];
  }
  set(e, t, i, r, n, a) {
    var s = this.planes;
    return (
      s[0].copy(e),
      s[1].copy(t),
      s[2].copy(i),
      s[3].copy(r),
      s[4].copy(n),
      s[5].copy(a),
      this
    );
  }
  copy(t) {
    var i = this.planes;
    for (let e = 0; e < 6; e++) i[e].copy(t.planes[e]);
    return this;
  }
  setFromProjectionMatrix(e, t = WebGLCoordinateSystem) {
    var i = this.planes,
      e = e.elements,
      r = e[0],
      n = e[1],
      a = e[2],
      s = e[3],
      o = e[4],
      l = e[5],
      h = e[6],
      c = e[7],
      d = e[8],
      u = e[9],
      p = e[10],
      m = e[11],
      f = e[12],
      g = e[13],
      _ = e[14],
      e = e[15];
    if (
      (i[0].setComponents(s - r, c - o, m - d, e - f).normalize(),
      i[1].setComponents(s + r, c + o, m + d, e + f).normalize(),
      i[2].setComponents(s + n, c + l, m + u, e + g).normalize(),
      i[3].setComponents(s - n, c - l, m - u, e - g).normalize(),
      i[4].setComponents(s - a, c - h, m - p, e - _).normalize(),
      t === WebGLCoordinateSystem)
    )
      i[5].setComponents(s + a, c + h, m + p, e + _).normalize();
    else {
      if (t !== WebGPUCoordinateSystem)
        throw new Error(
          "THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " +
            t
        );
      i[5].setComponents(a, h, p, _).normalize();
    }
    return this;
  }
  intersectsObject(e) {
    var t;
    return (
      (void 0 !== e.boundingSphere
        ? (null === e.boundingSphere && e.computeBoundingSphere(),
          _sphere$5.copy(e.boundingSphere))
        : (null === (t = e.geometry).boundingSphere &&
            t.computeBoundingSphere(),
          _sphere$5.copy(t.boundingSphere))
      ).applyMatrix4(e.matrixWorld),
      this.intersectsSphere(_sphere$5)
    );
  }
  intersectsSprite(e) {
    return (
      _sphere$5.center.set(0, 0, 0),
      (_sphere$5.radius = 0.7071067811865476),
      _sphere$5.applyMatrix4(e.matrixWorld),
      this.intersectsSphere(_sphere$5)
    );
  }
  intersectsSphere(e) {
    var t = this.planes,
      i = e.center,
      r = -e.radius;
    for (let e = 0; e < 6; e++) if (t[e].distanceToPoint(i) < r) return !1;
    return !0;
  }
  intersectsBox(t) {
    var i = this.planes;
    for (let e = 0; e < 6; e++) {
      var r = i[e];
      if (
        ((_vector$7.x = (0 < r.normal.x ? t.max : t.min).x),
        (_vector$7.y = (0 < r.normal.y ? t.max : t.min).y),
        (_vector$7.z = (0 < r.normal.z ? t.max : t.min).z),
        r.distanceToPoint(_vector$7) < 0)
      )
        return !1;
    }
    return !0;
  }
  containsPoint(t) {
    var i = this.planes;
    for (let e = 0; e < 6; e++) if (i[e].distanceToPoint(t) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function WebGLAnimation() {
  let i = null,
    e = !1,
    r = null,
    n = null;
  function a(e, t) {
    r(e, t), (n = i.requestAnimationFrame(a));
  }
  return {
    start: function () {
      !0 !== e && null !== r && ((n = i.requestAnimationFrame(a)), (e = !0));
    },
    stop: function () {
      i.cancelAnimationFrame(n), (e = !1);
    },
    setAnimationLoop: function (e) {
      r = e;
    },
    setContext: function (e) {
      i = e;
    },
  };
}
function WebGLAttributes(h) {
  let c = new WeakMap();
  return {
    get: function (e) {
      return e.isInterleavedBufferAttribute && (e = e.data), c.get(e);
    },
    remove: function (e) {
      e.isInterleavedBufferAttribute && (e = e.data);
      var t = c.get(e);
      t && (h.deleteBuffer(t.buffer), c.delete(e));
    },
    update: function (e, t) {
      if (e.isGLBufferAttribute)
        (!(i = c.get(e)) || i.version < e.version) &&
          c.set(e, {
            buffer: e.buffer,
            type: e.type,
            bytesPerElement: e.elementSize,
            version: e.version,
          });
      else {
        e.isInterleavedBufferAttribute && (e = e.data);
        var i = c.get(e);
        if (void 0 === i)
          c.set(
            e,
            ((e, t) => {
              var i = e.array,
                r = e.usage,
                n = i.byteLength,
                a = h.createBuffer();
              h.bindBuffer(t, a), h.bufferData(t, i, r), e.onUploadCallback();
              let s;
              if (i instanceof Float32Array) s = h.FLOAT;
              else if (i instanceof Uint16Array)
                s = e.isFloat16BufferAttribute
                  ? h.HALF_FLOAT
                  : h.UNSIGNED_SHORT;
              else if (i instanceof Int16Array) s = h.SHORT;
              else if (i instanceof Uint32Array) s = h.UNSIGNED_INT;
              else if (i instanceof Int32Array) s = h.INT;
              else if (i instanceof Int8Array) s = h.BYTE;
              else {
                if (
                  !(i instanceof Uint8Array || i instanceof Uint8ClampedArray)
                )
                  throw new Error(
                    "THREE.WebGLAttributes: Unsupported buffer data format: " +
                      i
                  );
                s = h.UNSIGNED_BYTE;
              }
              return {
                buffer: a,
                type: s,
                bytesPerElement: i.BYTES_PER_ELEMENT,
                version: e.version,
                size: n,
              };
            })(e, t)
          );
        else if (i.version < e.version) {
          if (i.size !== e.array.byteLength)
            throw new Error(
              "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported."
            );
          var r = i.buffer,
            n = e,
            a = t,
            s = n.array,
            t = n._updateRange,
            o = n.updateRanges;
          if (
            (h.bindBuffer(a, r),
            -1 === t.count && 0 === o.length && h.bufferSubData(a, 0, s),
            0 !== o.length)
          ) {
            for (let e = 0, t = o.length; e < t; e++) {
              var l = o[e];
              h.bufferSubData(
                a,
                l.start * s.BYTES_PER_ELEMENT,
                s,
                l.start,
                l.count
              );
            }
            n.clearUpdateRanges();
          }
          -1 !== t.count &&
            (h.bufferSubData(
              a,
              t.offset * s.BYTES_PER_ELEMENT,
              s,
              t.offset,
              t.count
            ),
            (t.count = -1)),
            n.onUploadCallback(),
            (i.version = e.version);
        }
      }
    },
  };
}
class PlaneGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, i = 1, r = 1) {
    super(),
      (this.type = "PlaneGeometry"),
      (this.parameters = {
        width: e,
        height: t,
        widthSegments: i,
        heightSegments: r,
      });
    var n = e / 2,
      a = t / 2,
      s = Math.floor(i),
      o = Math.floor(r),
      l = s + 1,
      h = o + 1,
      c = e / s,
      d = t / o,
      u = [],
      p = [],
      m = [],
      f = [];
    for (let t = 0; t < h; t++) {
      var g = t * d - a;
      for (let e = 0; e < l; e++) {
        var _ = e * c - n;
        p.push(_, -g, 0), m.push(0, 0, 1), f.push(e / s), f.push(1 - t / o);
      }
    }
    for (let t = 0; t < o; t++)
      for (let e = 0; e < s; e++) {
        var v = e + l * t,
          x = e + l * (t + 1),
          y = e + 1 + l * (t + 1),
          S = e + 1 + l * t;
        u.push(v, x, S), u.push(x, y, S);
      }
    this.setIndex(u),
      this.setAttribute("position", new Float32BufferAttribute(p, 3)),
      this.setAttribute("normal", new Float32BufferAttribute(m, 3)),
      this.setAttribute("uv", new Float32BufferAttribute(f, 2));
  }
  copy(e) {
    return (
      super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this
    );
  }
  static fromJSON(e) {
    return new PlaneGeometry(
      e.width,
      e.height,
      e.widthSegments,
      e.heightSegments
    );
  }
}
var alphahash_fragment =
    "#ifdef USE_ALPHAHASH\n\tif ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
  alphahash_pars_fragment =
    "#ifdef USE_ALPHAHASH\n\tconst float ALPHA_HASH_SCALE = 0.05;\n\tfloat hash2D( vec2 value ) {\n\t\treturn fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n\t}\n\tfloat hash3D( vec3 value ) {\n\t\treturn hash2D( vec2( hash2D( value.xy ), value.z ) );\n\t}\n\tfloat getAlphaHashThreshold( vec3 position ) {\n\t\tfloat maxDeriv = max(\n\t\t\tlength( dFdx( position.xyz ) ),\n\t\t\tlength( dFdy( position.xyz ) )\n\t\t);\n\t\tfloat pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n\t\tvec2 pixScales = vec2(\n\t\t\texp2( floor( log2( pixScale ) ) ),\n\t\t\texp2( ceil( log2( pixScale ) ) )\n\t\t);\n\t\tvec2 alpha = vec2(\n\t\t\thash3D( floor( pixScales.x * position.xyz ) ),\n\t\t\thash3D( floor( pixScales.y * position.xyz ) )\n\t\t);\n\t\tfloat lerpFactor = fract( log2( pixScale ) );\n\t\tfloat x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n\t\tfloat a = min( lerpFactor, 1.0 - lerpFactor );\n\t\tvec3 cases = vec3(\n\t\t\tx * x / ( 2.0 * a * ( 1.0 - a ) ),\n\t\t\t( x - 0.5 * a ) / ( 1.0 - a ),\n\t\t\t1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n\t\t);\n\t\tfloat threshold = ( x < ( 1.0 - a ) )\n\t\t\t? ( ( x < a ) ? cases.x : cases.y )\n\t\t\t: cases.z;\n\t\treturn clamp( threshold , 1.0e-6, 1.0 );\n\t}\n#endif",
  alphamap_fragment =
    "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
  alphamap_pars_fragment =
    "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
  alphatest_fragment =
    "#ifdef USE_ALPHATEST\n\t#ifdef ALPHA_TO_COVERAGE\n\tdiffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n\tif ( diffuseColor.a == 0.0 ) discard;\n\t#else\n\tif ( diffuseColor.a < alphaTest ) discard;\n\t#endif\n#endif",
  alphatest_pars_fragment =
    "#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif",
  aomap_fragment =
    "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_CLEARCOAT ) \n\t\tclearcoatSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_SHEEN ) \n\t\tsheenSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif",
  aomap_pars_fragment =
    "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
  batching_pars_vertex =
    "#ifdef USE_BATCHING\n\tattribute float batchId;\n\tuniform highp sampler2D batchingTexture;\n\tmat4 getBatchingMatrix( const in float i ) {\n\t\tint size = textureSize( batchingTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n#endif",
  batching_vertex =
    "#ifdef USE_BATCHING\n\tmat4 batchingMatrix = getBatchingMatrix( batchId );\n#endif",
  begin_vertex =
    "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n\tvPosition = vec3( position );\n#endif",
  beginnormal_vertex =
    "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",
  bsdfs =
    "float G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n} // validated",
  iridescence_fragment =
    "#ifdef USE_IRIDESCENCE\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,0.0556434,\n\t\t-1.5371385,1.8760108, -0.2040259,\n\t\t-0.4985314,0.0415560,1.0572252\n\t);\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\t}\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\t}\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\t}\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\t}\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\t\tvec3 I;\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\t\t\treturn vec3( 1.0 );\n\t\t}\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\t\t}\n\t\treturn max( I, vec3( 0.0 ) );\n\t}\n#endif",
  bumpmap_pars_fragment =
    "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n\t\tvec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
  clipping_planes_fragment =
    "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#ifdef ALPHA_TO_COVERAGE\n\t\tfloat distanceToPlane, distanceGradient;\n\t\tfloat clipOpacity = 1.0;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\tclipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\t\t\tif ( clipOpacity == 0.0 ) discard;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\t\tfloat unionClipOpacity = 1.0;\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\t\tunionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\t\t\tclipOpacity *= 1.0 - unionClipOpacity;\n\t\t#endif\n\t\tdiffuseColor.a *= clipOpacity;\n\t\tif ( diffuseColor.a == 0.0 ) discard;\n\t#else\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\t\tbool clipped = true;\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\t\t\tif ( clipped ) discard;\n\t\t#endif\n\t#endif\n#endif",
  clipping_planes_pars_fragment =
    "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
  clipping_planes_pars_vertex =
    "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",
  clipping_planes_vertex =
    "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",
  color_fragment =
    "#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif",
  color_pars_fragment =
    "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif",
  color_pars_vertex =
    "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif",
  color_vertex =
    "#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif",
  common =
    "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n\tvarying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat luminance( const in vec3 rgb ) {\n\tconst vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );\n\treturn dot( weights, rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
  cube_uv_reflection_fragment =
    "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\t\t#ifdef texture2DGradEXT\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n\t\t#else\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\t\t#endif\n\t}\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= cubeUV_r1 ) {\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",
  defaultnormal_vertex =
    "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n\tmat3 bm = mat3( batchingMatrix );\n\ttransformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n\ttransformedNormal = bm * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = bm * transformedTangent;\n\t#endif\n#endif\n#ifdef USE_INSTANCING\n\tmat3 im = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n\ttransformedNormal = im * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = im * transformedTangent;\n\t#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\ttransformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",
  displacementmap_pars_vertex =
    "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
  displacementmap_vertex =
    "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
  emissivemap_fragment =
    "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
  emissivemap_pars_fragment =
    "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
  colorspace_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  colorspace_pars_fragment =
    "\nconst mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(\n\tvec3( 0.8224621, 0.177538, 0.0 ),\n\tvec3( 0.0331941, 0.9668058, 0.0 ),\n\tvec3( 0.0170827, 0.0723974, 0.9105199 )\n);\nconst mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.2249401, - 0.2249404, 0.0 ),\n\tvec3( - 0.0420569, 1.0420571, 0.0 ),\n\tvec3( - 0.0196376, - 0.0786361, 1.0982735 )\n);\nvec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {\n\treturn vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );\n}\nvec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {\n\treturn vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );\n}\nvec4 LinearTransferOETF( in vec4 value ) {\n\treturn value;\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn sRGBTransferOETF( value );\n}",
  envmap_fragment =
    "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",
  envmap_common_pars_fragment =
    "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform mat3 envMapRotation;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",
  envmap_pars_fragment =
    "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
  envmap_pars_vertex =
    "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
  envmap_vertex =
    "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
  fog_vertex = "#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif",
  fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif",
  fog_fragment =
    "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
  fog_pars_fragment =
    "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
  gradientmap_pars_fragment =
    "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\t#else\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\t#endif\n}",
  lightmap_pars_fragment =
    "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
  lights_lambert_fragment =
    "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
  lights_lambert_pars_fragment =
    "varying vec3 vViewPosition;\nstruct LambertMaterial {\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert",
  lights_pars_begin =
    "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n\tuniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t#if defined ( LEGACY_LIGHTS )\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t\t}\n\t\treturn 1.0;\n\t#else\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tif ( cutoffDistance > 0.0 ) {\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t}\n\t\treturn distanceFalloff;\n\t#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif",
  envmap_physical_pars_fragment =
    "#ifdef USE_ENVMAP\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\t#ifdef USE_ANISOTROPY\n\t\tvec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n\t\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\t\tvec3 bentNormal = cross( bitangent, viewDir );\n\t\t\t\tbentNormal = normalize( cross( bentNormal, bitangent ) );\n\t\t\t\tbentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n\t\t\t\treturn getIBLRadiance( viewDir, bentNormal, roughness );\n\t\t\t#else\n\t\t\t\treturn vec3( 0.0 );\n\t\t\t#endif\n\t\t}\n\t#endif\n#endif",
  lights_toon_fragment =
    "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
  lights_toon_pars_fragment =
    "varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon",
  lights_phong_fragment =
    "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
  lights_phong_pars_fragment =
    "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong",
  lights_physical_fragment =
    "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\tmaterial.ior = ior;\n\t#ifdef USE_SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\t\t#endif\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n\tmaterial.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\t#ifdef USE_IRIDESCENCEMAP\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\t#endif\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\t#else\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\t#endif\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\t#ifdef USE_ANISOTROPYMAP\n\t\tmat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n\t\tvec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n\t\tvec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n\t#else\n\t\tvec2 anisotropyV = anisotropyVector;\n\t#endif\n\tmaterial.anisotropy = length( anisotropyV );\n\tif( material.anisotropy == 0.0 ) {\n\t\tanisotropyV = vec2( 1.0, 0.0 );\n\t} else {\n\t\tanisotropyV /= material.anisotropy;\n\t\tmaterial.anisotropy = saturate( material.anisotropy );\n\t}\n\tmaterial.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n\tmaterial.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n\tmaterial.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
  lights_physical_pars_fragment =
    "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\tfloat dispersion;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat anisotropy;\n\t\tfloat alphaT;\n\t\tvec3 anisotropyT;\n\t\tvec3 anisotropyB;\n\t#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\nfloat x = clamp( 1.0 - dotVH, 0.0, 1.0 );\nfloat x2 = x * x;\nfloat x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\nreturn ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n\tfloat V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n\t\tfloat gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n\t\tfloat gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n\t\tfloat v = 0.5 / ( gv + gl );\n\t\treturn saturate(v);\n\t}\n\tfloat D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n\t\tfloat a2 = alphaT * alphaB;\n\t\thighp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n\t\thighp float v2 = dot( v, v );\n\t\tfloat w2 = a2 / v2;\n\t\treturn RECIPROCAL_PI * a2 * pow2 ( w2 );\n\t}\n#endif\n#ifdef USE_CLEARCOAT\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\t\tfloat alpha = pow2( roughness );\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t\treturn F * ( V * D );\n\t}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 f0 = material.specularColor;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t#ifdef USE_IRIDESCENCE\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat dotTL = dot( material.anisotropyT, lightDir );\n\t\tfloat dotTV = dot( material.anisotropyT, viewDir );\n\t\tfloat dotTH = dot( material.anisotropyT, halfDir );\n\t\tfloat dotBL = dot( material.anisotropyB, lightDir );\n\t\tfloat dotBV = dot( material.anisotropyB, viewDir );\n\t\tfloat dotBH = dot( material.anisotropyB, halfDir );\n\t\tfloat V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n\t\tfloat D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n\t#else\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t#endif\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\treturn saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\t#ifdef USE_IRIDESCENCE\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\t#else\n\t\tvec3 Fr = specularColor;\n\t#endif\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometryNormal;\n\t\tvec3 viewDir = geometryViewDir;\n\t\tvec3 position = geometryPosition;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(0, 1,0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n\t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\t#ifdef USE_IRIDESCENCE\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\t#else\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\t#endif\n\tvec3 totalScattering = singleScattering + multiScattering;\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
  lights_fragment_begin =
    "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n\tgeometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n\tfloat dotNVi = saturate( dot( normal, geometryViewDir ) );\n\tif ( material.iridescenceThickness == 0.0 ) {\n\t\tmaterial.iridescence = 0.0;\n\t} else {\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\t}\n\tif ( material.iridescence > 0.0 ) {\n\t\tmaterial.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\t}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometryPosition, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometryPosition, directLight );\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if defined( USE_LIGHT_PROBES )\n\t\tirradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
  lights_fragment_maps =
    "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometryNormal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\t#ifdef USE_ANISOTROPY\n\t\tradiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n\t#else\n\t\tradiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif",
  lights_fragment_end =
    "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
  logdepthbuf_fragment =
    "#if defined( USE_LOGDEPTHBUF )\n\tgl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
  logdepthbuf_pars_fragment =
    "#if defined( USE_LOGDEPTHBUF )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
  logdepthbuf_pars_vertex =
    "#ifdef USE_LOGDEPTHBUF\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
  logdepthbuf_vertex =
    "#ifdef USE_LOGDEPTHBUF\n\tvFragDepth = 1.0 + gl_Position.w;\n\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",
  map_fragment =
    "#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n\t\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif",
  map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
  map_particle_fragment =
    "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t#if defined( USE_POINTS_UV )\n\t\tvec2 uv = vUv;\n\t#else\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
  map_particle_pars_fragment =
    "#if defined( USE_POINTS_UV )\n\tvarying vec2 vUv;\n#else\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t\tuniform mat3 uvTransform;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
  metalnessmap_fragment =
    "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
  metalnessmap_pars_fragment =
    "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
  morphinstance_vertex =
    "#ifdef USE_INSTANCING_MORPH\n\tfloat morphTargetInfluences[MORPHTARGETS_COUNT];\n\tfloat morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tmorphTargetInfluences[i] =texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n\t}\n#endif",
  morphcolor_vertex =
    "#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )\n\tvColor *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t#if defined( USE_COLOR_ALPHA )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\t\t#elif defined( USE_COLOR )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\t\t#endif\n\t}\n#endif",
  morphnormal_vertex =
    "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\t\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\t\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\t\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\t#endif\n#endif",
  morphtarget_pars_vertex =
    "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_INSTANCING_MORPH\n\t\tuniform float morphTargetBaseInfluence;\n\t#endif\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\t#ifndef USE_INSTANCING_MORPH\n\t\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t\t#endif\n\t\tuniform sampler2DArray morphTargetsTexture;\n\t\tuniform ivec2 morphTargetsTextureSize;\n\t\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\t\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\t\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\t\t}\n\t#else\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\tuniform float morphTargetInfluences[ 8 ];\n\t\t#else\n\t\t\tuniform float morphTargetInfluences[ 4 ];\n\t\t#endif\n\t#endif\n#endif",
  morphtarget_vertex =
    "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\t\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\t\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\t\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t\t#endif\n\t#endif\n#endif",
  normal_fragment_begin =
    "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal *= faceDirection;\n\t#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal,\n\t\t#if defined( USE_NORMALMAP )\n\t\t\tvNormalMapUv\n\t\t#elif defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tvClearcoatNormalMapUv\n\t\t#else\n\t\t\tvUv\n\t\t#endif\n\t\t);\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\t#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
  normal_fragment_maps =
    "#ifdef USE_NORMALMAP_OBJECTSPACE\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\tnormal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
  normal_pars_fragment =
    "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",
  normal_pars_vertex =
    "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",
  normal_vertex =
    "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif",
  normalmap_pars_fragment =
    "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\t\treturn mat3( T * scale, B * scale, N );\n\t}\n#endif",
  clearcoat_normal_fragment_begin =
    "#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
  clearcoat_normal_fragment_maps =
    "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
  clearcoat_pars_fragment =
    "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif",
  iridescence_pars_fragment =
    "#ifdef USE_IRIDESCENCEMAP\n\tuniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform sampler2D iridescenceThicknessMap;\n#endif",
  opaque_fragment =
    "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
  packing =
    "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec2 packDepthToRG( in highp float v ) {\n\treturn packDepthToRGBA( v ).yx;\n}\nfloat unpackRGToDepth( const in highp vec2 v ) {\n\treturn unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * depth - far );\n}",
  premultiplied_alpha_fragment =
    "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
  project_vertex =
    "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n\tmvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
  dithering_fragment =
    "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
  dithering_pars_fragment =
    "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
  roughnessmap_fragment =
    "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
  roughnessmap_pars_fragment =
    "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
  shadowmap_pars_fragment =
    "#if NUM_SPOT_LIGHT_COORDS > 0\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\tf.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\tf.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tfloat shadow = 1.0;\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\t\n\t\tfloat lightToPositionLength = length( lightToPosition );\n\t\tif ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {\n\t\t\tfloat dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\t\tdp += shadowBias;\n\t\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\t\tshadow = (\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t\t) * ( 1.0 / 9.0 );\n\t\t\t#else\n\t\t\t\tshadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n#endif",
  shadowmap_pars_vertex =
    "#if NUM_SPOT_LIGHT_COORDS > 0\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",
  shadowmap_vertex =
    "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\tvec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n#endif",
  shadowmask_pars_fragment =
    "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",
  skinbase_vertex =
    "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
  skinning_pars_vertex =
    "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\tuniform highp sampler2D boneTexture;\n\tmat4 getBoneMatrix( const in float i ) {\n\t\tint size = textureSize( boneTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n#endif",
  skinning_vertex =
    "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
  skinnormal_vertex =
    "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",
  specularmap_fragment =
    "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
  specularmap_pars_fragment =
    "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
  tonemapping_fragment =
    "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
  tonemapping_pars_fragment =
    "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.6605, - 0.1246, - 0.0182 ),\n\tvec3( - 0.5876, 1.1329, - 0.1006 ),\n\tvec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n\tvec3( 0.6274, 0.0691, 0.0164 ),\n\tvec3( 0.3293, 0.9195, 0.0880 ),\n\tvec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n\tvec3 x2 = x * x;\n\tvec3 x4 = x2 * x2;\n\treturn + 15.5 * x4 * x2\n\t\t- 40.14 * x4 * x\n\t\t+ 31.96 * x4\n\t\t- 6.868 * x2 * x\n\t\t+ 0.4298 * x2\n\t\t+ 0.1191 * x\n\t\t- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n\tconst mat3 AgXInsetMatrix = mat3(\n\t\tvec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n\t\tvec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n\t\tvec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n\t);\n\tconst mat3 AgXOutsetMatrix = mat3(\n\t\tvec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n\t\tvec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n\t\tvec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n\t);\n\tconst float AgxMinEv = - 12.47393;\tconst float AgxMaxEv = 4.026069;\n\tcolor *= toneMappingExposure;\n\tcolor = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n\tcolor = AgXInsetMatrix * color;\n\tcolor = max( color, 1e-10 );\tcolor = log2( color );\n\tcolor = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n\tcolor = clamp( color, 0.0, 1.0 );\n\tcolor = agxDefaultContrastApprox( color );\n\tcolor = AgXOutsetMatrix * color;\n\tcolor = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n\tcolor = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n\tcolor = clamp( color, 0.0, 1.0 );\n\treturn color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n\tconst float StartCompression = 0.8 - 0.04;\n\tconst float Desaturation = 0.15;\n\tcolor *= toneMappingExposure;\n\tfloat x = min( color.r, min( color.g, color.b ) );\n\tfloat offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n\tcolor -= offset;\n\tfloat peak = max( color.r, max( color.g, color.b ) );\n\tif ( peak < StartCompression ) return color;\n\tfloat d = 1. - StartCompression;\n\tfloat newPeak = 1. - d * d / ( peak + d - StartCompression );\n\tcolor *= newPeak / peak;\n\tfloat g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n\treturn mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
  transmission_fragment =
    "#ifdef USE_TRANSMISSION\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmitted = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n\ttotalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
  transmission_pars_fragment =
    "#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tfloat w0( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\t}\n\tfloat w1( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a *a * ( 3.0 * a - 6.0 ) + 4.0 );\n\t}\n\tfloat w2( float a ){\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\t}\n\tfloat w3( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\t}\n\tfloat g0( float a ) {\n\t\treturn w0( a ) + w1( a );\n\t}\n\tfloat g1( float a ) {\n\t\treturn w2( a ) + w3( a );\n\t}\n\tfloat h0( float a ) {\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\t}\n\tfloat h1( float a ) {\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\t}\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n\t\tuv = uv * texelSize.zw + 0.5;\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\t}\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\t}\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\t}\n\tvec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( isinf( attenuationDistance ) ) {\n\t\t\treturn vec3( 1.0 );\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec4 transmittedLight;\n\t\tvec3 transmittance;\n\t\t#ifdef USE_DISPERSION\n\t\t\tfloat halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n\t\t\tvec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n\t\t\tfor ( int i = 0; i < 3; i ++ ) {\n\t\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n\t\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\t\n\t\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\t\trefractionCoords += 1.0;\n\t\t\t\trefractionCoords /= 2.0;\n\t\t\n\t\t\t\tvec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n\t\t\t\ttransmittedLight[ i ] = transmissionSample[ i ];\n\t\t\t\ttransmittedLight.a += transmissionSample.a;\n\t\t\t\ttransmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n\t\t\t}\n\t\t\ttransmittedLight.a /= 3.0;\n\t\t\n\t\t#else\n\t\t\n\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\trefractionCoords += 1.0;\n\t\t\trefractionCoords /= 2.0;\n\t\t\ttransmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\t\ttransmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\t\n\t\t#endif\n\t\tvec3 attenuatedColor = transmittance * transmittedLight.rgb;\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\tfloat transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n\t}\n#endif",
  uv_pars_fragment =
    "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",
  uv_pars_vertex =
    "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tuniform mat3 anisotropyMapTransform;\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",
  uv_vertex =
    "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
  worldpos_vertex =
    "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_BATCHING\n\t\tworldPosition = batchingMatrix * worldPosition;\n\t#endif\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif";
let vertex$h =
    "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
  fragment$h =
    "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
  vertex$g =
    "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
  fragment$g =
    "#ifdef ENVMAP_TYPE_CUBE\n\tuniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\tuniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n\t#else\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
  vertex$f =
    "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
  fragment$f =
    "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
  vertex$e =
    "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",
  fragment$e =
    "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}",
  vertex$d =
    "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
  fragment$d =
    "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",
  vertex$c =
    "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
  fragment$c =
    "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
  vertex$b =
    "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
  fragment$b =
    "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
  vertex$a =
    "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
  fragment$a =
    "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
  vertex$9 =
    "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
  fragment$9 =
    "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
  vertex$8 =
    "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
  fragment$8 =
    "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
  vertex$7 =
    "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
  fragment$7 =
    "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}",
  vertex$6 =
    "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
  fragment$6 =
    "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
  vertex$5 =
    "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}",
  fragment$5 =
    "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n\tuniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\tuniform vec2 anisotropyVector;\n\t#ifdef USE_ANISOTROPYMAP\n\t\tuniform sampler2D anisotropyMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\t\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n\t#endif\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
  vertex$4 =
    "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
  fragment$4 =
    "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
  vertex$3 =
    "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n\t#ifdef USE_POINTS_UV\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\t#endif\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
  fragment$3 =
    "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
  vertex$2 =
    "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
  fragment$2 =
    "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}",
  vertex$1 =
    "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
  fragment$1 =
    "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}",
  ShaderChunk = {
    alphahash_fragment: alphahash_fragment,
    alphahash_pars_fragment: alphahash_pars_fragment,
    alphamap_fragment: alphamap_fragment,
    alphamap_pars_fragment: alphamap_pars_fragment,
    alphatest_fragment: alphatest_fragment,
    alphatest_pars_fragment: alphatest_pars_fragment,
    aomap_fragment: aomap_fragment,
    aomap_pars_fragment: aomap_pars_fragment,
    batching_pars_vertex: batching_pars_vertex,
    batching_vertex: batching_vertex,
    begin_vertex: begin_vertex,
    beginnormal_vertex: beginnormal_vertex,
    bsdfs: bsdfs,
    iridescence_fragment: iridescence_fragment,
    bumpmap_pars_fragment: bumpmap_pars_fragment,
    clipping_planes_fragment: clipping_planes_fragment,
    clipping_planes_pars_fragment: clipping_planes_pars_fragment,
    clipping_planes_pars_vertex: clipping_planes_pars_vertex,
    clipping_planes_vertex: clipping_planes_vertex,
    color_fragment: color_fragment,
    color_pars_fragment: color_pars_fragment,
    color_pars_vertex: color_pars_vertex,
    color_vertex: color_vertex,
    common: common,
    cube_uv_reflection_fragment: cube_uv_reflection_fragment,
    defaultnormal_vertex: defaultnormal_vertex,
    displacementmap_pars_vertex: displacementmap_pars_vertex,
    displacementmap_vertex: displacementmap_vertex,
    emissivemap_fragment: emissivemap_fragment,
    emissivemap_pars_fragment: emissivemap_pars_fragment,
    colorspace_fragment: colorspace_fragment,
    colorspace_pars_fragment: colorspace_pars_fragment,
    envmap_fragment: envmap_fragment,
    envmap_common_pars_fragment: envmap_common_pars_fragment,
    envmap_pars_fragment: envmap_pars_fragment,
    envmap_pars_vertex: envmap_pars_vertex,
    envmap_physical_pars_fragment: envmap_physical_pars_fragment,
    envmap_vertex: envmap_vertex,
    fog_vertex: fog_vertex,
    fog_pars_vertex: fog_pars_vertex,
    fog_fragment: fog_fragment,
    fog_pars_fragment: fog_pars_fragment,
    gradientmap_pars_fragment: gradientmap_pars_fragment,
    lightmap_pars_fragment: lightmap_pars_fragment,
    lights_lambert_fragment: lights_lambert_fragment,
    lights_lambert_pars_fragment: lights_lambert_pars_fragment,
    lights_pars_begin: lights_pars_begin,
    lights_toon_fragment: lights_toon_fragment,
    lights_toon_pars_fragment: lights_toon_pars_fragment,
    lights_phong_fragment: lights_phong_fragment,
    lights_phong_pars_fragment: lights_phong_pars_fragment,
    lights_physical_fragment: lights_physical_fragment,
    lights_physical_pars_fragment: lights_physical_pars_fragment,
    lights_fragment_begin: lights_fragment_begin,
    lights_fragment_maps: lights_fragment_maps,
    lights_fragment_end: lights_fragment_end,
    logdepthbuf_fragment: logdepthbuf_fragment,
    logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
    logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
    logdepthbuf_vertex: logdepthbuf_vertex,
    map_fragment: map_fragment,
    map_pars_fragment: map_pars_fragment,
    map_particle_fragment: map_particle_fragment,
    map_particle_pars_fragment: map_particle_pars_fragment,
    metalnessmap_fragment: metalnessmap_fragment,
    metalnessmap_pars_fragment: metalnessmap_pars_fragment,
    morphinstance_vertex: morphinstance_vertex,
    morphcolor_vertex: morphcolor_vertex,
    morphnormal_vertex: morphnormal_vertex,
    morphtarget_pars_vertex: morphtarget_pars_vertex,
    morphtarget_vertex: morphtarget_vertex,
    normal_fragment_begin: normal_fragment_begin,
    normal_fragment_maps: normal_fragment_maps,
    normal_pars_fragment: normal_pars_fragment,
    normal_pars_vertex: normal_pars_vertex,
    normal_vertex: normal_vertex,
    normalmap_pars_fragment: normalmap_pars_fragment,
    clearcoat_normal_fragment_begin: clearcoat_normal_fragment_begin,
    clearcoat_normal_fragment_maps: clearcoat_normal_fragment_maps,
    clearcoat_pars_fragment: clearcoat_pars_fragment,
    iridescence_pars_fragment: iridescence_pars_fragment,
    opaque_fragment: opaque_fragment,
    packing: packing,
    premultiplied_alpha_fragment: premultiplied_alpha_fragment,
    project_vertex: project_vertex,
    dithering_fragment: dithering_fragment,
    dithering_pars_fragment: dithering_pars_fragment,
    roughnessmap_fragment: roughnessmap_fragment,
    roughnessmap_pars_fragment: roughnessmap_pars_fragment,
    shadowmap_pars_fragment: shadowmap_pars_fragment,
    shadowmap_pars_vertex: shadowmap_pars_vertex,
    shadowmap_vertex: shadowmap_vertex,
    shadowmask_pars_fragment: shadowmask_pars_fragment,
    skinbase_vertex: skinbase_vertex,
    skinning_pars_vertex: skinning_pars_vertex,
    skinning_vertex: skinning_vertex,
    skinnormal_vertex: skinnormal_vertex,
    specularmap_fragment: specularmap_fragment,
    specularmap_pars_fragment: specularmap_pars_fragment,
    tonemapping_fragment: tonemapping_fragment,
    tonemapping_pars_fragment: tonemapping_pars_fragment,
    transmission_fragment: transmission_fragment,
    transmission_pars_fragment: transmission_pars_fragment,
    uv_pars_fragment: uv_pars_fragment,
    uv_pars_vertex: uv_pars_vertex,
    uv_vertex: uv_vertex,
    worldpos_vertex: worldpos_vertex,
    background_vert: vertex$h,
    background_frag: fragment$h,
    backgroundCube_vert: vertex$g,
    backgroundCube_frag: fragment$g,
    cube_vert: vertex$f,
    cube_frag: fragment$f,
    depth_vert: vertex$e,
    depth_frag: fragment$e,
    distanceRGBA_vert: vertex$d,
    distanceRGBA_frag: fragment$d,
    equirect_vert: vertex$c,
    equirect_frag: fragment$c,
    linedashed_vert: vertex$b,
    linedashed_frag: fragment$b,
    meshbasic_vert: vertex$a,
    meshbasic_frag: fragment$a,
    meshlambert_vert: vertex$9,
    meshlambert_frag: fragment$9,
    meshmatcap_vert: vertex$8,
    meshmatcap_frag: fragment$8,
    meshnormal_vert: vertex$7,
    meshnormal_frag: fragment$7,
    meshphong_vert: vertex$6,
    meshphong_frag: fragment$6,
    meshphysical_vert: vertex$5,
    meshphysical_frag: fragment$5,
    meshtoon_vert: vertex$4,
    meshtoon_frag: fragment$4,
    points_vert: vertex$3,
    points_frag: fragment$3,
    shadow_vert: vertex$2,
    shadow_frag: fragment$2,
    sprite_vert: vertex$1,
    sprite_frag: fragment$1,
  },
  UniformsLib = {
    common: {
      diffuse: { value: new Color(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: new Matrix3() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Matrix3() },
      alphaTest: { value: 0 },
    },
    specularmap: {
      specularMap: { value: null },
      specularMapTransform: { value: new Matrix3() },
    },
    envmap: {
      envMap: { value: null },
      envMapRotation: { value: new Matrix3() },
      flipEnvMap: { value: -1 },
      reflectivity: { value: 1 },
      ior: { value: 1.5 },
      refractionRatio: { value: 0.98 },
    },
    aomap: {
      aoMap: { value: null },
      aoMapIntensity: { value: 1 },
      aoMapTransform: { value: new Matrix3() },
    },
    lightmap: {
      lightMap: { value: null },
      lightMapIntensity: { value: 1 },
      lightMapTransform: { value: new Matrix3() },
    },
    bumpmap: {
      bumpMap: { value: null },
      bumpMapTransform: { value: new Matrix3() },
      bumpScale: { value: 1 },
    },
    normalmap: {
      normalMap: { value: null },
      normalMapTransform: { value: new Matrix3() },
      normalScale: { value: new Vector2(1, 1) },
    },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: new Matrix3() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 },
    },
    emissivemap: {
      emissiveMap: { value: null },
      emissiveMapTransform: { value: new Matrix3() },
    },
    metalnessmap: {
      metalnessMap: { value: null },
      metalnessMapTransform: { value: new Matrix3() },
    },
    roughnessmap: {
      roughnessMap: { value: null },
      roughnessMapTransform: { value: new Matrix3() },
    },
    gradientmap: { gradientMap: { value: null } },
    fog: {
      fogDensity: { value: 25e-5 },
      fogNear: { value: 1 },
      fogFar: { value: 2e3 },
      fogColor: { value: new Color(16777215) },
    },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: {
        value: [],
        properties: { direction: {}, color: {} },
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      directionalShadowMap: { value: [] },
      directionalShadowMatrix: { value: [] },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
        },
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      spotLightMap: { value: [] },
      spotShadowMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: {
        value: [],
        properties: { color: {}, position: {}, decay: {}, distance: {} },
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {},
        },
      },
      pointShadowMap: { value: [] },
      pointShadowMatrix: { value: [] },
      hemisphereLights: {
        value: [],
        properties: { direction: {}, skyColor: {}, groundColor: {} },
      },
      rectAreaLights: {
        value: [],
        properties: { color: {}, position: {}, width: {}, height: {} },
      },
      ltc_1: { value: null },
      ltc_2: { value: null },
    },
    points: {
      diffuse: { value: new Color(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Matrix3() },
      alphaTest: { value: 0 },
      uvTransform: { value: new Matrix3() },
    },
    sprite: {
      diffuse: { value: new Color(16777215) },
      opacity: { value: 1 },
      center: { value: new Vector2(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: new Matrix3() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Matrix3() },
      alphaTest: { value: 0 },
    },
  },
  ShaderLib = {
    basic: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.specularmap,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.fog,
      ]),
      vertexShader: ShaderChunk.meshbasic_vert,
      fragmentShader: ShaderChunk.meshbasic_frag,
    },
    lambert: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.specularmap,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.fog,
        UniformsLib.lights,
        { emissive: { value: new Color(0) } },
      ]),
      vertexShader: ShaderChunk.meshlambert_vert,
      fragmentShader: ShaderChunk.meshlambert_frag,
    },
    phong: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.specularmap,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.fog,
        UniformsLib.lights,
        {
          emissive: { value: new Color(0) },
          specular: { value: new Color(1118481) },
          shininess: { value: 30 },
        },
      ]),
      vertexShader: ShaderChunk.meshphong_vert,
      fragmentShader: ShaderChunk.meshphong_frag,
    },
    standard: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.roughnessmap,
        UniformsLib.metalnessmap,
        UniformsLib.fog,
        UniformsLib.lights,
        {
          emissive: { value: new Color(0) },
          roughness: { value: 1 },
          metalness: { value: 0 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: ShaderChunk.meshphysical_vert,
      fragmentShader: ShaderChunk.meshphysical_frag,
    },
    toon: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.gradientmap,
        UniformsLib.fog,
        UniformsLib.lights,
        { emissive: { value: new Color(0) } },
      ]),
      vertexShader: ShaderChunk.meshtoon_vert,
      fragmentShader: ShaderChunk.meshtoon_frag,
    },
    matcap: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.fog,
        { matcap: { value: null } },
      ]),
      vertexShader: ShaderChunk.meshmatcap_vert,
      fragmentShader: ShaderChunk.meshmatcap_frag,
    },
    points: {
      uniforms: mergeUniforms([UniformsLib.points, UniformsLib.fog]),
      vertexShader: ShaderChunk.points_vert,
      fragmentShader: ShaderChunk.points_frag,
    },
    dashed: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.fog,
        {
          scale: { value: 1 },
          dashSize: { value: 1 },
          totalSize: { value: 2 },
        },
      ]),
      vertexShader: ShaderChunk.linedashed_vert,
      fragmentShader: ShaderChunk.linedashed_frag,
    },
    depth: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.displacementmap,
      ]),
      vertexShader: ShaderChunk.depth_vert,
      fragmentShader: ShaderChunk.depth_frag,
    },
    normal: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        { opacity: { value: 1 } },
      ]),
      vertexShader: ShaderChunk.meshnormal_vert,
      fragmentShader: ShaderChunk.meshnormal_frag,
    },
    sprite: {
      uniforms: mergeUniforms([UniformsLib.sprite, UniformsLib.fog]),
      vertexShader: ShaderChunk.sprite_vert,
      fragmentShader: ShaderChunk.sprite_frag,
    },
    background: {
      uniforms: {
        uvTransform: { value: new Matrix3() },
        t2D: { value: null },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: ShaderChunk.background_vert,
      fragmentShader: ShaderChunk.background_frag,
    },
    backgroundCube: {
      uniforms: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 },
        backgroundRotation: { value: new Matrix3() },
      },
      vertexShader: ShaderChunk.backgroundCube_vert,
      fragmentShader: ShaderChunk.backgroundCube_frag,
    },
    cube: {
      uniforms: {
        tCube: { value: null },
        tFlip: { value: -1 },
        opacity: { value: 1 },
      },
      vertexShader: ShaderChunk.cube_vert,
      fragmentShader: ShaderChunk.cube_frag,
    },
    equirect: {
      uniforms: { tEquirect: { value: null } },
      vertexShader: ShaderChunk.equirect_vert,
      fragmentShader: ShaderChunk.equirect_frag,
    },
    distanceRGBA: {
      uniforms: mergeUniforms([
        UniformsLib.common,
        UniformsLib.displacementmap,
        {
          referencePosition: { value: new Vector3() },
          nearDistance: { value: 1 },
          farDistance: { value: 1e3 },
        },
      ]),
      vertexShader: ShaderChunk.distanceRGBA_vert,
      fragmentShader: ShaderChunk.distanceRGBA_frag,
    },
    shadow: {
      uniforms: mergeUniforms([
        UniformsLib.lights,
        UniformsLib.fog,
        { color: { value: new Color(0) }, opacity: { value: 1 } },
      ]),
      vertexShader: ShaderChunk.shadow_vert,
      fragmentShader: ShaderChunk.shadow_frag,
    },
  },
  _rgb =
    ((ShaderLib.physical = {
      uniforms: mergeUniforms([
        ShaderLib.standard.uniforms,
        {
          clearcoat: { value: 0 },
          clearcoatMap: { value: null },
          clearcoatMapTransform: { value: new Matrix3() },
          clearcoatNormalMap: { value: null },
          clearcoatNormalMapTransform: { value: new Matrix3() },
          clearcoatNormalScale: { value: new Vector2(1, 1) },
          clearcoatRoughness: { value: 0 },
          clearcoatRoughnessMap: { value: null },
          clearcoatRoughnessMapTransform: { value: new Matrix3() },
          dispersion: { value: 0 },
          iridescence: { value: 0 },
          iridescenceMap: { value: null },
          iridescenceMapTransform: { value: new Matrix3() },
          iridescenceIOR: { value: 1.3 },
          iridescenceThicknessMinimum: { value: 100 },
          iridescenceThicknessMaximum: { value: 400 },
          iridescenceThicknessMap: { value: null },
          iridescenceThicknessMapTransform: { value: new Matrix3() },
          sheen: { value: 0 },
          sheenColor: { value: new Color(0) },
          sheenColorMap: { value: null },
          sheenColorMapTransform: { value: new Matrix3() },
          sheenRoughness: { value: 1 },
          sheenRoughnessMap: { value: null },
          sheenRoughnessMapTransform: { value: new Matrix3() },
          transmission: { value: 0 },
          transmissionMap: { value: null },
          transmissionMapTransform: { value: new Matrix3() },
          transmissionSamplerSize: { value: new Vector2() },
          transmissionSamplerMap: { value: null },
          thickness: { value: 0 },
          thicknessMap: { value: null },
          thicknessMapTransform: { value: new Matrix3() },
          attenuationDistance: { value: 0 },
          attenuationColor: { value: new Color(0) },
          specularColor: { value: new Color(1, 1, 1) },
          specularColorMap: { value: null },
          specularColorMapTransform: { value: new Matrix3() },
          specularIntensity: { value: 1 },
          specularIntensityMap: { value: null },
          specularIntensityMapTransform: { value: new Matrix3() },
          anisotropyVector: { value: new Vector2() },
          anisotropyMap: { value: null },
          anisotropyMapTransform: { value: new Matrix3() },
        },
      ]),
      vertexShader: ShaderChunk.meshphysical_vert,
      fragmentShader: ShaderChunk.meshphysical_frag,
    }),
    { r: 0, b: 0, g: 0 }),
  _e1$1 = new Euler(),
  _m1$1 = new Matrix4();
function WebGLBackground(r, i, n, a, s, e, o) {
  let l = new Color(0),
    h = !0 === e ? 0 : 1,
    c,
    d,
    u = null,
    p = 0,
    m = null;
  function f(e) {
    let t = !0 === e.isScene ? e.background : null;
    return (
      t &&
        t.isTexture &&
        ((e = 0 < e.backgroundBlurriness), (t = (e ? n : i).get(t))),
      t
    );
  }
  function g(e, t) {
    e.getRGB(_rgb, getUnlitUniformColorSpace(r)),
      a.buffers.color.setClear(_rgb.r, _rgb.g, _rgb.b, t, o);
  }
  return {
    getClearColor: function () {
      return l;
    },
    setClearColor: function (e, t = 1) {
      l.set(e), (h = t), g(l, h);
    },
    getClearAlpha: function () {
      return h;
    },
    setClearAlpha: function (e) {
      (h = e), g(l, h);
    },
    render: function (e) {
      let t = !1;
      null === (e = f(e)) ? g(l, h) : e && e.isColor && (g(e, 1), (t = !0)),
        "additive" === (e = r.xr.getEnvironmentBlendMode())
          ? a.buffers.color.setClear(0, 0, 0, 1, o)
          : "alpha-blend" === e && a.buffers.color.setClear(0, 0, 0, 0, o),
        (r.autoClear || t) &&
          r.clear(r.autoClearColor, r.autoClearDepth, r.autoClearStencil);
    },
    addToRenderList: function (e, t) {
      var i = f(t);
      i && (i.isCubeTexture || i.mapping === CubeUVReflectionMapping)
        ? (void 0 === d &&
            ((d = new Mesh(
              new BoxGeometry(1, 1, 1),
              new ShaderMaterial({
                name: "BackgroundCubeMaterial",
                uniforms: cloneUniforms(ShaderLib.backgroundCube.uniforms),
                vertexShader: ShaderLib.backgroundCube.vertexShader,
                fragmentShader: ShaderLib.backgroundCube.fragmentShader,
                side: BackSide,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              })
            )).geometry.deleteAttribute("normal"),
            d.geometry.deleteAttribute("uv"),
            (d.onBeforeRender = function (e, t, i) {
              this.matrixWorld.copyPosition(i.matrixWorld);
            }),
            Object.defineProperty(d.material, "envMap", {
              get: function () {
                return this.uniforms.envMap.value;
              },
            }),
            s.update(d)),
          _e1$1.copy(t.backgroundRotation),
          (_e1$1.x *= -1),
          (_e1$1.y *= -1),
          (_e1$1.z *= -1),
          i.isCubeTexture &&
            !1 === i.isRenderTargetTexture &&
            ((_e1$1.y *= -1), (_e1$1.z *= -1)),
          (d.material.uniforms.envMap.value = i),
          (d.material.uniforms.flipEnvMap.value =
            i.isCubeTexture && !1 === i.isRenderTargetTexture ? -1 : 1),
          (d.material.uniforms.backgroundBlurriness.value =
            t.backgroundBlurriness),
          (d.material.uniforms.backgroundIntensity.value =
            t.backgroundIntensity),
          d.material.uniforms.backgroundRotation.value.setFromMatrix4(
            _m1$1.makeRotationFromEuler(_e1$1)
          ),
          (d.material.toneMapped =
            ColorManagement.getTransfer(i.colorSpace) !== SRGBTransfer),
          (u === i && p === i.version && m === r.toneMapping) ||
            ((d.material.needsUpdate = !0),
            (u = i),
            (p = i.version),
            (m = r.toneMapping)),
          d.layers.enableAll(),
          e.unshift(d, d.geometry, d.material, 0, 0, null))
        : i &&
          i.isTexture &&
          (void 0 === c &&
            ((c = new Mesh(
              new PlaneGeometry(2, 2),
              new ShaderMaterial({
                name: "BackgroundMaterial",
                uniforms: cloneUniforms(ShaderLib.background.uniforms),
                vertexShader: ShaderLib.background.vertexShader,
                fragmentShader: ShaderLib.background.fragmentShader,
                side: FrontSide,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              })
            )).geometry.deleteAttribute("normal"),
            Object.defineProperty(c.material, "map", {
              get: function () {
                return this.uniforms.t2D.value;
              },
            }),
            s.update(c)),
          (c.material.uniforms.t2D.value = i),
          (c.material.uniforms.backgroundIntensity.value =
            t.backgroundIntensity),
          (c.material.toneMapped =
            ColorManagement.getTransfer(i.colorSpace) !== SRGBTransfer),
          !0 === i.matrixAutoUpdate && i.updateMatrix(),
          c.material.uniforms.uvTransform.value.copy(i.matrix),
          (u === i && p === i.version && m === r.toneMapping) ||
            ((c.material.needsUpdate = !0),
            (u = i),
            (p = i.version),
            (m = r.toneMapping)),
          c.layers.enableAll(),
          e.unshift(c, c.geometry, c.material, 0, 0, null));
    },
  };
}
function WebGLBindingStates(L, C) {
  let n = L.getParameter(L.MAX_VERTEX_ATTRIBS),
    P = {},
    e = U(null),
    I = e,
    D = !1;
  function N(e) {
    L.bindVertexArray(e);
  }
  function a(e) {
    L.deleteVertexArray(e);
  }
  function U(e) {
    var t = [],
      i = [],
      r = [];
    for (let e = 0; e < n; e++) (t[e] = 0), (i[e] = 0), (r[e] = 0);
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: t,
      enabledAttributes: i,
      attributeDivisors: r,
      object: e,
      attributes: {},
      index: null,
    };
  }
  function O() {
    var i = I.newAttributes;
    for (let e = 0, t = i.length; e < t; e++) i[e] = 0;
  }
  function B(e) {
    F(e, 0);
  }
  function F(e, t) {
    var i = I.newAttributes,
      r = I.enabledAttributes,
      n = I.attributeDivisors;
    (i[e] = 1),
      0 === r[e] && (L.enableVertexAttribArray(e), (r[e] = 1)),
      n[e] !== t && (L.vertexAttribDivisor(e, t), (n[e] = t));
  }
  function G() {
    var i = I.newAttributes,
      r = I.enabledAttributes;
    for (let e = 0, t = r.length; e < t; e++)
      r[e] !== i[e] && (L.disableVertexAttribArray(e), (r[e] = 0));
  }
  function V(e, t, i, r, n, a, s) {
    !0 === s
      ? L.vertexAttribIPointer(e, t, i, n, a)
      : L.vertexAttribPointer(e, t, i, r, n, a);
  }
  function s() {
    t(), (D = !0), I !== e && N((I = e).object);
  }
  function t() {
    (e.geometry = null), (e.program = null), (e.wireframe = !1);
  }
  return {
    setup: function (n, e, a, s, o) {
      var t = ((e, t, i) => {
        let r = !0 === i.wireframe,
          n = P[e.id],
          a = (void 0 === n && ((n = {}), (P[e.id] = n)), n[t.id]),
          s = (void 0 === a && ((a = {}), (n[t.id] = a)), a[r]);
        return void 0 === s && ((s = U(L.createVertexArray())), (a[r] = s)), s;
      })(s, a, e);
      if (
        (I !== t && N((I = t).object),
        (t = ((t, e, i, r) => {
          let n = I.attributes,
            a = e.attributes,
            s = 0,
            o = i.getAttributes();
          for (var l in o)
            if (0 <= o[l].location) {
              var h = n[l];
              let e = a[l];
              if (
                (void 0 === e &&
                  ("instanceMatrix" === l &&
                    t.instanceMatrix &&
                    (e = t.instanceMatrix),
                  "instanceColor" === l) &&
                  t.instanceColor &&
                  (e = t.instanceColor),
                void 0 === h)
              )
                return !0;
              if (h.attribute !== e) return !0;
              if (e && h.data !== e.data) return !0;
              s++;
            }
          return I.attributesNum !== s || I.index !== r;
        })(n, s, a, o)))
      ) {
        var l,
          h = n,
          c = a,
          d = o;
        let t = {},
          i = s.attributes,
          r = 0,
          e = c.getAttributes();
        for (l in e)
          if (0 <= e[l].location) {
            let e = i[l];
            void 0 === e &&
              ("instanceMatrix" === l &&
                h.instanceMatrix &&
                (e = h.instanceMatrix),
              "instanceColor" === l) &&
              h.instanceColor &&
              (e = h.instanceColor);
            var u = {};
            (u.attribute = e) && e.data && (u.data = e.data), (t[l] = u), r++;
          }
        (I.attributes = t), (I.attributesNum = r), (I.index = d);
      }
      if ((null !== o && C.update(o, L.ELEMENT_ARRAY_BUFFER), t || D)) {
        D = !1;
        var i = n,
          c = e,
          d = a,
          r = s;
        O();
        var p,
          m = r.attributes,
          f = d.getAttributes(),
          g = c.defaultAttributeValues;
        for (p in f) {
          var _ = f[p];
          if (0 <= _.location) {
            let t = m[p];
            if (
              void 0 !==
              (t =
                void 0 === t &&
                ("instanceMatrix" === p &&
                  i.instanceMatrix &&
                  (t = i.instanceMatrix),
                "instanceColor" === p) &&
                i.instanceColor
                  ? i.instanceColor
                  : t)
            ) {
              var v = t.normalized,
                x = t.itemSize,
                y = C.get(t);
              if (void 0 !== y) {
                var S = y.buffer,
                  M = y.type,
                  T = y.bytesPerElement,
                  E =
                    M === L.INT ||
                    M === L.UNSIGNED_INT ||
                    t.gpuType === IntType;
                if (t.isInterleavedBufferAttribute) {
                  var b = t.data,
                    R = b.stride,
                    A = t.offset;
                  if (b.isInstancedInterleavedBuffer) {
                    for (let e = 0; e < _.locationSize; e++)
                      F(_.location + e, b.meshPerAttribute);
                    !0 !== i.isInstancedMesh &&
                      void 0 === r._maxInstanceCount &&
                      (r._maxInstanceCount = b.meshPerAttribute * b.count);
                  } else
                    for (let e = 0; e < _.locationSize; e++) B(_.location + e);
                  L.bindBuffer(L.ARRAY_BUFFER, S);
                  for (let e = 0; e < _.locationSize; e++)
                    V(
                      _.location + e,
                      x / _.locationSize,
                      M,
                      v,
                      R * T,
                      (A + (x / _.locationSize) * e) * T,
                      E
                    );
                } else {
                  if (t.isInstancedBufferAttribute) {
                    for (let e = 0; e < _.locationSize; e++)
                      F(_.location + e, t.meshPerAttribute);
                    !0 !== i.isInstancedMesh &&
                      void 0 === r._maxInstanceCount &&
                      (r._maxInstanceCount = t.meshPerAttribute * t.count);
                  } else
                    for (let e = 0; e < _.locationSize; e++) B(_.location + e);
                  L.bindBuffer(L.ARRAY_BUFFER, S);
                  for (let e = 0; e < _.locationSize; e++)
                    V(
                      _.location + e,
                      x / _.locationSize,
                      M,
                      v,
                      x * T,
                      (x / _.locationSize) * e * T,
                      E
                    );
                }
              }
            } else if (void 0 !== g) {
              var w = g[p];
              if (void 0 !== w)
                switch (w.length) {
                  case 2:
                    L.vertexAttrib2fv(_.location, w);
                    break;
                  case 3:
                    L.vertexAttrib3fv(_.location, w);
                    break;
                  case 4:
                    L.vertexAttrib4fv(_.location, w);
                    break;
                  default:
                    L.vertexAttrib1fv(_.location, w);
                }
            }
          }
        }
        G(),
          null !== o && L.bindBuffer(L.ELEMENT_ARRAY_BUFFER, C.get(o).buffer);
      }
    },
    reset: s,
    resetDefaultState: t,
    dispose: function () {
      for (var e in (s(), P)) {
        var t,
          i = P[e];
        for (t in i) {
          var r,
            n = i[t];
          for (r in n) a(n[r].object), delete n[r];
          delete i[t];
        }
        delete P[e];
      }
    },
    releaseStatesOfGeometry: function (e) {
      if (void 0 !== P[e.id]) {
        var t,
          i = P[e.id];
        for (t in i) {
          var r,
            n = i[t];
          for (r in n) a(n[r].object), delete n[r];
          delete i[t];
        }
        delete P[e.id];
      }
    },
    releaseStatesOfProgram: function (e) {
      for (var t in P) {
        t = P[t];
        if (void 0 !== t[e.id]) {
          var i,
            r = t[e.id];
          for (i in r) a(r[i].object), delete r[i];
          delete t[e.id];
        }
      }
    },
    initAttributes: O,
    enableAttribute: B,
    disableUnusedAttributes: G,
  };
}
function WebGLBufferRenderer(r, t, s) {
  let o;
  function l(e, t, i) {
    0 !== i && (r.drawArraysInstanced(o, e, t, i), s.update(t, o, i));
  }
  (this.setMode = function (e) {
    o = e;
  }),
    (this.render = function (e, t) {
      r.drawArrays(o, e, t), s.update(t, o, 1);
    }),
    (this.renderInstances = l),
    (this.renderMultiDraw = function (i, r, n) {
      if (0 !== n) {
        var e = t.get("WEBGL_multi_draw");
        if (null === e) for (let e = 0; e < n; e++) this.render(i[e], r[e]);
        else {
          e.multiDrawArraysWEBGL(o, i, 0, r, 0, n);
          let t = 0;
          for (let e = 0; e < n; e++) t += r[e];
          s.update(t, o, 1);
        }
      }
    }),
    (this.renderMultiDrawInstances = function (i, r, n, a) {
      if (0 !== n) {
        var e = t.get("WEBGL_multi_draw");
        if (null === e) for (let e = 0; e < i.length; e++) l(i[e], r[e], a[e]);
        else {
          e.multiDrawArraysInstancedWEBGL(o, i, 0, r, 0, a, 0, n);
          let t = 0;
          for (let e = 0; e < n; e++) t += r[e];
          for (let e = 0; e < a.length; e++) s.update(t, o, a[e]);
        }
      }
    });
}
function WebGLCapabilities(i, r, e, n) {
  let t;
  function a(e) {
    if ("highp" === e) {
      if (
        0 <
          i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision &&
        0 <
          i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision
      )
        return "highp";
      e = "mediump";
    }
    return "mediump" === e &&
      0 <
        i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision &&
      0 <
        i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision
      ? "mediump"
      : "lowp";
  }
  let s = void 0 !== e.precision ? e.precision : "highp";
  var o = a(s),
    o =
      (o !== s &&
        (console.warn(
          "THREE.WebGLRenderer:",
          s,
          "not supported, using",
          o,
          "instead."
        ),
        (s = o)),
      !0 === e.logarithmicDepthBuffer),
    e = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),
    l = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    h = i.getParameter(i.MAX_TEXTURE_SIZE),
    c = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),
    d = i.getParameter(i.MAX_VERTEX_ATTRIBS),
    u = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),
    p = i.getParameter(i.MAX_VARYING_VECTORS),
    m = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),
    f = 0 < l,
    g = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: function () {
      var e;
      return (t =
        void 0 === t
          ? !0 === r.has("EXT_texture_filter_anisotropic")
            ? ((e = r.get("EXT_texture_filter_anisotropic")),
              i.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT))
            : 0
          : t);
    },
    getMaxPrecision: a,
    textureFormatReadable: function (e) {
      return (
        e === RGBAFormat ||
        n.convert(e) === i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)
      );
    },
    textureTypeReadable: function (e) {
      var t =
        e === HalfFloatType &&
        (r.has("EXT_color_buffer_half_float") ||
          r.has("EXT_color_buffer_float"));
      return !(
        e !== UnsignedByteType &&
        n.convert(e) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) &&
        e !== FloatType &&
        !t
      );
    },
    precision: s,
    logarithmicDepthBuffer: o,
    maxTextures: e,
    maxVertexTextures: l,
    maxTextureSize: h,
    maxCubemapSize: c,
    maxAttributes: d,
    maxVertexUniforms: u,
    maxVaryings: p,
    maxFragmentUniforms: m,
    vertexTextures: f,
    maxSamples: g,
  };
}
function WebGLClipping(l) {
  let h = this,
    c = null,
    d = 0,
    u = !1,
    p = !1,
    o = new Plane(),
    m = new Matrix3(),
    f = { value: null, needsUpdate: !1 };
  function g(i, e, r, t) {
    var n = null !== i ? i.length : 0;
    let a = null;
    if (0 !== n) {
      if (((a = f.value), !0 !== t || null === a)) {
        var t = r + 4 * n,
          s = e.matrixWorldInverse;
        m.getNormalMatrix(s),
          (null === a || a.length < t) && (a = new Float32Array(t));
        for (let e = 0, t = r; e !== n; ++e, t += 4)
          o.copy(i[e]).applyMatrix4(s, m),
            o.normal.toArray(a, t),
            (a[t + 3] = o.constant);
      }
      (f.value = a), (f.needsUpdate = !0);
    }
    return (h.numPlanes = n), (h.numIntersection = 0), a;
  }
  (this.uniform = f),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (e, t) {
      var i = 0 !== e.length || t || 0 !== d || u;
      return (u = t), (d = e.length), i;
    }),
    (this.beginShadows = function () {
      (p = !0), g(null);
    }),
    (this.endShadows = function () {
      p = !1;
    }),
    (this.setGlobalState = function (e, t) {
      c = g(e, t, 0);
    }),
    (this.setState = function (e, t, i) {
      var r = e.clippingPlanes,
        n = e.clipIntersection,
        a = e.clipShadows,
        e = l.get(e);
      if (!u || null === r || 0 === r.length || (p && !a))
        p
          ? g(null)
          : (f.value !== c && ((f.value = c), (f.needsUpdate = 0 < d)),
            (h.numPlanes = d),
            (h.numIntersection = 0));
      else {
        var a = p ? 0 : d,
          s = 4 * a,
          o = e.clippingState || null;
        (f.value = o), (o = g(r, t, s, i));
        for (let e = 0; e !== s; ++e) o[e] = c[e];
        (e.clippingState = o),
          (this.numIntersection = n ? this.numPlanes : 0),
          (this.numPlanes += a);
      }
    });
}
function WebGLCubeMaps(i) {
  let r = new WeakMap();
  function n(e, t) {
    return (
      t === EquirectangularReflectionMapping
        ? (e.mapping = CubeReflectionMapping)
        : t === EquirectangularRefractionMapping &&
          (e.mapping = CubeRefractionMapping),
      e
    );
  }
  function a(e) {
    var e = e.target,
      t = (e.removeEventListener("dispose", a), r.get(e));
    void 0 !== t && (r.delete(e), t.dispose());
  }
  return {
    get: function (e) {
      if (e && e.isTexture) {
        var t = e.mapping;
        if (
          t === EquirectangularReflectionMapping ||
          t === EquirectangularRefractionMapping
        )
          return r.has(e)
            ? n(r.get(e).texture, e.mapping)
            : (t = e.image) && 0 < t.height
            ? ((t = new WebGLCubeRenderTarget(
                t.height
              )).fromEquirectangularTexture(i, e),
              r.set(e, t),
              e.addEventListener("dispose", a),
              n(t.texture, e.mapping))
            : null;
      }
      return e;
    },
    dispose: function () {
      r = new WeakMap();
    },
  };
}
class OrthographicCamera extends Camera {
  constructor(e = -1, t = 1, i = 1, r = -1, n = 0.1, a = 2e3) {
    super(),
      (this.isOrthographicCamera = !0),
      (this.type = "OrthographicCamera"),
      (this.zoom = 1),
      (this.view = null),
      (this.left = e),
      (this.right = t),
      (this.top = i),
      (this.bottom = r),
      (this.near = n),
      (this.far = a),
      this.updateProjectionMatrix();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.left = e.left),
      (this.right = e.right),
      (this.top = e.top),
      (this.bottom = e.bottom),
      (this.near = e.near),
      (this.far = e.far),
      (this.zoom = e.zoom),
      (this.view = null === e.view ? null : Object.assign({}, e.view)),
      this
    );
  }
  setViewOffset(e, t, i, r, n, a) {
    null === this.view &&
      (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1,
      }),
      (this.view.enabled = !0),
      (this.view.fullWidth = e),
      (this.view.fullHeight = t),
      (this.view.offsetX = i),
      (this.view.offsetY = r),
      (this.view.width = n),
      (this.view.height = a),
      this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1),
      this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    var e = (this.right - this.left) / (2 * this.zoom),
      t = (this.top - this.bottom) / (2 * this.zoom),
      i = (this.right + this.left) / 2,
      r = (this.top + this.bottom) / 2;
    let n = i - e,
      a = i + e,
      s = r + t,
      o = r - t;
    null !== this.view &&
      this.view.enabled &&
      ((i = (this.right - this.left) / this.view.fullWidth / this.zoom),
      (e = (this.top - this.bottom) / this.view.fullHeight / this.zoom),
      (n += i * this.view.offsetX),
      (a = n + i * this.view.width),
      (s -= e * this.view.offsetY),
      (o = s - e * this.view.height)),
      this.projectionMatrix.makeOrthographic(
        n,
        a,
        s,
        o,
        this.near,
        this.far,
        this.coordinateSystem
      ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    e = super.toJSON(e);
    return (
      (e.object.zoom = this.zoom),
      (e.object.left = this.left),
      (e.object.right = this.right),
      (e.object.top = this.top),
      (e.object.bottom = this.bottom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      null !== this.view && (e.object.view = Object.assign({}, this.view)),
      e
    );
  }
}
let LOD_MIN = 4,
  EXTRA_LOD_SIGMA = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  MAX_SAMPLES = 20,
  _flatCamera = new OrthographicCamera(),
  _clearColor = new Color(),
  _oldTarget = null,
  _oldActiveCubeFace = 0,
  _oldActiveMipmapLevel = 0,
  _oldXrEnabled = !1,
  PHI = (1 + Math.sqrt(5)) / 2,
  INV_PHI = 1 / PHI,
  _axisDirections = [
    new Vector3(-PHI, INV_PHI, 0),
    new Vector3(PHI, INV_PHI, 0),
    new Vector3(-INV_PHI, 0, PHI),
    new Vector3(INV_PHI, 0, PHI),
    new Vector3(0, PHI, -INV_PHI),
    new Vector3(0, PHI, INV_PHI),
    new Vector3(-1, 1, -1),
    new Vector3(1, 1, -1),
    new Vector3(-1, 1, 1),
    new Vector3(1, 1, 1),
  ];
class PMREMGenerator {
  constructor(e) {
    (this._renderer = e),
      (this._pingPongRenderTarget = null),
      (this._lodMax = 0),
      (this._cubeSize = 0),
      (this._lodPlanes = []),
      (this._sizeLods = []),
      (this._sigmas = []),
      (this._blurMaterial = null),
      (this._cubemapMaterial = null),
      (this._equirectMaterial = null),
      this._compileMaterial(this._blurMaterial);
  }
  fromScene(e, t = 0, i = 0.1, r = 100) {
    (_oldTarget = this._renderer.getRenderTarget()),
      (_oldActiveCubeFace = this._renderer.getActiveCubeFace()),
      (_oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel()),
      (_oldXrEnabled = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1),
      this._setSize(256);
    var n = this._allocateTargets();
    return (
      (n.depthBuffer = !0),
      this._sceneToCubeUV(e, i, r, n),
      0 < t && this._blur(n, 0, 0, t),
      this._applyPMREM(n),
      this._cleanup(n),
      n
    );
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    null === this._cubemapMaterial &&
      ((this._cubemapMaterial = _getCubemapMaterial()),
      this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    null === this._equirectMaterial &&
      ((this._equirectMaterial = _getEquirectMaterial()),
      this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(),
      null !== this._cubemapMaterial && this._cubemapMaterial.dispose(),
      null !== this._equirectMaterial && this._equirectMaterial.dispose();
  }
  _setSize(e) {
    (this._lodMax = Math.floor(Math.log2(e))),
      (this._cubeSize = Math.pow(2, this._lodMax));
  }
  _dispose() {
    null !== this._blurMaterial && this._blurMaterial.dispose(),
      null !== this._pingPongRenderTarget &&
        this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(
      _oldTarget,
      _oldActiveCubeFace,
      _oldActiveMipmapLevel
    ),
      (this._renderer.xr.enabled = _oldXrEnabled),
      (e.scissorTest = !1),
      _setViewport(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === CubeReflectionMapping || e.mapping === CubeRefractionMapping
      ? this._setSize(
          0 === e.image.length ? 16 : e.image[0].width || e.image[0].image.width
        )
      : this._setSize(e.image.width / 4),
      (_oldTarget = this._renderer.getRenderTarget()),
      (_oldActiveCubeFace = this._renderer.getActiveCubeFace()),
      (_oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel()),
      (_oldXrEnabled = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1);
    t = t || this._allocateTargets();
    return (
      this._textureToCubeUV(e, t), this._applyPMREM(t), this._cleanup(t), t
    );
  }
  _allocateTargets() {
    var e = 3 * Math.max(this._cubeSize, 112),
      t = 4 * this._cubeSize,
      i = {
        magFilter: LinearFilter,
        minFilter: LinearFilter,
        generateMipmaps: !1,
        type: HalfFloatType,
        format: RGBAFormat,
        colorSpace: LinearSRGBColorSpace,
        depthBuffer: !1,
      },
      r = _createRenderTarget(e, t, i);
    return (
      (null !== this._pingPongRenderTarget &&
        this._pingPongRenderTarget.width === e &&
        this._pingPongRenderTarget.height === t) ||
        (null !== this._pingPongRenderTarget && this._dispose(),
        (this._pingPongRenderTarget = _createRenderTarget(e, t, i)),
        (i = this._lodMax),
        ({
          sizeLods: this._sizeLods,
          lodPlanes: this._lodPlanes,
          sigmas: this._sigmas,
        } = _createPlanes(i)),
        (this._blurMaterial = _getBlurShader(i, e, t))),
      r
    );
  }
  _compileMaterial(e) {
    e = new Mesh(this._lodPlanes[0], e);
    this._renderer.compile(e, _flatCamera);
  }
  _sceneToCubeUV(t, e, i, r) {
    var n = new PerspectiveCamera(90, 1, e, i),
      a = [1, -1, 1, 1, 1, 1],
      s = [1, 1, 1, -1, -1, -1],
      o = this._renderer,
      e = o.autoClear,
      i = o.toneMapping,
      l =
        (o.getClearColor(_clearColor),
        (o.toneMapping = NoToneMapping),
        (o.autoClear = !1),
        new MeshBasicMaterial({
          name: "PMREM.Background",
          side: BackSide,
          depthWrite: !1,
          depthTest: !1,
        })),
      h = new Mesh(new BoxGeometry(), l);
    let c = !1;
    var d = t.background;
    d
      ? d.isColor && (l.color.copy(d), (t.background = null), (c = !0))
      : (l.color.copy(_clearColor), (c = !0));
    for (let e = 0; e < 6; e++) {
      var u = e % 3,
        p =
          (0 == u
            ? (n.up.set(0, a[e], 0), n.lookAt(s[e], 0, 0))
            : 1 == u
            ? (n.up.set(0, 0, a[e]), n.lookAt(0, s[e], 0))
            : (n.up.set(0, a[e], 0), n.lookAt(0, 0, s[e])),
          this._cubeSize);
      _setViewport(r, u * p, 2 < e ? p : 0, p, p),
        o.setRenderTarget(r),
        c && o.render(h, n),
        o.render(t, n);
    }
    h.geometry.dispose(),
      h.material.dispose(),
      (o.toneMapping = i),
      (o.autoClear = e),
      (t.background = d);
  }
  _textureToCubeUV(e, t) {
    var i = this._renderer,
      r =
        e.mapping === CubeReflectionMapping ||
        e.mapping === CubeRefractionMapping,
      r =
        (r
          ? (null === this._cubemapMaterial &&
              (this._cubemapMaterial = _getCubemapMaterial()),
            (this._cubemapMaterial.uniforms.flipEnvMap.value =
              !1 === e.isRenderTargetTexture ? -1 : 1))
          : null === this._equirectMaterial &&
            (this._equirectMaterial = _getEquirectMaterial()),
        r ? this._cubemapMaterial : this._equirectMaterial),
      n = new Mesh(this._lodPlanes[0], r),
      r = ((r.uniforms.envMap.value = e), this._cubeSize);
    _setViewport(t, 0, 0, 3 * r, 2 * r),
      i.setRenderTarget(t),
      i.render(n, _flatCamera);
  }
  _applyPMREM(t) {
    var e = this._renderer,
      i = e.autoClear,
      r = ((e.autoClear = !1), this._lodPlanes.length);
    for (let e = 1; e < r; e++) {
      var n = Math.sqrt(
          this._sigmas[e] * this._sigmas[e] -
            this._sigmas[e - 1] * this._sigmas[e - 1]
        ),
        a = _axisDirections[(r - e - 1) % _axisDirections.length];
      this._blur(t, e - 1, e, n, a);
    }
    e.autoClear = i;
  }
  _blur(e, t, i, r, n) {
    var a = this._pingPongRenderTarget;
    this._halfBlur(e, a, t, i, r, "latitudinal", n),
      this._halfBlur(a, e, i, i, r, "longitudinal", n);
  }
  _halfBlur(e, t, i, r, n, a, s) {
    var o = this._renderer,
      l = this._blurMaterial,
      h =
        ("latitudinal" !== a &&
          "longitudinal" !== a &&
          console.error(
            "blur direction must be either latitudinal or longitudinal!"
          ),
        new Mesh(this._lodPlanes[r], l)),
      l = l.uniforms,
      c = this._sizeLods[i] - 1,
      c = isFinite(n)
        ? Math.PI / (2 * c)
        : (2 * Math.PI) / (2 * MAX_SAMPLES - 1),
      d = n / c,
      u = isFinite(n) ? 1 + Math.floor(3 * d) : MAX_SAMPLES,
      p =
        (u > MAX_SAMPLES &&
          console.warn(
            `sigmaRadians, ${n}, is too large and will clip, as it requested ${u} samples when the maximum is set to ` +
              MAX_SAMPLES
          ),
        []);
    let m = 0;
    for (let t = 0; t < MAX_SAMPLES; ++t) {
      let e = t / d;
      var f = Math.exp((-e * e) / 2);
      p.push(f), 0 === t ? (m += f) : t < u && (m += 2 * f);
    }
    for (let e = 0; e < p.length; e++) p[e] = p[e] / m;
    (l.envMap.value = e.texture),
      (l.samples.value = u),
      (l.weights.value = p),
      (l.latitudinal.value = "latitudinal" === a),
      s && (l.poleAxis.value = s);
    (n = this._lodMax),
      (l.dTheta.value = c),
      (l.mipInt.value = n - i),
      (e = this._sizeLods[r]);
    let g = 3 * e * (r > n - LOD_MIN ? r - n + LOD_MIN : 0);
    a = 4 * (this._cubeSize - e);
    _setViewport(t, g, a, 3 * e, 2 * e),
      o.setRenderTarget(t),
      o.render(h, _flatCamera);
  }
}
function _createPlanes(i) {
  var r = [],
    n = [],
    a = [];
  let s = i;
  var e = i - LOD_MIN + 1 + EXTRA_LOD_SIGMA.length;
  for (let t = 0; t < e; t++) {
    var o = Math.pow(2, s);
    n.push(o);
    let e = 1 / o;
    t > i - LOD_MIN
      ? (e = EXTRA_LOD_SIGMA[t - i + LOD_MIN - 1])
      : 0 === t && (e = 0),
      a.push(e);
    var o = 1 / (o - 2),
      l = -o,
      o = 1 + o,
      h = [l, l, o, l, o, o, l, l, o, o, l, o],
      c = new Float32Array(108),
      d = new Float32Array(72),
      u = new Float32Array(36);
    for (let e = 0; e < 6; e++) {
      var p = ((e % 3) * 2) / 3 - 1,
        m = 2 < e ? 0 : -1,
        p =
          (c.set(
            [
              p,
              m,
              0,
              p + 2 / 3,
              m,
              0,
              p + 2 / 3,
              1 + m,
              0,
              p,
              m,
              0,
              p + 2 / 3,
              1 + m,
              0,
              p,
              1 + m,
              0,
            ],
            18 * e
          ),
          d.set(h, 12 * e),
          [e, e, e, e, e, e]);
      u.set(p, 6 * e);
    }
    l = new BufferGeometry();
    l.setAttribute("position", new BufferAttribute(c, 3)),
      l.setAttribute("uv", new BufferAttribute(d, 2)),
      l.setAttribute("faceIndex", new BufferAttribute(u, 1)),
      r.push(l),
      s > LOD_MIN && s--;
  }
  return { lodPlanes: r, sizeLods: n, sigmas: a };
}
function _createRenderTarget(e, t, i) {
  e = new WebGLRenderTarget(e, t, i);
  return (
    (e.texture.mapping = CubeUVReflectionMapping),
    (e.texture.name = "PMREM.cubeUv"),
    (e.scissorTest = !0),
    e
  );
}
function _setViewport(e, t, i, r, n) {
  e.viewport.set(t, i, r, n), e.scissor.set(t, i, r, n);
}
function _getBlurShader(e, t, i) {
  var r = new Float32Array(MAX_SAMPLES),
    n = new Vector3(0, 1, 0);
  return new ShaderMaterial({
    name: "SphericalGaussianBlur",
    defines: {
      n: MAX_SAMPLES,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / i,
      CUBEUV_MAX_MIP: e + ".0",
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: r },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: n },
    },
    vertexShader: _getCommonVertexShader(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: NoBlending,
    depthTest: !1,
    depthWrite: !1,
  });
}
function _getEquirectMaterial() {
  return new ShaderMaterial({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: _getCommonVertexShader(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: NoBlending,
    depthTest: !1,
    depthWrite: !1,
  });
}
function _getCubemapMaterial() {
  return new ShaderMaterial({
    name: "CubemapToCubeUV",
    uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
    vertexShader: _getCommonVertexShader(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: NoBlending,
    depthTest: !1,
    depthWrite: !1,
  });
}
function _getCommonVertexShader() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function WebGLCubeUVMaps(a) {
  let s = new WeakMap(),
    o = null;
  function l(e) {
    var e = e.target,
      t = (e.removeEventListener("dispose", l), s.get(e));
    void 0 !== t && (s.delete(e), t.dispose());
  }
  return {
    get: function (t) {
      if (t && t.isTexture) {
        var i = t.mapping,
          r =
            i === EquirectangularReflectionMapping ||
            i === EquirectangularRefractionMapping,
          i = i === CubeReflectionMapping || i === CubeRefractionMapping;
        if (r || i) {
          let e = s.get(t);
          var n = void 0 !== e ? e.texture.pmremVersion : 0;
          return t.isRenderTargetTexture && t.pmremVersion !== n
            ? (null === o && (o = new PMREMGenerator(a)),
              ((e = r
                ? o.fromEquirectangular(t, e)
                : o.fromCubemap(t, e)).texture.pmremVersion = t.pmremVersion),
              s.set(t, e),
              e.texture)
            : void 0 !== e
            ? e.texture
            : ((n = t.image),
              (r && n && 0 < n.height) ||
              (i &&
                n &&
                ((t) => {
                  let i = 0;
                  for (let e = 0; e < 6; e++) void 0 !== t[e] && i++;
                  return 6 === i;
                })(n))
                ? (null === o && (o = new PMREMGenerator(a)),
                  ((e = r
                    ? o.fromEquirectangular(t)
                    : o.fromCubemap(t)).texture.pmremVersion = t.pmremVersion),
                  s.set(t, e),
                  t.addEventListener("dispose", l),
                  e.texture)
                : null);
        }
      }
      return t;
    },
    dispose: function () {
      (s = new WeakMap()), null !== o && (o.dispose(), (o = null));
    },
  };
}
function WebGLExtensions(i) {
  let r = {};
  function n(e) {
    if (void 0 !== r[e]) return r[e];
    let t;
    switch (e) {
      case "WEBGL_depth_texture":
        t =
          i.getExtension("WEBGL_depth_texture") ||
          i.getExtension("MOZ_WEBGL_depth_texture") ||
          i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        t =
          i.getExtension("EXT_texture_filter_anisotropic") ||
          i.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
          i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        t =
          i.getExtension("WEBGL_compressed_texture_s3tc") ||
          i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
          i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        t =
          i.getExtension("WEBGL_compressed_texture_pvrtc") ||
          i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        t = i.getExtension(e);
    }
    return (r[e] = t);
  }
  return {
    has: function (e) {
      return null !== n(e);
    },
    init: function () {
      n("EXT_color_buffer_float"),
        n("WEBGL_clip_cull_distance"),
        n("OES_texture_float_linear"),
        n("EXT_color_buffer_half_float"),
        n("WEBGL_multisampled_render_to_texture"),
        n("WEBGL_render_shared_exponent");
    },
    get: function (e) {
      var t = n(e);
      return (
        null === t &&
          console.warn(
            "THREE.WebGLRenderer: " + e + " extension not supported."
          ),
        t
      );
    },
  };
}
function WebGLGeometries(s, u, a, o) {
  let l = {},
    p = new WeakMap();
  function h(e) {
    var t,
      i,
      r = e.target;
    for (t in (null !== r.index && u.remove(r.index), r.attributes))
      u.remove(r.attributes[t]);
    for (i in r.morphAttributes) {
      var n = r.morphAttributes[i];
      for (let e = 0, t = n.length; e < t; e++) u.remove(n[e]);
    }
    r.removeEventListener("dispose", h), delete l[r.id];
    e = p.get(r);
    e && (u.remove(e), p.delete(r)),
      o.releaseStatesOfGeometry(r),
      !0 === r.isInstancedBufferGeometry && delete r._maxInstanceCount,
      a.memory.geometries--;
  }
  function r(e) {
    var i = [],
      r = e.index,
      t = e.attributes.position;
    let n = 0;
    if (null !== r) {
      var a = r.array;
      n = r.version;
      for (let e = 0, t = a.length; e < t; e += 3) {
        var s = a[e + 0],
          o = a[e + 1],
          l = a[e + 2];
        i.push(s, o, o, l, l, s);
      }
    } else {
      if (void 0 === t) return;
      r = t.array;
      n = t.version;
      for (let e = 0, t = r.length / 3 - 1; e < t; e += 3) {
        var h = e + 0,
          c = e + 1,
          d = e + 2;
        i.push(h, c, c, d, d, h);
      }
    }
    (t = new (
      arrayNeedsUint32(i) ? Uint32BufferAttribute : Uint16BufferAttribute
    )(i, 1)),
      (t.version = n),
      (r = p.get(e));
    r && u.remove(r), p.set(e, t);
  }
  return {
    get: function (e, t) {
      return (
        !0 !== l[t.id] &&
          (t.addEventListener("dispose", h),
          (l[t.id] = !0),
          a.memory.geometries++),
        t
      );
    },
    update: function (e) {
      var t,
        i = e.attributes;
      for (t in i) u.update(i[t], s.ARRAY_BUFFER);
      var r,
        n = e.morphAttributes;
      for (r in n) {
        var a = n[r];
        for (let e = 0, t = a.length; e < t; e++)
          u.update(a[e], s.ARRAY_BUFFER);
      }
    },
    getWireframeAttribute: function (e) {
      var t,
        i = p.get(e);
      return (
        (!i || (null !== (t = e.index) && i.version < t.version)) && r(e),
        p.get(e)
      );
    },
  };
}
function WebGLIndexedBufferRenderer(r, t, s) {
  let o;
  let l, h;
  function c(e, t, i) {
    0 !== i && (r.drawElementsInstanced(o, t, l, e * h, i), s.update(t, o, i));
  }
  (this.setMode = function (e) {
    o = e;
  }),
    (this.setIndex = function (e) {
      (l = e.type), (h = e.bytesPerElement);
    }),
    (this.render = function (e, t) {
      r.drawElements(o, t, l, e * h), s.update(t, o, 1);
    }),
    (this.renderInstances = c),
    (this.renderMultiDraw = function (i, r, n) {
      if (0 !== n) {
        var e = t.get("WEBGL_multi_draw");
        if (null === e) for (let e = 0; e < n; e++) this.render(i[e] / h, r[e]);
        else {
          e.multiDrawElementsWEBGL(o, r, 0, l, i, 0, n);
          let t = 0;
          for (let e = 0; e < n; e++) t += r[e];
          s.update(t, o, 1);
        }
      }
    }),
    (this.renderMultiDrawInstances = function (i, r, n, a) {
      if (0 !== n) {
        var e = t.get("WEBGL_multi_draw");
        if (null === e)
          for (let e = 0; e < i.length; e++) c(i[e] / h, r[e], a[e]);
        else {
          e.multiDrawElementsInstancedWEBGL(o, r, 0, l, i, 0, a, 0, n);
          let t = 0;
          for (let e = 0; e < n; e++) t += r[e];
          for (let e = 0; e < a.length; e++) s.update(t, o, a[e]);
        }
      }
    });
}
function WebGLInfo(r) {
  let n = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  return {
    memory: { geometries: 0, textures: 0 },
    render: n,
    programs: null,
    autoReset: !0,
    reset: function () {
      (n.calls = 0), (n.triangles = 0), (n.points = 0), (n.lines = 0);
    },
    update: function (e, t, i) {
      switch ((n.calls++, t)) {
        case r.TRIANGLES:
          n.triangles += i * (e / 3);
          break;
        case r.LINES:
          n.lines += i * (e / 2);
          break;
        case r.LINE_STRIP:
          n.lines += i * (e - 1);
          break;
        case r.LINE_LOOP:
          n.lines += i * e;
          break;
        case r.POINTS:
          n.points += i * e;
          break;
        default:
          console.error("THREE.WebGLInfo: Unknown draw mode:", t);
      }
    },
  };
}
function WebGLMorphtargets(S, M, t) {
  let T = new WeakMap(),
    E = new Vector4();
  return {
    update: function (e, n, i) {
      var r = e.morphTargetInfluences,
        a =
          n.morphAttributes.position ||
          n.morphAttributes.normal ||
          n.morphAttributes.color,
        s = void 0 !== a ? a.length : 0;
      let o = T.get(n);
      if (void 0 === o || o.count !== s) {
        void 0 !== o && o.texture.dispose();
        var l = void 0 !== n.morphAttributes.position,
          h = void 0 !== n.morphAttributes.normal,
          c = void 0 !== n.morphAttributes.color,
          d = n.morphAttributes.position || [],
          u = n.morphAttributes.normal || [],
          p = n.morphAttributes.color || [];
        let e = !0 == c ? 3 : !0 == h ? 2 : !0 == l ? 1 : 0,
          t = n.attributes.position.count * e,
          i = 1;
        t > M.maxTextureSize &&
          ((i = Math.ceil(t / M.maxTextureSize)), (t = M.maxTextureSize));
        var m = new Float32Array(t * i * 4 * s);
        let r = new DataArrayTexture(m, t, i, s);
        (r.type = FloatType), (r.needsUpdate = !0);
        var f = 4 * e;
        for (let e = 0; e < s; e++) {
          var g = d[e],
            _ = u[e],
            v = p[e],
            x = t * i * 4 * e;
          for (let e = 0; e < g.count; e++) {
            var y = e * f;
            !0 == l &&
              (E.fromBufferAttribute(g, e),
              (m[x + y] = E.x),
              (m[x + y + 1] = E.y),
              (m[x + y + 2] = E.z),
              (m[x + y + 3] = 0)),
              !0 == h &&
                (E.fromBufferAttribute(_, e),
                (m[x + y + 4] = E.x),
                (m[x + y + 5] = E.y),
                (m[x + y + 6] = E.z),
                (m[x + y + 7] = 0)),
              !0 == c &&
                (E.fromBufferAttribute(v, e),
                (m[x + y + 8] = E.x),
                (m[x + y + 9] = E.y),
                (m[x + y + 10] = E.z),
                (m[x + y + 11] = 4 === v.itemSize ? E.w : 1));
          }
        }
        (o = { count: s, texture: r, size: new Vector2(t, i) }),
          T.set(n, o),
          n.addEventListener("dispose", function e() {
            r.dispose(), T.delete(n), n.removeEventListener("dispose", e);
          });
      }
      if (!0 === e.isInstancedMesh && null !== e.morphTexture)
        i.getUniforms().setValue(S, "morphTexture", e.morphTexture, t);
      else {
        let t = 0;
        for (let e = 0; e < r.length; e++) t += r[e];
        a = n.morphTargetsRelative ? 1 : 1 - t;
        i.getUniforms().setValue(S, "morphTargetBaseInfluence", a),
          i.getUniforms().setValue(S, "morphTargetInfluences", r);
      }
      i.getUniforms().setValue(S, "morphTargetsTexture", o.texture, t),
        i.getUniforms().setValue(S, "morphTargetsTextureSize", o.size);
    },
  };
}
function WebGLObjects(r, n, a, s) {
  let o = new WeakMap();
  function l(e) {
    e = e.target;
    e.removeEventListener("dispose", l),
      a.remove(e.instanceMatrix),
      null !== e.instanceColor && a.remove(e.instanceColor);
  }
  return {
    update: function (e) {
      var t = s.render.frame,
        i = e.geometry,
        i = n.get(e, i);
      return (
        o.get(i) !== t && (n.update(i), o.set(i, t)),
        e.isInstancedMesh &&
          (!1 === e.hasEventListener("dispose", l) &&
            e.addEventListener("dispose", l),
          o.get(e) !== t) &&
          (a.update(e.instanceMatrix, r.ARRAY_BUFFER),
          null !== e.instanceColor && a.update(e.instanceColor, r.ARRAY_BUFFER),
          o.set(e, t)),
        e.isSkinnedMesh &&
          ((e = e.skeleton), o.get(e) !== t) &&
          (e.update(), o.set(e, t)),
        i
      );
    },
    dispose: function () {
      o = new WeakMap();
    },
  };
}
class DepthTexture extends Texture {
  constructor(e, t, i, r, n, a, s, o, l, h) {
    if (
      (h = void 0 !== h ? h : DepthFormat) !== DepthFormat &&
      h !== DepthStencilFormat
    )
      throw new Error(
        "DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat"
      );
    super(
      null,
      r,
      n,
      a,
      s,
      o,
      h,
      (i =
        void 0 ===
          (i = void 0 === i && h === DepthFormat ? UnsignedIntType : i) &&
        h === DepthStencilFormat
          ? UnsignedInt248Type
          : i),
      l
    ),
      (this.isDepthTexture = !0),
      (this.image = { width: e, height: t }),
      (this.magFilter = void 0 !== s ? s : NearestFilter),
      (this.minFilter = void 0 !== o ? o : NearestFilter),
      (this.flipY = !1),
      (this.generateMipmaps = !1),
      (this.compareFunction = null);
  }
  copy(e) {
    return super.copy(e), (this.compareFunction = e.compareFunction), this;
  }
  toJSON(e) {
    e = super.toJSON(e);
    return (
      null !== this.compareFunction &&
        (e.compareFunction = this.compareFunction),
      e
    );
  }
}
let emptyTexture = new Texture(),
  emptyShadowTexture = new DepthTexture(1, 1),
  emptyArrayTexture =
    ((emptyShadowTexture.compareFunction = LessEqualCompare),
    new DataArrayTexture()),
  empty3dTexture = new Data3DTexture(),
  emptyCubeTexture = new CubeTexture(),
  arrayCacheF32 = [],
  arrayCacheI32 = [],
  mat4array = new Float32Array(16),
  mat3array = new Float32Array(9),
  mat2array = new Float32Array(4);
function flatten(i, r, n) {
  var e = i[0];
  if (e <= 0 || 0 < e) return i;
  var t = r * n;
  let a = arrayCacheF32[t];
  if (
    (void 0 === a && ((a = new Float32Array(t)), (arrayCacheF32[t] = a)),
    0 !== r)
  ) {
    e.toArray(a, 0);
    for (let e = 1, t = 0; e !== r; ++e) (t += n), i[e].toArray(a, t);
  }
  return a;
}
function arraysEqual(i, r) {
  if (i.length !== r.length) return !1;
  for (let e = 0, t = i.length; e < t; e++) if (i[e] !== r[e]) return !1;
  return !0;
}
function copyArray(i, r) {
  for (let e = 0, t = r.length; e < t; e++) i[e] = r[e];
}
function allocTexUnits(t, i) {
  let r = arrayCacheI32[i];
  void 0 === r && ((r = new Int32Array(i)), (arrayCacheI32[i] = r));
  for (let e = 0; e !== i; ++e) r[e] = t.allocateTextureUnit();
  return r;
}
function setValueV1f(e, t) {
  var i = this.cache;
  i[0] !== t && (e.uniform1f(this.addr, t), (i[0] = t));
}
function setValueV2f(e, t) {
  var i = this.cache;
  void 0 !== t.x
    ? (i[0] === t.x && i[1] === t.y) ||
      (e.uniform2f(this.addr, t.x, t.y), (i[0] = t.x), (i[1] = t.y))
    : arraysEqual(i, t) || (e.uniform2fv(this.addr, t), copyArray(i, t));
}
function setValueV3f(e, t) {
  var i = this.cache;
  void 0 !== t.x
    ? (i[0] === t.x && i[1] === t.y && i[2] === t.z) ||
      (e.uniform3f(this.addr, t.x, t.y, t.z),
      (i[0] = t.x),
      (i[1] = t.y),
      (i[2] = t.z))
    : void 0 !== t.r
    ? (i[0] === t.r && i[1] === t.g && i[2] === t.b) ||
      (e.uniform3f(this.addr, t.r, t.g, t.b),
      (i[0] = t.r),
      (i[1] = t.g),
      (i[2] = t.b))
    : arraysEqual(i, t) || (e.uniform3fv(this.addr, t), copyArray(i, t));
}
function setValueV4f(e, t) {
  var i = this.cache;
  void 0 !== t.x
    ? (i[0] === t.x && i[1] === t.y && i[2] === t.z && i[3] === t.w) ||
      (e.uniform4f(this.addr, t.x, t.y, t.z, t.w),
      (i[0] = t.x),
      (i[1] = t.y),
      (i[2] = t.z),
      (i[3] = t.w))
    : arraysEqual(i, t) || (e.uniform4fv(this.addr, t), copyArray(i, t));
}
function setValueM2(e, t) {
  var i = this.cache,
    r = t.elements;
  void 0 === r
    ? arraysEqual(i, t) ||
      (e.uniformMatrix2fv(this.addr, !1, t), copyArray(i, t))
    : arraysEqual(i, r) ||
      (mat2array.set(r),
      e.uniformMatrix2fv(this.addr, !1, mat2array),
      copyArray(i, r));
}
function setValueM3(e, t) {
  var i = this.cache,
    r = t.elements;
  void 0 === r
    ? arraysEqual(i, t) ||
      (e.uniformMatrix3fv(this.addr, !1, t), copyArray(i, t))
    : arraysEqual(i, r) ||
      (mat3array.set(r),
      e.uniformMatrix3fv(this.addr, !1, mat3array),
      copyArray(i, r));
}
function setValueM4(e, t) {
  var i = this.cache,
    r = t.elements;
  void 0 === r
    ? arraysEqual(i, t) ||
      (e.uniformMatrix4fv(this.addr, !1, t), copyArray(i, t))
    : arraysEqual(i, r) ||
      (mat4array.set(r),
      e.uniformMatrix4fv(this.addr, !1, mat4array),
      copyArray(i, r));
}
function setValueV1i(e, t) {
  var i = this.cache;
  i[0] !== t && (e.uniform1i(this.addr, t), (i[0] = t));
}
function setValueV2i(e, t) {
  var i = this.cache;
  void 0 !== t.x
    ? (i[0] === t.x && i[1] === t.y) ||
      (e.uniform2i(this.addr, t.x, t.y), (i[0] = t.x), (i[1] = t.y))
    : arraysEqual(i, t) || (e.uniform2iv(this.addr, t), copyArray(i, t));
}
function setValueV3i(e, t) {
  var i = this.cache;
  void 0 !== t.x
    ? (i[0] === t.x && i[1] === t.y && i[2] === t.z) ||
      (e.uniform3i(this.addr, t.x, t.y, t.z),
      (i[0] = t.x),
      (i[1] = t.y),
      (i[2] = t.z))
    : arraysEqual(i, t) || (e.uniform3iv(this.addr, t), copyArray(i, t));
}
function setValueV4i(e, t) {
  var i = this.cache;
  void 0 !== t.x
    ? (i[0] === t.x && i[1] === t.y && i[2] === t.z && i[3] === t.w) ||
      (e.uniform4i(this.addr, t.x, t.y, t.z, t.w),
      (i[0] = t.x),
      (i[1] = t.y),
      (i[2] = t.z),
      (i[3] = t.w))
    : arraysEqual(i, t) || (e.uniform4iv(this.addr, t), copyArray(i, t));
}
function setValueV1ui(e, t) {
  var i = this.cache;
  i[0] !== t && (e.uniform1ui(this.addr, t), (i[0] = t));
}
function setValueV2ui(e, t) {
  var i = this.cache;
  void 0 !== t.x
    ? (i[0] === t.x && i[1] === t.y) ||
      (e.uniform2ui(this.addr, t.x, t.y), (i[0] = t.x), (i[1] = t.y))
    : arraysEqual(i, t) || (e.uniform2uiv(this.addr, t), copyArray(i, t));
}
function setValueV3ui(e, t) {
  var i = this.cache;
  void 0 !== t.x
    ? (i[0] === t.x && i[1] === t.y && i[2] === t.z) ||
      (e.uniform3ui(this.addr, t.x, t.y, t.z),
      (i[0] = t.x),
      (i[1] = t.y),
      (i[2] = t.z))
    : arraysEqual(i, t) || (e.uniform3uiv(this.addr, t), copyArray(i, t));
}
function setValueV4ui(e, t) {
  var i = this.cache;
  void 0 !== t.x
    ? (i[0] === t.x && i[1] === t.y && i[2] === t.z && i[3] === t.w) ||
      (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w),
      (i[0] = t.x),
      (i[1] = t.y),
      (i[2] = t.z),
      (i[3] = t.w))
    : arraysEqual(i, t) || (e.uniform4uiv(this.addr, t), copyArray(i, t));
}
function setValueT1(e, t, i) {
  var r = this.cache,
    n = i.allocateTextureUnit(),
    r =
      (r[0] !== n && (e.uniform1i(this.addr, n), (r[0] = n)),
      this.type === e.SAMPLER_2D_SHADOW ? emptyShadowTexture : emptyTexture);
  i.setTexture2D(t || r, n);
}
function setValueT3D1(e, t, i) {
  var r = this.cache,
    n = i.allocateTextureUnit();
  r[0] !== n && (e.uniform1i(this.addr, n), (r[0] = n)),
    i.setTexture3D(t || empty3dTexture, n);
}
function setValueT6(e, t, i) {
  var r = this.cache,
    n = i.allocateTextureUnit();
  r[0] !== n && (e.uniform1i(this.addr, n), (r[0] = n)),
    i.setTextureCube(t || emptyCubeTexture, n);
}
function setValueT2DArray1(e, t, i) {
  var r = this.cache,
    n = i.allocateTextureUnit();
  r[0] !== n && (e.uniform1i(this.addr, n), (r[0] = n)),
    i.setTexture2DArray(t || emptyArrayTexture, n);
}
function getSingularSetter(e) {
  switch (e) {
    case 5126:
      return setValueV1f;
    case 35664:
      return setValueV2f;
    case 35665:
      return setValueV3f;
    case 35666:
      return setValueV4f;
    case 35674:
      return setValueM2;
    case 35675:
      return setValueM3;
    case 35676:
      return setValueM4;
    case 5124:
    case 35670:
      return setValueV1i;
    case 35667:
    case 35671:
      return setValueV2i;
    case 35668:
    case 35672:
      return setValueV3i;
    case 35669:
    case 35673:
      return setValueV4i;
    case 5125:
      return setValueV1ui;
    case 36294:
      return setValueV2ui;
    case 36295:
      return setValueV3ui;
    case 36296:
      return setValueV4ui;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return setValueT1;
    case 35679:
    case 36299:
    case 36307:
      return setValueT3D1;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return setValueT6;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return setValueT2DArray1;
  }
}
function setValueV1fArray(e, t) {
  e.uniform1fv(this.addr, t);
}
function setValueV2fArray(e, t) {
  t = flatten(t, this.size, 2);
  e.uniform2fv(this.addr, t);
}
function setValueV3fArray(e, t) {
  t = flatten(t, this.size, 3);
  e.uniform3fv(this.addr, t);
}
function setValueV4fArray(e, t) {
  t = flatten(t, this.size, 4);
  e.uniform4fv(this.addr, t);
}
function setValueM2Array(e, t) {
  t = flatten(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, t);
}
function setValueM3Array(e, t) {
  t = flatten(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, t);
}
function setValueM4Array(e, t) {
  t = flatten(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, t);
}
function setValueV1iArray(e, t) {
  e.uniform1iv(this.addr, t);
}
function setValueV2iArray(e, t) {
  e.uniform2iv(this.addr, t);
}
function setValueV3iArray(e, t) {
  e.uniform3iv(this.addr, t);
}
function setValueV4iArray(e, t) {
  e.uniform4iv(this.addr, t);
}
function setValueV1uiArray(e, t) {
  e.uniform1uiv(this.addr, t);
}
function setValueV2uiArray(e, t) {
  e.uniform2uiv(this.addr, t);
}
function setValueV3uiArray(e, t) {
  e.uniform3uiv(this.addr, t);
}
function setValueV4uiArray(e, t) {
  e.uniform4uiv(this.addr, t);
}
function setValueT1Array(e, t, i) {
  var r = this.cache,
    n = t.length,
    a = allocTexUnits(i, n);
  arraysEqual(r, a) || (e.uniform1iv(this.addr, a), copyArray(r, a));
  for (let e = 0; e !== n; ++e) i.setTexture2D(t[e] || emptyTexture, a[e]);
}
function setValueT3DArray(e, t, i) {
  var r = this.cache,
    n = t.length,
    a = allocTexUnits(i, n);
  arraysEqual(r, a) || (e.uniform1iv(this.addr, a), copyArray(r, a));
  for (let e = 0; e !== n; ++e) i.setTexture3D(t[e] || empty3dTexture, a[e]);
}
function setValueT6Array(e, t, i) {
  var r = this.cache,
    n = t.length,
    a = allocTexUnits(i, n);
  arraysEqual(r, a) || (e.uniform1iv(this.addr, a), copyArray(r, a));
  for (let e = 0; e !== n; ++e)
    i.setTextureCube(t[e] || emptyCubeTexture, a[e]);
}
function setValueT2DArrayArray(e, t, i) {
  var r = this.cache,
    n = t.length,
    a = allocTexUnits(i, n);
  arraysEqual(r, a) || (e.uniform1iv(this.addr, a), copyArray(r, a));
  for (let e = 0; e !== n; ++e)
    i.setTexture2DArray(t[e] || emptyArrayTexture, a[e]);
}
function getPureArraySetter(e) {
  switch (e) {
    case 5126:
      return setValueV1fArray;
    case 35664:
      return setValueV2fArray;
    case 35665:
      return setValueV3fArray;
    case 35666:
      return setValueV4fArray;
    case 35674:
      return setValueM2Array;
    case 35675:
      return setValueM3Array;
    case 35676:
      return setValueM4Array;
    case 5124:
    case 35670:
      return setValueV1iArray;
    case 35667:
    case 35671:
      return setValueV2iArray;
    case 35668:
    case 35672:
      return setValueV3iArray;
    case 35669:
    case 35673:
      return setValueV4iArray;
    case 5125:
      return setValueV1uiArray;
    case 36294:
      return setValueV2uiArray;
    case 36295:
      return setValueV3uiArray;
    case 36296:
      return setValueV4uiArray;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return setValueT1Array;
    case 35679:
    case 36299:
    case 36307:
      return setValueT3DArray;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return setValueT6Array;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return setValueT2DArrayArray;
  }
}
class SingleUniform {
  constructor(e, t, i) {
    (this.id = e),
      (this.addr = i),
      (this.cache = []),
      (this.type = t.type),
      (this.setValue = getSingularSetter(t.type));
  }
}
class PureArrayUniform {
  constructor(e, t, i) {
    (this.id = e),
      (this.addr = i),
      (this.cache = []),
      (this.type = t.type),
      (this.size = t.size),
      (this.setValue = getPureArraySetter(t.type));
  }
}
class StructuredUniform {
  constructor(e) {
    (this.id = e), (this.seq = []), (this.map = {});
  }
  setValue(i, r, n) {
    var a = this.seq;
    for (let e = 0, t = a.length; e !== t; ++e) {
      var s = a[e];
      s.setValue(i, r[s.id], n);
    }
  }
}
let RePathPart = /(\w+)(\])?(\[|\.)?/g;
function addUniform(e, t) {
  e.seq.push(t), (e.map[t.id] = t);
}
function parseUniform(e, i, r) {
  var n = e.name,
    a = n.length;
  for (RePathPart.lastIndex = 0; ; ) {
    var s = RePathPart.exec(n),
      o = RePathPart.lastIndex;
    let t = s[1];
    var l = s[3];
    if (
      ("]" === s[2] && (t |= 0), void 0 === l || ("[" === l && o + 2 === a))
    ) {
      addUniform(
        r,
        new (void 0 === l ? SingleUniform : PureArrayUniform)(t, e, i)
      );
      break;
    }
    {
      let e = r.map[t];
      void 0 === e && addUniform(r, (e = new StructuredUniform(t))), (r = e);
    }
  }
}
class WebGLUniforms {
  constructor(t, i) {
    (this.seq = []), (this.map = {});
    var r = t.getProgramParameter(i, t.ACTIVE_UNIFORMS);
    for (let e = 0; e < r; ++e) {
      var n = t.getActiveUniform(i, e);
      parseUniform(n, t.getUniformLocation(i, n.name), this);
    }
  }
  setValue(e, t, i, r) {
    t = this.map[t];
    void 0 !== t && t.setValue(e, i, r);
  }
  setOptional(e, t, i) {
    t = t[i];
    void 0 !== t && this.setValue(e, i, t);
  }
  static upload(i, r, n, a) {
    for (let e = 0, t = r.length; e !== t; ++e) {
      var s = r[e],
        o = n[s.id];
      !1 !== o.needsUpdate && s.setValue(i, o.value, a);
    }
  }
  static seqWithValue(i, r) {
    var n = [];
    for (let e = 0, t = i.length; e !== t; ++e) {
      var a = i[e];
      a.id in r && n.push(a);
    }
    return n;
  }
}
function WebGLShader(e, t, i) {
  t = e.createShader(t);
  return e.shaderSource(t, i), e.compileShader(t), t;
}
let COMPLETION_STATUS_KHR = 37297,
  programIdCount = 0;
function handleSource(t, i) {
  var r = t.split("\n"),
    n = [],
    t = Math.max(i - 6, 0),
    a = Math.min(i + 6, r.length);
  for (let e = t; e < a; e++) {
    var s = e + 1;
    n.push(`${s === i ? ">" : " "} ${s}: ` + r[e]);
  }
  return n.join("\n");
}
function getEncodingComponents(e) {
  var t = ColorManagement.getPrimaries(ColorManagement.workingColorSpace),
    i = ColorManagement.getPrimaries(e);
  let r;
  switch (
    (t === i
      ? (r = "")
      : t === P3Primaries && i === Rec709Primaries
      ? (r = "LinearDisplayP3ToLinearSRGB")
      : t === Rec709Primaries &&
        i === P3Primaries &&
        (r = "LinearSRGBToLinearDisplayP3"),
    e)
  ) {
    case LinearSRGBColorSpace:
    case LinearDisplayP3ColorSpace:
      return [r, "LinearTransferOETF"];
    case SRGBColorSpace:
    case DisplayP3ColorSpace:
      return [r, "sRGBTransferOETF"];
    default:
      return (
        console.warn("THREE.WebGLProgram: Unsupported color space:", e),
        [r, "LinearTransferOETF"]
      );
  }
}
function getShaderErrors(e, t, i) {
  var r = e.getShaderParameter(t, e.COMPILE_STATUS),
    n = e.getShaderInfoLog(t).trim();
  return r && "" === n
    ? ""
    : (r = /ERROR: 0:(\d+)/.exec(n))
    ? ((r = parseInt(r[1])),
      i.toUpperCase() +
        "\n\n" +
        n +
        "\n\n" +
        handleSource(e.getShaderSource(t), r))
    : n;
}
function getTexelEncodingFunction(e, t) {
  t = getEncodingComponents(t);
  return `vec4 ${e}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`;
}
function getToneMappingFunction(e, t) {
  let i;
  switch (t) {
    case LinearToneMapping:
      i = "Linear";
      break;
    case ReinhardToneMapping:
      i = "Reinhard";
      break;
    case CineonToneMapping:
      i = "OptimizedCineon";
      break;
    case ACESFilmicToneMapping:
      i = "ACESFilmic";
      break;
    case AgXToneMapping:
      i = "AgX";
      break;
    case NeutralToneMapping:
      i = "Neutral";
      break;
    case CustomToneMapping:
      i = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t),
        (i = "Linear");
  }
  return (
    "vec3 " + e + "( vec3 color ) { return " + i + "ToneMapping( color ); }"
  );
}
function generateVertexExtensions(e) {
  return [
    e.extensionClipCullDistance
      ? "#extension GL_ANGLE_clip_cull_distance : require"
      : "",
    e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : "",
  ]
    .filter(filterEmptyLine)
    .join("\n");
}
function generateDefines(e) {
  var t,
    i = [];
  for (t in e) {
    var r = e[t];
    !1 !== r && i.push("#define " + t + " " + r);
  }
  return i.join("\n");
}
function fetchAttributeLocations(i, r) {
  var n = {},
    e = i.getProgramParameter(r, i.ACTIVE_ATTRIBUTES);
  for (let t = 0; t < e; t++) {
    var a = i.getActiveAttrib(r, t),
      s = a.name;
    let e = 1;
    a.type === i.FLOAT_MAT2 && (e = 2),
      a.type === i.FLOAT_MAT3 && (e = 3),
      a.type === i.FLOAT_MAT4 && (e = 4),
      (n[s] = {
        type: a.type,
        location: i.getAttribLocation(r, s),
        locationSize: e,
      });
  }
  return n;
}
function filterEmptyLine(e) {
  return "" !== e;
}
function replaceLightNums(e, t) {
  var i =
    t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e
    .replace(/NUM_DIR_LIGHTS/g, t.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, i)
    .replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, t.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function replaceClippingPlaneNums(e, t) {
  return e
    .replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes)
    .replace(
      /UNION_CLIPPING_PLANES/g,
      t.numClippingPlanes - t.numClipIntersection
    );
}
let includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
function resolveIncludes(e) {
  return e.replace(includePattern, includeReplacer);
}
let shaderChunkMap = new Map();
function includeReplacer(e, t) {
  let i = ShaderChunk[t];
  if (void 0 === i) {
    var r = shaderChunkMap.get(t);
    if (void 0 === r) throw new Error("Can not resolve #include <" + t + ">");
    (i = ShaderChunk[r]),
      console.warn(
        'THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',
        t,
        r
      );
  }
  return resolveIncludes(i);
}
let unrollLoopPattern =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function unrollLoops(e) {
  return e.replace(unrollLoopPattern, loopReplacer);
}
function loopReplacer(e, t, i, r) {
  let n = "";
  for (let e = parseInt(t); e < parseInt(i); e++)
    n += r
      .replace(/\[\s*i\s*\]/g, "[ " + e + " ]")
      .replace(/UNROLLED_LOOP_INDEX/g, e);
  return n;
}
function generatePrecision(e) {
  let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
  return (
    "highp" === e.precision
      ? (t += "\n#define HIGH_PRECISION")
      : "mediump" === e.precision
      ? (t += "\n#define MEDIUM_PRECISION")
      : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"),
    t
  );
}
function generateShadowMapTypeDefine(e) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return (
    e.shadowMapType === PCFShadowMap
      ? (t = "SHADOWMAP_TYPE_PCF")
      : e.shadowMapType === PCFSoftShadowMap
      ? (t = "SHADOWMAP_TYPE_PCF_SOFT")
      : e.shadowMapType === VSMShadowMap && (t = "SHADOWMAP_TYPE_VSM"),
    t
  );
}
function generateEnvMapTypeDefine(e) {
  let t = "ENVMAP_TYPE_CUBE";
  if (e.envMap)
    switch (e.envMapMode) {
      case CubeReflectionMapping:
      case CubeRefractionMapping:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case CubeUVReflectionMapping:
        t = "ENVMAP_TYPE_CUBE_UV";
    }
  return t;
}
function generateEnvMapModeDefine(e) {
  let t = "ENVMAP_MODE_REFLECTION";
  return (t =
    e.envMap && e.envMapMode === CubeRefractionMapping
      ? "ENVMAP_MODE_REFRACTION"
      : t);
}
function generateEnvMapBlendingDefine(e) {
  let t = "ENVMAP_BLENDING_NONE";
  if (e.envMap)
    switch (e.combine) {
      case MultiplyOperation:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case MixOperation:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case AddOperation:
        t = "ENVMAP_BLENDING_ADD";
    }
  return t;
}
function generateCubeUVSize(e) {
  var t,
    e = e.envMapCubeUVHeight;
  return null === e
    ? null
    : ((t = Math.log2(e) - 2),
      (e = 1 / e),
      {
        texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)),
        texelHeight: e,
        maxMip: t,
      });
}
function WebGLProgram(l, e, t, i) {
  let h = l.getContext();
  var r = t.defines,
    n = t.vertexShader,
    a = t.fragmentShader,
    s = generateShadowMapTypeDefine(t),
    o = generateEnvMapTypeDefine(t),
    c = generateEnvMapModeDefine(t),
    d = generateEnvMapBlendingDefine(t),
    u = generateCubeUVSize(t),
    p = generateVertexExtensions(t),
    r = generateDefines(r);
  let m = h.createProgram(),
    f,
    g,
    _ = t.glslVersion ? "#version " + t.glslVersion + "\n" : "";
  t.isRawShaderMaterial
    ? (0 <
        (f = [
          "#define SHADER_TYPE " + t.shaderType,
          "#define SHADER_NAME " + t.shaderName,
          r,
        ]
          .filter(filterEmptyLine)
          .join("\n")).length && (f += "\n"),
      0 <
        (g = [
          "#define SHADER_TYPE " + t.shaderType,
          "#define SHADER_NAME " + t.shaderName,
          r,
        ]
          .filter(filterEmptyLine)
          .join("\n")).length && (g += "\n"))
    : ((f = [
        generatePrecision(t),
        "#define SHADER_TYPE " + t.shaderType,
        "#define SHADER_NAME " + t.shaderName,
        r,
        t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
        t.batching ? "#define USE_BATCHING" : "",
        t.instancing ? "#define USE_INSTANCING" : "",
        t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
        t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
        t.useFog && t.fog ? "#define USE_FOG" : "",
        t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
        t.map ? "#define USE_MAP" : "",
        t.envMap ? "#define USE_ENVMAP" : "",
        t.envMap ? "#define " + c : "",
        t.lightMap ? "#define USE_LIGHTMAP" : "",
        t.aoMap ? "#define USE_AOMAP" : "",
        t.bumpMap ? "#define USE_BUMPMAP" : "",
        t.normalMap ? "#define USE_NORMALMAP" : "",
        t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
        t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        t.anisotropy ? "#define USE_ANISOTROPY" : "",
        t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        t.specularMap ? "#define USE_SPECULARMAP" : "",
        t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        t.metalnessMap ? "#define USE_METALNESSMAP" : "",
        t.alphaMap ? "#define USE_ALPHAMAP" : "",
        t.alphaHash ? "#define USE_ALPHAHASH" : "",
        t.transmission ? "#define USE_TRANSMISSION" : "",
        t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        t.mapUv ? "#define MAP_UV " + t.mapUv : "",
        t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
        t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
        t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
        t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
        t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
        t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
        t.displacementMapUv
          ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv
          : "",
        t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
        t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
        t.anisotropyMapUv
          ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv
          : "",
        t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
        t.clearcoatNormalMapUv
          ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv
          : "",
        t.clearcoatRoughnessMapUv
          ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv
          : "",
        t.iridescenceMapUv
          ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv
          : "",
        t.iridescenceThicknessMapUv
          ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv
          : "",
        t.sheenColorMapUv
          ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv
          : "",
        t.sheenRoughnessMapUv
          ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv
          : "",
        t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
        t.specularColorMapUv
          ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv
          : "",
        t.specularIntensityMapUv
          ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv
          : "",
        t.transmissionMapUv
          ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv
          : "",
        t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
        t.vertexTangents && !1 === t.flatShading ? "#define USE_TANGENT" : "",
        t.vertexColors ? "#define USE_COLOR" : "",
        t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        t.vertexUv1s ? "#define USE_UV1" : "",
        t.vertexUv2s ? "#define USE_UV2" : "",
        t.vertexUv3s ? "#define USE_UV3" : "",
        t.pointsUvs ? "#define USE_POINTS_UV" : "",
        t.flatShading ? "#define FLAT_SHADED" : "",
        t.skinning ? "#define USE_SKINNING" : "",
        t.morphTargets ? "#define USE_MORPHTARGETS" : "",
        t.morphNormals && !1 === t.flatShading
          ? "#define USE_MORPHNORMALS"
          : "",
        t.morphColors ? "#define USE_MORPHCOLORS" : "",
        0 < t.morphTargetsCount ? "#define MORPHTARGETS_TEXTURE" : "",
        0 < t.morphTargetsCount
          ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride
          : "",
        0 < t.morphTargetsCount
          ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount
          : "",
        t.doubleSided ? "#define DOUBLE_SIDED" : "",
        t.flipSided ? "#define FLIP_SIDED" : "",
        t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        t.shadowMapEnabled ? "#define " + s : "",
        t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        0 < t.numLightProbes ? "#define USE_LIGHT_PROBES" : "",
        t.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
        t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        "uniform mat4 modelMatrix;",
        "uniform mat4 modelViewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 viewMatrix;",
        "uniform mat3 normalMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        "#ifdef USE_INSTANCING",
        "\tattribute mat4 instanceMatrix;",
        "#endif",
        "#ifdef USE_INSTANCING_COLOR",
        "\tattribute vec3 instanceColor;",
        "#endif",
        "#ifdef USE_INSTANCING_MORPH",
        "\tuniform sampler2D morphTexture;",
        "#endif",
        "attribute vec3 position;",
        "attribute vec3 normal;",
        "attribute vec2 uv;",
        "#ifdef USE_UV1",
        "\tattribute vec2 uv1;",
        "#endif",
        "#ifdef USE_UV2",
        "\tattribute vec2 uv2;",
        "#endif",
        "#ifdef USE_UV3",
        "\tattribute vec2 uv3;",
        "#endif",
        "#ifdef USE_TANGENT",
        "\tattribute vec4 tangent;",
        "#endif",
        "#if defined( USE_COLOR_ALPHA )",
        "\tattribute vec4 color;",
        "#elif defined( USE_COLOR )",
        "\tattribute vec3 color;",
        "#endif",
        "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
        "\tattribute vec3 morphTarget0;",
        "\tattribute vec3 morphTarget1;",
        "\tattribute vec3 morphTarget2;",
        "\tattribute vec3 morphTarget3;",
        "\t#ifdef USE_MORPHNORMALS",
        "\t\tattribute vec3 morphNormal0;",
        "\t\tattribute vec3 morphNormal1;",
        "\t\tattribute vec3 morphNormal2;",
        "\t\tattribute vec3 morphNormal3;",
        "\t#else",
        "\t\tattribute vec3 morphTarget4;",
        "\t\tattribute vec3 morphTarget5;",
        "\t\tattribute vec3 morphTarget6;",
        "\t\tattribute vec3 morphTarget7;",
        "\t#endif",
        "#endif",
        "#ifdef USE_SKINNING",
        "\tattribute vec4 skinIndex;",
        "\tattribute vec4 skinWeight;",
        "#endif",
        "\n",
      ]
        .filter(filterEmptyLine)
        .join("\n")),
      (g = [
        generatePrecision(t),
        "#define SHADER_TYPE " + t.shaderType,
        "#define SHADER_NAME " + t.shaderName,
        r,
        t.useFog && t.fog ? "#define USE_FOG" : "",
        t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
        t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
        t.map ? "#define USE_MAP" : "",
        t.matcap ? "#define USE_MATCAP" : "",
        t.envMap ? "#define USE_ENVMAP" : "",
        t.envMap ? "#define " + o : "",
        t.envMap ? "#define " + c : "",
        t.envMap ? "#define " + d : "",
        u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "",
        u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "",
        u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "",
        t.lightMap ? "#define USE_LIGHTMAP" : "",
        t.aoMap ? "#define USE_AOMAP" : "",
        t.bumpMap ? "#define USE_BUMPMAP" : "",
        t.normalMap ? "#define USE_NORMALMAP" : "",
        t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        t.anisotropy ? "#define USE_ANISOTROPY" : "",
        t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        t.clearcoat ? "#define USE_CLEARCOAT" : "",
        t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        t.dispersion ? "#define USE_DISPERSION" : "",
        t.iridescence ? "#define USE_IRIDESCENCE" : "",
        t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        t.specularMap ? "#define USE_SPECULARMAP" : "",
        t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        t.metalnessMap ? "#define USE_METALNESSMAP" : "",
        t.alphaMap ? "#define USE_ALPHAMAP" : "",
        t.alphaTest ? "#define USE_ALPHATEST" : "",
        t.alphaHash ? "#define USE_ALPHAHASH" : "",
        t.sheen ? "#define USE_SHEEN" : "",
        t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        t.transmission ? "#define USE_TRANSMISSION" : "",
        t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        t.vertexTangents && !1 === t.flatShading ? "#define USE_TANGENT" : "",
        t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
        t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        t.vertexUv1s ? "#define USE_UV1" : "",
        t.vertexUv2s ? "#define USE_UV2" : "",
        t.vertexUv3s ? "#define USE_UV3" : "",
        t.pointsUvs ? "#define USE_POINTS_UV" : "",
        t.gradientMap ? "#define USE_GRADIENTMAP" : "",
        t.flatShading ? "#define FLAT_SHADED" : "",
        t.doubleSided ? "#define DOUBLE_SIDED" : "",
        t.flipSided ? "#define FLIP_SIDED" : "",
        t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        t.shadowMapEnabled ? "#define " + s : "",
        t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
        0 < t.numLightProbes ? "#define USE_LIGHT_PROBES" : "",
        t.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
        t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
        t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        "uniform mat4 viewMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        t.toneMapping !== NoToneMapping ? "#define TONE_MAPPING" : "",
        t.toneMapping !== NoToneMapping
          ? ShaderChunk.tonemapping_pars_fragment
          : "",
        t.toneMapping !== NoToneMapping
          ? getToneMappingFunction("toneMapping", t.toneMapping)
          : "",
        t.dithering ? "#define DITHERING" : "",
        t.opaque ? "#define OPAQUE" : "",
        ShaderChunk.colorspace_pars_fragment,
        getTexelEncodingFunction("linearToOutputTexel", t.outputColorSpace),
        t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
        "\n",
      ]
        .filter(filterEmptyLine)
        .join("\n"))),
    (n = replaceClippingPlaneNums(replaceLightNums(resolveIncludes(n), t), t)),
    (a = replaceClippingPlaneNums(replaceLightNums(resolveIncludes(a), t), t)),
    (n = unrollLoops(n)),
    (a = unrollLoops(a)),
    !0 !== t.isRawShaderMaterial &&
      ((_ = "#version 300 es\n"),
      (f =
        [
          p,
          "#define attribute in",
          "#define varying out",
          "#define texture2D texture",
        ].join("\n") +
        "\n" +
        f),
      (g =
        [
          "#define varying in",
          t.glslVersion === GLSL3
            ? ""
            : "layout(location = 0) out highp vec4 pc_fragColor;",
          t.glslVersion === GLSL3 ? "" : "#define gl_FragColor pc_fragColor",
          "#define gl_FragDepthEXT gl_FragDepth",
          "#define texture2D texture",
          "#define textureCube texture",
          "#define texture2DProj textureProj",
          "#define texture2DLodEXT textureLod",
          "#define texture2DProjLodEXT textureProjLod",
          "#define textureCubeLodEXT textureLod",
          "#define texture2DGradEXT textureGrad",
          "#define texture2DProjGradEXT textureProjGrad",
          "#define textureCubeGradEXT textureGrad",
        ].join("\n") +
        "\n" +
        g));
  (r = _ + f + n), (o = _ + g + a);
  let v = WebGLShader(h, h.VERTEX_SHADER, r),
    x = WebGLShader(h, h.FRAGMENT_SHADER, o);
  function y(i) {
    if (l.debug.checkShaderErrors) {
      var r,
        n,
        a = h.getProgramInfoLog(m).trim(),
        s = h.getShaderInfoLog(v).trim(),
        o = h.getShaderInfoLog(x).trim();
      let e = !0,
        t = !0;
      !1 === h.getProgramParameter(m, h.LINK_STATUS)
        ? ((e = !1),
          "function" == typeof l.debug.onShaderError
            ? l.debug.onShaderError(h, m, v, x)
            : ((r = getShaderErrors(h, v, "vertex")),
              (n = getShaderErrors(h, x, "fragment")),
              console.error(
                "THREE.WebGLProgram: Shader Error " +
                  h.getError() +
                  " - VALIDATE_STATUS " +
                  h.getProgramParameter(m, h.VALIDATE_STATUS) +
                  "\n\nMaterial Name: " +
                  i.name +
                  "\nMaterial Type: " +
                  i.type +
                  "\n\nProgram Info Log: " +
                  a +
                  "\n" +
                  r +
                  "\n" +
                  n
              )))
        : "" !== a
        ? console.warn("THREE.WebGLProgram: Program Info Log:", a)
        : ("" !== s && "" !== o) || (t = !1),
        t &&
          (i.diagnostics = {
            runnable: e,
            programLog: a,
            vertexShader: { log: s, prefix: f },
            fragmentShader: { log: o, prefix: g },
          });
    }
    h.deleteShader(v),
      h.deleteShader(x),
      (S = new WebGLUniforms(h, m)),
      (M = fetchAttributeLocations(h, m));
  }
  h.attachShader(m, v),
    h.attachShader(m, x),
    void 0 !== t.index0AttributeName
      ? h.bindAttribLocation(m, 0, t.index0AttributeName)
      : !0 === t.morphTargets && h.bindAttribLocation(m, 0, "position"),
    h.linkProgram(m);
  let S;
  this.getUniforms = function () {
    return void 0 === S && y(this), S;
  };
  let M,
    T =
      !(this.getAttributes = function () {
        return void 0 === M && y(this), M;
      }) === t.rendererExtensionParallelShaderCompile;
  return (
    (this.isReady = function () {
      return (T =
        !1 === T ? h.getProgramParameter(m, COMPLETION_STATUS_KHR) : T);
    }),
    (this.destroy = function () {
      i.releaseStatesOfProgram(this),
        h.deleteProgram(m),
        (this.program = void 0);
    }),
    (this.type = t.shaderType),
    (this.name = t.shaderName),
    (this.id = programIdCount++),
    (this.cacheKey = e),
    (this.usedTimes = 1),
    (this.program = m),
    (this.vertexShader = v),
    (this.fragmentShader = x),
    this
  );
}
let _id$1 = 0;
class WebGLShaderCache {
  constructor() {
    (this.shaderCache = new Map()), (this.materialCache = new Map());
  }
  update(e) {
    var t = e.vertexShader,
      i = e.fragmentShader,
      t = this._getShaderStage(t),
      i = this._getShaderStage(i),
      e = this._getShaderCacheForMaterial(e);
    return (
      !1 === e.has(t) && (e.add(t), t.usedTimes++),
      !1 === e.has(i) && (e.add(i), i.usedTimes++),
      this
    );
  }
  remove(e) {
    var t;
    for (t of this.materialCache.get(e))
      t.usedTimes--, 0 === t.usedTimes && this.shaderCache.delete(t.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    var t = this.materialCache;
    let i = t.get(e);
    return void 0 === i && ((i = new Set()), t.set(e, i)), i;
  }
  _getShaderStage(e) {
    var t = this.shaderCache;
    let i = t.get(e);
    return void 0 === i && ((i = new WebGLShaderStage(e)), t.set(e, i)), i;
  }
}
class WebGLShaderStage {
  constructor(e) {
    (this.id = _id$1++), (this.code = e), (this.usedTimes = 0);
  }
}
function WebGLPrograms(ee, te, ie, re, ne, t, ae) {
  let a = new Layers(),
    se = new WebGLShaderCache(),
    oe = new Set(),
    s = [],
    le = ne.logarithmicDepthBuffer,
    he = ne.vertexTextures,
    ce = ne.precision,
    de = {
      MeshDepthMaterial: "depth",
      MeshDistanceMaterial: "distanceRGBA",
      MeshNormalMaterial: "normal",
      MeshBasicMaterial: "basic",
      MeshLambertMaterial: "lambert",
      MeshPhongMaterial: "phong",
      MeshToonMaterial: "toon",
      MeshStandardMaterial: "physical",
      MeshPhysicalMaterial: "physical",
      MeshMatcapMaterial: "matcap",
      LineBasicMaterial: "basic",
      LineDashedMaterial: "dashed",
      PointsMaterial: "points",
      ShadowMaterial: "shadow",
      SpriteMaterial: "sprite",
    };
  function ue(e) {
    return oe.add(e), 0 === e ? "uv" : "uv" + e;
  }
  return {
    getParameters: function (e, t, O, i, r) {
      var n = i.fog,
        a = r.geometry,
        i = e.isMeshStandardMaterial ? i.environment : null,
        B =
          (i = (e.isMeshStandardMaterial ? ie : te).get(e.envMap || i)) &&
          i.mapping === CubeUVReflectionMapping
            ? i.image.height
            : null,
        s = de[e.type];
      null !== e.precision &&
        (ce = ne.getMaxPrecision(e.precision)) !== e.precision &&
        console.warn(
          "THREE.WebGLProgram.getParameters:",
          e.precision,
          "not supported, using",
          ce,
          "instead."
        );
      var o =
        void 0 !==
        (o =
          a.morphAttributes.position ||
          a.morphAttributes.normal ||
          a.morphAttributes.color)
          ? o.length
          : 0;
      let l = 0;
      void 0 !== a.morphAttributes.position && (l = 1),
        void 0 !== a.morphAttributes.normal && (l = 2),
        void 0 !== a.morphAttributes.color && (l = 3);
      let h, c, d, u;
      s
        ? ((p = ShaderLib[s]), (h = p.vertexShader), (c = p.fragmentShader))
        : ((h = e.vertexShader),
          (c = e.fragmentShader),
          se.update(e),
          (d = se.getVertexShaderID(e)),
          (u = se.getFragmentShaderID(e)));
      var p = ee.getRenderTarget(),
        m = !0 === r.isInstancedMesh,
        F = !0 === r.isBatchedMesh,
        f = !!e.map,
        G = !!e.matcap,
        g = !!i,
        _ = !!e.aoMap,
        v = !!e.lightMap,
        x = !!e.bumpMap,
        y = !!e.normalMap,
        S = !!e.displacementMap,
        M = !!e.emissiveMap,
        T = !!e.metalnessMap,
        E = !!e.roughnessMap,
        b = 0 < e.anisotropy,
        R = 0 < e.clearcoat,
        V = 0 < e.dispersion,
        A = 0 < e.iridescence,
        w = 0 < e.sheen,
        L = 0 < e.transmission,
        C = b && !!e.anisotropyMap,
        P = R && !!e.clearcoatMap,
        I = R && !!e.clearcoatNormalMap,
        D = R && !!e.clearcoatRoughnessMap,
        N = A && !!e.iridescenceMap,
        z = A && !!e.iridescenceThicknessMap,
        k = w && !!e.sheenColorMap,
        H = w && !!e.sheenRoughnessMap,
        W = !!e.specularMap,
        X = !!e.specularColorMap,
        $ = !!e.specularIntensityMap,
        q = L && !!e.transmissionMap,
        j = L && !!e.thicknessMap,
        Y = !!e.gradientMap,
        U = !!e.alphaMap,
        K = 0 < e.alphaTest,
        Z = !!e.alphaHash,
        J = !!e.extensions;
      let Q = NoToneMapping;
      return (
        !e.toneMapped ||
          (null !== p && !0 !== p.isXRRenderTarget) ||
          (Q = ee.toneMapping),
        ((s = {
          shaderID: s,
          shaderType: e.type,
          shaderName: e.name,
          vertexShader: h,
          fragmentShader: c,
          defines: e.defines,
          customVertexShaderID: d,
          customFragmentShaderID: u,
          isRawShaderMaterial: !0 === e.isRawShaderMaterial,
          glslVersion: e.glslVersion,
          precision: ce,
          batching: F,
          instancing: m,
          instancingColor: m && null !== r.instanceColor,
          instancingMorph: m && null !== r.morphTexture,
          supportsVertexTextures: he,
          outputColorSpace:
            null === p
              ? ee.outputColorSpace
              : !0 === p.isXRRenderTarget
              ? p.texture.colorSpace
              : LinearSRGBColorSpace,
          alphaToCoverage: !!e.alphaToCoverage,
          map: f,
          matcap: G,
          envMap: g,
          envMapMode: g && i.mapping,
          envMapCubeUVHeight: B,
          aoMap: _,
          lightMap: v,
          bumpMap: x,
          normalMap: y,
          displacementMap: he && S,
          emissiveMap: M,
          normalMapObjectSpace: y && e.normalMapType === ObjectSpaceNormalMap,
          normalMapTangentSpace: y && e.normalMapType === TangentSpaceNormalMap,
          metalnessMap: T,
          roughnessMap: E,
          anisotropy: b,
          anisotropyMap: C,
          clearcoat: R,
          clearcoatMap: P,
          clearcoatNormalMap: I,
          clearcoatRoughnessMap: D,
          dispersion: V,
          iridescence: A,
          iridescenceMap: N,
          iridescenceThicknessMap: z,
          sheen: w,
          sheenColorMap: k,
          sheenRoughnessMap: H,
          specularMap: W,
          specularColorMap: X,
          specularIntensityMap: $,
          transmission: L,
          transmissionMap: q,
          thicknessMap: j,
          gradientMap: Y,
          opaque:
            !1 === e.transparent &&
            e.blending === NormalBlending &&
            !1 === e.alphaToCoverage,
          alphaMap: U,
          alphaTest: K,
          alphaHash: Z,
          combine: e.combine,
          mapUv: f && ue(e.map.channel),
          aoMapUv: _ && ue(e.aoMap.channel),
          lightMapUv: v && ue(e.lightMap.channel),
          bumpMapUv: x && ue(e.bumpMap.channel),
          normalMapUv: y && ue(e.normalMap.channel),
          displacementMapUv: S && ue(e.displacementMap.channel),
          emissiveMapUv: M && ue(e.emissiveMap.channel),
          metalnessMapUv: T && ue(e.metalnessMap.channel),
          roughnessMapUv: E && ue(e.roughnessMap.channel),
          anisotropyMapUv: C && ue(e.anisotropyMap.channel),
          clearcoatMapUv: P && ue(e.clearcoatMap.channel),
          clearcoatNormalMapUv: I && ue(e.clearcoatNormalMap.channel),
          clearcoatRoughnessMapUv: D && ue(e.clearcoatRoughnessMap.channel),
          iridescenceMapUv: N && ue(e.iridescenceMap.channel),
          iridescenceThicknessMapUv: z && ue(e.iridescenceThicknessMap.channel),
          sheenColorMapUv: k && ue(e.sheenColorMap.channel),
          sheenRoughnessMapUv: H && ue(e.sheenRoughnessMap.channel),
          specularMapUv: W && ue(e.specularMap.channel),
          specularColorMapUv: X && ue(e.specularColorMap.channel),
          specularIntensityMapUv: $ && ue(e.specularIntensityMap.channel),
          transmissionMapUv: q && ue(e.transmissionMap.channel),
          thicknessMapUv: j && ue(e.thicknessMap.channel),
          alphaMapUv: U && ue(e.alphaMap.channel),
          vertexTangents: !!a.attributes.tangent && (y || b),
          vertexColors: e.vertexColors,
          vertexAlphas:
            !0 === e.vertexColors &&
            !!a.attributes.color &&
            4 === a.attributes.color.itemSize,
          pointsUvs: !0 === r.isPoints && !!a.attributes.uv && (f || U),
          fog: !!n,
          useFog: !0 === e.fog,
          fogExp2: !!n && n.isFogExp2,
          flatShading: !0 === e.flatShading,
          sizeAttenuation: !0 === e.sizeAttenuation,
          logarithmicDepthBuffer: le,
          skinning: !0 === r.isSkinnedMesh,
          morphTargets: void 0 !== a.morphAttributes.position,
          morphNormals: void 0 !== a.morphAttributes.normal,
          morphColors: void 0 !== a.morphAttributes.color,
          morphTargetsCount: o,
          morphTextureStride: l,
          numDirLights: t.directional.length,
          numPointLights: t.point.length,
          numSpotLights: t.spot.length,
          numSpotLightMaps: t.spotLightMap.length,
          numRectAreaLights: t.rectArea.length,
          numHemiLights: t.hemi.length,
          numDirLightShadows: t.directionalShadowMap.length,
          numPointLightShadows: t.pointShadowMap.length,
          numSpotLightShadows: t.spotShadowMap.length,
          numSpotLightShadowsWithMaps: t.numSpotLightShadowsWithMaps,
          numLightProbes: t.numLightProbes,
          numClippingPlanes: ae.numPlanes,
          numClipIntersection: ae.numIntersection,
          dithering: e.dithering,
          shadowMapEnabled: ee.shadowMap.enabled && 0 < O.length,
          shadowMapType: ee.shadowMap.type,
          toneMapping: Q,
          useLegacyLights: ee._useLegacyLights,
          decodeVideoTexture:
            f &&
            !0 === e.map.isVideoTexture &&
            ColorManagement.getTransfer(e.map.colorSpace) === SRGBTransfer,
          premultipliedAlpha: e.premultipliedAlpha,
          doubleSided: e.side === DoubleSide,
          flipSided: e.side === BackSide,
          useDepthPacking: 0 <= e.depthPacking,
          depthPacking: e.depthPacking || 0,
          index0AttributeName: e.index0AttributeName,
          extensionClipCullDistance:
            J &&
            !0 === e.extensions.clipCullDistance &&
            re.has("WEBGL_clip_cull_distance"),
          extensionMultiDraw:
            J && !0 === e.extensions.multiDraw && re.has("WEBGL_multi_draw"),
          rendererExtensionParallelShaderCompile: re.has(
            "KHR_parallel_shader_compile"
          ),
          customProgramCacheKey: e.customProgramCacheKey(),
        }).vertexUv1s = oe.has(1)),
        (s.vertexUv2s = oe.has(2)),
        (s.vertexUv3s = oe.has(3)),
        oe.clear(),
        s
      );
    },
    getProgramCacheKey: function (e) {
      var t,
        i,
        r = [];
      if (
        (e.shaderID
          ? r.push(e.shaderID)
          : (r.push(e.customVertexShaderID), r.push(e.customFragmentShaderID)),
        void 0 !== e.defines)
      )
        for (var n in e.defines) r.push(n), r.push(e.defines[n]);
      return (
        !1 === e.isRawShaderMaterial &&
          ((t = r).push((i = e).precision),
          t.push(i.outputColorSpace),
          t.push(i.envMapMode),
          t.push(i.envMapCubeUVHeight),
          t.push(i.mapUv),
          t.push(i.alphaMapUv),
          t.push(i.lightMapUv),
          t.push(i.aoMapUv),
          t.push(i.bumpMapUv),
          t.push(i.normalMapUv),
          t.push(i.displacementMapUv),
          t.push(i.emissiveMapUv),
          t.push(i.metalnessMapUv),
          t.push(i.roughnessMapUv),
          t.push(i.anisotropyMapUv),
          t.push(i.clearcoatMapUv),
          t.push(i.clearcoatNormalMapUv),
          t.push(i.clearcoatRoughnessMapUv),
          t.push(i.iridescenceMapUv),
          t.push(i.iridescenceThicknessMapUv),
          t.push(i.sheenColorMapUv),
          t.push(i.sheenRoughnessMapUv),
          t.push(i.specularMapUv),
          t.push(i.specularColorMapUv),
          t.push(i.specularIntensityMapUv),
          t.push(i.transmissionMapUv),
          t.push(i.thicknessMapUv),
          t.push(i.combine),
          t.push(i.fogExp2),
          t.push(i.sizeAttenuation),
          t.push(i.morphTargetsCount),
          t.push(i.morphAttributeCount),
          t.push(i.numDirLights),
          t.push(i.numPointLights),
          t.push(i.numSpotLights),
          t.push(i.numSpotLightMaps),
          t.push(i.numHemiLights),
          t.push(i.numRectAreaLights),
          t.push(i.numDirLightShadows),
          t.push(i.numPointLightShadows),
          t.push(i.numSpotLightShadows),
          t.push(i.numSpotLightShadowsWithMaps),
          t.push(i.numLightProbes),
          t.push(i.shadowMapType),
          t.push(i.toneMapping),
          t.push(i.numClippingPlanes),
          t.push(i.numClipIntersection),
          t.push(i.depthPacking),
          (t = r),
          (i = e),
          a.disableAll(),
          i.supportsVertexTextures && a.enable(0),
          i.instancing && a.enable(1),
          i.instancingColor && a.enable(2),
          i.instancingMorph && a.enable(3),
          i.matcap && a.enable(4),
          i.envMap && a.enable(5),
          i.normalMapObjectSpace && a.enable(6),
          i.normalMapTangentSpace && a.enable(7),
          i.clearcoat && a.enable(8),
          i.iridescence && a.enable(9),
          i.alphaTest && a.enable(10),
          i.vertexColors && a.enable(11),
          i.vertexAlphas && a.enable(12),
          i.vertexUv1s && a.enable(13),
          i.vertexUv2s && a.enable(14),
          i.vertexUv3s && a.enable(15),
          i.vertexTangents && a.enable(16),
          i.anisotropy && a.enable(17),
          i.alphaHash && a.enable(18),
          i.batching && a.enable(19),
          i.dispersion && a.enable(20),
          t.push(a.mask),
          a.disableAll(),
          i.fog && a.enable(0),
          i.useFog && a.enable(1),
          i.flatShading && a.enable(2),
          i.logarithmicDepthBuffer && a.enable(3),
          i.skinning && a.enable(4),
          i.morphTargets && a.enable(5),
          i.morphNormals && a.enable(6),
          i.morphColors && a.enable(7),
          i.premultipliedAlpha && a.enable(8),
          i.shadowMapEnabled && a.enable(9),
          i.useLegacyLights && a.enable(10),
          i.doubleSided && a.enable(11),
          i.flipSided && a.enable(12),
          i.useDepthPacking && a.enable(13),
          i.dithering && a.enable(14),
          i.transmission && a.enable(15),
          i.sheen && a.enable(16),
          i.opaque && a.enable(17),
          i.pointsUvs && a.enable(18),
          i.decodeVideoTexture && a.enable(19),
          i.alphaToCoverage && a.enable(20),
          t.push(a.mask),
          r.push(ee.outputColorSpace)),
        r.push(e.customProgramCacheKey),
        r.join()
      );
    },
    getUniforms: function (e) {
      var t = de[e.type];
      let i;
      return (i = t
        ? ((t = ShaderLib[t]), UniformsUtils.clone(t.uniforms))
        : e.uniforms);
    },
    acquireProgram: function (e, i) {
      let r;
      for (let e = 0, t = s.length; e < t; e++) {
        var n = s[e];
        if (n.cacheKey === i) {
          ++(r = n).usedTimes;
          break;
        }
      }
      return (
        void 0 === r && ((r = new WebGLProgram(ee, i, e, t)), s.push(r)), r
      );
    },
    releaseProgram: function (e) {
      var t;
      0 == --e.usedTimes &&
        ((t = s.indexOf(e)), (s[t] = s[s.length - 1]), s.pop(), e.destroy());
    },
    releaseShaderCache: function (e) {
      se.remove(e);
    },
    programs: s,
    dispose: function () {
      se.dispose();
    },
  };
}
function WebGLProperties() {
  let r = new WeakMap();
  return {
    get: function (e) {
      let t = r.get(e);
      return void 0 === t && ((t = {}), r.set(e, t)), t;
    },
    remove: function (e) {
      r.delete(e);
    },
    update: function (e, t, i) {
      r.get(e)[t] = i;
    },
    dispose: function () {
      r = new WeakMap();
    },
  };
}
function painterSortStable(e, t) {
  return e.groupOrder !== t.groupOrder
    ? e.groupOrder - t.groupOrder
    : e.renderOrder !== t.renderOrder
    ? e.renderOrder - t.renderOrder
    : e.material.id !== t.material.id
    ? e.material.id - t.material.id
    : e.z !== t.z
    ? e.z - t.z
    : e.id - t.id;
}
function reversePainterSortStable(e, t) {
  return e.groupOrder !== t.groupOrder
    ? e.groupOrder - t.groupOrder
    : e.renderOrder !== t.renderOrder
    ? e.renderOrder - t.renderOrder
    : e.z !== t.z
    ? t.z - e.z
    : e.id - t.id;
}
function WebGLRenderList() {
  let o = [],
    l = 0,
    s = [],
    h = [],
    c = [];
  function d(e, t, i, r, n, a) {
    let s = o[l];
    return (
      void 0 === s
        ? ((s = {
            id: e.id,
            object: e,
            geometry: t,
            material: i,
            groupOrder: r,
            renderOrder: e.renderOrder,
            z: n,
            group: a,
          }),
          (o[l] = s))
        : ((s.id = e.id),
          (s.object = e),
          (s.geometry = t),
          (s.material = i),
          (s.groupOrder = r),
          (s.renderOrder = e.renderOrder),
          (s.z = n),
          (s.group = a)),
      l++,
      s
    );
  }
  return {
    opaque: s,
    transmissive: h,
    transparent: c,
    init: function () {
      (l = 0), (s.length = 0), (h.length = 0), (c.length = 0);
    },
    push: function (e, t, i, r, n, a) {
      (e = d(e, t, i, r, n, a)),
        (0 < i.transmission ? h : !0 === i.transparent ? c : s).push(e);
    },
    unshift: function (e, t, i, r, n, a) {
      (e = d(e, t, i, r, n, a)),
        (0 < i.transmission ? h : !0 === i.transparent ? c : s).unshift(e);
    },
    finish: function () {
      for (let e = l, t = o.length; e < t; e++) {
        var i = o[e];
        if (null === i.id) break;
        (i.id = null),
          (i.object = null),
          (i.geometry = null),
          (i.material = null),
          (i.group = null);
      }
    },
    sort: function (e, t) {
      1 < s.length && s.sort(e || painterSortStable),
        1 < h.length && h.sort(t || reversePainterSortStable),
        1 < c.length && c.sort(t || reversePainterSortStable);
    },
  };
}
function WebGLRenderLists() {
  let n = new WeakMap();
  return {
    get: function (e, t) {
      var i = n.get(e);
      let r;
      return (
        void 0 === i
          ? ((r = new WebGLRenderList()), n.set(e, [r]))
          : t >= i.length
          ? ((r = new WebGLRenderList()), i.push(r))
          : (r = i[t]),
        r
      );
    },
    dispose: function () {
      n = new WeakMap();
    },
  };
}
function UniformsCache() {
  let i = {};
  return {
    get: function (e) {
      if (void 0 !== i[e.id]) return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = { direction: new Vector3(), color: new Color() };
          break;
        case "SpotLight":
          t = {
            position: new Vector3(),
            direction: new Vector3(),
            color: new Color(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0,
          };
          break;
        case "PointLight":
          t = {
            position: new Vector3(),
            color: new Color(),
            distance: 0,
            decay: 0,
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new Vector3(),
            skyColor: new Color(),
            groundColor: new Color(),
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Color(),
            position: new Vector3(),
            halfWidth: new Vector3(),
            halfHeight: new Vector3(),
          };
      }
      return (i[e.id] = t);
    },
  };
}
function ShadowUniformsCache() {
  let i = {};
  return {
    get: function (e) {
      if (void 0 !== i[e.id]) return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
        case "SpotLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Vector2(),
          };
          break;
        case "PointLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Vector2(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3,
          };
      }
      return (i[e.id] = t);
    },
  };
}
let nextVersion = 0;
function shadowCastingAndTexturingLightsFirst(e, t) {
  return (
    (t.castShadow ? 2 : 0) -
    (e.castShadow ? 2 : 0) +
    (t.map ? 1 : 0) -
    (e.map ? 1 : 0)
  );
}
function WebGLLights(t) {
  let A = new UniformsCache(),
    w = ShadowUniformsCache(),
    L = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0,
    };
  for (let e = 0; e < 9; e++) L.probe.push(new Vector3());
  let p = new Vector3(),
    m = new Matrix4(),
    f = new Matrix4();
  return {
    setup: function (i, e) {
      let r = 0,
        n = 0,
        a = 0;
      for (let e = 0; e < 9; e++) L.probe[e].set(0, 0, 0);
      let s = 0,
        o = 0,
        l = 0,
        h = 0,
        c = 0,
        d = 0,
        u = 0,
        p = 0,
        m = 0,
        f = 0,
        g = 0;
      i.sort(shadowCastingAndTexturingLightsFirst);
      var _ = !0 === e ? Math.PI : 1;
      for (let e = 0, t = i.length; e < t; e++) {
        var v,
          x,
          y,
          S,
          M = i[e],
          T = M.color,
          E = M.intensity,
          b = M.distance,
          R = M.shadow && M.shadow.map ? M.shadow.map.texture : null;
        if (M.isAmbientLight)
          (r += T.r * E * _), (n += T.g * E * _), (a += T.b * E * _);
        else if (M.isLightProbe) {
          for (let e = 0; e < 9; e++)
            L.probe[e].addScaledVector(M.sh.coefficients[e], E);
          g++;
        } else
          M.isDirectionalLight
            ? ((y = A.get(M)).color
                .copy(M.color)
                .multiplyScalar(M.intensity * _),
              M.castShadow &&
                ((v = M.shadow),
                ((x = w.get(M)).shadowBias = v.bias),
                (x.shadowNormalBias = v.normalBias),
                (x.shadowRadius = v.radius),
                (x.shadowMapSize = v.mapSize),
                (L.directionalShadow[s] = x),
                (L.directionalShadowMap[s] = R),
                (L.directionalShadowMatrix[s] = M.shadow.matrix),
                d++),
              (L.directional[s] = y),
              s++)
            : M.isSpotLight
            ? ((v = A.get(M)).position.setFromMatrixPosition(M.matrixWorld),
              v.color.copy(T).multiplyScalar(E * _),
              (v.distance = b),
              (v.coneCos = Math.cos(M.angle)),
              (v.penumbraCos = Math.cos(M.angle * (1 - M.penumbra))),
              (v.decay = M.decay),
              (L.spot[l] = v),
              (x = M.shadow),
              M.map &&
                ((L.spotLightMap[m] = M.map),
                m++,
                x.updateMatrices(M),
                M.castShadow) &&
                f++,
              (L.spotLightMatrix[l] = x.matrix),
              M.castShadow &&
                (((y = w.get(M)).shadowBias = x.bias),
                (y.shadowNormalBias = x.normalBias),
                (y.shadowRadius = x.radius),
                (y.shadowMapSize = x.mapSize),
                (L.spotShadow[l] = y),
                (L.spotShadowMap[l] = R),
                p++),
              l++)
            : M.isRectAreaLight
            ? ((b = A.get(M)).color.copy(T).multiplyScalar(E),
              b.halfWidth.set(0.5 * M.width, 0, 0),
              b.halfHeight.set(0, 0.5 * M.height, 0),
              (L.rectArea[h] = b),
              h++)
            : M.isPointLight
            ? ((T = A.get(M)).color
                .copy(M.color)
                .multiplyScalar(M.intensity * _),
              (T.distance = M.distance),
              (T.decay = M.decay),
              M.castShadow &&
                ((b = M.shadow),
                ((S = w.get(M)).shadowBias = b.bias),
                (S.shadowNormalBias = b.normalBias),
                (S.shadowRadius = b.radius),
                (S.shadowMapSize = b.mapSize),
                (S.shadowCameraNear = b.camera.near),
                (S.shadowCameraFar = b.camera.far),
                (L.pointShadow[o] = S),
                (L.pointShadowMap[o] = R),
                (L.pointShadowMatrix[o] = M.shadow.matrix),
                u++),
              (L.point[o] = T),
              o++)
            : M.isHemisphereLight &&
              ((b = A.get(M)).skyColor.copy(M.color).multiplyScalar(E * _),
              b.groundColor.copy(M.groundColor).multiplyScalar(E * _),
              (L.hemi[c] = b),
              c++);
      }
      0 < h &&
        (!0 === t.has("OES_texture_float_linear")
          ? ((L.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1),
            (L.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2))
          : ((L.rectAreaLTC1 = UniformsLib.LTC_HALF_1),
            (L.rectAreaLTC2 = UniformsLib.LTC_HALF_2))),
        (L.ambient[0] = r),
        (L.ambient[1] = n),
        (L.ambient[2] = a),
        ((e = L.hash).directionalLength === s &&
          e.pointLength === o &&
          e.spotLength === l &&
          e.rectAreaLength === h &&
          e.hemiLength === c &&
          e.numDirectionalShadows === d &&
          e.numPointShadows === u &&
          e.numSpotShadows === p &&
          e.numSpotMaps === m &&
          e.numLightProbes === g) ||
          ((L.directional.length = s),
          (L.spot.length = l),
          (L.rectArea.length = h),
          (L.point.length = o),
          (L.hemi.length = c),
          (L.directionalShadow.length = d),
          (L.directionalShadowMap.length = d),
          (L.pointShadow.length = u),
          (L.pointShadowMap.length = u),
          (L.spotShadow.length = p),
          (L.spotShadowMap.length = p),
          (L.directionalShadowMatrix.length = d),
          (L.pointShadowMatrix.length = u),
          (L.spotLightMatrix.length = p + m - f),
          (L.spotLightMap.length = m),
          (L.numSpotLightShadowsWithMaps = f),
          (L.numLightProbes = g),
          (e.directionalLength = s),
          (e.pointLength = o),
          (e.spotLength = l),
          (e.rectAreaLength = h),
          (e.hemiLength = c),
          (e.numDirectionalShadows = d),
          (e.numPointShadows = u),
          (e.numSpotShadows = p),
          (e.numSpotMaps = m),
          (e.numLightProbes = g),
          (L.version = nextVersion++));
    },
    setupView: function (i, e) {
      let r = 0,
        n = 0,
        a = 0,
        s = 0,
        o = 0;
      var l = e.matrixWorldInverse;
      for (let e = 0, t = i.length; e < t; e++) {
        var h,
          c,
          d,
          u = i[e];
        u.isDirectionalLight
          ? ((h = L.directional[r]).direction.setFromMatrixPosition(
              u.matrixWorld
            ),
            p.setFromMatrixPosition(u.target.matrixWorld),
            h.direction.sub(p),
            h.direction.transformDirection(l),
            r++)
          : u.isSpotLight
          ? ((h = L.spot[a]).position.setFromMatrixPosition(u.matrixWorld),
            h.position.applyMatrix4(l),
            h.direction.setFromMatrixPosition(u.matrixWorld),
            p.setFromMatrixPosition(u.target.matrixWorld),
            h.direction.sub(p),
            h.direction.transformDirection(l),
            a++)
          : u.isRectAreaLight
          ? ((c = L.rectArea[s]).position.setFromMatrixPosition(u.matrixWorld),
            c.position.applyMatrix4(l),
            f.identity(),
            m.copy(u.matrixWorld),
            m.premultiply(l),
            f.extractRotation(m),
            c.halfWidth.set(0.5 * u.width, 0, 0),
            c.halfHeight.set(0, 0.5 * u.height, 0),
            c.halfWidth.applyMatrix4(f),
            c.halfHeight.applyMatrix4(f),
            s++)
          : u.isPointLight
          ? ((c = L.point[n]).position.setFromMatrixPosition(u.matrixWorld),
            c.position.applyMatrix4(l),
            n++)
          : u.isHemisphereLight &&
            ((d = L.hemi[o]).direction.setFromMatrixPosition(u.matrixWorld),
            d.direction.transformDirection(l),
            o++);
      }
    },
    state: L,
  };
}
function WebGLRenderState(e) {
  let t = new WebGLLights(e),
    i = [],
    r = [];
  let n = {
    lightsArray: i,
    shadowsArray: r,
    camera: null,
    lights: t,
    transmissionRenderTarget: {},
  };
  return {
    init: function (e) {
      (n.camera = e), (i.length = 0), (r.length = 0);
    },
    state: n,
    setupLights: function (e) {
      t.setup(i, e);
    },
    setupLightsView: function (e) {
      t.setupView(i, e);
    },
    pushLight: function (e) {
      i.push(e);
    },
    pushShadow: function (e) {
      r.push(e);
    },
  };
}
function WebGLRenderStates(n) {
  let a = new WeakMap();
  return {
    get: function (e, t = 0) {
      var i = a.get(e);
      let r;
      return (
        void 0 === i
          ? ((r = new WebGLRenderState(n)), a.set(e, [r]))
          : t >= i.length
          ? ((r = new WebGLRenderState(n)), i.push(r))
          : (r = i[t]),
        r
      );
    },
    dispose: function () {
      a = new WeakMap();
    },
  };
}
class MeshDepthMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshDepthMaterial = !0),
      (this.type = "MeshDepthMaterial"),
      (this.depthPacking = BasicDepthPacking),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.depthPacking = e.depthPacking),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      this
    );
  }
}
class MeshDistanceMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshDistanceMaterial = !0),
      (this.type = "MeshDistanceMaterial"),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      this
    );
  }
}
let vertex = "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",
  fragment =
    "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}";
function WebGLShadowMap(g, _, e) {
  let v = new Frustum(),
    x = new Vector2(),
    y = new Vector2(),
    S = new Vector4(),
    s = new MeshDepthMaterial({ depthPacking: RGBADepthPacking }),
    o = new MeshDistanceMaterial(),
    l = {},
    M = e.maxTextureSize,
    h = {
      [FrontSide]: BackSide,
      [BackSide]: FrontSide,
      [DoubleSide]: DoubleSide,
    },
    T = new ShaderMaterial({
      defines: { VSM_SAMPLES: 8 },
      uniforms: {
        shadow_pass: { value: null },
        resolution: { value: new Vector2() },
        radius: { value: 4 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    }),
    E = T.clone();
  E.defines.HORIZONTAL_PASS = 1;
  e = new BufferGeometry();
  e.setAttribute(
    "position",
    new BufferAttribute(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  let b = new Mesh(e, T),
    R = this,
    A =
      ((this.enabled = !1),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this.type = PCFShadowMap),
      this.type);
  function w(i, r, e, t) {
    let n = null;
    i =
      !0 === e.isPointLight ? i.customDistanceMaterial : i.customDepthMaterial;
    if (void 0 !== i) n = i;
    else if (
      ((n = !0 === e.isPointLight ? o : s),
      (g.localClippingEnabled &&
        !0 === r.clipShadows &&
        Array.isArray(r.clippingPlanes) &&
        0 !== r.clippingPlanes.length) ||
        (r.displacementMap && 0 !== r.displacementScale) ||
        (r.alphaMap && 0 < r.alphaTest) ||
        (r.map && 0 < r.alphaTest))
    ) {
      var i = n.uuid,
        a = r.uuid;
      let e = l[i],
        t = (void 0 === e && ((e = {}), (l[i] = e)), e[a]);
      void 0 === t &&
        ((t = n.clone()), (e[a] = t), r.addEventListener("dispose", c)),
        (n = t);
    }
    return (
      (n.visible = r.visible),
      (n.wireframe = r.wireframe),
      t === VSMShadowMap
        ? (n.side = null !== r.shadowSide ? r.shadowSide : r.side)
        : (n.side = null !== r.shadowSide ? r.shadowSide : h[r.side]),
      (n.alphaMap = r.alphaMap),
      (n.alphaTest = r.alphaTest),
      (n.map = r.map),
      (n.clipShadows = r.clipShadows),
      (n.clippingPlanes = r.clippingPlanes),
      (n.clipIntersection = r.clipIntersection),
      (n.displacementMap = r.displacementMap),
      (n.displacementScale = r.displacementScale),
      (n.displacementBias = r.displacementBias),
      (n.wireframeLinewidth = r.wireframeLinewidth),
      (n.linewidth = r.linewidth),
      !0 === e.isPointLight &&
        !0 === n.isMeshDistanceMaterial &&
        (g.properties.get(n).light = e),
      n
    );
  }
  function c(e) {
    for (var t in (e.target.removeEventListener("dispose", c), l)) {
      var t = l[t],
        i = e.target.uuid;
      i in t && (t[i].dispose(), delete t[i]);
    }
  }
  this.render = function (i, r, n) {
    if (
      !1 !== R.enabled &&
      (!1 !== R.autoUpdate || !1 !== R.needsUpdate) &&
      0 !== i.length
    ) {
      var e = g.getRenderTarget(),
        t = g.getActiveCubeFace(),
        a = g.getActiveMipmapLevel(),
        s = g.state,
        o =
          (s.setBlending(NoBlending),
          s.buffers.color.setClear(1, 1, 1, 1),
          s.buffers.depth.setTest(!0),
          s.setScissorTest(!1),
          A !== VSMShadowMap && this.type === VSMShadowMap),
        l = A === VSMShadowMap && this.type !== VSMShadowMap;
      for (let e = 0, t = i.length; e < t; e++) {
        var h = i[e],
          c = h.shadow;
        if (void 0 === c)
          console.warn("THREE.WebGLShadowMap:", h, "has no shadow.");
        else if (!1 !== c.autoUpdate || !1 !== c.needsUpdate) {
          x.copy(c.mapSize);
          var d,
            u,
            p = c.getFrameExtents(),
            m =
              (x.multiply(p),
              y.copy(c.mapSize),
              (x.x > M || x.y > M) &&
                (x.x > M &&
                  ((y.x = Math.floor(M / p.x)),
                  (x.x = y.x * p.x),
                  (c.mapSize.x = y.x)),
                x.y > M) &&
                ((y.y = Math.floor(M / p.y)),
                (x.y = y.y * p.y),
                (c.mapSize.y = y.y)),
              (null !== c.map && !0 != o && !0 != l) ||
                ((p =
                  this.type !== VSMShadowMap
                    ? { minFilter: NearestFilter, magFilter: NearestFilter }
                    : {}),
                null !== c.map && c.map.dispose(),
                (c.map = new WebGLRenderTarget(x.x, x.y, p)),
                (c.map.texture.name = h.name + ".shadowMap"),
                c.camera.updateProjectionMatrix()),
              g.setRenderTarget(c.map),
              g.clear(),
              c.getViewportCount());
          for (let e = 0; e < m; e++) {
            var f = c.getViewport(e);
            S.set(y.x * f.x, y.y * f.y, y.x * f.z, y.y * f.w),
              s.viewport(S),
              c.updateMatrices(h, e),
              (v = c.getFrustum()),
              !(function i(s, o, l, h, c) {
                if (!1 === s.visible) return;
                let e = s.layers.test(o.layers);
                if (
                  e &&
                  (s.isMesh || s.isLine || s.isPoints) &&
                  (s.castShadow || (s.receiveShadow && c === VSMShadowMap)) &&
                  (!s.frustumCulled || v.intersectsObject(s))
                ) {
                  s.modelViewMatrix.multiplyMatrices(
                    l.matrixWorldInverse,
                    s.matrixWorld
                  );
                  let n = _.update(s),
                    a = s.material;
                  if (Array.isArray(a)) {
                    let r = n.groups;
                    for (let e = 0, t = r.length; e < t; e++) {
                      let t = r[e],
                        i = a[t.materialIndex];
                      if (i && i.visible) {
                        let e = w(s, i, h, c);
                        s.onBeforeShadow(g, s, o, l, n, e, t),
                          g.renderBufferDirect(l, null, n, e, s, t),
                          s.onAfterShadow(g, s, o, l, n, e, t);
                      }
                    }
                  } else if (a.visible) {
                    let e = w(s, a, h, c);
                    s.onBeforeShadow(g, s, o, l, n, e, null),
                      g.renderBufferDirect(l, null, n, e, s, null),
                      s.onAfterShadow(g, s, o, l, n, e, null);
                  }
                }
                let r = s.children;
                for (let e = 0, t = r.length; e < t; e++) i(r[e], o, l, h, c);
              })(r, n, c.camera, h, this.type);
          }
          !0 !== c.isPointLightShadow &&
            this.type === VSMShadowMap &&
            ((u = d = p = void 0),
            (p = c),
            (d = n),
            (u = _.update(b)),
            T.defines.VSM_SAMPLES !== p.blurSamples &&
              ((T.defines.VSM_SAMPLES = p.blurSamples),
              (E.defines.VSM_SAMPLES = p.blurSamples),
              (T.needsUpdate = !0),
              (E.needsUpdate = !0)),
            null === p.mapPass && (p.mapPass = new WebGLRenderTarget(x.x, x.y)),
            (T.uniforms.shadow_pass.value = p.map.texture),
            (T.uniforms.resolution.value = p.mapSize),
            (T.uniforms.radius.value = p.radius),
            g.setRenderTarget(p.mapPass),
            g.clear(),
            g.renderBufferDirect(d, null, u, T, b, null),
            (E.uniforms.shadow_pass.value = p.mapPass.texture),
            (E.uniforms.resolution.value = p.mapSize),
            (E.uniforms.radius.value = p.radius),
            g.setRenderTarget(p.map),
            g.clear(),
            g.renderBufferDirect(d, null, u, E, b, null)),
            (c.needsUpdate = !1);
        }
      }
      (A = this.type), (R.needsUpdate = !1), g.setRenderTarget(e, t, a);
    }
  };
}
function WebGLState(c) {
  let r = new (function () {
      let t = !1,
        a = new Vector4(),
        i = null,
        s = new Vector4(0, 0, 0, 0);
      return {
        setMask: function (e) {
          i === e || t || (c.colorMask(e, e, e, e), (i = e));
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (e, t, i, r, n) {
          !0 === n && ((e *= r), (t *= r), (i *= r)),
            a.set(e, t, i, r),
            !1 === s.equals(a) && (c.clearColor(e, t, i, r), s.copy(a));
        },
        reset: function () {
          (t = !1), (i = null), s.set(-1, 0, 0, 0);
        },
      };
    })(),
    n = new (function () {
      let t = !1,
        i = null,
        r = null,
        n = null;
      return {
        setTest: function (e) {
          (e ? P : I)(c.DEPTH_TEST);
        },
        setMask: function (e) {
          i === e || t || (c.depthMask(e), (i = e));
        },
        setFunc: function (e) {
          if (r !== e) {
            switch (e) {
              case NeverDepth:
                c.depthFunc(c.NEVER);
                break;
              case AlwaysDepth:
                c.depthFunc(c.ALWAYS);
                break;
              case LessDepth:
                c.depthFunc(c.LESS);
                break;
              case LessEqualDepth:
                c.depthFunc(c.LEQUAL);
                break;
              case EqualDepth:
                c.depthFunc(c.EQUAL);
                break;
              case GreaterEqualDepth:
                c.depthFunc(c.GEQUAL);
                break;
              case GreaterDepth:
                c.depthFunc(c.GREATER);
                break;
              case NotEqualDepth:
                c.depthFunc(c.NOTEQUAL);
                break;
              default:
                c.depthFunc(c.LEQUAL);
            }
            r = e;
          }
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (e) {
          n !== e && (c.clearDepth(e), (n = e));
        },
        reset: function () {
          (t = !1), (i = null), (r = null), (n = null);
        },
      };
    })(),
    a = new (function () {
      let t = !1,
        i = null,
        r = null,
        n = null,
        a = null,
        s = null,
        o = null,
        l = null,
        h = null;
      return {
        setTest: function (e) {
          t || (e ? P : I)(c.STENCIL_TEST);
        },
        setMask: function (e) {
          i === e || t || (c.stencilMask(e), (i = e));
        },
        setFunc: function (e, t, i) {
          (r === e && n === t && a === i) ||
            (c.stencilFunc(e, t, i), (r = e), (n = t), (a = i));
        },
        setOp: function (e, t, i) {
          (s === e && o === t && l === i) ||
            (c.stencilOp(e, t, i), (s = e), (o = t), (l = i));
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (e) {
          h !== e && (c.clearStencil(e), (h = e));
        },
        reset: function () {
          (t = !1),
            (i = null),
            (r = null),
            (n = null),
            (a = null),
            (s = null),
            (o = null),
            (l = null),
            (h = null);
        },
      };
    })(),
    O = new WeakMap(),
    s = new WeakMap(),
    t = {},
    i = {},
    o = new WeakMap(),
    B = [],
    l = null,
    d = !1,
    u = null,
    p = null,
    m = null,
    f = null,
    g = null,
    _ = null,
    v = null,
    x = new Color(0, 0, 0),
    y = 0,
    S = !1,
    h = null,
    M = null,
    T = null,
    E = null,
    b = null,
    F = c.getParameter(c.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
    G = !1,
    e = 0;
  var R = c.getParameter(c.VERSION);
  -1 !== R.indexOf("WebGL")
    ? ((e = parseFloat(/^WebGL (\d)/.exec(R)[1])), (G = 1 <= e))
    : -1 !== R.indexOf("OpenGL ES") &&
      ((e = parseFloat(/^OpenGL ES (\d)/.exec(R)[1])), (G = 2 <= e));
  let A = null,
    w = {};
  var R = c.getParameter(c.SCISSOR_BOX),
    V = c.getParameter(c.VIEWPORT);
  let z = new Vector4().fromArray(R),
    k = new Vector4().fromArray(V);
  function L(t, i, r, n) {
    var a = new Uint8Array(4),
      e = c.createTexture();
    c.bindTexture(t, e),
      c.texParameteri(t, c.TEXTURE_MIN_FILTER, c.NEAREST),
      c.texParameteri(t, c.TEXTURE_MAG_FILTER, c.NEAREST);
    for (let e = 0; e < r; e++)
      t === c.TEXTURE_3D || t === c.TEXTURE_2D_ARRAY
        ? c.texImage3D(i, 0, c.RGBA, 1, 1, n, 0, c.RGBA, c.UNSIGNED_BYTE, a)
        : c.texImage2D(i + e, 0, c.RGBA, 1, 1, 0, c.RGBA, c.UNSIGNED_BYTE, a);
    return e;
  }
  let C = {};
  function P(e) {
    !0 !== t[e] && (c.enable(e), (t[e] = !0));
  }
  function I(e) {
    !1 !== t[e] && (c.disable(e), (t[e] = !1));
  }
  (C[c.TEXTURE_2D] = L(c.TEXTURE_2D, c.TEXTURE_2D, 1)),
    (C[c.TEXTURE_CUBE_MAP] = L(
      c.TEXTURE_CUBE_MAP,
      c.TEXTURE_CUBE_MAP_POSITIVE_X,
      6
    )),
    (C[c.TEXTURE_2D_ARRAY] = L(c.TEXTURE_2D_ARRAY, c.TEXTURE_2D_ARRAY, 1, 1)),
    (C[c.TEXTURE_3D] = L(c.TEXTURE_3D, c.TEXTURE_3D, 1, 1)),
    r.setClear(0, 0, 0, 1),
    n.setClear(1),
    a.setClear(0),
    P(c.DEPTH_TEST),
    n.setFunc(LessEqualDepth),
    H(!1),
    W(CullFaceBack),
    P(c.CULL_FACE),
    U(NoBlending);
  let D = {
      [AddEquation]: c.FUNC_ADD,
      [SubtractEquation]: c.FUNC_SUBTRACT,
      [ReverseSubtractEquation]: c.FUNC_REVERSE_SUBTRACT,
    },
    N =
      ((D[MinEquation] = c.MIN),
      (D[MaxEquation] = c.MAX),
      {
        [ZeroFactor]: c.ZERO,
        [OneFactor]: c.ONE,
        [SrcColorFactor]: c.SRC_COLOR,
        [SrcAlphaFactor]: c.SRC_ALPHA,
        [SrcAlphaSaturateFactor]: c.SRC_ALPHA_SATURATE,
        [DstColorFactor]: c.DST_COLOR,
        [DstAlphaFactor]: c.DST_ALPHA,
        [OneMinusSrcColorFactor]: c.ONE_MINUS_SRC_COLOR,
        [OneMinusSrcAlphaFactor]: c.ONE_MINUS_SRC_ALPHA,
        [OneMinusDstColorFactor]: c.ONE_MINUS_DST_COLOR,
        [OneMinusDstAlphaFactor]: c.ONE_MINUS_DST_ALPHA,
        [ConstantColorFactor]: c.CONSTANT_COLOR,
        [OneMinusConstantColorFactor]: c.ONE_MINUS_CONSTANT_COLOR,
        [ConstantAlphaFactor]: c.CONSTANT_ALPHA,
        [OneMinusConstantAlphaFactor]: c.ONE_MINUS_CONSTANT_ALPHA,
      });
  function U(e, t, i, r, n, a, s, o, l, h) {
    if (e === NoBlending) !0 === d && (I(c.BLEND), (d = !1));
    else if ((!1 === d && (P(c.BLEND), (d = !0)), e !== CustomBlending)) {
      if (e !== u || h !== S) {
        if (
          ((p === AddEquation && g === AddEquation) ||
            (c.blendEquation(c.FUNC_ADD), (p = AddEquation), (g = AddEquation)),
          h)
        )
          switch (e) {
            case NormalBlending:
              c.blendFuncSeparate(
                c.ONE,
                c.ONE_MINUS_SRC_ALPHA,
                c.ONE,
                c.ONE_MINUS_SRC_ALPHA
              );
              break;
            case AdditiveBlending:
              c.blendFunc(c.ONE, c.ONE);
              break;
            case SubtractiveBlending:
              c.blendFuncSeparate(c.ZERO, c.ONE_MINUS_SRC_COLOR, c.ZERO, c.ONE);
              break;
            case MultiplyBlending:
              c.blendFuncSeparate(c.ZERO, c.SRC_COLOR, c.ZERO, c.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", e);
          }
        else
          switch (e) {
            case NormalBlending:
              c.blendFuncSeparate(
                c.SRC_ALPHA,
                c.ONE_MINUS_SRC_ALPHA,
                c.ONE,
                c.ONE_MINUS_SRC_ALPHA
              );
              break;
            case AdditiveBlending:
              c.blendFunc(c.SRC_ALPHA, c.ONE);
              break;
            case SubtractiveBlending:
              c.blendFuncSeparate(c.ZERO, c.ONE_MINUS_SRC_COLOR, c.ZERO, c.ONE);
              break;
            case MultiplyBlending:
              c.blendFunc(c.ZERO, c.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", e);
          }
        (m = null),
          (f = null),
          (_ = null),
          (v = null),
          x.set(0, 0, 0),
          (y = 0),
          (u = e),
          (S = h);
      }
    } else
      (n = n || t),
        (a = a || i),
        (s = s || r),
        (t === p && n === g) ||
          (c.blendEquationSeparate(D[t], D[n]), (p = t), (g = n)),
        (i === m && r === f && a === _ && s === v) ||
          (c.blendFuncSeparate(N[i], N[r], N[a], N[s]),
          (m = i),
          (f = r),
          (_ = a),
          (v = s)),
        (!1 !== o.equals(x) && l === y) ||
          (c.blendColor(o.r, o.g, o.b, l), x.copy(o), (y = l)),
        (u = e),
        (S = !1);
  }
  function H(e) {
    h !== e && (e ? c.frontFace(c.CW) : c.frontFace(c.CCW), (h = e));
  }
  function W(e) {
    e !== CullFaceNone
      ? (P(c.CULL_FACE),
        e !== M &&
          (e === CullFaceBack
            ? c.cullFace(c.BACK)
            : e === CullFaceFront
            ? c.cullFace(c.FRONT)
            : c.cullFace(c.FRONT_AND_BACK)))
      : I(c.CULL_FACE),
      (M = e);
  }
  function X(e, t, i) {
    e
      ? (P(c.POLYGON_OFFSET_FILL),
        (E === t && b === i) || (c.polygonOffset(t, i), (E = t), (b = i)))
      : I(c.POLYGON_OFFSET_FILL);
  }
  return {
    buffers: { color: r, depth: n, stencil: a },
    enable: P,
    disable: I,
    bindFramebuffer: function (e, t) {
      return (
        i[e] !== t &&
        (c.bindFramebuffer(e, t),
        (i[e] = t),
        e === c.DRAW_FRAMEBUFFER && (i[c.FRAMEBUFFER] = t),
        e === c.FRAMEBUFFER && (i[c.DRAW_FRAMEBUFFER] = t),
        !0)
      );
    },
    drawBuffers: function (e, i) {
      let r = B,
        t = !1;
      if (e) {
        void 0 === (r = o.get(i)) && ((r = []), o.set(i, r));
        i = e.textures;
        if (r.length !== i.length || r[0] !== c.COLOR_ATTACHMENT0) {
          for (let e = 0, t = i.length; e < t; e++)
            r[e] = c.COLOR_ATTACHMENT0 + e;
          (r.length = i.length), (t = !0);
        }
      } else r[0] !== c.BACK && ((r[0] = c.BACK), (t = !0));
      t && c.drawBuffers(r);
    },
    useProgram: function (e) {
      return l !== e && (c.useProgram(e), (l = e), !0);
    },
    setBlending: U,
    setMaterial: function (e, t) {
      (e.side === DoubleSide ? I : P)(c.CULL_FACE);
      let i = e.side === BackSide;
      H((i = t ? !i : i)),
        e.blending === NormalBlending && !1 === e.transparent
          ? U(NoBlending)
          : U(
              e.blending,
              e.blendEquation,
              e.blendSrc,
              e.blendDst,
              e.blendEquationAlpha,
              e.blendSrcAlpha,
              e.blendDstAlpha,
              e.blendColor,
              e.blendAlpha,
              e.premultipliedAlpha
            ),
        n.setFunc(e.depthFunc),
        n.setTest(e.depthTest),
        n.setMask(e.depthWrite),
        r.setMask(e.colorWrite),
        (t = e.stencilWrite),
        a.setTest(t),
        t &&
          (a.setMask(e.stencilWriteMask),
          a.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask),
          a.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)),
        X(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits),
        (!0 === e.alphaToCoverage ? P : I)(c.SAMPLE_ALPHA_TO_COVERAGE);
    },
    setFlipSided: H,
    setCullFace: W,
    setLineWidth: function (e) {
      e !== T && (G && c.lineWidth(e), (T = e));
    },
    setPolygonOffset: X,
    setScissorTest: function (e) {
      (e ? P : I)(c.SCISSOR_TEST);
    },
    activeTexture: function (e) {
      void 0 === e && (e = c.TEXTURE0 + F - 1),
        A !== e && (c.activeTexture(e), (A = e));
    },
    bindTexture: function (e, t, i) {
      void 0 === i && (i = null === A ? c.TEXTURE0 + F - 1 : A);
      let r = w[i];
      void 0 === r && ((r = { type: void 0, texture: void 0 }), (w[i] = r)),
        (r.type === e && r.texture === t) ||
          (A !== i && (c.activeTexture(i), (A = i)),
          c.bindTexture(e, t || C[e]),
          (r.type = e),
          (r.texture = t));
    },
    unbindTexture: function () {
      var e = w[A];
      void 0 !== e &&
        void 0 !== e.type &&
        (c.bindTexture(e.type, null), (e.type = void 0), (e.texture = void 0));
    },
    compressedTexImage2D: function () {
      try {
        c.compressedTexImage2D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    compressedTexImage3D: function () {
      try {
        c.compressedTexImage3D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    texImage2D: function () {
      try {
        c.texImage2D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    texImage3D: function () {
      try {
        c.texImage3D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    updateUBOMapping: function (e, t) {
      let i = s.get(t);
      void 0 === i && ((i = new WeakMap()), s.set(t, i)),
        void 0 === i.get(e) &&
          ((t = c.getUniformBlockIndex(t, e.name)), i.set(e, t));
    },
    uniformBlockBinding: function (e, t) {
      var i = s.get(t).get(e);
      O.get(t) !== i &&
        (c.uniformBlockBinding(t, i, e.__bindingPointIndex), O.set(t, i));
    },
    texStorage2D: function () {
      try {
        c.texStorage2D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    texStorage3D: function () {
      try {
        c.texStorage3D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    texSubImage2D: function () {
      try {
        c.texSubImage2D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    texSubImage3D: function () {
      try {
        c.texSubImage3D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    compressedTexSubImage2D: function () {
      try {
        c.compressedTexSubImage2D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    compressedTexSubImage3D: function () {
      try {
        c.compressedTexSubImage3D.apply(c, arguments);
      } catch (e) {
        console.error("THREE.WebGLState:", e);
      }
    },
    scissor: function (e) {
      !1 === z.equals(e) && (c.scissor(e.x, e.y, e.z, e.w), z.copy(e));
    },
    viewport: function (e) {
      !1 === k.equals(e) && (c.viewport(e.x, e.y, e.z, e.w), k.copy(e));
    },
    reset: function () {
      c.disable(c.BLEND),
        c.disable(c.CULL_FACE),
        c.disable(c.DEPTH_TEST),
        c.disable(c.POLYGON_OFFSET_FILL),
        c.disable(c.SCISSOR_TEST),
        c.disable(c.STENCIL_TEST),
        c.disable(c.SAMPLE_ALPHA_TO_COVERAGE),
        c.blendEquation(c.FUNC_ADD),
        c.blendFunc(c.ONE, c.ZERO),
        c.blendFuncSeparate(c.ONE, c.ZERO, c.ONE, c.ZERO),
        c.blendColor(0, 0, 0, 0),
        c.colorMask(!0, !0, !0, !0),
        c.clearColor(0, 0, 0, 0),
        c.depthMask(!0),
        c.depthFunc(c.LESS),
        c.clearDepth(1),
        c.stencilMask(4294967295),
        c.stencilFunc(c.ALWAYS, 0, 4294967295),
        c.stencilOp(c.KEEP, c.KEEP, c.KEEP),
        c.clearStencil(0),
        c.cullFace(c.BACK),
        c.frontFace(c.CCW),
        c.polygonOffset(0, 0),
        c.activeTexture(c.TEXTURE0),
        c.bindFramebuffer(c.FRAMEBUFFER, null),
        c.bindFramebuffer(c.DRAW_FRAMEBUFFER, null),
        c.bindFramebuffer(c.READ_FRAMEBUFFER, null),
        c.useProgram(null),
        c.lineWidth(1),
        c.scissor(0, 0, c.canvas.width, c.canvas.height),
        c.viewport(0, 0, c.canvas.width, c.canvas.height),
        (t = {}),
        (A = null),
        (w = {}),
        (i = {}),
        (o = new WeakMap()),
        (B = []),
        (l = null),
        (d = !1),
        (u = null),
        (p = null),
        (m = null),
        (f = null),
        (g = null),
        (_ = null),
        (v = null),
        (x = new Color(0, 0, 0)),
        (y = 0),
        (S = !1),
        (h = null),
        (M = null),
        (T = null),
        (E = null),
        (b = null),
        z.set(0, 0, c.canvas.width, c.canvas.height),
        k.set(0, 0, c.canvas.width, c.canvas.height),
        r.reset(),
        n.reset(),
        a.reset();
    },
  };
}
function WebGLTextures(y, s, S, M, T, E, u) {
  let d = s.has("WEBGL_multisampled_render_to_texture")
      ? s.get("WEBGL_multisampled_render_to_texture")
      : null,
    p =
      "undefined" != typeof navigator &&
      /OculusBrowser/g.test(navigator.userAgent),
    t = new Vector2(),
    a = new WeakMap(),
    o,
    l = new WeakMap(),
    i = !1;
  try {
    i =
      "undefined" != typeof OffscreenCanvas &&
      null !== new OffscreenCanvas(1, 1).getContext("2d");
  } catch (e) {}
  function h(e, t) {
    return i ? new OffscreenCanvas(e, t) : createElementNS("canvas");
  }
  function b(e, t, i) {
    let r = 1;
    var n,
      a = O(e);
    return (r =
      a.width > i || a.height > i ? i / Math.max(a.width, a.height) : r) < 1
      ? ("undefined" != typeof HTMLImageElement &&
          e instanceof HTMLImageElement) ||
        ("undefined" != typeof HTMLCanvasElement &&
          e instanceof HTMLCanvasElement) ||
        ("undefined" != typeof ImageBitmap && e instanceof ImageBitmap) ||
        ("undefined" != typeof VideoFrame && e instanceof VideoFrame)
        ? ((i = Math.floor(r * a.width)),
          (n = Math.floor(r * a.height)),
          void 0 === o && (o = h(i, n)),
          ((t = t ? h(i, n) : o).width = i),
          (t.height = n),
          t.getContext("2d").drawImage(e, 0, 0, i, n),
          console.warn(
            "THREE.WebGLRenderer: Texture has been resized from (" +
              a.width +
              "x" +
              a.height +
              ") to (" +
              i +
              "x" +
              n +
              ")."
          ),
          t)
        : ("data" in e &&
            console.warn(
              "THREE.WebGLRenderer: Image in DataTexture is too big (" +
                a.width +
                "x" +
                a.height +
                ")."
            ),
          e)
      : e;
  }
  function R(e) {
    return (
      e.generateMipmaps &&
      e.minFilter !== NearestFilter &&
      e.minFilter !== LinearFilter
    );
  }
  function A(e) {
    y.generateMipmap(e);
  }
  function w(e, t, i, r, n = !1) {
    if (null !== e) {
      if (void 0 !== y[e]) return y[e];
      console.warn(
        "THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" +
          e +
          "'"
      );
    }
    let a = t;
    return (
      t === y.RED &&
        (i === y.FLOAT && (a = y.R32F),
        i === y.HALF_FLOAT && (a = y.R16F),
        i === y.UNSIGNED_BYTE) &&
        (a = y.R8),
      t === y.RED_INTEGER &&
        (i === y.UNSIGNED_BYTE && (a = y.R8UI),
        i === y.UNSIGNED_SHORT && (a = y.R16UI),
        i === y.UNSIGNED_INT && (a = y.R32UI),
        i === y.BYTE && (a = y.R8I),
        i === y.SHORT && (a = y.R16I),
        i === y.INT) &&
        (a = y.R32I),
      t === y.RG &&
        (i === y.FLOAT && (a = y.RG32F),
        i === y.HALF_FLOAT && (a = y.RG16F),
        i === y.UNSIGNED_BYTE) &&
        (a = y.RG8),
      t === y.RG_INTEGER &&
        (i === y.UNSIGNED_BYTE && (a = y.RG8UI),
        i === y.UNSIGNED_SHORT && (a = y.RG16UI),
        i === y.UNSIGNED_INT && (a = y.RG32UI),
        i === y.BYTE && (a = y.RG8I),
        i === y.SHORT && (a = y.RG16I),
        i === y.INT) &&
        (a = y.RG32I),
      t === y.RGB && i === y.UNSIGNED_INT_5_9_9_9_REV && (a = y.RGB9_E5),
      ((a =
        t === y.RGBA &&
        ((e = n ? LinearTransfer : ColorManagement.getTransfer(r)),
        i === y.FLOAT && (a = y.RGBA32F),
        i === y.HALF_FLOAT && (a = y.RGBA16F),
        i === y.UNSIGNED_BYTE &&
          (a = e === SRGBTransfer ? y.SRGB8_ALPHA8 : y.RGBA8),
        i === y.UNSIGNED_SHORT_4_4_4_4 && (a = y.RGBA4),
        i === y.UNSIGNED_SHORT_5_5_5_1)
          ? y.RGB5_A1
          : a) !== y.R16F &&
        a !== y.R32F &&
        a !== y.RG16F &&
        a !== y.RG32F &&
        a !== y.RGBA16F &&
        a !== y.RGBA32F) ||
        s.get("EXT_color_buffer_float"),
      a
    );
  }
  function L(e, t) {
    return !0 === R(e) ||
      (e.isFramebufferTexture &&
        e.minFilter !== NearestFilter &&
        e.minFilter !== LinearFilter)
      ? Math.log2(Math.max(t.width, t.height)) + 1
      : void 0 !== e.mipmaps && 0 < e.mipmaps.length
      ? e.mipmaps.length
      : e.isCompressedTexture && Array.isArray(e.image)
      ? t.mipmaps.length
      : 1;
  }
  function c(e) {
    var t,
      i,
      r,
      n,
      e = e.target;
    e.removeEventListener("dispose", c),
      (t = e),
      void 0 !== (i = M.get(t)).__webglInit &&
        ((r = t.source),
        (n = l.get(r)) &&
          ((i = n[i.__cacheKey]).usedTimes--,
          0 === i.usedTimes && f(t),
          0 === Object.keys(n).length) &&
          l.delete(r),
        M.remove(t)),
      e.isVideoTexture && a.delete(e);
  }
  function m(e) {
    var e = e.target,
      i = (e.removeEventListener("dispose", m), M.get(e));
    if ((e.depthTexture && e.depthTexture.dispose(), e.isWebGLCubeRenderTarget))
      for (let t = 0; t < 6; t++) {
        if (Array.isArray(i.__webglFramebuffer[t]))
          for (let e = 0; e < i.__webglFramebuffer[t].length; e++)
            y.deleteFramebuffer(i.__webglFramebuffer[t][e]);
        else y.deleteFramebuffer(i.__webglFramebuffer[t]);
        i.__webglDepthbuffer && y.deleteRenderbuffer(i.__webglDepthbuffer[t]);
      }
    else {
      if (Array.isArray(i.__webglFramebuffer))
        for (let e = 0; e < i.__webglFramebuffer.length; e++)
          y.deleteFramebuffer(i.__webglFramebuffer[e]);
      else y.deleteFramebuffer(i.__webglFramebuffer);
      if (
        (i.__webglDepthbuffer && y.deleteRenderbuffer(i.__webglDepthbuffer),
        i.__webglMultisampledFramebuffer &&
          y.deleteFramebuffer(i.__webglMultisampledFramebuffer),
        i.__webglColorRenderbuffer)
      )
        for (let e = 0; e < i.__webglColorRenderbuffer.length; e++)
          i.__webglColorRenderbuffer[e] &&
            y.deleteRenderbuffer(i.__webglColorRenderbuffer[e]);
      i.__webglDepthRenderbuffer &&
        y.deleteRenderbuffer(i.__webglDepthRenderbuffer);
    }
    var r = e.textures;
    for (let e = 0, t = r.length; e < t; e++) {
      var n = M.get(r[e]);
      n.__webglTexture &&
        (y.deleteTexture(n.__webglTexture), u.memory.textures--),
        M.remove(r[e]);
    }
    M.remove(e);
  }
  function f(e) {
    var t = M.get(e),
      e = (y.deleteTexture(t.__webglTexture), e.source);
    delete l.get(e)[t.__cacheKey], u.memory.textures--;
  }
  let r = 0;
  function g(e, t) {
    var i,
      r = M.get(e);
    if (
      (e.isVideoTexture &&
        ((i = e), (n = u.render.frame), a.get(i) !== n) &&
        (a.set(i, n), i.update()),
      !1 === e.isRenderTargetTexture &&
        0 < e.version &&
        r.__version !== e.version)
    ) {
      var n = e.image;
      if (null === n)
        console.warn(
          "THREE.WebGLRenderer: Texture marked for update but no image data found."
        );
      else {
        if (!1 !== n.complete) return void _(r, e, t);
        console.warn(
          "THREE.WebGLRenderer: Texture marked for update but image is incomplete"
        );
      }
    }
    S.bindTexture(y.TEXTURE_2D, r.__webglTexture, y.TEXTURE0 + t);
  }
  let n = {
      [RepeatWrapping]: y.REPEAT,
      [ClampToEdgeWrapping]: y.CLAMP_TO_EDGE,
      [MirroredRepeatWrapping]: y.MIRRORED_REPEAT,
    },
    B = {
      [NearestFilter]: y.NEAREST,
      [NearestMipmapNearestFilter]: y.NEAREST_MIPMAP_NEAREST,
      [NearestMipmapLinearFilter]: y.NEAREST_MIPMAP_LINEAR,
      [LinearFilter]: y.LINEAR,
      [LinearMipmapNearestFilter]: y.LINEAR_MIPMAP_NEAREST,
      [LinearMipmapLinearFilter]: y.LINEAR_MIPMAP_LINEAR,
    },
    F = {
      [NeverCompare]: y.NEVER,
      [AlwaysCompare]: y.ALWAYS,
      [LessCompare]: y.LESS,
      [LessEqualCompare]: y.LEQUAL,
      [EqualCompare]: y.EQUAL,
      [GreaterEqualCompare]: y.GEQUAL,
      [GreaterCompare]: y.GREATER,
      [NotEqualCompare]: y.NOTEQUAL,
    };
  function C(e, t) {
    var i;
    t.type !== FloatType ||
      !1 !== s.has("OES_texture_float_linear") ||
      (t.magFilter !== LinearFilter &&
        t.magFilter !== LinearMipmapNearestFilter &&
        t.magFilter !== NearestMipmapLinearFilter &&
        t.magFilter !== LinearMipmapLinearFilter &&
        t.minFilter !== LinearFilter &&
        t.minFilter !== LinearMipmapNearestFilter &&
        t.minFilter !== NearestMipmapLinearFilter &&
        t.minFilter !== LinearMipmapLinearFilter) ||
      console.warn(
        "THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."
      ),
      y.texParameteri(e, y.TEXTURE_WRAP_S, n[t.wrapS]),
      y.texParameteri(e, y.TEXTURE_WRAP_T, n[t.wrapT]),
      (e !== y.TEXTURE_3D && e !== y.TEXTURE_2D_ARRAY) ||
        y.texParameteri(e, y.TEXTURE_WRAP_R, n[t.wrapR]),
      y.texParameteri(e, y.TEXTURE_MAG_FILTER, B[t.magFilter]),
      y.texParameteri(e, y.TEXTURE_MIN_FILTER, B[t.minFilter]),
      t.compareFunction &&
        (y.texParameteri(e, y.TEXTURE_COMPARE_MODE, y.COMPARE_REF_TO_TEXTURE),
        y.texParameteri(e, y.TEXTURE_COMPARE_FUNC, F[t.compareFunction])),
      !0 !== s.has("EXT_texture_filter_anisotropic") ||
        t.magFilter === NearestFilter ||
        (t.minFilter !== NearestMipmapLinearFilter &&
          t.minFilter !== LinearMipmapLinearFilter) ||
        (t.type === FloatType && !1 === s.has("OES_texture_float_linear")) ||
        ((1 < t.anisotropy || M.get(t).__currentAnisotropy) &&
          ((i = s.get("EXT_texture_filter_anisotropic")),
          y.texParameterf(
            e,
            i.TEXTURE_MAX_ANISOTROPY_EXT,
            Math.min(t.anisotropy, T.getMaxAnisotropy())
          ),
          (M.get(t).__currentAnisotropy = t.anisotropy)));
  }
  function G(e, t) {
    let i = !1;
    void 0 === e.__webglInit &&
      ((e.__webglInit = !0), t.addEventListener("dispose", c));
    var r = t.source;
    let n = l.get(r);
    void 0 === n && ((n = {}), l.set(r, n));
    (r = []).push((a = t).wrapS),
      r.push(a.wrapT),
      r.push(a.wrapR || 0),
      r.push(a.magFilter),
      r.push(a.minFilter),
      r.push(a.anisotropy),
      r.push(a.internalFormat),
      r.push(a.format),
      r.push(a.type),
      r.push(a.generateMipmaps),
      r.push(a.premultiplyAlpha),
      r.push(a.flipY),
      r.push(a.unpackAlignment),
      r.push(a.colorSpace);
    var a = r.join();
    return (
      a !== e.__cacheKey &&
        (void 0 === n[a] &&
          ((n[a] = { texture: y.createTexture(), usedTimes: 0 }),
          u.memory.textures++,
          (i = !0)),
        n[a].usedTimes++,
        void 0 !== (r = n[e.__cacheKey]) &&
          (n[e.__cacheKey].usedTimes--, 0 === r.usedTimes) &&
          f(t),
        (e.__cacheKey = a),
        (e.__webglTexture = n[a].texture)),
      i
    );
  }
  function _(e, n, t) {
    let a = y.TEXTURE_2D;
    (n.isDataArrayTexture || n.isCompressedArrayTexture) &&
      (a = y.TEXTURE_2D_ARRAY),
      n.isData3DTexture && (a = y.TEXTURE_3D);
    var s = G(e, n),
      o = n.source,
      l = (S.bindTexture(a, e.__webglTexture, y.TEXTURE0 + t), M.get(o));
    if (o.version !== l.__version || !0 === s) {
      S.activeTexture(y.TEXTURE0 + t);
      var t = ColorManagement.getPrimaries(ColorManagement.workingColorSpace),
        h =
          n.colorSpace === NoColorSpace
            ? null
            : ColorManagement.getPrimaries(n.colorSpace),
        t =
          n.colorSpace === NoColorSpace || t === h
            ? y.NONE
            : y.BROWSER_DEFAULT_WEBGL;
      y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL, n.flipY),
        y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha),
        y.pixelStorei(y.UNPACK_ALIGNMENT, n.unpackAlignment),
        y.pixelStorei(y.UNPACK_COLORSPACE_CONVERSION_WEBGL, t);
      var c = V(n, b(n.image, !1, T.maxTextureSize)),
        d = E.convert(n.format, n.colorSpace),
        u = E.convert(n.type);
      let r = w(n.internalFormat, d, u, n.colorSpace, n.isVideoTexture);
      C(a, n);
      let i;
      var p = n.mipmaps,
        m = !0 !== n.isVideoTexture,
        h = void 0 === l.__version || !0 === s,
        f = o.dataReady,
        g = L(n, c);
      if (n.isDepthTexture)
        (r = y.DEPTH_COMPONENT16),
          n.type === FloatType
            ? (r = y.DEPTH_COMPONENT32F)
            : n.type === UnsignedIntType
            ? (r = y.DEPTH_COMPONENT24)
            : n.type === UnsignedInt248Type && (r = y.DEPTH24_STENCIL8),
          h &&
            (m
              ? S.texStorage2D(y.TEXTURE_2D, 1, r, c.width, c.height)
              : S.texImage2D(
                  y.TEXTURE_2D,
                  0,
                  r,
                  c.width,
                  c.height,
                  0,
                  d,
                  u,
                  null
                ));
      else if (n.isDataTexture)
        if (0 < p.length) {
          m && h && S.texStorage2D(y.TEXTURE_2D, g, r, p[0].width, p[0].height);
          for (let e = 0, t = p.length; e < t; e++)
            (i = p[e]),
              m
                ? f &&
                  S.texSubImage2D(
                    y.TEXTURE_2D,
                    e,
                    0,
                    0,
                    i.width,
                    i.height,
                    d,
                    u,
                    i.data
                  )
                : S.texImage2D(
                    y.TEXTURE_2D,
                    e,
                    r,
                    i.width,
                    i.height,
                    0,
                    d,
                    u,
                    i.data
                  );
          n.generateMipmaps = !1;
        } else
          m
            ? (h && S.texStorage2D(y.TEXTURE_2D, g, r, c.width, c.height),
              f &&
                S.texSubImage2D(
                  y.TEXTURE_2D,
                  0,
                  0,
                  0,
                  c.width,
                  c.height,
                  d,
                  u,
                  c.data
                ))
            : S.texImage2D(
                y.TEXTURE_2D,
                0,
                r,
                c.width,
                c.height,
                0,
                d,
                u,
                c.data
              );
      else if (n.isCompressedTexture)
        if (n.isCompressedArrayTexture) {
          m &&
            h &&
            S.texStorage3D(
              y.TEXTURE_2D_ARRAY,
              g,
              r,
              p[0].width,
              p[0].height,
              c.depth
            );
          for (let e = 0, t = p.length; e < t; e++)
            (i = p[e]),
              n.format !== RGBAFormat
                ? null !== d
                  ? m
                    ? f &&
                      S.compressedTexSubImage3D(
                        y.TEXTURE_2D_ARRAY,
                        e,
                        0,
                        0,
                        0,
                        i.width,
                        i.height,
                        c.depth,
                        d,
                        i.data,
                        0,
                        0
                      )
                    : S.compressedTexImage3D(
                        y.TEXTURE_2D_ARRAY,
                        e,
                        r,
                        i.width,
                        i.height,
                        c.depth,
                        0,
                        i.data,
                        0,
                        0
                      )
                  : console.warn(
                      "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"
                    )
                : m
                ? f &&
                  S.texSubImage3D(
                    y.TEXTURE_2D_ARRAY,
                    e,
                    0,
                    0,
                    0,
                    i.width,
                    i.height,
                    c.depth,
                    d,
                    u,
                    i.data
                  )
                : S.texImage3D(
                    y.TEXTURE_2D_ARRAY,
                    e,
                    r,
                    i.width,
                    i.height,
                    c.depth,
                    0,
                    d,
                    u,
                    i.data
                  );
        } else {
          m && h && S.texStorage2D(y.TEXTURE_2D, g, r, p[0].width, p[0].height);
          for (let e = 0, t = p.length; e < t; e++)
            (i = p[e]),
              n.format !== RGBAFormat
                ? null !== d
                  ? m
                    ? f &&
                      S.compressedTexSubImage2D(
                        y.TEXTURE_2D,
                        e,
                        0,
                        0,
                        i.width,
                        i.height,
                        d,
                        i.data
                      )
                    : S.compressedTexImage2D(
                        y.TEXTURE_2D,
                        e,
                        r,
                        i.width,
                        i.height,
                        0,
                        i.data
                      )
                  : console.warn(
                      "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"
                    )
                : m
                ? f &&
                  S.texSubImage2D(
                    y.TEXTURE_2D,
                    e,
                    0,
                    0,
                    i.width,
                    i.height,
                    d,
                    u,
                    i.data
                  )
                : S.texImage2D(
                    y.TEXTURE_2D,
                    e,
                    r,
                    i.width,
                    i.height,
                    0,
                    d,
                    u,
                    i.data
                  );
        }
      else if (n.isDataArrayTexture)
        m
          ? (h &&
              S.texStorage3D(
                y.TEXTURE_2D_ARRAY,
                g,
                r,
                c.width,
                c.height,
                c.depth
              ),
            f &&
              S.texSubImage3D(
                y.TEXTURE_2D_ARRAY,
                0,
                0,
                0,
                0,
                c.width,
                c.height,
                c.depth,
                d,
                u,
                c.data
              ))
          : S.texImage3D(
              y.TEXTURE_2D_ARRAY,
              0,
              r,
              c.width,
              c.height,
              c.depth,
              0,
              d,
              u,
              c.data
            );
      else if (n.isData3DTexture)
        m
          ? (h &&
              S.texStorage3D(y.TEXTURE_3D, g, r, c.width, c.height, c.depth),
            f &&
              S.texSubImage3D(
                y.TEXTURE_3D,
                0,
                0,
                0,
                0,
                c.width,
                c.height,
                c.depth,
                d,
                u,
                c.data
              ))
          : S.texImage3D(
              y.TEXTURE_3D,
              0,
              r,
              c.width,
              c.height,
              c.depth,
              0,
              d,
              u,
              c.data
            );
      else if (n.isFramebufferTexture) {
        if (h)
          if (m) S.texStorage2D(y.TEXTURE_2D, g, r, c.width, c.height);
          else {
            let t = c.width,
              i = c.height;
            for (let e = 0; e < g; e++)
              S.texImage2D(y.TEXTURE_2D, e, r, t, i, 0, d, u, null),
                (t >>= 1),
                (i >>= 1);
          }
      } else if (0 < p.length) {
        m &&
          h &&
          ((t = O(p[0])),
          S.texStorage2D(y.TEXTURE_2D, g, r, t.width, t.height));
        for (let e = 0, t = p.length; e < t; e++)
          (i = p[e]),
            m
              ? f && S.texSubImage2D(y.TEXTURE_2D, e, 0, 0, d, u, i)
              : S.texImage2D(y.TEXTURE_2D, e, r, d, u, i);
        n.generateMipmaps = !1;
      } else
        m
          ? (h &&
              ((s = O(c)),
              S.texStorage2D(y.TEXTURE_2D, g, r, s.width, s.height)),
            f && S.texSubImage2D(y.TEXTURE_2D, 0, 0, 0, d, u, c))
          : S.texImage2D(y.TEXTURE_2D, 0, r, d, u, c);
      R(n) && A(a), (l.__version = o.version), n.onUpdate && n.onUpdate(n);
    }
    e.__version = n.version;
  }
  function v(e, t, i, r, n, a) {
    var s,
      o,
      l = E.convert(i.format, i.colorSpace),
      h = E.convert(i.type),
      c = w(i.internalFormat, l, h, i.colorSpace);
    M.get(t).__hasExternalTextures ||
      ((s = Math.max(1, t.width >> a)),
      (o = Math.max(1, t.height >> a)),
      n === y.TEXTURE_3D || n === y.TEXTURE_2D_ARRAY
        ? S.texImage3D(n, a, c, s, o, t.depth, 0, l, h, null)
        : S.texImage2D(n, a, c, s, o, 0, l, h, null)),
      S.bindFramebuffer(y.FRAMEBUFFER, e),
      U(t)
        ? d.framebufferTexture2DMultisampleEXT(
            y.FRAMEBUFFER,
            r,
            n,
            M.get(i).__webglTexture,
            0,
            N(t)
          )
        : (n === y.TEXTURE_2D ||
            (n >= y.TEXTURE_CUBE_MAP_POSITIVE_X &&
              n <= y.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
          y.framebufferTexture2D(
            y.FRAMEBUFFER,
            r,
            n,
            M.get(i).__webglTexture,
            a
          ),
      S.bindFramebuffer(y.FRAMEBUFFER, null);
  }
  function x(t, i, r) {
    if (
      (y.bindRenderbuffer(y.RENDERBUFFER, t), i.depthBuffer && !i.stencilBuffer)
    ) {
      let e = y.DEPTH_COMPONENT24;
      r || U(i)
        ? ((n = i.depthTexture) &&
            n.isDepthTexture &&
            (n.type === FloatType
              ? (e = y.DEPTH_COMPONENT32F)
              : n.type === UnsignedIntType && (e = y.DEPTH_COMPONENT24)),
          (n = N(i)),
          U(i)
            ? d.renderbufferStorageMultisampleEXT(
                y.RENDERBUFFER,
                n,
                e,
                i.width,
                i.height
              )
            : y.renderbufferStorageMultisample(
                y.RENDERBUFFER,
                n,
                e,
                i.width,
                i.height
              ))
        : y.renderbufferStorage(y.RENDERBUFFER, e, i.width, i.height),
        y.framebufferRenderbuffer(
          y.FRAMEBUFFER,
          y.DEPTH_ATTACHMENT,
          y.RENDERBUFFER,
          t
        );
    } else if (i.depthBuffer && i.stencilBuffer) {
      var n = N(i);
      r && !1 === U(i)
        ? y.renderbufferStorageMultisample(
            y.RENDERBUFFER,
            n,
            y.DEPTH24_STENCIL8,
            i.width,
            i.height
          )
        : U(i)
        ? d.renderbufferStorageMultisampleEXT(
            y.RENDERBUFFER,
            n,
            y.DEPTH24_STENCIL8,
            i.width,
            i.height
          )
        : y.renderbufferStorage(
            y.RENDERBUFFER,
            y.DEPTH_STENCIL,
            i.width,
            i.height
          ),
        y.framebufferRenderbuffer(
          y.FRAMEBUFFER,
          y.DEPTH_STENCIL_ATTACHMENT,
          y.RENDERBUFFER,
          t
        );
    } else {
      var a = i.textures;
      for (let e = 0; e < a.length; e++) {
        var s = a[e],
          o = E.convert(s.format, s.colorSpace),
          l = E.convert(s.type),
          o = w(s.internalFormat, o, l, s.colorSpace),
          l = N(i);
        r && !1 === U(i)
          ? y.renderbufferStorageMultisample(
              y.RENDERBUFFER,
              l,
              o,
              i.width,
              i.height
            )
          : U(i)
          ? d.renderbufferStorageMultisampleEXT(
              y.RENDERBUFFER,
              l,
              o,
              i.width,
              i.height
            )
          : y.renderbufferStorage(y.RENDERBUFFER, o, i.width, i.height);
      }
    }
    y.bindRenderbuffer(y.RENDERBUFFER, null);
  }
  function P(t) {
    var i = M.get(t),
      e = !0 === t.isWebGLCubeRenderTarget;
    if (t.depthTexture && !i.__autoAllocateDepthBuffer) {
      if (e)
        throw new Error(
          "target.depthTexture not supported in Cube render targets"
        );
      var r = i.__webglFramebuffer,
        n = t;
      if (n && n.isWebGLCubeRenderTarget)
        throw new Error(
          "Depth Texture with cube render targets is not supported"
        );
      if (
        (S.bindFramebuffer(y.FRAMEBUFFER, r),
        !n.depthTexture || !n.depthTexture.isDepthTexture)
      )
        throw new Error(
          "renderTarget.depthTexture must be an instance of THREE.DepthTexture"
        );
      (M.get(n.depthTexture).__webglTexture &&
        n.depthTexture.image.width === n.width &&
        n.depthTexture.image.height === n.height) ||
        ((n.depthTexture.image.width = n.width),
        (n.depthTexture.image.height = n.height),
        (n.depthTexture.needsUpdate = !0)),
        g(n.depthTexture, 0);
      var r = M.get(n.depthTexture).__webglTexture,
        a = N(n);
      if (n.depthTexture.format === DepthFormat)
        U(n)
          ? d.framebufferTexture2DMultisampleEXT(
              y.FRAMEBUFFER,
              y.DEPTH_ATTACHMENT,
              y.TEXTURE_2D,
              r,
              0,
              a
            )
          : y.framebufferTexture2D(
              y.FRAMEBUFFER,
              y.DEPTH_ATTACHMENT,
              y.TEXTURE_2D,
              r,
              0
            );
      else {
        if (n.depthTexture.format !== DepthStencilFormat)
          throw new Error("Unknown depthTexture format");
        U(n)
          ? d.framebufferTexture2DMultisampleEXT(
              y.FRAMEBUFFER,
              y.DEPTH_STENCIL_ATTACHMENT,
              y.TEXTURE_2D,
              r,
              0,
              a
            )
          : y.framebufferTexture2D(
              y.FRAMEBUFFER,
              y.DEPTH_STENCIL_ATTACHMENT,
              y.TEXTURE_2D,
              r,
              0
            );
      }
    } else if (e) {
      i.__webglDepthbuffer = [];
      for (let e = 0; e < 6; e++)
        S.bindFramebuffer(y.FRAMEBUFFER, i.__webglFramebuffer[e]),
          (i.__webglDepthbuffer[e] = y.createRenderbuffer()),
          x(i.__webglDepthbuffer[e], t, !1);
    } else
      S.bindFramebuffer(y.FRAMEBUFFER, i.__webglFramebuffer),
        (i.__webglDepthbuffer = y.createRenderbuffer()),
        x(i.__webglDepthbuffer, t, !1);
    S.bindFramebuffer(y.FRAMEBUFFER, null);
  }
  let I = [],
    D = [];
  function N(e) {
    return Math.min(T.maxSamples, e.samples);
  }
  function U(e) {
    var t = M.get(e);
    return (
      0 < e.samples &&
      !0 === s.has("WEBGL_multisampled_render_to_texture") &&
      !1 !== t.__useRenderToTexture
    );
  }
  function V(e, t) {
    var i = e.colorSpace,
      r = e.format,
      n = e.type;
    return (
      !0 !== e.isCompressedTexture &&
        !0 !== e.isVideoTexture &&
        i !== LinearSRGBColorSpace &&
        i !== NoColorSpace &&
        (ColorManagement.getTransfer(i) === SRGBTransfer
          ? (r === RGBAFormat && n === UnsignedByteType) ||
            console.warn(
              "THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."
            )
          : console.error(
              "THREE.WebGLTextures: Unsupported texture color space:",
              i
            )),
      t
    );
  }
  function O(e) {
    return (
      "undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement
        ? ((t.width = e.naturalWidth || e.width),
          (t.height = e.naturalHeight || e.height))
        : "undefined" != typeof VideoFrame && e instanceof VideoFrame
        ? ((t.width = e.displayWidth), (t.height = e.displayHeight))
        : ((t.width = e.width), (t.height = e.height)),
      t
    );
  }
  (this.allocateTextureUnit = function () {
    var e = r;
    return (
      e >= T.maxTextures &&
        console.warn(
          "THREE.WebGLTextures: Trying to use " +
            e +
            " texture units while this GPU supports only " +
            T.maxTextures
        ),
      (r += 1),
      e
    );
  }),
    (this.resetTextureUnits = function () {
      r = 0;
    }),
    (this.setTexture2D = g),
    (this.setTexture2DArray = function (e, t) {
      var i = M.get(e);
      0 < e.version && i.__version !== e.version
        ? _(i, e, t)
        : S.bindTexture(y.TEXTURE_2D_ARRAY, i.__webglTexture, y.TEXTURE0 + t);
    }),
    (this.setTexture3D = function (e, t) {
      var i = M.get(e);
      0 < e.version && i.__version !== e.version
        ? _(i, e, t)
        : S.bindTexture(y.TEXTURE_3D, i.__webglTexture, y.TEXTURE0 + t);
    }),
    (this.setTextureCube = function (t, e) {
      var i = M.get(t);
      if (0 < t.version && i.__version !== t.version) {
        var r = i,
          n = t,
          t = e;
        if (6 === n.image.length) {
          var a = G(r, n),
            s = n.source,
            o =
              (S.bindTexture(
                y.TEXTURE_CUBE_MAP,
                r.__webglTexture,
                y.TEXTURE0 + t
              ),
              M.get(s));
          if (s.version !== o.__version || !0 === a) {
            S.activeTexture(y.TEXTURE0 + t);
            var t = ColorManagement.getPrimaries(
                ColorManagement.workingColorSpace
              ),
              l =
                n.colorSpace === NoColorSpace
                  ? null
                  : ColorManagement.getPrimaries(n.colorSpace),
              t =
                n.colorSpace === NoColorSpace || t === l
                  ? y.NONE
                  : y.BROWSER_DEFAULT_WEBGL,
              h =
                (y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL, n.flipY),
                y.pixelStorei(
                  y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                  n.premultiplyAlpha
                ),
                y.pixelStorei(y.UNPACK_ALIGNMENT, n.unpackAlignment),
                y.pixelStorei(y.UNPACK_COLORSPACE_CONVERSION_WEBGL, t),
                n.isCompressedTexture || n.image[0].isCompressedTexture),
              c = n.image[0] && n.image[0].isDataTexture,
              d = [];
            for (let e = 0; e < 6; e++)
              (d[e] =
                h || c
                  ? c
                    ? n.image[e].image
                    : n.image[e]
                  : b(n.image[e], !0, T.maxCubemapSize)),
                (d[e] = V(n, d[e]));
            var l = d[0],
              u = E.convert(n.format, n.colorSpace),
              p = E.convert(n.type),
              m = w(n.internalFormat, u, p, n.colorSpace),
              f = !0 !== n.isVideoTexture,
              t = void 0 === o.__version || !0 === a,
              g = s.dataReady;
            let e = L(n, l);
            C(y.TEXTURE_CUBE_MAP, n);
            let i;
            if (h) {
              f &&
                t &&
                S.texStorage2D(y.TEXTURE_CUBE_MAP, e, m, l.width, l.height);
              for (let t = 0; t < 6; t++) {
                i = d[t].mipmaps;
                for (let e = 0; e < i.length; e++) {
                  var _ = i[e];
                  n.format !== RGBAFormat
                    ? null !== u
                      ? f
                        ? g &&
                          S.compressedTexSubImage2D(
                            y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                            e,
                            0,
                            0,
                            _.width,
                            _.height,
                            u,
                            _.data
                          )
                        : S.compressedTexImage2D(
                            y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                            e,
                            m,
                            _.width,
                            _.height,
                            0,
                            _.data
                          )
                      : console.warn(
                          "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"
                        )
                    : f
                    ? g &&
                      S.texSubImage2D(
                        y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                        e,
                        0,
                        0,
                        _.width,
                        _.height,
                        u,
                        p,
                        _.data
                      )
                    : S.texImage2D(
                        y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                        e,
                        m,
                        _.width,
                        _.height,
                        0,
                        u,
                        p,
                        _.data
                      );
                }
              }
            } else {
              (i = n.mipmaps),
                f &&
                  t &&
                  (0 < i.length && e++,
                  (a = O(d[0])),
                  S.texStorage2D(y.TEXTURE_CUBE_MAP, e, m, a.width, a.height));
              for (let t = 0; t < 6; t++)
                if (c) {
                  f
                    ? g &&
                      S.texSubImage2D(
                        y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                        0,
                        0,
                        0,
                        d[t].width,
                        d[t].height,
                        u,
                        p,
                        d[t].data
                      )
                    : S.texImage2D(
                        y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                        0,
                        m,
                        d[t].width,
                        d[t].height,
                        0,
                        u,
                        p,
                        d[t].data
                      );
                  for (let e = 0; e < i.length; e++) {
                    var v = i[e].image[t].image;
                    f
                      ? g &&
                        S.texSubImage2D(
                          y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                          e + 1,
                          0,
                          0,
                          v.width,
                          v.height,
                          u,
                          p,
                          v.data
                        )
                      : S.texImage2D(
                          y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                          e + 1,
                          m,
                          v.width,
                          v.height,
                          0,
                          u,
                          p,
                          v.data
                        );
                  }
                } else {
                  f
                    ? g &&
                      S.texSubImage2D(
                        y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                        0,
                        0,
                        0,
                        u,
                        p,
                        d[t]
                      )
                    : S.texImage2D(
                        y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                        0,
                        m,
                        u,
                        p,
                        d[t]
                      );
                  for (let e = 0; e < i.length; e++) {
                    var x = i[e];
                    f
                      ? g &&
                        S.texSubImage2D(
                          y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                          e + 1,
                          0,
                          0,
                          u,
                          p,
                          x.image[t]
                        )
                      : S.texImage2D(
                          y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                          e + 1,
                          m,
                          u,
                          p,
                          x.image[t]
                        );
                  }
                }
            }
            R(n) && A(y.TEXTURE_CUBE_MAP),
              (o.__version = s.version),
              n.onUpdate && n.onUpdate(n);
          }
          r.__version = n.version;
        }
      } else
        S.bindTexture(y.TEXTURE_CUBE_MAP, i.__webglTexture, y.TEXTURE0 + e);
    }),
    (this.rebindTextures = function (e, t, i) {
      var r = M.get(e);
      void 0 !== t &&
        v(
          r.__webglFramebuffer,
          e,
          e.texture,
          y.COLOR_ATTACHMENT0,
          y.TEXTURE_2D,
          0
        ),
        void 0 !== i && P(e);
    }),
    (this.setupRenderTarget = function (i) {
      let r = i.texture;
      var n = M.get(i),
        e = M.get(r),
        a = (i.addEventListener("dispose", m), i.textures),
        t = !0 === i.isWebGLCubeRenderTarget,
        s = 1 < a.length;
      if (
        (s ||
          (void 0 === e.__webglTexture &&
            (e.__webglTexture = y.createTexture()),
          (e.__version = r.version),
          u.memory.textures++),
        t)
      ) {
        n.__webglFramebuffer = [];
        for (let t = 0; t < 6; t++)
          if (r.mipmaps && 0 < r.mipmaps.length) {
            n.__webglFramebuffer[t] = [];
            for (let e = 0; e < r.mipmaps.length; e++)
              n.__webglFramebuffer[t][e] = y.createFramebuffer();
          } else n.__webglFramebuffer[t] = y.createFramebuffer();
      } else {
        if (r.mipmaps && 0 < r.mipmaps.length) {
          n.__webglFramebuffer = [];
          for (let e = 0; e < r.mipmaps.length; e++)
            n.__webglFramebuffer[e] = y.createFramebuffer();
        } else n.__webglFramebuffer = y.createFramebuffer();
        if (s)
          for (let e = 0, t = a.length; e < t; e++) {
            var o = M.get(a[e]);
            void 0 === o.__webglTexture &&
              ((o.__webglTexture = y.createTexture()), u.memory.textures++);
          }
        if (0 < i.samples && !1 === U(i)) {
          (n.__webglMultisampledFramebuffer = y.createFramebuffer()),
            (n.__webglColorRenderbuffer = []),
            S.bindFramebuffer(y.FRAMEBUFFER, n.__webglMultisampledFramebuffer);
          for (let t = 0; t < a.length; t++) {
            let e = a[t];
            (n.__webglColorRenderbuffer[t] = y.createRenderbuffer()),
              y.bindRenderbuffer(y.RENDERBUFFER, n.__webglColorRenderbuffer[t]);
            var l = E.convert(e.format, e.colorSpace),
              h = E.convert(e.type),
              l = w(
                e.internalFormat,
                l,
                h,
                e.colorSpace,
                !0 === i.isXRRenderTarget
              ),
              h = N(i);
            y.renderbufferStorageMultisample(
              y.RENDERBUFFER,
              h,
              l,
              i.width,
              i.height
            ),
              y.framebufferRenderbuffer(
                y.FRAMEBUFFER,
                y.COLOR_ATTACHMENT0 + t,
                y.RENDERBUFFER,
                n.__webglColorRenderbuffer[t]
              );
          }
          y.bindRenderbuffer(y.RENDERBUFFER, null),
            i.depthBuffer &&
              ((n.__webglDepthRenderbuffer = y.createRenderbuffer()),
              x(n.__webglDepthRenderbuffer, i, !0)),
            S.bindFramebuffer(y.FRAMEBUFFER, null);
        }
      }
      if (t) {
        S.bindTexture(y.TEXTURE_CUBE_MAP, e.__webglTexture),
          C(y.TEXTURE_CUBE_MAP, r);
        for (let t = 0; t < 6; t++)
          if (r.mipmaps && 0 < r.mipmaps.length)
            for (let e = 0; e < r.mipmaps.length; e++)
              v(
                n.__webglFramebuffer[t][e],
                i,
                r,
                y.COLOR_ATTACHMENT0,
                y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                e
              );
          else
            v(
              n.__webglFramebuffer[t],
              i,
              r,
              y.COLOR_ATTACHMENT0,
              y.TEXTURE_CUBE_MAP_POSITIVE_X + t,
              0
            );
        R(r) && A(y.TEXTURE_CUBE_MAP);
      } else if (s)
        for (let e = 0, t = a.length; e < t; e++) {
          var c = a[e],
            d = M.get(c);
          S.bindTexture(y.TEXTURE_2D, d.__webglTexture),
            C(y.TEXTURE_2D, c),
            v(
              n.__webglFramebuffer,
              i,
              c,
              y.COLOR_ATTACHMENT0 + e,
              y.TEXTURE_2D,
              0
            ),
            R(c) && A(y.TEXTURE_2D);
        }
      else {
        let t = y.TEXTURE_2D;
        if (
          ((i.isWebGL3DRenderTarget || i.isWebGLArrayRenderTarget) &&
            (t = i.isWebGL3DRenderTarget ? y.TEXTURE_3D : y.TEXTURE_2D_ARRAY),
          S.bindTexture(t, e.__webglTexture),
          C(t, r),
          r.mipmaps && 0 < r.mipmaps.length)
        )
          for (let e = 0; e < r.mipmaps.length; e++)
            v(n.__webglFramebuffer[e], i, r, y.COLOR_ATTACHMENT0, t, e);
        else v(n.__webglFramebuffer, i, r, y.COLOR_ATTACHMENT0, t, 0);
        R(r) && A(t);
      }
      S.unbindTexture(), i.depthBuffer && P(i);
    }),
    (this.updateRenderTargetMipmap = function (i) {
      var r = i.textures;
      for (let e = 0, t = r.length; e < t; e++) {
        var n,
          a = r[e];
        R(a) &&
          ((n = i.isWebGLCubeRenderTarget ? y.TEXTURE_CUBE_MAP : y.TEXTURE_2D),
          (a = M.get(a).__webglTexture),
          S.bindTexture(n, a),
          A(n),
          S.unbindTexture());
      }
    }),
    (this.updateMultisampleRenderTarget = function (i) {
      if (0 < i.samples)
        if (!1 === U(i)) {
          var r = i.textures,
            n = i.width,
            a = i.height;
          let t = y.COLOR_BUFFER_BIT;
          var s,
            o = i.stencilBuffer
              ? y.DEPTH_STENCIL_ATTACHMENT
              : y.DEPTH_ATTACHMENT,
            l = M.get(i),
            h = 1 < r.length;
          if (h)
            for (let e = 0; e < r.length; e++)
              S.bindFramebuffer(
                y.FRAMEBUFFER,
                l.__webglMultisampledFramebuffer
              ),
                y.framebufferRenderbuffer(
                  y.FRAMEBUFFER,
                  y.COLOR_ATTACHMENT0 + e,
                  y.RENDERBUFFER,
                  null
                ),
                S.bindFramebuffer(y.FRAMEBUFFER, l.__webglFramebuffer),
                y.framebufferTexture2D(
                  y.DRAW_FRAMEBUFFER,
                  y.COLOR_ATTACHMENT0 + e,
                  y.TEXTURE_2D,
                  null,
                  0
                );
          S.bindFramebuffer(
            y.READ_FRAMEBUFFER,
            l.__webglMultisampledFramebuffer
          ),
            S.bindFramebuffer(y.DRAW_FRAMEBUFFER, l.__webglFramebuffer);
          for (let e = 0; e < r.length; e++)
            i.resolveDepthBuffer &&
              (i.depthBuffer && (t |= y.DEPTH_BUFFER_BIT), i.stencilBuffer) &&
              i.resolveStencilBuffer &&
              (t |= y.STENCIL_BUFFER_BIT),
              h &&
                (y.framebufferRenderbuffer(
                  y.READ_FRAMEBUFFER,
                  y.COLOR_ATTACHMENT0,
                  y.RENDERBUFFER,
                  l.__webglColorRenderbuffer[e]
                ),
                (s = M.get(r[e]).__webglTexture),
                y.framebufferTexture2D(
                  y.DRAW_FRAMEBUFFER,
                  y.COLOR_ATTACHMENT0,
                  y.TEXTURE_2D,
                  s,
                  0
                )),
              y.blitFramebuffer(0, 0, n, a, 0, 0, n, a, t, y.NEAREST),
              !0 === p &&
                ((I.length = 0),
                (D.length = 0),
                I.push(y.COLOR_ATTACHMENT0 + e),
                i.depthBuffer &&
                  !1 === i.resolveDepthBuffer &&
                  (I.push(o),
                  D.push(o),
                  y.invalidateFramebuffer(y.DRAW_FRAMEBUFFER, D)),
                y.invalidateFramebuffer(y.READ_FRAMEBUFFER, I));
          if (
            (S.bindFramebuffer(y.READ_FRAMEBUFFER, null),
            S.bindFramebuffer(y.DRAW_FRAMEBUFFER, null),
            h)
          )
            for (let e = 0; e < r.length; e++) {
              S.bindFramebuffer(
                y.FRAMEBUFFER,
                l.__webglMultisampledFramebuffer
              ),
                y.framebufferRenderbuffer(
                  y.FRAMEBUFFER,
                  y.COLOR_ATTACHMENT0 + e,
                  y.RENDERBUFFER,
                  l.__webglColorRenderbuffer[e]
                );
              var c = M.get(r[e]).__webglTexture;
              S.bindFramebuffer(y.FRAMEBUFFER, l.__webglFramebuffer),
                y.framebufferTexture2D(
                  y.DRAW_FRAMEBUFFER,
                  y.COLOR_ATTACHMENT0 + e,
                  y.TEXTURE_2D,
                  c,
                  0
                );
            }
          S.bindFramebuffer(
            y.DRAW_FRAMEBUFFER,
            l.__webglMultisampledFramebuffer
          );
        } else {
          var e;
          i.depthBuffer &&
            !1 === i.resolveDepthBuffer &&
            p &&
            ((e = i.stencilBuffer
              ? y.DEPTH_STENCIL_ATTACHMENT
              : y.DEPTH_ATTACHMENT),
            y.invalidateFramebuffer(y.DRAW_FRAMEBUFFER, [e]));
        }
    }),
    (this.setupDepthRenderbuffer = P),
    (this.setupFrameBufferTexture = v),
    (this.useMultisampledRTT = U);
}
function WebGLUtils(r, n) {
  return {
    convert: function (e, t = NoColorSpace) {
      let i;
      if (((t = ColorManagement.getTransfer(t)), e === UnsignedByteType))
        return r.UNSIGNED_BYTE;
      if (e === UnsignedShort4444Type) return r.UNSIGNED_SHORT_4_4_4_4;
      if (e === UnsignedShort5551Type) return r.UNSIGNED_SHORT_5_5_5_1;
      if (e === UnsignedInt5999Type) return r.UNSIGNED_INT_5_9_9_9_REV;
      if (e === ByteType) return r.BYTE;
      if (e === ShortType) return r.SHORT;
      if (e === UnsignedShortType) return r.UNSIGNED_SHORT;
      if (e === IntType) return r.INT;
      if (e === UnsignedIntType) return r.UNSIGNED_INT;
      if (e === FloatType) return r.FLOAT;
      if (e === HalfFloatType) return r.HALF_FLOAT;
      if (e === AlphaFormat) return r.ALPHA;
      if (e === RGBFormat) return r.RGB;
      if (e === RGBAFormat) return r.RGBA;
      if (e === LuminanceFormat) return r.LUMINANCE;
      if (e === LuminanceAlphaFormat) return r.LUMINANCE_ALPHA;
      if (e === DepthFormat) return r.DEPTH_COMPONENT;
      if (e === DepthStencilFormat) return r.DEPTH_STENCIL;
      if (e === RedFormat) return r.RED;
      if (e === RedIntegerFormat) return r.RED_INTEGER;
      if (e === RGFormat) return r.RG;
      if (e === RGIntegerFormat) return r.RG_INTEGER;
      if (e === RGBAIntegerFormat) return r.RGBA_INTEGER;
      if (
        e === RGB_S3TC_DXT1_Format ||
        e === RGBA_S3TC_DXT1_Format ||
        e === RGBA_S3TC_DXT3_Format ||
        e === RGBA_S3TC_DXT5_Format
      )
        if (t === SRGBTransfer) {
          if (null === (i = n.get("WEBGL_compressed_texture_s3tc_srgb")))
            return null;
          if (e === RGB_S3TC_DXT1_Format)
            return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (e === RGBA_S3TC_DXT1_Format)
            return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (e === RGBA_S3TC_DXT3_Format)
            return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (e === RGBA_S3TC_DXT5_Format)
            return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else {
          if (null === (i = n.get("WEBGL_compressed_texture_s3tc")))
            return null;
          if (e === RGB_S3TC_DXT1_Format) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
          if (e === RGBA_S3TC_DXT1_Format)
            return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          if (e === RGBA_S3TC_DXT3_Format)
            return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          if (e === RGBA_S3TC_DXT5_Format)
            return i.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        }
      if (
        e === RGB_PVRTC_4BPPV1_Format ||
        e === RGB_PVRTC_2BPPV1_Format ||
        e === RGBA_PVRTC_4BPPV1_Format ||
        e === RGBA_PVRTC_2BPPV1_Format
      ) {
        if (null === (i = n.get("WEBGL_compressed_texture_pvrtc"))) return null;
        if (e === RGB_PVRTC_4BPPV1_Format)
          return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (e === RGB_PVRTC_2BPPV1_Format)
          return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (e === RGBA_PVRTC_4BPPV1_Format)
          return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (e === RGBA_PVRTC_2BPPV1_Format)
          return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      }
      if (
        e === RGB_ETC1_Format ||
        e === RGB_ETC2_Format ||
        e === RGBA_ETC2_EAC_Format
      ) {
        if (null === (i = n.get("WEBGL_compressed_texture_etc"))) return null;
        if (e === RGB_ETC1_Format || e === RGB_ETC2_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ETC2
            : i.COMPRESSED_RGB8_ETC2;
        if (e === RGBA_ETC2_EAC_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
            : i.COMPRESSED_RGBA8_ETC2_EAC;
      }
      if (
        e === RGBA_ASTC_4x4_Format ||
        e === RGBA_ASTC_5x4_Format ||
        e === RGBA_ASTC_5x5_Format ||
        e === RGBA_ASTC_6x5_Format ||
        e === RGBA_ASTC_6x6_Format ||
        e === RGBA_ASTC_8x5_Format ||
        e === RGBA_ASTC_8x6_Format ||
        e === RGBA_ASTC_8x8_Format ||
        e === RGBA_ASTC_10x5_Format ||
        e === RGBA_ASTC_10x6_Format ||
        e === RGBA_ASTC_10x8_Format ||
        e === RGBA_ASTC_10x10_Format ||
        e === RGBA_ASTC_12x10_Format ||
        e === RGBA_ASTC_12x12_Format
      ) {
        if (null === (i = n.get("WEBGL_compressed_texture_astc"))) return null;
        if (e === RGBA_ASTC_4x4_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
            : i.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (e === RGBA_ASTC_5x4_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
            : i.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (e === RGBA_ASTC_5x5_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
            : i.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (e === RGBA_ASTC_6x5_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
            : i.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (e === RGBA_ASTC_6x6_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
            : i.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (e === RGBA_ASTC_8x5_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
            : i.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (e === RGBA_ASTC_8x6_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
            : i.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (e === RGBA_ASTC_8x8_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
            : i.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (e === RGBA_ASTC_10x5_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
            : i.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (e === RGBA_ASTC_10x6_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
            : i.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (e === RGBA_ASTC_10x8_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
            : i.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (e === RGBA_ASTC_10x10_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
            : i.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (e === RGBA_ASTC_12x10_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
            : i.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (e === RGBA_ASTC_12x12_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
            : i.COMPRESSED_RGBA_ASTC_12x12_KHR;
      }
      if (
        e === RGBA_BPTC_Format ||
        e === RGB_BPTC_SIGNED_Format ||
        e === RGB_BPTC_UNSIGNED_Format
      ) {
        if (null === (i = n.get("EXT_texture_compression_bptc"))) return null;
        if (e === RGBA_BPTC_Format)
          return t === SRGBTransfer
            ? i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
            : i.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (e === RGB_BPTC_SIGNED_Format)
          return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (e === RGB_BPTC_UNSIGNED_Format)
          return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      }
      if (
        e === RED_RGTC1_Format ||
        e === SIGNED_RED_RGTC1_Format ||
        e === RED_GREEN_RGTC2_Format ||
        e === SIGNED_RED_GREEN_RGTC2_Format
      ) {
        if (null === (i = n.get("EXT_texture_compression_rgtc"))) return null;
        if (e === RGBA_BPTC_Format) return i.COMPRESSED_RED_RGTC1_EXT;
        if (e === SIGNED_RED_RGTC1_Format)
          return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (e === RED_GREEN_RGTC2_Format)
          return i.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (e === SIGNED_RED_GREEN_RGTC2_Format)
          return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      }
      return e === UnsignedInt248Type
        ? r.UNSIGNED_INT_24_8
        : void 0 !== r[e]
        ? r[e]
        : null;
    },
  };
}
class ArrayCamera extends PerspectiveCamera {
  constructor(e = []) {
    super(), (this.isArrayCamera = !0), (this.cameras = e);
  }
}
class Group extends Object3D {
  constructor() {
    super(), (this.isGroup = !0), (this.type = "Group");
  }
}
let _moveEvent = { type: "move" };
class WebXRController {
  constructor() {
    (this._targetRay = null), (this._grip = null), (this._hand = null);
  }
  getHandSpace() {
    return (
      null === this._hand &&
        ((this._hand = new Group()),
        (this._hand.matrixAutoUpdate = !1),
        (this._hand.visible = !1),
        (this._hand.joints = {}),
        (this._hand.inputState = { pinching: !1 })),
      this._hand
    );
  }
  getTargetRaySpace() {
    return (
      null === this._targetRay &&
        ((this._targetRay = new Group()),
        (this._targetRay.matrixAutoUpdate = !1),
        (this._targetRay.visible = !1),
        (this._targetRay.hasLinearVelocity = !1),
        (this._targetRay.linearVelocity = new Vector3()),
        (this._targetRay.hasAngularVelocity = !1),
        (this._targetRay.angularVelocity = new Vector3())),
      this._targetRay
    );
  }
  getGripSpace() {
    return (
      null === this._grip &&
        ((this._grip = new Group()),
        (this._grip.matrixAutoUpdate = !1),
        (this._grip.visible = !1),
        (this._grip.hasLinearVelocity = !1),
        (this._grip.linearVelocity = new Vector3()),
        (this._grip.hasAngularVelocity = !1),
        (this._grip.angularVelocity = new Vector3())),
      this._grip
    );
  }
  dispatchEvent(e) {
    return (
      null !== this._targetRay && this._targetRay.dispatchEvent(e),
      null !== this._grip && this._grip.dispatchEvent(e),
      null !== this._hand && this._hand.dispatchEvent(e),
      this
    );
  }
  connect(e) {
    if (e && e.hand) {
      var t = this._hand;
      if (t) for (var i of e.hand.values()) this._getHandJoint(t, i);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return (
      this.dispatchEvent({ type: "disconnected", data: e }),
      null !== this._targetRay && (this._targetRay.visible = !1),
      null !== this._grip && (this._grip.visible = !1),
      null !== this._hand && (this._hand.visible = !1),
      this
    );
  }
  update(e, t, i) {
    let r = null,
      n = null,
      a = null;
    var s = this._targetRay,
      o = this._grip,
      l = this._hand;
    if (e && "visible-blurred" !== t.session.visibilityState) {
      if (l && e.hand) {
        a = !0;
        for (var h of e.hand.values()) {
          var c = t.getJointPose(h, i),
            h = this._getHandJoint(l, h);
          null !== c &&
            (h.matrix.fromArray(c.transform.matrix),
            h.matrix.decompose(h.position, h.rotation, h.scale),
            (h.matrixWorldNeedsUpdate = !0),
            (h.jointRadius = c.radius)),
            (h.visible = null !== c);
        }
        var d = l.joints["index-finger-tip"],
          u = l.joints["thumb-tip"],
          d = d.position.distanceTo(u.position);
        l.inputState.pinching && 0.025 < d
          ? ((l.inputState.pinching = !1),
            this.dispatchEvent({
              type: "pinchend",
              handedness: e.handedness,
              target: this,
            }))
          : !l.inputState.pinching &&
            d <= 0.015 &&
            ((l.inputState.pinching = !0),
            this.dispatchEvent({
              type: "pinchstart",
              handedness: e.handedness,
              target: this,
            }));
      } else
        null !== o &&
          e.gripSpace &&
          null !== (n = t.getPose(e.gripSpace, i)) &&
          (o.matrix.fromArray(n.transform.matrix),
          o.matrix.decompose(o.position, o.rotation, o.scale),
          (o.matrixWorldNeedsUpdate = !0),
          n.linearVelocity
            ? ((o.hasLinearVelocity = !0),
              o.linearVelocity.copy(n.linearVelocity))
            : (o.hasLinearVelocity = !1),
          n.angularVelocity
            ? ((o.hasAngularVelocity = !0),
              o.angularVelocity.copy(n.angularVelocity))
            : (o.hasAngularVelocity = !1));
      null !== s &&
        null !==
          (r =
            null === (r = t.getPose(e.targetRaySpace, i)) && null !== n
              ? n
              : r) &&
        (s.matrix.fromArray(r.transform.matrix),
        s.matrix.decompose(s.position, s.rotation, s.scale),
        (s.matrixWorldNeedsUpdate = !0),
        r.linearVelocity
          ? ((s.hasLinearVelocity = !0),
            s.linearVelocity.copy(r.linearVelocity))
          : (s.hasLinearVelocity = !1),
        r.angularVelocity
          ? ((s.hasAngularVelocity = !0),
            s.angularVelocity.copy(r.angularVelocity))
          : (s.hasAngularVelocity = !1),
        this.dispatchEvent(_moveEvent));
    }
    return (
      null !== s && (s.visible = null !== r),
      null !== o && (o.visible = null !== n),
      null !== l && (l.visible = null !== a),
      this
    );
  }
  _getHandJoint(e, t) {
    var i;
    return (
      void 0 === e.joints[t.jointName] &&
        (((i = new Group()).matrixAutoUpdate = !1),
        (i.visible = !1),
        (e.joints[t.jointName] = i),
        e.add(i)),
      e.joints[t.jointName]
    );
  }
}
let _occlusion_vertex = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`,
  _occlusion_fragment = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class WebXRDepthSensing {
  constructor() {
    (this.texture = null),
      (this.mesh = null),
      (this.depthNear = 0),
      (this.depthFar = 0);
  }
  init(e, t, i) {
    var r;
    null === this.texture &&
      ((r = new Texture()),
      (e.properties.get(r).__webglTexture = t.texture),
      (t.depthNear == i.depthNear && t.depthFar == i.depthFar) ||
        ((this.depthNear = t.depthNear), (this.depthFar = t.depthFar)),
      (this.texture = r));
  }
  render(e, t) {
    var i;
    null !== this.texture &&
      (null === this.mesh &&
        ((i = t.cameras[0].viewport),
        (i = new ShaderMaterial({
          vertexShader: _occlusion_vertex,
          fragmentShader: _occlusion_fragment,
          uniforms: {
            depthColor: { value: this.texture },
            depthWidth: { value: i.z },
            depthHeight: { value: i.w },
          },
        })),
        (this.mesh = new Mesh(new PlaneGeometry(20, 20), i))),
      e.render(this.mesh, t));
  }
  reset() {
    (this.texture = null), (this.mesh = null);
  }
}
class WebXRManager extends EventDispatcher {
  constructor(l, n) {
    super();
    let h = this,
      m = null,
      a = 1,
      c = null,
      t = "local-floor",
      i = 1,
      d = null,
      u = null,
      p = null,
      f = null,
      g = null,
      _ = null,
      v = new WebXRDepthSensing(),
      s = n.getContextAttributes(),
      e = null,
      x = null,
      y = [],
      S = [],
      o = new Vector2(),
      M = null,
      T = new PerspectiveCamera(),
      E =
        (T.layers.enable(1),
        (T.viewport = new Vector4()),
        new PerspectiveCamera()),
      b = (E.layers.enable(2), (E.viewport = new Vector4()), [T, E]),
      R = new ArrayCamera(),
      A = (R.layers.enable(1), R.layers.enable(2), null),
      w = null;
    function L(e) {
      var t = S.indexOf(e.inputSource);
      -1 !== t &&
        void 0 !== (t = y[t]) &&
        (t.update(e.inputSource, e.frame, d || c),
        t.dispatchEvent({ type: e.type, data: e.inputSource }));
    }
    function C() {
      m.removeEventListener("select", L),
        m.removeEventListener("selectstart", L),
        m.removeEventListener("selectend", L),
        m.removeEventListener("squeeze", L),
        m.removeEventListener("squeezestart", L),
        m.removeEventListener("squeezeend", L),
        m.removeEventListener("end", C),
        m.removeEventListener("inputsourceschange", P);
      for (let e = 0; e < y.length; e++) {
        var t = S[e];
        null !== t && ((S[e] = null), y[e].disconnect(t));
      }
      (A = null),
        (w = null),
        v.reset(),
        l.setRenderTarget(e),
        (g = null),
        (f = null),
        (p = null),
        (m = null),
        (x = null),
        O.stop(),
        (h.isPresenting = !1),
        l.setPixelRatio(M),
        l.setSize(o.width, o.height, !1),
        h.dispatchEvent({ type: "sessionend" });
    }
    function P(i) {
      for (let e = 0; e < i.removed.length; e++) {
        var t = i.removed[e],
          r = S.indexOf(t);
        0 <= r && ((S[r] = null), y[r].disconnect(t));
      }
      for (let e = 0; e < i.added.length; e++) {
        var n = i.added[e];
        let t = S.indexOf(n);
        if (-1 === t) {
          for (let e = 0; e < y.length; e++) {
            if (e >= S.length) {
              S.push(n), (t = e);
              break;
            }
            if (null === S[e]) {
              (S[e] = n), (t = e);
              break;
            }
          }
          if (-1 === t) break;
        }
        var a = y[t];
        a && a.connect(n);
      }
    }
    (this.cameraAutoUpdate = !0),
      (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (e) {
        let t = y[e];
        return (
          void 0 === t && ((t = new WebXRController()), (y[e] = t)),
          t.getTargetRaySpace()
        );
      }),
      (this.getControllerGrip = function (e) {
        let t = y[e];
        return (
          void 0 === t && ((t = new WebXRController()), (y[e] = t)),
          t.getGripSpace()
        );
      }),
      (this.getHand = function (e) {
        let t = y[e];
        return (
          void 0 === t && ((t = new WebXRController()), (y[e] = t)),
          t.getHandSpace()
        );
      }),
      (this.setFramebufferScaleFactor = function (e) {
        (a = e),
          !0 === h.isPresenting &&
            console.warn(
              "THREE.WebXRManager: Cannot change framebuffer scale while presenting."
            );
      }),
      (this.setReferenceSpaceType = function (e) {
        (t = e),
          !0 === h.isPresenting &&
            console.warn(
              "THREE.WebXRManager: Cannot change reference space type while presenting."
            );
      }),
      (this.getReferenceSpace = function () {
        return d || c;
      }),
      (this.setReferenceSpace = function (e) {
        d = e;
      }),
      (this.getBaseLayer = function () {
        return null !== f ? f : g;
      }),
      (this.getBinding = function () {
        return p;
      }),
      (this.getFrame = function () {
        return _;
      }),
      (this.getSession = function () {
        return m;
      }),
      (this.setSession = async function (r) {
        if (null !== (m = r)) {
          if (
            ((e = l.getRenderTarget()),
            m.addEventListener("select", L),
            m.addEventListener("selectstart", L),
            m.addEventListener("selectend", L),
            m.addEventListener("squeeze", L),
            m.addEventListener("squeezestart", L),
            m.addEventListener("squeezeend", L),
            m.addEventListener("end", C),
            m.addEventListener("inputsourceschange", P),
            !0 !== s.xrCompatible && (await n.makeXRCompatible()),
            (M = l.getPixelRatio()),
            l.getSize(o),
            void 0 === m.renderState.layers)
          ) {
            r = {
              antialias: s.antialias,
              alpha: !0,
              depth: s.depth,
              stencil: s.stencil,
              framebufferScaleFactor: a,
            };
            (g = new XRWebGLLayer(m, n, r)),
              m.updateRenderState({ baseLayer: g }),
              l.setPixelRatio(1),
              l.setSize(g.framebufferWidth, g.framebufferHeight, !1),
              (x = new WebGLRenderTarget(
                g.framebufferWidth,
                g.framebufferHeight,
                {
                  format: RGBAFormat,
                  type: UnsignedByteType,
                  colorSpace: l.outputColorSpace,
                  stencilBuffer: s.stencil,
                }
              ));
          } else {
            let e = null,
              t = null,
              i = null;
            s.depth &&
              ((i = s.stencil ? n.DEPTH24_STENCIL8 : n.DEPTH_COMPONENT24),
              (e = s.stencil ? DepthStencilFormat : DepthFormat),
              (t = s.stencil ? UnsignedInt248Type : UnsignedIntType));
            r = { colorFormat: n.RGBA8, depthFormat: i, scaleFactor: a };
            (p = new XRWebGLBinding(m, n)),
              (f = p.createProjectionLayer(r)),
              m.updateRenderState({ layers: [f] }),
              l.setPixelRatio(1),
              l.setSize(f.textureWidth, f.textureHeight, !1),
              (x = new WebGLRenderTarget(f.textureWidth, f.textureHeight, {
                format: RGBAFormat,
                type: UnsignedByteType,
                depthTexture: new DepthTexture(
                  f.textureWidth,
                  f.textureHeight,
                  t,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  e
                ),
                stencilBuffer: s.stencil,
                colorSpace: l.outputColorSpace,
                samples: s.antialias ? 4 : 0,
                resolveDepthBuffer: !1 === f.ignoreDepthValues,
              }));
          }
          (x.isXRRenderTarget = !0),
            this.setFoveation(i),
            (d = null),
            (c = await m.requestReferenceSpace(t)),
            O.setContext(m),
            O.start(),
            (h.isPresenting = !0),
            h.dispatchEvent({ type: "sessionstart" });
        }
      }),
      (this.getEnvironmentBlendMode = function () {
        if (null !== m) return m.environmentBlendMode;
      });
    let I = new Vector3(),
      D = new Vector3();
    function N(e, t) {
      null === t
        ? e.matrixWorld.copy(e.matrix)
        : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix),
        e.matrixWorldInverse.copy(e.matrixWorld).invert();
    }
    (this.updateCamera = function (e) {
      if (null !== m) {
        null !== v.texture && ((e.near = v.depthNear), (e.far = v.depthFar)),
          (R.near = E.near = T.near = e.near),
          (R.far = E.far = T.far = e.far),
          (A === R.near && w === R.far) ||
            (m.updateRenderState({ depthNear: R.near, depthFar: R.far }),
            (A = R.near),
            (w = R.far),
            (T.near = A),
            (T.far = w),
            (E.near = A),
            (E.far = w),
            T.updateProjectionMatrix(),
            E.updateProjectionMatrix(),
            e.updateProjectionMatrix());
        var t,
          i,
          r,
          n,
          a,
          s,
          o,
          l,
          h = e.parent,
          c = R.cameras;
        N(R, h);
        for (let e = 0; e < c.length; e++) N(c[e], h);
        2 === c.length
          ? ((t = R),
            (i = T),
            (d = E),
            I.setFromMatrixPosition(i.matrixWorld),
            D.setFromMatrixPosition(d.matrixWorld),
            (p = I.distanceTo(D)),
            (r = i.projectionMatrix.elements),
            (d = d.projectionMatrix.elements),
            (n = r[14] / (r[10] - 1)),
            (a = r[14] / (r[10] + 1)),
            (s = (r[9] + 1) / r[5]),
            (o = (r[9] - 1) / r[5]),
            (r = (r[8] - 1) / r[0]),
            (d = (d[8] + 1) / d[0]),
            (u = n * r),
            (l = n * d),
            (r = (d = p / (d - r)) * -r),
            i.matrixWorld.decompose(t.position, t.quaternion, t.scale),
            t.translateX(r),
            t.translateZ(d),
            t.matrixWorld.compose(t.position, t.quaternion, t.scale),
            t.matrixWorldInverse.copy(t.matrixWorld).invert(),
            (i = n + d),
            (n = a + d),
            t.projectionMatrix.makePerspective(
              u - r,
              p - r + l,
              ((s * a) / n) * i,
              ((o * a) / n) * i,
              i,
              n
            ),
            t.projectionMatrixInverse.copy(t.projectionMatrix).invert())
          : R.projectionMatrix.copy(T.projectionMatrix);
        var d = e,
          u = R,
          p = h;
        null === p
          ? d.matrix.copy(u.matrixWorld)
          : (d.matrix.copy(p.matrixWorld),
            d.matrix.invert(),
            d.matrix.multiply(u.matrixWorld)),
          d.matrix.decompose(d.position, d.quaternion, d.scale),
          d.updateMatrixWorld(!0),
          d.projectionMatrix.copy(u.projectionMatrix),
          d.projectionMatrixInverse.copy(u.projectionMatrixInverse),
          d.isPerspectiveCamera &&
            ((d.fov =
              2 * RAD2DEG * Math.atan(1 / d.projectionMatrix.elements[5])),
            (d.zoom = 1));
      }
    }),
      (this.getCamera = function () {
        return R;
      }),
      (this.getFoveation = function () {
        if (null !== f || null !== g) return i;
      }),
      (this.setFoveation = function (e) {
        (i = e),
          null !== f && (f.fixedFoveation = e),
          null !== g && void 0 !== g.fixedFoveation && (g.fixedFoveation = e);
      }),
      (this.hasDepthSensing = function () {
        return null !== v.texture;
      });
    let U = null;
    let O = new WebGLAnimation();
    O.setAnimationLoop(function (e, t) {
      if (((u = t.getViewerPose(d || c)), (_ = t), null !== u)) {
        var n = u.views;
        null !== g &&
          (l.setRenderTargetFramebuffer(x, g.framebuffer),
          l.setRenderTarget(x));
        let r = !1;
        n.length !== R.cameras.length && ((R.cameras.length = 0), (r = !0));
        for (let i = 0; i < n.length; i++) {
          var a,
            s = n[i];
          let e = null,
            t =
              (null !== g
                ? (e = g.getViewport(s))
                : ((a = p.getViewSubImage(f, s)),
                  (e = a.viewport),
                  0 === i &&
                    (l.setRenderTargetTextures(
                      x,
                      a.colorTexture,
                      f.ignoreDepthValues ? void 0 : a.depthStencilTexture
                    ),
                    l.setRenderTarget(x))),
              b[i]);
          void 0 === t &&
            ((t = new PerspectiveCamera()).layers.enable(i),
            (t.viewport = new Vector4()),
            (b[i] = t)),
            t.matrix.fromArray(s.transform.matrix),
            t.matrix.decompose(t.position, t.quaternion, t.scale),
            t.projectionMatrix.fromArray(s.projectionMatrix),
            t.projectionMatrixInverse.copy(t.projectionMatrix).invert(),
            t.viewport.set(e.x, e.y, e.width, e.height),
            0 === i &&
              (R.matrix.copy(t.matrix),
              R.matrix.decompose(R.position, R.quaternion, R.scale)),
            !0 === r && R.cameras.push(t);
        }
        var i = m.enabledFeatures;
        i &&
          i.includes("depth-sensing") &&
          (i = p.getDepthInformation(n[0])) &&
          i.isValid &&
          i.texture &&
          v.init(l, i, m.renderState);
      }
      for (let e = 0; e < y.length; e++) {
        var r = S[e],
          o = y[e];
        null !== r && void 0 !== o && o.update(r, t, d || c);
      }
      v.render(l, R),
        U && U(e, t),
        t.detectedPlanes &&
          h.dispatchEvent({ type: "planesdetected", data: t }),
        (_ = null);
    }),
      (this.setAnimationLoop = function (e) {
        U = e;
      }),
      (this.dispose = function () {});
  }
}
let _e1 = new Euler(),
  _m1 = new Matrix4();
function WebGLMaterials(n, d) {
  function u(e, t) {
    !0 === e.matrixAutoUpdate && e.updateMatrix(), t.value.copy(e.matrix);
  }
  function p(e, t) {
    (e.opacity.value = t.opacity),
      t.color && e.diffuse.value.copy(t.color),
      t.emissive &&
        e.emissive.value.copy(t.emissive).multiplyScalar(t.emissiveIntensity),
      t.map && ((e.map.value = t.map), u(t.map, e.mapTransform)),
      t.alphaMap &&
        ((e.alphaMap.value = t.alphaMap), u(t.alphaMap, e.alphaMapTransform)),
      t.bumpMap &&
        ((e.bumpMap.value = t.bumpMap),
        u(t.bumpMap, e.bumpMapTransform),
        (e.bumpScale.value = t.bumpScale),
        t.side === BackSide) &&
        (e.bumpScale.value *= -1),
      t.normalMap &&
        ((e.normalMap.value = t.normalMap),
        u(t.normalMap, e.normalMapTransform),
        e.normalScale.value.copy(t.normalScale),
        t.side === BackSide) &&
        e.normalScale.value.negate(),
      t.displacementMap &&
        ((e.displacementMap.value = t.displacementMap),
        u(t.displacementMap, e.displacementMapTransform),
        (e.displacementScale.value = t.displacementScale),
        (e.displacementBias.value = t.displacementBias)),
      t.emissiveMap &&
        ((e.emissiveMap.value = t.emissiveMap),
        u(t.emissiveMap, e.emissiveMapTransform)),
      t.specularMap &&
        ((e.specularMap.value = t.specularMap),
        u(t.specularMap, e.specularMapTransform)),
      0 < t.alphaTest && (e.alphaTest.value = t.alphaTest);
    var i = d.get(t),
      r = i.envMap,
      i = i.envMapRotation;
    r &&
      ((e.envMap.value = r),
      _e1.copy(i),
      (_e1.x *= -1),
      (_e1.y *= -1),
      (_e1.z *= -1),
      r.isCubeTexture &&
        !1 === r.isRenderTargetTexture &&
        ((_e1.y *= -1), (_e1.z *= -1)),
      e.envMapRotation.value.setFromMatrix4(_m1.makeRotationFromEuler(_e1)),
      (e.flipEnvMap.value =
        r.isCubeTexture && !1 === r.isRenderTargetTexture ? -1 : 1),
      (e.reflectivity.value = t.reflectivity),
      (e.ior.value = t.ior),
      (e.refractionRatio.value = t.refractionRatio)),
      t.lightMap &&
        ((e.lightMap.value = t.lightMap),
        (i = !0 === n._useLegacyLights ? Math.PI : 1),
        (e.lightMapIntensity.value = t.lightMapIntensity * i),
        u(t.lightMap, e.lightMapTransform)),
      t.aoMap &&
        ((e.aoMap.value = t.aoMap),
        (e.aoMapIntensity.value = t.aoMapIntensity),
        u(t.aoMap, e.aoMapTransform));
  }
  return {
    refreshFogUniforms: function (e, t) {
      t.color.getRGB(e.fogColor.value, getUnlitUniformColorSpace(n)),
        t.isFog
          ? ((e.fogNear.value = t.near), (e.fogFar.value = t.far))
          : t.isFogExp2 && (e.fogDensity.value = t.density);
    },
    refreshMaterialUniforms: function (e, t, i, r, n) {
      var a, s, o, l, h, c;
      t.isMeshBasicMaterial || t.isMeshLambertMaterial
        ? p(e, t)
        : t.isMeshToonMaterial
        ? (p(e, t),
          (h = e),
          (c = t).gradientMap && (h.gradientMap.value = c.gradientMap))
        : t.isMeshPhongMaterial
        ? (p(e, t),
          (h = t),
          (c = e).specular.value.copy(h.specular),
          (c.shininess.value = Math.max(h.shininess, 1e-4)))
        : t.isMeshStandardMaterial
        ? (p(e, t),
          (o = t),
          ((l = e).metalness.value = o.metalness),
          o.metalnessMap &&
            ((l.metalnessMap.value = o.metalnessMap),
            u(o.metalnessMap, l.metalnessMapTransform)),
          (l.roughness.value = o.roughness),
          o.roughnessMap &&
            ((l.roughnessMap.value = o.roughnessMap),
            u(o.roughnessMap, l.roughnessMapTransform)),
          o.envMap && (l.envMapIntensity.value = o.envMapIntensity),
          t.isMeshPhysicalMaterial &&
            ((l = t),
            (o = n),
            ((n = e).ior.value = l.ior),
            0 < l.sheen &&
              (n.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),
              (n.sheenRoughness.value = l.sheenRoughness),
              l.sheenColorMap &&
                ((n.sheenColorMap.value = l.sheenColorMap),
                u(l.sheenColorMap, n.sheenColorMapTransform)),
              l.sheenRoughnessMap) &&
              ((n.sheenRoughnessMap.value = l.sheenRoughnessMap),
              u(l.sheenRoughnessMap, n.sheenRoughnessMapTransform)),
            0 < l.clearcoat &&
              ((n.clearcoat.value = l.clearcoat),
              (n.clearcoatRoughness.value = l.clearcoatRoughness),
              l.clearcoatMap &&
                ((n.clearcoatMap.value = l.clearcoatMap),
                u(l.clearcoatMap, n.clearcoatMapTransform)),
              l.clearcoatRoughnessMap &&
                ((n.clearcoatRoughnessMap.value = l.clearcoatRoughnessMap),
                u(l.clearcoatRoughnessMap, n.clearcoatRoughnessMapTransform)),
              l.clearcoatNormalMap) &&
              ((n.clearcoatNormalMap.value = l.clearcoatNormalMap),
              u(l.clearcoatNormalMap, n.clearcoatNormalMapTransform),
              n.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),
              l.side === BackSide) &&
              n.clearcoatNormalScale.value.negate(),
            0 < l.dispersion && (n.dispersion.value = l.dispersion),
            0 < l.iridescence &&
              ((n.iridescence.value = l.iridescence),
              (n.iridescenceIOR.value = l.iridescenceIOR),
              (n.iridescenceThicknessMinimum.value =
                l.iridescenceThicknessRange[0]),
              (n.iridescenceThicknessMaximum.value =
                l.iridescenceThicknessRange[1]),
              l.iridescenceMap &&
                ((n.iridescenceMap.value = l.iridescenceMap),
                u(l.iridescenceMap, n.iridescenceMapTransform)),
              l.iridescenceThicknessMap) &&
              ((n.iridescenceThicknessMap.value = l.iridescenceThicknessMap),
              u(l.iridescenceThicknessMap, n.iridescenceThicknessMapTransform)),
            0 < l.transmission &&
              ((n.transmission.value = l.transmission),
              (n.transmissionSamplerMap.value = o.texture),
              n.transmissionSamplerSize.value.set(o.width, o.height),
              l.transmissionMap &&
                ((n.transmissionMap.value = l.transmissionMap),
                u(l.transmissionMap, n.transmissionMapTransform)),
              (n.thickness.value = l.thickness),
              l.thicknessMap &&
                ((n.thicknessMap.value = l.thicknessMap),
                u(l.thicknessMap, n.thicknessMapTransform)),
              (n.attenuationDistance.value = l.attenuationDistance),
              n.attenuationColor.value.copy(l.attenuationColor)),
            0 < l.anisotropy &&
              (n.anisotropyVector.value.set(
                l.anisotropy * Math.cos(l.anisotropyRotation),
                l.anisotropy * Math.sin(l.anisotropyRotation)
              ),
              l.anisotropyMap) &&
              ((n.anisotropyMap.value = l.anisotropyMap),
              u(l.anisotropyMap, n.anisotropyMapTransform)),
            (n.specularIntensity.value = l.specularIntensity),
            n.specularColor.value.copy(l.specularColor),
            l.specularColorMap &&
              ((n.specularColorMap.value = l.specularColorMap),
              u(l.specularColorMap, n.specularColorMapTransform)),
            l.specularIntensityMap) &&
            ((n.specularIntensityMap.value = l.specularIntensityMap),
            u(l.specularIntensityMap, n.specularIntensityMapTransform)))
        : t.isMeshMatcapMaterial
        ? (p(e, t), (o = e), (l = t).matcap && (o.matcap.value = l.matcap))
        : t.isMeshDepthMaterial
        ? p(e, t)
        : t.isMeshDistanceMaterial
        ? (p(e, t),
          (n = e),
          (s = t),
          (s = d.get(s).light),
          n.referencePosition.value.setFromMatrixPosition(s.matrixWorld),
          (n.nearDistance.value = s.shadow.camera.near),
          (n.farDistance.value = s.shadow.camera.far))
        : t.isMeshNormalMaterial
        ? p(e, t)
        : t.isLineBasicMaterial
        ? ((n = t),
          (s = e).diffuse.value.copy(n.color),
          (s.opacity.value = n.opacity),
          n.map && ((s.map.value = n.map), u(n.map, s.mapTransform)),
          t.isLineDashedMaterial &&
            ((n = t),
            ((a = e).dashSize.value = n.dashSize),
            (a.totalSize.value = n.dashSize + n.gapSize),
            (a.scale.value = n.scale)))
        : t.isPointsMaterial
        ? ((a = t),
          (n = i),
          (i = r),
          (r = e).diffuse.value.copy(a.color),
          (r.opacity.value = a.opacity),
          (r.size.value = a.size * n),
          (r.scale.value = 0.5 * i),
          a.map && ((r.map.value = a.map), u(a.map, r.uvTransform)),
          a.alphaMap &&
            ((r.alphaMap.value = a.alphaMap),
            u(a.alphaMap, r.alphaMapTransform)),
          0 < a.alphaTest && (r.alphaTest.value = a.alphaTest))
        : t.isSpriteMaterial
        ? ((n = t),
          (i = e).diffuse.value.copy(n.color),
          (i.opacity.value = n.opacity),
          (i.rotation.value = n.rotation),
          n.map && ((i.map.value = n.map), u(n.map, i.mapTransform)),
          n.alphaMap &&
            ((i.alphaMap.value = n.alphaMap),
            u(n.alphaMap, i.alphaMapTransform)),
          0 < n.alphaTest && (i.alphaTest.value = n.alphaTest))
        : t.isShadowMaterial
        ? (e.color.value.copy(t.color), (e.opacity.value = t.opacity))
        : t.isShaderMaterial && (t.uniformsNeedUpdate = !1);
    },
  };
}
function WebGLUniformsGroups(y, S, e, M) {
  let T = {},
    E = {},
    b = [],
    R = y.getParameter(y.MAX_UNIFORM_BUFFER_BINDINGS);
  function A(e) {
    var t = { boundary: 0, storage: 0 };
    return (
      "number" == typeof e || "boolean" == typeof e
        ? ((t.boundary = 4), (t.storage = 4))
        : e.isVector2
        ? ((t.boundary = 8), (t.storage = 8))
        : e.isVector3 || e.isColor
        ? ((t.boundary = 16), (t.storage = 12))
        : e.isVector4
        ? ((t.boundary = 16), (t.storage = 16))
        : e.isMatrix3
        ? ((t.boundary = 48), (t.storage = 48))
        : e.isMatrix4
        ? ((t.boundary = 64), (t.storage = 64))
        : e.isTexture
        ? console.warn(
            "THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."
          )
        : console.warn(
            "THREE.WebGLRenderer: Unsupported uniform value type.",
            e
          ),
      t
    );
  }
  function w(e) {
    var e = e.target,
      t =
        (e.removeEventListener("dispose", w), b.indexOf(e.__bindingPointIndex));
    b.splice(t, 1), y.deleteBuffer(T[e.id]), delete T[e.id], delete E[e.id];
  }
  return {
    bind: function (e, t) {
      (t = t.program), M.uniformBlockBinding(e, t);
    },
    update: function (e, t) {
      var i;
      if (void 0 === (i = T[e.id])) {
        {
          var n = e;
          let i = n.uniforms,
            r = 0;
          for (let e = 0, t = i.length; e < t; e++) {
            var a = Array.isArray(i[e]) ? i[e] : [i[e]];
            for (let e = 0, t = a.length; e < t; e++) {
              var s = a[e],
                o = Array.isArray(s.value) ? s.value : [s.value];
              for (let e = 0, t = o.length; e < t; e++) {
                var l = A(o[e]),
                  h = r % 16;
                0 != h && 16 - h < l.boundary && (r += 16 - h),
                  (s.__data = new Float32Array(
                    l.storage / Float32Array.BYTES_PER_ELEMENT
                  )),
                  (s.__offset = r),
                  (r += l.storage);
              }
            }
          }
          var c = r % 16;
          0 < c && (r += 16 - c), (n.__size = r), (n.__cache = {});
        }
        (c = e),
          (n = (() => {
            for (let e = 0; e < R; e++)
              if (-1 === b.indexOf(e)) return b.push(e), e;
            return (
              console.error(
                "THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."
              ),
              0
            );
          })()),
          (c.__bindingPointIndex = n),
          (d = y.createBuffer()),
          (r = c.__size),
          (c = c.usage),
          y.bindBuffer(y.UNIFORM_BUFFER, d),
          y.bufferData(y.UNIFORM_BUFFER, r, c),
          y.bindBuffer(y.UNIFORM_BUFFER, null),
          y.bindBufferBase(y.UNIFORM_BUFFER, n, d),
          (i = d),
          (T[e.id] = i),
          e.addEventListener("dispose", w);
      }
      var r = t.program,
        c = (M.updateUBOMapping(e, r), S.render.frame);
      if (E[e.id] !== c) {
        var n = e,
          d = T[n.id],
          u = n.uniforms,
          p = n.__cache;
        y.bindBuffer(y.UNIFORM_BUFFER, d);
        for (let i = 0, e = u.length; i < e; i++) {
          var m = Array.isArray(u[i]) ? u[i] : [u[i]];
          for (let e = 0, t = m.length; e < t; e++) {
            var f = m[e];
            if (
              !0 ===
              ((e, t, i, r) => {
                if (((e = e.value), void 0 === r[(t = t + "_" + i)]))
                  return (
                    (r[t] =
                      "number" == typeof e || "boolean" == typeof e
                        ? e
                        : e.clone()),
                    !0
                  );
                if (
                  ((i = r[t]), "number" == typeof e || "boolean" == typeof e)
                ) {
                  if (i !== e) return (r[t] = e), !0;
                } else if (!1 === i.equals(e)) return i.copy(e), !0;
                return !1;
              })(f, i, e, p)
            ) {
              var g = f.__offset,
                _ = Array.isArray(f.value) ? f.value : [f.value];
              let t = 0;
              for (let e = 0; e < _.length; e++) {
                var v = _[e],
                  x = A(v);
                "number" == typeof v || "boolean" == typeof v
                  ? ((f.__data[0] = v),
                    y.bufferSubData(y.UNIFORM_BUFFER, g + t, f.__data))
                  : v.isMatrix3
                  ? ((f.__data[0] = v.elements[0]),
                    (f.__data[1] = v.elements[1]),
                    (f.__data[2] = v.elements[2]),
                    (f.__data[3] = 0),
                    (f.__data[4] = v.elements[3]),
                    (f.__data[5] = v.elements[4]),
                    (f.__data[6] = v.elements[5]),
                    (f.__data[7] = 0),
                    (f.__data[8] = v.elements[6]),
                    (f.__data[9] = v.elements[7]),
                    (f.__data[10] = v.elements[8]),
                    (f.__data[11] = 0))
                  : (v.toArray(f.__data, t),
                    (t += x.storage / Float32Array.BYTES_PER_ELEMENT));
              }
              y.bufferSubData(y.UNIFORM_BUFFER, g, f.__data);
            }
          }
        }
        y.bindBuffer(y.UNIFORM_BUFFER, null), (E[e.id] = c);
      }
    },
    dispose: function () {
      for (var e in T) y.deleteBuffer(T[e]);
      (b = []), (T = {}), (E = {});
    },
  };
}
class WebGLRenderer {
  constructor(e = {}) {
    let {
      canvas: r = createCanvasElement(),
      context: i = null,
      depth: s = !0,
      stencil: T = !1,
      alpha: o = !1,
      antialias: E = !1,
      premultipliedAlpha: b = !0,
      preserveDrawingBuffer: R = !1,
      powerPreference: A = "default",
      failIfMajorPerformanceCaveat: X = !1,
    } = e;
    this.isWebGLRenderer = !0;
    let $;
    if (null !== i) {
      if (
        "undefined" != typeof WebGLRenderingContext &&
        i instanceof WebGLRenderingContext
      )
        throw new Error(
          "THREE.WebGLRenderer: WebGL 1 is not supported since r163."
        );
      $ = i.getContextAttributes().alpha;
    } else $ = o;
    let l = new Uint32Array(4),
      h = new Int32Array(4),
      c = null,
      w = null,
      d = [],
      u = [],
      L =
        ((this.domElement = r),
        (this.debug = { checkShaderErrors: !0, onShaderError: null }),
        (this.autoClear = !0),
        (this.autoClearColor = !0),
        (this.autoClearDepth = !0),
        (this.autoClearStencil = !0),
        (this.sortObjects = !0),
        (this.clippingPlanes = []),
        (this.localClippingEnabled = !1),
        (this._outputColorSpace = SRGBColorSpace),
        (this._useLegacyLights = !1),
        (this.toneMapping = NoToneMapping),
        (this.toneMappingExposure = 1),
        this),
      q = !1,
      j = 0,
      Y = 0,
      C = null,
      P = -1,
      I = null,
      p = new Vector4(),
      K = new Vector4(),
      Z = null,
      J = new Color(0),
      Q = 0,
      n = r.width,
      D = r.height,
      N = 1,
      ee = null,
      te = null,
      m = new Vector4(0, 0, n, D),
      ie = new Vector4(0, 0, n, D),
      re = !1,
      ne = new Frustum(),
      U = !1,
      ae = !1,
      se = new Matrix4(),
      O = new Vector3(),
      oe = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0,
      };
    function le() {
      return null === C ? N : 1;
    }
    let B = i;
    function he(e, t) {
      return r.getContext(e, t);
    }
    try {
      var ce = {
        alpha: !0,
        depth: s,
        stencil: T,
        antialias: E,
        premultipliedAlpha: b,
        preserveDrawingBuffer: R,
        powerPreference: A,
        failIfMajorPerformanceCaveat: X,
      };
      if (
        ("setAttribute" in r &&
          r.setAttribute("data-engine", "three.js r" + REVISION),
        r.addEventListener("webglcontextlost", Se, !1),
        r.addEventListener("webglcontextrestored", Me, !1),
        r.addEventListener("webglcontextcreationerror", Te, !1),
        null === B)
      )
        if (null === (B = he("webgl2", ce)))
          throw he("webgl2")
            ? new Error(
                "Error creating WebGL context with your selected attributes."
              )
            : new Error("Error creating WebGL context.");
    } catch (e) {
      throw (console.error("THREE.WebGLRenderer: " + e.message), e);
    }
    let f,
      F,
      G,
      a,
      V,
      z,
      k,
      H,
      de,
      ue,
      g,
      _,
      pe,
      me,
      fe,
      W,
      v,
      x,
      ge,
      _e,
      ve,
      y,
      S,
      xe;
    function ye() {
      (f = new WebGLExtensions(B)).init(),
        (y = new WebGLUtils(B, f)),
        (F = new WebGLCapabilities(B, f, e, y)),
        (G = new WebGLState(B)),
        (a = new WebGLInfo(B)),
        (V = new WebGLProperties()),
        (z = new WebGLTextures(B, f, G, V, F, y, a)),
        (k = new WebGLCubeMaps(L)),
        (H = new WebGLCubeUVMaps(L)),
        (de = new WebGLAttributes(B)),
        (S = new WebGLBindingStates(B, de)),
        (ue = new WebGLGeometries(B, de, a, S)),
        (g = new WebGLObjects(B, ue, de, a)),
        (ge = new WebGLMorphtargets(B, F, z)),
        (W = new WebGLClipping(V)),
        (_ = new WebGLPrograms(L, k, H, f, F, S, W)),
        (pe = new WebGLMaterials(L, V)),
        (me = new WebGLRenderLists()),
        (fe = new WebGLRenderStates(f)),
        (x = new WebGLBackground(L, k, H, G, g, $, b)),
        (v = new WebGLShadowMap(L, g, F)),
        (xe = new WebGLUniformsGroups(B, a, F, G)),
        (_e = new WebGLBufferRenderer(B, f, a)),
        (ve = new WebGLIndexedBufferRenderer(B, f, a)),
        (a.programs = _.programs),
        (L.capabilities = F),
        (L.extensions = f),
        (L.properties = V),
        (L.renderLists = me),
        (L.shadowMap = v),
        (L.state = G),
        (L.info = a);
    }
    ye();
    let M = new WebXRManager(L, B);
    function Se(e) {
      e.preventDefault(),
        console.log("THREE.WebGLRenderer: Context Lost."),
        (q = !0);
    }
    function Me() {
      console.log("THREE.WebGLRenderer: Context Restored."), (q = !1);
      var e = a.autoReset,
        t = v.enabled,
        i = v.autoUpdate,
        r = v.needsUpdate,
        n = v.type;
      ye(),
        (a.autoReset = e),
        (v.enabled = t),
        (v.autoUpdate = i),
        (v.needsUpdate = r),
        (v.type = n);
    }
    function Te(e) {
      console.error(
        "THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",
        e.statusMessage
      );
    }
    function Ee(e) {
      var e = e.target,
        t = (e.removeEventListener("dispose", Ee), (e = e)),
        i = V.get(t).programs;
      void 0 !== i &&
        (i.forEach(function (e) {
          _.releaseProgram(e);
        }),
        t.isShaderMaterial) &&
        _.releaseShaderCache(t),
        V.remove(e);
    }
    function be(e, t, i) {
      !0 === e.transparent && e.side === DoubleSide && !1 === e.forceSinglePass
        ? ((e.side = BackSide),
          (e.needsUpdate = !0),
          De(e, t, i),
          (e.side = FrontSide),
          (e.needsUpdate = !0),
          De(e, t, i),
          (e.side = DoubleSide))
        : De(e, t, i);
    }
    (this.xr = M),
      (this.getContext = function () {
        return B;
      }),
      (this.getContextAttributes = function () {
        return B.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        var e = f.get("WEBGL_lose_context");
        e && e.loseContext();
      }),
      (this.forceContextRestore = function () {
        var e = f.get("WEBGL_lose_context");
        e && e.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return N;
      }),
      (this.setPixelRatio = function (e) {
        void 0 !== e && ((N = e), this.setSize(n, D, !1));
      }),
      (this.getSize = function (e) {
        return e.set(n, D);
      }),
      (this.setSize = function (e, t, i = !0) {
        M.isPresenting
          ? console.warn(
              "THREE.WebGLRenderer: Can't change size while VR device is presenting."
            )
          : ((n = e),
            (D = t),
            (r.width = Math.floor(e * N)),
            (r.height = Math.floor(t * N)),
            !0 === i &&
              ((r.style.width = e + "px"), (r.style.height = t + "px")),
            this.setViewport(0, 0, e, t));
      }),
      (this.getDrawingBufferSize = function (e) {
        return e.set(n * N, D * N).floor();
      }),
      (this.setDrawingBufferSize = function (e, t, i) {
        (n = e),
          (D = t),
          (N = i),
          (r.width = Math.floor(e * i)),
          (r.height = Math.floor(t * i)),
          this.setViewport(0, 0, e, t);
      }),
      (this.getCurrentViewport = function (e) {
        return e.copy(p);
      }),
      (this.getViewport = function (e) {
        return e.copy(m);
      }),
      (this.setViewport = function (e, t, i, r) {
        e.isVector4 ? m.set(e.x, e.y, e.z, e.w) : m.set(e, t, i, r),
          G.viewport(p.copy(m).multiplyScalar(N).round());
      }),
      (this.getScissor = function (e) {
        return e.copy(ie);
      }),
      (this.setScissor = function (e, t, i, r) {
        e.isVector4 ? ie.set(e.x, e.y, e.z, e.w) : ie.set(e, t, i, r),
          G.scissor(K.copy(ie).multiplyScalar(N).round());
      }),
      (this.getScissorTest = function () {
        return re;
      }),
      (this.setScissorTest = function (e) {
        G.setScissorTest((re = e));
      }),
      (this.setOpaqueSort = function (e) {
        ee = e;
      }),
      (this.setTransparentSort = function (e) {
        te = e;
      }),
      (this.getClearColor = function (e) {
        return e.copy(x.getClearColor());
      }),
      (this.setClearColor = function () {
        x.setClearColor.apply(x, arguments);
      }),
      (this.getClearAlpha = function () {
        return x.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        x.setClearAlpha.apply(x, arguments);
      }),
      (this.clear = function (t = !0, e = !0, i = !0) {
        let r = 0;
        if (t) {
          let e = !1;
          var n, a, s, o;
          null !== C &&
            ((t = C.texture.format),
            (e =
              t === RGBAIntegerFormat ||
              t === RGIntegerFormat ||
              t === RedIntegerFormat)),
            e
              ? ((t =
                  (t = C.texture.type) === UnsignedByteType ||
                  t === UnsignedIntType ||
                  t === UnsignedShortType ||
                  t === UnsignedInt248Type ||
                  t === UnsignedShort4444Type ||
                  t === UnsignedShort5551Type),
                (o = x.getClearColor()),
                (n = x.getClearAlpha()),
                (a = o.r),
                (s = o.g),
                (o = o.b),
                t
                  ? ((l[0] = a),
                    (l[1] = s),
                    (l[2] = o),
                    (l[3] = n),
                    B.clearBufferuiv(B.COLOR, 0, l))
                  : ((h[0] = a),
                    (h[1] = s),
                    (h[2] = o),
                    (h[3] = n),
                    B.clearBufferiv(B.COLOR, 0, h)))
              : (r |= B.COLOR_BUFFER_BIT);
        }
        e && (r |= B.DEPTH_BUFFER_BIT),
          i &&
            ((r |= B.STENCIL_BUFFER_BIT),
            this.state.buffers.stencil.setMask(4294967295)),
          B.clear(r);
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        r.removeEventListener("webglcontextlost", Se, !1),
          r.removeEventListener("webglcontextrestored", Me, !1),
          r.removeEventListener("webglcontextcreationerror", Te, !1),
          me.dispose(),
          fe.dispose(),
          V.dispose(),
          k.dispose(),
          H.dispose(),
          g.dispose(),
          S.dispose(),
          xe.dispose(),
          _.dispose(),
          M.dispose(),
          M.removeEventListener("sessionstart", Ae),
          M.removeEventListener("sessionend", we),
          t.stop();
      }),
      (this.renderBufferDirect = function (e, i, r, n, a, s) {
        null === i && (i = oe);
        var o = a.isMesh && a.matrixWorld.determinant() < 0,
          e = ((e, t, i, r, n) => {
            !0 !== t.isScene && (t = oe), z.resetTextureUnits();
            let a = t.fog,
              s = r.isMeshStandardMaterial ? t.environment : null,
              o =
                null === C
                  ? L.outputColorSpace
                  : !0 === C.isXRRenderTarget
                  ? C.texture.colorSpace
                  : LinearSRGBColorSpace,
              l = (r.isMeshStandardMaterial ? H : k).get(r.envMap || s),
              h =
                !0 === r.vertexColors &&
                !!i.attributes.color &&
                4 === i.attributes.color.itemSize,
              c = !!i.attributes.tangent && (!!r.normalMap || 0 < r.anisotropy),
              d = !!i.morphAttributes.position,
              u = !!i.morphAttributes.normal,
              p = !!i.morphAttributes.color,
              m = NoToneMapping;
            !r.toneMapped ||
              (null !== C && !0 !== C.isXRRenderTarget) ||
              (m = L.toneMapping);
            var f,
              g =
                void 0 !==
                (g =
                  i.morphAttributes.position ||
                  i.morphAttributes.normal ||
                  i.morphAttributes.color)
                  ? g.length
                  : 0,
              _ = V.get(r),
              v = w.state.lights;
            !0 !== U ||
              (!0 !== ae && e === I) ||
              ((f = e === I && r.id === P), W.setState(r, e, f));
            let x = !1,
              y =
                (r.version === _.__version
                  ? ((_.needsLights &&
                      _.lightsStateVersion !== v.state.version) ||
                      _.outputColorSpace !== o ||
                      (n.isBatchedMesh && !1 === _.batching) ||
                      (!n.isBatchedMesh && !0 === _.batching) ||
                      (n.isInstancedMesh && !1 === _.instancing) ||
                      (!n.isInstancedMesh && !0 === _.instancing) ||
                      (n.isSkinnedMesh && !1 === _.skinning) ||
                      (!n.isSkinnedMesh && !0 === _.skinning) ||
                      (n.isInstancedMesh &&
                        !0 === _.instancingColor &&
                        null === n.instanceColor) ||
                      (n.isInstancedMesh &&
                        !1 === _.instancingColor &&
                        null !== n.instanceColor) ||
                      (n.isInstancedMesh &&
                        !0 === _.instancingMorph &&
                        null === n.morphTexture) ||
                      (n.isInstancedMesh &&
                        !1 === _.instancingMorph &&
                        null !== n.morphTexture) ||
                      _.envMap !== l ||
                      (!0 === r.fog && _.fog !== a) ||
                      (void 0 !== _.numClippingPlanes &&
                        (_.numClippingPlanes !== W.numPlanes ||
                          _.numIntersection !== W.numIntersection)) ||
                      _.vertexAlphas !== h ||
                      _.vertexTangents !== c ||
                      _.morphTargets !== d ||
                      _.morphNormals !== u ||
                      _.morphColors !== p ||
                      _.toneMapping !== m ||
                      _.morphTargetsCount !== g) &&
                    (x = !0)
                  : ((x = !0), (_.__version = r.version)),
                _.currentProgram),
              S = (!0 === x && (y = De(r, t, n)), !1),
              M = !1,
              T = !1,
              E = y.getUniforms(),
              b = _.uniforms;
            G.useProgram(y.program) && ((S = !0), (M = !0), (T = !0)),
              r.id !== P && ((P = r.id), (M = !0)),
              (!S && I === e) ||
                (E.setValue(B, "projectionMatrix", e.projectionMatrix),
                E.setValue(B, "viewMatrix", e.matrixWorldInverse),
                void 0 !== (f = E.map.cameraPosition) &&
                  f.setValue(B, O.setFromMatrixPosition(e.matrixWorld)),
                F.logarithmicDepthBuffer &&
                  E.setValue(
                    B,
                    "logDepthBufFC",
                    2 / (Math.log(e.far + 1) / Math.LN2)
                  ),
                (r.isMeshPhongMaterial ||
                  r.isMeshToonMaterial ||
                  r.isMeshLambertMaterial ||
                  r.isMeshBasicMaterial ||
                  r.isMeshStandardMaterial ||
                  r.isShaderMaterial) &&
                  E.setValue(
                    B,
                    "isOrthographic",
                    !0 === e.isOrthographicCamera
                  ),
                I === e) ||
                ((I = e), (M = !0), (T = !0)),
              n.isSkinnedMesh &&
                (E.setOptional(B, n, "bindMatrix"),
                E.setOptional(B, n, "bindMatrixInverse"),
                (v = n.skeleton)) &&
                (null === v.boneTexture && v.computeBoneTexture(),
                E.setValue(B, "boneTexture", v.boneTexture, z)),
              n.isBatchedMesh &&
                (E.setOptional(B, n, "batchingTexture"),
                E.setValue(B, "batchingTexture", n._matricesTexture, z)),
              (void 0 === (g = i.morphAttributes).position &&
                void 0 === g.normal &&
                void 0 === g.color) ||
                ge.update(n, i, y),
              (!M && _.receiveShadow === n.receiveShadow) ||
                ((_.receiveShadow = n.receiveShadow),
                E.setValue(B, "receiveShadow", n.receiveShadow)),
              r.isMeshGouraudMaterial &&
                null !== r.envMap &&
                ((b.envMap.value = l),
                (b.flipEnvMap.value =
                  l.isCubeTexture && !1 === l.isRenderTargetTexture ? -1 : 1)),
              r.isMeshStandardMaterial &&
                null === r.envMap &&
                null !== t.environment &&
                (b.envMapIntensity.value = t.environmentIntensity),
              M &&
                (E.setValue(B, "toneMappingExposure", L.toneMappingExposure),
                _.needsLights &&
                  ((v = b),
                  (g = T),
                  (v.ambientLightColor.needsUpdate = g),
                  (v.lightProbe.needsUpdate = g),
                  (v.directionalLights.needsUpdate = g),
                  (v.directionalLightShadows.needsUpdate = g),
                  (v.pointLights.needsUpdate = g),
                  (v.pointLightShadows.needsUpdate = g),
                  (v.spotLights.needsUpdate = g),
                  (v.spotLightShadows.needsUpdate = g),
                  (v.rectAreaLights.needsUpdate = g),
                  (v.hemisphereLights.needsUpdate = g)),
                a && !0 === r.fog && pe.refreshFogUniforms(b, a),
                pe.refreshMaterialUniforms(
                  b,
                  r,
                  N,
                  D,
                  w.state.transmissionRenderTarget[e.id]
                ),
                WebGLUniforms.upload(B, Ne(_), b, z));
            if (
              (r.isShaderMaterial &&
                !0 === r.uniformsNeedUpdate &&
                (WebGLUniforms.upload(B, Ne(_), b, z),
                (r.uniformsNeedUpdate = !1)),
              r.isSpriteMaterial && E.setValue(B, "center", n.center),
              E.setValue(B, "modelViewMatrix", n.modelViewMatrix),
              E.setValue(B, "normalMatrix", n.normalMatrix),
              E.setValue(B, "modelMatrix", n.matrixWorld),
              r.isShaderMaterial || r.isRawShaderMaterial)
            ) {
              var R = r.uniformsGroups;
              for (let e = 0, t = R.length; e < t; e++) {
                var A = R[e];
                xe.update(A, y), xe.bind(A, y);
              }
            }
            return y;
          })(e, i, r, n, a);
        G.setMaterial(n, o);
        let l = r.index,
          t = 1;
        if (!0 === n.wireframe) {
          if (void 0 === (l = ue.getWireframeAttribute(r))) return;
          t = 2;
        }
        (i = r.drawRange), (o = r.attributes.position);
        let h = i.start * t,
          c = (i.start + i.count) * t;
        null !== s &&
          ((h = Math.max(h, s.start * t)),
          (c = Math.min(c, (s.start + s.count) * t))),
          null !== l
            ? ((h = Math.max(h, 0)), (c = Math.min(c, l.count)))
            : null != o && ((h = Math.max(h, 0)), (c = Math.min(c, o.count)));
        i = c - h;
        if (!(i < 0 || i == 1 / 0)) {
          S.setup(a, n, e, r, l);
          let t = _e;
          if ((null !== l && ((s = de.get(l)), (t = ve).setIndex(s)), a.isMesh))
            !0 === n.wireframe
              ? (G.setLineWidth(n.wireframeLinewidth * le()),
                t.setMode(B.LINES))
              : t.setMode(B.TRIANGLES);
          else if (a.isLine) {
            let e = n.linewidth;
            void 0 === e && (e = 1),
              G.setLineWidth(e * le()),
              a.isLineSegments
                ? t.setMode(B.LINES)
                : a.isLineLoop
                ? t.setMode(B.LINE_LOOP)
                : t.setMode(B.LINE_STRIP);
          } else
            a.isPoints
              ? t.setMode(B.POINTS)
              : a.isSprite && t.setMode(B.TRIANGLES);
          a.isBatchedMesh
            ? null !== a._multiDrawInstances
              ? t.renderMultiDrawInstances(
                  a._multiDrawStarts,
                  a._multiDrawCounts,
                  a._multiDrawCount,
                  a._multiDrawInstances
                )
              : t.renderMultiDraw(
                  a._multiDrawStarts,
                  a._multiDrawCounts,
                  a._multiDrawCount
                )
            : a.isInstancedMesh
            ? t.renderInstances(h, i, a.count)
            : r.isInstancedBufferGeometry
            ? ((o =
                void 0 !== r._maxInstanceCount ? r._maxInstanceCount : 1 / 0),
              (e = Math.min(r.instanceCount, o)),
              t.renderInstances(h, i, e))
            : t.render(h, i);
        }
      }),
      (this.compile = function (e, t, n = null) {
        null === n && (n = e),
          (w = fe.get(n)).init(t),
          u.push(w),
          n.traverseVisible(function (e) {
            e.isLight &&
              e.layers.test(t.layers) &&
              (w.pushLight(e), e.castShadow) &&
              w.pushShadow(e);
          }),
          e !== n &&
            e.traverseVisible(function (e) {
              e.isLight &&
                e.layers.test(t.layers) &&
                (w.pushLight(e), e.castShadow) &&
                w.pushShadow(e);
            }),
          w.setupLights(L._useLegacyLights);
        let a = new Set();
        return (
          e.traverse(function (t) {
            var i = t.material;
            if (i)
              if (Array.isArray(i))
                for (let e = 0; e < i.length; e++) {
                  var r = i[e];
                  be(r, n, t), a.add(r);
                }
              else be(i, n, t), a.add(i);
          }),
          u.pop(),
          (w = null),
          a
        );
      }),
      (this.compileAsync = function (i, e, t = null) {
        let r = this.compile(i, e, t);
        return new Promise((e) => {
          function t() {
            r.forEach(function (e) {
              V.get(e).currentProgram.isReady() && r.delete(e);
            }),
              0 === r.size ? e(i) : setTimeout(t, 10);
          }
          null !== f.get("KHR_parallel_shader_compile")
            ? t()
            : setTimeout(t, 10);
        });
      });
    let Re = null;
    function Ae() {
      t.stop();
    }
    function we() {
      t.start();
    }
    let t = new WebGLAnimation();
    function Le(e, t, i, r) {
      var n = e.opaque,
        a = e.transmissive,
        e = e.transparent;
      w.setupLightsView(i),
        !0 === U && W.setGlobalState(L.clippingPlanes, i),
        r && G.viewport(p.copy(r)),
        0 < n.length && Pe(n, t, i),
        0 < a.length && Pe(a, t, i),
        0 < e.length && Pe(e, t, i),
        G.buffers.depth.setTest(!0),
        G.buffers.depth.setMask(!0),
        G.buffers.color.setMask(!0),
        G.setPolygonOffset(!1);
    }
    function Ce(e, r, n, a) {
      var t = !0 === n.isScene ? n.overrideMaterial : null;
      if (null === t) {
        void 0 === w.state.transmissionRenderTarget[a.id] &&
          (w.state.transmissionRenderTarget[a.id] = new WebGLRenderTarget(
            1,
            1,
            {
              generateMipmaps: !0,
              type:
                f.has("EXT_color_buffer_half_float") ||
                f.has("EXT_color_buffer_float")
                  ? HalfFloatType
                  : UnsignedByteType,
              minFilter: LinearMipmapLinearFilter,
              samples: 4,
              stencilBuffer: T,
              resolveDepthBuffer: !1,
              resolveStencilBuffer: !1,
            }
          ));
        var t = w.state.transmissionRenderTarget[a.id],
          i = a.viewport || p,
          i = (t.setSize(i.z, i.w), L.getRenderTarget()),
          s =
            (L.setRenderTarget(t),
            L.getClearColor(J),
            (Q = L.getClearAlpha()) < 1 && L.setClearColor(16777215, 0.5),
            L.clear(),
            L.toneMapping),
          o = ((L.toneMapping = NoToneMapping), a.viewport);
        if (
          (void 0 !== a.viewport && (a.viewport = void 0),
          w.setupLightsView(a),
          !0 === U && W.setGlobalState(L.clippingPlanes, a),
          Pe(e, n, a),
          z.updateMultisampleRenderTarget(t),
          z.updateRenderTargetMipmap(t),
          !1 === f.has("WEBGL_multisampled_render_to_texture"))
        ) {
          let i = !1;
          for (let e = 0, t = r.length; e < t; e++) {
            var l,
              h = r[e],
              c = h.object,
              d = h.geometry,
              u = h.material,
              h = h.group;
            u.side === DoubleSide &&
              c.layers.test(a.layers) &&
              ((l = u.side),
              (u.side = BackSide),
              (u.needsUpdate = !0),
              Ie(c, n, a, d, u, h),
              (u.side = l),
              (u.needsUpdate = !0),
              (i = !0));
          }
          !0 === i &&
            (z.updateMultisampleRenderTarget(t), z.updateRenderTargetMipmap(t));
        }
        L.setRenderTarget(i),
          L.setClearColor(J, Q),
          void 0 !== o && (a.viewport = o),
          (L.toneMapping = s);
      }
    }
    function Pe(i, r, n) {
      var a = !0 === r.isScene ? r.overrideMaterial : null;
      for (let e = 0, t = i.length; e < t; e++) {
        var s = i[e],
          o = s.object,
          l = s.geometry,
          h = null === a ? s.material : a,
          s = s.group;
        o.layers.test(n.layers) && Ie(o, r, n, l, h, s);
      }
    }
    function Ie(e, t, i, r, n, a) {
      e.onBeforeRender(L, t, i, r, n, a),
        e.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, e.matrixWorld),
        e.normalMatrix.getNormalMatrix(e.modelViewMatrix),
        n.onBeforeRender(L, t, i, r, e, a),
        !0 === n.transparent &&
        n.side === DoubleSide &&
        !1 === n.forceSinglePass
          ? ((n.side = BackSide),
            (n.needsUpdate = !0),
            L.renderBufferDirect(i, t, r, n, e, a),
            (n.side = FrontSide),
            (n.needsUpdate = !0),
            L.renderBufferDirect(i, t, r, n, e, a),
            (n.side = DoubleSide))
          : L.renderBufferDirect(i, t, r, n, e, a),
        e.onAfterRender(L, t, i, r, n, a);
    }
    function De(e, t, i) {
      !0 !== t.isScene && (t = oe);
      var r = V.get(e),
        n = w.state.lights,
        a = w.state.shadowsArray,
        s = n.state.version,
        a = _.getParameters(e, n.state, a, t, i),
        o = _.getProgramCacheKey(a);
      let l = r.programs,
        h =
          ((r.environment = e.isMeshStandardMaterial ? t.environment : null),
          (r.fog = t.fog),
          (r.envMap = (e.isMeshStandardMaterial ? H : k).get(
            e.envMap || r.environment
          )),
          (r.envMapRotation =
            null !== r.environment && null === e.envMap
              ? t.environmentRotation
              : e.envMapRotation),
          void 0 === l &&
            (e.addEventListener("dispose", Ee),
            (l = new Map()),
            (r.programs = l)),
          l.get(o));
      if (void 0 !== h) {
        if (r.currentProgram === h && r.lightsStateVersion === s)
          return Ue(e, a), h;
      } else
        (a.uniforms = _.getUniforms(e)),
          e.onBuild(i, a, L),
          e.onBeforeCompile(a, L),
          (h = _.acquireProgram(a, o)),
          l.set(o, h),
          (r.uniforms = a.uniforms);
      t = r.uniforms;
      return (
        ((e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping) ||
          (t.clippingPlanes = W.uniform),
        Ue(e, a),
        (r.needsLights =
          (i = e).isMeshLambertMaterial ||
          i.isMeshToonMaterial ||
          i.isMeshPhongMaterial ||
          i.isMeshStandardMaterial ||
          i.isShadowMaterial ||
          (i.isShaderMaterial && !0 === i.lights)),
        (r.lightsStateVersion = s),
        r.needsLights &&
          ((t.ambientLightColor.value = n.state.ambient),
          (t.lightProbe.value = n.state.probe),
          (t.directionalLights.value = n.state.directional),
          (t.directionalLightShadows.value = n.state.directionalShadow),
          (t.spotLights.value = n.state.spot),
          (t.spotLightShadows.value = n.state.spotShadow),
          (t.rectAreaLights.value = n.state.rectArea),
          (t.ltc_1.value = n.state.rectAreaLTC1),
          (t.ltc_2.value = n.state.rectAreaLTC2),
          (t.pointLights.value = n.state.point),
          (t.pointLightShadows.value = n.state.pointShadow),
          (t.hemisphereLights.value = n.state.hemi),
          (t.directionalShadowMap.value = n.state.directionalShadowMap),
          (t.directionalShadowMatrix.value = n.state.directionalShadowMatrix),
          (t.spotShadowMap.value = n.state.spotShadowMap),
          (t.spotLightMatrix.value = n.state.spotLightMatrix),
          (t.spotLightMap.value = n.state.spotLightMap),
          (t.pointShadowMap.value = n.state.pointShadowMap),
          (t.pointShadowMatrix.value = n.state.pointShadowMatrix)),
        (r.currentProgram = h),
        (r.uniformsList = null),
        h
      );
    }
    function Ne(e) {
      var t;
      return (
        null === e.uniformsList &&
          ((t = e.currentProgram.getUniforms()),
          (e.uniformsList = WebGLUniforms.seqWithValue(t.seq, e.uniforms))),
        e.uniformsList
      );
    }
    function Ue(e, t) {
      e = V.get(e);
      (e.outputColorSpace = t.outputColorSpace),
        (e.batching = t.batching),
        (e.instancing = t.instancing),
        (e.instancingColor = t.instancingColor),
        (e.instancingMorph = t.instancingMorph),
        (e.skinning = t.skinning),
        (e.morphTargets = t.morphTargets),
        (e.morphNormals = t.morphNormals),
        (e.morphColors = t.morphColors),
        (e.morphTargetsCount = t.morphTargetsCount),
        (e.numClippingPlanes = t.numClippingPlanes),
        (e.numIntersection = t.numClipIntersection),
        (e.vertexAlphas = t.vertexAlphas),
        (e.vertexTangents = t.vertexTangents),
        (e.toneMapping = t.toneMapping);
    }
    t.setAnimationLoop(function (e) {
      Re && Re(e);
    }),
      "undefined" != typeof self && t.setContext(self),
      (this.setAnimationLoop = function (e) {
        (Re = e), M.setAnimationLoop(e), null === e ? t.stop() : t.start();
      }),
      M.addEventListener("sessionstart", Ae),
      M.addEventListener("sessionend", we),
      (this.render = function (i, e) {
        if (void 0 !== e && !0 !== e.isCamera)
          console.error(
            "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."
          );
        else if (!0 !== q) {
          !0 === i.matrixWorldAutoUpdate && i.updateMatrixWorld(),
            null === e.parent &&
              !0 === e.matrixWorldAutoUpdate &&
              e.updateMatrixWorld(),
            !0 === M.enabled &&
              !0 === M.isPresenting &&
              (!0 === M.cameraAutoUpdate && M.updateCamera(e),
              (e = M.getCamera())),
            !0 === i.isScene && i.onBeforeRender(L, i, e, C),
            (w = fe.get(i, u.length)).init(e),
            u.push(w),
            se.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
            ne.setFromProjectionMatrix(se),
            (ae = this.localClippingEnabled),
            (U = W.init(this.clippingPlanes, ae)),
            (c = me.get(i, d.length)).init(),
            d.push(c),
            !(function i(s, r, o, l) {
              if (!1 === s.visible) return;
              let e = s.layers.test(r.layers);
              if (e)
                if (s.isGroup) o = s.renderOrder;
                else if (s.isLOD) !0 === s.autoUpdate && s.update(r);
                else if (s.isLight)
                  w.pushLight(s), s.castShadow && w.pushShadow(s);
                else if (s.isSprite) {
                  if (!s.frustumCulled || ne.intersectsSprite(s)) {
                    l &&
                      O.setFromMatrixPosition(s.matrixWorld).applyMatrix4(se);
                    let e = g.update(s),
                      t = s.material;
                    t.visible && c.push(s, e, t, o, O.z, null);
                  }
                } else if (
                  (s.isMesh || s.isLine || s.isPoints) &&
                  (!s.frustumCulled || ne.intersectsObject(s))
                ) {
                  let n = g.update(s),
                    a = s.material;
                  if (
                    (l &&
                      (void 0 !== s.boundingSphere
                        ? (null === s.boundingSphere &&
                            s.computeBoundingSphere(),
                          O.copy(s.boundingSphere.center))
                        : (null === n.boundingSphere &&
                            n.computeBoundingSphere(),
                          O.copy(n.boundingSphere.center)),
                      O.applyMatrix4(s.matrixWorld).applyMatrix4(se)),
                    Array.isArray(a))
                  ) {
                    let r = n.groups;
                    for (let i = 0, e = r.length; i < e; i++) {
                      let e = r[i],
                        t = a[e.materialIndex];
                      t && t.visible && c.push(s, n, t, o, O.z, e);
                    }
                  } else a.visible && c.push(s, n, a, o, O.z, null);
                }
              let n = s.children;
              for (let e = 0, t = n.length; e < t; e++) i(n[e], r, o, l);
            })(i, e, 0, L.sortObjects),
            c.finish(),
            !0 === L.sortObjects && c.sort(ee, te);
          var t =
              !1 === M.enabled ||
              !1 === M.isPresenting ||
              !1 === M.hasDepthSensing(),
            r =
              (t && x.addToRenderList(c, i),
              this.info.render.frame++,
              !0 === U && W.beginShadows(),
              w.state.shadowsArray),
            n =
              (v.render(r, i, e),
              !0 === U && W.endShadows(),
              !0 === this.info.autoReset && this.info.reset(),
              c.opaque),
            a = c.transmissive;
          if ((w.setupLights(L._useLegacyLights), e.isArrayCamera)) {
            var s = e.cameras;
            if (0 < a.length)
              for (let e = 0, t = s.length; e < t; e++) Ce(n, a, i, s[e]);
            t && x.render(i);
            for (let e = 0, t = s.length; e < t; e++) {
              var o = s[e];
              Le(c, i, o, o.viewport);
            }
          } else 0 < a.length && Ce(n, a, i, e), t && x.render(i), Le(c, i, e);
          null !== C &&
            (z.updateMultisampleRenderTarget(C), z.updateRenderTargetMipmap(C)),
            !0 === i.isScene && i.onAfterRender(L, i, e),
            S.resetDefaultState(),
            (P = -1),
            (I = null),
            u.pop(),
            0 < u.length
              ? ((w = u[u.length - 1]),
                !0 === U && W.setGlobalState(L.clippingPlanes, w.state.camera))
              : (w = null),
            d.pop(),
            (c = 0 < d.length ? d[d.length - 1] : null);
        }
      }),
      (this.getActiveCubeFace = function () {
        return j;
      }),
      (this.getActiveMipmapLevel = function () {
        return Y;
      }),
      (this.getRenderTarget = function () {
        return C;
      }),
      (this.setRenderTargetTextures = function (e, t, i) {
        (V.get(e.texture).__webglTexture = t),
          (V.get(e.depthTexture).__webglTexture = i);
        t = V.get(e);
        (t.__hasExternalTextures = !0),
          (t.__autoAllocateDepthBuffer = void 0 === i),
          t.__autoAllocateDepthBuffer ||
            (!0 === f.has("WEBGL_multisampled_render_to_texture") &&
              (console.warn(
                "THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"
              ),
              (t.__useRenderToTexture = !1)));
      }),
      (this.setRenderTargetFramebuffer = function (e, t) {
        e = V.get(e);
        (e.__webglFramebuffer = t), (e.__useDefaultFramebuffer = void 0 === t);
      }),
      (this.setRenderTarget = function (e, t = 0, i = 0) {
        (C = e), (j = t), (Y = i);
        let r = !0,
          n = null,
          a = !1,
          s = !1;
        Z = e
          ? (void 0 !== (o = V.get(e)).__useDefaultFramebuffer
              ? (G.bindFramebuffer(B.FRAMEBUFFER, null), (r = !1))
              : void 0 === o.__webglFramebuffer
              ? z.setupRenderTarget(e)
              : o.__hasExternalTextures &&
                z.rebindTextures(
                  e,
                  V.get(e.texture).__webglTexture,
                  V.get(e.depthTexture).__webglTexture
                ),
            ((o = e.texture).isData3DTexture ||
              o.isDataArrayTexture ||
              o.isCompressedArrayTexture) &&
              (s = !0),
            (o = V.get(e).__webglFramebuffer),
            e.isWebGLCubeRenderTarget
              ? ((n = Array.isArray(o[t]) ? o[t][i] : o[t]), (a = !0))
              : (n =
                  0 < e.samples && !1 === z.useMultisampledRTT(e)
                    ? V.get(e).__webglMultisampledFramebuffer
                    : Array.isArray(o)
                    ? o[i]
                    : o),
            p.copy(e.viewport),
            K.copy(e.scissor),
            e.scissorTest)
          : (p.copy(m).multiplyScalar(N).floor(),
            K.copy(ie).multiplyScalar(N).floor(),
            re);
        var o = G.bindFramebuffer(B.FRAMEBUFFER, n);
        o && r && G.drawBuffers(e, n),
          G.viewport(p),
          G.scissor(K),
          G.setScissorTest(Z),
          a
            ? ((o = V.get(e.texture)),
              B.framebufferTexture2D(
                B.FRAMEBUFFER,
                B.COLOR_ATTACHMENT0,
                B.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                o.__webglTexture,
                i
              ))
            : s &&
              ((o = V.get(e.texture)),
              (e = t || 0),
              B.framebufferTextureLayer(
                B.FRAMEBUFFER,
                B.COLOR_ATTACHMENT0,
                o.__webglTexture,
                i || 0,
                e
              )),
          (P = -1);
      }),
      (this.readRenderTargetPixels = function (t, i, r, n, a, s, o) {
        if (t && t.isWebGLRenderTarget) {
          let e = V.get(t).__webglFramebuffer;
          if ((e = t.isWebGLCubeRenderTarget && void 0 !== o ? e[o] : e)) {
            G.bindFramebuffer(B.FRAMEBUFFER, e);
            try {
              var l = t.texture,
                h = l.format,
                c = l.type;
              F.textureFormatReadable(h)
                ? F.textureTypeReadable(c)
                  ? 0 <= i &&
                    i <= t.width - n &&
                    0 <= r &&
                    r <= t.height - a &&
                    B.readPixels(i, r, n, a, y.convert(h), y.convert(c), s)
                  : console.error(
                      "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type."
                    )
                : console.error(
                    "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format."
                  );
            } finally {
              let e = null !== C ? V.get(C).__webglFramebuffer : null;
              G.bindFramebuffer(B.FRAMEBUFFER, e);
            }
          }
        } else
          console.error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget."
          );
      }),
      (this.copyFramebufferToTexture = function (e, t, i = 0) {
        var r = Math.pow(2, -i),
          n = Math.floor(t.image.width * r),
          r = Math.floor(t.image.height * r);
        z.setTexture2D(t, 0),
          B.copyTexSubImage2D(B.TEXTURE_2D, i, 0, 0, e.x, e.y, n, r),
          G.unbindTexture();
      }),
      (this.copyTextureToTexture = function (e, t, i, r = 0) {
        var n = t.image.width,
          a = t.image.height,
          s = y.convert(i.format),
          o = y.convert(i.type);
        z.setTexture2D(i, 0),
          B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL, i.flipY),
          B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.premultiplyAlpha),
          B.pixelStorei(B.UNPACK_ALIGNMENT, i.unpackAlignment),
          t.isDataTexture
            ? B.texSubImage2D(
                B.TEXTURE_2D,
                r,
                e.x,
                e.y,
                n,
                a,
                s,
                o,
                t.image.data
              )
            : t.isCompressedTexture
            ? B.compressedTexSubImage2D(
                B.TEXTURE_2D,
                r,
                e.x,
                e.y,
                t.mipmaps[0].width,
                t.mipmaps[0].height,
                s,
                t.mipmaps[0].data
              )
            : B.texSubImage2D(B.TEXTURE_2D, r, e.x, e.y, s, o, t.image),
          0 === r && i.generateMipmaps && B.generateMipmap(B.TEXTURE_2D),
          G.unbindTexture();
      }),
      (this.copyTextureToTexture3D = function (e, t, i, r, n = 0) {
        var a = e.max.x - e.min.x,
          s = e.max.y - e.min.y,
          o = e.max.z - e.min.z,
          l = y.convert(r.format),
          h = y.convert(r.type);
        let c;
        if (r.isData3DTexture) z.setTexture3D(r, 0), (c = B.TEXTURE_3D);
        else {
          if (!r.isDataArrayTexture && !r.isCompressedArrayTexture)
            return void console.warn(
              "THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray."
            );
          z.setTexture2DArray(r, 0), (c = B.TEXTURE_2D_ARRAY);
        }
        B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL, r.flipY),
          B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.premultiplyAlpha),
          B.pixelStorei(B.UNPACK_ALIGNMENT, r.unpackAlignment);
        var d = B.getParameter(B.UNPACK_ROW_LENGTH),
          u = B.getParameter(B.UNPACK_IMAGE_HEIGHT),
          p = B.getParameter(B.UNPACK_SKIP_PIXELS),
          m = B.getParameter(B.UNPACK_SKIP_ROWS),
          f = B.getParameter(B.UNPACK_SKIP_IMAGES),
          g = i.isCompressedTexture ? i.mipmaps[n] : i.image;
        B.pixelStorei(B.UNPACK_ROW_LENGTH, g.width),
          B.pixelStorei(B.UNPACK_IMAGE_HEIGHT, g.height),
          B.pixelStorei(B.UNPACK_SKIP_PIXELS, e.min.x),
          B.pixelStorei(B.UNPACK_SKIP_ROWS, e.min.y),
          B.pixelStorei(B.UNPACK_SKIP_IMAGES, e.min.z),
          i.isDataTexture || i.isData3DTexture
            ? B.texSubImage3D(c, n, t.x, t.y, t.z, a, s, o, l, h, g.data)
            : r.isCompressedArrayTexture
            ? B.compressedTexSubImage3D(c, n, t.x, t.y, t.z, a, s, o, l, g.data)
            : B.texSubImage3D(c, n, t.x, t.y, t.z, a, s, o, l, h, g),
          B.pixelStorei(B.UNPACK_ROW_LENGTH, d),
          B.pixelStorei(B.UNPACK_IMAGE_HEIGHT, u),
          B.pixelStorei(B.UNPACK_SKIP_PIXELS, p),
          B.pixelStorei(B.UNPACK_SKIP_ROWS, m),
          B.pixelStorei(B.UNPACK_SKIP_IMAGES, f),
          0 === n && r.generateMipmaps && B.generateMipmap(c),
          G.unbindTexture();
      }),
      (this.initTexture = function (e) {
        e.isCubeTexture
          ? z.setTextureCube(e, 0)
          : e.isData3DTexture
          ? z.setTexture3D(e, 0)
          : e.isDataArrayTexture || e.isCompressedArrayTexture
          ? z.setTexture2DArray(e, 0)
          : z.setTexture2D(e, 0),
          G.unbindTexture();
      }),
      (this.resetState = function () {
        (j = 0), (Y = 0), (C = null), G.reset(), S.reset();
      }),
      "undefined" != typeof __THREE_DEVTOOLS__ &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent("observe", { detail: this })
        );
  }
  get coordinateSystem() {
    return WebGLCoordinateSystem;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    var t = this.getContext();
    (t.drawingBufferColorSpace =
      e === DisplayP3ColorSpace ? "display-p3" : "srgb"),
      (t.unpackColorSpace =
        ColorManagement.workingColorSpace === LinearDisplayP3ColorSpace
          ? "display-p3"
          : "srgb");
  }
  get useLegacyLights() {
    return (
      console.warn(
        "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."
      ),
      this._useLegacyLights
    );
  }
  set useLegacyLights(e) {
    console.warn(
      "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."
    ),
      (this._useLegacyLights = e);
  }
}
class Scene extends Object3D {
  constructor() {
    super(),
      (this.isScene = !0),
      (this.type = "Scene"),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.backgroundRotation = new Euler()),
      (this.environmentIntensity = 1),
      (this.environmentRotation = new Euler()),
      (this.overrideMaterial = null),
      "undefined" != typeof __THREE_DEVTOOLS__ &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent("observe", { detail: this })
        );
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      null !== e.background && (this.background = e.background.clone()),
      null !== e.environment && (this.environment = e.environment.clone()),
      null !== e.fog && (this.fog = e.fog.clone()),
      (this.backgroundBlurriness = e.backgroundBlurriness),
      (this.backgroundIntensity = e.backgroundIntensity),
      this.backgroundRotation.copy(e.backgroundRotation),
      (this.environmentIntensity = e.environmentIntensity),
      this.environmentRotation.copy(e.environmentRotation),
      null !== e.overrideMaterial &&
        (this.overrideMaterial = e.overrideMaterial.clone()),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this
    );
  }
  toJSON(e) {
    e = super.toJSON(e);
    return (
      null !== this.fog && (e.object.fog = this.fog.toJSON()),
      0 < this.backgroundBlurriness &&
        (e.object.backgroundBlurriness = this.backgroundBlurriness),
      1 !== this.backgroundIntensity &&
        (e.object.backgroundIntensity = this.backgroundIntensity),
      (e.object.backgroundRotation = this.backgroundRotation.toArray()),
      1 !== this.environmentIntensity &&
        (e.object.environmentIntensity = this.environmentIntensity),
      (e.object.environmentRotation = this.environmentRotation.toArray()),
      e
    );
  }
}
class InterleavedBuffer {
  constructor(e, t) {
    (this.isInterleavedBuffer = !0),
      (this.array = e),
      (this.stride = t),
      (this.count = void 0 !== e ? e.length / t : 0),
      (this.usage = StaticDrawUsage),
      (this._updateRange = { offset: 0, count: -1 }),
      (this.updateRanges = []),
      (this.version = 0),
      (this.uuid = generateUUID());
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    !0 === e && this.version++;
  }
  get updateRange() {
    return (
      warnOnce(
        "THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."
      ),
      this._updateRange
    );
  }
  setUsage(e) {
    return (this.usage = e), this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return (
      (this.array = new e.array.constructor(e.array)),
      (this.count = e.count),
      (this.stride = e.stride),
      (this.usage = e.usage),
      this
    );
  }
  copyAt(i, r, n) {
    (i *= this.stride), (n *= r.stride);
    for (let e = 0, t = this.stride; e < t; e++)
      this.array[i + e] = r.array[n + e];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    void 0 === e.arrayBuffers && (e.arrayBuffers = {}),
      void 0 === this.array.buffer._uuid &&
        (this.array.buffer._uuid = generateUUID()),
      void 0 === e.arrayBuffers[this.array.buffer._uuid] &&
        (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    (e = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid])),
      (e = new this.constructor(e, this.stride));
    return e.setUsage(this.usage), e;
  }
  onUpload(e) {
    return (this.onUploadCallback = e), this;
  }
  toJSON(e) {
    return (
      void 0 === e.arrayBuffers && (e.arrayBuffers = {}),
      void 0 === this.array.buffer._uuid &&
        (this.array.buffer._uuid = generateUUID()),
      void 0 === e.arrayBuffers[this.array.buffer._uuid] &&
        (e.arrayBuffers[this.array.buffer._uuid] = Array.from(
          new Uint32Array(this.array.buffer)
        )),
      {
        uuid: this.uuid,
        buffer: this.array.buffer._uuid,
        type: this.array.constructor.name,
        stride: this.stride,
      }
    );
  }
}
let _vector$6 = new Vector3();
class InterleavedBufferAttribute {
  constructor(e, t, i, r = !1) {
    (this.isInterleavedBufferAttribute = !0),
      (this.name = ""),
      (this.data = e),
      (this.itemSize = t),
      (this.offset = i),
      (this.normalized = r);
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(e) {
    this.data.needsUpdate = e;
  }
  applyMatrix4(i) {
    for (let e = 0, t = this.data.count; e < t; e++)
      _vector$6.fromBufferAttribute(this, e),
        _vector$6.applyMatrix4(i),
        this.setXYZ(e, _vector$6.x, _vector$6.y, _vector$6.z);
    return this;
  }
  applyNormalMatrix(i) {
    for (let e = 0, t = this.count; e < t; e++)
      _vector$6.fromBufferAttribute(this, e),
        _vector$6.applyNormalMatrix(i),
        this.setXYZ(e, _vector$6.x, _vector$6.y, _vector$6.z);
    return this;
  }
  transformDirection(i) {
    for (let e = 0, t = this.count; e < t; e++)
      _vector$6.fromBufferAttribute(this, e),
        _vector$6.transformDirection(i),
        this.setXYZ(e, _vector$6.x, _vector$6.y, _vector$6.z);
    return this;
  }
  getComponent(e, t) {
    let i = this.array[e * this.data.stride + this.offset + t];
    return (i = this.normalized ? denormalize(i, this.array) : i);
  }
  setComponent(e, t, i) {
    return (
      this.normalized && (i = normalize(i, this.array)),
      (this.data.array[e * this.data.stride + this.offset + t] = i),
      this
    );
  }
  setX(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.data.array[e * this.data.stride + this.offset] = t),
      this
    );
  }
  setY(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.data.array[e * this.data.stride + this.offset + 1] = t),
      this
    );
  }
  setZ(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.data.array[e * this.data.stride + this.offset + 2] = t),
      this
    );
  }
  setW(e, t) {
    return (
      this.normalized && (t = normalize(t, this.array)),
      (this.data.array[e * this.data.stride + this.offset + 3] = t),
      this
    );
  }
  getX(e) {
    let t = this.data.array[e * this.data.stride + this.offset];
    return (t = this.normalized ? denormalize(t, this.array) : t);
  }
  getY(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 1];
    return (t = this.normalized ? denormalize(t, this.array) : t);
  }
  getZ(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 2];
    return (t = this.normalized ? denormalize(t, this.array) : t);
  }
  getW(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 3];
    return (t = this.normalized ? denormalize(t, this.array) : t);
  }
  setXY(e, t, i) {
    return (
      (e = e * this.data.stride + this.offset),
      this.normalized &&
        ((t = normalize(t, this.array)), (i = normalize(i, this.array))),
      (this.data.array[e + 0] = t),
      (this.data.array[e + 1] = i),
      this
    );
  }
  setXYZ(e, t, i, r) {
    return (
      (e = e * this.data.stride + this.offset),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (i = normalize(i, this.array)),
        (r = normalize(r, this.array))),
      (this.data.array[e + 0] = t),
      (this.data.array[e + 1] = i),
      (this.data.array[e + 2] = r),
      this
    );
  }
  setXYZW(e, t, i, r, n) {
    return (
      (e = e * this.data.stride + this.offset),
      this.normalized &&
        ((t = normalize(t, this.array)),
        (i = normalize(i, this.array)),
        (r = normalize(r, this.array)),
        (n = normalize(n, this.array))),
      (this.data.array[e + 0] = t),
      (this.data.array[e + 1] = i),
      (this.data.array[e + 2] = r),
      (this.data.array[e + 3] = n),
      this
    );
  }
  clone(e) {
    if (void 0 !== e)
      return (
        void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}),
        void 0 === e.interleavedBuffers[this.data.uuid] &&
          (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)),
        new InterleavedBufferAttribute(
          e.interleavedBuffers[this.data.uuid],
          this.itemSize,
          this.offset,
          this.normalized
        )
      );
    console.log(
      "THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data."
    );
    var t = [];
    for (let e = 0; e < this.count; e++) {
      var i = e * this.data.stride + this.offset;
      for (let e = 0; e < this.itemSize; e++) t.push(this.data.array[i + e]);
    }
    return new BufferAttribute(
      new this.array.constructor(t),
      this.itemSize,
      this.normalized
    );
  }
  toJSON(e) {
    if (void 0 !== e)
      return (
        void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}),
        void 0 === e.interleavedBuffers[this.data.uuid] &&
          (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)),
        {
          isInterleavedBufferAttribute: !0,
          itemSize: this.itemSize,
          data: this.data.uuid,
          offset: this.offset,
          normalized: this.normalized,
        }
      );
    console.log(
      "THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data."
    );
    var t = [];
    for (let e = 0; e < this.count; e++) {
      var i = e * this.data.stride + this.offset;
      for (let e = 0; e < this.itemSize; e++) t.push(this.data.array[i + e]);
    }
    return {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: t,
      normalized: this.normalized,
    };
  }
}
let _basePosition = new Vector3(),
  _skinIndex = new Vector4(),
  _skinWeight = new Vector4(),
  _vector3 = new Vector3(),
  _matrix4 = new Matrix4(),
  _vertex = new Vector3(),
  _sphere$4 = new Sphere(),
  _inverseMatrix$2 = new Matrix4(),
  _ray$2 = new Ray();
class SkinnedMesh extends Mesh {
  constructor(e, t) {
    super(e, t),
      (this.isSkinnedMesh = !0),
      (this.type = "SkinnedMesh"),
      (this.bindMode = AttachedBindMode),
      (this.bindMatrix = new Matrix4()),
      (this.bindMatrixInverse = new Matrix4()),
      (this.boundingBox = null),
      (this.boundingSphere = null);
  }
  computeBoundingBox() {
    var e = this.geometry,
      t =
        (null === this.boundingBox && (this.boundingBox = new Box3()),
        this.boundingBox.makeEmpty(),
        e.getAttribute("position"));
    for (let e = 0; e < t.count; e++)
      this.getVertexPosition(e, _vertex),
        this.boundingBox.expandByPoint(_vertex);
  }
  computeBoundingSphere() {
    var e = this.geometry,
      t =
        (null === this.boundingSphere && (this.boundingSphere = new Sphere()),
        this.boundingSphere.makeEmpty(),
        e.getAttribute("position"));
    for (let e = 0; e < t.count; e++)
      this.getVertexPosition(e, _vertex),
        this.boundingSphere.expandByPoint(_vertex);
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.bindMode = e.bindMode),
      this.bindMatrix.copy(e.bindMatrix),
      this.bindMatrixInverse.copy(e.bindMatrixInverse),
      (this.skeleton = e.skeleton),
      null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()),
      null !== e.boundingSphere &&
        (this.boundingSphere = e.boundingSphere.clone()),
      this
    );
  }
  raycast(e, t) {
    var i = this.material,
      r = this.matrixWorld;
    void 0 !== i &&
      (null === this.boundingSphere && this.computeBoundingSphere(),
      _sphere$4.copy(this.boundingSphere),
      _sphere$4.applyMatrix4(r),
      !1 !== e.ray.intersectsSphere(_sphere$4)) &&
      (_inverseMatrix$2.copy(r).invert(),
      _ray$2.copy(e.ray).applyMatrix4(_inverseMatrix$2),
      null === this.boundingBox ||
        !1 !== _ray$2.intersectsBox(this.boundingBox)) &&
      this._computeIntersections(e, t, _ray$2);
  }
  getVertexPosition(e, t) {
    return super.getVertexPosition(e, t), this.applyBoneTransform(e, t), t;
  }
  bind(e, t) {
    (this.skeleton = e),
      void 0 === t &&
        (this.updateMatrixWorld(!0),
        this.skeleton.calculateInverses(),
        (t = this.matrixWorld)),
      this.bindMatrix.copy(t),
      this.bindMatrixInverse.copy(t).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    var i = new Vector4(),
      r = this.geometry.attributes.skinWeight;
    for (let e = 0, t = r.count; e < t; e++) {
      i.fromBufferAttribute(r, e);
      var n = 1 / i.manhattanLength();
      n != 1 / 0 ? i.multiplyScalar(n) : i.set(1, 0, 0, 0),
        r.setXYZW(e, i.x, i.y, i.z, i.w);
    }
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e),
      this.bindMode === AttachedBindMode
        ? this.bindMatrixInverse.copy(this.matrixWorld).invert()
        : this.bindMode === DetachedBindMode
        ? this.bindMatrixInverse.copy(this.bindMatrix).invert()
        : console.warn(
            "THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode
          );
  }
  applyBoneTransform(e, t) {
    var i = this.skeleton,
      r = this.geometry;
    _skinIndex.fromBufferAttribute(r.attributes.skinIndex, e),
      _skinWeight.fromBufferAttribute(r.attributes.skinWeight, e),
      _basePosition.copy(t).applyMatrix4(this.bindMatrix),
      t.set(0, 0, 0);
    for (let e = 0; e < 4; e++) {
      var n,
        a = _skinWeight.getComponent(e);
      0 !== a &&
        ((n = _skinIndex.getComponent(e)),
        _matrix4.multiplyMatrices(i.bones[n].matrixWorld, i.boneInverses[n]),
        t.addScaledVector(
          _vector3.copy(_basePosition).applyMatrix4(_matrix4),
          a
        ));
    }
    return t.applyMatrix4(this.bindMatrixInverse);
  }
}
class Bone extends Object3D {
  constructor() {
    super(), (this.isBone = !0), (this.type = "Bone");
  }
}
class DataTexture extends Texture {
  constructor(
    e = null,
    t = 1,
    i = 1,
    r,
    n,
    a,
    s,
    o,
    l = NearestFilter,
    h = NearestFilter,
    c,
    d
  ) {
    super(null, a, s, o, l, h, r, n, c, d),
      (this.isDataTexture = !0),
      (this.image = { data: e, width: t, height: i }),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1);
  }
}
let _offsetMatrix = new Matrix4(),
  _identityMatrix$1 = new Matrix4();
class Skeleton {
  constructor(e = [], t = []) {
    (this.uuid = generateUUID()),
      (this.bones = e.slice(0)),
      (this.boneInverses = t),
      (this.boneMatrices = null),
      (this.boneTexture = null),
      this.init();
  }
  init() {
    var e = this.bones,
      t = this.boneInverses;
    if (((this.boneMatrices = new Float32Array(16 * e.length)), 0 === t.length))
      this.calculateInverses();
    else if (e.length !== t.length) {
      console.warn(
        "THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."
      ),
        (this.boneInverses = []);
      for (let e = 0, t = this.bones.length; e < t; e++)
        this.boneInverses.push(new Matrix4());
    }
  }
  calculateInverses() {
    for (
      let e = (this.boneInverses.length = 0), t = this.bones.length;
      e < t;
      e++
    ) {
      var i = new Matrix4();
      this.bones[e] && i.copy(this.bones[e].matrixWorld).invert(),
        this.boneInverses.push(i);
    }
  }
  pose() {
    for (let e = 0, t = this.bones.length; e < t; e++) {
      var i = this.bones[e];
      i && i.matrixWorld.copy(this.boneInverses[e]).invert();
    }
    for (let e = 0, t = this.bones.length; e < t; e++) {
      var r = this.bones[e];
      r &&
        (r.parent && r.parent.isBone
          ? (r.matrix.copy(r.parent.matrixWorld).invert(),
            r.matrix.multiply(r.matrixWorld))
          : r.matrix.copy(r.matrixWorld),
        r.matrix.decompose(r.position, r.quaternion, r.scale));
    }
  }
  update() {
    var i = this.bones,
      r = this.boneInverses,
      n = this.boneMatrices,
      e = this.boneTexture;
    for (let e = 0, t = i.length; e < t; e++) {
      var a = i[e] ? i[e].matrixWorld : _identityMatrix$1;
      _offsetMatrix.multiplyMatrices(a, r[e]), _offsetMatrix.toArray(n, 16 * e);
    }
    null !== e && (e.needsUpdate = !0);
  }
  clone() {
    return new Skeleton(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    var e = Math.sqrt(4 * this.bones.length),
      e = 4 * Math.ceil(e / 4),
      t = ((e = Math.max(e, 4)), new Float32Array(e * e * 4)),
      e =
        (t.set(this.boneMatrices),
        new DataTexture(t, e, e, RGBAFormat, FloatType));
    return (
      (e.needsUpdate = !0),
      (this.boneMatrices = t),
      (this.boneTexture = e),
      this
    );
  }
  getBoneByName(i) {
    for (let e = 0, t = this.bones.length; e < t; e++) {
      var r = this.bones[e];
      if (r.name === i) return r;
    }
  }
  dispose() {
    null !== this.boneTexture &&
      (this.boneTexture.dispose(), (this.boneTexture = null));
  }
  fromJSON(i, r) {
    this.uuid = i.uuid;
    for (let t = 0, e = i.bones.length; t < e; t++) {
      var n = i.bones[t];
      let e = r[n];
      void 0 === e &&
        (console.warn("THREE.Skeleton: No bone found with UUID:", n),
        (e = new Bone())),
        this.bones.push(e),
        this.boneInverses.push(new Matrix4().fromArray(i.boneInverses[t]));
    }
    return this.init(), this;
  }
  toJSON() {
    var i = {
        metadata: {
          version: 4.6,
          type: "Skeleton",
          generator: "Skeleton.toJSON",
        },
        bones: [],
        boneInverses: [],
      },
      r = ((i.uuid = this.uuid), this.bones),
      n = this.boneInverses;
    for (let e = 0, t = r.length; e < t; e++) {
      var a = r[e],
        a = (i.bones.push(a.uuid), n[e]);
      i.boneInverses.push(a.toArray());
    }
    return i;
  }
}
class InstancedBufferAttribute extends BufferAttribute {
  constructor(e, t, i, r = 1) {
    super(e, t, i),
      (this.isInstancedBufferAttribute = !0),
      (this.meshPerAttribute = r);
  }
  copy(e) {
    return super.copy(e), (this.meshPerAttribute = e.meshPerAttribute), this;
  }
  toJSON() {
    var e = super.toJSON();
    return (
      (e.meshPerAttribute = this.meshPerAttribute),
      (e.isInstancedBufferAttribute = !0),
      e
    );
  }
}
let _instanceLocalMatrix = new Matrix4(),
  _instanceWorldMatrix = new Matrix4(),
  _instanceIntersects = [],
  _box3 = new Box3(),
  _identity = new Matrix4(),
  _mesh$1 = new Mesh(),
  _sphere$3 = new Sphere();
class InstancedMesh extends Mesh {
  constructor(e, t, i) {
    super(e, t),
      (this.isInstancedMesh = !0),
      (this.instanceMatrix = new InstancedBufferAttribute(
        new Float32Array(16 * i),
        16
      )),
      (this.instanceColor = null),
      (this.morphTexture = null),
      (this.count = i),
      (this.boundingBox = null),
      (this.boundingSphere = null);
    for (let e = 0; e < i; e++) this.setMatrixAt(e, _identity);
  }
  computeBoundingBox() {
    var t = this.geometry,
      i = this.count;
    null === this.boundingBox && (this.boundingBox = new Box3()),
      null === t.boundingBox && t.computeBoundingBox(),
      this.boundingBox.makeEmpty();
    for (let e = 0; e < i; e++)
      this.getMatrixAt(e, _instanceLocalMatrix),
        _box3.copy(t.boundingBox).applyMatrix4(_instanceLocalMatrix),
        this.boundingBox.union(_box3);
  }
  computeBoundingSphere() {
    var t = this.geometry,
      i = this.count;
    null === this.boundingSphere && (this.boundingSphere = new Sphere()),
      null === t.boundingSphere && t.computeBoundingSphere(),
      this.boundingSphere.makeEmpty();
    for (let e = 0; e < i; e++)
      this.getMatrixAt(e, _instanceLocalMatrix),
        _sphere$3.copy(t.boundingSphere).applyMatrix4(_instanceLocalMatrix),
        this.boundingSphere.union(_sphere$3);
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      this.instanceMatrix.copy(e.instanceMatrix),
      null !== e.morphTexture && (this.morphTexture = e.morphTexture.clone()),
      null !== e.instanceColor &&
        (this.instanceColor = e.instanceColor.clone()),
      (this.count = e.count),
      null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()),
      null !== e.boundingSphere &&
        (this.boundingSphere = e.boundingSphere.clone()),
      this
    );
  }
  getColorAt(e, t) {
    t.fromArray(this.instanceColor.array, 3 * e);
  }
  getMatrixAt(e, t) {
    t.fromArray(this.instanceMatrix.array, 16 * e);
  }
  getMorphAt(e, t) {
    var i = t.morphTargetInfluences,
      r = this.morphTexture.source.data.data,
      n = e * (i.length + 1) + 1;
    for (let e = 0; e < i.length; e++) i[e] = r[n + e];
  }
  raycast(e, r) {
    var t = this.matrixWorld,
      n = this.count;
    if (
      ((_mesh$1.geometry = this.geometry),
      (_mesh$1.material = this.material),
      void 0 !== _mesh$1.material &&
        (null === this.boundingSphere && this.computeBoundingSphere(),
        _sphere$3.copy(this.boundingSphere),
        _sphere$3.applyMatrix4(t),
        !1 !== e.ray.intersectsSphere(_sphere$3)))
    )
      for (let i = 0; i < n; i++) {
        this.getMatrixAt(i, _instanceLocalMatrix),
          _instanceWorldMatrix.multiplyMatrices(t, _instanceLocalMatrix),
          (_mesh$1.matrixWorld = _instanceWorldMatrix),
          _mesh$1.raycast(e, _instanceIntersects);
        for (let e = 0, t = _instanceIntersects.length; e < t; e++) {
          var a = _instanceIntersects[e];
          (a.instanceId = i), (a.object = this), r.push(a);
        }
        _instanceIntersects.length = 0;
      }
  }
  setColorAt(e, t) {
    null === this.instanceColor &&
      (this.instanceColor = new InstancedBufferAttribute(
        new Float32Array(3 * this.instanceMatrix.count),
        3
      )),
      t.toArray(this.instanceColor.array, 3 * e);
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, 16 * e);
  }
  setMorphAt(e, t) {
    var i = t.morphTargetInfluences,
      t = i.length + 1,
      r =
        (null === this.morphTexture &&
          (this.morphTexture = new DataTexture(
            new Float32Array(t * this.count),
            t,
            this.count,
            RedFormat,
            FloatType
          )),
        this.morphTexture.source.data.data);
    let n = 0;
    for (let e = 0; e < i.length; e++) n += i[e];
    var a = this.geometry.morphTargetsRelative ? 1 : 1 - n,
      t = t * e;
    (r[t] = a), r.set(i, 1 + t);
  }
  updateMorphTargets() {}
  dispose() {
    return (
      this.dispatchEvent({ type: "dispose" }),
      null !== this.morphTexture &&
        (this.morphTexture.dispose(), (this.morphTexture = null)),
      this
    );
  }
}
class LineBasicMaterial extends Material {
  constructor(e) {
    super(),
      (this.isLineBasicMaterial = !0),
      (this.type = "LineBasicMaterial"),
      (this.color = new Color(16777215)),
      (this.map = null),
      (this.linewidth = 1),
      (this.linecap = "round"),
      (this.linejoin = "round"),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.linewidth = e.linewidth),
      (this.linecap = e.linecap),
      (this.linejoin = e.linejoin),
      (this.fog = e.fog),
      this
    );
  }
}
let _vStart = new Vector3(),
  _vEnd = new Vector3(),
  _inverseMatrix$1 = new Matrix4(),
  _ray$1 = new Ray(),
  _sphere$1 = new Sphere(),
  _intersectPointOnRay = new Vector3(),
  _intersectPointOnSegment = new Vector3();
class Line extends Object3D {
  constructor(e = new BufferGeometry(), t = new LineBasicMaterial()) {
    super(),
      (this.isLine = !0),
      (this.type = "Line"),
      (this.geometry = e),
      (this.material = t),
      this.updateMorphTargets();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.material = Array.isArray(e.material)
        ? e.material.slice()
        : e.material),
      (this.geometry = e.geometry),
      this
    );
  }
  computeLineDistances() {
    var e = this.geometry;
    if (null === e.index) {
      var i = e.attributes.position,
        r = [0];
      for (let e = 1, t = i.count; e < t; e++)
        _vStart.fromBufferAttribute(i, e - 1),
          _vEnd.fromBufferAttribute(i, e),
          (r[e] = r[e - 1]),
          (r[e] += _vStart.distanceTo(_vEnd));
      e.setAttribute("lineDistance", new Float32BufferAttribute(r, 1));
    } else
      console.warn(
        "THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
      );
    return this;
  }
  raycast(i, r) {
    var n = this.geometry,
      a = this.matrixWorld,
      e = i.params.Line.threshold,
      t = n.drawRange;
    if (
      (null === n.boundingSphere && n.computeBoundingSphere(),
      _sphere$1.copy(n.boundingSphere),
      _sphere$1.applyMatrix4(a),
      (_sphere$1.radius += e),
      !1 !== i.ray.intersectsSphere(_sphere$1))
    ) {
      _inverseMatrix$1.copy(a).invert(),
        _ray$1.copy(i.ray).applyMatrix4(_inverseMatrix$1);
      var a = e / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        s = a * a,
        o = this.isLineSegments ? 2 : 1,
        l = n.index,
        e = n.attributes.position;
      if (null !== l) {
        var a = Math.max(0, t.start),
          n = Math.min(l.count, t.start + t.count);
        for (let e = a, t = n - 1; e < t; e += o) {
          var h = l.getX(e),
            c = l.getX(e + 1),
            h = checkIntersection(this, i, _ray$1, s, h, c);
          h && r.push(h);
        }
        this.isLineLoop &&
          ((n = l.getX(n - 1)),
          (a = l.getX(a)),
          (n = checkIntersection(this, i, _ray$1, s, n, a))) &&
          r.push(n);
      } else {
        (a = Math.max(0, t.start)), (n = Math.min(e.count, t.start + t.count));
        for (let e = a, t = n - 1; e < t; e += o) {
          var d = checkIntersection(this, i, _ray$1, s, e, e + 1);
          d && r.push(d);
        }
        this.isLineLoop &&
          (e = checkIntersection(this, i, _ray$1, s, n - 1, a)) &&
          r.push(e);
      }
    }
  }
  updateMorphTargets() {
    var e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (0 < t.length) {
      var i = e[t[0]];
      if (void 0 !== i) {
        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
        for (let e = 0, t = i.length; e < t; e++) {
          var r = i[e].name || String(e);
          this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[r] = e);
        }
      }
    }
  }
}
function checkIntersection(e, t, i, r, n, a) {
  var s = e.geometry.attributes.position,
    s =
      (_vStart.fromBufferAttribute(s, n),
      _vEnd.fromBufferAttribute(s, a),
      i.distanceSqToSegment(
        _vStart,
        _vEnd,
        _intersectPointOnRay,
        _intersectPointOnSegment
      ));
  if (!(r < s)) {
    _intersectPointOnRay.applyMatrix4(e.matrixWorld);
    a = t.ray.origin.distanceTo(_intersectPointOnRay);
    if (!(a < t.near || a > t.far))
      return {
        distance: a,
        point: _intersectPointOnSegment.clone().applyMatrix4(e.matrixWorld),
        index: n,
        face: null,
        faceIndex: null,
        object: e,
      };
  }
}
let _start = new Vector3(),
  _end = new Vector3();
class LineSegments extends Line {
  constructor(e, t) {
    super(e, t), (this.isLineSegments = !0), (this.type = "LineSegments");
  }
  computeLineDistances() {
    var e = this.geometry;
    if (null === e.index) {
      var i = e.attributes.position,
        r = [];
      for (let e = 0, t = i.count; e < t; e += 2)
        _start.fromBufferAttribute(i, e),
          _end.fromBufferAttribute(i, e + 1),
          (r[e] = 0 === e ? 0 : r[e - 1]),
          (r[e + 1] = r[e] + _start.distanceTo(_end));
      e.setAttribute("lineDistance", new Float32BufferAttribute(r, 1));
    } else
      console.warn(
        "THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
      );
    return this;
  }
}
class LineLoop extends Line {
  constructor(e, t) {
    super(e, t), (this.isLineLoop = !0), (this.type = "LineLoop");
  }
}
class PointsMaterial extends Material {
  constructor(e) {
    super(),
      (this.isPointsMaterial = !0),
      (this.type = "PointsMaterial"),
      (this.color = new Color(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.size = 1),
      (this.sizeAttenuation = !0),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.size = e.size),
      (this.sizeAttenuation = e.sizeAttenuation),
      (this.fog = e.fog),
      this
    );
  }
}
let _inverseMatrix = new Matrix4(),
  _ray = new Ray(),
  _sphere = new Sphere(),
  _position$2 = new Vector3();
class Points extends Object3D {
  constructor(e = new BufferGeometry(), t = new PointsMaterial()) {
    super(),
      (this.isPoints = !0),
      (this.type = "Points"),
      (this.geometry = e),
      (this.material = t),
      this.updateMorphTargets();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.material = Array.isArray(e.material)
        ? e.material.slice()
        : e.material),
      (this.geometry = e.geometry),
      this
    );
  }
  raycast(i, r) {
    var e = this.geometry,
      n = this.matrixWorld,
      t = i.params.Points.threshold,
      a = e.drawRange;
    if (
      (null === e.boundingSphere && e.computeBoundingSphere(),
      _sphere.copy(e.boundingSphere),
      _sphere.applyMatrix4(n),
      (_sphere.radius += t),
      !1 !== i.ray.intersectsSphere(_sphere))
    ) {
      _inverseMatrix.copy(n).invert(),
        _ray.copy(i.ray).applyMatrix4(_inverseMatrix);
      var t = t / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        s = t * t,
        o = e.index,
        l = e.attributes.position;
      if (null !== o)
        for (
          let e = Math.max(0, a.start),
            t = Math.min(o.count, a.start + a.count);
          e < t;
          e++
        ) {
          var h = o.getX(e);
          _position$2.fromBufferAttribute(l, h),
            testPoint(_position$2, h, s, n, i, r, this);
        }
      else
        for (
          let e = Math.max(0, a.start),
            t = Math.min(l.count, a.start + a.count);
          e < t;
          e++
        )
          _position$2.fromBufferAttribute(l, e),
            testPoint(_position$2, e, s, n, i, r, this);
    }
  }
  updateMorphTargets() {
    var e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (0 < t.length) {
      var i = e[t[0]];
      if (void 0 !== i) {
        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
        for (let e = 0, t = i.length; e < t; e++) {
          var r = i[e].name || String(e);
          this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[r] = e);
        }
      }
    }
  }
}
function testPoint(e, t, i, r, n, a, s) {
  var o = _ray.distanceSqToPoint(e);
  o < i &&
    ((i = new Vector3()),
    _ray.closestPointToPoint(e, i),
    i.applyMatrix4(r),
    (e = n.ray.origin.distanceTo(i)) < n.near ||
      e > n.far ||
      a.push({
        distance: e,
        distanceToRay: Math.sqrt(o),
        point: i,
        index: t,
        face: null,
        object: s,
      }));
}
class MeshStandardMaterial extends Material {
  constructor(e) {
    super(),
      (this.isMeshStandardMaterial = !0),
      (this.defines = { STANDARD: "" }),
      (this.type = "MeshStandardMaterial"),
      (this.color = new Color(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Color(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = TangentSpaceNormalMap),
      (this.normalScale = new Vector2(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new Euler()),
      (this.envMapIntensity = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.defines = { STANDARD: "" }),
      this.color.copy(e.color),
      (this.roughness = e.roughness),
      (this.metalness = e.metalness),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      this.emissive.copy(e.emissive),
      (this.emissiveMap = e.emissiveMap),
      (this.emissiveIntensity = e.emissiveIntensity),
      (this.bumpMap = e.bumpMap),
      (this.bumpScale = e.bumpScale),
      (this.normalMap = e.normalMap),
      (this.normalMapType = e.normalMapType),
      this.normalScale.copy(e.normalScale),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.roughnessMap = e.roughnessMap),
      (this.metalnessMap = e.metalnessMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      this.envMapRotation.copy(e.envMapRotation),
      (this.envMapIntensity = e.envMapIntensity),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.flatShading = e.flatShading),
      (this.fog = e.fog),
      this
    );
  }
}
class MeshPhysicalMaterial extends MeshStandardMaterial {
  constructor(e) {
    super(),
      (this.isMeshPhysicalMaterial = !0),
      (this.defines = { STANDARD: "", PHYSICAL: "" }),
      (this.type = "MeshPhysicalMaterial"),
      (this.anisotropyRotation = 0),
      (this.anisotropyMap = null),
      (this.clearcoatMap = null),
      (this.clearcoatRoughness = 0),
      (this.clearcoatRoughnessMap = null),
      (this.clearcoatNormalScale = new Vector2(1, 1)),
      (this.clearcoatNormalMap = null),
      (this.ior = 1.5),
      Object.defineProperty(this, "reflectivity", {
        get: function () {
          return clamp((2.5 * (this.ior - 1)) / (this.ior + 1), 0, 1);
        },
        set: function (e) {
          this.ior = (1 + 0.4 * e) / (1 - 0.4 * e);
        },
      }),
      (this.iridescenceMap = null),
      (this.iridescenceIOR = 1.3),
      (this.iridescenceThicknessRange = [100, 400]),
      (this.iridescenceThicknessMap = null),
      (this.sheenColor = new Color(0)),
      (this.sheenColorMap = null),
      (this.sheenRoughness = 1),
      (this.sheenRoughnessMap = null),
      (this.transmissionMap = null),
      (this.thickness = 0),
      (this.thicknessMap = null),
      (this.attenuationDistance = 1 / 0),
      (this.attenuationColor = new Color(1, 1, 1)),
      (this.specularIntensity = 1),
      (this.specularIntensityMap = null),
      (this.specularColor = new Color(1, 1, 1)),
      (this.specularColorMap = null),
      (this._anisotropy = 0),
      (this._clearcoat = 0),
      (this._dispersion = 0),
      (this._iridescence = 0),
      (this._sheen = 0),
      (this._transmission = 0),
      this.setValues(e);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(e) {
    0 < this._anisotropy != 0 < e && this.version++, (this._anisotropy = e);
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(e) {
    0 < this._clearcoat != 0 < e && this.version++, (this._clearcoat = e);
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(e) {
    0 < this._iridescence != 0 < e && this.version++, (this._iridescence = e);
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(e) {
    0 < this._dispersion != 0 < e && this.version++, (this._dispersion = e);
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(e) {
    0 < this._sheen != 0 < e && this.version++, (this._sheen = e);
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(e) {
    0 < this._transmission != 0 < e && this.version++, (this._transmission = e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.defines = { STANDARD: "", PHYSICAL: "" }),
      (this.anisotropy = e.anisotropy),
      (this.anisotropyRotation = e.anisotropyRotation),
      (this.anisotropyMap = e.anisotropyMap),
      (this.clearcoat = e.clearcoat),
      (this.clearcoatMap = e.clearcoatMap),
      (this.clearcoatRoughness = e.clearcoatRoughness),
      (this.clearcoatRoughnessMap = e.clearcoatRoughnessMap),
      (this.clearcoatNormalMap = e.clearcoatNormalMap),
      this.clearcoatNormalScale.copy(e.clearcoatNormalScale),
      (this.dispersion = e.dispersion),
      (this.ior = e.ior),
      (this.iridescence = e.iridescence),
      (this.iridescenceMap = e.iridescenceMap),
      (this.iridescenceIOR = e.iridescenceIOR),
      (this.iridescenceThicknessRange = [...e.iridescenceThicknessRange]),
      (this.iridescenceThicknessMap = e.iridescenceThicknessMap),
      (this.sheen = e.sheen),
      this.sheenColor.copy(e.sheenColor),
      (this.sheenColorMap = e.sheenColorMap),
      (this.sheenRoughness = e.sheenRoughness),
      (this.sheenRoughnessMap = e.sheenRoughnessMap),
      (this.transmission = e.transmission),
      (this.transmissionMap = e.transmissionMap),
      (this.thickness = e.thickness),
      (this.thicknessMap = e.thicknessMap),
      (this.attenuationDistance = e.attenuationDistance),
      this.attenuationColor.copy(e.attenuationColor),
      (this.specularIntensity = e.specularIntensity),
      (this.specularIntensityMap = e.specularIntensityMap),
      this.specularColor.copy(e.specularColor),
      (this.specularColorMap = e.specularColorMap),
      this
    );
  }
}
function convertArray(e, t, i) {
  return !e || (!i && e.constructor === t)
    ? e
    : "number" == typeof t.BYTES_PER_ELEMENT
    ? new t(e)
    : Array.prototype.slice.call(e);
}
function isTypedArray(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function getKeyframeOrder(i) {
  var t = i.length,
    r = new Array(t);
  for (let e = 0; e !== t; ++e) r[e] = e;
  return (
    r.sort(function (e, t) {
      return i[e] - i[t];
    }),
    r
  );
}
function sortedArray(i, r, n) {
  var a = i.length,
    s = new i.constructor(a);
  for (let e = 0, t = 0; t !== a; ++e) {
    var o = n[e] * r;
    for (let e = 0; e !== r; ++e) s[t++] = i[o + e];
  }
  return s;
}
function flattenJSON(t, i, r, n) {
  let a = 1,
    s = t[0];
  for (; void 0 !== s && void 0 === s[n]; ) s = t[a++];
  if (void 0 !== s) {
    let e = s[n];
    if (void 0 !== e)
      if (Array.isArray(e))
        for (
          ;
          void 0 !== (e = s[n]) && (i.push(s.time), r.push.apply(r, e)),
            void 0 !== (s = t[a++]);

        );
      else if (void 0 !== e.toArray)
        for (
          ;
          void 0 !== (e = s[n]) && (i.push(s.time), e.toArray(r, r.length)),
            void 0 !== (s = t[a++]);

        );
      else
        for (
          ;
          void 0 !== (e = s[n]) && (i.push(s.time), r.push(e)),
            void 0 !== (s = t[a++]);

        );
  }
}
class Interpolant {
  constructor(e, t, i, r) {
    (this.parameterPositions = e),
      (this._cachedIndex = 0),
      (this.resultBuffer = void 0 !== r ? r : new t.constructor(i)),
      (this.sampleValues = t),
      (this.valueSize = i),
      (this.settings = null),
      (this.DefaultSettings_ = {});
  }
  evaluate(t) {
    var i = this.parameterPositions;
    let r = this._cachedIndex,
      n = i[r],
      a = i[r - 1];
    e: {
      t: {
        let e;
        i: {
          r: if (!(t < n)) {
            for (var s = r + 2; ; ) {
              if (void 0 === n) {
                if (t < a) break r;
                return (
                  (r = i.length),
                  (this._cachedIndex = r),
                  this.copySampleValue_(r - 1)
                );
              }
              if (r === s) break;
              if (((a = n), t < (n = i[++r]))) break t;
            }
            e = i.length;
            break i;
          }
          if (t >= a) break e;
          var o = i[1];
          t < o && ((r = 2), (a = o));
          for (var l = r - 2; ; ) {
            if (void 0 === a)
              return (this._cachedIndex = 0), this.copySampleValue_(0);
            if (r === l) break;
            if (((n = a), t >= (a = i[--r - 1]))) break t;
          }
          (e = r), (r = 0);
        }
        for (; r < e; ) {
          var h = (r + e) >>> 1;
          t < i[h] ? (e = h) : (r = 1 + h);
        }
        if (((n = i[r]), void 0 === (a = i[r - 1])))
          return (this._cachedIndex = 0), this.copySampleValue_(0);
        if (void 0 === n)
          return (
            (r = i.length),
            (this._cachedIndex = r),
            this.copySampleValue_(r - 1)
          );
      }
      (this._cachedIndex = r), this.intervalChanged_(r, a, n);
    }
    return this.interpolate_(r, a, t, n);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    var t = this.resultBuffer,
      i = this.sampleValues,
      r = this.valueSize,
      n = e * r;
    for (let e = 0; e !== r; ++e) t[e] = i[n + e];
    return t;
  }
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {}
}
class CubicInterpolant extends Interpolant {
  constructor(e, t, i, r) {
    super(e, t, i, r),
      (this._weightPrev = -0),
      (this._offsetPrev = -0),
      (this._weightNext = -0),
      (this._offsetNext = -0),
      (this.DefaultSettings_ = {
        endingStart: ZeroCurvatureEnding,
        endingEnd: ZeroCurvatureEnding,
      });
  }
  intervalChanged_(e, t, i) {
    var r = this.parameterPositions;
    let n = e - 2,
      a = e + 1,
      s = r[n],
      o = r[a];
    if (void 0 === s)
      switch (this.getSettings_().endingStart) {
        case ZeroSlopeEnding:
          (n = e), (s = 2 * t - i);
          break;
        case WrapAroundEnding:
          (n = r.length - 2), (s = t + r[n] - r[n + 1]);
          break;
        default:
          (n = e), (s = i);
      }
    if (void 0 === o)
      switch (this.getSettings_().endingEnd) {
        case ZeroSlopeEnding:
          (a = e), (o = 2 * i - t);
          break;
        case WrapAroundEnding:
          (a = 1), (o = i + r[1] - r[0]);
          break;
        default:
          (a = e - 1), (o = t);
      }
    var l = 0.5 * (i - t),
      h = this.valueSize;
    (this._weightPrev = l / (t - s)),
      (this._weightNext = l / (o - i)),
      (this._offsetPrev = n * h),
      (this._offsetNext = a * h);
  }
  interpolate_(e, t, i, r) {
    var n = this.resultBuffer,
      a = this.sampleValues,
      s = this.valueSize,
      o = e * s,
      l = o - s,
      h = this._offsetPrev,
      c = this._offsetNext,
      e = this._weightPrev,
      d = this._weightNext,
      i = (i - t) / (r - t),
      r = i * i,
      t = r * i,
      u = -e * t + 2 * e * r - e * i,
      p = (1 + e) * t + (-1.5 - 2 * e) * r + (-0.5 + e) * i + 1,
      m = (-1 - d) * t + (1.5 + d) * r + 0.5 * i,
      f = d * t - d * r;
    for (let e = 0; e !== s; ++e)
      n[e] = u * a[h + e] + p * a[l + e] + m * a[o + e] + f * a[c + e];
    return n;
  }
}
class LinearInterpolant extends Interpolant {
  constructor(e, t, i, r) {
    super(e, t, i, r);
  }
  interpolate_(e, t, i, r) {
    var n = this.resultBuffer,
      a = this.sampleValues,
      s = this.valueSize,
      o = e * s,
      l = o - s,
      h = (i - t) / (r - t),
      c = 1 - h;
    for (let e = 0; e !== s; ++e) n[e] = a[l + e] * c + a[o + e] * h;
    return n;
  }
}
class DiscreteInterpolant extends Interpolant {
  constructor(e, t, i, r) {
    super(e, t, i, r);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}
class KeyframeTrack {
  constructor(e, t, i, r) {
    if (void 0 === e)
      throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (void 0 === t || 0 === t.length)
      throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    (this.name = e),
      (this.times = convertArray(t, this.TimeBufferType)),
      (this.values = convertArray(i, this.ValueBufferType)),
      this.setInterpolation(r || this.DefaultInterpolation);
  }
  static toJSON(e) {
    var t = e.constructor;
    let i;
    return (
      t.toJSON !== this.toJSON
        ? (i = t.toJSON(e))
        : ((i = {
            name: e.name,
            times: convertArray(e.times, Array),
            values: convertArray(e.values, Array),
          }),
          (t = e.getInterpolation()) !== e.DefaultInterpolation &&
            (i.interpolation = t)),
      (i.type = e.ValueTypeName),
      i
    );
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new DiscreteInterpolant(
      this.times,
      this.values,
      this.getValueSize(),
      e
    );
  }
  InterpolantFactoryMethodLinear(e) {
    return new LinearInterpolant(
      this.times,
      this.values,
      this.getValueSize(),
      e
    );
  }
  InterpolantFactoryMethodSmooth(e) {
    return new CubicInterpolant(
      this.times,
      this.values,
      this.getValueSize(),
      e
    );
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case InterpolateDiscrete:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case InterpolateLinear:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case InterpolateSmooth:
        t = this.InterpolantFactoryMethodSmooth;
    }
    if (void 0 === t) {
      var i =
        "unsupported interpolation for " +
        this.ValueTypeName +
        " keyframe track named " +
        this.name;
      if (void 0 === this.createInterpolant) {
        if (e === this.DefaultInterpolation) throw new Error(i);
        this.setInterpolation(this.DefaultInterpolation);
      }
      console.warn("THREE.KeyframeTrack:", i);
    } else this.createInterpolant = t;
    return this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return InterpolateDiscrete;
      case this.InterpolantFactoryMethodLinear:
        return InterpolateLinear;
      case this.InterpolantFactoryMethodSmooth:
        return InterpolateSmooth;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(i) {
    if (0 !== i) {
      var r = this.times;
      for (let e = 0, t = r.length; e !== t; ++e) r[e] += i;
    }
    return this;
  }
  scale(i) {
    if (1 !== i) {
      var r = this.times;
      for (let e = 0, t = r.length; e !== t; ++e) r[e] *= i;
    }
    return this;
  }
  trim(e, t) {
    var i,
      r = this.times,
      n = r.length;
    let a = 0,
      s = n - 1;
    for (; a !== n && r[a] < e; ) ++a;
    for (; -1 !== s && r[s] > t; ) --s;
    return (
      ++s,
      (0 === a && s === n) ||
        (a >= s && ((s = Math.max(s, 1)), (a = s - 1)),
        (i = this.getValueSize()),
        (this.times = r.slice(a, s)),
        (this.values = this.values.slice(a * i, s * i))),
      this
    );
  }
  validate() {
    let i = !0;
    var e = this.getValueSize(),
      t =
        (e - Math.floor(e) != 0 &&
          (console.error(
            "THREE.KeyframeTrack: Invalid value size in track.",
            this
          ),
          (i = !1)),
        this.times),
      r = this.values,
      n = t.length;
    0 === n &&
      (console.error("THREE.KeyframeTrack: Track is empty.", this), (i = !1));
    let a = null;
    for (let e = 0; e !== n; e++) {
      var s = t[e];
      if ("number" == typeof s && isNaN(s)) {
        console.error(
          "THREE.KeyframeTrack: Time is not a valid number.",
          this,
          e,
          s
        ),
          (i = !1);
        break;
      }
      if (null !== a && a > s) {
        console.error("THREE.KeyframeTrack: Out of order keys.", this, e, s, a),
          (i = !1);
        break;
      }
      a = s;
    }
    if (void 0 !== r && isTypedArray(r))
      for (let e = 0, t = r.length; e !== t; ++e) {
        var o = r[e];
        if (isNaN(o)) {
          console.error(
            "THREE.KeyframeTrack: Value is not a valid number.",
            this,
            e,
            o
          ),
            (i = !1);
          break;
        }
      }
    return i;
  }
  optimize() {
    var i = this.times.slice(),
      r = this.values.slice(),
      n = this.getValueSize(),
      a = this.getInterpolation() === InterpolateSmooth,
      s = i.length - 1;
    let o = 1;
    for (let e = 1; e < s; ++e) {
      let t = !1;
      var l = i[e];
      if (l !== i[e + 1] && (1 !== e || l !== i[0]))
        if (a) t = !0;
        else {
          var h = e * n,
            c = h - n,
            d = h + n;
          for (let e = 0; e !== n; ++e) {
            var u = r[h + e];
            if (u !== r[c + e] || u !== r[d + e]) {
              t = !0;
              break;
            }
          }
        }
      if (t) {
        if (e !== o) {
          i[o] = i[e];
          var p = e * n,
            m = o * n;
          for (let e = 0; e !== n; ++e) r[m + e] = r[p + e];
        }
        ++o;
      }
    }
    if (0 < s) {
      i[o] = i[s];
      for (let e = s * n, t = o * n, i = 0; i !== n; ++i) r[t + i] = r[e + i];
      ++o;
    }
    return (
      o !== i.length
        ? ((this.times = i.slice(0, o)), (this.values = r.slice(0, o * n)))
        : ((this.times = i), (this.values = r)),
      this
    );
  }
  clone() {
    var e = this.times.slice(),
      t = this.values.slice(),
      e = new this.constructor(this.name, e, t);
    return (e.createInterpolant = this.createInterpolant), e;
  }
}
(KeyframeTrack.prototype.TimeBufferType = Float32Array),
  (KeyframeTrack.prototype.ValueBufferType = Float32Array),
  (KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear);
class BooleanKeyframeTrack extends KeyframeTrack {}
(BooleanKeyframeTrack.prototype.ValueTypeName = "bool"),
  (BooleanKeyframeTrack.prototype.ValueBufferType = Array),
  (BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete),
  (BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0),
  (BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0);
class ColorKeyframeTrack extends KeyframeTrack {}
ColorKeyframeTrack.prototype.ValueTypeName = "color";
class NumberKeyframeTrack extends KeyframeTrack {}
NumberKeyframeTrack.prototype.ValueTypeName = "number";
class QuaternionLinearInterpolant extends Interpolant {
  constructor(e, t, i, r) {
    super(e, t, i, r);
  }
  interpolate_(e, t, i, r) {
    var n = this.resultBuffer,
      a = this.sampleValues,
      s = this.valueSize,
      o = (i - t) / (r - t);
    let l = e * s;
    for (var h = l + s; l !== h; l += 4)
      Quaternion.slerpFlat(n, 0, a, l - s, a, l, o);
    return n;
  }
}
class QuaternionKeyframeTrack extends KeyframeTrack {
  InterpolantFactoryMethodLinear(e) {
    return new QuaternionLinearInterpolant(
      this.times,
      this.values,
      this.getValueSize(),
      e
    );
  }
}
(QuaternionKeyframeTrack.prototype.ValueTypeName = "quaternion"),
  (QuaternionKeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear),
  (QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0);
class StringKeyframeTrack extends KeyframeTrack {}
(StringKeyframeTrack.prototype.ValueTypeName = "string"),
  (StringKeyframeTrack.prototype.ValueBufferType = Array),
  (StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete),
  (StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0),
  (StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0);
class VectorKeyframeTrack extends KeyframeTrack {}
class AnimationClip {
  constructor(e = "", t = -1, i = [], r = NormalAnimationBlendMode) {
    (this.name = e),
      (this.tracks = i),
      (this.duration = t),
      (this.blendMode = r),
      (this.uuid = generateUUID()),
      this.duration < 0 && this.resetDuration();
  }
  static parse(e) {
    var i = [],
      r = e.tracks,
      n = 1 / (e.fps || 1);
    for (let e = 0, t = r.length; e !== t; ++e)
      i.push(parseKeyframeTrack(r[e]).scale(n));
    var t = new this(e.name, e.duration, i, e.blendMode);
    return (t.uuid = e.uuid), t;
  }
  static toJSON(e) {
    var i = [],
      r = e.tracks,
      e = {
        name: e.name,
        duration: e.duration,
        tracks: i,
        uuid: e.uuid,
        blendMode: e.blendMode,
      };
    for (let e = 0, t = r.length; e !== t; ++e)
      i.push(KeyframeTrack.toJSON(r[e]));
    return e;
  }
  static CreateFromMorphTargetSequence(e, r, n, a) {
    var s = r.length,
      o = [];
    for (let i = 0; i < s; i++) {
      let e = [],
        t = [];
      e.push((i + s - 1) % s, i, (i + 1) % s), t.push(0, 1, 0);
      var l = getKeyframeOrder(e);
      (e = sortedArray(e, 1, l)),
        (t = sortedArray(t, 1, l)),
        a || 0 !== e[0] || (e.push(s), t.push(t[0])),
        o.push(
          new NumberKeyframeTrack(
            ".morphTargetInfluences[" + r[i].name + "]",
            e,
            t
          ).scale(1 / n)
        );
    }
    return new this(e, -1, o);
  }
  static findByName(e, t) {
    let i = e;
    Array.isArray(e) ||
      (i = (e.geometry && e.geometry.animations) || e.animations);
    for (let e = 0; e < i.length; e++) if (i[e].name === t) return i[e];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(i, e, t) {
    var r = {},
      n = /^([\w-]*?)([\d]+)$/;
    for (let e = 0, t = i.length; e < t; e++) {
      var a = i[e],
        s = a.name.match(n);
      if (s && 1 < s.length) {
        s = s[1];
        let e = r[s];
        e || (r[s] = e = []), e.push(a);
      }
    }
    var o,
      l = [];
    for (o in r) l.push(this.CreateFromMorphTargetSequence(o, r[o], e, t));
    return l;
  }
  static parseAnimation(e, t) {
    if (!e)
      return (
        console.error("THREE.AnimationClip: No animation in JSONLoader data."),
        null
      );
    function i(e, t, i, r, n) {
      var a;
      0 !== i.length &&
        (flattenJSON(i, (i = []), (a = []), r), 0 !== i.length) &&
        n.push(new e(t, i, a));
    }
    var r = [],
      n = e.name || "default",
      a = e.fps || 30,
      s = e.blendMode;
    let o = e.length || -1;
    var l = e.hierarchy || [];
    for (let e = 0; e < l.length; e++) {
      var h = l[e].keys;
      if (h && 0 !== h.length)
        if (h[0].morphTargets) {
          var c,
            d = {};
          let t;
          for (t = 0; t < h.length; t++)
            if (h[t].morphTargets)
              for (let e = 0; e < h[t].morphTargets.length; e++)
                d[h[t].morphTargets[e]] = -1;
          for (c in d) {
            var u = [],
              p = [];
            for (let e = 0; e !== h[t].morphTargets.length; ++e) {
              var m = h[t];
              u.push(m.time), p.push(m.morphTarget === c ? 1 : 0);
            }
            r.push(
              new NumberKeyframeTrack(".morphTargetInfluence[" + c + "]", u, p)
            );
          }
          o = d.length * a;
        } else {
          var f = ".bones[" + t[e].name + "]";
          i(VectorKeyframeTrack, f + ".position", h, "pos", r),
            i(QuaternionKeyframeTrack, f + ".quaternion", h, "rot", r),
            i(VectorKeyframeTrack, f + ".scale", h, "scl", r);
        }
    }
    return 0 === r.length ? null : new this(n, o, r, s);
  }
  resetDuration() {
    let i = 0;
    for (let e = 0, t = this.tracks.length; e !== t; ++e) {
      var r = this.tracks[e];
      i = Math.max(i, r.times[r.times.length - 1]);
    }
    return (this.duration = i), this;
  }
  trim() {
    for (let e = 0; e < this.tracks.length; e++)
      this.tracks[e].trim(0, this.duration);
    return this;
  }
  validate() {
    let t = !0;
    for (let e = 0; e < this.tracks.length; e++)
      t = t && this.tracks[e].validate();
    return t;
  }
  optimize() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].optimize();
    return this;
  }
  clone() {
    var t = [];
    for (let e = 0; e < this.tracks.length; e++) t.push(this.tracks[e].clone());
    return new this.constructor(this.name, this.duration, t, this.blendMode);
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
function getTrackTypeForValueTypeName(e) {
  switch (e.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return NumberKeyframeTrack;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return VectorKeyframeTrack;
    case "color":
      return ColorKeyframeTrack;
    case "quaternion":
      return QuaternionKeyframeTrack;
    case "bool":
    case "boolean":
      return BooleanKeyframeTrack;
    case "string":
      return StringKeyframeTrack;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + e);
}
function parseKeyframeTrack(e) {
  if (void 0 === e.type)
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  var t,
    i,
    r = getTrackTypeForValueTypeName(e.type);
  return (
    void 0 === e.times &&
      (flattenJSON(e.keys, (t = []), (i = []), "value"),
      (e.times = t),
      (e.values = i)),
    void 0 !== r.parse
      ? r.parse(e)
      : new r(e.name, e.times, e.values, e.interpolation)
  );
}
let Cache = {
  enabled: !(VectorKeyframeTrack.prototype.ValueTypeName = "vector"),
  files: {},
  add: function (e, t) {
    !1 !== this.enabled && (this.files[e] = t);
  },
  get: function (e) {
    if (!1 !== this.enabled) return this.files[e];
  },
  remove: function (e) {
    delete this.files[e];
  },
  clear: function () {
    this.files = {};
  },
};
class LoadingManager {
  constructor(e, t, i) {
    let r = this,
      n = !1,
      a = 0,
      s = 0,
      o = void 0,
      l = [];
    (this.onStart = void 0),
      (this.onLoad = e),
      (this.onProgress = t),
      (this.onError = i),
      (this.itemStart = function (e) {
        s++, !1 === n && void 0 !== r.onStart && r.onStart(e, a, s), (n = !0);
      }),
      (this.itemEnd = function (e) {
        a++,
          void 0 !== r.onProgress && r.onProgress(e, a, s),
          a === s && ((n = !1), void 0 !== r.onLoad) && r.onLoad();
      }),
      (this.itemError = function (e) {
        void 0 !== r.onError && r.onError(e);
      }),
      (this.resolveURL = function (e) {
        return o ? o(e) : e;
      }),
      (this.setURLModifier = function (e) {
        return (o = e), this;
      }),
      (this.addHandler = function (e, t) {
        return l.push(e, t), this;
      }),
      (this.removeHandler = function (e) {
        e = l.indexOf(e);
        return -1 !== e && l.splice(e, 2), this;
      }),
      (this.getHandler = function (i) {
        for (let e = 0, t = l.length; e < t; e += 2) {
          var r = l[e],
            n = l[e + 1];
          if ((r.global && (r.lastIndex = 0), r.test(i))) return n;
        }
        return null;
      });
  }
}
let DefaultLoadingManager = new LoadingManager();
class Loader {
  constructor(e) {
    (this.manager = void 0 !== e ? e : DefaultLoadingManager),
      (this.crossOrigin = "anonymous"),
      (this.withCredentials = !1),
      (this.path = ""),
      (this.resourcePath = ""),
      (this.requestHeader = {});
  }
  load() {}
  loadAsync(i, r) {
    let n = this;
    return new Promise(function (e, t) {
      n.load(i, e, r, t);
    });
  }
  parse() {}
  setCrossOrigin(e) {
    return (this.crossOrigin = e), this;
  }
  setWithCredentials(e) {
    return (this.withCredentials = e), this;
  }
  setPath(e) {
    return (this.path = e), this;
  }
  setResourcePath(e) {
    return (this.resourcePath = e), this;
  }
  setRequestHeader(e) {
    return (this.requestHeader = e), this;
  }
}
Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
let loading = {};
class HttpError extends Error {
  constructor(e, t) {
    super(e), (this.response = t);
  }
}
class FileLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(h, e, i, n) {
    void 0 === h && (h = ""),
      void 0 !== this.path && (h = this.path + h),
      (h = this.manager.resolveURL(h));
    let t = Cache.get(h);
    if (void 0 !== t)
      return (
        this.manager.itemStart(h),
        setTimeout(() => {
          e && e(t), this.manager.itemEnd(h);
        }, 0),
        t
      );
    if (void 0 !== loading[h])
      loading[h].push({ onLoad: e, onProgress: i, onError: n });
    else {
      (loading[h] = []),
        loading[h].push({ onLoad: e, onProgress: i, onError: n });
      i = new Request(h, {
        headers: new Headers(this.requestHeader),
        credentials: this.withCredentials ? "include" : "same-origin",
      });
      let r = this.mimeType,
        t = this.responseType;
      fetch(i)
        .then((t) => {
          if (200 !== t.status && 0 !== t.status)
            throw new HttpError(
              `fetch for "${t.url}" responded with ${t.status}: ` +
                t.statusText,
              t
            );
          {
            if (
              (0 === t.status &&
                console.warn("THREE.FileLoader: HTTP Status 0 received."),
              "undefined" == typeof ReadableStream ||
                void 0 === t.body ||
                void 0 === t.body.getReader)
            )
              return t;
            let a = loading[h],
              e = t.body.getReader();
            t = t.headers.get("X-File-Size") || t.headers.get("Content-Length");
            let s = t ? parseInt(t) : 0,
              o = 0 !== s,
              l = 0;
            t = new ReadableStream({
              start(n) {
                !(function r() {
                  e.read().then(({ done: e, value: t }) => {
                    if (e) n.close();
                    else {
                      l += t.byteLength;
                      let i = new ProgressEvent("progress", {
                        lengthComputable: o,
                        loaded: l,
                        total: s,
                      });
                      for (let t = 0, e = a.length; t < e; t++) {
                        let e = a[t];
                        e.onProgress && e.onProgress(i);
                      }
                      n.enqueue(t), r();
                    }
                  });
                })();
              },
            });
            return new Response(t);
          }
        })
        .then((e) => {
          switch (t) {
            case "arraybuffer":
              return e.arrayBuffer();
            case "blob":
              return e.blob();
            case "document":
              return e
                .text()
                .then((e) => new DOMParser().parseFromString(e, r));
            case "json":
              return e.json();
            default:
              if (void 0 === r) return e.text();
              {
                var i = /charset="?([^;"\s]*)"?/i.exec(r),
                  i = i && i[1] ? i[1].toLowerCase() : void 0;
                let t = new TextDecoder(i);
                return e.arrayBuffer().then((e) => t.decode(e));
              }
          }
        })
        .then((i) => {
          Cache.add(h, i);
          var r = loading[h];
          delete loading[h];
          for (let e = 0, t = r.length; e < t; e++) {
            var n = r[e];
            n.onLoad && n.onLoad(i);
          }
        })
        .catch((i) => {
          var r = loading[h];
          if (void 0 === r) throw (this.manager.itemError(h), i);
          delete loading[h];
          for (let e = 0, t = r.length; e < t; e++) {
            var n = r[e];
            n.onError && n.onError(i);
          }
          this.manager.itemError(h);
        })
        .finally(() => {
          this.manager.itemEnd(h);
        }),
        this.manager.itemStart(h);
    }
  }
  setResponseType(e) {
    return (this.responseType = e), this;
  }
  setMimeType(e) {
    return (this.mimeType = e), this;
  }
}
class ImageLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(t, e, i, r) {
    void 0 !== this.path && (t = this.path + t),
      (t = this.manager.resolveURL(t));
    let n = this,
      a = Cache.get(t);
    if (void 0 !== a)
      return (
        n.manager.itemStart(t),
        setTimeout(function () {
          e && e(a), n.manager.itemEnd(t);
        }, 0),
        a
      );
    let s = createElementNS("img");
    function o() {
      h(), Cache.add(t, this), e && e(this), n.manager.itemEnd(t);
    }
    function l(e) {
      h(), r && r(e), n.manager.itemError(t), n.manager.itemEnd(t);
    }
    function h() {
      s.removeEventListener("load", o, !1),
        s.removeEventListener("error", l, !1);
    }
    return (
      s.addEventListener("load", o, !1),
      s.addEventListener("error", l, !1),
      "data:" !== t.slice(0, 5) &&
        void 0 !== this.crossOrigin &&
        (s.crossOrigin = this.crossOrigin),
      n.manager.itemStart(t),
      (s.src = t),
      s
    );
  }
}
class TextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, i, r) {
    let n = new Texture();
    var a = new ImageLoader(this.manager);
    return (
      a.setCrossOrigin(this.crossOrigin),
      a.setPath(this.path),
      a.load(
        e,
        function (e) {
          (n.image = e), (n.needsUpdate = !0), void 0 !== t && t(n);
        },
        i,
        r
      ),
      n
    );
  }
}
class Light extends Object3D {
  constructor(e, t = 1) {
    super(),
      (this.isLight = !0),
      (this.type = "Light"),
      (this.color = new Color(e)),
      (this.intensity = t);
  }
  dispose() {}
  copy(e, t) {
    return (
      super.copy(e, t),
      this.color.copy(e.color),
      (this.intensity = e.intensity),
      this
    );
  }
  toJSON(e) {
    e = super.toJSON(e);
    return (
      (e.object.color = this.color.getHex()),
      (e.object.intensity = this.intensity),
      void 0 !== this.groundColor &&
        (e.object.groundColor = this.groundColor.getHex()),
      void 0 !== this.distance && (e.object.distance = this.distance),
      void 0 !== this.angle && (e.object.angle = this.angle),
      void 0 !== this.decay && (e.object.decay = this.decay),
      void 0 !== this.penumbra && (e.object.penumbra = this.penumbra),
      void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()),
      e
    );
  }
}
let _projScreenMatrix$1 = new Matrix4(),
  _lightPositionWorld$1 = new Vector3(),
  _lookTarget$1 = new Vector3();
class LightShadow {
  constructor(e) {
    (this.camera = e),
      (this.bias = 0),
      (this.normalBias = 0),
      (this.radius = 1),
      (this.blurSamples = 8),
      (this.mapSize = new Vector2(512, 512)),
      (this.map = null),
      (this.mapPass = null),
      (this.matrix = new Matrix4()),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this._frustum = new Frustum()),
      (this._frameExtents = new Vector2(1, 1)),
      (this._viewportCount = 1),
      (this._viewports = [new Vector4(0, 0, 1, 1)]);
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    var t = this.camera,
      i = this.matrix;
    _lightPositionWorld$1.setFromMatrixPosition(e.matrixWorld),
      t.position.copy(_lightPositionWorld$1),
      _lookTarget$1.setFromMatrixPosition(e.target.matrixWorld),
      t.lookAt(_lookTarget$1),
      t.updateMatrixWorld(),
      _projScreenMatrix$1.multiplyMatrices(
        t.projectionMatrix,
        t.matrixWorldInverse
      ),
      this._frustum.setFromProjectionMatrix(_projScreenMatrix$1),
      i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
      i.multiply(_projScreenMatrix$1);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return (
      (this.camera = e.camera.clone()),
      (this.bias = e.bias),
      (this.radius = e.radius),
      this.mapSize.copy(e.mapSize),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    var e = {};
    return (
      0 !== this.bias && (e.bias = this.bias),
      0 !== this.normalBias && (e.normalBias = this.normalBias),
      1 !== this.radius && (e.radius = this.radius),
      (512 === this.mapSize.x && 512 === this.mapSize.y) ||
        (e.mapSize = this.mapSize.toArray()),
      (e.camera = this.camera.toJSON(!1).object),
      delete e.camera.matrix,
      e
    );
  }
}
class SpotLightShadow extends LightShadow {
  constructor() {
    super(new PerspectiveCamera(50, 1, 0.5, 500)),
      (this.isSpotLightShadow = !0),
      (this.focus = 1);
  }
  updateMatrices(e) {
    var t = this.camera,
      i = 2 * RAD2DEG * e.angle * this.focus,
      r = this.mapSize.width / this.mapSize.height,
      n = e.distance || t.far;
    (i === t.fov && r === t.aspect && n === t.far) ||
      ((t.fov = i), (t.aspect = r), (t.far = n), t.updateProjectionMatrix()),
      super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), (this.focus = e.focus), this;
  }
}
class SpotLight extends Light {
  constructor(e, t, i = 0, r = Math.PI / 3, n = 0, a = 2) {
    super(e, t),
      (this.isSpotLight = !0),
      (this.type = "SpotLight"),
      this.position.copy(Object3D.DEFAULT_UP),
      this.updateMatrix(),
      (this.target = new Object3D()),
      (this.distance = i),
      (this.angle = r),
      (this.penumbra = n),
      (this.decay = a),
      (this.map = null),
      (this.shadow = new SpotLightShadow());
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.distance = e.distance),
      (this.angle = e.angle),
      (this.penumbra = e.penumbra),
      (this.decay = e.decay),
      (this.target = e.target.clone()),
      (this.shadow = e.shadow.clone()),
      this
    );
  }
}
let _projScreenMatrix = new Matrix4(),
  _lightPositionWorld = new Vector3(),
  _lookTarget = new Vector3();
class PointLightShadow extends LightShadow {
  constructor() {
    super(new PerspectiveCamera(90, 1, 0.5, 500)),
      (this.isPointLightShadow = !0),
      (this._frameExtents = new Vector2(4, 2)),
      (this._viewportCount = 6),
      (this._viewports = [
        new Vector4(2, 1, 1, 1),
        new Vector4(0, 1, 1, 1),
        new Vector4(3, 1, 1, 1),
        new Vector4(1, 1, 1, 1),
        new Vector4(3, 0, 1, 1),
        new Vector4(1, 0, 1, 1),
      ]),
      (this._cubeDirections = [
        new Vector3(1, 0, 0),
        new Vector3(-1, 0, 0),
        new Vector3(0, 0, 1),
        new Vector3(0, 0, -1),
        new Vector3(0, 1, 0),
        new Vector3(0, -1, 0),
      ]),
      (this._cubeUps = [
        new Vector3(0, 1, 0),
        new Vector3(0, 1, 0),
        new Vector3(0, 1, 0),
        new Vector3(0, 1, 0),
        new Vector3(0, 0, 1),
        new Vector3(0, 0, -1),
      ]);
  }
  updateMatrices(e, t = 0) {
    var i = this.camera,
      r = this.matrix,
      n = e.distance || i.far;
    n !== i.far && ((i.far = n), i.updateProjectionMatrix()),
      _lightPositionWorld.setFromMatrixPosition(e.matrixWorld),
      i.position.copy(_lightPositionWorld),
      _lookTarget.copy(i.position),
      _lookTarget.add(this._cubeDirections[t]),
      i.up.copy(this._cubeUps[t]),
      i.lookAt(_lookTarget),
      i.updateMatrixWorld(),
      r.makeTranslation(
        -_lightPositionWorld.x,
        -_lightPositionWorld.y,
        -_lightPositionWorld.z
      ),
      _projScreenMatrix.multiplyMatrices(
        i.projectionMatrix,
        i.matrixWorldInverse
      ),
      this._frustum.setFromProjectionMatrix(_projScreenMatrix);
  }
}
class PointLight extends Light {
  constructor(e, t, i = 0, r = 2) {
    super(e, t),
      (this.isPointLight = !0),
      (this.type = "PointLight"),
      (this.distance = i),
      (this.decay = r),
      (this.shadow = new PointLightShadow());
  }
  get power() {
    return 4 * this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.distance = e.distance),
      (this.decay = e.decay),
      (this.shadow = e.shadow.clone()),
      this
    );
  }
}
class DirectionalLightShadow extends LightShadow {
  constructor() {
    super(new OrthographicCamera(-5, 5, 5, -5, 0.5, 500)),
      (this.isDirectionalLightShadow = !0);
  }
}
class DirectionalLight extends Light {
  constructor(e, t) {
    super(e, t),
      (this.isDirectionalLight = !0),
      (this.type = "DirectionalLight"),
      this.position.copy(Object3D.DEFAULT_UP),
      this.updateMatrix(),
      (this.target = new Object3D()),
      (this.shadow = new DirectionalLightShadow());
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return (
      super.copy(e),
      (this.target = e.target.clone()),
      (this.shadow = e.shadow.clone()),
      this
    );
  }
}
class LoaderUtils {
  static decodeText(i) {
    if ("undefined" != typeof TextDecoder) return new TextDecoder().decode(i);
    let r = "";
    for (let e = 0, t = i.length; e < t; e++) r += String.fromCharCode(i[e]);
    try {
      return decodeURIComponent(escape(r));
    } catch (e) {
      return r;
    }
  }
  static extractUrlBase(e) {
    var t = e.lastIndexOf("/");
    return -1 === t ? "./" : e.slice(0, t + 1);
  }
  static resolveURL(e, t) {
    return "string" != typeof e || "" === e
      ? ""
      : (/^https?:\/\//i.test(t) &&
          /^\//.test(e) &&
          (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")),
        /^(https?:)?\/\//i.test(e) ||
        /^data:.*,.*$/i.test(e) ||
        /^blob:.*$/i.test(e)
          ? e
          : t + e);
  }
}
class ImageBitmapLoader extends Loader {
  constructor(e) {
    super(e),
      (this.isImageBitmapLoader = !0),
      "undefined" == typeof createImageBitmap &&
        console.warn(
          "THREE.ImageBitmapLoader: createImageBitmap() not supported."
        ),
      "undefined" == typeof fetch &&
        console.warn("THREE.ImageBitmapLoader: fetch() not supported."),
      (this.options = { premultiplyAlpha: "none" });
  }
  setOptions(e) {
    return (this.options = e), this;
  }
  load(t, i, e, r) {
    void 0 === t && (t = ""),
      void 0 !== this.path && (t = this.path + t),
      (t = this.manager.resolveURL(t));
    let n = this,
      a = Cache.get(t);
    if (void 0 !== a)
      return (
        n.manager.itemStart(t),
        a.then
          ? void a
              .then((e) => {
                i && i(e), n.manager.itemEnd(t);
              })
              .catch((e) => {
                r && r(e);
              })
          : (setTimeout(function () {
              i && i(a), n.manager.itemEnd(t);
            }, 0),
            a)
      );
    var s = {},
      s =
        ((s.credentials =
          "anonymous" === this.crossOrigin ? "same-origin" : "include"),
        (s.headers = this.requestHeader),
        fetch(t, s)
          .then(function (e) {
            return e.blob();
          })
          .then(function (e) {
            return createImageBitmap(
              e,
              Object.assign(n.options, { colorSpaceConversion: "none" })
            );
          })
          .then(function (e) {
            return Cache.add(t, e), i && i(e), n.manager.itemEnd(t), e;
          })
          .catch(function (e) {
            r && r(e),
              Cache.remove(t),
              n.manager.itemError(t),
              n.manager.itemEnd(t);
          }));
    Cache.add(t, s), n.manager.itemStart(t);
  }
}
let _RESERVED_CHARS_RE = "\\[\\]\\.:\\/",
  _reservedRe = new RegExp("[" + _RESERVED_CHARS_RE + "]", "g"),
  _wordChar = "[^" + _RESERVED_CHARS_RE + "]",
  _wordCharOrDot = "[^" + _RESERVED_CHARS_RE.replace("\\.", "") + "]",
  _directoryRe = /((?:WC+[\/:])*)/.source.replace("WC", _wordChar),
  _nodeRe = /(WCOD+)?/.source.replace("WCOD", _wordCharOrDot),
  _objectRe = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", _wordChar),
  _propertyRe = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", _wordChar),
  _trackRe = new RegExp(
    "^" + _directoryRe + _nodeRe + _objectRe + _propertyRe + "$"
  ),
  _supportedObjectNames = ["material", "materials", "bones", "map"];
class Composite {
  constructor(e, t, i) {
    i = i || PropertyBinding.parseTrackName(t);
    (this._targetGroup = e), (this._bindings = e.subscribe_(t, i));
  }
  getValue(e, t) {
    this.bind();
    var i = this._targetGroup.nCachedObjects_,
      i = this._bindings[i];
    void 0 !== i && i.getValue(e, t);
  }
  setValue(i, r) {
    var n = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, t = n.length; e !== t; ++e)
      n[e].setValue(i, r);
  }
  bind() {
    var i = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, t = i.length; e !== t; ++e)
      i[e].bind();
  }
  unbind() {
    var i = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, t = i.length; e !== t; ++e)
      i[e].unbind();
  }
}
class PropertyBinding {
  constructor(e, t, i) {
    (this.path = t),
      (this.parsedPath = i || PropertyBinding.parseTrackName(t)),
      (this.node = PropertyBinding.findNode(e, this.parsedPath.nodeName)),
      (this.rootNode = e),
      (this.getValue = this._getValue_unbound),
      (this.setValue = this._setValue_unbound);
  }
  static create(e, t, i) {
    return new (
      e && e.isAnimationObjectGroup
        ? PropertyBinding.Composite
        : PropertyBinding
    )(e, t, i);
  }
  static sanitizeNodeName(e) {
    return e.replace(/\s/g, "_").replace(_reservedRe, "");
  }
  static parseTrackName(e) {
    var t = _trackRe.exec(e);
    if (null === t)
      throw new Error("PropertyBinding: Cannot parse trackName: " + e);
    var i,
      t = {
        nodeName: t[2],
        objectName: t[3],
        objectIndex: t[4],
        propertyName: t[5],
        propertyIndex: t[6],
      },
      r = t.nodeName && t.nodeName.lastIndexOf(".");
    if (
      (void 0 !== r &&
        -1 !== r &&
        ((i = t.nodeName.substring(r + 1)),
        -1 !== _supportedObjectNames.indexOf(i)) &&
        ((t.nodeName = t.nodeName.substring(0, r)), (t.objectName = i)),
      null === t.propertyName || 0 === t.propertyName.length)
    )
      throw new Error(
        "PropertyBinding: can not parse propertyName from trackName: " + e
      );
    return t;
  }
  static findNode(e, n) {
    if (
      void 0 === n ||
      "" === n ||
      "." === n ||
      -1 === n ||
      n === e.name ||
      n === e.uuid
    )
      return e;
    if (e.skeleton) {
      var t = e.skeleton.getBoneByName(n);
      if (void 0 !== t) return t;
    }
    if (e.children) {
      let r = function (t) {
        for (let e = 0; e < t.length; e++) {
          var i = t[e];
          if (i.name === n || i.uuid === n) return i;
          i = r(i.children);
          if (i) return i;
        }
        return null;
      };
      t = r(e.children);
      if (t) return t;
    }
    return null;
  }
  _getValue_unavailable() {}
  _setValue_unavailable() {}
  _getValue_direct(e, t) {
    e[t] = this.targetObject[this.propertyName];
  }
  _getValue_array(i, r) {
    var n = this.resolvedProperty;
    for (let e = 0, t = n.length; e !== t; ++e) i[r++] = n[e];
  }
  _getValue_arrayElement(e, t) {
    e[t] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(e, t) {
    this.resolvedProperty.toArray(e, t);
  }
  _setValue_direct(e, t) {
    this.targetObject[this.propertyName] = e[t];
  }
  _setValue_direct_setNeedsUpdate(e, t) {
    (this.targetObject[this.propertyName] = e[t]),
      (this.targetObject.needsUpdate = !0);
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
    (this.targetObject[this.propertyName] = e[t]),
      (this.targetObject.matrixWorldNeedsUpdate = !0);
  }
  _setValue_array(i, r) {
    var n = this.resolvedProperty;
    for (let e = 0, t = n.length; e !== t; ++e) n[e] = i[r++];
  }
  _setValue_array_setNeedsUpdate(i, r) {
    var n = this.resolvedProperty;
    for (let e = 0, t = n.length; e !== t; ++e) n[e] = i[r++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(i, r) {
    var n = this.resolvedProperty;
    for (let e = 0, t = n.length; e !== t; ++e) n[e] = i[r++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t];
  }
  _setValue_arrayElement_setNeedsUpdate(e, t) {
    (this.resolvedProperty[this.propertyIndex] = e[t]),
      (this.targetObject.needsUpdate = !0);
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
    (this.resolvedProperty[this.propertyIndex] = e[t]),
      (this.targetObject.matrixWorldNeedsUpdate = !0);
  }
  _setValue_fromArray(e, t) {
    this.resolvedProperty.fromArray(e, t);
  }
  _setValue_fromArray_setNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), (this.targetObject.needsUpdate = !0);
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t),
      (this.targetObject.matrixWorldNeedsUpdate = !0);
  }
  _getValue_unbound(e, t) {
    this.bind(), this.getValue(e, t);
  }
  _setValue_unbound(e, t) {
    this.bind(), this.setValue(e, t);
  }
  bind() {
    let i = this.node;
    var e = this.parsedPath,
      r = e.objectName,
      n = e.propertyName;
    let a = e.propertyIndex;
    if (
      (i ||
        ((i = PropertyBinding.findNode(this.rootNode, e.nodeName)),
        (this.node = i)),
      (this.getValue = this._getValue_unavailable),
      (this.setValue = this._setValue_unavailable),
      i)
    ) {
      if (r) {
        let t = e.objectIndex;
        switch (r) {
          case "materials":
            if (!i.material)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
                this
              );
            if (!i.material.materials)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
                this
              );
            i = i.material.materials;
            break;
          case "bones":
            if (!i.skeleton)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",
                this
              );
            i = i.skeleton.bones;
            for (let e = 0; e < i.length; e++)
              if (i[e].name === t) {
                t = e;
                break;
              }
            break;
          case "map":
            if ("map" in i) i = i.map;
            else {
              if (!i.material)
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
                  this
                );
              if (!i.material.map)
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",
                  this
                );
              i = i.material.map;
            }
            break;
          default:
            if (void 0 === i[r])
              return void console.error(
                "THREE.PropertyBinding: Can not bind to objectName of node undefined.",
                this
              );
            i = i[r];
        }
        if (void 0 !== t) {
          if (void 0 === i[t])
            return void console.error(
              "THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",
              this,
              i
            );
          i = i[t];
        }
      }
      var s = i[n];
      if (void 0 === s)
        (e = e.nodeName),
          console.error(
            "THREE.PropertyBinding: Trying to update property for track: " +
              e +
              "." +
              n +
              " but it wasn't found.",
            i
          );
      else {
        let e = this.Versioning.None,
          t =
            (void 0 !== (this.targetObject = i).needsUpdate
              ? (e = this.Versioning.NeedsUpdate)
              : void 0 !== i.matrixWorldNeedsUpdate &&
                (e = this.Versioning.MatrixWorldNeedsUpdate),
            this.BindingType.Direct);
        if (void 0 !== a) {
          if ("morphTargetInfluences" === n) {
            if (!i.geometry)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",
                this
              );
            if (!i.geometry.morphAttributes)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",
                this
              );
            void 0 !== i.morphTargetDictionary[a] &&
              (a = i.morphTargetDictionary[a]);
          }
          (t = this.BindingType.ArrayElement),
            (this.resolvedProperty = s),
            (this.propertyIndex = a);
        } else
          void 0 !== s.fromArray && void 0 !== s.toArray
            ? ((t = this.BindingType.HasFromToArray),
              (this.resolvedProperty = s))
            : Array.isArray(s)
            ? ((t = this.BindingType.EntireArray), (this.resolvedProperty = s))
            : (this.propertyName = n);
        (this.getValue = this.GetterByBindingType[t]),
          (this.setValue = this.SetterByBindingTypeAndVersioning[t][e]);
      }
    } else
      console.warn(
        "THREE.PropertyBinding: No target node found for track: " +
          this.path +
          "."
      );
  }
  unbind() {
    (this.node = null),
      (this.getValue = this._getValue_unbound),
      (this.setValue = this._setValue_unbound);
  }
}
function toTrianglesDrawMode(e, i) {
  if (i === TrianglesDrawMode)
    return (
      console.warn(
        "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."
      ),
      e
    );
  if (i !== TriangleFanDrawMode && i !== TriangleStripDrawMode)
    return (
      console.error(
        "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",
        i
      ),
      e
    );
  {
    let t = e.getIndex();
    if (null === t) {
      var r = [],
        n = e.getAttribute("position");
      if (void 0 === n)
        return (
          console.error(
            "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."
          ),
          e
        );
      for (let e = 0; e < n.count; e++) r.push(e);
      e.setIndex(r), (t = e.getIndex());
    }
    var a = t.count - 2,
      s = [];
    if (i === TriangleFanDrawMode)
      for (let e = 1; e <= a; e++)
        s.push(t.getX(0)), s.push(t.getX(e)), s.push(t.getX(e + 1));
    else
      for (let e = 0; e < a; e++)
        e % 2 == 0
          ? (s.push(t.getX(e)), s.push(t.getX(e + 1)), s.push(t.getX(e + 2)))
          : (s.push(t.getX(e + 2)), s.push(t.getX(e + 1)), s.push(t.getX(e)));
    s.length / 3 != a &&
      console.error(
        "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."
      );
    i = e.clone();
    return i.setIndex(s), i.clearGroups(), i;
  }
}
(PropertyBinding.Composite = Composite),
  (PropertyBinding.prototype.BindingType = {
    Direct: 0,
    EntireArray: 1,
    ArrayElement: 2,
    HasFromToArray: 3,
  }),
  (PropertyBinding.prototype.Versioning = {
    None: 0,
    NeedsUpdate: 1,
    MatrixWorldNeedsUpdate: 2,
  }),
  (PropertyBinding.prototype.GetterByBindingType = [
    PropertyBinding.prototype._getValue_direct,
    PropertyBinding.prototype._getValue_array,
    PropertyBinding.prototype._getValue_arrayElement,
    PropertyBinding.prototype._getValue_toArray,
  ]),
  (PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [
    [
      PropertyBinding.prototype._setValue_direct,
      PropertyBinding.prototype._setValue_direct_setNeedsUpdate,
      PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate,
    ],
    [
      PropertyBinding.prototype._setValue_array,
      PropertyBinding.prototype._setValue_array_setNeedsUpdate,
      PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate,
    ],
    [
      PropertyBinding.prototype._setValue_arrayElement,
      PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,
      PropertyBinding.prototype
        ._setValue_arrayElement_setMatrixWorldNeedsUpdate,
    ],
    [
      PropertyBinding.prototype._setValue_fromArray,
      PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,
      PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate,
    ],
  ]),
  "undefined" != typeof __THREE_DEVTOOLS__ &&
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("register", { detail: { revision: REVISION } })
    ),
  "undefined" != typeof window &&
    (window.__THREE__
      ? console.warn("WARNING: Multiple instances of Three.js being imported.")
      : (window.__THREE__ = REVISION));
class GLTFLoader extends Loader {
  constructor(e) {
    super(e),
      (this.dracoLoader = null),
      (this.ktx2Loader = null),
      (this.meshoptDecoder = null),
      (this.pluginCallbacks = []),
      this.register(function (e) {
        return new GLTFMaterialsClearcoatExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsDispersionExtension(e);
      }),
      this.register(function (e) {
        return new GLTFTextureBasisUExtension(e);
      }),
      this.register(function (e) {
        return new GLTFTextureWebPExtension(e);
      }),
      this.register(function (e) {
        return new GLTFTextureAVIFExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsSheenExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsTransmissionExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsVolumeExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsIorExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsEmissiveStrengthExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsSpecularExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsIridescenceExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsAnisotropyExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMaterialsBumpExtension(e);
      }),
      this.register(function (e) {
        return new GLTFLightsExtension(e);
      }),
      this.register(function (e) {
        return new GLTFMeshoptCompression(e);
      }),
      this.register(function (e) {
        return new GLTFMeshGpuInstancing(e);
      });
  }
  load(t, i, e, r) {
    let n = this,
      a;
    (a =
      "" !== this.resourcePath
        ? this.resourcePath
        : "" !== this.path
        ? ((o = LoaderUtils.extractUrlBase(t)),
          LoaderUtils.resolveURL(o, this.path))
        : LoaderUtils.extractUrlBase(t)),
      this.manager.itemStart(t);
    function s(e) {
      r ? r(e) : console.error(e), n.manager.itemError(t), n.manager.itemEnd(t);
    }
    var o = new FileLoader(this.manager);
    o.setPath(this.path),
      o.setResponseType("arraybuffer"),
      o.setRequestHeader(this.requestHeader),
      o.setWithCredentials(this.withCredentials),
      o.load(
        t,
        function (e) {
          try {
            n.parse(
              e,
              a,
              function (e) {
                i(e), n.manager.itemEnd(t);
              },
              s
            );
          } catch (e) {
            s(e);
          }
        },
        e,
        s
      );
  }
  setDRACOLoader(e) {
    return (this.dracoLoader = e), this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(e) {
    return (this.ktx2Loader = e), this;
  }
  setMeshoptDecoder(e) {
    return (this.meshoptDecoder = e), this;
  }
  register(e) {
    return (
      -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e),
      this
    );
  }
  unregister(e) {
    return (
      -1 !== this.pluginCallbacks.indexOf(e) &&
        this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
      this
    );
  }
  parse(e, t, i, r) {
    let n;
    var a = {},
      s = {},
      o = new TextDecoder();
    if ("string" == typeof e) n = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (o.decode(new Uint8Array(e, 0, 4)) === BINARY_EXTENSION_HEADER_MAGIC) {
        try {
          a[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(e);
        } catch (e) {
          return void (r && r(e));
        }
        n = JSON.parse(a[EXTENSIONS.KHR_BINARY_GLTF].content);
      } else n = JSON.parse(o.decode(e));
    else n = e;
    if (void 0 === n.asset || n.asset.version[0] < 2)
      r &&
        r(
          new Error(
            "THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."
          )
        );
    else {
      var l = new GLTFParser(n, {
        path: t || this.resourcePath || "",
        crossOrigin: this.crossOrigin,
        requestHeader: this.requestHeader,
        manager: this.manager,
        ktx2Loader: this.ktx2Loader,
        meshoptDecoder: this.meshoptDecoder,
      });
      l.fileLoader.setRequestHeader(this.requestHeader);
      for (let e = 0; e < this.pluginCallbacks.length; e++) {
        var h = this.pluginCallbacks[e](l);
        h.name ||
          console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),
          (a[(s[h.name] = h).name] = !0);
      }
      if (n.extensionsUsed)
        for (let e = 0; e < n.extensionsUsed.length; ++e) {
          var c = n.extensionsUsed[e],
            d = n.extensionsRequired || [];
          switch (c) {
            case EXTENSIONS.KHR_MATERIALS_UNLIT:
              a[c] = new GLTFMaterialsUnlitExtension();
              break;
            case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
              a[c] = new GLTFDracoMeshCompressionExtension(n, this.dracoLoader);
              break;
            case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
              a[c] = new GLTFTextureTransformExtension();
              break;
            case EXTENSIONS.KHR_MESH_QUANTIZATION:
              a[c] = new GLTFMeshQuantizationExtension();
              break;
            default:
              0 <= d.indexOf(c) &&
                void 0 === s[c] &&
                console.warn(
                  'THREE.GLTFLoader: Unknown extension "' + c + '".'
                );
          }
        }
      l.setExtensions(a), l.setPlugins(s), l.parse(i, r);
    }
  }
  parseAsync(i, r) {
    let n = this;
    return new Promise(function (e, t) {
      n.parse(i, r, e, t);
    });
  }
}
function GLTFRegistry() {
  let i = {};
  return {
    get: function (e) {
      return i[e];
    },
    add: function (e, t) {
      i[e] = t;
    },
    remove: function (e) {
      delete i[e];
    },
    removeAll: function () {
      i = {};
    },
  };
}
let EXTENSIONS = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing",
};
class GLTFLightsExtension {
  constructor(e) {
    (this.parser = e),
      (this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL),
      (this.cache = { refs: {}, uses: {} });
  }
  _markDefs() {
    var i = this.parser,
      r = this.parser.json.nodes || [];
    for (let e = 0, t = r.length; e < t; e++) {
      var n = r[e];
      n.extensions &&
        n.extensions[this.name] &&
        void 0 !== n.extensions[this.name].light &&
        i._addNodeRef(this.cache, n.extensions[this.name].light);
    }
  }
  _loadLight(t) {
    var i = this.parser,
      r = "light:" + t,
      n = i.cache.get(r);
    if (!n) {
      var a = i.json,
        s = (((a.extensions && a.extensions[this.name]) || {}).lights || [])[t];
      let e;
      var o = new Color(16777215),
        l =
          (void 0 !== s.color &&
            o.setRGB(s.color[0], s.color[1], s.color[2], LinearSRGBColorSpace),
          void 0 !== s.range ? s.range : 0);
      switch (s.type) {
        case "directional":
          (e = new DirectionalLight(o)).target.position.set(0, 0, -1),
            e.add(e.target);
          break;
        case "point":
          (e = new PointLight(o)).distance = l;
          break;
        case "spot":
          ((e = new SpotLight(o)).distance = l),
            (s.spot = s.spot || {}),
            (s.spot.innerConeAngle =
              void 0 !== s.spot.innerConeAngle ? s.spot.innerConeAngle : 0),
            (s.spot.outerConeAngle =
              void 0 !== s.spot.outerConeAngle
                ? s.spot.outerConeAngle
                : Math.PI / 4),
            (e.angle = s.spot.outerConeAngle),
            (e.penumbra = 1 - s.spot.innerConeAngle / s.spot.outerConeAngle),
            e.target.position.set(0, 0, -1),
            e.add(e.target);
          break;
        default:
          throw new Error("THREE.GLTFLoader: Unexpected light type: " + s.type);
      }
      e.position.set(0, 0, 0),
        (e.decay = 2),
        assignExtrasToUserData(e, s),
        void 0 !== s.intensity && (e.intensity = s.intensity),
        (e.name = i.createUniqueName(s.name || "light_" + t)),
        (n = Promise.resolve(e)),
        i.cache.add(r, n);
    }
    return n;
  }
  getDependency(e, t) {
    if ("light" === e) return this._loadLight(t);
  }
  createNodeAttachment(e) {
    let t = this,
      i = this.parser;
    e = i.json.nodes[e];
    let r = ((e.extensions && e.extensions[this.name]) || {}).light;
    return void 0 === r
      ? null
      : this._loadLight(r).then(function (e) {
          return i._getNodeRef(t.cache, r, e);
        });
  }
}
class GLTFMaterialsUnlitExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(e, t, i) {
    var r,
      n = [],
      t =
        ((e.color = new Color(1, 1, 1)),
        (e.opacity = 1),
        t.pbrMetallicRoughness);
    return (
      t &&
        (Array.isArray(t.baseColorFactor) &&
          ((r = t.baseColorFactor),
          e.color.setRGB(r[0], r[1], r[2], LinearSRGBColorSpace),
          (e.opacity = r[3])),
        void 0 !== t.baseColorTexture) &&
        n.push(i.assignTexture(e, "map", t.baseColorTexture, SRGBColorSpace)),
      Promise.all(n)
    );
  }
}
class GLTFMaterialsEmissiveStrengthExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH);
  }
  extendMaterialParams(e, t) {
    var e = this.parser.json.materials[e];
    return (
      e.extensions &&
        e.extensions[this.name] &&
        void 0 !== (e = e.extensions[this.name].emissiveStrength) &&
        (t.emissiveIntensity = e),
      Promise.resolve()
    );
  }
}
class GLTFMaterialsClearcoatExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var i,
      r = this.parser,
      e = r.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? ((i = []),
        void 0 !== (e = e.extensions[this.name]).clearcoatFactor &&
          (t.clearcoat = e.clearcoatFactor),
        void 0 !== e.clearcoatTexture &&
          i.push(r.assignTexture(t, "clearcoatMap", e.clearcoatTexture)),
        void 0 !== e.clearcoatRoughnessFactor &&
          (t.clearcoatRoughness = e.clearcoatRoughnessFactor),
        void 0 !== e.clearcoatRoughnessTexture &&
          i.push(
            r.assignTexture(
              t,
              "clearcoatRoughnessMap",
              e.clearcoatRoughnessTexture
            )
          ),
        void 0 !== e.clearcoatNormalTexture &&
          (i.push(
            r.assignTexture(t, "clearcoatNormalMap", e.clearcoatNormalTexture)
          ),
          void 0 !== e.clearcoatNormalTexture.scale) &&
          ((r = e.clearcoatNormalTexture.scale),
          (t.clearcoatNormalScale = new Vector2(r, r))),
        Promise.all(i))
      : Promise.resolve();
  }
}
class GLTFMaterialsDispersionExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_DISPERSION);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var e = this.parser.json.materials[e];
    return (
      e.extensions &&
        e.extensions[this.name] &&
        ((e = e.extensions[this.name]),
        (t.dispersion = void 0 !== e.dispersion ? e.dispersion : 0)),
      Promise.resolve()
    );
  }
}
class GLTFMaterialsIridescenceExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var i,
      r = this.parser,
      e = r.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? ((i = []),
        void 0 !== (e = e.extensions[this.name]).iridescenceFactor &&
          (t.iridescence = e.iridescenceFactor),
        void 0 !== e.iridescenceTexture &&
          i.push(r.assignTexture(t, "iridescenceMap", e.iridescenceTexture)),
        void 0 !== e.iridescenceIor && (t.iridescenceIOR = e.iridescenceIor),
        void 0 === t.iridescenceThicknessRange &&
          (t.iridescenceThicknessRange = [100, 400]),
        void 0 !== e.iridescenceThicknessMinimum &&
          (t.iridescenceThicknessRange[0] = e.iridescenceThicknessMinimum),
        void 0 !== e.iridescenceThicknessMaximum &&
          (t.iridescenceThicknessRange[1] = e.iridescenceThicknessMaximum),
        void 0 !== e.iridescenceThicknessTexture &&
          i.push(
            r.assignTexture(
              t,
              "iridescenceThicknessMap",
              e.iridescenceThicknessTexture
            )
          ),
        Promise.all(i))
      : Promise.resolve();
  }
}
class GLTFMaterialsSheenExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_SHEEN);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var i,
      r,
      n = this.parser,
      e = n.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? ((i = []),
        (t.sheenColor = new Color(0, 0, 0)),
        (t.sheenRoughness = 0),
        (t.sheen = 1),
        void 0 !== (e = e.extensions[this.name]).sheenColorFactor &&
          ((r = e.sheenColorFactor),
          t.sheenColor.setRGB(r[0], r[1], r[2], LinearSRGBColorSpace)),
        void 0 !== e.sheenRoughnessFactor &&
          (t.sheenRoughness = e.sheenRoughnessFactor),
        void 0 !== e.sheenColorTexture &&
          i.push(
            n.assignTexture(
              t,
              "sheenColorMap",
              e.sheenColorTexture,
              SRGBColorSpace
            )
          ),
        void 0 !== e.sheenRoughnessTexture &&
          i.push(
            n.assignTexture(t, "sheenRoughnessMap", e.sheenRoughnessTexture)
          ),
        Promise.all(i))
      : Promise.resolve();
  }
}
class GLTFMaterialsTransmissionExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var i,
      r = this.parser,
      e = r.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? ((i = []),
        void 0 !== (e = e.extensions[this.name]).transmissionFactor &&
          (t.transmission = e.transmissionFactor),
        void 0 !== e.transmissionTexture &&
          i.push(r.assignTexture(t, "transmissionMap", e.transmissionTexture)),
        Promise.all(i))
      : Promise.resolve();
  }
}
class GLTFMaterialsVolumeExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_VOLUME);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var i,
      r = this.parser,
      e = r.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? ((i = []),
        (e = e.extensions[this.name]),
        (t.thickness = void 0 !== e.thicknessFactor ? e.thicknessFactor : 0),
        void 0 !== e.thicknessTexture &&
          i.push(r.assignTexture(t, "thicknessMap", e.thicknessTexture)),
        (t.attenuationDistance = e.attenuationDistance || 1 / 0),
        (r = e.attenuationColor || [1, 1, 1]),
        (t.attenuationColor = new Color().setRGB(
          r[0],
          r[1],
          r[2],
          LinearSRGBColorSpace
        )),
        Promise.all(i))
      : Promise.resolve();
  }
}
class GLTFMaterialsIorExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_IOR);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var e = this.parser.json.materials[e];
    return (
      e.extensions &&
        e.extensions[this.name] &&
        ((e = e.extensions[this.name]),
        (t.ior = void 0 !== e.ior ? e.ior : 1.5)),
      Promise.resolve()
    );
  }
}
class GLTFMaterialsSpecularExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var i,
      r,
      n = this.parser,
      e = n.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? ((i = []),
        (e = e.extensions[this.name]),
        (t.specularIntensity =
          void 0 !== e.specularFactor ? e.specularFactor : 1),
        void 0 !== e.specularTexture &&
          i.push(n.assignTexture(t, "specularIntensityMap", e.specularTexture)),
        (r = e.specularColorFactor || [1, 1, 1]),
        (t.specularColor = new Color().setRGB(
          r[0],
          r[1],
          r[2],
          LinearSRGBColorSpace
        )),
        void 0 !== e.specularColorTexture &&
          i.push(
            n.assignTexture(
              t,
              "specularColorMap",
              e.specularColorTexture,
              SRGBColorSpace
            )
          ),
        Promise.all(i))
      : Promise.resolve();
  }
}
class GLTFMaterialsBumpExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.EXT_MATERIALS_BUMP);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var i,
      r = this.parser,
      e = r.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? ((i = []),
        (e = e.extensions[this.name]),
        (t.bumpScale = void 0 !== e.bumpFactor ? e.bumpFactor : 1),
        void 0 !== e.bumpTexture &&
          i.push(r.assignTexture(t, "bumpMap", e.bumpTexture)),
        Promise.all(i))
      : Promise.resolve();
  }
}
class GLTFMaterialsAnisotropyExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_MATERIALS_ANISOTROPY);
  }
  getMaterialType(e) {
    e = this.parser.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    var i,
      r = this.parser,
      e = r.json.materials[e];
    return e.extensions && e.extensions[this.name]
      ? ((i = []),
        void 0 !== (e = e.extensions[this.name]).anisotropyStrength &&
          (t.anisotropy = e.anisotropyStrength),
        void 0 !== e.anisotropyRotation &&
          (t.anisotropyRotation = e.anisotropyRotation),
        void 0 !== e.anisotropyTexture &&
          i.push(r.assignTexture(t, "anisotropyMap", e.anisotropyTexture)),
        Promise.all(i))
      : Promise.resolve();
  }
}
class GLTFTextureBasisUExtension {
  constructor(e) {
    (this.parser = e), (this.name = EXTENSIONS.KHR_TEXTURE_BASISU);
  }
  loadTexture(e) {
    var t = this.parser,
      i = t.json,
      r = i.textures[e];
    if (r.extensions && r.extensions[this.name]) {
      var r = r.extensions[this.name],
        n = t.options.ktx2Loader;
      if (n) return t.loadTextureImage(e, r.source, n);
      if (i.extensionsRequired && 0 <= i.extensionsRequired.indexOf(this.name))
        throw new Error(
          "THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures"
        );
    }
    return null;
  }
}
class GLTFTextureWebPExtension {
  constructor(e) {
    (this.parser = e),
      (this.name = EXTENSIONS.EXT_TEXTURE_WEBP),
      (this.isSupported = null);
  }
  loadTexture(t) {
    let i = this.name,
      r = this.parser,
      n = r.json;
    var e = n.textures[t];
    if (!e.extensions || !e.extensions[i]) return null;
    let a = e.extensions[i];
    var e = n.images[a.source];
    let s = r.textureLoader;
    return (
      e.uri && null !== (e = r.options.manager.getHandler(e.uri)) && (s = e),
      this.detectSupport().then(function (e) {
        if (e) return r.loadTextureImage(t, a.source, s);
        if (n.extensionsRequired && 0 <= n.extensionsRequired.indexOf(i))
          throw new Error(
            "THREE.GLTFLoader: WebP required by asset but unsupported."
          );
        return r.loadTexture(t);
      })
    );
  }
  detectSupport() {
    return (
      this.isSupported ||
        (this.isSupported = new Promise(function (e) {
          let t = new Image();
          (t.src =
            "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
            (t.onload = t.onerror =
              function () {
                e(1 === t.height);
              });
        })),
      this.isSupported
    );
  }
}
class GLTFTextureAVIFExtension {
  constructor(e) {
    (this.parser = e),
      (this.name = EXTENSIONS.EXT_TEXTURE_AVIF),
      (this.isSupported = null);
  }
  loadTexture(t) {
    let i = this.name,
      r = this.parser,
      n = r.json;
    var e = n.textures[t];
    if (!e.extensions || !e.extensions[i]) return null;
    let a = e.extensions[i];
    var e = n.images[a.source];
    let s = r.textureLoader;
    return (
      e.uri && null !== (e = r.options.manager.getHandler(e.uri)) && (s = e),
      this.detectSupport().then(function (e) {
        if (e) return r.loadTextureImage(t, a.source, s);
        if (n.extensionsRequired && 0 <= n.extensionsRequired.indexOf(i))
          throw new Error(
            "THREE.GLTFLoader: AVIF required by asset but unsupported."
          );
        return r.loadTexture(t);
      })
    );
  }
  detectSupport() {
    return (
      this.isSupported ||
        (this.isSupported = new Promise(function (e) {
          let t = new Image();
          (t.src =
            "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI="),
            (t.onload = t.onerror =
              function () {
                e(1 === t.height);
              });
        })),
      this.isSupported
    );
  }
}
class GLTFMeshoptCompression {
  constructor(e) {
    (this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION), (this.parser = e);
  }
  loadBufferView(e) {
    var t = this.parser.json,
      e = t.bufferViews[e];
    if (e.extensions && e.extensions[this.name]) {
      let s = e.extensions[this.name];
      e = this.parser.getDependency("buffer", s.buffer);
      let o = this.parser.options.meshoptDecoder;
      if (o && o.supported)
        return e.then(function (e) {
          var t = s.byteOffset || 0,
            i = s.byteLength || 0;
          let r = s.count,
            n = s.byteStride,
            a = new Uint8Array(e, t, i);
          return o.decodeGltfBufferAsync
            ? o
                .decodeGltfBufferAsync(r, n, a, s.mode, s.filter)
                .then(function (e) {
                  return e.buffer;
                })
            : o.ready.then(function () {
                var e = new ArrayBuffer(r * n);
                return (
                  o.decodeGltfBuffer(
                    new Uint8Array(e),
                    r,
                    n,
                    a,
                    s.mode,
                    s.filter
                  ),
                  e
                );
              });
        });
      if (t.extensionsRequired && 0 <= t.extensionsRequired.indexOf(this.name))
        throw new Error(
          "THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files"
        );
    }
    return null;
  }
}
class GLTFMeshGpuInstancing {
  constructor(e) {
    (this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING), (this.parser = e);
  }
  createNodeMesh(e) {
    var t,
      i = this.parser.json,
      r = i.nodes[e];
    if (!r.extensions || !r.extensions[this.name] || void 0 === r.mesh)
      return null;
    for (t of i.meshes[r.mesh].primitives)
      if (
        t.mode !== WEBGL_CONSTANTS.TRIANGLES &&
        t.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP &&
        t.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN &&
        void 0 !== t.mode
      )
        return null;
    var n = r.extensions[this.name].attributes,
      a = [];
    let p = {};
    for (let t in n)
      a.push(
        this.parser
          .getDependency("accessor", n[t])
          .then((e) => ((p[t] = e), p[t]))
      );
    return a.length < 1
      ? null
      : (a.push(this.parser.createNodeMesh(e)),
        Promise.all(a).then((e) => {
          var t,
            i = e.pop(),
            r = i.isGroup ? i.children : [i],
            n = e[0].count,
            a = [];
          for (t of r) {
            var s,
              o,
              l = new Matrix4(),
              h = new Vector3(),
              c = new Quaternion(),
              d = new Vector3(1, 1, 1),
              u = new InstancedMesh(t.geometry, t.material, n);
            for (let e = 0; e < n; e++)
              p.TRANSLATION && h.fromBufferAttribute(p.TRANSLATION, e),
                p.ROTATION && c.fromBufferAttribute(p.ROTATION, e),
                p.SCALE && d.fromBufferAttribute(p.SCALE, e),
                u.setMatrixAt(e, l.compose(h, c, d));
            for (s in p)
              "_COLOR_0" === s
                ? ((o = p[s]),
                  (u.instanceColor = new InstancedBufferAttribute(
                    o.array,
                    o.itemSize,
                    o.normalized
                  )))
                : "TRANSLATION" !== s &&
                  "ROTATION" !== s &&
                  "SCALE" !== s &&
                  t.geometry.setAttribute(s, p[s]);
            Object3D.prototype.copy.call(u, t),
              this.parser.assignFinalMaterial(u),
              a.push(u);
          }
          return i.isGroup ? (i.clear(), i.add(...a), i) : a[0];
        }));
  }
}
let BINARY_EXTENSION_HEADER_MAGIC = "glTF",
  BINARY_EXTENSION_HEADER_LENGTH = 12,
  BINARY_EXTENSION_CHUNK_TYPES = { JSON: 1313821514, BIN: 5130562 };
class GLTFBinaryExtension {
  constructor(e) {
    (this.name = EXTENSIONS.KHR_BINARY_GLTF),
      (this.content = null),
      (this.body = null);
    var t = new DataView(e, 0, BINARY_EXTENSION_HEADER_LENGTH),
      i = new TextDecoder();
    if (
      ((this.header = {
        magic: i.decode(new Uint8Array(e.slice(0, 4))),
        version: t.getUint32(4, !0),
        length: t.getUint32(8, !0),
      }),
      this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC)
    )
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    var r = this.header.length - BINARY_EXTENSION_HEADER_LENGTH,
      n = new DataView(e, BINARY_EXTENSION_HEADER_LENGTH);
    let a = 0;
    for (; a < r; ) {
      var s,
        o = n.getUint32(a, !0),
        l = ((a += 4), n.getUint32(a, !0));
      (a += 4),
        l === BINARY_EXTENSION_CHUNK_TYPES.JSON
          ? ((s = new Uint8Array(e, BINARY_EXTENSION_HEADER_LENGTH + a, o)),
            (this.content = i.decode(s)))
          : l === BINARY_EXTENSION_CHUNK_TYPES.BIN &&
            ((s = BINARY_EXTENSION_HEADER_LENGTH + a),
            (this.body = e.slice(s, s + o))),
        (a += o);
    }
    if (null === this.content)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class GLTFDracoMeshCompressionExtension {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    (this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION),
      (this.json = e),
      (this.dracoLoader = t),
      this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    var i = this.json;
    let n = this.dracoLoader;
    var r,
      a,
      s = e.extensions[this.name].bufferView,
      o = e.extensions[this.name].attributes;
    let l = {},
      h = {},
      c = {};
    for (r in o) {
      var d = ATTRIBUTES[r] || r.toLowerCase();
      l[d] = o[r];
    }
    for (a in e.attributes) {
      var u,
        p,
        m = ATTRIBUTES[a] || a.toLowerCase();
      void 0 !== o[a] &&
        ((u = i.accessors[e.attributes[a]]),
        (p = WEBGL_COMPONENT_TYPES[u.componentType]),
        (c[m] = p.name),
        (h[m] = !0 === u.normalized));
    }
    return t.getDependency("bufferView", s).then(function (t) {
      return new Promise(function (r, e) {
        n.decodeDracoFile(
          t,
          function (e) {
            for (var t in e.attributes) {
              var i = e.attributes[t],
                t = h[t];
              void 0 !== t && (i.normalized = t);
            }
            r(e);
          },
          l,
          c,
          LinearSRGBColorSpace,
          e
        );
      });
    });
  }
}
class GLTFTextureTransformExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (
      ((void 0 !== t.texCoord && t.texCoord !== e.channel) ||
        void 0 !== t.offset ||
        void 0 !== t.rotation ||
        void 0 !== t.scale) &&
        ((e = e.clone()),
        void 0 !== t.texCoord && (e.channel = t.texCoord),
        void 0 !== t.offset && e.offset.fromArray(t.offset),
        void 0 !== t.rotation && (e.rotation = t.rotation),
        void 0 !== t.scale && e.repeat.fromArray(t.scale),
        (e.needsUpdate = !0)),
      e
    );
  }
}
class GLTFMeshQuantizationExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;
  }
}
class GLTFCubicSplineInterpolant extends Interpolant {
  constructor(e, t, i, r) {
    super(e, t, i, r);
  }
  copySampleValue_(e) {
    var t = this.resultBuffer,
      i = this.sampleValues,
      r = this.valueSize,
      n = e * r * 3 + r;
    for (let e = 0; e !== r; e++) t[e] = i[n + e];
    return t;
  }
  interpolate_(e, t, i, r) {
    var n = this.resultBuffer,
      a = this.sampleValues,
      s = this.valueSize,
      o = 2 * s,
      l = 3 * s,
      h = r - t,
      r = (i - t) / h,
      i = r * r,
      t = i * r,
      c = e * l,
      d = c - l,
      u = -2 * t + 3 * i,
      p = t - i,
      m = 1 - u,
      f = p - i + r;
    for (let e = 0; e !== s; e++) {
      var g = a[d + e + s],
        _ = a[d + e + o] * h,
        v = a[c + e + s],
        x = a[c + e] * h;
      n[e] = m * g + f * _ + u * v + p * x;
    }
    return n;
  }
}
let _q = new Quaternion();
class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {
  interpolate_(e, t, i, r) {
    e = super.interpolate_(e, t, i, r);
    return _q.fromArray(e).normalize().toArray(e), e;
  }
}
let WEBGL_CONSTANTS = {
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
  },
  WEBGL_COMPONENT_TYPES = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array,
  },
  WEBGL_FILTERS = {
    9728: NearestFilter,
    9729: LinearFilter,
    9984: NearestMipmapNearestFilter,
    9985: LinearMipmapNearestFilter,
    9986: NearestMipmapLinearFilter,
    9987: LinearMipmapLinearFilter,
  },
  WEBGL_WRAPPINGS = {
    33071: ClampToEdgeWrapping,
    33648: MirroredRepeatWrapping,
    10497: RepeatWrapping,
  },
  WEBGL_TYPE_SIZES = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16,
  },
  ATTRIBUTES = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv1",
    TEXCOORD_2: "uv2",
    TEXCOORD_3: "uv3",
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex",
  },
  PATH_PROPERTIES = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences",
  },
  INTERPOLATION = {
    CUBICSPLINE: void 0,
    LINEAR: InterpolateLinear,
    STEP: InterpolateDiscrete,
  },
  ALPHA_MODES = { OPAQUE: "OPAQUE", MASK: "MASK", BLEND: "BLEND" };
function createDefaultMaterial(e) {
  return (
    void 0 === e.DefaultMaterial &&
      (e.DefaultMaterial = new MeshStandardMaterial({
        color: 16777215,
        emissive: 0,
        metalness: 1,
        roughness: 1,
        transparent: !1,
        depthTest: !0,
        side: FrontSide,
      })),
    e.DefaultMaterial
  );
}
function addUnknownExtensionsToUserData(e, t, i) {
  for (var r in i.extensions)
    void 0 === e[r] &&
      ((t.userData.gltfExtensions = t.userData.gltfExtensions || {}),
      (t.userData.gltfExtensions[r] = i.extensions[r]));
}
function assignExtrasToUserData(e, t) {
  void 0 !== t.extras &&
    ("object" == typeof t.extras
      ? Object.assign(e.userData, t.extras)
      : console.warn(
          "THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras
        ));
}
function addMorphTargets(r, i, n) {
  let a = !1,
    s = !1,
    o = !1;
  for (let e = 0, t = i.length; e < t; e++) {
    var l = i[e];
    if (
      (void 0 !== l.POSITION && (a = !0),
      void 0 !== l.NORMAL && (s = !0),
      void 0 !== l.COLOR_0 && (o = !0),
      a && s && o)
    )
      break;
  }
  if (!a && !s && !o) return Promise.resolve(r);
  var h = [],
    c = [],
    d = [];
  for (let e = 0, t = i.length; e < t; e++) {
    var u,
      p = i[e];
    a &&
      ((u =
        void 0 !== p.POSITION
          ? n.getDependency("accessor", p.POSITION)
          : r.attributes.position),
      h.push(u)),
      s &&
        ((u =
          void 0 !== p.NORMAL
            ? n.getDependency("accessor", p.NORMAL)
            : r.attributes.normal),
        c.push(u)),
      o &&
        ((p =
          void 0 !== p.COLOR_0
            ? n.getDependency("accessor", p.COLOR_0)
            : r.attributes.color),
        d.push(p));
  }
  return Promise.all([Promise.all(h), Promise.all(c), Promise.all(d)]).then(
    function (e) {
      var t = e[0],
        i = e[1],
        e = e[2];
      return (
        a && (r.morphAttributes.position = t),
        s && (r.morphAttributes.normal = i),
        o && (r.morphAttributes.color = e),
        (r.morphTargetsRelative = !0),
        r
      );
    }
  );
}
function updateMorphTargets(i, r) {
  if ((i.updateMorphTargets(), void 0 !== r.weights))
    for (let e = 0, t = r.weights.length; e < t; e++)
      i.morphTargetInfluences[e] = r.weights[e];
  if (r.extras && Array.isArray(r.extras.targetNames)) {
    var n = r.extras.targetNames;
    if (i.morphTargetInfluences.length === n.length) {
      i.morphTargetDictionary = {};
      for (let e = 0, t = n.length; e < t; e++)
        i.morphTargetDictionary[n[e]] = e;
    } else
      console.warn(
        "THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names."
      );
  }
}
function createPrimitiveKey(i) {
  let r;
  var e = i.extensions && i.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
  if (
    ((r = e
      ? "draco:" +
        e.bufferView +
        ":" +
        e.indices +
        ":" +
        createAttributesKey(e.attributes)
      : i.indices + ":" + createAttributesKey(i.attributes) + ":" + i.mode),
    void 0 !== i.targets)
  )
    for (let e = 0, t = i.targets.length; e < t; e++)
      r += ":" + createAttributesKey(i.targets[e]);
  return r;
}
function createAttributesKey(i) {
  let r = "";
  var n = Object.keys(i).sort();
  for (let e = 0, t = n.length; e < t; e++) r += n[e] + ":" + i[n[e]] + ";";
  return r;
}
function getNormalizedComponentScale(e) {
  switch (e) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error(
        "THREE.GLTFLoader: Unsupported normalized accessor component type."
      );
  }
}
function getImageURIMimeType(e) {
  return 0 < e.search(/\.jpe?g($|\?)/i) || 0 === e.search(/^data\:image\/jpeg/)
    ? "image/jpeg"
    : 0 < e.search(/\.webp($|\?)/i) || 0 === e.search(/^data\:image\/webp/)
    ? "image/webp"
    : "image/png";
}
let _identityMatrix = new Matrix4();
class GLTFParser {
  constructor(e = {}, t = {}) {
    (this.json = e),
      (this.extensions = {}),
      (this.plugins = {}),
      (this.options = t),
      (this.cache = new GLTFRegistry()),
      (this.associations = new Map()),
      (this.primitiveCache = {}),
      (this.nodeCache = {}),
      (this.meshCache = { refs: {}, uses: {} }),
      (this.cameraCache = { refs: {}, uses: {} }),
      (this.lightCache = { refs: {}, uses: {} }),
      (this.sourceCache = {}),
      (this.textureCache = {});
    let i = !(this.nodeNamesUsed = {}),
      r = !1,
      n = -1;
    "undefined" != typeof navigator &&
      ((i = !0 === /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
      (r = -1 < navigator.userAgent.indexOf("Firefox")),
      (n = r ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1)),
      "undefined" == typeof createImageBitmap || i || (r && n < 98)
        ? (this.textureLoader = new TextureLoader(this.options.manager))
        : (this.textureLoader = new ImageBitmapLoader(this.options.manager)),
      this.textureLoader.setCrossOrigin(this.options.crossOrigin),
      this.textureLoader.setRequestHeader(this.options.requestHeader),
      (this.fileLoader = new FileLoader(this.options.manager)),
      this.fileLoader.setResponseType("arraybuffer"),
      "use-credentials" === this.options.crossOrigin &&
        this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(i, e) {
    let r = this,
      n = this.json,
      a = this.extensions;
    this.cache.removeAll(),
      (this.nodeCache = {}),
      this._invokeAll(function (e) {
        return e._markDefs && e._markDefs();
      }),
      Promise.all(
        this._invokeAll(function (e) {
          return e.beforeRoot && e.beforeRoot();
        })
      )
        .then(function () {
          return Promise.all([
            r.getDependencies("scene"),
            r.getDependencies("animation"),
            r.getDependencies("camera"),
          ]);
        })
        .then(function (e) {
          let t = {
            scene: e[0][n.scene || 0],
            scenes: e[0],
            animations: e[1],
            cameras: e[2],
            asset: n.asset,
            parser: r,
            userData: {},
          };
          return (
            addUnknownExtensionsToUserData(a, t, n),
            assignExtrasToUserData(t, n),
            Promise.all(
              r._invokeAll(function (e) {
                return e.afterRoot && e.afterRoot(t);
              })
            ).then(function () {
              for (var e of t.scenes) e.updateMatrixWorld();
              i(t);
            })
          );
        })
        .catch(e);
  }
  _markDefs() {
    var i = this.json.nodes || [],
      r = this.json.skins || [],
      n = this.json.meshes || [];
    for (let e = 0, t = r.length; e < t; e++) {
      var a = r[e].joints;
      for (let e = 0, t = a.length; e < t; e++) i[a[e]].isBone = !0;
    }
    for (let e = 0, t = i.length; e < t; e++) {
      var s = i[e];
      void 0 !== s.mesh &&
        (this._addNodeRef(this.meshCache, s.mesh), void 0 !== s.skin) &&
        (n[s.mesh].isSkinnedMesh = !0),
        void 0 !== s.camera && this._addNodeRef(this.cameraCache, s.camera);
    }
  }
  _addNodeRef(e, t) {
    void 0 !== t &&
      (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  _getNodeRef(e, t, i) {
    if (e.refs[t] <= 1) return i;
    var r = i.clone();
    let a = (e, t) => {
      var i,
        r,
        n = this.associations.get(e);
      null != n && this.associations.set(t, n);
      for ([i, r] of e.children.entries()) a(r, t.children[i]);
    };
    return a(i, r), (r.name += "_instance_" + e.uses[t]++), r;
  }
  _invokeOne(t) {
    var i = Object.values(this.plugins);
    i.push(this);
    for (let e = 0; e < i.length; e++) {
      var r = t(i[e]);
      if (r) return r;
    }
    return null;
  }
  _invokeAll(t) {
    var i = Object.values(this.plugins),
      r = (i.unshift(this), []);
    for (let e = 0; e < i.length; e++) {
      var n = t(i[e]);
      n && r.push(n);
    }
    return r;
  }
  getDependency(t, i) {
    var e = t + ":" + i;
    let r = this.cache.get(e);
    if (!r) {
      switch (t) {
        case "scene":
          r = this.loadScene(i);
          break;
        case "node":
          r = this._invokeOne(function (e) {
            return e.loadNode && e.loadNode(i);
          });
          break;
        case "mesh":
          r = this._invokeOne(function (e) {
            return e.loadMesh && e.loadMesh(i);
          });
          break;
        case "accessor":
          r = this.loadAccessor(i);
          break;
        case "bufferView":
          r = this._invokeOne(function (e) {
            return e.loadBufferView && e.loadBufferView(i);
          });
          break;
        case "buffer":
          r = this.loadBuffer(i);
          break;
        case "material":
          r = this._invokeOne(function (e) {
            return e.loadMaterial && e.loadMaterial(i);
          });
          break;
        case "texture":
          r = this._invokeOne(function (e) {
            return e.loadTexture && e.loadTexture(i);
          });
          break;
        case "skin":
          r = this.loadSkin(i);
          break;
        case "animation":
          r = this._invokeOne(function (e) {
            return e.loadAnimation && e.loadAnimation(i);
          });
          break;
        case "camera":
          r = this.loadCamera(i);
          break;
        default:
          if (
            (r = this._invokeOne(function (e) {
              return e != this && e.getDependency && e.getDependency(t, i);
            }))
          )
            break;
          throw new Error("Unknown type: " + t);
      }
      this.cache.add(e, r);
    }
    return r;
  }
  getDependencies(r) {
    let e = this.cache.get(r);
    if (!e) {
      let i = this;
      var t = this.json[r + ("mesh" === r ? "es" : "s")] || [];
      (e = Promise.all(
        t.map(function (e, t) {
          return i.getDependency(r, t);
        })
      )),
        this.cache.add(r, e);
    }
    return e;
  }
  loadBuffer(e) {
    let i = this.json.buffers[e],
      r = this.fileLoader;
    if (i.type && "arraybuffer" !== i.type)
      throw new Error(
        "THREE.GLTFLoader: " + i.type + " buffer type is not supported."
      );
    if (void 0 === i.uri && 0 === e)
      return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
    let n = this.options;
    return new Promise(function (e, t) {
      r.load(LoaderUtils.resolveURL(i.uri, n.path), e, void 0, function () {
        t(
          new Error('THREE.GLTFLoader: Failed to load buffer "' + i.uri + '".')
        );
      });
    });
  }
  loadBufferView(e) {
    let r = this.json.bufferViews[e];
    return this.getDependency("buffer", r.buffer).then(function (e) {
      var t = r.byteLength || 0,
        i = r.byteOffset || 0;
      return e.slice(i, i + t);
    });
  }
  loadAccessor(e) {
    let f = this,
      g = this.json,
      _ = this.json.accessors[e];
    var t, i;
    return void 0 === _.bufferView && void 0 === _.sparse
      ? ((e = WEBGL_TYPE_SIZES[_.type]),
        (i = WEBGL_COMPONENT_TYPES[_.componentType]),
        (t = !0 === _.normalized),
        (i = new i(_.count * e)),
        Promise.resolve(new BufferAttribute(i, e, t)))
      : ((i = []),
        void 0 !== _.bufferView
          ? i.push(this.getDependency("bufferView", _.bufferView))
          : i.push(null),
        void 0 !== _.sparse &&
          (i.push(
            this.getDependency("bufferView", _.sparse.indices.bufferView)
          ),
          i.push(this.getDependency("bufferView", _.sparse.values.bufferView))),
        Promise.all(i).then(function (e) {
          var t = e[0],
            i = WEBGL_TYPE_SIZES[_.type],
            r = WEBGL_COMPONENT_TYPES[_.componentType],
            n = r.BYTES_PER_ELEMENT,
            a = n * i,
            s = _.byteOffset || 0,
            o =
              void 0 !== _.bufferView
                ? g.bufferViews[_.bufferView].byteStride
                : void 0,
            l = !0 === _.normalized;
          let h, c;
          if (o && o !== a) {
            var a = Math.floor(s / o),
              d =
                "InterleavedBuffer:" +
                _.bufferView +
                ":" +
                _.componentType +
                ":" +
                a +
                ":" +
                _.count;
            let e = f.cache.get(d);
            e ||
              ((h = new r(t, a * o, (_.count * o) / n)),
              (e = new InterleavedBuffer(h, o / n)),
              f.cache.add(d, e)),
              (c = new InterleavedBufferAttribute(e, i, (s % o) / n, l));
          } else (h = null === t ? new r(_.count * i) : new r(t, s, _.count * i)), (c = new BufferAttribute(h, i, l));
          if (void 0 !== _.sparse) {
            var a = WEBGL_TYPE_SIZES.SCALAR,
              d = WEBGL_COMPONENT_TYPES[_.sparse.indices.componentType],
              o = _.sparse.indices.byteOffset || 0,
              n = _.sparse.values.byteOffset || 0,
              u = new d(e[1], o, _.sparse.count * a),
              p = new r(e[2], n, _.sparse.count * i);
            null !== t &&
              (c = new BufferAttribute(
                c.array.slice(),
                c.itemSize,
                c.normalized
              ));
            for (let e = 0, t = u.length; e < t; e++) {
              var m = u[e];
              if (
                (c.setX(m, p[e * i]),
                2 <= i && c.setY(m, p[e * i + 1]),
                3 <= i && c.setZ(m, p[e * i + 2]),
                4 <= i && c.setW(m, p[e * i + 3]),
                5 <= i)
              )
                throw new Error(
                  "THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute."
                );
            }
          }
          return c;
        }));
  }
  loadTexture(e) {
    var t = this.json,
      i = this.options,
      r = t.textures[e].source,
      t = t.images[r];
    let n = this.textureLoader;
    return (
      t.uri && null !== (i = i.manager.getHandler(t.uri)) && (n = i),
      this.loadTextureImage(e, r, n)
    );
  }
  loadTextureImage(i, e, t) {
    let r = this,
      n = this.json,
      a = n.textures[i],
      s = n.images[e];
    var o = (s.uri || s.bufferView) + ":" + a.sampler;
    return (
      this.textureCache[o] ||
      ((e = this.loadImageSource(e, t)
        .then(function (e) {
          (e.flipY = !1),
            (e.name = a.name || s.name || ""),
            "" === e.name &&
              "string" == typeof s.uri &&
              !1 === s.uri.startsWith("data:image/") &&
              (e.name = s.uri);
          var t = (n.samplers || {})[a.sampler] || {};
          return (
            (e.magFilter = WEBGL_FILTERS[t.magFilter] || LinearFilter),
            (e.minFilter =
              WEBGL_FILTERS[t.minFilter] || LinearMipmapLinearFilter),
            (e.wrapS = WEBGL_WRAPPINGS[t.wrapS] || RepeatWrapping),
            (e.wrapT = WEBGL_WRAPPINGS[t.wrapT] || RepeatWrapping),
            r.associations.set(e, { textures: i }),
            e
          );
        })
        .catch(function () {
          return null;
        })),
      (this.textureCache[o] = e))
    );
  }
  loadImageSource(e, n) {
    var t = this.json;
    let a = this.options;
    if (void 0 !== this.sourceCache[e])
      return this.sourceCache[e].then((e) => e.clone());
    let i = t.images[e],
      r = self.URL || self.webkitURL,
      s = i.uri || "",
      o = !1;
    if (void 0 !== i.bufferView)
      s = this.getDependency("bufferView", i.bufferView).then(function (e) {
        o = !0;
        e = new Blob([e], { type: i.mimeType });
        return (s = r.createObjectURL(e));
      });
    else if (void 0 === i.uri)
      throw new Error(
        "THREE.GLTFLoader: Image " + e + " is missing URI and bufferView"
      );
    t = Promise.resolve(s)
      .then(function (r) {
        return new Promise(function (t, e) {
          let i = t;
          !0 === n.isImageBitmapLoader &&
            (i = function (e) {
              e = new Texture(e);
              (e.needsUpdate = !0), t(e);
            }),
            n.load(LoaderUtils.resolveURL(r, a.path), i, void 0, e);
        });
      })
      .then(function (e) {
        return (
          !0 === o && r.revokeObjectURL(s),
          (e.userData.mimeType = i.mimeType || getImageURIMimeType(i.uri)),
          e
        );
      })
      .catch(function (e) {
        throw (console.error("THREE.GLTFLoader: Couldn't load texture", s), e);
      });
    return (this.sourceCache[e] = t);
  }
  assignTexture(r, n, a, s) {
    let o = this;
    return this.getDependency("texture", a.index).then(function (e) {
      var t, i;
      return e
        ? (void 0 !== a.texCoord &&
            0 < a.texCoord &&
            ((e = e.clone()).channel = a.texCoord),
          o.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] &&
            (t =
              void 0 !== a.extensions
                ? a.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]
                : void 0) &&
            ((i = o.associations.get(e)),
            (e = o.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(
              e,
              t
            )),
            o.associations.set(e, i)),
          void 0 !== s && (e.colorSpace = s),
          (r[n] = e))
        : null;
    });
  }
  assignFinalMaterial(e) {
    var i = e.geometry;
    let r = e.material;
    var n = void 0 === i.attributes.tangent,
      a = void 0 !== i.attributes.color,
      i = void 0 === i.attributes.normal;
    if (e.isPoints) {
      var t = "PointsMaterial:" + r.uuid;
      let e = this.cache.get(t);
      e ||
        ((e = new PointsMaterial()),
        Material.prototype.copy.call(e, r),
        e.color.copy(r.color),
        (e.map = r.map),
        (e.sizeAttenuation = !1),
        this.cache.add(t, e)),
        (r = e);
    } else if (e.isLine) {
      t = "LineBasicMaterial:" + r.uuid;
      let e = this.cache.get(t);
      e ||
        ((e = new LineBasicMaterial()),
        Material.prototype.copy.call(e, r),
        e.color.copy(r.color),
        (e.map = r.map),
        this.cache.add(t, e)),
        (r = e);
    }
    if (n || a || i) {
      let e = "ClonedMaterial:" + r.uuid + ":",
        t =
          (n && (e += "derivative-tangents:"),
          a && (e += "vertex-colors:"),
          i && (e += "flat-shading:"),
          this.cache.get(e));
      t ||
        ((t = r.clone()),
        a && (t.vertexColors = !0),
        i && (t.flatShading = !0),
        n &&
          (t.normalScale && (t.normalScale.y *= -1), t.clearcoatNormalScale) &&
          (t.clearcoatNormalScale.y *= -1),
        this.cache.add(e, t),
        this.associations.set(t, this.associations.get(r))),
        (r = t);
    }
    e.material = r;
  }
  getMaterialType() {
    return MeshStandardMaterial;
  }
  loadMaterial(t) {
    let i = this;
    var e = this.json;
    let r = this.extensions,
      n = e.materials[t],
      a,
      s = {};
    var o,
      e = [],
      l =
        ((n.extensions || {})[EXTENSIONS.KHR_MATERIALS_UNLIT]
          ? ((o = r[EXTENSIONS.KHR_MATERIALS_UNLIT]),
            (a = o.getMaterialType()),
            e.push(o.extendParams(s, n, i)))
          : ((o = n.pbrMetallicRoughness || {}),
            (s.color = new Color(1, 1, 1)),
            (s.opacity = 1),
            Array.isArray(o.baseColorFactor) &&
              ((l = o.baseColorFactor),
              s.color.setRGB(l[0], l[1], l[2], LinearSRGBColorSpace),
              (s.opacity = l[3])),
            void 0 !== o.baseColorTexture &&
              e.push(
                i.assignTexture(s, "map", o.baseColorTexture, SRGBColorSpace)
              ),
            (s.metalness = void 0 !== o.metallicFactor ? o.metallicFactor : 1),
            (s.roughness =
              void 0 !== o.roughnessFactor ? o.roughnessFactor : 1),
            void 0 !== o.metallicRoughnessTexture &&
              (e.push(
                i.assignTexture(s, "metalnessMap", o.metallicRoughnessTexture)
              ),
              e.push(
                i.assignTexture(s, "roughnessMap", o.metallicRoughnessTexture)
              )),
            (a = this._invokeOne(function (e) {
              return e.getMaterialType && e.getMaterialType(t);
            })),
            e.push(
              Promise.all(
                this._invokeAll(function (e) {
                  return e.extendMaterialParams && e.extendMaterialParams(t, s);
                })
              )
            )),
        !0 === n.doubleSided && (s.side = DoubleSide),
        n.alphaMode || ALPHA_MODES.OPAQUE);
    return (
      l === ALPHA_MODES.BLEND
        ? ((s.transparent = !0), (s.depthWrite = !1))
        : ((s.transparent = !1),
          l === ALPHA_MODES.MASK &&
            (s.alphaTest = void 0 !== n.alphaCutoff ? n.alphaCutoff : 0.5)),
      void 0 !== n.normalTexture &&
        a !== MeshBasicMaterial &&
        (e.push(i.assignTexture(s, "normalMap", n.normalTexture)),
        (s.normalScale = new Vector2(1, 1)),
        void 0 !== n.normalTexture.scale) &&
        ((o = n.normalTexture.scale), s.normalScale.set(o, o)),
      void 0 !== n.occlusionTexture &&
        a !== MeshBasicMaterial &&
        (e.push(i.assignTexture(s, "aoMap", n.occlusionTexture)),
        void 0 !== n.occlusionTexture.strength) &&
        (s.aoMapIntensity = n.occlusionTexture.strength),
      void 0 !== n.emissiveFactor &&
        a !== MeshBasicMaterial &&
        ((l = n.emissiveFactor),
        (s.emissive = new Color().setRGB(
          l[0],
          l[1],
          l[2],
          LinearSRGBColorSpace
        ))),
      void 0 !== n.emissiveTexture &&
        a !== MeshBasicMaterial &&
        e.push(
          i.assignTexture(s, "emissiveMap", n.emissiveTexture, SRGBColorSpace)
        ),
      Promise.all(e).then(function () {
        var e = new a(s);
        return (
          n.name && (e.name = n.name),
          assignExtrasToUserData(e, n),
          i.associations.set(e, { materials: t }),
          n.extensions && addUnknownExtensionsToUserData(r, e, n),
          e
        );
      })
    );
  }
  createUniqueName(e) {
    e = PropertyBinding.sanitizeNodeName(e || "");
    return e in this.nodeNamesUsed
      ? e + "_" + ++this.nodeNamesUsed[e]
      : ((this.nodeNamesUsed[e] = 0), e);
  }
  loadGeometries(i) {
    let r = this,
      n = this.extensions;
    var a = this.primitiveCache;
    var s = [];
    for (let e = 0, t = i.length; e < t; e++) {
      var o = i[e],
        l = createPrimitiveKey(o),
        h = a[l];
      if (h) s.push(h.promise);
      else {
        let e;
        (e =
          o.extensions && o.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]
            ? ((t) =>
                n[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]
                  .decodePrimitive(t, r)
                  .then(function (e) {
                    return addPrimitiveAttributes(e, t, r);
                  }))(o)
            : addPrimitiveAttributes(new BufferGeometry(), o, r)),
          (a[l] = { primitive: o, promise: e }),
          s.push(e);
      }
    }
    return Promise.all(s);
  }
  loadMesh(h) {
    let c = this;
    var e = this.json;
    let d = this.extensions,
      u = e.meshes[h],
      p = u.primitives;
    var i = [];
    for (let e = 0, t = p.length; e < t; e++) {
      var r =
        void 0 === p[e].material
          ? createDefaultMaterial(this.cache)
          : this.getDependency("material", p[e].material);
      i.push(r);
    }
    return (
      i.push(c.loadGeometries(p)),
      Promise.all(i).then(function (e) {
        var i = e.slice(0, e.length - 1),
          r = e[e.length - 1],
          n = [];
        for (let t = 0, e = r.length; t < e; t++) {
          var a = r[t],
            s = p[t];
          let e;
          var o = i[t];
          if (
            s.mode === WEBGL_CONSTANTS.TRIANGLES ||
            s.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
            s.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
            void 0 === s.mode
          )
            !0 ===
              (e = new (!0 === u.isSkinnedMesh ? SkinnedMesh : Mesh)(a, o))
                .isSkinnedMesh && e.normalizeSkinWeights(),
              s.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP
                ? (e.geometry = toTrianglesDrawMode(
                    e.geometry,
                    TriangleStripDrawMode
                  ))
                : s.mode === WEBGL_CONSTANTS.TRIANGLE_FAN &&
                  (e.geometry = toTrianglesDrawMode(
                    e.geometry,
                    TriangleFanDrawMode
                  ));
          else if (s.mode === WEBGL_CONSTANTS.LINES) e = new LineSegments(a, o);
          else if (s.mode === WEBGL_CONSTANTS.LINE_STRIP) e = new Line(a, o);
          else if (s.mode === WEBGL_CONSTANTS.LINE_LOOP) e = new LineLoop(a, o);
          else {
            if (s.mode !== WEBGL_CONSTANTS.POINTS)
              throw new Error(
                "THREE.GLTFLoader: Primitive mode unsupported: " + s.mode
              );
            e = new Points(a, o);
          }
          0 < Object.keys(e.geometry.morphAttributes).length &&
            updateMorphTargets(e, u),
            (e.name = c.createUniqueName(u.name || "mesh_" + h)),
            assignExtrasToUserData(e, u),
            s.extensions && addUnknownExtensionsToUserData(d, e, s),
            c.assignFinalMaterial(e),
            n.push(e);
        }
        for (let e = 0, t = n.length; e < t; e++)
          c.associations.set(n[e], { meshes: h, primitives: e });
        if (1 === n.length)
          return (
            u.extensions && addUnknownExtensionsToUserData(d, n[0], u), n[0]
          );
        var l = new Group();
        u.extensions && addUnknownExtensionsToUserData(d, l, u),
          c.associations.set(l, { meshes: h });
        for (let e = 0, t = n.length; e < t; e++) l.add(n[e]);
        return l;
      })
    );
  }
  loadCamera(e) {
    let t;
    var e = this.json.cameras[e],
      i = e[e.type];
    if (i)
      return (
        "perspective" === e.type
          ? (t = new PerspectiveCamera(
              MathUtils.radToDeg(i.yfov),
              i.aspectRatio || 1,
              i.znear || 1,
              i.zfar || 2e6
            ))
          : "orthographic" === e.type &&
            (t = new OrthographicCamera(
              -i.xmag,
              i.xmag,
              i.ymag,
              -i.ymag,
              i.znear,
              i.zfar
            )),
        e.name && (t.name = this.createUniqueName(e.name)),
        assignExtrasToUserData(t, e),
        Promise.resolve(t)
      );
    console.warn("THREE.GLTFLoader: Missing camera parameters.");
  }
  loadSkin(e) {
    let o = this.json.skins[e];
    var i = [];
    for (let e = 0, t = o.joints.length; e < t; e++)
      i.push(this._loadNodeShallow(o.joints[e]));
    return (
      void 0 !== o.inverseBindMatrices
        ? i.push(this.getDependency("accessor", o.inverseBindMatrices))
        : i.push(null),
      Promise.all(i).then(function (e) {
        var i = e.pop(),
          r = e,
          n = [],
          a = [];
        for (let e = 0, t = r.length; e < t; e++) {
          var s = r[e];
          s
            ? (n.push(s),
              (s = new Matrix4()),
              null !== i && s.fromArray(i.array, 16 * e),
              a.push(s))
            : console.warn(
                'THREE.GLTFLoader: Joint "%s" could not be found.',
                o.joints[e]
              );
        }
        return new Skeleton(n, a);
      })
    );
  }
  loadAnimation(e) {
    var t = this.json;
    let m = this;
    var i = t.animations[e];
    let f = i.name || "animation_" + e;
    var r = [],
      n = [],
      a = [],
      s = [],
      o = [];
    for (let e = 0, t = i.channels.length; e < t; e++) {
      var l = i.channels[e],
        h = i.samplers[l.sampler],
        l = l.target,
        c = l.node,
        d = void 0 !== i.parameters ? i.parameters[h.input] : h.input,
        u = void 0 !== i.parameters ? i.parameters[h.output] : h.output;
      void 0 !== l.node &&
        (r.push(this.getDependency("node", c)),
        n.push(this.getDependency("accessor", d)),
        a.push(this.getDependency("accessor", u)),
        s.push(h),
        o.push(l));
    }
    return Promise.all([
      Promise.all(r),
      Promise.all(n),
      Promise.all(a),
      Promise.all(s),
      Promise.all(o),
    ]).then(function (e) {
      var i = e[0],
        r = e[1],
        n = e[2],
        a = e[3],
        s = e[4],
        o = [];
      for (let e = 0, t = i.length; e < t; e++) {
        var l = i[e],
          h = r[e],
          c = n[e],
          d = a[e],
          u = s[e];
        if (void 0 !== l) {
          l.updateMatrix && l.updateMatrix();
          var p = m._createAnimationTracks(l, h, c, d, u);
          if (p) for (let e = 0; e < p.length; e++) o.push(p[e]);
        }
      }
      return new AnimationClip(f, void 0, o);
    });
  }
  createNodeMesh(e) {
    var t = this.json;
    let i = this,
      r = t.nodes[e];
    return void 0 === r.mesh
      ? null
      : i.getDependency("mesh", r.mesh).then(function (e) {
          e = i._getNodeRef(i.meshCache, r.mesh, e);
          return (
            void 0 !== r.weights &&
              e.traverse(function (i) {
                if (i.isMesh)
                  for (let e = 0, t = r.weights.length; e < t; e++)
                    i.morphTargetInfluences[e] = r.weights[e];
              }),
            e
          );
        });
  }
  loadNode(e) {
    var t = this.json.nodes[e],
      e = this._loadNodeShallow(e),
      i = [],
      r = t.children || [];
    for (let e = 0, t = r.length; e < t; e++)
      i.push(this.getDependency("node", r[e]));
    t =
      void 0 === t.skin
        ? Promise.resolve(null)
        : this.getDependency("skin", t.skin);
    return Promise.all([e, Promise.all(i), t]).then(function (e) {
      var i = e[0],
        r = e[1];
      let t = e[2];
      null !== t &&
        i.traverse(function (e) {
          e.isSkinnedMesh && e.bind(t, _identityMatrix);
        });
      for (let e = 0, t = r.length; e < t; e++) i.add(r[e]);
      return i;
    });
  }
  _loadNodeShallow(a) {
    var e = this.json;
    let s = this.extensions,
      o = this;
    if (void 0 === this.nodeCache[a]) {
      let t = e.nodes[a],
        n = t.name ? o.createUniqueName(t.name) : "",
        i = [];
      e = o._invokeOne(function (e) {
        return e.createNodeMesh && e.createNodeMesh(a);
      });
      e && i.push(e),
        void 0 !== t.camera &&
          i.push(
            o.getDependency("camera", t.camera).then(function (e) {
              return o._getNodeRef(o.cameraCache, t.camera, e);
            })
          ),
        o
          ._invokeAll(function (e) {
            return e.createNodeAttachment && e.createNodeAttachment(a);
          })
          .forEach(function (e) {
            i.push(e);
          }),
        (this.nodeCache[a] = Promise.all(i).then(function (i) {
          let r;
          if (
            (r =
              !0 === t.isBone
                ? new Bone()
                : 1 < i.length
                ? new Group()
                : 1 === i.length
                ? i[0]
                : new Object3D()) !== i[0]
          )
            for (let e = 0, t = i.length; e < t; e++) r.add(i[e]);
          var e;
          return (
            t.name && ((r.userData.name = t.name), (r.name = n)),
            assignExtrasToUserData(r, t),
            t.extensions && addUnknownExtensionsToUserData(s, r, t),
            void 0 !== t.matrix
              ? ((e = new Matrix4()).fromArray(t.matrix), r.applyMatrix4(e))
              : (void 0 !== t.translation &&
                  r.position.fromArray(t.translation),
                void 0 !== t.rotation && r.quaternion.fromArray(t.rotation),
                void 0 !== t.scale && r.scale.fromArray(t.scale)),
            o.associations.has(r) || o.associations.set(r, {}),
            (o.associations.get(r).nodes = a),
            r
          );
        }));
    }
    return this.nodeCache[a];
  }
  loadScene(e) {
    var t = this.extensions,
      e = this.json.scenes[e];
    let n = this,
      r = new Group();
    e.name && (r.name = n.createUniqueName(e.name)),
      assignExtrasToUserData(r, e),
      e.extensions && addUnknownExtensionsToUserData(t, r, e);
    var i = e.nodes || [],
      a = [];
    for (let e = 0, t = i.length; e < t; e++)
      a.push(n.getDependency("node", i[e]));
    return Promise.all(a).then(function (i) {
      for (let e = 0, t = i.length; e < t; e++) r.add(i[e]);
      return (
        (n.associations = ((e) => {
          let i = new Map();
          for (var [t, r] of n.associations)
            (t instanceof Material || t instanceof Texture) && i.set(t, r);
          return (
            e.traverse((e) => {
              var t = n.associations.get(e);
              null != t && i.set(e, t);
            }),
            i
          );
        })(r)),
        r
      );
    });
  }
  _createAnimationTracks(e, i, t, r, n) {
    var a = [],
      s = e.name || e.uuid;
    let o = [];
    PATH_PROPERTIES[n.path] === PATH_PROPERTIES.weights
      ? e.traverse(function (e) {
          e.morphTargetInfluences && o.push(e.name || e.uuid);
        })
      : o.push(s);
    let l;
    switch (PATH_PROPERTIES[n.path]) {
      case PATH_PROPERTIES.weights:
        l = NumberKeyframeTrack;
        break;
      case PATH_PROPERTIES.rotation:
        l = QuaternionKeyframeTrack;
        break;
      case PATH_PROPERTIES.position:
      case PATH_PROPERTIES.scale:
        l = VectorKeyframeTrack;
        break;
      default:
        l = 1 === t.itemSize ? NumberKeyframeTrack : VectorKeyframeTrack;
    }
    var h =
        void 0 !== r.interpolation
          ? INTERPOLATION[r.interpolation]
          : InterpolateLinear,
      c = this._getArrayFromAccessor(t);
    for (let e = 0, t = o.length; e < t; e++) {
      var d = new l(o[e] + "." + PATH_PROPERTIES[n.path], i.array, c, h);
      "CUBICSPLINE" === r.interpolation &&
        this._createCubicSplineTrackInterpolant(d),
        a.push(d);
    }
    return a;
  }
  _getArrayFromAccessor(e) {
    let i = e.array;
    if (e.normalized) {
      var r = getNormalizedComponentScale(i.constructor),
        n = new Float32Array(i.length);
      for (let e = 0, t = i.length; e < t; e++) n[e] = i[e] * r;
      i = n;
    }
    return i;
  }
  _createCubicSplineTrackInterpolant(e) {
    (e.createInterpolant = function (e) {
      return new (
        this instanceof QuaternionKeyframeTrack
          ? GLTFCubicSplineQuaternionInterpolant
          : GLTFCubicSplineInterpolant
      )(this.times, this.values, this.getValueSize() / 3, e);
    }),
      (e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0);
  }
}
function computeBounds(e, t, i) {
  var r = t.attributes,
    n = new Box3();
  if (void 0 !== r.POSITION) {
    var r = i.json.accessors[r.POSITION],
      a = r.min,
      s = r.max;
    if (void 0 === a || void 0 === s)
      console.warn(
        "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
      );
    else {
      n.set(new Vector3(a[0], a[1], a[2]), new Vector3(s[0], s[1], s[2])),
        r.normalized &&
          ((a = getNormalizedComponentScale(
            WEBGL_COMPONENT_TYPES[r.componentType]
          )),
          n.min.multiplyScalar(a),
          n.max.multiplyScalar(a));
      var o = t.targets;
      if (void 0 !== o) {
        var l = new Vector3(),
          h = new Vector3();
        for (let e = 0, t = o.length; e < t; e++) {
          var c,
            d,
            u = o[e];
          void 0 !== u.POSITION &&
            ((d = (u = i.json.accessors[u.POSITION]).min),
            (c = u.max),
            void 0 !== d && void 0 !== c
              ? (h.setX(Math.max(Math.abs(d[0]), Math.abs(c[0]))),
                h.setY(Math.max(Math.abs(d[1]), Math.abs(c[1]))),
                h.setZ(Math.max(Math.abs(d[2]), Math.abs(c[2]))),
                u.normalized &&
                  ((d = getNormalizedComponentScale(
                    WEBGL_COMPONENT_TYPES[u.componentType]
                  )),
                  h.multiplyScalar(d)),
                l.max(h))
              : console.warn(
                  "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
                ));
        }
        n.expandByVector(l);
      }
      e.boundingBox = n;
      s = new Sphere();
      n.getCenter(s.center),
        (s.radius = n.min.distanceTo(n.max) / 2),
        (e.boundingSphere = s);
    }
  }
}
function addPrimitiveAttributes(i, e, r) {
  var t,
    n,
    a = e.attributes,
    s = [];
  for (t in a) {
    var o = ATTRIBUTES[t] || t.toLowerCase();
    o in i.attributes ||
      s.push(
        ((e, t) =>
          r.getDependency("accessor", e).then(function (e) {
            i.setAttribute(t, e);
          }))(a[t], o)
      );
  }
  return (
    void 0 === e.indices ||
      i.index ||
      ((n = r.getDependency("accessor", e.indices).then(function (e) {
        i.setIndex(e);
      })),
      s.push(n)),
    ColorManagement.workingColorSpace !== LinearSRGBColorSpace &&
      "COLOR_0" in a &&
      console.warn(
        `THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ColorManagement.workingColorSpace}" not supported.`
      ),
    assignExtrasToUserData(i, e),
    computeBounds(i, e, r),
    Promise.all(s).then(function () {
      return void 0 !== e.targets ? addMorphTargets(i, e.targets, r) : i;
    })
  );
}
let _taskCache = new WeakMap();
class DRACOLoader extends Loader {
  constructor(e) {
    super(e),
      (this.decoderPath = ""),
      (this.decoderConfig = {}),
      (this.decoderBinary = null),
      (this.decoderPending = null),
      (this.workerLimit = 4),
      (this.workerPool = []),
      (this.workerNextTaskID = 1),
      (this.workerSourceURL = ""),
      (this.defaultAttributeIDs = {
        position: "POSITION",
        normal: "NORMAL",
        color: "COLOR",
        uv: "TEX_COORD",
      }),
      (this.defaultAttributeTypes = {
        position: "Float32Array",
        normal: "Float32Array",
        color: "Float32Array",
        uv: "Float32Array",
      });
  }
  setDecoderPath(e) {
    return (this.decoderPath = e), this;
  }
  setDecoderConfig(e) {
    return (this.decoderConfig = e), this;
  }
  setWorkerLimit(e) {
    return (this.workerLimit = e), this;
  }
  load(e, t, i, r) {
    var n = new FileLoader(this.manager);
    n.setPath(this.path),
      n.setResponseType("arraybuffer"),
      n.setRequestHeader(this.requestHeader),
      n.setWithCredentials(this.withCredentials),
      n.load(
        e,
        (e) => {
          this.parse(e, t, r);
        },
        i,
        r
      );
  }
  parse(e, t, i = () => {}) {
    this.decodeDracoFile(e, t, null, null, SRGBColorSpace).catch(i);
  }
  decodeDracoFile(e, t, i, r, n = LinearSRGBColorSpace, a = () => {}) {
    r = {
      attributeIDs: i || this.defaultAttributeIDs,
      attributeTypes: r || this.defaultAttributeTypes,
      useUniqueIDs: !!i,
      vertexColorSpace: n,
    };
    return this.decodeGeometry(e, r).then(t).catch(a);
  }
  decodeGeometry(i, r) {
    var e = JSON.stringify(r);
    if (_taskCache.has(i)) {
      var t = _taskCache.get(i);
      if (t.key === e) return t.promise;
      if (0 === i.byteLength)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let n,
      a = this.workerNextTaskID++;
    (t = i.byteLength),
      (t = this._getWorker(a, t)
        .then(
          (e) => (
            (n = e),
            new Promise((e, t) => {
              (n._callbacks[a] = { resolve: e, reject: t }),
                n.postMessage(
                  { type: "decode", id: a, taskConfig: r, buffer: i },
                  [i]
                );
            })
          )
        )
        .then((e) => this._createGeometry(e.geometry)));
    return (
      t
        .catch(() => !0)
        .then(() => {
          n && a && this._releaseTask(n, a);
        }),
      _taskCache.set(i, { key: e, promise: t }),
      t
    );
  }
  _createGeometry(t) {
    var i = new BufferGeometry();
    t.index && i.setIndex(new BufferAttribute(t.index.array, 1));
    for (let e = 0; e < t.attributes.length; e++) {
      var r = t.attributes[e],
        n = r.name,
        a = r.array,
        s = r.itemSize,
        s = new BufferAttribute(a, s);
      "color" === n &&
        (this._assignVertexColorSpace(s, r.vertexColorSpace),
        (s.normalized = a instanceof Float32Array == !1)),
        i.setAttribute(n, s);
    }
    return i;
  }
  _assignVertexColorSpace(i, e) {
    if (e === SRGBColorSpace) {
      var r = new Color();
      for (let e = 0, t = i.count; e < t; e++)
        r.fromBufferAttribute(i, e).convertSRGBToLinear(),
          i.setXYZ(e, r.r, r.g, r.b);
    }
  }
  _loadLibrary(i, e) {
    let r = new FileLoader(this.manager);
    return (
      r.setPath(this.decoderPath),
      r.setResponseType(e),
      r.setWithCredentials(this.withCredentials),
      new Promise((e, t) => {
        r.load(i, e, void 0, t);
      })
    );
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (!this.decoderPending) {
      let i =
        "object" != typeof WebAssembly || "js" === this.decoderConfig.type;
      var e = [];
      i
        ? e.push(this._loadLibrary("draco_decoder.js", "text"))
        : (e.push(this._loadLibrary("draco_wasm_wrapper.js", "text")),
          e.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))),
        (this.decoderPending = Promise.all(e).then((e) => {
          var t = e[0],
            e =
              (i || (this.decoderConfig.wasmBinary = e[1]),
              DRACOWorker.toString()),
            t = [
              "/* draco decoder */",
              t,
              "",
              "/* worker */",
              e.substring(e.indexOf("{") + 1, e.lastIndexOf("}")),
            ].join("\n");
          this.workerSourceURL = URL.createObjectURL(new Blob([t]));
        }));
    }
    return this.decoderPending;
  }
  _getWorker(t, i) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        let i = new Worker(this.workerSourceURL);
        (i._callbacks = {}),
          (i._taskCosts = {}),
          (i._taskLoad = 0),
          i.postMessage({ type: "init", decoderConfig: this.decoderConfig }),
          (i.onmessage = function (e) {
            var t = e.data;
            switch (t.type) {
              case "decode":
                i._callbacks[t.id].resolve(t);
                break;
              case "error":
                i._callbacks[t.id].reject(t);
                break;
              default:
                console.error(
                  'THREE.DRACOLoader: Unexpected message, "' + t.type + '"'
                );
            }
          }),
          this.workerPool.push(i);
      } else
        this.workerPool.sort(function (e, t) {
          return e._taskLoad > t._taskLoad ? -1 : 1;
        });
      let e = this.workerPool[this.workerPool.length - 1];
      return (e._taskCosts[t] = i), (e._taskLoad += i), e;
    });
  }
  _releaseTask(e, t) {
    (e._taskLoad -= e._taskCosts[t]),
      delete e._callbacks[t],
      delete e._taskCosts[t];
  }
  debug() {
    console.log(
      "Task load: ",
      this.workerPool.map((e) => e._taskLoad)
    );
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e)
      this.workerPool[e].terminate();
    return (
      (this.workerPool.length = 0),
      "" !== this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL),
      this
    );
  }
}
function DRACOWorker() {
  let i, t;
  onmessage = function (e) {
    let s = e.data;
    switch (s.type) {
      case "init":
        (i = s.decoderConfig),
          (t = new Promise(function (t) {
            (i.onModuleLoaded = function (e) {
              t({ draco: e });
            }),
              DracoDecoderModule(i);
          }));
        break;
      case "decode":
        let n = s.buffer,
          a = s.taskConfig;
        t.then((e) => {
          var e = e.draco,
            t = new e.Decoder();
          try {
            var i = ((i, r, e, n) => {
                let a = n.attributeIDs,
                  s = n.attributeTypes,
                  o,
                  t,
                  l = r.GetEncodedGeometryType(e);
                if (l === i.TRIANGULAR_MESH)
                  (o = new i.Mesh()),
                    (t = r.DecodeArrayToMesh(e, e.byteLength, o));
                else {
                  if (l !== i.POINT_CLOUD)
                    throw new Error(
                      "THREE.DRACOLoader: Unexpected geometry type."
                    );
                  (o = new i.PointCloud()),
                    (t = r.DecodeArrayToPointCloud(e, e.byteLength, o));
                }
                if (!t.ok() || 0 === o.ptr)
                  throw new Error(
                    "THREE.DRACOLoader: Decoding failed: " + t.error_msg()
                  );
                var h,
                  c = { index: null, attributes: [] };
                for (h in a) {
                  var d = self[s[h]];
                  let e, t;
                  if (n.useUniqueIDs)
                    (t = a[h]), (e = r.GetAttributeByUniqueId(o, t));
                  else {
                    if (-1 === (t = r.GetAttributeId(o, i[a[h]]))) continue;
                    e = r.GetAttribute(o, t);
                  }
                  d = ((e, t, i, r, n, a) => {
                    var s,
                      o = a.num_components(),
                      l = (s = (s = i.num_points()) * o) * n.BYTES_PER_ELEMENT,
                      h = ((e, t) => {
                        switch (t) {
                          case Float32Array:
                            return e.DT_FLOAT32;
                          case Int8Array:
                            return e.DT_INT8;
                          case Int16Array:
                            return e.DT_INT16;
                          case Int32Array:
                            return e.DT_INT32;
                          case Uint8Array:
                            return e.DT_UINT8;
                          case Uint16Array:
                            return e.DT_UINT16;
                          case Uint32Array:
                            return e.DT_UINT32;
                        }
                      })(e, n),
                      c = e._malloc(l),
                      t =
                        (t.GetAttributeDataArrayForAllPoints(i, a, h, l, c),
                        new n(e.HEAPF32.buffer, c, s).slice());
                    return e._free(c), { name: r, array: t, itemSize: o };
                  })(i, r, o, h, d, e);
                  "color" === h && (d.vertexColorSpace = n.vertexColorSpace),
                    c.attributes.push(d);
                }
                return (
                  l === i.TRIANGULAR_MESH &&
                    (c.index = ((e, t, i) => {
                      var r,
                        n = 4 * (r = 3 * (r = i.num_faces())),
                        a = e._malloc(n),
                        t =
                          (t.GetTrianglesUInt32Array(i, n, a),
                          new Uint32Array(e.HEAPF32.buffer, a, r).slice());
                      return e._free(a), { array: t, itemSize: 1 };
                    })(i, r, o)),
                  i.destroy(o),
                  c
                );
              })(e, t, new Int8Array(n), a),
              r = i.attributes.map((e) => e.array.buffer);
            i.index && r.push(i.index.array.buffer),
              self.postMessage({ type: "decode", id: s.id, geometry: i }, r);
          } catch (e) {
            console.error(e),
              self.postMessage({ type: "error", id: s.id, error: e.message });
          } finally {
            e.destroy(t);
          }
        });
    }
  };
}
let vertexA = `
vec2 r_(vec2 a){a=vec2(dot(a,vec2(127.1,311.7)),dot(a,vec2(269.5,183.3)));return -1.+2.*fract(sin(a)*43758.5453123);}float n_(vec2 a){vec2 b=floor(a);vec2 c=fract(a);vec2 d=smoothstep(0.,1.,c);return mix(mix(dot(r_(b+vec2(0.,0.)),c-vec2(0.,0.)),dot(r_(b+vec2(1.,0.)),c-vec2(1.,0.)),d.x),mix(dot(r_(b+vec2(0.,1.)),c-vec2(0.,1.)),dot(r_(b+vec2(1.,1.)),c-vec2(1.,1.)),d.x),d.y)+.5;}uniform float z_;uniform float t_;uniform float a_;
`,
  vertexB = `
#include <begin_vertex>
vec3 s_=transformed;transformed=vec3(s_.x,s_.y,s_.z+a_*(n_(s_.xy*.1+t_)*2.-1.));
`,
  fragmentA = `
uniform float w_;uniform vec2 m_;uniform float f_;float a_(float a,float b){float c=fwidth(b);return smoothstep(a-c,a+c,b);}
`,
  fragmentB = `
#include <dithering_fragment>
float Y_=gl_FragCoord.y/w_;float m_=a_(m_.x,1.-Y_)*a_(m_.y,Y_);vec3 c_=mix(gl_FragColor.rgb,vec3(0.),f_);gl_FragColor=vec4(c_,gl_FragColor.a*m_);
`;
var Shader = {
  vertexA: vertexA,
  vertexB: vertexB,
  fragmentA: fragmentA,
  fragmentB: fragmentB,
};
class Load {
  constructor(a) {
    let s = _A.gl;
    var t = [];
    for (let e = 0; e < s.pageL; e++) {
      var i = s.page[e],
        r = s.dataGL[i].length;
      (s.model[i] = []), (s.uniform[i] = []);
      for (let e = 0; e < r; e++) {
        var n = s.dataGL[i][e];
        t.push({ page: i, index: e, file: n.file, scale: n.scale });
      }
    }
    let o = t.length;
    a.texL(o);
    var e = new GLTFLoader(),
      l = new DRACOLoader(),
      h =
        (l.setDecoderPath("/static/draco/"),
        e.setDRACOLoader(l),
        s.isD ? "d" : "m");
    for (let n = 0; n < o; n++) {
      let i = t[n],
        r = i.scale[h];
      e.load("/static/gltf/" + i.page + "/" + i.file + "/0.gltf", (e) => {
        e = e.scene;
        e.scale.set(r, r, r),
          (s.uniform[i.page][i.index] = []),
          e.traverse((e) => {
            var t;
            e.isMesh &&
              (((t = new MeshStandardMaterial({
                map: e.material.map,
                normalMap: e.material.normalMap,
                transparent: !0,
                depthTest: "pixar" === i.file,
              })).onBeforeCompile = (e) => {
                (e.uniforms.a_ = { value: 0 }),
                  (e.uniforms.t_ = { value: 0 }),
                  (e.uniforms.z_ = { value: 1 }),
                  (e.uniforms.f_ = { value: 0 }),
                  (e.uniforms.w_ = { value: s.winH_ }),
                  (e.uniforms.m_ = { value: [1, 1] }),
                  s.uniform[i.page][i.index].push(e.uniforms),
                  (e.vertexShader =
                    Shader.vertexA +
                    e.vertexShader.replace(
                      "#include <begin_vertex>",
                      Shader.vertexB
                    )),
                  (e.fragmentShader =
                    Shader.fragmentA +
                    e.fragmentShader.replace(
                      "#include <dithering_fragment>",
                      Shader.fragmentB
                    ));
              }),
              (e.material = t));
          }),
          s.scene.add(e),
          s.renderer.render(s.scene, s.camera);
        var t = new Box3().setFromObject(e).getCenter(new Vector3());
        (e.position.x = -t.x),
          (e.position.y = -t.y),
          (e.position.z = 0),
          (s.model[i.page][i.index] = e),
          a.inc(),
          n === o - 1 && ((s.loaded = !0), a.cb());
      });
    }
  }
}
class Shake {
  constructor() {
    this.FPS = 200;
    this.dataGL = _A.data.gl;
    var t = Object.keys(this.dataGL),
      i = t.length;
    (this.first = {}),
      (this.loop = {}),
      (this.now = {}),
      (this.fx = {}),
      (this.timer = {});
    for (let e = 0; e < i; e++) {
      let s = t[e];
      var r = this.dataGL[s].length;
      (this.first[s] = []),
        (this.loop[s] = []),
        (this.now[s] = []),
        (this.fx[s] = []),
        (this.timer[s] = []);
      for (let a = 0; a < r; a++)
        (this.first[s][a] = !0),
          (this.loop[s][a] = !1),
          (this.now[s][a] = 0),
          (this.fx[s][a] = new R.M({
            u: (e) => {
              let t = 1;
              e.pr < 0.3 && !this.first[s][a]
                ? (t = R.Remap(0, 0.3, 0, 1, e.pr))
                : 0.7 < e.pr && (t = 1 - R.Remap(0.7, 1, 0, 1, e.pr)),
                (t *= _A.glAmpl);
              var i = 6 * e.pr,
                e = Date.now();
              if (e - this.now[s][a] > this.FPS) {
                var r = _A.gl.uniform[s][a],
                  n = r.length;
                for (let e = 0; e < n; e++)
                  (r[e].t_.value = i), (r[e].a_.value = t);
                this.now[s][a] = e;
              }
            },
            cb: (e) => {
              var t;
              this.first[s][a] && (this.first[s][a] = !1),
                this.loop[s][a] &&
                  ((t = R.Rand.range(500, 1500, 0)),
                  (this.timer[s][a] = new R.De((e) => {
                    var t;
                    this.loop[s][a] &&
                      ((t = R.Rand.range(500, 1500, 0)),
                      this.fx[s][a].play({ d: t }));
                  }, t)),
                  this.timer[s][a].run());
            },
          }));
    }
  }
  on(e) {
    (this.first[e.page][e.index] = !0), (this.loop[e.page][e.index] = !0);
    var t = R.Rand.range(1e3, 1500, 0);
    this.fx[e.page][e.index].play({ d: t });
  }
  off(e) {
    (this.loop[e.page][e.index] = !1), R.Stop(this.timer[e.page][e.index]);
  }
}
class GL {
  constructor(e) {
    (this.isD = "d" === e),
      R.BM(this, ["resize", "loop"]),
      (this._ = [0, 0]),
      (this.cam = {}),
      (this.degToRad = Math.PI / 180),
      (this.dpr = devicePixelRatio),
      (this.loaded = !1),
      (this.model = {}),
      (this.uniform = {}),
      (this.dataGL = _A.data.gl),
      (this.page = Object.keys(this.dataGL)),
      (this.pageL = this.page.length),
      (this.scene = new Scene()),
      (this.renderer = new WebGLRenderer({
        canvas: R.G.id("gl"),
        alpha: !0,
        antialias: !0,
      })),
      this.renderer.setPixelRatio(this.dpr),
      (this.camera = new PerspectiveCamera(45, 1, 0.1, 500)),
      this.camera.position.set(0, 0, 30);
    e = new DirectionalLight(16777215, 3);
    e.position.set(35, 0, 60),
      this.camera.add(e),
      (this.boomChild = new Group()),
      this.boomChild.add(this.camera),
      (this.boom = new Group()),
      this.boom.add(this.boomChild),
      this.scene.add(this.boom),
      (this.shake = new Shake()),
      (this.raf = new R.Raf(this.loop)),
      this.resize({ first: !0 });
  }
  resize(e) {
    var t = _A,
      i = t.win,
      r = t.isLandscape,
      n = ((this.winH_ = i.h * this.dpr), 45 * _A.glScale),
      i =
        ((this.camera.aspect = t.winRatio.wh),
        (this.camera.fov = n),
        this.camera.updateProjectionMatrix(),
        this.renderer.setSize(i.w, i.h),
        n * this.degToRad),
      n = 2 * Math.tan(i / 2) * 30,
      i = n * t.winRatio.wh;
    (this.camAxe = r ? "y" : "x"),
      (this.camHide = r ? -n : i),
      (this.camAxeO = r ? "x" : "y"),
      (this.boomChild.position[this.camAxeO] = 0),
      R.Def(e.first) &&
        ((this.cam.tar = this.camHide), (this.cam.cur = this.camHide)),
      R.Und(e.first) && this.uWinH(),
      this.loop();
  }
  uWinH() {
    for (let e = 0; e < this.pageL; e++) {
      var t = this.page[e],
        i = this.uniform[t],
        r = i.length;
      for (let t = 0; t < r; t++) {
        var n = i[t].length;
        for (let e = 0; e < n; e++) i[t][e].w_.value = this.winH_;
      }
    }
  }
  load(e) {
    new Load(e);
  }
  run() {
    this.uWinH(), new R.RO(this.resize).on(), this.raf.run();
  }
  uMYUp(e) {
    var t = e.page;
    if (!R.Und(this.uniform[t])) {
      var i = e.index,
        r = e.mY,
        n = e.fade,
        a = this.uniform[t][i],
        s = a.length;
      for (let e = 0; e < s; e++)
        (a[e].m_.value = r), (a[e].f_.value = 0.7 * n);
      e = r[0] < 1 && r[1] < 1;
      this.model[t][i].visible !== e && (this.model[t][i].visible = e);
    }
  }
  camYFx(e) {
    let t = 0,
      i = 0;
    0 !== e.tar && (t = this.camHide * e.tar),
      0 !== e.cur && (i = this.camHide * e.cur),
      (this.cam.tar = t),
      (this.cam.cur = i);
  }
  loop() {
    var e, t, i;
    this.loaded &&
      ((e = _A),
      this.isD &&
        ((t = e.e.c),
        (i = R.Remap(0, e.win.w, 25, -25, t._[0])),
        (e = R.Remap(0, e.win.h, 15, -15, t._[1])),
        (t = i * this.degToRad),
        (i = e * this.degToRad),
        (this._[0] = R.Damp(this._[0], t, 0.08)),
        (this._[1] = R.Damp(this._[1], i, 0.08)),
        (this.boom.rotation.x = this._[1]),
        (this.boom.rotation.y = this._[0])),
      (this.cam.cur = R.Damp(this.cam.cur, this.cam.tar, 0.09)),
      (this.boomChild.position[this.camAxe] = -this.cam.cur),
      this.renderer.render(this.scene, this.camera));
  }
}
class Intro {
  constructor(e) {
    let t = _A;
    R.O(R.G.id("lo-no"), 1),
      e((e) => {
        (t.gl = new GL("d")),
          new Load$1((e) => {
            t.e.intro(),
              t.e.init(),
              t.e.run(),
              t.gl.run(),
              new R.De((e) => {
                new Fx$1();
              }, 1).run();
          });
      });
  }
}
class Fx {
  in() {
    let n = _A,
      a = n.is.p0,
      s = n.was.p0,
      o = n.t.e4.o2,
      l = n.t.e4.io.front,
      h = n.t.e4.io.back;
    var e = n.t.tr.d,
      t = R.G.class("p_")[0];
    let c = R.G.class("c", t)[0].style,
      d = R.G.class("b", n.e.p(0, "_"))[0].style,
      u,
      p,
      m =
        ((u = (
          s
            ? ((t = R.G.class("_")[1]),
              (t = R.G.class("p", t)[0]),
              (p = t.style),
              t.children)
            : R.G.class("p")
        )[0].style),
        n.route.new.page),
      f = n.route.old.page,
      g = n.e.hold.visible;
    g
      ? n.gl.shake.off({ index: 0, page: f })
      : (s
          ? n.gl.shake.off({ index: n.e.w._.p0.glIndex, page: f })
          : n.gl.camYFx({ cur: 0, tar: 0 }),
        n.gl.uMYUp({ page: f, mY: [0, 1], fade: 0, index: 0 })),
      a && n.gl.shake.on({ index: 0, page: "p0" }),
      (n.e.hold.visible = !1);
    (t = new R.M({
      d: e,
      u: (e) => {
        var t = l(e.pr),
          i = h(e.pr),
          i = R.Lerp(0, n.tr.y, i),
          r = R.Lerp(n.win.h, 0, t);
        a &&
          n.gl.uMYUp({
            page: m,
            mY: [R.Lerp(1, 0, t), 0],
            fade: 0,
            index: n.e.w._.p0.glIndex,
          }),
          s
            ? n.gl.uMYUp({
                page: f,
                mY: [0, t],
                fade: t,
                index: n.e.w._.p0.glIndex,
              })
            : g && n.gl.uMYUp({ page: f, mY: [0, t], fade: t, index: 0 }),
          (c.opacity = R.Lerp(0, 1, o(e.pr))),
          (u.transform = "translate3d(0, " + i + "px, 0)"),
          s && (p.clipPath = "inset(0 0 " + R.Lerp(0, 100, t) + "% 0)"),
          (d.transform = "translate3d(0, " + r + "px, 0)");
      },
    })),
      (e = new Page({ intro: !1 }));
    t.play(), e.play();
  }
}
class Mutation {
  constructor() {
    this.mutationFx = new Fx();
  }
  out() {
    var e = _A,
      t = (e.e.off(), e.target.classList);
    R.Def(t) && t.contains("u_") && t.add("fx"), e.page.update();
  }
  in() {
    var e = _A;
    e.page.insertNew(), e.e.init(), this.mutationFx.in();
  }
}
class Grid {
  constructor(e) {
    (this.col = e.col), (this.inDom = !1);
    e = document;
    R.BM(this, ["key"]), R.L(e, "a", "keydown", this.key);
  }
  key(e) {
    "Escape" === e.code && this.inDom
      ? this.click({ escape: !0 })
      : e.metaKey &&
        e.shiftKey &&
        "Digit1" === e.code &&
        this.click({ escape: !1 });
  }
  click(e) {
    this.inDom
      ? e.escape || "g_o" === this.gW.className
        ? this.remove()
        : (this.gW.className = "g_o")
      : this.add();
  }
  remove() {
    this.gW.parentNode.removeChild(this.gW), (this.inDom = !1);
  }
  add() {
    (this.gW = R.Cr("div")), (this.gW.id = "g_");
    var t = R.Cr("div"),
      i = ((t.id = "g"), []);
    for (let e = 0; e < this.col; e++)
      (i[e] = R.Cr("div")), t.appendChild(i[e]);
    this.gW.appendChild(t), document.body.prepend(this.gW), (this.inDom = !0);
  }
}
new Grid({ col: 9 }),
  new Ctrl({
    scroll: "v",
    font: ["ba4n"],
    device: "d",
    engine: E,
    transition: { intro: Intro, mutation: Mutation },
  });
