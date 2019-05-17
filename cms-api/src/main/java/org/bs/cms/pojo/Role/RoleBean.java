package org.bs.cms.pojo.Role;

import java.io.Serializable;

public class RoleBean implements Serializable {

    private static final long serialVersionUID = -8140660931389397428L;
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
