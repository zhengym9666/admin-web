/* 开关js */
$('.switches').not('.disabled').click(function(){
	$(this).toggleClass('open');
});

$('.radio-btn').not('.disabled').click(function(){
	$('.top-items .radio-btn').not('.disabled').removeClass('checked');
	$(this).addClass('checked');
});

/* 树形菜单  */
$('.tree .tree-secondary-items').click(function(){
	$('.tree .tree-secondary-items').removeClass('checked');
	$(this).addClass('checked');
});

$('.tree').on('click', '.tree-primary-items,.tree-secondary-items', function() {
    $(this).toggleClass('open');
	$(this).siblings('ul').slideToggle('fast');
});

/* tab切换  */
$('.tab-tree-btn-user').click(function(){
	$('.tab-tree-btn-role').removeClass('active');
	$(this).addClass('active');
	$('.role').hide();
	$('.user').show();
});

$('.tab-tree-btn-role').click(function(){
	$('.tab-tree-btn-user').removeClass('active');
	$(this).addClass('active');
	$('.user').hide();
	$('.role').show();
});

/*  添加 js  */
$('.bottom-access-control-right .tree-secondary-items a.add').click(function(){
	var name = $(this).parent().text().replace($(this).text() , '');
		showAccessControl = $('.right-show-access-control');
	showAccessControl.append("<div class='condition-content2 animated3 fadeIn color-2'><span>"+ name +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});

$('.bottom-access-control-right .tree-primary-items a.add').click(function(){
	var name = $(this).parent().text().replace($(this).text() , '');
		showAccessControl = $('.right-show-access-control');
	showAccessControl.append("<div class='condition-content2 animated3 fadeIn color-1'><span>"+ name +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
	return false;
});

$('body').on('click', '.delete-condition2', function() {
    $(this).parent('.condition-content2').remove();
});

$('.bottom-access-control-left .tree-secondary-items a.add').click(function(){
	var name = $(this).parent().text().replace($(this).text() , '');
		showAccessControl = $('.left-show-access-control');
	showAccessControl.append("<div class='condition-content2 animated3 fadeIn color-2'><span>"+ name +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});

$('.bottom-access-control-left .tree-primary-items a.add').click(function(){
	var name = $(this).parent().text().replace($(this).text() , '');
		showAccessControl = $('.left-show-access-control');
	showAccessControl.append("<div class='condition-content2 animated3 fadeIn color-1'><span>"+ name +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
	return false;
});

$('body').on('click', '.delete-condition', function() {
    $(this).parent('.condition-content').remove();
});
