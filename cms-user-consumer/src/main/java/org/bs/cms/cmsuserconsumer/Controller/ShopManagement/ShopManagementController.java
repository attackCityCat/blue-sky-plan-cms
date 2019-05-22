package org.bs.cms.cmsuserconsumer.Controller.ShopManagement;


import org.bs.cms.cmsuserconsumer.Service.ShopManagement.ShopManagementService;

import org.bs.cms.pojo.ProductBean;
import org.bs.cms.pojo.examine.ExamineBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class ShopManagementController {

    String SHEN_HE_KEY = "shenghe";

    @Autowired
    private ShopManagementService shopManagementService;

    @Autowired
    private MongoTemplate mongoTemplate;

    //审核商户上市的商品
    @PutMapping(value = "/editShop")
    public Boolean editShop(){

          return shopManagementService.editAdmShop();

    }

    //系统管理员批量审核
    @RequestMapping("/shop/shenghe")
    public Boolean shenghe(@RequestParam("ids") Integer[] ids,@RequestParam("editUserid") Integer editUserid){

        try{

            for (Integer pid : ids){
                ExamineBean examineBean = new ExamineBean();

                examineBean.setId(SHEN_HE_KEY+pid);
                examineBean.setUserid(editUserid);
                examineBean.setStaus(2);
                examineBean.setProductid(pid);
                mongoTemplate.save(examineBean);
                shopManagementService.shenghe(ids);
            }
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }


    @PostMapping(value = "/product/delProduct")
    public Boolean delProduct(@RequestParam("ids") String ids){
        return shopManagementService.delProduct(ids);
    }

    @GetMapping(value = "/product/findProductList")
    public List<ProductBean> findProductList(HttpServletRequest request) {
        //获取session
        HttpSession session = request.getSession();
        Integer userid = (Integer) session.getAttribute("userid");
        System.out.println(userid);
        if (userid == 1){
            return shopManagementService.findProductList();
        }else if(userid == 2 ){
            Query query = new Query(Criteria.where("userid").is(userid));
            List<ExamineBean> list = mongoTemplate.find(query,ExamineBean.class);
            String productid = "";
            for (ExamineBean examineBean : list){
                examineBean.getProductid();
                productid+=examineBean.getProductid()+",";
            }
            System.out.println(productid);

            return shopManagementService.findProductListTwo(productid);
        }else{
            return null;
        }



    }

    @PostMapping(value = "/product/editState")
    public void editState(@RequestParam("id") Integer id){
        shopManagementService.editState(id);
    }


    @PostMapping(value = "/product/NoSatesProduct")
    public void editNoStates(@RequestParam("id") Integer id,@RequestParam("num") String num){
        Query query = new Query(Criteria.where("_id").is(SHEN_HE_KEY+id));
        List<ExamineBean> examineBeans = mongoTemplate.find(query, ExamineBean.class);
        ExamineBean examineBean = examineBeans.get(0);
        System.out.println(examineBean.getId());
        examineBean.setId(examineBean.getId());
        examineBean.setStaus(3);
        examineBean.setContent(num);
        mongoTemplate.save(examineBean);
        shopManagementService.editNoStates(id);
    }

}
