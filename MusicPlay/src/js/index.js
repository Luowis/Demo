
// 取到通过模块在window上定义的player对象
var root = window.player;
// 初始化变量(nowIndex方法摒弃)
var nowIndex = 0;
var index = 0;
var len;
var timer;
// 通过进度条算出歌曲播放的比列per,和时间
var per,time = 0;
// 获取进度条相关数据
var bottom = $('.pro-bottom').offset();
var Top = $('.pro-top').offset();
var startLeft = Top.left;
var l = bottom.left;
var w = bottom.width;
// 取到audioControl.js模块并进行定义
var audio = root.audioManager;
// 取到indexControl.js模块并进行定义
var control = root.controlIndex;
// 将数据保存到全局
var dataList;
// 获取相关数据函数
function getData(url) {
    $.ajax({
        type:"GET",
        url:url,
        success:function(data) {
            len = data.length;
            dataList = data;
            // new control(len);
            // 将三个事件，改为触发trigger('play:change')事件来完成  降低耦合度
            // root.render(data[0]);   /* 初始化页面数据 */
            // audio.getAudio(data[0].audio)   /* 数据传入后，加载音频 */
            // root.pro.renderAllTime(data[index].duration)  /* 歌曲总时间渲染 */
            bindEvent();
            bindTouch();
            root.playList.renderList(data);
             // 触发trigger('play:change')  传入0 初始化页面数据
             $('body').trigger('playChange', 0)
        },
        error:function() {
            console.log("error")
        }
    })
}

// 对一系列按钮绑定点击事件，根据nowIndex获取对应页面展现的数据
function bindEvent() {
    // 降低代码耦合度
    $('body').on('playChange', function(e, index) {
        // 加载音频
        audio.getAudio(dataList[index].audio)
        // 页面数据渲染
        root.render(dataList[index])
        // 歌曲总时间渲染
        root.pro.renderAllTime(dataList[index].duration)
        // 切歌
        if(audio.status == 'play'){
            audio.play();
            rotated(0);
            // 歌曲切换，进度条回到初始位置
            root.pro.start(0);  
        }else{
            root.pro.start(0);
            root.pro.stop();
        }

        // 切歌后初始化图片角度
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform':'rotateZ(' + 0 + 'deg)',
            'transition':'none'
        })
    });
    // 上一首歌
    $('.prev').on('click', function() {
        // 封装成indexControl.js模块
        // if(nowIndex == 0) {
        //     nowIndex = len - 1;
        // }else{
        //     nowIndex --;
        // }
        // 未加算法
        // var index = root.controlIndex.prev();
        // 加了算法
        index = control.prev();
        // 降低代码耦合度
        $('body').trigger('playChange', index)

        // // 加载音频
        // audio.getAudio(data[index].audio)
        // // 页面数据渲染
        // root.render(data[index])
        // // 切歌
        // if(audio.status == 'play'){
        //     audio.play();
        // }
    });
    // 下一首歌
    $('.next').on('click', function() {
        // 封装成indexControl.js模块
        // if(nowIndex == len - 1) {
        //     nowIndex = 0;
        // }else{
        //     nowIndex ++;
        // }
        // 未加算法
        // var index = root.controlIndex.next();
        // 加了算法
        index = control.next();
        // 降低代码耦合度
        $('body').trigger('playChange', index)
        // // 加载音频
        // audio.getAudio(data[index].audio)
        // // 页面数据渲染
        // root.render(data[index])
        // // 切歌
        // if(audio.status == 'play'){
        //     audio.play();
        // }
    });
    // 暂停和播放以及图标的变化
    $('.play').on('click', function() {
        // 方法一
        // var newAudio = new audio(data[0].audio)
        // console.log(newAudio)
        // newAudio.getAudio();
        // newAudio.play();
        // 每次点击算一下歌曲播放的进度
        // per = (x - l) / w;
        var newTop = $('.pro-top').offset();
        var newLeft = newTop.left;
        per = (newLeft - startLeft) / w;
        // console.log(newPer)
        if(audio.status == 'pause'){
            audio.play();
            // 更新进度条
            root.pro.start(per);
            time = per * dataList[index].duration;
            audio.playTo(time);
            console.log(per,time)
            // 获取当前角度，保证不切歌的情况下点击播放，图片从暂停时的角度开始旋转
            // var deg = $('.img-box').css('transform') /* 此方法获取角度值不方便 */
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        }else{
            audio.pause();
            // 进度条暂停
            root.pro.stop();
            // 图片停止旋转
            clearInterval(timer);
        }
        // 切换按钮
        $('.play').toggleClass('playing')
    })

    // 歌单切换按钮
    $('.list').on("click",function(){
        root.playList.show(control);
    })
}
// 拖到进度条至指定时间播放
function bindTouch() {
    // console.log(dataList,index)
    var $spot = $('.spot');

    $spot.on('touchstart', function() {
        root.pro.stop();
    }).on('touchmove', function(e) {
        // 算出圆点位置的比例
        var x = e.changedTouches[0].clientX;
        per = (x - l) / w;
        if(per >= 0 && per <=1){
            root.pro.upData(per);
        }
    }).on('touchend', function(e) {
        var x = e.changedTouches[0].clientX;
        per = (x - l) / w;

        time = per * dataList[index].duration
        if(per >= 0 && per <=1 && audio.status == 'pause'){
            root.pro.upData(per);
        }else if(per >= 0 && per <=1 && audio.status == 'play'){
            // 进度条跳到指定位置并开始运动
            root.pro.start(per)
            // 音频跳到指定时间开始播放
            audio.playTo(time);
            audio.status = 'play';
        }
    });
}
// 从点击处开始播放
$('.pro-bottom').on('click',function(e){
    // console.log(e.clientX);
    var clickX = e.clientX;
    per = (clickX - l) / w;
    time = per * dataList[index].duration;
    if(audio.status == 'play'){
        audio.play();
        rotated(0);
        // 音频跳到指定时间开始播放
        audio.playTo(time);
        // 进度条跳到指定位置并开始运动
        root.pro.start(per)
    }else{
        audio.playTo(time);
        // 进度条跳到指定位置并开始运动
        root.pro.start(per)
        audio.pause();
    }
})

// 图片旋转
function rotated(deg) {
    // 每次清除，防止调用多次timer
    clearInterval(timer);
    // var deg = 0;
    // 将取过来的属性值(字符串)变为数字
    deg = +deg
    timer = setInterval(function() {
        // console.log(deg)
        deg += 2;
        // 记录当前角度
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform':'rotateZ(' + deg + 'deg)',
            'transition':'all 0.2s ease-out'
        })
    }, 200)
}


// 获取相关数据
getData("../mock/data.json");



// 将信息+图片渲染到页面上    render.js
// 点击按钮
// 音频的播放与暂停 切歌
// 图片旋转
// 列表切歌
// 进度条运动与拖拽