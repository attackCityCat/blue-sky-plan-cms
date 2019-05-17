package org.bs.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("page")
public class PageController {
    @RequestMapping(value = "/toMain")
    public String toMain(){
        return "view/main";
    }
    @RequestMapping(value = "/toMain2")
    public String toMain2(){
        return "view/main2";
    }
}
