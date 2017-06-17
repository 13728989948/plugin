$(function () {
    // 一次横向滚动一个
    $('#marquee1').kxbdSuperMarquee({
        distance: 162,
        time: 3,
        btnGo: {left: '#goL', right: '#goR'},
        direction: 'left'
    });

    // 一次纵向滚动一个
    $('#marquee2').kxbdSuperMarquee({
        distance: 162,
        time: 3,
        btnGo: {up: '#goU', down: '#goD'},
        direction: 'down'
    });
    // 一次滚动一屏
    $('#marquee3').kxbdSuperMarquee({
        distance: 620,
        time: 4,
        navId: '#mar3Nav',
        direction: 'left'
    });

    // 一次滚动一屏，不自动滚动，点击滚动，可作为导航
    $('#marquee4').kxbdSuperMarquee({
        isAuto: false,
        distance: 324,
        btnGo: {left: '#goL2', right: '#goR2'},
        direction: 'left'
    });
    // 一次滚动一屏
    $('#marquee5').kxbdSuperMarquee({
        isEqual: false,
        distance: 100,
        time: 4,
        direction: 'up'
    });
    // Marquee
    $('#marquee6').kxbdSuperMarquee({
        isMarquee: true,
        isEqual: false,
        scrollDelay: 20,
        controlBtn: {up: '#goUM', down: '#goDM'},
        direction: 'up'
    });
});

  