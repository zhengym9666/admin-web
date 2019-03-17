package com.admin.service.interfaces;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.admin.bean.ManFemalClub;
import org.apache.ibatis.annotations.Param;

import com.admin.bean.Department;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年1月25日 上午10:44:56
* @version 1.0 
* @desrciption		
*/
public interface IDepartmentService {
	
	public Department queryDepartmentById(String departmentId);
	
	public List<Department> queryDepartmentByClubId(String clubId);

	Map<String,Map<Integer,Integer>> queryManFemaleSum(String clubId);

    String queryDepartmentNameById(String depId);

	ManFemalClub queryManFemaleByClubSum(String clubId);

	public List<Department> queryDepartmentPage(Page page,String clubId);

	public int queryDepartmentPageCount(Page page,String clubId);

	public void addDepartInfo(String preClubId,String departName,String intro,Date birthDate,String collegeId,String clubId);

	public void updateDepartInfo(String departId,String departName,String intro);

	public void deleteDepartInfo(String departId);
}
