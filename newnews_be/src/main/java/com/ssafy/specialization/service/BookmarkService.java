package com.newnews.newnews_be.service;

import com.newnews.newnews_be.dto.BookmarkedNewsResponseDto;
import com.newnews.newnews_be.entity.Bookmark;
import com.newnews.newnews_be.entity.News;
import com.newnews.newnews_be.entity.User;
import com.newnews.newnews_be.repository.BookmarkRepository;
import com.newnews.newnews_be.repository.NewsRepository;
import com.newnews.newnews_be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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


        Bookmark bookmark = Bookmark.createBookmark(user, news);

        Bookmark savedBookmark = bookmarkRepository.save(bookmark);
        return savedBookmark.getId();
    }

    //북마크된 뉴스 리스트 반환
    public List<BookmarkedNewsResponseDto> getBookmarkedNewsList(Long userId){
        return newsRepository.getBookmarkedNewsListWithCategory(userId);
    }

    //북마크 중복 체크
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
