package com.newnews.newnews_be.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NewsImageResponseDto {

    private String url;
    private String description;

    @Builder
    public NewsImageResponseDto(String url, String description) {
        this.url = url;
        this.description = description;
    }
}
