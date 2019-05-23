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
    @RequestMapping(value = "/product/delProduct")
    Boolean delProduct(@RequestParam("ids") String ids);

    @RequestMapping(value = "/product/editProduct",method = RequestMethod.POST)
    Boolean editProduct(@RequestParam("id") Integer id,@RequestParam("num") Integer num);

    @RequestMapping(value = "/product/editState",method = RequestMethod.POST)
    Boolean editState(@RequestParam("id") Integer id, @RequestParam("state") Integer state);

    @RequestMapping(value = "/product/editSelling",method = RequestMethod.POST)
    Boolean editSelling(@RequestParam("id") Integer id,@RequestParam("selling") Integer selling);

    @RequestMapping(value = "/product/getColumnChart",method = RequestMethod.GET)
    List<ProductBean> getSales();

    @RequestMapping(value = "/product/editPrice",method = RequestMethod.POST)
    Boolean editPrice(@RequestParam("id") Integer id,@RequestParam("num") Integer num);

    @RequestMapping(value = "/product/editStateOne")
    Boolean editStateOne(@RequestParam("ids") String ids);

    @RequestMapping(value = "/product/editStateTwo")
    Boolean editStateTwo(@RequestParam("ids") String ids);

    @RequestMapping(value = "/product/editSellingUp")
    Boolean editSellingUpAll(@RequestParam("ids") String ids);

    @RequestMapping(value = "/product/editSellingDownAll")
    Boolean editSellingDownAll(@RequestParam("ids") String ids);

    @RequestMapping(value = "/product/saveImgAll",method = RequestMethod.POST)
    void saveImgAll(ImgBean imgBean);

    @RequestMapping(value = "/product/findProductImgList",method = RequestMethod.GET)
    List<ImgBean> findProductImgList();

    @RequestMapping(value = "/product/delProductImg")
    Boolean delProductImg(@RequestParam("ids") String ids);
}
