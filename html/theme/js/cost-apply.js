$(function() {
	$(".special-tree").treemenu({
		delay: 300
	}).openActive();
});

$(".special-tree").on('click', 'a', function() {
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
});
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
	$('#J-add-edit-apply').addClass('current');
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("管理成本申请")
});
$('.viewFramework-index-body').on('click', 'td.name a', function() {
	$('.right-alert-content-main').removeClass('current');
	$('#J-look-apply').addClass('current');
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("成本申请信息")
});
$(".rightTopBtn").click(function(){
	$('.right-alert-content-main').removeClass('current');
	$('#J-add-edit-apply').addClass('current');
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("新增成本申请")
})
$('body').on('click', 'button.cancel', function() {
	$('.right-alert').animate({
		marginRight: "-875px",
	},300).fadeOut();
	$("body").css("overflow","hidden");
});
$(".inner-pop-btn").on("click",function(){
	$("#distr-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$("#distr").fadeOut();
	});
	$("#distr").fadeIn();
})
$("#distr .pop-dialog-top i,#distr .dialog-input-items button").on("click",function(){
	$("#distr").fadeOut();
	$(".inner-pop-close-bg").fadeOut();
})
$(".log-btn").on("click",function(){
	$("#log-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$("#log").fadeOut();
	});
	$("#log").fadeIn();
})
$("#log .pop-dialog-top i,#log .dialog-input-items button").on("click",function(){
	$("#log").fadeOut();
	$(".inner-pop-close-bg").fadeOut();
})
$(".open-cost-distr-choose").on("click",function(){
	$(window.parent.document).find("#popIframe").attr("src","iframePage/choose-cost-distr.html").fadeIn();
	$(window.parent.document).find(".inner-pop-close-bg").fadeIn();
})