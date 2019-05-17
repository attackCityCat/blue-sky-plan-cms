package org.bs.cms.cmsuserconsumer.Controller.login;

import org.bs.cms.cmsuserconsumer.Service.login.LoginService;
import org.bs.cms.pojo.User.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.security.auth.Subject;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public HashMap<String, Object> login(String checkcode, UserBean userBean, HttpServletRequest request){

        //获取session
        HttpSession session = request.getSession();


        HashMap<String, Object> map = new HashMap<String, Object>();

        //验证用户名是否为空

        if (userBean.getUseraccount() == null || "".equals(userBean.getUseraccount())) {
            map.put("code", 3);
            map.put("message", "用户名不能为空！");
            return map;
        }

        //验证用户是否存在
        UserBean user2 = loginService.findUserInfoByName(userBean.getUseraccount());

        if (user2 == null) {
            map.put("code", 4);
            map.put("message", "用户名不存在！");
            return map;
        }

        //验证密码是否为空
        if (userBean.getUserpassword() == null || "".equals(userBean.getUserpassword())) {
            map.put("code", 5);
            map.put("message", "密码不能为空！");
            return map;
        }

        //验证密码是否正确

        String password = userBean.getUserpassword();
        String password2 = user2.getUserpassword();
        if (!password.equals(password2)) {
            map.put("code", 6);
            map.put("message", "密码错误！");
            return map;
        }


        session.setAttribute(session.getId(), user2);

        map.put("code", 0);
        map.put("message", "登陆成功！");


        return map;

    }






}
