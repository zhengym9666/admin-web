/*  dropdown、select打开ul js  */
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
/*  dropdown、select打开ul js end */

/*  select选中改变btn文本 js  */
$('.form-select-menu li').click(function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
});
/*  select选中改变btn文本 js end */

// 右侧弹窗js 成本目标
$('.tabs_body').on('click', 'td.operation button:first-child', function() {
	$('#target .right-alert-content-main').removeClass('current');
	$('#J-add-edit-target').addClass('current');
	$('#target.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$('#target .right-alert_head_title').text('管理成本目标');
});
$('.tabs_body').on('click', 'td.name a', function() {
	$('#target .right-alert-content-main').removeClass('current');
	$('#J-look-target').addClass('current');
	$('#target.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$('#target .right-alert_head_title').text('成本目标信息');
});

// 右侧弹窗js 成本目标
$('.tabs_body').on('click', 'td.operation .distribution-btn', function() {
	$('#distribution.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
});

// 右侧弹窗js 成本分配
$('.rightTopBtn').click(function(e) {

	$('#target .right-alert-content-main').removeClass('current');
	$('#J-add-edit-target').addClass('current');

	$('#target.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$('#target .right-alert_head_title').text('新增成本目标');
	return false;
});

// 右侧弹窗js 关闭js


$('button.cancel').on('click',function(){
	$('.right-alert').animate({
		marginRight: '-875px'
	},300).fadeOut();

	$("body").css("overflow","hidden");
})


/* 分页 */
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});

// 新增成本科目
$('.add-cost-subject .pull-right').click(function() {
	$('.add-cost-subject').prepend('<ul class="col-full pull-left"><li class="form-items"><div class="form-left"><span><i class="iconfont icon-bitian"></i>成本科目名称：</span></div><div class="form-right"><input type="text" /></div></li><li class="form-items"><div class="form-left"><span><i class="iconfont icon-bitian"></i>成本科目金额（元）：</span></div><div class="form-right"><input type="text" /></div></li><a class="delete" title="删除整行"><i class="iconfont icon-delete"></i></a></ul>');
});

// 新增分配
$('.add-distribution .pull-right').click(function() {
	$(this).parent().prepend('<ul class="pull-left col-full"><li class="form-items"><div class="form-left"><span>分配名称：</span></div><div class="form-right"><input type="text" /></div></li><li class="form-items"><div class="form-left"><span>分配金额(元)：</span></div><div class="form-right"><input type="text" /></div></li><li class="form-items"><div class="form-left"><span>自定义</span></div><div class="form-right"><div class="form-LocationInput"><div><input type="text" autocomplete="off" disabled="disabled" /><button class="form-location-input-more-btn"><i class="iconfont icon-expandmore"></i></button></div><ul class="special-tree form-location-input-tree"><li><a>Category</a><ul><li><a>jQuery</a><ul><li><a>jQuery</a></li><li><a>jQuery UI</a></li><li><a>jQuery Mobile</a></li></ul></li><li><a>JavaScript</a><ul><li><a>AngularJS</a></li><li><a>React</a></li><li><a>Backbone</a></li></ul></li><li><a>Golang</a></li></ul></li><li><a>About</a><ul><li><a>Contact</a></li><li><a>Blog</a></li><li><a>Jobs</a><ul><li><a>Job 1</a></li><li><a>Job 2</a></li><li><a>Job 3</a></li></ul></li></ul></li></ul></div></div></li><li class="form-items"><div class="form-left"><span>地区：</span></div><div class="form-right"><input type="text" disabled="disabled" /></div></li><a class="delete" title="删除整行"><i class="iconfont icon-delete"></i></a></ul>');
	$('.add-distribution ul.special-tree').treemenu({
		delay: 300
	}).openActive();
});

// 新增分配树形菜单
$(".add-distribution").on("click",".form-location-input-more-btn", function() {
	$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideToggle("fast");
});

// 新增分配树形菜单点击事件
$(".add-distribution").on("click",".form-location-input-tree a", function() {
	var text = $(this).text();
	$(this).parents(".form-LocationInput").find("input").val(text).end().find("span.placeholder").slideUp();
	$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideUp();
});

$(".add-distribution").on("click",".form-location-input-tree a", function() {
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
});

// 新增成本科目，新增分配中删除事件
$('.add-cost-subject,.add-distribution').on('click','a.delete', function() {
	$(this).parent().remove();
});

//重置按钮
$(".top-part-btn .reset").on("click",function(){
	$(".top-part p").each(function(){
		$(this).text($(this).data("placeholder"));
	})
	$(".top-part input").val("");
})