package org.bs.cms.mapper.tree;

import org.apache.ibatis.annotations.Select;
import org.bs.cms.model.Tree.TreeBean;

import java.util.List;

public interface TreeMapper {

    @Select("select DISTINCT te.* from cms_tree te " +
            "left join cms_role_power trp on te.id = trp.powerid " +
            "left join cms_user tur on trp.roleid = tur.roleid " +
            "where tur.useraccount = #{value}")
    List<TreeBean> findTree(String userid);
}
