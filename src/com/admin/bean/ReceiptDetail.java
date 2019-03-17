package com.admin.bean;

import java.util.Date;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年1月25日 上午10:00:53
* @version 1.0 
* @desrciption		
*/
public class ReceiptDetail {
	private Integer receipt_item_id;
	private Integer receipt_id;
	private Date spend_time;
	private String reason;
	private String detail;
	private Integer cost;
	public Integer getReceipt_item_id() {
		return receipt_item_id;
	}
	public void setReceipt_item_id(Integer receipt_item_id) {
		this.receipt_item_id = receipt_item_id;
	}
	public Integer getReceipt_id() {
		return receipt_id;
	}
	public void setReceipt_id(Integer receipt_id) {
		this.receipt_id = receipt_id;
	}
	public Date getSpend_time() {
		return spend_time;
	}
	public void setSpend_time(Date spend_time) {
		this.spend_time = spend_time;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public Integer getCost() {
		return cost;
	}
	public void setCost(Integer cost) {
		this.cost = cost;
	}
	
}
