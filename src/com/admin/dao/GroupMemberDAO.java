package com.admin.dao;

import java.util.HashMap;
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
	
	public int getMemberCountByClubId(@Param("clubId")String clubId);
	
	public List<GroupMember> queryMemberByClubId(HashMap<String,Object> map);
	
	public int queryMemberCount(HashMap<String,Object> map);
	
	public GroupMember queryMemberInfo(@Param("clubId")String clubId,@Param("stuNum")String stuNum);
	
	public void addMemberInfo(GroupMember memberInfo);
	
	public void updateMemberInfo(GroupMember memberInfo);
	
	public void deleteMemberInfo(@Param("stuNum")String stuNum,@Param("clubId")String clubId);
	
	public List<GroupMember> queryAllRecruitInfo(HashMap<String,Object> map);
	
	public int queryAllRecruitInfoCount(HashMap<String,Object> map);
	
	public List<GroupMember> queryMyCheckInfo(HashMap<String,Object> map);
	
	public int queryMyCheckInfoCount(HashMap<String,Object> map); 
	
	public void updateStateToFomal(HashMap<String,Object> map);
	
	public void updateStateToMiss(HashMap<String,Object> map);
	
	public void updateStateToQuit(HashMap<String,Object> map);
	
	public List<GroupMember> queryCandidator(HashMap<String,Object> map);
	
	public int queryCandidatorCount(HashMap<String,Object> map);
	
	public List<GroupMember> querySeniorCandidator(HashMap<String,Object> map);
	
	public int querySeniorCandidatorCount(HashMap<String,Object> map);
	
	public List<GroupMember> queryCurrentSenior(HashMap<String,Object> map);
	
	public int queryCurrentSeniorCount(HashMap<String,Object> map);
	
	public void updateOne2Senior(HashMap<String,Object> map);
	
	public void updateSenior2Formal(HashMap<String,Object> map);
	
	public void updateSenior2FormalByNum(HashMap<String,Object> map);
	
	public void updateisFee(HashMap<String,Object> map);
	
	public List<GroupMember> queryMemberByKey(HashMap<String,Object> map);
}
