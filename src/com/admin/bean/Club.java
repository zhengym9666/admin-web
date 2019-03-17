package com.admin.bean;

public class Club {
	private String clubId;
	private String clubName;
	private String intro;
	private String collegeId;
	private String generalId;
	private String presidentId;
	private String vice1;
	private String vice2;


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
	public String getGeneralId() {
		return generalId;
	}
	public void setGeneralId(String generalId) {
		this.generalId = generalId;
	}
	public String getPresidentId() {
		return presidentId;
	}
	public void setPresidentId(String presidentId) {
		this.presidentId = presidentId;
	}
	public String getVice1() {
		return vice1;
	}
	public void setVice1(String vice1) {
		this.vice1 = vice1;
	}
	public String getVice2() {
		return vice2;
	}
	public void setVice2(String vice2) {
		this.vice2 = vice2;
	}

	@Override
	public String toString() {
		return "Club{" +
				"clubId='" + clubId + '\'' +
				", clubName='" + clubName + '\'' +
				", intro='" + intro + '\'' +
				", collegeId='" + collegeId + '\'' +
				", generalId='" + generalId + '\'' +
				", presidentId='" + presidentId + '\'' +
				", vice1='" + vice1 + '\'' +
				", vice2='" + vice2 + '\'' +
				'}';
	}
}
