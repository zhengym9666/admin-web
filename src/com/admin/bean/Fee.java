package com.admin.bean;

import java.util.Date;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午1:23:37
* @version 1.0 
* @desrciption		
*/
public class Fee {
	
	private String clubId;
	private float totalFee;
	private Date lastModify_time;
	private float everyFee;
	private String wechatCode;
	private String apayCode;
	public String getClubId() {
		return clubId;
	}
	public void setClubId(String clubId) {
		this.clubId = clubId;
	}
	public float getTotalFee() {
		return totalFee;
	}
	public void setTotalFee(int totalFee) {
		this.totalFee = totalFee;
	}
	public Date getLastModify_time() {
		return lastModify_time;
	}
	public void setLastModify_time(Date lastModify_time) {
		this.lastModify_time = lastModify_time;
	}
	public float getEveryFee() {
		return everyFee;
	}
	public void setEveryFee(int everyFee) {
		this.everyFee = everyFee;
	}
	
	public String getWechatCode() {
		return wechatCode;
	}
	public void setWechatCode(String wechatCode) {
		this.wechatCode = wechatCode;
	}
	public String getApayCode() {
		return apayCode;
	}
	public void setApayCode(String apayCode) {
		this.apayCode = apayCode;
	}
	@Override
	public String toString() {
		return "Fee [clubId=" + clubId + ", totalFee=" + totalFee + ", lastModify_time=" + lastModify_time
				+ ", everyFee=" + everyFee + "]";
	}
	
	
	
}
