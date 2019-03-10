package com.admin.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.Department;
import com.admin.dao.DepartmentDAO;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年1月25日 上午10:48:36
* @version 1.0 
* @desrciption		
*/
@Service("departmentService")
public class DepartmentServiceImpl implements IDepartmentService {
	
	@Autowired
	DepartmentDAO departmentMapper;
	
	@Override
	public Department queryDepartmentById(String departmentId) {
		// TODO Auto-generated method stub
		return departmentMapper.queryDepartmentById(departmentId);
	}

	@Override
	public List<Department> queryDepartmentByClubId(String clubId) {
		// TODO Auto-generated method stub
		return departmentMapper.queryDepartmentByClubId(clubId);
	}

	@Override
	public List<Department> queryDepartmentPage(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return departmentMapper.queryDepartmentPage(params);
	}

	@Override
	public int queryDepartmentPageCount(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("clubId", clubId);
		return departmentMapper.queryDepartmentPageCount(params);
	}

	@Override
	public void addDepartInfo(String preClubId, String departName, String intro,Date birthDate,String collegeId,String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("preClubId", preClubId);
		params.put("departName", departName);
		params.put("intro", intro);
		params.put("birthDate", birthDate);
		params.put("collegeId", collegeId);
		params.put("clubId", clubId);
		departmentMapper.addDepartInfo(params);
	}

	@Override
	public void updateDepartInfo(String departId, String departName, String intro) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("departId", departId);
		params.put("departName", departName);
		params.put("intro", intro);
		departmentMapper.updateDepartInfo(params);
	}

	@Override
	public void deleteDepartInfo(String departId) {
		// TODO Auto-generated method stub
		departmentMapper.deleteDepartInfo(departId);
	}
	
	

}
