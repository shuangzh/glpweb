package com.glp.prod.web.dao;

import com.glp.prod.web.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuDao  extends JpaRepository<Menu, Long> {

}

