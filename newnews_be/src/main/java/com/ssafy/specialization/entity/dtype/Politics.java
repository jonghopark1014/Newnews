package com.newnews.newnews_be.entity.dtype;

import com.newnews.newnews_be.entity.News;
import com.newnews.newnews_be.entity.NewsImage;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("Politics")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Politics extends News {


    public static Politics createPolitics(String title, String content, LocalDateTime newsDate, String reporter, String press, NewsImage... newsImages) {
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
