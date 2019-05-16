package org.bs.cms.mapper.user;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.bs.cms.model.User.UserBean;

import java.util.List;

public interface UserMapper {

    @Select("select user_id as userid,useraccount,username,userpassword,status from cms_user where user_id = #{value}")
    UserBean queryById(Integer userid);

    @Update("update cms_user set userpassword = #{userpassword},status=#{status},username = #{username}")
    void edit(UserBean userBean);

    @Select("select u.user_id as id,u.username,u.userpassword,u.useraccount,u.status,r.rolename from cms_user u left join cms_role r on u.roleid = r.roleid")
    List<UserBean> queryAll();

    @Insert("insert into cms_user(username,useraccount,userpassword,status,roleid)values(#{username},#{useraccount},#{userpassword},0,#{roleid})")
    void save(UserBean userBean);

    @Delete("delete from cms_user where user_id = #{value}")
    void delete(Integer cid);
}
