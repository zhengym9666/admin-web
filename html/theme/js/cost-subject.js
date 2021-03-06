//重置按钮
$(".top-part-btn .reset").on("click",function(){
	$(".top-part p").each(function(){
		$(this).text($(this).data("placeholder"));
	})
	$(".top-part input").val("");
})

/* 分页 */
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});

// 右侧弹窗js
$('.rightTopBtn').on('click', function() {
	$('.right-alert-content-main-form').hide();
	$('#edit-modify').show();
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$('.right-alert_head_title').html('新建成本科目');
});
$('body').on('click','.operation .state-btn',function(){
	$('.right-alert-content-main-form').hide();
	$('#edit-modify').show();
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$('.right-alert_head_title').html('管理成本科目');
})
$('.tabs_body').on('click','.name',function(){
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$('.right-alert-content-main-form').hide();
	$('#look-cost').show();
})
$('button.cancel').on('click', function() {
	$('.right-alert').animate({
		marginRight: "-875px",
	},300).fadeOut();
	$("body").css("overflow","hidden");
});

//树状选择器
$(".form-location-input-more-btn").on("click", function() {
	$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideToggle("fast");
})
$(".form-location-input-tree").each(function() {
	$(this).find("a").on("click", function() {
		var text = $(this).text();
		$(this).parents(".form-LocationInput").find("input").val(text).end().find("span.placeholder").slideUp();
		$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideUp();
	})
})


$(function() {
	$(".special-tree").treemenu({
		delay: 300
	}).openActive();
});

$(".special-tree").on('click', 'a', function() {
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
});