package com.glp.prod.web.entity;

import com.glp.prod.web.entity.Permission;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="sys_role")
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 32)
    private String name;

    private Boolean disabled = false;

    @Column(length = 128)
    private String description;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "sys_role_perm", joinColumns = @JoinColumn(name="role_id"), inverseJoinColumns = @JoinColumn(name="perm_id"))
    private List<Permission> permissions = new ArrayList<>();

    private Boolean removed;

    public Role addPermission(Permission permission)
    {
        permissions.add(permission);
        return this;
    }

    Boolean hasPermission(Permission p){
        if(this.permissions!=null){
            permissions.stream().anyMatch(permission ->  permission.getPerm().equals(p.getPerm()));
        }

        return  false;
    }

}
