package com.ssafy.specialization.response;

import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class ResponseDto<T> {

    private String status;

    @Nullable
    private T data;

    public ResponseDto(T data, String status) {
        this.status = status;
        this.data = data;
    }

    public ResponseDto(String status) {
        this.status = status;
        this.data = null;
    }
}
