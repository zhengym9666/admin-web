package com.admin.dao;

import java.util.HashMap;

import org.apache.ibatis.annotations.Param;

import com.admin.bean.Fee;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午3:08:20
* @version 1.0 
* @desrciption		
*/
public interface FeeDAO {
	
	public Fee getFeeInfoById(@Param("clubId")String clubId);
	
	public void updateTotalFee(HashMap<String,Object> map);
}
