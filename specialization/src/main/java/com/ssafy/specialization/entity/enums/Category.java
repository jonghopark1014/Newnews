package com.ssafy.specialization.entity.enums;

import lombok.Getter;

@Getter
public enum Category {
    //TODO
    /* 추후 카테고리 생성 예정 */
    POL("정치"), ECO("경제"),
    SOC("사회"), LIF("생활/문화"),
    IT("IT/과학");

    private String krName;

    Category(String krName) {
        this.krName=krName;
    }
}