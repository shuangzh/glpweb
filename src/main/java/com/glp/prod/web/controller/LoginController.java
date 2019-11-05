package com.glp.prod.web.controller;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", allowCredentials = "true")
@Controller
@Slf4j
public class LoginController {

    @Autowired
    HttpServletRequest request;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String getLoginPage(){
        log.info(request.getRequestURI() + " PUT");
        return "login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String doLogin(String username, String password){
        log.info(request.getRequestURI() + "POST");
        log.info("/login post username = {}, password={}", username, password);
        Subject subject=SecurityUtils.getSubject();
        String pwd = new Md5Hash("123456", "glp").toString();
        log.info("pwd 123456 md5= {}", pwd);
        password="123456";
        UsernamePasswordToken token =new UsernamePasswordToken(username, password);
        if(!subject.isAuthenticated()){
            try{ subject.login(token);}catch (Exception e){
                log.info("exception e -{}", e.getMessage());
                return "login";
            }
        }
        return "redirect:/index";
    }

    @RequestMapping(value = "/logout")
    public String doLogout(){
        log.info(request.getRequestURI());
        Subject subject=SecurityUtils.getSubject();
        subject.logout();
        return "redirect:/login";
    }

    @RequestMapping(value = "/index")
    public String index(){
        return "index";
    }

    @RequestMapping(value = "/nopermission")
    @ResponseBody
    @ResponseStatus(code= HttpStatus.UNAUTHORIZED)
    public String nopermission(){
        return "no permission";
    }

    @RequestMapping("/page1")
    public String page1(){
        return  "page1";
    }


}
