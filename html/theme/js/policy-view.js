/*  dropdown、select打开ul js end */
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
/*  select选中改变btn文本 js  */
$('.form-right').on('click','.form-select-menu li',function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	if($('.J-choosed-g li').hasClass('choosed')){
		$('.J-remove-disabled .form-right-select').removeClass('disabled');
	}
	return false;
});
/*  select选中改变btn文本 js end */

/* 分页 */
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});
//重置按钮
$(".top-part-btn .cancel").on("click",function(){
	$(".top-part p").each(function(){
		$(this).text($(this).data("placeholder"));
	})
	$(".top-part input").val("");
	$('.placeholder').css('display','block');
})

// 中间弹窗

$('.form-right-select').on('click',function(){
	if(!$(this).hasClass('disabled')){
		var JQ_obj = $(this).parents('.form-items').next('.select-alert-center-wrapper').eq(0);
		$(".inner-pop-close-bg").fadeIn().one("click",function(){
			$(this).fadeOut();
			JQ_obj.fadeOut();
		});
		JQ_obj.fadeIn();
	}
})

$('.form-btns .cancel,.form-btns .ok').on('click',function(){
	var JQ_obj = $(this).parents('.select-alert-center-wrapper');
	JQ_obj.fadeOut();
	$('.inner-pop-close-bg').fadeOut();
})
$('.form-btns .ok').on('click',function(){
	var JQ_parents = $(this).parents('.select-alert-center-wrapper');
	var JQ_obj = JQ_parents.find('.table-wrapper').find('.radio-buttons.checked').parent('td').siblings('.J-key-time');
	JQ_parents.prev('.form-items').find('.form-right-value').text(JQ_obj.text());
})

$('.checked-box').not('.disabled').click(function() {
	$(this).toggleClass('checked');
});

$('.table-wrapper').on('click','.radio-buttons',function(){
	var JQ_obj = $(this).parents('.table-wrapper');
	JQ_obj.find('.radio-buttons').not('.disabled').removeClass('checked');
	$(this).addClass('checked');
})

$(".pop-dialog-top i,button.cancel,button.ok").on("click",function(){
	$(".inner-pop-close-bg").fadeOut();
	$('.select-alert-center-wrapper').fadeOut();
})