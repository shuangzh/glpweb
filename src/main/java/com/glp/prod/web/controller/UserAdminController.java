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
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@Slf4j
public class UserAdminController {

    @Value("${default.pwd}")
    String defaultpwd="fb88a4810c160559000a4518a6a4ec99";

    @Autowired
    RoleDao roleDao;

    @Autowired
    UserDao userDao;

    @Autowired
    PermissionDao permissionDao;

    @Autowired
    UserAdminService userAdminService;

    @Autowired
    HttpServletRequest request;


    @GetMapping("/useradmin/getmenu")
    List<Menu> getMenu(){
        Subject subject = SecurityUtils.getSubject();
        User u = (User) subject.getPrincipal();
        return  userAdminService.getMenu(u);
    }


    // 全部用户
    @GetMapping("/useradmin/getusers")
    List<User> getUsers(){
        return  userAdminService.getAllUsers();
    }

    // 新增用户
    @PostMapping("/useradmin/addnewuser")
    Reply addNewUser(String account, String name, String role_id){
        log.info("add new User = {}, {}, {}", account, name, role_id);
        userDao.addNewUser(account, name, Long.parseLong(role_id), defaultpwd);
        return  Reply.success();
    }

    // 修改状态
    @PostMapping("/useradmin/toggledisabled")
    Reply toggleUserDisabled(String user_id){
        User u = userDao.findById(Long.parseLong(user_id)).get();
        u.setDisabled(!u.getDisabled());
        userDao.save(u);
        return Reply.success();
    }

    // 更新用户信息
    @PostMapping("/useradmin/edituser")
    Reply editUser(String id, String account,String name, String role_id){
        log.info("edit user {} name={}, role_id={}", account, name, role_id);
        userDao.editUser(Long.parseLong(id), name, Long.parseLong(role_id));
        return Reply.success();
    }

    // 重置密码
    @PostMapping("/useradmin/resetuser")
    Reply resetuser(String id){
        log.info("reset pwd user {}", id);
        userDao.resetpwd(Long.parseLong(id), defaultpwd);
        return Reply.success();
    }

    // 删除用户
    @PostMapping("/useradmin/deluser")
    Reply deluser(String id){
        userDao.deluser(Long.parseLong(id));
        return Reply.success();
    }

    // 角色管理-------------------------------------------------------------
    // 获取所有角色
    @GetMapping("/useradmin/getroles")
    List<Role> getRoles(){
        return userAdminService.getAllRoles();
    }


    @Data
    static class RoleParam1{
        Long id;
        String name;
        String description;
        String disabled;
        List<String> perms_id;
    }

    @PostMapping("/useradmin/addrole")
    Reply addRole(RoleParam1 p)
    {
        Role role=new Role();
        role.setName(p.getName());
        role.setDescription(p.getDescription());
        for(String i: p.perms_id){
            role.addPermission(new Permission(Long.parseLong(i)));
        }
        roleDao.save(role);
        return  Reply.success();
    }

    @PostMapping("/useradmin/editrole")
    Reply editRole(RoleParam1 rp){
        Role role = roleDao.getOne(rp.getId());
        role.setName(rp.getName());
        role.setDescription(rp.getDescription());
        role.getPermissions().clear();
        role.setDisabled(rp.getDisabled()=="true"? true:false);
        for(String i: rp.getPerms_id()){
            role.addPermission(new Permission(Long.parseLong(i)));
        }
        roleDao.save(role);
        return  Reply.success();
    }

    Reply delRole(String id){

        return  Reply.success();
    }


    @GetMapping("/useradmin/getperms")
    List<Permission> getPermission(){
        return permissionDao.findAll().stream().filter( permission ->  !permission.getRemoved()).collect(Collectors.toList());
    };

}
