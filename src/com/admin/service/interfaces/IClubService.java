package com.admin.service.interfaces;

import com.admin.bean.Club;

import java.util.List;

/**
 * 
 * @author zym
 *
 * 2018年12月27日
 */

public interface IClubService {
	public List<Club> queryClubBycollegeId(String collegeId);
	
	public Club getClubById(String clubId);
	public String getGeneralIdByClubId(String clubId);

    Club queryUserGroup(String clubId);
}
