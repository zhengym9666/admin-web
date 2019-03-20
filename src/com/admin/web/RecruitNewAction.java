package com.admin.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.admin.bean.Department;
import com.admin.bean.GroupMember;
import com.admin.bean.Student;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.service.interfaces.IGroupMemberService;
import com.admin.service.interfaces.IStudentService;
import com.admin.util.Page;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月28日 下午5:53:46
* @version 1.0 
* @desrciption		
*/
@Controller
@RequestMapping("recruitNew")
public class RecruitNewAction {
	
	@Autowired
	IGroupMemberService groupMemberService;
	
	@Autowired
	IStudentService studentService;
	
	@Autowired
	IDepartmentService departmentService;
	
	@RequestMapping("/queryRecruitInfo.action")
	public void queryAllRecruitInfo(Page page,@RequestParam("limit")int limit,HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String clubId = (String) request.getSession().getAttribute("clubId");
//		获取所有待审核申请者
		page.setRows(limit);
		List<GroupMember> groMemInfoList = null;
		int count = 0;
		if(page.getKeyword3().equals("99")){
			groMemInfoList = groupMemberService.queryAllRecruitInfo(page,clubId);
			count = groupMemberService.queryAllRecruitInfoCount(page,clubId);
		}else{
			int state = Integer.parseInt(page.getKeyword3());
			
			String stuNum = (String) request.getSession().getAttribute("stuNum");
			//测试数据，实际从登陆后保存到的session中获取
			String departmentId = groupMemberService.queryMemberInfo(clubId, stuNum).getDepartmentId();
			
			groMemInfoList = groupMemberService.queryMyCheckInfo(page,clubId, departmentId);
			count = groupMemberService.queryMyCheckInfoCount(page, clubId, departmentId);
		}
		
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count",count);
		SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
		
		List<Map> data = new ArrayList<Map>();
//		根据所有社团成员获取学生信息
		for(GroupMember bean:groMemInfoList){
			Student stuInfo = studentService.queryStudentByStuNum(bean.getStuNum());
			Department depInfo = departmentService.queryDepartmentById(bean.getDepartmentId());
			Map<String,Object> infoMap = new HashMap<String,Object>();
			infoMap.put("num", bean.getStuNum());
			infoMap.put("name", stuInfo.getStuName());
			infoMap.put("gender", stuInfo.getGender());
			infoMap.put("profession", stuInfo.getProfession());
			infoMap.put("grade", stuInfo.getGrade());
			infoMap.put("email", stuInfo.getEmail());
			infoMap.put("phone", stuInfo.getPhone());
			infoMap.put("interest", stuInfo.getInterest());
			infoMap.put("special", stuInfo.getSpecial());
			infoMap.put("departName", depInfo.getName());
			infoMap.put("forJob", bean.getJob());
			infoMap.put("applyTime", df.format(bean.getApplyTime()));
			String head = stuInfo.getHead();
		
			infoMap.put("head", head);
			
			if(bean.getState()==0){
				infoMap.put("operation1", "<a onclick='recruitNew.viewRecruitNewInfo("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a onclick='recruitNew.passRecruit("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>录用</a>");
				infoMap.put("operation3", "<a onclick='recruitNew.unPassRecruit("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>不录用</a>");
			}else if(bean.getState()==1){
				infoMap.put("operation1", "<a onclick='recruitNew.viewRecruitNewInfo("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a>已录用</a>");
				infoMap.put("operation3", "");
			}else if(bean.getState()==2){
				infoMap.put("operation1", "<a onclick='recruitNew.viewRecruitNewInfo("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a>已淘汰</a>");
				infoMap.put("operation3", "");
			}else if(bean.getState()==3){
				infoMap.put("operation1", "<a onclick='recruitNew.viewRecruitNewInfo("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a>已错过</a>");
				infoMap.put("operation3", "");
			}
			
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
	
	/*@RequestMapping("/queryMyCheckInfo.action")
	public void queryMyCheckInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		//测试数据，实际从登陆后保存到的session中获取
		String clubId = "1010100";
		String stuNum = "1515200006";
		int state = Integer.parseInt(request.getParameter("state"));
		
		String departmentId = groupMemberService.queryMemberInfo(clubId, stuNum).getDepartmentId();
		
		List<GroupMember> groMemInfoList = groupMemberService.queryMyCheckInfo(clubId, departmentId, state);
		List<Map> data = new ArrayList<Map>();
		SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		
		for(GroupMember bean:groMemInfoList){
			Map<String,Object> infoMap = new HashMap<String,Object>();
			Student stuInfo = studentService.queryStudentByStuNum(bean.getStuNum());
			String departName = departmentService.queryDepartmentById(departmentId).getName();
			infoMap.put("num", bean.getStuNum());
			infoMap.put("num", bean.getStuNum());
			infoMap.put("name", stuInfo.getStuName());
			infoMap.put("gender", stuInfo.getGender());
			infoMap.put("profession", stuInfo.getProfession());
			infoMap.put("grade", stuInfo.getGrade());
			infoMap.put("email", stuInfo.getEmail());
			infoMap.put("phone", stuInfo.getPhone());
			infoMap.put("interest", stuInfo.getInterest());
			infoMap.put("special", stuInfo.getSpecial());
			infoMap.put("departName", departName);
			infoMap.put("forJob", bean.getJob());
			infoMap.put("applyTime", df.format(bean.getApplyTime()));
			String head = stuInfo.getHead();
		
			infoMap.put("head", head);
			
			if(state==0){
				infoMap.put("operation1", "<a onclick='MemberInfo.viewMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a onclick='MemberInfo.editMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>录用</a>");
				infoMap.put("operation3", "<a onclick='MemberInfo.deleteMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>不录用</a>");
			}else if(state==1){
				infoMap.put("operation1", "<a onclick='MemberInfo.viewMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a>已录用</a>");
				infoMap.put("operation3", "");
			}else if(state==2){
				infoMap.put("operation1", "<a onclick='MemberInfo.viewMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a>已淘汰</a>");
				infoMap.put("operation3", "");
			}else if(state==3){
				infoMap.put("operation1", "<a onclick='MemberInfo.viewMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a>已错过</a>");
				infoMap.put("operation3", "");
			}
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
		
	}*/
	
	@RequestMapping("/queryRecruitNewInfo.action")
	@ResponseBody
	public Map<String,Object> queryRecruitNewInfo(HttpServletRequest request,HttpServletResponse response){
		String clubId = request.getParameter("clubId");
		String stuNum = request.getParameter("stuNum");
		String departmentId = request.getParameter("departmentId");
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
		
		Map<String, Object> resultMap = new HashMap<String,Object>();;
		Map<String, Object> infoMap = new HashMap<String,Object>();
		try {
			GroupMember oneInfo = groupMemberService.queryMemberInfo(clubId, stuNum);
			Student studentInfo = studentService.queryStudentByStuNum(oneInfo.getStuNum());
			Department depInfo = departmentService.queryDepartmentById(oneInfo.getDepartmentId());
			resultMap.put("resultFlag", 1);
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
			infoMap.put("applyTime", df.format(oneInfo.getApplyTime()));
			infoMap.put("head", studentInfo.getHead());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "查看信息出错！");
		}
		resultMap.put("data", infoMap);
		return resultMap;
	}
	
	@RequestMapping("/passRecruit.action")
	@ResponseBody
	public Map<String,Object> PassRecruit(HttpServletRequest request,HttpServletResponse response){
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		String clubId = request.getParameter("clubId");
		String stuNum = request.getParameter("stuNum");
		String departmentId = request.getParameter("departmentId");
		
		//测试数据
		String SessionclubId = (String) request.getSession().getAttribute("clubId");
		String SessionstuNum = (String) request.getSession().getAttribute("stuNum");
		String SessiondepartmentId = groupMemberService.queryMemberInfo(SessionclubId, SessionstuNum).getDepartmentId();

		if(!(departmentId.equals(SessiondepartmentId))){
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "该同学意向部门不是您的部门，录取权限不足！");
			return resultMap;
		}
		
		Date joinTime = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(joinTime);
		cal.add(Calendar.YEAR, 1);
		Date exitTime = cal.getTime();
		
		try {
			groupMemberService.updateStateToFomal(joinTime, exitTime, stuNum, clubId, departmentId);
		
			groupMemberService.updateStateToMiss(stuNum, clubId, departmentId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "录取社员失败！");
		}
		return resultMap;
	}
	
	@RequestMapping("/unPassRecruit.action")
	@ResponseBody
	public Map<String,Object> UnPassRecruit(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		String clubId = request.getParameter("clubId");
		String stuNum = request.getParameter("stuNum");
		String departmentId = request.getParameter("departmentId");
		
		//测试数据
		String SessionclubId = (String) request.getSession().getAttribute("clubId");
		String SessionstuNum = (String) request.getSession().getAttribute("stuNum");
		String SessiondepartmentId = groupMemberService.queryMemberInfo(clubId, stuNum).getDepartmentId();

		if(!(departmentId.equals(SessiondepartmentId))){
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "该同学意向部门不是您的部门，淘汰权限不足！");
			return resultMap;
		}
		
		try {
			groupMemberService.updateStateToQuit(stuNum, clubId, departmentId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "淘汰社员失败！");
		}
		return resultMap;
	}
	public void test2(){
        System.out.println();
	}
	public void test(){System.out.println("测试");}
}
