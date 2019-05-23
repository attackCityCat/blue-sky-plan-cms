package org.bs.cms.cmsuserconsumer.Controller.Role;

import org.bs.cms.cmsuserconsumer.Service.Role.RoleService;
import org.bs.cms.pojo.Role.RoleBean;
import org.bs.cms.pojo.Role.RoleUse;
import org.bs.cms.pojo.User.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping(value = "/role/getroleinfo")
    public List<RoleBean> queryRole(){
        return roleService.queryRole();
    }

    @PostMapping(value = "/role/editUser")
    public Boolean editUser(Integer userid,Integer roleid){
        try{
            roleService.editUser(userid,roleid);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping(value = "/role/getroleinfoByRoleid")
    public List<RoleUse> queryRoleById(Integer roleid){
        System.out.println(roleid);
        return roleService.queryRoleById(roleid);
    }

    @GetMapping(value = "role/getUser")
    public List<UserBean> getUser(){
        return roleService.getUser();
    }
}
