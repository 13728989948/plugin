// 控制鼠标移动
(function(b) {
    b.fn.hoverIntent = function(k, c) {
        var e = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        },
        e = b.extend(e, c ? {
            over: k,
            out: c
        }: k), a, l, g, r, n = function(b) {
            a = b.pageX;
            l = b.pageY
        }, v = function(c, m) {
            m.hoverIntent_t = clearTimeout(m.hoverIntent_t);
            
            if (Math.abs(g - a) + Math.abs(r - l) < e.sensitivity) return b(m).unbind("mousemove", n),
            m.hoverIntent_s = 1,
            e.over.apply(m, [c]);
            g = a;
            r = l;
            m.hoverIntent_t = setTimeout(function() {
                v(c, m)
            },
            e.interval)
        }, s = function(c) {
            var a = jQuery.extend({},
            c),
            f = this;
            f.hoverIntent_t && (f.hoverIntent_t = clearTimeout(f.hoverIntent_t));
            
            "mouseenter" == c.type ? (g = a.pageX, r = a.pageY, b(f).bind("mousemove", n), 1 != f.hoverIntent_s && (f.hoverIntent_t = setTimeout(function() {
                v(a, f)
            }, e.interval))) : (b(f).unbind("mousemove", n), 1 == f.hoverIntent_s && (f.hoverIntent_t = setTimeout(function() {
                f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
                f.hoverIntent_s = 0;
                e.out.apply(f, [a])
            },
            e.timeout)))
        };
        return this.bind("mouseenter", s).bind("mouseleave", s)
    }
})(jQuery);

// 控制移动效果
$(function() {
	
	// 计算主内容区
    function k() {
        if (! (1024 >= s || 0 >= $("#isHomepage").length || -1 != window.navigator.userAgent.indexOf("MSIE 6"))) {
            var d = $(window).height();
            if (d <= m) {
                f.find("p").eq(1).hide();
                var h = q.height()
            } else d > m && (f.find("p").show(), h = q.height());
            var d = x + v - h,
            h = x - h + 46,
            a = $(document).scrollTop();
            a > z ? (q.addClass("siku_CategoryFixed"), a > d ? q.css({
                top: h,
                position: "absolute"
            }) : q.css({
                top: 0,
                position: "fixed"
            })) : (q.removeClass("siku_CategoryFixed"), q.css({
                top: 0,
                position: "absolute"
            }))
        }
    }
    
    $(".siku_iteams li:odd").addClass("odd");// 添加ODD效果
    $(".item_pco2:last").css("padding-bottom", "14px");// 设置每一个次栏的内下边距
    var c = $("#siku_content li");// 每一个小格
    
    900 >= window.screen.height && 768 < window.screen.height ? $("#siku_content li:gt(3)").addClass("itemSelected") : 768 == window.screen.height ? $("#siku_content li:gt(1)").addClass("itemSelected") : 768 > window.screen.height && $("#siku_content li").addClass("itemSelected");
    var e = $("#header_csz").height() - 46,
    a = 500;
    
    // 滑动鼠标中键
    window.onscroll = function() {
        function d() {
            for (var d = 0; d < c.length; d++) c.eq(d).find(".item_pco2").stop().animate({
                opacity: 1
            },
            a),
            c.eq(d).stop().animate({
                height: 62,
                padding: "22px 0 18px 0"
            },
            a),
            c.eq(d).removeClass("itemSelected")
        }
        if ( - 1 == window.navigator.userAgent.indexOf("MSIE 6")) {
            var h = document.documentElement.scrollTop || document.body.scrollTop,
            b = parseInt(h / 200);
            if (h > e) for (d(), b >= c.length && (b = c.length), h = 0; h <= b - 1; h++) c.eq(h).find(".item_pco2").stop().animate({
                opacity: 0
            },
            a),
            c.eq(h).stop().animate({
                height: 37,
                padding: "8px 0"
            },
            a),
            c.eq(h).addClass("itemSelected");
            else d(),
            900 >= window.screen.height && 768 < window.screen.height && ($("#siku_content li:gt(3)").find(".item_pco2").stop().animate({
                opacity: 0
            },
            a), $("#siku_content li:gt(3)").stop().animate({
                height: 37,
                padding: "8px 0"
            },
            a), $("#siku_content li:gt(3)").addClass("itemSelected")),
            768 == window.screen.height && ($("#siku_content li:gt(1)").find(".item_pco2").stop().animate({
                opacity: 0
            },
            a), $("#siku_content li:gt(1)").stop().animate({
                height: 37,
                padding: "8px 0"
            },
            a), $("#siku_content li:gt(1)").addClass("itemSelected")),
            768 > window.screen.height && ($("#siku_content li:lt(6)").find(".item_pco2").stop().animate({
                opacity: 0
            },
            a), $("#siku_content li").stop().animate({
                height: 37,
                padding: "8px 0"
            },
            a), $("#siku_content li:lt(6)").addClass("itemSelected"))
        }
    };
    $("#skCategory").hoverIntent({
        interval: 0,
        over: function() {},
        timeout: 150,
        out: function() {
            $(this).find(".subc_con").hide();
            $(this).find(".siku_iteams li").removeClass("hover");
            $("#subCategory").css("top", "-10px")
        }
    });
    
    // 移动显示右侧子栏目
    $("#siku_content li").hoverIntent({
        interval: 80,
        over: function() {
            $(this).addClass("hover").siblings().removeClass("hover");
            $(this).removeClass(".odd");
            var d = $(this).index(),
            a = $("#subCategory"),
            d = a.children().eq(d);
            if (0 == d.find("div").length) a.children().hide();
            else {
                var b = document.documentElement.clientHeight,
                c = document.documentElement.scrollTop + document.body.scrollTop,
                f = $(this).offset().top,
                e = $(this)[0].offsetTop,
                b = b - f + c,
                c = d.height(),
                b = b - c;
                0 > b && (e = e + b - 49);
                0 > e && (e = 0);
                null == a.data("hover") ? (a.data("hover", !0), d.fadeIn().siblings().hide(), a.css("top", e - 10 + "px"), a.animate({
                    left: "+=40"
                },
                200)) : (d.show().siblings().hide(), a.animate({
                    top: e - 10
                }))
            }
        },
        timeout: 0,
        out: function() {
            $(".sub_con").hide()
        }
    });
    
    // 定义,初始化
    var g = 0, r = null;
    var v = $("#header_csz").height()
    	, s = window.screen.width, q = $(".siku_Category")
    	, m = 760, f = $(".Category_banner")
    	, x = $(document).height() - $("#header_csz").height() - $("#footer_csz").height() - 1
    	, z = $("#header_csz").height() - 46
    	, p = $(".showHide")
    	,t
    	,u = $(".c_t");
    
    k();// 计算主内容区
    $(window).bind("scroll", k);// 绑定滑动事件
    $(window).bind("resize", k);// 绑定重定大小事件
    
    1024 >= s && ($("body").attr({
        id: "skSmall"
    }), $(".searchKey").width(380), p.css("display", "none"), $(".c_t").addClass("c_t01"), $(window).unbind("scroll", k), $(window).unbind("resize", k));
    0 < $("#isHomepage").length && 1024 < s ? p.css("display", "block") : (p.css("display", "none"), $(window).unbind("scroll", k), $(window).unbind("resize", k), $(".column").hoverIntent({
        interval: 0,
        over: function() {
            clearTimeout(t);
            p.show();
            u.removeClass("c_t01")
        },
        timeout: 0,
        out: function() {
            t = setTimeout(function() {
                p.hide();
                u.addClass("c_t01")
            },
            300)
        }
    }), p.hoverIntent({
        interval: 0,
        over: function() {
            clearTimeout(t);
            p.show();
            u.removeClass("c_t01")
        },
        timeout: 0,
        out: function() {
            t = setTimeout(function() {
                p.hide();
                u.addClass("c_t01")
            },
            300)
        }
    }), $(".subc_con").hoverIntent({
        interval: 0,
        over: function() {
            clearTimeout(t)
        },
        timeout: 0,
        out: function() {
            t = setTimeout(function() {
                p.hide();
                u.addClass("c_t01")
            },
            500)
        }
    }));
    
    // 绑定点击返回头部按钮的效果(可以删掉)
    var w = $('<div class="backToTop pngfix">&nbsp;</div>').appendTo($("body")).attr("title", "\u56de\u5230\u9876\u90e8").click(function() {
        $("html, body").animate({
            scrollTop: 0
        },
        120)
    }),
    y = function() {
        var a = $(document).scrollTop(),
        b = $(window).height();
        50 < a ? w.fadeIn() : w.fadeOut();
        window.XMLHttpRequest || w.css("top", a + b - 96)
    };
    $(window).bind("scroll", y);
    $(function() {
        y()
    });
});

// 控制品牌区显示(可以删掉)
(function(b) {
    b.fn.maskPic = function(k) {
        var c = b.extend({},
        b.fn.maskPic.defaults, k);
        return this.each(function() {
            var e = b(this),
            a = e.find("li");
            a.each(function(a) {
                a = b(this);
                var g = b(this).find("img").attr("width"),
                e = b(this).find("img").attr("height"),
                g = "<span style='display:none;width:" + g + "px;height:" + e + "px;position:absolute;left:0px; top:0px; background: none repeat scroll 0% 0% rgb(0, 0, 0); opacity:0.2; cursor: pointer;' class='" + c.maskClass + "'></span>";
                a.find("a").append(g)
            });
            a.hover(function() {
                b(this).find("." + c.maskClass).css({
                    opacity: 0,
                    display: "block"
                }).end().siblings().find("." + c.maskClass).css({
                    opacity: c.opacity,
                    display: "block"
                })
            });
            e.mouseleave(function() {
                b("." + c.maskClass).css("opacity", 0)
            })
        })
    };
    b.fn.maskPic.defaults = {
        maskClass: "mask",
        opacity: "0.2"
    }
})(jQuery);