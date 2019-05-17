(function () {
    function Index(opt) {
        this.opt = opt;
        // 取到下拉展示列表
        this.menuList = opt.menuList || [];
        this.parent = opt.parent;
        // 下拉列表排列方式 x水平 y竖直
        this.dir = opt.direction;
        // 下拉列表中每一列展示个数
        this.colNum = opt.colNum || 2;
        this.fontColor = this.parent.find('a').css('color');
        this.createDom();
        this.bindEvent();
    }
    Index.prototype.createDom = function () {
        var self = this;
        // 插件内容区域
        var content = $('<div class="dropContent" style="display:none;"></div>');
        // 下拉列表内容
        var dropDownContent = $('<div class="dropDownContent"></div>');
        // 下拉列表内容区域
        var len = this.menuList.length;
        // 下拉列表展示每块内容
        this.menuList.forEach(function (ele) {
            // 数据展示区  根据几组数据设置menu 
            var menu = $('<div class="nav-menu"></div>');
            if (ele.title) {
                var menuTitle = $('<div class="item menu-title"></div>').html(ele.title)
                    .appendTo(menu)
                    .css({
                        textAlign: 'left',
                    });
            }
            // list 展示区
            var itemList = $('<div class="itemList"></div>');
            // 将每列展示数据当做数据存储在外层div上
            // 每一组中的数据list
            ele.items.forEach(function (ele2) {
                var str = '<a href="' + ele2.href + '">' + ele2.name + '</a>';
                var item = $('<div class="nav-item" style="width:100px;display:inline-block;"></div>').append(str)
                    .appendTo(itemList);
            });
            menu.append(itemList).appendTo(dropDownContent);
        });
        content.append(dropDownContent)
            .appendTo(this.parent);
        this.addCss();
        if (this.dir == 'y') {
            $('.nav-menu', this.parent).css({
                'padding': '10px',
                'display': 'block',
                // len为几组数据
                'width': $('.nav-item').width() * len + 'px',
                'border-bottom': '1px solid #ddd',
                'z-index': '101'
            });
            $('.dropContent', this.parent).css({
                'width': $('.nav-menu').width() + 'px',
                'left': 0,
                'border-left': '1px solid #ddd',
                'border-right': '1px solid #ddd',
                'border-top': '1px solid #ddd',
                'z-index': '101'
            });
        } else {
            $('.nav-menu', this.parent).css({
                'padding': '10px',
                'display': 'inline-block',
                'width': $('.nav-item').outerWidth() * this.colNum + 'px',
                'border-left': '1px solid #ddd',
                'z-index': '101'
            });
            $('.dropContent', this.parent).css({
                'width': (($('.nav-menu').innerWidth() + 2) * len) + 'px',
                'right': 0,
                'border-left': '1px solid #ddd',
                'border-bottom': '1px solid #ddd',
                'border-top': '1px solid #ddd',
                'z-index': '101'
            });
        };
    }
    Index.prototype.addCss = function () {
        // 插件最外层父级设置背景
        this.parent.css({
            'position': 'relative'
        })
        this.parent.find('.dropContent').css({
            'backgroundColor': '#fff',
            'position': 'absolute',
        });
        $('.menu-title', this.parent).css({
            'font-weight': 'bolder',
            'color': '#333'
        })
    }
    Index.prototype.bindEvent = function () {
        var self = this;
        this.parent.hover(function () {
            $(this).css({
                'background-color': '#fff',
                'border-left': '1px solid #ddd',
                'border-right': '1px solid #ddd',
                'padding-bottom': '2px',
            }).find('a').css('color', self.fontColor);
            
            $('.dropContent', self.parent).show();
        }, function () {
            $('.dropContent', self.parent).hide();
            console.log(self.parent.parents())
            var color = self.parent.parents().css('background-color');
            var fontColor = self.parent.find('a').css('color');
            $(this).css({
                'background-color': color,
                'border': 'none'
            }).find('a').css('color', self.fontColor);
        });

        $('.nav-item').hover(function () {
            $(this).find('a').css('color', 'red');
        }, function () {
            $(this).find('a').css('color', self.fontColor);
        });
    }

    $.fn.extend({
        dropDown: function (option) {
            option.parent = $(this);
            new Index(option);
            return this;
        }
    })
})();