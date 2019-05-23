package org.bs.cms.cmsuserconsumer.config;


import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.bs.cms.cmsuserconsumer.Service.login.LoginService;
import org.bs.cms.cmsuserconsumer.Service.user.UserService;
import org.bs.cms.pojo.User.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashSet;

public class UserRealm extends AuthorizingRealm {

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserService userService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        System.out.println("执行授权逻辑");

        UserBean userBean = (UserBean) SecurityUtils.getSubject().getPrincipal();
        Integer userId = userBean.getUserid();
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();


        HashSet<String> roleSet = userService.findRoleSet(userId);
        //添加资源授权字符串  角色名
        info.setRoles(roleSet);

        return info;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {

        System.out.println("执行认证逻辑");

        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
        String username = token.getUsername();

        UserBean userBean = loginService.findUserInfoByName(username);

        if (userBean == null){
            return null;
        }

        return new SimpleAuthenticationInfo(userBean,userBean.getUserpassword(),this.getClass().getName());//放入shiro.调用CredentialsMatcher检验密码
    }

}
