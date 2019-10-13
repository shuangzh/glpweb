package com.glp.prod.web.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="sys_perm")
@Data
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 32)
    private String perm;

    private Boolean disabled = false;

    @Column(length = 128)
    private String description;

    private Boolean removed;

}
