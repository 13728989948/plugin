$(function () {
    $('#tj_container').gridnav({
        type: {
            mode: 'seqfade', // use def | fade | seqfade | updown | sequpdown
            speed: 500, // for fade, seqfade, updown, sequpdown, showhide,
            easing: '', // for fade, seqfade, updown, sequpdown, showhide,
            factor: 100, // for seqfade, sequpdown, rows
            reverse: '' // for sequpdown
        }
    });
});