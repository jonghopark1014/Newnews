package com.ssafy.specialization.service;

import com.ssafy.specialization.dto.RequestBookmarkDto;
import com.ssafy.specialization.repository.BookmarkRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class BookmarkServiceTest {
    @Autowired BookmarkRepository bookmarkRepository;
    @Autowired BookmarkService bookmarkService;

    @Test
    void 북마크_생성_테스트(){
        RequestBookmarkDto dto = new RequestBookmarkDto(1L,1L);
        bookmarkService.addBookmark(dto);
        assertThat(bookmarkRepository.findAll().size()).isEqualTo(1);
    }
    @Test
    void 북마크_삭제_테스트(){
        RequestBookmarkDto dto = RequestBookmarkDto.builder()
                .newsId(1L)
                .userId(1L)
                .build();

        bookmarkService.addBookmark(dto);
        bookmarkService.deleteBookmark(dto);
        assertThat(bookmarkRepository.findAll().size()).isEqualTo(0);

    }
}