(function($) {
	// ����Ķ���
	$.fn.listBox = function(options) {
		var opts = $.extend({}, $.fn.listBox.defaults, options);
		return this.each(function() {
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			 $.ajax({
		            type: "post",//ʹ��post�������ʺ�̨
		            dataType: "json",//����json��ʽ������
		            url: o.url,//Ҫ���ʵĺ�̨��ַ
		            data: o.para,//Ҫ���͵�����
		            cache:false,
		            success: function(ret){//msgΪ���ص����ݣ������������ݰ�
		            	if(o.isNull){
		            		var $obj = $("<option>��ѡ��</option>");
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
		            type: "post",//ʹ��get�������ʺ�̨
		            dataType: "json",//����json��ʽ������
		            url: o.url,//Ҫ���ʵĺ�̨��ַ
		            data: o.para,//Ҫ���͵�����
		            cache:false,async:false, 
		            contentType: "application/x-www-form-urlencoded; charset=GBK", 
		            success: function(ret){
		            	var eachHtml = o.eachHtml;
		            	var r = eachHtml.match(/#(.*?)#/ig); // ���ַ��� s �в���ƥ�䡣
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
					            			tempHtml = tempHtml.replace(r[j],'��');
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
		            type: "post",//ʹ��get�������ʺ�̨
		            dataType: "json",//����json��ʽ������
		            url: o.url,//Ҫ���ʵĺ�̨��ַ
		            data: o.para,//Ҫ���͵�����
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
	// �����defaults
//	$.fn.DBListBox.defaults = {
//
//	};
	// �հ�����

})(jQuery);