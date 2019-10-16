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


    @Column(length = 128)
    private String description;


    private Integer disabled = 0;
    private Integer removed=0;

    public Permission(){

    }

    public Permission(Long id){
        this.id=id;
    }
}
