$(document).ready(function () {

    var dleft = $('.lavalamp li.active').offset().left - $('.lavalamp').offset().left;
    var dwidth = $('.lavalamp li.active').width() + "px";

    $('.floatr').css({
        "left": dleft + "px",
        "width": dwidth
    });

    $('li').hover(function () {
            var selfFst = $(this).offset();
            if (!selfFst) {
                return;
            }

            var left = selfFst.left - ($(this).parents('.lavalamp').offset().left + 15);
            var width = $(this).width() + "px";
            var sictranslate = "translate(" + left + "px, 0px)";

            $(this).parent('ul').next('div.floatr').css({
                "width": width,
                "-webkit-transform": sictranslate,
                "-moz-transform": sictranslate
            });
        },

        function () {
            var liActFst = $(this).siblings('li.active').offset();
            if (!liActFst) {
                return;
            }

            var left = liActFst.left - ($(this).parents('.lavalamp').offset().left + 15);
            var width = $(this).siblings('li.active').width() + "px";

            var sictranslate = "translate(" + left + "px, 0px)";

            $(this).parent('ul').next('div.floatr').css({
                "width": width,
                "-webkit-transform": sictranslate,
                "-moz-transform": sictranslate
            });
        }).click(function () {

        $(this).siblings('li').removeClass('active');

        $(this).addClass('active');

        return false;
    });
});