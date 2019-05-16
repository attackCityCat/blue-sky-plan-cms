package org.bs.cms.service;

import org.bs.cms.pojo.ProductBean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

public interface ProductServiceApi {
    @RequestMapping(value = "/product/findProductList",method = RequestMethod.POST)
    List<ProductBean> findProductList(ProductBean productBean);
}
