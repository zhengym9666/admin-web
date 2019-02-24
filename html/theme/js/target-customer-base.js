$(function(){
	$(".tree-fourth-items").each(function(){
		var title = $(this).text();
		$(this).attr("title",title);
	});
})
/* 分页插件 */
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});

//checked box
$('.checked-box').not('.disabled,.all-checked-btn').click(function() {
	$(this).toggleClass('checked');
});

$('.js-tabs-div2 .checked-box.all-checked-btn').click(function() {
	if ($('.js-tabs-div2 .checked-box.all-checked-btn').hasClass('checked')) {
		$('.js-tabs-div2 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div2 .all-checked-btn').addClass('checked');
		$('.js-tabs-div2 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

//清单客户群显示新增删除按钮
$('#rule-customer-base ul > li > ul > li').click(function() {
	$('.tabs-wapper .tabs_nav-right').hide();
	$('#inventory-customer-base-div').removeClass('open');
	$('#rule-customer-base-div').addClass('open');
	$(".js-tabs-btn1 a").text("客户群基本信息");
});

//规则客户群隐藏新增删除按钮
$('#inventory-customer-base ul > li > ul > li').click(function() {
	$('.tabs-wapper .tabs_nav-right').show();
	$('#rule-customer-base-div').removeClass('open');
	$('#inventory-customer-base-div').addClass('open');
	$(".js-tabs-btn1 a").text("客户群基本信息");
});

/* 新增规则客户群树形第四级菜单提示tips */
$(function() {
	$('.tree-third-items + ul li span').tipso({
		width: 'auto',
		delay: null,
		position: 'right',
		background: '#4F555D',
		speed: 50
	});
});

$(function() {
	$(".special-tree").treemenu({
		delay: 300,
		openDefault: true
	}).openActive();
});

$(".form-location-input-more-btn").on("click", function() {
	$(".form-location-input-tree").slideToggle();
})

$(".form-location-input-tree").find("a").on("click", function() {
	var text = $(this).text();
	$(".form-LocationInput input").val(text);
	$(".form-LocationInput span.placeholder").slideUp();
	$(".form-location-input-tree").slideUp();
})

$("#sidebar-marketing-label .special-tree").on('click', 'a', function() {
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
	$(".js-tabs-btn1 a").text("营销标签基本信息");
});

// 新增规则客户群条件按钮 或、且、非、左括号、右括号
$('.chart--btn li button').click(function() {
	var btnText = $(this).text();
	$('#new-rule-customer-base .chart-body').append("<div class='condition-content animated3 fadeIn'><button class='condition-btn'>" + btnText + "</button><button class='delete-condition'><i class='iconfont icon-delete'></i></button></div>");
});

// 点击 .delete-condition 删除条件按钮
$('body').on('click', '.delete-condition', function() {
	$(this).parent('.condition-content').remove();
});

// 点击 .delete-btn 清空所有条件 
$('body').on('click', '.delete-btn', function() {
	$('.chart-body').children('.condition-content,.condition-content2').remove();
});

// 点击 .delete-condition2 删除 客户群条件
$('body').on('click', '.delete-condition2', function() {
	$(this).parent('.condition-content2').remove();
});

// 新增规则客户群弹窗
$('.customer-base-btn').on('click', '#newRuleCustomerBase', function() {
	$('#new-rule-customer-base').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$('#new-rule-customer-base .right-alert_head_title').text('新增规则客户群');
});

$('#rule-customer-base-div').on('click', '.customer-base-div-top button.iconTextBtn-import', function() {
	$('#new-rule-customer-base').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$('#new-rule-customer-base .right-alert_head_title').text('管理规则客户群');
});

// 导入清单客户群弹窗


//树形菜单弹窗多选
$('.tree_choose-alert-div_body li.col-1-3').click(function() {
	$(this).children('.checked-box').toggleClass('checked');
});

//新建规则客户群树形菜单弹窗
$('#J-alert-liuliangyunying').click(function() {
	$('#liuliangyunying').fadeIn();
	$(".tree_choose-alert-closebg").fadeIn().one("click", function() {
		$(this).fadeOut();
		$("#liuliangyunying").fadeOut();
	});
	var a = $('#liuliangyunying');
	b = $('#liuliangyunying').height();
	a.css("margin-top", -b / 2 + "px");
});

$('#liuliangyunying .tree_choose-alert-div_close-btn,#liuliangyunying .ok-btn').click(function() {
	$('#liuliangyunying').fadeOut();
	$(".tree_choose-alert-closebg").fadeOut();
});

$('.tree_choose-alert-div li').not('.select-menu li').click(function() {
	$('.tree_choose-alert-div li').removeClass('checked');
	$(this).addClass('checked');
});

$('#liuliangyunying .ok-btn').click(function() {
	var spanText = $('#liuliangyunying .checked span').text();
	$('#new-rule-customer-base .chart-body').append("<div class='condition-content2 animated3 fadeIn'><span>" + spanText + "</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
});

$('#name .ok-btn').click(function() {
	var inputText = $('#name input').val();
	$('#new-rule-customer-base .chart-body').append("<div class='condition-content2 animated3 fadeIn'><span>" + inputText + "</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");
	$('#name input').val("");
});

$('#J-alert-name').click(function() {
	$('#name').fadeIn();
	$(".tree_choose-alert-closebg").fadeIn().one("click", function() {
		$(this).fadeOut();
		$("#name").fadeOut();
	});
	var a = $('#name');
	b = $('#name').height();
	a.css("margin-top", -b / 2 + "px");
});

$('#name .tree_choose-alert-div_close-btn,#name .ok-btn').click(function() {
	$('#name').fadeOut();
	$(".tree_choose-alert-closebg").fadeOut();
});

$('#J-alert-ruwangshijian').click(function() {
	$('#network-time').fadeIn();
	$(".tree_choose-alert-closebg").fadeIn().one("click", function() {
		$(this).fadeOut();
		$("#network-time").fadeOut();
	});
	var a = $('#network-time');
	b = $('#network-time').height();
	a.css("margin-top", -b / 2 + "px");
});

$('#network-time .tree_choose-alert-div_close-btn,#network-time .ok-btn').click(function() {
	$('#network-time').fadeOut();
	$(".tree_choose-alert-closebg").fadeOut();
});

$('.tree_choose-alert-div_body .col-full.btn1').click(function() {
	$('.selet-choose-dete.div2').hide();
	$('.selet-choose-dete.div1').show();
});

$('.tree_choose-alert-div_body .col-full.btn2').click(function() {
	if($(this).hasClass("month")){
		$(".SpanSelect.select2").find(".li-day").hide();
	}else{
		$(".SpanSelect.select2").find(".li-day").show();
	}
	$(".selet-choose-dete.div2 input").val("");
	$(".selet-choose-dete.div2 p").text("");
	$('.selet-choose-dete.div1').hide();
	$('.selet-choose-dete.div2').show();
});
$('#J-alert-city').click(function() {
	$('#city').fadeIn();
	$(".tree_choose-alert-closebg").fadeIn().one("click", function() {
		$(this).fadeOut();
		$("#city").fadeOut();
	});
	var a = $('#city');
	b = $('#city').height();
	a.css("margin-top", -b / 2 + "px");
});

$('#city .tree_choose-alert-div_close-btn,#city .ok-btn').click(function() {
	$('#city').fadeOut();
	$(".tree_choose-alert-closebg").fadeOut();
});

/* 右侧弹窗tab js */
$('#customer-base-control .right-alert-tabs_menu li.nth1').click(function() {
	$('#customer-base-control .right-alert-tabs_menu li').removeClass('current');
	$(this).addClass('current');
	$('#customer-base-control .right-alert_content').children().removeClass('current');
	$('#customer-base-control .right-alert_content').children('#customer-base-control .right-alert-content-main.nth1').addClass('current');
});

$('#customer-base-control .right-alert-tabs_menu li.nth2').click(function() {
	$('#customer-base-control .right-alert-tabs_menu li').removeClass('current');
	$(this).addClass('current');
	$('#customer-base-control .right-alert_content').children().removeClass('current');
	$('#customer-base-control .right-alert_content').children('#customer-base-control .right-alert-content-main.nth2').addClass('current');
});

// 选择框
$('body').click(function(e) {
	var _fastNewBuilt = $('.select1'); // 设置目标区域
	if (!_fastNewBuilt.is(e.target) && _fastNewBuilt.has(e.target).length === 0) {
		$('.select1').removeClass('open');
	} else {
		$('.select1').toggleClass('open');
	}
});

$('body').click(function(e) {
	var _fastNewBuilt = $('.select2'); // 设置目标区域
	if (!_fastNewBuilt.is(e.target) && _fastNewBuilt.has(e.target).length === 0) {
		$('.select2').removeClass('open');
	} else {
		$('.select2').toggleClass('open');
	}
});

$('body').click(function(e) {
	var _fastNewBuilt = $('.select3'); // 设置目标区域
	if (!_fastNewBuilt.is(e.target) && _fastNewBuilt.has(e.target).length === 0) {
		$('.select3').removeClass('open');
	} else {
		$('.select3').toggleClass('open');
	}
});

/*  select选中改变btn文本 js  */

$('.tree_choose-alert-div').on('click', '.select-menu li', function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().parent().children('.select-btn').children('p').text(btnMenuChooseText);
});
$('.tree_choose-alert-div').on('click', '.select-menu.normal li', function() {
	if($(this).hasClass("interval")){
		$(this).parents(".SpanSelect").siblings(".form-right.single").removeClass("show");
		$(this).parents(".SpanSelect").siblings(".form-right.double").addClass("show");
	}else{
		$(this).parents(".SpanSelect").siblings(".form-right.single").addClass("show");
		$(this).parents(".SpanSelect").siblings(".form-right.double").removeClass("show");
	}
});
$('.tree_choose-alert-div').on('click', '.select-menu.special li', function() {
	if($(this).hasClass("interval")){
		$(this).parents(".SpanSelect").siblings(".Input").hide();
		$(this).parents(".SpanSelect").siblings(".doubleInput").show();
	}else{
		$(this).parents(".SpanSelect").siblings(".Input").show();
		$(this).parents(".SpanSelect").siblings(".doubleInput").hide();
	}
});
/*  select选中改变btn文本 js end */

$(".my-customer-tree").on("mousedown", ".tree-secondary-items", function(e) {
	if (3 == e.which) {
		var opt = {
			name: "primary"
		}
		var menu = [
			[{
				text: "添加",
				func: function() {
					$(".pop-close-bg").fadeIn().one("click", function() {
						$(this).fadeOut();
						$(".pop-dialog").fadeOut();
					});
					$("#new-type").fadeIn();
				}
			}]
		];
		$(this).smartMenu(menu, opt);
	}
})
$(".my-customer-tree").on("mousedown", ".tree-third-items", function(e) {
	if (3 == e.which) {
		var opt = {
			name: "third"
		}
		var menu = [
			[{
				text: "修改",
				func: function() {
					$(".pop-close-bg").fadeIn().one("click", function() {
						$(this).fadeOut();
						$(".pop-dialog").fadeOut();
					});
					$("#rename-type").fadeIn();
				}
			}],
			[{
				text: "删除",
				func: function() {
					alert("执行删除代码");
				}
			}]
		];
		$(this).smartMenu(menu, opt);
	}
});
$(".pop-btn").on("click", function() {
	$(".pop-close-bg").fadeIn().one("click", function() {
		$(this).fadeOut();
		$(".pop-dialog").fadeOut();
	});
	$("#new-tel").fadeIn();
});

$(".pop-dialog-top i,button.cancel,button.ok").on("click", function() {
	$(".pop-dialog").fadeOut();
	$(".pop-close-bg").fadeOut();
	$('.select-alert-center-wrapper').fadeOut();
	$(".pop-dialog-top input").val("");
})


// 号码归属地查询
$('#phoneIsWhereBtn').on('click',function(){
	$('#phone-is-where').fadeIn('fast').animate({
		marginRight: '0px'
	},300);
	$('body').css('overflow','hidden');
})
$(".rule-modify-btn").on("click",function(){
	$('#new-rule-customer-base').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$('#new-rule-customer-base .right-alert_head_title').text('修改规则客户群');
})
$(".list-modify-btn").on("click",function(){
	$('#import-inventory-customer-base').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$('#import-inventory-customer-base .right-alert_head_title').text('修改清单客户群');
})
$(".location-select-content li").on("click",function(){
	var classname = $(this).parent().prop("className").split("-")[1];
	$(".tabs-ul").find("."+classname).removeClass("active").text($(this).find("a").text()).next().show().addClass("active");
	$(this).parent().hide().next().show();
})
$(".select-tabs").on("click",function(){
	$(this).siblings().removeClass("active");
	$(this).nextUntil("ul").hide();
	$(this).addClass("active");
	var index = $(this).index();
	$(".location-select-content ul").hide().eq(index).show();
})
$(".location-control-more-btn").on("click",function(){
	$(".location-control-select").slideToggle();
})

