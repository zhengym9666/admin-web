package com.admin.service.impl;

import com.admin.bean.User;
import com.admin.dao.UserDAO;
import com.admin.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 */

@Service("userService")
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserDAO userMapper;

    @Override
    public User queryUser() {
        return userMapper.queryUser();
    }

    public static void main(String[] args) {
        User user = new UserServiceImpl().queryUser();
        System.out.println(user);
    }
}
