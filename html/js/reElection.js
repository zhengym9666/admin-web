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
   var reElection={
       actionPath:	rootPath + "/reElection/",
       
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
       queryById:function(stuNum,clubId,departmentId){
           $.ajax({
               url : reElection.actionPath + "queryElectorInfoById.action",
               type:'post',
               data : {
            	   stuNum:stuNum,
            	   clubId:clubId
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
                       $("#edit-joinTime").val(item.joinTime);
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
       viewReElection:function(stuNum,clubId,departmentId){
           rightPopWindow("查看社员信息","80%","reElectionRightWindow");
           $("p.error").remove();
           $(".right-alert_content ul input").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").hide();
           $("#edit-job").parent().removeClass("ui-down");
           reElection.queryById(stuNum,clubId,departmentId);
       },
       pickOneToSenior:function(stuNum,clubId,departmentId,ToRank){
    	   $.ajax({
    		   url:reElection.actionPath+"pickOneToSenior.action",
    		   type:'post',
    		   data:{
    			   stuNum:stuNum,
    			   clubId:clubId,
    			   ToRank:ToRank
    			   },
			   dataType:'JSON',
			   success:function(response){
				   if(response.resultFlag){
					   var obj = {};
                       obj["Ptext"] = '您已成功选定新一任副部(会)长，老一任副部(会)长将失去管理员特权';
                       operationTipsTrue(obj);
                       parent.layui.table.reload('contenttable',{
                           where:{
                                 keyword3:"2",
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
			  error:function(){
				  var obj = {};
                  obj["Ptext"] = '系统出错';
                  operationTipsFailed(obj);
			  }
    	   });
       },
       repealOneSenior:function(stuNum,clubId,departmentId){
    	   $.ajax({
    		   url:rootPath+'/reElection/repealOneSenior.action',
    		   type:'post',
    		   data:{
    			   stuNum:stuNum,
    			   clubId:clubId
    		   },
    		   dataType:'JSON',
    		   success:function(response){
    			   if(response.resultFlag){
    				   var obj = {};
                       obj["Ptext"] = '撤职成功';
                       operationTipsTrue(obj); 
    			   }else{
    				   var obj = {};
                       obj["Ptext"] = response.Msg;
                       operationTipsFailed(obj);
    			   }
    			   parent.layui.table.reload('contenttable',{
                       where:{
                             keyword3:"99",
                             keyword1:'',
                             keyword2:''
                       }
                   });
    		   },
    		   error:function(){
    			   var obj = {};
                   obj["Ptext"] = '系统出错';
                   operationTipsFailed(obj);
                   parent.layui.table.reload('contenttable',{
                       where:{
                             keyword3:"99",
                             keyword1:'',
                             keyword2:''
                       }
                   });
    		   }
    	   });
       },
       login:function(){
    	   $.ajax({
    		   url:reElection.actionPath+"loginAction.action",
    		   type:'post',
    		   data:{},
    		   dataType:'JSON',
    		   success:function(){
    			   var obj = {};
                   obj["Ptext"] = '登录成功';
                   operationTipsTrue(obj);
    		   },
    		   error:function(){
    			   
    		   }
    	   })
       }
       
   }

    obj.reElection=reElection;
})(window);