
(function($, root) {

    // play pause getAudio
    function AudioManager() {
        // 创建一个音频对象
        this.audio = new Audio();
        this.audio.loop = "loop";
        // this.src = src;
        // 标记默认状态
        this.status = 'pause'
    }
    AudioManager.prototype = {
        play: function() {
            this.audio.play();
            this.status = 'play';
        },
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function(src) {
            // console.log(src)
            this.audio.src = src;
            this.audio.load();
        },
        // 将音频跳到指定播放位置
        playTo:function(t) {
            this.audio.currentTime = t;
            this.audio.play();
        }

    }
    root.audioManager = new AudioManager();







})(window.Zepto, window.player || (window.player = {}) )