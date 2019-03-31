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

import com.admin.bean.Club;
import com.admin.bean.ClubPage;
import com.admin.bean.Department;
import com.admin.service.interfaces.IClubService;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月7日 下午11:31:51
* @version 1.0 
* @desrciption		
*/
@Controller
@RequestMapping("/club")
public class ClubManageAction {
	
	@Autowired
	IClubService clubService;
	
	@RequestMapping("/queryAllClub.action")
	@ResponseBody
	public Map<String,Object> queryAllClub(Page page,@RequestParam("limit")int limit,HttpServletRequest request,HttpServletResponse response){
		
		page.setRows(limit);

		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count", clubService.queryClubPageCount(page));
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日");
		
		List<Map> data = new ArrayList<Map>();
		List<ClubPage> clubList = clubService.queryClubPage(page);
		for(ClubPage bean:clubList){
			Map<String,Object> infoMap = new HashMap<String,Object>();
			infoMap.put("clubName", bean.getClubName());
			infoMap.put("college", bean.getCollegeName());
			infoMap.put("birthdate", bean.getBirthdate()!=null?df.format(bean.getBirthdate()):null);
			infoMap.put("intro", bean.getIntro());
			
			infoMap.put("operation1", "<a onclick='clubManage.viewClub("+bean.getClubId()+")' style='cursor:pointer;color:#1FA075'>查看</a>");
			infoMap.put("operation2", "<a onclick='clubManage.editClub("+bean.getClubId()+")' style='cursor:pointer;color:#1FA075'>编辑</a>");
			infoMap.put("operation3", "<a onclick='clubManage.deleteClub("+bean.getClubId()+")' style='cursor:pointer;color:#1FA075'>删除</a>");
			data.add(infoMap);
		}
		resultMap.put("data", data);
		return resultMap;
	}
	
	@RequestMapping("/saveClub.action")
	@ResponseBody
	public Map<String,Object> saveClub(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String isUpdate = URLDecoder.decode(request.getParameter("isUpdate"),"utf-8");
		String clubName = URLDecoder.decode(request.getParameter("clubName"),"utf-8");
		String intro = URLDecoder.decode(request.getParameter("intro"),"utf-8");
		String clubId = request.getParameter("clubId");
		String collegeId = URLDecoder.decode(request.getParameter("collegeId"),"utf-8");
		Club club = new Club();
		club.setClubName(clubName);
		club.setCollegeId(collegeId);
		club.setIntro(intro);
		club.setClubId(clubId);
		
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		try {
			if("0".equals(isUpdate)){
				Date birthdate = new Date();
				club.setBirthdate(birthdate);	
				clubService.addClub(club);
			}else{
				clubService.updateClub(club);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "保存社团信息出错");
		}
		return resultMap;
		
	}
	
	@RequestMapping("/queryClubById.action")
	@ResponseBody
	public Map<String,Object> queryClubById(HttpServletRequest request,HttpServletResponse response){
		
		String clubId = request.getParameter("clubId");
		
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日");

		
		try {
			ClubPage clubInfo = clubService.queryClubPageById(clubId);
			
			HashMap<String,Object> dataInfo = new HashMap<String,Object>();
			dataInfo.put("clubName", clubInfo.getClubName());
			dataInfo.put("clubId", clubInfo.getClubId());
			dataInfo.put("intro", clubInfo.getIntro());
			dataInfo.put("collegeId", clubInfo.getCollegeId());
			dataInfo.put("collegeName", clubInfo.getCollegeName());
			dataInfo.put("birthdate", clubInfo.getBirthdate()!=null?df.format(clubInfo.getBirthdate()):null);
			resultMap.put("data", dataInfo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "获取社团信息出错");
		}
		
		return resultMap;
	}
	
	
	@RequestMapping("/deleteClub.action")
	@ResponseBody
	public HashMap<String,Object> deleteClub(HttpServletRequest request,HttpServletResponse response){
		
		String clubId = request.getParameter("clubId");
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		try {
			clubService.deleteClub(clubId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "删除社团出错");
		}
		return resultMap;		
	}
	
	public static void main(String[] args) {
		String clubId = "1010100";
		String preClubId = clubId.substring(0, clubId.indexOf("00"));
		System.out.println(preClubId);
	}
}
