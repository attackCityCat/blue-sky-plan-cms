package org.bs.cms.cmsuserconsumer.Service.tree;

import org.bs.cms.pojo.Tree.TreeBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(value = "cms-user-provider")
public interface TreeService {


    @RequestMapping(value="/findTree/{userid}",method= RequestMethod.GET)
    List<TreeBean> findTreeList(@RequestParam(value="userid")String userid);
}
