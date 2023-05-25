package com.newnews.newnews_be.entity.dtype;

import com.newnews.newnews_be.entity.News;
import com.newnews.newnews_be.entity.NewsImage;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("ItAndScience")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItAndScience extends News {


    public static ItAndScience createItAndScience(String title, String content, LocalDateTime newsDate, String reporter, String press, NewsImage... newsImages) {
        ItAndScience itAndScience = new ItAndScience();
        itAndScience.setTitle(title);
        itAndScience.setContent(content);
        itAndScience.setPress(press);
        itAndScience.setReporter(reporter);
        itAndScience.setNewsDate(newsDate);
        for (NewsImage newsImage : newsImages) {
            itAndScience.addNewsImage(newsImage);
        }
        return itAndScience;
    }

}
