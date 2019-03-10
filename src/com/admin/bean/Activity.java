package com.admin.bean;
/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月9日 下午4:51:07
* @version 1.0 
* @desrciption		
*/
public class Activity {
	private int id;
	private String name;
	private String intro;
	private String hostDepart;
	private String clubId;
	private String frequency;
	private String place;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIntro() {
		return intro;
	}
	public void setIntro(String intro) {
		this.intro = intro;
	}
	public String getHostDepart() {
		return hostDepart;
	}
	public void setHostDepart(String hostDepart) {
		this.hostDepart = hostDepart;
	}
	public String getClubId() {
		return clubId;
	}
	public void setClubId(String clubId) {
		this.clubId = clubId;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	@Override
	public String toString() {
		return "Activity [id=" + id + ", name=" + name + ", intro=" + intro + ", hostDepart=" + hostDepart + ", clubId="
				+ clubId + ", frequency=" + frequency + ", place=" + place + "]";
	}
	
}
