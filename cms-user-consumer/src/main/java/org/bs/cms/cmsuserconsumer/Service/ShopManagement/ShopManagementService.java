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



    @RequestMapping(value = "/product/getColumnChart",method = RequestMethod.GET)
    List<ProductBean> getSales();
}
