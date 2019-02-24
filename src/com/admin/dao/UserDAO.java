package com.admin.dao;

import com.admin.bean.User;
import org.apache.ibatis.annotations.Param;

/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 */

public interface UserDAO {
    //根据用户id查询用户
    public User queryUser();
}