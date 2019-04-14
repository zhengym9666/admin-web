package com.admin.web;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import com.admin.service.interfaces.IDepartmentService;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月7日 下午11:31:51
* @version 1.0 
* @desrciption		
*/
@Controller
@RequestMapping("/departmentInfo")
public class DepartmentInfoAction {
	
	@Autowired
	IDepartmentService departmentService;
	
	@RequestMapping("/queryAllDepartmentInfo.action")
	@ResponseBody
	public Map<String,Object> queryAllDepartmentInfo(Page page,@RequestParam("limit")int limit,HttpServletRequest request,HttpServletResponse response){
		
		page.setRows(limit);

		//模拟session
		String clubId = (String) request.getSession().getAttribute("clubId");
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count", departmentService.queryDepartmentPageCount(page, clubId));
		
		List<Map> data = new ArrayList<Map>();
		List<Department> departList = departmentService.queryDepartmentPage(page, clubId);
		for(Department bean:departList){
			Map<String,Object> infoMap = new HashMap<String,Object>();
			infoMap.put("departName", bean.getName());
			infoMap.put("intro", bean.getIntro());
			infoMap.put("operation1", "<a onclick='departInfo.viewDepartInfo("+bean.getId()+")' style='cursor:pointer;color:#1FA075'>查看</a>");
			infoMap.put("operation2", "<a onclick='departInfo.editDepartInfo("+bean.getId()+")' style='cursor:pointer;color:#1FA075'>编辑</a>");
			infoMap.put("operation3", "<a onclick='departInfo.deleteDepartInfo("+bean.getId()+")' style='cursor:pointer;color:#1FA075'>删除</a>");
			data.add(infoMap);
		}
		resultMap.put("data", data);
		return resultMap;
	}
	
	@RequestMapping("/saveDepartInfo.action")
	@ResponseBody
	public Map<String,Object> saveDepartInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String isUpdate = URLDecoder.decode(request.getParameter("isUpdate"),"utf-8");
		String departName = URLDecoder.decode(request.getParameter("departName"),"utf-8");
		String intro = URLDecoder.decode(request.getParameter("intro"),"utf-8");
		String departId = request.getParameter("departId");
		Date birthDate = new Date();
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		//模拟登陆数据
		String clubId = "1010100";
		String collegeId = "1010000";
		String preClubId = clubId.substring(0, clubId.indexOf("00"));
		
		try {
			if("0".equals(isUpdate)){
				departmentService.addDepartInfo(preClubId, departName, intro, birthDate,collegeId,clubId);
			}else{
				departmentService.updateDepartInfo(departId, departName, intro);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "保存部门信息出错");
		}
		return resultMap;
		
	}
	
	@RequestMapping("/queryDepartInfo.action")
	@ResponseBody
	public Map<String,Object> queryDepartInfo(HttpServletRequest request,HttpServletResponse response){
		
		String departId = request.getParameter("departId");
		
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		try {
			Department departInfo = departmentService.queryDepartmentById(departId);
			
			HashMap<String,Object> dataInfo = new HashMap<String,Object>();
			dataInfo.put("departName", departInfo.getName());
			dataInfo.put("departId", departInfo.getId());
			dataInfo.put("intro", departInfo.getIntro());
			resultMap.put("data", dataInfo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("rsultFlag", 0);
			resultMap.put("Msg", "获取部门信息出错");
		}
		
		return resultMap;
	}
	
	@RequestMapping("/deleteDepartInfo.action")
	@ResponseBody
	public HashMap<String,Object> deleteDepartInfo(HttpServletRequest request,HttpServletResponse response){
		
		String departId = request.getParameter("departId");
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		try {
			departmentService.deleteDepartInfo(departId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "删除部门出错");
		}
		return resultMap;		
	}
	
	public static void main(String[] args) {
		String clubId = "1010100";
		String preClubId = clubId.substring(0, clubId.indexOf("00"));
		System.out.println(preClubId);
	}
	
}
