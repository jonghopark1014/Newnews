package com.ssafy.specialization.entity;

import com.ssafy.specialization.entity.enums.Sex;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
public class User {
    @Column(name = "user_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String password;
    private int yearOfBirth;

    @Enumerated(EnumType.STRING)
    private Sex sex;
    private String username;
    private String role;

    @OneToMany(mappedBy = "user")
    private List<Notification> notificationList;
    @OneToMany(mappedBy = "user")
    private List<Bookmark> bookmarkList;
    @OneToMany(mappedBy = "user")
    private List<Watched> watchedList;

    @Builder
    public User(String password, int yearOfBirth, Sex sex, String username) {
        this.password = password;
        this.yearOfBirth = yearOfBirth;
        this.sex = sex;
        this.username = username;
    }

    public User() {

    }
}
