package com.ssafy.specialization.entity;

import javax.persistence.*;

@Entity
public class NewsImage {
    @Column(name = "newsimage_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    private News news;
}
