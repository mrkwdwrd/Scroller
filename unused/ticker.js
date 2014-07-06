function ticker(e) {
    function t() {
        var e = "/tickers?offer_id=" + window.tickerSettings.offerId + "&include_links=" + (window.tickerSettings.includeLinks ? 1 : 0);
        $.get(e, function (e) {
            e.length > 0 && (c.refresh(e), setTimeout(t, n))
        })
    }

    function i() {
        var t = c.get();
        null == t ? e.innerHTML = "Loading ..." : (e.style.opacity = 0, window.setTimeout(function () {
            e.innerHTML = window.tickerSettings.formatHtml(t.text), e.style.opacity = 1
        }, r)), setTimeout(i, s)
    }
    var n = 2e4,
        o = 10,
        s = 5e3,
        r = 300,
        u = function (e) {
            var t = {
                queue: [],
                index: -1,
                constructor: function (e) {
                    this.queue = e.slice(0, o);
                    var t = parseInt(this.readCookie("vinomofo-ticker-last-head")),
                        i = parseInt(this.readCookie("vinomofo-ticker-last-ix"));
                    this.queue.length > 0 && null != t && null != i && t == this.queue[0].id ? this.index = i : this.queue.length > 0 && (this.createCookie("vinomofo-ticker-last-head", this.queue[0].id, 730), this.createCookie("vinomofo-ticker-last-ix", this.index, 730))
                },
                get: function () {
                    return this.createCookie("vinomofo-ticker-last-ix", this.index, 730), this.index = (this.index + 1) % o, this.queue.length < this.index ? null : this.queue[this.index]
                },
                exists: function (e) {
                    for (var t = 0; t < this.queue.length; t++)
                        if (e.id == this.queue[t].id) return !0;
                    return !1
                },
                refresh: function (e) {
                    for (var t = !1, i = 0; i < e.length; i++)
                        if (!this.exists(e[i]) && e[i].this_offer) {
                            t = !0;
                            break
                        }
                    this.queue = e.slice(0, o), this.queue.length > 0 && this.createCookie("vinomofo-ticker-last-head", this.queue[0].id, 730), t && (this.index = -1)
                },
                createCookie: function (e, t, i) {
                    var n;
                    if (i) {
                        var o = new Date;
                        o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3), n = "; expires=" + o.toGMTString()
                    } else n = "";
                    document.cookie = escape(e) + "=" + escape(t) + n + "; path=/"
                },
                readCookie: function (e) {
                    for (var t = escape(e) + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                        for (var o = i[n];
                            " " === o.charAt(0);) o = o.substring(1, o.length);
                        if (0 === o.indexOf(t)) return unescape(o.substring(t.length, o.length))
                    }
                    return null
                },
                eraseCookie: function (e) {
                    this.createCookie(e, "", -1)
                }
            };
            return t.constructor(e), t
        };
    if (e) {
        window.tickerSettings = $.extend({
            includeLinks: !0,
            offerId: 0,
            formatHtml: function (e) {
                return e
            }
        }, window.tickerSettings);
        var c = u(window.tickerContents);
        e.style.transition = e.style.webkitTransition = e.style.MozTransition = e.style.OTransition = "opacity " + r + "ms", setTimeout(t, n), i()
    }
}
ticker(document.getElementById("ticker"));