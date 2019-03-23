package com.admin.service.impl;

import java.util.HashMap;
import java.util.List;

import com.admin.bean.College;
import com.admin.bean.FeeChatBean;
import com.admin.dao.CollegeDAO;
import com.admin.util.MybatisUtil;
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
public class FeeBudgetLogServiceImpl extends AbsServiceImpl<FeeBudgetLogDAO> implements IFeeBudgetLogService {
	

	@Override
	public void addBudgetLog(FeeBudgetLog logInfo) {
		// TODO Auto-generated method stub
		mapper.addBudgetLog(logInfo);
	}

	@Override
	public List<FeeBudgetLog> queryBudgetLog(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return mapper.queryBudgetLog(params);
	}

	@Override
	public int queryBudgetLogCount(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return mapper.queryBudgetLogCount(params);
	}

	@Override
	public List<FeeChatBean> queryBugetByMonth(String clubId) {
		return mapper.queryBugetByMonth(clubId);
	}

	public static void main(String[] args) throws Exception {
		MybatisUtil util=new MybatisUtil();
		FeeBudgetLogServiceImpl service=util.getMapperServiceImplObject(FeeBudgetLogDAO.class, FeeBudgetLogServiceImpl.class);
		List<FeeChatBean> list= service.queryBugetByMonth("1010100");
		System.out.println(list);
	}

}
