﻿$(function () {
    $("#navigator").css("overflow", "hidden");
});

$(function () {
    $("#navList").hover(function () {
        $("#navList li a:not(:animated)").animate({width: "66px"}, 100);
    }, function () {
        $("#navList li a:not(:animated)").animate({width: "70px"}, 100);
    });
});

$(function () {
    var $navList = $("#navList li a");
    if (!$navList.is(":animated")) {
        $navList.hover(function () {
            $(this).animate({width: "98px", fontSize: "18px"}, 100);
        }, function () {
            $(this).animate({width: "70px", fontSize: "14px"}, 100);
        });
    }
});