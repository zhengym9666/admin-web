
$(".form-location-input-more-btn").on("click", function() {
	$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideToggle("fast");
});

$(".form-location-input-tree").each(function() {
	$(this).find("a").on("click", function() {
		var text = $(this).text();
		$(this).parents(".form-LocationInput").find("input").val(text).end().find("span.placeholder").slideUp();
		$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideUp();
	});
});

//选择渠道应用范围
$('.special-tree').on('click','.special-tree-btn',function(){
	$(this).toggleClass('open');
	$(this).siblings('ul').slideToggle();
});

$(function(){
    $(".special-tree").treemenu({delay:300}).openActive();
});

$(".special-tree").on('click','a',function(){
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
});

/*  dropdown、select打开ul js end */
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
/*  select选中改变btn文本 js  */
$('body').on('click','.select-menu li,.DeepColor-select-menu li',function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});
$('.form-right').on('click','.form-select-menu li',function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});

/* 开关js */
$('.switches').click(function() {
	if(!$(this).hasClass('disabled')){
		$(this).toggleClass('open');
		if($(this).hasClass('open')){
			$(this).parents('.switches-wrapper').siblings('.switches-hidden').slideDown('fast');
			$(this).parent().next().next().find('.no-control').hide();
			$(this).parent().next().next().find('.count-g').show();
			$(this).parent().next().next().find('button').removeClass('disabled');
		}else{
			$(this).parents('.switches-wrapper').siblings('.switches-hidden').slideUp('fast');
			$(this).parent().next().next().find('.no-control').show();
			// 初始化
			$(this).parent().next().next().find('.count-g .green').text(0);
			$(this).parents('.switches-wrapper').siblings('.switches-hidden').find('.input').val(null);
            $(this).parents('.switches-wrapper').siblings('.switches-hidden').find('div.checked-box').removeClass("checked");
			$(this).parent().next().next().find('.count-g').hide();
			$(this).parent().next().next().find('button').addClass('disabled');
			$(this).parent().siblings("p").css("display","none");
		}
	}

});

$('.setBtn').on('click',function(){
	if(!$(this).hasClass('disabled')){
		$(this).parents('.switches-wrapper').siblings('.switches-hidden').slideToggle('fast');
	}
});


$('.form-input-step4').on('click','.switches-left .switches',function(){
	if(!$(this).hasClass('disabled')){
		$(this).parents('.switches-top').siblings('.switches-bottom').slideToggle('fast');
		$(this).parent().siblings('.only-show').fadeToggle();
	}
});
$('.form-input-step4').on('click','.form-right .switches',function(){
	$(this).parents('.form-right').siblings('.form-hidden').slideToggle('fast');
	$(this).siblings('p').fadeToggle();
});
$('.form-input-step4 .checked-box').not('.disabled').click(function() {
	if(!$(this).hasClass('disabled')){
		 $(this).toggleClass('checked');
		    var length = $(this).parents('.switches-hidden').find('.checked-box.checked').length;
		    $(this).parents('.switches-hidden').prev('.switches-wrapper').find('.count-g .green').text(length);
		    if(length > 0){
		    	$(this).parents('.switches-hidden').prev('.switches-wrapper').find("p").css("display","none");
		    }
	}
});
$('.form-input-step2 .checked-box').not('.disabled').click(function() {
	if(!$(this).hasClass('disabled')){
		 $(this).toggleClass('checked');
	}
});

/*$('#oprRespState .checked-box').not('.disabled').click(function() {
    $(this).toggleClass('checked');
    var length = $(this).parents('.switches-hidden').find('.checked-box.checked').length;
    $(this).parents('.switches-hidden').prev('.switches-wrapper').find('.count-g .green').text(length);
    if(length > 5){
    	$(this).parents('.switches-hidden').prev('.switches-wrapper').find("p").text("最多选择五个执行规则");
    	$(this).parents('.switches-hidden').prev('.switches-wrapper').find("p").show();
    }else if(length > 0){
    	$(this).parents('.switches-hidden').prev('.switches-wrapper').find("p").css("display","none");
    }
});*/
$('.form-btns .next').on('click',function(){
	var JQ_parent = $(this).parents('.form-input-step');
	var JQ_obj = $('.right-alert-tabs_menu li.current');
	var channelStartDate  = new Date($('#channelStartDateEdit').val().replace(/-/g,"/"));
	var channelEndDate  = new Date($('#channelEndDateEdit').val().replace(/-/g,"/"));
	if(channelStartDate!="" && channelEndDate!="" && channelStartDate >= channelEndDate){
		alert('结束时间应晚于开始时间');
		return;
	}
	var index;
	if(check_hasVal(JQ_parent,'.J-must-value')) {
		$('.form-input-step').css('display', 'none');
		$(this).parents('.form-input-step').next('.form-input-step').css('display', 'block');
		JQ_obj.removeClass('current').next('li').addClass('current');

		$('.right-alert-tabs_menu li.current').find('.no-click').removeClass('no-click');
		//index = parseInt(JQ_parent.attr('id'),10);
		//$('.right-alert-tabs_menu li').eq(index).find('.no-click').removeClass('no-click');
	}
});
$('.right-alert-tabs_menu a').on('click',function(){
	if(!$(this).hasClass('no-click')){
		$('.right-alert-tabs_menu li.current').removeClass('current');
		$(this).parent().addClass('current');
		var index = $(this).parent().index();
		$('.form-input-step').hide();
		$('.form-input-step').eq(index).show();
	}
})
$('.form-btns .before').on('click',function(){
	$('.form-input-step').css('display','none');
	$(this).parents('.form-input-step').prev('.form-input-step').css('display','block');

	var JQ_obj = $('.right-alert-tabs_menu li.current');
	JQ_obj.removeClass('current').prev('li').addClass('current');
})
$('.input').on('keyup',function(){
	var val = $(this).val();
	if(/^[1-9]\d*$/.test(val)){
		$(this).parent().prev().find('.green').text(val);
	}
	else if( val==''){
		$(this).parent().prev().find('.green').text(0);
	}
	else{
		if(this.value.length==1){
    		this.value=this.value.replace(/[^1-9]/g,'');
    	}else{
    		this.value=this.value.replace(/\D/g,'');
    	}
	}

})

$('.J-add').on('click',function(){
	var JQ_obj = $(this).prev().clone(true);
	JQ_obj.find('.Wdate').val(null);
	JQ_obj.insertBefore(this);
})
$('.right-alert_content').on('click','.delete',function(){
	$(this).parent().remove();
})


//检查必填项是否有值
function check_hasVal(JQ_obj,cssName){
	var flag = true;
	JQ_obj.find(cssName).each(function(index,item){
		if(item.tagName == 'INPUT'){

			if(!$(this).val()){
				flag = false;
				return flag;
			}
		}
		else if(item.tagName == 'UL'){
			if(!$(this).find('li').hasClass('choosed')){
				flag = false;
				return flag
			}
		}
	})
	return flag;
}

$('body').click(function(e) {
	var _formSelectMenu = $('.form-select-menu-type').parents(".form-right"); // 设置目标区域
	// 防止点击ifarme，无法获取父窗口对象
	_formSelectMenu = _formSelectMenu.length > 0 ? _formSelectMenu : parent.$('.form-select-menu-type');
	if (!_formSelectMenu.is(e.target) && _formSelectMenu.has(e.target).length === 0) {
	    _formSelectMenu.removeClass('open');
	} else {
	//	$(e.target).parents('.form-items').siblings().find('.open').removeClass('open');
	}
});
