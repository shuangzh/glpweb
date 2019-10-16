package com.glp.prod.web;

import com.glp.prod.web.dao.MenuDao;
import com.glp.prod.web.dao.PermissionDao;
import com.glp.prod.web.dao.RoleDao;
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

    @Autowired
    RoleDao roleDao;

    @Autowired
    PermissionDao permissionDao;

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
        permission.setPerm("user:admin");
        permission.setDisabled(false);
        permission.setRemoved(false);


        permissionDao.save(permission);

        Permission permission2 = new Permission();
        permission2.setDescription("测试管理");
        permission2.setPerm("test:admin");
        permission2.setDisabled(false);
        permission2.setRemoved(false);


        permissionDao.save(permission2);

        role.addPermission(permission);

        roleDao.save(role);

        user.setRole(role);

        userDao.saveAndFlush(user);

        log.info("user = {}", user );

//        user.setRole(null);
//        userDao.saveAndFlush(user);


        Menu menu = new Menu();
        menu.setLevel("1");
        menu.setTitle("系统管理");
        menu.setPermission(permission);

        menuDao.save(menu);

        Menu menu2 = new Menu();
        menu2.setLevel("1-1");
        menu2.setTitle("用户管理");
        menu2.setTarget("userman");
        menu2.setPermission(permission);

        menuDao.save(menu2);

        menu2.setId(null);
        menu2.setLevel("1-2");
        menu2.setTitle("角色管理");
        menu2.setTarget("roleman");
        menu2.setPermission(permission);

        menuDao.save(menu2);

        menu2.setId(null);
        menu2.setLevel("1-3");
        menu2.setTitle("权限管理");
        menu2.setTarget("permman");
        menu2.setPermission(permission);

        menuDao.save(menu2);

        menu2.setId(null);
        menu2.setLevel("1-4");
        menu2.setTitle("菜单管理");
        menu2.setTarget("menuman");
        menu2.setPermission(permission);

        menuDao.save(menu2);

        menu2.setId(null);
        menu2.setLevel("2");
        menu2.setTitle("数据分析-1");
        menu2.setTarget("dataanly");
        menu2.setPermission(permission);

        menuDao.save(menu2);

    }

}
