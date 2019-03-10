<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <script type="text/javascript">
        var rootPath = "<%=request.getContextPath()%>";
    </script>
    <title>社团管理系统后台</title>
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
		.btn-items{
			position:absolute;
			right:2%;
			top:83px;
		}
		.btn-items button{
			width:49px;
			height:30px;
			color:#333;
			margin-right:-2px;
			background:#fff;
			border:1px #ddd solid;
		}
		.btn-items button:hover{
			background:#24ac7e;
			color:#fff;
		}
	</style>

</head>
<body>
<div class="viewFramework-index-body">
    <!---<<<<  标题    >>>>-->
    <span class="viewFramework-index-title">社团招新</span>

    <!---<<<<  tabs    >>>>-->
    <div class="viewFramework-index-tabs ">
        <!---<<<<  tabs div    >>>>-->
        <div class="tabs_box">
            <!---<<<<  tabs div 外层    >>>>-->
            <div class="tabs-wapper open" >
                <div  class="top-part" >
                    <div >

                        <li  class="form-items clear-fixed">
                            <div class="form-left">
                                <span>学号：</span>
                            </div>
                            <div class="form-right">
                                <!-- <input type="text" id="gateWayID"/> -->
                                <input type="text" class="stuNum"/>
                            </div>
                        </li>

                        <li  class="form-items ">
                            <div class="form-left" >
                                <span>姓名：</span>
                            </div>
                            <div class="form-right">
                                <!-- <input type="text" id="spCode"/> -->
                                <input type="text" class="stuName"/>
                            </div>
                        </li>

                        <!-- <li  class="form-items clear-fixed">
                            <div class="form-left">
                                <span>SP名称：</span>
                            </div>
                            <div class="form-right">
                                <input type="text" id="spName"/>
                            </div>
                        </li> -->
                        <li class="form-items" clear-fixed>
                            <div class="form-btns top-part-btn" >
                                <button class="iconTextBtn-import"><i class="iconfont icon-search"></i>查询</button>
                                <button class="TextBtn reset" type="button" onclick="recruitNew.resert()">重置</button>
                            </div>
                        </li>
                        <li class="form-items btn-items" clear-fixed>
                        	<div>
                        		<button value="99" style="background:#24ac7e;color:#fff;">所有</button>
                        		<button value="0">未审批</button>
                        		<button value="1">已录取</button>
                        		<button value="2">已淘汰</button>
                        		<button value="3">已错过</button>
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
 <%--    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/ajaxmultifileupload.js"></script> --%>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/operationTips.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/pagination.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/rightPopWindow.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/My97DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/popIframe.js"></script>
    <script type="text/javascript" src="js/recruitNew.js"></script>
    <script src="https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js"></script>
    <script type="text/html" id="imgTpl">
	 <div class="layer-photos-demo" style="cursor:pointer;">
		<img src="/Cache/Img_Cache/{{ d.head }}">
	</div
	</script>
	<script type="text/javascript">
	$(function(){
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
		          id:"contenttable",
			      limit: 10,
			      elem: '#demo_hash',
			      height: 420,
			      url: rootPath+'/recruitNew/queryRecruitInfo.action', 
			      page: true, //开启分页
			      even: true,
			      cols: [
			        [ //表头
			          {
			            field: 'num',
			            title: '学号',
			            width: 60
			          }, {
			            field: 'name',
			            title: '姓名',
			            width: 72,
			            sort: true
			          }, {
			            field: 'gender',
			            title: '性别',
			            width: 58
			          }, {
			        	field: 'head',
			        	title: '头像',
			        	width:58,
			        	templet:'#imgTpl'
			          }, {
			            field: 'profession',
			            title: '专业',
			            width: 64,
			            sort: true
			          }, {
			            field: 'grade',
			            title: '班级',
			            width: 64,
			            sort: true
			          }, {
			            field: 'email',
			            title: '邮箱',
			            width: 70
			          }, {
			            field: 'phone',
			            title: '电话',
			            width: 70
			          },{
			            field: 'interest',
			            title: '兴趣爱好',
			            width: 86
				      },{
			            field: 'special',
			            title: '特长',
			            width: 58
				      },{
				    	field: 'departName',
				    	title: '意向部门',
				    	width: 80
				      },{
				    	field: 'forJob',
				    	title: '意向职位',
				    	width: 80
				      },{
				    	field: 'applyTime',
				    	title: '申请时间',
				    	width: 80
				      },{
				    	field: 'operation1',
				    	title: '',
				    	width: 58
				      },{
				    	field: 'operation2',
				    	title: '',
				    	width: 72
					  },{
				    	field: 'operation3',
				    	title: '',
				    	width: 72
					  }
			        ]
			      ]
			    });
			    
			    	if(undefined==keyword3 || null==keyword3){
			    		var keyword3 = 99;
			    	}
			    	

			    
			    //查询社员信息
				$(".iconTextBtn-import").on('click',function(){
					var keyword1=$(".stuNum").val();
		            var keyword2=$(".stuName").val();
		            tableIns.reload({
		            	where:{keyword1:keyword1,
		            		  keyword2:keyword2,
		            		  keyword3:keyword3}
		            })
		            
				})
				   
				   
				//获取不同录取状态
				$(".btn-items button").on('click',function(){
					debugger;
						$(this).css("background","#24ac7e");
						$(this).css("color","#fff");
						$(this).siblings().css("background","#fff");
						$(this).siblings().css("color","#333");
						keyword3 = $(this).attr("value");
						var keyword1=$(".stuNum").val();
			            var keyword2=$(".stuName").val();
			            tableIns.reload({
			            	where:{keyword1:keyword1,
			            		  keyword2:keyword2,
			            		  keyword3:keyword3}
			            })
					});
				});
		
		
		/* var $ = layui.jquery, active = {
				reload:function () {
	                var keyword1=$(".stuNum").val();
	                var keyword2=$(".stuName").val();
	                table.reload('contenttable',{
	                    where:{keyword1:keyword1,keyword2:keyword2}
	                });
	            }
		}; */
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
	});
	</script>
	<jsp:include page="recruitNewRightWindow.jsp"></jsp:include>
   



</body>
</html>