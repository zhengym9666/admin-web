$(".collected-func").on("mouseover","li",function(){
	$(this).find(".hide-btn").show();
});
$(".collected-func").on("mouseout","li",function(){
	$(this).find(".hide-btn").hide();
});
$(".collectable-func").on("mouseover","li",function(){
	$(this).find(".hide-btn").show();
});
$(".collectable-func").on("mouseout","li",function(){
	$(this).find(".hide-btn").hide();
});

$(".collected-func").on("click",".hide-btn",function(){
	var html = $(this).find("i").removeClass("icon-close").addClass("icon-add").end().hide().parents("li").html();
	$(this).parents("li").remove();
	$(".collectable-func").append("<li>"+html+"</li>");
})
$(".collectable-func").on("click",".hide-btn",function(){
	var html = $(this).find("i").removeClass("icon-add").addClass("icon-close").end().hide().parents("li").html();
	$(this).parents("li").remove();
	$(".collected-func").append("<li>"+html+"</li>");
})