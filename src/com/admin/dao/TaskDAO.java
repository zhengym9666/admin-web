package com.admin.dao;

import org.apache.ibatis.annotations.Param;

/** 
* @author   作者 :zhengym
* @version 1.0
* @desrciption		
*/
public interface TaskDAO {
	
	public String getTaskId(@Param("pro_inst_id") String pro_inst_id);

}
