$('.strategy-ul').on('click','li div.top div.iconBtn',function(){
	if($(this).hasClass('fold')) {
		$(this).siblings('.input-transparent').hide();
		$(this).parents('li').addClass('edit');
		$(this).removeClass('fold');
		$(this).children('i').removeClass('icon-create').addClass('icon-check');
		$(this).siblings('input').removeAttr("disabled");
	    $(this).parent().siblings('.bottom').slideDown('fast');
	} else {
		$(this).siblings('.input-transparent').show();
		$(this).parents('li').removeClass('edit')
		$(this).addClass('fold');
		$(this).children('i').removeClass('icon-check').addClass('icon-create');
		$(this).siblings('input').attr("disabled",true);
	    $(this).parent().siblings('.bottom').slideUp('fast');
	}
	
	if ($(this).parents('li').siblings('li').hasClass('edit')) {
		var  siblingsLi = $(this).parents('li').siblings('li');
		$(this).parents('li').siblings('li.edit').removeClass('edit');
		$(this).parents('li').siblings('li').children('.bottom').slideUp('fast')
		siblingsLi.children('.top').children('.iconBtn').addClass('fold');
		siblingsLi.children('.top').children('.iconBtn').children('i').removeClass('icon-check').addClass('icon-create');
		siblingsLi.children('.top').children('input').attr("disabled",true);
	}
});

$('.strategy-ul').on('click','li .btn1',function(){
	$('.save-btn').toggle();
	if ($(this).hasClass('modify')) {
		$(this).removeClass('modify').addClass('save');
	} else{
		$(this).removeClass('save').addClass('modify');
	}
});

$('.save-btn').click(function(){
	$('.save-btn').hide();
	$('.btn1.save').removeClass('save').addClass('modify');
});

$('.strategy-ul').on('click','li .btn2',function(){
	$(this).parents('li').remove();
});

$('.strategy-ul li').not('.edit').on('click',function(){
	var inputText = $(this).children('.top').children('input').val();
	$('.strategy-name').text(inputText);
});

//新增策略
$('.add-strategy').click(function() {
	$(window.parent.document).find(".inner-pop-close-bg").fadeIn();
	$(window.parent.document).find('body').append('<div id="add-strategy" class="main-alert main-alert1"><div class="main-alert-content"><div class="main-alert-content-top">新增策略<i class="iconfont icon-close"></i></div><div class="main-alert-content-main"><li class="form-items"><div class="form-left"><span>策略名称：</span></div><div class="form-right"><input type="text" /></div></li><li class="form-items"><div class="form-left"><span>策略描述：</span></div><div class="form-right form-textarea"><textarea></textarea></div></li><li class=" form-items col-full"><div class="form-btns"><div><button type="button" class="TextBtn cancel">取消</button><button type="button" class="TextBtn-import ok">确定</button></div></div></li></div></div></div>');
	$(window.parent.document).find('#add-strategy').fadeIn();
});

$('.select-temp-btn').on('click',function(){
	$(".inner-pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$('#select_temp_pop').fadeOut();
	});
	$('#select_temp_pop').fadeIn();
})
$('.insert-variable-btn').on('click',function(){
	$(".inner-pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$('#insert_variable_pop').fadeOut();
	});
	$('#insert_variable_pop').fadeIn();
})

$('.select-alert-center-wrapper .form-btns .cancel,.select-alert-center-wrapper .form-btns .ok,.pop-dialog-top .icon-close').on('click',function(){
	$('.select-alert-center-wrapper').fadeOut();
	$(".inner-pop-close-bg").fadeOut();
});

$(".open-marketing-moment,.open-product,.open-operation-position,.open-customer-base,.open-city,.open-execution-rules").on("click",function(){
	var srcText = $(this).attr('title');
	$(window.parent.document).find('body').append('<iframe id="popIframe" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe>');
	$(window.parent.document).find('#popIframe').attr("src",srcText).fadeIn()
	$(window.parent.document).find(".inner-pop-close-bg").fadeIn();
});

$('.open-product').click(function(){
	$(window.parent.document).find('#popIframe').css("height","560px");
});
