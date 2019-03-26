package com.admin.web;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.admin.bean.GroupMember;
import com.admin.bean.Student;
import com.admin.service.interfaces.IClubService;
import com.admin.service.interfaces.ICollegeService;
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
	
	@RequestMapping("/loginAction.action")
	public String loginAction(HttpServletRequest request) throws Exception{
		
		request.setCharacterEncoding("utf-8");
		String stuNum = request.getParameter("stuNum");
		String collegeId = request.getParameter("collegeId");
		String clubId = request.getParameter("clubId");
		String memInfoStr = request.getParameter("memInfo");
		
/*		JSONArray jsonArray = JSONArray.fromObject(memInfoStr);*/
		GroupMember memInfo = new GroupMember();
		JSONObject jsonObject = JSONObject.fromObject(memInfoStr);
		for(int i = 0;i<jsonObject.size();i++){
				
				memInfo.setDepartmentId(jsonObject.getString("departmentId"));
				memInfo.setRank(Integer.parseInt(jsonObject.getString("rank")));
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
	
	@RequestMapping("/logoutAction.action")
	@ResponseBody
	public void logoutAction(HttpServletRequest request){
		
		/*request.getSession().invalidate();//清除 session 中的所有信息*/		
		/*return "redirect:http://localhost:8080/gd_stu_dev/login.jsp";*/
		System.out.println("yyyyyyyy");
	}

}
