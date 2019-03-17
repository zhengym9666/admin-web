<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="feeInRightWindow" class="right-alert">
	<!---<<<<  弹窗左侧阴影   >>>>-->
	<div class="right-alert-closeBg">
		<div class="right-alert-boxShadow"></div>
	</div>
	<!---<<<<  弹窗内容区域   >>>>-->
	<div class="right-alert-main">

		<!---<<<<  弹窗头部标题   >>>>-->
		<div class="right-alert_head" style="padding-bottom:0px;height:140px">
			<button class="right-alert-closeBtn">
				<i class="iconfont icon-close"></i>
			</button>
			<span class="right-alert_head_title">添加其他收入</span>
		</div>

		<!---<<<<  弹窗正文部分   >>>>-->
		<div class="right-alert_content">
			<div class="tabs_box">
				<div class="tabs-wapper open">
					<ul class="view-ul clear-fixed">
						<!-- <input type="hidden" id="edit-CodeId"> -->
						
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>收入来源：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-reason" type="text"/>							
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>上交者：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-budgeterName" type="text"/>
								<input type="hidden" id="edit-budgeter">
								<ul id="edit-budgeterul" class="form-select-menu">
	
								</ul>
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>收入金额：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-budget" type="text"/>
							</div>
						</li>
						<div class="col-full center over">
							<a class="form-btn-div" style="position:absolute;top:85%;right:20px;">
								<button type="button" class="TextBtn cancel-btn">关闭</button>
								<button type="button" class="TextBtn-import" onclick="feeInManage.saveOtherFee();">保存</button>
							</a>
						</div>
					</ul>
				</div>
			</div>

		
		</div>
	</div>
	
</div>
<script src="http://www.jq22.com/jquery/jquery-1.10.2.js"></script>
    <script>
      //图片上传预览    IE是用了滤镜。
        function previewImage(file)
        {
          var MAXWIDTH  = 90; 
          var MAXHEIGHT = 90;
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=imghead onclick=$(".previewImg").click()>';
              var img = document.getElementById('imghead');
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
          MemberInfo.loadImage();
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
    </script>
