package com.ssafy.specialization.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class NewsImage {
    @Column(name = "newsimage_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    private String url;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private News news;

    private void setUrl(String url) {
        this.url = url;
    }

    private void setDesc(String description) {
        this.description = description;
    }

    //연관관계 메소드
    public void setNews(News news) {
        this.news = news;
    }

    //생성 메소드
    public static NewsImage createNewsImage(String url, String desc) {
        NewsImage newsImage = new NewsImage();
        newsImage.setUrl(url);
        newsImage.setDesc(desc);

        return newsImage;
    }
}
