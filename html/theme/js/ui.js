/* 下拉框的打开和收缩 start  */
$('body').click(function(e) {
	var _allFunction = $('.dropdown-body '); // 设置目标区域(Dropdown 小宽度下拉框)
	if(!_allFunction.is(e.target) && _allFunction.has(e.target).length === 0) {
		$('.dropdown-body').removeClass('open');
	} else {
		$('.dropdown-body').toggleClass('open');
	}

	var _fastNewBuilt = $('.SpanSelect'); // 设置目标区域（Select 大宽度的下拉框）
	if(!_fastNewBuilt.is(e.target) && _fastNewBuilt.has(e.target).length === 0) {
		$('.SpanSelect').removeClass('open');
	} else {
		$('.SpanSelect').toggleClass('open');
	}

	var _waitMeTask = $('.DeepColorSelect'); // 设置目标区域(Select 背景色的下拉框)
	if(!_waitMeTask.is(e.target) && _waitMeTask.has(e.target).length === 0) {
		$('.DeepColorSelect').removeClass('open');
	} else {
		$('.DeepColorSelect').toggleClass('open');
	}
});
/*  dropdown、select打开ul js end */

/*  FormInput 下拉框的打开和收缩  */
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});


/*  select选中改变btn文本 js  */
$('body').on('click','.select-menu li,.DeepColor-select-menu li',function() {  /*  普通下拉框选中值 */
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});

$('.form-right').on('click','.form-select-menu li',function() {		/* 表单下拉框选中值 */
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});
/*  select选中改变btn文本 js end */

/* 分页 */
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});

/* 规则客户群树形第四级菜单提示tips */
$(function() {
	$('.tree-third-items + ul li span').tipso({
		width: 'auto',
		delay: null,
		position: 'right',
		background: '#4F555D',
		speed: 50
	});
});

/* 开关js */
$('.switches').not('.disabled').click(function() {
	$(this).toggleClass('open');
});

/* checkeboxes radiobuttons start */
$('.radio-buttons').not('.disabled').click(function() {
	$(this).parents("tr").siblings().find(".radio-buttons").removeClass('checked');
	$(this).parents("li").siblings().find(".radio-buttons").removeClass('checked');
	$(this).addClass('checked');
});

$('.checked-box').not('.disabled').click(function() {	/* 复选框 */
	$(this).toggleClass('checked');
});

$('.checked-box.all-checked-btn').click(function() {   /*  全选   */
	if($('.checked-box.all-checked-btn').hasClass('checked')) {
		$('.checked-box').not('.disabled').addClass('checked');
	} else {
		$('.checked-box').not('.disabled').removeClass('checked');
	}
});
/* checkeboxes radiobuttons end */

/* Chart  start  */
$('body').on('click', '.delete-condition', function() {
	$(this).parent('.condition-content').remove();
});

$('body').on('click', '.delete-condition2', function() {
	$(this).parent('.condition-content2').remove();
});


//树型右键菜单
$(".tree-menu-rightclick").on("mousedown",".tree-primary-items:not('.unable'),.have-chirld:not('.unable')", function(e) {
	if(3 == e.which) {
		var opt = {
			name: "primary"
		}
		var menu = [
			[{
				text: "添加",
				func: function() {
					alert("添加代码");
				}
			}],
			[{
				text: "修改",
				func: function() {
					alert("修改代码");
				}
			}],
			[{
				text: "删除",
				func: function() {
					$(this).remove();
				}
			}]
		];
		$(this).smartMenu(menu,opt);
	}
})
$(".tree-menu-rightclick").on("mousedown",".no-chirld:not('.unable')", function(e) {
	if(3 == e.which) {
		var opt = {
			name: "third"
		}
		var menu = [
			[{
				text: "修改",
				func: function() {
					alert("修改代码");
				}
			}],
			[{
				text: "删除",
				func: function() {
					$(this).remove();
				}
			}]
		];
		$(this).smartMenu(menu,opt);
	}
})
//树型右键菜单  end


//地区选择输入框
$(".location-input-more-btn").on("click", function() {
	$(".location-input-tree").slideToggle();
});

$(".form-location-input-more-btn").on("click", function() {
	$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideToggle("fast");
});

$(".location-input-tree").find("a").on("click", function() {
	var text = $(this).text();
	$(".LocationInput input").val(text);
	$(".LocationInput span.placeholder").slideUp();
	$(".location-input-tree").slideUp();
})

$(".form-location-input-tree").each(function() {
	$(this).find("a").on("click", function() {
		var text = $(this).text();
		$(this).parents(".form-LocationInput").find("input").val(text).end().find("span.placeholder").slideUp();
		$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideUp();
	})
});

$(function() {
	$(".special-tree").treemenu({
		delay: 300,
		//openDefault: true
	}).openActive();
});

$(".special-tree").on('click', 'a', function() {
	if($(this).hasClass("active")){
		$(this).removeClass("active");
	}else{
		$(this).parents(".special-tree").find("a").removeClass('active');
		$(this).addClass('active');
	}
});

//错误提示js
$(".Input input").blur(function() {
	if($(this).val() === "") {
		$(".error-alert").show();
	} else {
		$(".error-alert").hide();
	}
})

//弹框按钮js
$(".pop-btn").on("click",function(){
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
})


//重置按钮
$(".top-part-btn .cancel").on("click",function(){
	$(".top-part p").each(function(){
		$(this).text("");
	})
	$(".top-part input").val("");
});

$(".inner-pop-btn").on("click",function(){
	$(".inner-pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$(".inner-pop-dialog").fadeOut();
	});
	$(".inner-pop-dialog").fadeIn();
});

$(".pop-dialog-top i,button.cancel,button.ok").on("click",function(){
	$(".inner-pop-dialog").fadeOut();
	$(".inner-pop-close-bg").fadeOut();
});

//地区选择  --start
$(".location-select-content li").on("click",function(){		//一级地区选择
	var classname = $(this).parent().prop("className").split("-")[1];
	$(".tabs-ul").find("."+classname).removeClass("active").text($(this).find("a").text()).next().show().addClass("active");
	$(this).parent().hide().next().show();
})
$(".select-tabs").on("click",function(){     //点击地区tab  返回到点击地区的tab页 后面的tab页隐藏
	$(this).siblings().removeClass("active");
	$(this).nextUntil("ul").hide();
	$(this).addClass("active");
	var index = $(this).index();
	$(".location-select-content ul").hide().eq(index).show();
})
$(".location-control-more-btn").on("click",function(){   //控制地区选择框的显示隐藏
	$(".location-control-select").slideToggle();
})
//地区选择  --end

//中间弹窗  ---start
$('.open-marketing-moment').on('click',function(){		//选择营销时刻弹窗js
	$(".inner-pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$('#choose-marketing-moment.select-alert-center-wrapper').fadeOut();
	});
	$('#choose-marketing-moment.select-alert-center-wrapper').fadeIn();
});
$('#choose-marketing-moment.select-alert-center-wrapper').on('click','.checked-box',function(){
	var Text = $(this).parent().siblings('.nth2').text();
	$('#choose-marketing-moment.select-alert-center-wrapper .choosed-show-div-top .show-wapper').append("<div class='condition-content2 animated3 fadeIn'><span>"+ Text +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});


//选择地区弹窗js
$('.open-city').on('click',function(){	 //选择地市的中间弹窗
	$(".inner-pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$('#choose-city.select-alert-center-wrapper').fadeOut();
	});
	$('#choose-city.select-alert-center-wrapper').fadeIn();
});

$('#choose-city.select-alert-center-wrapper').on('click','.checked-box',function(){
	var Text = $(this).parent().siblings('.nth2').text();
	$('#choose-city.select-alert-center-wrapper .choosed-show-div-top .show-wapper').append("<div class='condition-content2 animated3 fadeIn'><span>"+ Text +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});


//选择产品弹窗js
$('.open-product').on('click',function(){		//选择产品的中间弹窗
	$(".inner-pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$('#choose-product.select-alert-center-wrapper').fadeOut();
	});
	$('#choose-product.select-alert-center-wrapper').fadeIn();
});

$('#choose-product.select-alert-center-wrapper').on('click','.checked-box',function(){
	var Text = $(this).parent().siblings('.nth2').text();
	$('#choose-product.select-alert-center-wrapper .choosed-show-div-top .show-wapper').append("<div class='condition-content2 animated3 fadeIn'><span>"+ Text +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});

//选择营运位弹窗js
$('.open-operation-position').on('click',function(){ 	 //选择运营位的中间弹窗
	$(".inner-pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$('#choose-operation-position.select-alert-center-wrapper').fadeOut();
	});
	$('#choose-operation-position.select-alert-center-wrapper').fadeIn();
});

$('#choose-operation-position.select-alert-center-wrapper').on('click','.radio-buttons',function() {
	var Text = $(this).parent().siblings('.nth2').text();
	$('#choose-operation-position.select-alert-center-wrapper .choosed-show-div-top .show-wapper').append("<div class='condition-content2 animated3 fadeIn'><span>" + Text + "</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});
//中间弹窗  --end

//选择客户群弹窗js
$('.open-customer-base').on('click',function(){
	$(".inner-pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$('#choose-customer-base.select-alert-center-wrapper').fadeOut();
	});
	$('#choose-customer-base.select-alert-center-wrapper').fadeIn();
});

$('#choose-customer-base.select-alert-center-wrapper').on('click','.checked-box',function(){
	var Text = $(this).parent().siblings('.nth2').text();
	$('#choose-customer-base.select-alert-center-wrapper .choosed-show-div-top .show-wapper').append("<div class='condition-content2 animated3 fadeIn'><span>"+ Text +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});

// 点击 .delete-condition2 删除
$('body').on('click', '.select-alert-center-wrapper .delete-condition2', function() {
    $(this).parent('.condition-content2').remove();
});

//关闭弹窗js
$('.form-btns .cancel,.form-btns .ok').on('click',function(){
	$('.select-alert-center-wrapper').fadeOut();
});


// 选择上传文件js
$('.select-file').on('change',function(){
	$('.show-path').html($(this).val());
})

function ConfirmOk(){
	alert("OK!");
}
function ConfirmWarn(){
	alert("Warning!");
}
function operationTipsTrue(Stext,func) {
	var TruePrimaryText = "操作成功";
	var TrueSecondaryText = Stext? Stext : "点击确定按钮返回操作界面";
	$("body").append(
			'<div class="operation-tips operation-tips-true">'
				+'<i class="iconfont icon-close"></i>'
				+'<div class="operation-tips-img">'
					+'<i class="iconfont"></i>'
				+'</div>'
				
				+'<span class="primary-content">'+ TruePrimaryText +'</span>'
				+'<span class="secondary-content">'+ TrueSecondaryText +'</span>'
				
				+'<div class="operation-tips-true-btn">'
					+'<button class="grayTextBtn true-ok">确定</button>'
				+'</div>'
			+'</div>'
	);
	$("body").one("click",".grayTextBtn.true-ok",func);
	$('.operation-tips').fadeIn();
};

function operationTipsFailed(Stext,func) {
	var FailedPrimaryText = "操作失败";
	var FailedSecondaryText = Stext? Stext : "请解决操作失败原因后再重新尝试";
	$("body").append(
			'<div class="operation-tips operation-tips-failed">'
				+'<i class="iconfont icon-close"></i>'
				+'<div class="operation-tips-img">'
					+'<i class="iconfont"></i>'
				+'</div>'
				
				+'<span class="primary-content">'+ FailedPrimaryText +'</span>'
				+'<span class="secondary-content">'+ FailedSecondaryText +'</span>'

				+'<div class="operation-tips-failed-btn">'
					+'<button class="grayTextBtn fail-ok">确定</button>'
				+'</div>'
			+'</div>'
	);
	$("body").one("click",".grayTextBtn.fail-ok",func);
	$('.operation-tips').fadeIn();
};

function operationTipsWarn(Stext,func) {
	var WarnPrimaryText = "您确认要删除吗";
	var WarnSecondaryText = Stext? Stext : "一经删除不可恢复";
	$("body").append(
			'<div class="operation-tips operation-tips-warn">'
				+'<i class="iconfont icon-close"></i>'
				+'<div class="operation-tips-img">'
					+'<i class="iconfont"></i>'
				+'</div>'
				
				+'<span class="primary-content">'+ WarnPrimaryText +'</span>'
				+'<span class="secondary-content">'+ WarnSecondaryText +'</span>'
				
				+'<div class="operation-tips-warn-btn">'
					+'<button class="grayTextBtn">取消</button>'
					+'<button class="TextBtn-import confirm">确定</button>'
				+'</div>'
			+'</div>'
	);
	$("body").one("click",".TextBtn-import.confirm",func);
	$('.operation-tips').fadeIn();
};

$('body').on('click','.operation-tips .icon-close,.operation-tips .grayTextBtn',function(){
	$(this).parents('.operation-tips').fadeOut(function(){
		$(this).remove();
	});
});
