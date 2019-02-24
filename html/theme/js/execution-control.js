$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});


$(".pop-dialog-top i,button.cancel,button.ok").on("click",function(){
	$(".select-alert-center-wrapper").fadeOut();
	$(".inner-pop-close-bg").fadeOut();
});

$(".top-part-btn .reset").on("click",function(){
	$(this).parents(".top-part").find("p").not(".static").each(function(){
		$(this).text("");
	})
	$(this).parents(".top-part").find("input").val("");
})
$('.radio-buttons').not('.disabled').click(function() {
	$('.table-wrapper .radio-buttons').not('.disabled').removeClass('checked');
	$(this).addClass('checked');
});
$(".initial-btn").on("click",function(){
	$(".pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$(".pop-dialog").fadeOut();
	});
	$(".pop-dialog").fadeIn();
});

$(".pop-dialog-top i,button.cancel,button.ok").on("click",function(){
	$(".pop-dialog").fadeOut();
	$(".pop-close-bg").fadeOut();
	$('.select-alert-center-wrapper').fadeOut();
});

$(".control-btn").on("click",function(){
	$(this).toggleClass("change");
	$(this).siblings("input").val("").toggle();
});

$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
$('.form-right').on('click','.form-select-menu li',function() {		/* ±íµ¥ÏÂÀ­¿òÑ¡ÖÐÖµ */
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});

// ÓÒ²àµ¯´°js
$('.js-tabs-div1').on('click', 'td.name a', function() {
	$('.right-alert3').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	//$(".right-alert_head_title").text("")
});
$('.js-tabs-div2').on('click', 'td.name a', function() {
	$('.right-alert2').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	//$(".right-alert_head_title").text("")
});

$('.js-tabs-div3').on('click','td.name a',function(){
	$('.right-alert1').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
})
/* ¿ª¹Øjs */
$('.switches').click(function() {
	if(!$(this).hasClass('disabled')){
		$(this).toggleClass('open');
		if($(this).hasClass('open')){
			$(this).parents('.switches-wrapper').siblings('.switches-hidden').slideDown('fast');
			$(this).parent().next().find('.no-control').hide();
			$(this).parent().next().find('.count-g').show();
			$(this).parent().next().find('button').removeClass('disabled');
		}else{
			$(this).parents('.switches-wrapper').siblings('.switches-hidden').slideUp('fast');
			$(this).parent().next().find('.no-control').show();
			// ³õÊ¼»¯
			$(this).parent().next().find('.count-g .green').text(0);
			$(this).parents('.switches-wrapper').siblings('.switches-hidden').find('.input').val(null);
			$(this).parent().next().find('.count-g').hide();
			$(this).parent().next().find('button').addClass('disabled');
		}
	}

});

$('.setBtn').on('click',function(){
	if(!$(this).hasClass('disabled')){
		$(this).parents('.switches-wrapper').siblings('.switches-hidden').slideToggle('fast');
		//$(this).parents('.switches-wrapper').siblings('.switches-hidden').attr("style","");
	}
})


$('.checked-box').not('.disabled').click(function() {
	$(this).toggleClass('checked');
	var length = $(this).parents('.switches-bottom').find('.checked-box.checked').length;
	$(this).parents('.switches-bottom').prev('.switches-top').find('p.only-show .green').text(length);
});


$('.input').on('keyup',function(){
	var val = $(this).val();
	if(/^[1-9]\d*$/.test(val)){
		$(this).parent().prev().find('.green').text(val);
	}
	else if( val==''){
		$(this).parent().prev().find('.green').text(0);
	}
	else{
		$(this).val("");
	}

})

$('.J-add').on('click',function(){
	var JQ_obj = $(this).prev().clone(true);
	JQ_obj.find('.Wdate').val(null);
	JQ_obj.insertBefore(this);
})
$('.right-alert_content').on('click','.delete',function(){
	$(this).parent().remove();
});

$('body').click(function(e) {
	var _inputDate = $('input.Wdate'); 
	var _chooseTime = $(this).siblings('.choose-time');
	if(!_inputDate.is(e.target) && _inputDate.has(e.target).length === 0) {
		if (!_chooseTime.is(e.target) && _chooseTime.has(e.target).length === 0) {
			$('body').find('.choose-time').remove();
		}
	}
});

// 添加选择时间样式
$('body').on('click','.start-stop-date input.Wdate',function(){
	$(this).parents(".start-end-time").css("overflow","visible");
	$(this).siblings('.choose-time').remove();
	var timeStrArray = new Array("00:00:00","00:30:00","01:00:00","01:30:00","02:00:00","02:30:00","03:00:00","03:30:00","04:00:00","04:30:00","05:00:00","05:30:00","06:00:00","06:30:00","07:00:00","07:30:00","08:00:00","08:30:00","09:00:00",
			"09:30:00","10:00:00","10:30:00","11:00:00","11:30:00","12:00:00","12:30:00","13:00:00","13:30:00","14:00:00","14:30:00","15:00:00","15:30:00",
			"16:00:00","16:30:00","17:00:00","17:30:00","18:00:00","18:30:00","19:00:00","19:30:00","20:00:00","20:30:00","21:00:00","21:30:00","22:00:00",
			"22:30:00","23:00:00","23:30:00","24:00:00");
	
	if($(this).parent().hasClass('over-date')){
		var choosedIndex = 0;
		var startDateStr = $(this).parent().parent().find('.start-date').find('input.Wdate').val();
		if(startDateStr.length > 0){
			$.each(timeStrArray,function(i,item){
				if(item == startDateStr){
					choosedIndex = i;
					return;
				}
			});
		}
		
		var htmlStr = '<div class="choose-time"><ul>';
		for(var i = choosedIndex+1;i<timeStrArray.length;i++){
			htmlStr+='<li>'+timeStrArray[i]+'</li>';
		}
		htmlStr+='</ul></div>';
	}else if($(this).parent().hasClass('start-date')){
		var choosedIndex = 48;
		var overDateStr = $(this).parent().parent().find('.over-date').find('input.Wdate').val();
		if(overDateStr.length > 0){
			$.each(timeStrArray,function(i,item){
				if(item == overDateStr){
					choosedIndex = i;
					return;
				}
			});
		}
		var htmlStr = '<div class="choose-time"><ul>';
		for(var i = 0;i<choosedIndex;i++){
			htmlStr+='<li>'+timeStrArray[i]+'</li>';
		}
		htmlStr+='</ul></div>';
	}
	$(this).parent().append(htmlStr);
});

// 选中时间后移除choose-time
$('body').on('click','.choose-time li',function(e){
	var timeLi = $(this).html();
	$(this).parents('.choose-time').siblings('input').val(timeLi);
	$('.choose-time').remove();
});
