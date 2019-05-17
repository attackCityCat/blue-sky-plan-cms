package org.bs.cms.controller.tree;

import org.bs.cms.mapper.tree.TreeMapper;
import org.bs.cms.pojo.Tree.TreeBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TreeController {

    @Autowired
    private TreeMapper treeMapper;

    @GetMapping(value="/findTree/{userid}")
    public List<TreeBean> findTree(@RequestParam(value="userid")String userid) {
        System.out.println(treeMapper.findTree(userid));
        return treeMapper.findTree(userid);
    }
}
