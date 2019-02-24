$('.checked-box').click(function(){
	$(this).toggleClass('checked');
});

/* 分页 */
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});

$('.tabs_main').on('click','.checked-box',function(){
	var Text = $(this).parent().siblings('.nth2').text();
	$('.choosed-show-div-top').append("<div class='condition-content2 animated3 fadeIn'><span>"+ Text +"</span><a class='delete-condition2'><i class='iconfont icon-close'></i></a></div>");	
});

// 点击 .delete-condition2 删除
$('body').on('click', '.delete-condition2', function() {
    $(this).parent('.condition-content2').remove();
});