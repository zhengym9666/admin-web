package com.admin.service.impl;

import com.admin.bean.News;
import com.admin.dao.NewsDAO;
import com.admin.service.interfaces.INewsService;
import com.admin.util.MybatisUtil;
import com.admin.util.PageBean;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * 
 * @author zym
 *
 * 2018年12月24日
 */
@Service("newsService")
public class NewsServiceImpl extends AbsServiceImpl<NewsDAO> implements INewsService {
	
	@Override
	public News queryNewsById(int id) {
		// TODO Auto-generated method stub
		return mapper.queryNewsById(id);
	}
	
	@Override
	public PageBean queryPageNews(String collegeId,String clubId,int currentPage, int pageSize) {
		PageBean pageBean = new PageBean();
		int start = (currentPage-1)*pageSize;
		int size = pageSize;
		pageBean.setData(mapper.queryPageNews(collegeId,clubId,start, size));
		pageBean.setCurrentPage(currentPage);
		
//		总记录数
		pageBean.setTotalCount(queryTotalCount(collegeId,clubId));
//		每页显示记录数
		pageBean.setPageSize(pageSize);
		
//		首页    
		pageBean.setFirstPage(1);
		
		return pageBean;
	}

	@Override
	public List<News> queryAllNewsInfo(News news, int currentPage, int pageSize) {
		int start = (currentPage-1)*pageSize;
		int size = pageSize;
		List<News> list=mapper.queryPageNewsByCondition(news,start, size);
		return list;
	}

	@Override
	public boolean saveNews(News news) {
		mapper.saveNews(news);
		return true;
	}

	@Override
	public void delNewsById(String id) {
		mapper.delNewsById(id);
	}

	@Override
	public void updateNews(News news) {
		mapper.updateNews(news);
	}


	@Override
	public int queryTotalCount(String collegeId, String clubId) {
		return mapper.queryTotalCount(collegeId, clubId);
	}

	@Override
	public int queryTotalCountByCondition(News news) {
		return mapper.queryTotalCountByCondition(news);
	}

	public static void main(String[] args) throws Exception {
		MybatisUtil util=new MybatisUtil();
		NewsServiceImpl service = util.getMapperServiceImplObject(NewsDAO.class, NewsServiceImpl.class);
//		List<News> list = service.queryAllNewsInfo("1010000", "1010100", 1, 5);
//		System.out.println(list);
		/*News news=new News();
		news.setAuthor("林仰斌");
		news.setTitle("测试");
		news.setSubmitter("提交者");
		news.setCollegeId("12312");
		news.setClubId("2321");
		news.setSubmit_time(new Date());
		news.setContent("<p>2311</p>");
		service.saveNews(news);
		util.commit();*/
		/*int i = service.queryTotalCount("1010000", "1010100");
		System.out.println(i);*/
//		service.delNewsById("2000002239");
		/*News n=new News();
		n.setId(2000002);
		n.setTitle("更新");
		n.setRevise_time(new Date());
		service.updateNews(n);*/

		//根据筛选条件模糊查询
		News newBycondition=new News();
		//newBycondition.setAuthor("2");
		newBycondition.setCollegeId("1010000");
		newBycondition.setClubId("1010100");
		List<News>  list= service.queryAllNewsInfo(newBycondition, 1, 10);
		System.out.println(ReflectionToStringBuilder.toString(list));

		/*News newBycondition=new News();
		newBycondition.setAuthor("2");
		newBycondition.setCollegeId("1010000");
		newBycondition.setClubId("1010100");
		int count= service.queryTotalCountByCondition(newBycondition);
		System.out.println(count);*/


		util.commit();
	}
}
