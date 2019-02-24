/**
+-------------------------------------------------------------------
* jQuery hDialog - 多功能弹出层插件
+-------------------------------------------------------------------
* @version 2.0.1
* @update 2015.07.30
* @author haibao <hhb219@163.com> <http://www.hehaibao.com/>
+-------------------------------------------------------------------
*/
;(function($, window, document, undefined) {	
	var $D = $(document), $W = $(window), $B = $('body');
	methods = {
        init: function (options) {
           	return this.each(function() {
				var T = $(this), _O = T.data('hDialog');
                if(typeof(_O) == 'undefined') {
	                	var defaults = {
	                		title: '',              	    //弹框标题
						box: '',               //弹框默认选择器
						modalBg: 'rgba(0, 0, 0, 0.3)', //遮罩默认背景颜色
						closeBg: '',         //弹框关闭按钮默认背景颜色
						width: 0,                 //弹框默认宽度 
						positions: 'center',        //弹框位置(默认center：居中，top：顶部居中，left：顶部居左，bottom：底部居右)
						effect: 'zoomOut',          //弹框关闭效果(结合animate.css里的动画，默认：zoomOut)
						hideTime: 0,				    //弹框定时关闭(默认0:不自动关闭，以毫秒为单位)
						resetForm: false,            //是否清空表单(默认true：清空，false：不清空)
						modalHide: true,            //是否点击遮罩背景关闭弹框(默认true：关闭，false：不可关闭)
						isOverlay: true,            //是否显示遮罩背景(默认true：显示，false：不显示)
	                		closeHide: true,            //是否隐藏关闭按钮(默认true：不隐藏，false：隐藏)
	                		escHide: true,              //是否支持ESC关闭弹框(默认true：关闭，false：不可关闭)
	                		autoShow: false,            //是否页面加载完成后自动弹出(默认false点击弹出，true：自动弹出)
	                		types: 1,                   //弹框类型(默认：1正常弹框，2：iframe框架)
	                		iframeSrc: '',              //弹框类型为iframe时使用的 链接地址
	                		iframeId: 'iframeHBox',     //弹框类型为iframe时使用的 ID
	                		beforeShow: function(){},   //显示前的回调方法
	                		afterHide: function(){}     //隐藏后的回调方法
	                	};
					_O = $.extend({}, defaults, options);
					T.data('hDialog', _O);
                }
                _O = $.extend({}, _O, options);
                
                if(_O.autoShow != false) {
                		methods.open(_O,T);
                }else{
                		T.on('click',function() { methods.open(_O,T); });
                }
			});
        },
        open: function (o,T) {
        		var w,h,t,l,m,$close, headTpl = closeBtnTpl = overlayTpl = iframeTpl = '', $obj = $(o.box), title = o.title, c = T.attr("class"), modalBg = o.modalBg, closeBg = o.closeBg;
			w = o.width != undefined ? parseInt(o.width) : 300, h = o.height != undefined ? parseInt(o.height) : 270, m = ""+parseInt(-(h/2))+'px 0 0 '+parseInt(-(w/2))+"px";
        		
        		//重置表单
			if(o.resetForm) {
           	 	$obj.find('input[type=text],input[type=tel],input[type=email],input[type=date],input[type=password],textarea').val('');
           	 	$obj.find('select option').removeAttr('selected');
            		$obj.find('input[type=radio],input[type=checkbox]').removeAttr('checked');
       		}
			
			//显示前的回调
			methods.fire.call(this, o.beforeShow); 
			
			//弹框位置
			switch (o.positions) {
				case 'top': 
					t = 0; l = '0'; m = "0 0 0 "+parseInt(-(w/2))+"px";
				break;
				case 'right': 
					t = l = m = 0;
				case 'bottom':
					t = 0;
					l = parseInt($W.width() - w)+'px';
					m = 0;
				break;
				default: 
					t = l = '0';
			}
			
			//关闭按钮
			if(o.closeHide != false) closeBtnTpl = '<a id="HCloseBtn" class="right-alert-close-btn"><i class="iconfont icon-close"></i></a>';

			//弹框标题
			if(o.title != '') headTpl = '<div id="HTitle" style="padding:10px 45px 10px 12px;border-bottom:1px solid #ddd;background-color:#f2f2f2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+o.title+'</div>';
			
			//遮罩背景层
			if(o.isOverlay != false) overlayTpl = "<div id='HOverlay' style='width:"+$D.width()+"px;height:"+$D.height()+"px;background-color:rgba(0,0,0,0);position:fixed;top:0;left:0;z-index:99999999;'></div>";
       	 	
			//显示弹框
			if(o.types == 2){ iframeTpl = '<iframe width="' + o.width + '" height="' + o.height + '" frameborder="0" scrolling="auto" src="' + o.iframeSrc + '"></iframe>'; $B.append('<div id="'+o.iframeId+'"></div>'); $obj = $('#'+o.iframeId); }
        		if(o.autoShow != false) $obj = T;
        		$B.stop().append(overlayTpl).find($obj).css({'position':'fixed','top':t,'left':l,'bottom':0,'z-index':999999999,'width':o.width,'height':o.height}).removeAttr('class').addClass('animated3 '+c).prepend(headTpl+closeBtnTpl+iframeTpl).show();
        
        		//默认关闭
        		$close = $('#HCloseBtn');
        		if(o.modalHide) $close = $('#HOverlay,#HCloseBtn');
			$close.on('click',function(){ methods.close(o,T); });
			
			//定时关闭
        		if(o.hideTime != 0) setTimeout(function(){ methods.close(o,T); }, parseInt(o.hideTime));
        },
	    close: function (o,T) {
	    		var $obj = (o.autoShow != false) ? T : $(o.box);
	    		methods.remove('#HOverlay,#HCloseBtn,#HTitle,#'+o.iframeId);
	    		$obj.removeAttr('class').addClass('animated3 '+o.effect);
			if($obj.hasClass(o.effect)){ setTimeout(function(){ $obj.removeAttr('style').hide(); },300); }
			this.fire.call(this, o.afterHide); //隐藏后的回调
	    },
        remove: function (a) { $(a).remove(); },
	    fire: function (event, data) { if($.isFunction(event)) { return event.call(this, data); } },
	    destroy: function() { return $(this).each(function() { var $this = $(this); $this.removeData('hDialog'); }); }
    };
    
	$.fn.hDialog = function (method) {
		if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
		else if(typeof method === 'object' || !method) {return methods.init.apply(this, arguments); }
		else{$.error('Error! Method' + method + 'does not exist on jQuery.hDialog！'); return this; }
	};
	
})(jQuery, window, document);
