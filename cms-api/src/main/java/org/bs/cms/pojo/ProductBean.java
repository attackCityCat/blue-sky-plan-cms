package org.bs.cms.pojo;

import java.io.Serializable;
import java.util.Date;

public class ProductBean implements Serializable {
    private static final long serialVersionUID = -3983918599268670964L;

    private Integer id;  // 主键ID

    private String productTitle; // 商品标题

    private double productPrice; // 商品价格

    private  Integer productStock; // 商品库存

    private String productTime;  // 添加商品时间

    private String shelfTime;  // 商品上架时间

    private Integer productState;  // 是否上下架  0 为上架  1为下架  默认为0

    private Integer productSales;  // 销量

    private Integer productComments; // 累计评论

    private Integer productConcern;  // 累计关注

    private Integer brandId;   // 品牌ID  外键

    private String brandName; // 品牌名称

    private String brandLogo;  // 品牌Logo  临时字段

    private String url; // 商品图片  临时字段

    private Integer typeId;  // 类型外键  ID

    private String typeName;  // 类型名称

    private String stypeName; // 类型小类

    private String btypeName; // 类型大类

    private Integer productAudit; // 审核状态  0 为审核 1为未审核  默认为1

    private Integer productSelling;  //热卖设置   0为热卖  1为未热卖 默认为1

    public String getBrandLogo() {
        return brandLogo;
    }

    public void setBrandLogo(String brandLogo) {
        this.brandLogo = brandLogo;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getProductSelling() {
        return productSelling;
    }

    public void setProductSelling(Integer productSelling) {
        this.productSelling = productSelling;
    }

    public Integer getProductAudit() {
        return productAudit;
    }

    public void setProductAudit(Integer productAudit) {
        this.productAudit = productAudit;
    }

    public String getShelfTime() {
        return shelfTime;
    }

    public void setShelfTime(String shelfTime) {
        this.shelfTime = shelfTime;
    }

    public String getStypeName() {
        return stypeName;
    }

    public void setStypeName(String stypeName) {
        this.stypeName = stypeName;
    }

    public String getBtypeName() {
        return btypeName;
    }

    public void setBtypeName(String btypeName) {
        this.btypeName = btypeName;
    }

    private Integer sizeId;  // 尺寸大小ID

    private String sizeName;  // 尺寸名称

    private Integer colorId; // 商品外键ID

    private String colorName; // 商品颜色

    private String headImg;  // 商品logo

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Integer getSizeId() {
        return sizeId;
    }

    public void setSizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }

    public String getSizeName() {
        return sizeName;
    }

    public void setSizeName(String sizeName) {
        this.sizeName = sizeName;
    }

    public Integer getColorId() {
        return colorId;
    }

    public void setColorId(Integer colorId) {
        this.colorId = colorId;
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
