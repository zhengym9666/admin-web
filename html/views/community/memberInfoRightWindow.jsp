<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="memberInfoRightWindow" class="right-alert">
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
			<span class="right-alert_head_title">社员管理</span>
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
								<span><i class="iconfont"></i>兴趣爱好：</span>
							</div>
							<div class="form-right">
								<input id="edit-interest" type="text" />
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont"></i>特长：</span>
							</div>
							<div class="form-right">
								<input id="edit-special" type="text" />
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>部门：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-departName" type="text" style="cursor:pointer;"/>
								<input type="hidden" id="edit-departId">
								<ul id="edit-departul" class="form-select-menu">
		
								</ul>
							</div>
						</li>
						<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>职位：</span>
							</div>
							<div class="form-right">
								<input class="required" id="edit-job" type="text" style="cursor:pointer;"/>
								<input type="hidden" id="edit-rank">
								<ul id="edit-jobul" class="form-select-menu">
									<li class="choosed" val="1">普通社员</li>
									<li val="2">副部长</li>
									<li val="3">部长</li>
								</ul>
							</div>
						</li>
					<!-- 	<li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>参数状态：</span>
							</div>
							<div class="form-right">
								<input type="text" value="启动">
								<ul id="edit-paramState" class="form-select-menu">
									<li class="choosed" val="U">启动</li>
									<li val="N">关闭</li>
								</ul>
							</div>
						</li> -->
						<div class="col-full center over">
							<a class="form-btn-div">
								<button type="button" class="TextBtn cancel-btn">关闭</button>
								<button type="button" class="TextBtn-import" onclick="SmsSysParamInfo.saveMemberInfo();">保存</button>
							</a>
						</div>
					</ul>
				</div>
			</div>

		
		</div>
	</div>
	
</div>