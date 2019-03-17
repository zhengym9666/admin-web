package com.admin.service.impl;

import com.admin.bean.College;
import com.admin.bean.News;
import com.admin.dao.CollegeDAO;
import com.admin.dao.NewsDAO;
import com.admin.service.interfaces.ICollegeService;
import com.admin.util.MybatisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("collegeService")
public class CollegeServiceImpl extends AbsServiceImpl<CollegeDAO> implements ICollegeService {

	@Override
	public College queryCollegeById(String collegeId) {
		return mapper.queryCollegeById(collegeId);
	}

	public static void main(String[] args) throws Exception {
		MybatisUtil util=new MybatisUtil();
		CollegeServiceImpl service=util.getMapperServiceImplObject(CollegeDAO.class, CollegeServiceImpl.class);
		College college= service.queryCollegeById("1010000");
		System.out.println(college);
	}
}
