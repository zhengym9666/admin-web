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

<body class="layui-layout-body kit-theme-default">
  <div class="layui-layout layui-layout-admin">
    <!-- header -->
    <div class="layui-header">
      <div class="layui-logo">
        <div class="layui-logo-toggle" kit-toggle="side" data-toggle="on">
          <i class="layui-icon">&#xe65a;</i>
        </div>
        <div class="layui-logo-brand">
          <a href="#/">logo标题</a>
        </div>
      </div>
      <div class="layui-layout-left">
        <!-- <div class="kit-search">
          <form action="/">
            <input type="text" name="keyword" class="kit-search-input" placeholder="关键字..." />
            <button class="kit-search-btn" title="搜索" type="submit">
              <i class="layui-icon">&#xe615;</i>
            </button>
          </form>
        </div> -->
      </div>
      <div class="layui-layout-right">
        <ul class="kit-nav" lay-filter="header_right">
          <li class="kit-item" kit-target="help">
            <a href="javascript:;">
              <i class="layui-icon">&#xe607;</i>
              <span>帮助</span>
            </a>
          </li>
          <li class="kit-item" id="ccleft">
            <a href="javascript:;">
              <i class="layui-icon">&#xe60e;</i>
              	<span>时间</span>
            </a>
          </li>
          <li class="kit-item">
            <a href="javascript:;">
              <span>
                <img src="http://m.zhengjinfan.cn/images/0.jpg" class="layui-nav-img">用户名
              </span>
            </a>
            <ul class="kit-nav-child kit-nav-right">
              <li class="kit-item">
                <a href="#/user/my">
                  <i class="layui-icon">&#xe612;</i>
                  <span>个人中心</span>
                </a>
              </li>
              <li class="kit-item" kit-target="setting">
                <a href="javascript:;">
                  <i class="layui-icon">&#xe614;</i>
                  <span>设置</span>
                </a>
              </li>
              <li class="kit-nav-line"></li>
              <li class="kit-item">
                <a href="temp/login.html">
                  <i class="layui-icon">&#x1006;</i>
                  <span>注销</span>
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
              <a href="#/">
                <i class="layui-icon"></i>
                <span>首页</span>
              </a>
            </li>
            <li class="kit-menu-item layui-show">
              <a href="javascript:;">
                <i class="layui-icon"></i>
                <span>社员管理</span>
              </a>
              <ul class="kit-menu-child layui-anim layui-anim-upbit">
                <li class="kit-menu-item">
                  <a href="#/member/memberInfo">
                    <i class="layui-icon"></i>
                    <span>查看社员</span>
                  </a>
                </li>
                <li class="kit-menu-item">
                  <a href="#/member/recruitNew">
                    <i class="layui-icon"></i>
                    <span>社团招新</span>
                  </a>
                </li>
                <li class="kit-menu-item">
                  <a href="#/member/reElection">
                    <i class="layui-icon"></i>
                    <span>社团换届</span>
                  </a>
                </li>
              </ul>
            </li>
              <li class="kit-menu-item">
              <a href="#/department/departManage">
                <i class="layui-icon"></i>
                <span>部门管理</span>
              </a>
            </li>
            <li class="kit-menu-item">
              <a href="#/news/newsManage">
                <i class="layui-icon"></i>
                <span>社团新闻管理</span>
              </a>
            </li>
            <li class="kit-menu-item">
            <a href="#/activity/actManage">
              <i class="layui-icon"></i>
              <span>活动管理</span>
            </a>
            </li>
			<li class="kit-menu-item layui-show">
              <a href="javascript:;">
                <i class="layui-icon"></i>
                <span>会费管理</span>
              </a>
              <ul class="kit-menu-child layui-anim layui-anim-upbit">
                <li class="kit-menu-item">
                  <a href="#/fee/feeBudget">
                    <i class="layui-icon"></i>
                    <span>会费收支详情</span>
                  </a>
                </li>
                <li class="kit-menu-item">
                  <a href="#/fee/feeInManage">
                    <i class="layui-icon"></i>
                    <span>管理会费收入</span>
                  </a>
                </li>
               </ul>
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
      2017 © kit.zhengjinfan.cn MIT license
      <div style="width:400px; height:400px;" class="load-container load1">
        <div class="loader">Loading...</div>
      </div>
    </div>
  </div>
  <script src="polyfill.min.js"></script>
  <script src="layui.js"></script>
  <script src="kitadmin.js"></script>
  <script src="mockjs-config.js"></script>

  <script src="https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js"></script>
  <script>layui.use("admin");</script>

</body>

</html>l>