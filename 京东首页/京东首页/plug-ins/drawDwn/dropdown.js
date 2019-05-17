(function () {
    function Init(options) {
        // 参数
        this.opt = options;
        // 下拉列表内容
        this.menuList = options.menuList || [];
        // 要放置的区域
        this.parent = options.parent;
        // 下拉列表的宽度
        this.itemWidth = options.itemWidth || 60;
        // 最外面的标题
        this.title = options.title || '';
        // 下拉列表内的每块的排布方式  横向排布（y） 纵向排布（x）
        this.direction = options.direction || 'x';
        // 标题的高度
        this.titleHeight = options.height || $(this.parent).height();
        // 居中方式
        this.align = options.align || 'left';
        // 标题的链接
        this.href = options.href || '';
        // 默认的字体颜色
        this.fontColor = options.color || $(this.parent).css('font-color');
        this.borderColor = options.borderColor || '#e3e4e5';
        this.createDom();
        this.bindEvent()
    }
    Init.prototype.createDom = function () {
        // 插件内容区
        var content = $('<div class="dropContent"></div>');
        // 下拉列表初始化时展示的标题
        var title = $('<div class="title-icon"></div>');
        // 下拉列表内的内容区
        var dropDownContent = $('<div class="dropDownContent"></div>');

        // 如果下面有子导航则有下拉的图标
        if (this.menuList.length) {
            // 最外层标题展示
            $('<span></span>').text(this.title).appendTo(title);
            title.append($('<div class="down-icon"></div>'));
        } else {
            $('<span></span>').append($('<a href="' + this.href + '">' + this.title + '</a>')).appendTo(title);
        }

        // 下拉列表内容区的展示 内容区可以分成多块 按块展示
        for (var i = 0; i < this.menuList.length; i++) {
            var menuDetail = this.menuList[i];
            // 每一块的数据展示区
            var menu = $('<div class="menu"></div>');
            // 每一块的标题
            if (menuDetail.title) {
                var menuTitle = $('<div class="item menu-title"></div>').html(menuDetail.title)
                    .appendTo(menu)
                    .css({
                        textAlign: 'left',
                        padding: '0 10px'
                    });
            }
            var itemListData = menuDetail.items;
            var itemList = $('<div class="itemList"></div>');
            // 每行展示几列数据 存储在当前块最外层的div上
            menu.attr('data_col_num', menuDetail.colNum);
            // 渲染每一个选项内容
            for (var j = 0; j < itemListData.length; j++) {
                var item = $('<div class="item"></div>').append($('<a href="' + itemListData[j].href + '">' + itemListData[j].name + '</a>'))
                    .appendTo(itemList);
                if (this.direction == 'x') {
                    // 若每块是纵向排列 则每个选项的宽度应该为用户设置的整个下拉列表宽度除以每行展示个列数再减去每个的padding
                    item.css({
                        width: this.itemWidth / menuDetail.colNum - 20,
                        display: 'inline-block',
                        padding: '0 10px',
                        textAlign: 'left',
                        whiteSpace: 'nowrap'
                    });
                } else {
                    // 若每块是横向排列 则每个选项的宽度应该为用户设置的每块的宽度除以每行展示个列数再减去每个的padding
                    item.css({
                        width: menuDetail.width / menuDetail.colNum - 20,
                        display: 'inline-block',
                        padding: '0 10px',
                        textAlign: 'left',
                    })
                }

            }
            menu.append(itemList).appendTo(dropDownContent).css('width', menuDetail.width);
        }
        content.append(title)
            .append(dropDownContent)
            .appendTo($(this.parent));

        this.addCss();
    }
    Init.prototype.addCss = function () {
        $('a', this.parent).css({
            textDecoration: 'none',
            color: this.fontColor,
        })
        $('.dropContent', this.parent).css({
            display: 'inline-block',
            position: 'relative',
            color: this.fontColor,
            padding: '0px',
            // boxSizing: 'border-box',
        });
        $('.dropContent > .title-icon', this.parent).css({
            position: 'relative',
            zIndex: 100,
            padding: '0 10px',
            backgroundColor: $(this.parent).parents().css('background-color'),
            border: '1px solid transparent',
            cursor: 'pointer'
        })
        if (this.direction == 'y') {
            console.log($(this.parent).offset().left);
            $('.dropContent > .dropDownContent', this.parent).css({
                width: this.itemWidth,
                // padding: '0 10px',
                border: '1px solid ' + this.fontColor,
                position: 'absolute',
                top: this.titleHeight - 1 + 'px',
                color: this.fontColor,
                // left: 0,
                backgroundColor: '#fff',
                zIndex: 101,
                right: -84,
                margin: '0 auto',
                display: 'none',
            })
            $('.dropContent > .dropDownContent .menu', this.parent).css({
                float: 'left',
                borderLeft: '1px solid #eee',
                padding: '20px 5px',
            });
        } else {
            $('.dropContent > .dropDownContent', this.parent).css({
                padding: '0 10px',
                border: '1px solid ' + this.borderColor,
                position: 'absolute',
                top: this.titleHeight - 1 + 'px',
                color: this.fontColor,
                display: 'none',
                backgroundColor: '#fff',
                zIndex: 101,
            });
            $('.dropContent > .dropDownContent .menu', this.parent).css({
                width: this.itemWidth,
                borderBottom: '1px solid #eee',
            });

        }
        if (this.align == 'left' && this.direction == 'x') {
            $('.dropContent > .dropDownContent', this.parent).css({
                left: 0
            })
        } else if (this.direction == 'x') {
            $('.dropContent > .dropDownContent', this.parent).css({
                right: 0
            })
        }

        $('.dropContent .dropDownContent .menu-title', this.parent).css({
            fontWeight: '900'
        })
        $('.dropContent .itemList', this.parent).css({
            textAlign: 'left'
        })
    }
    Init.prototype.bindEvent = function () {
        var self = this;
        if (this.menuList.length) {
            $('.dropContent', $(self.parent)).hover(function (e) {
                e.preventDefault();
                $('.dropContent > .dropDownContent', self.parent).show();
                $('.dropContent > .title-icon', self.parent).css({
                    position: 'relative',
                    zIndex: 102,
                    padding: '0 10px',
                    backgroundColor: '#fff',
                    border: '1px solid ' + self.borderColor,
                    borderBottom: 'none',
                    cursor: 'pointer'
                })
            }, function () {
                $('.dropContent > .dropDownContent', self.parent).hide();
                $('.dropContent > .title-icon', self.parent).css({
                    position: 'relative',
                    zIndex: 100,
                    padding: '0 10px',
                    backgroundColor: $(self.parent).parents().css('background-color'),
                    border: 'none',
                    cursor: 'pointer'
                })
            });
        } else {
            $('.title-icon', this.parent).hover(function () {
                $(this).css('color', 'red')
                    .find('a').css('color', 'red');
            }, function () {
                $(this).css('color', self.fontColor)
                    .find('a').css('color', self.fontColor);
            })
        }

        $('.item', this.parent).hover(function () {
            $(this).find('a').css('color', 'red');
        }, function () {
            $(this).find('a').css('color', self.fontColor)
        });

    }

    $.fn.extend({
        dropdown: function (options) {
            options.parent = this;
            console.log(this);
            new Init(options);
            return this;
        }
    })
}())