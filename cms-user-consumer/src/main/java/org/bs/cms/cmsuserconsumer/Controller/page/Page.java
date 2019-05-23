package org.bs.cms.cmsuserconsumer.Controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @RequestMapping("toRole")
    public  String toRole(){
        return "view/Role2";
    }

    @RequestMapping("toAdv")
    public String toAdv(){
        return "view/Advertisement";
    }

    @RequestMapping("toAddUser")
    public String toAddUser(){
        return "view/AddUser";
    }

    @RequestMapping("toShopping")
    public String toShopping(){
        return "view/shopping";
    }

    @RequestMapping("toShopHelp")
    public String toShopHelp(){
        return "http://127.0.0.1:8184/js/shop/shop.js";
    }

    @RequestMapping("/page/toUpdate")
    public String toUpdate(){
        return "view/updateShopping";
    }

    @RequestMapping("/page/toNoState")
    public String toNoState(){
        return "view/NoState";
    }

    @RequestMapping("/page/toUpdateRole")
    public String toUpdateRole(){
        return "view/UpdateRole";
    }

    @RequestMapping("/page/toRoleUse")
    public String toRoleUse(){
        return "view/RoleUse";
    }

    @RequestMapping("/page/toRoleUse2")
    public String toRoleUse2(){
        return "view/RoleUse2";
    }

    @RequestMapping("toTalk")
    public String toTalk(){
        return "view/talk";
    }


}
