package com.admin.service.interfaces;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.admin.bean.Department;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年1月25日 上午10:44:56
* @version 1.0 
* @desrciption		
*/
public interface IDepartmentService {
	
	public Department queryDepartmentById(String departmentId);
	
	public List<Department> queryDepartmentByClubId(String clubId);

}
