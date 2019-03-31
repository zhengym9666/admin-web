package com.admin.service.interfaces;


import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.admin.bean.College;
import com.admin.util.Page;

/**
 * 
 * @author zym
 *
 * 2018年12月28日
 */

public interface ICollegeService {
	public College queryCollegeById(String collegeId);
	
	public List<College> queryCollegePage(Page page);
	
	public int queryCollegePageCount(Page page);
	
	public String createCollegeId();
	
	public void saveNewCollege(String fullname,String abbr,String intro,String image);
	
	public void updateCollege(String fullname,String abbr,String intro,String image,String collegeId);
	
	public List<College> queryCollegeList();
	
	public void deleteCollege(String collegeId);
}
