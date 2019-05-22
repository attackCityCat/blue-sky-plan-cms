package org.bs.cms.controller.Role;

import org.bs.cms.mapper.Role.RoleMapper;
import org.bs.cms.pojo.Role.RoleBean;
import org.bs.cms.pojo.Role.RoleUse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    @Autowired
    private RoleMapper roleMapper;

    @GetMapping(value = "/role/getroleinfo")
    public List<RoleBean> queryRole(){
        return roleMapper.queryRole();
    }


    @PostMapping(value = "/role/editUser")
    public Boolean editUser(@RequestParam(value = "userid") Integer userid,@RequestParam(value = "roleid") Integer roleid){
        try{
            roleMapper.editUser(userid,roleid);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping(value = "/role/getroleinfoByRoleid")
    public List<RoleUse> queryRoleById(@RequestParam(value = "roleid") Integer roleid){
        return roleMapper.queryRoleById(roleid);
    }
}
