package com.ssafy.specialization.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor // 테스트 시 Dto 생성 용도
public class JoinRequestDto {

    private String username;

    private String password;

    private String passwordChk;

    private String sex;

    private int yearOfBirth;
}
