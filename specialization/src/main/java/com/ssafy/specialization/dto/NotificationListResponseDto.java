package com.ssafy.specialization.dto;

import lombok.Getter;

@Getter
public class NotificationListResponseDto {

    private Long id;
    private String title;

    public NotificationListResponseDto(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
