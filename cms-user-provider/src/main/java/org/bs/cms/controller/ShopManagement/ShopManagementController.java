package org.bs.cms.controller.ShopManagement;

import org.bs.cms.mapper.ShopManagement.ShopManagementMapper;
import org.bs.cms.pojo.ProductBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ShopManagementController {

    @Autowired
    private ShopManagementMapper shopManagementMapper;

    //审核商户上市的商品
    @PostMapping(value = "/editShop/{id}")
    public Boolean editAdmShop(@RequestParam int id){
        try {
            //管理员的商品管理审核状态改变
            shopManagementMapper.editAdmShop(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }


    @PostMapping(value = "/product/delProduct")
    public Boolean delProduct(@RequestParam("ids") String ids){
        try {
            String[] split = ids.split(",");
            Integer[] arr = new Integer[split.length];
            for (int i = 0;i < split.length;i++){
                arr[i] = Integer.valueOf(split[i]);
            }
            shopManagementMapper.delProduct(arr);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping(value = "/product/findProductList")
    public List<ProductBean> findProductList(){
        return shopManagementMapper.findProductList();
    }
}
