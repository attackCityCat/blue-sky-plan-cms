package org.bs.cms.mapper.ShopManagement;

import org.apache.ibatis.annotations.Update;

public interface ShopManagementMapper {
    @Update("<script>  " +
            "UPDATE  " +
            "cms_product  " +
            "SET " +
            "product_state = 0 " +
            "WHERE " +
            "id IN <foreach open='(' close=')' collection = 'array' item = 'ids' separator = ',' > #{ids} " +
            "</foreach>" +
            "</script>")
    void editAdmShop(Integer[] ids);


    @Update("<script>  " +
            "UPDATE  " +
            "商户商品管理表  " +
            "SET " +
            "STATUS = 0 " +
            "WHERE " +
            "id IN <foreach open='(' close=')' collection = 'array' item = 'ids' separator = ',' > #{ids} " +
            "</foreach>" +
            "</script>")
    void editMerchantShop(Integer[] ids);
}
