package org.bs.cms.cmsuserconsumer.Service.user;

import org.bs.cms.model.User.UserBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(value = "cms-user-provider")
public interface UserService {

    @RequestMapping(value="/findById/{userid}",method= RequestMethod.GET)
    public UserBean findById(@RequestParam(value="userid")Integer userid) ;

    @RequestMapping(value="/query",method=RequestMethod.GET)
    public List<UserBean> findAll();

    @RequestMapping(value="/edit",method=RequestMethod.POST)
    public Boolean edit(@RequestBody UserBean userBean);

    @RequestMapping(value="/save",method=RequestMethod.POST)
    public Boolean save(@RequestBody UserBean userBean) ;

    @RequestMapping(value="/delete/{userid}",method=RequestMethod.POST)
    public Boolean delete(@RequestParam(value="userid")Integer userid);
}
