<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<div class="layui-fluid">
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md12">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md3">
          <div class="layui-card">
            <div class="layui-card-body">
              访客
            </div>
          </div>
        </div>
        <div class="layui-col-md3">
          <div class="layui-card">
            <div class="layui-card-body">
              新用户
            </div>
          </div>
        </div>
        <div class="layui-col-md3">
          <div class="layui-card">
            <div class="layui-card-body">
              销售额
            </div>
          </div>
        </div>
        <div class="layui-col-md3">
          <div class="layui-card">
            <div class="layui-card-body">
              成交量
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layui-col-md12">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <div class="layui-row layui-col-space15">
            <div class="layui-col-md12">
              <div class="layui-card">
                <div class="layui-card-header">源码地址</div>
                <div class="layui-card-body">
                  <p style="margin-bottom: 5px;">QQ交流群：248049395，616153456</p>
                  <p style="margin-bottom: 5px;">源码下载:
                    <a href='https://gitee.com/kitteam/kit_admin/' target="_blank">
                      <img src='https://gitee.com/kitteam/kit_admin/badge/star.svg?theme=white' alt='star'></img>
                    </a>
                    (模板源码)
                  </p>
                  <p style="margin-bottom: 5px;">　脚手架:
                    <a href='https://gitee.com/kitteam/kit_admin_scaffold/' target="_blank">
                     <!--  <img src='https://gitee.com/kitteam/kit_admin_scaffold/badge/star.svg?theme=wh -->ite' alt='star'></img>
                    </a>
                    (基于打包后的源码构建的脚手架)正式开发可以直接使用此模板
                  </p>
                  <p style="margin-bottom: 5px;">演示代码:
                    <a href='https://gitee.com/kitteam/kit_admin_demo/' target="_blank">
                      <img src='https://gitee.com/kitteam/kit_admin_demo/badge/star.svg?theme=white' alt='star'></img>
                    </a>
                    (基于脚手架构建的演示代码)
                  </p>
                </div>
              </div>
            </div>
            <div class="layui-col-md6">
              <div class="layui-card">
                <div class="layui-card-header">ECharts</div>
                <div class="layui-card-body">
                  <div id="container1" style="height:350px;"></div>
                </div>
              </div>
            </div>
            <div class="layui-col-md6">
              <div class="layui-card">
                <div class="layui-card-header">ECharts</div>
                <div class="layui-card-body">
                  <div id="main" style="height:350px;"></div>
                </div>
              </div>
            </div>
            <div class="layui-col-md12">
              <div class="layui-card">
                <div class="layui-card-header">ECharts</div>
                <div class="layui-card-body">
                  <div id="main1" style="height:350px;"></div>
                </div>
              </div>
            </div>
            <div class="layui-col-md12">
              <div class="layui-card">
                <div class="layui-card-header">数据统计</div>
                <div class="layui-card-body">
                  <table id="demo_hash" lay-filter="test_hash"></table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="layui-col-md4">
          <div class="layui-row layui-col-space15">
            <div class="layui-col-md12">
              <div class="layui-card">
                <div class="layui-card-header">快捷入口</div>
                <div class="layui-card-body">
                  <div class="layui-row layui-col-space5">
                    <!-- <div class="layui-col-sm3">
                          <div style="height:75px;  background-color:#ccc;"></div>
                        </div>
                        <div class="layui-col-sm3">
                          <div style="height:75px;  background-color:#ccc;"></div>
                        </div>
                        <div class="layui-col-sm3">
                          <div style="height:75px;  background-color:#ccc;"></div>
                        </div>
                        <div class="layui-col-sm3">
                          <div style="height:75px;  background-color:#ccc;"></div>
                        </div>
                        <div class="layui-col-sm3">
                          <div style="height:75px;  background-color:#ccc;"></div>
                        </div>
                        <div class="layui-col-sm3">
                          <div style="height:75px;  background-color:#ccc;"></div>
                        </div>
                        <div class="layui-col-sm3">
                          <div style="height:75px;  background-color:#ccc;"></div>
                        </div>
                        <div class="layui-col-sm3">
                          <div style="height:75px;  background-color:#ccc;"></div>
                        </div> -->
                    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4">
                      <div style="height:75px;  background-color:#ccc;"></div>
                    </div>
                    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4">
                      <div style="height:75px;  background-color:#ccc;"></div>
                    </div>
                    <div class="layui-col-xs4 layui-col-sm12 layui-col-md4">
                      <div style="height:75px;  background-color:#ccc;"></div>
                    </div>
                    <div class="layui-col-xs4 layui-col-sm7 layui-col-md8">
                      <div style="height:75px;  background-color:#ccc;"></div>
                    </div>
                    <div class="layui-col-xs4 layui-col-sm5 layui-col-md4">
                      <div style="height:75px;  background-color:#ccc;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="layui-col-md12">
              <div class="layui-card">
                <div class="layui-card-header">版本信息</div>
                <div class="layui-card-body">
                  <table class="layui-table">
                    <colgroup>
                      <col width="150">
                      <col>
                    </colgroup>
                    <tbody>
                      <tr>
                        <td>版本号</td>
                        <td>v2.0.0-beta1</td>
                      </tr>
                      <tr>
                        <td>依赖</td>
                        <td>layui v2.2.5</td>
                      </tr>
                      <tr>
                        <td>作者</td>
                        <td>Van Zheng</td>
                      </tr>
                      <tr>
                        <td>邮箱</td>
                        <td>zheng_jinfan@126.com</td>
                      </tr>
                      <tr>
                        <td>交流群</td>
                        <td>248049395</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="layui-col-md12">
              <div class="layui-card">
                <div class="layui-card-header">关于KITADMIN 2.0</div>
                <div class="layui-card-body">
                  <p>当前版本是基于layui 2.x重构的版本，与之后1.x版本有本质有区别。</p>
                  <p>该版本的核心是[路由]，不再支持[iframe]方式的加载</p>
                  <p>版本特性：</p>
                  <ul>
                    <li>1、用法一如既往的简单，快捷。(只需要简单的配置就实现一些功能).</li>
                    <li>2、提供本地开发环境。(依赖nodejs运行环境和gulp)</li>
                    <li>3、提供代码功能。(依赖nodejs运行环境和gulp)</li>
                    <li>4、模块化加载。(依赖layui模块化，用法与layui保持一致)</li>
                    <li>5、提供路由功能。(路由是本版本的核心功能了，需与模板绑定，详情请参考相关文档)</li>
                    <li>6、完全的前后端分离开发。(集成mockjs用于拦截请求并返回模拟数据，详情请参考相关文档)</li>
                    <li>7、左侧菜单重写，支持到4级菜单。(集成mockjs用于拦截请求并返回模拟数据，详情请参考相关文档)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
    var rootPath = "<%=request.getContextPath()%>";
</script>
<%--
<script src="https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js"></script>
--%>
<%--<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js"></script>--%>
<script src="<%=request.getContextPath()%>/theme/lib/js/echarts.min.js"></script>
<script src="<%=request.getContextPath()%>/views/js/app.js"></script>
<!---<<<<   jQuery  >>>>-->
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/jQuery/jquery.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/js/current.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/jquery.twbsPagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/ajaxmultifileupload.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/operationTips.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/pagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/rightPopWindow.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/popIframe.js"></script>


<script>
  layui.config({
    base: '/src/js/'
  }).use(['jquery', 'mockjs', 'table'], function() {
    var $ = layui.jquery,
      layer = layui.layer,
      table = layui.table;

    var intervalIndex = setInterval(function() {
      if (echarts === undefined) {
        return;
      }
      // 如果eacharts加载完成，则清除循环
      clearInterval(intervalIndex);
      //echarts
      // 基于准备好的dom，初始化echarts实例

        var mainView=document.getElementById('main')
        app.initManFemaleByDepSum(mainView);
      // 指定图表的配置项和数据
        //app.title = '堆叠柱状图';



        /*var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      };*/
      // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);

      // echarts 1
      var container1 = document.getElementById("container1");
      app.initManFemaleByClubSum(container1);
      var app1 = {};
      option1 = null;
      /*app1.title = '极坐标系下的堆叠柱状图';

      if (option1 && typeof option1 === "object") {
        myChart1.setOption(option1, true);
      }*/

      // echart2
     /*var myChart2 = echarts.init(document.getElementById("main1"));

      var app2 = {};
      option2 = null;
      option2 = {
          title: {
              text: '堆叠区域图'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          legend: {
              data: ['收入', '支出', '剩余总额']
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [{
              type: 'category',
              boundaryGap: false,
              data: ['一月', '一月', '一月', '一月', '一月', '一月', '一月'
                  , '一月', '一月']
          }],
          yAxis: [{
              type: 'value'
          }],
          series: [{
              name: '收入',
              type: 'line',
              stack: '总量',
              areaStyle: {
                  normal: {}
              },
              data: [120, 132, 101, 134, 90, 230, 210, 230, 210]
          }, {
              name: '支出',
              type: 'line',
              stack: '总量',
              areaStyle: {
                  //normal: {}
              },
              data: [220, 182, 191, 234, 290, 330, 310, 230, 210]
          }, {
              name: '剩余总额',
              type: 'line',
              stack: '总量',
              areaStyle: {
                  //normal: {}
              },
              data: [150, 232, 201, 154, 190, 330, 410, 230, 210]
          }
          ]
      };
      if (option2 && typeof option2 === "object") {
        myChart2.setOption(option2, true);
      }*/
      //====
        var main1Div = document.getElementById("main1");
        app.initBugetByClubSum(main1Div);
      //=====
      $(window).on('resize', function() {
       /* myChart.resize();
        myChart1.resize();
        myChart2.resize();*/
      });
    }, 50);

    // 注入mock
    layui.mockjs.inject({
      'POST /demo/table/user': {
        code: 0,
        msg: "xxx",
        count: 1000,
        'data|20': [{
          'id|+1': 1,
          username: '@name',
          sex: '@boolean',
          city: '@city',
          sign: '@csentence',
          experience: '@integer',
          score: '@integer',
          classify: '@word',
          wealth: '@integer',
          auth: '@boolean'
        }]
      }
    });
    //第一个实例
    table.render({
      method: 'post',
      done: function() {
        $('#demo_hash').next().css('height', 'auto');
      },
      limit: 20,
      elem: '#demo_hash',
      height: 420,
      url: '/demo/table/user', //数据接口
      page: true, //开启分页
      cols: [
        [ //表头
          {
            field: 'id',
            title: 'ID',
            width: 50,
            fixed: 'left'
          }, {
            field: 'username',
            title: '用户名',
            width: 80
          }, {
            field: 'sex',
            title: '性别',
            width: 80,
            sort: true
          }, {
            field: 'city',
            title: '城市',
            width: 80
          }, {
            field: 'sign',
            title: '签名',
            width: 177
          }, {
            field: 'experience',
            title: '积分',
            width: 80,
            sort: true
          }, {
            field: 'score',
            title: '评分',
            width: 80,
            sort: true
          }, {
            field: 'classify',
            title: '职业',
            width: 80
          }, {
            field: 'wealth',
            title: '财富',
            width: 135,
            sort: true
          }
        ]
      ]
    });
  });
</script>
<style scoped>

</style>