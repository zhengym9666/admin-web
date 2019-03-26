package com.admin.web;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.admin.bean.FeeChatBean;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.annotations.ResultMap;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.admin.bean.Fee;
import com.admin.bean.FeeBudgetLog;
import com.admin.bean.GroupMember;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.service.interfaces.IFeeBudgetLogService;
import com.admin.service.interfaces.IFeeService;
import com.admin.service.interfaces.IGroupMemberService;
import com.admin.service.interfaces.IStudentService;
import com.admin.util.Page;
import com.admin.util.UploadImageUtil;

import net.sf.json.JSONArray;
import sun.util.locale.provider.FallbackLocaleProviderAdapter;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午2:24:45
* @version 1.0 
* @desrciption		
*/
@Controller
@RequestMapping("/feeBudgetManage")
public class feeAction {
	
	private MultipartFile code1;
	
	private MultipartFile code2;

	private static transient Log log = LogFactory.getLog(feeAction.class);
	
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
	
	@RequestMapping("/feeAuthority.action")
	@ResponseBody
	public void feeAuthority(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Integer rank = (Integer) request.getSession().getAttribute("rank");
		if(rank!=6){
			request.getRequestDispatcher("/views/exception/403.html").forward(request, response);
		}else{
			String clubId = (String) request.getSession().getAttribute("clubId");
			Fee feeInfo = feeService.getFeeInfoById(clubId);
			request.setAttribute("wechatCode", feeInfo.getWechatCode());
			request.setAttribute("apayCode", feeInfo.getApayCode());
			request.getRequestDispatcher("/views/community/feeCode.jsp").forward(request, response);
		}
		
	}
	
	@RequestMapping(value="/uploadCode.action",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> uploadHead(HttpServletRequest request,@RequestParam("file1") MultipartFile file1,@RequestParam("file2") MultipartFile file2) throws Exception{
		
		String clubId = (String) request.getSession().getAttribute("clubId");
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
//		初始化文件上传格式要求
		UploadImageUtil uploadImageUtil = new UploadImageUtil("image/jpeg,image/png",1024*1024);
//		校验文件格式
		String checkResult1 = uploadImageUtil.checkUploadImage(file1,file1.getContentType());
		String checkResult2 = uploadImageUtil.checkUploadImage(file2,file2.getContentType());
		String fileName;
		if(checkResult1!=null || checkResult2!=null){
			resultMap.put("resultFlag",0);
			resultMap.put("msg", checkResult1);
			return resultMap;
		}else{
			try {
				fileName = uploadImageUtil.uploadwechatCode(file1, clubId);
				fileName = uploadImageUtil.uploadapayCode(file2, clubId);
				feeService.updateCode(clubId, fileName);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				resultMap.put("resultFlag", 0);
				resultMap.put("msg", "上传失败，上传了相同的二维码！");
				e.printStackTrace();
				return resultMap;
			}
			resultMap.put("resultFlag", 1);
			resultMap.put("msg", "上传成功!");
		}
		return resultMap;
	}


	@RequestMapping("/queryBugetAction.action")
	@ResponseBody
	public ResponseEntity<Map> queryBugetAction(HttpServletRequest request) throws Exception{
		JSONObject returnJson = new JSONObject();
		JSONArray root = new JSONArray();
		//月份,最近的12个月份
		JSONArray month_near =null;
		//支出
		JSONArray expend = new JSONArray();
		//收入
		JSONArray income = new JSONArray();
		//剩余总额
		JSONArray remainMoney = new JSONArray();
		//横坐标类型：费用类型
		JSONArray xArray = new JSONArray();
		JSONObject json=new JSONObject();
		//获取当前的社团ID
		String clubId = (String) request.getSession().getAttribute("clubId ");
		if(clubId==null || clubId.length()==0){
			//测试使用
			clubId="1010100";
		}
		try {
			List<FeeChatBean> list=feeBudgetLogService.queryBugetByMonth(clubId);

			//近12个月的月份
			month_near=getMonthNear();
			for (int i = 0; i <month_near.size() ; i++) {
				//检查是否这次查到数据，查到则不用赋值为0，false没有查到到
				boolean flag=false;
				//查到该月的月份
				String yearMonth = month_near.getString(i);
				for (FeeChatBean feeChat:list) {
					String feeYearMonth= formatMonth(feeChat.getMonth());
					if(yearMonth.equals(feeYearMonth)){
						expend.add(feeChat.getExpend());//支出
						income.add(feeChat.getIncome());//收入
						remainMoney.add(feeChat.getRemainMoney());//剩余总额
						flag=true;
					}
				}
				if(!flag){
					//没有查到该月的记录,默认为0
					expend.add(0);//支出
					income.add(0);//收入
					remainMoney.add(0);//剩余总额
				}
			}

           /* //测试数据
			month_near.add("一月");
			month_near.add("二月");
			month_near.add("三月");
			expend.add("12");
			expend.add("2");
			expend.add("32");
			income.add("44");
			income.add("54");
			income.add("64");
			xArray.add("支出");
			xArray.add("收入");
			xArray.add("剩余总额");
            JSONObject j1=new JSONObject();
            j1.put("name", "A部门");
            j1.put("value", "A");
            JSONObject j2=new JSONObject();
            j2.put("name", "b部门");
            j2.put("value", "b");
            xArray.add("A部门");
            xArray.add("B部门");*/

            xArray.add("支出");
            xArray.add("收入");
            xArray.add("剩余总额");
			json.put("month_near", month_near);//月份
			json.put("expend", expend);//支出
			json.put("income", income);//收入
			json.put("remainMoney", remainMoney);//剩余总额
			json.put("xArray", xArray);//横坐标类型：支出，收入，剩余总额
			root.add(json);
			returnJson.put("root", root);
			returnJson.put("success", true);
		}catch (Exception e){
			log.error("获取社团的支出，收入，剩余总额失败：",e);
			returnJson.put("success", false);
			returnJson.put("Msg","获取社团的支出，收入，剩余总额失败");
			return ResponseEntity.ok(returnJson);
		}
		finally {
		}
		return ResponseEntity.ok(returnJson);
	}

	//升序输出日期
    public JSONArray getMonthNear() {
        //横坐标类型：费用类型
        JSONArray monthArr = new JSONArray();
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.MONTH, cal.get(Calendar.MONTH)-12);
        for (int i=0;i<12;i++){
            cal.set(Calendar.MONTH,cal.get(Calendar.MONTH)+1);
            int month = cal.get(Calendar.MONTH) + 1;
            String monthstr=month+"";
            if(month<10){
               monthstr= "0"+month;
            }

            monthArr.add(cal.get(Calendar.YEAR)+"-"+monthstr);
        }
        return monthArr;
    }

    @Test
	public void main() {
		JSONArray monthNear = new feeAction().getMonthNear();
		System.out.println(monthNear);
		Calendar cal = Calendar.getInstance();
		int i = cal.get(cal.get(Calendar.MONTH));
		System.out.println(i);

	}



    public String formatMonth(String yearMonth){
		if(yearMonth!=null && yearMonth.length()>0){
			String year=yearMonth.substring(0,4);
			String month = yearMonth.substring(4);
			if(Integer.parseInt(month)<10){
				month="0"+month;
			}
			yearMonth=year+"-"+month;
		}
		return yearMonth;
	}
    
    @RequestMapping("/getClubScale.action")
    @ResponseBody
    public Map<String,Object> getClubScale(HttpServletRequest request){
    	
    	String clubId = (String) request.getSession().getAttribute("clubId");
    	
    	HashMap<String,Object> resultMap = new HashMap<String,Object>();
    	
    	int personSum;
		float totalFee;
		try {
			personSum = groupMemberService.getMemberCountByClubId(clubId);
			//获取社团总会费
			totalFee = feeService.getFeeInfoById(clubId).getTotalFee();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag",0);
			resultMap.put("Msg", "获取社团总人数和剩余会费失败");
			return resultMap;
		}
		resultMap.put("resultFlag", 1);
    	resultMap.put("personSum", personSum);
    	resultMap.put("totalFee", totalFee);
    	return resultMap;
    }
}
