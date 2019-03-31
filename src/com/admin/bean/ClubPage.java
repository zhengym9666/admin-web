package com.admin.bean;

import java.util.Date;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月30日 下午6:18:47
* @version 1.0 
* @desrciption		
*/
public class ClubPage {
	private String clubId;
	private String clubName;
	private String intro;
	private String collegeId;
	private Date birthdate;
	private String collegeName;
	public String getClubId() {
		return clubId;
	}
	public void setClubId(String clubId) {
		this.clubId = clubId;
	}
	public String getClubName() {
		return clubName;
	}
	public void setClubName(String clubName) {
		this.clubName = clubName;
	}
	public String getIntro() {
		return intro;
	}
	public void setIntro(String intro) {
		this.intro = intro;
	}
	public String getCollegeId() {
		return collegeId;
	}
	public void setCollegeId(String collegeId) {
		this.collegeId = collegeId;
	}
	public Date getBirthdate() {
		return birthdate;
	}
	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}
	public String getCollegeName() {
		return collegeName;
	}
	public void setCollegeName(String collegeName) {
		this.collegeName = collegeName;
	}
	
	
}
