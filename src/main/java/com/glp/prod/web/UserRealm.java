package com.glp.prod.web;

import com.glp.prod.web.dao.UserDao;
import com.glp.prod.web.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;


@Component
@Slf4j
public class UserRealm extends AuthorizingRealm {

    @Autowired
    UserDao userDao;

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
        User u = (User) principals.getPrimaryPrincipal();
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.addRole(u.getRole().getName());
        info.addStringPermissions(u.getRole().getPermissions().stream().map( permission -> permission.getPerm()).collect(Collectors.toList()));
        return info;
    }

    // 登录验证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String name = (String) token.getPrincipal();

        String password = "";
        log.info("Authon name={}, password={}",name, password);

        User u = userDao.findUserByAccount(name);
        if(u == null){
            throw new AuthenticationException("用户不存在");
        }

        log.info("user = {}", u);

        SimpleAuthenticationInfo simpleAuthenticationInfo =
                new SimpleAuthenticationInfo(u, u.getPwd(), ByteSource.Util.bytes(salt), getName());
        return simpleAuthenticationInfo;
    }



}
