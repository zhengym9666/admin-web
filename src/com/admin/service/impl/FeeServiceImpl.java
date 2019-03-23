package com.admin.service.impl;

import java.util.HashMap;
import java.util.List;

import com.admin.bean.FeeChatBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.Fee;
import com.admin.bean.FeeBudgetLog;
import com.admin.dao.FeeDAO;
import com.admin.service.interfaces.IFeeService;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午3:13:09
* @version 1.0 
* @desrciption		
*/
@Service("feeService")
public class FeeServiceImpl implements IFeeService {
	
	@Autowired
	FeeDAO feeMapper;

	@Override
	public Fee getFeeInfoById(String clubId) {
		// TODO Auto-generated method stub
		return feeMapper.getFeeInfoById(clubId);
	}

	@Override
	public void updateTotalFee(String clubId, float totalFee) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("totalFee", totalFee);
		feeMapper.updateTotalFee(params);
	}

	@Override
	public void updateCode(String clubId, String codeName) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("wechatCode", codeName);
		params.put("apayCode", codeName);
		feeMapper.updateCode(params);
	}



}
