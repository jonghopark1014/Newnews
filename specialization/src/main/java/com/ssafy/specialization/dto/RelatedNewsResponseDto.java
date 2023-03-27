package com.ssafy.specialization.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class RelatedNewsResponseDto {

    private String title;
    private String content;
    private String newsDate;
    private String reporter;
    private String press;
    private List<NewsImageResponseDto> newsImageList;

    @Builder
    public RelatedNewsResponseDto(
            String title,
            String content,
            String newsDate,
            String reporter,
            String press,
            List<NewsImageResponseDto> newsImageList
    ) {
        this.title = title;
        this.content = content;
        this.newsDate = newsDate;
        this.reporter = reporter;
        this.press = press;
        this.newsImageList = newsImageList;
    }
}
