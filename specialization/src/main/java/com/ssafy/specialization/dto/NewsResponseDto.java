package com.ssafy.specialization.dto;

import com.ssafy.specialization.entity.NewsImage;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class NewsResponseDto {

    private Long id;
    private String category;
    private String title;
    private String content;
    private String newsDate;
    private String reporter;
    private String press;
    private List<NewsImageResponseDto> newsImageList;

    @Builder
    public NewsResponseDto(
            Long id,
            String category,
            String title,
            String content,
            String newsDate,
            String reporter,
            String press,
            List<NewsImageResponseDto> newsImageList
    ) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.newsDate = newsDate;
        this.reporter = reporter;
        this.press = press;
        this.newsImageList = newsImageList;
    }
}
