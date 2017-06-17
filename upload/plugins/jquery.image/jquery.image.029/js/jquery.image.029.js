$(function () {
    $('.temphol').hover(function () {
        $(this).children('.front').stop().animate({"top": '160px'}, 500);
    }, function () {
        $(this).children('.front').stop().animate({"top": '7px'}, 300);
    });
});