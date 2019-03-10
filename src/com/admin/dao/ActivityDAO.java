package com.admin.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.admin.bean.Activity;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月9日 下午4:53:29
* @version 1.0 
* @desrciption		
*/
public interface ActivityDAO {
	
	public List<Activity> queryAllActInfo(HashMap<String,Object> map);
	
	public int queryAllActInfoCount(HashMap<String,Object> map);
	
	public void addActInfo(Activity actInfo);
	
	public void updateActInfo(HashMap<String,Object> map);
	
	public Activity queryActInfoById(@Param("actId")int actId);
	
	public void deleteActInfo(@Param("actId")int actId);
}
