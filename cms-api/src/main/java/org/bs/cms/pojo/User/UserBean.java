package org.bs.cms.pojo.User;

public class UserBean {

    private Integer userid;

    private String username;

    private String useraccount;

    private String userpassword;

    private Integer status;

    private Integer roleid;

    private String rolename;

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
                '}';
    }
}
