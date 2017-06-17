// 修正FF浏览器兼容
function getOffset(e) {
    var target = e.target;
    if (target.offsetLeft == undefined) {
        target = target.parentNode;
    }
    var pageCoord = getPageCoord(target);
    var eventCoord = {
        x: window.pageXOffset + e.clientX,
        y: window.pageYOffset + e.clientY
    };
    var offset = {
        offsetX: eventCoord.x - pageCoord.x,
        offsetY: eventCoord.y - pageCoord.y
    };
    return offset;
}

function getPageCoord(element) {
    var coord = {
        x: 0,
        y: 0
    };
    while (element) {
        coord.x += element.offsetLeft;
        coord.y += element.offsetTop;
        element = element.offsetParent;
    }
    return coord;
}

$(document).ready(function () {
    $(".items .img").hover(function (e) {
        var _this = $(this), //闭包
            _desc = _this.find(".desc").stop(true),
            width = _this.width(), //取得元素宽
            height = _this.height(), //取得元素高
            left = (e.offsetX == undefined) ? getOffset(e).offsetX : e.offsetX, //从鼠标位置，得到左边界，利用修正ff兼容的方法
            top = (e.offsetY == undefined) ? getOffset(e).offsetY : e.offsetY, //得到上边界
            right = width - left, //计算出右边界
            bottom = height - top, //计算出下边界
            rect = {}, //坐标对象，用于执行对应方法。
            _min = Math.min(left, top, right, bottom), //得到最小值
            _out = e.type == "mouseleave", //是否是离开事件
            spos = {}; //起始位置

        rect[left] = function (epos) { //鼠从标左侧进入和离开事件
            spos = {"left": -width, "top": 0};
            if (_out) {
                _desc.animate(spos, "fast"); //从左侧离开
            } else {
                _desc.css(spos).animate(epos, "fast"); //从左侧进入
            }
        };

        rect[top] = function (epos) { //鼠从标上边界进入和离开事件
            spos = {"top": -height, "left": 0};
            if (_out) {
                _desc.animate(spos, "fast"); //从上面离开
            } else {
                _desc.css(spos).animate(epos, "fast"); //从上面进入
            }
        };

        rect[right] = function (epos) { //鼠从标右侧进入和离开事件
            spos = {"left": left, "top": 0};
            if (_out) {
                _desc.animate(spos, "fast"); //从右侧成离开
            } else {
                _desc.css(spos).animate(epos, "fast"); //从右侧进入
            }
        };

        rect[bottom] = function (epos) { //鼠从标下边界进入和离开事件
            spos = {"top": height, "left": 0};
            if (_out) {
                _desc.animate(spos, "fast"); //从底部离开
            } else {
                _desc.css(spos).animate(epos, "fast"); //从底部进入
            }
        };
        rect[_min]({"left": 0, "top": 0}); // 执行对应边界 进入/离开 的方法
    });
});