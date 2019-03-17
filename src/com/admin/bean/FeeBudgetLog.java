package com.admin.bean;

import java.util.Date;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年3月16日 下午1:30:37
* @version 1.0 
* @desrciption		
*/
public class FeeBudgetLog {

	private int logId;
	private String clubId;
	private Date budget_time;
	private int budget_status;
	private String reason;
	private String budgeter;
	private float budget;
	private float remainMoney;
	private String financial;
	public int getLogId() {
		return logId;
	}
	public void setLogId(int logId) {
		this.logId = logId;
	}
	public String getClubId() {
		return clubId;
	}
	public void setClubId(String clubId) {
		this.clubId = clubId;
	}
	public Date getBudget_time() {
		return budget_time;
	}
	public void setBudget_time(Date budget_time) {
		this.budget_time = budget_time;
	}
	public int getBudget_status() {
		return budget_status;
	}
	public void setBudget_status(int budget_status) {
		this.budget_status = budget_status;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getBudgeter() {
		return budgeter;
	}
	public void setBudgeter(String budgeter) {
		this.budgeter = budgeter;
	}
	public float getBudget() {
		return budget;
	}
	public void setBudget(float budget) {
		this.budget = budget;
	}
	public float getRemainMoney() {
		return remainMoney;
	}
	public void setRemainMoney(float remainMoney) {
		this.remainMoney = remainMoney;
	}
	public String getFinancial() {
		return financial;
	}
	public void setFinancial(String financial) {
		this.financial = financial;
	}
	@Override
	public String toString() {
		return "FeeBudgetLog [logId=" + logId + ", clubId=" + clubId + ", budget_time=" + budget_time
				+ ", budget_status=" + budget_status + ", reason=" + reason + ", budgeter=" + budgeter + ", budget="
				+ budget + ", remainMoney=" + remainMoney + ", financial=" + financial + "]";
	}
	
	
}
