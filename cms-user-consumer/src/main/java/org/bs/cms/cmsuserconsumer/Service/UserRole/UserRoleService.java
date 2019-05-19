package org.bs.cms.cmsuserconsumer.Service.UserRole;

import org.bs.cms.pojo.Role.RoleBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(value = "cms-user-provider")
public interface UserRoleService {

    @RequestMapping(value="/role/getrolename",method= RequestMethod.GET)
    List<RoleBean> getrolename();
}
