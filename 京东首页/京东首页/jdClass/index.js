// 轮播图
$('#swiper').sliderImg({
    image:['../jd/image/pic1.jpg','../jd/image/pic2.jpg','../jd/image/pic3.jpg'],
    interVal:3000
});

// menu
var index;
$('.cate_menu_item').hover(function(){
    $('.JS_popCtn').css('display','block');
    index = $(this).attr('data-index');
    $('#cate_item' + index).css('display','block');
},function(){
    $('.JS_popCtn').css('display','none');
    $('#cate_item' + index).css('display','none');
})
$('.JS_popCtn').on('mouseover', function(){
    $('.JS_popCtn').css('display','block');
    $('#cate_item' + index).css('display','block');
}).on('mouseout', function() {
    $('.JS_popCtn').css('display','none');
    $('#cate_item' + index).css('display','none');
})

// 右侧滑动动画
$('.services_entry .row1').hover(function () {
    // 滑出
    $('.services_entry').slideUp();
    // 滑入
    $('.services_content').slideDown();
    $('.services_content .content').css('display', 'none');
    // $('.nowActive').removeClass('nowActive');

    var id = $(this).attr('id');
    $('.' + id + '_tab').addClass('nowActive');
    $('.' + id + '_content').show();
   
    /* close */
    $('.services_content .close').show();
});

$('.services_content .header span').hover(function() {
    $('.nowActive').removeClass('nowActive');
    $(this).addClass('nowActive');
    $('.' + $(this).attr('data') + '_content').show()
                    .siblings('.content').hide();
})

$('.services_content .close').on('click', function () {
    $(this).hide();
    // 滑出
    $('.services_entry').slideDown();
    // 滑入
    $('.services_content').slideUp();
})


// 顶部地址切换
$('#location').areaList({
    items: [{
        name: '北京',
        href: '#',
    }, {
        name: '上海',
        href: '#',
    }, {
        name: '黑龙江',
        href: '#',
    }, {
        name: '天津',
        href: '#'
    }, {
        name: '重庆',
        href: '#',
    }, {
        name: '河北',
        href: '#'
    }, {
        name: '北京',
        href: '#',
    }, {
        name: '上海',
        href: '#',
    }, {
        name: '黑龙江',
        href: '#',
    }, {
        name: '天津',
        href: '#'
    }, {
        name: '重庆',
        href: '#',
    }, {
        name: '河北',
        href: '#'
    }, {
        name: '北京',
        href: '#',
    }, {
        name: '上海',
        href: '#',
    }, {
        name: '黑龙江',
        href: '#',
    }, {
        name: '天津',
        href: '#'
    }, {
        name: '重庆',
        href: '#',
    }, {
        name: '河北',
        href: '#'
    }, {
        name: '北京',
        href: '#',
    }, {
        name: '上海',
        href: '#',
    }, {
        name: '黑龙江',
        href: '#',
    }, {
        name: '天津',
        href: '#'
    }, {
        name: '重庆',
        href: '#',
    }, {
        name: '河北',
        href: '#'
    }, {
        name: '河北',
        href: '#'
    }],
    rowNum: 5,
    nowItem: '北京',
    color: '#999',
    nowItemImg: '../jd/image/local.jpg'
});

// 导航条下拉列表插件
// y 纵向
$('#mgJd').dropList({
    dirction: 'y',
    colNum: 2,
    menuList: [{
        title: '',
        items: [{
            href: '#',
            name: '待处理订单',
        }, {
            href: '#',
            name: '消息',
        }, {
            href: '#',
            name: '返修退换货',
        }, {
            href: '#',
            name: '我的问答',
        }, {
            href: '#',
            name: '降价商品',
        }, {
            href: '#',
            name: '我的关注',
        }],
    }, {
        title: '',
        items: [{
            href: '#',
            name: '我的京豆',
        }, {
            href: '#',
            name: '我的优惠券',
        }, {
            href: '#',
            name: '我的白条',
        },
        ],
    }]
});

// x 横向 
$('#nav').dropList({
    // 下拉列表里面每一块的排布是横向横向（y）, 纵向（x）
    direction: 'x',
    // 下拉列表内的内容
    menuList: [{
        // 每块的标题
        title: '特色',
        // 每块的宽度
        items: [{
            name: '企业购',
            href: '#'
        }, {
            name: '商用场景管',
            href: '#'
        }, {
            name: '工业品',
            href: '#'
        }, {
            name: '礼品卡',
            href: '#'
        }],
        // 每块每行的选项列数
    }, {
        title: '特色',
        items: [{
            name: '企业购',
            href: '#'
        }, {
            name: '商用场景管',
            href: '#'
        }, {
            name: '工业品',
            href: '#'
        }, {
            name: '礼品卡',
            href: '#'
        }],
    }, {
        title: '特色',
        items: [{
            name: '企业购',
            href: '#'
        }, {
            name: '商用场景管',
            href: '#'
        }, {
            name: '工业品',
            href: '#'
        }, {
            name: '礼品卡',
            href: '#'
        }],
    }, {
        title: '特色',
        items: [{
            name: '企业购',
            href: '#'
        }, {
            name: '商用场景管',
            href: '#'
        }, {
            name: '工业品',
            href: '#'
        }, {
            name: '礼品卡',
            href: '#'
        }],
    }]
});