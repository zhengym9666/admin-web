<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <script type="text/javascript">
        var rootPath = "<%=request.getContextPath()%>";
    </script>
    <title>新闻管理</title>
    <!---<<<<   字体图标  >>>>-->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/lib/font/iconfont.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/lib/css/normal.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/current.css" />

    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/ui.css" />
    <!---<<<<   表格相关CSS   >>>>-->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/table.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/strateMap.css" />

</head>
<body>
<div class="viewFramework-index-body">
    <!---<<<<  标题    >>>>-->
    <span class="viewFramework-index-title">新闻管理</span>
    <button type="button"  data-method="offset" data-type="auto"  class="iconTextBtn-import rightTopBtn"  id="addnewBut" onclick=""><i class="iconfont icon-add"></i>添加新闻</button>


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
                                <span>作者：</span>
                            </div>
                            <div class="form-right">
                                <!-- <input type="text" id="gateWayID"/> -->
                                <input type="text" id="author_param"/>
                            </div>
                        </li>

                        <li  class="form-items ">
                            <div class="form-left" >
                                <span>标题：</span>
                            </div>
                            <div class="form-right">
                                <!-- <input type="text" id="spCode"/> -->
                                <input type="text" id="title_param"/>
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
                                <button class="iconTextBtn-import" onclick="queryParam()"><i class="iconfont icon-search"></i>查询</button>
                                <button class="TextBtn reset" type="button" onclick="resert()">重置</button>
                            </div>
                        </li>
                    </div>

                    <!---<<<<  tabs div 主体   >>>>-->
    				  <div class="layui-col-md12">
		              <div class="layui-card">
		                <!-- <div class="layui-card-header">数据统计</div> -->
		                <div class="layui-card-body">
		                  <table id="demo_hash" lay-filter="table_filter"></table>
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

    <script type="text/javascript" src="js/memberInfo.js"></script>
    <%--<script src="https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js"></script>--%>

    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>

    <script type="text/javascript">
        //格式化日志
        //long->date
        //结果为：2017-02-09
        function dateFormat(longTypeDate) {
            var dateTypeDate = "";
            var date = new Date();
            date.setTime(longTypeDate);
            dateTypeDate += date.getFullYear(); // 年
            dateTypeDate += "-" + getMonth(date); // 月
            dateTypeDate += "-" + getDay(date); // 日
            dateTypeDate += " " + getHour(date);//小时
            dateTypeDate += ":" + getMin(date);//分钟
            dateTypeDate += ":" + getSec(date);//秒
            return dateTypeDate;
        }
        // 返回 01-12 的月份值
        function getMonth(date) {
            var month = "";
            month = date.getMonth() + 1; // getMonth()得到的月份是 0-11
            if (month < 10) {
                month = "0" + month;
            }
            return month;
        }
        // 返回 01-30 的日期
        function getDay(date) {
            var day = "";
            day = date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            return day;
        }
        function getHour(date) {
            var hour = "";
            hour = date.getHours();
            if (hour < 10) {
                hour = "0" + hour;
            }
            return hour;
        }
        function getMin(date) {
            var min = "";
            min = date.getMinutes();
            if (min < 10) {
                min = "0" + min;
            }
            return min;
        }

        function getSec(date) {
            var sec = "";
            sec = date.getSeconds();
            if (sec < 10) {
                sec = "0" + sec;
            }
            return sec;
        }
    </script>


    <script>
  layui.config({
      base: '/src/js/',
      debug:true
  }).use([ 'jquery', 'mockjs', 'table'], function() {
	    var $ = layui.jquery,
	      layer = layui.layer,
	      table = layui.table;

	    //第一个实例
	    var newsIns=table.render({
            id: 'news_table',
	      method: 'post',
	      done: function() {
	        $('#demo_hash').next().css('height', 'auto');
	      },
	      limit: 20,
	      elem: '#demo_hash',
	      height: 550,
          url: rootPath+'/news/queryAllNewsInfo.action',
          page: true, //开启分页
	      cols: [
	        [ //表头
	          {
	            field: 'id',
	            title: 'ID',
	            width: 90,
	            fixed: 'left'
	          }, {
	            field: 'author',
	            title: '作者',
	            width: 80
	          }, {
	            field: 'submitter',
	            title: '发布者',
	            width: 80
	          }, {
	            field: 'submit_time',
	            title: '提交时间',
	            width: 173,
                sort: true,
                templet: function(d){
                    return dateFormat(d.submit_time);
                }
	          }, {
	            field: 'revise_time',
	            title: '修改时间',
	            width: 173,
                sort: true,
                templet: function(d){
                    return dateFormat(d.revise_time);
                }
	          }, {
	            field: 'title',
	            title: '文章标题',
	            width: 330
	          }, /*{
	            field: 'image',
	            title: '图片',
	            width: 100
	          },*/ {
	            field: 'collegeId',
	            title: '所属学院',
	            width: 100
	          }, {
	            field: 'clubId',
	            title: '所属社团',
	            width: 100
	          },{fixed: 'right',
                width:180,
                align:'center',
                title:'操作',
                toolbar: '#barDemo'}
	        ]
	      ]
	    });


  //触发事件
  var active = {
      offset: function(othis){
          var type = othis.data('type')
              ,text = othis.text();
          layer.open({
              type: 2
              ,title:"添加新闻"
              ,area:['780px','680px']
              ,offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
              ,id: 'layerDemo'+type //防止重复弹出
              ,content: rootPath+'/views/community/news/addnews.jsp' //http://"+rootPath+"/views/community/news/addNews.jsp
              ,maxmin: true
              ,btnAlign: 'c' //按钮居中
              ,shade: 0 //不显示遮罩
              ,yes: function(){
                  layer.closeAll();
              }
          });
      }
  };

  $('#addnewBut').on('click', function(){
      var othis = $(this), method = othis.data('method');
      active[method] ? active[method].call(this, othis) : '';
  });
  //监听每一行的操作按钮
  layui.table.on('tool(table_filter)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象

      if(layEvent === 'detail'){ //查看
          //layer.msg('ID：'+ data.id + ' 的查看操作');
          //查看新闻详情
          layer.open({
              type: 2
              ,title:"新闻详情"
              ,area:['780px','680px']
              ,offset: "auto" //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
              ,id: 'layerDemo_detail' //防止重复弹出
              ,content: rootPath+"/views/community/news/addnews.jsp?type=detail&id="+data.id //http://"+rootPath+"/views/community/news/addNews.jsp
              ,maxmin: true
              ,btnAlign: 'c' //按钮居中
              ,shade: 0 //不显示遮罩
              ,yes: function(){
                  layer.closeAll();
              }
          });
      } else if(layEvent === 'del'){ //删除
          layer.confirm('真的删除行么', function(index){
              //向服务端发送删除指令
              $.ajax({
                  url: rootPath+"/news/delNewsById.action",
                  type: 'post',
                  async: true,
                  cache: false,
                  data: {
                      id:data.id
                  },
                  dataType: 'JSON',
                  success: function (response) {
                      if (response.status==0) {
                          /*layer.alert("删除成功", function(){
                              /!*parent.layui.table.reload('news_table', {
                                  where: {} //设定异步数据接口的额外参数
                                  //,height: 300
                              });*!/
                          });*/
                          layer.msg('删除成功');
                          obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                          layer.close(index);
                      } else {
                          /*layer.alert(JSON.stringify(response.msg), {
                              title: '删除失败'
                          });*/
                          layer.msg('删除失败，请重试：'+response.msg);
                      }
                  },
                  error: function () {
                      layer.alert("保存失败，请重试");
                  }
              });


          });

      } else if(layEvent === 'edit'){ //编辑
          //do something
          //layer.msg('ID：'+ data.id + ' 的编辑操作');

          //查看新闻详情
          layer.open({
              type: 2
              ,title:"编辑新闻"
              ,area:['780px','680px']
              ,offset: "auto" //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
              ,id: 'layerDemo_edit' //防止重复弹出
              ,content: rootPath+"/views/community/news/addnews.jsp?type=edit&id="+data.id //http://"+rootPath+"/views/community/news/addNews.jsp
              ,maxmin: true
              ,btnAlign: 'c' //按钮居中
              ,shade: 0 //不显示遮罩
              ,yes: function(){
                  layer.closeAll();
              }
          });

          //同步更新缓存对应的值，由于不知道修改了哪项，还是全部重新加载吧
          /*obj.update({
              author: '123'
              ,title: 'xxx'
          });*/
      }
  });

});
  </script>

    <script type="text/javascript">
        function resert(){
            $(".form-items .form-right input").val("");
        }
        function queryParam(){
            //作者
            var author_par=$("#author_param").val().trim();
            //标题
            var title_par=$("#title_param").val().trim();

            layui.table.reload('news_table', {
                where: {
                    //设定异步数据接口的额外参数
                    author_par:author_par,
                    title_par:title_par,
                    /*//防止条件筛选的时候跳页查询
                    不知道在这里设置页数，都是点击分页的时候会出现每次都是第一页，注意
                    page:1*/
                },page: {
                    curr: 1 //重新从第 1 页开始
                }

            });

        }
    </script>


</body>
</html>