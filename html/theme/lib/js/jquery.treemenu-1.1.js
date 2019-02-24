/*
 treeMenu - jQuery plugin
 version: 0.4

 Copyright 2014 Stepan Krapivin

*/

(function($){
    $.fn.openActive = function(activeSel) {
        activeSel = activeSel || ".active";

        var c = this.attr("class");

        this.find(activeSel).each(function(){
            var el = $(this).parent();
            while (el.attr("class") !== c) {
                if(el.prop("tagName") === 'UL') {
                    el.show();
                } else if (el.prop("tagName") === 'LI') {
                    el.removeClass('tree-closed');
                    el.addClass("tree-opened");
                }

                el = el.parent();
            }
        });

        return this;
    }

    $.fn.treemenu = function(options) {
        options = options || {};
        options.delay = options.delay || 0;
        options.openActive = options.openActive || false;
        options.activeSelector = options.activeSelector || "";

        this.addClass("treemenu");
        this.find("> li").each(function() {
            e = $(this);
            var subtree = e.find('> ul');
            var button = e.find('span').eq(0).addClass('toggler');
			var noteId = subtree.prev('a').attr('id');
			
            if( button.length == 0) {
            	var button;
            	if(noteId){
            		button = $('<span onclick="queryChildren(this,'+noteId+')">');
            	}else{
            		button = $('<span>');
            	}
                 
                button.addClass('toggler');
                e.prepend(button);
            } else {
                button.addClass('toggler');
            }

            if(subtree.length > 0) {
                subtree.hide();

                e.addClass('tree-closed');

                e.find(button).click(function() {
                    var li = $(this).parent('li');
                    li.find('> ul').slideToggle(options.delay);
                    li.toggleClass('tree-opened');
                    li.toggleClass('tree-closed');
                    li.toggleClass(options.activeSelector);
                });

                $(this).find('> ul').treemenu(options);
            } else {
                $(this).addClass('tree-empty');
            }
        });
 
        if(options.openDefault){
            this.find("> li").each(function(){
                var item = $(this);
                //item.find('a').addClass('active');
                var subItem = item.find('>ul');
                if(subItem.length>0){
                    subItem.show();
                }
                item.removeClass('tree-closed').addClass('tree-opened');
            })
        }
        if (options.openActive) {
            this.openActive(options.activeSelector);
        }

        return this;
    }
})(jQuery);

var treeUrl = null;
//根据url和根节点查询树数据
function queryTree(url,noteId){
	var resp = null;
	$.ajax({
			url :  url,
			type : "POST",
			async : false,
			cache : false,
			dataType : 'json',
			data : {
				node : noteId
			},
			success : function(response) {
				resp = response;
			},
			error : function(response) {
				resp = null;
				parent.operationTipsFailed('操作失败！', ' ', ' ');
			}
		});
	return resp;	
}

//初始化树
function initTree(obj,url,noteId){
	treeUrl = url;
	var display = $(obj).parent('div').parent('div').find('ul').html().replace(/[\r\n]/g,"").replace(/\ +/g,"").replace(/[ ]/g,"");
	if (display == '' || display == null) {
		
		var data = queryTree(url,noteId);
		$(obj).parent('div').parent('div').find('ul').html('');
		$(obj).parent('div').parent('div').find('ul').append(treeHtml(data));
		// 渲染树
		$(".special-tree").treemenu({
			delay : 300
		}).openActive();
	}
	$(obj).parents(".form-LocationInput").find(".form-location-input-tree").slideToggle("normal");
}

//生成树的html
function treeHtml(data) {
	var treeHtmlStr = '';
	if(data == null){
		parent.operationTipsFailed('操作失败', '请稍后再试！', ' ');
		return;
	}
	$.each(data, function(n, item) {
				treeHtmlStr += '<li><a id="' + item.id
						+ '" onclick="selectTreeNode(this)">' + item.text
						+ '</a>';
				if (item.children && item.children != '') {
					treeHtmlStr += '<ul></ul></li>';
				} else {
					treeHtmlStr += '</li>';
				}
			});
	return treeHtmlStr;		
}

// 点击树节点填到输入框中
function selectTreeNode(obj) {
	var text = $(obj).text();
	var inputObj = $(obj).parents('div.form-LocationInput').children('div').find('input');
	var id = $(obj).attr('id');
	$(inputObj[0]).val(text);
	$(inputObj[1]).val(id);
	$(".form-LocationInput span.placeholder").slideUp();
	$(".form-location-input-tree").slideUp();
}

//查询下级树
function queryChildren(obj,noteId){
	var display = $(obj).parent('li').children('ul').html();
	if(display == '' || display == null){
		var data = queryTree(treeUrl,noteId);
		$(obj).parent('li').find('ul').html('');
		$(obj).parent('li').find('ul').html('').append(treeHtml(data));
		$(obj).parent('li').find('ul').treemenu({delay:300}).openActive();
	}
	
}
