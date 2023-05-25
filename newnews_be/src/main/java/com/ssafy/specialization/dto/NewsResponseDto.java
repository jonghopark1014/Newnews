package com.newnews.newnews_be.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class NewsResponseDto {

    private Long id;
    private String title;
    private String content;
    private LocalDateTime newsDate;
    private String reporter;
    private String press;
    private String categoryId;
    private List<NewsImageResponseDto> newsImageList;

    private boolean isBookmark;

    @Builder
    public NewsResponseDto(
            Long id,
            String title,
            String content,
            LocalDateTime newsDate,
            String reporter,
            String press,
            String categoryId,
            List<NewsImageResponseDto> newsImageList
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.newsDate = newsDate;
        this.reporter = reporter;
        this.press = press;
        this.categoryId = categoryId;
        this.newsImageList = newsImageList;
    }

    public NewsResponseDto(Long id, String title, String content, LocalDateTime newsDate, String reporter, String press, List<NewsImageResponseDto> newsImageList, boolean isBookmark) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.newsDate = newsDate;
        this.reporter = reporter;
        this.press = press;
        this.newsImageList = newsImageList;
        this.isBookmark = isBookmark;
    }
}
