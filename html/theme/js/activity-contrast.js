function hidd() {
	$('.primary-tr.nth2').nextUntil('.primary-tr', '.second-tr').hide();
	$('.primary-tr.nth3').nextUntil('.primary-tr', '.second-tr,.third-tr').removeClass("open").hide();
	$(".special-tree").treemenu({
		delay: 300
	}).openActive();
	$(".second-tr.nth4").nextUntil(".second-tr.view-more",".second-tr").addClass("hidden");
}
$(function(){
	hidd();
})
$(".special-tree").on('click', 'a', function() {
	$('.special-tree a').removeClass('active');
	$(this).addClass('active');
});
$(".location-input-more-btn").on("click", function() {
	$(".location-input-tree").slideToggle();
})
$(".location-input-tree").find("a").on("click", function() {
	var text = $(this).text();
	$(".LocationInput input").val(text);
	$(".LocationInput span.placeholder").slideUp();
	$(".location-input-tree").slideUp();
})
//$('.primary-tr').not(".nth3").click(function() {
//	if($(this).hasClass('open')) {
//		$(this).removeClass('open');
//		$(this).nextUntil('.primary-tr', '.second-tr').hide();
//		$(".second-tr.nth4").nextUntil(".second-tr.view-more",".second-tr").addClass("hidden");
//	} else {
//		$(this).addClass('open');
//		$(this).nextUntil('.primary-tr', '.second-tr:not(".hidden")').show();
//		if($(this).hasClass("nth2")){
//			$(".view-more").show();
//		}
//	}
//});

//$('.primary-tr.nth3').click(function() {
//	if($(this).hasClass('open')) {
//		$(this).removeClass('open');
//		$(this).nextUntil('.primary-tr', '.second-tr,.third-tr,.fourth-tr').removeClass("open").hide();
//	} else {
//		$(this).addClass('open');
//		$(this).nextUntil('.primary-tr', '.second-tr').show();
//	}
//});
$(".has-third").click(function() {
	if($(this).hasClass("open")) {
		$(this).removeClass("open");
		$(this).nextUntil(".second-tr", ".third-tr").removeClass("open").hide();
		$(this).nextUntil(".second-tr", ".fourth-tr").hide();
	} else {
		$(this).addClass('open');
		$(this).nextUntil('.second-tr', '.third-tr').show();
	}
})
$(".has-fourth").click(function() {
	if($(this).hasClass("open")) {
		$(this).removeClass("open");
		$(this).nextUntil(".third-tr", ".fourth-tr").hide();
	} else {
		$(this).addClass('open');
		$(this).nextUntil(".third-tr", ".fourth-tr").show();
	}
})
$("tbody .has-radios").click(function() {
	if($(this).find(".radio-buttons").hasClass("checked")) {
		$(this).find(".radio-buttons").removeClass("checked");
	} else {
		var col = $(this).index();
		$(this).parent().nextUntil(".primary-tr").each(function() {
			$(this).children().eq(col).find(".checked").removeClass("checked");
		});
		$(this).parent().prevUntil(".primary-tr").each(function() {
			$(this).children().eq(col).find(".checked").removeClass("checked");
		});
		$(this).find(".radio-buttons").addClass("checked");
	}
})
$(".location-control-more-btn").on("click", function() {
	$(".location-control-select").slideToggle();
})
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});

$(".location-select-content li").on("click", function() {
	var _index = $(".location-select li").index($(".location-select li.choosed"));
	var index = _index - 1;
	if($(".location-select-content ul").index($(this).parent("ul")) == index) {
		var text = "";
		$(".select-tabs:lt(" + index + ")").each(function() {
			text += $(this).text()+" ";
		});
		text += $(this).find("a").text();
		$(".placeholder.loca").text(text);
		$(".location-control-select").hide();
	} else {
		var classname = $(this).parent().prop("className").split("-")[1];
		$(".tabs-ul").find("." + classname).removeClass("active").text($(this).find("a").text()).next().text("请选择...").show().addClass("active");
		$(this).parent().hide().next().show();
	}

})
$(".select-tabs").on("click", function() {
	$(this).siblings().removeClass("active");
	$(this).nextUntil("ul").hide();
	$(this).addClass("active").text("请选择");
	var index = $(this).index();
	$(".location-select-content ul").hide().eq(index).show();
})
$(".location-select li").on("click", function() {
	if($(".location-select li").index($(this)) == 0) {
		$(".location-control").hide();
	} else {
		$(".location-control").show();
		$(".placeholder.loca").text("请选择");
		$(".location-control-more-btn").show();
	}
	$(".location-select-content ul:gt(0)").hide();
	$(".location-select-content ul").eq(0).show();
	$(".select-tabs:gt(0)").hide();
	$(".select-tabs").eq(0).text("市");
});
$('.form-right').on('click', '.form-select-menu li', function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});

$(".time-select .form-select-menu li").on("click", function() {
	var index = $(".time-select .form-select-menu li").index($(this));
	switch(index) {
		case 0:
			$(".Wdate").val("");
			$(".chooseDay-input").hide();
			$(".season-select").hide();
			break;
		case 1:
			$(".Wdate").val("");
			$(".season-select").hide();
			$(".time-control").find(".Wdate").off("focus").on("focus", function(){
				WdatePicker({ dateFmt: 'yyyy',skin:'twoer',onpicked:function(){
					$(".select-input-search-btn").focus();
				}});
			});
			$(".chooseDay-input").show();
			break;
		case 2:
			$(".Wdate").val("");
			$(".time-control").find(".Wdate").off("focus").on("focus", function(){
				WdatePicker({ dateFmt: 'yyyy',skin:'twoer',onpicked:function(){
					$(".select-input-search-btn").focus();
				}});
			});
			$(".chooseDay-input").show();
			$(".season-select").show();
			break;
		case 3:
			$(".Wdate").val("");
			$(".season-select").hide();
			$(".time-control").find(".Wdate").off("focus").on("focus", function(){
				WdatePicker({ dateFmt: 'yyyy-MM',skin:'twoer',onpicked:function(){
					$(".select-input-search-btn").focus();
				}});
			});
			$(".chooseDay-input").show();
			break;
		case 4:
			$(".Wdate").val("");
			$(".season-select").hide();
			$(".time-control").find(".Wdate").off("focus").on("focus", function(){
				WdatePicker({ dateFmt: 'yyyy-MM-dd',skin:'twoer',onpicked:function(){
					$(".select-input-search-btn").focus();
				}});
			});
			$(".chooseDay-input").show();
			break;
		case 5:
			$(".Wdate").val("");
			$(".season-select").hide();
			$(".time-control").find(".Wdate").off("focus").on("focus", function(){
				WdatePicker({ dateFmt: 'yyyy-MM-dd HH:00:00',skin:'twoer',onpicked:function(){
					$(".select-input-search-btn").focus();
				}});
			});
			$(".chooseDay-input").show();
			break;
		case 6:
			$(".Wdate").val("");
			$(".season-select").hide();
			$(".time-control").find(".Wdate").off("focus").on("focus", function(){
				WdatePicker({ dateFmt: 'yyyy-MM-dd HH:mm:00',skin:'twoer',onpicked:function(){
					$(".select-input-search-btn").focus();
				}});
			});
			$(".chooseDay-input").show();
			break;
	}
});

$(".view-more").click(function(){
	$(".second-tr.nth4").nextUntil(".second-tr.view-more",".second-tr").removeClass("hidden").show();
	$(this).hide();
})
$('.toadd a').on('click',function(){
	$(".pop-close-bg").fadeIn().one("click",function(){
		$(this).fadeOut();
		$("#add-activity").fadeOut();
	});
	
	$("#add-activity").fadeIn();
});

$("#add-activity .pop-dialog-top i,#add-activity button.cancel").on("click",function(){
	$("#add-activity.pop-dialog").fadeOut();
	$(".pop-close-bg").fadeOut();
	$(window.parent.document).find('.pop-top-close-bg').fadeOut();
	$(window.parent.document).find('.pop-left-close-bg').fadeOut();
});
$('.checked-box').click(function(){
	$(this).toggleClass('checked');
});