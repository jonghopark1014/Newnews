package com.ssafy.specialization.service;

import com.ssafy.specialization.entity.Bookmark;
import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.repository.BookmarkRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class BookmarkServiceTest {
    @Autowired BookmarkRepository bookmarkRepository;
    @Autowired BookmarkService bookmarkService;

    @Test
    void 북마크_생성_테스트(){
        Long bookmarkId = bookmarkService.addBookmark(1L, 1L);
        Optional<Bookmark> optionalBookmark = bookmarkRepository.findById(bookmarkId);

        assertThat(optionalBookmark.get().getId()).isEqualTo(bookmarkId);
    }
    @Test
    void 북마크_삭제_테스트(){
        bookmarkService.addBookmark(1L,1L);
        int deleteCount = bookmarkService.deleteBookmark(1L, 1L);
        assertThat(deleteCount).isEqualTo(1);
    }

    @Test
    void 북마크_뉴스_테스트(){
        List<News> bookmarkedNewsList = bookmarkService.getBookmarkedNewsList(1L);
        assertThat(bookmarkedNewsList.size()).isEqualTo(3);
    }
}