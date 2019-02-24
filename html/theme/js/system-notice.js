$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});
$('.viewFramework-index-body').on('click', 'td.name a', function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".edit").hide();
	$(".view").show();
	$(".right-alert .form-btns").hide();
	$(".right-alert_head_title").text("公告明细");
});
$('.viewFramework-index-body').on('click', 'button.edit-btn', function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".edit").show();
	$(".view").hide();
	$(".form-btns").show();
	$(".form-btns .publish-btn,.form-btns .top-btn").hide();
	$(".right-alert_head_title").text("管理公告");
});
$(".rightTopBtn").click(function(){
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert .form-items input,textarea").attr("disabled",false);
	$(".form-btns").show();
	$(".form-btns .publish-btn,.form-btns .top-btn").show();
	$(".right-alert_head_title").text("新增公告");
})
$('body').on('click', '.right-alert-closebg,.right-alert-closeBtn,button.cancel,button.save-btn,button.publish-btn,button.top-btn', function() {
	$('.right-alert').animate({
		marginRight: "-875px",
	},300).fadeOut();
	$("body").css("overflow","hidden");
});
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