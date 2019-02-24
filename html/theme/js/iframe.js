// 下拉树js
$(".form-location-input-more-btn").on("click", function() {
	$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideToggle("fast");
});

$("#choose-product .form-location-input-tree").each(function() {
	$(this).find("a").on("click", function() {
		var text = $(this).text();
		$(this).parents(".form-LocationInput").find("input").val(text).end().find("span.placeholder").slideUp();
		$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideUp();
	})
});

// 下拉菜单
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
$('.form-right').on('click','.form-select-menu li',function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});

//关闭方法
$('#choose-diction-template-content .form-btns .cancel,#choose-diction-template-content .pop-dialog-top i').on('click',function(){
	$(window.parent.document).find('.black80-bg').removeAttr('style');
	$(window.parent.document).find('#dictionTemplateIframe').remove();
});

//关闭方法
$('#choose-variable-content .form-btns .cancel,#choose-variable-content .pop-dialog-top i').on('click',function(){
	$(window.parent.document).find('.black80-bg').removeAttr('style');
	$(window.parent.document).find('#dictionTemplateIframe').remove();
});
//关闭方法
$('#choose-opr-content .form-btns .cancel,#choose-opr-content .pop-dialog-top i').on('click',function(){
	$(window.parent.document).find('.black80-bg').removeAttr('style');
	//$(window.parent.document).find('#dictionTemplateIframe').remove();
});

/** 
 * 关闭iframe
 */ 
function hidePopIframe(){
    window.parent.document.getElementById('strategyMapFrame').contentWindow.focusMap();
    $(window.top.document).find(".pop-left-close-bg").css("display","none");
    $(window.top.document).find(".pop-top-close-bg").css("display","none");
    $(window.parent.document).find(".map-inner-pop-close-bg").remove();
	$(window.parent.document).find("#strategyIframe").fadeOut(function(){
    	$(window.parent.document).find("#strategyIframe").css("display","none");
    });
    if(navigator.userAgent.indexOf("MSIE")>0){
        if(navigator.userAgent.indexOf("MSIE 8.0")>0)
        	CollectGarbage();
    }
}