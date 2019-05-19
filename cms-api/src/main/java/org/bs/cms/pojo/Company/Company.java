package org.bs.cms.pojo.Company;

import java.io.Serializable;

public class Company implements Serializable {
    private static final long serialVersionUID = 893766322845659103L;

    private Integer companyid;

    private String companyname;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getCompanyid() {
        return companyid;
    }

    public void setCompanyid(Integer companyid) {
        this.companyid = companyid;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    @Override
    public String toString() {
        return "company{" +
                "companyid=" + companyid +
                ", companyname='" + companyname + '\'' +
                '}';
    }
}
