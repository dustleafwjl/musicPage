(function ($, root) {
    function SongList(data) {
        this.dataList = data;
        this.renderList();
    }
    SongList.prototype = {
        renderList: function () {
            var str = '';
            this.dataList.forEach(function (ele, index) {
                str += '<li uid = '+ index +'>' + ele.song + '</li>'
            });
            $('.songList ul').html(str);
        },
        open: function () {
            $('.songList').css('transform', 'translateY(0)');
        },
        close: function () {
            $('.songList').css('transform', 'translateY(100%)');
        }
    }
    root.songList = SongList;
})(window.Zepto, window.player || (window.player = {}));