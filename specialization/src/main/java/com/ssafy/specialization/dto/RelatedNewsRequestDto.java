package com.ssafy.specialization.dto;

import lombok.Getter;

@Getter
public class RelatedNewsRequestDto {

    private Long newsId;
    private Long preNewsId;
    private Long userId;
}
