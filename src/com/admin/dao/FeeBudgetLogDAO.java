package com.admin.dao;

import java.util.HashMap;
import java.util.List;

import com.admin.bean.FeeBudgetLog;
import com.admin.bean.FeeChatBean;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午4:48:21
* @version 1.0 
* @desrciption		
*/
public interface FeeBudgetLogDAO {
	
	public void addBudgetLog(FeeBudgetLog logInfo);
	
	public List<FeeBudgetLog> queryBudgetLog(HashMap<String,Object> map);
	
	public int queryBudgetLogCount(HashMap<String,Object> map);

    List<FeeChatBean> queryBugetByMonth(String clubId);
}
