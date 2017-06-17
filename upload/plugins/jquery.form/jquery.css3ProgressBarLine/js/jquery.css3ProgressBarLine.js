var Loader = function () {
    var loader = document.querySelector('.loader-container'),
        meter = document.querySelector('.meter'),
        k, i = 1,
        counter = function () {
            if (i <= 100) {
                meter.innerHTML = i.toString();
                i++;
            } else {
                window.clearInterval(k);
            }
        };

    return {
        init: function (options) {
            options = options || {};
            var time = options.time ? options.time : 0,
                interval = time / 100;

            loader.classList.add('run');
            k = window.setInterval(counter, interval);
            setTimeout(function () {
                loader.classList.add('done');
            }, time);
        }
    }
}();

Loader.init({
    time: 10000
});