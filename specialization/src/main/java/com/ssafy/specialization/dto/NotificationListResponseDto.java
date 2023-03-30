package com.ssafy.specialization.dto;

import lombok.Getter;

@Getter
public class NotificationListResponseDto {

    private Long newsId;
    private Long preNewsId;
    private String preNewsTitle;

    public NotificationListResponseDto(Long newsId, Long preNewsId, String preNewsTitle) {
        this.newsId = newsId;
        this.preNewsId = preNewsId;
        this.preNewsTitle = preNewsTitle;
    }
}
