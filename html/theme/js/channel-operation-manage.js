/* 开关js */
$('.switches').not('.disabled').click(function() {
	$(this).toggleClass('open');
	$(this).parent().next('.second-items').slideToggle();
});

/* 多选按钮 */
$('.checked-box').not('.disabled').click(function() {
	$(this).toggleClass('checked');
});

/*  select选中改变btn文本 js  */
$(function(){
	var	btnMenuChooseText = $('.select-menu li.choosed').text();
	$('.select-btn p').text(btnMenuChooseText);
})

$('.select-menu li').click(function(){
	$('.select-menu li').removeClass('choosed');
	$(this).addClass('choosed');
	var	btnMenuChooseText = $('.select-menu li.choosed').text();
	$('.select-btn p').text(btnMenuChooseText);
});
/*  select选中改变btn文本 js end */

$('body').click(function(e) {
    var _fastNewBuilt = $('.SpanSelect'); // 设置目标区域
    if (!_fastNewBuilt.is(e.target) && _fastNewBuilt.has(e.target).length === 0) { 
   	 	$('.SpanSelect').removeClass('open');
    } else {
    		$('.SpanSelect').toggleClass('open');
    }
});