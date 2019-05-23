package org.bs.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("page")
public class PageController {
    @RequestMapping(value = "/toMain2")
    public String toMain2(){
        return "view/main2";
    }
    @RequestMapping(value = "toAddProduct")
    public String toAddProduct(){
        return "view/addProduct";
    }
    @RequestMapping(value = "toUpdate")
    public String toUpdate(){
        return "view/updateProduct";
    }

    @RequestMapping(value = "toPrice")
    public String toPrice(){
        return "view/updatePrice";
    }
    @RequestMapping(value = "toEcharts")
    public String toEcharts(){
        return "view/echarts";
    }
    @RequestMapping(value = "/toAddImg")
    public String toAddImg(){
        return "view/addImg";
    }
    @RequestMapping(value = "/toAddImgAll")
    public String toAddImgAll(){
        return "view/addImgAll";
    }

}
