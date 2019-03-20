/***
 * 系统参数配置js
 * author zhengym
 * 2018-07-09
 */
$(function(){
    //sysParam_pages = new Page({id: "sysParamInfoFoot", limit: 10, visiblePages: 10, qryFunc: SmsSysParamInfo.querySysParamInfos});
});

(function(obj){
   var feeBudget={
       actionPath:	rootPath + "/feeBudgetManage/",
       
       resert:function(){
           $(".top-part .form-items input").val("");
           
       }, 
       
   }

    obj.feeBudget=feeBudget;
})(window);