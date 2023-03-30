package com.ssafy.specialization.entity;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id")
    private News news;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "watched_id")
    private Watched watched;

    @Builder
    public Notification(User user, News news, Watched watched) {
        this.user = user;
        this.news = news;
        this.watched = watched;
    }

    //연관관계 메소드
    private void setUser(User user){
        this.user = user;
        user.getNotificationList().add(this);
    }

    private void setNews(News news){
        this.news = news;
    }

    private void setWatched(Watched watched) {
        this.watched = watched;
    }

    //생성 메소드
    public static Notification createNotification(User user, News news, Watched watched) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setNews(news);
        notification.setWatched(watched);

        return notification;
    }
}
