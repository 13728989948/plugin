$(document).ready(function () {

    /* 创建一个节点 */
    $(".votecard em").clone().appendTo(".votecard div");

    /* 增加1 */
    var node = $(".votecard em:last strong")
    node.text(parseInt(node.text()) + 1);

    function flip(obj) {
        obj.prev().find("em").animate({
            top: '-=45'
        }, 200);
        obj.toggleClass("voted", true);
    }

    $('.voteaction').bind({
        click: function (event) {
            event.preventDefault()
        },
        mouseup: function () {
            flip($(this));
            $(this).unbind('mouseup');
        }
    });
});