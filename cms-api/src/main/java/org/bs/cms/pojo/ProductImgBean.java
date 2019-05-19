package org.bs.cms.pojo;

import java.io.Serializable;

public class ProductImgBean implements Serializable {
    private static final long serialVersionUID = 6002152786038559811L;

    private Integer id;
    private String url;
    private Integer productId;

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

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }
}
