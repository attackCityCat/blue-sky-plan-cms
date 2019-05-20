package org.bs.cms.mapper.ShopManagement;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.bs.cms.pojo.ProductBean;

import java.util.List;

public interface ShopManagementMapper {
    @Update("UPDATE cms_product SET product_audit = 0 WHERE product_id = #{value}")
    void editAdmShop(int id);



    @Select("select  " +
            "tpt.product_id as id, " +
            "tpt.product_title as productTitle , " +
            "tpt.product_price as productPrice , " +
            "tpt.product_stock as productStock , " +
            "tpt.product_time as productTime , " +
            "tpt.product_sales as productSales , " +
            "tpt.product_comments as productComments , " +
            "tpt.product_concern as productConcern , " +
            "tpt.product_state as productstate , " +
            "tpt.product_audit as productAudit, " +
            "tpt.product_selling as productSelling, " +
            "tbt.brand_name as brandName, " +
            "tst.size_name as sizeName, " +
            "tc.color_name as colorName, " +
            " CONCAT(btype.type_name,'--',stype.type_name) as typeName " +
            " from cms_product tpt  " +
            "left join cms_brand tbt on tpt.brand_id = tbt.id " +
            "left join cms_size tst on tpt.size_id = tst.id " +
            "left join cms_type stype on tpt.type_id = stype.id " +
            "left join cms_type btype on stype.pid = btype.id " +
            "left join cms_product_color tc on tpt.color_id = tc.id where  tpt.product_audit = 1")
    List<ProductBean> findProductList();

    @Update("<script>"+
            "  	update   cms_product set product_audit = 0 where product_id in ( " +
            "		<foreach collection='array' index='index' item='item' separator=','> " +
            "			#{item} " +
            "		</foreach> " +
            ")</script>")
    void delProduct(Integer[] arr);
}
