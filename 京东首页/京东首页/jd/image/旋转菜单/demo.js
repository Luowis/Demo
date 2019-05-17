//li动态变化
function rotateZ(li, deg) {
    $(li)
        .css({transform:'rotateZ('+deg+'deg)'})
        .find('label').css({transform: 'rotateZ('+-deg+'deg)'})
}

// 展示、隐藏li
function changeOptions(ele) {
    var $selector = $(ele).parent();//选出父元素selectot
    $selector.toggleClass('open');//给父元素设置上open类名
    var $li =  $selector.find('li');//选出所有的li
    var deg = 360/$li.length;//算出间距角度
    for(var i = 0; i < $li.length; i++) {
        var d = i*deg;//算出每个li所在的角度deg
        $selector.hasClass('open') ? rotateZ($li[i], d) : rotateZ($li[i], -360);
    }
}
$('button').click(function () {
    changeOptions(this);
})

setTimeout(function() { changeOptions('.selector button'); }, 100);