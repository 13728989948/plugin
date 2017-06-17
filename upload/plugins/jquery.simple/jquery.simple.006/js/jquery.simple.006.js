function lxfEndtime() {
    $t = $('#t').html();
    if ($t != 0) {
        $('#t').html($t - 1);
        $i = setTimeout("lxfEndtime()", 1000);
    } else {
        $('.box').hide();
        $('.btn').show();
        $('#t').html(6);
        $('.ad_time').css({'width': '554px', 'height': '351px'});
        clearTimeout($i);
    }
};
$(document).ready(function () {
    $('.btn').live('click', function () {
        $('.box').show();
        $(this).hide();
        $('.ad_time').animate({width: 110, height: 18}, 'slow');
        lxfEndtime();
    });
    $('.close').click(function () {
        $('.box').hide();
        $('.btn').show();
        $('#t').html(6);
        $('.ad_time').css({'width': '554px', 'height': '351px'});
        clearTimeout($i);
    })
});