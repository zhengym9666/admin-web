<%@ page import="org.aspectj.weaver.ast.Var" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>添加新闻</title>
    <script type="text/javascript">
        var rootPath = "<%=request.getContextPath()%>";
        var type = "<%=request.getParameter("type")%>";//获取请求类型：detail查询操作  edit编译操作  save保存操作
        var id = "<%=request.getParameter("id")%>";//获取请求ID
    </script>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/layui.css" id="layui">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/theme/default.css" id="theme">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/kitadmin.css" id="kitadmin">
    <link rel="stylesheet" type="text/css"
          href="<%=request.getContextPath()%>/editor/themes/default/default.css">
</head>
<body>
<div id="addNews">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 28px;">
        <legend id="addnews_title"></legend>
    </fieldset>
    <input type="hidden" id="newid">
    <div class="layui-form" >
        <div class="layui-form-item">
            <label class="layui-form-label">作者</label>
            <div class="layui-input-block">
                <input type="text" id="author" name="author" lay-verify="author" autocomplete="off" placeholder="请输入作者" style="width: 90px" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">文章标题</label>
            <div class="layui-input-block">
                <input type="text" id="title" name="title" lay-verify="required" placeholder="请输入文章标题" autocomplete="off" style="width: 83%"  class="layui-input">
            </div>
        </div>



        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">内容</label>
            <div class="layui-input-block">
                <textarea placeholder="请输入内容" id="content" lay-verify="content" class="layui-textarea"  style="width: 83%;height: 483px;"></textarea>
            </div>
        </div>


        <div class="layui-form-item">
            <div class="layui-input-block">
                <button id="submit" class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
                <button id="cancal" class="layui-btn layui-btn-primary">取消</button>
            </div>
        </div>
    </div>
</div>
</body>
<script src="<%=request.getContextPath()%>/polyfill.min.js"></script>
<script src="<%=request.getContextPath()%>/layui.js"></script>
<script src="<%=request.getContextPath()%>/kitadmin.js"></script>
<script src="<%=request.getContextPath()%>/mockjs-config.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/editor/kindeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/editor/lang/zh_CN.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/jQuery/jquery-1.8.3.min.js"></script>
<script>
    KindEditor.ready(function (K) {
        window.editro=K.create("#content",{
            //修改文件上传的地址
            uploadJson:rootPath+"/image/upload.action",
            //图片空间的查询地址
            fileManagerJson:rootPath+'/image/manager.action',
            //开启图片空间
            allowFileManager:true
        });
    });


</script>

<script>
    layui.use(['form', 'layedit', 'laydate'], function(){
        var form = layui.form
            ,$ = layui.$
            ,layer = layui.layer
            ,layedit = layui.layedit
            ,laydate = layui.laydate;

        //日期
        laydate.render({
            elem: '#date'
        });
        laydate.render({
            elem: '#date1'
        });

        //创建一个编辑器
        var editIndex = layedit.build('LAY_demo_editor');

        //请求类型：detail查询操作  edit编译操作  save保存操作
        if(type=="detail"){
            $("#addnews_title").text("新闻详情");
            $("#submit").hide();

            //向服务端发送删除指令
            $.ajax({
                url: rootPath+"/news/"+id,
                type: 'get',
                async: true,
                cache: false,
                dataType: 'JSON',
                success: function (response) {
                    if (response.status==0) {
                        /*layer.alert("删除成功", function(){
                            /!*parent.layui.table.reload('news_table', {
                                where: {} //设定异步数据接口的额外参数
                                //,height: 300
                            });*!/
                        });*/
                        var news=response.news;
                        window.editro.sync();
                        $("#author").val(news.author);
                        $("#title").val(news.title);
                        //$("#content").val(news.content);
                        window.editro.html(news.content);
                        $("#author").attr("disabled","disabled");
                        $("#title").attr("disabled","disabled");
                        //设置富文本为只读状态
                        window.editro.readonly();
                    } else {
                        /*layer.alert(JSON.stringify(response.msg), {
                            title: '删除失败'
                        });*/
                        layer.msg('获取新闻失败，请重试：'+response.msg);
                    }
                },
                error: function () {
                    layer.alert("获取新闻失败，请重试");
                }
            });

        }else if(type=="edit"){
            $("#addnews_title").text("编辑新闻");
            $("#newid").val(id);
            //向服务端发送删除指令
            $.ajax({
                url: rootPath+"/news/"+id,
                type: 'get',
                async: true,
                cache: false,
                dataType: 'JSON',
                success: function (response) {
                    if (response.status==0) {
                        var news=response.news;
                        window.editro.sync();
                        $("#author").val(news.author);
                        $("#title").val(news.title);
                        window.editro.html(news.content);
                        //设置富文本为可写状态
                        window.editro.readonly(false);;
                    } else {
                        /*layer.alert(JSON.stringify(response.msg), {
                            title: '删除失败'
                        });*/
                        layer.msg('获取新闻失败，请重试：'+response.msg);
                    }
                },
                error: function () {
                    layer.alert("获取新闻失败，请重试");
                }
            });
        }else{
            $("#addnews_title").text("添加新闻");
        }

        //自定义验证规则
        form.verify({
            author: function(value){
                if(value.length == 0){
                    return '未填写作者';
                }
            }
            ,title: function(value){
                if(value.length == 0){
                    return '未填写标题';
                }
            }
            ,content: function(value){
                //layedit.sync(editIndex);
                window.editro.sync();
                if($("#content").val().length == 0){
                    return '未填写内容';
                }
            }

        });




        //监听提交
        form.on('submit(demo1)', function(data){
            window.editro.sync();
            $.ajax({
                url: rootPath+"/news/saveNews.action",
                type: 'post',
                async: true,
                cache: false,
                data: {
                    author:$("#author").val(),
                    title:$("#title").val(),
                    content:$("#content").val(),
                    id:$("#newid").val()

                },
                dataType: 'JSON',
                success: function (response) {
                    if (response.status==0) {
                        layer.alert("保存成功", function(){
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                            parent.layui.table.reload('news_table', {
                                where: {} //设定异步数据接口的额外参数
                                //,height: 300
                            });
                        });
                    } else {
                        layer.alert(JSON.stringify(response.msg), {
                            title: '出错信息'
                        });
                    }
                },
                error: function () {
                    layer.alert("保存失败，请重试");
                }
            });
            return false;
        });

        $("#cancal").click(function(){
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
        });

        //表单初始赋值
        form.val('example', {
            "username": "贤心" // "name": "value"
            ,"password": "123456"
            ,"interest": 1
            ,"like[write]": true //复选框选中状态
            ,"close": true //开关状态
            ,"sex": "女"
            ,"desc": "我爱 layui"
        })

        form.render();
    });
</script>
</html>
