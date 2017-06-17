$(document).ready(function () {
    //  Initialize Backgound Stretcher
    $('BODY').bgStretcher({
        images: ['images/jquery.image.074_004.jpg', 'images/jquery.image.074_004.jpg', 'images/jquery.image.074_004.jpg', 'images/jquery.image.074_004.jpg', 'images/jquery.image.074_004.jpg', 'images/jquery.image.074_004.jpg'],
        imageWidth: 1024,
        imageHeight: 768,
        slideDirection: 'N',
        slideShowSpeed: 1000,
        transitionEffect: 'fade',
        sequenceMode: 'normal',
        buttonPrev: '#prev',
        buttonNext: '#next',
        pagination: '#nav',
        anchoring: 'left center',
        anchoringImg: 'left center'
    });
});