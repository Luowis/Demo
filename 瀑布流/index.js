
var oLi = $('li');
var num = 1;
var flag = false;

getData();
function getData() {
    if (!flag) {
        flag = true;
        $.ajax({
            type: 'GET',
            // 跨域方式：服务器代理中转
            url: 'http://localhost/web/water/src/js/getPics.php?cPage=' + num,
            success: addDom,
            // 数据完成之前，显示加载中的图标
            beforeSend: function () {
                $('.loading').show();
            },
        });
        num++;
    }
};

function addDom(data) {
    $('.loading').hide();
    var dataList = JSON.parse(data);
    console.log(dataList)
    if (dataList.length > 0) {
        dataList.forEach(function (ele, index) {
            var iDiv = $('<div class="item"></div>');
            var imgBox = $('<div class="imgBox"></div>');
            var oImg = new Image();
            var oP = $('<p></p>');
            oP.text(ele.title);
            oImg.src = ele.preview;
            // 图片加载完以后开始插入
            oImg.onload = function () {
                imgBox.append(oImg);
                iDiv.append(imgBox).append(oP);
                var index = getMinList(oLi);
                $(oLi[index]).append(iDiv);
            }
        })
    }
    flag = false;
};

// 往最短的一列开始插入图片
function getMinList(dom) {
    var minHeight = parseInt($(dom[0]).css('height')),
        index = 0;
    for (var i = 1; i < dom.length; i++) {
        var h = parseInt($(dom[i]).css('height'));
        if (h < minHeight) {
            minHeight = h;
            index = i;
        }
    }
    console.log(index)
    return index;
};

// 滚动时判断距离,根据最短一列的实际高度
$(window).scroll(function () {
    var scrollHeight = $(this).scrollTop();
    var clientHeight = $(window).height();
    var pageHeigh = parseInt($(oLi[getMinList(oLi)]).css('height'));
    if (scrollHeight + clientHeight > pageHeigh) {
        getData();
    }
})

