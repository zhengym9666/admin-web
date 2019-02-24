/* 带选择的输入框 */
$('body').click(function(e) {
    var _SelectBtn = $('.select-input-select-btn_icon'); // 设置目标区域
    if (!_SelectBtn.is(e.target) && _SelectBtn.has(e.target).length === 0) { 
   	 	_SelectBtn.removeClass('open');
    } else {
    		_SelectBtn.toggleClass('open');
    }
});

/* 输入框值等于选择的文本 */
$(function(){
	var	btnMenuChooseText = $('.Select-items li.choosed').text();
	$('.Select-input .roleText').val(btnMenuChooseText);
})

/* 选中文本替换输入框文本 */
$('.Select-items li').click(function(){
	$('.Select-items li').removeClass('choosed');
	$(this).addClass('choosed');
	var	btnMenuChooseText = $('.Select-items li.choosed').text();
	$('.Select-input .roleText').val(btnMenuChooseText);
});

/* 快捷操作按钮 */
$('.role-items-top-left + .iconBtn').click(function(){
	$(this).toggleClass('current');
	return false;
});

$('.shortcut-operations li').click(function(){
	$('.role-items-top-left + .iconBtn.current').removeClass('current');
});

/* dropdown */
$('body').click(function(e) {
    var _dropdownBody = $('.js--tab1 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody.is(e.target) && _dropdownBody.has(e.target).length === 0) { 
   	 	_dropdownBody.removeClass('open');
    } else {
    		_dropdownBody.toggleClass('open');
    }
});

/* 表checkedBox */
$('.tab2--sidebar .checked-box,.js--tab1 .checked-box').not('.disabled,.all-checked-btn').click(function(){
	$(this).toggleClass('checked');
});

$('.js--tab1 .checked-box.all-checked-btn').click(function(){
	if ($('.js--tab1 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js--tab1 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js--tab1 .all-checked-btn').addClass('checked');
		$('.js--tab1 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js--tab2 .tab2--sidebar .checked-box.all-checked-btn').click(function(){
	if ($('.js--tab2 .tab2--sidebar .checked-box.all-checked-btn').hasClass('checked')){
		$('.js--tab2 .tab2--sidebar .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js--tab2 .tab2--sidebar .all-checked-btn').addClass('checked');
		$('.js--tab2 .tab2--sidebar .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js--tab3 .checked-box.all-checked-btn').click(function(){
	if ($('.js--tab3 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js--tab3 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js--tab3 .all-checked-btn').addClass('checked');
		$('.js--tab3 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

/* 右侧弹窗tab js */
$('.right-alert-tabs_menu li:first-child').click(function() {
	$('.right-alert-tabs_menu li').removeClass('current');
	$(this).addClass('current');
	$('.right-alert_content').children().removeClass('current');
	$('.right-alert_content').children('.right-alert-content-main.js--tab1').addClass('current');
});

$('.right-alert-tabs_menu li.nth2').click(function() {
	$('.right-alert-tabs_menu li').removeClass('current');
	$(this).addClass('current');
	$('.right-alert_content').children().removeClass('current');
	$('.right-alert_content').children('.right-alert-content-main.js--tab2').addClass('current');
});

$('.right-alert-tabs_menu li.last-child').click(function() {
	$('.right-alert-tabs_menu li').removeClass('current');
	$(this).addClass('current');
	$('.right-alert_content').children().removeClass('current');
	$('.right-alert_content').children('.right-alert-content-main.js--tab3').addClass('current');
});

/* 树形菜单js */
$('.tab2--sidebar .tree-secondary-items a.checkbox').click(function(){
	$(this).parent().toggleClass('checked');
});

$('.tab2--sidebar .tree-primary-items.first-child a.checkbox').click(function(){
	if ($('.tab2--sidebar .tree-primary-items.first-child').hasClass('checked')){
		$('.tree .tree-secondary-items,.tree .tree-primary-items').not('.disabled').removeClass('checked');
	} else {
		$('.tab2--sidebar .tree-primary-items.first-child').addClass('checked');
		$('.tree .tree-secondary-items,.tree .tree-primary-items').not('.disabled,.tab2--sidebar .tree-primary-items.first-child').addClass('checked');
	}
});

$('.tab2--sidebar .tree-primary-items.js-primary-btn a.checkbox').click(function(){
	if ($(this).parent().hasClass('checked')){
		$(this).parent().removeClass('checked');
		$(this).parent().next('.treemenu').children('li').children('.tree-secondary-items').not('.disabled').removeClass('checked');
	} else {
		$(this).parent().addClass('checked');
		$(this).parent().next('.treemenu').children('li').children('.tree-secondary-items').not('.disabled').addClass('checked');
	}
	return false;
});

/* 添加用户弹窗js */
$('.add-user').click(function(){
	$('.main-alert').fadeIn();
});

$('.main-alert-closeBg,.cancel,.ok,.icon-close').click(function(){
	$('.main-alert').fadeOut();
});

/* 二级树形菜单checked js */
$('.tab2--sidebar .tree-secondary-items').click(function(){
	$('.tab2--sidebar .tree-secondary-items').removeClass('checked');
	$(this).addClass('checked');
});

/* 权限添加至右侧 */
$('.tab2--sidebar .tree-secondary-items a.add').click(function(){
	var name = $(this).parent().text().replace($(this).text() , '');
		showAccessControl = $('.right-box-main');
	showAccessControl.append("<div class='condition-content2 animated3 fadeIn color-2'><span>"+ name +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});

$('.tab2--sidebar .tree-primary-items a.add').click(function(){
	var name = $(this).parent().text().replace($(this).text() , '');
		showAccessControl = $('.right-box-main');
	showAccessControl.append("<div class='condition-content2 animated3 fadeIn color-1'><span>"+ name +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
	return false;
});

$('body').on('click', '.delete-condition', function() {
    $(this).parent('.condition-content').remove();
});


$('body').on('click', '.delete-condition2', function() {
    $(this).parent('.condition-content2').remove();
});

$('body').on('click', '.right-box-title .TextBtn', function() {
    $('.right-box-main').children('div').remove();
});

/* 树形菜单js */
$('.tree').on('click', '.tree-primary-items,.tree-secondary-items', function() {
    $(this).toggleClass('open');
	$(this).parent().children('ul').slideToggle('fast');
});

$('.tabs-wapper').on('click', '.js--alert-btn', function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$("body").css("overflow","hidden");
});


$(".pop-btn").on("click",function(){
	$(".pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$(".pop-dialog").fadeOut();
	});
	$(".pop-dialog").fadeIn();
})
$(".pop-dialog-top i,.dialog-input-items button").on("click",function(){
	$(".pop-dialog").fadeOut();
	$(".pop-close-bg").fadeOut();
})
