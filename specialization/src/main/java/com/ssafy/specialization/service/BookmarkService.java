package com.ssafy.specialization.service;

import com.ssafy.specialization.dto.RequestBookmarkDto;
import com.ssafy.specialization.entity.Bookmark;
import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.User;
import com.ssafy.specialization.repository.BookmarkRepository;
import com.ssafy.specialization.repository.NewsRepository;
import com.ssafy.specialization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final NewsRepository newsRepository;

    //북마크 추가
    public void addBookmark(RequestBookmarkDto requestBookmarkDto){
        News news = newsRepository.findById(requestBookmarkDto.getNewsId())
                .orElseThrow(() -> new IllegalArgumentException("뉴스가 비어있습니다."));

        User user = userRepository.findById(requestBookmarkDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("유저가 비어있습니다."));

        Bookmark bookmark = Bookmark.builder()
                .news(news)
                .user(user)
                .build();

        bookmarkRepository.save(bookmark);
    }

    public void deleteBookmark(RequestBookmarkDto requestBookmarkDto){
        Bookmark bookmark = bookmarkRepository
                .findBookmarkByUserIdAndNewsId(
                        requestBookmarkDto.getUserId(),
                        requestBookmarkDto.getNewsId())
                .orElseThrow(() -> new IllegalArgumentException("해당 북마크가 없습니다."));

        bookmarkRepository.delete(bookmark);
    }
}
