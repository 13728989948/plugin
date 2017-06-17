$(function () {
    $.fn.supersized.options = {
        startwidth: 640,
        startheight: 480,
        vertical_center: 1,
        slideshow: 1,
        navigation: 1,
        thumbnail_navigation: 1,
        transition: 1, //0-None, 1-Fade, 2-slide top, 3-slide right, 4-slide bottom, 5-slide left
        pause_hover: 0,
        slide_counter: 1,
        slide_captions: 1,
        slide_interval: 3000,
        slides: [
            {
                image: 'images/jquery.supersized_018.jpg',
                title: 'City Clock Tower',
                url: 'images/jquery.supersized_018.jpg'
            },
            {
                image: 'images/jquery.supersized_018.jpg',
                title: 'Canal Park Fence',
                url: 'images/jquery.supersized_018.jpg'
            },
            {
                image: 'images/jquery.supersized_018.jpg',
                title: 'Old Train Tracks',
                url: 'images/jquery.supersized_018.jpg'
            }
        ]
    };
    $('#supersized').supersized();
});