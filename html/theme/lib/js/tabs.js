var btn1 = $('.tabs_menu .js-tabs-btn1');
	btn2 = $('.tabs_menu .js-tabs-btn2');
	btn3 = $('.tabs_menu .js-tabs-btn3');
	btn4 = $('.tabs_menu .js-tabs-btn4');
	btn5 = $('.tabs_menu .js-tabs-btn5');
	btn6 = $('.tabs_menu .js-tabs-btn6');
	btn7 = $('.tabs_menu .js-tabs-btn7');
	div1 = $('.js-tabs-div1');
	div2 = $('.js-tabs-div2');
	div3 = $('.js-tabs-div3');
	div4 = $('.js-tabs-div4');
	div5 = $('.js-tabs-div5');
	div6 = $('.js-tabs-div6');
	div7 = $('.js-tabs-div7');
	

btn1.click(function(){
	$(this).siblings().removeClass('current');
	$('.tabs-wapper').removeClass('open');
	btn1.addClass('current');
	div1.addClass('open');
});

btn2.click(function(){
	$(this).siblings().removeClass('current');
	$('.tabs-wapper').removeClass('open');
	btn2.addClass('current');
	div2.addClass('open');
});

btn3.click(function(){
	$(this).siblings().removeClass('current');
	$('.tabs-wapper').removeClass('open');
	btn3.addClass('current');
	div3.addClass('open');
});

btn4.click(function(){
	$(this).siblings().removeClass('current');
	$('.tabs-wapper').removeClass('open');
	btn4.addClass('current');
	div4.addClass('open');
});

btn5.click(function(){
	$(this).siblings().removeClass('current');
	$('.tabs-wapper').removeClass('open');
	btn5.addClass('current');
	div5.addClass('open');
});

btn6.click(function(){
	$(this).siblings().removeClass('current');
	$('.tabs-wapper').removeClass('open');
	btn6.addClass('current');
	div6.addClass('open');
});

btn7.click(function(){
	$(this).siblings().removeClass('current');
	$('.tabs-wapper').removeClass('open');
	btn7.addClass('current');
	div7.addClass('open');
});

var menu2_btn1 = $('.tabs_menu2 .js-tabs-btn1');
	menu2_btn2 = $('.tabs_menu2 .js-tabs-btn2');
	menu2_btn3 = $('.tabs_menu2 .js-tabs-btn3');
	menu2_btn4 = $('.tabs_menu2 .js-tabs-btn4');
	menu2_btn5 = $('.tabs_menu2 .js-tabs-btn5');
	menu2_btn6 = $('.tabs_menu2 .js-tabs-btn6');
	menu2_btn7 = $('.tabs_menu2 .js-tabs-btn7');
	

menu2_btn1.click(function(){
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
});

menu2_btn2.click(function(){
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
});
menu2_btn3.click(function(){
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
});
menu2_btn4.click(function(){
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
});
menu2_btn5.click(function(){
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
});
menu2_btn6.click(function(){
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
});
menu2_btn7.click(function(){
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
});