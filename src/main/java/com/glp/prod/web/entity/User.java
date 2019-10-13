package com.glp.prod.web.entity;

import com.glp.prod.web.entity.Role;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="sys_user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 32)
    private String account;

    @Column(length = 64)
    private String name;

    @ColumnDefault("0")
    private Boolean disabled = false;

    @Column(length = 128)
    private String pwd;

    @ColumnDefault("0")
    private Boolean removed;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name="role_id")
    private Role role;

//    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinTable(name = "sys_user_role", joinColumns = @JoinColumn(name="user_id"), inverseJoinColumns = @JoinColumn(name="role_id"))
//    private List<Role> roles = new ArrayList<>();
//
//    public User addRole(Role role){
//        roles.add(role);
//        return this;
//    }
//
//    public User delRole(Role role){
//
//        return this;
//    };


}
