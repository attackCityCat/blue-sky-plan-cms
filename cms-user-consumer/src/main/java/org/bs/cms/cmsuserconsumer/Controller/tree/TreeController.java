package org.bs.cms.cmsuserconsumer.Controller.tree;

import org.bs.cms.cmsuserconsumer.Service.tree.TreeService;
import org.bs.cms.pojo.Tree.TreeBean;
import org.bs.cms.pojo.User.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class TreeController {

    @Autowired
    private TreeService treeService;

    @RequestMapping(value = "/findTree")
    public List<TreeBean> findBootstrapTreeList(HttpSession session){
        UserBean userBean =  (UserBean) session.getAttribute(session.getId());
        String userid = userBean.getUseraccount();
        return treeService.findTreeList(userid);

    }
}
