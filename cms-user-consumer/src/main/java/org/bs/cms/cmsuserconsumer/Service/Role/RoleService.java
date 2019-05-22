package org.bs.cms.cmsuserconsumer.Service.Role;

import org.bs.cms.pojo.Role.RoleBean;
import org.bs.cms.pojo.Role.RoleUse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@FeignClient(value = "cms-user-provider")
public interface RoleService {

    @RequestMapping(value="/role/getroleinfo",method= RequestMethod.GET)
    List<RoleBean> queryRole();

    @RequestMapping(value="/role/editUser",method= RequestMethod.POST)
    Boolean editUser(@RequestParam(value = "userid") Integer userid,@RequestParam(value = "roleid") Integer roleid);

    @RequestMapping(value="/role/getroleinfoByRoleid",method= RequestMethod.GET)
    List<RoleUse> queryRoleById(@RequestParam(value = "roleid") Integer roleid);
}
