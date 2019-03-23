package com.admin.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.FeeBudgetLog;
import com.admin.dao.FeeBudgetLogDAO;
import com.admin.service.interfaces.IFeeBudgetLogService;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午5:00:42
* @version 1.0 
* @desrciption		
*/
@Service("feeBudgetLogService")
public class FeeBudgetLogServiceImpl implements IFeeBudgetLogService {
	
	@Autowired
	FeeBudgetLogDAO feeBudgetLogMapper;

	@Override
	public void addBudgetLog(FeeBudgetLog logInfo) {
		// TODO Auto-generated method stub
		feeBudgetLogMapper.addBudgetLog(logInfo);
	}

	@Override
	public List<FeeBudgetLog> queryBudgetLog(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return feeBudgetLogMapper.queryBudgetLog(params);
	}

	@Override
	public int queryBudgetLogCount(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return feeBudgetLogMapper.queryBudgetLogCount(params);
	}

}
