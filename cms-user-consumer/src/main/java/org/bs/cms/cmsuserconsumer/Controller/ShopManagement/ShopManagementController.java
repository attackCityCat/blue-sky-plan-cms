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
    @PutMapping(value = "/editShop")
    public Boolean editShop(){

          return shopManagementService.editAdmShop();

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
