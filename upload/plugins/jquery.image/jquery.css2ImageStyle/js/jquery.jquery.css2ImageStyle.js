// 点击tab后显示图片
function clickTabImage(id) {
    var szIndex = getCharIndex(id);//数字的索引
    var num = id.substr(szIndex, id.length);
    var url = document.location.href;
    if (url.indexOf("#") != -1) {
        url = url.substr(0, url.indexOf("#"));
    }
    location.href = url + "#bigImage" + num;
}

// 分析每一个char遇到数字时返回i
function getCharIndex(str) {
    var temp = '';
    for (var i = 0; i < str.length; i++) {
        temp = str.charAt(i);
        if (isSz(temp)) {
            return i;
        }
    }
}