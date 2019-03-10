package com.admin.service.interfaces;

import java.util.List;

import com.admin.bean.Activity;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月9日 下午4:56:04
* @version 1.0 
* @desrciption		
*/
public interface IActivityService {
	
	public List<Activity> queryAllActInfo(Page page,String clubId);
	
	public int queryAllActInfoCount(Page page,String clubId);
	
	public void addActInfo(Activity actInfo);
	
	public void updateActInfo(int id,Activity actInfo);
	
	public Activity queryActInfoById(int actId);
	
	public void deleteActInfo(int actId);
	
}
