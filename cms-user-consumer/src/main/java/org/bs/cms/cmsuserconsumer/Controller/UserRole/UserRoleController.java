package org.bs.cms.cmsuserconsumer.Controller.UserRole;

import org.bs.cms.cmsuserconsumer.Service.UserRole.UserRoleService;
import org.bs.cms.pojo.Role.RoleBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserRoleController {

    @Autowired
    private UserRoleService userRoleService;


    @GetMapping(value = "/role/getrolename")
    public List<RoleBean> getrolename(){

        return userRoleService.getrolename();
    }

}
