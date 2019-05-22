package org.bs.cms.controller;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.bs.cms.mapper.product.ProductMapper;
import org.bs.cms.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductMapper productMapper;

    @RequestMapping(value = "/product/findProductList",method = RequestMethod.GET)
    public List<ProductBean> findProductList(){
        return productMapper.findProductList();
    }

    @RequestMapping(value = "/product/findBrand")
    public List<BrandBean> findBrand(){
        return productMapper.findBrand();
    }
    @RequestMapping(value = "/product/findColor")
    public List<ColorBean> findColor(){
        return productMapper.findColor();
    }
    @RequestMapping(value = "/product/findSize")
    public List<SizeBean> findSize(){
        return productMapper.findSize();
    }
    @RequestMapping(value = "/product/findType",method = RequestMethod.GET)
    public List<TypeBean> findType(@RequestParam("pid") Integer pid){
        return productMapper.findType(pid);
    }
    @RequestMapping(value = "/product/saveProduct",method = RequestMethod.POST)
    public boolean saveProduct(@RequestBody ProductBean productBean){
        try {
            productMapper.saveProduct(productBean);
            Integer productId = productBean.getId();
            String[] arr = productBean.getUrl().split(",");
            for (String url:arr) {
                ProductImgBean imgBean = new ProductImgBean();
                imgBean.setProductId(productId);
                imgBean.setUrl(url);
                productMapper.addProductImgInfo(imgBean);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    @RequestMapping(value = "/product/delProduct")
    public Boolean delProduct(@RequestParam("ids") String ids){
        try {
            String[] split = ids.split(",");
            Integer[] arr = new Integer[split.length];
            for (int i = 0;i < split.length;i++){
                arr[i] = Integer.valueOf(split[i]);
            }
            productMapper.delProduct(arr);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    @RequestMapping(value = "/product/editProduct",method = RequestMethod.POST)
    public Boolean editProduct(@RequestParam("id") Integer id,@RequestParam("num") Integer num){

        try {
            productMapper.editProduct(id,num);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    @RequestMapping(value = "/product/editPrice",method = RequestMethod.POST)
    public Boolean editPrice(@RequestParam("id") Integer id,@RequestParam("num") Integer num){
        try {
            productMapper.editPrice(id,num);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @RequestMapping(value = "/product/editState",method = RequestMethod.POST)
    public Boolean editState(@RequestParam("id") Integer id,@RequestParam("state") Integer state){
        try {
            /**
             * 判断状态是否等于1  等于1为未上架  修改为上架状态
             */
            if(state == 1){
                productMapper.updateStateUp(id);
            }
            /**
             * 判断状态是否等于0  等于0为上架  修改为下架状态
             */
            if (state == 0){
                productMapper.updateStateDowe(id);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    @RequestMapping(value = "/product/editSelling",method = RequestMethod.POST)
    public Boolean editSelling(@RequestParam("id") Integer id,@RequestParam("selling") Integer selling){
        try {
            /**
             * 判断热卖状态  为1 则设置热卖状态
             */
            if (selling == 1){
                productMapper.editSellingUp(id);
            }
            if (selling == 0){
                productMapper.editSellingDown(id);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 报表展示
     * @return
     */
    @RequestMapping(value = "/product/getColumnChart",method = RequestMethod.GET)
    public List<ProductBean> getColumnChart(){
        List<ProductBean> list = productMapper.getSales();
        return list;
    }

    /**
     * 一键上架
     * @return
     */
    @RequestMapping(value = "/product/editStateOne")
    public Boolean editStateOne(@RequestParam("ids") String ids){
        try {
            String[] split = ids.split(",");
            Integer[] arr = new Integer[split.length];
            for (int i = 0;i < split.length;i++){
                arr[i] = Integer.valueOf(split[i]);
            }
            productMapper.editStateOne(arr);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 一键下架
     * @return
     */
    @RequestMapping(value = "/product/editStateTwo")
    public Boolean editStateTwo(@RequestParam("ids") String ids){
        try {
            String[] split = ids.split(",");
            Integer[] arr = new Integer[split.length];
            for (int i = 0;i < split.length;i++){
                arr[i] = Integer.valueOf(split[i]);
            }
            productMapper.editStateTwo(arr);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
