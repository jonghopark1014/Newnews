package com.ssafy.specialization.entity.dtype;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.NewsImage;
import com.ssafy.specialization.entity.enums.Press;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("ItAndScience")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItAndScience extends News {


    public static ItAndScience createItAndScience(String title, String content, String newsDate, String reporter, Press press, NewsImage... newsImages) {
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
