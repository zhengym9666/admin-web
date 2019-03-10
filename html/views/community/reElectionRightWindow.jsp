<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="reElectionRightWindow" class="right-alert">
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
			<span class="right-alert_head_title">查看社员信息</span>
		</div>

		<!---<<<<  弹窗正文部分   >>>>-->
		<div class="right-alert_content">
			<div class="tabs_box">
				<div class="tabs-wapper open">
					<ul class="view-ul clear-fixed">
						<!-- <input type="hidden" id="edit-CodeId"> -->
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>学号：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-num" type="text" />
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>姓名：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-name" type="text" />
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>性别：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-gender" type="text" />
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>专业：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-profession" type="text" />
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>班级：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-grade" type="text" />
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>邮箱：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-email" type="text" />
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>电话：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-phone" type="text" />
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>部门：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-departName" type="text" style="cursor:pointer;caret-color: transparent;"/>
								<ul id="edit-departul" class="form-select-menu">
		
								</ul>
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>加入时间：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-joinTime" type="text" style="cursor:pointer;caret-color: transparent;"/>
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>职位：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-job" type="text" style="cursor:pointer;caret-color: transparent;"/>
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont"></i>头像：</span>
							</div>
							<div class="form-right">
							<div id="addCommodityIndex">
					             <!--input-group start-->
					            <div class="input-group row">
					
					                <div class="col-sm-9 big-photo">
					                	<div id="preview">
					                		
					                        <img class="HeadPhoto" id="imghead" border="0" width="90" height="90" onclick="$('.previewImg').click();">
					                     </div>
					                     	<form class="uploadForm" method="post" action="" enctype="multipart/form-data">         
					                    	<input type="hidden" name="stuNum" class="ImgStuNum">
					                    	<input type="file" name="file" onchange="previewImage(this)" style="display: none;" class="previewImg">
					                	<!--<input id="uploaderInput" class="uploader__input" style="display: none;" type="file" accept="" multiple="">-->
					               			</form>
					                </div>
					            </div>
				         		<!--input-group end-->
							</div>
								
								<!-- <form class="uploadForm" method="post" action="" enctype="multipart/form-data">
									<input type="file" name="file" />
									<input type="reset" value="重置" />
									<input type="hidden" name="stuNum" class="ImgStuNum">
									<input type="button" value="上传" onclick="MemberInfo.loadImage();"/>
								</form>
								<img alt="头像" src="" class="uploadedImg"/> -->

							</div>
						</li>
						<div class="col-full center over">
							<a class="form-btn-div">
								<button type="button" class="TextBtn cancel-btn">关闭</button>
								<button type="button" class="TextBtn-import" onclick="MemberInfo.saveMemberInfo();">保存</button>
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
