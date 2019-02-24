$(".tab-nav a").on("click", function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
})


$('#view-alert .right-alert-tabs_menu li.nth1').click(function() {
    $('#view-alert .right-alert-tabs_menu li').removeClass('current');
    $(this).addClass('current');
    $('#view-alert .right-alert_content').children().removeClass('current');
    $('#view-alert .right-alert_content').children('.right-alert-content-main.nth1').addClass('current');
});

$('#view-alert .right-alert-tabs_menu li.nth2').click(function() {
    $('#view-alert .right-alert-tabs_menu li').removeClass('current');
    $(this).addClass('current');
    $('#view-alert .right-alert_content').children().removeClass('current');
    $('#view-alert .right-alert_content').children('.right-alert-content-main.nth2').addClass('current');
});

$('#view-alert .right-alert-tabs_menu li.nth3').click(function() {
    $('#view-alert .right-alert-tabs_menu li').removeClass('current');
    $(this).addClass('current');
    $('#view-alert .right-alert_content').children().removeClass('current');
    $('#view-alert .right-alert_content').children('.right-alert-content-main.nth3').addClass('current');
});

$('.tabs-wapper').on('click', 'td a.name,.view-btn', function() {
	$('.right-alert-tabs_menu .nth1').removeClass("current");
	$('.right-alert-tabs_menu .nth2').addClass("current");
	$('.right-alert-content-main.nth1').removeClass("current");
	$('.right-alert-content-main.nth2').addClass("current");
	$(".activity-information p").text("");
	$(".right-alert-content-main.nth1 p").text("");
	$(".right-alert_head_title").text("");
	$(".timeline-ul").html("");
	 var id = $(this).parent().attr("data-id");
	 var hisId = $(this).parent().attr("his_id");
	    var type = $(this).parent().attr("type");
	    markRead(hisId, type);
	    initActivityBaseInfo(id);
	    initActivityHisAndDtl(id);
    $('#view-alert').fadeIn('fast').animate({
        marginRight: "0px"
    }, 300);
    $("body").css("overflow", "hidden");
});

$('.right-alert-content-main.nth2').on('click', '.look-suggest', function() {
    $(window.parent.document).find(".inner-pop-close-bg").fadeIn();
    $(window.parent.document).find('body').append('<div id="audit-opinion" class="main-alert main-alert2"><div class="main-alert-content"><div class="main-alert-content-top">审批意见<i class="iconfont icon-close"></i></div><div class="main-alert-content-main clear-fixed"><li class="form-items"><div class="form-left"><span>意见</span></div><div class="form-right form-textarea"><p></p></div></li><li class="form-items col-full"><div class="form-btns"><div><button type="button" class="TextBtn cancel">返回</button></div></div></li></div></div></div>');
    $(window.parent.document).find('#audit-opinion').fadeIn();
});

$('.right-alert-content-main.nth2').on('click','.right-btn li.nth1 div.checked-box',function(){
	if($(this).hasClass('checked')){
		$(".timeline-ul li[name=audit]").css("display","none");
	}else{
		$(".timeline-ul li[name=audit]").css("display","block");
	}
	
	$(this).toggleClass('checked');
});
$('.right-alert-content-main.nth2').on('click','.right-btn li.nth2 div.checked-box',function(){
	if($(this).hasClass('checked')){
		$(".timeline-ul li[name=operation]").css("display","none");
	}else{
		$(".timeline-ul li[name=operation]").css("display","block");
	}
	
	$(this).toggleClass('checked');
});
$('.right-alert-closeBtn').unbind('click');
$('.right-alert-closeBtn,.cancel-btn').on('click',function(){
	$('.right-alert').animate({
		marginRight: "-875px"
	},300).fadeOut();
	$("body").css("overflow","hidden");
	var msgCount = parseInt($(".header_items-title .btn-notice-num",window.parent.document).html());
	$(".header_items-title .btn-notice-num",window.parent.document).html(msgCount-1);
	if($('.tabs-wapper.js-tabs-div1').hasClass('open')){
		queryActivityHisPagination();
	}else if($('.tabs-wapper.js-tabs-div2').hasClass('open')){
		queryActivityApprPagination();
	}
});