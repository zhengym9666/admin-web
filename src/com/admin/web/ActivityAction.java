package com.admin.web;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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

import com.admin.bean.Activity;
import com.admin.bean.Department;
import com.admin.service.interfaces.IActivityService;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月9日 下午5:01:49
* @version 1.0 
* @desrciption		
*/
@Controller
@RequestMapping("/activityInfo")
public class ActivityAction {
	
	@Autowired
	IActivityService activityService;
	
	@Autowired
	IDepartmentService departmentService;
	
	@RequestMapping("/queryAllActInfo.action")
	@ResponseBody
	public Map<String,Object> queryAllActInfo(Page page,@RequestParam("limit")int limit,HttpServletRequest request){
		
		//模拟登陆数据
		String clubId = "1010100";
		
		page.setRows(limit);
		
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count", activityService.queryAllActInfoCount(page, clubId));
		
		List<Activity> actInfoList = activityService.queryAllActInfo(page, clubId);
		List<Map> DataList = new ArrayList<Map>();
		for(Activity bean:actInfoList){
			HashMap<String,Object> dataInfo = new HashMap<String,Object>();
			dataInfo.put("name", bean.getName());
			dataInfo.put("intro", bean.getIntro());
			dataInfo.put("hostDepart", departmentService.queryDepartmentById(bean.getHostDepart()).getName());
			dataInfo.put("frequency", bean.getFrequency());
			dataInfo.put("place", bean.getPlace());
			dataInfo.put("operation1", "<a onclick='actInfo.viewActInfo("+bean.getId()+")' style='cursor:pointer;color:#1FA075'>查看</a>");
			dataInfo.put("operation2", "<a onclick='actInfo.editActInfo("+bean.getId()+")' style='cursor:pointer;color:#1FA075'>编辑</a>");
			dataInfo.put("operation3", "<a onclick='actInfo.deleteActInfo("+bean.getId()+")' style='cursor:pointer;color:#1FA075'>删除</a>");
			DataList.add(dataInfo);
		}
		resultMap.put("data", DataList);
		
		return resultMap;
		
	}
	
	@RequestMapping("/queryDepartment.action")
	@ResponseBody
	public Map<String,Object> queryDepartment(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		//模拟登陆数据
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
		return resultMap;
	}
	
	@RequestMapping("/saveActivity.action")
	@ResponseBody
	public Map<String,Object> saveActivity(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		//模拟登陆数据
		String clubId = "1010100";
		
		String actName = URLDecoder.decode(request.getParameter("actName"),"utf-8");
		String departId = request.getParameter("departId");
		String frequency = URLDecoder.decode(request.getParameter("frequency"),"utf-8");
		String place = URLDecoder.decode(request.getParameter("place"),"utf-8");
		String intro = URLDecoder.decode(request.getParameter("intro"),"utf-8");
		String isUpdate = request.getParameter("isUpdate");
		
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		Activity actInfo = new Activity();
		actInfo.setClubId(clubId);
		actInfo.setName(actName);
		actInfo.setHostDepart(departId);
		actInfo.setFrequency(frequency);
		actInfo.setPlace(place);
		actInfo.setIntro(intro);
		
		try {
			if("0".equals(isUpdate)){
				activityService.addActInfo(actInfo);
			}else{
				int actId = Integer.parseInt(URLDecoder.decode(request.getParameter("actId"),"utf-8"));
				activityService.updateActInfo(actId, actInfo);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "保存活动信息出错");
		}
		
		return resultMap;
	}
	
	@RequestMapping("/queryActInfo.action")
	@ResponseBody
	public Map<String,Object> queryActInfo(HttpServletRequest request){
		
		int actId = Integer.parseInt(request.getParameter("actId"));
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		Activity actInfo = null;
		try {
			actInfo = activityService.queryActInfoById(actId);
			HashMap<String,Object> dataInfo = new HashMap<String,Object>();
			dataInfo.put("actName", actInfo.getName());
			dataInfo.put("actId", actInfo.getId());
			dataInfo.put("departName", departmentService.queryDepartmentById(actInfo.getHostDepart()).getName());
			dataInfo.put("departId", actInfo.getHostDepart());
			dataInfo.put("frequency", actInfo.getFrequency());
			dataInfo.put("place", actInfo.getPlace());
			dataInfo.put("intro", actInfo.getIntro());
			resultMap.put("data", dataInfo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "获取活动信息失败");
		}
		
		return resultMap;
	}
	
	@RequestMapping("/deleteActInfo.action")
	@ResponseBody
	public Map<String,Object> deleteActInfo(HttpServletRequest request){
		
		int actId = Integer.parseInt(request.getParameter("actId"));
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		try {
			activityService.deleteActInfo(actId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "删除活动出错");
		}
		
		return resultMap;
	}
	
}
