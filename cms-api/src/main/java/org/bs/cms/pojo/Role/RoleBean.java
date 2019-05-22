package org.bs.cms.pojo.Role;

import java.io.Serializable;

public class RoleBean implements Serializable {

    private static final long serialVersionUID = -8140660931389397428L;
    private Integer roleid;

    private String rolename;

    private Integer status;

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

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "RoleBean{" +
                "roleid=" + roleid +
                ", rolename='" + rolename + '\'' +
                ", status=" + status +
                '}';
    }
}
