package com.admin.util;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.omg.CORBA.OBJ_ADAPTER;

import java.io.InputStream;
import java.lang.reflect.Method;
import java.lang.reflect.Type;

/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 */

public  class MybatisUtil {
    SqlSession sqlSession;
    public SqlSessionFactory initSqlSessionFactory() throws Exception{
        //  1.加载核心配置文件：sqlMapConfig.xml
        // 参数resource：指定核心配置文件的位置
        InputStream inputStream = Resources.getResourceAsStream("test/testSqlMapConfig.xml");
        // 2.读取配置文件内容
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        // sqlSessionFactory对象，是mybatis框架的核心对象，一个应用（项目）只需要一个
        SqlSessionFactory sqlSessionFactory = builder.build(inputStream);
        return sqlSessionFactory;
    }
    public <A> A getMapperObject(Class<A> mapperClazz) throws Exception {
        // 1.创建sqlSession对象
        sqlSession = initSqlSessionFactory().openSession();

        // 2.使用sqlSession对象，获取mapper接口代理对象
        //getMapper方法：获取mapper接口的代理对象
        // 参数：mapper接口的class
        A object = sqlSession.getMapper(mapperClazz);
        // 3.使用mapper代理对象，调用方法执行
        return  object;
    }


    public <T,A> T getMapperServiceImplObject(Class<A> mapperClazz,Class<T> serviceImplClazz) throws Exception {
        A mapperObject = getMapperObject(mapperClazz);
        T serviceImplObject = (T) serviceImplClazz.newInstance();
        //####执行泛型方法 方法一：获取子类的父类，执行父类的方法，实际执行子类的方法。
//        Class<? super T> superclass = serviceImplClazz.getSuperclass();
//        Method setMapperMethod = superclass.getDeclaredMethod("setMapper", Object.class);
        //####执行泛型方法 方法二：获取子类的父类的方法，直接调用子类的父类的方法。
            //查找方法参数，1：方法名  2：参数的对象，由于抽象类是泛型，所以只能用Object，最高对象，如果还是用泛型会查找失败，因为传到这里的时候已经是具体的类型了，所以查找不到
        Method setMapperMethod = serviceImplObject.getClass().getMethod("setMapper", Object.class);
        //执行方法必须全部都是实例化的对象，serviceImplObject 调用者对象，mapperObject dao层实体类
        setMapperMethod.invoke(serviceImplObject,mapperObject);
        return serviceImplObject;
    }

    public void commit(){
        //提交事物
        sqlSession.commit();
        //释放资源
        sqlSession.close();
    }

}
