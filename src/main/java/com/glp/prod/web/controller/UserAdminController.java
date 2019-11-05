package com.glp.prod.web.controller;

import com.glp.prod.web.dao.MenuDao;
import com.glp.prod.web.dao.PermissionDao;
import com.glp.prod.web.dao.RoleDao;
import com.glp.prod.web.dao.UserDao;
import com.glp.prod.web.entity.Menu;
import com.glp.prod.web.entity.Permission;
import com.glp.prod.web.entity.Role;
import com.glp.prod.web.entity.User;
import com.glp.prod.web.service.UserAdminService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.UnavailableSecurityManagerException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", allowCredentials = "true")
@RestController
@Slf4j
public class UserAdminController {

    @Value("${default.pwd}")
    String defaultpwd = "fb88a4810c160559000a4518a6a4ec99";

    @Value("${spring.profiles.active}")
    String activeProfile = "prod";

    @Autowired
    RoleDao roleDao;

    @Autowired
    UserDao userDao;

    @Autowired
    MenuDao menuDao;

    @Autowired
    PermissionDao permissionDao;

    @Autowired
    UserAdminService userAdminService;

    @Autowired
    HttpServletRequest request;


    @GetMapping("/useradmin/getmenu")
    List<Menu> getMenu() {

        try {
            Subject subject = SecurityUtils.getSubject();
            User u = (User) subject.getPrincipal();
            return userAdminService.getMenu(u);

        } catch (UnavailableSecurityManagerException e) {

            if (activeProfile.equals("dev")) {
                log.warn("active profile = dev, get all menus from database for develop");
                return this.getAllMenus();
            } else
                throw e;
        }


    }


    // 全部用户
    @GetMapping("/useradmin/getusers")
    List<User> getUsers() {
        return userAdminService.getAllUsers();
    }

    // 新增用户
    @PostMapping("/useradmin/addnewuser")
    Reply addNewUser(String account, String name, String role_id) {
        log.info("add new User = {}, {}, {}", account, name, role_id);
        userDao.addNewUser(account, name, Long.parseLong(role_id), defaultpwd);
        return Reply.success();
    }

    // 修改状态
    @PostMapping("/useradmin/toggledisabled")
    Reply toggleUserDisabled(String user_id) {
        User u = userDao.findById(Long.parseLong(user_id)).get();
        u.setDisabled(u.getDisabled() == 0 ? 0 : 1);
        userDao.save(u);
        return Reply.success();
    }

    // 更新用户信息
    @PostMapping("/useradmin/edituser")
    Reply editUser(String id, String account, String name, String role_id, String disabled) {
        log.info("edit user {} name={}, role_id={}", account, name, role_id);
        userDao.editUser(Long.parseLong(id), name, Long.parseLong(role_id), Integer.parseInt(disabled));
        return Reply.success();
    }

    // 重置密码
    @PostMapping("/useradmin/resetuser")
    Reply resetuser(String id) {
        log.info("reset pwd user {}", id);
        userDao.resetpwd(Long.parseLong(id), defaultpwd);
        return Reply.success();
    }

    // 删除用户
    @PostMapping("/useradmin/deluser")
    Reply deluser(String id) {
        userDao.deluser(Long.parseLong(id));
        return Reply.success();
    }

    // 角色管理-------------------------------------------------------------
    // 获取所有角色
    @GetMapping("/useradmin/getroles")
    List<Role> getRoles() {
        return userAdminService.getAllRoles();
    }


    @Data
    static class RoleParam1 {
        Long id;
        String name;
        String description;
        String disabled;
        List<String> perms_id;
    }

    @PostMapping("/useradmin/addrole")
    Reply addRole(RoleParam1 p) {
        Role role = new Role();
        role.setName(p.getName());
        role.setDescription(p.getDescription());
        for (String i : p.perms_id) {
            role.addPermission(new Permission(Long.parseLong(i)));
        }
        roleDao.save(role);
        return Reply.success();
    }

    @PostMapping("/useradmin/editrole")
    Reply editRole(RoleParam1 rp) {
        Role role = roleDao.getOne(rp.getId());
        role.setName(rp.getName());
        role.setDescription(rp.getDescription());
        role.getPermissions().clear();
        role.setDisabled(Integer.parseInt(rp.getDisabled()));
        for (String i : rp.getPerms_id()) {
            role.addPermission(new Permission(Long.parseLong(i)));
        }
        roleDao.save(role);
        return Reply.success();
    }

    @PostMapping("/useradmin/delrole")
    Reply delRole(String id) {
        roleDao.removedById(Long.parseLong(id));
        return Reply.success();
    }

    @GetMapping("/useradmin/getperms")
    List<Permission> getPermission() {
        return permissionDao.findAll().stream().filter(permission -> permission.getRemoved() == 0).collect(Collectors.toList());
    }

    ;


    @PostMapping("/useradmin/addperm")
    Reply addPerm(String perm, String description) {
        Permission p = new Permission();
        p.setPerm(perm);
        p.setDescription(description);
        p.setDisabled(0);
        p.setRemoved(0);
        permissionDao.save(p);
        return Reply.success();
    }

    @PostMapping("/useradmin/editperm")
    Reply editPerm(String id, String perm, String description, String disabled) {
        Permission p = permissionDao.getOne(Long.parseLong(id));
        p.setPerm(perm);
        p.setDisabled(Integer.parseInt(disabled));
        p.setDescription(description);
        permissionDao.save(p);
        return Reply.success();
    }

    @PostMapping("/useradmin/delperm")
    Reply editPerm(String id) {
        Permission p = permissionDao.getOne(Long.parseLong(id));
        p.setRemoved(1);
        permissionDao.save(p);
        return Reply.success();
    }

    // ----------------------------------------------------------菜单管理 ------------------------------------
    @GetMapping("/useradmin/getallmenu")
    List<Menu> getAllMenus() {
        return menuDao.findAll().stream().filter(menu -> menu.getRemoved() == 0).collect(Collectors.toList());
    }

    @PostMapping("/useradmin/addmenu")
    Reply addmenu(String title, String target, String level, String description, String perm_id) {
        Menu menu = new Menu();
        menu.setTarget(target);
        menu.setTitle(title);
        menu.setDescription(description);
        menu.setLevel(level);
        menu.setPermission(new Permission(Long.parseLong(perm_id)));
        menuDao.save(menu);
        return Reply.success();
    }

    @PostMapping("/useradmin/editmenu")
    Reply editMenu(String id, String title, String target, String level, String description, String perm_id, String disabled) {
        Menu menu = menuDao.getOne(Long.parseLong(id));
        menu.setTitle(title);
        menu.setTarget(target);
        menu.setLevel(level);
        menu.setDescription(description);
        menu.setDisabled(Integer.parseInt(disabled));
        menu.setPermission(new Permission(Long.parseLong(perm_id)));
        menuDao.save(menu);
        return Reply.success();
    }

    @PostMapping("/useradmin/delmenu")
    Reply delMenu(String id) {
        menuDao.deleteById(Long.parseLong(id));
        return Reply.success();
    }


}
