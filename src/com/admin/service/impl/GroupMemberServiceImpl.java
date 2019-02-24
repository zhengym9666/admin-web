package com.admin.service.impl;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.GroupMember;
import com.admin.dao.GroupMemberDAO;
import com.admin.service.interfaces.IGroupMemberService;
import com.admin.util.MybatisUtil;



/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月23日 上午11:56:58
* @version 1.0 
* @desrciption		
*/
@Service("groupMemberService")
public class GroupMemberServiceImpl  implements IGroupMemberService{
	
	@Autowired
	GroupMemberDAO groupMemberMapper;
	
	@Override
	public int queryMemberCount(String clubId) {
		// TODO Auto-generated method stub
		return groupMemberMapper.queryMemberCount(clubId);
	}

	@Override
	public List<GroupMember> queryMemberByClubId(String clubId) {
		// TODO Auto-generated method stub
		return groupMemberMapper.queryMemberByClubId(clubId);
	}

	@Override
	public GroupMember queryMemberInfo(String clubId, String stuNum) {
		// TODO Auto-generated method stub
		return groupMemberMapper.queryMemberInfo(clubId, stuNum);
	}

	@Override
	public void addMemberInfo(GroupMember memberInfo) {
		// TODO Auto-generated method stub
		groupMemberMapper.addMemberInfo(memberInfo);
	}
	
}
