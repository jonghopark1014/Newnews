package com.ssafy.specialization.entity.dtype;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.NewsImage;
import com.ssafy.specialization.entity.enums.Press;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Economy")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Economy extends News {

    public static Economy createEconomy(String title, String content, String newsDate, String reporter, Press press, NewsImage... newsImages) {
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
