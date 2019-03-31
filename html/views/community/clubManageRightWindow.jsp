<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="clubManageRightWindow" class="right-alert">
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
			<span class="right-alert_head_title">社团管理</span>
		</div>

		<!---<<<<  弹窗正文部分   >>>>-->
		<div class="right-alert_content">
			<div class="tabs_box">
				<div class="tabs-wapper open">
					<ul class="view-ul clear-fixed">
						<!-- <input type="hidden" id="edit-CodeId"> -->
						
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>社团名：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-clubName" type="text"/>
								<input type="hidden" id="edit-clubId">
								
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>所属学院：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-collegeName" type="text" style="cursor:pointer;caret-color: transparent;"/>
								<input type="hidden" id="edit-collegeId">
								<ul id="edit-collegeul" class="form-select-menu">
		
								</ul>
							</div>
						</li>
						<li class="form-items" style="margin-left:1px;">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>简介：</span>
							</div>
							<div class="form-right">
								<!-- <input class="required" id="edit-departName" type="text" style="cursor:pointer;caret-color: transparent;"/> -->
								<textarea id="edit-intro" class="required" style="max-width:180%;width:180%;height:180px;max-height:180px;" rows="8" cols="40" placeholder="介绍一下社团..."></textarea>
							</div>
						</li>
						<li class="form-items birthdateLi" style="margin-left:178px;">
							<div class="form-left">
								<span><i class="iconfont"></i>创建时间：</span>
							</div>
							<div class="form-right">
								<input id="edit-birthdate" type="text"/>
								
							</div>
						</li>
						<div class="col-full center over">
							<a class="form-btn-div" style="position:absolute;top:85%;right:20px;">
								<button type="button" class="TextBtn cancel-btn">关闭</button>
								<button type="button" class="TextBtn-import" onclick="clubManage.saveClub();">保存</button>
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
