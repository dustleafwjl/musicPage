(function ($, root) {
    function Contorl(len) {
        this.index = 0;
        this.len = len;
    }
    Contorl.prototype = {
        prev: function () {
            return this.changeIndex(-1);
        },
        next: function () {
            return this.changeIndex(1);
        },
        changeIndex: function (val) {
            // 当前对应索引
            var index = this.index;
            // 数据总长度
            var len = this.len;
            // 返回当前索引
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.contorlIndex = Contorl;
})(window.Zepto, window.player || (window.player = {}));