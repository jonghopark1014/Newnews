package com.ssafy.specialization.controller;

import com.ssafy.specialization.dto.JoinRequestDto;
import com.ssafy.specialization.response.Response;
import com.ssafy.specialization.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/regist")
    public ResponseEntity join(@RequestBody JoinRequestDto requestDto) {
        userService.join(requestDto);
        return Response.success(HttpStatus.CREATED);
    }

    @GetMapping("/user/exist/{username}")
    public ResponseEntity isExistUsername(@PathVariable String username) {
        return userService.isExistUsername(username) ?
                Response.fail(HttpStatus.CONFLICT, "해당 아이디는 이미 사용중") : Response.success(HttpStatus.OK);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity badCredentialsException(BadCredentialsException e) {
        return Response.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity illegalStateException(IllegalStateException e) {
        return Response.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
