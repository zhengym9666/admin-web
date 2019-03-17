package com.admin.dao;

import com.admin.bean.College;
import org.apache.ibatis.annotations.Param;

/**
 * 
 * @author zym
 *
 */

public interface CollegeDAO {
	public College queryCollegeById(@Param("id") String collegeId);
}
