package org.bs.cms.cmsuserconsumer.Service.ShopManagement;

import org.bs.cms.pojo.ProductBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(value = "cms-user-provider")
public interface ShopManagementService {
    @RequestMapping(value="/editShop/{id}",method= RequestMethod.POST)
    void editAdmShop(int id);


    @RequestMapping(value = "/product/findProductList",method = RequestMethod.GET)
    List<ProductBean> findProductList();

    @RequestMapping(value = "/product/findProductList")
    Boolean delProduct(String ids);
}
