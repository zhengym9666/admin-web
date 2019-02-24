/**
 * 中间弹出层使用方法：
 * 1.父级页面必须引用popIframe.js和ui.css
 * 2.内嵌页面必须引用popIframe.js和iframe.css
 * 3.内嵌页面左下角和右上角的关闭页面要调hidePopIframe方法
 */

/** 
 * 中间弹出层
 * iframeLevel:弹出层与当前层级差值
 * iframeId:创建的iframeID
 * width：宽度
 * height：高度[超出570右边栏会出现滚动条]
 * isScrolling：是否滚动
 * srcPath：内嵌jsp路径
 */ 
function popIframeLayout(iframeLevel, iframeId, width, height, isScrolling, srcPath){
	var _document;
	if(iframeLevel == 0)
		_document = $(window.document);
	else if(iframeLevel == 1)
		_document = $(window.parent.document);
	else if(iframeLevel == 2)
		_document = $(window.parent.parent.document);
	else {
		error("不支持此层级弹窗");
		return;
	}
	_document.find(".map-inner-pop-close-bg").remove();
	_document.find("body").append('<div class="map-inner-pop-close-bg"></div>');
	var _iframeLayout = "";
	_iframeLayout += '<iframe id="' + iframeId + '"'
				   + 'name="' + iframeId + '"'
				   + 'class="popIframe"'
				   + 'scrolling="' + isScrolling + '">'
				   + '</iframe>';
	_document.find("body").append(_iframeLayout);
	_document.find('#' + iframeId + '').css("width", width);
	_document.find('#' + iframeId + '').css("height", height);
	_document.find('#' + iframeId + '').attr("src", srcPath);
	_document.find('#' + iframeId + '').load(function(){
		_document.find('#' + iframeId + '').fadeIn();
		if($(window.top.document).find("body").hasClass('fold')) 
			$(window.top.document).find(".pop-left-close-bg").css('width','50px');
		else 
			$(window.top.document).find(".pop-left-close-bg").css('width','180px');
		$(window.top.document).find(".pop-left-close-bg").show();
		$(window.top.document).find(".pop-top-close-bg").show();
		_document.find(".map-inner-pop-close-bg").fadeIn();
	});
	
}