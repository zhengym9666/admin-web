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
   var clubManage={
       actionPath:	rootPath + "/club/",
       
       addClub:function(){
    	   isUpdate = 0;
    	   $(".right-alert_content ul .TextBtn-import").show();
    	   $(".birthdateLi").hide();
    	   $("#edit-clubName").val('');
    	   $("#edit-intro").val('');
    	   $("#edit-clubId").val('');
    	   $("#edit-collegeName").val('');
    	   $("#edit-collegeId").val('');
    	   rightPopWindow("添加社团","80%","clubManageRightWindow");
    	   clubManage.loadCollegeList();
       },
       
       queryClubs:function(){
   	
    	   $.ajax({
    		   url:clubManage.actionPath+"queryAllClub.action",
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
       saveClub:function(){
    	   
    	   if(clubManage.checkInput()){
           var clubName=encodeURI($("#edit-clubName").val(),"UTF-8");
           var intro=encodeURI($("#edit-intro").val(),"UTF-8");
           var clubId = $("#edit-clubId").val();
           var collegeName = encodeURI($("#edit-collegeName").val(),"UTF-8");
           var collegeId = $("#edit-collegeId").val();
           
           
           $.ajax({
               url : clubManage.actionPath + "saveClub.action",
               type:'post',
               async:false,
               cache:false,
               data : {
            	   clubName:clubName,
            	   intro:intro,
            	   clubId:clubId,
            	   collegeId:collegeId,
                   isUpdate:isUpdate
                   },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var obj = {};
                       obj["Ptext"] = "操作成功";
                       obj['func']=clubManage.queryClubs();
                       closeRightWindow("clubManageRightWindow");
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
       deleteClub:function(clubId){
           var operateWarnObj = {
               Ptext: "您确定要删除吗？",
               Stext: "一经删除可不恢复",
               func:function(){
                   $.ajax({
                       url : clubManage.actionPath + "deleteClub.action",
                       type:'post',
                       async:false,
                       cache:false,
                       data : {
                    	   clubId:clubId
                       },
                       dataType:'JSON',
                       success : function(response) {
                           if(response.resultFlag){
                               var obj = {};
                               obj["Ptext"] = "操作成功";
                               operationTipsTrue(obj);
                               obj['func']=clubManage.queryClubs();
                               closeRightWindow("clubManageRightWindow");
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
       queryById:function(clubId){
           $.ajax({
               url : clubManage.actionPath + "queryClubById.action",
               type:'post',
               data : {
            	   clubId:clubId
               },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var item=response.data;
                       $("#edit-clubName").val(item.clubName);
                	   $("#edit-intro").val(item.intro);
                	   $("#edit-clubId").val(item.clubId);
                	   $("#edit-collegeName").val(item.collegeName);
                	   $("#edit-collegeId").val(item.collegeId);
                	   $("#edit-birthdate").val(item.birthdate);
                      
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
       editClub:function(clubId){
    	   isUpdate = 1;
           rightPopWindow("编辑社团信息","80%","clubManageRightWindow");
           $(".right-alert_content ul input").removeAttr("disabled");
           $("#edit-birthdate").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").show();
           $(".birthdateLi").show();
           clubManage.queryById(clubId);
           clubManage.loadCollegeList();
       },
       viewClub:function(clubId){
           rightPopWindow("查看社团信息","80%","clubManageRightWindow");
           $("p.error").remove();
           $(".right-alert_content ul input").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").hide();
           $("#edit-collegeName").parent().removeClass("ui-down");
           $(".birthdateLi").show();
           clubManage.queryById(clubId);
       },
       queryAllCollege:function(){
    	   $("#edit-collegeul").html("");
    	   $.ajax({
    		   url:rootPath+"/college/queryCollegeList.action",
    		   type:'post',
    		   data:{},
    		   async:false,
    		   dataType:'JSON',
    		   success:function(response){
    			   if(response.resultFlag){
    				   $.each(response.data,function(i,item){
    					   if(i==0){
    						   $("#edit-collegeul").append(
        							   '<li class="choosed" val="'+item.id+'" onclick=clubManage.chooseCollege("'+item.fullname+'","'+item.id+'")>'+item.fullname+"</li>"
        							   );
    					   }else{
    						   $("#edit-collegeul").append(
        							   '<li val="'+item.id+'" onclick=clubManage.chooseCollege("'+item.fullname+'","'+item.id+'")>'+item.fullname+"</li>"
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
       chooseCollege:function(collegeName,collegeId){
    	   $("#edit-collegeul").hide();
    	   $("#edit-collegeName").val(collegeName);
    	   $("#edit-collegeId").val(collegeId);
    	   
       },
       loadCollegeList:function(){
    	   $("#edit-collegeName").parent().addClass("ui-down");
           $("#edit-collegeName").click(function(){
        	   $("#edit-collegeul").show();
           });
           clubManage.queryAllCollege();
       }
       
       
   }

    obj.clubManage=clubManage;
})(window);