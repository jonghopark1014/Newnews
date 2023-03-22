package com.ssafy.specialization.entity;

import com.ssafy.specialization.entity.enums.Category;
import com.ssafy.specialization.entity.enums.Press;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    @OneToMany(mappedBy = "news")
    private List<NewsImage> newsImageList;

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
    //    @OneToOne(fetch = FetchType.LAZY)
//    private Topic topic;
}
