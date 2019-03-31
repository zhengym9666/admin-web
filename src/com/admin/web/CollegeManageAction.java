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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.admin.bean.College;
import com.admin.service.interfaces.ICollegeService;
import com.admin.util.Page;
import com.admin.util.UploadImageUtil;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月7日 下午11:31:51
* @version 1.0 
* @desrciption		
*/
@Controller
@RequestMapping("/college")
public class CollegeManageAction {
	
	private MultipartFile uploadImage;
	
	@Autowired
	ICollegeService collegeService;
	
	@RequestMapping("/queryAllCollege.action")
	@ResponseBody
	public Map<String,Object> queryAllCollege(Page page,@RequestParam("limit")int limit,HttpServletRequest request,HttpServletResponse response){
		
		page.setRows(limit);

		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count", collegeService.queryCollegePageCount(page));
		
		List<Map> data = new ArrayList<Map>();
		List<College> collList = collegeService.queryCollegePage(page);
		for(College bean:collList){
			Map<String,Object> infoMap = new HashMap<String,Object>();
			infoMap.put("fullname", bean.getFullname());
			infoMap.put("abbr", bean.getAbbr());
			infoMap.put("intro", bean.getIntro());
			infoMap.put("image", bean.getImage());
			infoMap.put("collegeId", bean.getId());
			infoMap.put("operation1", "<a onclick='collegeManage.viewCollege("+bean.getId()+")' style='cursor:pointer;color:#1FA075'>查看</a>");
			infoMap.put("operation2", "<a onclick='collegeManage.editCollege("+bean.getId()+")' style='cursor:pointer;color:#1FA075'>编辑</a>");
			infoMap.put("operation3", "<a onclick='collegeManage.deleteCollege("+bean.getId()+")' style='cursor:pointer;color:#1FA075'>删除</a>");
			data.add(infoMap);
		}
		resultMap.put("data", data);
		return resultMap;
	}
	
	@RequestMapping("/saveCollege.action")
	@ResponseBody
	public Map<String,Object> saveCollege(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String isUpdate = URLDecoder.decode(request.getParameter("isUpdate"),"utf-8");
		String fullName = URLDecoder.decode(request.getParameter("fullName"),"utf-8");
		String abbr = URLDecoder.decode(request.getParameter("abbr"),"utf-8");
		String intro = URLDecoder.decode(request.getParameter("intro"),"utf-8");
		String collegeId = request.getParameter("collegeId");
		
		if(collegeId==null || "".equals(collegeId)){
			collegeId = collegeService.createCollegeId();
		}

		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		String fileName = null;
		
		//生成学院图片路径
		if(uploadImage!=null){
			MultipartFile file = uploadImage;
			UploadImageUtil uploadImageUtil = new UploadImageUtil();	
			try {
				fileName = uploadImageUtil.uploadCollegeImg(file,collegeId);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				resultMap.put("resultFlag", 0);
				resultMap.put("Msg", "上传图片过大，无法保存！");
				return resultMap;
			}
		}		
		
		try {
			if("0".equals(isUpdate)){
				collegeService.saveNewCollege(fullName, abbr, intro, fileName);
			}else{
				collegeService.updateCollege(fullName, abbr, intro, fileName, collegeId);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "保存学院信息出错");
		}
		return resultMap;
		
	}
	
		@RequestMapping("/queryCollege.action")
		@ResponseBody
		public Map<String,Object> queryCollege(HttpServletRequest request,HttpServletResponse response){
		
		String collegeId = request.getParameter("collegeId");
		
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		try {
			College collegeInfo = collegeService.queryCollegeById(collegeId);
			
			HashMap<String,Object> dataInfo = new HashMap<String,Object>();
			dataInfo.put("fullName", collegeInfo.getFullname());
			dataInfo.put("collegeId", collegeInfo.getId());
			dataInfo.put("intro", collegeInfo.getIntro());
			dataInfo.put("abbr", collegeInfo.getAbbr());
			dataInfo.put("image", collegeInfo.getImage());
			resultMap.put("data", dataInfo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("rsultFlag", 0);
			resultMap.put("Msg", "获取学院信息出错");
		}
		
		return resultMap;
	}
	
	@RequestMapping("/deleteCollege.action")
	@ResponseBody
	public HashMap<String,Object> deleteCollege(HttpServletRequest request,HttpServletResponse response){
		
		String collegeId = request.getParameter("collegeId");
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		
		try {
			collegeService.deleteCollege(collegeId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "删除学院出错");
		}
		return resultMap;		
	}
	
	@RequestMapping(value="/uploadImage.action",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> uploadImage(HttpServletRequest request,@RequestParam("file") MultipartFile file,@RequestParam("collegeId")String collegeId){
		
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
	
	@RequestMapping("/queryCollegeList.action")
	@ResponseBody
	public Map<String,Object> queryCollegeList(HttpServletRequest request,HttpServletResponse response){
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("resultFlag", 1);
		List<College> collegeList = null;
		
		try {
			collegeList = collegeService.queryCollegeList();
			resultMap.put("data", collegeList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resultMap.put("resultFlag", 0);
			resultMap.put("Msg", "获取学院列表失败");
		}
		
		return resultMap;
	}
	
	public static void main(String[] args) {
		String clubId = "1010100";
		String preClubId = clubId.substring(0, clubId.indexOf("00"));
		System.out.println(preClubId);
	}
	
}
