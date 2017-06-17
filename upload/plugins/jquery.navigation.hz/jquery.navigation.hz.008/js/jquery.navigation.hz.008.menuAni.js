$(document).ready(function(){

	// ------------- Top menu auto width and animation ---------------- //
	var width = 0;
	$('#menu li').each(function() {
		width += $(this).width()+1;
	});

	var padding = parseInt((($('#menu').width() - width) / $('#menu li a').length)/2);
	var pixLeft = ($('#menu').width() - width)-(padding*$('#menu li a').length*2)

	$('#menu li a').each(function(index) {
		if (index+1 != $('#menu li a').length) {
			$(this).css('padding', '0 '+padding+'px');
			$(this).css('background-position', '-' + $(this).position().left + 'px 0');
		} else {
			padding = padding + (pixLeft/2);
			$(this).css('padding', '0 '+padding+'px');
			$(this).css('background-position', '-' + $(this).position().left + 'px 0');
		}
	});
	
	$('#menu li a').mouseover(function(){	
			$(this).stop().animate({ backgroundPosition: '-' + $(this).position().left - 129 + 'px 0'}, 2000)
		.mouseout(function(){
			$(this).stop().animate({ backgroundPosition: '-' + $(this).position().left + 'px 0'}, 2000)
		})
	});
	// ------------- END Top menu auto width and animation ---------------- //
	
});