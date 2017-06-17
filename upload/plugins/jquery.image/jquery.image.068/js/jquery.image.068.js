$(document).ready(function () {
    jQuery('.flexslider').flexslider({
        animation: "slide",
        start: function (slider) {
            $('body').removeClass('loading');
        }
    });

    //SLIDE TOGGLE
    jQuery(".minicart_link").toggle(function () {
        $('.cart_drop').slideDown(300);
    }, function () {
        $('.cart_drop').slideUp(300);
    });
});