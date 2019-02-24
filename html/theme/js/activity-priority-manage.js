/**
 * Created by dreamIt on 2016/8/16.
 */

 String.prototype.trim = function () {
return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
 };
//动态修改最后一个table的长度
/*$('.last-table table tfoot tr td').attr('colspan',$('.last-table table th').length);*/

$('.form-right .form-select-btn').click(function(e) {
    $(this).parent().toggleClass('open');
});
$('.form-right').on('click','.form-select-menu li',function() {
    $(this).siblings('li').removeClass('choosed');
    $(this).addClass('choosed');
    var btnMenuChooseText = $(this).text();
    $(this).parent().siblings('button').children('p').text(btnMenuChooseText);
    $(this).parent().siblings('input').val(btnMenuChooseText);
    $(this).parent().parent().removeClass('open');
    return false;
});


//判断hover的值
$('body').on('mouseover','.last-table tbody td',function(){
	if(!$(this).find('button').length == 0){
        $(this).find('.modify').show();
        $(this).find("span").hide();
   }
});

$('body').on('mouseout','.last-table tbody td',function(){

	if(!$(this).find('button').length == 0){

        $(this).find('.modify').hide();
        $(this).find("span").show();

    }

});


$('.last-table tbody').on('click','button.modify',function(){
    $(".inner-pop-close-bg").fadeIn().one("click",function(){
        $(this).fadeOut();
        $('.select-alert-center-wrapper').fadeOut();
    });
    $('.select-alert-center-wrapper').fadeIn();
})
$('.icon-close').click(function(){
    $('.select-alert-center-wrapper').fadeOut();
    $(".inner-pop-close-bg").fadeOut();
})

//两个table统一hover
$('body').on('mouseover mouseout','.tabs_main table:first tbody tr',function(){
    // alert(1)
    var index = $(this).index();
    $(this).toggleClass('haveBg');
    $('#last-table table tbody tr').eq(index).toggleClass('haveBg');
});

$('body').on('mouseover mouseout','#last-table table tbody tr',function(){
    var index = $(this).index();
    $(this).toggleClass('haveBg');
    $('.tabs_main table:first tbody tr').eq(index).toggleClass('haveBg');
});

/*$('.tabs_main table:first tbody tr').hover(function(){
    var index = $(this).index();
    $(this).css('background','#FAFAFA');
    $('#last-table table tbody tr').eq(index).css('background','#FAFAFA');
},function(){
    var index = $(this).index();
    $(this).css('background','#fff');
    $('#last-table table tbody tr').eq(index).css('background','#fff');
})

$('#last-table table tbody tr').hover(function(){
    var index = $(this).index();
    $(this).css('background','#FAFAFA');
    $('.tabs_main table:first tbody tr').eq(index).css('background','#FAFAFA');
},function(){
    var index = $(this).index();
    $(this).css('background','#fff');
    $('.tabs_main table:first tbody tr').eq(index).css('background','#fff');
})*/