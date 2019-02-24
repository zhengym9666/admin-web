$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});
$('.viewFramework-index-tabs .tabs_menu li').click(function(){
	$(this).siblings('li').removeClass('current');
	$(this).addClass('current');
});
$('.tabs-wapper').on('click', 'td.name a,.view-btn', function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$("body").css("overflow", "hidden");
});
$('.form-btn-div').on('click', 'button.cancel-btn,button.save-btn', function() {
	$('.right-alert').animate({
		marginRight: "-875px",
	}, 300).fadeOut();
	$(".yes-btn,.no-btn,.form-audit").hide();
	$("body").css("overflow-y","auto");
});
$(".audit-btn").on("click",function(){
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$("body").css("overflow", "hidden");
	$(".yes-btn,.no-btn,.form-audit").show();
})
