$(document).ready(function () {
    $(".container img:first-child").addClass('last');

    $(".container img").click(function () {
        $(this).fadeOut('normal', function () {

            if ($(this).hasClass('last')) {
                $("img", $(this).parent()).css('z-index', 10);
            } else {
                $(this).css('z-index', 9)
            }

            $(this).show();
        });
    });

    // show tooltip when the mouse is moved over container
    $(".container").mouseenter(function () {
        $(".tooltip", this).show();

    }).mousemove(function (e) {
        // update position
        $(".tooltip", this).css({
            'top': e.pageY - this.offsetTop + 8,
            'left': e.pageX - this.offsetLeft + 15
        });

    }).mouseleave(function () {
        $(".tooltip", this).hide();
    });

    // hide tooltip when the mouse is moved over caption
    $(".container span").mouseenter(function () {
        $(".tooltip", $(this).parent()).hide();

    }).mouseleave(function () {
        $(".tooltip", $(this).parent()).show();
    });
});