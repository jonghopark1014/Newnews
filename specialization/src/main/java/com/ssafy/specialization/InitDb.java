package com.ssafy.specialization;

import com.ssafy.specialization.entity.*;
import com.ssafy.specialization.entity.dtype.*;
import com.ssafy.specialization.entity.enums.Press;
import com.ssafy.specialization.entity.enums.Sex;
import com.ssafy.specialization.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final NewsRepository newsRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final WatchedRepository watchedRepository;
    private final BookmarkRepository bookmarkRepository;

    @Transactional
    public void init(){
        insertNewsDummy();
        insertUserDummy();
        insertWatched();
        insertNotification();
        insertBookmark();
    }

    void insertNewsDummy(){
        for (int i = 0; i < 2; i++) {
            NewsImage newsImage = NewsImage.createNewsImage(
                    "https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg",
                    "이미지에 해당하는 설명입니다."
            );
            Economy economy = Economy.createEconomy("1", "1", LocalDateTime.now(), "1", Press.CHOSUN, newsImage);
            newsImage = NewsImage.createNewsImage(
                    "https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg",
                    "이미지에 해당하는 설명입니다."
            );
            ItAndScience itAndScience = ItAndScience.createItAndScience("1", "1", LocalDateTime.now(), "1", Press.CHOSUN, newsImage);
            newsImage = NewsImage.createNewsImage(
                    "https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg",
                    "이미지에 해당하는 설명입니다."
            );
            LifeAndCulture lifeAndCulture = LifeAndCulture.createLifeAndCulture("1", "1", LocalDateTime.now(), "1", Press.CHOSUN, newsImage);
            newsImage = NewsImage.createNewsImage(
                    "https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg",
                    "이미지에 해당하는 설명입니다."
            );
            Politics politics = Politics.createPolitics("1", "1", LocalDateTime.now(), "1", Press.CHOSUN, newsImage);
            newsImage = NewsImage.createNewsImage(
                    "https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg",
                    "이미지에 해당하는 설명입니다."
            );
            Society society = Society.createSociety("1", "1", LocalDateTime.now(), "1", Press.CHOSUN, newsImage);
            newsRepository.save(economy);
            newsRepository.save(itAndScience);
            newsRepository.save(lifeAndCulture);
            newsRepository.save(politics);
            newsRepository.save(society);
        }
    }

    void insertUserDummy(){
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
        User save = userRepository.save(user1);
        User save1 = userRepository.save(user2);
        System.out.println(save);
    }

    void insertNotification(){
        Optional<User> optionalUser = userRepository.findById(1L);
        List<News> newsList = newsRepository.findAll();
        System.out.println("ABC");
        Watched watched = watchedRepository.findById(1L).get();
        System.out.println("ABC");

        for (int i = 0; i < newsList.size(); i++) {
            Notification notification = Notification.
                    createNotification(optionalUser.get(), newsList.get(i), watched);
            notificationRepository.save(notification);
        }
    }

    void insertWatched(){
        Optional<User> optionalUser = userRepository.findById(1L);
        System.out.println(optionalUser.get());
        List<News> newsList = newsRepository.findAll();

        for (int i = 0; i < newsList.size()/2; i++) {
            Watched watched = Watched.createWatched(optionalUser.get(), newsList.get(i));
            watchedRepository.save(watched);
        }
    }


    void insertBookmark(){
        Optional<User> optionalUser = userRepository.findById(1L);
        List<News> newsList = newsRepository.findAll();

        for (int i = 0; i < newsList.size()/3; i++) {
            Bookmark bookmark = Bookmark.createBookmark(optionalUser.get(), newsList.get(i));
            bookmarkRepository.save(bookmark);
        }
    }
}
