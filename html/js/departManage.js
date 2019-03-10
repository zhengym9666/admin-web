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
   var departInfo={
       actionPath:	rootPath + "/departmentInfo/",
       
       addDepartInfo:function(){
    	   isUpdate = 0;
    	   $(".right-alert_content ul .TextBtn-import").show();
    	   $("#edit-departName").val('');
    	   $("#edit-intro").val('');
    	   $("#edit-departId").val('');
    	   rightPopWindow("添加部门","80%","departManageRightWindow");
       },
       
       queryDepartInfos:function(){
   	
    	   $.ajax({
    		   url:departInfo.actionPath+"queryAllDepartmentInfo.action",
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
       saveDepartInfo:function(){
    	   
    	   if(departInfo.checkInput()){
           var departName=encodeURI($("#edit-departName").val(),"UTF-8");
           var intro=encodeURI($("#edit-intro").val(),"UTF-8");
           var departId = encodeURI($("#edit-departId").val(),"UTF-8");
           
           $.ajax({
               url : departInfo.actionPath + "saveDepartInfo.action",
               type:'post',
               async:false,
               cache:false,
               data : {
            	   departName:departName,
            	   intro:intro,
            	   departId:departId,
                   isUpdate:isUpdate
                   },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var obj = {};
                       obj["Ptext"] = "操作成功";
                       obj['func']=departInfo.queryDepartInfos();
                       closeRightWindow("departManageRightWindow");
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
       deleteDepartInfo:function(departId){
           var operateWarnObj = {
               Ptext: "您确定要删除吗？",
               Stext: "一经删除可不恢复",
               func:function(){
                   $.ajax({
                       url : departInfo.actionPath + "deleteDepartInfo.action",
                       type:'post',
                       async:false,
                       cache:false,
                       data : {
                    	   departId:departId
                       },
                       dataType:'JSON',
                       success : function(response) {
                           if(response.resultFlag){
                               var obj = {};
                               obj["Ptext"] = "操作成功";
                               operationTipsTrue(obj);
                               obj['func']=departInfo.queryDepartInfos();
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
       queryById:function(departId){
           $.ajax({
               url : departInfo.actionPath + "queryDepartInfo.action",
               type:'post',
               data : {
            	   departId:departId
               },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var item=response.data;
                       $("#edit-departName").val(item.departName);
                       $("#edit-departId").val(item.departId);
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
       editDepartInfo:function(departId){
    	   isUpdate = 1;
           rightPopWindow("编辑部门","80%","departManageRightWindow");
           $(".right-alert_content ul input").removeAttr("disabled");
           $("#edit-num").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").show();
           departInfo.queryById(departId);
       },
       viewDepartInfo:function(departId){
           rightPopWindow("查看部门","80%","departManageRightWindow");
           $("p.error").remove();
           $(".right-alert_content ul input").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").hide();
           $("#edit-job").parent().removeClass("ui-down");
           departInfo.queryById(departId);
       },
       queryDepartment:function(){
    	   $.ajax({
    		   url:MemberInfo.actionPath+"queryDepartment.action",
    		   type:'post',
    		   data:{},
    		   async:false,
    		   dataType:'JSON',
    		   success:function(response){
    			   if(response.resultFlag){
    				   $.each(response.data,function(i,item){
    					   if(i==0){
    						   $("#edit-departul").append(
        							   '<li class="choosed" val="'+item.departId+'" onclick=MemberInfo.chooseDepart("'+item.departName+'","'+item.departId+'")>'+item.departName+"</li>"
        							   );
    					   }else{
    						   $("#edit-departul").append(
        							   '<li val="'+item.departId+'" onclick=MemberInfo.chooseDepart("'+item.departName+'","'+item.departId+'")>'+item.departName+"</li>"
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
    	   $("#edit-job").parent().addClass("ui-down");
           $("#edit-departName").parent().addClass("ui-down");
           $("#edit-job").click(function(){
        	   $("#edit-jobul").show();
           });
           $("#edit-departName").click(function(){
        	   $("#edit-departul").show();
           });
           $("#edit-jobul li").click(function(){
        	   $("#edit-jobul").hide();
        	   $("#edit-job").val($(this).text());
        	   if($(this).text()=="普通社员"){
        		   $("#edit-rank").val("1");
        	   }else if($(this).text()=="副部长"){
        		   $("#edit-rank").val("2");
        	   }else{
        		   $("#edit-rank").val("3");
        	   }
           });
           MemberInfo.queryDepartment();
       },
       loadImage:function(){
    	   
    	   var myForm = new FormData($(".uploadForm")[0]);
    	   /*myForm.append('file',$(".uploadForm")[0]);
    	   myForm.append('stuNum',$(".ImgStuNum").val());*/
    	   //var Image = new FormData($(".uploadForm")[0]);
    	   
    		//console.log(uploadFile);
    		$.ajax({
				url:MemberInfo.actionPath+"uploadHead.action",
				type:'POST',
				data:myForm,
				async: false,  
				cache: false, 
				contentType: false, //不设置内容类型
				processData: false, //不处理数据
				success:function(data){
					var obj = {};
					obj["Ptext"] = data.msg;
					if(data.resultFlag){
	                    operationTipsTrue(obj);
					}else{
		                operationTipsFailed(obj);
					}
					
				},
				error:function(){
					var obj = {};
	                obj["Ptext"] = "图片上传失败";  
	                operationTipsFailed(obj);
				}
			});
    		
    	  
       }
       
       
   }

    obj.departInfo=departInfo;
})(window);