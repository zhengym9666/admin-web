$(".top-part-btn .reset").on("click", function() {
	$(".top-part p").each(function() {
		$(this).text("");
	})
	$(".top-part input").val("");
})
$('.viewFramework-index-body').on('click', '.edit-btn', function() {
	$('.right-alert-content-main').removeClass('current');
	$('#J-add-edit-warning').addClass('current');
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$(".right-alert_head_title").text("管理成本预警")
});
$(".rightTopBtn").click(function() {
	$('.right-alert-content-main').removeClass('current');
	$('#J-add-edit-warning').addClass('current');
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$(".right-alert_head_title").text("新增成本预警")
})
$('.viewFramework-index-body').on('click','td.name a',function(){
	$('.right-alert-content-main').removeClass('current');
	$('#J-look-warning').addClass('current');
	if($(this).html()=='成本目标'){
		$('.is-show').show();
	}else{
		$('.is-show').hide();
	}
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	$(".right-alert_head_title").text("成本预警信息")
})
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
$('.form-right').on('click', '.form-select-menu li', function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	if($(this).parent("ul").attr("id") == "warning_type") {
		if($(this).hasClass("nth1")) {
			$(".toggle-row").show();
		} else {
			$(".toggle-row").hide();
		}
	}else if($(this).parent("ul").attr("id") == "sum_type"){
		if($(this).hasClass("nth1")) {
			$("#sum_btn").text("0");
		}else{
			$("#sum_btn").text("请选择");
		}
	}
});
$('button.cancel').on('click', function() {
	$('.right-alert').animate({
		marginRight: "-875px",
	}, 300).fadeOut();
	$("body").css("overflow", "hidden");
});
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});
$("#warning_code_btn").on("click", function() {
	if($("#warning_type li.choosed").hasClass("nth1")) {
		$(".inner-pop-close-bg").fadeIn().one("click", function() {
			$(this).fadeOut();
			$("#cost_target_pop").fadeOut();
		});
		$("#cost_target_pop").fadeIn();
	} else if($("#warning_type li.choosed").hasClass("nth2")) {
		$(".inner-pop-close-bg").fadeIn().one("click", function() {
			$(this).fadeOut();
			$("#cost_distr_pop").fadeOut();
		});
		$("#cost_distr_pop").fadeIn();
	} else if($("#warning_type li.choosed").hasClass("nth3")){
		$(".inner-pop-close-bg").fadeIn().one("click", function() {
			$(this).fadeOut();
			$("#cost_apply_pop").fadeOut();
		});
		$("#cost_apply_pop").fadeIn();
	}
});
$("#sum_btn").on("click", function() {
	if($("#sum_type li.choosed").hasClass("nth2")) {
		$(".inner-pop-close-bg").fadeIn().one("click", function() {
			$(this).fadeOut();
			$("#cost_subject_sum").fadeOut();
		});
		$("#cost_subject_sum").fadeIn();
	}
})
$(".inner-pop-dialog .pop-dialog-top i,.inner-pop-dialog .dialog-input-items button").on("click", function() {
	$(".inner-pop-dialog").fadeOut();
	$(".inner-pop-close-bg").fadeOut();
})