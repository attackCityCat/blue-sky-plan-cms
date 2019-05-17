package org.bs.cms.pojo;

import java.io.Serializable;

public class TypeBean implements Serializable {
    private static final long serialVersionUID = -8472177352214828098L;

    private Integer id;

    private String  type_name;

    private Integer pid;

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType_name() {
        return type_name;
    }

    public void setType_name(String type_name) {
        this.type_name = type_name;
    }
}
