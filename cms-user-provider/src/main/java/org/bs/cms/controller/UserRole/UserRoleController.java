package org.bs.cms.controller.UserRole;

import org.bs.cms.mapper.UserRole.UserRoleMapper;
import org.bs.cms.pojo.Role.RoleBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserRoleController {

    @Autowired
    private UserRoleMapper userRoleMapper;

    @RequestMapping(value="/role/getrolename",method= RequestMethod.GET)
    public List<RoleBean> getrolename() {
        return userRoleMapper.getrolename();
    }
}
