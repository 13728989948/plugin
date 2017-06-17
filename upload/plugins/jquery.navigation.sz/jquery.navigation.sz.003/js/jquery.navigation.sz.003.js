// JavaScript Document
function navList(id) {
    var time = 200;

    var $obj = $("#J_navlist");
    $obj.find("h4").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
    $obj.find("p").hover(function () {
        if ($(this).hasClass("on")) {
            return;
        }
        $(this).addClass("hover");
    }, function () {
        if ($(this).hasClass("on")) {
            return;
        }
        $(this).removeClass("hover");
    });
    $obj.find("h4").click(function () {
        var $div = $(this).siblings(".list-item");
        if ($(this).parent().hasClass("selected")) {
            $div.slideUp(time);
            $(this).parent().removeClass("selected");
        }
        if ($div.is(":hidden")) {
            $("#J_navlist li").find(".list-item").slideUp(time);
            $("#J_navlist li").removeClass("selected");
            $(this).parent().addClass("selected");
            $div.slideDown(time);

        } else {
            $div.slideUp(time);
        }
    });
}