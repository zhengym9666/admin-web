package com.admin.bean;

import java.util.Date;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年1月24日 下午11:48:39
* @version 1.0 
* @desrciption		
*/
public class Receipt {
	private String receiptman_id;
	private String receiptman_name;
	private String clubId;
	private Integer state;
	private Date submit_time;
	private Date revise_time;
	private Date lastaudit_time;
	private String one_autitor;
	private String second_autitor;
	private String third_autitor;
	private Integer amount;
	private String reason;
	private String taskId;
	private int id;
	private String proc_inst_id;
	private String audit_suggest;
	public String getReceiptman_id() {
		return receiptman_id;
	}
	public void setReceiptman_id(String receiptman_id) {
		this.receiptman_id = receiptman_id;
	}
	public String getReceiptman_name() {
		return receiptman_name;
	}
	public void setReceiptman_name(String receiptman_name) {
		this.receiptman_name = receiptman_name;
	}
	public String getClubId() {
		return clubId;
	}
	public void setClubId(String clubId) {
		this.clubId = clubId;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public Date getSubmit_time() {
		return submit_time;
	}
	public void setSubmit_time(Date submit_time) {
		this.submit_time = submit_time;
	}
	public Date getRevise_time() {
		return revise_time;
	}
	public void setRevise_time(Date revise_time) {
		this.revise_time = revise_time;
	}
	public Date getLastaudit_time() {
		return lastaudit_time;
	}
	public void setLastaudit_time(Date lastaudit_time) {
		this.lastaudit_time = lastaudit_time;
	}
	public String getOne_autitor() {
		return one_autitor;
	}
	public void setOne_autitor(String one_autitor) {
		this.one_autitor = one_autitor;
	}
	public String getSecond_autitor() {
		return second_autitor;
	}
	public void setSecond_autitor(String second_autitor) {
		this.second_autitor = second_autitor;
	}
	public String getThird_autitor() {
		return third_autitor;
	}
	public void setThird_autitor(String third_autitor) {
		this.third_autitor = third_autitor;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getProc_inst_id() {
		return proc_inst_id;
	}
	public void setProc_inst_id(String proc_inst_id) {
		this.proc_inst_id = proc_inst_id;
	}
	public String getAudit_suggest() {
		return audit_suggest;
	}
	public void setAudit_suggest(String audit_suggest) {
		this.audit_suggest = audit_suggest;
	}
	
}
