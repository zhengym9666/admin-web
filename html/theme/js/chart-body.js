/*
$('.chart--btn li button').click(function(){
	var btnText = $(this).text();
	$('.chart-body').append("<div class='condition-content animated3 fadeIn'><button class='condition-btn'>"+ btnText +"</button><button class='delete-condition'><i class='iconfont icon-delete'></i></button></div>");
});
*/
$('#liuliangyunying .ok-btn').click(function(){
	var spanText = $('#liuliangyunying .checked span').text();
	$('.chart-body').append("<div class='condition-content2 animated3 fadeIn color-blue'><span>"+ spanText +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");	
});

$('#name .ok-btn').click(function(){
	var inputText = $('#name input').val();
	$('.chart-body').append("<div class='condition-content2 animated3 fadeIn color-purple'><span>"+ inputText +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");	
});


$('body').on('click', '.delete-condition', function() {
    $(this).parent('.condition-content').remove();
});

$('.tree_choose-alrte-div li').click(function(){
	$('.tree_choose-alrte-div li').removeClass('checked');
	$(this).addClass('checked');
});

$('.js-alert-liuliangyunying').click(function(){
	$('#liuliangyunying').fadeIn();
});

$('#liuliangyunying .tree_choose-alrte-div_close-btn,#liuliangyunying .ok-btn').click(function(){
	$('#liuliangyunying').fadeOut();
});



$('body').on('click', '.delete-condition2', function() {
    $(this).parent('.condition-content2').remove();
});

$('#name-btn').click(function(){
	$('#name').fadeIn();
});

$('#name .tree_choose-alrte-div_close-btn,#name .ok-btn').click(function(){
	$('#name').fadeOut();
});

$('.js-tabs-div2 .tabs_nav .tabs_nav-left button').click(function(){
	var name = $('.js-tabs-div2 .tabs_nav .tabs_nav-left input').val();
		tableTbody = $('.tabs_body-right-finish table tbody');
	tableTbody.append("<tr><th>"+ name +"</th><th class='operation'><button>修改</button> <button>估算</button> <button class='dlt last-child'>删除</button></th></tr>");
});
