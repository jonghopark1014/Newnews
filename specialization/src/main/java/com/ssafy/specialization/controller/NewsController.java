package com.ssafy.specialization.controller;

import com.ssafy.specialization.dto.RequestBookmarkDto;
import com.ssafy.specialization.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
public class NewsController {

    private final BookmarkService bookmarkService;
    @PostMapping("/bookmark")
    public void addBookmark(RequestBookmarkDto requestBookmarkDto){
        bookmarkService.addBookmark(requestBookmarkDto);
    }
}
