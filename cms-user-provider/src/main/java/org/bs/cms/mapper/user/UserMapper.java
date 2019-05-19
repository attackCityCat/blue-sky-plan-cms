package org.bs.cms.mapper.user;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.bs.cms.pojo.User.UserBean;

import java.util.List;

public interface UserMapper {

    @Select("select user_id as userid,useraccount,username,userpassword,telephonenum,status from cms_user where user_id = #{value}")
    UserBean queryById(Integer userid);

    @Update("update cms_user set userpassword = #{userpassword},status=#{status},username = #{username},telephonenum=#{telephonenum}")
    void edit(UserBean userBean);

    @Select("select u.user_id as userid,u.username,u.userpassword,u.useraccount,u.status,u.roleid,r.rolename,u.companyid,m.companyname,u.telephonenum,u.modifer from cms_user u left join cms_role r on u.roleid = r.roleid left join cms_company m on u.companyid = m.companyid")
    List<UserBean> queryAll();

    @Insert("insert into cms_user(username,useraccount,userpassword,status,roleid,telephonenum,companyid,modifer)values(#{username},#{useraccount},#{userpassword},0,#{roleid},#{telephonenum},#{companyid},'张三')")
    void save(UserBean userBean);

    @Delete("delete from cms_user where user_id = #{value}")
    void delete(Integer cid);
}
