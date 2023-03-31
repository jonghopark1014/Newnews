package com.ssafy.specialization.service;

import com.ssafy.specialization.dto.NewsImageResponseDto;
import com.ssafy.specialization.dto.NewsResponseDto;
import com.ssafy.specialization.dto.RelatedNewsResponseDto;
import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.NewsImage;
import com.ssafy.specialization.entity.Notification;
import com.ssafy.specialization.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;
    private final NotificationRepository notificationRepository;
    private final EconomyRepository economyRepository;
    private final PoliticsRepository politicsRepository;
    private final LifeAndCultureRepository lifeAndCultureRepository;
    private final SocietyRepository societyRepository;
    private final ItAndScienceRepository itAndScienceRepository;

    public NewsResponseDto getNews(Long newsId) {
        News news = newsRepository.findById(newsId).orElseThrow(
                () -> new IllegalArgumentException("해당하는 뉴스가 없습니다.")
        );

        return NewsResponseDto.builder()
                .id(news.getId())
                .title(news.getTitle())
                .content(news.getContent())
                .press(news.getPress())
                .reporter(news.getReporter())
                .newsDate(news.getNewsDate())
                .newsImageList(
                        getNewsImageResponseDto(news.getNewsImageList())
                )
                .build();
    }

    private List<NewsImageResponseDto> getNewsImageResponseDto(List<NewsImage> newsImageList) {
        return newsImageList.stream().map(
                (newsImage) -> NewsImageResponseDto.builder()
                        .url(newsImage.getUrl())
                        .description(newsImage.getDescription())
                        .build()
        ).collect(Collectors.toList());
    }

    public Page<RelatedNewsResponseDto> getRelatedNews(Long userId, Pageable pageable) {
        Page<Notification> notificationList = notificationRepository.findAllWithRelativeNewsByUserId(userId, pageable);
        return notificationList.map(
                (notification) -> {
                    News news = notification.getNews();
                    List<NewsImage> newsImageList = news.getNewsImageList();
                    String imageUrl = "";
                    if (!(newsImageList.size() == 0)) {
                        NewsImage newsImage = newsImageList.get(0);
                        imageUrl = newsImage.getUrl();
                    }

                    return RelatedNewsResponseDto.builder()
                            .newsId(news.getId())
                            .preNewsId(notification.getWatched().getId())
                            .title(news.getTitle())
                            .press(news.getPress().getKrName())
                            .newsImage(imageUrl)
                            .build();
                }
        );
    }

    public Page<NewsResponseDto> getCategoryNews(int category, Pageable pageable) {
        if(category==1){
            return economyRepository.findAll(pageable).map((news) ->
                    NewsResponseDto.builder()
                            .id(news.getId())
                            .title(news.getTitle())
                            .content(news.getContent())
                            .press(news.getPress())
                            .reporter(news.getReporter())
                            .newsDate(news.getNewsDate())
                            .newsImageList(
                                    getNewsImageResponseDto(news.getNewsImageList())
                            )
                            .build());
        }else if(category==2){
            return politicsRepository.findAll(pageable).map((news) ->
                    NewsResponseDto.builder()
                            .id(news.getId())
                            .title(news.getTitle())
                            .content(news.getContent())
                            .press(news.getPress())
                            .reporter(news.getReporter())
                            .newsDate(news.getNewsDate())
                            .newsImageList(
                                    getNewsImageResponseDto(news.getNewsImageList())
                            )
                            .build());
        }else if(category==3){
            return societyRepository.findAll(pageable).map((news) ->
                    NewsResponseDto.builder()
                            .id(news.getId())
                            .title(news.getTitle())
                            .content(news.getContent())
                            .press(news.getPress())
                            .reporter(news.getReporter())
                            .newsDate(news.getNewsDate())
                            .newsImageList(
                                    getNewsImageResponseDto(news.getNewsImageList())
                            )
                            .build());
        }else if(category==4){
            return lifeAndCultureRepository.findAll(pageable).map((news) ->
                    NewsResponseDto.builder()
                            .id(news.getId())
                            .title(news.getTitle())
                            .content(news.getContent())
                            .press(news.getPress())
                            .reporter(news.getReporter())
                            .newsDate(news.getNewsDate())
                            .newsImageList(
                                    getNewsImageResponseDto(news.getNewsImageList())
                            )
                            .build());
        }else if(category==5){
            return itAndScienceRepository.findAll(pageable).map((news) ->
                    NewsResponseDto.builder()
                            .id(news.getId())
                            .title(news.getTitle())
                            .content(news.getContent())
                            .press(news.getPress())
                            .reporter(news.getReporter())
                            .newsDate(news.getNewsDate())
                            .newsImageList(
                                    getNewsImageResponseDto(news.getNewsImageList())
                            )
                            .build());
        }else{
            throw new IllegalArgumentException("잘못된 카테고리입니다.");
        }
    }
}
