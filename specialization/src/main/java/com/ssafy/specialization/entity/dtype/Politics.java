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
@DiscriminatorValue("Politics")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Politics extends News {


    public static Politics createPolitics(String title, String content, LocalDateTime newsDate, String reporter, Press press, NewsImage... newsImages) {
        Politics politics = new Politics();
        politics.setTitle(title);
        politics.setContent(content);
        politics.setPress(press);
        politics.setNewsDate(newsDate);
        for (NewsImage newsImage : newsImages) {
            politics.addNewsImage(newsImage);
        }
        return politics;
    }

}
