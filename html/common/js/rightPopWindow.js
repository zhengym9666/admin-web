/**
 * 右弹窗
 */
function rightPopWindow(title, width, _id){
	$(".right-alert-closeBg").css("right", width);
	$(".right-alert-main").css("width", width);
	var _obj ;
	if (_id != null && _id != undefined){
		_obj = $("#"+_id);
	}else {
		_obj = $("#rightPopWindow");
	}
	_obj = $(".right-alert");
	_obj.fadeIn('fast').animate({
		marginRight: "0px"
	}, 300);
	_obj.find('.right-alert_head_title').text(title);
}

function closeRightWindow(_id){
    var _obj ;
    if (_id != null && _id != undefined){
        _obj = $("#"+_id);
    }else {
        _obj = $("#rightPopWindow");
    }
    _obj.animate({
        marginRight: "0px"
    }, 300).fadeOut();

}