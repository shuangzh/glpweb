package com.glp.prod.web.dao;

import com.glp.prod.web.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RoleDao extends JpaRepository<Role, Long> {

    @Transactional
    @Modifying
    @Query(value = "update sys_role set removed=1 where id=?1", nativeQuery = true)
    int removedById(Long id);
}
