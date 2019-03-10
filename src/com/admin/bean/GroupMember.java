package com.admin.bean;

import java.util.Date;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月23日 上午11:11:03
* @version 1.0 
* @desrciption		
*/
public class GroupMember {
	
	private int id;
	private String stuNum;
	private String stuName;
	private String clubId;
	private String departmentId;
	private int rank;
	private String job;
	private int state;
	private Date joinTime;
	private Date exitTime;
	private Date applyTime;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStuNum() {
		return stuNum;
	}
	public void setStuNum(String stuNum) {
		this.stuNum = stuNum;
	}
	public String getStuName() {
		return stuName;
	}
	public void setStuName(String stuName) {
		this.stuName = stuName;
	}
	public String getClubId() {
		return clubId;
	}
	public void setClubId(String clubId) {
		this.clubId = clubId;
	}
	public String getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public Date getJoinTime() {
		return joinTime;
	}
	public void setJoinTime(Date joinTime) {
		this.joinTime = joinTime;
	}
	public Date getExitTime() {
		return exitTime;
	}
	public void setExitTime(Date exitTime) {
		this.exitTime = exitTime;
	}
	
	public Date getApplyTime() {
		return applyTime;
	}
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}
	@Override
	public String toString() {
		return "GroupMember [id=" + id + ", stuNum=" + stuNum + ", stuName=" + stuName + ", clubId=" + clubId
				+ ", departmentId=" + departmentId + ", rank=" + rank + ", job=" + job + ", state=" + state
				+ ", joinTime=" + joinTime + ", exitTime=" + exitTime + "]";
	}
	
	
	
}
