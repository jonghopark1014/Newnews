package com.ssafy.specialization.controller;

import com.ssafy.specialization.dto.*;
import com.ssafy.specialization.response.Response;
import com.ssafy.specialization.service.BookmarkService;
import com.ssafy.specialization.service.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news")
@Slf4j
public class NewsController {

    private final BookmarkService bookmarkService;
    private final NewsService newsService;

    @PostMapping("/bookmark")
    public ResponseEntity addBookmark(@RequestBody UserHistoryRequestDto userHistoryRequestDto) {
        bookmarkService.addBookmark(userHistoryRequestDto.getUserId(), userHistoryRequestDto.getNewsId());
        return Response.success(HttpStatus.OK);
    }

    @DeleteMapping("/bookmark/{userId}/{newsId}")
    public ResponseEntity deleteBookmark(@PathVariable("userId")Long userId, @PathVariable("newsId")Long newsId){
        bookmarkService.deleteBookmark(userId, newsId);
        return Response.success(HttpStatus.OK);
    }

    @PostMapping("/bookmark/list")
    public ResponseEntity getBookmarkedNewsList(@RequestBody HashMap<String, Long> map) {
        List<BookmarkedNewsResponseDto> bookmarkedNewsList = bookmarkService.getBookmarkedNewsList(map.get("userId"));
        return Response.success(HttpStatus.OK, bookmarkedNewsList);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity getCategoryNews(@PathVariable("category") int category, Pageable pageable){
        Page<NewsThumbnailResponseDto> categoryNews = newsService.getCategoryNews(category, pageable);
        return Response.success(HttpStatus.OK, categoryNews);
    }

    @GetMapping(value = {"/details/{newsId}/{categoryId}/{userId}", "/details/{newsId}/{categoryId}"})
    public ResponseEntity showNews(@PathVariable Long newsId, @PathVariable int categoryId, @PathVariable(required = false) Long userId) {
        if (userId == null) {
            userId = -1L;
        }


        NewsResponseDto news = newsService.getNewsWithIsBookmark(userId, newsId, categoryId);
        return Response.success(HttpStatus.OK, news);
    }

    @PostMapping("/after")
    public ResponseEntity getRelatedNews(@RequestBody HashMap<String, Long> req, Pageable pageable) {
        Page<RelatedNewsResponseDto> relatedNewsList = newsService.getRelatedNews(req.get("userId"), pageable);
        return Response.success(HttpStatus.OK, relatedNewsList);
    }

    @PostMapping("/details/relatedNews")
    public ResponseEntity showRelatedNews(@RequestBody RelatedNewsRequestDto requestDto) {
        RelatedNewsOneResponseDto relatedNewsOne = newsService.getRelatedNewsOne(requestDto.getNewsId(), requestDto.getPreNewsId(), requestDto.getUserId());
        return Response.success(HttpStatus.OK, relatedNewsOne);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity IllegalArgumentException(IllegalArgumentException e){
        return Response.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
