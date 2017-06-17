$(function () {
    $('#tj_container').gridnav({
        type: {
            mode: 'rows', 			// use def | fade | seqfade | updown | sequpdown | showhide | disperse | rows
            speed: 1000,			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
            easing: 'easeInOutBack',// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
            factor: 150,			// for seqfade, sequpdown, rows
            reverse: ''				// for sequpdown
        }
    });
});