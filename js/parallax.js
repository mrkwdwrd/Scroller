$(function () {
    window.parallaxCount = 0, window.createParallaxPlaceholder = createParallaxPlaceholder = function (a, e) {
        var l = parallaxCount++;
        a.data("pid", l), $("body").css("overflow", "hidden");
        var o = $("<div></div>").addClass("parallax-placeholder").css("position", "absolute").css("top", 0).css("left", 0).css("right", 0).css("height", a.outerHeight()).css("visibility", e ? "visible" : "hidden").css("background-color", a.css("background-color")).css("z-index", 100).css("overflow", "hidden").attr("data-pid", l),
            t = a.css("background-image").split(",").reverse(),
            i = a.css("background-size"),
            r = a.data("parallax") || [.18];
        $.each(t, function (a, e) {
            var l = r[a % r.length],
                t = $("<div></div>").addClass("parallax-image").data("speed", l).css("background-image", e).css("background-position", "center center").css("background-size", i).css("background-repeat", "no-repeat").css("position", "absolute").css("top", 0).css("left", 0).css("right", 0).css("height", Math.max(750, .95 * $(window).height()));
            o.append(t)
        }), a.css("background-image", "none"), a.css("background-color", "transparent"), 0 == $("#parallax-placeholders").length && $("<div></div>").attr("id", "parallax-placeholders").insertBefore($("#page")), $("#parallax-placeholders").append(o)
    }, window.getParallaxPlaceholderFromEl = getParallaxPlaceholderFromEl = function (a) {
        return $('.parallax-placeholder[data-pid="' + a.data("pid") + '"]')
    }, window.isElementInViewport = isElementInViewport = function (a) {
        var e = a.getBoundingClientRect();
        return e.bottom >= 0 && e.top <= (window.innerHeight || document.documentElement.clientHeight)
    }, window.setYTransform = setYTransform = function (a, e) {
        a.css("transform", "translate3d(0px, " + e + "px, 0px)"), a.css("-webkit-transform", "translate3d(0px, " + e + "px, 0px)"), a.css("-moz-transform", "translate3d(0px, " + e + "px, 0px)")
    }, window.positionParallaxScrollElements = positionParallaxScrollElements = function () {
        var a = $(window).height();
        $("[data-parallax]").each(function (e, l) {
            var o = $(l),
                t = window.getParallaxPlaceholderFromEl(o);
            if (window.isElementInViewport(l)) {
                t.css("visibility", "visible");
                var i = l.getBoundingClientRect();
                window.setYTransform(t, i.top), t.find(".parallax-image").each(function (e, l) {
                    l = $(l);
                    var o = l.data("speed"),
                        t = Math.max(0, l.outerHeight() - a);
                    window.setYTransform(l, -i.top * (1 - o) - t / 2)
                })
            } else t.css("visibility", "hidden")
        })
    }, window.setupScrollParallax = setupScrollParallax = function () {
        $("[data-parallax]").each(function (a, e) {
            window.createParallaxPlaceholder($(e), 0 == a)
        }), window.positionParallaxScrollElements(), $(window).on("resize", function () {
            $("[data-parallax]").each(function (a, e) {
                e = $(e);
                var l = window.getParallaxPlaceholderFromEl(e);
                l.css("height", e.outerHeight()).find(".parallax-image").css("height", Math.max(750, .95 * $(window).height()))
            }), window.positionParallaxScrollElements()
        }), $("#page").on("scroll", window.positionParallaxScrollElements)
    };
    var a = navigator.userAgent || navigator.vendor || window.opera,
        e = /Android|iPhone|iPod|iPad|BlackBerry/i.test(a);
    e || $("html").hasClass("ie-old") || window.setupScrollParallax()
});