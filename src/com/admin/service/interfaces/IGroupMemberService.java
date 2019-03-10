package com.admin.service.interfaces;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.admin.bean.GroupMember;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月23日 上午11:26:02
* @version 1.0 
* @desrciption		
*/
public interface IGroupMemberService {
	
	public List<GroupMember> queryMemberByClubId(Page page,String clubId);
	
	public int queryMemberCount(Page page,String clubId);
	
	public GroupMember queryMemberInfo(String clubId,String stuNum);
	
	public void addMemberInfo(GroupMember memberInfo);
	
	public void updateMemberInfo(GroupMember memberInfo);
	
	public void deleteMemberInfo(String stuNum,String clubId);
	
	public List<GroupMember> queryAllRecruitInfo(Page page,String clubId);
	
	public int queryAllRecruitInfoCount(Page page,String clubId);
	
	public List<GroupMember> queryMyCheckInfo(Page page,String clubId,String departmentId);
	
	public int queryMyCheckInfoCount(Page page,String clubId,String departmentId);
	
	public void updateStateToFomal(Date joinTime,Date exitTime,String stuNum,String clubId,String departmentId);
	
	public void updateStateToMiss(String stuNum,String clubId,String departmentId);
	
	public void updateStateToQuit(String stuNum,String clubId,String departmentId);
	
	public List<GroupMember> queryCandidator(Page page,String clubId,String departmentId);
	
	public int queryCandidatorCount(Page page,String clubId,String departmentId);
	
	public List<GroupMember> querySeniorCandidator(Page page,String clubId);
	
	public int querySeniorCandidatorCount(Page page,String clubId);
	
	public List<GroupMember> queryCurrentSenior(Page page,String clubId,String departmentId);
	
	public int queryCurrentSeniorCount(Page page,String clubId,String departmentId);
	
	public void updateOne2Senior(String clubId,String stuNum,int rank,String job);
	
	public void updateSenior2Formal(String clubId,int rank,String departmentId,String job);
	
	public void updateSenior2FormalByNum(String clubId,String stuNum,String job);
}
