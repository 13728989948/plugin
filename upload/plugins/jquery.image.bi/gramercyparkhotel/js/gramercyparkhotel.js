var GPH = {};
var isMobile = "ontouchstart" in document.documentElement;// 是否为移动设备

// 重新Resize背景
GPH.ResizeBackgrounds = function () {
    var t = $win.width(), n = $win.height(), r, i, s, o, u;
    var l = function (e, t, n) {
        return n * t / e;
    };
    var c = function (e, t, n) {
        return n * e / t;
    };
    $doc.find(".background_image").each(function () {
        r = $(this), i = o = parseInt(r.attr("width"), 10), s = u = parseInt(r.attr("height"), 10),
        isMobile || (o == 1024 ? (i = o = 1440, s = u = u * 1440 / 1024) : (s = u = 1440, i = o = o * 1440 / 1024)), t = $win.width(), n = $win.height(),
        i < t && (o = t, u = l(i, s, o)), .5 * u < n && (u = n * 1.5, o = c(i, s, u)), o < t && (o = t * 1.5, u = l(i, s, o)),
            r.css({
                width: o + "px",
                height: u + "px"
            });
            r.addClass("RESIZED").css({
                "margin-left": -1 * (o - t) / 2 + "px"
            });
    });
};

$(function () {
    window.$win = $(window);
    window.$doc = $(document);
    window.$body = $($doc.find("body"));

    // 三角形动画效果
    var sjxAni = function () {
        var scDia = $doc.find("#scroll_diamond"),
            flag = false;
        scDia.find(".inner_scroll_1").animate({
            opacity: 1
        }, 300, function () {
            scDia.find(".inner_scroll_2").animate({
                opacity: 1
            }, 300, function () {
                scDia.find(".inner_scroll_3").animate({
                    opacity: 1
                }, 300, function () {
                    scDia.find(".inner_scroll_1, .inner_scroll_2, .inner_scroll_3").animate({
                        opacity: 0
                    }, 500, function () {
                        setTimeout(function () {
                            flag || (flag = true, sjxAni());
                        }, 300)
                    });
                });
            });
        });
    };

    // 三角形动画效果
    sjxAni();

    // 重新Resize背景
    GPH.ResizeBackgrounds();
});