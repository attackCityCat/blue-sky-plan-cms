package org.bs.cms.controller.login;

import org.bs.cms.mapper.login.LoginMapper;
import org.bs.cms.pojo.User.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    private LoginMapper loginMapper;

    @GetMapping("findUserInfoByName")
    public UserBean findUserInfoByName(@RequestParam(value="username") String username) {
        return loginMapper.findUserInfoByName(username);
    }

}
