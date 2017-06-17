$(document).ready(function ($) {

    //demo01
    $('#container1').hotSpot();

    //demo02
    var _pop2 = $('#container2').hotSpot({
        slideshow: false,
        triggerBy: 'click',
        autoHide: false
    });
    $('#image2').on('click', function (event) {
        _pop2.hideCurrentPop();
    });
});