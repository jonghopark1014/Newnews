package com.newnews.newnews_be.dto;

import lombok.Getter;

@Getter
public class LoginResponseDto {
    private long id;

    public LoginResponseDto(long id) {
        this.id = id;
    }
}
