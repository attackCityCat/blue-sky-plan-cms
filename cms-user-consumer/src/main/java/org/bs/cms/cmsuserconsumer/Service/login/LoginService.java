package org.bs.cms.cmsuserconsumer.Service.login;

import org.bs.cms.pojo.User.UserBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "cms-user-provider")
public interface LoginService {


    @GetMapping("findUserInfoByName")
    UserBean findUserInfoByName(@RequestParam(value="username") String username);
}
