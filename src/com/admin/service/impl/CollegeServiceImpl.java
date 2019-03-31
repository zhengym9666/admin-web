package com.admin.service.impl;

import com.admin.bean.College;
import com.admin.bean.News;
import com.admin.dao.CollegeDAO;
import com.admin.dao.NewsDAO;
import com.admin.service.interfaces.ICollegeService;
import com.admin.util.MybatisUtil;
import com.admin.util.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
	
	@Override
	public List<College> queryCollegePage(Page page) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		return mapper.queryCollegePage(params);
	}

	@Override
	public int queryCollegePageCount(Page page) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		return mapper.queryCollegePageCount(params);
	}

	@Override
	public String createCollegeId() {
		// TODO Auto-generated method stub
		return mapper.createCollegeId();
	}

	@Override
	public void saveNewCollege(String fullname, String abbr, String intro, String image) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("id", createCollegeId());
		params.put("abbr", abbr);
		params.put("fullname",fullname);
		params.put("intro", intro);
		params.put("image", image);
		mapper.addCollege(params);
	}

	@Override
	public void updateCollege(String fullname, String abbr, String intro, String image, String collegeId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("fullname", fullname);
		params.put("abbr", abbr);
		params.put("intro", intro);
		params.put("image", image);
		params.put("collegeId", collegeId);
		mapper.updateCollege(params);
	}

	@Override
	public void deleteCollege(String collegeId) {
		// TODO Auto-generated method stub
		mapper.deleteCollege(collegeId);
	}

	@Override
	public List<College> queryCollegeList() {
		// TODO Auto-generated method stub
		return mapper.queryCollegeList();
	}

}
