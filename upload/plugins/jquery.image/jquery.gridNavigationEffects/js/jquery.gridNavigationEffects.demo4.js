$(function () {
    $('#tj_container').gridnav({
        type: {
            mode: 'updown', 	// use def | fade | seqfade | updown | sequpdown | showhide | disperse | rows
            speed: 500,			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
            easing: '',			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
            factor: '',			// for seqfade, sequpdown, rows
            reverse: ''			// for sequpdown
        }
    });
});