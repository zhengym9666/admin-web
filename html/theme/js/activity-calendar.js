var total = moment().isoWeek();
String.prototype.trim = function () {
	return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
	 };
function getArray(total){
	var array = new Array();
	for(var i=0;i<(total-1);i++){
   		array[i]=(i+1);
	}
return array;
}


for(var i = 0; i < total-1; i++) {
	$('#week-items').prepend('<li>第 <span class="week-number">'+ getArray(total)[i] +'</span> 周</li>');
}
$('#week-items').prepend('<li class="choosed">第 <span id="theweek" class="week-number">'+ moment().isoWeek() +'</span> 周（本周）</li>');

function changeWeek(){
	var week = $(".DeepColor-select-menu li.choosed .week-number").text();
	$("td.isToday").removeClass("isToday");
	for(var i=0;i<7;i++){
		var month = moment().isoWeek(week).isoWeekday(i+1).month()+1;
		var day = moment().isoWeek(week).isoWeekday(i+1).date();
		if(moment().isoWeek() == week && moment().isoWeek(week).isoWeekday() == (i+1)){
			$("td.isToday").removeClass("isToday");
			$(".monthDay").eq(i).html(month+"-"+day+"(今天)").closest("td").addClass("isToday");

		}else{
			$(".monthDay").eq(i).html(month+"-"+day);
		}
	}
}


$('#today').text(moment().format("YYYY-MM-DD"));

/*  dropdown、select打开ul js  */
$('body').click(function(e) {
	var _waitMeTask = $('.DeepColorSelect'); // 设置目标区域
	if(!_waitMeTask.is(e.target) && _waitMeTask.has(e.target).length === 0) {
		$('.DeepColorSelect').removeClass('open');
	} else {
		$('.DeepColorSelect').toggleClass('open');
	}
});
/*  dropdown、select打开ul js end */

/*  DeepColorselect选中改变btn文本 js  */
$(function(){
	var	btnMenuChooseText = $('.DeepColor-select-menu li.choosed').text();
	$('.DeepColor-select-btn p').text(btnMenuChooseText);
	changeWeek();
})

$('.DeepColor-select-menu li').click(function(){
	$('.DeepColor-select-menu li').removeClass('choosed');
	$(this).addClass('choosed');
	var	btnMenuChooseText = $('.DeepColor-select-menu li.choosed').text();
	$('.DeepColor-select-btn p').text(btnMenuChooseText);
	changeWeek();
	resetTable();
	PriorityQuery();
	QueryChannel();
	ChannelQuery();
	QueryArea();
	 AreaQuery();
});
/*  DeepColorselect选中改变btn文本 js end */
//$('.add-activity').on("click", function() {
//	$('.right-alert').fadeIn('fast').animate({
//		marginRight: "0px"
//	},300);
//	$(".right-alert_head_title").text("新建营销活动")
//});
$('.add-activity-in-manage').on("click", function() {
	$('#add-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("新建营销活动")
});
//$('body').on('click', 'button.cancel-btn,button.save-btn', function() {
//	$('.right-alert').animate({
//		marginRight: "-875px",
//	},300).fadeOut();
//	$("body").css("overflow","hidden");
//});
$(function() {
	$(".special-tree").treemenu({
		delay: 300
	}).openActive();
});

$(".special-tree").on('click', 'a', function() {
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
});
$('.form-right').on('click','.form-select-menu li',function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});
//$('.form-right .form-select-btn').click(function(e) {
//	$(this).parent().toggleClass('open');
//});
//$(".form-location-input-more-btn").on("click", function() {
//	$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideToggle("fast");
//})
//$(".form-location-input-tree").each(function() {
//	$(this).find("a").on("click", function() {
//		var text = $(this).text();
//		$(this).parents(".form-LocationInput").find("input").val(text).end().find("span.placeholder").slideUp();
//		$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideUp();
//	})
//})


$('.js-tabs-div').on('click','.left .first-menu.have-child td',function(){
	open_and_hide($(this),'.first-menu','.second-menu');
})
$('.js-tabs-div').on('click','.left .second-menu.have-child td',function(){
	open_and_hide($(this),'.second-menu','.third-menu');
})
$('.js-tabs-div').on('click','.left .third-menu.have-child td',function(){
	open_and_hide($(this),'.third-menu','.four-menu');
})
$('.js-tabs-div').on('click','.left .four-menu.have-child td',function(){
	open_and_hide($(this),'.four-menu','.five-menu');
})

$('.js-tabs-div tbody tr').hover(function(){
	var index = $(this).index();
	var JQ_obj = $(this).parents('.js-tabs-div');
	JQ_obj.find('.left tr').eq(index).addClass('hover-color');
	JQ_obj.find('.right tr').eq(index).addClass('hover-color');
},function(){
	var index = $(this).index();
	var JQ_obj = $(this).parents('.js-tabs-div');
	JQ_obj.find('.left tr').eq(index).removeClass('hover-color');
	JQ_obj.find('.right tr').eq(index).removeClass('hover-color');
})

function open_and_hide(obj,cssName1,cssName2){
	var index = obj.parent().index();
	var JQ_obj = obj.parents('.js-tabs-div').find('.right tr');
	if(obj.parent().hasClass('child-open')){
		obj.parent().removeClass('child-open');
		obj.parent().nextUntil(cssName1).removeClass('child-open').hide()
		JQ_obj.eq(index).nextUntil(cssName1).hide();

	}else{
		obj.parent().addClass('child-open');
		obj.parent().nextUntil(cssName1,cssName2).show();
		JQ_obj.eq(index).nextUntil(cssName1,cssName2).show();
	}
}


//失去焦点时验证input必填、手机号、邮箱代码
$("input.required").blur(function() {
	if($(this).val().trim() === "") {
		$(this).siblings("p.error").remove();
		var top = $(this).height();
		$("<p class='check error' style='padding-left :0;'>这是必填字段</p>").css("top", top).appendTo($(this).parent());
	} else {
		$(this).siblings("p.error").remove();
	}
});

//下拉框点击下拉按钮时验证必选代码
$('.form-right .form-select-btn').click(function() {
	if($(this).children("p").is('.required')&&$(this).children("p.required").text().trim() === "") {
		$(this).children("p.required").siblings("span.error").remove();
		var top = $(this).children("p.required").height();
		$("<span class='check error'>这是必填字段</span>").css("top", top).appendTo($(this));
	} else {
		$(this).children("p.required").siblings("span.error").remove();
	}
	$(this).siblings(".form-select-menu").one('click', 'li', function() {
		$(this).parent().siblings("button").find("span.error").remove();	
	});
});

//地区选择下拉按钮时验证必选代码
$(".form-location-input-more-btn").on("click", function() {
	//
	if($(this).hasClass('form-location-input-more-btn')){
		return;
	}

	if($(this).siblings("input.required").val().trim() === "") {
		$(this).siblings("p.error").remove();
		var top = $(this).siblings("input.required").height();
		$("<p class='check error' style='padding-left :0;'>这是必填字段</p>").css("top", top).appendTo($(this).parent());
	} else {
		$(this).siblings("p.error").remove();
	}
	$(this).parent().siblings(".special-tree").one('click', 'a', function() {
		$(this).parents(".form-LocationInput").find("p.error").remove();	
	});
});

//失焦时检验textarea必填代码
$("textarea.required").blur(function() {
	if($(this).val().trim() === "") {
		$(this).siblings("p.error").remove();
		var top = $(this).height();
		$("<p class='check error' style='padding-left :0;'>这是必填字段</p>").css("top", top).appendTo($(this).parent());
	} else {
		$(this).siblings("p.error").remove();
	}
});


$('body').click(function(e) {
	var _a = $('.form-LocationInput'); // 设置目标区域
	if(!_a.is(e.target) && _a.has(e.target).length === 0) {
		$(".form-location-input-tree").slideUp();
	} else {
		$(this).children(".form-location-input-tree").slideDown();
	}
});