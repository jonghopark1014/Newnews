package com.ssafy.specialization.entity;

import com.ssafy.specialization.entity.enums.Status;

import javax.persistence.*;

@Entity
public class Notification {

    @Column(name = "notification_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Status isRead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id")
    private News news;


}
