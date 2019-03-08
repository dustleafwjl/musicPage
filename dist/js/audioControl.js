// 实现audioPlay 和 audioPause
(function ($, root) {
    function AudioManager(){
        // 创建音频对象
        this.audio = new Audio();
        // this.src = src;
        // audio默认状态
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (t){
            this.audio.currentTime = t;
        }
    }
    root.audioManager = new AudioManager();
})(window.Zepto, window.player || (window.player = {}));