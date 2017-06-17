$(function () {
    $('#tj_container').gridnav({
        type: {
            mode: 'sequpdown', 	// use def | fade | seqfade | updown | sequpdown | showhide | disperse | rows
            speed: 400,			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
            easing: '',			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
            factor: 50,			// for seqfade, sequpdown, rows
            reverse: true		// for sequpdown
        }
    });
});