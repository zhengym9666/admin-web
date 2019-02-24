$(".top-part-btn .reset").on("click",function(){
	$(".top-part p").each(function(){
		$(this).text("");
	})
	$(".top-part input").val("");
})
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});
$('.viewFramework-index-body').on('click', '.edit-btn', function() {
	$('.right-alert-content-main').removeClass('current');
	$('#J-add-edit-type').addClass('current');
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("管理成本类型")
});
$('.viewFramework-index-body').on('click', 'td.name a', function() {
	$('.right-alert-content-main').removeClass('current');
	$('#J-look-type').addClass('current');
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("成本类型信息")
});
$(".rightTopBtn").click(function(){
	$('.right-alert-content-main').removeClass('current');
	$('#J-add-edit-type').addClass('current');
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("新增成本类型")
})
$('button.cancel').on('click',function(){
	$('.right-alert').animate({
		marginRight: "-875px"
	},300).fadeOut('fast');
})

$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
$('.form-right').on('click','.form-select-menu li',function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
});