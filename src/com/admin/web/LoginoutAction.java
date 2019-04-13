package com.admin.web;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.admin.bean.Club;
import com.admin.bean.College;
import com.admin.bean.GroupMember;
import com.admin.bean.Student;
import com.admin.service.interfaces.IClubService;
import com.admin.service.interfaces.ICollegeService;
import com.admin.service.interfaces.IGroupMemberService;
import com.admin.service.interfaces.IStudentService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月18日 下午1:22:43
* @version 1.0 
* @desrciption		
*/
@Controller
@RequestMapping("/admin")
public class LoginoutAction {
	
	@Autowired
	ICollegeService collegeService;
	
	@Autowired
	IClubService clubService;
	
	@Autowired
	IStudentService studentService;
	
	@Autowired
	IGroupMemberService groupMemberService;
	
	//前台的登录管理员登录
	@RequestMapping("/loginAction.action")
	public String loginAction(HttpServletRequest request) throws Exception{
		
		request.setCharacterEncoding("utf-8");
		String stuNum = request.getParameter("stuNum");
		String collegeId = request.getParameter("collegeId");
		String clubId = request.getParameter("clubId");
		GroupMember memInfo = groupMemberService.queryMemberInfo(clubId, stuNum);
		
		/*String memInfoStr = request.getParameter("memInfo");
		GroupMember memInfo = new GroupMember();
		JSONObject jsonObject = JSONObject.fromObject(memInfoStr);
		for(int i = 0;i<jsonObject.size();i++){
				
				memInfo.setDepartmentId(jsonObject.getString("departmentId"));
				memInfo.setRank(Integer.parseInt(jsonObject.getString("rank")));
			}*/
		Map<String,Object> resultMap = new HashMap<String,Object>();

		if(memInfo==null){
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "该用户不存在");
			return "用户不存在";
		}
		
		request.getSession().setAttribute("stuNum", stuNum);
		Student stuInfo = studentService.queryStudentByStuNum(stuNum);
		request.getSession().setAttribute("stuName", stuInfo.getStuName());
		request.getSession().setAttribute("head", stuInfo.getHead());
		request.getSession().setAttribute("collegeId", collegeId);
		request.getSession().setAttribute("collegeAbbr", collegeService.queryCollegeById(collegeId).getAbbr());
		request.getSession().setAttribute("clubId", clubId);
		request.getSession().setAttribute("clubName", clubService.getClubById(clubId).getClubName());
		request.getSession().setAttribute("memInfo", memInfo);
		request.getSession().setAttribute("rank", memInfo.getRank());
		
			
		return "redirect:/#/";
	}
	
	//后台的登录页面管理员登录
	@RequestMapping("/login2Action.action")
	@ResponseBody
	public Map<String,Object> Login2Action(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		request.setCharacterEncoding("utf-8");
		String stuNum = request.getParameter("stuNum");
		String collegeId = request.getParameter("collegeId");
		String clubId = request.getParameter("clubId");
		String password = request.getParameter("password");
		GroupMember memInfo = groupMemberService.queryMemberInfo(clubId, stuNum);
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(!("000000").equals(password)){
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "密码错误");
			return resultMap;
		}
		if(memInfo==null){
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "该用户不存在");
			return resultMap;
		}

		/*//生成登录状态
		// 创建Cookie
		Cookie cookie = new Cookie("studentId", stuNum);
		// 有效期,秒为单位
		cookie.setMaxAge(60*5*12); //会话时间一个小时
		// 设置cookie
		response.addCookie(cookie);*/


		request.getSession().setAttribute("stuNum", stuNum);
		Student stuInfo = studentService.queryStudentByStuNum(stuNum);
		request.getSession().setAttribute("stuName", stuInfo.getStuName());
		request.getSession().setAttribute("head", stuInfo.getHead());
		request.getSession().setAttribute("collegeId", collegeId);
		request.getSession().setAttribute("collegeAbbr", collegeService.queryCollegeById(collegeId).getAbbr());
		request.getSession().setAttribute("clubId", clubId);
		request.getSession().setAttribute("clubName", clubService.getClubById(clubId).getClubName());
		request.getSession().setAttribute("memInfo", memInfo);
		request.getSession().setAttribute("rank", memInfo.getRank());
		
		resultMap.put("resultFlag", 1);
		resultMap.put("adminUrl", request.getContextPath()+"#/");

		return resultMap;
	}
	
	//前台的登录页面超级管理员登录
	@RequestMapping("/SuperLoginAction.action")
	public String SuperLoginAction(HttpServletRequest request){
		
		String adminName = request.getParameter("adminName");
		String path = request.getContextPath();
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		
		if(!("admin".equals(adminName))){
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "用户名错误");
		}else{
			request.getSession().setAttribute("adminName", adminName);
		}
		return "redirect:/index2.jsp#/";
	}
	
	//后台的登录页面超级管理员登录
	@RequestMapping("/SuperLogin2Action.action")
	@ResponseBody
	public Map<String,Object> SuperLogin2Action(HttpServletRequest request){
		
		String adminName = request.getParameter("adminName");
		String password = request.getParameter("password");
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		
		if(!("admin".equals(adminName) && ("admin").equals(password))){
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "用户名或密码错误");
		}else{
			resultMap.put("resultFlag", 1);
			resultMap.put("adminUrl", request.getContextPath()+"/index2.jsp");
			request.getSession().setAttribute("adminName", adminName);
		}
		return resultMap;
	}
	
	@RequestMapping("/logoutAction.action")
	@ResponseBody
	public Map<String,Object> logoutAction(HttpServletRequest request,HttpServletResponse response){
		/*//清楚登录状态的cookies
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				//System.out.println(URLDecoder.decode(cookie.getName(), "utf-8"));
				if (cookie.getName().equals("studentId")) { // 表明已经登陆过了，就直接跳转了
					cookie.setMaxAge(0); //会话无效，删除cookies
					response.addCookie(cookie);
				}
			}
		}*/
		request.getSession().invalidate();//清除 session 中的所有信息
		/*return "redirect:http://localhost:8080/gd_stu_dev/login.jsp";*/

		System.out.println("yyyyyyyy");
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("status",1);
		return resultMap;
	}
	
	@RequestMapping("/GetAllCollegeInfo.action")
	@ResponseBody
	public Map<String,Object> queryAllCollege(HttpServletRequest request,HttpServletResponse response){
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<College> collegeList = null;
		
		try {
			collegeList = collegeService.queryCollegeList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		resultMap.put("data", collegeList);
		return resultMap;
	}
	
	@RequestMapping("/queryAllClub.action")
	@ResponseBody
	public Map<String,Object> queryAllClub(HttpServletRequest request,HttpServletResponse response){
		
		String collegeId = request.getParameter("collegeId");
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Club> clublist = new ArrayList<Club>();
		
		try {
			clublist = clubService.queryClubBycollegeId(collegeId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		resultMap.put("data", clublist);
		return resultMap;
	}
	
}
