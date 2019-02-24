$('.l2').on('mouseover', function() {
	$('.primary3,.primary4,.primary5,.primary6,.primary7,.primary8,.primary9').hide();
	$('.viewFramework-sidebar2,.primary2').show();
	$('.primary-nav-items').removeClass('open');
	$(this).addClass('open');
});

$('.l3').on('mouseover', function() {
	$('.primary2,.primary4,.primary5,.primary6,.primary7,.primary8,.primary9').hide();
	$('.viewFramework-sidebar2,.primary3').show();
	$('.primary-nav-items').removeClass('open');
	$(this).addClass('open');
});

$('.l4').on('mouseover', function() {
	$('.primary2,.primary3,.primary5,.primary6,.primary7,.primary8,.primary9').hide();
	$('.viewFramework-sidebar2,.primary4').show();
	$('.primary-nav-items').removeClass('open');
	$(this).addClass('open');
});

$('.l5').on('mouseover', function() {
	$('.primary2,.primary4,.primary3,.primary6,.primary7,.primary8,.primary9').hide();
	$('.viewFramework-sidebar2,.primary5').show();
	$('.primary-nav-items').removeClass('open');
	$(this).addClass('open');
});

$('.l6').on('mouseover', function() {
	$('.primary2,.primary4,.primary3,.primary5,.primary7,.primary8,.primary9').hide();
	$('.viewFramework-sidebar2,.primary6').show();
	$('.primary-nav-items').removeClass('open');
	$(this).addClass('open');
});

$('.l7').on('mouseover', function() {
	$('.primary2,.primary4,.primary5,.primary6,.primary3,.primary8,.primary9').hide();
	$('.viewFramework-sidebar2,.primary7').show();
	$('.primary-nav-items').removeClass('open');
	$(this).addClass('open');
});

$('.l8').on('mouseover', function() {
	$('.primary2,.primary4,.primary5,.primary6,.primary7,.primary3,.primary9').hide();
	$('.viewFramework-sidebar2,.primary8').show();
	$('.primary-nav-items').removeClass('open');
	$(this).addClass('open');
});

$('.l9').on('mouseover', function() {
	$('.primary2,.primary4,.primary5,.primary6,.primary7,.primary3,.primary8').hide();
	$('.viewFramework-sidebar2,.primary9').show();
	$('.primary-nav-items').removeClass('open');
	$(this).addClass('open');
});
$(".viewFramework-sidebar2").on("mouseleave", function() {
	$(".primary-nav-items").removeClass("open");
})
$('.l1').click(function() {
	$('.primary-nav-items').removeClass('active');
	$(this).addClass('active');
	$('.iframepage').attr("src", "index.html");
});

$('.l1').on('mouseover', function() {
	$('.viewFramework-sidebar2').hide();
});

$('.header,.iframe-wapper').on('mouseover', function() {
	$('.viewFramework-sidebar2').hide();
});

$('.viewFramework-sidebar2 li').click(function() {
	$('.primary-nav-items').not('.open').removeClass('active');
	$('.primary-nav-items').filter('.open').addClass('active');
	$('.viewFramework-sidebar2 li').removeClass('active');
	$(this).addClass('active');
	var linkAddress = $(this).attr('title');
	$('.iframepage').attr("src", "" + linkAddress + "");
});

/* 左侧边栏隐藏 */
$('.sidebar-fold').click(function() {
	$('body').toggleClass('fold');
});

$(function() {
	/* 左侧边栏隐藏后提示tips */
	$('.nav-icon span').tipso({
		width: 'auto',
		delay: null,
		position: 'right',
		background: '#4F555D',
		speed: 50
	});
});
$(".collect-items-content a").hover(
	function() {
		$(this).find(".delete-collect").show();
	},
	function() {
		$(this).find(".delete-collect").hide();
	}
)
$(".delete-collect").on("click", function() {
	$(this).parent("a").remove();
})

$('body').on('click','#audit-opinion .icon-close,#audit-opinion .cancel',function(){
	$('#audit-opinion').fadeOut().remove();
	$('.inner-pop-close-bg').fadeOut();
});

$('body').on('click','#add-strategy .icon-close,#add-strategy .cancel,#add-strategy .ok',function(){
	$('#add-strategy').fadeOut().remove();
	$('.inner-pop-close-bg').fadeOut();
});

