var configDomDisplay = 'none';

var pop = null;
function ShowIframe(title, contentUrl, width, height) {
	pop = new Popup({
		contentType : 1,
		isReloadOnClose : false,
		width : width,
		height : height
	});
	pop.setContent("title", title);
	pop.setContent("contentUrl", contentUrl);
	pop.build();
	pop.show();
}
function ShowHtmlString(title, strHtml, width, height) {
	var pop = new Popup({
		contentType : 2,
		isReloadOnClose : false,
		width : width,
		height : height
	});
	pop.setContent("contentHtml", strHtml);
	pop.setContent("title", title);
	pop.build();
	pop.show();
	return pop;
}
function ShowConfirm(title, confirmCon, width, height, func) {
	var pop = new Popup({
		contentType : 3,
		isReloadOnClose : false,
		width : width,
		height : height
	});
	pop.setContent("title", title);
	pop.setContent("confirmCon", confirmCon);
	pop.setContent("callBack", ShowCallBack);
	pop.setContent("parameter", {
		func : func,
		pop : pop
	});
	pop.build();
	pop.show();
}
function ShowAlert(title, alertCon, width, height, func) {
	var pop = new Popup({
		contentType : 4,
		isReloadOnClose : false,
		width : width,
		height : height
	});
	pop.setContent("title", title);
	pop.setContent("alertCon", alertCon);
	pop.setContent("callBack", ShowCallBack);
	pop.setContent("parameter", {
		func : func,
		pop : pop
	});
	pop.build();
	pop.show();
}
function ShowCallBack(para) {
	var o_pop = para["pop"]
	o_pop.close();
	if (para.func) {
		para.func();
	}
}
function ClosePop() {
	pop.close();
}
