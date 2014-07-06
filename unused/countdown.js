function setupCountdown(n) {
    var t = n.find("td.days"),
        e = n.find("td.hours"),
        o = n.find("td.minutes"),
        d = n.find("td.seconds"),
        u = parseInt(n.attr("datetime")) || 0;
    return {
        elem: n,
        endsAt: u,
        daysCell: t,
        hoursCell: e,
        minutesCell: o,
        secondsCell: d
    }
}

function updateCountdown(n, t) {
    var e = n.endsAt - t,
        o = 0 >= e ? 0 : Math.floor(e / SECONDS_IN_A_DAY);
    e -= o * SECONDS_IN_A_DAY;
    var d = 0 >= e ? 0 : Math.floor(e / SECONDS_IN_A_HOUR);
    e -= d * SECONDS_IN_A_HOUR;
    var u = 0 >= e ? 0 : Math.floor(e / SECONDS_IN_A_MINUTE);
    e -= u * SECONDS_IN_A_MINUTE;
    var a = 0 >= e ? 0 : e;
    n.daysCell.html(padNumber(o)), n.hoursCell.html(padNumber(d)), n.minutesCell.html(padNumber(u)), n.secondsCell.html(padNumber(a))
}

function padNumber(n) {
    return 10 > n ? "0" + n : n > 99 ? "99" : n
}

function updateCountdowns() {
    for (var n = Math.round((new Date).getTime() / 1e3), t = 0; t < countdowns.length; t++) updateCountdown(countdowns[t], n)
}
var SECONDS_IN_A_DAY = 86400,
    SECONDS_IN_A_HOUR = 3600,
    SECONDS_IN_A_MINUTE = 60,
    countdowns = [];
$("time.countdown").each(function (n, t) {
    countdowns.push(setupCountdown($(t)))
}), window.setInterval(updateCountdowns, 1e3), updateCountdowns();