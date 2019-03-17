package com.admin.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.GroupMember;
import com.admin.dao.GroupMemberDAO;
import com.admin.service.interfaces.IGroupMemberService;
import com.admin.util.MybatisUtil;
import com.admin.util.Page;



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
	public int queryMemberCount(Page page,String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("clubId", clubId);
		return groupMemberMapper.queryMemberCount(params);
	}

	@Override
	public List<GroupMember> queryMemberByClubId(Page page,String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return groupMemberMapper.queryMemberByClubId(params);
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

	@Override
	public void updateMemberInfo(GroupMember memberInfo) {
		// TODO Auto-generated method stub
		groupMemberMapper.updateMemberInfo(memberInfo);
	}

	@Override
	public void deleteMemberInfo(String stuNum, String clubId) {
		// TODO Auto-generated method stub
		groupMemberMapper.deleteMemberInfo(stuNum, clubId);
	}

	@Override
	public List<GroupMember> queryAllRecruitInfo(Page page,String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return groupMemberMapper.queryAllRecruitInfo(params);
	}

	@Override
	public int queryAllRecruitInfoCount(Page page,String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("clubId", clubId);
		return groupMemberMapper.queryAllRecruitInfoCount(params);
	}

	@Override
	public List<GroupMember> queryMyCheckInfo(Page page,String clubId, String departmentId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("state", Integer.parseInt(page.getKeyword3()));
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		params.put("departmentId", departmentId);
		return groupMemberMapper.queryMyCheckInfo(params);
	}

	@Override
	public int queryMyCheckInfoCount(Page page, String clubId, String departmentId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("state", page.getKeyword3());
		params.put("clubId", clubId);
		params.put("departmentId", departmentId);
		return groupMemberMapper.queryMyCheckInfoCount(params);
	}

	@Override
	public void updateStateToFomal(Date joinTime, Date exitTime, String stuNum, String clubId, String departmentId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("joinTime", joinTime);
		params.put("exitTime", exitTime);
		params.put("stuNum", stuNum);
		params.put("clubId", clubId);
		params.put("departmentId", departmentId);
		groupMemberMapper.updateStateToFomal(params);
	}

	@Override
	public void updateStateToMiss(String stuNum, String clubId, String departmentId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("stuNum", stuNum);
		params.put("clubId", clubId);
		params.put("departmentId", departmentId);
		groupMemberMapper.updateStateToMiss(params);
	}

	@Override
	public void updateStateToQuit(String stuNum, String clubId, String departmentId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("stuNum", stuNum);
		params.put("clubId", clubId);
		params.put("departmentId", departmentId);
		groupMemberMapper.updateStateToQuit(params);
	}

	@Override
	public List<GroupMember> queryCandidator(Page page,String clubId, String departmentId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("departmentId", departmentId);
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		return groupMemberMapper.queryCandidator(params);
	}

	@Override
	public int queryCandidatorCount(Page page, String clubId, String departmentId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("departmentId", departmentId);
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		return groupMemberMapper.queryCandidatorCount(params);
	}

	@Override
	public List<GroupMember> queryCurrentSenior(Page page, String clubId, String departmentId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("departmentId", departmentId);
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		return groupMemberMapper.queryCurrentSenior(params);
	}

	@Override
	public int queryCurrentSeniorCount(Page page, String clubId, String departmentId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("departmentId", departmentId);
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		return groupMemberMapper.queryCurrentSeniorCount(params);
	}

	@Override
	public List<GroupMember> querySeniorCandidator(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		return groupMemberMapper.querySeniorCandidator(params);
	}

	@Override
	public int querySeniorCandidatorCount(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		return groupMemberMapper.querySeniorCandidatorCount(params);
	}

	@Override
	public void updateOne2Senior(String clubId, String stuNum, int rank,String job) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("stuNum", stuNum);
		params.put("rank", rank);
		params.put("job", job);
		groupMemberMapper.updateOne2Senior(params);
	}

	@Override
	public void updateSenior2Formal(String clubId, int rank,String departmentId,String job) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("rank", rank);
		params.put("departmentId", departmentId);
		params.put("job", job);
		groupMemberMapper.updateSenior2Formal(params);
	}

	@Override
	public void updateSenior2FormalByNum(String clubId, String stuNum, String job) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("clubId", clubId);
		params.put("stuNum", stuNum);
		params.put("job", job);
		groupMemberMapper.updateSenior2FormalByNum(params);
	}



	@Override
	public void updateisFee(String stuNum, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("stuNum", stuNum);
		params.put("clubId", clubId);
		groupMemberMapper.updateisFee(params);
	}

	@Override
	public List<GroupMember> queryMemberByKey(String keyword, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword", keyword);
		params.put("clubId", clubId);
		return groupMemberMapper.queryMemberByKey(params);
	}



}
