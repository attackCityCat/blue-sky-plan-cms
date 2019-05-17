package org.bs.cms.cmsuserconsumer.Controller.ShopManagement;

import org.bs.cms.cmsuserconsumer.Service.ShopManagement.ShopManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShopManagementController {

    @Autowired
    private ShopManagementService shopManagementService;

    //审核商户上市的商品
    @PostMapping(value = "/editShop")
    public Boolean editShop(@RequestParam Integer[] ids){
        try {
            //管理员的商品管理审核状态改变
            shopManagementService.editAdmShop(ids);
            //商户的商品管理审核成功
            shopManagementService.editMerchantShop(ids);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
