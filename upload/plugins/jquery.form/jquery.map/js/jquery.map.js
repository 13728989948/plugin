$(function () {
    var scroll_timer;
    var displayed = false;
    var $message = $('#top-link');
    var $window = $(window);
    var top = $(document.body).children(0).position().top;
    $window.scroll(function () {
        window.clearTimeout(scroll_timer);
        scroll_timer = window.setTimeout(function () {
            if ($window.scrollTop() <= top) {
                displayed = false;
                $message.fadeOut();
            } else if (displayed == false) {
                displayed = true;
                $message.stop(true, true).fadeIn().click(function () {
                    $message.fadeOut();
                });
            }
        }, 300);
    });
});