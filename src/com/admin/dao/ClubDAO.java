package com.admin.dao;

import com.admin.bean.Club;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 
 * @author zym
 *
 * 2018年12月27日
 */

public interface ClubDAO {
    //	根据学院id获取社团列表
	public List<Club> queryClubBycollegeId(@Param("collegeId") String collegeId);

    //根据社团ID获取社长ID
	public String getGeneralIdByClubId(@Param("clubId") String clubId);

    Club queryUserGroup(String clubId);

	//根据社团id获取会长id
	public Club getClubById(@Param("clubId") String clubId);

}
