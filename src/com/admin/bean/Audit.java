package com.admin.bean;

import java.util.Date;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月8日 下午9:30:49
* @version 1.0 
* @desrciption		
*/
public class Audit {
	
	private String taskId;
	private String auditNum;
	private String auditName;
	private String department;
	private Date time;
	private String reason;
	private Integer total;
	private Integer state;
	private String procInstId;
	private String audit_suggest;
	
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getAuditNum() {
		return auditNum;
	}
	public void setAuditNum(String auditNum) {
		this.auditNum = auditNum;
	}
	public String getAuditName() {
		return auditName;
	}
	public void setAuditName(String auditName) {
		this.auditName = auditName;
	}
	
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getProcInstId() {
		return procInstId;
	}
	public void setProcInstId(String procInstId) {
		this.procInstId = procInstId;
	}
	public String getAudit_suggest() {
		return audit_suggest;
	}
	public void setAudit_suggest(String audit_suggest) {
		this.audit_suggest = audit_suggest;
	}
		
	

}
