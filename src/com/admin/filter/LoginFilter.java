package com.admin.filter;

import com.admin.bean.Student;
import com.admin.service.interfaces.IStudentService;
import com.sun.corba.se.impl.oa.toa.TOA;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.joda.time.ReadablePartial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.net.URLDecoder;

/**
 * @ClassName:
 * @Description: 登录拦截器
 * @author linyb3
 * @date
 *
 */
@Controller
public class LoginFilter implements HandlerInterceptor {
    private static transient Log log = LogFactory.getLog(LoginFilter.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        boolean flag=false;
        // 判断cookie是否有username，如果有代表登陆过
        /*Cookie[] cookies = request.getCookies();
        String studentId="";
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                //System.out.println(URLDecoder.decode(cookie.getName(), "utf-8"));
                if (cookie.getName().equals("studentId")) { // 表明已经登陆过了，就直接跳转了
                    // 更新cookie的时间
                    cookie.setMaxAge(60*5*12); //会话时间一个小时
                    response.addCookie(cookie);
                    studentId = cookie.getValue();
                    flag=true;
                }
            }
        }*/


        String stuNum = (String) request.getSession().getAttribute("stuNum");
        String adminName = (String) request.getSession().getAttribute("adminName");
        String getServletPath =request.getServletPath();;
        if(getServletPath.contains("admin/GetAllCollegeInfo.action") || getServletPath.contains("admin/queryAllClub.action")
                || getServletPath.contains("admin/loginAction.action") || getServletPath.contains("admin/SuperLoginAction.action") || getServletPath.contains("admin/login2Action.action") || getServletPath.contains("admin/SuperLogin2Action.action")){
            return true;
        }
        //超级管理员和管理员是并行关系，若是超级管理员登录请求的是queryAllCollege.action判断admin，若是管理员登录判断stuNum
        if(getServletPath.contains("queryAllCollege.action")){
        	if(adminName!=null && adminName.length()>0){
        		 //已经登录不做处理
            	return true;
            }
        }else if(stuNum!=null && stuNum.length()>0){
        	 //已经登录不做处理
            return true;
        }
/*        else if(adminName!=null && adminName.length()>0){
        	return true;
        }*/
            //跳转到登录页面
            //response.sendRedirect("http://www.baidu.com");
//            response.sendRedirect(request.getContextPath()+"/login.jsp");
            requestDirect(request,response);
            return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

    public void requestDirect(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //获取当前请求的路径
        String basePath = request.getScheme() + "://" + request.getServerName() + ":"  + request.getServerPort()+request.getContextPath();
        //如果request.getHeader("X-Requested-With") 返回的是"XMLHttpRequest"说明就是ajax请求
        if("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))){
            //前端需要判断是否是重定向
            response.setHeader("REDIRECT", "REDIRECT");
            //需要重定向的路径
            System.out.println(request.getContextPath());
            response.setHeader("CONTENTPATH", request.getContextPath()+"/login.jsp");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }else{
            response.sendRedirect(request.getContextPath()+"/login.jsp");
        }
    }
}
