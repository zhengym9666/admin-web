package com.admin.web;
/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月5日 下午5:23:08
* @version 1.0 
* @desrciption		
*/

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

@Controller
@RequestMapping("/reElection")
public class ReElectAction {
	
	@Autowired
	IGroupMemberService groupMemberService;
	
	@Autowired
	IStudentService studentService;
	
	@Autowired
	IDepartmentService departmentService;
	
	@RequestMapping("/queryElectorInfo.action")
	@ResponseBody
	public Map<String,Object> queryElectorInfo(Page page,@RequestParam("limit")int limit,HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String clubId = (String) request.getSession().getAttribute("clubId");
		String stuNum = (String) request.getSession().getAttribute("stuNum");
		GroupMember memInfo = (GroupMember) request.getSession().getAttribute("memInfo");
		//GroupMember memInfo = groupMemberService.queryMemberInfo(clubId, stuNum);
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		if(memInfo==null){
			resultMap.put("code", 1);
			resultMap.put("msg", "从session中获取memInfo对象失败");
			resultMap.put("count",0);
			return resultMap;
		}
		String departmentId = memInfo.getDepartmentId();
		List<Map> data = new ArrayList<Map>();
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
		List<GroupMember> groMemInfoList  = null;
		int count = 0;
		
		if(page.getKeyword3().equals("99")){
			groMemInfoList = groupMemberService.queryCurrentSenior(page, clubId, departmentId);
			count = groupMemberService.queryCurrentSeniorCount(page, clubId, departmentId);
		}else{
			//当前判断当前是否会长登录
			if(memInfo.getRank()==3 || memInfo.getRank()==5){
				groMemInfoList = groupMemberService.querySeniorCandidator(page, clubId);
				count = groupMemberService.querySeniorCandidatorCount(page, clubId);
			}else{
				groMemInfoList = groupMemberService.queryCandidator(page, clubId, departmentId);
				count = groupMemberService.queryCandidatorCount(page, clubId, departmentId);
			}
			
		}
		
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count",count);
		
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
			infoMap.put("job", bean.getJob());
			infoMap.put("joinTime", df.format(bean.getJoinTime()));
			String head = stuInfo.getHead();
		
			infoMap.put("head", head);

			if(page.getKeyword3().equals("99") && (memInfo.getRank()==4 || memInfo.getRank()==5)){
				infoMap.put("operation1", "<a onclick='reElection.viewReElection("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2","");
			}
			if(page.getKeyword3().equals("99") && (memInfo.getRank()==2 || memInfo.getRank()==3)){
				infoMap.put("operation1", "<a onclick='reElection.viewReElection("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a onclick='reElection.repealOneSenior("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>撤职</a>");
			}
			if(page.getKeyword3().equals("4")){
				infoMap.put("operation1", "<a onclick='recruitNew.viewRecruitNewInfo("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2","");
			}
			if(page.getKeyword3().equals("2")){
				infoMap.put("operation1", "<a onclick='recruitNew.viewRecruitNewInfo("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+")' style='cursor:pointer;color:#1FA075'>详情</a>");
				infoMap.put("operation2", "<a onclick='reElection.pickOneToSenior("+bean.getStuNum()+","+clubId+","+bean.getDepartmentId()+","+page.getKeyword3()+")' style='cursor:pointer;color:#1FA075'>pick him</a>");
			}
			
			data.add(infoMap);
		}
		resultMap.put("data", data);
		return resultMap;
	}
	
	@RequestMapping("/pickOneToSenior.action")
	@ResponseBody
	public Map<String,Object> pickOneToSenior(HttpServletRequest request,HttpServletResponse response){
		
		String stuNum = request.getParameter("stuNum");
		String clubId = request.getParameter("clubId");
		int ToRank = Integer.parseInt(request.getParameter("ToRank"));
		
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		//模拟登陆后的数据
		String sessionStuNum = (String) request.getSession().getAttribute("stuNum");
		try {
			GroupMember memInfo = groupMemberService.queryMemberInfo(clubId, sessionStuNum);
			
			//判断当前登录的是部长还是会长管理员，若是部长，则pick的是副部或者正部，若是会长，则指定的是副会或者正会			
			if(memInfo.getRank()==2){
				groupMemberService.updateSenior2Formal(clubId, ToRank,memInfo.getDepartmentId(),"普通社员");
				groupMemberService.updateOne2Senior(clubId, stuNum, ToRank,"部长");
			}else{
				groupMemberService.updateSenior2Formal(clubId, ToRank+1,"","普通社员");
				groupMemberService.updateOne2Senior(clubId, stuNum, ToRank+1,"会长");
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "PICK 失败！");
		}
		return resultMap;
	}
	
	@RequestMapping("/pickSome2Senior.action")
	@ResponseBody
	public HashMap<String,Object> pickSome2Senior(HttpServletRequest request,HttpServletResponse response){
		
		//模拟登陆后的数据
		String sessionStuNum = "1515200029";
		String sessionClubId = "1010100";

		String stuNum1 = request.getParameter("stuNum1");
		String stuNum2 = request.getParameter("stuNum2");
		
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		try {
			GroupMember memInfo = groupMemberService.queryMemberInfo(sessionClubId, sessionStuNum);
			if(memInfo.getRank()==2){
				groupMemberService.updateSenior2Formal(sessionClubId, 4,memInfo.getDepartmentId(),"普通社员");
				groupMemberService.updateOne2Senior(sessionClubId, stuNum1, 4,"副部长");
				groupMemberService.updateOne2Senior(sessionClubId, stuNum2, 4,"副部长");
			}else {
				groupMemberService.updateSenior2Formal(sessionClubId, 5,memInfo.getDepartmentId(),"普通社员");
				groupMemberService.updateOne2Senior(sessionClubId, stuNum1, 5,"副会长");
				groupMemberService.updateOne2Senior(sessionClubId, stuNum2, 5,"副会长");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "系统服务出错");
		}
		
		return resultMap;
	}
	
	@RequestMapping("/repealOneSenior.action")
	@ResponseBody
	public HashMap<String,Object> repealOneSenior(HttpServletRequest request,HttpServletResponse response){
		
		String stuNum = request.getParameter("stuNum");
		String clubId = request.getParameter("clubId");
		
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		try {
			groupMemberService.updateSenior2FormalByNum(clubId, stuNum, "普通社员");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "系统服务出错");
		}
		return resultMap;
		
	}
	
	@RequestMapping("/queryElectorInfoById.action")
	@ResponseBody
	public Map<String,Object> queryElectorInfoById(HttpServletRequest request,HttpServletResponse response){
		
		String stuNum = request.getParameter("stuNum");
		String clubId = request.getParameter("clubId");
		
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
			infoMap.put("departName", depInfo.getName());
			infoMap.put("job", oneInfo.getJob());
			infoMap.put("joinTime", df.format(oneInfo.getJoinTime()));
			infoMap.put("head", studentInfo.getHead());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "查看信息出错！");
		}
		resultMap.put("data", infoMap);
		return resultMap;
		
	}
	
	@RequestMapping("/loginAction.action")
	public void loginAction(HttpServletRequest request){
		String clubId = "1010100";
		String stuNum = "1515200005";
		GroupMember memInfo = groupMemberService.queryMemberInfo(clubId, stuNum);
		request.getSession().setAttribute("clubId", clubId);
		request.getSession().setAttribute("stuNum", stuNum);
		request.getSession().setAttribute("memInfo", memInfo);
		
	}
}
