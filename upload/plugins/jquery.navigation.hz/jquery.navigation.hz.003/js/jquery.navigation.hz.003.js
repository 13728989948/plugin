$(document).ready(function () {
    $("ul#nav li a").css({"opacity": 0}).hover(function () {
        $(this).stop().animate({"opacity": 1}, 200);// Change fade-in speed
    }, function () {
        $(this).stop().animate({"opacity": 0}, 100);// Change fade-out speed
    });
});