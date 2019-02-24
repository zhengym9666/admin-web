var editor;
//策略id
var strategyId;
//活动结束时间
var activityEndDate;
var activityName;
var strategyName;
var activityStartDate;
//测试号码客户群id
var strategyTestCltId;
//目标客户群id
var targetGroupId = "";
//活动id
var activityId;
//根据策略id查询出组件实例信息的json数据  为了控制启停状态 
var compInstJson ;

// 程序启动方法
function main(container, outline, sidebar, status)
{
	//获得参数的方法
	var request =
	{
		QueryString : function(val)
		{
			var uri = window.location.search;
			var re = new RegExp("" +val+ "=([^&?]*)", "ig");
			return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
		}
	};
	strategyId = decodeURI(request.QueryString("strategyId"));
	activityId = decodeURI(request.QueryString("activityId"));
	strategyName = decodeURI(decodeURI(request.QueryString("strategyName")));
	activityStartDate = decodeURI(decodeURI(request.QueryString("activityStartDate")));
	//活动结束时间
	activityEndDate = decodeURI(decodeURI(request.QueryString("activityEndDate")));
    activityName = decodeURI(decodeURI(request.QueryString("activityName")));
    $("#activityName").html(activityName);
    document.getElementById("activityName").title = activityName;
    $("#strategyName").html(strategyName);
    document.getElementById("strategyName").title = strategyName;
    $("#activityDate").html("(" + activityStartDate + "至" + activityEndDate + ")");
	//测试号码客户群id
	strategyTestCltId = decodeURI(request.QueryString("strategyTestCltId"));
	
	init(container, outline, sidebar, status);
	//窗口关闭事件，关闭时先保存文件
	window.onbeforeunload = function(e){
		writeDataToFile();
		return "";
	};
	//读取配置的文件
	read(editor, strategyId);
	
	//跨域通讯
    jCrossDomain.initParent(initTestFunc, 'popIframe');
};//main end


var initTestFunc = function(json){
	var obj = eval("("+json+")");
	//如果是关闭的
	if(obj.type == "close"){
		hideIframePop();
	}
	//如果是客户群运算结果
	else if(obj.type == "operation_result"){
		deleteOperationCell(obj.id,obj.groupList);
	}else if(obj.type == "init"){
		setCtsPageSize(obj.type);
	}else if(obj.type == "init_testnumber"){
		setCtsPageSize(obj.type);
	}else if(obj.type == "root_target"){
		deleteOperationCell(obj.id,obj.groupList);
	}
};


//读取原有的配置--修改为读取字符串
function read(editor, strategyId)
{
	var xmlStr = "";
	
	var url = rootPath+'/business/com.airmdp.strategy.appframe.action.strategy.StrategyAction?action=readStrategyMapData&';
	// 组件名称只有修改的情况发生
	Ext.Ajax.request({
		url: url,
		method : "GET",
		params : {
			strategyId : strategyId
		},
		success: function ( response, options ) {
			if(response!=null&&response!="{}"){
				var obj =  eval("("+response.responseText+")");
				//根据策略id查询出组件实例信息的json数据  为了控制启停状态 
//				compInstJson = obj.compInstJson;
				compInstJson =  obj.strategyCompInstJson;
				xmlStr = obj.strategyMapData.replace(/\\\"/g,"\"")
				//字符串读取
				var doc = mxUtils.parseXml(xmlStr);
				var codec = new mxCodec(doc);
				codec.decode(doc.documentElement, editor.graph.getModel());
				
				setTimeout(function() {
					//先去找默认的节点，如果没有就创建
					var rootCell = editor.graph.getModel().getCell("10000");
					//默认节点等于空的情况下
					if(rootCell == null){
						//应该从策略中传递过来
						addHomeNode(editor,"10000",strategyTestCltId);
					}
				}, 10);
			}
		},
		failure : function() {
		}
	});
 
};

function init(container, outline, sidebar, status){
	// 浏览器兼容检测
	if (!mxClient.isBrowserSupported())
	{
		mxUtils.error('Browser is not supported!', 200, false);
	}
	else
	{
		// 创建图形编辑器
		editor = new mxEditor();
		var graph = editor.graph;
		var model = graph.getModel();
		maxgrahpInit(container, outline, sidebar, status, graph, model);
		// To disable the folding icon, use the following code:
		/*graph.isCellFoldable = function(cell)
		{
			return false;
		}*/

		// 双击显示模型窗口
		graph.dblClick = function(evt, cell)
		{
			// 如果不是双击事件，编辑器会自动处理
			if (this.isEnabled() &&
				!mxEvent.isConsumed(evt) &&
				cell != null &&
				this.isCellEditable(cell))
			{
				if (this.model.isEdge(cell) ||
					!this.isHtmlLabel(cell))
				{
					this.startEditingAtCell(cell);
				}
			}

			// 禁用任何默认双击行为
			mxEvent.consume(evt);
		};

		graph.getEdgeValidationError = function(edge, source, target)
		{
			if (edge != null && !this.isAllowDanglingEdges() && (source == null || target == null))
			{
				return '';
			}
			
			if (edge != null && this.model.getTerminal(edge, true) == null &&
				this.model.getTerminal(edge, false) == null)	
			{
				return null;
			}
			
			// Checks if we're dealing with a loop
			if (!this.allowLoops && source == target && source != null)
			{
				return '';
			}
			
			// Checks if the connection is generally allowed
			if (!this.isValidConnection(source, target))
			{
				return '';
			}
		
			if (source != null && target != null)
			{
				var error = '';
		
				// 检查是否已经有连接线
				// 并且给出错误提示			
				if (this.multigraph)
				{
					var tmp = this.model.getEdgesBetween(source, target, true);
					// Checks if the source and target are not connected by another edge
					if (tmp.length > 1 || (tmp.length == 1 && tmp[0] != edge))
					{
						error += (mxResources.get(this.alreadyConnectedResource) ||
							this.alreadyConnectedResource)+'\n';
					}
					
					if(source.parent.id == target.id || source.id == target.parent.id){
						error += ("组件内不允许连线！");
					}
					
					if(target.type == "out"){
						error += ("输出组件不允许连入！");
					}
					
					if(target.type == "root_test"){
						error += ("测试号码组件不能连入！");
					}
					if(target.type == "root_target"){
						error += ("目标客户群组件不能连入！");
					}
					//如果目标是组件类型
					if(target.getEdgeCount() > 0){
						error += ("该组件只能连入一条线！");
					}
				}
		
				// Gets the number of outgoing edges from the source
				// and the number of incoming edges from the target
				// without counting the edge being currently changed.
				var sourceOut = this.model.getDirectedEdgeCount(source, true, edge);
				var targetIn = this.model.getDirectedEdgeCount(target, false, edge);
		
				// Checks the change against each multiplicity rule
				if (this.multiplicities != null)
				{
					for (var i = 0; i < this.multiplicities.length; i++)
					{
						var err = this.multiplicities[i].check(this, edge, source,
							target, sourceOut, targetIn);
						
						if (err != null)
						{
							error += err;
						}
					}
				}
		
				// Validates the source and target terminals independently
				var err = this.validateEdge(edge, source, target);
				
				if (err != null)
				{
					error += err;
				}
				
				return (error.length > 0) ? error : null;
			}
			
			return (this.allowDanglingEdges) ? null : '';
		};
		
		
		//链接方法修改 changed by zhouletian
		graph.connectionHandler.connect = function(source, target, evt, dropTarget,id)
		{
			graph.getEdgeValidationError(null,source, target);
			
			var children = graph.getChildCells(target);
			var targetClientIds = "";
		
			for(var i = 0; i < children.length; i++){
				targetClientIds += children[i].clientId + ",";
			}
			var isUserGroupCell = false;
			if(source.parent.id == '10000'){
				isUserGroupCell = true;
			}
			targetClientIds = targetClientIds.substring(0,targetClientIds.length - 1);
			// 重新定义目标客户群，并生成新的客户群公式
			var url = rootPath+'/business/com.airmdp.strategy.appframe.action.strategyComp.StrategyCompInstAction?action=reDefineStrategyCompInst&';
			//连线的实例化id 
			var is_success = false;
			$.ajax({
				url : url,
				type : "POST",
				data:{
					isUserGroupCell : isUserGroupCell,
					targetClientIds : targetClientIds,
					clientId : source.clientId,
					compInstId : target.compInstId
				},
				async : false,
				cache : false,
				success : function(response){
					if(eval("("+response+")").success){
						//写入文件
						writeDataToFile();
						is_success = true;
					}else{
						alert(eval("("+response+")").message);
					}
				},
				error : function(response){
					error();
				}
			});
			
			if (is_success && (target != null || this.isCreateTarget() || this.graph.allowDanglingEdges))
			{
				// Uses the common parent of source and target or
				// the default parent to insert the edge
				var model = this.graph.getModel();
				var edge = null;

				model.beginUpdate();
				try
				{
					if (source != null && target == null && this.isCreateTarget())
					{
						target = this.createTargetVertex(evt, source);
						
						if (target != null)
						{
							dropTarget = this.graph.getDropTarget([target], evt, dropTarget);
							
							// Disables edges as drop targets if the target cell was created
							// FIXME: Should not shift if vertex was aligned (same in Java)
							if (dropTarget == null || !this.graph.getModel().isEdge(dropTarget))
							{
								var pstate = this.graph.getView().getState(dropTarget);
								
								if (pstate != null)
								{
									var tmp = model.getGeometry(target);
									tmp.x -= pstate.origin.x;
									tmp.y -= pstate.origin.y;
								}
							}
							else
							{
								dropTarget = this.graph.getDefaultParent();
							}
								
							this.graph.addCell(target, dropTarget);
						}
					}

					var parent = this.graph.getDefaultParent();

					if (source != null && target != null &&
						model.getParent(source) == model.getParent(target) &&
						model.getParent(model.getParent(source)) != model.getRoot())
					{
						parent = model.getParent(source);

						if ((source.geometry != null && source.geometry.relative) &&
							(target.geometry != null && target.geometry.relative))
						{
							parent = model.getParent(parent);
						}
					}
					
					// Uses the value of the preview edge state for inserting
					// the new edge into the graph
					var value = null;
					var style = null;
					
					if (this.edgeState != null)
					{
						value = this.edgeState.cell.value;
						style = this.edgeState.cell.style;
					}
					//创建连线
					edge = this.insertEdge(parent, id, value, source, target, style);
					
					if (edge != null)
					{
						//连线的实例化id
						//edge.itfInstDrctId = itfInstDrctId;
						// Updates the connection constraints
						this.graph.setConnectionConstraint(edge, source, true, this.sourceConstraint);
						this.graph.setConnectionConstraint(edge, target, false, this.constraintHandler.currentConstraint);
						
						// Uses geometry of the preview edge state
						if (this.edgeState != null)
						{
							model.setGeometry(edge, this.edgeState.cell.geometry);
						}
						
						// Makes sure the edge has a non-null, relative geometry
						var geo = model.getGeometry(edge);

						if (geo == null)
						{
							geo = new mxGeometry();
							geo.relative = true;
							
							model.setGeometry(edge, geo);
						}
						
						// Uses scaled waypoints in geometry
						if (this.waypoints != null && this.waypoints.length > 0)
						{
							var s = this.graph.view.scale;
							var tr = this.graph.view.translate;
							geo.points = [];
							
							for (var i = 0; i < this.waypoints.length; i++)
							{
								var pt = this.waypoints[i];
								geo.points.push(new mxPoint(pt.x / s - tr.x, pt.y / s - tr.y));
							}
						}

						if (target == null)
						{
							var pt = this.graph.getPointForEvent(evt, false);
							pt.x -= this.graph.panDx / this.graph.view.scale;
							pt.y -= this.graph.panDy / this.graph.view.scale;
							geo.setTerminalPoint(pt, false);
						}
						
						this.fireEvent(new mxEventObject(mxEvent.CONNECT,
								'cell', edge, 'event', evt, 'target', dropTarget));
					}
				}
				catch (e)
				{
					mxLog.show();
					mxLog.debug(e.message);
				}
				finally
				{
					model.endUpdate();
				}
				
				if (this.select)
				{
					this.selectCells(edge, target);
				}
			}
		};
		
		

		
		//自定义tips
		graph.getTooltipForCell = function(cell){
			var tip = "";
			if(cell.type == "out"){
				tip = "ID : "+ cell.clientId + "\r\n名称：" + cell.clientName;
				return tip;
			}
		    return false; 
		};
		
		
		
		// 创建右键下拉菜单
		// Installs a popupmenu handler using local function (see below).
		//最新写法，在新版本2.9.0 里
		graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
		{
			return createPopupMenu(editor,graph, menu, cell, evt);
		};
		/*graph.panningHandler.factoryMethod = function(menu, cell, evt)
		{
			return createPopupMenu(editor,graph, menu, cell, evt);
		};*/
		
	}//else end
	
	
}

//地图初始化
function maxgrahpInit(container, outline, sidebar, status, graph, model){
	// 定义全局变量，如。用于触发建立新的连接的活动区域的最小尺寸（以像素为单位），该部分（100％）的小区区域被用于触发新的连接，以及一些窗口和“下拉菜菜单选择
	mxConstants.MIN_HOTSPOT_SIZE = 16;
	mxConstants.DEFAULT_HOTSPOT = 1;
	
	// 显示导航线
	mxGraphHandler.prototype.guidesEnabled = true;

    // Alt 键禁用导航线
    mxGuide.prototype.isEnabledForEvent = function(evt)
	{
		return !mxEvent.isAltDown(evt);
	};

	// 自动导航目标
	mxEdgeHandler.prototype.snapToTerminals = true;
	// IE浏览器样式修复
	if (mxClient.IS_QUIRKS)
	{
		document.body.style.overflow = 'hidden';
		new mxDivResizer(container);
		new mxDivResizer(outline);
		new mxDivResizer(sidebar);
		new mxDivResizer(status);
	}
	
	//透明的提示
	setHints(editor);
	
	// 启用高亮工具栏
	graph.setDropEnabled(false);

	// 连接预览
	graph.connectionHandler.getConnectImage = function(state)
	{
		//如果状态为只能连入，则不显示连接点
		if(state.cell.type == "out" || state.cell.type== "root_target"){
			return new mxImage('images/connector.gif', 16, 16);
		}else {
			return false;
		}
	};

	// 显示中心端口图标
	graph.connectionHandler.targetConnectImage = true;

	// 禁止连接线晃动
	graph.setAllowDanglingEdges(false);

	//设置图形容器，并配置编辑器
	editor.setGraphContainer(container);
	
	// 设置默认组
	// groupBorderSize 设置图形和它的子元素的边距。
	var group = new mxCell('Group', new mxGeometry(), 'group');
	group.setVertex(true);
	group.setConnectable(false);
	editor.defaultGroup = group;
	editor.groupBorderSize = 20;

	// 目标是否有效
	graph.isValidDropTarget = function(cell, cells, evt)
	{
		return this.isSwimlane(cell);
	};
	
	// 是否根元素
	graph.isValidRoot = function(cell)
	{
		return this.isValidDropTarget(cell);
	};

	//复制事件,返回false，防止按Ctrl时随意复制组件
	graph.isCloneEvent = function(evt)
	{
		return false;
	};
	
	graph.isCellMovable = function(cell)
	{
		if(cell.locked == 'true'){
			return false;
		}else{
			return true;
		}
	};
	
	graph.isCellDeletable = function(cell)
	{
		if(cell.locked == 'true'){
			return false;
		}else{
			return true;
		}
	};
	
	graph.isCellResizable = function(cell)
	{
			return false;
	};
	// 返回元素
	graph.getLabel = function(cell)
	{
		var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
		
		if (this.isCellLocked(cell))
		{
			// 如元素被锁定 返回空标签
			return '';
		}
		else if (this.isCellCollapsed(cell))
		{
			var index = tmp.indexOf('</h1>');
			
			if (index > 0)
			{
				tmp = tmp.substring(0, index+5);
			}
		}
		
		return tmp;
	};

	// 禁用HTML的泳道标签，避免冲突
	// 判断是否为泳道标签
	graph.isHtmlLabel = function(cell)
	{
		return !this.isSwimlane(cell);
	};

	// 启用新连接
	graph.setConnectable(true);

	// 配置样式
	configureStylesheet(graph);
	
	//生成左侧菜单
	createSidebar(graph, sidebar);
	
	//删除cell的方法修改，监控删除连接线
	mxGraphModel.prototype.remove = function(cell)
	{
		if (cell == this.root)
		{
			this.setRoot(null);
		}
		else if (this.getParent(cell) != null)
		{
			this.execute(new mxChildChange(this, null, cell));
		}
		
		return cell;
	};
	//删除了原有的线的两端点，防止线的移动
	mxEdgeHandler.prototype.redraw = function()
	{
		this.abspoints = this.state.absolutePoints.slice();
		var cell = this.state.cell;
	
		// Updates the handle for the label position
		var s = mxConstants.LABEL_HANDLE_SIZE;
		
		this.label = new mxPoint(this.state.absoluteOffset.x, this.state.absoluteOffset.y);
		this.labelShape.bounds = new mxRectangle(this.label.x - s / 2,
			this.label.y - s / 2, s, s);
		this.labelShape.redraw();
		
		// Shows or hides the label handle depending on the label
		var lab = this.graph.getLabel(cell);
		
		if (lab != null && lab.length > 0 && this.graph.isLabelMovable(cell))
		{
			this.labelShape.node.style.visibility = 'visible';
		}
		else
		{
			this.labelShape.node.style.visibility = 'hidden';
		}
		
		if (this.bends != null && this.bends.length > 0)
		{
			//删除了原有的线的两端点，防止线的移动
			var n = this.abspoints.length - 1;
			var p0 = this.abspoints[0];
			var pe = this.abspoints[n];
			
			this.redrawInnerBends(p0, pe);
		}
	
		this.drawPreview();
	};
	
	// 禁止折叠图标
	graph.isCellFoldable = function(cell)
	{
		return false;
	};
	// 图形窗口的右上角的周围创建导航提示。
	var outln = new mxOutline(graph, outline);

	// 要显示的图像的轮廓，去掉下面的代码
	//outln.outline.labelsVisible = true;
	//outln.outline.setHtmlLabels(true);
	
	/**
	 * Function: decodeChild 
	 * 
	 * 解析xml
	 */	
	mxObjectCodec.prototype.decodeChild = function(dec, child, obj)
	{
		var fieldname = this.getFieldName(child.getAttribute('as'));
		
		if (fieldname == null ||
			!this.isExcluded(obj, fieldname, child, false))
		{
			var template = this.getFieldTemplate(obj, fieldname, child);
			var value = null;
			
			if (child.nodeName == 'add')
			{
				value = child.getAttribute('value');
				
				if (value == null)
				{
					value = mxUtils.eval(mxUtils.getTextContent(child));
					//mxLog.debug('Decoded '+fieldname+' '+mxUtils.getTextContent(child));
				}
			}
			else
			{
				value = dec.decode(child, template);
			}
			
			
			//根据组件实例的信息去判断，然后替换组件启停状态 2014年8月21日 14:29:31 zhoult
			if(compInstJson != null && obj.type != null && obj.type == 1){
				for ( var i = 0; i < compInstJson.length; i++) {
					if(obj.compInstId == compInstJson[i].compInstId){
						var label = obj.getValue();
						//判断组件的状态 1已启用 2已停用 3处理中
						if(compInstJson[i].compInstRunStatus == "1"){
							label = label.replace("i-start-comp","i-stop-comp");
							label = label.replace("i-running-comp","i-stop-comp");
							label = label.replace("目前是停用状态，点击启用","目前是启用状态，点击停用");
						}
						else if(compInstJson[i].compInstRunStatus == "2"){
							label = label.replace("i-stop-comp","i-start-comp");
							label = label.replace("i-running-comp","i-start-comp");
							label = label.replace("目前是启用状态，点击停用","目前是停用状态，点击启用");
						}
						else if(compInstJson[i].compInstRunStatus == "3"){
							label = label.replace("i-stop-comp","i-running-comp");
							label = label.replace("i-start-comp","i-running-comp");
							
							label = label.replace("i-stop-strategystop-comp","i-running-comp");
							label = label.replace("i-start-strategystop-comp","i-running-comp");
							label = label.replace("modifyCompInstRunState","modifyCompRunStateByStrategyState");
							label = label.replace("目前是启用状态，点击停用","目前是处理中状态");
							
						}
						obj.setValue(label);
						break;
					}
				}
			}
			
			this.addObjectValue(obj, fieldname, value, template);
		}
	};
	// 淡出了启动后，屏幕的UI已经被加载
	var splash = document.getElementById('splash');
	if (splash != null)
	{
		try
		{
			mxEvent.release(splash);
			mxEffects.fadeOut(splash, 100, true);
		}
		catch (e)
		{
			// 工具库不可用（不加载库）
			splash.parentNode.removeChild(splash);
		}
	}
}
// 创建右键点击菜单
function createPopupMenu(editor,graph, menu, cell, evt)
{
	var model = graph.getModel();
	if(editor.graph.getSelectionCount() > 0){
		if(editor.graph.getSelectionCell().locked == "true"){
			return false;
		}
		menu.addItem('删除', 'images/icos/ico-remove.png', function(evt)
		{
			var confirmStatus = false;
			var cell = editor.graph.getSelectionCell();
			var selectCells = editor.graph.getSelectionCells();
			if(selectCells.length > 1){
				alert("请您一次性不要删除多于一个组件！");
				return false;
			}
			//根据个别属性判断该条线是否允许删除
			if(graph.getModel().isEdge(cell)){
				confirmStatus = this.confirm("您确定要删除这两个组件的关联吗？");
				if(confirmStatus){
					//向后台发出请求进行删除
					var url = rootPath+'/business/com.airmdp.strategy.appframe.action.strategyComp.StrategyCompInstAction?action=removeStrategyCompInstContact&';
					$.ajax({
						url : url,
						type : "POST",
						async : false,
						data:{
							targetCompInstId : cell.target.instId
						},
						cache : false,
						success : function(response){
							if(response!=null&&response!="[]"){
								//如果校验通过的话，才执行删除操作
								if(eval("("+response+")").success){
									editor.execute("delete");
									//如果不是运算组件，得修改配置状态
									if(cell.target.type  != '2'){
										var start = cell.target.value.indexOf("执行规则_");
										var id = cell.target.value.substring(start,start+18);
										var obj = null;
										if (window.document.getElementById(id)) {
											obj = window.document.getElementById(id);
										}
										obj.innerHTML = "待配置>>";
										obj.className = "no-config";
										//更新地图数据
										var div = obj.parentElement.parentElement.parentElement.parentElement;
										
										//更改配置完成样式
										div.className = "green-unit";
										div.childNodes[0].childNodes[0].className = "status-configing";
										div.childNodes[0].childNodes[0].innerHTML = "正在配置";
										var label = div.outerHTML;
										label = label.replace(/[\r\n]/g,"")//去掉回车换行
										
										model.beginUpdate();
										try
										{
											var layout = new mxGraphLayout(editor.graph);
											var parent = editor.graph.getDefaultParent();
											
											cell.target.setValue(label);
											// Executes the layout
											layout.execute(parent);
										}
										finally
										{
											model.endUpdate();
										}
									}
									writeDataToFile();
									
								}else{
									alert(eval("("+response+")").message);
								}
							}
						},
						error : function(response){
							error();
							
							editor.execute("delete");
							//如果不是运算组件，得修改配置状态
							if(cell.target.type  != '2'){
								var start = cell.target.value.indexOf("执行规则_");
								var id = cell.target.value.substring(start,start+18);
								var obj = null;
								if (window.document.getElementById(id)) {
									obj = window.document.getElementById(id);
								}
								obj.innerHTML = "待配置>>";
								obj.className = "no-config";
								//更新地图数据
								var div = obj.parentElement.parentElement.parentElement.parentElement;
								
								//更改配置完成样式
								div.className = "green-unit";
								div.childNodes[0].childNodes[0].className = "status-configing";
								div.childNodes[0].childNodes[0].innerHTML = "正在配置";
								var label = div.outerHTML;
								label = label.replace(/[\r\n]/g,"")//去掉回车换行

								model.beginUpdate();
								try
								{
									var layout = new mxGraphLayout(editor.graph);
									var parent = editor.graph.getDefaultParent();
									
									cell.target.setValue(label);
									// Executes the layout
									layout.execute(parent);
								}
								finally
								{
									model.endUpdate();
								}
							}
							writeDataToFile();
						
					}
					});
				}
			}else if(graph.getModel().isVertex(cell)){
				if(cell.getEdgeCount() > 0){
					alert("该组件存在连线，不允许删除，请先删除所有连线！");
					return false;
				}else if(cell.getEdgeCount() > 0){
					alert("该组件存在连线，不允许删除，请先删除所有连线！");
					return false;
				}else{
					//如果节点下有子节点
					if(cell.getChildCount() > 0){
						var length = cell.getChildCount();
						for(var i = 0;i < length;i++){
							//如果子节点下有连线，提示不许删除
							if(cell.getChildAt(i).getEdgeCount() > 0){
								alert("该组件存在连线，不允许删除，请先删除所有连线！");
								return false;
							}
						}
					}
				}
				confirmStatus = this.confirm("您确定要删除吗？");
				//如果确认删除组件
				if(confirmStatus){
					//向后台发出请求进行删除
					var url = rootPath+'/business/com.airmdp.strategy.appframe.action.strategyComp.StrategyCompInstAction?action=removeStrategyCompInst&';
					$.ajax({
						url : url,
						async : false,
						type : "POST",
						data:{
							compInstId:	cell.compInstId
						},
						cache : false,
						success : function(response){
							if(eval("("+response+")").success){
								editor.execute("delete");
								writeDataToFile();
							}
						},
						error : function(response){
							error();
						}
					});
					
				}
			}
		});
	}
	
}

/**
 * 默认的节点
 * @param editor
 * @param tgtCltId 目标客户群id
 * @param testCltId 测试号码客户群id
 */
function addHomeNode(editor,tgtCltId,testCltId){
	var graph = editor.graph; 
	var url = rootPath+'/business/com.airmdp.strategy.appframe.action.strategyComp.StrategyCompInstAction?action=addStrategyCompInst&';
	$.ajax({
		url : url,
		method : "GET",
		data:{
			strategyId:	strategyId,
			activityId : activityId
		},
		cache : false,
		success : function(response){
			if(response!=null&&response!="{}"){
				var elementObj = eval("("+response+")");
				
				var parent = graph.getDefaultParent(); 
				var w = graph.container.offsetWidth; 
				//目标客户群
				var label = '<div class="client-opera"><h2 class="client-tit">目标客户群</h2>'+
				'<div class="client-cnt"><p>'+
				'<a class="no-config" onclick="showUserGroupCalcFromCts()">配置>></a></p></div></div>';
				var v1 = graph.insertVertex(parent, tgtCltId, label, w / 2 - 280, 20,
						231 ,101, 'fillColor=#fefefe;gradientColor=#fefefe;opacity=100;strokeColor=#fefefe;'); 
				v1.type = "root_target"; 
				v1.locked = "true"; 
				v1.name = elementObj.compInstDesc;
				
				//策略id、组件id
			    v1.strategyId = strategyId;
			    v1.inputItfInstId = "";
			    v1.setConnectable(false); 
			    v1.instId = "";
			    v1.compInstId = elementObj.strategyCompInstId;
			    v1.defId = "1";
			    v1.clientId = "";
			    v1.clientName = "";
				//目标客户群id
				targetGroupId = "";
				
			}
		},
		error : function(response){
			error();
		}
	});
		
}

///**
// * 默认的节点
// * @param editor
// * @param tgtCltId 目标客户群id
// * @param testCltId 测试号码客户群id
// */
//function addHomeNode(editor,tgtCltId,testCltId){
//	var graph = editor.graph; 
//	var url = "/strategycenter/strategyunit/componentcommoncfg/addCompInst";
//	$.ajax({
//		url : rootPath + url,
//		method : "GET",
//		data:{
//			compId : "1",
//			strategyId:	strategyId,
//			activityId : activityId,
//			strategyTestCltId : strategyTestCltId
//		},
//		cache : false,
//		success : function(response){
//			if(response!=null&&response!="[]"){
//				var elementObj = eval(response);
//				
//				var parent = graph.getDefaultParent(); 
//				var w = graph.container.offsetWidth; 
//				//目标客户群
//				var label = '<div class="client-unit hg35">'+
//				'<p>目标客户</p>'+
//				'</div>';
//				var v1 = graph.insertVertex(parent, tgtCltId, label, w / 2 - 280, 20,
//						150, 60, 'fillColor=#F1F1F1;strokeColor=#F1F1F1;gradientColor=#F1F1F1;'); 
//				v1.type = "root_target"; 
//				v1.locked = "true"; 
//				v1.name = elementObj[0].compInstDesc;
//				
//				//策略id、组件id
//			    v1.strategyId = strategyId;
//			    v1.inputItfInstId = "";
//			    v1.instId = elementObj[0].outputItfInstList[0].outputItfInstId;
//			    v1.compInstId = elementObj[0].compInstId;
//			    v1.defId = "1";
//			    v1.clientId = elementObj[0].outputItfInstList[0].clientId;
//			    v1.clientName = elementObj[0].outputItfInstList[0].clientName;
//				//目标客户群id
//				targetGroupId = elementObj[0].outputItfInstList[0].clientId;
//				//测试号码客户群
//				var label2 = '<div class="client-unit hg35">'+
//				'<p>测试号码<a style="margin-left:5px;" onclick="showTestNumberFromCts()" class="no-config">配置>></a></p>'+
//				'</div>';
//				var v2 = graph.insertVertex(parent, testCltId, label2, w / 2 - 30, 20,
//						150, 60, 'fillColor=#F1F1F1;strokeColor=#F1F1F1;gradientColor=#F1F1F1;'); 
//				v2.type = "root_test"; 
//				v2.locked = "true"; 
//				v2.name = "测试号码";
//				v2.clientId = testCltId;
//				//建立连线
//				var edge = graph.insertEdge(parent, "root_edge", "", v2, v1, null);
//				edge.locked = "true"; 
//			}
//		},
//		error : function(response){
//			error();
//		}
//	});
//	
//		
//}

// 配置样式
function configureStylesheet(graph)
{
	var style = new Object();
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	//是否圆角矩形
//			style[mxConstants.STYLE_ROUNDED] = true;
	style[mxConstants.STYLE_OPACITY] = '100';
	style[mxConstants.STYLE_FONTSIZE] = '12';
	style[mxConstants.STYLE_FONTSTYLE] = 0;
	style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
	style[mxConstants.STYLE_SHAPE] = 'label';
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#FFFF99';
	style[mxConstants.STYLE_STROKECOLOR] = '#5d65df';
	style[mxConstants.STYLE_FILLCOLOR] = '#FFFF99';
	//style[mxConstants.STYLE_SHADOW] = 'shadow';
	graph.getStylesheet().putDefaultVertexStyle(style);

	style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
	style[mxConstants.STYLE_FILLCOLOR] = '#FF9103';
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#F8C48B';
	style[mxConstants.STYLE_STROKECOLOR] = '#E86A00';
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	style[mxConstants.STYLE_ROUNDED] = true;
	style[mxConstants.STYLE_OPACITY] = '100';
	style[mxConstants.STYLE_STARTSIZE] = '30';
	style[mxConstants.STYLE_FONTSIZE] = '16';
	style[mxConstants.STYLE_FONTSTYLE] = 1;
	graph.getStylesheet().putCellStyle('group', style);
	
	style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
	style[mxConstants.STYLE_FONTCOLOR] = '#774400';
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_PERIMETER_SPACING] = '6';
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
	style[mxConstants.STYLE_FONTSIZE] = '10';
	style[mxConstants.STYLE_FONTSTYLE] = 2;
	style[mxConstants.STYLE_IMAGE_WIDTH] = '16';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '16';
	graph.getStylesheet().putCellStyle('port', style);
	
	// 修改默认连接线样式 changed by zhyl 20140102
	style = graph.getStylesheet().getDefaultEdgeStyle();
//			style[mxConstants.STYLE_ROUNDED] = true;
	style[mxConstants.STYLE_STROKEWIDTH] = 3;
	style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
	graph.alternateEdgeStyle = 'elbow=vertical';
	// 禁用以下几个为直线
	style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
};

// 在一个半透明的窗口中显示提示图标。
function setHints(editor){
	var hints = document.createElement('div');
	hints.style.position = 'absolute';
	hints.style.overflow = 'hidden';
	hints.style.width = '190px';
	hints.style.top = '205px';
	hints.style.height = '70px';
	hints.style.right = '0';
	
	hints.style.background = '#6E6262';
	hints.style.color = 'white';
	hints.style.fontFamily = 'Arial';
	hints.style.fontSize = '12px';
	hints.style.padding = '15px 0 15px 15px';

	mxUtils.setOpacity(hints, 90);
	mxUtils.writeln(hints, '请注意，策略改动会实时保存！');
	mxUtils.writeln(hints, '单击配置完成按钮确认提交该配置');
	
	/*var button_save = document.createElement('input');
	button_save.type = "button";
	button_save.value = "保存";
	button_save.className = "save-btn2";
	button_save.style.width = '83px';*/
	
	var button_confirm = document.createElement('input');
	button_confirm.type = "button";
	button_confirm.value = "配置完成";
	button_confirm.className = "pub-btn";
	button_confirm.style.width = '83px';
	
	var button_cancel = document.createElement('input');
	button_cancel.type = "button";
	button_cancel.value = "返回";
	button_cancel.className = "close-btn2";
	button_cancel.style.width = '83px';
	hints.appendChild(button_cancel);
	
	
	hints.appendChild(button_confirm);
	hints.appendChild(button_cancel);
	
	editor.addAction('confirm', function(editor, cell)
	{
		confirmMap();
	});
	mxEvent.addListener(button_confirm, 'click', function(evt)
	{
		editor.execute("confirm");
	});
	
	/*editor.addAction('save', function(editor, cell)
	{
		writeDataToFile(true);
		
	});
	mxEvent.addListener(button_save, 'click', function(evt)
	{
		editor.execute("save");
	});*/
	
	editor.addAction('cannel', function(editor, cell)
	{
		cannel();
	});
	mxEvent.addListener(button_cancel, 'click', function(evt)
	{
		editor.execute("cannel");
	});
	
	document.body.appendChild(hints);
}
//提交上线，待修改 2014年3月19日 17:25:30 zhoult
function confirmMap(){
	//检查策略相关的组件是否配置完成
	var url = "/athena/strategycenter/strategy/StrategyMapCfgController/checkStrategyIsComplete";
	$.ajax({
		url : rootPath + url,
		type : "post",
		dataType:"text",
		data : {
			strategyId:strategyId
		},
		cache : true,
		success : function(response){
			var response = eval("("+response+")");
			if(response.success == true){
				// 弹出"修改说明"页面
				strategyMdfComment(strategyId);//确定后在子页面中调用changeStrategyCfgState
//				var b = confirm("您是否要提交上线？");
//				if(b){
					//进行后续的操作
//					changeStrategyCfgState(strategyId);
//				}
				
			}else{
				if(response.message == "notcomplete"){
					alert("策略地图没有配置完成，请全部配置完毕后提交!");
				}else{
					alert("策略地图没有进行配置，请您配置完毕后提交!");
				}
			}
		},
		error : function(response){
			error();
		}
	});
}

/**
 * 提交上线或启动 提示添加修改说明
**/
function strategyMdfComment(strategyId){
	var url = "strategycenter/strategy/strategyMdfComment.jsp?flag=summit&strategyId="+strategyId;
	$(window.parent.document.body).find("#popIframe").attr("src",url);
	$(window.parent.document.body).find("#popIframe").load(function() {
		showIframePop();
	});
}

function changeStrategyCfgState(id){
	var strategyRunStatusTmp = 4;
	Ext.Ajax.request({
		url: dazzleQuery + "/queryBeans",
		method: "POST",
		async : false,
		params: {
			queryId:"strategy.queryStrategyById",
			dataType:"1",
			strategyId : id
		},
		success: function (response, options) {
			if(response.responseText != null && response.responseText != 'undefined' && response.responseText != '') {
				var response = eval("("+response.responseText+")");
				if(response[0].strategyRunStatus == null || response[0].strategyRunStatus == 0 || response[0].strategyRunStatus == '0' || response[0].strategyRunStatus == '3') {
					strategyRunStatusTmp = 3;
				}
			}
		},
		failure : function() {
			alert("操作失败！");
		}
	});	

	// 组件名称只有修改的情况发生
	Ext.Ajax.request({
		url: rootPath + "/athena/strategycenter/strategy/StrategyMapCfgController/modifyStrategyMap",
		method : "POST",
		params : {
			strategyId : id,
			strategyRunStatus : strategyRunStatusTmp,//策略运行状态：1-启用 2-停用 3-待提交 4-已修改
			strategyCfgStatus : '2',//1配置中 2 配置完成
			activityId : activityId,
			strategyName : '',
			strategyDesc : '',
			operId : operId
		},
		success: function ( response, options ) {
			var response = eval("("+response.responseText+")");
			if(response.success){
				alert("策略配置完成");
				window.location.href = encodeURI(encodeURI(rootUrl+"/page/strategycenter/strategy/strategyMapCfgList.jsp?activityId="
						+ activityId + "&activityEndDate=" + activityEndDate + "&activityName="+ activityName + "&activityStartDate=" + activityStartDate ));
//				history.go(-1);
			}else{
				alert("操作失败！");
			}
		},
		failure : function() {
			error();
		}
	});
}
//取消，返回上一界面
function cannel(){
	window.location.href=encodeURI(encodeURI(rootUrl+"/page/strategycenter/strategy/strategyMapCfgList.jsp?activityId="
			+ activityId + "&activityEndDate=" + activityEndDate + "&activityName="+ activityName + "&activityStartDate=" + activityStartDate ));
}

/**
 * 写数据
 */
function writeDataToFile(isNotice){
	var enc = new mxCodec(mxUtils.createXmlDocument());
	var node = enc.encode(editor.graph.getModel());
	var flag ;
	if(isNotice != null){
		if(isNotice){
			flag = "save";
		}
	}else{
		flag = "init";
	}
	var url = rootPath+'/business/com.airmdp.strategy.appframe.action.strategy.StrategyAction?action=writeMapDataToFile&';
	// 组件名称只有修改的情况发生
	Ext.Ajax.request({
		url: url,
		method : "POST",
		params : {
			strategyId:strategyId,
			xmlStr : encodeURIComponent(mxUtils.getPrettyXml(node)),
			flag : flag
		},
		success: function ( response, options ) {
			var response=eval("("+response.responseText+")");
			if(isNotice != null){
				if(response.success){
					alert("保存策略地图数据成功！")
				}else{
					alert("保存策略地图数据失败！")
				}
			}
		},
		failure : function(response) {
		}
	});
}

/**
 * 设置cell的label
 * @param {} id 所点击对象的id
 * @param {} type 元件类型
 * @param {} selectObj 所选的内容
 */
function setCellLabel(id,type,selectObj){
	var model = editor.graph.getModel();
	var mxcell = editor.graph.getSelectionCell();
	var returnValue = "";
	var returnKey = "";
	for ( var key in selectObj ){
		returnValue += selectObj[key]+",";
		returnKey += key+",";
	}
	if(returnValue == ""){
		returnValue = "待配置>>";
	}else{
		returnValue = returnValue.substring(0,returnValue.length - 1);
		returnKey = returnKey.substring(0, returnKey.length-1);
	}
	
	var obj = null;
	if (window.document.getElementById(id)) {
		
		obj = window.document.getElementById(id);
	}
	
	var label = "";
	var div;
	if(returnValue && returnValue.length > 0){
		if(returnValue == "待配置>>"){
			obj.className = "no-config";
		}else{
			obj.className = "fsh-txt";
		}
		
		//如果是title,则为修改名称
		if(type == "title"){
			var value = returnValue.replace(/,/g," , ");
			if(value.length > 7){
				obj.innerHTML =  value.substring(0,7)+" ...";
			}else{
				obj.innerHTML =  value;
			}
			obj.title = value;
			//如果是改名称，层级有不同
			div = obj.parentElement.parentElement.parentElement;
		}
		//如果是执行规则的话情况比较特殊,需要处理多个元素
		else if(type == "pushRule" || type == "eventTigger" || type == "prodSubRule" || type == "smsOprPosCompRule" || type == "oppPositionRule"){
			var value = "已配置";
			obj.className = "fsh-txt2";
			obj.innerHTML = value;
			obj.title = value;
			//配置完成
			div = obj.parentElement.parentElement.parentElement.parentElement;
			//更改配置完成样式
			div.className = "blue-unit";
			div.childNodes[0].childNodes[0].className = "status-configed";
			div.childNodes[0].childNodes[0].innerHTML = "配置完成";
		}else{
			var value = returnValue.replace(/,/g," , ");
			if(value.length > 22){
				obj.innerHTML =  value.substring(0,22)+" ...";
			}else{
				obj.innerHTML =  value;
			}
			obj.title = value;
			//配置完成
			div = obj.parentElement.parentElement.parentElement.parentElement;
			
			var rule_id = "执行规则" +"_"+ id.split("_")[1];
			var ruleObj = window.document.getElementById(rule_id);
			ruleObj.innerHTML = "待配置>>";
			ruleObj.className = "no-config";
			//更改配置完成样式
			div.className = "green-unit";
			div.childNodes[0].childNodes[0].className = "status-configing";
			div.childNodes[0].childNodes[0].innerHTML = "正在配置";
		}
		
		
		label = div.outerHTML;
		label = label.replace(/[\r\n]/g,"")//去掉回车换行
		model.beginUpdate();
		try
		{
			var layout = new mxGraphLayout(editor.graph);
			var parent = editor.graph.getDefaultParent();
			var children = editor.graph.getChildCells(mxcell);
			if(mxcell != null){
				editor.graph.removeCells(children);
			}
			if(type='busiopp'){
				var url = rootPath+'/business/com.airmdp.strategy.appframe.action.strategyunit.OprPosFeedBackSTAction?action=queryFeedBackST&';
				$.ajax({
					url : url,
					method : "GET",
					data : {
						oprPosCode : returnKey
					},
					cache : false,
					async : false,
					success : function(response){
						if(response!=null&&response!="[]"){
							var obj = eval("("+response+")");
							var children = editor.graph.getChildCells(mxcell);
							editor.graph.removeCells(children);
							var childrenColorArray = new Array("#fd6611","#385492","#57a308","#385492","#57a308");
							var y = mxcell.geometry.height*0.80	;
							if(obj.length > 0 && obj.length <= 2){
								for(var i = 0;i < obj.length; i++){
									var x = 75;
									if(i > 0){
										x = 180;
									}
									var port = editor.graph.insertVertex(mxcell, null, obj[i].feedBackStName, x, y, 94, 31,('fillColor=' + childrenColorArray[i] + ';strokeColor=' + childrenColorArray[i] + ';gradientColor=' + childrenColorArray[i] + ';fontColor=#ffffff;'));
									port.locked = "true";
									//三类：配置、输入、输出
									port.type = "out";
									port.compInstId = mxcell.compInstId;
									port.clientId = obj[i].feedBackStId;
									port.clientName = obj[i].feedBackStName;
								}
							}else if(obj.length > 2 && obj.length < 4){
								for(var i = 0;i < obj.length; i++){
									var port = editor.graph.insertVertex(mxcell, null, obj[i].feedBackStName, (i * 94 + (i + 1) * 15), y, 94, 31,('fillColor=' + childrenColorArray[i] + ';strokeColor=' + childrenColorArray[i] + ';gradientColor=' + childrenColorArray[i] + ';fontColor=#ffffff;'));
									port.locked = "true";
									//三类：配置、输入、输出
									port.type = "out";
									port.compInstId = mxcell.compInstId;
									port.clientId = obj[i].feedBackStId;
									port.clientName = obj[i].feedBackStName;
								}
							}else if(obj.length > 3){
								childrenColorArray = new Array("#fd6611","#57a308","#57a308","#385492","#385492");
								for(var i = 0;i < obj.length; i++){
									var port = editor.graph.insertVertex(mxcell, null, obj[i].feedBackStName, (i * 53 + (i + 1) * 15), y, 55, 31,('fillColor=' + childrenColorArray[i] + ';strokeColor=' + childrenColorArray[i] + ';gradientColor=' + childrenColorArray[i] + ';fontColor=#ffffff;'));
									port.locked = "true";
									//三类：配置、输入、输出
									port.type = "out";
									port.compInstId = mxcell.compInstId;
									port.clientId = obj[i].feedBackStId;
									port.clientName = obj[i].feedBackStName;
								}
							}
						}
					},
					error : function(response){
						error();
					}
				});
			}
			mxcell.setValue(label);
			// Executes the layout
			layout.execute(parent);
		}
		finally
		{
			model.endUpdate();
		}
	}
	
	writeDataToFile();

}

//如果规则里提供了删除配置元件的规则  type:要删除的类型
function setCellLabelForDeleteCfg(id,ruletype,selectObj,cfgtype){
	var model = editor.graph.getModel();
	var mxcell = editor.graph.getSelectionCell();
	
	var returnValue = "";
	for ( var key in selectObj ){
		returnValue += selectObj[key]+","
	}
	returnValue = returnValue.substring(0,returnValue.length - 1);
	
	var label = "";
	//如果是产品
	if(cfgtype == "product"){
		var newid = "产品_"+id.split("_")[1];
		var obj = null;
		if (window.document.getElementById(newid)) {
			obj = window.document.getElementById(newid);
			
			var value = returnValue.replace(/,/g," , ");
			if(value.length > 22){
				obj.innerHTML =  value.substring(0,22)+" ...";
			}else{
				//如果没有剩下的产品，也就是都删除了
				if(returnValue == ""){
					obj.innerHTML = "待配置>>";
					obj.className = "no-config";
				}else{
					obj.innerHTML =  value;
				}
			}
			obj.title = value;
			var div = obj.parentElement.parentElement.parentElement.parentElement;
			label = div.outerHTML;
			label = label.replace(/[\r\n]/g,"")//去掉回车换行
			model.beginUpdate();
			try
			{
				var layout = new mxGraphLayout(editor.graph);
				var parent = editor.graph.getDefaultParent();
				
				mxcell.setValue(label);
				// Executes the layout
				layout.execute(parent);
			}
			finally
			{
				model.endUpdate();
			}
		}
	}
}
function deleteOperationCell(id,returnJson){
	var graph = editor.graph;
	var model = graph.getModel();
	var cell = model.getCell(id);
	var newObj = new Object();
	//删除原来的分解图标
	var children = graph.getChildCells(cell);
	var clientIds = "";
	for(var x = 0; x < returnJson.length; x++){
		for(var i = 0; i < children.length; i++){
			if(returnJson[x].groupId == children[i].clientId){
				clientIds += children[i].clientId+",";
			}
		}
	}
	clientIds = clientIds.substring(0,clientIds.length - 1);
	setOperationCellLabel(cell,returnJson,clientIds);
}
/**
 * 运算组件回填方法
 * @param id 组件id
 * @param returnJson 返回值
 */
function setOperationCellLabel(cell,returnValue,clientIds){
	var graph = editor.graph;
	var model = graph.getModel();
	//根据返回的id获取cell对象
//	var cell = model.getCell(id);
	var compInstId = cell.compInstId;
	//这里弹出窗口
//	var returnValue = eval("("+returnJson+")");
	//拼实例化输出组件的json
	var addOutputParamJson = "";
	
	//如果返回的对象长度大于0
	if(returnValue.length > 0)
	{
		try
		{
			graph.getModel().beginUpdate();
			
			var cell = graph.getSelectionCell();
			//连线的目标组件临时变量
			var targetExist = new Array();
			var cellExistClientIds = new Array();
			var cellInstIds = new Array();
			var cellNameShowIds = new Array();
			var cellNames = new Array();
			var edgeExistInstIds = new Array();
			//拿到组件下所有的输出组件,保存已存在的组件的连线数据 2014年4月4日 14:08:09 
			var children = graph.getChildCells(cell);
			for (var i = 0; i < children.length; i++) {
				children[i].locked = "false";
				cellExistClientIds[i] = children[i].clientId;// 客户群ID
				cellInstIds[i] = children[i].instId;// 接口ID
				cellNameShowIds[i] = children[i].clientNameShow;// 客户群名称
				cellNames[i] = children[i].clientName;
				targetExist[i] = new Array();
				edgeExistInstIds[i] = new Array();
				
				/////////////////////////////////////////////////
				//取出原来存在，但是被删除的客户群 modified at 2014-06-19 13:47:16 by zhoult 
				var isDelete = true;
				for ( var x = 0; x < returnValue.length; x++) {
					if(children[i].clientId == returnValue[x].groupId){
						isDelete = false;
						break;
					}
				}
				//该组件所有连线
				var count = children[i].getEdgeCount();
				for(var j = 0; j < count; j++){
					targetExist[i][j] = children[i].getEdgeAt(j).target;// 已存在组件的目标连线
					edgeExistInstIds[i][j] = children[i].getEdgeAt(j).itfInstDrctId;
					//如果已经删除,其连线对应连入的组件变为待配置  modified at 2014-06-19 13:47:16 by zhoult
					if(isDelete){
						backToNoComplete(children[i].getEdgeAt(j));
					}
				}
			}
			//进行删除操作
			if(cell != null){
				graph.removeCells(children);
			}
			
			//调整到标准宽、位置
			cell.geometry.width = 231;
			
			//调整位置
			var x = cell.geometry.width/12;
			var y = cell.geometry.height/4*3 - 12;
			var width = cell.geometry.width;
			var height = cell.geometry.height;
			if(returnValue.length > 2){
				cell.geometry.width = width * returnValue.length / 2;
			}
			
			//获取窗口关闭时返回的值，根据值创建子元件
			var addWidth = 0;
			
			var paramJson = "[";
			for(var j = 0; j < returnValue.length; j++){
				var b = true;
				if(returnValue[j].groupId == "undefined"){
					break;
				}

				//新增完毕后处理前台
				var thisWidth = width/3;
				if(returnValue[j].length > 5){
					thisWidth = thisWidth * returnValue[j].groupName.length / 5;
					cell.geometry.width += (thisWidth -  width/3);
				}
				var label_child1 = '<i>'+cutstr(returnValue[j].groupName,8)+'</i>';
				var child1 = graph.insertVertex(cell, "group_split_" + (j + 1),label_child1 , 
						x * 6 * j + x + addWidth, y, thisWidth, height/4,
						'fillColor=#fd6611;strokeColor=#fd6611;gradientColor=#fd6611;fontColor=#ffffff');
				child1.locked = "true";
				addWidth += (thisWidth -  width/3);
				//客户群Id和名称
				child1.clientId = returnValue[j].groupId;
				child1.clientName = returnValue[j].groupName;
				child1.type = "out";
				child1.compInstId = cell.compInstId;
				
				
				//判断是否存在一样的客户群id,重置组件，同时属性恢复
				for(var k = 0; k < cellExistClientIds.length; k++){
					if(cellExistClientIds[k] == returnValue[j].groupId){
						b = false;
						child1.instId = cellInstIds[k];
						child1.clientNameShow = cellNameShowIds[k];
						for ( var i = 0; i < targetExist[k].length; i++) {
							//把连线重新设置上
							var newEdge = graph.insertEdge(cell,null, "",child1,targetExist[k][i]);
							//将这根线的实例id代入
							newEdge.itfInstDrctId = edgeExistInstIds[k][i];
//							//判断如果名字不同 改变后台数据库的值 2014年6月25日 13:06:18
//							if(cellNames[k] != returnValue[j].groupName){
//								//并且更新到数据库中 
//								$.ajax({
//									url : rootPath + "/strategycenter/strategyunit/componentcommoncfg/changeInputAndOutputClientInfo",
//									type : "POST",
//									data : {
//										sourceCompInstId : cell.compInstId,
//										targetCompInstId : targetExist[k][i].instId,
//										clientName : encodeURIComponent(returnValue[j].groupName),
//										clientNameShow : encodeURIComponent(returnValue[j].groupName + "("+child1.parent.name+"["+child1.parent.instId+"])"),
//										clientId : returnValue[j].groupId
//									},
//									async : false,
//									cache : false,
//									success : function(response){
//									},
//									error : function(response){
//										error();
//									}
//								});
//							}
						}
						//判断如果名字不同 改变前台组件的属性 2014年6月25日 13:06:18
//						if(cellNames[k] != returnValue[j].groupName){
//							child1.clientNameShow = returnValue[j].groupName + "("+child1.parent.name+"["+child1.parent.instId+"])";
//
//							//并且更新到数据库中 
//							$.ajax({
//								url : rootPath + "/strategycenter/strategyunit/componentcommoncfg/changeOutputClientInfo",
//								type : "POST",
//								data : {
//									compInstId : cell.compInstId,
//									clientName : encodeURIComponent(returnValue[j].groupName),
//									clientNameShow : encodeURIComponent(returnValue[j].groupName + "("+child1.parent.name+"["+child1.parent.instId+"])"),
//									clientId : returnValue[j].groupId
//								},
//								async : false,
//								cache : false,
//								success : function(response){
//								},
//								error : function(response){
//									error();
//								}
//							});
//						
//						}
					}
				}
				
				//如果不是原来就有的节点
//				if(b){
//					var url = "/strategycenter/strategyunit/componentcommoncfg/addUserGroupCalcOutItfInst";
//					$.ajax({
//						url : rootPath + url,
//						type : "POST",
//						data : {
//							compInstId : cell.compInstId,
//							clientId : returnValue[j].groupId,
//							clientName : encodeURIComponent(returnValue[j].groupName)
//						},
//						async : false,
//						cache : false,
//						success : function(response){
//							if(response!=null&&response!="[]"){
//								var response = eval("("+response+")");
//								child1.instId = response.id;
//								child1.clientNameShow = response.clientName;
////								alert(response.clientName);
//							}
//						},
//						error : function(response){
//							error();
//						}
//					});
//				}
			}
			
			var newLabel ='<div class="client-opera"  style="width:'+(cell.geometry.width)+'px;"><h2 class="client-tit">目标客户群</h2>'+
			'<div class="client-cnt"><p><span>客户群：</span>'+
			'<a class="no-config" onclick="showUserGroupCalcFromCts()">配置>></a></p></div></div>';
			cell.setValue(newLabel);
		}finally
		{
			graph.getModel().endUpdate();
		}
	}else if(returnValue.length == 0){
		try
		{
			graph.getModel().beginUpdate();
			
			var cell = graph.getSelectionCell();
			//拿到组件下所有的输出组件,保存已存在的组件的连线数据 2014年4月4日 14:08:09 
			var children = graph.getChildCells(cell);
			//进行删除操作
			if(cell != null){
				for (var i = 0; i < children.length; i++) {
					children[i].locked = "false";
					//将组件置为  待配置 状态 2014年6月19日 12:12:39 zhoult
					//该组件所有连线
					var count = children[i].getEdgeCount();
					for(var j = 0; j < count; j++){
						//如果已经删除,其连线对应连入的组件变为待配置  modified at 2014-06-19 13:47:16 by zhoult
						backToNoComplete(children[i].getEdgeAt(j));
					}
				}
				graph.removeCells(children);
			}
		}finally
		{
			graph.getModel().endUpdate();
		}
	}
}
//将组件置为  待配置 状态
function backToNoComplete(cell){
	var graph = editor.graph;
	var model = graph.getModel();
	//如果不是运算组件，得修改配置状态 暂时去除
//	if(cell.target.type  != '2'){
		var start = cell.target.value.indexOf("执行规则_");
		var id = cell.target.value.substring(start,start+18);
		var obj = null;
		if (window.document.getElementById(id)) {
			obj = window.document.getElementById(id);
		}
		obj.innerHTML = "待配置>>";
		obj.className = "no-config";
		//更新地图数据
		var div = obj.parentElement.parentElement.parentElement.parentElement;
		
		//更改配置完成样式
		div.className = "green-unit";
		div.childNodes[0].childNodes[0].className = "status-configing";
		div.childNodes[0].childNodes[0].innerHTML = "正在配置";
		var label = div.outerHTML;
		label = label.replace(/[\r\n]/g,"")//去掉回车换行

		model.beginUpdate();
		try
		{
			var layout = new mxGraphLayout(editor.graph);
			var parent = editor.graph.getDefaultParent();
			
			cell.target.setValue(label);
			// Executes the layout
			layout.execute(parent);
		}
		finally
		{
			model.endUpdate();
		}
		// 修改组件实例表的状态
		var url = rootPath+'/business/com.airmdp.strategy.appframe.action.strategyComp.StrategyCompInstAction?action=modifyCompInstCfgStatus&';
		// 组件名称只有修改的情况发生
		$.ajax({
			url : url,
			async : false,
			type : "POST",
			data:{
				compInstId : cell.target.instId
			},
			cache : false,
			success : function(response){
				if(eval("("+response+")").success){
				}
			},
			error : function(response){
				error();
			}
		});
//	}
}
//展示标签系统的测试号码界面 2014年3月29日 15:12:41 zhoult
function showTestNumberFromCts(){
	var cell = editor.graph.getSelectionCell();
	var cts_url = ctsUrl + "page/usergroup/config/group/testPhoneNumber.jsp?id="+cell.id+"&groupId="+strategyTestCltId;
	
	//这里弹出窗口
	$(window.parent.document.body).find("#popIframe").attr("src",cts_url);
	$(window.parent.document.body).find("#popIframe").load(function(){});
	

}
function showUserGroupCalcFromCts(){
	var graph = editor.graph;
	var cell = editor.graph.getSelectionCell();
	
	//三个必备参数
	//1来自客户群json
	var sourceGroups ="";
	//2已配置客户群json
	var configuredGroups = "";
	
//	var rootCell = editor.graph.getModel().getCell("10000");
//	if(targetGroupId == "" && (rootCell != null && rootCell.clientId != null)){
//		targetGroupId = rootCell.clientId;
//	}
	var edges = graph.getEdges(cell);
	sourceGroups = "[";
	for(var i = 0; i < edges.length; i++){
		if(edges[i].source != cell){
			var clientNameShow = "";
			if(edges[i].source.parent.type == "root_target" || edges[i].source.parent.type == "2" ){
				clientNameShow = edges[i].source.clientNameShow;
			}else{
				clientNameShow = edges[i].source.clientName;
			}
			sourceGroups +='{groupId:"'+edges[i].source.clientId+'",groupName:"'+edges[i].source.clientName+'",groupNameShow:"'+clientNameShow+'"}';
		}
		if(i < edges.length -1 ){
			sourceGroups += ',';
		}
	}
	sourceGroups+="]";
	//获取当前节点子节点的信息，组织已配置json
	configuredGroups = "[";
	
	var targetInstId = "";
	var children = graph.getChildCells(cell);
	for(var i = 0; i < children.length; i++){
		configuredGroups += '{groupId:"'+children[i].clientId+'",groupName:"'+children[i].clientName+'"}';
		if(i < children.length -1 ){
			configuredGroups += ',';
		}
		
		//计算出目标客户群组件的所有连出的组件实例id 2014年8月21日 18:18:25 zhoult
		var count = children[i].getEdgeCount();
		for(var j = 0; j < count; j++){
			var edge = children[i].getEdgeAt(j);
			targetInstId += (edge.target.compInstId + ",");
		}
		
		
	}
	configuredGroups += "]";
	if(targetInstId != null && targetInstId.length > 0){
		targetInstId = targetInstId.substring(0,targetInstId.length - 1);
	}

	//	"?busiSys="+11+"&extOpId=ADMIN&loginToken="+response.signtrue+
	//"&openFlag=m&testGroupId="+strategyTestCltId+"&targetGroupId="+"&id="+cell.id+"&sourceGroups="+sourceGroups+
	//"&configuredGroups="+configuredGroups+"&expiredDate="+activityEndDate;
	//cts_url = encodeURI(encodeURI(cts_url));
	
	
	//document.getElementById('busiSys').value = "11";
	//document.getElementById('extOpId').value = "ADMIN";
	//document.getElementById('loginToken').value = response.signtrue;
	document.getElementById('openFlag').value = "m";
	document.getElementById('id').value = cell.id;
	document.getElementById('sourceGroups').value = sourceGroups;
	document.getElementById('configuredGroups').value = configuredGroups;
	document.getElementById('expiredDate').value = activityEndDate;
	cts_url = rootPath + "/page/tag/group/userGroupSel.jsp?compId="+cell.id+"&configuredGroups="+configuredGroups;
	
	document.getElementById("myform").action = cts_url;
	//弹出页面
	$(window.parent.document.body).find("#popIframe").attr("src",cts_url);
	document.getElementById('myform').submit();
	$(window.parent.document.body).find("#popIframe").load(function(){showIframePop();});
	//2014年8月21日 17:11:49 增加了对组件实例运行状态的校验，如果组件实例是处理中那么就给出提示   修改人 zhoult
//	$.ajax({
//		url : rootPath + "/strategycenter/strategyunit/componentcommoncfg/select4WConfigCountByCompInstId",
//		type : "post",
//		dataType:"text",
//		data : {
//			compInstId:"",
//			cfgItfId : "", //新增参数配置定义id
//			targetInstId : targetInstId,
//			type : "group" //代表配置类型的校验
//		},
//		cache : true,
//		success : function(response){
//			var response = eval("("+response+")");
//			if(response.success == true){
//				/*//远程连通标签系统获得登陆信令成功后跳转客户群计算页面
//				var cts_url = '';
//				Ext.Ajax.request({
//					url: rootPath + "/athena/strategycenter/strategy/StrategyMapCfgController/getCstRemoteLogonSignature",
//					method : "GET",
//					async:false,
//					params : {
//						busiSys : 11,//外围系统ID,需要在标签系统注册
//						extOpId : "ADMIN"
//					},
//					success: function ( response, options ) {
//						var response = eval("("+response.responseText+")");
//						//如果成功，返回；失败的话，return
//						if(response.success){*/
////							var cts_url = rootPath + "/page/tag/group/userGroupSel.jsp";
//							//2014年6月26日 15:58:26
////							var html = '<form action="'+cts_url+'" method="post" target="popIframe" id="postData_form">'+  
////						           '<input id="busiSys" name="busiSys" type="hidden" value="11"/>'+  
////						           '<input id="extOpId" name="extOpId" type="hidden" value="ADMIN"/>'+  
////						           '<input id="loginToken" name="loginToken" type="hidden" value="response.signtrue"/>'+  
////						           '<input id="openFlag" name="openFlag" type="hidden" value="m"/>'+  
////						           '<input id="testGroupId" name="testGroupId" type="hidden" value="'+strategyTestCltId+'"/>'+  
////						           '<input id="targetGroupId" name="targetGroupId" type="hidden" value="'+targetGroupId+'"/>'+  
////						           '<input id="id" name="id" type="hidden" value="'+cell.id+'"/>'+  
////						           '<input id="sourceGroups" name="sourceGroups" type="hidden" value="'+sourceGroups+'"/>'+  
////						           '<input id="configuredGroups" name="configuredGroups" type="hidden" value="'+configuredGroups+'"/>'+ 
////						           '<input id="expiredDate" name="expiredDate" type="hidden" value="'+activityEndDate+'"/>'+ 
////					           '</form>';  
////							
////							window.parent.document.getElementById("popIframe").contentWindow.document.wirte(html);
////							window.parent.document.getElementById("popIframe").contentWindow.document.getElementById('postData_form').submit();  
//							//2014年6月26日 15:58:34
//							
//							
//							 //根据登录信令和用户id和外围系统id跳转到客户群计算页面
//				            cts_url = rootPath + "/page/tag/group/userGroupSel.jsp" ;
////				            		"?busiSys="+11+"&extOpId=ADMIN&loginToken="+response.signtrue+
////				              "&openFlag=m&testGroupId="+strategyTestCltId+"&targetGroupId="+"&id="+cell.id+"&sourceGroups="+sourceGroups+
////							"&configuredGroups="+configuredGroups+"&expiredDate="+activityEndDate;
////							cts_url = encodeURI(encodeURI(cts_url));
//							
//				            
////				            document.getElementById('busiSys').value = "11";
////				            document.getElementById('extOpId').value = "ADMIN";
////				            document.getElementById('loginToken').value = response.signtrue;
//				            document.getElementById('openFlag').value = "m";
//				            document.getElementById('id').value = cell.id;
//				            document.getElementById('sourceGroups').value = sourceGroups;
//				            document.getElementById('configuredGroups').value = configuredGroups;
//				            document.getElementById('expiredDate').value = activityEndDate;
//				            
//							document.getElementById("myform").action = rootPath + "/page/tag/group/userGroupSel.jsp";
//							//弹出页面
//							$(window.parent.document.body).find("#popIframe").attr("src",cts_url);
//							document.getElementById('myform').submit();
//							$(window.parent.document.body).find("#popIframe").load(function(){showIframePop();});
//							
//						/*}else{
//							alert("您没有权限使用标签系统客户群计算页面");
//							//出错则跳转到运营策略中心出错页面
//							//cts_url = rootPath+"/page/common/ctsConnectionError.jsp"
//						}
//					},
//					failure : function() {
//						alert("您没有权限使用标签系统客户群计算页面");
//						//出错则跳转到运营策略中心出错页面
//						//cts_url = rootPath+"/page/common/ctsConnectionError.jsp"
//					}
//				});*/
//			}else if(response.success == false && response.message == "isRunning"){
//				alert("与目标客户群连接的组件中存在[处理中]状态的组件，请稍候再试！");
//			}
//		},
//		error : function(response){
//			error();
//		}
//	});
		


}


//修改组件运行状态
function modifyCompInstRunState(state,compInstId,id){
	var model = editor.graph.getModel();
	var graph = editor.graph;
	var mxcell = editor.graph.getSelectionCell();
	
	var b = confirm("是否要"+(state==2?"启用":"停用")+"该组件吗？");
	if(!b){
		return false;
	}
	var url = "/strategycenter/strategyunit/componentcommoncfg/modifyCompInstRunStatus";
	// 组件名称只有修改的情况发生
	Ext.Ajax.request({
		url: rootPath + url,
		method : "GET",
		params : {
			compInstId : compInstId,
			id : id
		},
		success: function ( response, options ) {
			if(response!=null&&response!="[]"){
				var response = eval("("+response.responseText+")");
				//如果成功，返回；失败的话，return
				if(response.success){
					var obj = null;
					if (window.document.getElementById(response.id)) {
						obj = window.document.getElementById(response.id);
					}
					
					//组件实例启停状态：1-已启动 2-已停止
					if(response.compInstRunStatus == 1){
						alert("启用成功！");
						obj.className = "i-stop-comp";
						obj.title = "目前是启用状态，点击停用";
					}else{
						alert("停用成功！");
						obj.className = "i-start-comp";
						obj.title = "目前是停用状态，点击启用";
					}
					//更新地图数据
					var div = obj.parentElement.parentElement.parentElement;
					var label = div.outerHTML;
					label = label.replace(/[\r\n]/g,"");//去掉回车换行
					//替换这里的目的是修正状态方法的友好提示，是否启用/停用的提示
					var before = "modifyCompInstRunState(" + (response.compInstRunStatus == 1 ?2:1);
					var after = "modifyCompInstRunState(" + response.compInstRunStatus;
					label = label.replace(before,after);
					
					div.parentElement.innerHTML = label;
					model.beginUpdate();
					try
					{
						var layout = new mxGraphLayout(editor.graph);
						var parent = editor.graph.getDefaultParent();
						mxcell.setValue(label);
						// Executes the layout
						layout.execute(parent);
					}
					finally
					{
						model.endUpdate();
					}
					writeDataToFile();
				}else if(response.success == false && response.message == "error"){
					error();
				}
			}
		},
		failure : function() {
		}
	});
}