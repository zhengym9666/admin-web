package com.admin.bean;

import java.sql.Timestamp;
import java.util.Date;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月9日 下午6:23:36
* @version 1.0 
* @desrciption		
*/
public class Task {
	private String id;
	private Integer rev;
	private String execution_id;
	private String proc_inst_id;
	private String proc_def_id;
	private String name;
	private String parent_task_id;
	private String description;
	private String task_def_key;
	private String owner;
	private String assignee;
	private String delegation;
	private Integer priority;
	private Date create_time;
	private Timestamp due_date;
	private String category;
	private Integer suspension_state;
	private String tenant_id;
	private String form_key;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Integer getRev() {
		return rev;
	}
	public void setRev(int rev) {
		this.rev = rev;
	}
	public String getExecution_id() {
		return execution_id;
	}
	public void setExecution_id(String execution_id) {
		this.execution_id = execution_id;
	}
	public String getPro_inst_id() {
		return proc_inst_id;
	}
	public void setPro_inst_id(String proc_inst_id) {
		this.proc_inst_id = proc_inst_id;
	}
	public String getProc_def_id() {
		return proc_def_id;
	}
	public void setProc_def_id(String proc_def_id) {
		this.proc_def_id = proc_def_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParent_task_id() {
		return parent_task_id;
	}
	public void setParent_task_id(String parent_task_id) {
		this.parent_task_id = parent_task_id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTask_def_key() {
		return task_def_key;
	}
	public void setTask_def_key(String task_def_key) {
		this.task_def_key = task_def_key;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String getAssignee() {
		return assignee;
	}
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	public String getDelegation() {
		return delegation;
	}
	public void setDelegation(String delegation) {
		this.delegation = delegation;
	}
	public Integer getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	public Timestamp getDue_date() {
		return due_date;
	}
	public void setDue_date(Timestamp due_date) {
		this.due_date = due_date;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Integer getSuspension_state() {
		return suspension_state;
	}
	public void setSuspension_state(int suspension_state) {
		this.suspension_state = suspension_state;
	}
	public String getTenant_id() {
		return tenant_id;
	}
	public void setTenant_id(String tenant_id) {
		this.tenant_id = tenant_id;
	}
	public String getForm_key() {
		return form_key;
	}
	public void setForm_key(String form_key) {
		this.form_key = form_key;
	}
	
}
	