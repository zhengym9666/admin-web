package com.admin.dao;

import com.admin.bean.College;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;

/**
 * 
 * @author zym
 *
 */

public interface CollegeDAO {
	
	public College queryCollegeById(@Param("id") String collegeId);
	
	public List<College> queryCollegePage(HashMap<String,Object> map);
	
	public int queryCollegePageCount(HashMap<String,Object> map);
	
	public String createCollegeId();
	
	public void addCollege(HashMap<String,Object> params);
	
	public void updateCollege(HashMap<String,Object> params);
	
	public void deleteCollege(@Param("collegeId")String collegeId);
	
	public List<College> queryCollegeList();
}
