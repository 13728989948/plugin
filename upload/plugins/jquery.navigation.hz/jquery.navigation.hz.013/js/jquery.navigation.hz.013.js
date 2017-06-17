$(document).ready(function () {
    $("#menu1 li").prepend("<span></span>");

    $("#menu1 li").each(function () {
        var linkText = $(this).find("a").html();
        $(this).find("span").show().html(linkText);
    });

    $("#menu1 li").hover(function () {
        $(this).find("span").stop().animate({
            marginTop: "-40"
        }, 250);
    }, function () {
        $(this).find("span").stop().animate({
            marginTop: "0"
        }, 250);
    });

    /* 2nd example */
    $("#menu2 li").prepend("<span></span>");

    $("#menu2 li").each(function () {
        var linkText = $(this).find("a").html();
        $(this).find("span").show().html(linkText);
    });

    $("#menu2 li").hover(function () {
        $(this).find("span").stop().animate({
            marginTop: "-40"
        }, 250);
    }, function () {
        $(this).find("span").stop().animate({
            marginTop: "0"
        }, 250);
    });
});