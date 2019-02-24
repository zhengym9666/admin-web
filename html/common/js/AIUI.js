(function($) {
	// 插件的定义
	$.fn.listBox = function(options) {
		var opts = $.extend({}, $.fn.listBox.defaults, options);
		return this.each(function() {
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			 $.ajax({
		            type: "post",//使用post方法访问后台
		            dataType: "json",//返回json格式的数据
		            url: o.url,//要访问的后台地址
		            data: o.para,//要发送的数据
		            cache:false,
		            success: function(ret){//msg为返回的数据，在这里做数据绑定
		            	if(o.isNull){
		            		var $obj = $("<option>请选择</option>");
		            		$obj.appendTo($this);
		            	}
		            	for(var i=0;i<ret.data.length;i++){
		            		var $obj =$("<option value='"+ret.data[i].valueAttr+"'>"+ret.data[i].textAttr+"</option>");
		            		$obj.appendTo($this);
		            	}
		   			 
		   			 if(o.callback){
		   				 o.callback(ret);
		   			 }
				}
			});
		});
	}
			
	$.fn.grid = function(options) {
		var opts = $.extend({}, $.fn.grid.defaults, options);
		return this.each(function() {
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			$this.html('');
			 $.ajax({
		            type: "post",//使用get方法访问后台
		            dataType: "json",//返回json格式的数据
		            url: o.url,//要访问的后台地址
		            data: o.para,//要发送的数据
		            cache:false,async:false, 
		            contentType: "application/x-www-form-urlencoded; charset=GBK", 
		            success: function(ret){
		            	var eachHtml = o.eachHtml;
		            	var r = eachHtml.match(/#(.*?)#/ig); // 在字符串 s 中查找匹配。
		            	if(r){
			            	var col = [];
			            	for(var i=0;i<r.length;i++){
			            		col[i]= r[i].substr(1,r[i].length-2);
			            	}
			            	var str = '';
			            	if(o.headHtml){
			            		str += o.headHtml;
			            	}
			            	if(ret.data){
				            	for(var i=0;i<ret.data.length;i++){
					            	var tempHtml = eachHtml;
				            		for(var j=0;j<col.length;j++){
				            			var obj = ret.data[i][col[j]];
				            			if(obj){
				            				var display = ret.data[i][col[j]+'_DISPLAY'];
				            				if(display){
				            					display = display+' <input name='+col[j]+' type=hidden value='+obj+' />';
				            				}else{
				            					display = obj;
				            				}

			            					tempHtml = tempHtml.replace(r[j],display);
				            			}else{
					            			tempHtml = tempHtml.replace(r[j],'无');
				            			}
				            		}
				            		str += tempHtml;
				            	}
			            	}
		            		$this.append(str);
		            		$this.append(o.footHtml);
		            	}else{
		            		var str = '';
			            	if(o.headHtml){
			            		str += o.headHtml;
			            	}
			            	if(ret.data){
				            	for(var i=0;i<ret.data.length;i++){
				            		str += eachHtml;
				            	}
			            	}
		            		$this.append(str);
		            		$this.append(o.footHtml);
		            	}
		            	if(o.callback){
			   				 o.callback(ret);
			   			 }
		            }
			});
		});
	}
	
	$.fn.post = function(options) {
		var opts = $.extend({}, $.fn.grid.defaults, options);
		return this.each(function() {
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			 $.ajax({
		            type: "post",//使用get方法访问后台
		            dataType: "json",//返回json格式的数据
		            url: o.url,//要访问的后台地址
		            data: o.para,//要发送的数据
		            cache:false,
		            contentType: "application/x-www-form-urlencoded; charset=GBK", 
		            success: function(ret){
		            	if(o.callback){
			   				 o.callback(ret);
			   			 }
		            }
			});
		});
	}
	// 插件的defaults
//	$.fn.DBListBox.defaults = {
//
//	};
	// 闭包结束

})(jQuery);