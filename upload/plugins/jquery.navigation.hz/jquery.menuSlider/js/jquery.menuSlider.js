var menuSlider = function () {
    // ul是ul,lis是该ul下所有li,div是移动div,qLi是全局li,len是每次移动距离,time是移动等待时间
    var ul, lis, div, qLi, len, time;
    lis = [];
    len = 5;
    time = 5;
    return {
        init: function (ulID, divID) {
            ul = document.getElementById(ulID);
            lis = ul.getElementsByTagName('li');
            var i, liLength, liWidth, liLeft;
            i = 0;
            liLength = lis.length;
            for (i; i < liLength; i++) {
                var jLi, liValue;
                jLi = lis[i];
                liValue = jLi.value;
                if (liValue == 1) {
                    qLi = jLi;
                    liWidth = jLi.offsetWidth;
                    liLeft = jLi.offsetLeft
                }
                jLi.onmouseover = function () {
                    menuSlider.mo(this);
                };
                jLi.onmouseout = function () {
                    menuSlider.mo(qLi);
                };
            }
            div = document.getElementById(divID);
            div.style.width = liWidth + 'px';
            div.style.left = liLeft + 'px';
        },
        mo: function (li) {
            clearInterval(ul.tm);
            var liLeft, liWidth;
            liLeft = parseInt(li.offsetLeft);
            liWidth = parseInt(li.offsetWidth);
            ul.tm = setInterval(function () {
                menuSlider.mv(liLeft, liWidth);
            }, time);
        },
        mv: function (liLeft, liWidth) {
            var divLeft, divWidth;
            divLeft = parseInt(div.offsetLeft);
            divWidth = parseInt(div.offsetWidth);
            if (divLeft != liLeft || divWidth != liWidth) {
                if (divLeft != liLeft) {
                    // zy判断是向左移还是右移(左右),xc判断移动div和目的li相差多少(相差),zl计算出的增量值(增量)
                    var zy, xc, zl;
                    zy = (divLeft > liLeft) ? -1 : 1;
                    xc = Math.abs(liLeft - divLeft);
                    zl = (xc < len) ? zy * xc : zy * len;
                    div.style.left = (divLeft + zl) + 'px';
                }
                if (divWidth != liWidth) {
                    // zj判断div是增加宽度还是减少宽度以适应li宽度(增减),xc判断移动div和目的li的宽度相差多少(相差),zl计算出的增量值(增量)
                    var zj, xc, zl;
                    zj = (divWidth > liWidth) ? -1 : 1;
                    xc = Math.abs(liWidth - divWidth);
                    zl = (xc < len) ? zj * xc : zj * len;
                    div.style.width = (divWidth + zl) + 'px';
                }
            } else {
                clearInterval(ul.tm);
            }
        }
    };
}();