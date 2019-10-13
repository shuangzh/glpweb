package com.glp.prod.web.dao;

import com.glp.prod.web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

    User findUserByAccount(String account);

}
