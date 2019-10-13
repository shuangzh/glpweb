package com.glp.prod.web.controller;

import com.glp.prod.web.dao.MenuDao;
import com.glp.prod.web.dao.RoleDao;
import com.glp.prod.web.dao.UserDao;
import com.glp.prod.web.entity.Menu;
import com.glp.prod.web.entity.Role;
import com.glp.prod.web.entity.User;
import com.glp.prod.web.service.UserAdminService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@Slf4j
public class UserAdminController {

    @Autowired
    RoleDao roleDao;

    @Autowired
    UserDao userDao;

    @Autowired
    UserAdminService userAdminService;

    @GetMapping("/useradmin/getmenu")
    List<Menu> getMenu(){
        Subject subject = SecurityUtils.getSubject();
        User u = (User) subject.getPrincipal();
        return  userAdminService.getMenu(u);
    }

    @GetMapping("/useradmin/getroles")
    List<Role> getRoles(){
        return userAdminService.getAllRoles();
    }

    @GetMapping("/useradmin/getusers")
    List<User> getUsers(){
        return  userAdminService.getAllUsers();
    }

    @PostMapping("/useradmin/addnewuser")
    Reply addNewUser(String account, String name, String role_id){
        log.info("add new User = {}, {}, {}", account, name, role_id);
        userDao.addNewUser(account, name, Long.parseLong(role_id), "fb88a4810c160559000a4518a6a4ec99");
        return  Reply.success();
    }
}
