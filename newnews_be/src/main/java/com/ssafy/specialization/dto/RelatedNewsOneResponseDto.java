package com.newnews.newnews_be.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RelatedNewsOneResponseDto {

    private Long preNewsId;
    private String preNewsTitle;

    private NewsResponseDto news;

    @Builder
    public RelatedNewsOneResponseDto(Long preNewsId, String preNewsTitle, NewsResponseDto news) {
        this.preNewsId = preNewsId;
        this.preNewsTitle = preNewsTitle;
        this.news = news;
    }
}
