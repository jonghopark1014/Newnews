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

    private void setUrl(String url) {
        this.url = url;
    }

    //연관관계 메소드
    public void setNews(News news) {
        this.news = news;
        news.getNewsImageList().add(this);
    }

    //생성 메소드
    public static NewsImage createNewsImage(String url) {
        NewsImage newsImage = new NewsImage();
        newsImage.setUrl(url);

        return newsImage;
    }
}
