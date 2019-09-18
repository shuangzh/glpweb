package com.glp.prod.web;

import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class UserRealm extends AuthorizingRealm {

    final  String salt="glp";

    {
        HashedCredentialsMatcher hashedCredentialsMatcher=new HashedCredentialsMatcher();
        hashedCredentialsMatcher.setHashAlgorithmName("md5");
        setCredentialsMatcher(hashedCredentialsMatcher);
    }


    @Override
    public String getName(){
        return "UserRealm";
    }

    @Override
    public boolean supports(AuthenticationToken token){
        return token instanceof UsernamePasswordToken;
    }

    // 授权信息
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

        return null;
    }

    // 登录验证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String name = (String) token.getPrincipal();
        String password = "fb88a4810c160559000a4518a6a4ec99";
        log.info("Authon name={}, password={}",name, password);
        if(!name.equals("zhou"))
            return null;
        SimpleAuthenticationInfo simpleAuthenticationInfo =
                new SimpleAuthenticationInfo(name, password, ByteSource.Util.bytes(salt), getName());
        return simpleAuthenticationInfo;
    }
}
