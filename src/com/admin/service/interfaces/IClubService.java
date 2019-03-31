package com.admin.service.interfaces;

import com.admin.bean.Club;
import com.admin.bean.ClubPage;
import com.admin.util.Page;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

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
    
    public List<ClubPage> queryClubPage(Page page);
    
    public ClubPage queryClubPageById(String clubId);
	
	public int queryClubPageCount(Page page);
	
	public void addClub(Club club);
	
	public void updateClub(Club club);
	
	public void deleteClub(@Param("clubId")String clubId);

}
