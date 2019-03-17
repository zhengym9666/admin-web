package com.admin.service.interfaces;

import java.util.List;

import com.admin.bean.Fee;
import com.admin.bean.FeeBudgetLog;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午3:11:46
* @version 1.0 
* @desrciption		
*/
public interface IFeeService {
	
	public Fee getFeeInfoById(String clubId);
	
	public void updateTotalFee(String clubId,float totalFee);

	
}
