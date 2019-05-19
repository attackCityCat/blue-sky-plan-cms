package org.bs.cms.pojo.User;

import java.io.Serializable;

public class UserBean implements Serializable {

    private static final long serialVersionUID = -7387863058509882609L;
    private Integer userid;

    private String username;

    private String useraccount;

    private String userpassword;

    private Integer status;

    private Integer roleid;

    private String rolename;

    private String telephonenum;

    private String companyid;

    private String companyname;

    private String modifer;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUseraccount() {
        return useraccount;
    }

    public void setUseraccount(String useraccount) {
        this.useraccount = useraccount;
    }

    public String getUserpassword() {
        return userpassword;
    }

    public void setUserpassword(String userpassword) {
        this.userpassword = userpassword;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getRoleid() {
        return roleid;
    }

    public void setRoleid(Integer roleid) {
        this.roleid = roleid;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public String getTelephonenum() {
        return telephonenum;
    }

    public void setTelephonenum(String telephonenum) {
        this.telephonenum = telephonenum;
    }

    public String getCompanyid() {
        return companyid;
    }

    public void setCompanyid(String companyid) {
        this.companyid = companyid;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public String getModifer() {
        return modifer;
    }

    public void setModifer(String modifer) {
        this.modifer = modifer;
    }

    @Override
    public String toString() {
        return "UserBean{" +
                "userid=" + userid +
                ", username='" + username + '\'' +
                ", useraccount='" + useraccount + '\'' +
                ", userpassword='" + userpassword + '\'' +
                ", status=" + status +
                ", roleid=" + roleid +
                ", rolename='" + rolename + '\'' +
                ", telephonenum='" + telephonenum + '\'' +
                ", companyid='" + companyid + '\'' +
                ", companyname='" + companyname + '\'' +
                ", modifer='" + modifer + '\'' +
                '}';
    }
}
