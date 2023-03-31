package com.ssafy.specialization.entity.dtype;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.NewsImage;
import com.ssafy.specialization.entity.enums.Press;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("Society")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Society extends News {

    public static Society createSociety(String title, String content, LocalDateTime newsDate, String reporter, Press press, NewsImage... newsImages) {
        Society society = new Society();
        society.setTitle(title);
        society.setContent(content);
        society.setPress(press);
        society.setNewsDate(newsDate);
        for (NewsImage newsImage : newsImages) {
            society.addNewsImage(newsImage);
        }
        return society;
    }

}
