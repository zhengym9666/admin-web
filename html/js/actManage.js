/***
 * 系统参数配置js
 * author zhengym
 * 2018-07-09
 */
$(function(){
    //sysParam_pages = new Page({id: "sysParamInfoFoot", limit: 10, visiblePages: 10, qryFunc: SmsSysParamInfo.querySysParamInfos});
});

(function(obj){
   var isUpdate = 0;
   var actInfo={
       actionPath:	rootPath + "/activityInfo/",
       
       addActInfo:function(){
    	   isUpdate = 0;
    	   $(".right-alert_content ul .TextBtn-import").show();
    	   $("#edit-name").val('');
    	   $("#edit-actId").val('');
    	   $("#edit-departName").val('');
    	   $("#edit-departId").val('');
    	   $("#edit-frequency").val('');
    	   $("#edit-place").val('');
    	   $("#edit-intro").val('');
    	   
    	   rightPopWindow("添加活动","80%","actManageRightWindow");
    	   actInfo.loadList();
       },
       
       queryActInfos:function(){
   	
    	   $.ajax({
    		   url:actInfo.actionPath+"queryAllActInfo.action",
    		   data:{"limit":10},
    		   method:'POST',
    		   success:function(){
    			 //重新渲染页面元素
                   /*layui.use('table', function() {
                       var element = layui.table;
                       element.render();
                   });*/
    			   parent.layui.table.reload('contenttable',{page:{curr:1}});
    		   },
    		   error:function(){
    			  parent.layui.table.reload('contenttable',{page:{curr:1}});
    		   }
    	   });

       },
       resert:function(){
           $(".top-part .form-items input").val("");
           
       },   
       checkInput:function(){
           var flag=true;
           $(".tabs_box ul li input.required").each(function(i,item){
               if($(item).val()==""){
                   $(item).siblings("p.error").remove();
                   var top = $(item).height();
                   $("<p class='check error'>这是必填字段</p>").css("top", top).appendTo($(item).parent());
                   flag= false;
               }else{
                   $(item).siblings("p.error").remove();
               }
           });
           if(!flag){
               return false;
           }
           var obj = {};

           return flag;
       },      
       saveActInfo:function(){
    	   
    	   if(actInfo.checkInput()){
           var actName=encodeURI($("#edit-name").val(),"UTF-8");
           var departId=encodeURI($("#edit-departId").val(),"UTF-8");
           var frequency = encodeURI($("#edit-frequency").val(),"UTF-8");
           var place = encodeURI($("#edit-place").val(),"UTF-8");
           var intro = encodeURI($("#edit-intro").val(),"UTF-8");
           var actId = encodeURI($("#edit-actId").val(),"UTF-8");
           
           $.ajax({
               url : actInfo.actionPath + "saveActivity.action",
               type:'post',
               async:false,
               cache:false,
               data : {
            	   actName:actName,
            	   departId:departId,
            	   frequency:frequency,
            	   place:place,
            	   intro:intro,
            	   actId:actId,
                   isUpdate:isUpdate
                   },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var obj = {};
                       obj["Ptext"] = "操作成功";
                       obj['func']=actInfo.queryActInfos();
                       closeRightWindow("actManageRightWindow");
                       operationTipsTrue(obj);
                       
                   }else{
                       var obj = {};
                       obj["Ptext"] = response.Msg;
                       operationTipsFailed(obj);
                   }
                   
               },
               error : function() {
                   var obj = {};
                   obj["Ptext"] = "系统出错";
                   operationTipsFailed(obj);
               }
           });
    	  }
       },
       deleteActInfo:function(actId){
           var operateWarnObj = {
               Ptext: "您确定要删除吗？",
               Stext: "一经删除可不恢复",
               func:function(){
                   $.ajax({
                       url : actInfo.actionPath + "deleteActInfo.action",
                       type:'post',
                       async:false,
                       cache:false,
                       data : {
                    	   actId:actId
                       },
                       dataType:'JSON',
                       success : function(response) {
                           if(response.resultFlag){
                               var obj = {};
                               obj["Ptext"] = "操作成功";
                               operationTipsTrue(obj);
                               obj['func']=actInfo.queryActInfos();
                           }else{
                               var obj = {};
                               obj["Ptext"] = response.Msg;
                               operationTipsFailed(obj);
                           }
                      
                       },
                       error : function() {
                           var obj = {};
                           obj["Ptext"] = "系统出错";
                           operationTipsFailed(obj);
                       }
                   });
               }
           }

           operationTipsWarn(operateWarnObj);
       },
       queryById:function(actId){
           $.ajax({
               url : actInfo.actionPath + "queryActInfo.action",
               type:'post',
               data : {
            	   actId:actId
               },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var item=response.data;
                	   $("#edit-name").val(item.actName);
                	   $("#edit-actId").val(item.actId);
                	   $("#edit-departName").val(item.departName);
                	   $("#edit-departId").val(item.departId);
                	   $("#edit-frequency").val(item.frequency);
                	   $("#edit-place").val(item.place);
                	   $("#edit-intro").val(item.intro);
                   }else{
                       var obj = {};
                       obj["Ptext"] = response.Msg;
                       operationTipsFailed(obj);
                   }
               },
               error : function() {
                   var obj = {};
                   obj["Ptext"] = "系统出错";
                   operationTipsFailed(obj);
               }
           });
       },
       editActInfo:function(actId){
    	   isUpdate = 1;
           rightPopWindow("编辑活动","80%","actManageRightWindow");
           $(".right-alert_content ul input").removeAttr("disabled");
           $("#edit-num").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").show();
           actInfo.loadList();
           actInfo.queryById(actId);
       },
       viewActInfo:function(actId){
           rightPopWindow("查看活动","80%","actManageRightWindow");
           $("p.error").remove();
           $(".right-alert_content ul input").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").hide();
           $("#edit-frequency").parent().removeClass("ui-down");
           $("#edit-departName").parent().removeClass("ui-down");
           $("#edit-place").parent().removeClass("ui-down");
           actInfo.queryById(actId);
       },
       queryDepartment:function(){
    	   $.ajax({
    		   url:actInfo.actionPath+"queryDepartment.action",
    		   type:'post',
    		   data:{},
    		   async:false,
    		   dataType:'JSON',
    		   success:function(response){
    			   if(response.resultFlag){
    				   $.each(response.data,function(i,item){
    					   if(i==0){
    						   $("#edit-departul").append(
        							   '<li class="choosed" val="'+item.departId+'" onclick=actInfo.chooseDepart("'+item.departName+'","'+item.departId+'")>'+item.departName+"</li>"
        							   );
    					   }else{
    						   $("#edit-departul").append(
        							   '<li val="'+item.departId+'" onclick=actInfo.chooseDepart("'+item.departName+'","'+item.departId+'")>'+item.departName+"</li>"
        							   ); 
    					   }
    					   
    					   
    				   });
    			   }else{
                       var obj = {};
                       obj["Ptext"] = response.Msg;
                       operationTipsFailed(obj);
                   }

               },
               error : function() {
                   var obj = {};
                   obj["Ptext"] = "系统出错";
                   
                   operationTipsFailed(obj);
               }
    	   });
    
       },
       chooseDepart:function(departName,departId){
    	   $("#edit-departul").hide();
    	   $("#edit-departName").val(departName);
    	   $("#edit-departId").val(departId);
    	   
       },
       loadList:function(){
    	   $("#edit-frequency").parent().addClass("ui-down");
           $("#edit-departName").parent().addClass("ui-down");
           $("#edit-place").parent().addClass("ui-down");
           
           $("#edit-departName").click(function(){
        	   $("#edit-departul").show();
           });
           $("#edit-frequency").click(function(){
        	   $("#edit-frequencyul").show();
           });
           $("#edit-place").click(function(){
        	   $("#edit-placeul").show();
           })
           $("#edit-frequencyul li").click(function(){
        	   $("#edit-frequencyul").hide();
        	   $("#edit-frequency").val($(this).text());
           });
           $("#edit-placeul li").click(function(){
        	   $("#edit-placeul").hide();
        	   $("#edit-place").val($(this).text());
           });
           actInfo.queryDepartment();
       }
       
       
   }

    obj.actInfo=actInfo;
})(window);