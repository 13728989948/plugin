$(function () {

    //demo01
    $("#myController").jFlow({
        slides: "#slides",
        controller: ".jFlowControl",
        slideWrapper: "#jFlowSlide",
        selectedWrapper: "jFlowSelected",
        width: "680px",
        height: "275px"
    });

    //demo02
    $("#myController1").jFlow({
        slides: "#slides1",
        controller: ".jFlowControl1",
        slideWrapper: "#jFlowSlide1",
        selectedWrapper: "jFlowSelected1",
        auto: true,
        duration: 600,
        width: "680px",
        height: "275px",
        prev: ".jPrev",
        next: ".jNext"
    });

    //demo03
    $("#myController2").jFlow({
        slides: "#slides2",
        controller: ".jFlowControl2",
        slideWrapper: "#jFlowSlide2",
        width: "680px",
        height: "275px",
        prev: ".arrL",
        next: ".arrR"
    });

    //demo04
    $("#myController3").jFlow({
        slides: "#slides3",
        controller: ".jFlowControl3",
        slideWrapper: "#jFlowSlide3",
        selectedWrapper: "jFlowSelected3",
        auto: true,
        duration: 600,
        width: "680px",
        height: "275px",
        prev: ".prev",
        next: ".next"
    });

    //demo05
    $("#myController4").jFlow({
        slides: "#slides4",
        controller: ".jFlowControl4",
        slideWrapper: "#jFlowSlide4",
        selectedWrapper: "jFlowSelected4",
        width: "680px",
        height: "138px",
        prev: ".j_prev",
        next: ".j_next"
    });

    //demo06
    $("#myController5").jFlow({
        slides: "#slides5",
        controller: ".jFlowControl5",
        slideWrapper: "#jFlowSlide5",
        selectedWrapper: "jFlowSelected5",
        auto: true,
        duration: 600,
        width: "370px",
        height: "320px",
        prev: ".u_prev",
        next: ".u_next"
    });
});