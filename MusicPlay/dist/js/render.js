// 实现页面渲染 img + info + like-btn

(function($, root) {

    // 渲染歌曲相关图片
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function() {
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));   /* 背景高斯模糊插件(gaussBlur.js) */
        }
    }

    // 渲染歌曲信息(歌名，歌手，专辑名) 
    function renderInfo(info) {
        var str =  `<div class="song-name">${info.song}</div>
                    <div class="singer-name">${info.singer}</div>
                    <div class="album-name">${info.album}</div>`
        $('.song-info').html(str)
    }

    //  渲染like按钮
    function renderIsLike(like) {
        if(like){
            $('.like').addClass('liking')
        }else{
            $('.like').removeClass('liking')
        }
    }
    
    // 执行各个页面渲染任务
    root.render = function(data) {
        // console.log(data)
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike)
    }


})(window.Zepto, window.player || (window.player = {}));

