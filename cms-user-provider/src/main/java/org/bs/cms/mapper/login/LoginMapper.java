package org.bs.cms.mapper.login;

import org.apache.ibatis.annotations.Select;
import org.bs.cms.pojo.User.UserBean;
import org.springframework.stereotype.Component;

@Component
public interface LoginMapper {

    @Select("select * from cms_user where useraccount = #{value}")
    UserBean findUserInfoByName(String useraccount);
}
