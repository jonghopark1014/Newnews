package com.ssafy.specialization.entity;

import com.ssafy.specialization.entity.enums.Status;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Notification {

    @Column(name = "notification_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id")
    private News news;

    @Builder
    public Notification(Status status, User user, News news) {
        this.status = status;
        this.user = user;
        this.news = news;
    }

    //연관관계 메소드
    public void setUser(User user){
        this.user = user;
        user.getNotificationList().add(this);
    }

    public void setNews(News news){
        this.news = news;
    }
}
