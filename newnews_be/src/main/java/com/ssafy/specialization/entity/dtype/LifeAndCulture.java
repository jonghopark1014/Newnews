package com.newnews.newnews_be.entity.dtype;

import com.newnews.newnews_be.entity.News;
import com.newnews.newnews_be.entity.NewsImage;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("LifeAndCulture")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LifeAndCulture extends News {

    public static LifeAndCulture createLifeAndCulture(String title, String content, LocalDateTime newsDate, String reporter, String press, NewsImage... newsImages) {
        LifeAndCulture lifeAndCulture = new LifeAndCulture();
        lifeAndCulture.setTitle(title);
        lifeAndCulture.setContent(content);
        lifeAndCulture.setPress(press);
        lifeAndCulture.setNewsDate(newsDate);
        for (NewsImage newsImage : newsImages) {
            lifeAndCulture.addNewsImage(newsImage);
        }
        return lifeAndCulture;
    }

}
