package org.bs.cms.pojo.Role;

public class RoleBean {

    private Integer roleid;

    private String rolename;

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

    @Override
    public String toString() {
        return "RoleBean{" +
                "roleid=" + roleid +
                ", rolename='" + rolename + '\'' +
                '}';
    }
}
