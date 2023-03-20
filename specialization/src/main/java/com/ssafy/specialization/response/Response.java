package com.ssafy.specialization.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;

public class Response {

    public static final String SUCCESS = "success";
    public static final String FAIL = "fail";
    public static final String ERROR = "error";

    public static <T> ResponseEntity success(HttpStatus status, @Nullable T body) {
        return ResponseEntity.status(status).body(new ResponseDto<T>(body, SUCCESS));
    }

    public static ResponseEntity success(HttpStatus status) {
        return ResponseEntity.status(status).body(new ResponseDto<>(SUCCESS));
    }

    public static <T> ResponseEntity fail(HttpStatus status, T body) {
        return ResponseEntity.status(status).body(new ResponseDto<T>(body, FAIL));
    }

    public static ResponseEntity error(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(new ResponseDto<String>(message, ERROR));
    }
}
