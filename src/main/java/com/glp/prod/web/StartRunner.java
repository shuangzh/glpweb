package com.glp.prod.web;

import com.glp.prod.web.dao.MenuDao;
import com.glp.prod.web.dao.UserDao;
import com.glp.prod.web.entity.Menu;
import com.glp.prod.web.entity.Permission;
import com.glp.prod.web.entity.Role;
import com.glp.prod.web.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class StartRunner  implements CommandLineRunner {

    @Autowired
    UserDao userDao;

    @Autowired
    MenuDao menuDao;

    @Override
    public void run(String... args) throws Exception {
        log.info("here is StartRunner");
        initData();
    }

    public  void initData(){

        User user=new User();
        user.setAccount("zhou");
        user.setPwd("fb88a4810c160559000a4518a6a4ec99");
        user.setName("zhou shuang");
        user.setDisabled(false);
        user.setRemoved(false);

        Role role = new Role();
        role.setName("admin");
        role.setDescription("管理员");
        role.setDisabled(false);
        role.setRemoved(false);

        Permission permission = new Permission();
        permission.setDescription("用户管理");
        permission.setPerm("user:admin:*");
        permission.setDisabled(false);
        permission.setRemoved(false);

        role.addPermission(permission);
        user.setRole(role);

        userDao.saveAndFlush(user);

        log.info("user = {}", user );

//        user.setRole(null);
//
//        userDao.saveAndFlush(user);


        Menu menu = new Menu();
        menu.setLevel("1");
        menu.setTitle("系统管理");
        menu.setPermission(role.getPermissions().get(0));

        menuDao.save(menu);

        Menu menu2 = new Menu();
        menu2.setLevel("1-1");
        menu2.setTitle("用户管理");
        menu2.setPermission(role.getPermissions().get(0));

        menuDao.save(menu2);

    }

}
