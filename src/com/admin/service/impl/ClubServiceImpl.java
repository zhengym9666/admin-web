package com.admin.service.impl;

import com.admin.bean.Club;
import com.admin.dao.ClubDAO;
import com.admin.service.interfaces.IClubService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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
}
