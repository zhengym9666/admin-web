$('body').click(function(e) {
    var _dropdownBody = $('.js-tabs-div1 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody.is(e.target) && _dropdownBody.has(e.target).length === 0) { 
   	 	_dropdownBody.removeClass('open');
    } else {
    		_dropdownBody.toggleClass('open');
    }
    
    var _dropdownBody2 = $('.js-tabs-div2 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody2.is(e.target) && _dropdownBody2.has(e.target).length === 0) { 
   	 	_dropdownBody2.removeClass('open');
    } else {
    		_dropdownBody2.toggleClass('open');
    }
    
    var _dropdownBody3 = $('.js-tabs-div3 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody3.is(e.target) && _dropdownBody3.has(e.target).length === 0) { 
   	 	_dropdownBody3.removeClass('open');
    } else {
    		_dropdownBody3.toggleClass('open');
    }
    
    var _dropdownBody4 = $('.js-tabs-div4 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody4.is(e.target) && _dropdownBody4.has(e.target).length === 0) { 
   	 	_dropdownBody4.removeClass('open');
    } else {
    		_dropdownBody4.toggleClass('open');
    }
    
    var _dropdownBody5 = $('.js-tabs-div5 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody5.is(e.target) && _dropdownBody5.has(e.target).length === 0) { 
   	 	_dropdownBody5.removeClass('open');
    } else {
    		_dropdownBody5.toggleClass('open');
    }
    
    var _dropdownBody6 = $('.js-tabs-div6 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody6.is(e.target) && _dropdownBody6.has(e.target).length === 0) { 
   	 	_dropdownBody6.removeClass('open');
    } else {
    		_dropdownBody6.toggleClass('open');
    }
    
    var _dropdownBody7 = $('.js-tabs-div7 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody7.is(e.target) && _dropdownBody7.has(e.target).length === 0) { 
   	 	_dropdownBody7.removeClass('open');
    } else {
    		_dropdownBody7.toggleClass('open');
    }
});

/* 分页 */
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});

$('.checked-box').not('.disabled,.all-checked-btn').click(function(){
	$(this).toggleClass('checked');
});

$('.js-tabs-div1 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div1 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div1 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div1 .all-checked-btn').addClass('checked');
		$('.js-tabs-div1 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div2 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div2 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div2 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div2 .all-checked-btn').addClass('checked');
		$('.js-tabs-div2 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div3 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div3 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div3 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div3 .all-checked-btn').addClass('checked');
		$('.js-tabs-div3 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div4 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div4 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div4 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div4 .all-checked-btn').addClass('checked');
		$('.js-tabs-div4 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div5 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div5 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div5 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div5 .all-checked-btn').addClass('checked');
		$('.js-tabs-div5 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div6 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div6 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div6 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div6 .all-checked-btn').addClass('checked');
		$('.js-tabs-div6 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div7 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div7 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div7 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div7 .all-checked-btn').addClass('checked');
		$('.js-tabs-div7 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

/* 右侧弹窗设置 */
$(function() {
	$('.dialog').hDialog({
		box: '#Hbox', //弹框默认选择器
		modalBg: 'rgba(0,0,0,0.5)', //遮罩默认背景颜色
		closeBg: '#cccccc', //弹框关闭按钮默认背景颜色
		width: 883, //弹框默认宽度 
		positions: 'right', //弹框位置(默认center：居中，top：顶部居中，left：顶部居左，bottom：底部居右)
		effect: 'fadeOutRight', //弹框关闭效果(结合animate.css里的动画，默认：zoomOut)
	});

});


/* 右侧弹窗tab js */
$('.right-alert-tabs_menu li:first-child').click(function() {
	$('.right-alert-tabs_menu li').removeClass('current');
	$(this).addClass('current');
	$('.right-alert_content').children().removeClass('current');
	$('.right-alert_content').children('.right-alert-content-main:first-child').addClass('current');
});

$('.right-alert-tabs_menu li:nth-child(2)').click(function() {
	$('.right-alert-tabs_menu li').removeClass('current');
	$(this).addClass('current');
	$('.right-alert_content').children().removeClass('current');
	$('.right-alert_content').children('.right-alert-content-main:nth-child(2)').addClass('current');
});

$('.right-alert-tabs_menu li:last-child').click(function() {
	$('.right-alert-tabs_menu li').removeClass('current');
	$(this).addClass('current');
	$('.right-alert_content').children().removeClass('current');
	$('.right-alert_content').children('.right-alert-content-main:last-child').addClass('current');
});