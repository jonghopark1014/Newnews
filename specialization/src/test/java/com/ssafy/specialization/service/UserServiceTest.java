package com.ssafy.specialization.service;

import com.ssafy.specialization.dto.JoinRequestDto;
import com.ssafy.specialization.entity.User;
import com.ssafy.specialization.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
class UserServiceTest {

    @Autowired UserService userService;
    @Autowired UserRepository userRepository;

    @Test
    void 회원가입() {
        JoinRequestDto requestDto = new JoinRequestDto(
                "test@gmail.com",
                "1234",
                "1234",
                "male",
                1996
        );

        long userId = userService.join(requestDto);

        User findUser = userRepository.findById(userId).orElseGet(null);
        assertThat("test@gmail.com").isEqualTo(findUser.getUsername());
    }

    @Test
    void 비밀번호와_비밀번호확인_불일치() {
        JoinRequestDto requestDto = new JoinRequestDto(
                "test@gmail.com",
                "1234",
                "12345",
                "male",
                1996
        );

        assertThrows(BadCredentialsException.class, () -> {
            userService.join(requestDto);
        });
    }

    @Test
    void 중복회원예외() {
        JoinRequestDto requestDto = new JoinRequestDto(
                "test@gmail.com",
                "1234",
                "1234",
                "male",
                1996
        );

        JoinRequestDto requestDto2 = new JoinRequestDto(
                "test@gmail.com",
                "1234",
                "1234",
                "male",
                1996
        );

        userService.join(requestDto);

        assertThrows(IllegalStateException.class, () -> {
            userService.join(requestDto2);
        });
    }

    @Test
    void 아이디중복검사() {
        assertThat(userService.isExistUsername("test@gmail.com")).isEqualTo(true);
    }
}