package com.ssafy.specialization.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Bookmark {
    @Column(name = "bookmark_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id")
    private News news;

    //연관관계 메소드
    private void setUser(User user){
        this.user = user;
        user.getBookmarkList().add(this);
    }

    private void setNews(News news){
        this.news = news;
    }

    //생성 메소드
    public static Bookmark createBookmark(User user, News news){
        Bookmark bookmark = new Bookmark();
        bookmark.setUser(user);
        bookmark.setNews(news);

        return bookmark;
    }
}
