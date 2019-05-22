package org.bs.cms.cmsuserconsumer.Service.ShopManagement;

import org.bs.cms.pojo.ProductBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(value = "cms-user-provider")
public interface ShopManagementService {
    @RequestMapping(value="/editShop",method= RequestMethod.PUT)
    Boolean editAdmShop();


    @RequestMapping(value = "/product/findProductList",method = RequestMethod.GET)
    List<ProductBean> findProductList();

    @RequestMapping(value = "/product/findProductList")
    Boolean delProduct(String ids);

    @RequestMapping(value = "/shop/shenghe")
    void shenghe(@RequestParam("ids") Integer[] ids);

    @RequestMapping(value = "/product/findProductListTwo",method = RequestMethod.GET)
    List<ProductBean> findProductListTwo(@RequestParam("productid") String productid);

    @RequestMapping(value = "/product/editState",method = RequestMethod.POST)
    void editState(@RequestParam("id") Integer id);

    @RequestMapping(value = "/product/NoSatesProduct",method = RequestMethod.POST)
    void editNoStates(@RequestParam("id") Integer id);
}
