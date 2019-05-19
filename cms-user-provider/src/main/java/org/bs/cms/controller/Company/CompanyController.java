package org.bs.cms.controller.Company;

import org.bs.cms.mapper.Company.CompanyMapper;
import org.bs.cms.pojo.Company.Company;
import org.bs.cms.pojo.Role.RoleBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompanyController {

    @Autowired
    private CompanyMapper companyMapper;

    @RequestMapping(value="/company/getcompanyname",method= RequestMethod.GET)
    public List<Company> getcompanyname() {
        return companyMapper.getcompanyname();
    }
}
