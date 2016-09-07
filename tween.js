/*
 * create by super
 *
 * */
(function () {
    function Linear(b, t, c, d) {
        if (b.toString() == '[object Object]') {
            var obj = {};
            for (var key in c) {
                obj[key] = b[key] + t / d * c[key];
            }
            console.log(obj);
            return obj;
        }
    }

    function move(ele, target, duration) {
        console.log(ele);
        window.clearInterval(ele.timer);
        var begin = {}, change = {}, interval = 10, time = 0;
        if (target.toString() == '[object Object]') {
            for (var key in target) {
                begin[key] = utils.css(ele, key);
                change[key] = target[key] - begin[key];
            }

        }
        ele.timer = window.setInterval(function () {
            time += interval;
            if (time >= duration) {
                window.clearInterval(ele.timer);
                utils.css(ele, target);
                return;

            }
            var obj = Linear(begin, time, change, duration);
            if (typeof obj !== 'undefined') {
                utils.css(ele, obj);
            }
        }, interval)
    }
    window.Animate = move;
})();