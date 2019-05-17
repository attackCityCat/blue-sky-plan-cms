package org.bs.cms.cmsuserconsumer.Controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class Page {

    @RequestMapping("toMain")
    public String toMain(){
        return "view/main";
    }

    @RequestMapping("toLogin")
    public String toLogin(){
        return "view/login";
    }

    @RequestMapping("logout")
    public String logout(){
        return "view/login";
    }

    @RequestMapping("toUser")
    public  String toUser(){
        return "view/user";
    }

}
