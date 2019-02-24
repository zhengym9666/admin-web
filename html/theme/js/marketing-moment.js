/* 分页 */
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});


/* 表格中操作栏，开始暂停js */
//$('.tabs_main').on('click','.running .state-btn',function(){
//	$(this).parent('.operation').parent().removeClass('running').addClass('suspend');
//});
//
//$('.tabs_main').on('click','.suspend .state-btn',function(){
//	$(this).parent('.operation').parent().removeClass('suspend').addClass('running');
//});

/* 表格中操作栏，订阅js */
//$('.tabs_main').on('click','.no-subscription .subscription-btn',function(){
//	$(this).parent('.operation').parent().removeClass('no-subscription').addClass('subscription');
//});

//$('.tabs_main').on('click','.subscription .subscription-btn',function(){
//	$(this).parent('.operation').parent().removeClass('subscription').addClass('no-subscription');
//});

$('.input-moment-name button').click(function(){
	var momentClassifyName = $(this).parent().children('input').val();
	$('.J-add-tree').append("<li><span class='tree-third-items no-chirld'>"+ momentClassifyName +"</span><ul><ul/></li>");
	$(".input-moment-name input").attr("value","");
	$('.set-up-moment').hide();
});

// 右侧弹窗js
$('.tabs-wapper').on('click', 'td.name a', function() {
	$('.edit-add-moment').hide();
	$('.look-moment').show();
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("查看事件")
});

$('body').on('click', '.right-alert-closeBtn', function() {
	$('.right-alert').animate({
		marginRight: "-875px"
	},300).fadeOut();
	$("body").css("overflow","auto");
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

$(".rightTopBtn").click(function(){
	$('.look-moment').hide();
	$('.edit-add-moment').show();
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("新增事件")
})

//右键菜单
$(".tabs_sidebar").on("mousedown",".my-define-moment", function(e) {
	if(3 == e.which) {
		var opt = {
			name: "primary"
		}
		var menu = [
			[{
				text: "添加",
				func: function() {
					$(window.parent.document).find(".inner-pop-close-bg").fadeIn();
					$(window.parent.document).find('body').append('<div id="new-type" class="pop-dialog clear-fixed"><div class="pop-dialog-top">新增分类<i class="iconfont icon-close"></i></div><div class="pop-dialog-main"><div class="form-items dialog-input-items clear-fixed" style="overflow:visible"><div class="form-left"><span>分类名称：</span></div><div class="form-right">' +
							'<input onblur="javascript:$(\'.iframepage\')[0].contentWindow.validateKindName()" class="new-type-name required" type="text" id="eventKindName"/>' +
							'<input type="hidden" value="add" id="pageTag">' +
							'<input type="hidden" value='+$(this).find('input').val()+' id="eventKindCode"></div></div><div class="form-items dialog-input-items"><div class="pop-btn-div"><button class="TextBtn cancel">取消</button><button class="TextBtn-import ok">确定</button></div></div></div></div>');
					$(window.parent.document).find('#new-type').fadeIn();
				}
			}]
		];
		$(this).smartMenu(menu,opt);
	}
})

$(".tabs_sidebar").on("mousedown",".my-define-moment + ul .no-chirld", function(e) {
	if(3 == e.which) {
		var opt = {
			name: "third"
		}
		var menu = [
			[{
				text: "修改",
				func: function() {
					$(window.parent.document).find(".inner-pop-close-bg").fadeIn();
					$(window.parent.document).find('body').append('<div id="rename-type" class="pop-dialog clear-fixed"><div class="pop-dialog-top">修改分类<i class="iconfont icon-close"></i></div><div class="pop-dialog-main"><div class="form-items dialog-input-items clear-fixed" style="overflow:visible"><div class="form-left"><span>重命名：</span></div><div class="form-right">' +
							'<input onblur="javascript:$(\'.iframepage\')[0].contentWindow.validateKindName(\''+$(this).text()+'\')" class="new-type-name" type="text required" value='+$(this).text()+' id="eventKindName">' +
							'<input type="hidden" value="modify" id="pageTag">' +
							'<input type="hidden" value='+$(this).find('input').val()+' id="eventKindCode"></div></div><div class="form-items dialog-input-items"><div class="pop-btn-div"><button class="TextBtn cancel">取消</button><button class="TextBtn-import ok">确定</button></div></div></div></div>');
					$(window.parent.document).find('#rename-type').fadeIn();
				}
			}],
			[{
				text: "删除",
				func: function() {
					delEventKind(this);
				}
			}]
		];
		$(this).smartMenu(menu,opt);
	}
});

$(window.parent.document).find('body').on('click','#new-type .ok,#rename-type .ok',function(){
	saveKind();
});
