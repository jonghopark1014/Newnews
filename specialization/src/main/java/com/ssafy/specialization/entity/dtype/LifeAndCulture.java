package com.ssafy.specialization.entity.dtype;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.NewsImage;
import com.ssafy.specialization.entity.enums.Press;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("LifeAndCulture")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LifeAndCulture extends News {

    public static LifeAndCulture createLifeAndCulture(String title, String content, String newsDate, String reporter, Press press, NewsImage... newsImages) {
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
