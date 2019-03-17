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
   var recruitNew={
       actionPath:	rootPath + "/recruitNew/",
       
       queryRecruitInfos:function(){
   		debugger;
           /*$.ajax({
               url : MemberInfo.actionPath + "querySysParamInfos&",
               type:'post',
               async:false,
               cache:false,
               data : {
                   start:sysParam_pages.start,
                   limit:sysParam_pages.limit,
                   paramType:$("#paramType").val(),
                   paramName:$("#paramName").val()
                   
               },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       $("#sysParamInfoList").html(' ');
                       $.each(response.root, function(i, item){
                           $("#sysParamInfoList").append('<tr>'
                               +'<td CodeType ='+item.CODE_TYPE+'>'+(item.CODE_TYPE.length>9?item.CODE_TYPE.substring(0,7)+"...":item.CODE_TYPE)+'</td>'                 
                               +'<td CodeValue ='+item.CODE_VALUE+'>'+(item.CODE_VALUE.length>9?item.CODE_VALUE.substring(0,7)+"...":item.CODE_VALUE)+'</td>'
                               +'<td CodeName ='+item.CODE_NAME+'>'+(item.CODE_NAME.length>9?item.CODE_NAME.substring(0,7)+"...":item.CODE_NAME)+'</td>'                     
                               +'<td CodeDesc ='+item.CODE_DESC+'>'+(item.CODE_DESC.length>9?item.CODE_DESC.substring(0,7)+"...":item.CODE_DESC)+'</td>'
                              
//                               +'<td state='+item.STATE+'>'+(item.STATE=='U'?'启动':'关闭')+'</td>'
                               +'<td class="operation">'  
                               +"<button type=\"button\" onclick=\"window.SmsSysParamInfo.viewSysParamInfo(" + "'"+item.CODE_TYPE+"','"+item.CODE_VALUE+"')\">详情</button>"
                               +"<button type=\"button\" onclick=\"window.SmsSysParamInfo.editSysParamInfo(" + "'"+item.CODE_TYPE+"','"+item.CODE_VALUE+"')\">编辑</button>"
                               +"<button type=\"button\" onclick=\"window.SmsSysParamInfo.deleteSysParamInfo(" + "'"+item.CODE_TYPE+"','"+item.CODE_VALUE+"')\">删除</button>"
                               +'</td>'
                               +'</tr>');
                       });
                       sysParam_pages.pages(response.totalCount, sysParam_pages);
                       
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
           });*/
    	  
    		   
    		 //搜索查询
/*    	        var active = {
    	            reload: function(){
    	                var date_s = $('#date_s').val(); //传入搜索的日期值 
    	                //执行重载
    	                table.reload('重载表格id', {
    	                    url : '搜索请求接口',
    	                    method:'请求类型',
    	                    page: {
    	                        curr: 1 //重新从第 1 页开始
    	                    }
    	                    ,where: { //类似于 data
    	                        beginDate:date_s //传入日期参数
    	                    }
    	                });
    	            }
    	        };*/
    	    $.ajax({
    	       url:recruitNew.actionPath+"queryAllRecruitInfo.action",
    		   data:{"limit":10},
    		   type:'POST',
    		   success:function(){
    			   parent.layui.table.reload('contenttable',{page:{curr:1}});
    			   $(".btn-items button").css("background","#fff");
    			   $(".btn-items button").css("color","#333");
    			   $(".btn-items button").eq(0).css("background","#24ac7e");
    			   $(".btn-items button").eq(0).css("color","#fff");
    		   },
    		   error:function(){
    			   parent.layui.table.reload('contenttable',{
                       where:{
                             keyword3:"0",
                             keyword1:'',
                             keyword2:''
                       }
                 });
    			  //parent.layui.table.reload('contenttable',{page:{curr:1}});
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
       saveMemberInfo:function(){
    	   
    	   if(MemberInfo.checkInput()){
           var num=encodeURI($("#edit-num").val(),"UTF-8");
           var name=encodeURI($("#edit-name").val(),"UTF-8");
           var gender=encodeURI($("#edit-gender").val(),"UTF-8");
           var profession=encodeURI($("#edit-profession").val(),"UTF-8");
           var grade=encodeURI($("#edit-grade").val(),"UTF-8");
           var email=encodeURI($("#edit-email").val(),"UTF-8");
           var phone=encodeURI($("#edit-phone").val(),"UTF-8");
           var interest=encodeURI($("#edit-interest").val(),"UTF-8");
           var special=encodeURI($("#edit-special").val(),"UTF-8");
           var departId=encodeURI($("#edit-departId").val(),"UTF-8");
           var rank=encodeURI($("#edit-rank").val(),"UTF-8");
           var job=encodeURI($("#edit-job").val(),"UTF-8");
           
           $.ajax({
               url : MemberInfo.actionPath + "saveMemberInfo.action",
               type:'post',
               async:false,
               cache:false,
               data : {
            	   num:num,
            	   name:name,
            	   gender:gender,
            	   profession:profession,
            	   grade:grade,
            	   email:email,
            	   phone:phone,
            	   interest:interest,
            	   special:special,
            	   departId:departId,
            	   rank:rank,
            	   job:job,
                   isUpdate:isUpdate
                   },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var obj = {};
                       obj["Ptext"] = "操作成功";
                       obj['func']=MemberInfo.queryMemberInfos();
                       closeRightWindow("memberInfoRightWindow");
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
       deleteMemberInfo:function(stuNum,clubId){
           var operateWarnObj = {
               Ptext: "您确定要删除吗？",
               Stext: "一经删除可不恢复",
               func:function(){
                   $.ajax({
                       url : MemberInfo.actionPath + "deleteMemberInfo.action",
                       type:'post',
                       async:false,
                       cache:false,
                       data : {
                    	   stuNum:stuNum,
                    	   clubId:clubId,
                       },
                       dataType:'JSON',
                       success : function(response) {
                           if(response.resultFlag){
                               var obj = {};
                               obj["Ptext"] = "操作成功";
                               operationTipsTrue(obj);
                               obj['func']=MemberInfo.queryMemberInfos();
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
       queryById:function(stuNum,clubId,departmentId){
           $.ajax({
               url : recruitNew.actionPath + "queryRecruitNewInfo.action",
               type:'post',
               data : {
            	   stuNum:stuNum,
            	   clubId:clubId,
            	   departmentId:departmentId
               },
               dataType:'JSON',
               success : function(response) {
                   if(response.resultFlag){
                       var item=response.data;
                       $("#edit-num").val(item.num);
                       $("#edit-name").val(item.name);
                       $("#edit-gender").val(item.gender);
                       $("#edit-profession").val(item.profession);
                       $("#edit-grade").val(item.grade);
                       $("#edit-email").val(item.email);
                       $("#edit-phone").val(item.phone);
                       $("#edit-interest").val(item.interest);
                       $("#edit-special").val(item.special);
                       $("#edit-departName").val(item.departName);
                       $("#edit-job").val(item.job);
                       $(".HeadPhoto").attr("src","/Cache/Img_Cache/"+item.head);
                       $(".ImgStuNum").val(item.num);
                       $("#edit-applyTime").val(item.applyTime);
                       $(".form-select-btn").children("p").text($(".choosed").text());
                       
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
       viewRecruitNewInfo:function(stuNum,clubId,departmentId){
           rightPopWindow("查看报名人员信息","80%","recruitNewRightWindow");
           $("p.error").remove();
           $(".right-alert_content ul input").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").hide();
           $("#edit-job").parent().removeClass("ui-down");
           recruitNew.queryById(stuNum,clubId,departmentId);
       },
       passRecruit:function(stuNum,clubId,departmentId){
    	   $.ajax({
    		   url:recruitNew.actionPath+"passRecruit.action",
    		   type:'post',
    		   data:{
    			   stuNum:stuNum,
    			   clubId:clubId,
    			   departmentId:departmentId
    		   },
    		   dataType:'JSON',
    		   success:function(response){
    			   if(response.resultFlag){
                       var obj = {};
                       obj["Ptext"] = "录用成功！";
                       operationTipsTrue(obj);
                       /*obj['func']=recruitNew.queryRecruitInfos();*/
                       parent.layui.table.reload('contenttable',{
                           where:{
                                 keyword3:"0",
                                 keyword1:'',
                                 keyword2:''
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
       unPassRecruit:function(stuNum,clubId,departmentId){
    	   $.ajax({
    		   url:recruitNew.actionPath+"unPassRecruit.action",
    		   type:'post',
    		   data:{
    			   stuNum:stuNum,
    			   clubId:clubId,
    			   departmentId:departmentId
    		   },
    		   dataType:'JSON',
    		   success:function(response){
    			   if(response.resultFlag){
                       var obj = {};
                       obj["Ptext"] = "淘汰成功！";
                       operationTipsTrue(obj);
                       parent.layui.table.reload('contenttable',{
                           where:{
                                 keyword3:"0",
                                 keyword1:'',
                                 keyword2:''
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
       }
       
   }

    obj.recruitNew=recruitNew;
})(window);