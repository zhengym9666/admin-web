
/* ��ҳ */
$('.pagination').twbsPagination({
    totalPages: 35,
    visiblePages: 1
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
    return false;
});

/* ����в���������ʼ��ͣjs */
$('.tabs_main').on('click','.running .state-btn',function(){
    $(this).parent('.operation').parent().removeClass('running').addClass('suspend');
});

$('.tabs_main').on('click','.suspend .state-btn',function(){
    $(this).parent('.operation').parent().removeClass('suspend').addClass('running');
});
/* ����в��������������js */
$('.tabs_main').on('click','.no-subscription .subscription-btn',function(){
    $(this).parent('.operation').parent().removeClass('no-subscription').addClass('subscription');
});

$('.tabs_main').on('click','.subscription .subscription-btn',function(){
    $(this).parent('.operation').parent().removeClass('subscription').addClass('no-subscription');
});

// �Ҳ൯��js
$('.tabs-wapper').on('click', 'td.name a', function() {
    $('.right-alert').fadeIn('fast').animate({
        marginRight: "0px"
    },300);
    //$(".right-alert_head_title").text("")
});

$('.input-moment-name button').click(function(){
    var momentClassifyName = $(this).parent().children('input').val();
    $('.J-add-tree').append("<li><span class='tree-third-items no-chirld'>"+ momentClassifyName +"</span><ul><ul/></li>");
    $(".input-moment-name input").attr("value","");
    $('.set-up-moment').hide();
});
//右键菜单
$(".tabs_sidebar").on("mousedown",".tree-primary-items,.have-chirld", function(e) {
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
$(".tabs_sidebar").on("mousedown",".no-chirld", function(e) {
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