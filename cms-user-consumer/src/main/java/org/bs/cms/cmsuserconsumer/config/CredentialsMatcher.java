package org.bs.cms.cmsuserconsumer.config;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.apache.shiro.crypto.hash.SimpleHash;


public class CredentialsMatcher extends SimpleCredentialsMatcher {
    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        UsernamePasswordToken utoken=(UsernamePasswordToken) token;
        //所需加密的参数  即  用户输入的密码
        String source = String.valueOf(utoken.getPassword());
        //[盐] 一般为用户名 或 随机数
        String salt = utoken.getUsername();
        //加密次数
        int hashIterations = 1;
        SimpleHash sh = new SimpleHash("md5", source, salt, hashIterations);
        String Strsh =sh.toHex();
        //打印最终结果
        System.out.println("正确密码为："+Strsh);
        //获得数据库中的密码
        String dbPassword= (String) getCredentials(info);
        //进行密码的比对
        return this.equals(Strsh, dbPassword);
    }
}
