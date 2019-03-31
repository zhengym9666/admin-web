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
		thead .layui-table-cell{
			text-align:center;
		}
	</style>

</head>
<body>
<div class="viewFramework-index-body">
    <!---<<<<  标题    >>>>-->
    <span class="viewFramework-index-title">学院管理</span>
    <button type="button" class="iconTextBtn-import rightTopBtn"  id="add-alarm-btn" onclick="collegeManage.addCollege()"><i class="iconfont icon-add"></i>添加学院</button>


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
                                <span>学院名</span>
                            </div>
                            <div class="form-right">
                                <input type="text" id="collegeName"/>
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
    <script type="text/javascript" src="js/collegeManage.js"></script>
  	<script src="<%=request.getContextPath()%>/theme/lib/js/echarts.min.js"></script>
	<script type="text/html" id="imgTpl">
	 <div class="layer-photos-demo" style="cursor:pointer;">
		<img src="/Cache/collegeImages/{{ d.image }}">
	</div
	</script>
	<script>
  layui.config({
    base: '/static/js/modules'
  }).use(['jquery', 'mockjs', 'table'], function() {
	    var $ = layui.jquery,
	      layer = layui.layer,
	      table = layui.table;
	  
	    //第一个实例
	    var tableIns = table.render({
	      method: 'post',
	      done: function(res,curr,count){
	    	  $('#demo_hash').next().css('height', 'auto');
                hoverOpenImg();//显示大图
            },
	      limit: 10,
	      elem: '#demo_hash',
	      id:"contenttable",
	      height: 420,
	      url: rootPath+'/college/queryAllCollege.action', //数据接口
	      page: true, //开启分页
	      cols: [
	        [ //表头
	          {
	            field: 'fullname',
	            title: '学院全称',
	            width: 160
	          }, {
	            field: 'abbr',
	            title: '学院简称',
	            width: 95
	          },{
	        	field:'intro',
	        	title:'简介',
	        	width: 580
	          },{
	        	field:'image',
	        	title:'学院图片',
	        	templet:'#imgTpl',
	        	width: 120
	          },{
	        	field:'operation1',
	        	title:'',
	        	width:60
		      },{
	        	field:'operation2',
	        	title:'',
	        	width:60
		      },{
	        	field:'operation3',
	        	title:'',
	        	width:60
		      }
	        ]
	      ]
	    });
	    
	    //查询学院信息
		$(".iconTextBtn-import").on('click',function(){
			var keyword1=$("#collegeName").val();
            tableIns.reload({
            	where:{keyword1:keyword1
            		  }
            })
		})
  });
  
	function hoverOpenImg(){
        var img_show = null; // tips提示 
        $('td img').hover(function(){
            //alert($(this).attr('src'));
            var img = "<img class='img_msg' src='"+$(this).attr('src')+"' style='width:130px;' />";
            img_show = layer.tips(img, this,{
                tips:[2, 'rgba(41,41,41,.5)']
                ,area: ['160px']
            });
        },function(){
            layer.close(img_show);
        });
        $('td img').attr('style','max-width:70px');
	}
	</script>
	<jsp:include page="collegeManageRightWindow.jsp"></jsp:include>
   



</body>
</html>