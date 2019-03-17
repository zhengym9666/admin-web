package com.admin.dao;

import com.admin.bean.News;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 
 * @author zym
 *
 */
public interface NewsDAO {
	//根据新闻id获取新闻信息
	public News queryNewsById(@Param("id") int id);

	// 分页获取新闻信息
	public List<News> queryPageNews(@Param("collegeId") String collegeId, @Param("clubId") String clubId, @Param("start") int start, @Param("size") int size);

	// 分页获取新闻信息，增加条件筛选
	public List<News> queryPageNewsByCondition(@Param("news")News news,@Param("start") int start,@Param("size") int size);

	// 获取新闻总记录数
	public int queryTotalCount(@Param("collegeId") String collegeId, @Param("clubId") String clubId);

	// 获取新闻总记录数
	public int queryTotalCountByCondition(News news);

	void saveNews(News news);

	void delNewsById(String id);

	void updateNews(News newid);
}
