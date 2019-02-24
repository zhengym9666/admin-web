$('.primary-tr').click(function() {
	if($(this).hasClass('open')) {
		$(this).removeClass('open');
		$(this).nextUntil('.primary-tr',"tr").removeClass("open").hide();
	} else {
		$(this).addClass('open');
		$(this).nextUntil('.primary-tr', '.second-tr').show();
	}
});
$(".second-tr.has-child").click(function(){
	if($(this).hasClass('open')) {
		$(this).removeClass('open');
		$(this).nextUntil('.second-tr',".third-tr,.fourth-tr,.fifth-tr,.sixth-tr").removeClass("open").hide();
	} else {
		$(this).addClass('open');
		$(this).nextUntil('.second-tr', '.third-tr').show();
	}
});
$(".third-tr.has-child").click(function(){
	if($(this).hasClass('open')) {
		$(this).removeClass('open');
		$(this).nextUntil('.third-tr',".fourth-tr,.fifth-tr,.sixth-tr").removeClass("open").hide();
	} else {
		$(this).addClass('open');
		$(this).nextUntil('.third-tr', '.fourth-tr').show();
	}
});
$(".fourth-tr.has-child").click(function(){
	if($(this).hasClass('open')) {
		$(this).removeClass('open');
		$(this).nextUntil('.fourth-tr',".fifth-tr,.sixth-tr").removeClass("open").hide();
	} else {
		$(this).addClass('open');
		$(this).nextUntil('.fourth-tr', '.fifth-tr').show();
	}
});
$(".fifth-tr.has-child").click(function(){
	if($(this).hasClass('open')) {
		$(this).removeClass('open');
		$(this).nextUntil('.fifth-tr',".sixth-tr").removeClass("open").hide();
	} else {
		$(this).addClass('open');
		$(this).nextUntil('.fifth-tr','.sixth-tr').show();
	}
});


$('body').on('click', '.no-child.open td', function() {
	$(this).not('.first-child,.second-child,.third-child,.disabled').toggleClass('checked');
});

$('body').on('click', '.TextBtn-import.configuration', function() {
	$('.no-child').addClass('open');
	$(this).removeClass('configuration').addClass('save-configuration');
});

$('body').on('click', '.TextBtn-import.save-configuration', function() {
	$('.no-child').removeClass('open');
	$(this).removeClass('save-configuration').addClass('configuration');
});
