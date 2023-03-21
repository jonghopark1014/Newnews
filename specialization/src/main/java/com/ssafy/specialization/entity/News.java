package com.ssafy.specialization.entity;

import com.ssafy.specialization.entity.enums.Category;
import com.ssafy.specialization.entity.enums.Press;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
public class News {

    @Column(name = "news_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Category category;
    private String title;
    private String content;
    private LocalDateTime newsDate;
    private String reporter;
    private Press press;

    @OneToMany(mappedBy = "news")
    private List<NewsImage> newsImageList;

//    @OneToOne(fetch = FetchType.LAZY)
//    private Topic topic;
}
