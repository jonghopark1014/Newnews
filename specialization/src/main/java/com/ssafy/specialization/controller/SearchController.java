package com.ssafy.specialization.controller;

import com.ssafy.specialization.dto.RecommendedWordListDto;
import com.ssafy.specialization.dto.SearchKeywordDto;
import com.ssafy.specialization.response.Response;
import com.ssafy.specialization.service.SearchHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {
    private final SearchHistoryService keywordService;

    @PostMapping("/save")
    public ResponseEntity searchKeyword(@RequestBody SearchKeywordDto searchKeywordDto){
        keywordService.searchKeyword(searchKeywordDto.getKeyword(), searchKeywordDto.getUsername());
        return Response.success(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity getWordList(){
        List<RecommendedWordListDto> wordList = keywordService.getWordList();
        return Response.success(HttpStatus.OK, wordList);
    }
}
