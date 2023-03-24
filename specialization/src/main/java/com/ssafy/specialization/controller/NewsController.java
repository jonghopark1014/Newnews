package com.ssafy.specialization.controller;

import com.ssafy.specialization.dto.UserHistoryRequestDto;
import com.ssafy.specialization.response.Response;
import com.ssafy.specialization.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
public class NewsController {

    private final BookmarkService bookmarkService;
    @PostMapping("/bookmark")
    public ResponseEntity addBookmark(@RequestBody UserHistoryRequestDto userHistoryRequestDto){
            bookmarkService.addBookmark(userHistoryRequestDto.getUserId(), userHistoryRequestDto.getNewsId());
            return Response.success(HttpStatus.OK);
    }

    @DeleteMapping("/bookmark")
    public ResponseEntity deleteBookmark(@RequestBody UserHistoryRequestDto userHistoryRequestDto){
            bookmarkService.deleteBookmark(userHistoryRequestDto.getUserId(), userHistoryRequestDto.getNewsId());
            return Response.success(HttpStatus.OK);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity IllegalArgumentException(IllegalArgumentException e){
        return Response.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
