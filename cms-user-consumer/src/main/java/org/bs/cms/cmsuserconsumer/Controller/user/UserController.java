package org.bs.cms.cmsuserconsumer.Controller.user;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.bs.cms.cmsuserconsumer.Service.user.UserService;
import org.bs.cms.pojo.User.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //系统管理员删除普通管理员
    @PostMapping(value = "/delete")
    public Boolean delete(@RequestParam Integer userid){
        try {
            if (userid == 1){
                return false;
            }else {
                userService.delete(userid);
                return true;
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }

    //系统管理员查看所有管理员列表
    @GetMapping(value = "/query")
    public List<UserBean> sayHellow(){

        return userService.findAll();
    }

    @PostMapping(value = "/save")
    public Boolean save(UserBean userBean){
        if(userBean.getUserid()!=null){
            String userpassword = userBean.getUserpassword();
            SimpleHash sh = new SimpleHash("md5", userpassword, userBean.getUseraccount(), 1);
            userBean.setUserpassword(sh.toHex());
            return userService.edit(userBean);
        }else{
            String userpassword = userBean.getUserpassword();
            SimpleHash sh = new SimpleHash("md5", userpassword, userBean.getUseraccount(), 1);
            userBean.setUserpassword(sh.toHex());
            return userService.save(userBean);
        }





    }

    //系统管理员修改普通管理员，回显
    @GetMapping(value = "/findById")
    public UserBean findById(@RequestParam Integer userid){
        System.out.println(userService.findById(userid));
        return userService.findById(userid);
    }

    //系统管理员修改普通管理员
    @PostMapping(value = "/edit")
    public Boolean update(UserBean userBean){
        try {
            if (userBean.getUserid()==1){
                return false;
            }else {
                userService.edit(userBean);
                return true;
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
