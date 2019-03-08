

var root = window.player;
var dataList,
    len,
    audio = root.audioManager,
    contorl,
    songList,
    timer;

// 获取信息并初始化渲染页面
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data) {
            len = data.length;
            dataList = data;
            contorl = new root.contorlIndex(len);
            songList = new root.songList(data);
            // root.render(data[0]);
            // audio.getAudio(data[0].audio);
            // root.pro.renderAllTime(dataList[0].duration);
            bindEvent();
            bindTouch();
            $('body').trigger('play:change', 0);
        },
        error: function () {
            console.log(error);
        }
    })
}
// 给按钮绑定事件
function bindEvent() {
    $('body').on('play:change', function (e, index) {
        $('.img-box').attr('data-deg', '0');
        $('.img-box').css({
            'transform': 'rotateZ(0deg)'
        });
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.pro.spotAuto(0);
        if (audio.status == 'play') {
            audio.play();
            rotated(0);
        }else {
            root.pro.stop();
        }
        root.pro.renderAllTime(dataList[index].duration);

    });
    $('.prev').on('click', function (e) {
        var nowIndex = contorl.prev();
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        $('body').trigger('play:change', nowIndex);
    });
    $('.next').on('click', function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        var nowIndex = contorl.next();
        $('body').trigger('play:change', nowIndex);
    });
    $('.play').on('click', function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        if (audio.status == 'pause') {
            audio.play();
            root.pro.spotAuto();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            root.pro.stop();
            cancelAnimationFrame(timer);
        }
        $('.play').toggleClass('playing');
    });
    // 歌曲列表事件绑定
    $('.list').on('click', function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        songList.open();
    });
    $('.wrapper').on('click', function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        songList.close();
    });
    $('.songList').on('click', function (e) {
        var id = $(e.target).attr('uid');
        $('body').trigger('play:change', id);
        contorl.index = +id;
    })
}

function bindTouch() {
    var $spot = $('.spot');
    var bottom = $('.pro-bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    $spot.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            root.pro.updata(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            var time = per * dataList[contorl.index].duration;
            root.pro.spotAuto(per);
            audio.playTo(time);
            audio.play();
            audio.status = 'play';
            $('.play').addClass('playing');
        }
    })
}

// 唱片旋转
function rotated(deg) {
    cancelAnimationFrame(timer);
    deg = +deg;
    timer = requestAnimationFrame(animation);
    function animation() {
        deg += .1;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)'
        })
        timer = requestAnimationFrame(animation);
    }
}
getData("../mock/data.json");