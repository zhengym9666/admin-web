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
    //�����û�id��ѯ�û�
    public User queryUser();
}