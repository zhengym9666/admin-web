/** 
 * 成功类提示消息 
 * obj{
 * 	Ptext:弹出框一级提示内容;
 * 	Stext:弹出框二级提示内容;
 * 	func:点击确定的回调函数
 * }
 */ 
var operateSuccessObj = {
		Ptext: "操作成功",
		Stext: "点击确定返回操作界面"
}
var operateFailedObj = {
		Ptext: "操作失败",
		Stext: "点击确定返回操作界面"
}
var operateWarnObj = {
		Ptext: "您确定要删除吗？",
		Stext: "一经删除可不恢复"
}
function operationTipsTrue(obj) {
    if (!obj) {
        var TruePrimaryText = "操作成功";
        var TrueSecondaryText = "点击确认按钮返回操作界面";
    } else {
        var TruePrimaryText = obj.Ptext ? obj.Ptext : "操作成功";
        var TrueSecondaryText = obj.Stext ? obj.Stext : "点击确认按钮返回操作界面";
        if (typeof(obj.func) === "function") {
            $(window.top.document).find("body").one("click", ".grayTextBtn.true-ok", obj.func);
        }
    }
    $(window.top.document).find("body").append(
        '<div class="operation-tips-bg">' +
        '<div class="operation-tips operation-tips-true">' +
        '<i class="iconfont icon-close"></i>' +
        '<div class="operation-tips-img">' +
        '<i class="iconfont"></i>' +
        '</div>'

        +
        '<span class="primary-content">' + TruePrimaryText + '</span>' +
        '<span class="secondary-content">' + TrueSecondaryText + '</span>'

        +
        '<div class="operation-tips-true-btn">' +
        '<button class="grayTextBtn true-ok">确定</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    $(window.top.document).find('.operation-tips-bg').fadeIn();
};

/** 
 * 错误类提示消息 
 * obj{
 * 	Ptext:弹出框一级提示内容;
 * 	Stext:弹出框二级提示内容;
 * 	func:点击确定的回调函数
 * }
 */
function operationTipsFailed(obj) {
    if (!obj) {
        var FailedPrimaryText = "操作失败";
        var FailedSecondaryText = "请解决操作失败原因后再重新尝试";
    } else {
        var FailedPrimaryText = obj.Ptext ? obj.Ptext : "操作失败";
        var FailedSecondaryText = obj.Stext ? obj.Stext : "请解决操作失败原因后再重新尝试";
        if (typeof(obj.func) === "function") {
            $(window.top.document).find("body").one("click", ".grayTextBtn.fail-ok", obj.func);
        }
    }
    $(window.top.document).find("body").append(
        '<div class="operation-tips-bg">' +
        '<div class="operation-tips operation-tips-failed">' +
        '<i class="iconfont icon-close"></i>' +
        '<div class="operation-tips-img">' +
        '<i class="iconfont"></i>' +
        '</div>'

        +
        '<span class="primary-content">' + FailedPrimaryText + '</span>' +
        '<span class="secondary-content">' + FailedSecondaryText + '</span>'

        +
        '<div class="operation-tips-failed-btn">' +
        '<button class="grayTextBtn fail-ok">确定</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    $(window.top.document).find('.operation-tips-bg').fadeIn();
};

/** 
 * 告警类提示消息 
 * obj{
 * 	Ptext:弹出框一级提示内容;
 * 	Stext:弹出框二级提示内容;
 * 	func:点击确定的回调函数
 * }
 */
function operationTipsWarn(obj) {
	var WarnFunc = function(){};
	
    if (!obj) {
        var WarnPrimaryText = "您确认要删除吗";
        var WarnSecondaryText = "一经删除不可恢复";
    } else {
        var WarnPrimaryText = obj.Ptext ? obj.Ptext : "您确认要删除吗";
        var WarnSecondaryText = obj.Stext ? obj.Stext : "一经删除不可恢复";
        WarnFunc = obj.func;
    }
    $(window.top.document).find("body").append(
        '<div class="operation-tips-bg">' +
        '<div class="operation-tips operation-tips-warn">' +
        '<i class="iconfont icon-close"></i>' +
        '<div class="operation-tips-img">' +
        '<i class="iconfont"></i>' +
        '</div>'

        +
        '<span class="primary-content">' + WarnPrimaryText + '</span>' +
        '<span class="secondary-content">' + WarnSecondaryText + '</span>'

        +
        '<div class="operation-tips-warn-btn">' +
        '<button class="grayTextBtn">取消</button>' +
        '<button class="TextBtn-import confirm">确定</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    if (typeof(WarnFunc) === "function") {
        $(window.top.document).find("body .TextBtn-import.confirm").on("click", WarnFunc);
    }
    $(window.top.document).find('.operation-tips-bg').fadeIn();
};

$('body').on('click', '.operation-tips .icon-close,.operation-tips button', function() {
    $('body').off("click", ".TextBtn-import.confirm");
    $(this).parents('.operation-tips-bg').fadeOut(function() {
        $(this).remove();
    });
});

//成功提示
function success(msg){
	operateSuccessObj.Ptext = "操作成功";
	operateSuccessObj.Stext = msg;
	if(msg){
		operationTipsTrue(operateSuccessObj);
	}else{
		operateSuccessObj.Stext = "点击确定返回操作界面";
		operationTipsTrue(operateSuccessObj);
	}
}

//错误提示
function error(msg){
	operateFailedObj.Ptext = "操作失败";
	operateFailedObj.Stext = msg;
	if(msg){
		operationTipsFailed(operateFailedObj);
	}else{
		operateFailedObj.Stext = "系统出错，请联系系统管理员";
		operationTipsFailed(operateFailedObj);
	}
}

//告警提示
function warn(msg){
	operateWarnObj.Stext = msg;
	if(msg){
		operationTipsWarn(operateWarnObj);
	}else{
		operateWarnObj.Stext = "点击确定继续操作";
		operationTipsWarn(operateWarnObj);
	}
}