$(function () {
    // Vertical
    $("#vertical div a").hover(function () {
        $("img", this).stop().animate({top: "-130px"}, {queue: false, duration: 200});
    }, function () {
        $("img", this).stop().animate({top: "0px"}, {queue: false, duration: 200});
    });
    // Horizontal
    $("#horizontal div a").hover(function () {
        $("img", this).stop().animate({left: "-296px"}, {queue: false, duration: 200});
    }, function () {
        $("img", this).stop().animate({left: "0px"}, {queue: false, duration: 200});
    });
});