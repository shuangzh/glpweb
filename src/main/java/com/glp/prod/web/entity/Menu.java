package com.glp.prod.web.entity;

import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name="sys_menu")
@Data
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 32)
    private String title;

    @Column(length = 32)
    private String target;

    @Column(length = 32)
    private String level;

    private Boolean disabled= false;

    private Boolean removed = false;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="perm_id")
    private Permission permission;

}
