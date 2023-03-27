package com.ssafy.specialization.entity;

import com.ssafy.specialization.entity.enums.Category;
import com.ssafy.specialization.entity.enums.Press;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class News {

    @Column(name = "news_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private Category category;
    private String title;
    private String content;
    private LocalDateTime newsDate;
    private String reporter;
    @Enumerated(EnumType.STRING)
    private Press press;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private List<NewsImage> newsImageList = new ArrayList<>();

    @Builder
    public News(Category category, String title, String content, LocalDateTime newsDate, String reporter, Press press, List<NewsImage> newsImageList) {
        this.category = category;
        this.title = title;
        this.content = content;
        this.newsDate = newsDate;
        this.reporter = reporter;
        this.press = press;
        this.newsImageList = newsImageList;
    }

    private void setCategory(Category category) {
        this.category = category;
    }

    private void setTitle(String title) {
        this.title = title;
    }

    private void setContent(String content) {
        this.content = content;
    }

    private void setNewsDate(LocalDateTime newsDate) {
        this.newsDate = newsDate;
    }

    private void setReporter(String reporter) {
        this.reporter = reporter;
    }

    private void setPress(Press press) {
        this.press = press;
    }
    private void addNewsImage(NewsImage newsImage) {
        this.newsImageList.add(newsImage);
        newsImage.setNews(this);
    }

    //생성 메소드
    public static News createNews(Category category, String title, String content, LocalDateTime newsDate,
                                  String reporter, Press press, NewsImage... newsImages) {
        News news = new News();
        news.setCategory(category);
        news.setNewsDate(newsDate);
        news.setTitle(title);
        news.setContent(content);
        news.setReporter(reporter);
        news.setPress(press);
        for (NewsImage newsImage : newsImages) {
            news.addNewsImage(newsImage);
        }

        return news;
    }
}
