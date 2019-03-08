(function ($, root) {
    var duration,
        animateId,
        startTime,
        lastPer;
    function renderAllTime(allTime) {
        duration = allTime;
        var time = formTime(allTime);
        $('.all-time').html(time);
    }
    // 格式化allTime
    function formTime(time) {
        time = Math.floor(time);
        var m = Math.floor(time / 60);
        var s = time % 60;
        m = m > 10 ? m : '0' + m;
        s = s > 10 ? s : '0' + s;
        return m + ':' + s;
    }
    // 进度条auto
    function spotAuto(p){
        cancelAnimationFrame(animateId);
        startTime = new Date().getTime();
        lastPer = p == undefined ? 0 : p;
        function animate(){
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            if(per <= 1) {
                // 更新进度条
                updata(per);
            }else {
                cancelAnimationFrame(animateId)
            }
            animateId = requestAnimationFrame(animate);
        }
        animate();
    }

    function stop(){
        cancelAnimationFrame(animateId);
        var stopTime = new Date().getTime();
        lastPer = (stopTime - startTime) / (duration * 1000);
    }
    function updata(per){
        var time = formTime(per * duration);
        $('.cur-time').html(time);
        var x = (per - 1) * 100;
        $('.pro-top').css('transform', 'translateX('+ x +'%)');
    }
    root.pro = {
        renderAllTime: renderAllTime,
        spotAuto: spotAuto,
        stop: stop,
        updata: updata
    }
})(window.Zepto, window.player || (window.player = {}));