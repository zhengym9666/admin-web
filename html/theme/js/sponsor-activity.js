$(function() {
	$(".special-tree").treemenu({
		delay: 300
	}).openActive();
});

$(".special-tree").on('click', 'a', function() {
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
});

/* 分页 */
$('.viewFramework-index-tabs .pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});
$('#test-alert .pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});
/* 分页 */
$(".right-alert-content-main.nth2 .pagination").twbsPagination({
	totalPages: 35,
	visiblePages: 1
});

$(".select-alert-center-wrapper .pagination").twbsPagination({
	totalPages: 35,
	visiblePages: 1
});
$('.viewFramework-index-tabs .tabs_menu li').click(function() {
	$(this).siblings('li').removeClass('current');
	$(this).addClass('current');
});

/* 右侧弹窗tab js */
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

// 右侧弹窗js
//$('.tabs-wapper').on('click', 'td.name a', function() {
//	$('#view-alert').fadeIn('fast').animate({
//		marginRight: "0px"
//	}, 300);
//	$("body").css("overflow", "hidden");
//	$(".view-ul").show();
//	$(".edit-ul").hide();
//	$(".top-operation-btn").hide();
//});
$('.view-btn').on('click', function() {
	$('#view-alert').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$("body").css("overflow", "hidden");
	$(".view-ul").show();
	$(".edit-ul").hide();
	$(".top-operation-btn").hide();
});

$('.wait-release .test-btn').on('click', function() {
	$("#test-alert").find(".right-alert-tabs_menu li.nth3").hide().end().
	find(".form-btn-div.nth1").hide().end().
	find(".form-btn-div.nth2").show();
	$('#test-alert').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$("body").css("overflow", "hidden");
});

$('.testing .test-btn').on('click', function() {
	$("#test-alert").find(".right-alert-tabs_menu li.nth3").show().end().
	find(".form-btn-div.nth1").show().end().
	find(".form-btn-div.nth2").hide();
	$('#test-alert').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$("body").css("overflow", "hidden");
});

$('.modify-btn').on('click', function() {
	$('#view-alert').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$("body").css("overflow", "hidden");
	$(".view-ul").hide();
	$(".edit-ul").show();
	$(".top-operation-btn").show();
});


//新增策略
$('.top-operation-btn.nth1').click(function() {
	$(window.parent.document).find(".inner-pop-close-bg").fadeIn();
	$(window.parent.document).find('body').append('<div id="add-strategy" class="main-alert main-alert1"><div class="main-alert-content"><div class="main-alert-content-top">新增策略<i class="iconfont icon-close"></i></div><div class="main-alert-content-main"><li class="form-items"><div class="form-left"><span><i class="iconfont icon-bitian"></i>策略名称：</span></div><div class="form-right"><input id="strategyN" type="text" /></div></li><li class="form-items"><div class="form-left"><span>策略描述：</span></div><div class="form-right form-textarea"><textarea id="strategyDesc"></textarea></div></li><li class=" form-items col-full"><div class="form-btns"><div><button type="button" class="TextBtn cancel">取消</button><button type="button" class="TextBtn-import ok">确定</button></div></div></li></div></div></div>');
	$(window.parent.document).find('#add-strategy').fadeIn();
});



$('.nth3').on('click', '.look-suggest', function() {
	$(window.parent.document).find(".inner-pop-close-bg").fadeIn();
	$(window.parent.document).find('body').append('<div id="audit-opinion" class="main-alert main-alert2"><div class="main-alert-content"><div class="main-alert-content-top">审批意见<i class="iconfont icon-close"></i></div><div class="main-alert-content-main clear-fixed"><li class="form-items"><div class="form-left"><span>意见：</span></div><div class="form-right form-textarea"><p></p></div></li><li class="form-items col-full"><div class="form-btns"><div><button type="button" class="TextBtn cancel">返回</button></div></div></li></div></div></div>');
	$(window.parent.document).find('#audit-opinion').fadeIn();
});

/* 表格中操作栏，开始暂停js */
//$('.tabs_box').on('click', '.testing .state-btn', function() {
//	$(this).parent('.operation').parent().removeClass('testing').addClass('suspend');
//	$(this).text("开始");
//});
//$('.tabs_box').on('click', '.running .state-btn', function() {
//	$(this).parent('.operation').parent().removeClass('running').addClass('wait-release');
//	$(this).text("开始");
//});
//$('.tabs_box').on('click', '.suspend .state-btn', function() {
//	$(this).parent('.operation').parent().removeClass('suspend').addClass('testing');
//	$(this).text("暂停");
//});
//$('.tabs_box').on('click', '.wait-release .state-btn', function() {
//	$(this).parent('.operation').parent().removeClass('wait-release').addClass('running');
//	$(this).text("暂停");
//});

/*  dropdown、select打开ul js end */
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
/*  select选中改变btn文本 js  */
$('body').on('click', '.select-menu li,.DeepColor-select-menu li', function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});

$('.form-right').on('click', '.li-thing-id', function() {
	if(!$(this).hasClass('disabled')) {
		$(this).siblings('.li-thing-id').removeClass('choosed');
		$(this).addClass('choosed');
		var btnMenuChooseText = $(this).find('span:first').html();
		$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
		$(this).parent().parent().removeClass('open');
	}
	return false;
})


//$('.form-right').on('click','.li-thing-id',function(){
//	if(!$(this).hasClass('disabled')){
//		$(this).siblings('.li-thing-id').removeClass('choosed');
//		$(this).addClass('choosed');
//		var btnMenuChooseText = $(this).find('span').html();
//		$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
//		$(this).parent().parent().removeClass('open');
//	}
//	return false;
//})


/*  select选中改变btn文本 js end */

$(".form-location-input-more-btn").on("click", function() {
	$(".form-location-input-tree").slideToggle();
});

$(".form-location-input-tree").each(function() {
	$(this).find("a").on("click", function() {
		var text = $(this).text();
		$(this).parents(".form-LocationInput").find("input").val(text).end().find("span.placeholder").slideUp();
		$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideUp();
	});
});

$(function() {
	$(".special-tree").treemenu({
		delay: 300
	}).openActive();
});

$(".special-tree").on('click', 'a', function() {
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
});

//点击其他地方隐藏下拉框
/*$('#new-event-div').on('click',function(e){
	var JQ_obj = $(this).find('.form-right.open');
	if(!JQ_obj.is(e.target)&&JQ_obj.has(e.target).length===0){
		JQ_obj.removeClass('open');
	}

})*/

$('body').on('click', 'button.cancel-btn', function() {
	$('.right-alert').animate({
		marginRight: "-875px"
	}, 300).fadeOut();
	$("body").css("overflow-y", "auto");
	$(".right-alert-content-main").removeClass("current");
	$(".right-alert-content-main.nth1").addClass("current");
	$(".right-alert-tabs_menu li").removeClass("current");
	$(".right-alert-tabs_menu li.nth1").addClass("current");
});

$('.checked-box').not('.disabled').click(function() {
	$(this).toggleClass('checked');
});

$('.checked-box.all-checked-btn').click(function() {
	if($('.checked-box.all-checked-btn').hasClass('checked')) {
		$('.checked-box').not('.disabled').addClass('checked');
	} else {
		$('.checked-box').not('.disabled').removeClass('checked');
	}
});

$('.form-right-select').on('click', function() {
	$(".inner-pop-close-bg").fadeIn().one("click", function() {
		$(this).fadeOut();
		$('.select-alert-center-wrapper').fadeOut();
	});
	$('.select-alert-center-wrapper').fadeIn();
});


$('.select-alert-center-wrapper .form-btns .cancel,.pop-dialog-top .icon-close').on('click',function(){

	$('.select-alert-center-wrapper').fadeOut();
	$(".inner-pop-close-bg").fadeOut();
});
$('.radio-buttons').not('.disabled').click(function() {
	$('.table-wrapper .radio-buttons').not('.disabled').removeClass('checked');
	$(this).addClass('checked');
});
$(".next-btn").on("click", function() {
	$(this).parents(".right-alert-content-main").removeClass("current");
	$(this).parents(".right-alert-content-main").next().addClass("current");
	$("#test-alert .right-alert-tabs_menu li.current").removeClass("current").next().addClass("current");
});

$(".past-btn").on("click", function() {
	$(this).parents(".right-alert-content-main").removeClass("current");
	$(this).parents(".right-alert-content-main").prev().addClass("current");
	$("#test-alert .right-alert-tabs_menu li.current").removeClass("current").prev().addClass("current");
})


$('.right-alert-content-main.nth2').on('click', '.checked-box', function() {
	var Text = $(this).parent().siblings('.nth2').text();
	$('.right-alert-content-main.nth2 .choosed-show-div-top .show-wapper').append("<div class='condition-content2 animated3 fadeIn'><span>" + Text + "</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});

$('body').on('click', '.right-alert-content-main.nth2 .delete-condition2', function() {
	$(this).parent('.condition-content2').remove();
});
//$('.right-alert-content-main.nth2').on('click','.checked-box',function(){
//	var Text = $(this).parent().siblings('.nth2').text();
//	$('.right-alert-content-main.nth2 .choosed-show-div-top .show-wapper').append("<div class='condition-content2 animated3 fadeIn'><span>"+ Text +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");	
//});
//$('body').on('click', '.right-alert-content-main.nth2 .delete-condition2', function() {
//    $(this).parent('.condition-content2').remove();
//});
$('.form-right').on('click','.form-select-menu li',function() {
	if($(this).hasClass('disabled')){
		return false;
	}
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});


(function($, window, document,undefined){
	  if(!window.browser){
	      
	    var userAgent = navigator.userAgent.toLowerCase(),uaMatch;
	    window.browser = {}
	     
	    function isIE(){
	      return ("ActiveXObject" in window);
		}
	    
	    /**
	     * 判断是否为IE
	     */
	    if(!uaMatch){
	      if(userAgent.match(/msie ([\d.]+)/)!=null){
	    	  if(document.body.clientWidth < 1284 ) {
	    			$('.viewFramework-index-tabs.activity-manage-tabs > .tabs_menu li').css('width','140px');
	    			$('.top-part .form-right').css('width','180px');
	    			$('.tabs-wapper table tbody tr td.operation').css('width','250px');
	    		}
	      }else{
	        /**
	         * IE11
	         */
	        if(isIE() && !document.attachEvent){
	        	return false;
	        }
	      }
	    }
	  }
})(jQuery, window, document);