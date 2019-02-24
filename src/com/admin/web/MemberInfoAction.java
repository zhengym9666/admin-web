package com.admin.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.admin.bean.Department;
import com.admin.bean.GroupMember;
import com.admin.bean.Student;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.service.interfaces.IGroupMemberService;
import com.admin.service.interfaces.IStudentService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月23日 下午2:10:55
* @version 1.0 
* @desrciption		
*/
@Controller
@RequestMapping("/memberInfo")
public class MemberInfoAction {
	
	@Autowired
	IGroupMemberService groupMemberService;
	
	@Autowired
	IStudentService studentService;
	
	@Autowired
	IDepartmentService departmentService;
	
	@RequestMapping("/queryAllMemberInfo.action")
	public void queryAllMemberInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		int i = 0;
		String clubId = "1010100";
		//获取所有社团成员
		List<GroupMember> groMemInfoList = groupMemberService.queryMemberByClubId(clubId);
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count",groupMemberService.queryMemberCount(clubId));
		
		List<Map> data = new ArrayList<Map>();
		for(GroupMember bean:groMemInfoList){
			i++;
			Student studentInfo = studentService.queryStudentByStuNum(bean.getStuNum());
			Department depInfo = departmentService.queryDepartmentById(bean.getDepartmentId());
			Map<String,Object> infoMap = new HashMap<String,Object>();
			infoMap.put("id", i);
			infoMap.put("num", bean.getStuNum());
			infoMap.put("name", studentInfo.getStuName());
			infoMap.put("gender", studentInfo.getGender());
			infoMap.put("profession", studentInfo.getProfession());
			infoMap.put("grade", studentInfo.getGrade());
			infoMap.put("email", studentInfo.getEmail());
			infoMap.put("phone", studentInfo.getPhone());
			infoMap.put("interest", studentInfo.getInterest());
			infoMap.put("special", studentInfo.getSpecial());
			infoMap.put("departName", depInfo.getName());
			infoMap.put("job", bean.getJob());
			infoMap.put("operation1", "<a onclick='MemberInfo.viewMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>详情</a>");
			infoMap.put("operation2", "<a onclick='MemberInfo.editMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>修改</a>");
			infoMap.put("operation3", "<a onclick='SmsSysParamInfo.addSysParamInfo()' style='cursor:pointer;color:#1FA075'>删除</a>");
			data.add(infoMap);
		}
		JSONArray array = JSONArray.fromObject(data);
		
		resultMap.put("data", array);
		
		response.setCharacterEncoding("utf-8");
		PrintWriter writer = response.getWriter();
		try {
			writer.print(JSONObject.fromObject(resultMap));
			writer.flush();
			writer.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/queryMemberInfo.action")
	public void queryMemberInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String clubId = request.getParameter("clubId");
		String stuNum = request.getParameter("stuNum");
		
		GroupMember oneInfo = groupMemberService.queryMemberInfo(clubId, stuNum);
		Student studentInfo = studentService.queryStudentByStuNum(oneInfo.getStuNum());
		Department depInfo = departmentService.queryDepartmentById(oneInfo.getDepartmentId());
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		Map<String,Object> infoMap = new HashMap<String,Object>();
		infoMap.put("num", oneInfo.getStuNum());
		infoMap.put("name", studentInfo.getStuName());
		infoMap.put("gender", studentInfo.getGender());
		infoMap.put("profession", studentInfo.getProfession());
		infoMap.put("grade", studentInfo.getGrade());
		infoMap.put("email", studentInfo.getEmail());
		infoMap.put("phone", studentInfo.getPhone());
		infoMap.put("interest", studentInfo.getInterest());
		infoMap.put("special", studentInfo.getSpecial());
		infoMap.put("departName", depInfo.getName());
		infoMap.put("job", oneInfo.getJob());
		resultMap.put("data", infoMap);
		response.setCharacterEncoding("utf-8");
		PrintWriter writer = response.getWriter();
		try {
			writer.print(JSONObject.fromObject(resultMap));
			writer.flush();
			writer.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
		}
	}
	
	@RequestMapping("/queryDepartment.action")
	public void queryDepartment(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String clubId = "1010100";
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		List<Map> data = new ArrayList<Map>();
		try {
			List<Department> departList = departmentService.queryDepartmentByClubId(clubId);
			for(Department item:departList){
				Map<String,String> infoMap = new HashMap<String,String>();
				infoMap.put("departId", item.getId());
				infoMap.put("departName", item.getName());
				data.add(infoMap);
			}
			resultMap.put("data", data);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
		}
		
		response.setCharacterEncoding("utf-8");
		PrintWriter writer = response.getWriter();
		try {
			writer.print(JSONObject.fromObject(resultMap));
			writer.flush();
			writer.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
		}
	}
	
	public void saveMemberInfo(HttpServletRequest request,HttpServletResponse response){
		
		String isUpdate = request.getParameter("isUpdate");
		String num = request.getParameter("num");
		String name = request.getParameter("name");
		String profession = request.getParameter("profession");
		String grade = request.getParameter("grade");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		String interest = request.getParameter("interest");
		String special = request.getParameter("special");
		String departId = request.getParameter("departId");
		int rank = Integer.parseInt(request.getParameter("rank"));
		String job = request.getParameter("job");
		
		Date joinTime = new Date();
		
		Calendar calendar = new GregorianCalendar();
		calendar.add(joinTime.getYear(), 1);
		Date exitTime = calendar.getTime();
		
		GroupMember memberInfo = new GroupMember();
		memberInfo.setClubId("1010100");
		memberInfo.setStuNum(num);
		memberInfo.setStuName(name);
		memberInfo.setDepartmentId(departId);
		memberInfo.setRank(rank);
		memberInfo.setState(1);
		memberInfo.setJob(job);
		memberInfo.setJoinTime(joinTime);
		memberInfo.setExitTime(exitTime);
		
		if("0".equals(isUpdate)){
			groupMemberService.addMemberInfo(memberInfo);
		}
	
	}
	
}
