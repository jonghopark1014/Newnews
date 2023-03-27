package com.ssafy.specialization.controller;

import com.ssafy.specialization.dto.NewsResponseDto;
import com.ssafy.specialization.dto.UserHistoryRequestDto;
import com.ssafy.specialization.repository.NewsRepository;
import com.ssafy.specialization.response.Response;
import com.ssafy.specialization.service.BookmarkService;
import com.ssafy.specialization.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
public class NewsController {

    private final BookmarkService bookmarkService;
    private final NewsService newsService;

    @PostMapping("/bookmark")
    public ResponseEntity addBookmark(@RequestBody UserHistoryRequestDto userHistoryRequestDto) {
        bookmarkService.addBookmark(userHistoryRequestDto.getUserId(), userHistoryRequestDto.getNewsId());
        return Response.success(HttpStatus.OK);
    }

    @DeleteMapping("/bookmark")
    public ResponseEntity deleteBookmark(@RequestBody UserHistoryRequestDto userHistoryRequestDto){
            bookmarkService.deleteBookmark(userHistoryRequestDto.getUserId(), userHistoryRequestDto.getNewsId());
            return Response.success(HttpStatus.OK);
    }

    @GetMapping("/{newsId}")
    public ResponseEntity showNews(@PathVariable Long newsId) {
        NewsResponseDto news = newsService.getNews(newsId);
        return Response.success(HttpStatus.OK, news);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity IllegalArgumentException(IllegalArgumentException e){
        return Response.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
