$(function () {
    $('#tj_container').gridnav({
        rows: 3,
        type: {
            mode: 'sequpdown', 		// use def | fade | seqfade | updown | sequpdown | showhide | disperse | rows
            speed: 500,				// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
            easing: '',				// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
            factor: 50,				// for seqfade, sequpdown, rows
            reverse: false			// for sequpdown
        }
    });
});