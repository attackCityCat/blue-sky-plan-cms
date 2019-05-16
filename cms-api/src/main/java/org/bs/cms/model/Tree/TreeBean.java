package org.bs.cms.model.Tree;

import java.util.List;

public class TreeBean {

    private Integer id;
    private String text;
    private Integer pid;
    private String url;
    private String state;
    private Boolean checked;
    private List<TreeBean> children;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public List<TreeBean> getChildren() {
        return children;
    }

    public void setChildren(List<TreeBean> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "TreeBean{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", pid=" + pid +
                ", url='" + url + '\'' +
                ", state='" + state + '\'' +
                ", checked=" + checked +
                ", children=" + children +
                '}';
    }
}
