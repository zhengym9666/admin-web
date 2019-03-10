package com.admin.util;

import java.io.Serializable;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月26日 下午5:29:42
* @version 1.0 
* @desrciption		
*/
public class Page implements Serializable{
	//当前页
    private Integer page=1;
    //页大小
    private Integer rows=10;
    // 总记录 数
    private Integer totalRecord;
    //总页数
    private Integer totalPage;
    //搜索关键字1
    private String keyword1;
    //搜索关键字2
    private String keyword2;
    //搜索关键字3
    private String keyword3 = "99";
    //开始记录位置
    private Integer start;

	public String getKeyword1() {
		return keyword1;
	}

	public void setKeyword1(String keyword1) {
		this.keyword1 = keyword1;
	}

	public String getKeyword2() {
		return keyword2;
	}

	public void setKeyword2(String keyword2) {
		this.keyword2 = keyword2;
	}

	public Integer getPage() {
        return page;
    }
 
    public void setPage(Integer page) {
        this.page = page;
    }
 
    public Integer getRows() {
        return rows;
    }
 
    public void setRows(Integer rows) {
        this.rows = rows;
    }
 
    public Integer getTotalRecord() {
        return totalRecord;
    }
 
    public void setTotalRecord(Integer totalRecord) {
        this.totalRecord = totalRecord;
    }
 
    public Integer getTotalPage() {
        totalPage=(totalRecord-1)/rows+1;
        return totalPage;
    }
 
    public void setTotalPage(Integer totalPage) {
 
        this.totalPage = totalPage;
    }
 
    public Integer getStart() {
        start=(page-1)*rows;
        return start;
    }
 
    public void setStart(Integer start) {
 
        this.start = start;
    }
 
    
   
    public String getKeyword3() {
		return keyword3;
	}

	public void setKeyword3(String keyword3) {
		this.keyword3 = keyword3;
	}

	public Page() {
    	
    }

	public Page(Integer page, Integer rows, Integer totalRecord, Integer totalPage, String keyword1,
			String keyword2, Integer start) {
		super();
		this.page = page;
		this.rows = rows;
		this.totalRecord = totalRecord;
		this.totalPage = totalPage;
		this.keyword1 = keyword1;
		this.keyword2 = keyword2;
		this.start = start;
	}

	@Override
	public String toString() {
		return "PageUtil [page=" + page + ", rows=" + rows + ", totalRecord=" + totalRecord + ", totalPage=" + totalPage
				+ ", keyword1=" + keyword1 + ", keyword2=" + keyword2 + ", start=" + start + "]";
	}
 
    
}
