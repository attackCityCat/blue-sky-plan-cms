package org.bs.cms.pojo.Role;

public class RoleUse {

    private Integer id;

    private Integer roleid;

    private String roling;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRoleid() {
        return roleid;
    }

    public void setRoleid(Integer roleid) {
        this.roleid = roleid;
    }

    public String getRoling() {
        return roling;
    }

    public void setRoling(String roling) {
        this.roling = roling;
    }

    @Override
    public String toString() {
        return "RoleUse{" +
                "id=" + id +
                ", roleid=" + roleid +
                ", roling='" + roling + '\'' +
                '}';
    }
}
