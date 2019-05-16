package org.bs.cms.cmsuserconsumer.Controller.user;

import org.bs.cms.cmsuserconsumer.Service.user.UserService;
import org.bs.cms.model.User.UserBean;
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
        try {
            userService.save(userBean);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
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
