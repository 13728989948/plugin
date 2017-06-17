$(function () {
    /*
     * Jquery Horizontal Slide Navigation webmaster@chazzuka.com
     * http://www.chazzuka.com October 8th 2008 @ Denpasar, Bali Paradise Island
     */
    $("ul li a").each(function () {
        $(this).hover(function () {
            $(this).animate({
                width: "400px"
            }, {
                queue: false,
                duration: 450
            });
        }, function () {
            $(this).animate({
                width: "128px"
            }, {
                queue: false,
                duration: 450
            });
        });
    });
    /*
     * To use this you need to load jquery easing plugins
     */
    $("ul.easing li a").each(function () {
        $(this).hover(function () {
            $(this).animate({
                width: "400px"
            }, {
                queue: false,
                duration: 450,
                easing: 'easeOutBack'
            });
        }, function () {
            $(this).animate({
                width: "128px"
            }, {
                queue: false,
                duration: 450,
                easing: 'easeInBack'
            });
        });
    });
});