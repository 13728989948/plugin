setInterval(function () {
    spectrum();
}, 1500);


function spectrum() {
    var hue = "rgb(" + (Math.floor(Math.random() * 256)) + ","
        + (Math.floor(Math.random() * 256)) + ","
        + (Math.floor(Math.random() * 256)) + ")";

    $("#welcome").animate({
        backgroundColor: hue
    }, 1000);
}