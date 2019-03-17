package com.admin.service.interfaces;


import com.admin.bean.News;
import com.admin.util.PageBean;

import java.util.List;

/**
 * 
 * @author zym
 *
 * 2018年12月24日
 */

public interface INewsService {
	public News queryNewsById(int id);
	
	public PageBean queryPageNews(String collegeId, String clubId, int currentPage, int pageSize);

	public int queryTotalCount(String collegeId, String clubId);

	public int queryTotalCountByCondition(News news);

	public List<News> queryAllNewsInfo(News news, int currentPage, int pageSize);

    boolean saveNews(News news);

    void delNewsById(String id);

	void updateNews(News newid);
}
