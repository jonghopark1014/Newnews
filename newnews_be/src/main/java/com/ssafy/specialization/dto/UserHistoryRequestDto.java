package com.newnews.newnews_be.dto;

import lombok.Getter;

@Getter
public class UserHistoryRequestDto {

    private Long userId;
    private Long newsId;
}
