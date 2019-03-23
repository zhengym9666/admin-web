package com.admin.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.admin.bean.User;
import com.admin.service.interfaces.IUserService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 
 * @author zym
 *
 * 2019年2月22日
 */
@Controller
@RequestMapping("/test")
public class TestAction {
	
	@RequestMapping("/test.action")
	public JSONObject test(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		JSONObject jsonObject = new JSONObject();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("code", 0);
		resultMap.put("msg", "");
		resultMap.put("count",1000);

		//Map data = new HashMap<String,String>();
		List<User> data = new ArrayList<User>();
		User user = new User();
		user.setId(1);
		user.setName("");
		data.add(user);
		/*data.put("id", "1");
		data.put("num","123");*/
		JSONArray array = JSONArray.fromObject(data);
		
		resultMap.put("data", array);
		
		response.setCharacterEncoding("utf-8");
		PrintWriter writer = response.getWriter();
		try {
			writer.print(JSONObject.fromObject(resultMap));
			writer.flush();
			writer.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return jsonObject;
	}
	
	public void test2(){
		System.out.println("测试冲突213123213213");
		System.out.println("213");
		System.out.println("测试冲突");
	}
}
