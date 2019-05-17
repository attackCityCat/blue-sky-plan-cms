package org.bs.cms.controller;

import org.bs.cms.pojo.ProductBean;
import org.bs.cms.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;
    @RequestMapping(value = "/product/findProductList",method = RequestMethod.GET)
    public List<ProductBean> findProductList(ProductBean productBean){
        return productService.findProductList(productBean);
    }
}
