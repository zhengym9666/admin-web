package com.admin.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.admin.bean.FemaleDepatement;
import com.admin.bean.ManDepatment;
import com.admin.bean.ManFemalClub;
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

    Map<String,Integer> queryManFemanRratio(String clubId);

	List<ManDepatment> queryManSum(String clubId);

	List<FemaleDepatement> queryFeMaleSum(String clubId);

	List<String> queryDepartmentIds(String clubId);

    String queryDepartmentNameById(String depId);

	ManFemalClub queryManFemaleByClubSum(String clubId);

	List<Map<String,Object>> queryPersonByDepSum(String clubId);

}