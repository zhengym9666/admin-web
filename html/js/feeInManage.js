/***
 * 系统参数配置js
 * author zhengym
 * 2018-07-09
 */
$(function(){
    //sysParam_pages = new Page({id: "sysParamInfoFoot", limit: 10, visiblePages: 10, qryFunc: SmsSysParamInfo.querySysParamInfos});
	$("#edit-budgeterName").on('input',function(){
		var key = $(this).val();
		$("#edit-budgeterul").html('');
		feeInManage.queryMemberByKey(key);
		$("#edit-budgeterul").show();
		
	});
});

(function(obj){
   var feeInManage={
       actionPath:	rootPath + "/feeBudgetManage/",
       
  
       confirmFee:function(stuNum,clubId){
   	
    	   $.ajax({
    		   url:feeInManage.actionPath+"confirmSubmitFee.action",
    		   data:{
    			   stuNum:stuNum,
    			   clubId:clubId
    			   },
    		   type:'POST',
    		   dataType:'JSON',
    		   success:function(response){
    			   if(response.resultFlag){
    				   var obj = {};
                       obj["Ptext"] = "确认成功";
                       operationTipsTrue(obj);
    			   }else{
    				   var obj = {};
                       obj["Ptext"] = response.Msg;
                       operationTipsFailed(obj);
    			   }
 			   parent.layui.table.reload('contenttable',{page:{curr:1}});
 			   
    		   },
    		   error:function(){
    			   var obj = {};
                   obj["Ptext"] = "系统出错";
                   operationTipsFailed(obj);
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
       addOtherFee:function(){
    	   rightPopWindow("添加其他收入","80%","feeInRightWindow");
           $("p.error").remove();
       },
       saveOtherFee:function(){
    	   var reason = $("#edit-reason").val();
    	   var budgeter = $("#edit-budgeter").val();
    	   var budget = $("#edit-budget").val();
    	   $.ajax({
    		   url:feeInManage.actionPath+"saveOtherFee.action",
    		   type:'post',
    		   data:{
    			   reason:reason,
    			   budgeter:budgeter,
    			   budget:budget
    		   },
    		   dataType:'JSON',
    		   success:function(response){
    			   if(response.resultFlag){
    				   var obj = {};
                       obj["Ptext"] = "添加成功";
                       operationTipsTrue(obj);
    			   }else{
    				   var obj = {};
                       obj["Ptext"] = response.Msg;
                       operationTipsFailed(obj);
    			   }
    			   closeRightWindow("feeInRightWindow");
    		   },
    		   error:function(){
    			   var obj = {};
                   obj["Ptext"] = "系统异常";
                   operationTipsFailed(obj);
                   closeRightWindow("feeInRightWindow");
    		   }
    		   
    	   });
       },
       queryMemberByKey:function(keyword){
    	   	$.ajax({
    	   		url:feeInManage.actionPath+"queryMemberByKey.action",
    	   		type:'post',
    	   		data:{
    	   			keyword:keyword
    	   		},
    	   		dataType:'JSON',
    	   		success:function(response){
    	   			$.each(response.data,function(i,item){
    	   				$("#edit-budgeterul").append('<li onclick=feeInManage.choseBudgeter('+item.stuNum+',"'+item.stuName+'")>'+item.stuName+'</li>');
    	   			});
    	   		},
    	   		error:function(){
    	   		 var obj = {};
                 obj["Ptext"] = "系统出错";
                 operationTipsFailed(obj);
    	   		}
    	   	});
       },
       choseBudgeter:function(stuNum,stuName){
    	   $("#edit-budgeter").val(stuNum);
    	   $("#edit-budgeterName").val(stuName);
    	   $("#edit-budgeterul").hide();
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

    obj.feeInManage=feeInManage;
})(window);