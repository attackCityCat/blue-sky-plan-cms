package org.bs.cms.mapper.Role;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.bs.cms.pojo.Role.RoleBean;
import org.bs.cms.pojo.Role.RoleUse;
import org.bs.cms.pojo.User.UserBean;

import java.util.List;

public interface RoleMapper {

    @Select("select * from cms_role")
    List<RoleBean> queryRole();

    @Update("update cms_user set roleid = #{roleid} where user_id = #{userid}")
    void editUser(Integer userid, Integer roleid);

    @Select("select * from cms_role_use where roleid = #{value}")
    List<RoleUse> queryRoleById(Integer roleid);

    @Select("select user_id as userid,username from cms_user where user_id != 1")
    List<UserBean> getUser();
}
