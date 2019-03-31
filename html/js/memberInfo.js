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
   var MemberInfo={
       actionPath:	rootPath + "/memberInfo/",
       
       addMemberInfo:function(){
    	   isUpdate = 0;
    	   rightPopWindow("添加社员","80%","memberInfoRightWindow");
    	   $("#edit-num").val('');
    	   $("#edit-name").val('');
    	   $("#edit-gender").val('');
    	   $("#edit-profession").val('');
    	   $("#edit-grade").val('');
    	   $("#edit-email").val('');
    	   $("#edit-phone").val('');
    	   $("#edit-interest").val('');
    	   $("#edit-special").val('');
    	   $("#edit-departName").val('');
    	   $("#edit-job").val('');
    	   $(".right-alert_content ul .TextBtn-import").show();
    	   MemberInfo.loadList();
       },
       
       queryMemberInfos:function(){
   		
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
    	   $(".stuNum").val('');
           $(".stuName").val('');
    	   $.ajax({
    		   url:MemberInfo.actionPath+"queryAllMemberInfo.action",
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
       queryById:function(stuNum,clubId){
           $.ajax({
               url : MemberInfo.actionPath + "queryMemberInfo.action",
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
                       $("#edit-departId").val(item.departId);
                       $("#edit-job").val(item.job);
                       $("#edit-rank").val(item.rank);
                       $(".ImgStuNum").val(item.num);
                       $(".HeadPhoto").attr("src","/Cache/Img_Cache/"+item.head);
                      
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
       editMemberInfo:function(stuNum,clubId){
    	   isUpdate = 1;
           rightPopWindow("编辑社员信息","80%","memberInfoRightWindow");
           $(".right-alert_content ul input").removeAttr("disabled");
           $("#edit-num").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").show();
           MemberInfo.queryById(stuNum,clubId);
           MemberInfo.loadList();
       },
       viewMemberInfo:function(paramType,paramName){
           rightPopWindow("查看社员信息","80%","memberInfoRightWindow");
           $("p.error").remove();
           $(".right-alert_content ul input").attr("disabled","disabled");
           $(".right-alert_content ul .TextBtn-import").hide();
           $("#edit-job").parent().removeClass("ui-down");
           MemberInfo.queryById(paramType,paramName);
       },
       queryDepartment:function(){
    	   $("#edit-departul").html("");
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

    obj.MemberInfo=MemberInfo;
})(window);