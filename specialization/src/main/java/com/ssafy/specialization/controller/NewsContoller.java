package com.ssafy.specialization.controller;

import com.ssafy.specialization.dto.RequestBookmarkDto;
import com.ssafy.specialization.service.BookmarkService;
import com.ssafy.specialization.service.NotificationService;
import com.ssafy.specialization.service.WatchedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
public class NewsContoller {

    private final BookmarkService bookmarkService;
    @PostMapping("/bookmark")
    public void addBookmark(RequestBookmarkDto joinBookmarkDto){
        bookmarkService.addBookmark(joinBookmarkDto);
    }
}
