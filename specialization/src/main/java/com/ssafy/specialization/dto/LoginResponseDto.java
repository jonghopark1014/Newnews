package com.ssafy.specialization.dto;

import lombok.Getter;

@Getter
public class LoginResponseDto {
    private long id;

    public LoginResponseDto(long id) {
        this.id = id;
    }
}
