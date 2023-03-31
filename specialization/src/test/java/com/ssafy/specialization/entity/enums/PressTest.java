package com.ssafy.specialization.entity.enums;

import lombok.RequiredArgsConstructor;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@RequiredArgsConstructor
class PressTest {

    @Test
    void enum타입체크(){
        Assertions.assertThat(Press.KANGWON.getKrName()).isEqualTo(Press.KANGWON);
    }
}