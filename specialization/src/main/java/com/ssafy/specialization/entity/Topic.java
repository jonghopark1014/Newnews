package com.ssafy.specialization.entity;

import javax.persistence.*;

@Entity
public class Topic {
    @Column(name = "topic_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String subdivision;

//    @OneToOne(mappedBy = "topic")
//    private News news;
}
