package org.bs.cms.pojo;

import java.io.Serializable;
import java.util.Date;

public class ProductBean implements Serializable {
    private static final long serialVersionUID = -3983918599268670964L;

    private Integer product_id;  // 主键ID

    private String productTitle; // 商品标题

    private double productPrice; // 商品价格

    private  Integer productStock; // 商品库存

    private String productTime;  // 上架时间

    private Integer productState;  // 是否上下架  0 为上架  1为下架  默认为0

    private Integer productSales;  // 销量

    private Integer productComments; // 累计评论

    private Integer productConcern;  // 累计关注

    private Integer brand_id;   // 品牌ID  外键

    private String brandName; // 品牌名称

    private Integer type_id;  // 类型外键  ID

    private String typeName;  // 类型名称

    private Integer size_id;  // 尺寸大小ID

    private String sizeName;  // 尺寸名称

    private Integer color_id; // 商品外键ID

    private String colorName; // 商品颜色

    private String headImg;  // 商品logo

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public Integer getProductStock() {
        return productStock;
    }

    public void setProductStock(Integer productStock) {
        this.productStock = productStock;
    }

    public String getProductTime() {
        return productTime;
    }

    public void setProductTime(String productTime) {
        this.productTime = productTime;
    }

    public Integer getProductState() {
        return productState;
    }

    public void setProductState(Integer productState) {
        this.productState = productState;
    }

    public Integer getProductSales() {
        return productSales;
    }

    public void setProductSales(Integer productSales) {
        this.productSales = productSales;
    }

    public Integer getProductComments() {
        return productComments;
    }

    public void setProductComments(Integer productComments) {
        this.productComments = productComments;
    }

    public Integer getProductConcern() {
        return productConcern;
    }

    public void setProductConcern(Integer productConcern) {
        this.productConcern = productConcern;
    }

    public Integer getBrand_id() {
        return brand_id;
    }

    public void setBrand_id(Integer brand_id) {
        this.brand_id = brand_id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Integer getType_id() {
        return type_id;
    }

    public void setType_id(Integer type_id) {
        this.type_id = type_id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Integer getSize_id() {
        return size_id;
    }

    public void setSize_id(Integer size_id) {
        this.size_id = size_id;
    }

    public String getSizeName() {
        return sizeName;
    }

    public void setSizeName(String sizeName) {
        this.sizeName = sizeName;
    }

    public Integer getColor_id() {
        return color_id;
    }

    public void setColor_id(Integer color_id) {
        this.color_id = color_id;
    }

    public String getColorName() {
        return colorName;
    }

    public void setColorName(String colorName) {
        this.colorName = colorName;
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }
}
