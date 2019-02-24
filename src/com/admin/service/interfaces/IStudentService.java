package com.admin.service.interfaces;

import java.util.List;

import com.admin.bean.Student;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月23日 上午10:36:55
* @version 1.0 
* @desrciption		
*/
public interface IStudentService {

	public List<Student> queryAllStudent();
	
	public Student queryStudentByStuNum(String stuNum);
}
