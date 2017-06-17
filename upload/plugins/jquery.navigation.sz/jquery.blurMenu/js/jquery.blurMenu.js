$(function () {
    var menu = $('.menu'), a = menu.find('a');

    a.wrapInner($('<span />'));

    a.each(function () {
        var t = $(this), span = t.find('span');
        for (i = 0; i < 5; i++) {
            span.clone().appendTo(t);
        }
    });

    a.hover(function () {
        var t = $(this), s = t.siblings('a');
        t.toggleClass('shadow');
        s.toggleClass('blur');
    });
});