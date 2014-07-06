! function (e) {
    e.picturefill = function () {
        var t = null;
        "number" == typeof window.innerWidth ? t = window.innerWidth : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? t = document.documentElement.clientWidth : document.body && (document.body.clientWidth || document.body.clientHeight) && (t = document.body.clientWidth);
        for (var n = e.document.getElementsByTagName("span"), i = 0, d = n.length; d > i; i++) {
            var o = n[i];
            if ((" " + o.className + " ").indexOf(" responsive-image ") > -1) {
                var l = o.getAttribute(768 >= t ? "data-mobile" : "data-desktop");
                o.style.backgroundImage = "url(" + l + ")"
            }
        }
    }, e.addEventListener ? (e.addEventListener("resize", e.picturefill, !1), e.addEventListener("DOMContentLoaded", function () {
        e.picturefill(), e.removeEventListener("load", e.picturefill, !1)
    }, !1), e.addEventListener("load", e.picturefill, !1)) : e.attachEvent && e.attachEvent("onload", e.picturefill)
}(this);