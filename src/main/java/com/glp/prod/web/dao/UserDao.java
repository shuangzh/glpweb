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
}
