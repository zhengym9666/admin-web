package com.admin.service.impl;

import com.admin.bean.Club;
import com.admin.bean.ClubPage;
import com.admin.dao.ClubDAO;
import com.admin.service.interfaces.IClubService;
import com.admin.util.Page;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("clubService")
public class ClubServiceImpl extends AbsServiceImpl<ClubDAO> implements IClubService {
//    @Autowired
//    ClubDAO mapper;
	@Override
	public List<Club> queryClubBycollegeId(String collegeId) {
		// TODO Auto-generated method stub
		return mapper.queryClubBycollegeId(collegeId);
	}

	@Override
	public Club getClubById(String clubId) {
		// TODO Auto-generated method stub
		return mapper.getClubById(clubId);
	}

	@Override
	public String getGeneralIdByClubId(String clubId) {
		return mapper.getGeneralIdByClubId(clubId);
	}

	@Override
	public Club queryUserGroup(String clubId) {
		return mapper.queryUserGroup(clubId);
	}



	/*public static UserGroupData studentToUser(Club club){
		UserGroupData userGroup=new UserGroupData();
		userGroup.setUserGroupId(club.getClubId());
		userGroup.setUserGroupName(club.getClubName());
		return userGroup;
	}*/
	public static void main(String[] args) {

		//new TokenServiceImpl().createToken("123");
		Date date = new Date();
		//Date expireTime = new Date(date.getTime() + CommonConfigUCenter.TOKEN_EXPIRE_TIME);
		//System.out.println(expireTime);
	}

	@Override
	public List<ClubPage> queryClubPage(Page page) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		return mapper.queryClubPage(params);
	}

	@Override
	public int queryClubPageCount(Page page) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("keyword2", page.getKeyword2());
		return mapper.queryClubPageCount(params);
	}

	@Override
	public void addClub(Club club) {
		// TODO Auto-generated method stub
		mapper.addClub(club);
	}

	@Override
	public void updateClub(Club club) {
		// TODO Auto-generated method stub
		mapper.updateClub(club);
	}

	@Override
	public void deleteClub(String clubId) {
		// TODO Auto-generated method stub
		mapper.deleteClub(clubId);
	}

	@Override
	public ClubPage queryClubPageById(String clubId) {
		// TODO Auto-generated method stub
		return mapper.queryClubPageById(clubId);
	}
}
