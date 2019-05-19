package org.bs.cms.cmsuserconsumer.Service.ShopManagement;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
@FeignClient(value = "cms-user-provider")
public interface ShopManagementService {
    @RequestMapping(value="/editShop/{ids}",method= RequestMethod.POST)
    void editAdmShop(Integer[] ids);

    @RequestMapping(value="/editShop/{ids}",method= RequestMethod.POST)
    void editMerchantShop(Integer[] ids);
}
