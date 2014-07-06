$(function () {
    $(".signup-link").on("click", function () {
        var n;
        n = $(this).closest(".deal-preview").length ? "deal preview " + $(this).closest(".deal-preview").index(".deal-preview") : $(this).closest("section").attr("class"), n = "Signup button in " + n, ga("send", "event", "onboarding", "signup-click", n, 1), $("#menu .login-section").hide(), $("#menu .signup-section").show();
        var i = $(this).hasClass("btn-email"),
            e = $("#menu .signup-section .btn-facebook, #menu .signup-section .or");
        i ? e.hide() : e.show()
    }), $(".final-signup-form form").on("submit", function () {
        ga("send", "event", "onboarding", "signup-click", "Signup button in final signup form", 1)
    }), $(".login-link").on("click", function () {
        $("#menu .signup-section").hide(), $("#menu .login-section").show()
    });
    var n = navigator.userAgent || navigator.vendor || window.opera,
        i = /Android|iPhone|iPod|BlackBerry/i.test(n);
    i && slider()
});