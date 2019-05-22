package org.bs.cms.mapper.product;

import org.apache.ibatis.annotations.*;
import org.bs.cms.pojo.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ProductMapper {

    @Select("select  " +
            "tpt.product_id as id, " +
            "tpt.product_title as productTitle , " +
            "tpt.product_price as productPrice , " +
            "tpt.product_stock as productStock , " +
            "tpt.product_time as productTime , " +
            "tpt.product_sales as productSales , " +
            "tpt.product_comments as productComments , " +
            "tpt.product_concern as productConcern , " +
            "tpt.product_state as productState , " +
            "tpt.product_audit as productAudit, " +
            "tpt.product_selling as productSelling, " +
            "tpt.shelf_time as shelfTime, " +
            "tbt.brand_name as brandName, " +
            "tst.size_name as sizeName, " +
            "tc.color_name as colorName, " +
            " CONCAT(btype.type_name,'--',stype.type_name) as typeName " +
            " from cms_product tpt  " +
            "left join cms_brand tbt on tpt.brand_id = tbt.id " +
            "left join cms_size tst on tpt.size_id = tst.id " +
            "left join cms_type stype on tpt.type_id = stype.id " +
            "left join cms_type btype on stype.pid = btype.id " +
            "left join cms_product_color tc on tpt.color_id = tc.id ")
    List<ProductBean> findProductList();

    @Select("select * from cms_brand")
    List<BrandBean> findBrand();
    @Select("select * from cms_product_color")
    List<ColorBean> findColor();
    @Select("select * from cms_size")
    List<SizeBean> findSize();
    @Select("select * from cms_type where pid = #{value}")
    List<TypeBean> findType(@RequestParam("pid") Integer pid);

    void saveProduct(@RequestBody ProductBean productBean);

    @Delete("<script>"+
            "  	delete from cms_product where product_id in ( " +
            "		<foreach collection='array' index='index' item='item' separator=','> " +
            "			#{item} " +
            "		</foreach> " +
            ")</script>")
    Boolean delProduct(Integer[] ids);

    @Update("update cms_product set product_stock = product_stock + #{num} where product_id = #{id}")
    void editProduct(@Param("id") Integer id,@Param("num") Integer num);

    @Update("update cms_product set product_state = 0 , Shelf_time = sysdate() where product_id = #{value}")
    void updateStateUp(Integer id);

    @Update("update cms_product set product_state = 1 where product_id = #{value}")
    void updateStateDowe(Integer id);

    @Update("update cms_product set product_selling = 0 where product_id = #{value}")
    void editSellingUp(Integer id);

    @Update("update cms_product set product_selling = 1 where product_id = #{value}")
    void editSellingDown(Integer id);

    @Insert("insert into cms_product_img (url,product_id) values(#{url},#{productId})")
    void addProductImgInfo(ProductImgBean imgBean);



    @Select("select cb.brand_name as brandName,product_sales as productSales from cms_product cp \n" +
            "    left join cms_brand cb on cp.brand_id = cb.id ")
    List<ProductBean> getSales();


    @Update("update cms_product set product_price = #{num} where product_id = #{id}")
    void editPrice(Integer id, Integer num);

    @Update("<script> " +
            "            update  cms_product set product_state = 0 where product_id in (  " +
            "            <foreach collection='array' index='index' item='item' separator=','>  " +
            "            #{item}  " +
            "            </foreach>  " +
            "            )</script>")
    Boolean editStateOne(@RequestParam("ids") Integer[] ids);

    @Update("<script> " +
            "            update  cms_product set product_state = 1 where product_id in (  " +
            "            <foreach collection='array' index='index' item='item' separator=','>  " +
            "            #{item}  " +
            "            </foreach>  " +
            "            )</script>")
    void editStateTwo(@RequestParam("ids") Integer[] ids);
}
