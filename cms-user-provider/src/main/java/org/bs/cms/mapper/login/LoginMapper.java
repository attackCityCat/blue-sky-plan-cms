package org.bs.cms.mapper.login;

import org.apache.ibatis.annotations.Select;
import org.bs.cms.pojo.User.UserBean;

public interface LoginMapper {

    @Select("select * from cms_user where useraccount = #{value}")
    UserBean findUserInfoByName(String useraccount);
}
