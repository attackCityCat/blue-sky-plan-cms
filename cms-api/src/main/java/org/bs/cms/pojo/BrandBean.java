package org.bs.cms.pojo;

import java.io.Serializable;

public class BrandBean implements Serializable {
    private static final long serialVersionUID = -6281765248315540987L;

    private Integer id;

    private String brand_name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand_name() {
        return brand_name;
    }

    public void setBrand_name(String brand_name) {
        this.brand_name = brand_name;
    }
}
