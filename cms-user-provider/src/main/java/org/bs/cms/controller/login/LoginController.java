package org.bs.cms.controller.login;

import org.bs.cms.mapper.login.LoginMapper;
import org.bs.cms.model.User.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    private LoginMapper loginMapper;

    @RequestMapping(value="/login/{useraccount}",method= RequestMethod.GET)
    public UserBean login(@RequestParam(value="useraccount")String useraccount) {
        //验证用户是否存在
        return loginMapper.findUserInfoByName(useraccount);
    }

}
