package com.admin.service.interfaces;

import java.util.List;

import com.admin.bean.GroupMember;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月23日 上午11:26:02
* @version 1.0 
* @desrciption		
*/
public interface IGroupMemberService {
	
	public List<GroupMember> queryMemberByClubId(String clubId);
	
	public int queryMemberCount(String clubId);
	
	public GroupMember queryMemberInfo(String clubId,String stuNum);
	
	public void addMemberInfo(GroupMember memberInfo);
}
