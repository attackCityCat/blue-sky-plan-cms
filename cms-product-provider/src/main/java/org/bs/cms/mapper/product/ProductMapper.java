package org.bs.cms.mapper.product;

import org.apache.ibatis.annotations.Select;
import org.bs.cms.pojo.ProductBean;

import java.util.List;

public interface ProductMapper {

    @Select("select  " +
            "tpt.product_id, " +
            "tpt.product_title as productTitle, " +
            "tpt.product_price as productPrice, " +
            "tpt.product_stock as productStock, " +
            "tpt.product_time as productTime, " +
            "tpt.product_sales as productSales, " +
            "tpt.product_comments as productComments, " +
            "tpt.product_concern as productConcern, " +
            "tpt.product_state as productState, " +
            "tbt.brand_name as brandName, " +
            "tst.size_name as sizeName, " +
            "CONCAT(btype.type_name,'--',stype.type_name) as typeName " +
            " from t_product_test tpt  " +
            "left join t_brand_test tbt on tpt.brand_id = tbt.id " +
            "left join t_size_test tst on tpt.size_id = tst.id " +
            "left join t_type_test stype on tpt.type_id = stype.id " +
            "left join t_type_test btype on stype.pid = btype.id")
    List<ProductBean> findProductList(ProductBean productBean);
}
