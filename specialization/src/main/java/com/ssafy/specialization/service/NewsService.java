package com.ssafy.specialization.service;

import com.ssafy.specialization.dto.*;
import com.ssafy.specialization.entity.*;
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
    private final UserRepository userRepository;
    private final BookmarkRepository bookmarkRepository;

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

    public Page<RelatedNewsResponseDto> getRelatedNews(Long userId, Pageable pageable) {
        Page<Notification> notificationList = notificationRepository.findAllWithRelativeNewsByUserId(userId, pageable);
        return notificationList.map(
                (notification) -> {
                    News news = notification.getNews();
                    String imageUrl = getThumbnailImg(news);

                    return RelatedNewsResponseDto.builder()
                            .newsId(news.getId())
                            .preNewsId(notification.getWatched().getId())
                            .title(news.getTitle())
                            .press(news.getPress())
                            .newsImage(imageUrl)
                            .build();
                }
        );
    }

    public Page<NewsThumbnailResponseDto> getCategoryNews(int category, Pageable pageable) {
        Page<News> news;
        if(category==1) news = economyRepository.findAllWithCategory(pageable);
        else if(category==2) news = politicsRepository.findAllWithCategory(pageable);
        else if(category==3) news = societyRepository.findAllWithCategory(pageable);
        else if(category==4) news = lifeAndCultureRepository.findAllWithCategory(pageable);
        else if(category==5) news = itAndScienceRepository.findAllWithCategory(pageable);
        else throw new IllegalArgumentException("잘못된 카테고리입니다.");

        return news.map((n) -> {
            String imageUrl = getThumbnailImg(n);

            return NewsThumbnailResponseDto.builder()
                    .id(n.getId())
                    .title(n.getTitle())
                    .press(n.getPress())
                    .newsImage(imageUrl)
                    .build();
        });
    }

    //== 서비스 내부에서 사용하는 메서드 ==//

    private List<NewsImageResponseDto> getNewsImageResponseDto(List<NewsImage> newsImageList) {
        return newsImageList.stream().map(
                (newsImage) -> NewsImageResponseDto.builder()
                        .url(newsImage.getUrl())
                        .description(newsImage.getDescription())
                        .build()
        ).collect(Collectors.toList());
    }

    private String getThumbnailImg(News n) {
        List<NewsImage> newsImageList = n.getNewsImageList();
        String imageUrl = "";
        if (!newsImageList.isEmpty()) {
            NewsImage newsImage = newsImageList.get(0);
            imageUrl = newsImage.getUrl();
        }
        return imageUrl;
    }

    public RelatedNewsOneResponseDto getRelatedNewsOne(Long newsId, Long preNewsId) {
        News preNews = newsRepository.findById(preNewsId).orElseThrow(
                () -> new IllegalArgumentException("해당하는 이전 뉴스가 없습니다.")
        );

        News news = newsRepository.findById(newsId).orElseThrow(
                () -> new IllegalArgumentException("해당하는 뉴스가 없습니다.")
        );

        NewsResponseDto newsResponseDto = NewsResponseDto.builder()
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

        return RelatedNewsOneResponseDto.builder()
                .preNewsId(preNews.getId())
                .preNewsTitle(preNews.getTitle())
                .news(newsResponseDto)
                .build();

    }

    public NewsResponseDto getNewsWithIsBookmark(String username, Long newsId) {
        News news = newsRepository.findById(newsId).orElseThrow(
                () -> new IllegalArgumentException("해당하는 뉴스가 없습니다.")
        );

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new IllegalArgumentException("해당하는 유저가 없습니다.")
        );

        Bookmark bookmark = bookmarkRepository.findByUserIdAndNewsId(user.getId(), newsId).orElse(
                null
        );

        return bookmark == null ?
                createNewsResponseDto(news, false) : createNewsResponseDto(news, true);
    }

    private NewsResponseDto createNewsResponseDto(News news, boolean bookmarked) {
        return new NewsResponseDto(
                news.getId(), news.getTitle(), news.getContent(), news.getNewsDate(), news.getReporter(),
                news.getPress(), getNewsImageResponseDto(news.getNewsImageList()), bookmarked
        );
    }
}
