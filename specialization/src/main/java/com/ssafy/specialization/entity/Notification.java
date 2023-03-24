package com.ssafy.specialization.entity;

import com.ssafy.specialization.entity.enums.Status;
import lombok.*;

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
    private void setUser(User user){
        this.user = user;
        user.getNotificationList().add(this);
    }

    private void setNews(News news){
        this.news = news;
    }

    private void setStatus(Status status) {
        this.status = status;
    }

    //생성 메소드
    public static Notification createNotification(User user, News news) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setNews(news);
        notification.setStatus(Status.NOTREAD);

        return notification;
    }
}
