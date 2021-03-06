package org.bs.cms.controller;


import com.alibaba.fastjson.JSON;
import org.bs.cms.pojo.*;
import org.bs.cms.service.ProductService;
import org.bs.cms.utils.OSSClientUtil;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    /**
     * 列表查询展示
     * @return
     */
    @RequestMapping(value = "/product/findProductList",method = RequestMethod.GET)
    public List<ProductBean> findProductList(){
        return productService.findProductList();
    }

    /**
     * 动态加载品牌
     * @return
     */
    @RequestMapping(value = "/product/findBrand")
    public List<BrandBean> findBrand(){
        return productService.findBrand();
    }

    /**
     * 动态加载颜色
     * @return
     */
    @RequestMapping(value = "/product/findColor")
    public List<ColorBean> findColor(){
        return productService.findColor();
    }

    /**
     * 动态加载尺寸
     * @return
     */
    @RequestMapping(value = "/product/findSize")
    public List<SizeBean> findSize(){
        return productService.findSize();
    }

    /**
     * 加载类型下拉联动效应
     * @param pid
     * @return
     */
    @RequestMapping(value = "/product/findType",method = RequestMethod.GET)
    public List<TypeBean> findType(@RequestParam("pid") Integer pid){
        return productService.findType(pid);
    }

    /**
     * 多表新增
     * @param productBean
     * @return
     */
    @RequestMapping(value = "/product/saveProduct",method = RequestMethod.POST)
    public boolean saveProduct(ProductBean productBean){
        try {
            productService.saveProduct(productBean);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 批量删除
     * @param ids
     * @return
     */
    @RequestMapping(value = "/product/delProduct")
    public Boolean delProduct(@RequestParam("ids") String ids){
           return productService.delProduct(ids);
    }

    /**
     * 根据id增加库存
     * @param id
     * @return
     */
    @RequestMapping(value = "/product/editProduct",method = RequestMethod.POST)
    public Boolean editProduct(@RequestParam("id") Integer id,@RequestParam("num") Integer num){
        return productService.editProduct(id,num);
    }

    @Autowired
    private AmqpTemplate amqpTemplate;
    /**
     * 根据ID修改价格
     * 同时将要修改的商品 和价格通过队列发送出去 从而达到修改用户购物车的商品
     * @param id
     * @param num
     * @return
     */
    @RequestMapping(value = "/product/editPrice",method = RequestMethod.POST)
    public Boolean editPrice(@RequestParam("id") Integer id,@RequestParam("num") Integer num){
        Boolean aBoolean = productService.editPrice(id, num);
        if (aBoolean){
            EditPriceBean editPriceBean = new EditPriceBean();
            editPriceBean.setProductId(id);
            editPriceBean.setProductPrice(num);
            String string = JSON.toJSONString(editPriceBean);
            amqpTemplate.convertAndSend("EditShop", string);
        }
        return aBoolean;
    }

    /**
     * 修改上下架状态
     * 同时将要下架的商品 和价格通过队列发送出去 从而达到删除用户购物车的商品
     * @param id
     * @param state
     * @return
     */
    @RequestMapping(value = "/product/editState",method = RequestMethod.POST)
    public Boolean editState(@RequestParam("id") Integer id,@RequestParam("state") Integer state){
        amqpTemplate.convertAndSend("delShop",id);
        return productService.editState(id,state);
    }
    @RequestMapping(value = "/product/editSelling",method = RequestMethod.POST)
    public Boolean editSelling(@RequestParam("id") Integer id,@RequestParam("selling") Integer selling){
        return productService.editSelling(id,selling);
    }
    /**
     * OSS阿里云上传图片
     */
    @RequestMapping(value = "/product/updaloadImg")
    @ResponseBody
    public Map<String, String> uploadImg(MultipartFile imgg)throws IOException {
        if (imgg == null || imgg.getSize() <= 0) {
            throw new IOException("file不能为空");
        }
        OSSClientUtil ossClient=new OSSClientUtil();
        String name = ossClient.uploadImg2Oss(imgg);
        String imgUrl = ossClient.getImgUrl(name);
        String[] split = imgUrl.split("\\?");
        //System.out.println(split[0]);
        Map<String, String> map = new HashMap<>();
        map.put("imgg",split[0]);
        return map;
    }

    /**
     * 报表展示
     * @return
     */
    @RequestMapping(value = "/product/getColumnChart",method = RequestMethod.GET)
    public List<ProductBean> getColumnChart(){
        List<ProductBean> list = productService.getSales();
        return list;
    }

}
