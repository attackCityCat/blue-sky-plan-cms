package org.bs.cms.service;

import org.bs.cms.pojo.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface ProductServiceApi {
    @RequestMapping(value = "/product/findProductList",method = RequestMethod.GET)
    List<ProductBean> findProductList();

    @RequestMapping(value = "/product/findBrand")
    List<BrandBean> findBrand();
    @RequestMapping(value = "/product/findColor")
    List<ColorBean> findColor();

    @RequestMapping(value = "/product/findSize")
    List<SizeBean> findSize();

    @RequestMapping(value = "/product/findType",method = RequestMethod.GET)
    List<TypeBean> findType(@RequestParam("pid") Integer pid);
    @RequestMapping(value = "/product/saveProduct",method = RequestMethod.POST)
    void saveProduct(@RequestBody ProductBean productBean);
    @DeleteMapping(value = "/product/delProduct")
    Boolean delProduct(@RequestParam("ids") String ids);

    @RequestMapping(value = "/product/editProduct",method = RequestMethod.POST)
    Boolean editProduct(@RequestParam("id") Integer id,@RequestParam("num") Integer num);

    @RequestMapping(value = "/product/editState",method = RequestMethod.POST)
    Boolean editState(@RequestParam("id") Integer id, @RequestParam("state") Integer state);

    @RequestMapping(value = "/product/editSelling",method = RequestMethod.POST)
    Boolean editSelling(@RequestParam("id") Integer id,@RequestParam("selling") Integer selling);

}
