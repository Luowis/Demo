// 扩展轮播图插件 sliderImg
// 插件使用方法:利用父级调用jquery中扩展的插件方法
// 在应用样式中需要设置父级的固定宽高
// 同时插件需要传入参数为展示图片的路径
// 例如：
// $('#swiper').sliderImg({
//     image:['./img/1.jpg','./img/2.jpg','./img/3.jpg','./img/4.jpg','./img/5.jpg']
// })




(function () {
    function Swiper(opt) {
        var opts = $.extend({}, opt);
        this.wrap = opts.father;
        this.img = opts.image;
        this.interVal = opts.interVal;
        this.init();
    }

    Swiper.prototype.init = function () {
        this.nowIndex = 0;
        this.len = this.img.length;
        this.itemWidth = this.wrap.width();
        this.timer = undefined;
        this.flag = true;
        this.createDom();
        this.bindEvent();
        this.sliderAuto();
    }

    Swiper.prototype.createDom = function () {
        var len = this.len;
        var str = '';
        var w = this.wrap.width();
        var ulW = w * (this.len + 1);
        var h = this.wrap.height();
        var order = $('<div class="order"></div>');
        var imgBox = $('<ul class="img-box"></ul>');
        imgBox.css({
            'width': ulW + 'px',
            'height': h + 'px'
        })
        var btn = $('<div class="btn">\
                <a class="prevBtn" href="javascript:;"><span>&lt;</span></a>\
                <a class="nextBtn" href="javascript:;"><span>&gt;</span></a>\
            </div>');
        var list = $('<ul></ul>');
        var liStr = '';
        for (var i = 0; i < this.len; i++) {
            str += '<li><a href="javascript:;"><img src="' + this.img[i] + '" alt=""></a></li>';
            liStr += '<li></li>';
        }
        str += '<li><a href="javascript:;"><img src="' + this.img[0] + '" alt=""></a></li>';

        $(liStr).appendTo(list);

        this.wrap.append(imgBox.html(str))
            .append(btn)
            .append(order.append(list));
        $('.img-box').find('li').css({
            'width': w + 'px',
            'height': h + 'px'
        })
        $('.order li').eq(0).addClass('active');
    }

    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.order li').add('.prevBtn').add('.nextBtn').on('click', function () {
            if ($(this).attr('class') == 'prevBtn') {
                self.move('prev');
            } else if ($(this).attr('class') == 'nextBtn') {
                self.move('next');
            } else {
                var index = $(this).index();
                self.move(index);
            }
            self.changeStyle();
        });
        this.wrap.on('mouseenter', function () {
            $('.btn').show();
            clearTimeout(self.timer);
        }).on('mouseleave', function () {
            $('.btn').hide();
            self.sliderAuto();
        })
    }
    Swiper.prototype.sliderAuto = function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            self.move('next');
            self.changeStyle();
        }, self.interVal);
    }

    Swiper.prototype.move = function (dir) {
        var self = this;
        if (self.flag) {
            self.flag = false;
            if (dir == 'prev' || dir == 'next') {
                if (dir == 'prev') {
                    if (self.nowIndex == 0) {
                        $('.img-box').css({ left: -(self.len * self.itemWidth) });
                        self.nowIndex = self.len - 1;
                    } else {
                        self.nowIndex = self.nowIndex - 1;
                    }
                } else {
                    if (self.nowIndex == self.len - 1) {
                        $('.img-box').animate({ left: -(self.itemWidth * self.len) }, function () {
                            $(this).css({ left: 0 });
                            self.sliderAuto();
                            self.flag = true;
                        })
                        self.nowIndex = 0;
                    } else {
                        self.nowIndex = self.nowIndex + 1;
                    }
                }
            } else {
                self.nowIndex = dir;
            }
            // console.log(self.nowIndex)
            self.slider();
        }
    };
    Swiper.prototype.changeStyle = function () {
        $('.active').removeClass('active');
        $('.order li').eq(this.nowIndex).addClass('active');
    }

    Swiper.prototype.slider = function () {
        var self = this;
        $('.img-box').animate({ left: -(self.itemWidth * self.nowIndex) }, function () {
            self.sliderAuto();
            self.flag = true;
        });
    }

    $.fn.extend({
        sliderImg: function (options) {
            options.father = this || $('body');
            new Swiper(options);
        }
    })
})();

