package com.admin.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.annotations.ResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.admin.bean.FeeBudgetLog;
import com.admin.bean.GroupMember;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.service.interfaces.IFeeBudgetLogService;
import com.admin.service.interfaces.IFeeService;
import com.admin.service.interfaces.IGroupMemberService;
import com.admin.service.interfaces.IStudentService;
import com.admin.util.Page;

import net.sf.json.JSONArray;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午2:24:45
* @version 1.0 
* @desrciption		
*/
@Controller
@RequestMapping("/feeBudgetManage")
public class feeAction {
	
	@Autowired
	IGroupMemberService groupMemberService;
	
	@Autowired
	IDepartmentService departmentService;
	
	@Autowired
	IFeeService feeService;
	
	@Autowired
	IFeeBudgetLogService feeBudgetLogService;
	
	@Autowired
	IStudentService studentService;
	
	@RequestMapping("/queryAllFeeCase.action")
	@ResponseBody
	public Map<String,Object> queryAllFeeCase(Page page,@RequestParam("limit") int limit,HttpServletRequest request,HttpServletResponse response){
		
		//模拟登录数据
		String clubId = "1010100";
		page.setRows(limit);
		
		List<GroupMember> groMemInfoList = groupMemberService.queryMemberByClubId(page, clubId);
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count",groupMemberService.queryMemberCount(page,clubId));
		
		List<Map> data = new ArrayList<Map>();
		for(GroupMember bean:groMemInfoList){
			Map<String,Object> infoMap = new HashMap<String,Object>();
			infoMap.put("num", bean.getStuNum());
			infoMap.put("name", bean.getStuName());
			infoMap.put("department", departmentService.queryDepartmentById(bean.getDepartmentId()).getName());
			infoMap.put("everyfee", feeService.getFeeInfoById(clubId).getEveryFee());
			if(bean.getIsFee()==0){
				infoMap.put("isfee", "未交");
				infoMap.put("operation", "<a onclick='feeInManage.confirmFee("+bean.getStuNum()+","+clubId+")' style='cursor:pointer;color:#1FA075'>确认已交</a>");
			}else{
				infoMap.put("isfee", "已交");
				infoMap.put("operation","");
			}
			data.add(infoMap);
		}
		JSONArray array = JSONArray.fromObject(data);
		resultMap.put("data", array);
		
		return resultMap;
		
	}
	
	@RequestMapping("/confirmSubmitFee.action")
	@ResponseBody
	public Map<String,Object> confirmSubmitFee(HttpServletRequest request){
		
		//模拟登录数据
		String sessionstuNum = "1515200005";
		
		String stuNum = request.getParameter("stuNum");
		String clubId = request.getParameter("clubId");
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		FeeBudgetLog logInfo = new FeeBudgetLog();
		logInfo.setClubId(clubId);
		logInfo.setBudget_time(new Date());
		logInfo.setBudget_status(1);
		logInfo.setBudgeter(stuNum);
		logInfo.setReason("会费");
		logInfo.setBudget(feeService.getFeeInfoById(clubId).getEveryFee());
		logInfo.setFinancial(sessionstuNum);
		logInfo.setRemainMoney(feeService.getFeeInfoById(clubId).getTotalFee()+logInfo.getBudget());
		
		try {
			groupMemberService.updateisFee(stuNum, clubId);
			feeBudgetLogService.addBudgetLog(logInfo);
			feeService.updateTotalFee(clubId, logInfo.getRemainMoney());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "系统出错");
		}
		return resultMap;
		
	}
	
	@RequestMapping("/queryMemberByKey.action")
	@ResponseBody
	public Map<String,Object> queryMemberByKey(HttpServletRequest request){
		
		//模拟登录数据
		String clubId = "1010100";
		
		String keyword = request.getParameter("keyword");
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<GroupMember> memList = null;
		try {
			memList = groupMemberService.queryMemberByKey(keyword, clubId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		resultMap.put("data", memList);
		return resultMap;
	}
	
	@RequestMapping("/saveOtherFee.action")
	@ResponseBody
	public Map<String,Object> saveOtherFee(HttpServletRequest request){
		
		//模拟登录数据
		String clubId = "1010100";
		String sessionstuNum = "1515200005";
		
		String reason = request.getParameter("reason");
		String budgeter = request.getParameter("budgeter");
		int budget = Integer.parseInt(request.getParameter("budget"));
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		FeeBudgetLog logInfo = new FeeBudgetLog();
		logInfo.setClubId(clubId);
		logInfo.setBudget_time(new Date());
		logInfo.setBudget_status(1);
		logInfo.setBudgeter(budgeter);
		logInfo.setReason(reason);
		logInfo.setBudget(budget);
		logInfo.setFinancial(sessionstuNum);
		logInfo.setRemainMoney(feeService.getFeeInfoById(clubId).getTotalFee()+logInfo.getBudget());
		
		try {
			feeBudgetLogService.addBudgetLog(logInfo);
			feeService.updateTotalFee(clubId, logInfo.getRemainMoney());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "系统出错");
		}
		return resultMap;
	}
	
	@RequestMapping("/queryAllfeeBudget.action")
	@ResponseBody
	public Map<String,Object> queryAllfeeBudget(Page page,@RequestParam("limit") int limit,HttpServletRequest request,HttpServletResponse response){
		
		page.setRows(limit);
		
		//模拟登录数据
		String clubId = "1010100";
		
		List<FeeBudgetLog> budgetList = feeBudgetLogService.queryBudgetLog(page, clubId);
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count", feeBudgetLogService.queryBudgetLogCount(page, clubId));
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日  HH:mm:ss");
		
		List<Map> data = new ArrayList<Map>();
		for(FeeBudgetLog bean:budgetList){
			Map<String,Object> infoMap = new HashMap<String,Object>();
			infoMap.put("budget_time",df.format(bean.getBudget_time()));
			String budget_status = bean.getBudget_status()==0?"支出":"收入";
			infoMap.put("budget_status", budget_status);
			infoMap.put("reason", bean.getReason());
			infoMap.put("budgeter", studentService.queryStudentByStuNum(bean.getBudgeter()).getStuName());
			infoMap.put("budget", bean.getBudget());
			infoMap.put("remainMoney", bean.getRemainMoney());
			infoMap.put("financial", studentService.queryStudentByStuNum(bean.getFinancial()).getStuName());
			data.add(infoMap);
		}
		JSONArray array = JSONArray.fromObject(data);
		resultMap.put("data", array);
		
		return resultMap;
	}
	 
}
