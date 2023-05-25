package com.newnews.newnews_be.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NewsThumbnailResponseDto {

    private Long newsId;
    private String title;
    private String press;
    private String newsImage;

    @Builder
    public NewsThumbnailResponseDto(Long id, String title, String press, String newsImage) {
        this.newsId = id;
        this.title = title;
        this.press = press;
        this.newsImage = newsImage;
    }
}
