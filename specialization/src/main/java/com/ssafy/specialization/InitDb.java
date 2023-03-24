package com.ssafy.specialization;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.NewsImage;
import com.ssafy.specialization.entity.Notification;
import com.ssafy.specialization.entity.User;
import com.ssafy.specialization.entity.enums.Category;
import com.ssafy.specialization.entity.enums.Press;
import com.ssafy.specialization.entity.enums.Sex;
import com.ssafy.specialization.repository.NewsRepository;
import com.ssafy.specialization.repository.NotificationRepository;
import com.ssafy.specialization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@Transactional
@RequiredArgsConstructor
public class InitDb {

    private final NewsRepository newsRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    @PostConstruct
    public void init(){
        insertNewsDummy();
        insertUserDummy();
        insertNotification();
        insertWatched();
        insertBookmark();
    }

    private void insertNewsDummy(){
        NewsImage newsImage = NewsImage.createNewsImage("https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg");

        for (int i = 0; i < 10; i++) {
            News news = News.createNews(Category.TEST,String.valueOf(i),String.valueOf(i),
                    LocalDateTime.now(),String.valueOf(i), Press.TEST,newsImage);
            newsRepository.save(news);
        }
    }

    private void insertUserDummy(){
        User user1 = User.builder()
                .password("1")
                .sex(Sex.MALE)
                .username("ssafy1")
                .yearOfBirth(2023)
                .build();
        User user2 = User.builder()
                .password("1")
                .sex(Sex.FEMALE)
                .username("ssafy2")
                .yearOfBirth(2023)
                .build();
        userRepository.save(user1);
        userRepository.save(user2);
    }

    private void insertNotification(){
        Optional<User> optionalUser = userRepository.findById(1L);
        List<News> newsList = newsRepository.findAll();

        for (int i = 0; i < newsList.size(); i++) {
            Notification notification = Notification.
                    createNotification(optionalUser.get(), newsList.get(i));
            notificationRepository.save(notification);
        }
    }

    private void insertWatched(){
        Optional<User> optionalUser = userRepository.findById(1L);
        List<News> newsList = newsRepository.findAll();

        for (int i = 0; i < newsList.size()/2; i++) {
            Notification notification = Notification.
                    createNotification(optionalUser.get(), newsList.get(i));
            notificationRepository.save(notification);
        }
    }

    private void insertBookmark(){
        Optional<User> optionalUser = userRepository.findById(1L);
        List<News> newsList = newsRepository.findAll();

        for (int i = 0; i < newsList.size()/3; i++) {
            Notification notification = Notification.
                    createNotification(optionalUser.get(), newsList.get(i));
            notificationRepository.save(notification);
        }
    }
}
