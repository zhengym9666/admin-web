package com.admin.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * @ClassName:
 * @Description: 公共基类，方便调试
 * @author linyb3
 * @date
 */

public abstract class AbsServiceImpl<T> {
    @Autowired
    T mapper;

    public T getMapper() {
        return mapper;
    }

    public void setMapper(T mapper) {
        this.mapper = mapper;
    }
}
