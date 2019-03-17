package com.admin.service.impl;

import com.admin.dao.TaskDAO;
import com.admin.service.interfaces.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月9日 上午12:09:25
* @version 1.0 
* @desrciption		
*/
@Service("taskService")
public class TaskServiceImpl implements ITaskService {
	
	@Autowired
	TaskDAO TaskMapper;

	@Override
	public String getTaskId(String taskId) {
		// TODO Auto-generated method stub
		return TaskMapper.getTaskId(taskId);
	}

}
