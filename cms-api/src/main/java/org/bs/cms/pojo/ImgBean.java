package org.bs.cms.pojo;

import java.io.Serializable;

public class ImgBean implements Serializable {
    private static final long serialVersionUID = 1574014281510084908L;
    private Integer id;

    private String url;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
