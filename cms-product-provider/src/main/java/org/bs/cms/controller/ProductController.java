package org.bs.cms.controller;

import org.bs.cms.mapper.product.ProductMapper;
import org.bs.cms.pojo.ProductBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductMapper productMapper;

    @RequestMapping(value = "/product/findProductList",method = RequestMethod.POST)
    public List<ProductBean> findProductList(ProductBean productBean){
        return productMapper.findProductList(productBean);
    }

}
