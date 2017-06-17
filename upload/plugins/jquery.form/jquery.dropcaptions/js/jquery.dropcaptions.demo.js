$(function () {
    $('.autocap').dropCaptions({
        showSpeed: 1000,
        showOpacity: .85,
        hideOpacity: .25,
        showEasing: 'easeOutBounce',
        showDelay: 500,
        hideDelay: 1000
    });
    $('.blacksheep').dropCaptions();
    $('.bottom').dropCaptions({
        showSpeed: 2000,
        hideSpeed: 1000,
        showOpacity: 1,
        hideOpacity: 0,
        showEasing: 'easeOutElastic',
        hideEasing: 'easeInQuint',
        hideDelay: 2000
    });
});