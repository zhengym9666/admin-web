/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('filemanager', function(K) {
	var self = this, name = 'filemanager',
		fileManagerJson = K.undef(self.fileManagerJson, self.basePath + 'php/file_manager_json.php'),
		imgPath = self.pluginsPath + name + '/images/',
		lang = self.lang(name + '.');
	function makeFileTitle(filename, filesize, datetime) {
		return filename + ' (' + Math.ceil(filesize / 1024) + 'KB, ' + datetime + ')';
	}
	function bindTitle(el, data) {
		if (data.is_dir) {
			el.attr('title', data.filename);
		} else {
			el.attr('title', makeFileTitle(data.filename, data.filesize, data.datetime));
		}
	}
	self.plugin.filemanagerDialog = function(options) {
		var width = K.undef(options.width, 650),
			height = K.undef(options.height, 510),
			dirName = K.undef(options.dirName, ''),
			viewType = K.undef(options.viewType, 'VIEW').toUpperCase(), // "LIST" or "VIEW"
			clickFn = options.clickFn;
		var html = [
			'<div style="padding:10px 20px;">',
			// header start
			'<div class="ke-plugin-filemanager-header">',
			// left start
			'<div class="ke-left">',
			'<img class="ke-inline-block" name="moveupImg" src="' + imgPath + 'go-up.gif" width="16" height="16" border="0" alt="" /> ',
			'<a class="ke-inline-block" name="moveupLink" href="javascript:;">' + lang.moveup + '</a>',
			'</div>',
			// right start
			'<div class="ke-right">',
			lang.viewType + ' <select class="ke-inline-block" name="viewType">',
			'<option value="VIEW">' + lang.viewImage + '</option>',
			'<option value="LIST">' + lang.listImage + '</option>',
			'</select> ',
			lang.orderType + ' <select class="ke-inline-block" name="orderType">',
			'<option value="NAME">' + lang.fileName + '</option>',
			'<option value="SIZE">' + lang.fileSize + '</option>',
			'<option value="TYPE">' + lang.fileType + '</option>',
			'</select>',
			'</div>',
			'<div class="ke-clearfix"></div>',
			'</div>',
			// body start
			'<div class="ke-plugin-filemanager-body"></div>',
			'</div>'
		].join('');
		var dialog = self.createDialog({
			name : name,
			width : width,
			height : height,
			title : self.lang(name),
			body : html
		}),
		div = dialog.div,
		bodyDiv = K('.ke-plugin-filemanager-body', div),
		moveupImg = K('[name="moveupImg"]', div),
		moveupLink = K('[name="moveupLink"]', div),
		viewServerBtn = K('[name="viewServer"]', div),
		viewTypeBox = K('[name="viewType"]', div),
		orderTypeBox = K('[name="orderType"]', div);
		function reloadPage(path, order, func) {
			var param = 'path=' + path + '&order=' + order + '&dir=' + dirName;
			dialog.showLoading(self.lang('ajaxLoading'));
			K.ajax(K.addParam(fileManagerJson, param + '&' + new Date().getTime()), function(data) {
				dialog.hideLoading();
				func(data);
			});
		}
		var elList = [];
		function bindEvent(el, result, data, createFunc) {
            var fileUrl = K.formatUrl(result.current_url + data.filename, 'absolute'),
                dirPath = encodeURIComponent(result.current_dir_path + data.filename + '/');
            if (data.is_dir) {
                el.children().eq(0).click(function(e) {
                    reloadPage(dirPath, orderTypeBox.val(), createFunc); //单击文件夹
                });
            } else if (data.is_photo) {
                el.children().eq(0).click(function(e) {
                    clickFn.call(this, fileUrl, data.filename); //单击图片
                });
            } else {
                el.children().eq(0).click(function(e) {
                    clickFn.call(this, fileUrl, data.filename); //单击其他文件
                });
            }
            elList.push(el);
		}
		function createCommon(result, createFunc) {
			// remove events
			K.each(elList, function() {
				this.unbind();
			});
			moveupLink.unbind();
			viewTypeBox.unbind();
			orderTypeBox.unbind();
			// add events
			if (result.current_dir_path) {
				moveupLink.click(function(e) {
					reloadPage(result.moveup_dir_path, orderTypeBox.val(), createFunc);
				});
			}
			function changeFunc() {
				if (viewTypeBox.val() == 'VIEW') {
					reloadPage(result.current_dir_path, orderTypeBox.val(), createView);
				} else {
					reloadPage(result.current_dir_path, orderTypeBox.val(), createList);
				}
			}
			viewTypeBox.change(changeFunc);
			orderTypeBox.change(changeFunc);
			bodyDiv.html('');
		}
		function createList(result) {
			createCommon(result, createList);
			var table = document.createElement('table');
			table.className = 'ke-table';
			table.cellPadding = 0;
			table.cellSpacing = 0;
			table.border = 0;
			bodyDiv.append(table);
			var fileList = result.file_list;
			for (var i = 0, len = fileList.length; i < len; i++) {
				var data = fileList[i], row = K(table.insertRow(i));
				row.mouseover(function(e) {
					K(this).addClass('ke-on');
				})
				.mouseout(function(e) {
					K(this).removeClass('ke-on');
				});
				var iconUrl = imgPath + (data.is_dir ? 'folder-16.gif' : 'file-16.gif'),
					img = K('<img src="' + iconUrl + '" width="16" height="16" alt="' + data.filename + '" align="absmiddle" />'),
					cell0 = K(row[0].insertCell(0)).addClass('ke-cell ke-name').append(img).append(document.createTextNode(' ' + data.filename));
				if (!data.is_dir || data.has_file) {
					row.css('cursor', 'pointer');
					cell0.attr('title', data.filename);
					bindEvent(cell0, result, data, createList);
				} else {
					cell0.attr('title', lang.emptyFolder);
				}
				K(row[0].insertCell(1)).addClass('ke-cell ke-size').html(data.is_dir ? '-' : Math.ceil(data.filesize / 1024) + 'KB');
				K(row[0].insertCell(2)).addClass('ke-cell ke-datetime').html(data.datetime);
			}
		}
		function createView(result) {
            createCommon(result, createView);
            var fileList = result.file_list;
            for (var i = 0, len = fileList.length; i < len; i++) {
                var data = fileList[i],
                    div = K('<div class="ke-inline-block ke-item"></div>');
                bodyDiv.append(div);
                var AltTxt=data.is_dir?"打开文件夹：":"引用文件：",
                    AltIco=data.is_dir?"open.png":"quote.png", //区分文件与文件夹引用与打开图标
                    IsDirYN=data.is_dir?"D":"F", //区分文件与文件夹参数传递
                    CurFileUrl=K.formatUrl(result.current_url+data.filename, 'absolute'),
                    QuoteIcon="<img class='QuoteBtn' src='"+imgPath+AltIco+"' Style='width:30px;height:30px;position:absolute;top:30px;right:30px;display:none;' alt='"+AltTxt+CurFileUrl+"' title='"+AltTxt+CurFileUrl+"' />", //定义引用按钮样式
                    DeleteIcon="<img class='DeleteBtn' src='"+imgPath+"delete.png' Style='width:30px;height:30px;position:absolute;top:-15px;right:-15px;display:none;' alt='删除："+CurFileUrl+"' title='删除："+CurFileUrl+"' DeUrl='"+CurFileUrl+"' IsFrd='"+IsDirYN+"' />"; //定义删除按钮样式
                var photoDiv = K('<div class="ke-inline-block ke-photo">'+QuoteIcon+DeleteIcon+'</div>') //图片DIV
                    .mouseover(function(e) {
                        K(this).addClass('ke-on');
                        K(this).children().eq(0).css('display','block'); //显示引用按钮
                        K(this).children().eq(1).css('display','block'); //显示删除按钮
                    })
                    .mouseout(function(e) {
                        K(this).removeClass('ke-on');
                        K(this).children().eq(0).css('display','none'); //隐藏引用按钮
                        K(this).children().eq(1).css('display','none'); //隐藏删除按钮
                    });
                div.append(photoDiv);
                var fileUrl = result.current_url + data.filename,
                    iconUrl = data.is_dir ? imgPath + 'folder-64.gif' : (data.is_photo ? fileUrl : imgPath + 'file-64.gif'),
                    filesiz = data.is_dir ? '' : '  ('+ Math.ceil(data.filesize/1024) + 'KB)'; //文件尺寸
                var img = K('<img src="' + iconUrl + '" width="80" height="80" alt="' + data.filename + filesiz + '" />');
                if (!data.is_dir || data.has_file) {
                    photoDiv.css('cursor', 'pointer');
                    bindTitle(photoDiv, data);
                    bindEvent(photoDiv, result, data, createView);
                } else {
                    photoDiv.attr('title', lang.emptyFolder);
                }
                photoDiv.append(img);
                div.append('<div class="ke-name" title="' + data.filename + '">' + data.filename + '</div>');
            }
            //增加删除代码
            K(".DeleteBtn").click(function(){
                var $this=K(this),
                    CrrentDelUrl=this.attributes["DeUrl"].value;
                CurrentIsDir=this.attributes["IsFrd"].value;
                layer.confirm("确定删除："+CrrentDelUrl+"？", function(index){
                    //向服务端发送删除指令
                    $.ajax({
                        url: rootPath+"/image/deleImage.action",
                        type: 'post',
                        async: true,
                        cache: false,
                        data:{
                            CrrentDelUrl:CrrentDelUrl,
                            CurrentIsDir:CurrentIsDir
                        },
                        dataType: 'JSON',
                        success: function (response) {
                            if (response.status==0) {
                                //alert("删除成功（"+data+"）！");
                                $this.parent().next().remove();
                                $this.parent().remove();
                                layer.close(index);
                            } else {
                                /*layer.alert(JSON.stringify(response.msg), {
                                    title: '删除失败'
                                });*/
                                layer.msg('删除失败，请重试：'+response.msg);
                            }
                        },
                        error: function () {
                            layer.alert("获取新闻失败，请重试");
                        }
                    });


                });
                //Del_Run.asp为使用Ajax方法执行图片删除功能ASP文件，参数项1、参数项2为必备参数，其他参数可根据需要自行定义
                /*$.post("Ajax删除图片.asp",{"参数项1":CrrentDelUrl,"参数项2":CurrentIsDir,"参数项3":"参数值3"},function(data){
                    //假设Del_Run.asp的data返加值为：成功succeed、其他失败
                    if(data=="succeed"){
                        //alert("删除成功（"+data+"）！");
                        $this.parent().next().remove();
                        $this.parent().remove();
                    }else{
                        alert("删除失败（"+data+"）！");
                    }
                });*/

            });
		}
		viewTypeBox.val(viewType);
		reloadPage('', orderTypeBox.val(), viewType == 'VIEW' ? createView : createList);
		return dialog;
	}

});
