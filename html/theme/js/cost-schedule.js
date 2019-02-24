$('.tabs_main table').width($('.tabs_main thead tr th').length*126);
//树状选择器
/*$(".form-location-input-more-btn").on("click", function() {
	$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideToggle("fast");
})
$(".form-location-input-tree").each(function() {
	$(this).find("a").on("click", function() {
		var text = $(this).text();
		$(this).parents(".form-LocationInput").find("input").val(text).end().find("span.placeholder").slideUp();
		$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideUp();
	})
})*/
/*$(function() {
	$(".special-tree").treemenu({
		delay: 300
	}).openActive();
});

$(".special-tree").on('click', 'a', function() {
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
});*/

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
/*  select选中改变btn文本 js end */


