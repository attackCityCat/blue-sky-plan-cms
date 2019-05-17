package org.bs.cms.pojo;

import java.io.Serializable;

public class SizeBean implements Serializable {
    private static final long serialVersionUID = -418077265756581798L;

    private Integer id;

    private String size_name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSize_name() {
        return size_name;
    }

    public void setSize_name(String size_name) {
        this.size_name = size_name;
    }
}
