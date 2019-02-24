 String.prototype.trim = function () {
return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
 };
$('.moment-btn .add').click(function(){
	$('.set-up-moment').fadeIn();
});

$('body').on('click', 'button.reset', function() {
	$('.top-part').find('input').val("");
	$('.top-part').find('p').html("全部");
	$('#areaNameSearch').val('全部');
	$('#areaIdSearch').val("");
});


//右侧弹窗js
$('body').on('click', '.rightTopBtn button', function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
});

$('body').on('click', '.right-alert-closeBtn,.right-alert-content-main-form-items .pull-right button.cancel,.dialog-input-items .pull-right button.cancel', function() {
	$('.right-alert').animate({
		marginRight: "-875px"
	},300).fadeOut();
	$("body").css("overflow-y", "auto");
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


//失焦时检验textarea必填代码
$("textarea.required").blur(function() {
	if($(this).val() === "") {
		$(this).siblings("p.error").remove();
		var top = $(this).height();
		$("<p class='check error'>这是必填字段</p>").css("top", top).appendTo($(this).parent());
	} else {
		$(this).siblings("p.error").remove();
	}
});

//失去焦点时验证input必填、手机号、邮箱代码
$("input.required").blur(function() {
	if($(this).val() === "") {
		$(this).siblings("p.error").remove();
		var top = $(this).height();
		$("<p class='check error'>这是必填字段</p>").css("top", top).appendTo($(this).parent());
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

$('.checked-box').not('.disabled').click(function(){
	$(this).toggleClass('checked');
});