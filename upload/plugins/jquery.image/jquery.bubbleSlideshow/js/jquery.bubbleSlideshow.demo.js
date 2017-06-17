$(function () {
    var photos = [
        "images/jquery.bubbleSlideshow_001.jpg",
        "images/jquery.bubbleSlideshow_001.jpg",
        "images/jquery.bubbleSlideshow_001.jpg",
        "images/jquery.bubbleSlideshow_001.jpg",
        "images/jquery.bubbleSlideshow_001.jpg",
        "images/jquery.bubbleSlideshow_001.jpg"
    ];

    var slideshow = $('#slideShow').bubbleSlideshow(photos);

    $(window).load(function () {
        slideshow.autoAdvance(5000);
    });

    // Other valid method calls:
    // slideshow.showNext();
    // slideshow.showPrev();
    // slideshow.stopAutoAdvance();
});