<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>社团管理系统后台</title>
  <link rel="stylesheet" href="css/layui.css" id="layui">
  <link rel="stylesheet" href="css/theme/default.css" id="theme">
  <link rel="stylesheet" href="css/kitadmin.css" id="kitadmin">

</head>

<body class="layui-layout-body kit-theme-default" id="content">
  <div class="layui-layout layui-layout-admin">
    <!-- header -->
    <div class="layui-header">
      <div class="layui-logo">
        <div class="layui-logo-toggle" kit-toggle="side" data-toggle="on">
          <i class="layui-icon">&#xe65a;</i>
        </div>
        <div class="layui-logo-brand">
          <a href="#/" style="width:335px;">广州大学学生社团管理系统</a>
        </div>
      </div>
      <div class="layui-layout-left">
        <!-- <div class="kit-search">
          <form action="/">
            <input type="text" name="keyword" class="kit-search-input" placeholder="å³é®å­..." />
            <button class="kit-search-btn" title="æç´¢" type="submit">
              <i class="layui-icon">&#xe615;</i>
            </button>
          </form>
        </div> -->
      </div>
      <div class="layui-layout-right">
        <ul class="kit-nav" lay-filter="header_right">
          <li class="kit-item" style="color:#fdfdfdcf;">你好，超级管理员</li>
          <li class="kit-item" kit-target="help">
            <a href="javascript:;">
              <i class="layui-icon">&#xe607;</i>
              <span>帮助</span>
            </a>
          </li>
          <li class="kit-item">
            <a>
              <i class="layui-icon">&#xe60e;</i>
              	<span id="timearea"></span>
            </a>
          </li>
          <li class="kit-item">
            <a href="javascript:;">
              <span>
                <img src="images/0.jpg" class="layui-nav-img">
              </span>
            </a>
            <ul class="kit-nav-child kit-nav-right">
              <li class="kit-item" kit-target="setting">
                <a href="javascript:;">
                  <i class="layui-icon">&#xe614;</i>
                  <span>设置</span>
                </a>
              </li>
              <li class="kit-nav-line"></li>
              <li class="kit-item">
                <a id="logout">
                  <i class="layui-icon">&#x1006;</i>
                  <span>注销</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- silds -->
    <div class="layui-side" kit-side="true">
      <div class="layui-side-scroll">
        <div id="menu-box">
          <ul class="kit-menu">

              <li class="kit-menu-item">
              <a href="#/college/collegeManage">
                <i class="layui-icon"> </i>
                <span>学院管理</span>
              </a>
            </li>
            <li class="kit-menu-item">
              <a href="#/club/clubManage">
                <i class="layui-icon"> </i>
                <span>社团管理</span>
              </a>
            </li>
        </div>
      </div>
    </div>
    <!-- main -->
    <div class="layui-body" kit-body="true">
      <router-view></router-view>
    </div>
    <!-- footer -->
    <div class="layui-footer" kit-footer="true">
      2019 Â© zhengym license
      <div style="width:400px; height:400px;" class="load-container load1">
        <div class="loader">Loading...</div>
      </div>
    </div>
  </div>
  <script src="polyfill.min.js"></script>
  <script src="layui.js"></script>
  <script src="kitadmin.js"></script>
  <script src="mockjs-config.js"></script>

 <%-- <script src="https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js"></script>--%>
  <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js"></script>--%>
 <%-- <script src="<%=request.getContextPath()%>/theme/lib/js/echarts.min.js"></script>--%>
  <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/jQuery/jquery.min.js"></script>
  <script>layui.use("admin2");</script>
  <script>
		$(function(){
			time();
			
			function time() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				if (month < 10) {
					month = "0" + month
				}
				var day = date.getDate();
				if (day < 10) {
					day = "0" + day
				}
				var hour = date.getHours();
				if (hour < 10) {
					hour = "0" + hour
				}
				var minute = date.getMinutes();
				if (minute < 10) {
					minute = "0" + minute
				}
				var second = date.getSeconds();
				if (second < 10) {
					second = "0" + second
				}
				document.getElementById("timearea").innerHTML = year + "-"
						+ month + "-" + day + "&nbsp;&nbsp;&nbsp;" + hour + ":"
						+ minute + ":" + second;
				t = window.setTimeout(function() {
					time()
				}, 1000);
			}
		
		
		
	});


		</script>
		
		<script>
			$("#logout").click(function(){
				layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
					              // 这里可以写点击确定以后的回调方法比如:
					              // alert("这是点击确定以后的回调方法" );
				             // 或者直接跟layui的弹窗
				             console.log(rootPath);
				             $.ajax({
					        		  url:rootPath+'/admin/logoutAction.action',
					        		  type:'post',
					        		  data:{},
					        		  dataType:"JSON",
					        		  success:function(){
					        			  layer.alert("注销成功");
					        			  window.opener=null;
					        			  window.open('','_self');
					        			  window.close();
					        			  window.parent.location.href = "http://localhost:8080/gd_stu_dev/login.jsp";
 				        		  },
					        		  error:function(){
					        			  layer.alert("注销失败"); 
					        		  }
					        	  })
					          layer.msg("注销成功",{icon:1});
				              layer.close(index);//关闭弹窗
				           });
			})
			  
		</script>

</body>

</html>