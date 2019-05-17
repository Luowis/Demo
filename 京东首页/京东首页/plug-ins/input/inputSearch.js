// input插件
(function () {
    // 实现插件功能
    function Index(option) {
        this.parent = option.parent;
        this.type = option.type || 'GET';
        // url:'',
        this.url = option.url;
        // //jsonp   callback/cb
        // key:'',        
        this.key = option.key || 'callback';
        // dataType:'',
        this.dataType = option.dataType;
        // // jsonpCallback
        // sucFn:'',
        this.sucFn = option.sucFn;
        // btnColor:'',
        this.btnColor = option.btnColor || '#eee';
        // dataName:'',
        this.dataName = option.dataName;
        // others:'',
        this.others = option.others || '';

        this.createDom();
        this.addCss();
        this.getData();
    };

    //创建input结构
    Index.prototype.createDom = function () {
        var self = this;
        var oDiv = $('<div class="con"></div>');
        var oInput = $('<input type="text" placeholder="手机" class="cj-input">');
        var btn = $('<input type="button" value="搜索" class="cj-btn">');
        oDiv.append(oInput).append(btn).appendTo(self.parent);
    };

    // 设置样式
    Index.prototype.addCss = function () {
        var self = this;
        var h = self.parent.height();
        var w = self.parent.width();

        $('.con', self.parent).css({
            width: '100%',
            height: '100%',
            display: 'flex'
        });
        $('.cj-input', self.parent).css({
            height: '100%',
            // width:(w - 100)+ 'px'  
            flex: 1,
            outline: 'none',
            border: 'none',
            textIndent: '10px'
        });
        $('.cj-btn', self.parent).css({
            height: '100%',
            width: '100px',
            backgroundColor: self.btnColor,
            color: '#fff',
            cursor: 'pointer',
            outline: 'none',
            border: 'none'
        })

    };

    // 发送请求
    Index.prototype.getData = function () {
        var self = this;
        $('.cj-input', self.parent).on('input', function () {
            var val = $(this).val();
            $.ajax({
                type: self.type,
                url: self.url,
                data: self.dataName + '=' + val + '&' + self.others,
                dataType:self.dataType,
                jsonp:self.key,
                jsonpCallback:self.sucFn,
            })
        })
    };

    // 扩展插件--->inputSearch
    $.fn.extend({
        inputSearch: function (opt) {
            opt.parent = this;
            new Index(opt);
            return this;
        }
    })

})();