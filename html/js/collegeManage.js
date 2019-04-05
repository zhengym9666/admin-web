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
   var collegeManage={
       actionPath:	rootPath + "/college/",
       
       addCollege:function(){
    	   isUpdate = 0;
    	   $(".right-alert_content ul .TextBtn-import").show();
    	   $(".right-alert_content ul input").removeAttr("disabled");
           $(".right-alert_content ul textarea").removeAttr("disabled","disabled");
    	   $("#edit-fullName").val('');
    	   $("#edit-collegeId").val('');
    	   $("#edit-abbr").val('');
    	   $("#edit-intro").val('');
    	   rightPopWindow("添加学院","80%","collegeManageRightWindow");
       },
       queryColleges:function(){
    	   	
    	   $.ajax({
    		   url:collegeManage.actionPath+"queryAllCollege.action",
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
       saveCollege:function(){
    	   
    	   if(collegeManage.checkInput()){
           var fullName=encodeURI($("#edit-fullName").val(),"UTF-8");
           var abbr = encodeURI($("#edit-abbr").val(),"UTF-8");
           var intro=encodeURI($("#edit-intro").val(),"UTF-8");
           var collegeId = $("#edit-collegeId").val();
           
           $.ajax({
               url : collegeManage.actionPath + "saveCollege.action",
               type:'post',
               async:false,
               cache:false,
               data : {
            	   fullName:fullName,
            	   abbr:abbr,
            	   intro:intro,
            	   collegeId:collegeId,
                   isUpdate:isUpdate
                   },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var obj = {};
                       obj["Ptext"] = "操作成功";
                       obj['func']=collegeManage.queryColleges();
                       closeRightWindow("collegeManageRightWindow");
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
       deleteCollege:function(collegeId){
           var operateWarnObj = {
               Ptext: "您确定要删除吗？",
               Stext: "一经删除可不恢复",
               func:function(){
                   $.ajax({
                       url : collegeManage.actionPath + "deleteCollege.action",
                       type:'post',
                       async:false,
                       cache:false,
                       data : {
                    	   collegeId:collegeId
                       },
                       dataType:'JSON',
                       success : function(response) {
                           if(response.resultFlag){
                               var obj = {};
                               obj["Ptext"] = "操作成功";
                               operationTipsTrue(obj);
                               obj['func']=collegeManage.queryColleges();
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
       queryById:function(collegeId){
           $.ajax({
               url : collegeManage.actionPath + "queryCollege.action",
               type:'post',
               data : {
            	   collegeId:collegeId
               },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var item=response.data;
                       $("#edit-fullName").val(item.fullName);
                       $("#edit-collegeId").val(item.collegeId);
                       $("#edit-abbr").val(item.abbr);
                       $("#edit-intro").val(item.intro);
                       $(".collegeImg").attr("src","/Cache/collegeImages/"+item.image);
                      
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
       editCollege:function(collegeId){
    	   isUpdate = 1;
           rightPopWindow("编辑学院信息","80%","collegeManageRightWindow");
           $(".right-alert_content ul input").removeAttr("disabled");
           $(".right-alert_content ul textarea").removeAttr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").show();
           collegeManage.queryById(collegeId);
       },
       viewCollege:function(collegeId){
           rightPopWindow("查看学院","80%","collegeManageRightWindow");
           $("p.error").remove();
           $(".right-alert_content ul input").attr("disabled","disabled");
           $(".right-alert_content ul textarea").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").hide();
           collegeManage.queryById(collegeId);
       },
       loadImage:function(){
    	   
    	   var myForm = new FormData($(".uploadForm")[0]);
    	   /*myForm.append('file',$(".uploadForm")[0]);
    	   myForm.append('stuNum',$(".ImgStuNum").val());*/
    	   //var Image = new FormData($(".uploadForm")[0]);
    	   
    		//console.log(uploadFile);
    		$.ajax({
				url:collegeManage.actionPath+"uploadImage.action",
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

    obj.collegeManage=collegeManage;
})(window);