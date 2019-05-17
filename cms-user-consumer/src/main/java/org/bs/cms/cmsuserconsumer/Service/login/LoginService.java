package org.bs.cms.cmsuserconsumer.Service.login;

import org.bs.cms.pojo.User.UserBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "cms-user-provider")
public interface LoginService {


    @RequestMapping(value="/login/{useraccount}",method= RequestMethod.GET)
    UserBean findUserInfoByName(@RequestParam(value="useraccount") String useraccount);
}
