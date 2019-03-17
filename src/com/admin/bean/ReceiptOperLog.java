package com.admin.bean;

import java.util.Date;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月14日 下午4:30:38
* @version 1.0 
* @desrciption		
*/
public class ReceiptOperLog {
	private Integer oper_id;
	private String proc_inst_id;
	private String oper_name;
	private Integer oper_type;
	private Date oper_time;
	private String receipt_type;
	private Integer receipt_state;
	public Integer getOper_id() {
		return oper_id;
	}
	public void setOper_id(Integer oper_id) {
		this.oper_id = oper_id;
	}
	public String getProc_inst_id() {
		return proc_inst_id;
	}
	public void setProc_inst_id(String proc_inst_id) {
		this.proc_inst_id = proc_inst_id;
	}
	public String getOper_name() {
		return oper_name;
	}
	public void setOper_name(String oper_name) {
		this.oper_name = oper_name;
	}
	public Integer getOper_type() {
		return oper_type;
	}
	public void setOper_type(Integer oper_type) {
		this.oper_type = oper_type;
	}
	public Date getOper_time() {
		return oper_time;
	}
	public void setOper_time(Date oper_time) {
		this.oper_time = oper_time;
	}
	public String getReceipt_type() {
		return receipt_type;
	}
	public void setReceipt_type(String receipt_type) {
		this.receipt_type = receipt_type;
	}
	public Integer getReceipt_state() {
		return receipt_state;
	}
	public void setReceipt_state(Integer receipt_state) {
		this.receipt_state = receipt_state;
	}
	
}
