

bindEvent();

function bindEvent() {
    // 点击后获取数据并生成dom插入页面

    $('.btn').on('click', function (){
        var val = $('.inp').val();
        if(val) {
            getData(val);
            addDom('my', val);
        }
    })

    // 点击回车键，做与click一样的事情
    $('.inp').on('keyup', function(e) {
        if(e.keyCode == 13 && this.value) {
            $('.btn').trigger('click');
        }
    })
}

function getData(val) {
    $.ajax({
        type: "GET",
        url:"http://data.duyiedu.com/api/chat",
        data:{ text: val},
        scuccess:function(data) {
            console.log(typeof data);
            var list = typeof data == 'string' ? JSON.parse(data) : data;
            addDom('r', list.text); 
        },
        errr:function () {
            console.log('error');
        }
    })
}

function addDom(who, text) {
    if (who == 'my') {
        $(`<div class="talk my">
                <div class="user"></div>
                <div class="text">${text}</div>
            </div>`).appendTo($('.inner'));
        $('.inp').val('');
    }else{
        $(`<div class="talk rabit">
                <div class="user"></div>
                <div class="text">${text}</div>
        </div>`).appendTo($('.inner'));
    }

    // 显示最底部
    $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
}