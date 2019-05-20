package org.bs.cms.cmsuserconsumer.Controller.ShopManagement;


import org.bs.cms.cmsuserconsumer.Service.ShopManagement.ShopManagementService;

import org.bs.cms.pojo.ProductBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ShopManagementController {

    @Autowired
    private ShopManagementService shopManagementService;

    //审核商户上市的商品
    @PostMapping(value = "/editShop")
    public Boolean editShop(@RequestParam int id){
        try {
            //管理员的商品管理审核状态改变
            shopManagementService.editAdmShop(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }


    @PostMapping(value = "/product/delProduct")
    public Boolean delProduct(@RequestParam("ids") String ids){
        return shopManagementService.delProduct(ids);
    }

    @GetMapping(value = "/product/findProductList")
    public List<ProductBean> findProductList(){
        return shopManagementService.findProductList();
    }
}
