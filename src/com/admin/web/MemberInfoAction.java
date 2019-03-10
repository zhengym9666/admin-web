package com.admin.web;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.GZIPOutputStream;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.admin.bean.Department;
import com.admin.bean.GroupMember;
import com.admin.bean.Student;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.service.interfaces.IGroupMemberService;
import com.admin.service.interfaces.IStudentService;
import com.admin.util.Page;
import com.admin.util.UploadImageUtil;

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
	
	private MultipartFile uploadImage;
	
	@Autowired
	IGroupMemberService groupMemberService;
	
	@Autowired
	IStudentService studentService;
	
	@Autowired
	IDepartmentService departmentService;
	

	@RequestMapping("/queryAllMemberInfo.action")
	public void queryAllMemberInfo(Page page,@RequestParam("limit") int limit,HttpServletRequest request,HttpServletResponse response) throws Exception{

		int i = 0;
		String clubId = "1010100";
		
		System.out.println("backContent========================"+limit);
	    page.setRows(limit);
/*	    page.setKeyword1(keyword1);
	    page.setKeyword2(keyword2);*/
	    System.out.println("page:"+page.toString());
	    
		//获取所有社团成员
		List<GroupMember> groMemInfoList = groupMemberService.queryMemberByClubId(page,clubId);
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count",groupMemberService.queryMemberCount(page,clubId));
		SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日");
		
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
			infoMap.put("joinTime", df.format(bean.getJoinTime()));
			infoMap.put("exitTime", df.format(bean.getExitTime()));
			String head = studentInfo.getHead();
		
			infoMap.put("head", head);
			
			infoMap.put("operation1", "<a onclick='MemberInfo.viewMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>详情</a>");
			infoMap.put("operation2", "<a onclick='MemberInfo.editMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>修改</a>");
			infoMap.put("operation3", "<a onclick='MemberInfo.deleteMemberInfo("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>删除</a>");
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
		infoMap.put("departId", oneInfo.getDepartmentId());
		infoMap.put("rank", oneInfo.getRank());
		infoMap.put("job", oneInfo.getJob());
		infoMap.put("head", studentInfo.getHead());
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
	
	@RequestMapping("/saveMemberInfo.action")
	@ResponseBody
	public Map<String,Object> saveMemberInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String isUpdate = request.getParameter("isUpdate");
		String num = request.getParameter("num");
		String name = URLDecoder.decode(request.getParameter("name"),"utf-8");
		String profession = URLDecoder.decode(request.getParameter("profession"),"utf-8");
		String grade = URLDecoder.decode(request.getParameter("grade"),"utf-8");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		String interest = URLDecoder.decode(request.getParameter("interest"),"utf-8");
		String special = URLDecoder.decode(request.getParameter("special"),"utf-8");
		String departId = request.getParameter("departId");
		int rank = Integer.parseInt(request.getParameter("rank"));
		String job = URLDecoder.decode(request.getParameter("job"),"utf-8");
		String gender = URLDecoder.decode(request.getParameter("gender"),"utf-8");
		
		Date joinTime = new Date();
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(joinTime);
		cal.add(Calendar.YEAR, 1);
		Date exitTime = cal.getTime();
		
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
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		//生成头像路径
		MultipartFile file = uploadImage;
		UploadImageUtil uploadImageUtil = new UploadImageUtil();
		String fileName = null;
		try {
			fileName = uploadImageUtil.upload(file, num);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "上传图片过大，无法保存！");
			return resultMap;
		}
		
		Student stuInfo = new Student();
		stuInfo.setCollegeId("1010000");
		stuInfo.setStuNum(num);
		stuInfo.setStuName(name);
		stuInfo.setGender(gender);
		stuInfo.setGrade(grade);
		stuInfo.setEmail(email);
		stuInfo.setPhone(phone);
		stuInfo.setProfession(profession);
		stuInfo.setSpecial(special);
		stuInfo.setInterest(interest);
		stuInfo.setHead(fileName);
		
		resultMap.put("resultFlag", 1);
		
		if("0".equals(isUpdate)){
			groupMemberService.addMemberInfo(memberInfo);
			studentService.addStudentInfo(stuInfo);
		}else if("1".equals(isUpdate)){
			groupMemberService.updateMemberInfo(memberInfo);
			studentService.updateStudentInfo(stuInfo);
		}
		return resultMap;
		
/*		response.setCharacterEncoding("utf-8");
		PrintWriter writer = response.getWriter();
		try {
			writer.print(JSONObject.fromObject(resultMap));
			writer.flush();
			writer.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "保存数据出错！");
		}*/
	
	}
	
	@RequestMapping(value="/uploadHead.action",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> uploadHead(HttpServletRequest request,@RequestParam("file") MultipartFile file,@RequestParam("stuNum")String stuNum){
		
		uploadImage = file;
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
//		初始化文件上传格式要求
		UploadImageUtil uploadImageUtil = new UploadImageUtil("image/jpeg,image/png",1024*1024);
//		校验文件格式
		String checkResult = uploadImageUtil.checkUploadImage(file,file.getContentType());
		if(checkResult!=null){
			resultMap.put("resultFlag",0);
			resultMap.put("msg", checkResult);
		}else{
			resultMap.put("resultFlag", 1);
			resultMap.put("msg", "上传成功！注意保存信息");
		}
		return resultMap;
	}
	
	@RequestMapping("/deleteMemberInfo.action")
	@ResponseBody
	public HashMap<String,Object> deleteMemberInfo(HttpServletRequest request,HttpServletResponse Response){
		
		String stuNum = request.getParameter("stuNum");
		String clubId = request.getParameter("clubId");
		HashMap<String,Object> map = new HashMap<String,Object>();
		
		try {
			groupMemberService.deleteMemberInfo(stuNum, clubId);
			studentService.deleteStudentInfo(stuNum);
			map.put("resultFlag", 1);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("resultFlag", 0);
			map.put("Msg", "删除出错！");
		}
		
		return map;
		
	}
}
