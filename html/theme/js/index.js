$(".notice-content .read-more").on("click",function(){
	$(window.parent.document).find(".primary-nav li").removeClass("active");
	$(window.parent.document).find(".primary-nav-items.l7").addClass("active");
	$(window.parent.document).find(".viewFramework-sidebar2 li[title='system-notice.html']").addClass("active");
})
//$(".chart-top .part-more").on("click",function(){
//	$(window.parent.document).find(".primary-nav li").removeClass("active");
//	$(window.parent.document).find(".primary-nav-items.l6").addClass("active");
//})
$("a[href='activity-calendar.html']").on("click",function(){
	$(window.parent.document).find(".primary-nav li").removeClass("active");
	$(window.parent.document).find(".primary-nav-items.l4").addClass("active");
	$(window.parent.document).find(".viewFramework-sidebar2 li[title='activity-calendar.html']").addClass("active");
})
$("a[href='marketing-effect.html']").on("click",function(){
	$(window.parent.document).find(".primary-nav li").removeClass("active");
	$(window.parent.document).find(".primary-nav-items.l6").addClass("active");
	$(window.parent.document).find(".viewFramework-sidebar2 li[title='marketing-effect.html']").addClass("active");
})

$('.chart-top .part-more.manage').on('click',function(){
	$('.right-alert').fadeIn('fast').animate({
		marginRight: '0px'
	},300);
	$('body').css('overflow','hidden');
})
/* ����js */
$('.switches').click(function() {
	if(!$(this).hasClass('disabled')){
		$(this).toggleClass('open');
		if($(this).hasClass('open')){
			$(this).parents('.switches-wrapper').siblings('.switches-hidden').slideDown('fast');
		}else{
			$(this).parents('.switches-wrapper').siblings('.switches-hidden').slideUp('fast');
		}
	}
})
$('.checked-box').not('.disabled').click(function() {
	$(this).toggleClass('checked');
});