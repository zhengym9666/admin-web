package com.admin.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.Activity;
import com.admin.dao.ActivityDAO;
import com.admin.service.interfaces.IActivityService;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月9日 下午4:57:21
* @version 1.0 
* @desrciption		
*/
@Service("activityService")
public class ActivityServiceImpl implements IActivityService {
	
	@Autowired
	ActivityDAO activityMapper;

	@Override
	public List<Activity> queryAllActInfo(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return activityMapper.queryAllActInfo(params);
	}

	@Override
	public int queryAllActInfoCount(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return activityMapper.queryAllActInfoCount(params);
	}

	@Override
	public void addActInfo(Activity actInfo) {
		// TODO Auto-generated method stub
		activityMapper.addActInfo(actInfo);
	}

	@Override
	public void updateActInfo(int id, Activity actInfo) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("name", actInfo.getName());
		params.put("intro", actInfo.getIntro());
		params.put("hostDepart", actInfo.getHostDepart());
		params.put("clubId", actInfo.getClubId());
		params.put("frequency", actInfo.getFrequency());
		params.put("place", actInfo.getPlace());
		params.put("id", id);
		activityMapper.updateActInfo(params);
	}

	@Override
	public Activity queryActInfoById(int actId) {
		// TODO Auto-generated method stub
		return activityMapper.queryActInfoById(actId);
	}

	@Override
	public void deleteActInfo(int actId) {
		// TODO Auto-generated method stub
		activityMapper.deleteActInfo(actId);
	}

}
