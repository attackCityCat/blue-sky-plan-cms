package org.bs.cms.controller.ShopManagement;

import org.bs.cms.mapper.ShopManagement.ShopManagementMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShopManagementController {

    @Autowired
    private ShopManagementMapper shopManagementMapper;

    //审核商户上市的商品
    @PostMapping(value = "/editShop/{ids}")
    public Boolean editShop(@RequestParam Integer[] ids){
        try {
            //管理员的商品管理审核状态改变
            shopManagementMapper.editAdmShop(ids);
            //商户的商品管理审核成功
            shopManagementMapper.editMerchantShop(ids);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
