#京东首页练习
**预览：**

![](./GitHubImg/jd.gif)
##总结:
* ### 运用
 
	1.  jquery实现
	2.  $.fn.extend扩展功能：
	   * 封装下拉列表插件（导航-我的京东，网站导航）
	   * 封装滑动插件（左下角-话费，机票，酒店，游戏）
	3.   display: inline-block;与float:left;之间的选择
	4.  $('.nav-item',this.parent) // 两个参数的用法，第二个参数默认为当前的文档对象

* ### 拓展


 #### 1.常用的选择器：
	```
	两参数
	$('.myDiv','.wrapper') // 匹配.wrapper下的.myDiv
	
	基本选择器
	$(”#myDiv”) //匹配唯一的具有此id值的元素
	$(”div”) //匹配指定名称的所有元素
	$(”.myClass”) //匹配具有此class样式值的所有元素
	$(”*”) //匹配所有元素
	$(this) //匹配自身
	$(”div,span,p.myClass”) //联合所有匹配的选择器层叠选择器
	$(”form input”) //后代选择器，选择ancestor的所有子孙节点
	$(”#main > *”) //子选择器，选择parent的所有子节点
	$(”label + input”) //临选择器，选择prev的下一个临节点
	$(”#prev ~ div”) //同胞选择器，选择prev的所有同胞节点
		
	基本过滤选择器
	$(”tr:first”) //匹配第一个选择的元素
	$(”tr:last”) //匹配最后一个选择的元素
	$(”tr:even”) //匹配集合中偶数位置的所有元素(从0开始)
	$(”tr:odd”) //匹配集合中奇数位置的所有元素(从0开始)
	$(”td:eq(2)”) //匹配集合中指定位置的元素(从0开始)
	$(”div:animated”) //匹配所有正在运行动画的所有元素
		
	内容过滤选择器
	$(”div:contains(’John’)”) //匹配含有指定文本的所有元素
	$(”td:empty”) //匹配所有空元素(只含有文本的元素不算空元素)
	$(”div:has(p)”) //从原元素集合中再次匹配所有至少含有一个selector的所有元素
	$(”div:hidden”) //匹配所有隐藏的元素，也包括表单的隐藏域
	$(”div:visible”) //匹配所有可见的元素
		
	属性过滤选择器
	$(”div[id]”) //匹配所有具有指定属性的元素
	$(”input[name=’aa’]”) //匹配所有具有指定属性值的元素素
	$(”input[name^=’aa’]”) //匹配所有指定属性值以value开头的元素
	$(”input[name$=’aa’]”) //匹配所有指定属性值以value结尾的元素
	$(”input[name*=’aa’]”) //匹配所有指定属性值含有value字符的元素
		
	子元素过滤选择器
	$(”ul li:nth-child(n)”), //匹配父元素的第n个子元素
	$(”div span:first-child”) //匹配父元素的第1个子元素
	$(”div span:last-child”) //匹配父元素的最后1个子元素
		
	表单元素选择器
	$(”:input”) //匹配所有的表单输入元素，包括所有类型的input, textarea, select 和 button
	$(”:text”) //匹配所有类型为text的input元素
	$(”:password”) //匹配所有类型为password的input元素
	$(”:radio”) //匹配所有类型为radio的input元素
	$(”:checkbox”) //匹配所有类型为checkbox的input元素
	$(”:submit”) //匹配所有类型为submit的input元素
	$(”:image”) //匹配所有类型为image的input元素
	$(”:reset”) //匹配所有类型为reset的input元素
	$(”:button”) //匹配所有类型为button的input元素
	$(”:file”) //匹配所有类型为file的input元素
	$(”:hidden”) //匹配所有类型为hidden的input元素或表单的隐藏域表单元素过滤选择器
	$(”:enabled”) //匹配所有可操作的表单元素
	$(”:disabled”) //匹配所有不可操作的表单元素
	$(”:checked”) //匹配所有已点选的元素 
	```
 