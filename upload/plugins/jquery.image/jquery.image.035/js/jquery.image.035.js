$(document).ready(function () {
    $('.holder').hover(
        function () {
            $(this).removeClass('.notactive');
            $('.notactive').stop().animate({'width': '290px'}, 400);
            $(this).find('img').stop().animate({'top': '-165px'}, 400);
            $(this).stop().animate({'width': '380px'}, 400);
            $(this).find('span').css({'background-color': '#000'});
            $(this).find('.text').fadeIn(300);
        },
        function () {
            $('.notactive').stop().animate({'width': '320px'}, 400);
            $(this).addClass('.notactive');
            $(this).find('.text').hide();
            $(this).find('img').stop().animate({'top': '0px'}, 500);
            $(this).stop().animate({'width': '320px'}, 400);
            $(this).find('span').css({'background-color': '#333', 'color': '#dedede'});

        });
});


  