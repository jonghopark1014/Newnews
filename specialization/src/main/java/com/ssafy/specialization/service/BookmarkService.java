package com.ssafy.specialization.service;

import com.ssafy.specialization.dto.NewsImageResponseDto;
import com.ssafy.specialization.dto.NewsResponseDto;
import com.ssafy.specialization.entity.Bookmark;
import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.NewsImage;
import com.ssafy.specialization.entity.User;
import com.ssafy.specialization.repository.BookmarkRepository;
import com.ssafy.specialization.repository.NewsRepository;
import com.ssafy.specialization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final NewsRepository newsRepository;

    //북마크 추가
    @Transactional
    public Long addBookmark(Long userId, Long newsId){
        checkDuplicatedBookmark(userId, newsId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저가 비어있습니다."));

        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new IllegalArgumentException("뉴스가 비어있습니다."));


        Bookmark bookmark = Bookmark.builder()
                .news(news)
                .user(user)
                .build();

        Bookmark savedBookmark = bookmarkRepository.save(bookmark);
        return savedBookmark.getId();
    }

    //북마크된 뉴스 리스트 반환
    public List<NewsResponseDto> getBookmarkedNewsList(Long userId){
        List<News> bookmarkedNewsByUserId = newsRepository.findBookmarkedNewsByUserId(userId);

        List<NewsResponseDto> list = new ArrayList<>();

        for(News news : bookmarkedNewsByUserId) {
            NewsResponseDto newsResponseDto = NewsResponseDto.builder()
                    .id(news.getId())
                    .title(news.getTitle())
                    .content(news.getContent())
                    .press(news.getPress().toString())
                    .reporter(news.getReporter())
                    .category(news.getCategory().toString())
                    .newsDate(news.getNewsDate())
                    .newsImageList(
                            getNewsImageResponseDto(news.getNewsImageList())
                    )
                    .build();
            list.add(newsResponseDto);
        }
        return list;
    }

    //뉴스 이미지 converter
    private List<NewsImageResponseDto> getNewsImageResponseDto(List<NewsImage> newsImageList) {
        return newsImageList.stream().map(
                (newsImage) -> NewsImageResponseDto.builder()
                        .url(newsImage.getUrl())
                        .description(newsImage.getDescription())
                        .build()
        ).collect(Collectors.toList());
    }

//    북마크 중복 체크
    public void checkDuplicatedBookmark(Long userId, Long newsId){
        if(!bookmarkRepository.findByUserIdAndNewsId(userId, newsId).isEmpty()){
            throw new IllegalArgumentException("이미 북마크가 등록되었습니다.");
        }
    }

    //북마크제거
    @Transactional
    public int deleteBookmark(Long userId, Long newsId){
        int deleteCount = bookmarkRepository.deleteByUserIdAndNewsId(userId, newsId);
        if(deleteCount==1){
            return deleteCount;
        }else{
            throw new IllegalArgumentException("해당 북마크가 존재하지 않습니다.");
        }

    }
}
