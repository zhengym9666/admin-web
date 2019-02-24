 String.prototype.trim = function () {
return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
 };
 
 $(".tabs_main").on("click",".checked-box",function(){
		$(this).toggleClass('checked');
	});

/*  dropdown、select打开ul js end */
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
/*  select选中改变btn文本 js  */
$('body').on('click','.select-menu li,.DeepColor-select-menu li',function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().siblings('input').val(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});

/*$('.form-right').on('click','.form-select-menu li',function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	if(orgFlag=="add"&&btnMenuChooseText=='外部'){
//		$("#org_orgCode").attr("readOnly",false);
//		$("#org_orgCode").attr('placeholder','');
		$("#deleteDiv").html("");
		$("#deleteDiv").html('<input type="text"   id="org_orgCode" placeholder="" name="org_orgCode" />');
	}else if(orgFlag=="add"&&btnMenuChooseText=='营销中心'){
		$("#org_orgCode").attr('placeholder','来源实时中心编码自动生成');
		$("#deleteDiv").html("");
		$("#deleteDiv").html('<input type="text"   id="org_orgCode" placeholder="" name="org_orgCode"  readonly="readonly"/>');

		$("#org_orgCode").attr("readOnly",true);
	}else{
		
		$("#deleteDiv").html("");
		$("#deleteDiv").html('<input type="text"   id="org_orgCode" placeholder="" name="org_orgCode" readonly="readonly"/>');
		$("#org_orgCode").attr('placeholder','');
		$("#org_orgCode").attr("readOnly",true);
	}
	
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().siblings('input').val(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});*/
/*  select选中改变btn文本 js end */
$(function(){
	$('.choosed').each(function(){
		$(this).parent().parent().find('p').html($(this).html());
		$(this).parent().parent().children('input').val($(this).text());
	});
	
});

//重置按钮
$(".js-tabs-div1 .reset").on("click",function(){
	$(".js-tabs-div1 p").each(function(){
		$(this).text("全部");
	})
	$("#sceneStateSearch").attr("val",'');
	$(".js-tabs-div1 input").val("");
});


//重置按钮
$(".js-tabs-div2 .reset").on("click",function(){
	$(".js-tabs-div2 p").each(function(){
		$(this).text("");
	})
	$(".js-tabs-div2 input").val("");
});

$('.checked-box').click(function(){
	if(!$(this).hasClass('disabled')){
		$(this).toggleClass('checked');
		if($(this).is('.checked')){
			$(this).parent().children('input').val("0");
		}else{
			$(this).parent().children('input').val("1");
		}
	}
});
$(".js-tabs-btn2").click(function(){
	$('#addOpBtn').hide();
	var ulHeight = $(".js-tabs-div2 .form-ul").height();
	$(".tabs_sidebar").height(ulHeight + 55);
})
$(".js-tabs-btn1").click(function(){
	$('#addOpBtn').show();
	$(".tabs_sidebar").css("height","100%");
})
$("button.add").click(function(){
	$('#addOpBtn').hide();
	$(".tabs_menu li").removeClass("current");
	$(".tabs_box div").removeClass("open");
	$(".js-tabs-div2").addClass("open");
	$(".js-tabs-btn2").addClass("current");
	var ulHeight = $(".js-tabs-div2 .form-ul").height();
	$(".tabs_sidebar").height(ulHeight + 55);
})
/* 分页 */
$('.js-tabs-div1 .pagination').twbsPagination({
	totalPages: 10,
	visiblePages: 1
});

/* 分页 */
$('.right-alert3 .pagination').twbsPagination({
	totalPages: 10,
	visiblePages: 1
});
//
//$(function(){
//    $(".special-tree").treemenu({delay:300}).openActive();
//});
//
//$(".special-tree").on('click','a',function(){
//	$('.special-tree a').removeClass('active');
//	$(this).addClass('active');
//});

/*$('.js-tabs-div1').on('click','td.operation button.last-child',function(){
	$('.right-alert3').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$("body").css("overflow","hidden");
});*/

 $('.right-alert3').on('click','.form-btns button.cancel',function(){
	 $('.right-alert3').animate({
			marginRight: "-875px",
		},300).fadeOut();
 	$("body").css("overflow","hidden");
 });
 
 $('.right-alert1').on('click','.form-btns button.cancel',function(){
	 $('.right-alert1').animate({
			marginRight: "-875px",
		},300).fadeOut();
 	$("body").css("overflow","hidden");
 });
// $("#role-access-distribution .pop-dialog-top i,#role-access-distribution button.cancel,#role-access-distribution button.ok").on("click",function(){
// 	$("#role-access-distribution.pop-dialog").fadeOut();
// 	$(".pop-close-bg").fadeOut();
// });

function next(obj){
	$(obj).parents('.right-alert-main').find('.form-input-step').css('display','none');
	$(obj).parents('.form-input-step').next('.form-input-step').css('display','block');

	var JQ_obj = $(obj).parents('.right-alert-main').find('.right-alert-tabs_menu li.current');
	JQ_obj.removeClass('current').next('li').addClass('current');
}


//右侧弹窗的三步切换

$('.next').on('click',function(){
	$(this).parents('.right-alert-main').find('.form-input-step').css('display','none');
	$(this).parents('.form-input-step').next('.form-input-step').css('display','block');

	var JQ_obj = $(this).parents('.right-alert-main').find('.right-alert-tabs_menu li.current');
	JQ_obj.removeClass('current').next('li').addClass('current');
})

$('.before').on('click',function(){
	$(this).parents('.right-alert-main').find('.form-input-step').css('display','none');
	$(this).parents('.form-input-step').prev('.form-input-step').css('display','block');

	var JQ_obj = $(this).parents('.right-alert-main').find('.right-alert-tabs_menu li.current');
	JQ_obj.removeClass('current').prev('li').addClass('current');
})

function closeRoleAlert(){
	$('.right-alert3').animate({
		marginRight: "-875px",
	},300).fadeOut();
	$("body").css("overflow","hidden");
}

function openRightAlert(){
	$('.right-alert1 .right-alert-main').css('display','none');
	$('.add-jober').css('display','block');
	$('.right-alert1').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$("body").css("overflow","hidden");
}

function closeRightAlert(){
	$('.right-alert1').animate({
		marginRight: "-875px",
	},300).fadeOut();
	$("body").css("overflow","hidden");
}



$('.tabs_main').on('click','.name',function(){
	$('.right-alert1 .right-alert-main').css('display','none');
	$('.look-th-jober').css('display','block');
	$('.right-alert1').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$("body").css("overflow","hidden");

})

$('.tabs_main').on('click','.edit',function(){
	$('.right-alert1 .right-alert-main').css('display','none');
	$('.add-jober').css('display','block');
	$('.right-alert1').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$("body").css("overflow","hidden");
})


$('.J-return').on('click',function(){
	$('.right-alert1').fadeOut('fast').animate({
		marginRight: "-875px"
	},300);
})

$('.save-btn').on('click',function(){
	$('.right-alert1').animate({
		marginRight: "-875px",
	},300).fadeOut();
	$("body").css("overflow","hidden");
});

function openJobPop(){
	$(".pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$(".pop-dialog").fadeOut();
	});
	$(".pop-dialog").fadeIn();
}

function closeJobPop(){
	$(".pop-dialog").fadeOut();
	$(".pop-close-bg").fadeOut();
	$('.select-alert-center-wrapper').fadeOut();
}

$(".pop-dialog-top i,button.cancel").on("click",function(){
	$(".pop-dialog").fadeOut();
	$(".pop-close-bg").fadeOut();
	$('.select-alert-center-wrapper').fadeOut();
});

//失去焦点时验证input必填、手机号、邮箱代码
$("input.required").blur(function() {
	if($(this).val().trim() === "") {
		$(this).siblings("p.error").remove();
		var top = $(this).height();
		$("<p class='check error'>这是必填字段</p>").css("top", top).appendTo($(this).parent());
	} else {
		$(this).siblings("p.error").remove();
	}
});

//下拉框点击下拉按钮时验证必选代码
$('.form-right .form-select-btn').click(function() {
	if($(this).children("p").is('.required')&&$(this).children("p.required").text() === "") {
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

$("input.tel").blur(function() {
	if($(this).val() !== ""){
		if( /^[\d]{11}$/.test($(this).val())) {
			$(this).siblings("p.error").remove();
		} else {
			$(this).siblings("p.error").remove();
			var top = $(this).height();
			$("<p class='check error'>请输入正确的号码</p>").css("top", top).appendTo($(this).parent());
		}
	}else{
		$(this).siblings("p.error").remove();
	}
});

/*$("input.email").blur(function() {
	if($(this).val() !== ""){
		if(/^[A-z_0-9\.]+@[\w]+\.[a-z]+$/.test($(this).val())) {
			$(this).siblings("p.error").remove();
		} else {
			$(this).siblings("p.error").remove();
			var top = $(this).height();
			$("<p class='check error'>请输入正确的邮箱</p>").css("top", top).appendTo($(this).parent());
		}
	}else{
		$(this).siblings("p.error").remove();
	}
});*/


$('body').click(function(e) {
	var _a = $('.form-LocationInput'); // 设置目标区域
	if(!_a.is(e.target) && _a.has(e.target).length === 0) {
		$(".form-location-input-tree").slideUp();
	} else {
		$(this).children(".form-location-input-tree").slideDown();
	}
});