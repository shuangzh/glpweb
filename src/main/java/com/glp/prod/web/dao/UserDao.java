package com.glp.prod.web.dao;

import com.glp.prod.web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

    User findUserByAccount(String account);

    @Transactional
    @Modifying
    @Query(value = "insert into sys_user (account, name, role_id, pwd) values (?1, ?2, ?3, ?4)", nativeQuery = true)
    int addNewUser(String account, String name,  Long role_id, String password);

    @Transactional
    @Query(value = "update sys_user set name = ?2 , role_id = ?3 where id = ?1", nativeQuery = true)
    int editUser(Long id, String name, Long role_id);

    @Transactional
    @Query(value="update sys_user set pwd=?2 where id= ?1", nativeQuery = true)
    int resetpwd(Long id, String pwd);

    @Query(value = "update sys_user set removed=1 where id =?1", nativeQuery = true)
    int deluser(Long id);

}
