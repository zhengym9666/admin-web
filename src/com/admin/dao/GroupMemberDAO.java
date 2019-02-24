package com.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.admin.bean.GroupMember;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月23日 上午11:09:50
* @version 1.0 
* @desrciption		
*/
public interface GroupMemberDAO {
	
	public List<GroupMember> queryMemberByClubId(@Param("clubId")String clubId);
	
	public int queryMemberCount(@Param("clubId")String clubId);
	
	public GroupMember queryMemberInfo(@Param("clubId")String clubId,@Param("stuNum")String stuNum);
	
	public void addMemberInfo(GroupMember memberInfo);
	
}
