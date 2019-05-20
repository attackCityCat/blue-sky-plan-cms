package org.bs.cms.cmsuserconsumer.Controller.login;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.bs.cms.cmsuserconsumer.Service.login.LoginService;
import org.bs.cms.pojo.User.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public HashMap<String, Object> login( UserBean userBean, HttpServletRequest request){

        //获取session
        HttpSession session = request.getSession();


        HashMap<String, Object> map = new HashMap<String, Object>();

        UsernamePasswordToken token = new UsernamePasswordToken(userBean.getUseraccount(), userBean.getUserpassword());
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);
            UserBean userInfo = (UserBean) subject.getPrincipal();
            session.setAttribute(session.getId(), userInfo);
            map.put("code", 0);
            map.put("message", "登陆成功！");

        } catch (UnknownAccountException e) {
            e.printStackTrace();
            map.put("code", 2);
            map.put("message", "用户名不存在！");
            return map;
        } catch (IncorrectCredentialsException e){
            e.printStackTrace();
            map.put("code", 3);
            map.put("message", "密码错误！");
            return map;
        }
        return map;
    }






}
