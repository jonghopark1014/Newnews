package com.newnews.newnews_be.response;

import com.newnews.newnews_be.response.Response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;


/*
com.newnews.newnews_be.response Response의 ResponseDto private -> public으로 변경 후 테스트 진행
 */
@Slf4j
class ResponseTest {

    @Test
    void success() {
        ResponseEntity responseEntity = Response.success(HttpStatus.OK, new Dto("seungbok"));

        // http status가 OK이다.
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        // data의 status가 success이다.
        assertThat(((ResponseDto) responseEntity.getBody()).getStatus()).isEqualTo("success");

        // data의 body의 name이 seungbok이다.
        assertThat(((Dto) ((ResponseDto) responseEntity.getBody()).getData()).getName()).isEqualTo("seungbok");
    }

    @Test
    void successWithoutBody() {
        ResponseEntity responseEntity = Response.success(HttpStatus.OK);

        // http status가 OK이다.
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        // data의 status가 success이다.
        assertThat(((ResponseDto) responseEntity.getBody()).getStatus()).isEqualTo("success");

        // data의 body가 null이다.
        assertThrows(NullPointerException.class, () -> {
            ((ResponseDto) responseEntity.getBody()).getData().toString();
        });
    }

    @Test
    void fail() {
        ResponseEntity responseEntity = Response.fail(HttpStatus.BAD_REQUEST, new Dto("seungbok"));

        // http status가 400이다.
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

        // data의 status가 fail이다.
        assertThat(((ResponseDto) responseEntity.getBody()).getStatus()).isEqualTo("fail");

        // data의 body의 name이 seungbok이다.
        assertThat(((Dto) ((ResponseDto) responseEntity.getBody()).getData()).getName()).isEqualTo("seungbok");
    }

    @Test
    void error() {
        ResponseEntity responseEntity = Response.error(HttpStatus.FORBIDDEN, "권한 없음");

        // http status가 403이다.
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);

        // data의 status가 error이다.
        assertThat(((ResponseDto) responseEntity.getBody()).getStatus()).isEqualTo("error");

        // data의 body가 권한 없음이다.
        assertThat(((ResponseDto) responseEntity.getBody()).getData()).isEqualTo("권한 없음");
    }

    static class Dto {
        private String name;

        public Dto(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }
}