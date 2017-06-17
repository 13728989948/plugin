$(function () {
    $('#webmenu li').hover(function () {
        $(this).children('ul').stop(true, true).show();
    }, function () {
        $(this).children('ul').stop(true, true).hide();
    });

    $('#webmenu li').hover(function () {
        $(this).children('div').stop(true, true).show();
    }, function () {
        $(this).children('div').stop(true, true).hide();
    });
});
  