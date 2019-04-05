<%@ page language="java"  pageEncoding="utf-8"%>
<html>
<head>
    <script type="text/javascript">
        var rootPath = "<%=request.getContextPath()%>";
    </script>
<title>精品社团管理系统</title>
<style type="text/css">
*{ font-size:9pt;}
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-repeat: repeat-x;
	background-color: #033E66;
}
.STYLE6 {color: #FFFFFF}
.STYLE5 {color: #CCFFCC;
	font-size: 26pt;
}
.STYLE7 {
	color: #FFFFFF；
		
	}
.table-left{
	width:74px;
	height:30px;
}
.table-left span{
	color:#FFFFFF;
	font-size:13px;
}
.table-right{
	width:280px;
	height:22px;
}
.table-right input{
	border:solid 1px #5a88a5;
	border-radius:4px;
	width:145px;
	height:94%;
	background-color:#f4f9fdf5;
}
#loadImage{
    position:  absolute;
    margin-left: 2px;
    margin-top: -2px;
	
}
.submitbtn{
	width:200px;
	height:35px;
	position:absolute;
	margin-top:142px;
	margin-left:78px;
}
.submitbtn input{
	width:60px;
	height:28px;
	border:none;
	background:#1c922c;
	color:#fff;
	border-radius:4px;
}
.submitbtn input:hover{
	cursor:pointer;
}
.submitbtn input[type="reset"]{
	background:#626763;
	margin-left:10px;
}
#collegeName,#clubName,#pior{
	caret-color: transparent;
}
#collegeName:hover,#clubName:hover,#pior{
	cursor:pointer;
}
#collegeul,#clubul,#piorul{
	position:  absolute;
    left: 687px;
    color: #000;
    border: 1px #a4a6a7 solid;
    width: 102px;
    background: #dce0e2;
    margin-top: 12px;
    z-index: 99;
    display:none;
}
ul li{
	list-style:none;
	height:23px;
	line-height:23px;
	color:#333;
	font-size:13px;
	margin-left:-40px;
	text-align:center;
}
ul li:hover{
	background:#d4cfcf;
	cursor:pointer;
}
#clubul{
	position:  absolute;
}
.ui-down{
	background:url(theme/img/down.png) no-repeat;
	background-size:14px;
	background-position-x:125px;
	background-position-y:6px;
}
.verify-sub-block{
	overflow:visible;
}
#mpanel4{
	margin-top:50px;
	margin-left:-20px;
	position:absolute;
	z-index:99;
	display:none;
}
.geneAdmin,.superAdmin{
	display:none;
}
</style>

<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link rel="stylesheet" type="text/css" href="verify/css/verify.css">
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<p>&nbsp;</p>
<table width="64%" height="56" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="56"><div style="font-family:宋体; color:#FFFFFF; filter:Glow(Color=#000000,Strength=2); WIDTH: 100%; FONT-WEIGHT: bold; FONT-SIZE: 19pt; margin-top:5pt">
      <div align="center" class="STYLE5">广州大学学生社团管理系统</div>
    </div></td>
  </tr>
</table>
<table width="907" height="433" border="0" align="center" background="images/hsgbg2.jpg" id="__01">
  <tr>
    <td height="134" colspan="3">&nbsp;</td>
  </tr>
  <tr>
    <td width="317" rowspan="2">&nbsp;</td>
    <td width="295" height="152"><table width="261" border="0" align="right">
    
    	<tr>
          <td class="table-left"><span>权限：</span></td>
          <td class="table-right">
          <input type="hidden" id="piorId">
          <input type="text" id="pior" class="ui-down">
          </td>
          <td>
          	<ul id="piorul">
          		<li id="1">管理员</li>
          		<li id="2">超级管理员</li>
          	</ul>
          </td>
        </tr>
        <tr class="geneAdmin">
          <td class="table-left"><span>学号：</span></td>
          <td class="table-right"><input name="stuId" type="text" id="stuId"></td>
        </tr>
        <tr class="geneAdmin">
          <td class="table-left"><span>学院：</span></td>
          <td class="table-right">
          <input type="hidden" id="collegeId">
          <input name="college" type="text" id="collegeName" class="ui-down">
          </td>
          <td>
          	<ul id="collegeul">
<!--           		<li>爱神的箭</li>
          		<li>爱神的箭</li>
          		<li>爱神的箭</li>
          		<li>爱神的箭</li> -->
          	</ul>
          </td>
        </tr>
        <tr class="geneAdmin">
          <td class="table-left"><span>社团：</span></td>
          <td class="table-right">
          <input type="hidden" id="clubId">
          <input name="club" type="text" id="clubName" class="ui-down">
          </td>
          <td>
          	<ul id="clubul">
          	</ul>
          </td>
        </tr>
        <tr class="superAdmin">
        	 <td class="table-left"><span>账号：</span></td>
          	 <td class="table-right"><input name="admin" type="text" id="admin"></td>
        </tr>
        <tr>
          <td class="table-left"><span>密码：</span></td>
          <td class="table-right"><input name="pwd" type="password" id="password"></td>
        </tr>
        <tr>
        	<div id="mpanel4">
          	</div>	
        </tr>
          <div class="submitbtn">
          		<input type="submit" name="Submit" value="登陆" onClick="showVertify();">
                <input type="reset" name="Submit2" value="重置"></td>
        </div>
    </table></td>
    <td width="338" rowspan="2">&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>
</body>
<script type="text/javascript" src="common/js/jquery-1.11.1.min.js"></script>
<script src="verify/js/jquery.min.js"></script>
<script type="text/javascript" src="verify/js/verify.js" ></script>
<script>
	$(function(){
		$("#collegeName").click(function(){
			$("#collegeul").toggle();
		});
		
		$("#clubName").click(function(){
			$("#clubul").toggle();
		});
		
		$("#pior").click(function(){
			$("#piorul").show();
		});
		
		$("#piorul li").click(function(){
			$("#pior").val($(this).text());
			$("#piorId").val($(this).attr("id"));
			$("#piorul").hide();
			if($(this).attr("id")=="1"){
				$(".geneAdmin").show();
				$(".superAdmin").hide();
				$(".submitbtn").css("margin-top","169px");
				$(".submitbtn").css("margin-left","90px");
			}else if($(this).attr("id")=="2"){
				$(".superAdmin").show();
				$(".geneAdmin").hide();
				$(".submitbtn").css("margin-top","142px");
				$(".submitbtn").css("margin-left","90px");
			}
		});
		
		initVerify();
		
		$.ajax({
    		url:rootPath+"/admin/GetAllCollegeInfo.action",
    		type:'post',
    		data:{},
    		dataType:'JSON',
    		success:function(response){
    			$.each(response.data,function(i,item){
    				$("#collegeul").append('<li value='+item.id+' onclick=choseCollege('+item.id+',"'+item.fullname+'")>'+item.fullname+'</li>');
    			});
    			
    		},
    		error:function(){
    			
    		}
    	});
	
		
	});
	
	
	var choseCollege = function(collegeId,collegeName){
		$("#collegeName").val(collegeName);
		$("#collegeId").val(collegeId);
		$("#collegeul").toggle();
		$("#clubul").html('');
		$.ajax({
			url:rootPath+"/admin/queryAllClub.action",
			type:'post',
			data:{collegeId:collegeId},
			dataType:'JSON',
			success:function(response){
				$.each(response.data,function(i,item){
					$("#clubul").append('<li onclick=choseClub('+item.clubId+',"'+item.clubName+'")>'+item.clubName+'</li>');
				})
			},
			error:function(){
				
			}
		})
	};
	
	var choseClub = function(clubId,clubName){
		$("#clubId").val(clubId);
		$("#clubName").val(clubName);
		$("#clubul").toggle();
	};
	
	function showVertify(){
		$('#mpanel4').show();
	};
	
	function initVerify(){
		$('#mpanel4').slideVerify({
	    	type : 2,		//类型
			vOffset : 5,	//误差量，根据需求自行调整
	        vSpace : 5,	//间隔
	        imgName : ['1.jpg', '2.jpg'],
	        imgSize : {
	        	width: '400px',
	        	height: '200px',
	        },
	        blockSize : {
	        	width: '40px',
	        	height: '40px',
	        },
	        barSize : {
	        	width : '400px',
	        	height : '40px',
	        },
	        ready : function() {
	    	},
	        success : function() {
	        	if($("#piorId").val()=="1"){
	        	var stuId = $("#stuId").val();
	        	var collegeId = $("#collegeId").val();
	        	var clubId = $("#clubId").val();
	        	var password = $("#password").val();
	        	$.ajax({
	        		url:rootPath+"/admin/login2Action.action",
	        		type:'post',
	        		data:{
	        			stuNum:stuId,
	        			collegeId:collegeId,
	        			clubId:clubId,
	        			password:password
	        		},
	        		dataType:'JSON',
	        		success:function(response){
	        			console.log(response);
	        			if(response.resultFlag){
	        				
	        				/* var args = [{ Key:'stuNum' , Value: response.stuNum }, { Key: 'collegeId', Value: response.collegeId}, { Key: 'clubId', Value: response.clubId}, { Key: 'memInfo', Value: JSON.stringify(response.memInfo)}];
	        	            OpenWindowWithPost(response.adminUrl,
	        	            "", "NewFile", args); */
	        				window.open(response.adminUrl);
	        			}else{
							alert(response.Msg);
	        				$('#mpanel4').hide();
	        			}
	        			
	        		},
	        		error:function(){
	        			alert("请求出错");
	        		}
	        	});
	        	}else if($("#piorId").val()=="2"){
	        		var adminName = $("#admin").val();
	        		var password = $("#password").val();
	        		$.ajax({
		        		url:rootPath+"/admin/SuperLoginAction.action",
		        		type:'post',
		        		data:{
		        			adminName:adminName,
		        			password:password
		        		},
		        		dataType:'JSON',
		        		success:function(response){
		        			if(response.resultFlag){
		        				window.open(response.adminUrl);
		        			}else{
		        				alert(response.Msg);
		        				$('#mpanel4').hide();
		        			}
		        			
		        		},
		        		error:function(){
		        			alert("请求出错");
		        		}
		        	});
	        	}
	        },
	        error : function() {
//	        	alert('验证失败！');
	        }
	        
	    });
	}
	
	 function OpenWindowWithPost(url, windowoption, name, params) {
         var form = document.createElement("form");
         form.setAttribute("method", "post");
         form.setAttribute("action", url);
         form.setAttribute("target", name);

         for (var i in params) {
             var input = document.createElement('input');
             input.type = 'hidden';
             input.name = params[i].Key;
             input.value = params[i].Value;
             form.appendChild(input);
         }

         console.log(params[3].Key);
         console.log(params[3].Value);
         document.body.appendChild(form);

         //note I am using a post.htm page since I did not want to make double request to the page 
         //it might have some Page_Load call which might screw things up.
         window.open("post.htm", name, windowoption);

         form.submit();

         document.body.removeChild(form);
     }
	
</script>
</html>

