<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <script type="text/javascript">
        var rootPath = "<%=request.getContextPath()%>";
    </script>
    <title>贵州短信调度平台--系统参数配置</title>
    <!---<<<<   字体图标  >>>>-->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/lib/font/iconfont.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/lib/css/normal.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/current.css" />

    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/ui.css" />
    <!---<<<<   表格相关CSS   >>>>-->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/table.css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/theme/css/strateMap.css" />

	<style>
		.ui-down{
			background:url(./././theme/img/down.png) no-repeat;
			background-size:11px;
			background-position-x:217px;
			background-position-y:13px;
			cursor:pointer
		}
		#wechatCode{
			float:left;
			margin-right:160px;
		}
		.tips{
			color:#f00;
		}
		#submitbtn{
			margin-left:470px;
		}
		
	</style>
	

</head>
<body>
<div class="viewFramework-index-body">
    <!---<<<<  标题    >>>>-->
    <span class="viewFramework-index-title">财务收款码</span>
    


    <!---<<<<  tabs    >>>>-->
    <div class="viewFramework-index-tabs ">
        <!---<<<<  tabs div    >>>>-->
        <div class="tabs_box">
            <!---<<<<  tabs div 外层    >>>>-->
            <div class="tabs-wapper open" >
                <div  class="top-part" >
                    <div >

                        <li class="form-items" clear-fixed>
                            <div class="form-btns top-part-btn" >
                                <button class="iconTextBtn-import" onclick="modifyCode()"><i class="iconfont icon-search"></i>修改收款码</button>
                            </div>
                        </li>
                    </div>

                    <!---<<<<  tabs div 主体   >>>>-->
    				  <div class="layui-col-md12">
		              <div class="layui-card">
		                <div class="layui-card-body">
		                  		<div id="codeBox">
		                  		
		                		<form class="uploadForm" method="post" action="" enctype="multipart/form-data">         
		                  		
								<div id="wechatCode">
									
					             <!--input-group start-->
					            <div class="input-group row">
					
					                <div class="col-sm-9 big-photo">
					                	<div id="preview1">
					                		
					                        <img class="HeadPhoto" id="imghead" border="0" src="/Cache/wechatcode/${wechatCode }" width="90" height="90" onclick="$('.previewImg1').click();">
					                     </div>
					                    	<input type="hidden" name="stuNum" class="ImgStuNum">
					                    	<input type="file" name="file1" onchange="previewImage(this)" style="display: none;" class="previewImg1">
					                	<!--<input id="uploaderInput" class="uploader__input" style="display: none;" type="file" accept="" multiple="">-->
					               			
					                </div>
					            </div>
					            <div class="tips">点击上传微信收款码</div>
				         		<!--input-group end-->
								</div>
 								<div id="apayCode">
					             <!--input-group start-->
					            <div class="input-group row">
					
					                <div class="col-sm-9 big-photo">
					                	<div id="preview2">
					                		
					                        <img class="HeadPhoto" id="imghead" border="0" src="/Cache/apaycode/${apayCode }" width="90" height="90" onclick="$('.previewImg2').click();">
					                     </div>
<!-- 					                     	<form class="uploadForm" method="post" action="" enctype="multipart/form-data">         
 -->					                    	<input type="hidden" name="stuNum" class="ImgStuNum">
					                    	<input type="file" name="file2" onchange="previewImage(this)" style="display: none;" class="previewImg2">
					                	<!--<input id="uploaderInput" class="uploader__input" style="display: none;" type="file" accept="" multiple="">-->
					               			<!-- </form> -->
					                </div>
						            </div>
						            <div class="tips">点击上传支付宝收款码</div>
									</div>
									</form>
							<button type="button" class="iconTextBtn-import"  id="submitbtn" onclick="loadCode()">确认</button>
								
		                </div>
		              </div>
            		</div>
                </div>
            </div>
        </div>
    </div>








    <!---<<<<   jQuery  >>>>-->
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/jQuery/jquery.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/js/current.js"></script>
    <%-- 	<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/highcharts.js"></script> --%>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/echarts-all.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/jquery.twbsPagination.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/js/ajaxmultifileupload.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/operationTips.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/pagination.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/rightPopWindow.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/theme/lib/My97DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/popIframe.js"></script>
    <script type="text/javascript" src="js/actManage.js"></script>
    <script src="https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min.js"></script>
<script src="http://www.jq22.com/jquery/jquery-1.10.2.js"></script>
    <script>
    $(function(){
    	$("input").attr("disabled","disabled");
    	 $('img').hover(function(){
	            //alert($(this).attr('src'));
	            var img = "<img class='img_msg' src='"+$(this).attr('src')+"' style='width:130px;' />";
	            img_show = layer.tips(img, this,{
	                tips:[2, 'rgba(41,41,41,.5)']
	                ,area: ['160px']
	            });
	        },function(){
	            layer.close(img_show);
	        });
	        $('td img').attr('style','max-width:70px');
    });
      //图片上传预览    IE是用了滤镜。
        function previewImage(file)
        {
          var MAXWIDTH  = 90; 
          var MAXHEIGHT = 90;
          var div;
          if (file.files && file.files[0])
          {
        	  console.log(file.name);
        	  var img;
        	  if(file.name=="file1"){
        		  div = document.getElementById('preview1');
        		  div.innerHTML ='<img id=imghead1 onclick=$(".previewImg1").click()>'; 
        		  img = document.getElementById('imghead1');
        		 
        	  }
        	  if(file.name=="file2"){
        		  div = document.getElementById('preview2');
        		  div.innerHTML ='<img id=imghead2 onclick=$(".previewImg2").click()>'; 
        		  img = document.getElementById('imghead2');
        		 
        	  }
        	  
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
                img.style.marginTop = rect.top+'px';
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
            div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
          }

        }
        function clacImgZoomParam( maxWidth, maxHeight, width, height ){
            var param = {top:0, left:0, width:width, height:height};
            if( width>maxWidth || height>maxHeight ){
                rateWidth = width / maxWidth;
                rateHeight = height / maxHeight;
                
                if( rateWidth > rateHeight ){
                    param.width =  maxWidth;
                    param.height = Math.round(height / rateWidth);
                }else{
                    param.width = Math.round(width / rateHeight);
                    param.height = maxHeight;
                }
            }
            param.left = Math.round((maxWidth - param.width) / 2);
            param.top = Math.round((maxHeight - param.height) / 2);
            return param;
        }
        
        function modifyCode(){
        	$(".HeadPhoto").attr("src","headImages/photo_icon.png");
        	$("input").removeAttr("disabled");
        }
        
	       
        
        function loadCode(){
        	 var myForm = new FormData($(".uploadForm")[0]);
      	   /*myForm.append('file',$(".uploadForm")[0]);
      	   myForm.append('stuNum',$(".ImgStuNum").val());*/
      	   //var Image = new FormData($(".uploadForm")[0]);
      	   
      		//console.log(uploadFile);
      		$.ajax({
  				url:rootPath+"/feeBudgetManage/uploadCode.action",
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
    </script>

   



</body>
</html>