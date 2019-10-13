package com.glp.prod.web.service;

import com.glp.prod.web.dao.MenuDao;
import com.glp.prod.web.dao.RoleDao;
import com.glp.prod.web.dao.UserDao;
import com.glp.prod.web.entity.Menu;
import com.glp.prod.web.entity.Role;
import com.glp.prod.web.entity.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserAdminService {

    @Autowired
    MenuDao menuDao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    UserDao userDao;

    public List<Menu>  getMenu(User u){
        List<Menu> allMenu = menuDao.findAll(Sort.by("level"));
        Subject subject = SecurityUtils.getSubject();
        List<Menu> m = allMenu.stream().filter(menu ->  subject.isPermitted(menu.getPermission().getPerm())).collect(Collectors.toList());
       return m;
    }

    public List<Role> getAllRoles(){
       return roleDao.findAll();
    }

    public List<User> getAllUsers(){
        return userDao.findAll();
    }


}
