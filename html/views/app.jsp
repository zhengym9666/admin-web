<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<div class="layui-fluid">
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md12">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md3">
          <div class="layui-card">
            <div class="layui-card-body">
              社团人数<span class="personSum" style="display:inline-block;margin-left:80px;font-size:25px;color:#47b135;"></span>
            </div>
          </div>
        </div>
        <div class="layui-col-md3">
          <div class="layui-card">
            <div class="layui-card-body">
              剩余会费<span class="totalFee" style="display:inline-block;margin-left:80px;font-size:25px;color:#47b135;"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layui-col-md12">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <div class="layui-row layui-col-space15">
            <div class="layui-col-md6">
              <div class="layui-card">
                <div class="layui-card-header">饼状图</div>
                <div class="layui-card-body">
                  <div id="container1" style="height:350px;width: 100%;"></div>
                </div>
              </div>
            </div>
            <div class="layui-col-md6">
              <div class="layui-card">
                <div class="layui-card-header">柱状图</div>
                <div class="layui-card-body">
                  <div id="main" style="height:350px;width: 100%;"></div>
                </div>
              </div>
            </div>
            <div class="layui-col-md12">
              <div class="layui-card">
                <div class="layui-card-header">折线图</div>
                <div class="layui-card-body">
                  <div id="main1" style="height:350px;width: 100%;"></div>
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
    	  
    	  app.initClubScale();
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
   
  });
</script>
<style scoped>

</style>