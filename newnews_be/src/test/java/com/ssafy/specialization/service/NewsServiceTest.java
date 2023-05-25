package com.newnews.newnews_be.service;

import com.newnews.newnews_be.dto.NewsResponseDto;
import com.newnews.newnews_be.entity.News;
import com.newnews.newnews_be.entity.NewsImage;
import com.newnews.newnews_be.entity.dtype.Economy;
import com.newnews.newnews_be.repository.EconomyRepository;
import com.newnews.newnews_be.repository.NewsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
@Commit
class NewsServiceTest {

    @Autowired
    NewsRepository newsRepository;
    @Autowired
    EconomyRepository economyRepository;
    @Autowired
    NewsService newsService;

    @Test
    void 하위타입데이터삽입(){
        NewsImage newsImage = NewsImage.createNewsImage(
                "https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg",
                "이미지에 해당하는 설명입니다."
        );
        Economy news = Economy.createEconomy("1", "1", LocalDateTime.now(),"1", "승엽아카프카필요없어", newsImage);

        newsRepository.save(news);
    }

    @Test
    void 북마크뉴스성공체크(){
        NewsResponseDto dto = newsService.getNewsWithIsBookmark(1L, 1L,1);
        assertThat(dto.getTitle()).isEqualTo("야옹");
        dto = newsService.getNewsWithIsBookmark(1L, 1L,1);
        assertThat(dto.getTitle()).isEqualTo("야옹");
    }

    @Test
    void 북마크뉴스실페체크() {
        assertThrows(IllegalArgumentException.class, () -> newsService.getNewsWithIsBookmark(1L, 111111111L,1));
    }

    @Test
    void 하위타입데이터조회(){
        Optional<Economy> economy = economyRepository.findById(1L);
        Economy economy1 = economy.get();
        assertThat(economy1.getReporter()).isEqualTo("1");
    }

    @Test
    void 하위타입데이터조회1(){
        Optional<News> news = newsRepository.findById(1L);
        News news1 = news.get();
        assertThat(news1.getReporter()).isEqualTo("1");
    }
}