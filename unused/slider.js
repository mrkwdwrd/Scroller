function slider() {
    function e() {
        h = $(window).height()
    }

    function t(e, t, n) {
        n = "undefined" != typeof n ? n : !0;
        var o = m[e];
        0 == e && n && (t = Math.max(t, -h));
        var i = o && o.style;
        i && (i.webkitTransform = i.msTransform = i.MozTransform = i.OTransform = "translate3d(0," + t + "px,0)")
    }

    function n(e, t) {
        var n = e && e.style;
        n && (n.transition = "transform " + t, n.webkitTransition = "-webkit-transform " + t, n.MozTransition = "-moz-transform " + t, n.OTransition = "-o-transform " + t)
    }

    function o(e, n) {
        e == m.length - 2 && t(0, -h + Math.min(n, 0), !1), e == m.length - 1 && t(0, -h - h + n, !1), t(e - 1, -h + n), t(e, n), t(e + 1, h + n)
    }

    function i() {
        for (var e = 0; e < m.length; e++) n(m[e], "0s")
    }

    function r() {
        for (var e = 0; e < m.length; e++) n(m[e], l + "ms")
    }

    function a() {
        e(), document.body.style.height = h
    }

    function s(e, t) {
        var n = e && e.style;
        n && (n.transformStyle = n.webkitTransformStyle = n.mozTransformStyle = "preserve-3d", n.perspective = n.webkitPerspective = n.mozPerspective = "1000px", n.backfaceVisibility = n.webkitBackfaceVisibility = "hidden", n.position = "absolute", n.top = 0, n.left = 0, n.right = 0, n.bottom = 0, n.overflow = "hidden", n.minHeight = 0, n.webkitTransform = n.msTransform = n.MozTransform = n.OTransform = "translate3d(0,100%,0)", n.zIndex = 50 - t)
    }

    function c() {
        a(), w.style.overflowY = "hidden", m = [];
        for (var e = 0; e < w.children.length; e++) {
            var n = w.children[e];
            "section" == n.tagName.toLowerCase() && $(n).is(":visible") && m.push(w.children[e])
        }
        for (var e = 0; e < m.length; e++) s(m[e], e);
        i(), t(u, 0), t(u + 1, h), r()
    }

    function f() {
        o(u, h), u--
    }

    function d() {
        o(u, -h), u++
    }
    var h, m, v, l = 300,
        u = 0,
        g = {},
        w = document.getElementById("page"),
        y = {
            handleEvent: function (e) {
                switch (e.type) {
                case "touchstart":
                    this.start(e);
                    break;
                case "touchmove":
                    this.move(e);
                    break;
                case "touchend":
                    this.end(e);
                    break;
                case "resize":
                    a()
                }
                e.stopPropagation()
            },
            start: function (e) {
                var t = e.touches[0];
                g = {
                    x: t.pageX,
                    y: t.pageY,
                    time: (new Date).getTime()
                }, i(), o(u, 0), v = {}, w.addEventListener("touchmove", this, !1), w.addEventListener("touchend", this, !1)
            },
            move: function (e) {
                if (!(e.touches.length > 1 || e.scale && 1 !== e.scale)) {
                    e.preventDefault();
                    var t = e.touches[0];
                    v = {
                        x: t.pageX - g.x,
                        y: t.pageY - g.y
                    }, 0 == u && v.y > 0 || u == m.length - 1 && v.y < 0 || o(u, v.y)
                }
            },
            end: function () {
                if (r(), v.y) {
                    var e = ((new Date).getTime() - g.time, Math.abs(v.y) > 20),
                        t = v.y < 0 ? "next" : "prev";
                    ("prev" == t && 0 == u || "next" == t && u == m.length - 1) && (e = !1), e ? "next" == t ? d() : f() : o(u, 0), event.preventDefault()
                }
                w.removeEventListener("touchmove", y, !1), w.removeEventListener("touchend", y, !1)
            }
        };
    if (c(), window.addEventListener) {
        var p = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
        p && w.addEventListener("touchstart", y, !1), window.addEventListener("resize", y, !1)
    }
    for (var b = document.getElementsByTagName("i"), T = 0; T < b.length; T++) {
        var k = b[T];
        (" " + k.className + " ").indexOf(" slide-down ") > -1 && k.addEventListener("click", d, !1)
    }
}