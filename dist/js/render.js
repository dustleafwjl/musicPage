// 实现页面渲染 img + info + love-btn

(function ($, root) {
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $(".img-box img").attr('src', src);
            root.blurImg(img, $('body'));
        }
    }
    function renderInfo(info) {
        var str = '';
        str += '<div class="song-name">' + info.song + '</div>\
                <div class="singer-name">'+ info.singer + '</div>\
                <div class="album-name">'+ info.album + '</div>'
        $(".wrapper .song-info").html(str);
    }
    function renderIsLove(love) {
        if (love) {
            $('.love').addClass('loving');
        } else {
            $('.love').removeClass('loving');
        }
    }
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLove(data.isLike);
    }
})(window.Zepto, window.player || (window.player = {}));