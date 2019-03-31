package com.admin.bean;

import java.util.Date;

public class Club {
	private String clubId;
	private String clubName;
	private String intro;
	private String collegeId;
	private Date birthdate;

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

	@Override
	public String toString() {
		return "Club [clubId=" + clubId + ", clubName=" + clubName + ", intro=" + intro + ", collegeId=" + collegeId
				+ ", birthdate=" + birthdate + "]";
	}
	


}
