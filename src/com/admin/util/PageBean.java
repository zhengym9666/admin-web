package com.admin.util;

import java.util.List;


/**
 * 分页元数据
 * @author zym
 *
 * 2018年12月24日
 */
public class PageBean {
	private List data;//分页数据
	private int currentPage;//当前页
	private int firstPage;//首页
	private int prePage;//上一页
	private int nextPage;//下一页
	private int totalPage;//末页/总页数
	private int totalCount;//总记录数
	private int pageSize;//每页记录数
	public List getData() {
		return data;
	}
	public void setData(List data) {
		this.data = data;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getFirstPage() {
		return firstPage;
	}
	public void setFirstPage(int firstPage) {
		this.firstPage = firstPage;
	}
	
//	上一页  算法：若当前页等于首页，上一页等于当前页，否则上一页等于当前页-1
	public int getPrePage() {
		return this.getCurrentPage()==this.getFirstPage()?this.getCurrentPage():this.getCurrentPage()-1;
	}
	public void setPrePage(int prePage) {
		this.prePage = prePage;
	}
	
//	下一页  算法：若当前页等于总页数，下一页等于当前页，否则下一页等于当前页+1
	public int getNextPage() {
		return this.getCurrentPage()==this.getTotalPage()?this.getCurrentPage():this.getCurrentPage()+1;
	}
	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}
	
//	总页数  算法：若总记录数可以整除每页记录，总页数=总记录数/每页记录数，否则总页数=总记录数/每页记录数+1
	public int getTotalPage() {
		return this.getTotalCount()%this.getPageSize()==0?this.getTotalCount()/this.getPageSize():this.getTotalCount()/this.getPageSize()+1;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	@Override
	public String toString() {
		return "PageBean{" +
				"data=" + data +
				", currentPage=" + currentPage +
				", firstPage=" + firstPage +
				", prePage=" + prePage +
				", nextPage=" + nextPage +
				", totalPage=" + totalPage +
				", totalCount=" + totalCount +
				", pageSize=" + pageSize +
				'}';
	}
}
