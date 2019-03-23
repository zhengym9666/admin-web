(function (obj) {
    var app = {
        queryAction: rootPath + '/department',

        initManFemaleByDepSum: function (mainView) {
            var url = app.queryAction;
            var myChart = echarts.init(mainView);
            $.ajax({
                url: url+"/queryManFemanSum.action",
                type: 'post',
                async: true,
                cache: false,
                data: {
                },
                dataType: 'JSON',
                success: function (response) {
                    if (response.success) {
                        //$("#showCharts").html("");
                        $.each(response.root, function (i, item) {
                            var option = null;

                            var axisLabel = null;
                            var label = null;
                            axisLabel = {
                                formatter: '{value}人'
                            };
                            option = {
                                // 全局调色盘。
                                color: ['#334B5C','#D53A35'],
                                title : {
                                    text: '部门男女比例',

                                },
                                tooltip : {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data:['男生数量','女生数量']
                                },
                                toolbox: {
                                    show : true,
                                    feature : {
                                        dataView : {show: true, readOnly: false},
                                        magicType : {show: true, type: ['line', 'bar']},
                                        restore : {show: true},
                                        saveAsImage : {show: true}
                                    }
                                },
                                calculable : true,
                                xAxis : [
                                    {
                                        type : 'category',
                                        data : item.xArray
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value',
                                        axisLabel :axisLabel
                                    }
                                ],
                                series : [
                                    {
                                        name:'男生数量',
                                        type:'bar',
                                        data:item.manValue,
                                        markPoint : {
                                            data : [
                                                {type : 'max', name: '最大值'},
                                                {type : 'min', name: '最小值'}
                                            ]
                                        },
                                        markLine : {
                                            data : [
                                                {type : 'average', name: '平均值'}
                                            ]
                                        }
                                    },
                                    {
                                        name:'女生数量',
                                        type:'bar',
                                        data:item.femaleValue,
                                        markPoint : {
                                            /*data : [
                                                {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                                                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                                            ]*/
                                            data : [
                                                {type : 'max', name: '最大值'},
                                                {type : 'min', name: '最小值'}
                                            ]
                                        },
                                        markLine : {
                                            data : [
                                                {type : 'average', name : '平均值'}
                                            ]
                                        }
                                    }
                                ]
                            };
                            myChart.clear();
                            myChart.setOption(option);
                        });


                    } else {
                        var obj = {};
                        obj["Ptext"] = response.Msg;
                        operationTipsFailed(obj);
                    }
                },
                error: function () {
                    var obj = {};
                    obj["Ptext"] = "系统出错";
                    operationTipsFailed(obj);
                }
            });
        },
        initManFemaleByClubSum:function(container1){
            url=app.queryAction;
            var myChart = echarts.init(container1);
            $.ajax({
                url: url+"/queryManFemaleByClubSum.action",
                type: 'post',
                async: true,
                cache: false,
                data: {
                },
                dataType: 'JSON',
                success: function (response) {
                    if (response.success) {
                        $.each(response.root, function (i, item) {
                            var option = null;

                            var axisLabel = null;
                            var label = null;
                            axisLabel = {
                                formatter: '{value}人'
                            };
                            option = {
                                // 全局调色盘。
                                color: ['#334B5C','#D53A35'],
                                title: {
                                    text: '社团男女比例',
                                    x: 'center'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: {
                                    orient: 'vertical',
                                    left: 'left',
                                    data: ['男生比例', '女生比例']
                                },
                                series: [{
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: [{
                                        value: item.manValue,
                                        name: '男生比例'
                                    }, {
                                        value: item.femaleValue,
                                        name: '女生比例'
                                    }],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }]
                            };
                            myChart.clear();
                            myChart.setOption(option);
                        });


                    } else {
                        var obj = {};
                        obj["Ptext"] = response.Msg;
                        operationTipsFailed(obj);
                    }
                },
                error: function () {
                    var obj = {};
                    obj["Ptext"] = "系统出错";
                    operationTipsFailed(obj);
                }
            });
        }

    }

    obj.app = app;
})(window);