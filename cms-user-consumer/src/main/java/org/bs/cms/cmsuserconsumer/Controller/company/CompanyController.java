package org.bs.cms.cmsuserconsumer.Controller.company;

import org.bs.cms.cmsuserconsumer.Service.company.CompanyService;
import org.bs.cms.pojo.Company.Company;
import org.bs.cms.pojo.Role.RoleBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping(value = "/company/getcompanyname")
    public List<Company> getcompanyname(){

        return companyService.getcompanyname();
    }


}
