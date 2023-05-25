package com.newnews.newnews_be.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class BookmarkedNewsResponseDto {
    private Long id;
    private String title;
    private String content;
    private Timestamp newsDate;
    private String reporter;
    private String press;
    private int categoryId;
    private String newsImage;

    @Builder
    public BookmarkedNewsResponseDto(
            Long id,
            String title,
            String content,
            Timestamp newsDate,
            String reporter,
            String press,
            int categoryId,
            String newsImage
        ) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.newsDate = newsDate;
            this.reporter = reporter;
            this.press = press;
            this.categoryId = categoryId;
            this.newsImage = newsImage;
        }
}
