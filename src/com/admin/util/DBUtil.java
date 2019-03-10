package com.admin.util;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年2月25日 上午11:50:03
* @version 1.0 
* @desrciption		
*/
public class DBUtil {
	
	// 定义数据库连接参数
	     public static final String DRIVER_CLASS_NAME = "com.mysql.jdbc.Driver";
	     public static final String URL = "jdbc:mysql://localhost:3306/community";
	     public static final String USERNAME = "root";
	     public static final String PASSWORD = "root";
	 
	     // 注册数据库驱动
	     static {
	         try {
	             Class.forName(DRIVER_CLASS_NAME);
	         } catch (ClassNotFoundException e) {
	             System.out.println("注册失败！");
	             e.printStackTrace();
	         }
	     }
	 
	     // 获取连接
	     public static Connection getConn() throws SQLException {
	         return (Connection) DriverManager.getConnection(URL, USERNAME, PASSWORD);
	    }
	
	     // 关闭连接
	     public static void closeConn(Connection conn) {
	         if (null != conn) {
	             try {
	                 conn.close();
	             } catch (SQLException e) {
	                 System.out.println("关闭连接失败！");
	                 e.printStackTrace();
	            }
	         }
	    }
	     //测试
	    public static void main(String[] args) throws SQLException {
	         System.out.println(DBUtil.getConn());
	     }
	 
	
	
}
