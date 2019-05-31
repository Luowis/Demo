
(function($, root) {
    var duration,
        per,
        frameId,
        lastPer = 0,
        startTime;
    
        // 歌曲总时间    
    function renderAllTime(allTime) {
        duration = allTime;
        // 转换时间形式
        var time = FormaTime(allTime);
        $('.all-time').html(time);

    }

    // 转换时间形式函数
    function FormaTime(t) {
        // 先将时间处理成整数
        t = Math.round(t);
        var m = Math.floor( t / 60);
        m = m < 10 ? '0' + m : m;
        var s = t % 60;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s
    }

    // 进度条开始运动
    function start(p) {
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        lastPer = p == undefined ? lastPer : p;

        function frame() {
            var curTime = new Date().getTime();
            // 歌曲播放的进度(小数)
            per = lastPer + (curTime - startTime) / (duration * 1000);
            // 判断是否播完
            if(per < 1){
                frameId = requestAnimationFrame(frame);
                upData();
            }else{
                // 歌播完后回到初始
                root.pro.start(0);
                audio.playTo(0);
                // root.pro.stop();
                // cancelAnimationFrame(frameId);
            }            
        }
        frame();
    }

    // 时间更新
    function upData(newPer) {
        per = newPer == undefined ? per : newPer;
        // 时间变化
        var time = FormaTime(per * duration);
        $('.cur-time').html(time);
        var x = (per - 1) * 100;
        // 进度条变化
        $('.pro-top').css({
            transform:'translateX(' + x + '%)'
        })
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000);
    }
    // console.log(lastPer)
    // 暴露方法
    root.pro = {
        renderAllTime:renderAllTime,
        start:start,
        stop:stop,
        upData:upData
    }








})(window.Zepto, window.player || (window.player = {}));