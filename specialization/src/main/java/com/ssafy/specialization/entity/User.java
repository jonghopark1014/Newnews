package com.ssafy.specialization.entity;

import com.ssafy.specialization.entity.enums.Sex;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Column(name = "user_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String password;
    private int age;
    private Sex sex;
    private String username;

    @OneToMany(mappedBy = "user")
    private List<Notification> notificationList;
    @OneToMany(mappedBy = "user")
    private List<Bookmark> bookmarkList;
    @OneToMany(mappedBy = "user")
    private List<Watched> watchedList;
}
