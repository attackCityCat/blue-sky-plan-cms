package org.bs.cms.cmsuserconsumer.Service.company;

import org.bs.cms.pojo.Company.Company;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(value = "cms-user-provider")
public interface CompanyService {

    @RequestMapping(value="/company/getcompanyname",method= RequestMethod.GET)
    List<Company> getcompanyname();
}
