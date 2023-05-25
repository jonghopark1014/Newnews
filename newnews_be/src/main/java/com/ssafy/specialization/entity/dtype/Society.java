package com.newnews.newnews_be.entity.dtype;

import com.newnews.newnews_be.entity.News;
import com.newnews.newnews_be.entity.NewsImage;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("Society")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Society extends News {

    public static Society createSociety(String title, String content, LocalDateTime newsDate, String reporter, String press, NewsImage... newsImages) {
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
