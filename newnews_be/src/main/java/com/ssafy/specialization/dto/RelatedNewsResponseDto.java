package com.newnews.newnews_be.dto;

import lombok.Builder;
import lombok.Getter;


@Getter
public class RelatedNewsResponseDto {

    private Long newsId;
    private Long preNewsId;
    private String title;
    private String press;
    private String newsImage;

    @Builder
    public RelatedNewsResponseDto(
            Long newsId,
            Long preNewsId,
            String title,
            String press,
            String newsImage
    ) {
        this.newsId = newsId;
        this.preNewsId = preNewsId;
        this.title = title;
        this.press = press;
        this.newsImage = newsImage;
    }
}
