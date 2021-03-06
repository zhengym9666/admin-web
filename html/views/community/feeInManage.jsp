<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <script type="text/javascript">
        var rootPath = "<%=request.getContextPath()%>";
    </script>
    <title>贵州短信调度平台--系统参数配置</title>
    <!---<<<<   字体图标  >>>>-->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/lib/font/iconfont.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/lib/css/normal.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/current.css" />

    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/ui.css" />
    <!---<<<<   表格相关CSS   >>>>-->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/table.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/strateMap.css" />

	<style>
		.ui-down{
			background:url(./././theme/img/down.png) no-repeat;
			background-size:11px;
			background-position-x:217px;
			background-position-y:13px;
			cursor:pointer
		}
	</style>
	
</head>
<body>
<div class="viewFramework-index-body">
    <!---<<<<  标题    >>>>-->
    <span class="viewFramework-index-title">管理会费收入</span>
    <button type="button" class="iconTextBtn-import rightTopBtn"  id="add-alarm-btn" onclick="feeInManage.addOtherFee()"><i class="iconfont icon-add"></i>添加其他收入</button>


    <!---<<<<  tabs    >>>>-->
    <div class="viewFramework-index-tabs ">
        <!---<<<<  tabs div    >>>>-->
        <div class="tabs_box">
            <!---<<<<  tabs div 外层    >>>>-->
            <div class="tabs-wapper open" >
                <div  class="top-part" >
                    <div >


                        <li  class="form-items ">
                            <div class="form-left" >
                                <span>学号：</span>
                            </div>
                            <div class="form-right">
                                <!-- <input type="text" id="spCode"/> -->
                                <input type="text" id="stuNum"/>
                            </div>
                        </li>
                        <li  class="form-items ">
                            <div class="form-left" >
                                <span>姓名：</span>
                            </div>
                            <div class="form-right">
                                <!-- <input type="text" id="spCode"/> -->
                                <input type="text" id="stuName"/>
                            </div>
                        </li>
                        <li class="form-items" clear-fixed>
                            <div class="form-btns top-part-btn" >
                                <button class="iconTextBtn-import" onclick="SmsSysParamInfo.querySysParamInfos()"><i class="iconfont icon-search"></i>查询</button>
                                <button class="TextBtn reset" type="button" onclick="SmsSysParamInfo.resert()">重置</button>
                            </div>
                        </li>
                    </div>

                    <!---<<<<  tabs div 主体   >>>>-->
    				  <div class="layui-col-md12">
		              <div class="layui-card">
		                <!-- <div class="layui-card-header">数据统计</div> -->
		                <div class="layui-card-body">
		                  <table id="demo_hash" lay-filter="test_hash"></table>
		                </div>
		              </div>
            		</div>
                </div>
            </div>
        </div>
    </div>








    <!---<<<<   jQuery  >>>>-->
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/jQuery/jquery.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/js/current.js"></script>
    <%-- 	<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/highcharts.js"></script> --%>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/echarts-all.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/jquery.twbsPagination.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/ajaxmultifileupload.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/operationTips.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/pagination.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/rightPopWindow.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/My97DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/popIframe.js"></script>
    <script type="text/javascript" src="js/feeInManage.js"></script>
    <script src="https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js"></script>
	<script>
  layui.config({
    base: '/src/js/'
  }).use(['jquery', 'mockjs', 'table'], function() {
	    var $ = layui.jquery,
	      layer = layui.layer,
	      table = layui.table;
	  
	    //第一个实例
	    table.render({
	      method: 'post',
	      done: function() {
	        $('#demo_hash').next().css('height', 'auto');
	      },
	      limit: 10,
	      elem: '#demo_hash',
	      id:'contenttable',
	      height: 420,
	      url: rootPath+'/feeBudgetManage/queryAllFeeCase.action', //数据接口
	      page: true, //开启分页
	      cols: [
	        [ //表头
	          {
	            field: 'num',
	            title: '学号',
	            width: 160
	          }, {
	            field: 'name',
	            title: '姓名',
	            width: 160
	          }, {
	            field: 'department',
	            title: '所在部门',
	            width:160
	          }, {
	            field: 'everyfee',
	            title: '会费金额',
	            width: 160
		      },{
	            field: 'isfee',
	            title: '交会费情况',
	            width: 160,
	            sort:true
	          },{
	            field: 'operation',
	            title: '操作',
	            width: 136
		      }
	        ]
	      ]
	    });
  });
	</script>
	<jsp:include page="feeInManageRightWindow.jsp"></jsp:include>
   



</body>
</html>