package com.ssafy.specialization.entity.dtype;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.NewsImage;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("Economy")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Economy extends News {

    public static Economy createEconomy(String title, String content, LocalDateTime newsDate, String reporter, String press, NewsImage... newsImages) {
        Economy economy = new Economy();
        economy.setTitle(title);
        economy.setContent(content);
        economy.setPress(press);
        economy.setReporter(reporter);
        economy.setNewsDate(newsDate);
        for (NewsImage newsImage : newsImages) {
            economy.addNewsImage(newsImage);
        }
        return economy;
    }

}
