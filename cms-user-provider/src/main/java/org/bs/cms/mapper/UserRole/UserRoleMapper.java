package org.bs.cms.mapper.UserRole;

import org.apache.ibatis.annotations.Select;
import org.bs.cms.pojo.Role.RoleBean;

import java.util.List;

public interface UserRoleMapper {

    @Select("select roleid,rolename from cms_role where roleid > 1")
    List<RoleBean> getrolename();
}
