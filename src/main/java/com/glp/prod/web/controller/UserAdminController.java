package com.glp.prod.web.controller;

import com.glp.prod.web.dao.MenuDao;
import com.glp.prod.web.entity.Menu;
import com.glp.prod.web.entity.User;
import com.glp.prod.web.service.UserAdminService;
import lombok.Data;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserAdminController {

    @Autowired
    UserAdminService userAdminService;

    @GetMapping("/useradmin/getmenu")
    List<Menu> getMenu(){
        Subject subject = SecurityUtils.getSubject();
        User u = (User) subject.getPrincipal();
        return  userAdminService.getMenu(u);
    }
}
