package org.bs.cms.controller.user;

import org.bs.cms.mapper.user.UserMapper;
import org.bs.cms.model.User.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserMapper userMapper;

    //get  查  post  新增  put 修改 delete 删除
    @GetMapping(value="/findById/{userid}")
    public UserBean findById(@RequestParam(value="userid")Integer userid) {
        System.out.println(userMapper.queryById(userid));
        return userMapper.queryById(userid);
    }

    @RequestMapping(value="/query",method=RequestMethod.GET)
    public List<UserBean> queryAll() {
        return userMapper.queryAll();
    }

    @RequestMapping(value="/edit",method= RequestMethod.POST)
    public Boolean update(@RequestBody UserBean userBean) {
        try {
            userMapper.edit(userBean);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }

    @RequestMapping(value="/save",method=RequestMethod.POST)
    public Boolean save(@RequestBody UserBean userBean) {

        try {
            userMapper.save(userBean);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    @RequestMapping(value="/delete/{userid}",method=RequestMethod.POST)
    public Boolean delete(@RequestParam(value="userid")Integer userid) {
        try {
            if (userid==1){
                return false;
            }else {
                userMapper.delete(userid);
                return true;
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }


}
