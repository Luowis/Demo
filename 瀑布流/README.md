### 项目描述
基于ajax实现服务器代理中转的跨域方法，需要配合在服务器端才能正常展示

### 心得

防止多次点击发送多次请求，避免发送过多无用信息

```
$.ajax({
	//点击一次后，数据加载成功前，按钮无法被点击
	beforeSend: function () {
		// attr({disabled: 'disabled'});
	},
	// 完成后移除属性
	complete:function(){
		// removeAttr({'disabled'})
	}
})
```

## 拓展
### ajax与jsonp跨域
> 实现方式不一样而已

1. ajax和jsonp这两种技术在调用方式上“看起来”很像，目的也一样，都是请求一个url，然后把服务器返回的数据进行处理，因此jquery和ext等框架都把jsonp作为ajax的一种形式进行了封装；

2. ajax和jsonp其实本质上是不同的东西。ajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是通过HTTP来动态添加`<script>`标签来调用服务器提供的js脚本。

3. 其实ajax与jsonp的区别不在于是否跨域，ajax通过服务端代理一样可以实现跨域，jsonp本身也不排斥同域的数据的获取。

4. jsonp是一种方式或者说非强制性协议，如同ajax一样，它也不一定非要用json格式来传递数据，如果你愿意，字符串都行，只不过这样不利于用jsonp提供公开服务。

5. jsonp整个过程中，本地站点一直处于主动的地位，主动的发送请求，主动的加载远程js.而第三方站点则处于被动的响应



### 服务器代理中转的方式跨域
