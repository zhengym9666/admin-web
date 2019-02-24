package com.admin.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.Student;
import com.admin.dao.StudentDAO;
import com.admin.service.interfaces.IStudentService;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月23日 上午10:39:04
* @version 1.0 
* @desrciption		
*/
@Service("studentService")
public class StudentServiceImpl implements IStudentService {
	
	@Autowired
	StudentDAO studentMapper;

	@Override
	public List<Student> queryAllStudent() {
		// TODO Auto-generated method stub
		return studentMapper.queryAllStudent();
	}

	@Override
	public Student queryStudentByStuNum(String stuNum) {
		// TODO Auto-generated method stub
		return studentMapper.queryStudentByStuNum(stuNum);
	}

	
}
