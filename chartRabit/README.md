### 项目描述
1. 基于ajax的跨域请求的微信聊天机器人
2. 两种方式发送消息

	```
	  // 点击后获取数据并生成dom插入页面
	    $('.btn').on('click', function (){
	        var val = $('.inp').val();
	        if(val) {
	            getData(val);
	            addDom('my', val);
	        }
	    })
	
	 // 敲击回车键，做与点击发送按钮一样的事情
	    $('.inp').on('keyup', function(e) {
	        if(e.keyCode == 13 && this.value) {
	            $('.btn').trigger('click');
	        }
	    })
	```
1. 滚动条消失处理
	
	```
	overflow-y:scroll;
	------------------
	::-webkit-scrollbar{
		width:5px;
		height:20px;
		/* background-color:#fff; */
	}
	
	```
