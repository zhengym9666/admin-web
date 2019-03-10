package com.admin.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.admin.bean.Department;

/** 
* @author  作者 :zhengym
* @date  创建时间：2019年1月25日 上午10:29:30
* @version 1.0 
* @desrciption		
*/
public interface DepartmentDAO {
	
	public Department queryDepartmentById(@Param("departmentId")String departmentId);
	
	public List<Department> queryDepartmentByClubId(@Param("clubId")String clubId);

	public List<Department> queryDepartmentPage(HashMap<String,Object> params);
	
	public int queryDepartmentPageCount(HashMap<String,Object> params);
	
	public void addDepartInfo(HashMap<String,Object> params);
	
	public void updateDepartInfo(HashMap<String,Object> params);
	
	public void deleteDepartInfo(@Param("departId")String departId);
}
