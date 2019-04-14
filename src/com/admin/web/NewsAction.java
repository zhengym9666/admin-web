package com.admin.web;

import com.admin.bean.Club;
import com.admin.bean.College;
import com.admin.bean.News;
import com.admin.bean.UserGroupData;
import com.admin.service.interfaces.IClubService;
import com.admin.service.interfaces.ICollegeService;
import com.admin.service.interfaces.INewsService;
import com.admin.util.PageBean;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;


@Controller
@RequestMapping("/news")
public class NewsAction {
	@Autowired
	private INewsService newsService;
	@Autowired
	private ICollegeService collegeService;
	@Autowired
	private IClubService clubService;

	@RequestMapping("/newscontent.action")
	public String NewsContentView(HttpServletRequest request){

		request.setAttribute("id", request.getParameter("id"));	
		request.setAttribute("head", request.getParameter("head"));
		request.setAttribute("collegeId", request.getParameter("collegeId"));
		request.setAttribute("title", request.getParameter("title"));
		request.setAttribute("content",request.getParameter("content"));
		
//		社团id
		String name = (String) request.getAttribute("id");
		String head = (String) request.getAttribute("head");
//		学院id
		String collegeId = (String) request.getAttribute("collegeId");
//		标题
		String title = (String) request.getAttribute("title");
//		内容
		String content = (String) request.getAttribute("content");
			
		System.out.println("head:"+head+"id:"+name+"collegeId:"+collegeId+"title:"+title+"content:"+content);
		return "forward:/front/news/newscontent.jsp";
	}

	/*@RequestMapping(value = "/{newsId}", method = RequestMethod.GET)
	public ResponseEntity<News> queryNewsById(@PathVariable("newsId")Integer newsId){
		//int id = Integer.parseInt(request.getParameter("id"));
		try {
			News news = newsService.queryNewsById(newsId);
			return ResponseEntity.ok(news);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//返回500
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}*/
	@RequestMapping(value = "/{newsId}", method = RequestMethod.GET)
	public ResponseEntity<Map> queryNewsById(@PathVariable("newsId")Integer newsId){
		//int id = Integer.parseInt(request.getParameter("id"));
        JSONObject returnJson = new JSONObject();
        News news=null;
		try {
			news = newsService.queryNewsById(newsId);
			if(news!=null){
                returnJson.put("status", 0);
                returnJson.put("news", news);
            }else{
                returnJson.put("status", 1);
            }
        } catch (Exception e) {
            returnJson.put("status", 1);
            returnJson.put("msg", e.getMessage());
        } finally {

        }
        return ResponseEntity.ok(returnJson);
	}

	@RequestMapping("queryNewsPage.action")
	public String queryNewsPage(HttpServletRequest request){
		String collegeId = (String) request.getSession().getAttribute("collegeId");
		String clubId =  request.getParameter("clubId");
		String currentPage0 = request.getParameter("currentPage");
//		获取社团名称作为新闻头
		String clubName = request.getParameter("clubname");
		int currentPage;
		if(currentPage0==null || currentPage0.equals("")){
			currentPage = 1;
		}else{
			currentPage = Integer.parseInt(currentPage0);
		}
		int pageSize = 1;
		PageBean pageNews = newsService.queryPageNews(collegeId, clubId, currentPage, pageSize);
		
		request.setAttribute("pageNews", pageNews);
		request.setAttribute("collegeId", collegeId);
		request.setAttribute("clubId", clubId);
		request.setAttribute("clubName", clubName);
		System.out.println(pageNews);
		return "forward:/front/news/newscontent.jsp";
		
	}
    @RequestMapping("queryAllNewsInfo.action")
    public ResponseEntity<Map> queryAllNewsInfo(HttpServletRequest request){
        JSONObject returnJson = new JSONObject();
        List<News> news =new ArrayList<>();
        int count=0;
        try {
            //获取当前的社团ID
            String clubId = (String) request.getSession().getAttribute("clubId");
            //学院ID
            String collegeId = (String) request.getSession().getAttribute("collegeId");
            //测试代码
           /* clubId="1010100";
            collegeId="1010000";*/
            //=====测试代码

            String currentPage0 = request.getParameter("page");
            String limitStr = request.getParameter("limit");
            int currentPage;
            if(currentPage0==null || currentPage0.equals("")){
                currentPage = 1;
            }else{
                currentPage = Integer.parseInt(currentPage0);
            }
            int limit = 1;
            if(limitStr==null || limitStr.equals("")){
                currentPage = 1;
            }else{
                limit = Integer.parseInt(limitStr);
            }

            //获取筛选条件
            String author_par=request.getParameter("author_par");
            String title_par=request.getParameter("title_par");
            author_par=(author_par!=null && author_par.length()>0)?author_par:null;
            title_par=(title_par!=null && title_par.length()>0)?title_par:null;

            News newBycondition=new News();
            newBycondition.setAuthor(author_par);
            newBycondition.setTitle(title_par);
            newBycondition.setCollegeId(collegeId);
            newBycondition.setClubId(clubId);

            news = newsService.queryAllNewsInfo(newBycondition, currentPage,limit);
            for (News new1:news){
                if(new1.getCollegeId()!=null && new1.getCollegeId().length()>0){
                    College college = collegeService.queryCollegeById(new1.getCollegeId());
                    new1.setCollegeId(college.getAbbr());
                }
                if(new1.getClubId()!=null && new1.getClubId().length()>0){
                    Club club = clubService.queryUserGroup(new1.getClubId());
                    new1.setClubId(club.getClubName());
                }
            }
            count =newsService.queryTotalCountByCondition(newBycondition);

            returnJson.put("code", 0);
            returnJson.put("msg", "");
            returnJson.put("count", count);
            returnJson.put("data", news);
        } catch (Exception e) {
            returnJson.put("code", 1);
            returnJson.put("msg", e.getMessage());
        } finally {

        }

        return ResponseEntity.ok(returnJson);
    }

    /**
     * 保存新闻信息
     * @throws Exception
     */
    @RequestMapping(value = "/saveNews.action",method=RequestMethod.POST)
    public ResponseEntity<Map> saveNews(HttpServletRequest request){
        JSONObject returnJson = new JSONObject();
        int count=0;
        try {
            //获取当前的社团ID
            String clubId = (String) request.getSession().getAttribute("clubId");
            //学院ID
            String collegeId = (String) request.getSession().getAttribute("collegeId");
            //测试代码
            /*clubId="1010100";
            collegeId="1010000";*/
            //=====测试代码

            String author = request.getParameter("author");
            String title = request.getParameter("title");
            String content = request.getParameter("content");
            String newid = request.getParameter("id");
            if(newid!=null && newid.length()>0){
                News news = newsService.queryNewsById(Integer.parseInt(newid));
                if(news!=null){
                    news.setAuthor(author);
                    news.setTitle(title);
                    news.setContent(content);
                    news.setRevise_time(new Date());
                    newsService.updateNews(news);
                }
            }else{
                News news=new News();
                news.setAuthor(author);
                news.setTitle(title);
                news.setCollegeId(collegeId);
                news.setClubId(clubId);
                news.setSubmit_time(new Date());
                news.setContent(content);
                boolean isSave = newsService.saveNews(news);
            }
            returnJson.put("status", 0);
        } catch (Exception e) {
            returnJson.put("status", 1);
            returnJson.put("msg", e.getMessage());
        } finally {

        }

        return ResponseEntity.ok(returnJson);
    }

    /**
     * 删除指定ID的新闻信息
     * @throws Exception
     */
    @RequestMapping(value = "/delNewsById.action",method=RequestMethod.POST)
    public ResponseEntity<Map> delNewsById(HttpServletRequest request){
        JSONObject returnJson = new JSONObject();
        try {
            //获取新闻ID
            String id = request.getParameter("id");
            newsService.delNewsById(id);
            returnJson.put("status", 0);
        } catch (Exception e) {
            returnJson.put("status", 1);
            returnJson.put("msg", e.getMessage());
        } finally {

        }

        return ResponseEntity.ok(returnJson);
    }

}
