package com.admin.service.interfaces;

import java.util.List;

import com.admin.bean.FeeBudgetLog;
import com.admin.bean.FeeChatBean;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午4:57:42
* @version 1.0 
* @desrciption		
*/
public interface IFeeBudgetLogService {
	
	public void addBudgetLog(FeeBudgetLog logInfo);
	
	public List<FeeBudgetLog> queryBudgetLog(Page page,String clubId);
	
	public int queryBudgetLogCount(Page page,String clubId);

    List<FeeChatBean> queryBugetByMonth(String clubId);
}
