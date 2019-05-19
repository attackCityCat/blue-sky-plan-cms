package org.bs.cms.mapper.Company;

import org.apache.ibatis.annotations.Select;
import org.bs.cms.pojo.Company.Company;

import java.util.List;

public interface CompanyMapper {

    @Select("select companyid,companyname from cms_company")
    List<Company> getcompanyname();
}
