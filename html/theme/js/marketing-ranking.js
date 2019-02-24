$('.ranking-type a,.time-type a').click(function(){
	$(this).parent().children('a').removeClass('active');
	$(this).addClass('active');
});

$('.js-tabs-div1 .activity').click(function(){
	$('.js-tabs-div1 .table1 thead .th-id').html('活动ID');
	$('.js-tabs-div1 .table1 thead .th-name').html('活动名称');
});

$('.js-tabs-div1 .tactics').click(function(){
	$('.js-tabs-div1 .table1 thead .th-id').html('策略ID');
	$('.js-tabs-div1 .table1 thead .th-name').html('策略名称');
	//$('.js-tabs-div1 .table1').removeClass('active');
	//$('.js-tabs-div1 .table2').addClass('active');
});

$('.js-tabs-div2 .activity').click(function(){
	$('.js-tabs-div2 .table2').removeClass('active');
	$('.js-tabs-div2 .table1').addClass('active');
});

$('.js-tabs-div2 .tactics').click(function(){
	$('.js-tabs-div2 .table1').removeClass('active');
	$('.js-tabs-div2 .table2').addClass('active');
});

$('.js-tabs-div3 .activity').click(function(){
	$('.js-tabs-div3 .table2').removeClass('active');
	$('.js-tabs-div3 .table1').addClass('active');
});

$('.js-tabs-div3 .tactics').click(function(){
	$('.js-tabs-div3 .table1').removeClass('active');
	$('.js-tabs-div3 .table2').addClass('active');
});
/* 分页 */
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});


$('.checked-box').not('.disabled,.all-checked-btn').click(function(){
	$(this).toggleClass('checked');
});

$('.js-tabs-div1 .table1  .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div1 .table1 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div1 .table1 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div1 .table1 .all-checked-btn').addClass('checked');
		$('.js-tabs-div1 .table1 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div1 .table2 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div1 .table2 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div1 .table2 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div1 .table2 .all-checked-btn').addClass('checked');
		$('.js-tabs-div1 .table2 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div2 .table1 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div2 .table1 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div2 .table1 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div2 .table1 .all-checked-btn').addClass('checked');
		$('.js-tabs-div2 .table1 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div2 .table1 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div2 .table2 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div2 .table2 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div2 .table2 .all-checked-btn').addClass('checked');
		$('.js-tabs-div2 .table2 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div3 .table1 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div3 .table1 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div3 .table1 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div3 .table1 .all-checked-btn').addClass('checked');
		$('.js-tabs-div3 .table1 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});

$('.js-tabs-div3 .table2 .checked-box.all-checked-btn').click(function(){
	if ($('.js-tabs-div3 .table2 .checked-box.all-checked-btn').hasClass('checked')){
		$('.js-tabs-div3 .table2 .checked-box').not('.disabled').removeClass('checked');
	} else {
		$('.js-tabs-div3 .table2 .all-checked-btn').addClass('checked');
		$('.js-tabs-div3 .table2 .checked-box').not('.disabled,.all-checked-btn').addClass('checked');
	}
});


$('body').click(function(e) {
    var _dropdownBody = $('.js-tabs-div1 .table1 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody.is(e.target) && _dropdownBody.has(e.target).length === 0) { 
   	 	_dropdownBody.removeClass('open');
    } else {
    		_dropdownBody.toggleClass('open');
    }
    
    var _dropdownBody2 = $('.js-tabs-div1 .table2 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody2.is(e.target) && _dropdownBody2.has(e.target).length === 0) { 
   	 	_dropdownBody2.removeClass('open');
    } else {
    		_dropdownBody2.toggleClass('open');
    }
    
    var _dropdownBody3 = $('.js-tabs-div2 .table1 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody3.is(e.target) && _dropdownBody3.has(e.target).length === 0) { 
   	 	_dropdownBody3.removeClass('open');
    } else {
    		_dropdownBody3.toggleClass('open');
    }
    
    var _dropdownBody4 = $('.js-tabs-div2 .table2 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody4.is(e.target) && _dropdownBody4.has(e.target).length === 0) { 
   	 	_dropdownBody4.removeClass('open');
    } else {
    		_dropdownBody4.toggleClass('open');
    }
    
    var _dropdownBody5 = $('.js-tabs-div3 .table1 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody5.is(e.target) && _dropdownBody5.has(e.target).length === 0) { 
   	 	_dropdownBody5.removeClass('open');
    } else {
    		_dropdownBody5.toggleClass('open');
    }
    
    var _dropdownBody6 = $('.js-tabs-div3 .table2 .dropdown-body '); // 设置目标区域
    if (!_dropdownBody6.is(e.target) && _dropdownBody6.has(e.target).length === 0) { 
   	 	_dropdownBody6.removeClass('open');
    } else {
    		_dropdownBody6.toggleClass('open');
    }
});
