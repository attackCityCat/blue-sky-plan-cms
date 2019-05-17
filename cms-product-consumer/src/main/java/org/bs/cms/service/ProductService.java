package org.bs.cms.service;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(value = "cms-product-provider")
public interface ProductService extends ProductServiceApi{
}
