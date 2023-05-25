package com.newnews.newnews_be.dto;

import lombok.Getter;

@Getter
public class NotificationListResponseDto {

    private String category;
    private Long newsId;
    private Long preNewsId;
    private String preNewsTitle;

    public NotificationListResponseDto(String category, Long newsId, Long preNewsId, String preNewsTitle) {
        this.category = category;
        this.newsId = newsId;
        this.preNewsId = preNewsId;
        this.preNewsTitle = preNewsTitle;
    }
}
