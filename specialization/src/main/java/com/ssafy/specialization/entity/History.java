package com.ssafy.specialization.entity;

import javax.persistence.*;

@Entity
public class History {

    @Column(name = "history_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String maindivision;
}
