package com.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.admin.bean.Student;

/**
 * 
 * @author zym
 *
 * 2019年2月22日
 */
public interface StudentDAO {
	
	public List<Student> queryAllStudent();
	
	public Student queryStudentByStuNum(@Param("stuNum")String stuNum);
	
	public void addStudentInfo(Student student);
	
	public void updateStudentInfo(Student student);
	
	public void deleteStudentInfo(@Param("stuNum")String stuNum);
}
