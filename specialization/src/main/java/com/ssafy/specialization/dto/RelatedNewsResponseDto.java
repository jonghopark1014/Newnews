package com.ssafy.specialization.dto;

import lombok.Builder;
import lombok.Getter;


@Getter
public class RelatedNewsResponseDto {

    private Long newsId;
    private String title;
    private String press;
    private String newsImage;
    private String newsImageDesc;

    @Builder

    public RelatedNewsResponseDto(
            Long newsId,
            String title,
            String press,
            String newsImage,
            String newsImageDesc
    ) {
        this.newsId = newsId;
        this.title = title;
        this.press = press;
        this.newsImage = newsImage;
        this.newsImageDesc = newsImageDesc;
    }
}
