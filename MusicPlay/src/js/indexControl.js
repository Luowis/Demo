
(function($, root) {
    function Control() {
        this.index = 0;
    }
    Control.prototype = {
        prev: function() {
            // if(this.index == 0) {
            //     this.index = len - 1;
            // }else{
            //     this.index --;
            // }
            // return this.index;
            return this.getIndex(-1);
        },
        next: function() {
            // if(this.index == len - 1) {
            //     this.index = 0;
            // }else{
            //     this.index ++;
            // }
            // return this.index;
            return this.getIndex(1);
        },
        getIndex:function(val) {
            // 当前索引
            var index = this.index;
            // 改变后的索引(算法)
            var curIndex = (index + val + len) % len;
            // 更新this.index索引
            this.index = curIndex;
            return curIndex;
        }
        
    }
    root.controlIndex = new Control();
})(window.Zepto, window.player || (window.player = {}));